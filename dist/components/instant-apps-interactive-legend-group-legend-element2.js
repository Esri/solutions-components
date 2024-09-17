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
        return (h("div", { key: '5294fd647e506c8fb1c10bc39178dd1701df0a13', style: {
                borderLeft: '1px solid var(--calcite-color-border-3)',
            }, class: `${CSS.service} ${CSS.groupLayer}` }, h("instant-apps-interactive-legend-layer-element-caption", { key: '5fa320a7a12179a85e157ccbabb5ff0d3fb75ea2', ref: node => (this.layerCaption = node), class: getTheme(this.el), legendvm: this.legendvm, "feature-count": this.featureCount, activeLayerInfo: this.activeLayerInfo, messages: this.messages, isChild: this.isChild }), h("div", { key: '68f702a841bf7a89a0534a252465b742c872aa94', class: `${CSS.groupContent} ${this.expanded === false ? 'hide' : 'show'}` }, h("slot", { key: '7b632a4264a3aead0f53949b972169827b11a4c0', name: "content" }))));
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
