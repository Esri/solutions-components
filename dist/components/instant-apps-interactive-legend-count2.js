/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, forceUpdate, h } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { i as interactiveLegendState } from './store.js';
import { g as getTheme, l as getCategoriesArray, m as checkNestedUniqueSymbol, n as calculateTotalFeatureCountForNestedSymbols, o as checkRelationshipRamp, p as calculateTotalCount, q as getNestedInfoData, k as getIntLegendLayerData } from './helpers.js';

const instantAppsInteractiveLegendCountCss = ".sc-instant-apps-interactive-legend-count-h{display:flex;align-items:center}.instant-apps-interactive-legend__info-count-text.sc-instant-apps-interactive-legend-count{font-size:var(--instant-apps-interactive-legend-info-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.calcite-mode-dark.instant-apps-interactive-legend__info-count-text.instant-apps-interactive-legend__info-count-text--selected.sc-instant-apps-interactive-legend-count{color:var(--calcite-color-text-inverse)}html[dir=rtl] .sc-instant-apps-interactive-legend-count-h{margin-left:0;margin-right:auto}";
const InstantAppsInteractiveLegendCountStyle0 = instantAppsInteractiveLegendCountCss;

const CSS = {
    countText: ' instant-apps-interactive-legend__info-count-text',
    countTextSelected: ' instant-apps-interactive-legend__info-count-text--selected',
};
const InstantAppsInteractiveLegendCount = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendCount extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.showTotal = false;
        this.legendvm = undefined;
        this.activeLayerInfo = undefined;
        this.categoryId = undefined;
        this.infoIndex = undefined;
        this.messages = undefined;
        this.selected = undefined;
        this.legendElement = undefined;
    }
    async componentWillLoad() {
        const observer = new MutationObserver(() => {
            forceUpdate(this.el);
        });
        observer.observe(this.el, {
            attributes: true,
        });
        const [intl] = await loadModules(['esri/intl', 'esri/core/reactiveUtils', 'esri/core/Handles']);
        this.intl = intl;
    }
    render() {
        var _a;
        return (h("div", { key: "int-legend-count" }, this.showTotal ? (h("span", null, (_a = this.messages) === null || _a === void 0 ? void 0 :
            _a.totalFeatureCount, ": ", this.getTotalFeatureCount())) : (h("span", { key: "element-info-count", class: `${CSS.countText} ${getTheme(this.el)}${this.selected ? CSS.countTextSelected : ''}` }, this.getCount()))));
    }
    getCount() {
        var _a, _b;
        const { categoryId } = this;
        const layerId = this.activeLayerInfo.layer.id;
        const isSingleElement = (_b = (_a = interactiveLegendState.data[layerId]) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b.size;
        if ((!interactiveLegendState.data || !layerId || !categoryId) && !isSingleElement)
            return '';
        const dataFromActiveLayerInfo = interactiveLegendState.data[layerId];
        if (!dataFromActiveLayerInfo)
            return;
        const { categories } = dataFromActiveLayerInfo;
        const category = categories.get(categoryId);
        let categoryData;
        if (category === null || category === void 0 ? void 0 : category.nestedInfos) {
            // nested
            categoryData = getNestedInfoData(category, this.infoIndex);
        }
        else {
            categoryData = category;
        }
        return !isNaN(categoryData === null || categoryData === void 0 ? void 0 : categoryData.count) ? this.intl.formatNumber(categoryData.count) : '';
    }
    getTotalFeatureCount() {
        const layerId = this.activeLayerInfo.layer.id;
        if (!interactiveLegendState.data || !layerId)
            return '';
        const dataFromActiveLayerInfo = interactiveLegendState.data[layerId];
        if (!dataFromActiveLayerInfo)
            return;
        const { categories } = dataFromActiveLayerInfo;
        const categoriesArr = getCategoriesArray(categories);
        const isNestedUniqueSymbol = checkNestedUniqueSymbol(categories);
        let total;
        if (isNestedUniqueSymbol) {
            // nested
            total = calculateTotalFeatureCountForNestedSymbols(categoriesArr);
        }
        else {
            if (checkRelationshipRamp(this.activeLayerInfo)) {
                const layerData = getIntLegendLayerData(this.activeLayerInfo.layer);
                const categoriesArr = getCategoriesArray(layerData.categories)[1];
                total = categoriesArr.count;
            }
            else {
                total = calculateTotalCount(categoriesArr);
            }
        }
        return this.intl.formatNumber(total);
    }
    get el() { return this; }
    static get style() { return InstantAppsInteractiveLegendCountStyle0; }
}, [2, "instant-apps-interactive-legend-count", {
        "showTotal": [4, "show-total"],
        "legendvm": [16],
        "activeLayerInfo": [16],
        "categoryId": [1, "category-id"],
        "infoIndex": [2, "info-index"],
        "messages": [8],
        "selected": [4],
        "legendElement": [16]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend-count"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-count":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendCount);
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsInteractiveLegendCount as I, defineCustomElement as d };
