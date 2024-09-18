/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { n as nodeListToArray } from './common.js';
import { C as CSpatialRefCustomizingPrefix, g as CSpatialRefCustomizingSuffix } from './interfaces.js';
import { d as defineCustomElement$1 } from './switch.js';

const solutionSpatialRefCss = ".spatial-ref-switch{margin-inline-end:0.5rem}.spatial-ref-component{margin-top:0.625rem;margin-inline-start:2.5rem}#spatialRefDefn .sc-calcite-label-h label.sc-calcite-label{margin:0px;background-color:#CBC3E3}.spatial-ref-item-title{margin-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem}.spatial-ref-item-switch{margin-inline-end:0.5rem}.switch-label{font-size:0.875rem;line-height:1.25rem}.spatial-ref-services-list{margin-block-start:0.5em;margin-block-end:0.5em;list-style-type:none;padding-inline-start:2em}.spatial-ref-services-list-item{margin-top:0.25rem}";
const SolutionSpatialRefStyle0 = solutionSpatialRefCss;

/**
* The wkid that will be used as the default when enableDefault is true.
*/
const cDefaultWkid = "3857";
const SolutionSpatialRef = /*@__PURE__*/ proxyCustomElement(class SolutionSpatialRef extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.featureServiceSpatialReferenceChange = createEvent(this, "featureServiceSpatialReferenceChange", 7);
        this.enableDefaultSpatialReferenceChange = createEvent(this, "enableDefaultSpatialReferenceChange", 7);
        this.enabledSpatialReferenceChange = createEvent(this, "enabledSpatialReferenceChange", 7);
        this.enabled = false;
        this.enableDefault = false;
        this.featureServices = [];
        this._translations = undefined;
    }
    get el() { return this; }
    enabledChanged() {
        this._handleSpatialRefParamChange();
    }
    enableDefaultChanged() {
        this._handleDefaultSpatialRefParamChange();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad() {
        this._updateUIFromStore();
        return this._getTranslations();
    }
    render() {
        this._updateUIFromStore();
        return (h(Host, { key: '835e6d8b70668d9d2c7766bb7753a3db7ea60a12' }, h("label", { key: '51c330a8a763f2d9f2b89a4d0bae07b0f83822be', class: "switch-label" }, h("calcite-switch", { key: 'a955d4823778a1f566c50fcab8cfcb6ab455aede', checked: this.enabled, class: "spatial-ref-switch", onCalciteSwitchChange: (event) => this.enabled = event.target.checked, scale: "m" }), this._translations.enableSpatialReference), h("br", { key: '4f93908066350e19971555dd5f8b0523099891a9' }), h("div", { key: '5ce90b808f7d8d48180cae9401563162667fbacd', class: "spatial-ref-component", id: "spatialRefDefn" }, this._renderFeatureServicesList(this.featureServices)), h("label", { key: '41ce5fbba44389c4251a860c5cfbad776175546a', class: "switch-label spatial-ref-component" }, h("calcite-switch", { key: '5b425d78d1d257ac724f949132ae59de661e4cd4', checked: this.enableDefault, class: "spatial-ref-switch", disabled: !this.enabled, onCalciteSwitchChange: (event) => this.enableDefault = event.target.checked, scale: "m" }), this._translations.enableDefaultSpatialReference)));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    featureServiceSpatialReferenceChange;
    enableDefaultSpatialReferenceChange;
    enabledSpatialReferenceChange;
    solutionStoreHasChanges() {
        this.featureServices = state.getStoreInfo("featureServices");
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    /** Provides access to protected methods for unit testing.
     *
     *  @param methodName Name of protected method to run
     *  @param _arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
     *  @param _arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
     *  @param _arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
     *
     *  @returns
     */
    async _testAccess(methodName, _arg1, _arg2, _arg3) {
        switch (methodName) {
            case "_parameterizeWkid":
                return Promise.resolve(this._parameterizeWkid(_arg1));
            case "_unparameterizeWkid":
                return Promise.resolve(this._unparameterizeWkid(_arg1));
        }
        return Promise.resolve(null);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Disable spatial reference variable for all feature services.
     *
     * @param services list of service names
     */
    _clearFeatureServiceDefaults(featureServices) {
        // switch all spatial-ref-item-switch
        const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
        fsNodes.forEach((node) => node.checked = false);
        featureServices.forEach(service => this._updateEnabledServices({ detail: { switched: false } }, service));
    }
    /**
     * Toggles the enablement of the default spatial reference.
     */
    _handleDefaultSpatialRefParamChange() {
        this._updateStore();
        this.enableDefaultSpatialReferenceChange.emit({
            defaultWkid: this.enableDefault ? cDefaultWkid : ""
        });
    }
    ;
    /**
     * Toggles the enablement of the spatial reference parameter.
     */
    _handleSpatialRefParamChange() {
        // Update featureServices
        if (!this.enabled) {
            // Disable the default spatial reference button
            this.enableDefault = false;
            // Disable all services when the spatial reference parameter is disabled
            this._clearFeatureServiceDefaults(this.featureServices);
        }
        this._updateStore();
        this.enabledSpatialReferenceChange.emit({
            enabled: this.enabled
        });
    }
    ;
    /**
     * Converts a wkid into a parameterized form for storage in the solution item data.
     *
     * @param wkid Wkid to parameterize; unchanged if already parameterized
     * @returns Parameterized wkid
     */
    _parameterizeWkid(wkid) {
        return wkid
            ? wkid.toString().startsWith(CSpatialRefCustomizingPrefix)
                ? wkid
                : `${CSpatialRefCustomizingPrefix}${wkid}${CSpatialRefCustomizingSuffix}`
            : wkid;
    }
    ;
    /**
     * Create a switch control for each of the services
     *
     * @param services List of feature services
     * @returns a node to control each feature service
     */
    _renderFeatureServicesList(featureServices) {
        // verify they are in state
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const configurableServices = featureServices.filter(service => {
            return Object.keys(spatialReferenceInfo.services).some(srefServiceId => srefServiceId === service.id);
        });
        return configurableServices.length > 0 ? (h("div", null, h("label", { class: "spatial-ref-item-title" }, this._translations.featureServicesHeading), h("ul", { class: "spatial-ref-services-list" }, configurableServices.map(configurableService => (h("li", { class: "spatial-ref-services-list-item" }, h("label", { class: "switch-label" }, h("calcite-switch", { checked: spatialReferenceInfo.services[configurableService.id], class: "spatial-ref-item-switch", disabled: !this.enabled, onCalciteSwitchChange: (event) => this._updateEnabledServices(event, configurableService), scale: "m" }), configurableService.name))))))) : (null);
    }
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     *
     * @param event The event that triggered the change
     * @param service The service to update
     */
    _updateEnabledServices(event, service) {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const enabled = event.detail?.switched !== undefined // internal event
            ? event.detail.switched
            : event.target?.checked !== undefined // calcite event
                ? event.target.checked
                : true;
        spatialReferenceInfo.services[service.id] = enabled;
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
        // Update featureServices
        this._updateStore();
        // Report the change
        this.featureServiceSpatialReferenceChange.emit(service);
    }
    /**
     * Converts a parameterized wkid into a standard form for use in the solution item data.
     *
     * @param wkid Wkid to unparameterize; unchanged if not parameterized
     * @returns Unparameterized wkid
     */
    _unparameterizeWkid(wkid) {
        return wkid && wkid.toString().startsWith(CSpatialRefCustomizingPrefix)
            ? wkid.substring(CSpatialRefCustomizingPrefix.length, wkid.length - CSpatialRefCustomizingSuffix.length)
            : wkid;
    }
    /**
     * Updates the enabled/disabled state of the services in the featureServices part of the store.
     *
     * @param spatialReferenceInfo The spatial reference information
     */
    _updateFeatureServices(spatialReferenceInfo) {
        // If the spatial reference parameter is disabled, disable all services
        if (!spatialReferenceInfo.enabled) {
            Object.keys(spatialReferenceInfo.services).forEach(serviceId => {
                spatialReferenceInfo.services[serviceId] = false;
            });
        }
        // Copy the enabled state to the feature services
        this.featureServices.forEach(service => {
            service.enabled = spatialReferenceInfo.services[service.id];
            // Update the feature service wkid
            service.wkid = service.enabled
                ? this._parameterizeWkid(service.wkid)
                : this._unparameterizeWkid(service.wkid);
        });
        state.setStoreInfo("featureServices", this.featureServices);
    }
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    _updateStore() {
        // Update spatialReferenceInfo
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.enabled = this.enabled;
        if (this.enabled && this.enableDefault) {
            spatialReferenceInfo.default = cDefaultWkid;
        }
        else if (spatialReferenceInfo.hasOwnProperty("default")) {
            delete spatialReferenceInfo.default;
        }
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
        // Update featureServices
        this._updateFeatureServices(spatialReferenceInfo);
    }
    _updateUIFromStore() {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        this.enabled = spatialReferenceInfo.enabled;
        this.enableDefault = !!spatialReferenceInfo.default;
        this.featureServices = state.getStoreInfo("featureServices");
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "enabled": ["enabledChanged"],
        "enableDefault": ["enableDefaultChanged"]
    }; }
    static get style() { return SolutionSpatialRefStyle0; }
}, [0, "solution-spatial-ref", {
        "enabled": [1540],
        "enableDefault": [1540, "enable-default"],
        "featureServices": [1040],
        "_translations": [32],
        "_testAccess": [64]
    }, [[8, "solutionStoreHasChanges", "solutionStoreHasChanges"]], {
        "enabled": ["enabledChanged"],
        "enableDefault": ["enableDefaultChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-spatial-ref", "calcite-switch"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-spatial-ref":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionSpatialRef);
            }
            break;
        case "calcite-switch":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SolutionSpatialRef as S, defineCustomElement as d };
