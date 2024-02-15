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

const instantAppsInteractiveLegendLayerElementCss = ".sc-instant-apps-interactive-legend-layer-element-h{display:block}.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__service.sc-instant-apps-interactive-legend-layer-element{padding:0}.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer-body.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer-table.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__group-layer-child.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer-child-table.sc-instant-apps-interactive-legend-layer-element{margin:0;overflow:hidden}.sc-instant-apps-interactive-legend-layer-element-h .hide.sc-instant-apps-interactive-legend-layer-element{display:none}";

const CSS = {
    service: 'esri-legend__service',
    groupLayerChild: 'esri-legend__group-layer-child',
    layer: 'esri-legend__layer',
};
const InstantAppsInteractiveLegendLayerElement = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendLayerElement extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.legendvm = undefined;
        this.featureCount = undefined;
        this.activeLayerInfo = undefined;
        this.messages = undefined;
        this.isChild = undefined;
        this.expanded = true;
    }
    layerCaptionElementExpandUpdatedEmitted() {
        this.expanded = this.layerCaption.expanded;
    }
    componentWillLoad() {
        const observer = new MutationObserver(() => {
            forceUpdate(this.el);
        });
        observer.observe(this.el, {
            attributes: true,
        });
    }
    render() {
        var _a, _b;
        const layerClasses = !!this.activeLayerInfo.parent ? ` ${CSS.groupLayerChild}` : '';
        return (h("div", { style: {
                borderLeft: '1px solid var(--calcite-color-border-3)',
            }, class: `${CSS.service}${layerClasses}`, tabIndex: 0 }, h("instant-apps-interactive-legend-layer-element-caption", { ref: node => (this.layerCaption = node), legendvm: this.legendvm, "feature-count": this.featureCount, activeLayerInfo: this.activeLayerInfo, messages: this.messages, isChild: !!this.isChild, class: getTheme(this.el) }), h("div", { id: `${(_b = (_a = this.activeLayerInfo) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id}-legend-layer`, class: `${CSS.layer}${this.expanded === false ? ' hide' : ' show'}` }, h("slot", { name: "content" }))));
    }
    get el() { return this; }
    static get style() { return instantAppsInteractiveLegendLayerElementCss; }
}, [6, "instant-apps-interactive-legend-layer-element", {
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
    const components = ["instant-apps-interactive-legend-layer-element", "calcite-action", "calcite-icon", "calcite-loader", "instant-apps-interactive-legend-count", "instant-apps-interactive-legend-layer-element-caption"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-layer-element":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendLayerElement);
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

export { InstantAppsInteractiveLegendLayerElement as I, defineCustomElement as d };
