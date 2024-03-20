/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const loadModules = require('./loadModules-69fc5b98.js');
const helpers = require('./helpers-81779c18.js');
require('./esri-loader-ce6c3d3d.js');
require('./_commonjsHelpers-480c2e77.js');
require('./index-ae65e42f.js');

const instantAppsInteractiveLegendCountCss = ".sc-instant-apps-interactive-legend-count-h{display:flex;align-items:center}.instant-apps-interactive-legend__info-count-text.sc-instant-apps-interactive-legend-count{font-size:var(--instant-apps-interactive-legend-info-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.calcite-mode-dark.instant-apps-interactive-legend__info-count-text.instant-apps-interactive-legend__info-count-text--selected.sc-instant-apps-interactive-legend-count{color:var(--calcite-color-text-inverse)}html[dir=rtl] .sc-instant-apps-interactive-legend-count-h{margin-left:0;margin-right:auto}";

const CSS$1 = {
    countText: ' instant-apps-interactive-legend__info-count-text',
    countTextSelected: ' instant-apps-interactive-legend__info-count-text--selected',
};
const InstantAppsInteractiveLegendCount = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            index.forceUpdate(this.el);
        });
        observer.observe(this.el, {
            attributes: true,
        });
        const [intl] = await loadModules.loadModules(['esri/intl', 'esri/core/reactiveUtils', 'esri/core/Handles']);
        this.intl = intl;
    }
    render() {
        var _a;
        return (index.h("div", { key: "int-legend-count" }, this.showTotal ? (index.h("span", null, (_a = this.messages) === null || _a === void 0 ? void 0 :
            _a.totalFeatureCount, ": ", this.getTotalFeatureCount())) : (index.h("span", { key: "element-info-count", class: `${CSS$1.countText} ${helpers.getTheme(this.el)}${this.selected ? CSS$1.countTextSelected : ''}` }, this.getCount()))));
    }
    getCount() {
        var _a, _b;
        const { categoryId } = this;
        const layerId = this.activeLayerInfo.layer.id;
        const isSingleElement = (_b = (_a = helpers.interactiveLegendState.data[layerId]) === null || _a === void 0 ? void 0 : _a.categories) === null || _b === void 0 ? void 0 : _b.size;
        if ((!helpers.interactiveLegendState.data || !layerId || !categoryId) && !isSingleElement)
            return '';
        const dataFromActiveLayerInfo = helpers.interactiveLegendState.data[layerId];
        if (!dataFromActiveLayerInfo)
            return;
        const { categories } = dataFromActiveLayerInfo;
        const category = categories.get(categoryId);
        let categoryData;
        if (category === null || category === void 0 ? void 0 : category.nestedInfos) {
            // nested
            categoryData = helpers.getNestedInfoData(category, this.infoIndex);
        }
        else {
            categoryData = category;
        }
        return !isNaN(categoryData === null || categoryData === void 0 ? void 0 : categoryData.count) ? this.intl.formatNumber(categoryData.count) : '';
    }
    getTotalFeatureCount() {
        const layerId = this.activeLayerInfo.layer.id;
        if (!helpers.interactiveLegendState.data || !layerId)
            return '';
        const dataFromActiveLayerInfo = helpers.interactiveLegendState.data[layerId];
        if (!dataFromActiveLayerInfo)
            return;
        const { categories } = dataFromActiveLayerInfo;
        const categoriesArr = helpers.getCategoriesArray(categories);
        const isNestedUniqueSymbol = helpers.checkNestedUniqueSymbol(categories);
        let total;
        if (isNestedUniqueSymbol) {
            // nested
            total = helpers.calculateTotalFeatureCountForNestedSymbols(categoriesArr);
        }
        else {
            if (helpers.checkRelationshipRamp(this.activeLayerInfo)) {
                const layerData = helpers.getIntLegendLayerData(this.activeLayerInfo.layer);
                const categoriesArr = helpers.getCategoriesArray(layerData.categories)[1];
                total = categoriesArr.count;
            }
            else {
                total = helpers.calculateTotalCount(categoriesArr);
            }
        }
        return this.intl.formatNumber(total);
    }
    get el() { return index.getElement(this); }
};
InstantAppsInteractiveLegendCount.style = instantAppsInteractiveLegendCountCss;

