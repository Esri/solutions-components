/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { s as setUpMessages, c as connectMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$1 } from './icon.js';

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

const TableHeader = /*@__PURE__*/ proxyCustomElement(class TableHeader extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    get el() { return this; }
    static get watchers() { return {
        "selectedRowCount": ["onSelectedChange"],
        "selectedRowCountLocalized": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return tableHeaderCss; }
}, [1, "calcite-table-header", {
        "alignment": [513],
        "colSpan": [514, "col-span"],
        "description": [513],
        "heading": [513],
        "rowSpan": [514, "row-span"],
        "lastCell": [4, "last-cell"],
        "numberCell": [4, "number-cell"],
        "parentRowIsSelected": [4, "parent-row-is-selected"],
        "parentRowPosition": [2, "parent-row-position"],
        "parentRowType": [1, "parent-row-type"],
        "positionInRow": [2, "position-in-row"],
        "scale": [1],
        "selectedRowCount": [2, "selected-row-count"],
        "selectedRowCountLocalized": [1, "selected-row-count-localized"],
        "selectionCell": [4, "selection-cell"],
        "selectionMode": [1, "selection-mode"],
        "bodyRowCount": [2, "body-row-count"],
        "messages": [1040],
        "messageOverrides": [1040],
        "defaultMessages": [32],
        "screenReaderText": [32],
        "effectiveLocale": [32],
        "setFocus": [64]
    }, undefined, {
        "selectedRowCount": ["onSelectedChange"],
        "selectedRowCountLocalized": ["onSelectedChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-table-header", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-table-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TableHeader);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { TableHeader as T, defineCustomElement as d };
