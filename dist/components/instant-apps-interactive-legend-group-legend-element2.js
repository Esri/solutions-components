/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, forceUpdate, h } from '@stencil/core/internal/client';
import { g as getTheme } from './helpers.js';
import { d as defineCustomElement$5 } from './action.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './instant-apps-interactive-legend-count2.js';
import { d as defineCustomElement$1 } from './instant-apps-interactive-legend-layer-element-caption2.js';

const instantAppsInteractiveLegendGroupLegendElementCss = ".sc-instant-apps-interactive-legend-group-legend-element-h{display:block}.sc-instant-apps-interactive-legend-group-legend-element-h .esri-legend__service.sc-instant-apps-interactive-legend-group-legend-element{margin:0;padding:0}.sc-instant-apps-interactive-legend-group-legend-element-h .hide.sc-instant-apps-interactive-legend-group-legend-element{display:none}";
const InstantAppsInteractiveLegendGroupLegendElementStyle0 = instantAppsInteractiveLegendGroupLegendElementCss;

const CSS = {
    service: 'esri-legend__service',
    groupLayer: 'esri-legend__group-layer',
    groupContent: 'esri-legend__group-content',
};
const InstantAppsInteractiveLegendGroupLegendElement = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendGroupLegendElement extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.legendvm = undefined;
        this.featureCount = undefined;
        this.activeLayerInfo = undefined;
        this.messages = undefined;
        this.isChild = false;
        this.expanded = true;
    }
    layerCaptionElementExpandUpdatedEmitted() {
        var _a;
        this.expanded = !!((_a = this.layerCaption) === null || _a === void 0 ? void 0 : _a.expanded);
    }
    async componentWillLoad() {
        const observer = new MutationObserver(() => {
            forceUpdate(this.el);
        });
        observer.observe(this.el, {
            attributes: true,
        });
    }
    render() {
        return (h("div", { key: 'ab9a4911afa5f1021f3270c4fec409a708e2ec51', style: {
                borderLeft: '1px solid var(--calcite-color-border-3)',
            }, class: `${CSS.service} ${CSS.groupLayer}` }, h("instant-apps-interactive-legend-layer-element-caption", { key: 'bc80abe473c1b47920a78b072033d5b214f7822c', ref: node => (this.layerCaption = node), class: getTheme(this.el), legendvm: this.legendvm, "feature-count": this.featureCount, activeLayerInfo: this.activeLayerInfo, messages: this.messages, isChild: this.isChild }), h("div", { key: 'cf6dc1620eb0a95430129b9d414a9f6b893b61c2', class: `${CSS.groupContent} ${this.expanded === false ? 'hide' : 'show'}` }, h("slot", { key: 'f346b52020e3cf4e3a072fdfa17a3762676aba53', name: "content" }))));
    }
    get el() { return this; }
    static get style() { return InstantAppsInteractiveLegendGroupLegendElementStyle0; }
}, [6, "instant-apps-interactive-legend-group-legend-element", {
        "legendvm": [16],
        "featureCount": [4, "feature-count"],
        "activeLayerInfo": [16],
        "messages": [8],
        "isChild": [4, "is-child"],
        "expanded": [32]
    }, [[8, "layerCaptionElementExpandUpdated", "layerCaptionElementExpandUpdatedEmitted"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend-group-legend-element", "calcite-action", "calcite-icon", "calcite-loader", "instant-apps-interactive-legend-count", "instant-apps-interactive-legend-layer-element-caption"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-group-legend-element":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendGroupLegendElement);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "instant-apps-interactive-legend-count":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "instant-apps-interactive-legend-layer-element-caption":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsInteractiveLegendGroupLegendElement as I, defineCustomElement as d };
