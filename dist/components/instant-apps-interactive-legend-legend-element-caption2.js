/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { r as checkNestedUniqueSymbolLegendElement, o as checkRelationshipRamp, a as getParentLegendElementInfoData, z as zoomTo, k as getIntLegendLayerData, s as showAllNestedUniqueSymbol, u as updateStore, t as showAll } from './helpers.js';
import { i as interactiveLegendState, s as store } from './store.js';
import { d as defineCustomElement$5 } from './action.js';
import { d as defineCustomElement$4 } from './button.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';
import { d as defineCustomElement$1 } from './tooltip.js';

const instantAppsInteractiveLegendLegendElementCaptionCss = ".sc-instant-apps-interactive-legend-legend-element-caption-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-caption-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-field-name-font-size:1rem;--instant-apps-interactive-legend-total-feature-count-font-size:0.875rem;--instant-apps-interactive-legend-info-font-size:0.875rem;--instant-apps-interactive-legend-info-item-background--selected:#c7ebff;--instant-apps-interactive-legend-info-item-color--selected:var(--calcite-color-text-2);--instant-apps-interactive-legend-secondary-background-color:var(--calcite-color-background);--instant-apps-interactive-legend-ui-padding:15px 10px}.sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption{display:flex;align-items:center;font-size:var(--instant-apps-interactive-legend-field-name-font-size);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption calcite-action.sc-instant-apps-interactive-legend-legend-element-caption{margin-left:20px}.sc-instant-apps-interactive-legend-legend-element-caption-h .instant-apps-interactive-legend__legend-layer-caption-text.sc-instant-apps-interactive-legend-legend-element-caption{display:inline-block;margin-left:5px;margin-bottom:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:normal}.sc-instant-apps-interactive-legend-legend-element-caption-h .instant-apps-interactive-legend__layer-caption-btn-container.sc-instant-apps-interactive-legend-legend-element-caption{white-space:nowrap}.sc-instant-apps-interactive-legend-legend-element-caption-h .instant-apps-interactive-legend__layer-caption-btn-container.sc-instant-apps-interactive-legend-legend-element-caption calcite-button.sc-instant-apps-interactive-legend-legend-element-caption{margin:2px}.sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption{font-weight:var(--instant-apps-interactive-legend-caption-font-weight);padding:var(--instant-apps-interactive-legend-ui-padding)}html[dir=rtl] .sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption calcite-action.sc-instant-apps-interactive-legend-legend-element-caption{margin-left:unset;margin-right:20px}";
const InstantAppsInteractiveLegendLegendElementCaptionStyle0 = instantAppsInteractiveLegendLegendElementCaptionCss;

