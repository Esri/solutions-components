/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-73f289b6.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n-2fb3af62.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './locale-21e40b0c.js';
import { g as getUserAgentString } from './browser-552eb2d0.js';
import './dom-b5c50286.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './key-58898f0a.js';
import './observers-e2484555.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
const CalciteTableStyle0 = tableCss;

const Table = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTableSelect = createEvent(this, "calciteTableSelect", 6);
        this.calciteTablePageChange = createEvent(this, "calciteTablePageChange", 6);
        this.calciteInternalTableRowFocusChange = createEvent(this, "calciteInternalTableRowFocusChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getSlottedRows = (el) => {
            return el
                ?.assignedElements({ flatten: true })
                ?.filter((el) => el?.matches("calcite-table-row"));
        };
        this.updateRows = () => {
            const headRows = this.getSlottedRows(this.tableHeadSlotEl) || [];
            const bodyRows = this.getSlottedRows(this.tableBodySlotEl) || [];
            const footRows = this.getSlottedRows(this.tableFootSlotEl) || [];
            const allRows = [...headRows, ...bodyRows, ...footRows];
            headRows?.forEach((row) => {
                const position = headRows?.indexOf(row);
                row.rowType = "head";
                row.positionSection = position;
                row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
            });
            bodyRows?.forEach((row) => {
                const position = bodyRows?.indexOf(row);
                row.rowType = "body";
                row.positionSection = position;
                row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
            });
            footRows?.forEach((row) => {
                const position = footRows?.indexOf(row);
                row.rowType = "foot";
                row.positionSection = position;
                row.positionSectionLocalized = this.localizeNumber((position + 1).toString());
            });
            allRows?.forEach((row) => {
                row.interactionMode = this.interactionMode;
                row.selectionMode = this.selectionMode;
                row.bodyRowCount = bodyRows?.length;
                row.positionAll = allRows?.indexOf(row);
                row.numbered = this.numbered;
                row.scale = this.scale;
                row.readCellContentsToAT = this.readCellContentsToAT;
                row.lastVisibleRow = allRows?.indexOf(row) === allRows.length - 1;
            });
            const colCount = headRows[0]?.cellCount || headRows[0]?.querySelectorAll("calcite-table-header")?.length;
            this.colCount = colCount;
            this.headRows = headRows;
            this.bodyRows = bodyRows;
            this.footRows = footRows;
            this.allRows = allRows;
            this.updateSelectedItems();
            this.paginateRows();
        };
        this.handlePaginationChange = () => {
            const requestedItem = this.paginationEl?.startItem;
            this.pageStartRow = requestedItem || 1;
            this.calciteTablePageChange.emit();
            this.updateRows();
        };
        this.paginateRows = () => {
            this.bodyRows?.forEach((row) => {
                const rowPos = row.positionSection + 1;
                const inView = rowPos >= this.pageStartRow && rowPos < this.pageStartRow + this.pageSize;
                row.hidden = this.pageSize > 0 && !inView && !this.footRows.includes(row);
                row.lastVisibleRow =
                    rowPos === this.pageStartRow + this.pageSize - 1 || rowPos === this.bodyRows.length;
            });
        };
        this.updateSelectedItems = (emit) => {
            const selectedItems = this.bodyRows?.filter((el) => el.selected);
            this.selectedItems = selectedItems;
            this.selectedCount = selectedItems?.length;
            this.allRows?.forEach((row) => {
                row.selectedRowCount = this.selectedCount;
                row.selectedRowCountLocalized = this.localizeNumber(this.selectedCount);
            });
            if (emit) {
                this.calciteTableSelect.emit();
            }
        };
        this.handleDeselectAllRows = () => {
            this.bodyRows?.forEach((row) => {
                row.selected = false;
            });
            this.updateSelectedItems(true);
        };
        this.setSelectedItems = (elToMatch) => {
            this.bodyRows?.forEach((el) => {
                if (elToMatch?.rowType === "head") {
                    el.selected = this.selectedCount !== this.bodyRows?.length;
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
        this.interactionMode = "interactive";
        this.layout = "auto";
        this.numbered = false;
        this.numberingSystem = undefined;
        this.pageSize = 0;
        this.scale = "m";
        this.selectionMode = "none";
        this.selectionDisplay = "top";
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
        const cellPosition = event["detail"].cellPosition;
        const rowPos = event["detail"].rowPosition;
        const destination = event["detail"].destination;
        const lastCell = event["detail"].lastCell;
        const visibleBody = this.bodyRows?.filter((row) => !row.hidden);
        const visibleAll = this.allRows?.filter((row) => !row.hidden);
        const lastHeadRow = this.headRows[this.headRows.length - 1]?.positionAll;
        const firstBodyRow = visibleBody[0]?.positionAll;
        const lastBodyRow = visibleBody[visibleBody.length - 1]?.positionAll;
        const firstFootRow = this.footRows[0]?.positionAll;
        const lastTableRow = visibleAll[visibleAll.length - 1]?.positionAll;
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
        const destinationCount = this.allRows?.find((row) => row.positionAll === rowPosition)?.cellCount;
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
        const outOfViewCount = this.selectedItems?.filter((el) => el.hidden)?.length;
        const localizedOutOfView = this.localizeNumber(outOfViewCount?.toString());
        const localizedSelectedCount = this.localizeNumber(this.selectedCount?.toString());
        const selectionText = `${localizedSelectedCount} ${this.messages.selected}`;
        const outOfView = `${localizedOutOfView} ${this.messages.hiddenSelected}`;
        return (h("div", { class: CSS.selectionArea }, h("calcite-chip", { kind: this.selectedCount > 0 ? "brand" : "neutral", scale: this.scale, value: selectionText }, selectionText), outOfViewCount > 0 && (h("calcite-chip", { icon: "hide-empty", scale: this.scale, title: outOfView, value: outOfView }, localizedOutOfView)), this.selectedCount > 0 && (h("calcite-button", { "icon-start": "x", kind: "neutral", onClick: this.handleDeselectAllRows, round: true, scale: this.scale, title: `${this.messages.clear} ${selectionText} ${this.messages.row}` }, this.messages.clear)), h("div", { class: CSS.selectionActions }, h("slot", { name: SLOTS.selectionActions }))));
    }
    renderPaginationArea() {
        return (h("div", { class: CSS.paginationArea }, h("calcite-pagination", { groupSeparator: this.groupSeparator, numberingSystem: this.numberingSystem, onCalcitePaginationChange: this.handlePaginationChange, pageSize: this.pageSize, ref: (el) => (this.paginationEl = el), scale: this.scale, startItem: 1, totalItems: this.bodyRows?.length })));
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
        return (h(Host, { key: '977fbb58c0ee0fdb506ebed869b136767dc43873' }, h("div", { key: 'c9c0885932328c3d703abb32632f599404f8ac20', class: CSS.container }, this.selectionMode !== "none" &&
            this.selectionDisplay !== "none" &&
            this.renderSelectionArea(), h("div", { key: 'a6b5739bb1b0f6eafeb37959bc21e54374c4da23', class: {
                [CSS.bordered]: this.bordered,
                [CSS.striped]: this.striped || this.zebra,
                [CSS.tableContainer]: true,
            } }, h("table", { key: '209d92a0bdd6ca12f8571ba5ca325c993afc247d', "aria-colcount": this.colCount, "aria-multiselectable": this.selectionMode === "multiple", "aria-rowcount": this.allRows?.length, class: { [CSS.tableFixed]: this.layout === "fixed" }, role: this.interactionMode === "interactive" ? "grid" : "table" }, h("caption", { key: '099e0d60343af59b0e59f1baf6fbfb36ed4498ad', class: CSS.assistiveText }, this.caption), this.renderTHead(), this.renderTBody(), this.renderTFoot())), this.pageSize > 0 && this.renderPaginationArea())));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "groupSeparator": ["handleNumberedChange"],
        "interactionMode": ["handleNumberedChange"],
        "numbered": ["handleNumberedChange"],
        "numberingSystem": ["handleNumberedChange"],
        "pageSize": ["handleNumberedChange"],
        "scale": ["handleNumberedChange"],
        "selectionMode": ["handleNumberedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Table.style = CalciteTableStyle0;

export { Table as calcite_table };
