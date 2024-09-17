/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { g as getElementDir } from './dom.js';
import { C as CSS_UTILITY } from './resources.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
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

const TableCell = /*@__PURE__*/ proxyCustomElement(class TableCell extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        const dir = getElementDir(this.el);
        const staticCell = this.disabled ||
            (this.interactionMode === "static" &&
                (!this.selectionCell || (this.selectionCell && this.parentRowType === "foot")));
        return (h(Host, { key: '4d52967c0b56ad11ae0cd2f2bcda584a4c32d7aa' }, h(InteractiveContainer, { key: '38dc03f0b7b46647d55510c954da818991134923', disabled: this.disabled }, h("td", { key: 'f33e06346894caae2199743b02b3d82d45227a9c', "aria-disabled": this.disabled, class: {
                [CSS.footerCell]: this.parentRowType === "foot",
                [CSS.contentCell]: !this.numberCell && !this.selectionCell,
                [CSS.numberCell]: this.numberCell,
                [CSS.selectionCell]: this.selectionCell,
                [CSS.selectedCell]: this.parentRowIsSelected,
                [CSS.lastCell]: this.lastCell && (!this.rowSpan || (this.colSpan && !!this.rowSpan)),
                [CSS_UTILITY.rtl]: dir === "rtl",
                [CSS.staticCell]: staticCell,
                [this.parentRowAlignment]: this.parentRowAlignment === "start" || this.parentRowAlignment === "end",
            }, colSpan: this.colSpan, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, ref: (el) => (this.containerEl = el), role: this.interactionMode === "interactive" ? "gridcell" : "cell", rowSpan: this.rowSpan, tabIndex: staticCell ? -1 : 0 }, (this.selectionCell || this.readCellContentsToAT) && (h("span", { key: '09f8419edf6633fec643980debdab653cfa1aa18', "aria-hidden": true, "aria-live": this.focused ? "polite" : "off", class: CSS.assistiveText }, this.selectionCell && this.selectionText, this.readCellContentsToAT && !this.selectionCell && this.contentsText)), h("slot", { key: '05f0410a867cb1cfab5a01b1d4e374002314493d', onSlotchange: this.updateScreenReaderContentsText })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "parentRowIsSelected": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteTableCellStyle0; }
}, [1, "calcite-table-cell", {
        "alignment": [513],
        "colSpan": [514, "col-span"],
        "rowSpan": [514, "row-span"],
        "disabled": [4],
        "interactionMode": [1, "interaction-mode"],
        "lastCell": [4, "last-cell"],
        "numberCell": [4, "number-cell"],
        "parentRowIsSelected": [4, "parent-row-is-selected"],
        "parentRowAlignment": [1, "parent-row-alignment"],
        "parentRowPositionLocalized": [1, "parent-row-position-localized"],
        "parentRowType": [1, "parent-row-type"],
        "positionInRow": [2, "position-in-row"],
        "readCellContentsToAT": [4, "read-cell-contents-to-a-t"],
        "scale": [1],
        "selectionCell": [4, "selection-cell"],
        "messages": [1040],
        "messageOverrides": [1040],
        "contentsText": [32],
        "defaultMessages": [32],
        "focused": [32],
        "selectionText": [32],
        "effectiveLocale": [32],
        "setFocus": [64]
    }, undefined, {
        "parentRowIsSelected": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-table-cell"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-table-cell":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TableCell);
            }
            break;
    } });
}
defineCustomElement();

export { TableCell as T, defineCustomElement as d };
