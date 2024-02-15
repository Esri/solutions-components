/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { k as focusFirstTabbable, a as getSlotted, t as toAriaBoolean } from './dom.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n.js';
import { H as Heading } from './Heading.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent.js';
import { d as defineCustomElement$7 } from './action.js';
import { d as defineCustomElement$6 } from './action-menu.js';
import { d as defineCustomElement$5 } from './handle.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './popover.js';
import { d as defineCustomElement$1 } from './scrim.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const IDS = {
    content: "content",
    toggle: "toggle",
    header: "header",
};
const CSS = {
    button: "button",
    container: "container",
    content: "content",
    controlContainer: "control-container",
    description: "description",
    header: "header",
    headerContainer: "header-container",
    heading: "heading",
    icon: "icon",
    invalid: "invalid",
    statusIcon: "status-icon",
    summary: "summary",
    title: "title",
    toggle: "toggle",
    toggleIcon: "toggle-icon",
    valid: "valid",
};
const SLOTS = {
    icon: "icon",
    control: "control",
    headerMenuActions: "header-menu-actions",
};
const ICONS = {
    opened: "chevron-up",
    closed: "chevron-down",
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
};

const blockCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding:0px;transition-property:margin;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-timing-function:cubic-bezier(0.215, 0.440, 0.420, 0.880);flex-basis:auto}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.header{justify-content:flex-start;padding:0px}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto;grid-template-areas:\"handle header control menu\";grid-column:header-start/menu-end;grid-row:1/2}.toggle{margin:0px;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;padding:0px;font-family:inherit;outline-color:transparent;text-align:initial;background-color:transparent}.toggle:hover{background-color:var(--calcite-color-foreground-2)}.toggle:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}calcite-loader[inline]{grid-area:control;align-self:center}calcite-handle{grid-area:handle}.title{margin:0px;padding:0.75rem}.header .title .heading{padding:0px;font-size:var(--calcite-font-size--1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;color:var(--calcite-color-text-2);transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);word-wrap:break-word;word-break:break-word}.description{margin-block-start:0.125rem;padding:0px;font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-color-text-3);word-wrap:break-word;word-break:break-word}.icon{display:flex;margin-inline-start:0.75rem;margin-inline-end:0px}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.toggle-icon{margin-block:0.75rem;align-self:center;justify-self:end;color:var(--calcite-color-text-3);transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline-end:0.75rem;margin-inline-start:auto}.toggle:hover .toggle-icon{color:var(--calcite-color-text-1)}.container{position:relative;display:flex;block-size:100%;flex-direction:column}.content{position:relative;min-block-size:0px;flex:1 1 0%}@keyframes in{0%{opacity:0}100%{opacity:1}}.content{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;padding-block:var(--calcite-block-padding, 0.5rem);padding-inline:var(--calcite-block-padding, 0.625rem)}.control-container{margin:0px;display:flex;grid-area:control}calcite-action-menu{grid-area:menu}:host([open]){margin-block:0.5rem}:host([open]) .header .title .heading{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}";

