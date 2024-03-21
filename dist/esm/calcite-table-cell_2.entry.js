/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-164d485a.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-37e7fbd6.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n-436fb2b1.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-39bf5602.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-904407bf.js';
import { a as getElementDir } from './dom-38c6f027.js';
import { C as CSS_UTILITY } from './resources-8834f920.js';
import { g as getIconScale } from './component-edd2c3cd.js';
import './browser-d60104bd.js';
import './key-c83d835f.js';
import './observers-d04d1da9.js';
import './guid-b75a5f7b.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    numberCell: "number-cell",
    footerCell: "footer-cell",
    selectionCell: "selection-cell",
    selectedCell: "selected-cell",
    assistiveText: "assistive-text",
    lastCell: "last-cell",
};

const tableCellCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-internal-table-cell-background:var(--calcite-table-cell-background, transparent);display:contents}:host([alignment=center]) td{text-align:center}:host([alignment=end]) td{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}td{white-space:normal;text-align:start;vertical-align:middle;color:var(--calcite-color-text-1);outline-color:transparent;background:var(--calcite-internal-table-cell-background);font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-color-border-3);padding:var(--calcite-internal-table-cell-padding)}td:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}td.last-cell{border-inline-end:0}.number-cell{background-color:var(--calcite-color-foreground-2)}.footer-cell{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);border-block-start:1px solid var(--calcite-color-border-3)}.number-cell,.selection-cell{border-inline-end:1px solid var(--calcite-color-border-3);inline-size:2rem;min-inline-size:2rem}.selection-cell{cursor:pointer;color:var(--calcite-color-text-3);inset-inline-start:2rem}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-cell-background:var(--calcite-color-foreground-current)}.selection-cell.selected-cell{box-shadow:inset 0.25rem 0 0 0 var(--calcite-color-brand);color:var(--calcite-color-brand)}.selection-cell.selected-cell calcite-icon{color:var(--calcite-color-brand)}.calcite--rtl.selection-cell.selected-cell{box-shadow:inset -0.25rem 0 0 0 var(--calcite-color-brand)}.selection-cell{vertical-align:middle}.selection-cell ::slotted(calcite-icon){pointer-events:none;margin-block-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";

const TableCell = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.updateScreenReaderContentsText = () => {
            this.contentsText = this.el.textContent;
        };
        this.onContainerBlur = () => {
            this.focused = false;
        };
        this.onContainerFocus = () => {
            this.focused = true;
        };
        this.alignment = "start";
        this.colSpan = undefined;
        this.rowSpan = undefined;
        this.disabled = undefined;
        this.lastCell = undefined;
        this.numberCell = undefined;
        this.parentRowIsSelected = undefined;
        this.parentRowPositionLocalized = undefined;
        this.parentRowType = undefined;
        this.positionInRow = undefined;
        this.readCellContentsToAT = undefined;
        this.scale = "m";
        this.selectionCell = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.contentsText = "";
        this.defaultMessages = undefined;
        this.focused = false;
        this.selectionText = "";
        this.effectiveLocale = "";
    }
    onSelectedChange() {
        this.updateScreenReaderSelectionText();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
        this.updateScreenReaderContentsText();
        this.updateScreenReaderSelectionText();
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        connectInteractive(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectInteractive(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.containerEl.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    updateScreenReaderSelectionText() {
        var _a, _b, _c, _d, _e, _f;
        const selectedText = `${(_a = this.messages) === null || _a === void 0 ? void 0 : _a.row} ${this.parentRowPositionLocalized} ${(_b = this.messages) === null || _b === void 0 ? void 0 : _b.selected} ${(_c = this.messages) === null || _c === void 0 ? void 0 : _c.keyboardDeselect}`;
        const unselectedText = `${(_d = this.messages) === null || _d === void 0 ? void 0 : _d.row} ${this.parentRowPositionLocalized} ${(_e = this.messages) === null || _e === void 0 ? void 0 : _e.unselected} ${(_f = this.messages) === null || _f === void 0 ? void 0 : _f.keyboardSelect}`;
        this.selectionText = this.parentRowIsSelected ? selectedText : unselectedText;
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, null, h(InteractiveContainer, { disabled: this.disabled }, h("td", { "aria-disabled": this.disabled, class: {
                [CSS$1.footerCell]: this.parentRowType === "foot",
                [CSS$1.numberCell]: this.numberCell,
                [CSS$1.selectionCell]: this.selectionCell,
                [CSS$1.selectedCell]: this.parentRowIsSelected,
                [CSS$1.lastCell]: this.lastCell,
                [CSS_UTILITY.rtl]: dir === "rtl",
            }, colSpan: this.colSpan, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, role: "gridcell", rowSpan: this.rowSpan, tabIndex: this.disabled ? -1 : 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.containerEl = el) }, (this.selectionCell || this.readCellContentsToAT) && this.focused && (h("span", { "aria-hidden": true, "aria-live": "polite", class: CSS$1.assistiveText }, this.selectionCell && this.selectionText, this.readCellContentsToAT && !this.selectionCell && this.contentsText)), h("slot", { onSlotchange: this.updateScreenReaderContentsText })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "parentRowIsSelected": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TableCell.style = tableCellCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    numberCell: "number-cell",
    selectionCell: "selection-cell",
    bodyRow: "body-row",
    footerRow: "footer-row",
    heading: "heading",
    description: "description",
    multipleSelectionCell: "cell--multiple-selection",
    assistiveText: "assistive-text",
    active: "active",
    selectedCell: "selected-cell",
    lastCell: "last-cell",
};

const tableHeaderCss = ":host{--calcite-internal-table-header-background:var(--calcite-table-header-background, var(--calcite-color-foreground-2));--calcite-internal-table-header-border-color:var(--calcite-table-border-color, var(--calcite-color-border-3));display:contents}:host([alignment=center]) th{text-align:center}:host([alignment=end]) th{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}th{white-space:normal;text-align:start;vertical-align:top;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);outline-color:transparent;font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-internal-table-header-border-color);border-block-end:1px solid var(--calcite-internal-table-header-border-color);padding-block:calc(var(--calcite-internal-table-cell-padding) * 1.5);padding-inline:var(--calcite-internal-table-cell-padding);background-color:var(--calcite-internal-table-header-background)}th:focus-within{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}th.last-cell{border-inline-end:0}th.body-row,th.footer-row{vertical-align:middle;border-block-end:0}th.footer-row{border-block-start:1px solid var(--calcite-internal-table-header-border-color)}.cell--multiple-selection{cursor:pointer;vertical-align:middle;color:var(--calcite-color-text-3)}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-header-background:var(--calcite-color-foreground-current)}.number-cell,.selection-cell{color:var(--calcite-color-text-2);inline-size:2rem;min-inline-size:2rem}.selection-cell calcite-icon.active{color:var(--calcite-color-brand)}.number-cell calcite-icon,.selection-cell calcite-icon{margin-inline-start:auto;margin-inline-end:auto;vertical-align:middle}.heading{color:var(--calcite-color-text-1)}.description{color:var(--calcite-color-text-3);font-size:var(--calcite-internal-table-cell-font-size-secondary)}";

const TableHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.alignment = "start";
        this.colSpan = undefined;
        this.description = undefined;
        this.heading = undefined;
        this.rowSpan = undefined;
        this.lastCell = undefined;
        this.numberCell = false;
        this.parentRowIsSelected = undefined;
        this.parentRowPosition = undefined;
        this.parentRowType = undefined;
        this.positionInRow = undefined;
        this.scale = undefined;
        this.selectedRowCount = undefined;
        this.selectedRowCountLocalized = undefined;
        this.selectionCell = false;
        this.selectionMode = undefined;
        this.bodyRowCount = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.screenReaderText = "";
        this.effectiveLocale = "";
    }
    onSelectedChange() {
        this.updateScreenReaderText();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
        this.updateScreenReaderText();
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
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.containerEl.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    updateScreenReaderText() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let text = "";
        const sharedText = `${this.selectedRowCountLocalized} ${(_a = this.messages) === null || _a === void 0 ? void 0 : _a.selected}`;
        if (this.numberCell) {
            text = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.rowNumber;
        }
        else if (this.selectionMode === "single") {
            text = `${(_c = this.messages) === null || _c === void 0 ? void 0 : _c.selectionColumn}. ${sharedText}`;
        }
        else if (this.bodyRowCount === this.selectedRowCount) {
            text = `${(_d = this.messages) === null || _d === void 0 ? void 0 : _d.selectionColumn}. ${(_e = this.messages) === null || _e === void 0 ? void 0 : _e.all} ${sharedText} ${(_f = this.messages) === null || _f === void 0 ? void 0 : _f.keyboardDeselectAll}`;
        }
        else {
            text = `${(_g = this.messages) === null || _g === void 0 ? void 0 : _g.selectionColumn}. ${sharedText} ${(_h = this.messages) === null || _h === void 0 ? void 0 : _h.keyboardSelectAll}`;
        }
        this.screenReaderText = text;
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const scope = this.rowSpan
            ? "rowgroup"
            : this.colSpan
                ? "colgroup"
                : this.parentRowType === "body"
                    ? "row"
                    : "col";
        const allSelected = this.selectedRowCount === this.bodyRowCount;
        const selectionIcon = allSelected ? "check-square-f" : "check-square";
        return (h(Host, null, h("th", { "aria-colindex": this.parentRowType !== "body" ? this.positionInRow : "", class: {
                [CSS.bodyRow]: this.parentRowType === "body",
                [CSS.footerRow]: this.parentRowType === "foot",
                [CSS.numberCell]: this.numberCell,
                [CSS.selectionCell]: this.selectionCell,
                [CSS.selectedCell]: this.parentRowIsSelected,
                [CSS.multipleSelectionCell]: this.selectionMode === "multiple",
                [CSS.lastCell]: this.lastCell,
            }, colSpan: this.colSpan, role: "columnheader", rowSpan: this.rowSpan, scope: scope, tabIndex: 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.containerEl = el) }, this.heading && h("div", { class: CSS.heading }, this.heading), this.description && h("div", { class: CSS.description }, this.description), this.selectionCell && this.selectionMode === "multiple" && (h("calcite-icon", { class: { [CSS.active]: allSelected }, icon: selectionIcon, scale: getIconScale(this.scale) })), (this.selectionCell || this.numberCell) && (h("span", { "aria-hidden": true, "aria-live": "polite", class: CSS.assistiveText }, this.screenReaderText)))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedRowCount": ["onSelectedChange"],
        "selectedRowCountLocalized": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TableHeader.style = tableHeaderCss;

export { TableCell as calcite_table_cell, TableHeader as calcite_table_header };
