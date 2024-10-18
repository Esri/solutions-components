/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const conditionalSlot = require('./conditionalSlot-37ff4832.js');
const dom = require('./dom-795d4a33.js');
require('./observers-18d87cb5.js');
require('./browser-333a21c5.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    actionBarContainer: "action-bar-container",
    content: "content",
};
const SLOTS = {
    actionBar: "action-bar",
};

const shellCenterRowCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{z-index:var(--calcite-z-index);display:flex;flex:1 1 auto;overflow:hidden;background-color:transparent}.content{margin:0px;display:flex;block-size:100%;inline-size:100%;overflow:hidden;flex:1 0 0}.action-bar-container{display:flex}:host([detached]){margin-inline:0.5rem;margin-block:0.5rem 1.5rem}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}:host([detached]){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;border-width:0px;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([position=end]){align-self:flex-end}:host([position=start]){align-self:flex-start}:host([height-scale=s]){block-size:33.333333%}:host([height-scale=m]){block-size:70%}:host([height-scale=l]){block-size:100%}:host([height-scale=l][detached]){block-size:calc(100% - 2rem)}::slotted(calcite-panel){block-size:100%;inline-size:100%}::slotted(calcite-action-bar),::slotted(calcite-action-bar[position=end]){border-inline-end:1px solid;border-color:var(--calcite-color-border-3)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellCenterRowStyle0 = shellCenterRowCss;

const ShellCenterRow = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.detached = false;
        this.heightScale = "s";
        this.position = "end";
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { el } = this;
        const contentNode = (index.h("div", { key: '31239015e9582ebbe43f3fe7a6b8fb6b2750b0d7', class: CSS.content }, index.h("slot", { key: 'eee4b393dfa79405d9a48e6c2db016017a6e9a1f' })));
        const actionBar = dom.getSlotted(el, SLOTS.actionBar);
        const actionBarNode = actionBar ? (index.h("div", { class: CSS.actionBarContainer, key: "action-bar" }, index.h("slot", { name: SLOTS.actionBar }))) : null;
        const children = [actionBarNode, contentNode];
        if (actionBar?.position === "end") {
            children.reverse();
        }
        return index.h(index.Fragment, { key: 'ab4be18f37ab916e222faa0339bede7d01f6f08a' }, children);
    }
    get el() { return index.getElement(this); }
};
ShellCenterRow.style = CalciteShellCenterRowStyle0;

exports.calcite_shell_center_row = ShellCenterRow;
