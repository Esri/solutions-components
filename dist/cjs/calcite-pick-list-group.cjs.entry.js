/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
const dom = require('./dom-c9c2c835.js');
const Heading = require('./Heading-bd401e0a.js');
const resources = require('./resources-c4fe74a9.js');
require('./observers-db4527e4.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');

const pickListGroupCss = ":host{margin-block-end:0.25rem;box-sizing:border-box;display:block;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host(:last-child){margin-block-end:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.heading{margin-block:0.5rem;margin-inline:1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-color-text-3)}.container--indented{margin-inline-start:1.5rem}:host([hidden]){display:none}[hidden]{display:none}";

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
        var _a;
        const { el, groupTitle, headingLevel } = this;
        const hasParentItem = dom.getSlotted(el, resources.SLOTS.parentItem) !== null;
        const sectionClasses = {
            [resources.CSS.container]: true,
            [resources.CSS.indented]: hasParentItem,
        };
        const title = groupTitle;
        const parentLevel = (_a = el.closest("calcite-pick-list")) === null || _a === void 0 ? void 0 : _a.headingLevel;
        const relativeLevel = parentLevel ? Heading.constrainHeadingLevel(parentLevel + 1) : null;
        const level = headingLevel || relativeLevel;
        return (index.h(index.Fragment, null, title ? (index.h(Heading.Heading, { class: resources.CSS.heading, level: level }, title)) : null, index.h("slot", { name: resources.SLOTS.parentItem }), index.h("section", { class: sectionClasses }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
PickListGroup.style = pickListGroupCss;

exports.calcite_pick_list_group = PickListGroup;
