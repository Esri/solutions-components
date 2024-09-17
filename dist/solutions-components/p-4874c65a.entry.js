/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, f as forceUpdate, h, g as getElement, c as createEvent } from './p-6eb37ed2.js';
import { l as loadModules } from './p-4cd4cb85.js';
import { g as getTheme, i as interactiveLegendState, r as getCategoriesArray, t as checkNestedUniqueSymbol, w as calculateTotalFeatureCountForNestedSymbols, n as checkRelationshipRamp, x as calculateTotalCount, y as getNestedInfoData, l as getIntLegendLayerData, v as validateInteractivity } from './p-336b8f46.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-720a12c0.js';

const instantAppsInteractiveLegendCountCss = ".sc-instant-apps-interactive-legend-count-h{display:flex;align-items:center}.instant-apps-interactive-legend__info-count-text.sc-instant-apps-interactive-legend-count{font-size:var(--instant-apps-interactive-legend-info-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.calcite-mode-dark.instant-apps-interactive-legend__info-count-text.instant-apps-interactive-legend__info-count-text--selected.sc-instant-apps-interactive-legend-count{color:var(--calcite-color-text-inverse)}html[dir=rtl] .sc-instant-apps-interactive-legend-count-h{margin-left:0;margin-right:auto}";
const InstantAppsInteractiveLegendCountStyle0 = instantAppsInteractiveLegendCountCss;

const CSS$1 = {
    countText: ' instant-apps-interactive-legend__info-count-text',
    countTextSelected: ' instant-apps-interactive-legend__info-count-text--selected',
};
const InstantAppsInteractiveLegendCount = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            _a.totalFeatureCount, ": ", this.getTotalFeatureCount())) : (h("span", { key: "element-info-count", class: `${CSS$1.countText} ${getTheme(this.el)}${this.selected ? CSS$1.countTextSelected : ''}` }, this.getCount()))));
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
    get el() { return getElement(this); }
};
InstantAppsInteractiveLegendCount.style = InstantAppsInteractiveLegendCountStyle0;

const instantAppsInteractiveLegendLayerElementCaptionCss = ".sc-instant-apps-interactive-legend-layer-element-caption-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-ui-padding:15px 10px}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption{overflow:hidden;margin:0;overflow-x:hidden;display:inline-block;font-size:var(--instant-apps-interactive-legend-heading-font-size);font-weight:var(--instant-apps-interactive-legend-heading-font-weight)}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption header.sc-instant-apps-interactive-legend-layer-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption{display:flex;text-align:left;padding:var(--instant-apps-interactive-legend-ui-padding);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption h3.sc-instant-apps-interactive-legend-layer-element-caption{margin-bottom:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:normal;color:var(--instant-apps-interactive-legend-secondary-color);margin-bottom:5px}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption .instant-apps-interactive-legend__heading-text--group-item.sc-instant-apps-interactive-legend-layer-element-caption{-webkit-line-clamp:2;line-clamp:2}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption span.sc-instant-apps-interactive-legend-layer-element-caption{width:100%;font-size:var(--instant-apps-interactive-legend-total-feature-count-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-layer-element-caption-h header.sc-instant-apps-interactive-legend-layer-element-caption .instant-apps-interactive-legend__header-action-container.sc-instant-apps-interactive-legend-layer-element-caption{display:flex;align-items:center}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-layer-element-caption header.sc-instant-apps-interactive-legend-layer-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-layer-element-caption-h .esri-widget--panel.sc-instant-apps-interactive-legend-layer-element-caption{margin:0}.calcite-mode-dark.sc-instant-apps-interactive-legend-layer-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-layer-element-caption{background-color:#242424;color:var(--calcite-color-text-1)}.calcite-mode-light.sc-instant-apps-interactive-legend-layer-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-layer-element-caption{background-color:#ffffff;color:var(--calcite-color-text-1)}";
const InstantAppsInteractiveLegendLayerElementCaptionStyle0 = instantAppsInteractiveLegendLayerElementCaptionCss;

const CSS = {
    label: 'esri-legend__service-label',
    header: 'esri-widget__heading',
    interacitveLegendHeader: 'instant-apps-interactive-legend__header',
    headerActionContainer: 'instant-apps-interactive-legend__header-action-container',
};
const InstantAppsInteractiveLegendLayerElementCaption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
};
InstantAppsInteractiveLegendLayerElementCaption.style = InstantAppsInteractiveLegendLayerElementCaptionStyle0;

export { InstantAppsInteractiveLegendCount as instant_apps_interactive_legend_count, InstantAppsInteractiveLegendLayerElementCaption as instant_apps_interactive_legend_layer_element_caption };
