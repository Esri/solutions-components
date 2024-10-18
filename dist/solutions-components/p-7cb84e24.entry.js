/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, f as forceUpdate, h, g as getElement, c as createEvent } from './p-4e6eb06e.js';
import { g as getTheme, m as checkNestedUniqueSymbolLegendElement, s as store, i as interactiveLegendState, a as getParentLegendElementInfoData, z as zoomTo, n as checkRelationshipRamp, l as getIntLegendLayerData, o as showAllNestedUniqueSymbol, u as updateStore, p as showAll, q as getMergedEffect } from './p-402301cb.js';
import { l as loadModules } from './p-4cd4cb85.js';
import './p-dc9d4be3.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';

const instantAppsInteractiveLegendGroupLegendElementCss = ".sc-instant-apps-interactive-legend-group-legend-element-h{display:block}.sc-instant-apps-interactive-legend-group-legend-element-h .esri-legend__service.sc-instant-apps-interactive-legend-group-legend-element{margin:0;padding:0}.sc-instant-apps-interactive-legend-group-legend-element-h .hide.sc-instant-apps-interactive-legend-group-legend-element{display:none}";
const InstantAppsInteractiveLegendGroupLegendElementStyle0 = instantAppsInteractiveLegendGroupLegendElementCss;

const CSS$4 = {
    service: 'esri-legend__service',
    groupLayer: 'esri-legend__group-layer',
    groupContent: 'esri-legend__group-content',
};
const InstantAppsInteractiveLegendGroupLegendElement = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            }, class: `${CSS$4.service} ${CSS$4.groupLayer}` }, h("instant-apps-interactive-legend-layer-element-caption", { key: 'bc80abe473c1b47920a78b072033d5b214f7822c', ref: node => (this.layerCaption = node), class: getTheme(this.el), legendvm: this.legendvm, "feature-count": this.featureCount, activeLayerInfo: this.activeLayerInfo, messages: this.messages, isChild: this.isChild }), h("div", { key: 'cf6dc1620eb0a95430129b9d414a9f6b893b61c2', class: `${CSS$4.groupContent} ${this.expanded === false ? 'hide' : 'show'}` }, h("slot", { key: 'f346b52020e3cf4e3a072fdfa17a3762676aba53', name: "content" }))));
    }
    get el() { return getElement(this); }
};
InstantAppsInteractiveLegendGroupLegendElement.style = InstantAppsInteractiveLegendGroupLegendElementStyle0;

const instantAppsInteractiveLegendLayerElementCss = ".sc-instant-apps-interactive-legend-layer-element-h{display:block}.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__service.sc-instant-apps-interactive-legend-layer-element{padding:0}.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer-body.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer-table.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__group-layer-child.sc-instant-apps-interactive-legend-layer-element,.sc-instant-apps-interactive-legend-layer-element-h .esri-legend__layer-child-table.sc-instant-apps-interactive-legend-layer-element{margin:0;overflow:hidden}.sc-instant-apps-interactive-legend-layer-element-h .hide.sc-instant-apps-interactive-legend-layer-element{display:none}";
const InstantAppsInteractiveLegendLayerElementStyle0 = instantAppsInteractiveLegendLayerElementCss;

const CSS$3 = {
    service: 'esri-legend__service',
    groupLayerChild: 'esri-legend__group-layer-child',
    layer: 'esri-legend__layer',
};
const InstantAppsInteractiveLegendLayerElement = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        const layerClasses = !!this.activeLayerInfo.parent ? ` ${CSS$3.groupLayerChild}` : '';
        return (h("div", { key: '45305a415db8ba0a08ab69de820ff6b8711e1cee', style: {
                borderLeft: '1px solid var(--calcite-color-border-3)',
            }, class: `${CSS$3.service}${layerClasses}`, tabIndex: 0 }, h("instant-apps-interactive-legend-layer-element-caption", { key: '7babce8571540883bca9e0ff07c0a152cbb30fbb', ref: node => (this.layerCaption = node), legendvm: this.legendvm, "feature-count": this.featureCount, activeLayerInfo: this.activeLayerInfo, messages: this.messages, isChild: !!this.isChild, class: getTheme(this.el) }), h("div", { key: 'c021d9c441c407d5fac6f246eb9f4b6ce76bcaa5', id: `${(_b = (_a = this.activeLayerInfo) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.id}-legend-layer`, class: `${CSS$3.layer}${this.expanded === false ? ' hide' : ' show'}` }, h("slot", { key: '761834066d924654c87a39601c1670625c88d863', name: "content" }))));
    }
    get el() { return getElement(this); }
};
InstantAppsInteractiveLegendLayerElement.style = InstantAppsInteractiveLegendLayerElementStyle0;

