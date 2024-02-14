/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { g as getUserAgentString } from './interactive.js';
import { d as defineCustomElement$6 } from './button.js';
import { d as defineCustomElement$5 } from './chip.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './pagination.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    bordered: "bordered",
    striped: "striped",
    selectionArea: "selection-area",
    paginationArea: "pagination-area",
    container: "container",
    tableContainer: "table-container",
    tableFixed: "table--fixed",
    assistiveText: "assistive-text",
    selectionActions: "selection-actions",
};
const SLOTS = {
    selectionActions: "selection-actions",
    tableHeader: "table-header",
    tableFooter: "table-footer",
};

const tableCss = ":host([scale=s]){--calcite-internal-table-cell-padding:0.25rem;--calcite-internal-table-cell-font-size:var(--calcite-font-size--2);--calcite-internal-table-cell-font-size-secondary:var(--calcite-font-size--3)}:host([scale=m]){--calcite-internal-table-cell-padding:0.5rem;--calcite-internal-table-cell-font-size:var(--calcite-font-size--1);--calcite-internal-table-cell-font-size-secondary:var(--calcite-font-size--2)}:host([scale=l]){--calcite-internal-table-cell-padding:1rem;--calcite-internal-table-cell-font-size:var(--calcite-font-size-0);--calcite-internal-table-cell-font-size-secondary:var(--calcite-font-size--1)}:host{display:flex}.container{display:flex;block-size:100%;inline-size:100%;flex-direction:column}.table-container{overflow:auto;white-space:nowrap;border:1px solid var(--calcite-color-border-3)}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}table{inline-size:100%;border-collapse:collapse;overflow-x:scroll}.table--fixed{table-layout:fixed}.bordered ::slotted(calcite-table-row){--calcite-table-row-border-color:var(--calcite-color-border-3)}.striped ::slotted(calcite-table-row:nth-child(2n+1)){--calcite-table-row-background:var(--calcite-color-foreground-2)}.selection-actions{display:flex;flex-direction:row;margin-inline-start:auto}.selection-area{display:flex;flex-direction:row;align-items:center;padding-block:var(--calcite-internal-table-cell-padding)}.selection-area calcite-chip:last-of-type{margin-inline-end:0.5rem}.selection-area calcite-chip:last-of-type:not(:first-of-type){margin-inline-start:0.5rem}.selection-area calcite-button{margin-inline-end:1rem}.pagination-area{display:flex;inline-size:100%;flex-direction:row;justify-content:center;padding-block:var(--calcite-internal-table-cell-padding)}calcite-pagination{flex:1;justify-content:center}:host([hidden]){display:none}[hidden]{display:none}";

