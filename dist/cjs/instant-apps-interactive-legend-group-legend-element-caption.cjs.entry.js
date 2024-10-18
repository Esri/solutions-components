/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const helpers = require('./helpers-415179ad.js');
require('./loadModules-8567855e.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./index-2b13a4d5.js');

const instantAppsInteractiveLegendGroupLegendElementCaptionCss = ".sc-instant-apps-interactive-legend-group-legend-element-caption-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-ui-padding:15px 10px}.sc-instant-apps-interactive-legend-group-legend-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-group-legend-element-caption{overflow:hidden;margin:0;overflow-x:hidden;display:inline-block;font-size:var(--instant-apps-interactive-legend-heading-font-size);font-weight:var(--instant-apps-interactive-legend-heading-font-weight)}.sc-instant-apps-interactive-legend-group-legend-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-group-legend-element-caption header.sc-instant-apps-interactive-legend-group-legend-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-group-legend-element-caption-h header.sc-instant-apps-interactive-legend-group-legend-element-caption{display:flex;text-align:left;padding:var(--instant-apps-interactive-legend-ui-padding);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-group-legend-element-caption-h header.sc-instant-apps-interactive-legend-group-legend-element-caption h3.sc-instant-apps-interactive-legend-group-legend-element-caption{margin-bottom:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:normal;color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-group-legend-element-caption-h header.sc-instant-apps-interactive-legend-group-legend-element-caption .instant-apps-interactive-legend__heading-text--group-item.sc-instant-apps-interactive-legend-group-legend-element-caption{-webkit-line-clamp:2;line-clamp:2}.sc-instant-apps-interactive-legend-group-legend-element-caption-h header.sc-instant-apps-interactive-legend-group-legend-element-caption span.sc-instant-apps-interactive-legend-group-legend-element-caption{width:100%;font-size:var(--instant-apps-interactive-legend-total-feature-count-font-size);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-group-legend-element-caption-h header.sc-instant-apps-interactive-legend-group-legend-element-caption .instant-apps-interactive-legend__header-action-container.sc-instant-apps-interactive-legend-group-legend-element-caption{display:flex;align-items:center}.sc-instant-apps-interactive-legend-group-legend-element-caption-h .esri-widget__heading.sc-instant-apps-interactive-legend-group-legend-element-caption header.sc-instant-apps-interactive-legend-group-legend-element-caption{padding:var(--instant-apps-interactive-legend-ui-padding)}.sc-instant-apps-interactive-legend-group-legend-element-caption-h .esri-widget--panel.sc-instant-apps-interactive-legend-group-legend-element-caption{margin:0}.calcite-mode-dark.sc-instant-apps-interactive-legend-group-legend-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-group-legend-element-caption{background-color:#242424;color:var(--calcite-color-text-1)}.calcite-mode-light.sc-instant-apps-interactive-legend-group-legend-element-caption-h .instant-apps-interactive-legend__header.sc-instant-apps-interactive-legend-group-legend-element-caption{background-color:#ffffff;color:var(--calcite-color-text-1)}";
const InstantAppsInteractiveLegendGroupLegendElementCaptionStyle0 = instantAppsInteractiveLegendGroupLegendElementCaptionCss;

const CSS = {
    label: 'esri-legend__service-label',
    header: 'esri-widget__heading',
    interacitveLegendHeader: 'instant-apps-interactive-legend__header',
    headerActionContainer: 'instant-apps-interactive-legend__header-action-container',
};
const InstantAppsInteractiveLegendGroupLegendElementCaption = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.groupLayerCaptionElementExpandUpdatedEvent = index.createEvent(this, "groupLayerCaptionElementExpandUpdated", 7);
        this.legendvm = undefined;
        this.featureCount = undefined;
        this.activeLayerInfo = undefined;
        this.messages = undefined;
        this.isChild = false;
        this.expanded = true;
    }
    render() {
        var _a, _b, _c, _d;
        const isInteractive = helpers.validateInteractivity(this.activeLayerInfo);
        const { expanded } = this;
        const expandCollapseText = expanded ? (_a = this.messages) === null || _a === void 0 ? void 0 : _a.collapse : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.expand;
        const isChild = this.isChild ? ' instant-apps-interactive-legend__heading-text--group-item' : '';
        return (index.h("header", { key: 'f7fc15a482577d3dc46bf2c75a7e3349d7565654', class: `${CSS.interacitveLegendHeader} ${helpers.getTheme(this.el)}`, style: {
                borderLeft: '1px solid var(--calcite-color-border-3)',
            } }, index.h("span", { key: 'e8652d3efbba23460e516c7a482b9c58711bfd6e' }, index.h("span", { key: '0b3aa10dd2da8634101fca455b5a611f6d3e4436', class: CSS.headerActionContainer }, index.h("calcite-action", { key: '3f311642dd154822d105fa5ecd21bd5cfe7dcf0c', onClick: this.toggleExpanded(), icon: expanded ? 'chevron-down' : 'chevron-up', appearance: "transparent", text: expandCollapseText, label: expandCollapseText, scale: "s" }), index.h("h3", { key: '0d7eb0a5958b4f661772f59faf287836818aaeeb', class: `${CSS.header} ${CSS.label}${isChild}`, title: (_c = this.activeLayerInfo) === null || _c === void 0 ? void 0 : _c.title }, (_d = this.activeLayerInfo) === null || _d === void 0 ? void 0 : _d.title)), this.featureCount && isInteractive ? (index.h("instant-apps-interactive-legend-count", { activeLayerInfo: this.activeLayerInfo, "show-total": true, messages: this.messages, legendvm: this.legendvm })) : null)));
    }
    toggleExpanded() {
        return () => {
            this.expanded = !this.expanded;
            this.groupLayerCaptionElementExpandUpdatedEvent.emit(this.expanded);
        };
    }
    get el() { return index.getElement(this); }
};
InstantAppsInteractiveLegendGroupLegendElementCaption.style = InstantAppsInteractiveLegendGroupLegendElementCaptionStyle0;

exports.instant_apps_interactive_legend_group_legend_element_caption = InstantAppsInteractiveLegendGroupLegendElementCaption;