const instantAppsInteractiveLegendLayerElementCaptionCss = ".sc-instant-apps-interactive-legend-layer-element-caption-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-ui-padding:15px 10px}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption{overflow:hidden;margin:0;overflow-x:hidden;display:inline-block;font-size:var(--instant-apps-interactive-legend-heading-font-size);font-weight:var(--instant-apps-interactive-legend-heading-font-weight)}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption header.sc-instant-apps-interactive-legend-layer-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption{display:flex;text-align:left;padding:var(--instant-apps-interactive-legend-ui-padding);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption h3.sc-instant-apps-interactive-legend-layer-element-caption{margin-bottom:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:normal;color:var(--instant-apps-interactive-legend-secondary-color);margin-bottom:5px}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption .instant-apps-interactive-legend__heading-text--group-item.sc-instant-apps-interactive-legend-layer-element-caption{-webkit-line-clamp:2;line-clamp:2}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption span.sc-instant-apps-interactive-legend-layer-element-caption{width:100%;font-size:var(--instant-apps-interactive-legend-total-feature-count-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption .instant-apps-interactive-legend__header-action-container.sc-instant-apps-interactive-legend-layer-element-caption{display:flex;align-items:center}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption header.sc-instant-apps-interactive-legend-layer-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget--panel.sc-instant-apps-interactive-legend-layer-element-caption{margin:0}.calcite-mode-dark.sc-instant-apps-interactive-legend-layer-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-layer-element-caption{background-color:#242424;color:var(--calcite-color-text-1)}.calcite-mode-light.sc-instant-apps-interactive-legend-layer-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-layer-element-caption{background-color:#ffffff;color:var(--calcite-color-text-1)}";

const CSS = {
    label: 'esri-legend__service-label',
    header: 'esri-widget__heading',
    interacitveLegendHeader: 'instant-apps-interactive-legend__header',
    headerActionContainer: 'instant-apps-interactive-legend__header-action-container',
};
const InstantAppsInteractiveLegendLayerElementCaption = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.layerCaptionElementExpandUpdatedEvent = index.createEvent(this, "layerCaptionElementExpandUpdated", 7);
        this.legendvm = undefined;
        this.featureCount = undefined;
        this.activeLayerInfo = undefined;
        this.messages = undefined;
        this.isChild = false;
        this.expanded = true;
    }
    render() {
        var _a, _b, _c;
        const isInteractive = helpers.validateInteractivity(this.activeLayerInfo);
        const { expanded } = this;
        const expandCollapseText = expanded ? (_a = this.messages) === null || _a === void 0 ? void 0 : _a.collapse : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.expand;
        const isChild = this.isChild ? ' instant-apps-interactive-legend__heading-text--group-item' : '';
        return (index.h("header", { class: `${CSS.interacitveLegendHeader} ${helpers.getTheme(this.el)}` }, index.h("calcite-action", { onClick: this.toggleExpanded(), icon: expanded ? 'chevron-down' : 'chevron-up', appearance: "transparent", text: expandCollapseText, label: expandCollapseText, scale: "s" }), index.h("span", null, index.h("span", { class: CSS.headerActionContainer }, index.h("h3", { class: `${CSS.header} ${CSS.label}${isChild}` }, (_c = this.activeLayerInfo) === null || _c === void 0 ? void 0 : _c.title)), this.featureCount && isInteractive ? (index.h("instant-apps-interactive-legend-count", { activeLayerInfo: this.activeLayerInfo, "show-total": true, messages: this.messages, legendvm: this.legendvm })) : null)));
    }
    toggleExpanded() {
        return () => {
            this.expanded = !this.expanded;
            this.layerCaptionElementExpandUpdatedEvent.emit(this.expanded);
        };
    }
    get el() { return index.getElement(this); }
};
InstantAppsInteractiveLegendLayerElementCaption.style = instantAppsInteractiveLegendLayerElementCaptionCss;

exports.instant_apps_interactive_legend_count = InstantAppsInteractiveLegendCount;
exports.instant_apps_interactive_legend_layer_element_caption = InstantAppsInteractiveLegendLayerElementCaption;