const CSS = {
    layerCaption: 'esri-legend__layer-caption',
    layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
    layerCaptionBtnContainerNoText: 'instant-apps-interactive-legend__layer-caption-btn-container--no-text',
    layerCaptionText: 'instant-apps-interactive-legend__legend-layer-caption-text',
};
const InstantAppsInteractiveLegendLegendElementCaption = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendLegendElementCaption extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.showAllSelectedEvent = createEvent(this, "showAllSelected", 7);
        this.legendLayerExpandUpdatedEvent = createEvent(this, "legendLayerExpandUpdated", 7);
        this.legendvm = undefined;
        this.activeLayerInfo = undefined;
        this.layer = undefined;
        this.titleText = undefined;
        this.legendElementIndex = undefined;
        this.zoomTo = undefined;
        this.isInteractive = undefined;
        this.legendElement = undefined;
        this.expanded = true;
        this.messages = undefined;
    }
    render() {
        var _a, _b, _c, _d;
        const isNestedUniqueSymbols = checkNestedUniqueSymbolLegendElement(this.activeLayerInfo);
        const isRelationship = checkRelationshipRamp(this.activeLayerInfo);
        const { expanded } = this;
        return isNestedUniqueSymbols && !this.titleText ? null : (h("div", { class: CSS.layerCaption }, h("calcite-action", { onClick: this.toggleExpanded(), icon: expanded === false ? 'chevron-up' : 'chevron-down', appearance: "transparent", text: expanded === false ? (_a = this.messages) === null || _a === void 0 ? void 0 : _a.expand : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.collapse, label: expanded === false ? (_c = this.messages) === null || _c === void 0 ? void 0 : _c.expand : (_d = this.messages) === null || _d === void 0 ? void 0 : _d.collapse, scale: "s" }), this.isInteractive || isRelationship ? this.renderLegendElementCaptionControls() : null, this.titleText ? h("span", { class: CSS.layerCaptionText, title: this.titleText }, this.titleText) : null));
    }
    renderLegendElementCaptionControls() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const noText = !this.titleText ? ` ${CSS.layerCaptionBtnContainerNoText}` : '';
        const showAllButton = ((_d = (_c = (_a = interactiveLegendState.data) === null || _a === void 0 ? void 0 : _a[(_b = this.layer) === null || _b === void 0 ? void 0 : _b.id]) === null || _c === void 0 ? void 0 : _c.categories) === null || _d === void 0 ? void 0 : _d.size) > 1 ? (h("calcite-button", { key: "show-all-button", id: "showAll", onClick: this.handleShowAll(), "icon-start": "list-check-all", appearance: "outline", round: true, label: (_e = this.messages) === null || _e === void 0 ? void 0 : _e.showAll })) : null;
        const zoomToButton = (h("calcite-button", { key: "zoom-to-button", id: "zoomTo", onClick: this.handleZoomTo(), "icon-start": "magnifying-glass-plus", appearance: "outline", round: true, label: (_f = this.messages) === null || _f === void 0 ? void 0 : _f.zoomTo }));
        return (h("div", { key: "layer-caption-btn-container", class: `${CSS.layerCaptionBtnContainer}${noText}` }, showAllButton, h("calcite-tooltip", { "reference-element": "showAll", placement: "top", label: (_g = this.messages) === null || _g === void 0 ? void 0 : _g.showAll }, (_h = this.messages) === null || _h === void 0 ? void 0 : _h.showAll), this.zoomTo
            ? [
                zoomToButton,
                h("calcite-tooltip", { "reference-element": "zoomTo", placement: "top", label: (_j = this.messages) === null || _j === void 0 ? void 0 : _j.zoomTo }, (_k = this.messages) === null || _k === void 0 ? void 0 : _k.zoomTo),
            ]
            : null));
    }
    toggleExpanded() {
        return () => {
            var _a, _b;
            this.expanded = !this.expanded;
            this.legendLayerExpandUpdatedEvent.emit();
            const relationshipRampElements = (_b = (_a = this.activeLayerInfo) === null || _a === void 0 ? void 0 : _a.legendElements) === null || _b === void 0 ? void 0 : _b.filter(legendElement => legendElement.type === 'relationship-ramp');
            if (relationshipRampElements.length > 0) {
                store.set('relationshipRampExpandStates', Object.assign(Object.assign({}, interactiveLegendState.relationshipRampExpandStates), { [this.activeLayerInfo.layer.id]: this.expanded }));
            }
        };
    }
    handleZoomTo() {
        return () => {
            const data = getIntLegendLayerData(this.layer);
            const nestedCategory = getParentLegendElementInfoData(data, this.legendElement);
            zoomTo(data, this.legendvm.view, nestedCategory);
        };
    }
    handleShowAll() {
        return () => {
            var _a, _b;
            const handleNestedCategory = () => {
                const layerData = showAllNestedUniqueSymbol(data, this.legendElement.title);
                updateStore({ intLegendLayerData: layerData, layerId: this.layer.id });
            };
            const handleCategory = () => {
                const layerData = showAll(data);
                updateStore({ intLegendLayerData: layerData, layerId: this.layer.id });
            };
            const data = (_a = interactiveLegendState.data) === null || _a === void 0 ? void 0 : _a[(_b = this.layer) === null || _b === void 0 ? void 0 : _b.id];
            const nestedCategory = getParentLegendElementInfoData(data, this.legendElement);
            if (nestedCategory) {
                handleNestedCategory();
                return;
            }
            handleCategory();
            this.showAllSelectedEvent.emit();
        };
    }
    get el() { return this; }
    static get style() { return InstantAppsInteractiveLegendLegendElementCaptionStyle0; }
}, [2, "instant-apps-interactive-legend-legend-element-caption", {
        "legendvm": [16],
        "activeLayerInfo": [16],
        "layer": [16],
        "titleText": [1, "title-text"],
        "legendElementIndex": [2, "legend-element-index"],
        "zoomTo": [4, "zoom-to"],
        "isInteractive": [4, "is-interactive"],
        "legendElement": [16],
        "expanded": [1028],
        "messages": [8]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend-legend-element-caption", "calcite-action", "calcite-button", "calcite-icon", "calcite-loader", "calcite-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-legend-element-caption":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendLegendElementCaption);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-button":
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
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsInteractiveLegendLegendElementCaption as I, defineCustomElement as d };
