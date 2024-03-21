/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement } from './index-164d485a.js';
import { g as guid } from './guid-b75a5f7b.js';
import { g as getAncestors, a as getDepth } from './utils-ef0ff036.js';
import './dom-38c6f027.js';
import './resources-8834f920.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    list: "list",
    label: "label",
    title: "title",
};

const comboboxItemGroupCss = ".scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent:1rem}:host,.list{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),.list:focus{outline:2px solid transparent;outline-offset:2px}.label{box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:0px;max-inline-size:100%;color:var(--calcite-color-text-3)}.title{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  );border:0 solid;display:block;flex:1 1 0%;border-block-end-width:1px;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2);word-wrap:break-word;word-break:break-word;border-block-end-color:var(--calcite-color-border-3);padding-block:var(--calcite-combobox-item-spacing-unit-l);padding-inline:var(--calcite-combobox-item-spacing-unit-s);margin-inline-start:var(--calcite-combobox-item-indent-value)}::slotted(calcite-combobox-item-group:not([after-empty-group])){padding-block-start:var(--calcite-combobox-item-spacing-unit-l)}:host([hidden]){display:none}[hidden]{display:none}";

const ComboboxItemGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.guid = guid();
        this.afterEmptyGroup = false;
        this.ancestors = undefined;
        this.label = undefined;
        this.scale = "m";
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.ancestors = getAncestors(this.el);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { el, scale } = this;
        const depth = getDepth(el);
        return (h("ul", { "aria-labelledby": this.guid, class: { [CSS.list]: true, [`scale--${scale}`]: true }, role: "group" }, h("li", { class: { [CSS.label]: true }, id: this.guid, role: "presentation", style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, h("span", { class: CSS.title }, this.label)), h("slot", null)));
    }
    get el() { return getElement(this); }
};
ComboboxItemGroup.style = comboboxItemGroupCss;

export { ComboboxItemGroup as calcite_combobox_item_group };
