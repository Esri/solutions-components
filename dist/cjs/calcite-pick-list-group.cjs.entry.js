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
const Heading = require('./Heading-a3e36113.js');
const logger = require('./logger-f177776b.js');
const resources = require('./resources-f895ff54.js');
require('./observers-18d87cb5.js');
require('./browser-333a21c5.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./config-e76d9931.js');

const pickListGroupCss = ":host{margin-block-end:0.25rem;box-sizing:border-box;display:block;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host(:last-child){margin-block-end:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.heading{margin-block:0.5rem;margin-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-color-text-3)}.container--indented{margin-inline-start:1.5rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePickListGroupStyle0 = pickListGroupCss;

logger.logger.deprecated("component", {
    name: "pick-list-group",
    removalVersion: 3,
    suggested: "list-item-group",
});
const PickListGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.groupTitle = undefined;
        this.headingLevel = undefined;
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
        const { el, groupTitle, headingLevel } = this;
        const hasParentItem = dom.getSlotted(el, resources.SLOTS.parentItem) !== null;
        const sectionClasses = {
            [resources.CSS.container]: true,
            [resources.CSS.indented]: hasParentItem,
        };
        const title = groupTitle;
        const parentLevel = el.closest("calcite-pick-list")?.headingLevel;
        const relativeLevel = parentLevel ? Heading.constrainHeadingLevel(parentLevel + 1) : null;
        const level = headingLevel || relativeLevel;
        return (index.h(index.Fragment, { key: '95786626f6bee19eee9695f8bf3c63f0e192a6fe' }, title ? (index.h(Heading.Heading, { class: resources.CSS.heading, level: level }, title)) : null, index.h("slot", { key: 'd1ebf753d725ab812875fb5f8a9718774b4d9cc7', name: resources.SLOTS.parentItem }), index.h("section", { key: '3a850b36674c77bd7dc7a05278fd684b06024fb3', class: sectionClasses }, index.h("slot", { key: '919ef46af0ab6c7f7e8f0dff0a1cda8e01ecdf75' }))));
    }
    get el() { return index.getElement(this); }
};
PickListGroup.style = CalcitePickListGroupStyle0;

exports.calcite_pick_list_group = PickListGroup;
