/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, F as Fragment, g as getElement } from './index-904bc599.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-8a0b08ef.js';
import { o as getSlotted } from './dom-75c641a7.js';
import { H as Heading, c as constrainHeadingLevel } from './Heading-80b3be96.js';
import { l as logger } from './logger-f75712ce.js';
import { S as SLOTS, C as CSS } from './resources-14a1713f.js';
import './observers-c83631e8.js';
import './browser-b67d8df6.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './config-16813c92.js';

const pickListGroupCss = ":host{margin-block-end:0.25rem;box-sizing:border-box;display:block;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host(:last-child){margin-block-end:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.heading{margin-block:0.5rem;margin-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-color-text-3)}.container--indented{margin-inline-start:1.5rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePickListGroupStyle0 = pickListGroupCss;

logger.deprecated("component", {
    name: "pick-list-group",
    removalVersion: 3,
    suggested: "list-item-group",
});
const PickListGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        const { el, groupTitle, headingLevel } = this;
        const hasParentItem = getSlotted(el, SLOTS.parentItem) !== null;
        const sectionClasses = {
            [CSS.container]: true,
            [CSS.indented]: hasParentItem,
        };
        const title = groupTitle;
        const parentLevel = el.closest("calcite-pick-list")?.headingLevel;
        const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
        const level = headingLevel || relativeLevel;
        return (h(Fragment, { key: '95786626f6bee19eee9695f8bf3c63f0e192a6fe' }, title ? (h(Heading, { class: CSS.heading, level: level }, title)) : null, h("slot", { key: 'd1ebf753d725ab812875fb5f8a9718774b4d9cc7', name: SLOTS.parentItem }), h("section", { key: '3a850b36674c77bd7dc7a05278fd684b06024fb3', class: sectionClasses }, h("slot", { key: '919ef46af0ab6c7f7e8f0dff0a1cda8e01ecdf75' }))));
    }
    get el() { return getElement(this); }
};
PickListGroup.style = CalcitePickListGroupStyle0;

export { PickListGroup as calcite_pick_list_group };
