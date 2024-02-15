/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { P as PopupUtils } from './popupUtils.js';
import { g as getLayerOrTable, e as getFeatureLayerView, h as highlightFeatures } from './mapViewUtils.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$g } from './action.js';
import { d as defineCustomElement$f } from './action-menu.js';
import { d as defineCustomElement$e } from './filter2.js';
import { d as defineCustomElement$d } from './handle.js';
import { d as defineCustomElement$c } from './icon.js';
import { d as defineCustomElement$b } from './input.js';
import { d as defineCustomElement$a } from './list.js';
import { d as defineCustomElement$9 } from './list-item.js';
import { d as defineCustomElement$8 } from './loader.js';
import { d as defineCustomElement$7 } from './notice.js';
import { d as defineCustomElement$6 } from './pagination.js';
import { d as defineCustomElement$5 } from './panel.js';
import { d as defineCustomElement$4 } from './popover.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './scrim.js';
import { d as defineCustomElement$1 } from './stack.js';

const featureListCss = ":host{display:block}.width-full{width:100%}.pagination{display:flex;justify-content:center}.error-msg{padding:10px;width:calc(100% - 20px)}.popup-title{font-weight:500;padding:10px 12px}";

const FeatureList = /*@__PURE__*/ proxyCustomElement(class FeatureList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.featureSelect = createEvent(this, "featureSelect", 7);
        this.selectedLayerId = undefined;
        this.mapView = undefined;
        this.noFeaturesFoundMsg = undefined;
        this.pageSize = 100;
        this.highlightOnMap = false;
        this._featureItems = [];
        this._featuresCount = 0;
        this._isLoading = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for selectedLayerId change and update layer instance and features list for new layerId
     */
    async selectedLayerWatchHandler() {
        this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        await this.initializeFeatureItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        this._isLoading = true;
        this._popupUtils = new PopupUtils();
        if (this.mapView && this.selectedLayerId) {
            this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        }
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.initializeFeatureItems();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h("calcite-panel", { "full-height": true, "full-width": true }, this._isLoading && h("calcite-loader", { label: "", scale: "m" }), this._featureItems.length === 0 && !this._isLoading &&
            h("calcite-notice", { class: "error-msg", icon: "feature-details", kind: "info", open: true }, h("div", { slot: "message" }, this.noFeaturesFoundMsg ? this.noFeaturesFoundMsg : this._translations.featureErrorMsg)), h("calcite-list", { "selection-appearance": "border", "selection-mode": "none" }, !this._isLoading && this._featureItems.length > 0 && this._featureItems), this._featuresCount > this.pageSize &&
            h("div", { class: "width-full", slot: "footer" }, h("calcite-pagination", { class: "pagination", "full-width": true, onCalcitePaginationChange: this.pageChanged.bind(this), "page-size": this.pageSize, "start-item": "1", "total-items": this._featuresCount }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Initialize the features list using the selected layer
     * @protected
     */
    async initializeFeatureItems() {
        if (this._selectedLayer) {
            this._isLoading = true;
            this._featureItems = await this.queryPage(0);
            this._featuresCount = await this._selectedLayer.queryFeatureCount();
            this._isLoading = false;
        }
    }
    /**
     * On page change get the next updated feature list
     * @param event page change event
     * @protected
     */
    async pageChanged(event) {
        this._isLoading = true;
        if (this._highlightHandle) {
            this._highlightHandle.remove();
            this._highlightHandle = null;
        }
        const page = event.target.startItem - 1;
        this._featureItems = await this.queryPage(page);
        this._isLoading = false;
    }
    /**
     * On feature click in feature list highlight the feature on the map
     * @param event feature clicked event
     * @param selectedFeature selected feature graphic
     * @protected
     */
    async featureClicked(event, selectedFeature) {
        //clear previous highlight and remove the highlightHandle
        if (this.highlightOnMap && this._highlightHandle) {
            this._highlightHandle.remove();
            this._highlightHandle = null;
        }
        //highlight on map only if it is selected item
        if (this.highlightOnMap) {
            const selectedFeatureObjectId = Number(event.target.value);
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
            this._highlightHandle = await highlightFeatures([selectedFeatureObjectId], selectedLayerView, this.mapView, true);
        }
        this.featureSelect.emit(selectedFeature);
    }
    /**
     * Query the selected feature layer, in descending order of object id's
     * @param page 0th page number in the pagination item
     * @returns List of features items to be rendered
     * @protected
     */
    async queryPage(page) {
        const featureLayer = this._selectedLayer;
        const objectIdField = featureLayer.objectIdField;
        const query = {
            start: page,
            num: this.pageSize,
            outFields: ["*"],
            returnGeometry: true,
            where: featureLayer.definitionExpression,
            outSpatialReference: this.mapView.spatialReference.toJSON()
        };
        //sort only when objectId field is found
        if (objectIdField) {
            query.orderByFields = [objectIdField.toString() + " DESC"];
        }
        const featureSet = await featureLayer.queryFeatures(query);
        return await this.createFeatureItem(featureSet);
    }
    /**
     * Creates list of items using the popup titles
     * @param featureSet Queried FeatureSet
     * @returns List of features items to be rendered
     * @protected
     */
    async createFeatureItem(featureSet) {
        const currentFeatures = featureSet === null || featureSet === void 0 ? void 0 : featureSet.features;
        const items = currentFeatures.map(async (feature) => {
            const popupTitle = await this._popupUtils.getPopupTitle(feature, this.mapView.map);
            return this.getFeatureItem(feature, popupTitle);
        });
        return Promise.all(items);
    }
    /**
     * Get each feature item
     * @param selectedFeature Each individual feature instance to be listed
     * @param popupTitle feature popup title
     * @returns individual feature item to be rendered
     * @protected
     */
    getFeatureItem(selectedFeature, popupTitle) {
        //get the object id value of the feature
        const oId = selectedFeature.attributes[this._selectedLayer.objectIdField].toString();
        //use object id if popupTitle is null or undefined
        popupTitle = popupTitle !== null && popupTitle !== void 0 ? popupTitle : oId;
        return (h("calcite-list-item", { onCalciteListItemSelect: (e) => { void this.featureClicked(e, selectedFeature); }, value: oId }, h("div", { class: "popup-title", slot: "content-start" }, popupTitle), h("calcite-icon", { icon: "chevron-right", scale: "s", slot: "content-end" })));
    }
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    get el() { return this; }
    static get watchers() { return {
        "selectedLayerId": ["selectedLayerWatchHandler"]
    }; }
    static get style() { return featureListCss; }
}, [0, "feature-list", {
        "selectedLayerId": [1, "selected-layer-id"],
        "mapView": [16],
        "noFeaturesFoundMsg": [1, "no-features-found-msg"],
        "pageSize": [2, "page-size"],
        "highlightOnMap": [4, "highlight-on-map"],
        "_featureItems": [32],
        "_featuresCount": [32],
        "_isLoading": [32],
        "_translations": [32]
    }, undefined, {
        "selectedLayerId": ["selectedLayerWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["feature-list", "calcite-action", "calcite-action-menu", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-pagination", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-stack"];
    components.forEach(tagName => { switch (tagName) {
        case "feature-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FeatureList);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-pagination":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { FeatureList as F, defineCustomElement as d };