const Block = /*@__PURE__*/ proxyCustomElement(class Block extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteBlockBeforeClose = createEvent(this, "calciteBlockBeforeClose", 6);
        this.calciteBlockBeforeOpen = createEvent(this, "calciteBlockBeforeOpen", 6);
        this.calciteBlockClose = createEvent(this, "calciteBlockClose", 6);
        this.calciteBlockOpen = createEvent(this, "calciteBlockOpen", 6);
        this.calciteBlockToggle = createEvent(this, "calciteBlockToggle", 6);
        this.openTransitionProp = "opacity";
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.onHeaderClick = () => {
            this.open = !this.open;
            this.calciteBlockToggle.emit();
        };
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.collapsible = false;
        this.disabled = false;
        this.dragHandle = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.open = false;
        this.status = undefined;
        this.description = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.overlayPositioning = "absolute";
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    openHandler() {
        onToggleOpenCloseComponent(this);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Sets focus on the component's first tabbable element.
     *
     */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    onBeforeOpen() {
        this.calciteBlockBeforeOpen.emit();
    }
    onOpen() {
        this.calciteBlockOpen.emit();
    }
    onBeforeClose() {
        this.calciteBlockBeforeClose.emit();
    }
    onClose() {
        this.calciteBlockClose.emit();
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
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderScrim() {
        const { loading } = this;
        const defaultSlot = h("slot", null);
        return [loading ? h("calcite-scrim", { loading: loading }) : null, defaultSlot];
    }
    renderIcon() {
        const { loading, messages, status } = this;
        const hasSlottedIcon = !!getSlotted(this.el, SLOTS.icon);
        return loading ? (h("div", { class: CSS.icon, key: "loader" }, h("calcite-loader", { inline: true, label: messages.loading }))) : !!status ? (h("div", { class: CSS.icon, key: "status-icon" }, h("calcite-icon", { class: {
                [CSS.statusIcon]: true,
                [CSS.valid]: status == "valid",
                [CSS.invalid]: status == "invalid",
            }, icon: ICONS[status], scale: "s" }))) : hasSlottedIcon ? (h("div", { class: CSS.icon, key: "icon-slot" }, h("slot", { key: "icon-slot", name: SLOTS.icon }))) : null;
    }
    renderTitle() {
        const { heading, headingLevel, description } = this;
        return heading || description ? (h("div", { class: CSS.title }, h(Heading, { class: CSS.heading, level: headingLevel }, heading), description ? h("div", { class: CSS.description }, description) : null)) : null;
    }
    render() {
        const { collapsible, el, loading, open, heading, messages } = this;
        const toggleLabel = open ? messages.collapse : messages.expand;
        const headerContent = (h("header", { class: CSS.header, id: IDS.header }, this.renderIcon(), this.renderTitle()));
        const hasControl = !!getSlotted(el, SLOTS.control);
        const hasMenuActions = !!getSlotted(el, SLOTS.headerMenuActions);
        const collapseIcon = open ? ICONS.opened : ICONS.closed;
        const headerNode = (h("div", { class: CSS.headerContainer }, this.dragHandle ? h("calcite-handle", { label: heading }) : null, collapsible ? (h("button", { "aria-controls": IDS.content, "aria-describedby": IDS.header, "aria-expanded": collapsible ? toAriaBoolean(open) : null, class: CSS.toggle, id: IDS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent, h("calcite-icon", { "aria-hidden": "true", class: CSS.toggleIcon, icon: collapseIcon, scale: "s" }))) : (headerContent), hasControl ? (h("div", { class: CSS.controlContainer }, h("slot", { name: SLOTS.control }))) : null, hasMenuActions ? (h("calcite-action-menu", { label: messages.options, overlayPositioning: this.overlayPositioning }, h("slot", { name: SLOTS.headerMenuActions }))) : null));
        return (h(Host, null, h(InteractiveContainer, { disabled: this.disabled }, h("article", { "aria-busy": toAriaBoolean(loading), class: {
                [CSS.container]: true,
            } }, headerNode, h("section", { "aria-labelledby": IDS.toggle, class: CSS.content, hidden: !open, id: IDS.content,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, this.renderScrim())))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "open": ["openHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return blockCss; }
}, [1, "calcite-block", {
        "collapsible": [516],
        "disabled": [516],
        "dragHandle": [516, "drag-handle"],
        "heading": [1],
        "headingLevel": [514, "heading-level"],
        "loading": [516],
        "open": [1540],
        "status": [513],
        "description": [1],
        "messages": [1040],
        "messageOverrides": [1040],
        "overlayPositioning": [513, "overlay-positioning"],
        "effectiveLocale": [32],
        "defaultMessages": [32],
        "setFocus": [64]
    }, undefined, {
        "open": ["openHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-block", "calcite-action", "calcite-action-menu", "calcite-handle", "calcite-icon", "calcite-loader", "calcite-popover", "calcite-scrim"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-block":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Block);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Block as B, defineCustomElement as d };
