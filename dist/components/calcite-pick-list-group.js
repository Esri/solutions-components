/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Fragment } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted } from './dom.js';
import { H as Heading, c as constrainHeadingLevel } from './Heading.js';
import { C as CSS, S as SLOTS } from './resources5.js';

const pickListGroupCss = ":host{margin-block-end:0.25rem;box-sizing:border-box;display:block;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host(:last-child){margin-block-end:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.heading{margin-block:0.5rem;margin-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-color-text-3)}.container--indented{margin-inline-start:1.5rem}:host([hidden]){display:none}[hidden]{display:none}";

const PickListGroup = /*@__PURE__*/ proxyCustomElement(class PickListGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.groupTitle = undefined;
        this.headingLevel = undefined;
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
        var _a;
        const { el, groupTitle, headingLevel } = this;
        const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
        const sectionClasses = {
            [CSS.container]: true,
            [CSS.indented]: hasParentItem,
        };
        const title = groupTitle;
        const parentLevel = (_a = el.closest("calcite-pick-list")) === null || _a === void 0 ? void 0 : _a.headingLevel;
        const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
        const level = headingLevel || relativeLevel;
        return (h(Fragment, null, title ? (h(Heading, { class: CSS.heading, level: level }, title)) : null, h("slot", { name: SLOTS.parentItem }), h("section", { class: sectionClasses }, h("slot", null))));
    }
    get el() { return this; }
    static get style() { return pickListGroupCss; }
}, [1, "calcite-pick-list-group", {
        "groupTitle": [513, "group-title"],
        "headingLevel": [514, "heading-level"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-pick-list-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-pick-list-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, PickListGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalcitePickListGroup = PickListGroup;
const defineCustomElement = defineCustomElement$1;

export { CalcitePickListGroup, defineCustomElement };
