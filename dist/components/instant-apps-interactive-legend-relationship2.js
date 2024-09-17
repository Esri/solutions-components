/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { i as interactiveLegendState, g as getMergedEffect } from './store.js';

const instantAppsInteractiveLegendRelationshipCss = ".sc-instant-apps-interactive-legend-relationship-h{display:block}.sc-instant-apps-interactive-legend-relationship-h .instant-apps-interactive-legend-relationship__instructional-text.sc-instant-apps-interactive-legend-relationship{display:inline-block;width:100%;text-align:center;margin-bottom:10px;background-color:#d2e9f9}.calcite-mode-dark .sc-instant-apps-interactive-legend-relationship-h .instant-apps-interactive-legend-relationship__instructional-text.sc-instant-apps-interactive-legend-relationship{background-color:var(--calcite-color-brand);color:#151515}";
const InstantAppsInteractiveLegendRelationshipStyle0 = instantAppsInteractiveLegendRelationshipCss;

const RELATIONSHIP_DIAMOND_SELECTOR = '.esri-relationship-ramp--diamond__middle-column--ramp svg g';
const CSS = {
    instructionalText: 'instant-apps-interactive-legend-relationship__instructional-text',
};
const InstantAppsInteractiveLegendRelationship = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegendRelationship extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
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
        return (h("div", { key: '1f7588d95a9f87cd0d1574d2c8823e4fec7ff20a', ref: (node) => {
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
            } }, h("span", { key: 'a5c554b5bda46d827f60aba19f0e74ce5a81efe5', class: CSS.instructionalText }, (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.relationship) === null || _b === void 0 ? void 0 : _b.instructionalText), this.renderRelationshipRamp()));
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
    static get style() { return InstantAppsInteractiveLegendRelationshipStyle0; }
}, [2, "instant-apps-interactive-legend-relationship", {
        "filterMode": [16],
        "activeLayerInfo": [16],
        "legendElement": [16],
        "messages": [8]
    }, [[8, "showAllSelected", "showAllSelectedEmitted"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend-relationship"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend-relationship":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegendRelationship);
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsInteractiveLegendRelationship as I, defineCustomElement as d };
