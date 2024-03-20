/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { s as state } from './solution-store-13ddaf1c.js';
import { g as getLocaleComponentStrings } from './locale-bcbea4ef.js';
import { n as nodeListToArray } from './common-06bcfe81.js';
import './index-477ea182.js';
import './interfaces-586e863c.js';
import './solution-resource-77aa99c8.js';
import './_commonjsHelpers-0f74c230.js';
import './index-a1e91462.js';
import './restHelpersGet-2a85d395.js';
import './esri-loader-1b324844.js';

const solutionContentsCss = ".icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";

const SolutionContents = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.solutionItemSelected = createEvent(this, "solutionItemSelected", 7);
        this.selectedItemId = undefined;
        this.templateHierarchy = [];
    }
    valueWatchHandler(v, oldV) {
        if (v && v !== oldV && Array.isArray(v) && v.length > 0) {
            this._treeItemSelected(v[0].id);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.valueWatchHandler(this.templateHierarchy, []);
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, null, h("calcite-tree", null, this.renderHierarchy(this.templateHierarchy))));
    }
    renderHierarchy(objs) {
        return objs.map((obj) => {
            const selected = this.selectedItemId && this.selectedItemId === obj.id;
            return (obj.dependencies && obj.dependencies.length > 0) ?
                (h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this.renderHierarchy(obj.dependencies))))
                :
                    (h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), h("span", { class: "icon-text", title: obj.title }, obj.title)));
        });
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
     * Publishes the `solutionItemSelected` event containing `solutionItem` of the selected item.
     *
     * Also toggles the expanded state of the tree item.
     *
     * @param solutionItem the selected solution item to emit
     * @param evt MouseEvent or undefined
     */
    _treeItemSelected(itemId, evt = undefined) {
        var _a;
        const treeItem = (_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
        if (treeItem) {
            treeItem.expanded = !(treeItem === null || treeItem === void 0 ? void 0 : treeItem.expanded);
        }
        this.selectedItemId = itemId;
        this.solutionItemSelected.emit(itemId);
    }
    static get assetsDirs() { return ["item-type-icons"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "templateHierarchy": ["valueWatchHandler"]
    }; }
};
SolutionContents.style = solutionContentsCss;

const solutionItemCss = ".configuration-container{position:relative;height:100%;width:100%}.configuration{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:flex;padding:0.5rem;border:1px #808080 solid}.config-tabs{width:100%}.config-tab{width:100%;overflow-y:auto;height:inherit}";

const SolutionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.authentication = undefined;
        this.itemId = "";
        this.solutionVariables = "";
        this.organizationVariables = "";
        this.itemType = undefined;
        this._translations = undefined;
    }
    itemIdWatchHandler() {
        const itemEdit = state.getItemInfo(this.itemId);
        this.itemType = itemEdit.type;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, null, h("div", { class: "configuration-container" }, h("div", { class: "configuration" }, this._showGroupTabs(this.itemType === "Group"), this._showItemTabs(this.itemType !== "Group")))));
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
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render tabs based on group item types
     *
     * @param visible Should the current tab be visible
     */
    _showGroupTabs(visible) {
        return h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.groupDetailsTab), h("calcite-tab-title", null, this._translations.sharingTab)), h("calcite-tab", { class: "config-tab", id: "group-tab", selected: true }, h("solution-item-details", { "item-id": this.itemId })), h("calcite-tab", { class: "config-tab", id: "share-tab" }, h("solution-item-sharing", { "group-id": this.itemId })));
    }
    /**
     * Render tabs based for an items details, data, and props section from a template
     *
     * @param visible Should the current tab be visible
     */
    _showItemTabs(visible) {
        return h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.itemDetailsTab), h("calcite-tab-title", null, this._translations.dataTab), h("calcite-tab-title", null, this._translations.propertiesTab), h("calcite-tab-title", null, this._translations.resourcesTab)), h("calcite-tab", { class: "config-tab", selected: true }, h("solution-item-details", { "item-id": this.itemId })), h("calcite-tab", { class: "config-tab", id: "data-tab" }, h("solution-template-data", { instanceid: "data", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), h("calcite-tab", { class: "config-tab", id: "props-tab" }, h("solution-template-data", { instanceid: "properties", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), h("calcite-tab", { class: "config-tab", id: "resources-tab" }, h("solution-resource-item", { authentication: this.authentication, class: "solutions-resource-container", "item-id": this.itemId })));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "itemId": ["itemIdWatchHandler"]
    }; }
};
SolutionItem.style = solutionItemCss;

const solutionSpatialRefCss = ".spatial-ref-switch{margin-inline-end:0.5rem}.spatial-ref-component{margin-top:0.625rem;margin-inline-start:2.5rem}#spatialRefDefn .sc-calcite-label-h label.sc-calcite-label{margin:0px;background-color:#CBC3E3}.spatial-ref-default{margin:0px}.spatial-ref-item-title{margin-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem}.spatial-ref-item-switch{margin-inline-end:0.5rem}.switch-label{margin:0.25rem;font-size:0.875rem;line-height:1.25rem}.disabled-div{pointer-events:none;opacity:0.4}.spatial-ref-desc{padding-bottom:0.5rem;padding-inline-start:0.25rem}";

const SolutionSpatialRef = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "locked": ["lockedChanged"]
    }; }
};
SolutionSpatialRef.style = solutionSpatialRefCss;

export { SolutionContents as solution_contents, SolutionItem as solution_item, SolutionSpatialRef as solution_spatial_ref };
