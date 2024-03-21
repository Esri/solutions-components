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

const CardManager = /*@__PURE__*/ proxyCustomElement(class CardManager extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.isMobile = undefined;
        this.layer = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this._cardLoading = false;
        this._graphics = undefined;
        this._translations = undefined;
    }
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
        this._cardLoading = true;
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = ids.length > 0 ? await queryFeaturesByID(ids, this.layer, [], false, this.mapView.spatialReference) : [];
        // https://github.com/Esri/solutions-components/issues/365
        this._graphics = featureSet.sort((a, b) => ids.indexOf(a.getObjectId()) - ids.indexOf(b.getObjectId()));
        this._cardLoading = false;
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
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b;
        const featuresClass = ((_a = this._graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 ? "" : "display-none";
        const messageClass = ((_b = this._graphics) === null || _b === void 0 ? void 0 : _b.length) > 0 ? "display-none" : "";
        return (h(Host, null, h("div", { class: "overflow-auto height-full" }, h("calcite-shell", { class: "position-relative " + featuresClass }, h("div", null, h("info-card", { graphics: this._graphics, isLoading: this._cardLoading, isMobile: this.isMobile, mapView: this.mapView, zoomAndScrollToSelected: this.zoomAndScrollToSelected }))), h("calcite-shell", { class: "position-relative " + messageClass }, h("div", { class: "padding-1" }, h("calcite-notice", { icon: "table", open: true }, h("div", { slot: "message" }, this._translations.selectFeaturesToStart)))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
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
    get el() { return this; }
    static get style() { return cardManagerCss; }
}, [0, "card-manager", {
        "isMobile": [4, "is-mobile"],
        "layer": [16],
        "mapView": [16],
        "zoomAndScrollToSelected": [4, "zoom-and-scroll-to-selected"],
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
