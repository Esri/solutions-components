/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const guid = require('./guid-02e5380f.js');
const utils = require('./utils-051e0119.js');
require('./dom-6a9b6275.js');
require('./resources-dfe71ff2.js');
require('./browser-69696af0.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    list: "list",
    label: "label",
    title: "title",
};

const comboboxItemGroupCss = ".scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent:1rem}:host,.list{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),.list:focus{outline:2px solid transparent;outline-offset:2px}.label{box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:0px;max-inline-size:100%;color:var(--calcite-color-text-3)}.title{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  );border:0 solid;display:block;flex:1 1 0%;border-block-end-width:1px;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2);word-wrap:break-word;word-break:break-word;border-block-end-color:var(--calcite-color-border-3);padding-block:var(--calcite-combobox-item-spacing-unit-l);padding-inline:var(--calcite-combobox-item-spacing-unit-s);margin-inline-start:var(--calcite-combobox-item-indent-value)}::slotted(calcite-combobox-item-group:not([after-empty-group])){padding-block-start:var(--calcite-combobox-item-spacing-unit-l)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteComboboxItemGroupStyle0 = comboboxItemGroupCss;

const ComboboxItemGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.guid = guid.guid();
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
        this.ancestors = utils.getAncestors(this.el);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { el, scale } = this;
        const depth = utils.getDepth(el);
        return (index.h("ul", { key: 'e57f7805f680b7d8b89f1f72c98197d81ad743dd', "aria-labelledby": this.guid, class: { [CSS.list]: true, [`scale--${scale}`]: true }, role: "group" }, index.h("li", { key: '45ab46a79eb035a0785ea9d2665a3fce8cf7c183', class: { [CSS.label]: true }, id: this.guid, role: "presentation", style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, index.h("span", { key: '380bfd8d85a132df1252e88971adca1b50104801', class: CSS.title }, this.label)), index.h("slot", { key: 'e0fd9bec45fc259ee2b439a0b80665c742fb5632' })));
    }
    get el() { return index.getElement(this); }
};
ComboboxItemGroup.style = CalciteComboboxItemGroupStyle0;

exports.calcite_combobox_item_group = ComboboxItemGroup;
