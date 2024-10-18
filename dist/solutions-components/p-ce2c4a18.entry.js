/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, g as getElement } from './p-4e6eb06e.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-5e25a0b8.js';
import { o as getSlotted } from './p-621ad249.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-895e7b9c.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-efaa77a0.js';
import { H as Heading, c as constrainHeadingLevel } from './p-b13aca6a.js';
import { l as logger } from './p-fa80bc7e.js';
import './p-ff336351.js';
import './p-4f82eb55.js';
import './p-7d542581.js';
import './p-91371f97.js';
import './p-233f219c.js';
import './p-a02e2069.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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

const tipCss = ":host{position:relative;margin:1rem;box-sizing:border-box;display:flex;flex-direction:row;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-2);background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}.container{inline-size:100%;padding:1rem}:host([closed]),:host([closed]) .container{display:none}:host([selected]) .container{margin:0px;border-style:none;padding:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.header{margin-block-end:0.5rem}.header .heading{padding:0px;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-1)}.container[hidden]{display:none}.content{display:flex}.info{padding-block:0px;padding-inline:1rem;inline-size:70%}.info:only-child{inline-size:100%;padding-inline:0px}::slotted(p){margin-block-start:0px}::slotted(a){outline-color:transparent;color:var(--calcite-color-brand)}::slotted(a:focus){outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.image-frame{inline-size:25%}.image-frame img{max-inline-size:100%}::slotted(img){max-inline-size:100%}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTipStyle0 = tipCss;

logger.deprecated("component", {
    name: "tip",
    removalVersion: 4,
    suggested: ["card", "notice", "panel", "tile"],
});
const Tip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTipDismiss = createEvent(this, "calciteTipDismiss", 6);
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
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        const { heading, headingLevel, el } = this;
        const parentLevel = el.closest("calcite-tip-manager")?.headingLevel;
        const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
        const level = headingLevel || relativeLevel;
        return heading ? (h("header", { class: CSS.header }, h(Heading, { class: CSS.heading, level: level }, heading))) : null;
    }
    renderDismissButton() {
        const { closeDisabled, hideTip } = this;
        return !closeDisabled ? (h("calcite-action", { class: CSS.close, icon: ICONS.close, onClick: hideTip, scale: "l", text: this.messages.close })) : null;
    }
    renderImageFrame() {
        const { el } = this;
        return getSlotted(el, SLOTS.thumbnail) ? (h("div", { class: CSS.imageFrame, key: "thumbnail" }, h("slot", { name: SLOTS.thumbnail }))) : null;
    }
    renderInfoNode() {
        return (h("div", { class: CSS.info }, h("slot", null)));
    }
    renderContent() {
        return (h("div", { class: CSS.content }, this.renderImageFrame(), this.renderInfoNode()));
    }
    render() {
        return (h(Fragment, { key: '0ee5bf1ba2df1cccf7e6684bd0480344b074b16b' }, h("article", { key: '55effd0a9eaa055167507e216983713fc1767e13', class: CSS.container }, this.renderHeader(), this.renderContent()), this.renderDismissButton()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Tip.style = CalciteTipStyle0;

export { Tip as calcite_tip };
