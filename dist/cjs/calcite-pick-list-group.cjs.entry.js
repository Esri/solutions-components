/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const conditionalSlot = require('./conditionalSlot-6b5d9b84.js');
const dom = require('./dom-6a9b6275.js');
const Heading = require('./Heading-2333bcd2.js');
const logger = require('./logger-1c9bfcfd.js');
const resources = require('./resources-fac4579f.js');
require('./observers-8fed90f3.js');
require('./browser-69696af0.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./config-afe9063b.js');

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
        return (index.h(index.Fragment, { key: 'ed20e87abe8e3b68153c0e132869953e379e76cd' }, title ? (index.h(Heading.Heading, { class: resources.CSS.heading, level: level }, title)) : null, index.h("slot", { key: 'cf2218ff15bf2d69ab1710bf7b272d0a32283bba', name: resources.SLOTS.parentItem }), index.h("section", { key: 'bbf9c988f97a38d8319feaf544090c35fb388f3e', class: sectionClasses }, index.h("slot", { key: '1a67fc5febf55333069ddc02577900f5e4e98171' }))));
    }
    get el() { return index.getElement(this); }
};
PickListGroup.style = CalcitePickListGroupStyle0;

exports.calcite_pick_list_group = PickListGroup;
