/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted } from './dom.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { H as Heading, c as constrainHeadingLevel } from './Heading.js';
import { l as logger } from './logger.js';
import { d as defineCustomElement$4 } from './action.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
const Tip = /*@__PURE__*/ proxyCustomElement(class Tip extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        return (h(Fragment, { key: 'c725e40201c42c904817edcf0f86dc05d09793b9' }, h("article", { key: '304a83ee3721636194696546bfd8af359beecbf6', class: CSS.container }, this.renderHeader(), this.renderContent()), this.renderDismissButton()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteTipStyle0; }
}, [1, "calcite-tip", {
        "closed": [1540],
        "closeDisabled": [516, "close-disabled"],
        "heading": [1],
        "headingLevel": [514, "heading-level"],
        "selected": [516],
        "messages": [1040],
        "messageOverrides": [1040],
        "defaultMessages": [32],
        "effectiveLocale": [32]
    }, undefined, {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tip", "calcite-action", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Tip);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTip = Tip;
const defineCustomElement = defineCustomElement$1;

export { CalciteTip, defineCustomElement };
