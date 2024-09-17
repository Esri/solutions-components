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
const loadable = require('./loadable-2e2626dc.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
const resources = require('./resources-ed5f0434.js');
const openCloseComponent = require('./openCloseComponent-14628d11.js');
const component = require('./component-a4c6a35d.js');
require('./observers-8fed90f3.js');
require('./browser-69696af0.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./key-d6da79d8.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const SLOTS = {
    title: "title",
    message: "message",
    link: "link",
    actionsEnd: "actions-end",
};
const CSS = {
    actionsEnd: "actions-end",
    close: "notice-close",
    container: "container",
    content: "notice-content",
    icon: "notice-icon",
};

const noticeCss = ":host([scale=s]){--calcite-notice-spacing-token-small:0.5rem;--calcite-notice-spacing-token-large:0.75rem}:host([scale=s]) .container slot[name=title]::slotted(*),:host([scale=s]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) .container slot[name=message]::slotted(*),:host([scale=s]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .notice-close{padding:0.5rem}:host([scale=m]){--calcite-notice-spacing-token-small:0.75rem;--calcite-notice-spacing-token-large:1rem}:host([scale=m]) .container slot[name=title]::slotted(*),:host([scale=m]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) .container slot[name=message]::slotted(*),:host([scale=m]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=l]){--calcite-notice-spacing-token-small:1rem;--calcite-notice-spacing-token-large:1.25rem}:host([scale=l]) .container slot[name=title]::slotted(*),:host([scale=l]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) .container slot[name=message]::slotted(*),:host([scale=l]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([width=auto]){--calcite-notice-width:auto}:host([width=half]){--calcite-notice-width:50%}:host([width=full]){--calcite-notice-width:100%}:host{margin-inline:auto;display:none;max-inline-size:100%;align-items:center;inline-size:var(--calcite-notice-width)}.container{pointer-events:none;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;background-color:var(--calcite-color-foreground-1);opacity:0;max-block-size:0;transition-property:opacity, max-block-size;transition-duration:var(--calcite-animation-timing);text-align:start;border-inline-start:var(--calcite-border-width-md) solid;box-shadow:0 0 0 0 transparent}.notice-close{outline-color:transparent}.notice-close:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host{display:flex}:host([open]) .container{pointer-events:auto;max-block-size:100%;align-items:center;opacity:1;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.container slot[name=title]::slotted(*),.container *::slotted([slot=title]){margin:0px;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.container slot[name=message]::slotted(*),.container *::slotted([slot=message]){margin:0px;display:inline;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2);margin-inline-end:var(--calcite-notice-spacing-token-small)}.notice-content{box-sizing:border-box;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;display:flex;min-inline-size:0px;flex-direction:column;overflow-wrap:break-word;flex:1 1 0;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:0 var(--calcite-notice-spacing-token-small)}.notice-content:first-of-type:not(:only-child){padding-inline-start:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large)}.notice-icon{display:flex;align-items:center;box-sizing:border-box;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto}.notice-close{display:flex;cursor:pointer;align-items:center;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline:2px solid transparent;outline-offset:2px;box-sizing:border-box;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;-webkit-appearance:none}.notice-close:hover,.notice-close:focus{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.notice-close:active{background-color:var(--calcite-color-foreground-3)}.actions-end{display:flex;align-self:stretch}:host([kind=brand]) .container{border-color:var(--calcite-color-brand)}:host([kind=brand]) .container .notice-icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-color:var(--calcite-color-status-info)}:host([kind=info]) .container .notice-icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .notice-icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-color:var(--calcite-color-status-success)}:host([kind=success]) .container .notice-icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .notice-icon{color:var(--calcite-color-status-warning)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteNoticeStyle0 = noticeCss;

const Notice = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteNoticeBeforeClose = index.createEvent(this, "calciteNoticeBeforeClose", 6);
        this.calciteNoticeBeforeOpen = index.createEvent(this, "calciteNoticeBeforeOpen", 6);
        this.calciteNoticeClose = index.createEvent(this, "calciteNoticeClose", 6);
        this.calciteNoticeOpen = index.createEvent(this, "calciteNoticeOpen", 6);
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.close = () => {
            this.open = false;
        };
        this.openTransitionProp = "opacity";
        this.open = false;
        this.kind = "brand";
        this.closable = false;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.scale = "m";
        this.width = "auto";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    openHandler() {
        openCloseComponent.onToggleOpenCloseComponent(this);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    updateRequestedIcon() {
        this.requestedIcon = dom.setRequestedIcon(resources.KindIcons, this.icon, this.kind);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        this.requestedIcon = dom.setRequestedIcon(resources.KindIcons, this.icon, this.kind);
        await t9n.setUpMessages(this);
        if (this.open) {
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    render() {
        const { el } = this;
        const closeButton = (index.h("button", { key: 'e1ec4828ecbafbba66480994b7ffe3afeb3c9753', "aria-label": this.messages.close, class: CSS.close, onClick: this.close, ref: (el) => (this.closeButton = el) }, index.h("calcite-icon", { key: 'de50d43c230545b200d47539dfbd5be5b73e52d0', icon: "x", scale: component.getIconScale(this.scale) })));
        const hasActionEnd = dom.getSlotted(el, SLOTS.actionsEnd);
        return (index.h("div", { key: 'c57ca2818fd2ad1982fd3a8ed6415d9128c600a7', class: CSS.container, ref: this.setTransitionEl }, this.requestedIcon ? (index.h("div", { class: CSS.icon }, index.h("calcite-icon", { flipRtl: this.iconFlipRtl, icon: this.requestedIcon, scale: component.getIconScale(this.scale) }))) : null, index.h("div", { key: '21f12ae09a6a63ead2c992013f594770d13f8dbc', class: CSS.content }, index.h("slot", { key: 'ed278d0ab08c60e492e019a362380e087a33f3fb', name: SLOTS.title }), index.h("slot", { key: 'd442f6b53b5f6002c3bee92376405fc4bca2778c', name: SLOTS.message }), index.h("slot", { key: '5f3da8bf6b6a3b87aa45d417ebf514918b8b2b5b', name: SLOTS.link })), hasActionEnd ? (index.h("div", { class: CSS.actionsEnd }, index.h("slot", { name: SLOTS.actionsEnd }))) : null, this.closable ? closeButton : null));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await loadable.componentFocusable(this);
        const noticeLinkEl = this.el.querySelector("calcite-link");
        if (!this.closeButton && !noticeLinkEl) {
            return;
        }
        if (noticeLinkEl) {
            return noticeLinkEl.setFocus();
        }
        else if (this.closeButton) {
            this.closeButton.focus();
        }
    }
    onBeforeClose() {
        this.calciteNoticeBeforeClose.emit();
    }
    onBeforeOpen() {
        this.calciteNoticeBeforeOpen.emit();
    }
    onClose() {
        this.calciteNoticeClose.emit();
    }
    onOpen() {
        this.calciteNoticeOpen.emit();
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "messageOverrides": ["onMessagesChange"],
        "icon": ["updateRequestedIcon"],
        "kind": ["updateRequestedIcon"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Notice.style = CalciteNoticeStyle0;

exports.calcite_notice = Notice;
