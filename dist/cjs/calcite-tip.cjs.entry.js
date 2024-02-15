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
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const Heading = require('./Heading-bd401e0a.js');
require('./observers-db4527e4.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./key-c5504030.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    header: "header",
    heading: "heading",
    close: "close",
    imageFrame: "image-frame",
    content: "content",
    info: "info",
};
const ICONS = {
    close: "x",
};
const SLOTS = {
    thumbnail: "thumbnail",
};

const tipCss = ":host{position:relative;margin:1rem;box-sizing:border-box;display:flex;flex-direction:row;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-2);background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}.container{inline-size:100%;padding:1rem}:host([closed]),:host([closed]) .container{display:none}:host([selected]) .container{margin:0px;border-style:none;padding:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.header{margin-block-end:0.5rem}.header .heading{padding:0px;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1)}.container[hidden]{display:none}.content{display:flex}.info{padding-block:0px;padding-inline:1rem;inline-size:70%}.info:only-child{inline-size:100%;padding-inline:0px}::slotted(p){margin-block-start:0px}::slotted(a){outline-color:transparent;color:var(--calcite-color-brand)}::slotted(a:focus){outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.image-frame{inline-size:25%}.image-frame img{max-inline-size:100%}::slotted(img){max-inline-size:100%}:host([hidden]){display:none}[hidden]{display:none}";

const Tip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteTipDismiss = index.createEvent(this, "calciteTipDismiss", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.hideTip = () => {
            this.closed = true;
            this.calciteTipDismiss.emit();
        };
        this.closed = false;
        this.closeDisabled = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.selected = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        var _a;
        const { heading, headingLevel, el } = this;
        const parentLevel = (_a = el.closest("calcite-tip-manager")) === null || _a === void 0 ? void 0 : _a.headingLevel;
        const relativeLevel = parentLevel ? Heading.constrainHeadingLevel(parentLevel + 1) : null;
        const level = headingLevel || relativeLevel;
        return heading ? (index.h("header", { class: CSS.header }, index.h(Heading.Heading, { class: CSS.heading, level: level }, heading))) : null;
    }
    renderDismissButton() {
        const { closeDisabled, hideTip } = this;
        return !closeDisabled ? (index.h("calcite-action", { class: CSS.close, icon: ICONS.close, onClick: hideTip, scale: "l", text: this.messages.close })) : null;
    }
    renderImageFrame() {
        const { el } = this;
        return dom.getSlotted(el, SLOTS.thumbnail) ? (index.h("div", { class: CSS.imageFrame, key: "thumbnail" }, index.h("slot", { name: SLOTS.thumbnail }))) : null;
    }
    renderInfoNode() {
        return (index.h("div", { class: CSS.info }, index.h("slot", null)));
    }
    renderContent() {
        return (index.h("div", { class: CSS.content }, this.renderImageFrame(), this.renderInfoNode()));
    }
    render() {
        return (index.h(index.Fragment, null, index.h("article", { class: CSS.container }, this.renderHeader(), this.renderContent()), this.renderDismissButton()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Tip.style = tipCss;

exports.calcite_tip = Tip;
