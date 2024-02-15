/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const solutionStore = require('./solution-store-2f7fbcc5.js');
const locale = require('./locale-8c42ba7a.js');
const common = require('./common-4cd3537b.js');
require('./index-ae65e42f.js');
require('./interfaces-7cd0a48a.js');
require('./solution-resource-abec7452.js');
require('./_commonjsHelpers-384729db.js');
require('./index-f64944ad.js');
require('./restHelpersGet-e0737480.js');
require('./esri-loader-a91c0ec1.js');

const solutionContentsCss = ".icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";

const SolutionContents = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.solutionItemSelected = index.createEvent(this, "solutionItemSelected", 7);
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
        return (index.h(index.Host, null, index.h("calcite-tree", null, this.renderHierarchy(this.templateHierarchy))));
    }
    renderHierarchy(objs) {
        return objs.map((obj) => {
            const selected = this.selectedItemId && this.selectedItemId === obj.id;
            return (obj.dependencies && obj.dependencies.length > 0) ?
                (index.h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, index.h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), index.h("span", { class: "icon-text", title: obj.title }, obj.title), index.h("calcite-tree", { slot: "children" }, this.renderHierarchy(obj.dependencies))))
                :
                    (index.h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, index.h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), index.h("span", { class: "icon-text", title: obj.title }, obj.title)));
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "templateHierarchy": ["valueWatchHandler"]
    }; }
};
SolutionContents.style = solutionContentsCss;

const solutionItemCss = ".configuration-container{position:relative;height:100%;width:100%}.configuration{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:flex;padding:0.5rem;border:1px #808080 solid}.config-tabs{width:100%}.config-tab{width:100%;overflow-y:auto;height:inherit}";

const SolutionItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.authentication = undefined;
        this.itemId = "";
        this.solutionVariables = "";
        this.organizationVariables = "";
        this.itemType = undefined;
        this._translations = undefined;
    }
    itemIdWatchHandler() {
        const itemEdit = solutionStore.state.getItemInfo(this.itemId);
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
        return (index.h(index.Host, null, index.h("div", { class: "configuration-container" }, index.h("div", { class: "configuration" }, this._showGroupTabs(this.itemType === "Group"), this._showItemTabs(this.itemType !== "Group")))));
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
        return index.h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, index.h("calcite-tab-nav", { slot: "tab-nav" }, index.h("calcite-tab-title", null, this._translations.groupDetailsTab), index.h("calcite-tab-title", null, this._translations.sharingTab)), index.h("calcite-tab", { class: "config-tab", id: "group-tab", selected: true }, index.h("solution-item-details", { "item-id": this.itemId })), index.h("calcite-tab", { class: "config-tab", id: "share-tab" }, index.h("solution-item-sharing", { "group-id": this.itemId })));
    }
    /**
     * Render tabs based for an items details, data, and props section from a template
     *
     * @param visible Should the current tab be visible
     */
    _showItemTabs(visible) {
        return index.h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, index.h("calcite-tab-nav", { slot: "tab-nav" }, index.h("calcite-tab-title", null, this._translations.itemDetailsTab), index.h("calcite-tab-title", null, this._translations.dataTab), index.h("calcite-tab-title", null, this._translations.propertiesTab), index.h("calcite-tab-title", null, this._translations.resourcesTab)), index.h("calcite-tab", { class: "config-tab", selected: true }, index.h("solution-item-details", { "item-id": this.itemId })), index.h("calcite-tab", { class: "config-tab", id: "data-tab" }, index.h("solution-template-data", { instanceid: "data", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), index.h("calcite-tab", { class: "config-tab", id: "props-tab" }, index.h("solution-template-data", { instanceid: "properties", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), index.h("calcite-tab", { class: "config-tab", id: "resources-tab" }, index.h("solution-resource-item", { authentication: this.authentication, class: "solutions-resource-container", "item-id": this.itemId })));
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await locale.getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "itemId": ["itemIdWatchHandler"]
    }; }
};
SolutionItem.style = solutionItemCss;

const solutionSpatialRefCss = ".spatial-ref-switch{margin-inline-end:0.5rem}.spatial-ref-component{margin-top:0.625rem;margin-inline-start:2.5rem}#spatialRefDefn .sc-calcite-label-h label.sc-calcite-label{margin:0px;background-color:#CBC3E3}.spatial-ref-default{margin:0px}.spatial-ref-item-title{margin-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem}.spatial-ref-item-switch{margin-inline-end:0.5rem}.switch-label{margin:0.25rem;font-size:0.875rem;line-height:1.25rem}.disabled-div{pointer-events:none;opacity:0.4}.spatial-ref-desc{padding-bottom:0.5rem;padding-inline-start:0.25rem}";

const SolutionSpatialRef = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.featureServiceSpatialReferenceChange = index.createEvent(this, "featureServiceSpatialReferenceChange", 7);
        this.lockedSpatialReferenceChange = index.createEvent(this, "lockedSpatialReferenceChange", 7);
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
        return (index.h(index.Host, null, index.h("div", { class: "spatial-ref" }, index.h("div", { class: "spatial-ref-desc" }, index.h("calcite-label", null, this._translations.paramDescription)), index.h("label", { class: "switch-label" }, index.h("calcite-switch", { checked: !this.locked, class: "spatial-ref-switch", onCalciteSwitchChange: (event) => this._updateLocked(event), scale: "m" }), this._translations.specifyParam), index.h("div", { class: "spatial-ref-component", id: "spatialRefDefn" }, index.h("calcite-label", null, this._translations.spatialReferenceInfo, index.h("label", { class: "spatial-ref-default" }, index.h("spatial-ref", { defaultWkid: this.defaultWkid, disabled: this.locked, value: this.value }))), this._getFeatureServices(this.services)))));
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
        const fsNodes = common.nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
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
        const spatialReferenceInfo = solutionStore.state.getStoreInfo("spatialReferenceInfo");
        const _services = services.filter(s => {
            return Object.keys(spatialReferenceInfo.services).some(stateService => stateService === s);
        });
        return _services && _services.length > 0 ? (index.h("div", null, index.h("label", { class: "spatial-ref-item-title" }, this._translations.featureServicesHeading), _services.map(name => (index.h("label", { class: "switch-label" }, index.h("calcite-switch", { checked: spatialReferenceInfo.services[name], class: "spatial-ref-item-switch", disabled: this.locked, onCalciteSwitchChange: (event) => this._updateEnabledServices(event, name), scale: "m" }), name))))) : (null);
    }
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    _updateStore() {
        const spatialReferenceInfo = solutionStore.state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.enabled = !this.locked;
        spatialReferenceInfo.spatialReference = this.value;
        solutionStore.state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
    }
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     */
    _updateEnabledServices(event, name) {
        const spatialReferenceInfo = solutionStore.state.getStoreInfo("spatialReferenceInfo");
        spatialReferenceInfo.services[name] = event.target.checked;
        solutionStore.state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
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
        const translations = await locale.getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "locked": ["lockedChanged"]
    }; }
};
SolutionSpatialRef.style = solutionSpatialRefCss;

exports.solution_contents = SolutionContents;
exports.solution_item = SolutionItem;
exports.solution_spatial_ref = SolutionSpatialRef;
