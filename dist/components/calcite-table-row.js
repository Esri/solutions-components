/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { y as focusElementInGroup, t as toAriaBoolean } from './dom.js';
import { i as isActivationKey } from './key.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './table-cell.js';
import { d as defineCustomElement$2 } from './table-header.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    lastVisibleRow: "last-visible-row",
};

const tableRowCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-internal-table-row-background:var(--calcite-table-row-background, var(--calcite-color-foreground-1));--calcite-internal-table-row-border-color:var(--calcite-table-row-border-color, transparent);display:contents}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) tr{pointer-events:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}tr{border-block-end:1px solid var(--calcite-internal-table-row-border-color);background-color:var(--calcite-internal-table-row-background)}tr.last-visible-row{border-block-end:0}";
const CalciteTableRowStyle0 = tableRowCss;

const TableRow = /*@__PURE__*/ proxyCustomElement(class TableRow extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTableRowSelect = createEvent(this, "calciteTableRowSelect", 6);
        this.calciteInternalTableRowFocusRequest = createEvent(this, "calciteInternalTableRowFocusRequest", 6);
        this.rowCells = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.keyDownHandler = (event) => {
            if (this.interactionMode !== "interactive") {
                return;
            }
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
                        focusElementInGroup(cells, el, "previous", false);
                        event.preventDefault();
                        break;
                    case "ArrowRight":
                        focusElementInGroup(cells, el, "next", false);
                        event.preventDefault();
                        break;
                    case "Home":
                        if (isControl) {
                            this.emitTableRowFocusRequest(1, this.positionAll, "first");
                            event.preventDefault();
                        }
                        else {
                            focusElementInGroup(cells, el, "first", false);
                            event.preventDefault();
                        }
                        break;
                    case "End":
                        if (isControl) {
                            this.emitTableRowFocusRequest(this.rowCells?.length, this.positionAll, "last", true);
                            event.preventDefault();
                        }
                        else {
                            focusElementInGroup(cells, el, "last", false);
                            event.preventDefault();
                        }
                        break;
                }
            }
        };
        this.emitTableRowFocusRequest = (cellPosition, rowPosition, destination, lastCell) => {
            this.calciteInternalTableRowFocusRequest.emit({
                cellPosition,
                rowPosition,
                destination,
                lastCell,
            });
        };
        this.updateCells = () => {
            const alignment = this.alignment
                ? this.alignment
                : this.rowType !== "head"
                    ? "center"
                    : "start";
            const slottedCells = this.tableRowSlotEl
                ?.assignedElements({ flatten: true })
                ?.filter((el) => el.matches("calcite-table-cell") || el.matches("calcite-table-header"));
            const renderedCells = Array.from(this.tableRowEl?.querySelectorAll("calcite-table-header, calcite-table-cell"))?.filter((el) => el.numberCell || el.selectionCell);
            const cells = renderedCells ? renderedCells.concat(slottedCells) : slottedCells;
            if (cells.length > 0) {
                cells?.forEach((cell, index) => {
                    cell.interactionMode = this.interactionMode;
                    cell.lastCell = index === cells.length - 1;
                    cell.parentRowAlignment = alignment;
                    cell.parentRowIsSelected = this.selected;
                    cell.parentRowType = this.rowType;
                    cell.positionInRow = index + 1;
                    cell.scale = this.scale;
                    if (cell.nodeName === "CALCITE-TABLE-CELL") {
                        cell.readCellContentsToAT = this.readCellContentsToAT;
                        cell.disabled = this.disabled;
                    }
                });
            }
            this.rowCells =
                cells || [];
            this.cellCount = cells?.length;
        };
        this.handleSelectionOfRow = () => {
            this.calciteTableRowSelect.emit();
        };
        this.handleKeyboardSelection = (event) => {
            if (isActivationKey(event.key)) {
                if (event.key === " ") {
                    event.preventDefault();
                }
                this.handleSelectionOfRow();
            }
        };
        this.alignment = undefined;
        this.disabled = false;
        this.selected = false;
        this.cellCount = undefined;
        this.interactionMode = "interactive";
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
    componentDidRender() {
        updateHostInteraction(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalTableRowFocusChangeHandler(event) {
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
                    : this.rowCells?.find((_, index) => index + 1 === position);
                if (cellPosition) {
                    cellPosition.setFocus();
                }
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
        return h("calcite-icon", { icon: icon, scale: getIconScale(this.scale) });
    }
    renderSelectableCell() {
        return this.rowType === "head" ? (h("calcite-table-header", { alignment: "center", bodyRowCount: this.bodyRowCount, key: "selection-head", onClick: this.selectionMode === "multiple" && this.handleSelectionOfRow, onKeyDown: this.selectionMode === "multiple" && this.handleKeyboardSelection, parentRowAlignment: this.alignment, selectedRowCount: this.selectedRowCount, selectedRowCountLocalized: this.selectedRowCountLocalized, selectionCell: true, selectionMode: this.selectionMode })) : this.rowType === "body" ? (h("calcite-table-cell", { alignment: "center", key: "selection-body", onClick: this.handleSelectionOfRow, onKeyDown: this.handleKeyboardSelection, parentRowAlignment: this.alignment, parentRowIsSelected: this.selected, parentRowPositionLocalized: this.positionSectionLocalized, selectionCell: true }, this.renderSelectionIcon())) : (h("calcite-table-cell", { alignment: "center", key: "selection-foot", parentRowAlignment: this.alignment, selectionCell: true }));
    }
    renderNumberedCell() {
        return this.rowType === "head" ? (h("calcite-table-header", { alignment: "center", key: "numbered-head", numberCell: true, parentRowAlignment: this.alignment })) : this.rowType === "body" ? (h("calcite-table-cell", { alignment: "center", key: "numbered-body", numberCell: true, parentRowAlignment: this.alignment }, this.positionSectionLocalized)) : (h("calcite-table-cell", { alignment: "center", key: "numbered-foot", numberCell: true, parentRowAlignment: this.alignment }));
    }
    render() {
        return (h(Host, { key: 'fa3f14c832e7ed178ea338b01baebbe9a578689d' }, h(InteractiveContainer, { key: 'c82f005db0a6247e45476c86d2eaefe698df2dd1', disabled: this.disabled }, h("tr", { key: '452064805aa9685b75f3715bd45c42ce41f88368', "aria-rowindex": this.positionAll + 1, "aria-selected": toAriaBoolean(this.selected), class: { [CSS.lastVisibleRow]: this.lastVisibleRow }, onKeyDown: this.keyDownHandler, ref: (el) => (this.tableRowEl = el) }, this.numbered && this.renderNumberedCell(), this.selectionMode !== "none" && this.renderSelectableCell(), h("slot", { key: 'bddf927a3129b20012ade6aa5415afcdeb8064a1', onSlotchange: this.updateCells, ref: (el) => (this.tableRowSlotEl = el) })))));
    }
    get el() { return this; }
    static get watchers() { return {
        "bodyRowCount": ["handleCellChanges"],
        "scale": ["handleCellChanges"],
        "selected": ["handleCellChanges"],
        "selectedRowCount": ["handleCellChanges"],
        "interactionMode": ["handleCellChanges"],
        "numbered": ["handleDelayedCellChanges"],
        "selectionMode": ["handleDelayedCellChanges"]
    }; }
    static get style() { return CalciteTableRowStyle0; }
}, [1, "calcite-table-row", {
        "alignment": [513],
        "disabled": [516],
        "selected": [516],
        "cellCount": [1026, "cell-count"],
        "interactionMode": [1, "interaction-mode"],
        "lastVisibleRow": [4, "last-visible-row"],
        "rowType": [1, "row-type"],
        "numbered": [4],
        "positionSection": [2, "position-section"],
        "positionSectionLocalized": [1, "position-section-localized"],
        "positionAll": [2, "position-all"],
        "readCellContentsToAT": [4, "read-cell-contents-to-a-t"],
        "scale": [1],
        "selectionMode": [1, "selection-mode"],
        "selectedRowCount": [2, "selected-row-count"],
        "selectedRowCountLocalized": [1, "selected-row-count-localized"],
        "bodyRowCount": [2, "body-row-count"],
        "effectiveLocale": [32]
    }, [[4, "calciteInternalTableRowFocusChange", "calciteInternalTableRowFocusChangeHandler"]], {
        "bodyRowCount": ["handleCellChanges"],
        "scale": ["handleCellChanges"],
        "selected": ["handleCellChanges"],
        "selectedRowCount": ["handleCellChanges"],
        "interactionMode": ["handleCellChanges"],
        "numbered": ["handleDelayedCellChanges"],
        "selectionMode": ["handleDelayedCellChanges"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-table-row", "calcite-icon", "calcite-table-cell", "calcite-table-header"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-table-row":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TableRow);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-table-cell":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-table-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTableRow = TableRow;
const defineCustomElement = defineCustomElement$1;

export { CalciteTableRow, defineCustomElement };
