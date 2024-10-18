/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { j as slotChangeHasAssignedElement } from './dom.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    actionsStart: "actions-start",
    contentStart: "content-start",
    content: "content",
    contentEnd: "content-end",
    actionsEnd: "actions-end",
};
const SLOTS = {
    actionsStart: "actions-start",
    contentStart: "content-start",
    contentEnd: "content-end",
    actionsEnd: "actions-end",
};

const stackCss = ":host([disabled]) .content{cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) .content *,:host([disabled]) .content ::slotted(*){pointer-events:none}:host{display:flex;flex:1 1 0%;flex-direction:column}.container{display:flex;flex:1 1 auto;align-items:stretch;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;font-size:var(--calcite-font-size--2);line-height:1.375;padding-inline:var(--calcite-stack-padding-inline, 0.75rem);padding-block:var(--calcite-stack-padding-block, 0.5rem)}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:0 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){margin-inline:0.75rem;align-self:center}.actions-start,.actions-end,.content-start,.content-end{display:flex;align-items:center}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-handle),.actions-end ::slotted(calcite-dropdown){align-self:stretch;color:inherit}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteStackStyle0 = stackCss;

const Stack = /*@__PURE__*/ proxyCustomElement(class Stack extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleActionsStartSlotChange = (event) => {
            this.hasActionsStart = slotChangeHasAssignedElement(event);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = slotChangeHasAssignedElement(event);
        };
        this.handleContentStartSlotChange = (event) => {
            this.hasContentStart = slotChangeHasAssignedElement(event);
        };
        this.handleContentEndSlotChange = (event) => {
            this.hasContentEnd = slotChangeHasAssignedElement(event);
        };
        this.disabled = false;
        this.hasActionsStart = false;
        this.hasActionsEnd = false;
        this.hasContentStart = false;
        this.hasContentEnd = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderActionsStart() {
        const { hasActionsStart } = this;
        return (h("div", { class: CSS.actionsStart, hidden: !hasActionsStart, key: "actions-start-container" }, h("slot", { name: SLOTS.actionsStart, onSlotchange: this.handleActionsStartSlotChange })));
    }
    renderActionsEnd() {
        const { hasActionsEnd } = this;
        return (h("div", { class: CSS.actionsEnd, hidden: !hasActionsEnd, key: "actions-end-container" }, h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange })));
    }
    renderContentStart() {
        const { hasContentStart } = this;
        return (h("div", { class: CSS.contentStart, hidden: !hasContentStart }, h("slot", { name: SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange })));
    }
    renderDefaultContent() {
        return (h("div", { class: CSS.content }, h("slot", null)));
    }
    renderContentEnd() {
        const { hasContentEnd } = this;
        return (h("div", { class: CSS.contentEnd, hidden: !hasContentEnd }, h("slot", { name: SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange })));
    }
    render() {
        return (h(Host, { key: '97f052828720d715fd3b11a4b0e77fa085127796' }, h("div", { key: '5351cc20a8a437763894fef35ecc7a7240cb7c46', class: CSS.container }, this.renderActionsStart(), this.renderContentStart(), this.renderDefaultContent(), this.renderContentEnd(), this.renderActionsEnd())));
    }
    static get style() { return CalciteStackStyle0; }
}, [1, "calcite-stack", {
        "disabled": [516],
        "hasActionsStart": [32],
        "hasActionsEnd": [32],
        "hasContentStart": [32],
        "hasContentEnd": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-stack"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Stack);
            }
            break;
    } });
}
defineCustomElement();

export { SLOTS as S, Stack as a, defineCustomElement as d };
