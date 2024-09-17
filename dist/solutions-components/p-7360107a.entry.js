/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, F as Fragment, g as getElement } from './p-6eb37ed2.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import { g as getSlotted } from './p-68ec5c15.js';
import { H as Heading, c as constrainHeadingLevel } from './p-14fbc662.js';
import { l as logger } from './p-b1bc21ac.js';
import { S as SLOTS, C as CSS } from './p-bcc79697.js';
import './p-c638d28e.js';
import './p-acaae81d.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-aeb86188.js';

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
        return (h(Fragment, { key: 'ed20e87abe8e3b68153c0e132869953e379e76cd' }, title ? (h(Heading, { class: CSS.heading, level: level }, title)) : null, h("slot", { key: 'cf2218ff15bf2d69ab1710bf7b272d0a32283bba', name: SLOTS.parentItem }), h("section", { key: 'bbf9c988f97a38d8319feaf544090c35fb388f3e', class: sectionClasses }, h("slot", { key: '1a67fc5febf55333069ddc02577900f5e4e98171' }))));
    }
    get el() { return getElement(this); }
};
PickListGroup.style = CalcitePickListGroupStyle0;

export { PickListGroup as calcite_pick_list_group };
