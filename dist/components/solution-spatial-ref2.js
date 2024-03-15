/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { n as nodeListToArray, d as defineCustomElement$1 } from './spatial-ref2.js';
import { d as defineCustomElement$9 } from './checkbox.js';
import { d as defineCustomElement$8 } from './icon.js';
import { d as defineCustomElement$7 } from './input.js';
import { d as defineCustomElement$6 } from './label2.js';
import { d as defineCustomElement$5 } from './progress.js';
import { d as defineCustomElement$4 } from './switch.js';
import { d as defineCustomElement$3 } from './tree.js';
import { d as defineCustomElement$2 } from './tree-item.js';

const solutionSpatialRefCss = ".spatial-ref-switch{margin-inline-end:0.5rem}.spatial-ref-component{margin-top:0.625rem;margin-inline-start:2.5rem}#spatialRefDefn .sc-calcite-label-h label.sc-calcite-label{margin:0px;background-color:#CBC3E3}.spatial-ref-default{margin:0px}.spatial-ref-item-title{margin-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem}.spatial-ref-item-switch{margin-inline-end:0.5rem}.switch-label{margin:0.25rem;font-size:0.875rem;line-height:1.25rem}.disabled-div{pointer-events:none;opacity:0.4}.spatial-ref-desc{padding-bottom:0.5rem;padding-inline-start:0.25rem}";

const SolutionSpatialRef = /*@__PURE__*/ proxyCustomElement(class SolutionSpatialRef extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.featureServiceSpatialReferenceChange = createEvent(this, "featureServiceSpatialReferenceChange", 7);
        this.lockedSpatialReferenceChange = createEvent(this, "lockedSpatialReferenceChange", 7);
        this.defaultWkid = 102100;
        this.loaded = false;
        this.locked = true;
        this.services = [];
        this.value = this.defaultWkid.toString();
        this._srSearchText = undefined;
        this._translations = undefined;
    }
    lockedChanged(newLocked) {
        if (!newLocked) {
            // By default enable all Feature Services on first load
            this._setFeatureServiceDefaults(this.services);
        }
        this.lockedSpatialReferenceChange.emit({
            locked: newLocked
        });
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
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, null, h("div", { class: "spatial-ref" }, h("div", { class: "spatial-ref-desc" }, h("calcite-label", null, this._translations.paramDescription)), h("label", { class: "switch-label" }, h("calcite-switch", { checked: !this.locked, class: "spatial-ref-switch", onCalciteSwitchChange: (event) => this._updateLocked(event), scale: "m" }), this._translations.specifyParam), h("div", { class: "spatial-ref-component", id: "spatialRefDefn" }, h("calcite-label", null, this._translations.spatialReferenceInfo, h("label", { class: "spatial-ref-default" }, h("spatial-ref", { defaultWkid: this.defaultWkid, disabled: this.locked, value: this.value }))), this._getFeatureServices(this.services)))));
    }
    /**
     * Saves changes to the embedded spatial reference value
     */
    spatialReferenceChange(event) {
        this.value = event.detail.newValue;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Toggles the ability to set the default spatial reference.
     */
    _updateLocked(event) {
        this.locked = !event.target.checked;
        this._updateStore();
        if (!this.loaded) {
            // when this is switched on when loading we have reloaded a solution that
            // has a custom wkid param and we should honor the settings they already have in the templates
            if (event.target.checked) {
                // By default enable all Feature Services on first load
                this._setFeatureServiceDefaults(this.services);
            }
            this.loaded = true;
        }
    }
    ;
    /**
     * Enable spatial reference variable for all feature services.
     *
     * @param services list of service names
     */
    _setFeatureServiceDefaults(services) {
        // switch all spatial-ref-item-switch
        const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
        fsNodes.forEach((node) => node.checked = true);
        services.forEach(name => this._updateEnabledServices({ detail: { switched: true } }, name));
    }
    /**
     * Create a switch control for each of the services
     *
     * @param services List of feature services
     * @returns a node to control each feature service
     */
    _getFeatureServices(services) {
        // verify they are in state
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const _services = services.filter(s => {
            return Object.keys(spatialReferenceInfo.services).some(stateService => stateService === s);
        });
        return _services && _services.length > 0 ? (h("div", null, h("label", { class: "spatial-ref-item-title" }, this._translations.featureServicesHeading), _services.map(name => (h("label", { class: "switch-label" }, h("calcite-switch", { checked: spatialReferenceInfo.services[name], class: "spatial-ref-item-switch", disabled: this.locked, onCalciteSwitchChange: (event) => this._updateEnabledServices(event, name), scale: "m" }), name))))) : (null);
    }
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    _updateStore() {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.enabled = !this.locked;
        spatialReferenceInfo.spatialReference = this.value;
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
    }
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     */
    _updateEnabledServices(event, name) {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.services[name] = event.target.checked;
        state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
        this.featureServiceSpatialReferenceChange.emit({
            name,
            enabled: event.target.checked
        });
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
    get el() { return this; }
    static get watchers() { return {
        "locked": ["lockedChanged"]
    }; }
    static get style() { return solutionSpatialRefCss; }
}, [0, "solution-spatial-ref", {
        "defaultWkid": [1538, "default-wkid"],
        "locked": [1540],
        "services": [1040],
        "value": [1537],
        "loaded": [32],
        "_srSearchText": [32],
        "_translations": [32]
    }, [[8, "spatialReferenceChange", "spatialReferenceChange"]], {
        "locked": ["lockedChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-spatial-ref", "calcite-checkbox", "calcite-icon", "calcite-input", "calcite-label", "calcite-progress", "calcite-switch", "calcite-tree", "calcite-tree-item", "spatial-ref"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-spatial-ref":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionSpatialRef);
            }
            break;
        case "calcite-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-switch":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-tree":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-tree-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "spatial-ref":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SolutionSpatialRef as S, defineCustomElement as d };
