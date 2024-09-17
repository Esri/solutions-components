/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement, F as Fragment } from './p-6eb37ed2.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import { g as getSlotted } from './p-68ec5c15.js';
import './p-c638d28e.js';
import './p-acaae81d.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
        registerInstance(this, hostRef);
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
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { el } = this;
        const contentNode = (h("div", { key: '7c40a32627154faa3cbb1caa515f156481b79a7a', class: CSS.content }, h("slot", { key: 'fe29fde212e5e65a0e0baf633a086dd8e30b5eb8' })));
        const actionBar = getSlotted(el, SLOTS.actionBar);
        const actionBarNode = actionBar ? (h("div", { class: CSS.actionBarContainer, key: "action-bar" }, h("slot", { name: SLOTS.actionBar }))) : null;
        const children = [actionBarNode, contentNode];
        if (actionBar?.position === "end") {
            children.reverse();
        }
        return h(Fragment, { key: '9e200163d756dc56a18a7a15692b5804bc6fc874' }, children);
    }
    get el() { return getElement(this); }
};
ShellCenterRow.style = CalciteShellCenterRowStyle0;

export { ShellCenterRow as calcite_shell_center_row };