const instantAppsInteractiveLegendLegendElementCss = ".sc-instant-apps-interactive-legend-legend-element-h{display:block}.sc-instant-apps-interactive-legend-legend-element-h .esri-legend__layer-table.sc-instant-apps-interactive-legend-legend-element,.sc-instant-apps-interactive-legend-legend-element-h .instant-apps-interactive-legend__nested-unique-symbol.sc-instant-apps-interactive-legend-legend-element{margin:0}.sc-instant-apps-interactive-legend-legend-element-h .hide.sc-instant-apps-interactive-legend-legend-element{display:none}";
const InstantAppsInteractiveLegendLegendElementStyle0 = instantAppsInteractiveLegendLegendElementCss;

const CSS$2 = {
    layerTableSizeRamp: 'esri-legend__layer-table--size-ramp',
    layerChildTable: 'esri-legend__layer-child-table',
    layerTable: 'esri-legend__layer-table',
    nestedUniqueSymbol: 'instant-apps-interactive-legend__nested-unique-symbol',
    nonInteractive: 'instant-apps-interactive-legend__non-interactive',
};
const InstantAppsInteractiveLegendLegendElement = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        const tableClass = this.isChild ? CSS$2.layerChildTable : CSS$2.layerTable;
        const singleSymbol = ((_b = (_a = this.legendElement) === null || _a === void 0 ? void 0 : _a.infos) === null || _b === void 0 ? void 0 : _b.length) === 1 && !((_e = (_d = (_c = this.activeLayerInfo) === null || _c === void 0 ? void 0 : _c.layer) === null || _d === void 0 ? void 0 : _d.renderer) === null || _e === void 0 ? void 0 : _e.field);
        const tableClasses = (this.isSizeRamp || !this.isChild) && !this.isColorRamp ? ` ${CSS$2.layerTableSizeRamp}` : '';
        const nonInteractiveClass = !this.isInteractive ? ` ${CSS$2.nonInteractive}` : '';
        const nestedUniqueSymbolClass = checkNestedUniqueSymbolLegendElement(this.activeLayerInfo) ? ` ${CSS$2.nestedUniqueSymbol}` : '';
        let expanded = singleSymbol && !this.expanded && !this.zoomTo ? true : this.expanded;
        if (this.isRelationshipRamp) {
            const relationshipRampExpandStates = store.get('relationshipRampExpandStates');
            const expandState = relationshipRampExpandStates[this.activeLayerInfo.layer.id];
            expanded = expandState;
        }
        return (h("div", { key: 'cd76a15dfd77c630708e61535a4d22d66385a4bf', class: `${tableClass}${tableClasses}${nonInteractiveClass}${nestedUniqueSymbolClass}` }, h("div", { key: '24eb28f5fa505d1d4471a750b5273b34af2f3428', id: `${(_g = (_f = this.activeLayerInfo) === null || _f === void 0 ? void 0 : _f.layer) === null || _g === void 0 ? void 0 : _g.id}-legend-element-caption`, class: `${this.isRelationshipRamp || (!this.titleText && !this.zoomTo && singleSymbol) ? 'hide' : 'show'}` }, h("instant-apps-interactive-legend-legend-element-caption", { key: '5ffd04439d1c99251e358afcf077628a780c8e40', ref: node => (this.legendLayerCaption = node), legendvm: this.legendvm, activeLayerInfo: this.activeLayerInfo, layer: this.activeLayerInfo.layer, titleText: this.titleText, legendElement: this.legendElement, legendElementIndex: this.legendElementIndex, zoomTo: this.zoomTo, isInteractive: this.isInteractive, messages: this.messages })), h("div", { key: "content", id: `${(_j = (_h = this.activeLayerInfo) === null || _h === void 0 ? void 0 : _h.layer) === null || _j === void 0 ? void 0 : _j.id}-legend-element-content-${this.legendElementIndex}`, class: `${expanded === false ? 'hide' : 'show'}` }, h("slot", { key: 'c95e14737a003f85f7c494e6d30d9f946bef464a', name: "content" }))));
    }
};
InstantAppsInteractiveLegendLegendElement.style = InstantAppsInteractiveLegendLegendElementStyle0;

