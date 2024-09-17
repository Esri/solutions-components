/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { q as queryFeaturesByID } from './queryUtils.js';
import { g as getLayerOrTable } from './mapViewUtils.js';
import { d as defineCustomElement$h } from './action.js';
import { d as defineCustomElement$g } from './action-menu.js';
import { d as defineCustomElement$f } from './alert.js';
import { d as defineCustomElement$e } from './button.js';
import { d as defineCustomElement$d } from './chip.js';
import { d as defineCustomElement$c } from './icon.js';
import { d as defineCustomElement$b } from './loader.js';
import { d as defineCustomElement$a } from './modal.js';
import { d as defineCustomElement$9 } from './notice.js';
import { d as defineCustomElement$8 } from './panel.js';
import { d as defineCustomElement$7 } from './popover.js';
import { d as defineCustomElement$6 } from './scrim.js';
import { d as defineCustomElement$5 } from './shell.js';
import { d as defineCustomElement$4 } from './tooltip.js';
import { d as defineCustomElement$3 } from './delete-button2.js';
import { d as defineCustomElement$2 } from './edit-card2.js';
import { d as defineCustomElement$1 } from './info-card2.js';

const cardManagerCss = ":host{display:block !important}.display-flex{display:flex}.display-none{display:none}.w-100{width:100%}.padding-bottom-1{padding-bottom:1rem}.padding-1{padding:1rem}.position-relative{position:relative}.focus-margin{margin:1px 1px 0px 1px}.overflow-auto{overflow:auto}.height-full{height:100%}card-manager{display:block}";
const CardManagerStyle0 = cardManagerCss;

const CardManager = /*@__PURE__*/ proxyCustomElement(class CardManager extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.customInfoText = undefined;
        this.enableEditGeometry = false;
        this.isMobile = undefined;
        this.layer = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this.selectedFeaturesIds = undefined;
        this._cardLoading = false;
        this._graphics = undefined;
        this._translations = undefined;
    }
    get el() { return this; }
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
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Query the layer for the provided ids and store the result graphics
     */
    async featureSelectionChange(evt) {
        const ids = evt.detail;
        this._graphics = await this._getFeaturesByIds(ids);
    }
    /**
     * Get the layer view for the provided layer id
     */
    async layerSelectionChange(evt) {
        const id = evt.detail[0];
        this.layer = await getLayerOrTable(this.mapView, id);
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        if (this.selectedFeaturesIds?.length > 0) {
            this._graphics = await this._getFeaturesByIds(this.selectedFeaturesIds);
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const featuresClass = this._graphics?.length > 0 ? "" : "display-none";
        const messageClass = this._graphics?.length > 0 ? "display-none" : "";
        return (h(Host, { key: 'dafff11793b5ae60164964c346cbb152caceaeb9' }, h("div", { key: '02507fe9e1f4205fe8a9342b466f1ada849c8ed8', class: "overflow-auto height-full" }, h("calcite-shell", { key: '712c42c4044c1386e8bc4ff42e44f250ac4023a2', class: "position-relative " + featuresClass }, h("div", { key: 'f2bc47f58463506f7ea8011495b22cafb63e4f27' }, h("info-card", { key: '1ad1fb78dcc99a43d92ad08d4c7bbeda7c2f276d', enableEditGeometry: this.enableEditGeometry, graphics: this._graphics, isLoading: this._cardLoading, isMobile: this.isMobile, mapView: this.mapView }))), h("calcite-shell", { key: 'fa9fcada67198c182f918b939826f1f7f19f8e5b', class: "position-relative " + messageClass }, h("div", { key: '0da349d1442b6375cde177780c5f868d2e32072a', class: "padding-1" }, h("calcite-notice", { key: 'c0e04ca03c546f90c942c2eef622fbe9c8e61227', icon: "table", open: true }, h("div", { key: '85e3925e725798189b16270df31c266c55391ec7', slot: "message" }, this.customInfoText || this._translations.selectFeaturesToStart)))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Gets the Feature using its ids
     *
     * @returns Promise when complete
     * @protected
     */
    async _getFeaturesByIds(ids) {
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], false, this.mapView.spatialReference) : [];
        // https://github.com/Esri/solutions-components/issues/365
        return featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get style() { return CardManagerStyle0; }
}, [0, "card-manager", {
        "customInfoText": [1, "custom-info-text"],
        "enableEditGeometry": [4, "enable-edit-geometry"],
        "isMobile": [4, "is-mobile"],
        "layer": [1040],
        "mapView": [16],
        "zoomAndScrollToSelected": [4, "zoom-and-scroll-to-selected"],
        "selectedFeaturesIds": [16],
        "_cardLoading": [32],
        "_graphics": [32],
        "_translations": [32]
    }, [[8, "featureSelectionChange", "featureSelectionChange"], [8, "layerSelectionChange", "layerSelectionChange"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["card-manager", "calcite-action", "calcite-action-menu", "calcite-alert", "calcite-button", "calcite-chip", "calcite-icon", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-panel", "calcite-popover", "calcite-scrim", "calcite-shell", "calcite-tooltip", "delete-button", "edit-card", "info-card"];
    components.forEach(tagName => { switch (tagName) {
        case "card-manager":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CardManager);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "delete-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "edit-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "info-card":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { CardManager as C, defineCustomElement as d };
