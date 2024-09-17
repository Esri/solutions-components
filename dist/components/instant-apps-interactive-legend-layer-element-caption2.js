/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { v as validateInteractivity, g as getTheme } from './helpers.js';
import { d as defineCustomElement$4 } from './action.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';
import { d as defineCustomElement$1 } from './instant-apps-interactive-legend-count2.js';

const instantAppsInteractiveLegendLayerElementCaptionCss = ".sc-instant-apps-interactive-legend-layer-element-caption-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-ui-padding:15px 10px}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption{overflow:hidden;margin:0;overflow-x:hidden;display:inline-block;font-size:var(--instant-apps-interactive-legend-heading-font-size);font-weight:var(--instant-apps-interactive-legend-heading-font-weight)}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption header.sc-instant-apps-interactive-legend-layer-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption{display:flex;text-align:left;padding:var(--instant-apps-interactive-legend-ui-padding);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption h3.sc-instant-apps-interactive-legend-layer-element-caption{margin-bottom:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:normal;color:var(--instant-apps-interactive-legend-secondary-color);margin-bottom:5px}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption .instant-apps-interactive-legend__heading-text--group-item.sc-instant-apps-interactive-legend-layer-element-caption{-webkit-line-clamp:2;line-clamp:2}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption span.sc-instant-apps-interactive-legend-layer-element-caption{width:100%;font-size:var(--instant-apps-interactive-legend-total-feature-count-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption .instant-apps-interactive-legend__header-action-container.sc-instant-apps-interactive-legend-layer-element-caption{display:flex;align-items:center}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption header.sc-instant-apps-interactive-legend-layer-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget--panel.sc-instant-apps-interactive-legend-layer-element-caption{margin:0}.calcite-mode-dark.sc-instant-apps-interactive-legend-layer-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-layer-element-caption{background-color:#242424;color:var(--calcite-color-text-1)}.calcite-mode-light.sc-instant-apps-interactive-legend-layer-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-layer-element-caption{background-color:#ffffff;color:var(--calcite-color-text-1)}";
const InstantAppsInteractiveLegendLayerElementCaptionStyle0 = instantAppsInteractiveLegendLayerElementCaptionCss;

const CSS = {
    label: 'esri-legend__service-label',
    header: 'esri-widget__heading',
    interacitveLegendHeader: 'instant-apps-interactive-legend__header',
    headerActionContainer: 'instant-apps-interactive-legend__header-action-container',
};
const InstantAppsInteractiveLegendLayerElementCaption = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendLayerElementCaption extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.layerCaptionElementExpandUpdatedEvent = createEvent(this, "layerCaptionElementExpandUpdated", 7);
        this.legendvm = undefined;
        this.featureCount = undefined;
        this.activeLayerInfo = undefined;
        this.messages = undefined;
        this.isChild = false;
        this.expanded = true;
    }
    render() {
        var _a, _b, _c, _d;
        const isInteractive = validateInteractivity(this.activeLayerInfo);
        const { expanded } = this;
        const expandCollapseText = expanded ? (_a = this.messages) === null || _a === void 0 ? void 0 : _a.collapse : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.expand;
        const isChild = this.isChild ? ' instant-apps-interactive-legend__heading-text--group-item' : '';
        return (h("header", { key: '90e0c1317dab1e4f6aeb9f0e6652ba0c437e2738', class: `${CSS.interacitveLegendHeader} ${getTheme(this.el)}` }, h("calcite-action", { key: 'a83eb7e778aba7b5293a4e612e0e48369c1532bf', onClick: this.toggleExpanded(), icon: expanded ? 'chevron-down' : 'chevron-up', appearance: "transparent", text: expandCollapseText, label: expandCollapseText, scale: "s" }), h("span", { key: '2ddd88d88356bfd06325bd71f3b379cceaffeac0' }, h("span", { key: '974c40e2cd293c18c9cb05963616289484af2ce1', class: CSS.headerActionContainer }, h("h3", { key: 'e95395514e1406feb2f590c49398c2321b6c643c', class: `${CSS.header} ${CSS.label}${isChild}`, title: (_c = this.activeLayerInfo) === null || _c === void 0 ? void 0 : _c.title }, (_d = this.activeLayerInfo) === null || _d === void 0 ? void 0 : _d.title)), this.featureCount && isInteractive ? (h("instant-apps-interactive-legend-count", { activeLayerInfo: this.activeLayerInfo, "show-total": true, messages: this.messages, legendvm: this.legendvm })) : null)));
    }
    toggleExpanded() {
        return () => {
            this.expanded = !this.expanded;
            this.layerCaptionElementExpandUpdatedEvent.emit(this.expanded);
        };
    }
    get el() { return this; }
    static get style() { return InstantAppsInteractiveLegendLayerElementCaptionStyle0; }
}, [2, "instant-apps-interactive-legend-layer-element-caption", {
        "legendvm": [16],
        "featureCount": [4, "feature-count"],
        "activeLayerInfo": [16],
        "messages": [8],
        "isChild": [4, "is-child"],
        "expanded": [1028]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend-layer-element-caption", "calcite-action", "calcite-icon", "calcite-loader", "instant-apps-interactive-legend-count"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-layer-element-caption":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendLayerElementCaption);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "instant-apps-interactive-legend-count":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsInteractiveLegendLayerElementCaption as I, defineCustomElement as d };
