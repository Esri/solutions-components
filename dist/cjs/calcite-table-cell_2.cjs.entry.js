/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const loadable = require('./loadable-2e2626dc.js');
const t9n = require('./t9n-42ba6ea3.js');
const interactive = require('./interactive-89f913ba.js');
const locale = require('./locale-42c21404.js');
const dom = require('./dom-6a9b6275.js');
const resources = require('./resources-dfe71ff2.js');
const component = require('./component-a4c6a35d.js');
require('./browser-69696af0.js');
require('./key-d6da79d8.js');
require('./observers-8fed90f3.js');
require('./guid-02e5380f.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    contentCell: "content-cell",
    numberCell: "number-cell",
    footerCell: "footer-cell",
    selectionCell: "selection-cell",
    selectedCell: "selected-cell",
    assistiveText: "assistive-text",
    lastCell: "last-cell",
    staticCell: "static-cell",
};

const tableCellCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-internal-table-cell-background:var(--calcite-table-cell-background, transparent);display:contents}:host([alignment=center]) td:not(.selection-cell):not(.number-cell){text-align:center}:host([alignment=end]) td:not(.selection-cell):not(.number-cell){text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}td{white-space:normal;text-align:start;vertical-align:middle;color:var(--calcite-color-text-1);background:var(--calcite-internal-table-cell-background);font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-color-border-3);padding:var(--calcite-internal-table-cell-padding)}td:not(.static-cell){outline-color:transparent}td:not(.static-cell):focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}td.start.content-cell{vertical-align:top}td.end.content-cell{vertical-align:bottom}td.last-cell{border-inline-end:0}.number-cell{background-color:var(--calcite-color-foreground-2)}.footer-cell{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);border-block-start:1px solid var(--calcite-color-border-3)}.number-cell,.selection-cell{text-align:center;border-inline-end:1px solid var(--calcite-color-border-3);inline-size:2rem;min-inline-size:2rem}.selection-cell{color:var(--calcite-color-text-3);inset-inline-start:2rem}.selection-cell:not(.footer-cell){cursor:pointer}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-cell-background:var(--calcite-color-foreground-current)}.selection-cell.selected-cell{box-shadow:inset 0.25rem 0 0 0 var(--calcite-color-brand);color:var(--calcite-color-brand)}.selection-cell.selected-cell calcite-icon{color:var(--calcite-color-brand)}.calcite--rtl.selection-cell.selected-cell{box-shadow:inset -0.25rem 0 0 0 var(--calcite-color-brand)}.selection-cell{vertical-align:middle}.selection-cell ::slotted(calcite-icon){pointer-events:none;margin-block-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteTableCellStyle0 = tableCellCss;

const TableCell = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.interactionMode = "interactive";
        this.lastCell = undefined;
        this.numberCell = undefined;
        this.parentRowIsSelected = undefined;
        this.parentRowAlignment = "start";
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
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
        this.updateScreenReaderContentsText();
        this.updateScreenReaderSelectionText();
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    connectedCallback() {
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        interactive.connectInteractive(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        interactive.disconnectInteractive(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.containerEl.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    updateScreenReaderSelectionText() {
        const selectedText = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.selected} ${this.messages?.keyboardDeselect}`;
        const unselectedText = `${this.messages?.row} ${this.parentRowPositionLocalized} ${this.messages?.unselected} ${this.messages?.keyboardSelect}`;
        this.selectionText = this.parentRowIsSelected ? selectedText : unselectedText;
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const dir = dom.getElementDir(this.el);
        const staticCell = this.disabled ||
            (this.interactionMode === "static" &&
                (!this.selectionCell || (this.selectionCell && this.parentRowType === "foot")));
        return (index.h(index.Host, { key: '4d52967c0b56ad11ae0cd2f2bcda584a4c32d7aa' }, index.h(interactive.InteractiveContainer, { key: '38dc03f0b7b46647d55510c954da818991134923', disabled: this.disabled }, index.h("td", { key: 'f33e06346894caae2199743b02b3d82d45227a9c', "aria-disabled": this.disabled, class: {
                [CSS$1.footerCell]: this.parentRowType === "foot",
                [CSS$1.contentCell]: !this.numberCell && !this.selectionCell,
                [CSS$1.numberCell]: this.numberCell,
                [CSS$1.selectionCell]: this.selectionCell,
                [CSS$1.selectedCell]: this.parentRowIsSelected,
                [CSS$1.lastCell]: this.lastCell && (!this.rowSpan || (this.colSpan && !!this.rowSpan)),
                [resources.CSS_UTILITY.rtl]: dir === "rtl",
                [CSS$1.staticCell]: staticCell,
                [this.parentRowAlignment]: this.parentRowAlignment === "start" || this.parentRowAlignment === "end",
            }, colSpan: this.colSpan, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, ref: (el) => (this.containerEl = el), role: this.interactionMode === "interactive" ? "gridcell" : "cell", rowSpan: this.rowSpan, tabIndex: staticCell ? -1 : 0 }, (this.selectionCell || this.readCellContentsToAT) && (index.h("span", { key: '09f8419edf6633fec643980debdab653cfa1aa18', "aria-hidden": true, "aria-live": this.focused ? "polite" : "off", class: CSS$1.assistiveText }, this.selectionCell && this.selectionText, this.readCellContentsToAT && !this.selectionCell && this.contentsText)), index.h("slot", { key: '05f0410a867cb1cfab5a01b1d4e374002314493d', onSlotchange: this.updateScreenReaderContentsText })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "parentRowIsSelected": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TableCell.style = CalciteTableCellStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    contentCell: "content-cell",
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
    staticCell: "static-cell",
};
const ICONS = {
    checked: "check-square-f",
    indeterminate: "minus-square-f",
    unchecked: "square",
};

const tableHeaderCss = ":host{--calcite-internal-table-header-background:var(--calcite-table-header-background, var(--calcite-color-foreground-2));--calcite-internal-table-header-border-color:var(--calcite-table-border-color, var(--calcite-color-border-3));display:contents}:host([alignment=center]) th{text-align:center}:host([alignment=end]) th{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}th{white-space:normal;text-align:start;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-internal-table-header-border-color);border-block-end:1px solid var(--calcite-internal-table-header-border-color);padding-block:calc(var(--calcite-internal-table-cell-padding) * 1.5);padding-inline:var(--calcite-internal-table-cell-padding);background-color:var(--calcite-internal-table-header-background)}th:not(.static-cell){outline-color:transparent}th:not(.static-cell):not(.static-cell):focus-within{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}th:not(.center):not(.end).content-cell{vertical-align:top}th.center{vertical-align:middle}th.end.content-cell{vertical-align:bottom}th.body-row,th.footer-row{padding-block:var(--calcite-internal-table-cell-padding);border-block-end:0}th.footer-row{border-block-start:1px solid var(--calcite-internal-table-header-border-color)}th.last-cell{border-inline-end:0}.cell--multiple-selection{cursor:pointer;vertical-align:middle;color:var(--calcite-color-text-3)}.cell--multiple-selection:not(.end){vertical-align:middle}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-header-background:var(--calcite-color-foreground-current)}.number-cell,.selection-cell{color:var(--calcite-color-text-2);inline-size:2rem;min-inline-size:2rem}.selection-cell calcite-icon.active{color:var(--calcite-color-brand)}.number-cell calcite-icon,.selection-cell calcite-icon{margin-inline-start:auto;margin-inline-end:auto;vertical-align:middle}.heading{color:var(--calcite-color-text-1)}.description{color:var(--calcite-color-text-3);font-size:var(--calcite-internal-table-cell-font-size-secondary)}";
const CalciteTableHeaderStyle0 = tableHeaderCss;

const TableHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.onContainerBlur = () => {
            this.focused = false;
        };
        this.onContainerFocus = () => {
            this.focused = true;
        };
        this.alignment = "start";
        this.colSpan = undefined;
        this.description = undefined;
        this.heading = undefined;
        this.rowSpan = undefined;
        this.interactionMode = "interactive";
        this.lastCell = undefined;
        this.numberCell = false;
        this.parentRowAlignment = "start";
        this.parentRowIsSelected = undefined;
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
        this.focused = false;
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
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
        this.updateScreenReaderText();
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    connectedCallback() {
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.containerEl.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    updateScreenReaderText() {
        let text = "";
        const sharedText = `${this.selectedRowCountLocalized} ${this.messages?.selected}`;
        if (this.numberCell) {
            text = this.messages?.rowNumber;
        }
        else if (this.selectionMode === "single") {
            text = `${this.messages?.selectionColumn}. ${sharedText}`;
        }
        else if (this.bodyRowCount === this.selectedRowCount) {
            text = `${this.messages?.selectionColumn}. ${this.messages?.all} ${sharedText} ${this.messages?.keyboardDeselectAll}`;
        }
        else {
            text = `${this.messages?.selectionColumn}. ${sharedText} ${this.messages?.keyboardSelectAll}`;
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
        const checked = this.selectedRowCount === this.bodyRowCount;
        const indeterminate = this.selectedRowCount > 0;
        const selectionIcon = checked
            ? ICONS.checked
            : indeterminate
                ? ICONS.indeterminate
                : ICONS.unchecked;
        const staticCell = this.interactionMode === "static" && !this.selectionCell;
        return (index.h(index.Host, { key: '55805e40fd5617971301fe6c3df52fd45ff4486e' }, index.h("th", { key: '2f7c756603386e578a871558645daac673fd6cdc', "aria-colindex": this.parentRowType === "head" ? this.positionInRow : undefined, class: {
                [CSS.bodyRow]: this.parentRowType === "body",
                [CSS.footerRow]: this.parentRowType === "foot",
                [CSS.contentCell]: !this.numberCell && !this.selectionCell,
                [CSS.numberCell]: this.numberCell,
                [CSS.selectionCell]: this.selectionCell,
                [CSS.selectedCell]: this.parentRowIsSelected,
                [CSS.multipleSelectionCell]: this.selectionMode === "multiple",
                [CSS.staticCell]: staticCell,
                [CSS.lastCell]: this.lastCell && (!this.rowSpan || (this.colSpan && !!this.rowSpan)),
                [this.parentRowAlignment]: this.parentRowAlignment === "center" || this.parentRowAlignment === "end",
            }, colSpan: this.colSpan, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, ref: (el) => (this.containerEl = el), role: this.parentRowType === "head" ? "columnheader" : "rowheader", rowSpan: this.rowSpan, scope: scope, tabIndex: this.selectionCell ? 0 : staticCell ? -1 : 0 }, this.heading && index.h("div", { key: 'e347778a1676cf40c5f4c2937a590ac8b6c1fde0', class: CSS.heading }, this.heading), this.description && index.h("div", { key: '13c5d2ec28bf68132c1217be299aa4363794f370', class: CSS.description }, this.description), this.selectionCell && this.selectionMode === "multiple" && (index.h("calcite-icon", { key: '11f84e3c1c3cb8be33c8c5aa4a2cc4f5d01fbbfa', class: { [CSS.active]: indeterminate || checked }, icon: selectionIcon, scale: component.getIconScale(this.scale) })), (this.selectionCell || this.numberCell) && (index.h("span", { key: '23c2914de335aa02bf99b1d9286ad2b2ad38cccb', "aria-hidden": true, "aria-live": this.focused ? "polite" : "off", class: CSS.assistiveText }, this.screenReaderText)))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selectedRowCount": ["onSelectedChange"],
        "selectedRowCountLocalized": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TableHeader.style = CalciteTableHeaderStyle0;

exports.calcite_table_cell = TableCell;
exports.calcite_table_header = TableHeader;
