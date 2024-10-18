/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getElementDir } from './dom.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { d as defineCustomElement$3, S as SLOTS$1 } from './panel.js';
import { d as defineCustomElement$7 } from './action.js';
import { d as defineCustomElement$6 } from './action-menu.js';
import { d as defineCustomElement$5 } from './icon.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$2 } from './popover.js';
import { d as defineCustomElement$1 } from './scrim.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    backButton: "back-button",
};
const ICONS = {
    backLeft: "chevron-left",
    backRight: "chevron-right",
};
const SLOTS = {
    actionBar: "action-bar",
    alerts: "alerts",
    contentTop: "content-top",
    contentBottom: "content-bottom",
    headerActionsStart: "header-actions-start",
    headerActionsEnd: "header-actions-end",
    headerMenuActions: "header-menu-actions",
    headerContent: "header-content",
    fab: "fab",
    footer: "footer",
    footerActions: "footer-actions",
    footerEnd: "footer-end",
    footerStart: "footer-start",
};

const flowItemCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}calcite-panel{--calcite-panel-footer-padding:var(--calcite-flow-item-footer-padding);--calcite-panel-header-border-block-end:var(--calcite-flow-item-header-border-block-end)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFlowItemStyle0 = flowItemCss;

const FlowItem = /*@__PURE__*/ proxyCustomElement(class FlowItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteFlowItemBack = createEvent(this, "calciteFlowItemBack", 7);
        this.calciteFlowItemScroll = createEvent(this, "calciteFlowItemScroll", 6);
        this.calciteFlowItemClose = createEvent(this, "calciteFlowItemClose", 6);
        this.calciteFlowItemToggle = createEvent(this, "calciteFlowItemToggle", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleInternalPanelScroll = (event) => {
            if (event.target !== this.containerEl) {
                return;
            }
            event.stopPropagation();
            this.calciteFlowItemScroll.emit();
        };
        this.handleInternalPanelClose = (event) => {
            if (event.target !== this.containerEl) {
                return;
            }
            event.stopPropagation();
            this.closed = true;
            this.calciteFlowItemClose.emit();
        };
        this.handleInternalPanelToggle = (event) => {
            if (event.target !== this.containerEl) {
                return;
            }
            event.stopPropagation();
            this.collapsed = event.target.collapsed;
            this.calciteFlowItemToggle.emit();
        };
        this.backButtonClick = () => {
            this.calciteFlowItemBack.emit();
        };
        this.setBackRef = (node) => {
            this.backButtonEl = node;
        };
        this.setContainerRef = (node) => {
            this.containerEl = node;
        };
        this.closable = false;
        this.closed = false;
        this.collapsed = false;
        this.collapseDirection = "down";
        this.collapsible = false;
        this.beforeBack = undefined;
        this.beforeClose = undefined;
        this.description = undefined;
        this.disabled = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.menuOpen = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.overlayPositioning = "absolute";
        this.scale = "m";
        this.showBackButton = false;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Sets focus on the component.
     *
     * @returns promise.
     */
    async setFocus() {
        await componentFocusable(this);
        const { backButtonEl, containerEl } = this;
        if (backButtonEl) {
            return backButtonEl.setFocus();
        }
        else if (containerEl) {
            return containerEl.setFocus();
        }
    }
    /**
     * Scrolls the component's content to a specified set of coordinates.
     *
     * @example
     * myCalciteFlowItem.scrollContentTo({
     *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
     *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
     *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
     * });
     * @param options - allows specific coordinates to be defined.
     * @returns - promise that resolves once the content is scrolled to.
     */
    async scrollContentTo(options) {
        await this.containerEl?.scrollContentTo(options);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderBackButton() {
        const { el } = this;
        const rtl = getElementDir(el) === "rtl";
        const { showBackButton, backButtonClick, messages } = this;
        const label = messages.back;
        const icon = rtl ? ICONS.backRight : ICONS.backLeft;
        return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "flow-back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: "header-actions-start", text: label, title: label })) : null;
    }
    render() {
        const { collapsed, collapseDirection, collapsible, closable, closed, description, disabled, heading, headingLevel, loading, menuOpen, messages, overlayPositioning, beforeClose, } = this;
        return (h(Host, { key: '2e7872bb2687db0b67ddbf375f8ec0beaabbda36' }, h(InteractiveContainer, { key: 'a9418954405a2cec2092bae3be5d77f02306e3c9', disabled: disabled }, h("calcite-panel", { key: 'd563c751421bf2d66c03286deaa613e09f585546', beforeClose: beforeClose, closable: closable, closed: closed, collapseDirection: collapseDirection, collapsed: collapsed, collapsible: collapsible, description: description, disabled: disabled, heading: heading, headingLevel: headingLevel, loading: loading, menuOpen: menuOpen, messageOverrides: messages, onCalcitePanelClose: this.handleInternalPanelClose, onCalcitePanelScroll: this.handleInternalPanelScroll, onCalcitePanelToggle: this.handleInternalPanelToggle, overlayPositioning: overlayPositioning, ref: this.setContainerRef, scale: this.scale }, this.renderBackButton(), h("slot", { key: 'c506ec8bb4debbd6a9da6c7941878de49776f614', name: SLOTS.actionBar, slot: SLOTS$1.actionBar }), h("slot", { key: 'e76e55e654ff878acff734bdf387402a9e262159', name: SLOTS.alerts, slot: SLOTS$1.alerts }), h("slot", { key: 'f7ab8839d7b101e31087130ebf3e36af1ec7da24', name: SLOTS.headerActionsStart, slot: SLOTS$1.headerActionsStart }), h("slot", { key: '2932c4c15b168732356b8e55fcc3064f5b3f4cf5', name: SLOTS.headerActionsEnd, slot: SLOTS$1.headerActionsEnd }), h("slot", { key: '1ef8a9050683022733695445092f8c626487d87b', name: SLOTS.headerContent, slot: SLOTS$1.headerContent }), h("slot", { key: '24c0ab570a601a6c0edfb0c820e580fd24b158ce', name: SLOTS.headerMenuActions, slot: SLOTS$1.headerMenuActions }), h("slot", { key: 'ec55bbe7ba939a6efb35225850c37a1aadb97275', name: SLOTS.fab, slot: SLOTS$1.fab }), h("slot", { key: 'aa0bfec47656ef9f7f575cd933897a7909e5badc', name: SLOTS.contentTop, slot: SLOTS$1.contentTop }), h("slot", { key: 'e23532d080e2df529c2aeb6af043c6efe7a0ab6d', name: SLOTS.contentBottom, slot: SLOTS$1.contentBottom }), h("slot", { key: 'db6ffc0d9300c77067a4c88ab277de685c7713af', name: SLOTS.footerStart, slot: SLOTS$1.footerStart }), h("slot", { key: '5f249356da9292f34c4036d0d0741f048fe999e9', name: SLOTS.footer, slot: SLOTS$1.footer }), h("slot", { key: '7476137bacc0f3be5c97682c5027f74d73254765', name: SLOTS.footerEnd, slot: SLOTS$1.footerEnd }), h("slot", { key: '58f60a46c42a05abe9b100a57d478d991e4f25bc', name: SLOTS.footerActions, slot: SLOTS$1.footerActions }), h("slot", { key: '926a8d94b76b6fcdef6dfd219ba8180c44f81c35' })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteFlowItemStyle0; }
}, [1, "calcite-flow-item", {
        "closable": [516],
        "closed": [516],
        "collapsed": [516],
        "collapseDirection": [1, "collapse-direction"],
        "collapsible": [516],
        "beforeBack": [16],
        "beforeClose": [16],
        "description": [1],
        "disabled": [516],
        "heading": [1],
        "headingLevel": [514, "heading-level"],
        "loading": [516],
        "menuOpen": [516, "menu-open"],
        "messageOverrides": [1040],
        "messages": [1040],
        "overlayPositioning": [513, "overlay-positioning"],
        "scale": [513],
        "showBackButton": [4, "show-back-button"],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "setFocus": [64],
        "scrollContentTo": [64]
    }, undefined, {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-flow-item", "calcite-action", "calcite-action-menu", "calcite-icon", "calcite-loader", "calcite-panel", "calcite-popover", "calcite-scrim"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-flow-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FlowItem);
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
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-panel":
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

export { FlowItem as F, defineCustomElement as d };
