/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { d as getMapLayerHash, a as getAllLayers, c as getFeatureLayerView } from './mapViewUtils.js';
import { f as formatNumber, g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$c } from './action.js';
import { d as defineCustomElement$b } from './filter2.js';
import { d as defineCustomElement$a } from './handle.js';
import { d as defineCustomElement$9 } from './icon.js';
import { d as defineCustomElement$8 } from './input.js';
import { d as defineCustomElement$7 } from './list.js';
import { d as defineCustomElement$6 } from './list-item.js';
import { d as defineCustomElement$5 } from './loader.js';
import { d as defineCustomElement$4 } from './notice.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './scrim.js';
import { d as defineCustomElement$1 } from './stack.js';

const layerListCss = ":host{display:block}.error-msg{padding:10px}.layer-name{font-weight:500;padding:10px 12px}.feature-count{padding-right:12px}";
const LayerListStyle0 = layerListCss;

const LayerList = /*@__PURE__*/ proxyCustomElement(class LayerList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.layerSelect = createEvent(this, "layerSelect", 7);
        this.layersListLoaded = createEvent(this, "layersListLoaded", 7);
        this.mapView = undefined;
        this.layers = undefined;
        this.showFeatureCount = true;
        this.showNextIcon = false;
        this.applyLayerViewFilter = false;
        this._noLayersToDisplay = false;
        this._mapLayerIds = [];
        this._isLoading = false;
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * ILayerItemHash: id/name lookup
     */
    _layerItemsHash;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Refresh the layer list which will fetch the latest layer count and update the list
     * @returns Promise that resolves when the operation is complete
     */
    async refresh() {
        await this.setLayers();
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when feature layer clicked with details layerId and layerName
     */
    layerSelect;
    /**
     * Emitted on demand when list of layers to be listed are created.
     * When empty array received in this event means no valid layers are found to be listed
     */
    layersListLoaded;
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
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.setLayers();
        this._isLoading = false;
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Fragment, { key: '19f68b9a5d0b6c85832544e4281e1c4a1707ba86' }, this._isLoading && h("calcite-loader", { key: 'c908f311165f8f520f267a0dcde0bd954863ba6b', label: "", scale: "m" }), !this._isLoading && this.mapView && this._noLayersToDisplay &&
            h("calcite-notice", { key: '56dfb252f998333ed6a671cccddd5683f08ad63d', class: "error-msg", icon: "layers-reference", kind: "danger", open: true }, h("div", { key: 'a27ad45ac2b1984152af5a80da36583f7c375be6', slot: "title" }, this._translations.error), h("div", { key: 'a9466cb560b6ee2c72ebd18130ce21371f9e7cdf', slot: "message" }, this._translations.noLayerToDisplayErrorMsg)), !this._isLoading && this.mapView &&
            h("calcite-list", { key: '40e54ba92d2f48a97dd0987808f4b7fdefd266bb', "selection-appearance": "border", "selection-mode": "none" }, this.renderLayerList())));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Fetch the ids of the layers from the map
     * @returns Promise when the operation has completed
     * @protected
     */
    async setLayers() {
        if (this.mapView) {
            await this.initLayerHash();
        }
    }
    /**
     * Create a layer hash for layer name display
     * @returns Promise when the operation has completed
     * @protected
     */
    async initLayerHash() {
        const def = [];
        this._layerItemsHash = await getMapLayerHash(this.mapView, true);
        const allMapLayers = await getAllLayers(this.mapView);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        for (const eachLayer of allMapLayers) {
            if (eachLayer?.type === "feature") {
                if (this.showFeatureCount) {
                    const q = eachLayer.createQuery();
                    //if layer has definitionExpression append it to the where clause
                    if (eachLayer?.definitionExpression) {
                        q.where = q.where + ' AND ' + eachLayer.definitionExpression;
                    }
                    if (this.applyLayerViewFilter) {
                        const featureLayerView = await getFeatureLayerView(this.mapView, eachLayer.id);
                        if (featureLayerView?.filter?.where) {
                            q.where = q.where ? q.where + ' AND ' + featureLayerView.filter.where : featureLayerView.filter.where;
                        }
                    }
                    const result = eachLayer.queryFeatureCount(q);
                    def.push(result);
                    void result.then(async (resCount) => {
                        const formattedCount = !isNaN(resCount) ? await formatNumber(resCount, {
                            places: 0,
                            api: 4,
                            type: "decimal"
                        }) : "";
                        this._layerItemsHash[eachLayer.id].formattedFeatureCount = formattedCount;
                    });
                }
            }
        }
        await Promise.all(def).then(() => {
            const editableLayerIds = this.getLayersToBeShownInList(this._layerItemsHash);
            this._mapLayerIds = editableLayerIds.reverse();
            this.handleNoLayersToDisplay();
        }, () => {
            this._mapLayerIds = [];
            this.handleNoLayersToDisplay();
        });
    }
    /**
     * Set no layers to display state and emit event
     */
    handleNoLayersToDisplay() {
        this._noLayersToDisplay = !(this._mapLayerIds.length > 0);
        this.layersListLoaded.emit(this._mapLayerIds);
    }
    /**
     * Returns the ids of configured layers that needs to be shown in the list
     * @param hash each layer item details
     * @returns array of layer ids
     */
    getLayersToBeShownInList(hash) {
        const configuredLayers = this.layers?.length > 0 ? this.layers : [];
        return Object.keys(hash).reduce((prev, cur) => {
            if (configuredLayers.indexOf(cur) > -1) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * Render feature layer list
     * @returns layer list
     * @protected
     */
    renderLayerList() {
        return this._mapLayerIds.length > 0 && this._mapLayerIds.reduce((prev, layerId) => {
            if (this._layerItemsHash[layerId]) {
                prev.push(this.getLayerListItem(layerId));
            }
            return prev;
        }, []);
    }
    /**
     * Get each item
     * @param layerId Layer id
     * @returns individual item
     * @protected
     */
    getLayerListItem(layerId) {
        const layerName = this._layerItemsHash[layerId].name;
        const featureCount = this._layerItemsHash[layerId].formattedFeatureCount;
        return (h("calcite-list-item", { onCalciteListItemSelect: () => { this.onLayerItemSelected(layerId); } }, h("div", { class: "layer-name", slot: "content-start" }, layerName), this.showFeatureCount && featureCount !== undefined && featureCount !== "" && h("div", { class: !this.showNextIcon ? "feature-count" : "", slot: "content-end" }, "(" + featureCount + ")"), this.showNextIcon && h("calcite-icon", { flipRtl: true, icon: "chevron-right", scale: "s", slot: "content-end" })));
    }
    /**On click of layer list item emit the event along with the selected layerId and layerName
     * @param layerId Layer id
     * @protected
     */
    onLayerItemSelected(layerId) {
        this.layerSelect.emit({ layerId, layerName: this._layerItemsHash[layerId].name });
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
    static get style() { return LayerListStyle0; }
}, [0, "layer-list", {
        "mapView": [16],
        "layers": [16],
        "showFeatureCount": [4, "show-feature-count"],
        "showNextIcon": [4, "show-next-icon"],
        "applyLayerViewFilter": [4, "apply-layer-view-filter"],
        "_noLayersToDisplay": [32],
        "_mapLayerIds": [32],
        "_isLoading": [32],
        "_translations": [32],
        "refresh": [64]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["layer-list", "calcite-action", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-progress", "calcite-scrim", "calcite-stack"];
    components.forEach(tagName => { switch (tagName) {
        case "layer-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, LayerList);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-notice":
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

export { LayerList as L, defineCustomElement as d };
