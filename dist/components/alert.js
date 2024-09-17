/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { j as slotChangeHasAssignedElement, t as toAriaBoolean, a as getSlotted, s as setRequestedIcon } from './dom.js';
import { g as getIconScale } from './component.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { N as NumberStringFormat, c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { K as KindIcons } from './resources2.js';
import { d as defineCustomElement$2 } from './chip.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const DURATIONS = {
    slow: 14000,
    medium: 10000,
    fast: 6000,
};
const SLOTS = {
    actionsEnd: "actions-end",
    title: "title",
    message: "message",
    link: "link",
};
const CSS = {
    actionsEnd: "actions-end",
    close: "close",
    container: "container",
    containerBottom: "container--bottom",
    containerBottomEnd: "container--bottom-end",
    containerBottomStart: "container--bottom-start",
    containerActive: "container--active",
    containerTop: "container--top",
    containerTopEnd: "container--top-end",
    containerTopStart: "container--top-start",
    content: "content",
    contentContainer: "content-container",
    dismissProgress: "dismiss-progress",
    footer: "footer",
    icon: "icon",
    containerEmbedded: "container--embedded",
    queueCount: "queue-count",
    queueCountActive: "queue-count--active",
    textContainer: "text-container",
    focused: "focused",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const alertQueueTimeoutMs = 300;
class AlertManager {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Private Properties
        //
        // --------------------------------------------------------------------------
        this.registeredElements = [];
        this.queueTimeoutId = null;
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    registerElement(alert) {
        const { registeredElements } = this;
        if (!registeredElements.includes(alert)) {
            switch (alert.queue) {
                case "immediate":
                    registeredElements.unshift(alert);
                    break;
                case "next":
                    registeredElements.splice(1, 0, alert);
                    break;
                case "last":
                    registeredElements.push(alert);
                    break;
            }
            this.updateAlerts();
        }
    }
    unregisterElement(alert) {
        const { registeredElements } = this;
        const index = registeredElements.indexOf(alert);
        if (index !== -1) {
            registeredElements.splice(index, 1);
        }
        alert.active = false;
        this.updateAlerts();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    updateAlerts() {
        window.clearTimeout(this.queueTimeoutId);
        this.queueTimeoutId = null;
        this.registeredElements.forEach((alert, index) => {
            alert.openAlertCount = this.registeredElements.length;
            if (index === 0) {
                this.queueTimeoutId = window.setTimeout(() => (alert.active = true), alertQueueTimeoutMs);
            }
            else {
                alert.active = false;
            }
        });
    }
}

const alertCss = ":host{--calcite-alert-edge-distance:2rem;--calcite-alert-dismiss-progress-background:var(--calcite-color-transparent-tint);display:block}.container{pointer-events:none;position:fixed;z-index:var(--calcite-z-index-toast);margin-inline:auto;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:-moz-min-content;min-inline-size:min-content;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);text-align:start;opacity:0;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-radius:var(--calcite-border-radius);border-block-start:0 solid transparent;border-inline:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3);inline-size:var(--calcite-alert-width);max-inline-size:calc(100% - var(--calcite-alert-edge-distance) * 2);transition:opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out}.container--bottom,.container--top{inset-inline-end:0;inset-inline-start:0}.container[class*=bottom]{transform:translate3d(0, var(--calcite-alert-edge-distance), 0);inset-block-end:var(--calcite-alert-edge-distance)}.container[class*=top]{transform:translate3d(0, calc(-1 * var(--calcite-alert-edge-distance)), 0);inset-block-start:var(--calcite-alert-edge-distance)}.container[class*=start]{inset-inline-start:var(--calcite-alert-edge-distance);inset-inline-end:auto}.container[class*=end]{inset-inline-end:var(--calcite-alert-edge-distance);inset-inline-start:auto}.icon{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0px;margin-block:auto;margin-inline-end:auto;padding-inline-start:var(--calcite-alert-spacing-token-large)}.close{display:flex;cursor:pointer;align-items:center;justify-content:flex-end;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline:2px solid transparent;outline-offset:2px;-webkit-appearance:none;padding:var(--calcite-alert-spacing-token-large);outline-color:transparent}.close:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:hover,.close:focus{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.close:active{background-color:var(--calcite-color-foreground-3)}.queue-count{visibility:hidden;display:flex;min-inline-size:-moz-min-content;min-inline-size:min-content;cursor:default;align-items:center;justify-content:space-around;align-self:stretch;overflow:hidden;background-color:var(--calcite-color-foreground-1);text-align:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);opacity:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline:0 solid transparent;border-start-end-radius:0}.queue-count--active{visibility:visible;opacity:1}.dismiss-progress{position:absolute;display:block;inline-size:100%;overflow:hidden;inset-inline:0;inset-block-start:-2px;block-size:2px;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.dismiss-progress::after{position:absolute;inset-block-start:0px;display:block;block-size:2px;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);inset-inline-end:0}.actions-end{display:flex;align-self:stretch}.text-container{box-sizing:border-box;display:flex;min-inline-size:0px;flex:1 1 auto;flex-direction:column;overflow-wrap:break-word;padding-block:var(--calcite-alert-spacing-token-small);padding-inline:var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small)}.footer{position:relative;display:flex;inline-size:auto;justify-content:flex-end;align-self:stretch;padding-block-start:1px;block-size:inherit}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.5rem;--calcite-alert-spacing-token-large:0.75rem;--calcite-alert-footer-height:2rem;--calcite-alert-footer-divider-gap:0.125rem}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .queue-count{margin-inline:0.5rem}:host([scale=s]) .container{--calcite-alert-min-height:3.5rem}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem;--calcite-alert-footer-height:3rem;--calcite-alert-footer-divider-gap:0.25rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .queue-count{margin-inline:0.75rem}:host([scale=m]) .container{--calcite-alert-min-height:4.1875rem}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.25rem;--calcite-alert-footer-height:4rem;--calcite-alert-footer-divider-gap:0.5rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){margin-block-end:0.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .queue-count{margin-inline:1rem}:host([scale=l]) .container{--calcite-alert-min-height:5.625rem}:host([open]) .container--active{border-block-start-width:2px;opacity:1;pointer-events:initial}:host([open]) .container--active[class*=bottom]{transform:translate3d(0, calc(-1 * var(--calcite-alert-edge-distance)), inherit)}:host([open]) .container--active[class*=top]{transform:translate3d(0, var(--calcite-alert-edge-distance), inherit)}:host([auto-close])>.queue-count{border-inline-end:0 solid transparent}slot[name=title]::slotted(*),*::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){margin:0px;display:inline;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2);margin-inline-end:0.5rem}slot[name=link]::slotted(*),*::slotted([slot=link]){display:inline-flex;color:var(--calcite-color-text-link)}:host([kind=brand]) .container{border-block-start-color:var(--calcite-color-brand)}:host([kind=brand]) .container .icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-block-start-color:var(--calcite-color-status-info)}:host([kind=info]) .container .icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-block-start-color:var(--calcite-color-status-success)}:host([kind=success]) .container .icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-block-start-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .icon{color:var(--calcite-color-status-warning)}:host([auto-close-duration=fast]) .dismiss-progress:after{animation:dismissProgress 6000ms ease-out}:host(:hover[auto-close-duration=fast]) .dismiss-progress:after,:host(:focus[auto-close-duration=fast]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=medium]) .dismiss-progress:after{animation:dismissProgress 10000ms ease-out}:host(:hover[auto-close-duration=medium]) .dismiss-progress:after,:host(:focus[auto-close-duration=medium]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=slow]) .dismiss-progress:after{animation:dismissProgress 14000ms ease-out}:host(:hover[auto-close-duration=slow]) .dismiss-progress:after,:host(:focus[auto-close-duration=slow]) .dismiss-progress:after{animation-play-state:paused}.container.focused .dismiss-progress::after{animation-play-state:paused}@keyframes dismissProgress{0%{inline-size:0px;opacity:0.75}100%{inline-size:100%;opacity:1}}.container--embedded{position:absolute}:host([hidden]){display:none}[hidden]{display:none}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}";
const CalciteAlertStyle0 = alertCss;

const manager = new AlertManager();
const Alert = /*@__PURE__*/ proxyCustomElement(class Alert extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteAlertBeforeClose = createEvent(this, "calciteAlertBeforeClose", 6);
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 6);
        this.calciteAlertBeforeOpen = createEvent(this, "calciteAlertBeforeOpen", 6);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 6);
        this.handleKeyBoardFocus = () => {
            this.isFocused = true;
            this.handleFocus();
        };
        this.handleKeyBoardBlur = () => {
            this.isFocused = false;
            if (!this.isHovered) {
                this.handleBlur();
            }
        };
        this.autoCloseTimeoutId = null;
        this.totalOpenTime = 0;
        this.totalHoverTime = 0;
        this.openTransitionProp = "opacity";
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        /** close and emit calciteInternalAlertSync event with the updated queue payload */
        this.closeAlert = () => {
            this.open = false;
            this.clearAutoCloseTimeout();
        };
        this.actionsEndSlotChangeHandler = (event) => {
            this.hasEndActions = slotChangeHasAssignedElement(event);
        };
        this.handleMouseOver = () => {
            this.isHovered = true;
            this.handleFocus();
        };
        this.handleMouseLeave = () => {
            this.isHovered = false;
            if (!this.isFocused) {
                this.handleBlur();
            }
        };
        this.handleFocus = () => {
            this.clearAutoCloseTimeout();
            this.totalOpenTime = Date.now() - this.initialOpenTime;
            this.lastMouseOverBegin = Date.now();
        };
        this.handleBlur = () => {
            const hoverDuration = Date.now() - this.lastMouseOverBegin;
            const timeRemaining = DURATIONS[this.autoCloseDuration] - this.totalOpenTime + this.totalHoverTime;
            this.totalHoverTime = this.totalHoverTime ? hoverDuration + this.totalHoverTime : hoverDuration;
            this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), timeRemaining);
        };
        this.active = false;
        this.openAlertCount = 0;
        this.open = false;
        this.autoClose = false;
        this.autoCloseDuration = "medium";
        this.embedded = false;
        this.kind = "brand";
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.numberingSystem = undefined;
        this.placement = "bottom";
        this.scale = "m";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.queue = "last";
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.numberStringFormatter = new NumberStringFormat();
        this.hasEndActions = false;
        this.isFocused = false;
    }
    handleActiveChange() {
        this.clearAutoCloseTimeout();
        if (this.active && this.autoClose && !this.autoCloseTimeoutId) {
            this.initialOpenTime = Date.now();
            this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoCloseDuration]);
        }
    }
    openHandler() {
        onToggleOpenCloseComponent(this);
        if (this.open) {
            manager.registerElement(this.el);
        }
        else {
            manager.unregisterElement(this.el);
        }
    }
    updateDuration() {
        if (this.autoClose && this.autoCloseTimeoutId) {
            this.clearAutoCloseTimeout();
            this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoCloseDuration]);
        }
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleQueueChange() {
        if (this.open) {
            manager.unregisterElement(this.el);
            manager.registerElement(this.el);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        const open = this.open;
        if (open) {
            manager.registerElement(this.el);
        }
        this.numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            signDisplay: "always",
        };
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        manager.unregisterElement(this.el);
        this.clearAutoCloseTimeout();
        disconnectLocalized(this);
        disconnectMessages(this);
        this.embedded = false;
    }
    render() {
        const { open, autoClose, label, placement, active, openAlertCount } = this;
        const role = autoClose ? "alert" : "alertdialog";
        const hidden = !open;
        const effectiveIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
        const hasQueuedAlerts = openAlertCount > 1;
        return (h(Host, { key: '925efaa1db32fd70f778106456e1dbb11d5a33b1', "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "calcite-hydrated-hidden": hidden, role: role }, h("div", { key: 'fc92bdb0f32f2e5461144fcc95d4cf77f1f1c916', class: {
                [CSS.container]: true,
                [CSS.containerActive]: active,
                [`${CSS.container}--${placement}`]: true,
                [CSS.containerEmbedded]: this.embedded,
                [CSS.focused]: this.isFocused,
            }, onPointerEnter: this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null, onPointerLeave: this.autoClose ? this.handleMouseLeave : null, ref: this.setTransitionEl }, effectiveIcon && this.renderIcon(effectiveIcon), h("div", { key: '52fe536e5f4feb0714431c5a46e0a0a2dbf27110', class: CSS.textContainer, onFocusin: this.autoClose && this.autoCloseTimeoutId ? this.handleKeyBoardFocus : null, onFocusout: this.autoClose ? this.handleKeyBoardBlur : null }, h("slot", { key: '6037f775c962ba14084e8ec8b86c7a177fef037f', name: SLOTS.title }), h("slot", { key: '736344f5602889a2a4a8fc0d22963b827a41519a', name: SLOTS.message }), h("slot", { key: '8eea607803b78c9ff554682bb36fbea3e1693d6e', name: SLOTS.link })), this.renderActionsEnd(), hasQueuedAlerts ? this.renderQueueCount() : null, this.renderCloseButton(), open && active && autoClose ? h("div", { class: CSS.dismissProgress }) : null)));
    }
    renderCloseButton() {
        return (h("button", { "aria-label": this.messages.close, class: CSS.close, key: "close", onClick: this.closeAlert, onFocusin: this.autoClose ? this.handleKeyBoardFocus : null, onFocusout: this.autoClose ? this.handleKeyBoardBlur : null, ref: (el) => (this.closeButton = el), type: "button" }, h("calcite-icon", { icon: "x", scale: getIconScale(this.scale) })));
    }
    renderQueueCount() {
        const { openAlertCount } = this;
        const queueNumber = openAlertCount > 2 ? openAlertCount - 1 : 1;
        const queueText = this.numberStringFormatter.numberFormatter.format(queueNumber);
        return (h("div", { class: {
                [CSS.queueCount]: true,
                [CSS.queueCountActive]: openAlertCount > 1,
            }, key: "queue-count" }, h("calcite-chip", { scale: this.scale, value: queueText }, queueText)));
    }
    renderActionsEnd() {
        return (h("div", { class: CSS.actionsEnd }, h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.actionsEndSlotChangeHandler })));
    }
    renderIcon(icon) {
        return (h("div", { class: CSS.icon }, h("calcite-icon", { flipRtl: this.iconFlipRtl, icon: icon, scale: getIconScale(this.scale) })));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Sets focus on the component's "close" button, the first focusable item.
     *
      @returns {Promise<void>}
     */
    async setFocus() {
        await componentFocusable(this);
        const alertLinkEl = getSlotted(this.el, { selector: "calcite-link" });
        if (!this.closeButton && !alertLinkEl) {
            return;
        }
        else if (alertLinkEl) {
            return alertLinkEl.setFocus();
        }
        else if (this.closeButton) {
            this.closeButton.focus();
        }
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
        this.numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            signDisplay: "always",
        };
    }
    numberingSystemChange() {
        this.numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            signDisplay: "always",
        };
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    clearAutoCloseTimeout() {
        window.clearTimeout(this.autoCloseTimeoutId);
        this.autoCloseTimeoutId = null;
    }
    onBeforeOpen() {
        this.calciteAlertBeforeOpen.emit();
    }
    onOpen() {
        this.calciteAlertOpen.emit();
    }
    onBeforeClose() {
        this.calciteAlertBeforeClose.emit();
    }
    onClose() {
        this.calciteAlertClose.emit();
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "active": ["handleActiveChange"],
        "open": ["openHandler"],
        "autoCloseDuration": ["updateDuration"],
        "messageOverrides": ["onMessagesChange"],
        "queue": ["handleQueueChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "numberingSystem": ["numberingSystemChange"]
    }; }
    static get style() { return CalciteAlertStyle0; }
}, [1, "calcite-alert", {
        "active": [4],
        "openAlertCount": [2, "open-alert-count"],
        "open": [1540],
        "autoClose": [516, "auto-close"],
        "autoCloseDuration": [513, "auto-close-duration"],
        "embedded": [1028],
        "kind": [513],
        "icon": [520],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "label": [1],
        "numberingSystem": [513, "numbering-system"],
        "placement": [513],
        "scale": [513],
        "messages": [1040],
        "messageOverrides": [1040],
        "queue": [513],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "numberStringFormatter": [32],
        "hasEndActions": [32],
        "isFocused": [32],
        "setFocus": [64]
    }, undefined, {
        "active": ["handleActiveChange"],
        "open": ["openHandler"],
        "autoCloseDuration": ["updateDuration"],
        "messageOverrides": ["onMessagesChange"],
        "queue": ["handleQueueChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "numberingSystem": ["numberingSystemChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-alert", "calcite-chip", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-alert":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Alert);
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Alert as A, defineCustomElement as d };