const instantAppsInteractiveLegendLegendElementCaptionCss = ".sc-instant-apps-interactive-legend-legend-element-caption-h{display:block;--instant-apps-interactive-legend-heading-font-size:1rem;--instant-apps-interactive-legend-heading-font-weight:normal;--instant-apps-interactive-legend-caption-font-weight:normal;--instant-apps-interactive-legend-secondary-color:var(--calcite-color-text-1);--instant-apps-interactive-legend-field-name-font-size:1rem;--instant-apps-interactive-legend-total-feature-count-font-size:0.875rem;--instant-apps-interactive-legend-info-font-size:0.875rem;--instant-apps-interactive-legend-info-item-background--selected:#c7ebff;--instant-apps-interactive-legend-info-item-color--selected:var(--calcite-color-text-2);--instant-apps-interactive-legend-secondary-background-color:var(--calcite-color-background);--instant-apps-interactive-legend-ui-padding:15px 10px}.sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption{display:flex;align-items:center;font-size:var(--instant-apps-interactive-legend-field-name-font-size);background-color:var(--instant-apps-interactive-legend-secondary-background-color);color:var(--instant-apps-interactive-legend-secondary-color)}.sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption calcite-action.sc-instant-apps-interactive-legend-legend-element-caption{margin-left:20px}.sc-instant-apps-interactive-legend-legend-element-caption-h .instant-apps-interactive-legend__legend-layer-caption-text.sc-instant-apps-interactive-legend-legend-element-caption{display:inline-block;margin-left:5px;margin-bottom:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;line-height:normal}.sc-instant-apps-interactive-legend-legend-element-caption-h .instant-apps-interactive-legend__layer-caption-btn-container.sc-instant-apps-interactive-legend-legend-element-caption{white-space:nowrap}.sc-instant-apps-interactive-legend-legend-element-caption-h .instant-apps-interactive-legend__layer-caption-btn-container.sc-instant-apps-interactive-legend-legend-element-caption calcite-button.sc-instant-apps-interactive-legend-legend-element-caption{margin:2px}.sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption{font-weight:var(--instant-apps-interactive-legend-caption-font-weight);padding:var(--instant-apps-interactive-legend-ui-padding)}html[dir=rtl] .sc-instant-apps-interactive-legend-legend-element-caption-h .esri-legend__layer-caption.sc-instant-apps-interactive-legend-legend-element-caption calcite-action.sc-instant-apps-interactive-legend-legend-element-caption{margin-left:unset;margin-right:20px}";
const InstantAppsInteractiveLegendLegendElementCaptionStyle0 = instantAppsInteractiveLegendLegendElementCaptionCss;

