/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const key = require('./key-c5504030.js');
const interactive = require('./interactive-3ab7044d.js');
const component = require('./component-ac7c3bd8.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    lastVisibleRow: "last-visible-row",
};

const tableRowCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-internal-table-row-background:var(--calcite-table-row-background, var(--calcite-color-foreground-1));--calcite-internal-table-row-border-color:var(--calcite-table-row-border-color, transparent);display:contents}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) tr{pointer-events:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}tr{border-block-end:1px solid var(--calcite-internal-table-row-border-color);background-color:var(--calcite-internal-table-row-background)}tr.last-visible-row{border-block-end:0}";

const TableRow = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteTableRowSelect = index.createEvent(this, "calciteTableRowSelect", 6);
        this.calciteInternalTableRowFocusRequest = index.createEvent(this, "calciteInternalTableRowFocusRequest", 6);
        this.rowCells = [];
        this.emitTableRowFocusRequest = (cellPosition, rowPosition, destination, lastCell) => {
            this.calciteInternalTableRowFocusRequest.emit({
                cellPosition,
                rowPosition,
                destination,
                lastCell,
            });
        };
        this.updateCells = () => {
            var _a, _b, _c, _d;
            const slottedCells = (_b = (_a = this.tableRowSlotEl) === null || _a === void 0 ? void 0 : _a.assignedElements({ flatten: true })) === null || _b === void 0 ? void 0 : _b.filter((el) => el.matches("calcite-table-cell") || el.matches("calcite-table-header"));
            const renderedCells = (_d = Array.from((_c = this.tableRowEl) === null || _c === void 0 ? void 0 : _c.querySelectorAll("calcite-table-header, calcite-table-cell"))) === null || _d === void 0 ? void 0 : _d.filter((el) => el.numberCell || el.selectionCell);
            const cells = renderedCells ? renderedCells.concat(slottedCells) : slottedCells;
            if (cells.length > 0) {
                cells === null || cells === void 0 ? void 0 : cells.forEach((cell, index) => {
                    cell.positionInRow = index + 1;
                    cell.parentRowType = this.rowType;
                    cell.parentRowIsSelected = this.selected;
                    cell.scale = this.scale;
                    cell.lastCell = index === cells.length - 1;
                    if (cell.nodeName === "CALCITE-TABLE-CELL") {
                        cell.readCellContentsToAT = this.readCellContentsToAT;
                        cell.disabled = this.disabled;
                    }
                });
            }
            this.rowCells =
                cells || [];
            this.cellCount = cells === null || cells === void 0 ? void 0 : cells.length;
        };
        this.handleSelectionOfRow = () => {
            this.calciteTableRowSelect.emit();
        };
        this.handleKeyboardSelection = (event) => {
            if (key.isActivationKey(event.key)) {
                if (event.key === " ") {
                    event.preventDefault();
                }
                this.handleSelectionOfRow();
            }
        };
        this.disabled = false;
        this.selected = false;
        this.cellCount = undefined;
        this.lastVisibleRow = undefined;
        this.rowType = undefined;
        this.numbered = false;
        this.positionSection = undefined;
        this.positionSectionLocalized = undefined;
        this.positionAll = undefined;
        this.readCellContentsToAT = undefined;
        this.scale = undefined;
        this.selectionMode = "none";
        this.selectedRowCount = undefined;
        this.selectedRowCountLocalized = undefined;
        this.bodyRowCount = undefined;
        this.effectiveLocale = "";
    }
    handleCellChanges() {
        if (this.tableRowEl && this.rowCells.length > 0) {
            this.updateCells();
        }
    }
    handleDelayedCellChanges() {
        if (this.tableRowEl && this.rowCells.length > 0) {
            requestAnimationFrame(() => this.updateCells());
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidLoad() {
        if (this.tableRowEl && this.rowCells.length > 0) {
            this.updateCells();
        }
    }
    connectedCallback() {
        interactive.connectInteractive(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalTableRowFocusChangeHandler(event) {
        var _a;
        if (event.target.contains(this.el)) {
            const position = event.detail.cellPosition;
            const rowPosition = event.detail.rowPosition;
            const destination = event.detail.destination;
            const lastCell = event.detail.lastCell;
            if (rowPosition === this.positionAll) {
                if (this.disabled) {
                    const deflectDirection = destination === "last" ? "previous" : destination === "first" ? "next" : destination;
                    this.emitTableRowFocusRequest(position, this.positionAll, deflectDirection);
                    return;
                }
                const cellPosition = lastCell
                    ? this.rowCells[this.rowCells.length - 1]
                    : (_a = this.rowCells) === null || _a === void 0 ? void 0 : _a.find((_, index) => index + 1 === position);
                if (cellPosition) {
                    cellPosition.setFocus();
                }
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    keyDownHandler(event) {
        var _a;
        const el = event.target;
        const key = event.key;
        const isControl = event.ctrlKey;
        const cells = this.rowCells;
        if (el.matches("calcite-table-cell") || el.matches("calcite-table-header")) {
            switch (key) {
                case "ArrowUp":
                    this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "previous");
                    event.preventDefault();
                    break;
                case "ArrowDown":
                    this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "next");
                    event.preventDefault();
                    break;
                case "PageUp":
                    this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "first");
                    event.preventDefault();
                    break;
                case "PageDown":
                    this.emitTableRowFocusRequest(el.positionInRow, this.positionAll, "last");
                    event.preventDefault();
                    break;
                case "ArrowLeft":
                    dom.focusElementInGroup(cells, el, "previous", false);
                    event.preventDefault();
                    break;
                case "ArrowRight":
                    dom.focusElementInGroup(cells, el, "next", false);
                    event.preventDefault();
                    break;
                case "Home":
                    if (isControl) {
                        this.emitTableRowFocusRequest(1, this.positionAll, "first");
                        event.preventDefault();
                    }
                    else {
                        dom.focusElementInGroup(cells, el, "first", false);
                        event.preventDefault();
                    }
                    break;
                case "End":
                    if (isControl) {
                        this.emitTableRowFocusRequest((_a = this.rowCells) === null || _a === void 0 ? void 0 : _a.length, this.positionAll, "last", true);
                        event.preventDefault();
                    }
                    else {
                        dom.focusElementInGroup(cells, el, "last", false);
                        event.preventDefault();
                    }
                    break;
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderSelectionIcon() {
        const icon = this.selectionMode === "multiple" && this.selected
            ? "check-square-f"
            : this.selectionMode === "multiple"
                ? "square"
                : this.selected
                    ? "circle-f"
                    : "circle";
        return index.h("calcite-icon", { icon: icon, scale: component.getIconScale(this.scale) });
    }
    renderSelectableCell() {
        return this.rowType === "head" ? (index.h("calcite-table-header", { alignment: "center", bodyRowCount: this.bodyRowCount, key: "selection-head", onClick: this.selectionMode === "multiple" && this.handleSelectionOfRow, onKeyDown: this.selectionMode === "multiple" && this.handleKeyboardSelection, selectedRowCount: this.selectedRowCount, selectedRowCountLocalized: this.selectedRowCountLocalized, selectionCell: true, selectionMode: this.selectionMode })) : this.rowType === "body" ? (index.h("calcite-table-cell", { alignment: "center", key: "selection-body", onClick: this.handleSelectionOfRow, onKeyDown: this.handleKeyboardSelection, parentRowIsSelected: this.selected, parentRowPositionLocalized: this.positionSectionLocalized, selectionCell: true }, this.renderSelectionIcon())) : (index.h("calcite-table-cell", { alignment: "center", key: "selection-foot", selectionCell: true }));
    }
    renderNumberedCell() {
        return this.rowType === "head" ? (index.h("calcite-table-header", { alignment: "center", key: "numbered-head", numberCell: true })) : this.rowType === "body" ? (index.h("calcite-table-cell", { alignment: "center", key: "numbered-body", numberCell: true }, this.positionSectionLocalized)) : (index.h("calcite-table-cell", { alignment: "center", key: "numbered-foot", numberCell: true }));
    }
    render() {
        return (index.h(index.Host, null, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("tr", { "aria-disabled": this.disabled, "aria-rowindex": this.positionAll + 1, "aria-selected": this.selected, class: { [CSS.lastVisibleRow]: this.lastVisibleRow }, onKeyDown: (event) => this.keyDownHandler(event),
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.tableRowEl = el) }, this.numbered && this.renderNumberedCell(), this.selectionMode !== "none" && this.renderSelectableCell(), index.h("slot", { onSlotchange: this.updateCells, ref: (el) => (this.tableRowSlotEl = el) })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "bodyRowCount": ["handleCellChanges"],
        "scale": ["handleCellChanges"],
        "selected": ["handleCellChanges"],
        "selectedRowCount": ["handleCellChanges"],
        "numbered": ["handleDelayedCellChanges"],
        "selectionMode": ["handleDelayedCellChanges"]
    }; }
};
TableRow.style = tableRowCss;

exports.calcite_table_row = TableRow;