const Table = /*@__PURE__*/ proxyCustomElement(class Table extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTableSelect = createEvent(this, "calciteTableSelect", 6);
        this.calciteTablePageChange = createEvent(this, "calciteTablePageChange", 6);
        this.calciteInternalTableRowFocusChange = createEvent(this, "calciteInternalTableRowFocusChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getSlottedRows = (el) => {
            var _a;
            return (_a = el === null || el === void 0 ? void 0 : el.assignedElements({ flatten: true })) === null || _a === void 0 ? void 0 : _a.filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-table-row"));
        };
        this.updateRows = () => {
            var _a, _b, _c;
            const headRows = this.getSlottedRows(this.tableHeadSlotEl) || [];
            const bodyRows = this.getSlottedRows(this.tableBodySlotEl) || [];
            const footRows = this.getSlottedRows(this.tableFootSlotEl) || [];
            const allRows = [...headRows, ...bodyRows, ...footRows];
            headRows === null || headRows === void 0 ? void 0 : headRows.forEach((row) => {
                const position = headRows === null || headRows === void 0 ? void 0 : headRows.indexOf(row);
                row.rowType = "head";
                row.positionSection = position;
                row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
            });
            bodyRows === null || bodyRows === void 0 ? void 0 : bodyRows.forEach((row) => {
                const position = bodyRows === null || bodyRows === void 0 ? void 0 : bodyRows.indexOf(row);
                row.rowType = "body";
                row.positionSection = position;
                row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
            });
            footRows === null || footRows === void 0 ? void 0 : footRows.forEach((row) => {
                const position = footRows === null || footRows === void 0 ? void 0 : footRows.indexOf(row);
                row.rowType = "foot";
                row.positionSection = position;
                row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
            });
            allRows === null || allRows === void 0 ? void 0 : allRows.forEach((row) => {
                row.selectionMode = this.selectionMode;
                row.bodyRowCount = bodyRows === null || bodyRows === void 0 ? void 0 : bodyRows.length;
                row.positionAll = allRows === null || allRows === void 0 ? void 0 : allRows.indexOf(row);
                row.numbered = this.numbered;
                row.scale = this.scale;
                row.readCellContentsToAT = this.readCellContentsToAT;
                row.lastVisibleRow = (allRows === null || allRows === void 0 ? void 0 : allRows.indexOf(row)) === allRows.length - 1;
            });
            const colCount = ((_a = headRows[0]) === null || _a === void 0 ? void 0 : _a.cellCount) || ((_c = (_b = headRows[0]) === null || _b === void 0 ? void 0 : _b.querySelectorAll("calcite-table-header")) === null || _c === void 0 ? void 0 : _c.length);
            this.colCount = colCount;
            this.headRows = headRows;
            this.bodyRows = bodyRows;
            this.footRows = footRows;
            this.allRows = allRows;
            this.updateSelectedItems();
            this.paginateRows();
        };
        this.handlePaginationChange = () => {
            var _a;
            const requestedItem = (_a = this.paginationEl) === null || _a === void 0 ? void 0 : _a.startItem;
            this.pageStartRow = requestedItem || 1;
            this.calciteTablePageChange.emit();
            this.updateRows();
        };
        this.paginateRows = () => {
            var _a;
            (_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.forEach((row) => {
                const rowPos = row.positionSection + 1;
                const inView = rowPos >= this.pageStartRow && rowPos < this.pageStartRow + this.pageSize;
                row.hidden = this.pageSize > 0 && !inView && !this.footRows.includes(row);
                row.lastVisibleRow =
                    rowPos === this.pageStartRow + this.pageSize - 1 || rowPos === this.bodyRows.length;
            });
        };
        this.updateSelectedItems = (emit) => {
            var _a, _b;
            const selectedItems = (_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.filter((el) => el.selected);
            this.selectedItems = selectedItems;
            this.selectedCount = selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length;
            (_b = this.allRows) === null || _b === void 0 ? void 0 : _b.forEach((row) => {
                row.selectedRowCount = this.selectedCount;
                row.selectedRowCountLocalized = this.localizeNumber(this.selectedCount);
            });
            if (emit) {
                this.calciteTableSelect.emit();
            }
        };
        this.handleDeselectAllRows = () => {
            var _a;
            (_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.forEach((row) => {
                row.selected = false;
            });
            this.updateSelectedItems(true);
        };
        this.setSelectedItems = (elToMatch) => {
            var _a;
            (_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
                var _a;
                if ((elToMatch === null || elToMatch === void 0 ? void 0 : elToMatch.rowType) === "head") {
                    el.selected = this.selectedCount !== ((_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.length);
                }
                else {
                    el.selected =
                        elToMatch === el ? !el.selected : this.selectionMode === "multiple" ? el.selected : false;
                }
            });
            this.updateSelectedItems(true);
        };
        this.localizeNumber = (value) => {
            numberStringFormatter.numberFormatOptions = {
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                useGrouping: this.groupSeparator,
            };
            return numberStringFormatter.localize(value.toString());
        };
        this.bordered = false;
        this.caption = undefined;
        this.groupSeparator = false;
        this.layout = "auto";
        this.numbered = false;
        this.numberingSystem = undefined;
        this.pageSize = 0;
        this.scale = "m";
        this.selectionMode = "none";
        this.zebra = false;
        this.striped = false;
        this.selectedItems = [];
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.colCount = 0;
        this.pageStartRow = 1;
        this.selectedCount = 0;
        this.readCellContentsToAT = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    handleNumberedChange() {
        this.updateRows();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
        this.readCellContentsToAT = /safari/i.test(getUserAgentString());
        this.updateRows();
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteChipSelectListener(event) {
        if (event.composedPath().includes(this.el)) {
            this.setSelectedItems(event.target);
        }
    }
    calciteInternalTableRowFocusEvent(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const cellPosition = event["detail"].cellPosition;
        const rowPos = event["detail"].rowPosition;
        const destination = event["detail"].destination;
        const lastCell = event["detail"].lastCell;
        const visibleBody = (_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.filter((row) => !row.hidden);
        const visibleAll = (_b = this.allRows) === null || _b === void 0 ? void 0 : _b.filter((row) => !row.hidden);
        const lastHeadRow = (_c = this.headRows[this.headRows.length - 1]) === null || _c === void 0 ? void 0 : _c.positionAll;
        const firstBodyRow = (_d = visibleBody[0]) === null || _d === void 0 ? void 0 : _d.positionAll;
        const lastBodyRow = (_e = visibleBody[visibleBody.length - 1]) === null || _e === void 0 ? void 0 : _e.positionAll;
        const firstFootRow = (_f = this.footRows[0]) === null || _f === void 0 ? void 0 : _f.positionAll;
        const lastTableRow = (_g = visibleAll[visibleAll.length - 1]) === null || _g === void 0 ? void 0 : _g.positionAll;
        const leavingHeader = destination === "next" && rowPos === lastHeadRow;
        const leavingFooter = destination === "previous" && rowPos === firstFootRow;
        const enteringHeader = destination === "previous" && rowPos === firstBodyRow;
        const enteringFooter = destination === "next" && rowPos === lastBodyRow;
        let rowPosition;
        switch (destination) {
            case "first":
                rowPosition = 0;
                break;
            case "last":
                rowPosition = lastTableRow;
                break;
            case "next":
                rowPosition = leavingHeader ? firstBodyRow : enteringFooter ? firstFootRow : rowPos + 1;
                break;
            case "previous":
                rowPosition = leavingFooter ? lastBodyRow : enteringHeader ? lastHeadRow : rowPos - 1;
                break;
        }
        const destinationCount = (_j = (_h = this.allRows) === null || _h === void 0 ? void 0 : _h.find((row) => row.positionAll === rowPosition)) === null || _j === void 0 ? void 0 : _j.cellCount;
        const adjustedPos = cellPosition > destinationCount ? destinationCount : cellPosition;
        if (rowPosition !== undefined) {
            this.calciteInternalTableRowFocusChange.emit({
                cellPosition: adjustedPos,
                rowPosition,
                destination,
                lastCell,
            });
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderSelectionArea() {
        var _a, _b, _c;
        const outOfViewCount = (_b = (_a = this.selectedItems) === null || _a === void 0 ? void 0 : _a.filter((el) => el.hidden)) === null || _b === void 0 ? void 0 : _b.length;
        const localizedOutOfView = this.localizeNumber(outOfViewCount === null || outOfViewCount === void 0 ? void 0 : outOfViewCount.toString());
        const localizedSelectedCount = this.localizeNumber((_c = this.selectedCount) === null || _c === void 0 ? void 0 : _c.toString());
        const selectionText = `${localizedSelectedCount} ${this.messages.selected}`;
        const outOfView = `${localizedOutOfView} ${this.messages.hiddenSelected}`;
        return (h("div", { class: CSS.selectionArea }, h("calcite-chip", { kind: this.selectedCount > 0 ? "brand" : "neutral", scale: this.scale, value: selectionText }, selectionText), outOfViewCount > 0 && (h("calcite-chip", { icon: "hide-empty", scale: this.scale, title: outOfView, value: outOfView }, localizedOutOfView)), this.selectedCount > 0 && (h("calcite-button", { "icon-start": "x", kind: "neutral", onClick: this.handleDeselectAllRows, round: true, scale: this.scale, title: `${this.messages.clear} ${selectionText} ${this.messages.row}` }, this.messages.clear)), h("div", { class: CSS.selectionActions }, h("slot", { name: SLOTS.selectionActions }))));
    }
    renderPaginationArea() {
        var _a;
        return (h("div", { class: CSS.paginationArea }, h("calcite-pagination", { groupSeparator: this.groupSeparator, numberingSystem: this.numberingSystem, onCalcitePaginationChange: this.handlePaginationChange, pageSize: this.pageSize, scale: this.scale, startItem: 1, totalItems: (_a = this.bodyRows) === null || _a === void 0 ? void 0 : _a.length,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.paginationEl = el) })));
    }
    renderTHead() {
        return (h("thead", null, h("slot", { name: SLOTS.tableHeader, onSlotchange: this.updateRows, ref: (el) => (this.tableHeadSlotEl = el) })));
    }
    renderTBody() {
        return (h("tbody", null, h("slot", { onSlotchange: this.updateRows, ref: (el) => (this.tableBodySlotEl = el) })));
    }
    renderTFoot() {
        return (h("tfoot", null, h("slot", { name: SLOTS.tableFooter, onSlotchange: this.updateRows, ref: (el) => (this.tableFootSlotEl = el) })));
    }
    render() {
        var _a;
        return (h(Host, null, h("div", { class: CSS.container }, this.selectionMode !== "none" && this.renderSelectionArea(), h("div", { class: {
                [CSS.bordered]: this.bordered,
                [CSS.striped]: this.striped || this.zebra,
                [CSS.tableContainer]: true,
            } }, h("table", { "aria-colcount": this.colCount, "aria-multiselectable": this.selectionMode === "multiple", "aria-readonly": true, "aria-rowcount": (_a = this.allRows) === null || _a === void 0 ? void 0 : _a.length, class: { [CSS.tableFixed]: this.layout === "fixed" }, role: "grid" }, h("caption", { class: CSS.assistiveText }, this.caption), this.renderTHead(), this.renderTBody(), this.renderTFoot())), this.pageSize > 0 && this.renderPaginationArea())));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "groupSeparator": ["handleNumberedChange"],
        "numbered": ["handleNumberedChange"],
        "numberingSystem": ["handleNumberedChange"],
        "pageSize": ["handleNumberedChange"],
        "scale": ["handleNumberedChange"],
        "selectionMode": ["handleNumberedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return tableCss; }
}, [1, "calcite-table", {
        "bordered": [516],
        "caption": [1],
        "groupSeparator": [516, "group-separator"],
        "layout": [513],
        "numbered": [516],
        "numberingSystem": [513, "numbering-system"],
        "pageSize": [514, "page-size"],
        "scale": [513],
        "selectionMode": [513, "selection-mode"],
        "zebra": [516],
        "striped": [516],
        "selectedItems": [1040],
        "messages": [1040],
        "messageOverrides": [1040],
        "colCount": [32],
        "pageStartRow": [32],
        "selectedCount": [32],
        "readCellContentsToAT": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32]
    }, [[0, "calciteTableRowSelect", "calciteChipSelectListener"], [0, "calciteInternalTableRowFocusRequest", "calciteInternalTableRowFocusEvent"]], {
        "groupSeparator": ["handleNumberedChange"],
        "numbered": ["handleNumberedChange"],
        "numberingSystem": ["handleNumberedChange"],
        "pageSize": ["handleNumberedChange"],
        "scale": ["handleNumberedChange"],
        "selectionMode": ["handleNumberedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-table", "calcite-button", "calcite-chip", "calcite-icon", "calcite-loader", "calcite-pagination"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-table":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Table);
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-chip":
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
        case "calcite-pagination":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTable = Table;
const defineCustomElement = defineCustomElement$1;

export { CalciteTable, defineCustomElement };