const CSS$1 = {
    layerCaption: 'esri-legend__layer-caption',
    layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
    layerCaptionBtnContainerNoText: 'instant-apps-interactive-legend__layer-caption-btn-container--no-text',
    layerCaptionText: 'instant-apps-interactive-legend__legend-layer-caption-text',
};
const InstantAppsInteractiveLegendLegendElementCaption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return isNestedUniqueSymbols && !this.titleText ? null : (h("div", { class: CSS$1.layerCaption }, h("calcite-action", { onClick: this.toggleExpanded(), icon: expanded === false ? 'chevron-up' : 'chevron-down', appearance: "transparent", text: expanded === false ? (_a = this.messages) === null || _a === void 0 ? void 0 : _a.expand : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.collapse, label: expanded === false ? (_c = this.messages) === null || _c === void 0 ? void 0 : _c.expand : (_d = this.messages) === null || _d === void 0 ? void 0 : _d.collapse, scale: "s" }), this.isInteractive || isRelationship ? this.renderLegendElementCaptionControls() : null, this.titleText ? h("span", { class: CSS$1.layerCaptionText, title: this.titleText }, this.titleText) : null));
    }
    renderLegendElementCaptionControls() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const noText = !this.titleText ? ` ${CSS$1.layerCaptionBtnContainerNoText}` : '';
        const showAllButton = ((_d = (_c = (_a = interactiveLegendState.data) === null || _a === void 0 ? void 0 : _a[(_b = this.layer) === null || _b === void 0 ? void 0 : _b.id]) === null || _c === void 0 ? void 0 : _c.categories) === null || _d === void 0 ? void 0 : _d.size) > 1 ? (h("calcite-button", { key: "show-all-button", id: "showAll", onClick: this.handleShowAll(), "icon-start": "list-check-all", appearance: "outline", round: true, label: (_e = this.messages) === null || _e === void 0 ? void 0 : _e.showAll })) : null;
        const zoomToButton = (h("calcite-button", { key: "zoom-to-button", id: "zoomTo", onClick: this.handleZoomTo(), "icon-start": "magnifying-glass-plus", appearance: "outline", round: true, label: (_f = this.messages) === null || _f === void 0 ? void 0 : _f.zoomTo }));
        return (h("div", { key: "layer-caption-btn-container", class: `${CSS$1.layerCaptionBtnContainer}${noText}` }, showAllButton, h("calcite-tooltip", { "reference-element": "showAll", placement: "top", label: (_g = this.messages) === null || _g === void 0 ? void 0 : _g.showAll }, (_h = this.messages) === null || _h === void 0 ? void 0 : _h.showAll), this.zoomTo
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
    get el() { return getElement(this); }
};
InstantAppsInteractiveLegendLegendElementCaption.style = InstantAppsInteractiveLegendLegendElementCaptionStyle0;

const instantAppsInteractiveLegendRelationshipCss = ".sc-instant-apps-interactive-legend-relationship-h{display:block}.sc-instant-apps-interactive-legend-relationship-h .instant-apps-interactive-legend-relationship__instructional-text.sc-instant-apps-interactive-legend-relationship{display:inline-block;width:100%;text-align:center;margin-bottom:10px;background-color:#d2e9f9}.calcite-mode-dark .sc-instant-apps-interactive-legend-relationship-h .instant-apps-interactive-legend-relationship__instructional-text.sc-instant-apps-interactive-legend-relationship{background-color:var(--calcite-color-brand);color:#151515}";
const InstantAppsInteractiveLegendRelationshipStyle0 = instantAppsInteractiveLegendRelationshipCss;

const RELATIONSHIP_DIAMOND_SELECTOR = '.esri-relationship-ramp--diamond__middle-column--ramp svg g';
const CSS = {
    instructionalText: 'instant-apps-interactive-legend-relationship__instructional-text',
};
const InstantAppsInteractiveLegendRelationship = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.cellNodeCounter = 0;
        this.filterMode = undefined;
        this.activeLayerInfo = undefined;
        this.legendElement = undefined;
        this.messages = undefined;
    }
    applyInteractivity() {
        this.applyRelationshipRampInteractivity();
    }
    showAllSelectedEmitted() {
        const cleared = interactiveLegendState.data[this.activeLayerInfo.layer.id].queryExpressions.length === 0;
        const gNode = this.relationshipRamp.querySelector(RELATIONSHIP_DIAMOND_SELECTOR);
        const children = gNode.children;
        const cellGroup = children ? Array.from(children) : null;
        if (cleared) {
            cellGroup === null || cellGroup === void 0 ? void 0 : cellGroup.forEach(cell => {
                cell.removeAttribute('stroke');
                cell.removeAttribute('stroke-width');
                cell.removeAttribute('stroke-opacity');
                cell.classList.remove('esri-interactive-legend--selected-cell');
            });
        }
    }
    async componentWillLoad() {
        const [symbolUtils] = await loadModules(['esri/symbols/support/symbolUtils']);
        this.symbolUtils = symbolUtils;
    }
    render() {
        var _a, _b;
        return (h("div", { key: '8b7054296e51e501b5378804dc6055acd113fbfa', ref: (node) => {
                const styleSheet = node === null || node === void 0 ? void 0 : node.querySelector('relationshipStyles');
                if (!styleSheet) {
                    const css = document.createElement('style');
                    css.id = 'relationshipStyles';
                    css.innerHTML = `
                rect:hover {
                  cursor: pointer;
                  opacity: 0.8;
                }
          `;
                    node === null || node === void 0 ? void 0 : node.appendChild(css);
                }
            } }, h("span", { key: '7cd336ef09492b5fc016657a61991f2f255a0b4a', class: CSS.instructionalText }, (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.relationship) === null || _b === void 0 ? void 0 : _b.instructionalText), this.renderRelationshipRamp()));
    }
    renderRelationshipRamp() {
        var _a;
        const renderer = ((_a = this.activeLayerInfo) === null || _a === void 0 ? void 0 : _a.layer).renderer;
        const relationshipRamp = this.symbolUtils.renderRelationshipRampPreviewHTML(renderer);
        const outerHTML = relationshipRamp === null || relationshipRamp === void 0 ? void 0 : relationshipRamp.outerHTML;
        return (h("div", { ref: (node) => {
                this.relationshipRamp = node;
                this.applyRelationshipRampInteractivity();
            }, key: "relationship-ramp-diamond", innerHTML: `${outerHTML}` }));
    }
    applyRelationshipRampInteractivity() {
        if (!this.relationshipRamp || !this.activeLayerInfo || !this.legendElement || !interactiveLegendState.data)
            return;
        let intervalId = setInterval(() => {
            const gNode = this.relationshipRamp.querySelector(RELATIONSHIP_DIAMOND_SELECTOR);
            if (gNode) {
                clearInterval(intervalId);
                const rampSVG = gNode.children;
                this.setupRelationshipDrawingStyle(rampSVG);
            }
        }, 10);
    }
    setupRelationshipDrawingStyle(rampSVG) {
        const cellGroup = rampSVG ? Array.from(rampSVG) : null;
        if (!cellGroup)
            return;
        cellGroup.map((cell, cellIndex) => {
            var _a, _b;
            const uvInfos = ((_b = (_a = this.activeLayerInfo) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.renderer).uniqueValueInfos;
            if (uvInfos[cellIndex]) {
                const color = uvInfos[cellIndex].symbol.color;
                uvInfos.forEach((uvInfo, index) => {
                    const itemColor = uvInfo.symbol.color;
                    const match = color.r === itemColor.r && color.g === itemColor.g && color.b === itemColor.b && color.a === itemColor.a;
                    if (match)
                        this.setCellAttributes(cell, index);
                });
                cell.classList.add('esri-interactive-legend__svg-rect-element');
            }
        });
        const cellItems = this.reorderCellNodes(cellGroup);
        this.attachFeatureIndexes(cellItems);
        this.applyEventHandlers();
    }
    setCellAttributes(cell, index) {
        const fLayer = this.activeLayerInfo.layer;
        const uvInfo = fLayer.renderer.uniqueValueInfos;
        const newIndex = this.generateIndexPattern(index);
        if (uvInfo[newIndex]) {
            cell.setAttribute('data-color', `${uvInfo[newIndex].symbol.color}`);
            cell.setAttribute('data-cell-index', `${newIndex}`);
            cell.setAttribute('tabindex', '0');
        }
    }
    generateIndexPattern(index) {
        const { focus, numClasses } = this.legendElement;
        if (focus === 'HL') {
            return index;
        }
        return numClasses === 2 ? this.twoClasses(index, focus) : numClasses === 3 ? this.threeClasses(index, focus) : numClasses === 4 ? this.fourClasses(index, focus) : null;
    }
    // _twoClasses
    twoClasses(index, focus) {
        if (focus === 'HH' || focus === null) {
            return index === 0 || index === 2 ? index + 1 : index === 1 || index === 3 ? index - 1 : null;
        }
        else if (focus === 'LH') {
            return index === 0 ? index + 3 : index === 1 ? index + 1 : index === 2 ? index - 1 : index === 3 ? index - 3 : index === 4 ? index + 0 : null;
        }
        else if (focus === 'LL') {
            return index === 0 || index === 1 ? index + 2 : index === 2 || index === 3 ? index - 2 : null;
        }
    }
    // _threeClasses
    threeClasses(index, focus) {
        if (focus === 'HH' || focus === null) {
            return index === 0 || index === 3 || index === 6 ? index + 2 : index === 2 || index === 5 || index === 8 ? index - 2 : index;
        }
        else if (focus === 'LH') {
            return index === 0
                ? index + 8
                : index === 1
                    ? index + 6
                    : index === 2
                        ? index + 4
                        : index === 3
                            ? index + 2
                            : index === 5
                                ? index - 2
                                : index === 6
                                    ? index - 4
                                    : index === 7
                                        ? index - 6
                                        : index === 8
                                            ? index - 8
                                            : index;
        }
        else if (focus === 'LL') {
            return index === 0 || index === 1 || index === 2 ? index + 6 : index === 6 || index === 7 || index === 8 ? index - 6 : index;
        }
    }
    // _fourNumClasses
    fourClasses(index, focus) {
        if (focus === 'HH' || focus === null) {
            return index === 0 || index === 4 || index === 8 || index === 12
                ? index + 3
                : index === 1 || index === 5 || index === 9 || index === 13
                    ? index + 1
                    : index === 2 || index === 6 || index === 10 || index === 14
                        ? index - 1
                        : index === 3 || index === 7 || index === 11 || index === 15
                            ? index - 3
                            : null;
        }
        else if (focus === 'LH') {
            return index === 0
                ? index + 15
                : index === 1
                    ? index + 13
                    : index === 2
                        ? index + 11
                        : index === 3
                            ? index + 9
                            : index === 4
                                ? index + 7
                                : index === 5
                                    ? index + 5
                                    : index === 6
                                        ? index + 3
                                        : index === 7
                                            ? index + 1
                                            : index === 8
                                                ? index - 1
                                                : index === 9
                                                    ? index - 3
                                                    : index === 10
                                                        ? index - 5
                                                        : index === 11
                                                            ? index - 7
                                                            : index === 12
                                                                ? index - 9
                                                                : index === 13
                                                                    ? index - 11
                                                                    : index === 14
                                                                        ? index - 13
                                                                        : index === 15
                                                                            ? index - 15
                                                                            : null;
        }
        else if (focus === 'LL') {
            return index === 0 || index === 1 || index === 2 || index === 3
                ? index + 12
                : index === 4 || index === 5 || index === 6 || index === 7
                    ? index + 4
                    : index === 8 || index === 9 || index === 10 || index === 11
                        ? index - 4
                        : index === 12 || index === 13 || index === 14 || index === 15
                            ? index - 12
                            : null;
        }
    }
    reorderCellNodes(cellGroup) {
        const cellItems = [];
        while (this.cellNodeCounter <= cellGroup.length - 1) {
            cellGroup.map(cell => {
                if (parseInt(cell.getAttribute('data-cell-index')) === this.cellNodeCounter) {
                    cellItems.push(cell);
                }
            });
            this.cellNodeCounter++;
        }
        this.cellNodeCounter = 0;
        return cellItems;
    }
    attachFeatureIndexes(cellItems) {
        const { focus, numClasses } = this.legendElement;
        focus === 'HH' || focus === null
            ? this.relationshipFocusIsHighHigh(cellItems, numClasses)
            : focus === 'LL'
                ? this.relationshipFocusIsLowLow(cellItems, numClasses)
                : focus === 'LH'
                    ? this.relationshipFocusIsLowHigh(cellItems, numClasses)
                    : focus === 'HL'
                        ? this.relationshipFocusIsHighLow(cellItems, numClasses)
                        : null;
        this.cellNodeCounter = 0;
    }
    // _relationshipFocusIsHighHigh
    relationshipFocusIsHighHigh(cellItems, numClasses) {
        for (let i = numClasses - 1; i >= 0; i--) {
            for (let j = numClasses - 1; j >= 0; j--) {
                this.setDataAttributes(cellItems, i, j, numClasses);
                this.cellNodeCounter++;
            }
        }
    }
    // _relationshipFocusIsLowLow
    relationshipFocusIsLowLow(cellItems, numClasses) {
        for (let i = 0; i < numClasses; i++) {
            for (let j = 0; j < numClasses; j++) {
                this.setDataAttributes(cellItems, i, j, numClasses);
                this.cellNodeCounter++;
            }
        }
    }
    // _relationshipFocusIsLowHigh
    relationshipFocusIsLowHigh(cellItems, numClasses) {
        for (let i = 0; i < numClasses; i++) {
            for (let j = numClasses - 1; j >= 0; j--) {
                this.setDataAttributes(cellItems, i, j, numClasses);
                this.cellNodeCounter++;
            }
        }
    }
    // _relationshipFocusIsHighLow
    relationshipFocusIsHighLow(cellItems, numClasses) {
        for (let j = numClasses - 1; j >= 0; j--) {
            for (let i = 0; i < numClasses; i++) {
                this.setDataAttributes(cellItems, i, j, numClasses);
                this.cellNodeCounter++;
            }
        }
    }
    // _setDataAttributes
    setDataAttributes(cellItems, i, j, numClasses) {
        const rawNode = cellItems[this.cellNodeCounter];
        if (numClasses === 2) {
            this.twoClassAttributes(rawNode, i, j);
        }
        else if (numClasses === 3) {
            this.threeClassAttributes(rawNode, i, j);
        }
        else {
            this.fourClassAttributes(rawNode, i, j);
        }
    }
    // _twoClassAttributes
    twoClassAttributes(rawNode, i, j) {
        const { legendElement } = this;
        if (this.cellNodeCounter === 0 || this.cellNodeCounter === 3) {
            legendElement.focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
        }
        else {
            legendElement.focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
        }
    }
    // _threeClassAttributes
    threeClassAttributes(rawNode, i, j) {
        const { legendElement } = this;
        if (this.cellNodeCounter === 1 || this.cellNodeCounter === 3 || this.cellNodeCounter === 5 || this.cellNodeCounter === 7) {
            legendElement.focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
        }
        else {
            legendElement.focus !== 'HL' ? this.setDataFeatureIndexes(rawNode, i, j) : this.swapDataFeatureIndexes(rawNode, i, j);
        }
    }
    // _fourClassAttributes
    fourClassAttributes(rawNode, i, j) {
        const { legendElement } = this;
        const { focus } = legendElement;
        if (this.cellNodeCounter === 1 ||
            this.cellNodeCounter === 2 ||
            this.cellNodeCounter === 4 ||
            this.cellNodeCounter === 5 ||
            this.cellNodeCounter === 7 ||
            this.cellNodeCounter === 8 ||
            this.cellNodeCounter === 10 ||
            this.cellNodeCounter === 11 ||
            this.cellNodeCounter === 13 ||
            this.cellNodeCounter === 14) {
            focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
        }
        else {
            focus !== 'HL' ? this.setDataFeatureIndexes(rawNode, i, j) : this.swapDataFeatureIndexes(rawNode, i, j);
        }
    }
    setDataFeatureIndexes(rawNode, i, j) {
        rawNode.setAttribute('data-feature-i', `${i}`);
        rawNode.setAttribute('data-feature-j', `${j}`);
        this.setDataCellFocus(rawNode, i, j);
    }
    swapDataFeatureIndexes(rawNode, i, j) {
        rawNode.setAttribute('data-feature-i', `${j}`);
        rawNode.setAttribute('data-feature-j', `${i}`);
        this.setDataCellFocus(rawNode, j, i);
    }
    setDataCellFocus(rawNode, i, j) {
        const { numClasses } = this.legendElement;
        if (numClasses === 2) {
            this.setDataCellFocusForTwoClasses(rawNode, i, j);
        }
        else if (numClasses === 3) {
            this.setDataCellFocusForThreeClasses(rawNode, i, j);
        }
        else if (numClasses === 4) {
            this.setDataCellFocusForFourClasses(rawNode, i, j);
        }
    }
    setDataCellFocusForTwoClasses(rawNode, i, j) {
        i === 0 && j === 0
            ? rawNode.setAttribute('data-cell-focus', 'LL')
            : i === 0 && j === 1
                ? rawNode.setAttribute('data-cell-focus', 'LH')
                : i === 1 && j === 0
                    ? rawNode.setAttribute('data-cell-focus', 'HL')
                    : i === 1 && j === 1
                        ? rawNode.setAttribute('data-cell-focus', 'HH')
                        : null;
    }
    setDataCellFocusForThreeClasses(rawNode, i, j) {
        i === 0 && j === 0
            ? rawNode.setAttribute('data-cell-focus', 'LL')
            : i === 0 && j === 1
                ? rawNode.setAttribute('data-cell-focus', 'LM')
                : i === 0 && j === 2
                    ? rawNode.setAttribute('data-cell-focus', 'LH')
                    : i === 1 && j === 0
                        ? rawNode.setAttribute('data-cell-focus', 'ML')
                        : i === 1 && j === 1
                            ? rawNode.setAttribute('data-cell-focus', 'MM')
                            : i === 1 && j === 2
                                ? rawNode.setAttribute('data-cell-focus', 'MH')
                                : i === 2 && j === 0
                                    ? rawNode.setAttribute('data-cell-focus', 'HL')
                                    : i === 2 && j === 1
                                        ? rawNode.setAttribute('data-cell-focus', 'HM')
                                        : i === 2 && j === 2
                                            ? rawNode.setAttribute('data-cell-focus', 'HH')
                                            : null;
    }
    setDataCellFocusForFourClasses(rawNode, i, j) {
        i === 0 && j === 0
            ? rawNode.setAttribute('data-cell-focus', 'LL')
            : i === 0 && j === 1
                ? rawNode.setAttribute('data-cell-focus', 'LM1')
                : i === 0 && j === 2
                    ? rawNode.setAttribute('data-cell-focus', 'LM2')
                    : i === 0 && j === 3
                        ? rawNode.setAttribute('data-cell-focus', 'LH')
                        : i === 1 && j === 0
                            ? rawNode.setAttribute('data-cell-focus', 'M1L')
                            : i === 1 && j === 1
                                ? rawNode.setAttribute('data-cell-focus', 'M1M1')
                                : i === 1 && j === 2
                                    ? rawNode.setAttribute('data-cell-focus', 'M1M2')
                                    : i === 1 && j === 3
                                        ? rawNode.setAttribute('data-cell-focus', 'M1H')
                                        : i === 2 && j === 0
                                            ? rawNode.setAttribute('data-cell-focus', 'M2L')
                                            : i === 2 && j === 1
                                                ? rawNode.setAttribute('data-cell-focus', 'M2M1')
                                                : i === 2 && j === 2
                                                    ? rawNode.setAttribute('data-cell-focus', 'M2M2')
                                                    : i === 2 && j === 3
                                                        ? rawNode.setAttribute('data-cell-focus', 'M2H')
                                                        : i === 3 && j === 0
                                                            ? rawNode.setAttribute('data-cell-focus', 'HL')
                                                            : i === 3 && j === 1
                                                                ? rawNode.setAttribute('data-cell-focus', 'HM1')
                                                                : i === 3 && j === 2
                                                                    ? rawNode.setAttribute('data-cell-focus', 'HM2')
                                                                    : i === 3 && j === 3
                                                                        ? rawNode.setAttribute('data-cell-focus', 'HH')
                                                                        : null;
    }
    applyEventHandlers() {
        const cellGroup = document.querySelectorAll('.esri-interactive-legend__svg-rect-element');
        const cells = Array.from(cellGroup);
        cells.map(cell => {
            const i = cell.getAttribute('data-feature-i');
            const j = cell.getAttribute('data-feature-j');
            const focus = cell.getAttribute('data-cell-focus');
            cell.onclick = () => {
                this.handleFilter(i, j, focus);
                this.handleSelectedElement(cell);
            };
            cell.onkeydown = e => {
                const { key } = e;
                const isActionKey = key === 'Enter' || key === 'Space';
                if (isActionKey) {
                    this.handleFilter(i, j, focus);
                    this.handleSelectedElement(cell);
                }
            };
        });
    }
    async handleFilter(i, j, focus) {
        var _a, _b, _c, _d, _e;
        const fLayer = this.activeLayerInfo.layer;
        const { authoringInfo } = fLayer.renderer;
        const { field1, field2 } = authoringInfo;
        const { queryExpressions, fLayerView } = interactiveLegendState.data[this.activeLayerInfo.layer.id];
        if (this.legendElement.type === 'relationship-ramp' && authoringInfo && field1 && field2) {
            const expressionParams = this.generateExpressionParams(field1, field2, authoringInfo, i, j, focus);
            const queryExpression = this.generateExpressionForRelationship(expressionParams);
            if (queryExpressions.length === 0) {
                queryExpressions[0] = queryExpression;
            }
            else {
                if (queryExpressions.indexOf(queryExpression) === -1) {
                    queryExpressions.push(queryExpression);
                }
                else {
                    queryExpressions.splice(queryExpressions.indexOf(queryExpression), 1);
                }
            }
            const where = queryExpressions.join(' OR ');
            const timeExtent = (_b = (_a = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) !== null && _b !== void 0 ? _b : null;
            const [FeatureFilter, FeatureEffect] = await loadModules(['esri/layers/support/FeatureFilter', 'esri/layers/support/FeatureEffect']);
            if (((_c = this.filterMode) === null || _c === void 0 ? void 0 : _c.type) === 'filter') {
                fLayerView.filter = new FeatureFilter({
                    where,
                    timeExtent: ((_d = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.filter) === null || _d === void 0 ? void 0 : _d.timeExtent) ? fLayerView.filter.timeExtent : null,
                });
            }
            else if ((_e = this.filterMode) === null || _e === void 0 ? void 0 : _e.effect) {
                const { includedEffect, excludedEffect } = this.filterMode.effect;
                const mergedExcludedEffect = await getMergedEffect(excludedEffect, fLayerView, 'excludedEffect');
                const mergedIncludedEffect = await getMergedEffect(includedEffect, fLayerView, 'includedEffect');
                fLayerView.featureEffect = new FeatureEffect({
                    filter: new FeatureFilter({ where, timeExtent }),
                    includedEffect: mergedIncludedEffect,
                    excludedEffect: mergedExcludedEffect,
                });
            }
        }
    }
    generateExpressionParams(field1, field2, authoringInfo, i, j, focus) {
        const data = [];
        const authoringInfofield1 = field1.field;
        const authoringInfofield2 = field2.field;
        const classBreakInfos1 = field1.classBreakInfos;
        const classBreakInfos2 = field2.classBreakInfos;
        const normalizationField1 = authoringInfo.field1.hasOwnProperty('normalizationField') ? authoringInfo.field1.normalizationField : null;
        const normalizationField2 = authoringInfo.field2.hasOwnProperty('normalizationField') ? authoringInfo.field2.normalizationField : null;
        classBreakInfos1.forEach((_item, itemIndex1) => {
            const nestedData = [];
            classBreakInfos2.forEach((_item2, itemIndex2) => {
                nestedData.push([classBreakInfos1[itemIndex1], classBreakInfos2[itemIndex2]]);
            });
            data.push(nestedData);
        });
        const field1ToInclude = normalizationField1 ? `(${authoringInfofield1}/${normalizationField1})` : `${authoringInfofield1}`;
        const field2ToInclude = normalizationField2 ? `(${authoringInfofield2}/${normalizationField2})` : `${authoringInfofield2}`;
        return {
            data,
            i,
            j,
            field1: field1ToInclude,
            field2: field2ToInclude,
            focus,
        };
    }
    // _generateExpressionForTwoClasses
    generateExpressionForRelationship(expressionParams) {
        const { focus, field1, field2, data, i, j } = expressionParams;
        return focus === 'LL'
            ? `${field1} >= ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} >= ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
            : focus === 'LM' || focus === 'LM1' || focus === 'LM2' || focus === 'LH'
                ? `${field1} >= ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} > ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
                : focus === 'ML' || focus === 'M1L' || focus === 'M2L' || focus === 'HL'
                    ? `${field1} > ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} >= ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
                    : `${field1} > ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} > ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`;
    }
    handleSelectedElement(cell) {
        const cellClass = cell.classList;
        if (!cellClass.contains('esri-interactive-legend--selected-cell')) {
            cellClass.add('esri-interactive-legend--selected-cell');
            cell.setAttribute('stroke', 'black');
            cell.setAttribute('stroke-width', '3px');
            cell.setAttribute('stroke-opacity', '1');
        }
        else {
            cell.removeAttribute('stroke');
            cell.removeAttribute('stroke-width');
            cell.removeAttribute('stroke-opacity');
            cellClass.remove('esri-interactive-legend--selected-cell');
        }
    }
};
InstantAppsInteractiveLegendRelationship.style = InstantAppsInteractiveLegendRelationshipStyle0;

export { InstantAppsInteractiveLegendGroupLegendElement as instant_apps_interactive_legend_group_legend_element, InstantAppsInteractiveLegendLayerElement as instant_apps_interactive_legend_layer_element, InstantAppsInteractiveLegendLegendElement as instant_apps_interactive_legend_legend_element, InstantAppsInteractiveLegendLegendElementCaption as instant_apps_interactive_legend_legend_element_caption, InstantAppsInteractiveLegendRelationship as instant_apps_interactive_legend_relationship };
