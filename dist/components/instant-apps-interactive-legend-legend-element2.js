/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { r as checkNestedUniqueSymbolLegendElement } from './helpers.js';
import { s as store } from './store.js';
import { d as defineCustomElement$6 } from './action.js';
import { d as defineCustomElement$5 } from './button.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './tooltip.js';
import { d as defineCustomElement$1 } from './instant-apps-interactive-legend-legend-element-caption2.js';

const instantAppsInteractiveLegendLegendElementCss = ".sc-instant-apps-interactive-legend-legend-element-h{display:block}.sc-instant-apps-interactive-legend-legend-element-h .esri-legend__layer-table.sc-instant-apps-interactive-legend-legend-element,.sc-instant-apps-interactive-legend-legend-element-h .instant-apps-interactive-legend__nested-unique-symbol.sc-instant-apps-interactive-legend-legend-element{margin:0}.sc-instant-apps-interactive-legend-legend-element-h .hide.sc-instant-apps-interactive-legend-legend-element{display:none}";
const InstantAppsInteractiveLegendLegendElementStyle0 = instantAppsInteractiveLegendLegendElementCss;

const CSS = {
    layerTableSizeRamp: 'esri-legend__layer-table--size-ramp',
    layerChildTable: 'esri-legend__layer-child-table',
    layerTable: 'esri-legend__layer-table',
    nestedUniqueSymbol: 'instant-apps-interactive-legend__nested-unique-symbol',
    nonInteractive: 'instant-apps-interactive-legend__non-interactive',
};
const InstantAppsInteractiveLegendLegendElement = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendLegendElement extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.activeLayerInfo = undefined;
        this.isSizeRamp = undefined;
        this.isChild = undefined;
        this.isColorRamp = undefined;
        this.isRelationshipRamp = undefined;
        this.isInteractive = undefined;
        this.zoomTo = undefined;
        this.legendElement = undefined;
        this.titleText = undefined;
        this.legendvm = undefined;
        this.legendElementIndex = undefined;
        this.messages = undefined;
        this.expanded = true;
    }
    legendLayerExpandUpdatedEmitted() {
        this.expanded = this.legendLayerCaption.expanded;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const tableClass = this.isChild ? CSS.layerChildTable : CSS.layerTable;
        const singleSymbol = ((_b = (_a = this.legendElement) === null || _a === void 0 ? void 0 : _a.infos) === null || _b === void 0 ? void 0 : _b.length) === 1 && !((_e = (_d = (_c = this.activeLayerInfo) === null || _c === void 0 ? void 0 : _c.layer) === null || _d === void 0 ? void 0 : _d.renderer) === null || _e === void 0 ? void 0 : _e.field);
        const tableClasses = (this.isSizeRamp || !this.isChild) && !this.isColorRamp ? ` ${CSS.layerTableSizeRamp}` : '';
        const nonInteractiveClass = !this.isInteractive ? ` ${CSS.nonInteractive}` : '';
        const nestedUniqueSymbolClass = checkNestedUniqueSymbolLegendElement(this.activeLayerInfo) ? ` ${CSS.nestedUniqueSymbol}` : '';
        let expanded = singleSymbol && !this.expanded && !this.zoomTo ? true : this.expanded;
        if (this.isRelationshipRamp) {
            const relationshipRampExpandStates = store.get('relationshipRampExpandStates');
            const expandState = relationshipRampExpandStates[this.activeLayerInfo.layer.id];
            expanded = expandState;
        }
        return (h("div", { key: 'cd76a15dfd77c630708e61535a4d22d66385a4bf', class: `${tableClass}${tableClasses}${nonInteractiveClass}${nestedUniqueSymbolClass}` }, h("div", { key: '24eb28f5fa505d1d4471a750b5273b34af2f3428', id: `${(_g = (_f = this.activeLayerInfo) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id}-legend-element-caption`, class: `${this.isRelationshipRamp || (!this.titleText && !this.zoomTo && singleSymbol) ? 'hide' : 'show'}` }, h("instant-apps-interactive-legend-legend-element-caption", { key: '5ffd04439d1c99251e358afcf077628a780c8e40', ref: node => (this.legendLayerCaption = node), legendvm: this.legendvm, activeLayerInfo: this.activeLayerInfo, layer: this.activeLayerInfo.layer, titleText: this.titleText, legendElement: this.legendElement, legendElementIndex: this.legendElementIndex, zoomTo: this.zoomTo, isInteractive: this.isInteractive, messages: this.messages })), h("div", { key: "content", id: `${(_j = (_h = this.activeLayerInfo) === null || _h === void 0 ? void 0 : _h.layer) === null || _j === void 0 ? void 0 : _j.id}-legend-element-content-${this.legendElementIndex}`, class: `${expanded === false ? 'hide' : 'show'}` }, h("slot", { key: 'c95e14737a003f85f7c494e6d30d9f946bef464a', name: "content" }))));
    }
    static get style() { return InstantAppsInteractiveLegendLegendElementStyle0; }
}, [6, "instant-apps-interactive-legend-legend-element", {
        "activeLayerInfo": [16],
        "isSizeRamp": [4, "is-size-ramp"],
        "isChild": [4, "is-child"],
        "isColorRamp": [4, "is-color-ramp"],
        "isRelationshipRamp": [4, "is-relationship-ramp"],
        "isInteractive": [4, "is-interactive"],
        "zoomTo": [4, "zoom-to"],
        "legendElement": [16],
        "titleText": [1, "title-text"],
        "legendvm": [16],
        "legendElementIndex": [2, "legend-element-index"],
        "messages": [8],
        "expanded": [32]
    }, [[8, "legendLayerExpandUpdated", "legendLayerExpandUpdatedEmitted"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend-legend-element", "calcite-action", "calcite-button", "calcite-icon", "calcite-loader", "calcite-tooltip", "instant-apps-interactive-legend-legend-element-caption"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-legend-element":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendLegendElement);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-button":
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
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "instant-apps-interactive-legend-legend-element-caption":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsInteractiveLegendLegendElement as I, defineCustomElement as d };
