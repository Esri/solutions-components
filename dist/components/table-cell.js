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
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    numberCell: "number-cell",
    footerCell: "footer-cell",
    selectionCell: "selection-cell",
    selectedCell: "selected-cell",
    assistiveText: "assistive-text",
    lastCell: "last-cell",
};

const tableCellCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-internal-table-cell-background:var(--calcite-table-cell-background, transparent);display:contents}:host([alignment=center]) td{text-align:center}:host([alignment=end]) td{text-align:end}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}td{white-space:normal;text-align:start;vertical-align:middle;color:var(--calcite-color-text-1);outline-color:transparent;background:var(--calcite-internal-table-cell-background);font-size:var(--calcite-internal-table-cell-font-size);border-inline-end:1px solid var(--calcite-color-border-3);padding:var(--calcite-internal-table-cell-padding)}td:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}td.last-cell{border-inline-end:0}.number-cell{background-color:var(--calcite-color-foreground-2)}.footer-cell{background-color:var(--calcite-color-background);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);border-block-start:1px solid var(--calcite-color-border-3)}.number-cell,.selection-cell{border-inline-end:1px solid var(--calcite-color-border-3);inline-size:2rem;min-inline-size:2rem}.selection-cell{cursor:pointer;color:var(--calcite-color-text-3);inset-inline-start:2rem}.selected-cell:not(.number-cell):not(.footer-cell){--calcite-internal-table-cell-background:var(--calcite-color-foreground-current)}.selection-cell.selected-cell{box-shadow:inset 0.25rem 0 0 0 var(--calcite-color-brand);color:var(--calcite-color-brand)}.selection-cell.selected-cell calcite-icon{color:var(--calcite-color-brand)}.calcite--rtl.selection-cell.selected-cell{box-shadow:inset -0.25rem 0 0 0 var(--calcite-color-brand)}.selection-cell{vertical-align:middle}.selection-cell ::slotted(calcite-icon){pointer-events:none;margin-block-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";

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
                [CSS.footerCell]: this.parentRowType === "foot",
                [CSS.numberCell]: this.numberCell,
                [CSS.selectionCell]: this.selectionCell,
                [CSS.selectedCell]: this.parentRowIsSelected,
                [CSS.lastCell]: this.lastCell,
                [CSS_UTILITY.rtl]: dir === "rtl",
            }, colSpan: this.colSpan, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, role: "gridcell", rowSpan: this.rowSpan, tabIndex: this.disabled ? -1 : 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.containerEl = el) }, (this.selectionCell || this.readCellContentsToAT) && this.focused && (h("span", { "aria-hidden": true, "aria-live": "polite", class: CSS.assistiveText }, this.selectionCell && this.selectionText, this.readCellContentsToAT && !this.selectionCell && this.contentsText)), h("slot", { onSlotchange: this.updateScreenReaderContentsText })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "parentRowIsSelected": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return tableCellCss; }
}, [1, "calcite-table-cell", {
        "alignment": [513],
        "colSpan": [514, "col-span"],
        "rowSpan": [514, "row-span"],
        "disabled": [4],
        "lastCell": [4, "last-cell"],
        "numberCell": [4, "number-cell"],
        "parentRowIsSelected": [4, "parent-row-is-selected"],
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
