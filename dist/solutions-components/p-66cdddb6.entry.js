/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement, F as Fragment } from './p-4e6eb06e.js';
import { s as slotChangeHasAssignedElement, t as toAriaBoolean, o as getSlotted, z as setRequestedIcon, g as getElementDir } from './p-621ad249.js';
import { g as getIconScale } from './p-4a291f79.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-ad9d1221.js';
import { N as NumberStringFormat, c as connectLocalized, d as disconnectLocalized } from './p-895e7b9c.js';
import { o as onToggleOpenCloseComponent } from './p-c7f8b7f0.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './p-efaa77a0.js';
import { K as KindIcons } from './p-876c3f5f.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './p-d6902512.js';
import { S as SLOTS$2 } from './p-3776809a.js';
import { l as loadModules, g as getLocaleComponentStrings } from './p-f4aadb3b.js';
import { a as getAllLayers, g as getLayerOrTable } from './p-d572627c.js';
import { P as PopupUtils } from './p-2360802a.js';
import './p-7d542581.js';
import './p-91371f97.js';
import './p-4f82eb55.js';
import './p-233f219c.js';
import './p-ff336351.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-80cb7c73.js';
import './p-46c8015c.js';
import './p-d0d020a5.js';
import './p-7530a02f.js';
import './p-9bb44f57.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const DURATIONS = {
    slow: 14000,
    medium: 10000,
    fast: 6000,
};
const SLOTS$1 = {
    actionsEnd: "actions-end",
    title: "title",
    message: "message",
    link: "link",
};
const CSS$1 = {
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
 * v2.13.0
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

const alertCss = ":host{--calcite-internal-alert-edge-distance:2rem;display:block;inline-size:var(--calcite-alert-width)}.container{pointer-events:none;position:fixed;z-index:var(--calcite-z-index-toast);margin-inline:auto;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:-moz-min-content;min-inline-size:min-content;align-items:center;justify-content:center;text-align:start;opacity:0;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--calcite-alert-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow));background-color:var(--calcite-alert-background-color, var(--calcite-color-foreground-1));border-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));border-block-start:0 solid transparent;border-inline:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3);max-inline-size:calc(100% - var(--calcite-internal-alert-edge-distance) * 2);transition:opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out}.container--bottom,.container--top{inset-inline-end:0;inset-inline-start:0}.container[class*=bottom]{transform:translate3d(0, var(--calcite-internal-alert-edge-distance), 0);inset-block-end:var(--calcite-internal-alert-edge-distance)}.container[class*=top]{transform:translate3d(0, calc(-1 * var(--calcite-internal-alert-edge-distance)), 0);inset-block-start:var(--calcite-internal-alert-edge-distance)}.container[class*=start]{inset-inline-start:var(--calcite-internal-alert-edge-distance);inset-inline-end:auto}.container[class*=end]{inset-inline-end:var(--calcite-internal-alert-edge-distance);inset-inline-start:auto}.icon{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0px;margin-block:auto;margin-inline-end:auto}.close{display:flex;cursor:pointer;align-items:center;justify-content:flex-end;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline:2px solid transparent;outline-offset:2px;-webkit-appearance:none;border-start-end-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));border-end-end-radius:var(--calcite-alert-corner-radius, var(--calcite-border-radius));outline-color:transparent}.close:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:hover,.close:focus{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-2)}.close:active{background-color:var(--calcite-color-foreground-3)}.queue-count{visibility:hidden;display:flex;min-inline-size:-moz-min-content;min-inline-size:min-content;cursor:default;align-items:center;justify-content:space-around;align-self:stretch;overflow:hidden;text-align:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);opacity:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline:0 solid transparent;border-start-end-radius:0}.queue-count--active{visibility:visible;opacity:1}.dismiss-progress{position:absolute;display:block;inline-size:100%;overflow:hidden;inset-inline:0;inset-block-start:-2px;block-size:2px;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.dismiss-progress::after{position:absolute;inset-block-start:0px;display:block;block-size:2px;content:\"\";background-color:var(--calcite-color-transparent-tint);inset-inline-end:0}.actions-end{display:flex;align-self:stretch}.text-container{box-sizing:border-box;display:flex;min-inline-size:0px;flex:1 1 auto;flex-direction:column;overflow-wrap:break-word}.footer{position:relative;display:flex;inline-size:auto;justify-content:flex-end;align-self:stretch;padding-block-start:1px;block-size:inherit}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .queue-count{margin-inline:0.5rem}:host([scale=s]) .container{--calcite-internal-alert-min-height:3.5rem;inline-size:var(--calcite-alert-width, 40em)}:host([scale=s]) .close{padding:0.75rem}:host([scale=s]) .icon{padding-inline-start:0.75rem}:host([scale=s]) .text-container{padding-block:0.5rem;padding-inline:0.75rem 0.5rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .queue-count{margin-inline:0.75rem}:host([scale=m]) .container{--calcite-internal-alert-min-height:4.1875rem;inline-size:var(--calcite-alert-width, 50em)}:host([scale=m]) .close{padding:1rem}:host([scale=m]) .icon{padding-inline-start:1rem}:host([scale=m]) .text-container{padding-block:0.75rem;padding-inline:1rem 0.75rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){margin-block-end:0.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .queue-count{margin-inline:1rem}:host([scale=l]) .container{--calcite-internal-alert-min-height:5.625rem;inline-size:var(--calcite-alert-width, 60em)}:host([scale=l]) .close{padding:1.25rem}:host([scale=l]) .icon{padding-inline-start:1.25rem}:host([scale=l]) .text-container{padding-block:1rem;padding-inline:1.25rem 1rem}:host([open]) .container--active{border-block-start-width:2px;opacity:1;pointer-events:initial}:host([open]) .container--active[class*=bottom]{transform:translate3d(0, calc(-1 * var(--calcite-internal-alert-edge-distance)), inherit)}:host([open]) .container--active[class*=top]{transform:translate3d(0, var(--calcite-internal-alert-edge-distance), inherit)}:host([auto-close])>.queue-count{border-inline-end:0 solid transparent}slot[name=title]::slotted(*),*::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){margin:0px;display:inline;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-normal);margin-inline-end:0.5rem;color:var(--calcite-color-text-2)}slot[name=link]::slotted(*),*::slotted([slot=link]){display:inline-flex;color:var(--calcite-color-text-link)}:host([kind=brand]) .container{border-block-start-color:var(--calcite-color-brand)}:host([kind=brand]) .container .icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-block-start-color:var(--calcite-color-status-info)}:host([kind=info]) .container .icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-block-start-color:var(--calcite-color-status-success)}:host([kind=success]) .container .icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-block-start-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .icon{color:var(--calcite-color-status-warning)}:host([auto-close-duration=fast]) .dismiss-progress:after{animation:dismissProgress 6000ms ease-out}:host(:hover[auto-close-duration=fast]) .dismiss-progress:after,:host(:focus[auto-close-duration=fast]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=medium]) .dismiss-progress:after{animation:dismissProgress 10000ms ease-out}:host(:hover[auto-close-duration=medium]) .dismiss-progress:after,:host(:focus[auto-close-duration=medium]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=slow]) .dismiss-progress:after{animation:dismissProgress 14000ms ease-out}:host(:hover[auto-close-duration=slow]) .dismiss-progress:after,:host(:focus[auto-close-duration=slow]) .dismiss-progress:after{animation-play-state:paused}.container.focused .dismiss-progress::after{animation-play-state:paused}@keyframes dismissProgress{0%{inline-size:0px;opacity:0.75}100%{inline-size:100%;opacity:1}}.container--embedded{position:absolute}:host([hidden]){display:none}[hidden]{display:none}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}";
const CalciteAlertStyle0 = alertCss;

const manager = new AlertManager();
const Alert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: 'cecedeaa678e4f6e22fd2aabc4d29bc8589430f6', "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "calcite-hydrated-hidden": hidden, role: role }, h("div", { key: 'ca85d5f5ec313f3a305e01dcc8cbbad9647dd516', class: {
                [CSS$1.container]: true,
                [CSS$1.containerActive]: active,
                [`${CSS$1.container}--${placement}`]: true,
                [CSS$1.containerEmbedded]: this.embedded,
                [CSS$1.focused]: this.isFocused,
            }, onPointerEnter: this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null, onPointerLeave: this.autoClose ? this.handleMouseLeave : null, ref: this.setTransitionEl }, effectiveIcon && this.renderIcon(effectiveIcon), h("div", { key: '1f72f255c3e0630eed63bb62d3d50f4a2ba6a528', class: CSS$1.textContainer, onFocusin: this.autoClose && this.autoCloseTimeoutId ? this.handleKeyBoardFocus : null, onFocusout: this.autoClose ? this.handleKeyBoardBlur : null }, h("slot", { key: 'aade607960adea0a10f5eac85b119444085c9cf9', name: SLOTS$1.title }), h("slot", { key: '1f47158cfbf8c0626cd49246142fb750311b1d4a', name: SLOTS$1.message }), h("slot", { key: '5ba06e024b517f23168311828cc8ce41c21926a6', name: SLOTS$1.link })), this.renderActionsEnd(), hasQueuedAlerts ? this.renderQueueCount() : null, this.renderCloseButton(), open && active && autoClose ? h("div", { class: CSS$1.dismissProgress }) : null)));
    }
    renderCloseButton() {
        return (h("button", { "aria-label": this.messages.close, class: CSS$1.close, key: "close", onClick: this.closeAlert, onFocusin: this.autoClose ? this.handleKeyBoardFocus : null, onFocusout: this.autoClose ? this.handleKeyBoardBlur : null, ref: (el) => (this.closeButton = el), type: "button" }, h("calcite-icon", { icon: "x", scale: getIconScale(this.scale) })));
    }
    renderQueueCount() {
        const { openAlertCount } = this;
        const queueNumber = openAlertCount > 2 ? openAlertCount - 1 : 1;
        const queueText = this.numberStringFormatter.numberFormatter.format(queueNumber);
        return (h("div", { class: {
                [CSS$1.queueCount]: true,
                [CSS$1.queueCountActive]: openAlertCount > 1,
            }, key: "queue-count" }, h("calcite-chip", { scale: this.scale, value: queueText }, queueText)));
    }
    renderActionsEnd() {
        return (h("div", { class: CSS$1.actionsEnd }, h("slot", { name: SLOTS$1.actionsEnd, onSlotchange: this.actionsEndSlotChangeHandler })));
    }
    renderIcon(icon) {
        return (h("div", { class: CSS$1.icon }, h("calcite-icon", { flipRtl: this.iconFlipRtl, icon: icon, scale: getIconScale(this.scale) })));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "active": ["handleActiveChange"],
        "open": ["openHandler"],
        "autoCloseDuration": ["updateDuration"],
        "messageOverrides": ["onMessagesChange"],
        "queue": ["handleQueueChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "numberingSystem": ["numberingSystemChange"]
    }; }
};
Alert.style = CalciteAlertStyle0;

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

const FlowItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: '2e7872bb2687db0b67ddbf375f8ec0beaabbda36' }, h(InteractiveContainer, { key: 'a9418954405a2cec2092bae3be5d77f02306e3c9', disabled: disabled }, h("calcite-panel", { key: 'd563c751421bf2d66c03286deaa613e09f585546', beforeClose: beforeClose, closable: closable, closed: closed, collapseDirection: collapseDirection, collapsed: collapsed, collapsible: collapsible, description: description, disabled: disabled, heading: heading, headingLevel: headingLevel, loading: loading, menuOpen: menuOpen, messageOverrides: messages, onCalcitePanelClose: this.handleInternalPanelClose, onCalcitePanelScroll: this.handleInternalPanelScroll, onCalcitePanelToggle: this.handleInternalPanelToggle, overlayPositioning: overlayPositioning, ref: this.setContainerRef, scale: this.scale }, this.renderBackButton(), h("slot", { key: 'c506ec8bb4debbd6a9da6c7941878de49776f614', name: SLOTS.actionBar, slot: SLOTS$2.actionBar }), h("slot", { key: 'e76e55e654ff878acff734bdf387402a9e262159', name: SLOTS.alerts, slot: SLOTS$2.alerts }), h("slot", { key: 'f7ab8839d7b101e31087130ebf3e36af1ec7da24', name: SLOTS.headerActionsStart, slot: SLOTS$2.headerActionsStart }), h("slot", { key: '2932c4c15b168732356b8e55fcc3064f5b3f4cf5', name: SLOTS.headerActionsEnd, slot: SLOTS$2.headerActionsEnd }), h("slot", { key: '1ef8a9050683022733695445092f8c626487d87b', name: SLOTS.headerContent, slot: SLOTS$2.headerContent }), h("slot", { key: '24c0ab570a601a6c0edfb0c820e580fd24b158ce', name: SLOTS.headerMenuActions, slot: SLOTS$2.headerMenuActions }), h("slot", { key: 'ec55bbe7ba939a6efb35225850c37a1aadb97275', name: SLOTS.fab, slot: SLOTS$2.fab }), h("slot", { key: 'aa0bfec47656ef9f7f575cd933897a7909e5badc', name: SLOTS.contentTop, slot: SLOTS$2.contentTop }), h("slot", { key: 'e23532d080e2df529c2aeb6af043c6efe7a0ab6d', name: SLOTS.contentBottom, slot: SLOTS$2.contentBottom }), h("slot", { key: 'db6ffc0d9300c77067a4c88ab277de685c7713af', name: SLOTS.footerStart, slot: SLOTS$2.footerStart }), h("slot", { key: '5f249356da9292f34c4036d0d0741f048fe999e9', name: SLOTS.footer, slot: SLOTS$2.footer }), h("slot", { key: '7476137bacc0f3be5c97682c5027f74d73254765', name: SLOTS.footerEnd, slot: SLOTS$2.footerEnd }), h("slot", { key: '58f60a46c42a05abe9b100a57d478d991e4f25bc', name: SLOTS.footerActions, slot: SLOTS$2.footerActions }), h("slot", { key: '926a8d94b76b6fcdef6dfd219ba8180c44f81c35' })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
FlowItem.style = CalciteFlowItemStyle0;

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}.search-widget{width:92% !important;margin:5px 14px 20px 14px}.display-none{display:none !important}.hide-map{height:1%;visibility:hidden}.show-map{padding:10px !important;position:absolute !important;bottom:0;height:auto !important;width:calc(100% - 22px)}.notice-msg{padding:10px;width:calc(100% - 20px)}.esri-editor__panel-content{padding-block:10px !important}@media only screen and (max-width: 600px){.esri-editor__panel-content{padding-block:0 !important;min-height:0 !important}}";
const CreateFeatureStyle0 = createFeatureCss;

const CreateFeature = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.success = createEvent(this, "success", 7);
        this.fail = createEvent(this, "fail", 7);
        this.drawComplete = createEvent(this, "drawComplete", 7);
        this.editingAttachment = createEvent(this, "editingAttachment", 7);
        this.progressStatus = createEvent(this, "progressStatus", 7);
        this.modeChanged = createEvent(this, "modeChanged", 7);
        this.mapView = undefined;
        this.selectedLayerId = undefined;
        this.customizeSubmit = false;
        this.searchConfiguration = undefined;
        this.isMobile = undefined;
        this.floorLevel = undefined;
        this.formElements = undefined;
        this.enableSearch = false;
        this.showGuidingMsg = true;
        this.showGuidingMsgWhileDrawing = true;
        this._editorLoading = false;
        this._currentPage = "templatePicker";
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor constructor
     */
    Editor;
    /**
     * esri/form/ExpressionInfo: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-ExpressionInfo.html
     * The ExpressionInfo constructor
     */
    ExpressionInfo;
    /**
     * esri/form/elements/FieldElement: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-elements-FieldElement.html
     * The FieldElement constructor
     */
    FieldElement;
    /**
     * esri/form/FormTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-FormTemplate.html
     */
    FormTemplate;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor instance
     */
    _editor;
    /**
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     * The Feature layer instance
     */
    FeatureLayer;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     * The MapView instance
     */
    MapView;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     * Updated map view instance
     */
    _updatedMapView;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     * The Search instance
     */
    Search;
    /**
     * "esri/widgets/Search": https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     * The Search instance
     */
    _search;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * boolean: Flag to maintain the add attachment
     */
    _addingAttachment;
    /**
     * HTMLDivElement: The node the editor will be added to
     */
    _container;
    /**
     * HTMLDivElement: The node for the map view
     */
    _mapViewContainer;
    /**
     * boolean: Flag to maintain form submission using submit button
     */
    _isSubmitBtnClicked = false;
    /**
     * __esri.FeatureLayer: selected feature layer;
     */
    _selectedLayer;
    /**
     * HTMLDivElement: refrence for search div element
     */
    _searchDiv;
    /**
     * HTMLCalciteNoticeElement: calcite notice refrence element
     */
    _calciteNotice;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this.init();
        });
    }
    /**
     * Called each time when isMobile prop is changed.
     */
    async isMobileHandler() {
        // emit an event when mode is changed to back to the feature selection panel (to avoid multiple maps conflict)
        this.modeChanged.emit();
    }
    /**
     * When _editorLoading is true the container node will be hidden while starting the create workflow
     */
    async _editorLoadingWatchHandler(v) {
        if (v) {
            this._container?.classList.add("display-none");
            if (this._selectedLayer?.isTable) {
                const template = this._selectedLayer.templates[0];
                const creationInfo = {
                    layer: this._selectedLayer,
                    template
                };
                await this._editor.startCreateFeaturesWorkflowAtFeatureCreation(creationInfo);
                await this.hideEditorsElements();
            }
            else {
                await this.startCreate();
            }
            this._container?.classList.remove("display-none");
            this._editorLoading = false;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Submit the created feature
     * @returns Promise that resolves when the operation is complete
     */
    async submit() {
        if (this._editor) {
            this._isSubmitBtnClicked = true;
            this._editor.viewModel.featureFormViewModel.submit();
        }
    }
    /**
     * refresh the feature form
     * @returns Promise that resolves when the operation is complete
     */
    async refresh(floorLevel) {
        if (this._editor) {
            void this._setFloorLevel(floorLevel);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the feature is created successfully
     */
    success;
    /**
     * Emitted on demand when the feature creation is failed
     */
    fail;
    /**
     * Emitted on demand when drawing is completed
     */
    drawComplete;
    /**
    * Emitted on demand when editing attachments
    */
    editingAttachment;
    /**
     * Emitted on demand when editor panel changes
     */
    progressStatus;
    /**
     * Emitted on switched form mobile to desktop or vice versa
     */
    modeChanged;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this.initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.init();
    }
    /**
     * Called after each render
     * Used to adjust the map top in case of mobile
     */
    componentDidRender() {
        // update the map top according to space occupied by notice msg and search
        if (this.isMobile) {
            // get the height of notice, search and add 80px(editor msg) height to adjust the map top
            const top = this._calciteNotice.offsetHeight + this._searchDiv.offsetHeight + 80;
            this._mapViewContainer.style.top = `${top}px`;
        }
    }
    /**
     * StencilJS: Called every time the component is disconnected from the DOM,
     */
    disconnectedCallback() {
        if (this._editor) {
            this._editor.destroy();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const showSearchWidget = this._currentPage === 'drawing' ? "" : "display-none";
        const loaderClass = this._editorLoading ? "" : "display-none";
        const featureFormClass = this._editorLoading ? "display-none" : "";
        const mobileMapClass = this.isMobile ? "show-map" : "display-none";
        // hide guiding msg for drawing page when showGuidingMsgWhileDrawing is false
        const showGuidingMsg = this.showGuidingMsg && (this.showGuidingMsgWhileDrawing || this._currentPage !== "drawing");
        let guidingMsg = this._translations.chooseCategoryMsg;
        if (this._currentPage === 'drawing') {
            guidingMsg = this._translations.provideLocationMsg;
        }
        else if (this._currentPage === 'featureForm') {
            guidingMsg = this._translations.provideDetailsMsg;
        }
        return (h(Fragment, { key: '89634bf5707ea8390416d3087bfbe4e747bafcd7' }, showGuidingMsg && h("calcite-notice", { key: '4269224c2904f29060081f6cb8f383f1cf8d741d', class: "notice-msg", icon: "lightbulb", kind: "success", open: true, ref: el => this._calciteNotice = el }, h("div", { key: 'ecc3cca85c81d1cb7ab7cdc89b99e31afcb55f76', slot: "message" }, guidingMsg)), h("calcite-loader", { key: '34e492c0c469b39d4cfbcda17c4ba196ccb39eb8', class: loaderClass, label: "", scale: "s" }), h("div", { key: 'b2073ef4b6124b54038de34798cdf83337626023', class: featureFormClass, id: "feature-form" }), this.enableSearch &&
            h("div", { key: 'cd13e98b6a40d5d89d271b5785f797e9bfc19900', class: `search-widget ${showSearchWidget} ${featureFormClass}`, id: "search-widget-ref", ref: el => this._searchDiv = el }), h("div", { key: '2575b2d20f7713b05a2024e77452af93eb64e147', class: `${mobileMapClass}`, ref: (el) => { this._mapViewContainer = el; } })));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Init Editor widget and Search widget
     */
    async init() {
        if (this.mapView && this.selectedLayerId) {
            this._updatedMapView = this.mapView;
            // In mobile mode show the map in panel
            await (this.isMobile ? this.createMobileMapView() : this._loadWidgets());
        }
    }
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    async initModules() {
        const [Editor, reactiveUtils, Search, ExpressionInfo, FieldElement, FormTemplate, MapView] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils",
            "esri/widgets/Search",
            "esri/form/ExpressionInfo",
            "esri/form/elements/FieldElement",
            "esri/form/FormTemplate",
            "esri/views/MapView"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
        this.Search = Search;
        this.ExpressionInfo = ExpressionInfo;
        this.FieldElement = FieldElement;
        this.FormTemplate = FormTemplate;
        this.MapView = MapView;
    }
    /**
     * updates the map view (in case of mobile)
     * @protected
     */
    async createMobileMapView() {
        this._mapViewContainer.classList.add('hide-map');
        await new this.MapView({
            map: this.mapView.map,
            container: this._mapViewContainer,
            zoom: this.mapView.zoom
        }).when((view) => {
            // update the mapView and load all widgets
            this._updatedMapView = view;
            void this._loadWidgets();
        }, (e) => {
            console.log(e);
        });
    }
    /**
     * Loads the Editor and Search widgets
     * @protected
     */
    async _loadWidgets() {
        await this.createEditorWidget();
        if (this.enableSearch) {
            await this.createSearchWidget();
        }
    }
    /**
     * Display editor widget to create the new feature
     * @protected
     */
    async createEditorWidget() {
        if (this._editor) {
            this._editor.destroy();
        }
        const layerInfos = [];
        this._container = document.createElement("div");
        this._container?.classList.add("display-none");
        const allMapLayers = await getAllLayers(this._updatedMapView);
        this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        // if layer is selected then only use the layerInfos while initializing the editor widget
        if (!this._selectedLayer?.isTable) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            allMapLayers.forEach(async (eachLayer) => {
                layerInfos.push({
                    layer: eachLayer,
                    enabled: eachLayer?.type === "feature" && eachLayer?.id === this.selectedLayerId,
                    addEnabled: true, // default is true, set to false to disable the ability to add a new feature
                    updateEnabled: false, // if true, enable ability to edit an existing feature
                    deleteEnabled: false // default is true, set to false to disable the ability to delete features
                });
            });
        }
        this._editor = new this.Editor({
            view: this._updatedMapView,
            layerInfos: layerInfos,
            visibleElements: {
                snappingControls: false,
                createFeaturesSection: true,
                editFeaturesSection: false
            },
            container: this._container
        });
        if (this._mapViewContainer) {
            this.el.insertBefore(this._container, this._mapViewContainer);
        }
        else {
            this.el.appendChild(this._container);
        }
        //Add handle to watch if attachments are added/edited
        const attachmentHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            if (state === 'adding-attachment' || state === 'editing-attachment') {
                this._addingAttachment = true;
                this.editingAttachment.emit(true);
            }
            else {
                if (this._addingAttachment) {
                    this.editingAttachment.emit(false);
                    this._addingAttachment = false;
                }
            }
        });
        this._editor.viewModel.addHandles(attachmentHandle);
        //Add handle to watch featureTemplatesViewModel ready state and then start the creation
        const handle = this.reactiveUtils.watch(() => this._editor.viewModel.featureTemplatesViewModel.state, (state) => {
            console.log(`CF state: ${state}`);
            if (state === 'ready' && this._editor.viewModel?.activeWorkflow?.type !== "create-features") {
                this.progressStatus.emit(0.5);
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
        //Add handle to watch featureFormViewModel ready state
        const formHandle = this.reactiveUtils.watch(() => this._editor.viewModel.featureFormViewModel?.state, (state) => {
            console.log(`CF fvm state: ${state}`);
            if (state === 'ready') {
                this._mapViewContainer?.classList?.replace("show-map", "hide-map");
                this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
                setTimeout(() => {
                    void this._setFloorLevel(this.floorLevel);
                }, 50);
                this._currentPage = 'featureForm';
                this.progressStatus.emit(1);
                this.drawComplete.emit();
            }
        });
        this._editor.viewModel.addHandles(formHandle);
        //Add handle to watch editor viewmodel state and then show the search widget
        const createFeatureHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            if (state === 'creating-features') {
                if (this._editor.viewModel.featureFormViewModel.state === 'disabled') {
                    this._mapViewContainer?.classList?.replace("hide-map", "show-map");
                    if (this._selectedLayer && !this._selectedLayer.isTable) {
                        this._currentPage = 'drawing';
                    }
                }
            }
        });
        this._editor.viewModel.addHandles(createFeatureHandle);
    }
    /**
     * Start creating the feature
     * @protected
     */
    async startCreate() {
        // hides the header elements on template picker page
        await this.hideEditorsElements();
        return new Promise((resolve, reject) => {
            if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
                const items = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
                //once the feature template is selected handle the event for formSubmit and sketch complete
                //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
                this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
                    this.progressStatus.emit(0.75);
                    setTimeout(() => {
                        //hides the header and footer elements in editor widget
                        this.hideEditorsElements().then(() => {
                            resolve({});
                        }, e => reject(e));
                    }, 700);
                });
                //if only one feature template then directly start geometry creation for that
                if (items.length === 1) {
                    this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
                }
                const resolvePromise = items.length > 1;
                this.hideEditorsElements().then(() => {
                    if (resolvePromise) {
                        resolve({});
                    }
                }, e => resolvePromise && reject(e));
            }
        });
    }
    /**
     * Display search widget to search location
     * @protected
     */
    async createSearchWidget() {
        let searchOptions = {
            view: this._updatedMapView,
        };
        if (this.searchConfiguration) {
            const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this._updatedMapView);
            searchOptions = {
                ...searchConfiguration
            };
        }
        this._search = new this.Search(searchOptions);
        this._search.container = 'search-widget-ref';
        this._search.popupEnabled = false;
        this._search.resultGraphicEnabled = false;
        let pointGeometry = null;
        // on search get the geometry of the searched location and pass it in sketchViewModel and go to featureForm page
        this._search.on('search-complete', (e) => {
            void this._updatedMapView.goTo(e.results[0].results[0].extent);
            if (this._selectedLayer.geometryType === 'point') {
                pointGeometry = e.results[0].results[0]?.feature.geometry;
            }
        });
        //Add handle to watch if search viewModel state is ready
        const createFeatureHandle = this.reactiveUtils.watch(() => this._search.viewModel.state, (state) => {
            if (state === 'ready') {
                setTimeout(() => {
                    if (this._editor.viewModel.sketchViewModel.createGraphic && pointGeometry) {
                        this._editor.viewModel.sketchViewModel.createGraphic.set('geometry', pointGeometry);
                        this._editor.viewModel.sketchViewModel.complete();
                        void this.hideEditorsElements();
                    }
                }, 100);
            }
        });
        this._search.viewModel.addHandles(createFeatureHandle);
    }
    /**
     * Initialize the search widget based on user defined configuration
     *
     * @param searchConfiguration search configuration defined by the user
     * @param view the current map view
     *
     * @protected
     */
    _getSearchConfig(searchConfiguration, view) {
        const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
        const sources = searchConfiguration.sources;
        if (sources?.length > 0) {
            searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
            sources.forEach((source) => {
                const isLayerSource = source.hasOwnProperty("layer");
                if (isLayerSource) {
                    const layerSource = source;
                    const layerId = layerSource.layer?.id;
                    const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
                    const layerUrl = layerSource?.layer?.url;
                    if (layerFromMap) {
                        layerSource.layer = layerFromMap;
                    }
                    else if (layerUrl) {
                        layerSource.layer = new this.FeatureLayer(layerUrl);
                    }
                }
            });
            sources?.forEach((source) => {
                const isLocatorSource = source.hasOwnProperty("locator");
                if (isLocatorSource) {
                    const locatorSource = source;
                    if (locatorSource?.name === "ArcGIS World Geocoding Service") {
                        const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
                        locatorSource.outFields = outFields;
                        locatorSource.singleLineFieldName = "SingleLine";
                    }
                    locatorSource.url = locatorSource.url;
                    delete locatorSource.url;
                }
            });
        }
        else {
            searchConfiguration = {
                ...searchConfiguration,
                includeDefaultSources: true
            };
        }
        return searchConfiguration;
    }
    /**
     * Add the floor level value to form
     * @param level selected floor level
     *
     * @protected
     */
    async _setFloorLevel(level) {
        if (!level) {
            return;
        }
        const layer = this._selectedLayer;
        if (layer?.floorInfo?.floorField) {
            const layerField = layer.fields.find((field) => field.name === layer.floorInfo.floorField);
            // if layer field is present and form template is not present only then we can set value of floorfield into feature form otherwise create a mannual formtemplate to add the floorfeild element
            if (layerField && !layer?.formTemplate) {
                this._editor.viewModel.featureFormViewModel.setValue(layerField.name, level);
                layerField.editable = false;
            }
            else if (layer.formTemplate && this.formElements) {
                const floorInfoExpression = new this.ExpressionInfo({
                    expression: `"${level}"`,
                    name: "floor-info-test",
                    title: "Floor Info",
                    returnType: "string"
                });
                const levelIdFieldElement = new this.FieldElement({
                    label: layer.floorInfo.floorField,
                    editableExpression: 'false',
                    fieldName: layer.floorInfo.floorField,
                    input: {
                        type: "text-box",
                        maxLength: 50,
                        minLength: 0
                    },
                    valueExpression: floorInfoExpression.name
                });
                this._updatedMapView.map.editableLayers.forEach((layer) => {
                    const orgElements = this.formElements.orgElements;
                    const orgExpressionInfos = this.formElements.orgExpressionInfos;
                    const elements = [...orgElements];
                    elements.push(levelIdFieldElement);
                    // Creating formtemplate
                    const floorInfoTemplate = new this.FormTemplate({
                        title: layer.formTemplate.title,
                        description: layer.formTemplate.description,
                        elements,
                        expressionInfos: [floorInfoExpression].concat(orgExpressionInfos)
                    });
                    layer.formTemplate = floorInfoTemplate;
                });
            }
        }
    }
    /**
     * Hides the elements of editor widget
     * @protected
     */
    async hideEditorsElements() {
        if (!this.customizeSubmit) {
            return;
        }
        await this.timeout(700);
        //hides the header and footer on the featureForm
        this.el.querySelector('.esri-editor')?.querySelectorAll('calcite-flow-item')?.forEach((flowItem) => {
            const article = flowItem.shadowRoot?.querySelector('calcite-panel')?.shadowRoot?.querySelector('article');
            //hide the header
            article?.querySelector('header')?.setAttribute('style', 'display: none');
            //hide the footer
            article?.querySelector('footer')?.setAttribute('style', 'display: none');
        });
    }
    /**
     * On creation of feature emit the event that the feature is created
     * @param evt feature submit event
     * @protected
     */
    async submitted(evt) {
        //return if any attribute is invalid , focus will be shifted to the invalid attribute in feature form
        if (evt.invalid.length) {
            this._isSubmitBtnClicked = false;
            return;
        }
        //Submit only when valid attributes
        //emit success or fail based on the result
        if (evt.valid.length && this._isSubmitBtnClicked) {
            this._isSubmitBtnClicked = false;
            try {
                await this._editor.activeWorkflow.commit();
                //throw errors if any failures
                if (this._editor.viewModel.failures?.length) {
                    this._editor.viewModel.failures.some((failure) => {
                        if (failure.error) {
                            throw (failure.error);
                        }
                    });
                }
            }
            catch (e) {
                this.fail.emit(e);
                return;
            }
            this.success.emit();
        }
    }
    /**
     * call setTimeout in Promise wrapper
     * @param delay The time, in milliseconds that the timer should wait before the promise is resolved
     * @protected
     */
    timeout(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"],
        "isMobile": ["isMobileHandler"],
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }; }
};
CreateFeature.style = CreateFeatureStyle0;

const editCardCss = ":host{display:block}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:var(--calcite-font-weight-bold)}.font-500{font-weight:var(--calcite-font-weight-medium)}.font-italic{font-style:italic}#feature-form{padding-top:0px}.padding-sides-bottom-1{padding:0 1rem 1rem 1rem}.position-relative{position:relative}.esri-editor__prompt--danger{position:relative !important;width:100% !important;background-color:var(--calcite-color-foreground-1) !important}.esri-feature__content-node{background-color:var(--calcite-color-foreground-1) !important}.esri-editor__panel-toolbar{display:none !important}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}.esri-editor__panel-content{padding-block:10px !important}";
const EditCardStyle0 = editCardCss;

const EditCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.closeEdit = createEvent(this, "closeEdit", 7);
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.refreshGraphics = createEvent(this, "refreshGraphics", 7);
        this.enableEditGeometry = false;
        this.graphics = undefined;
        this.mapView = undefined;
        this.open = false;
        this.graphicIndex = 0;
        this._editorLoading = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
      * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
      */
    _activeWorkflowHandle;
    /**
      * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
      */
    _addRelatedRecordHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _attachmentHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _editHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _layerEditHandle;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor constructor
     */
    Editor;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor instance
     */
    _editor;
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     * OR
     * esri/layers/support/SubtypeSublayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-SubtypeSublayer.html
     */
    _layer;
    /**
     * HTMLDivElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement
     */
    _editContainer;
    /**
     * any[]: Collection of edit controls created in "MULTI" edit mode
     * These can be calcite-input-text, calcite-input-number, calcite-input-date-picker, calcite-input-time-picker, or calcite-combobox
     */
    _editControlElements;
    /**
     * boolean: When true edit controls will be disabled
     */
    _editingDisabled;
    /**
     * boolean: When true the Editor widget should be closed
     * Without this logic we are taken to the Editors "Select" workflow step
     */
    _shouldClose = false;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the graphics and update the feature widget
     */
    async graphicsWatchHandler() {
        if (this.graphics.length === 0 && this.open) {
            await this._closeEdit(true);
        }
    }
    async openWatchHandler(v) {
        console.log(`openWatchHandler`);
        if (v && this.graphics?.length > 0 && this.graphicIndex > -1) {
            this._editorLoading = true;
            await this._initEditorWidget();
            if (this.graphicIndex > -1 && this.graphics.length > 0 && this.open && !this._shouldClose) {
                await this._startUpdate();
            }
            this._editorLoading = false;
        }
        if (!v) {
            await this._closeEdit(true);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the Editor widget should be closed
     */
    closeEdit;
    /**
     * Emitted on demand when edits are completed on current edit layer
     */
    editsComplete;
    /**
     * Emitted on demand when the editor is closed to handle
     * things like attachment updates that don't fire the standard edit update event when complete
     */
    refreshGraphics;
    async featureSelectionChange() {
        if (this.open) {
            await this._closeEdit(false);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._initModules();
        await this._getTranslations();
    }
    /**
     * Special handeling when used with layer-table.
     * This allows us to only fetch graphics when the modal is opened rather than with every render of the layer-table.
     *
     * @returns Promise when complete
     */
    async componentWillRender() {
        if (this.graphics?.length > 0 && this.graphics[0]?.layer) {
            this._layer = this.graphics[0].layer;
            if (this._layerEditHandle) {
                this._layerEditHandle.remove();
            }
            // #896 Editing on sybtype group layer is failing in Manager
            const layer = this._layer.type === "subtype-sublayer" ? this._layer.parent : this._layer;
            this._layerEditHandle = layer.on("edits", () => {
                this.editsComplete.emit();
            });
        }
    }
    /**
     * Renders the component.
     */
    render() {
        // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
        // when you use MULTI edit mode...is fine in SINGLE
        const editDisabled = this.graphics?.length > 0 && this.graphics[0] ?
            !this.graphics[0].layer.editingEnabled : true;
        const tableNodeClass = this._editorLoading ? "display-none" : "position-absolute";
        const loadingClass = this._editorLoading ? "" : "display-none";
        return (h(Host, { key: '0c80fd21a565f06e1bb4160917a68e94721c5ba3' }, h("div", { key: '15d84955ef97b7d53666387a1b0502db49ce15d5', class: "position-absolute" }, editDisabled ? (h("calcite-notice", { kind: "warning", open: true, slot: "content-top", width: "full" }, h("div", { slot: "message" }, this._translations.enableEditing))) : undefined, h("div", { key: '23aad0cf6dd150a9adb736fa36a923ec7f7ba7b1', class: "position-absolute" }, h("div", { key: '835e615067d94f3704691ba4bc76f75ae622851d', class: tableNodeClass, id: "feature-form", ref: (el) => this._editContainer = el }), h("calcite-loader", { key: '2c0e844bb6ae625c760577bd7fb81be14a3e02e3', class: loadingClass, label: "", scale: "s" })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     */
    async _initModules() {
        const [Editor, reactiveUtils] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Init the Editor widget so we can display the popup content
     */
    async _initEditorWidget() {
        if (this.mapView && this.graphics && this.graphics.length > 0 && this.graphics[0]) {
            if (this._editor) {
                this._editor.destroy();
            }
            const container = document.createElement("div");
            const layers = await getAllLayers(this.mapView);
            const layerInfos = layers.map(layer => {
                return {
                    layer,
                    geometryUpdatesEnabled: this.enableEditGeometry
                };
            });
            this._editor = new this.Editor({
                allowedWorkflows: "update",
                view: this.mapView,
                layerInfos,
                visibleElements: {
                    snappingControls: false
                },
                container
            });
            if (this._attachmentHandle && this._activeWorkflowHandle) {
                this._attachmentHandle.remove();
                this._activeWorkflowHandle.remove();
            }
            this._attachmentHandle = this.reactiveUtils.when(() => this._editor.viewModel.state === "adding-attachment" ||
                this._editor.viewModel.state === "editing-attachment" ||
                this._editor.viewModel.state === "creating-features", () => {
                this._shouldClose = false;
            });
            this._activeWorkflowHandle = this.reactiveUtils.watch(() => this._editor.viewModel.activeWorkflow?.activeWorkflow, (activeWorkflow) => {
                console.log(`activeWorkflow: ${activeWorkflow}`);
                if (activeWorkflow?.type === "update-table-record" || activeWorkflow?.type === "create-features") {
                    this._shouldClose = false;
                }
                // Handle back click and when feature is de-selected from the table
                // this ensures that we are not shown the Editors "Select" workflow step
                if ((!activeWorkflow?.type && !activeWorkflow?.hasPendingEdits && !this._editor.activeWorkflow) || !this._editor?.activeWorkflow?.started) {
                    this.open = false;
                }
            });
            // had issues with destroy before adding like this
            this._editContainer.appendChild(container);
        }
    }
    /**
     * Close the edit widget
     */
    async _closeEdit(destroyOnClose) {
        console.log(`_closeEdit`);
        this._shouldClose = true;
        if (destroyOnClose && this._editor?.activeWorkflow) {
            if (this._editor.activeWorkflow?.activeWorkflow?.hasPendingEdits) {
                await this._editor.activeWorkflow.reset();
                await this._editor.cancelWorkflow();
            }
            this._editor.destroy();
        }
        else {
            if (this.graphicIndex > -1 && this.graphics?.length > 0) {
                this.refreshGraphics.emit(this.graphics);
            }
        }
        this._shouldClose = false;
        this.closeEdit.emit();
    }
    /**
     * Start the update workflow for the editor widget
     */
    async _startUpdate() {
        console.log(`_startUpdate`);
        await this._editor.startUpdateWorkflowAtFeatureEdit(this.graphics[this.graphicIndex]);
        this._shouldClose = true;
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "open": ["openWatchHandler"]
    }; }
};
EditCard.style = EditCardStyle0;

const infoCardCss = ":host{display:block;--calcite-label-margin-bottom:0}.padding-1-2{padding:0.5rem}.display-none{display:none !important}.display-flex{display:flex}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}.feature-node{position:relative !important}.feature-node .esri-features__footer{display:none !important}.button-container{justify-content:center;align-items:center}.top-border{border-top:1px solid var(--calcite-color-border-1)}.width-100{width:100%}.esri-features__container{padding:0.5rem !important;background-color:var(--calcite-color-foreground-1) !important;height:100% !important}.overflow-hidden{overflow:hidden}.height-40{height:40px}.end-border{border-inline-end:1px solid var(--calcite-color-border-1)}.font-bold{font-weight:bold}.visibility-hidden{visibility:hidden;height:0px}.padding-inline-start-1{padding-inline-start:1rem}.border-width-0{border-width:0px}.pagination-action{position:relative;left:3px}.pagination-count{color:var(--calcite-color-brand);border-bottom:1px solid var(--calcite-color-brand);font-weight:bold}";
const InfoCardStyle0 = infoCardCss;

const InfoCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.popupClosed = createEvent(this, "popupClosed", 7);
        this.selectionChanged = createEvent(this, "selectionChanged", 7);
        this.enableEditGeometry = false;
        this.graphics = undefined;
        this.isLoading = false;
        this.isMobile = undefined;
        this.mapView = undefined;
        this.allowEditing = true;
        this.highlightEnabled = true;
        this.paginationEnabled = true;
        this.position = 'absolute';
        this._alertOpen = false;
        this._count = "";
        this._editRecordOpen = false;
        this._mobileTitle = "";
        this._showListView = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
     * used for module import
     */
    Features;
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    _editEnabled;
    /**
     * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
     * used for widget instance
     */
    _features;
    /**
     * esri/widgets/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    _layer;
    /**
     * IPopupUtils: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    _popupUtils;
    /**
     * string: unique id for the features node
     */
    _featuresNodeId = 'features-node' + new Date().getMilliseconds().toString();
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the graphic and update the feature widget
     */
    async graphicsWatchHandler() {
        await this.setGraphics();
    }
    /**
     * Watch for changes to the isMobile prop then init the Features widget
     * We need to know if the title should be displayed by the widget (non mobile)
     * or by us (mobile)
     */
    async isMobileWatchHandler() {
        await this._initFeaturesWidget();
    }
    /**
     * Watch for changes to the mapView and re-init the Feature widget
     */
    async mapViewWatchHandler() {
        return await this._initFeaturesWidget();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Get the current selected feature from the Features widget
     *
     * @returns Promise resolving with the current feature
     */
    async getSelectedFeature() {
        return this._features.selectedFeature;
    }
    /**
     * Refresh the feature info
     * @returns Promise when complete
     */
    async refresh() {
        await this.setGraphics();
    }
    /**
     * Go to the previous feature in the features widget
     */
    async back() {
        this._features.previous();
        this._count = this._getCount();
    }
    /**
     * Go to the next feature in the features widget
     */
    async next() {
        this._features.next();
        this._count = this._getCount();
    }
    /**
     * Toggle the visibility of the features list view
     */
    async toggleListView() {
        this._showListView = !this._showListView;
        const i = this._features.selectedFeatureIndex;
        this._features.open({
            features: this.graphics,
            featureMenuOpen: this._showListView
        });
        this._features.selectedFeatureIndex = i;
    }
    /**
     * update the current graphics to the features widget
     */
    async updateCurrentGraphic(selectedGraphic) {
        this._features.selectedFeatureWidget.graphic = selectedGraphic;
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the popup is closed
     */
    popupClosed;
    /**
     * Emitted on demand when the selected index changes
     */
    selectionChanged;
    /**
     * Respond to and close the edit record display
     *
     * @returns a promise when the operation has completed
     */
    async closeEdit() {
        this._editRecordOpen = false;
    }
    /**
     * Reset key properties when the layer selection changes
     */
    async layerSelectionChange() {
        this._showListView = false;
        if (this._features?.viewModel) {
            this._features.viewModel.featureMenuOpen = false;
            this._features.close();
        }
    }
    /**
     * Refresh the info-card graphics
     */
    async refreshGraphics(evt) {
        this.graphics = [...evt.detail];
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._initModules();
        await this._getTranslations();
        this._popupUtils = new PopupUtils();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     * @returns Promise when complete
     */
    async componentDidLoad() {
        if (this.graphics?.length > 0) {
            await this.setGraphics();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const loadingClass = this.isLoading ? "" : "display-none";
        const featureNodeClass = this.isLoading || this._editRecordOpen ? "visibility-hidden" : "position-absolute";
        const editClass = !this.isLoading && this._editRecordOpen ? "position-absolute" : "display-none";
        const editButtonClass = (!this.isLoading && this._editRecordOpen) || this._showListView ? "display-none" : "";
        const nextBackDisabled = this._features?.features?.length < 2;
        const nextBackClass = this.isMobile ? "display-none" : "";
        const id = this._features?.selectedFeature?.getObjectId();
        const ids = parseInt(id?.toString(), 10) > -1 ? [id] : [];
        const deleteEnabled = this._layer?.editingEnabled && this._layer?.capabilities?.operations?.supportsDelete;
        return (h(Host, { key: 'e200fd8d903d1c3295247a45f352ae62394501d5' }, h("calcite-shell", { key: '0b467ed0b480944660ef2194b302070d56cb70e4', style: { position: this.position } }, this._getHeader(), h("calcite-loader", { key: 'cf6172f533f67274b04ac61af75f44ffe62cbc9e', class: loadingClass, label: this._translations.fetchingData }), h("div", { key: '06f3e0c61e14fe73c0fadd58c3cf2c7c03efff6d', class: "esri-widget feature-node " + featureNodeClass, id: this._featuresNodeId }), h("div", { key: '0f964afa075abbd27db827f90d189b9bc2a7c9d4', class: `${editButtonClass} width-100`, slot: "footer" }, this.allowEditing &&
            h("div", { key: 'd518934d172425ecb46e6b28ea683427d8982382', class: "display-flex top-border padding-1-2" }, h("calcite-button", { key: '4d4f3583b6448e33e3d3ad1aba8c9178f71d75b8', appearance: "solid", id: "solutions-edit", onClick: () => this._openEditRecord(), width: "full" }, this._translations.edit), this.isMobile && deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-100", id: "solutions-delete", ids: ids, layer: this._layer, onEditsComplete: () => this._closePopup() })) : undefined, h("calcite-tooltip", { key: '5358ba4079f1906d23b6df5b1facb84eec9692d3', placement: "bottom", "reference-element": "solutions-edit" }, h("span", { key: '8466cfb97ce12e46a06ed665afe974377911e101' }, this._translations.edit)), this.isMobile ? (h("calcite-tooltip", { placement: "bottom", "reference-element": "solutions-delete" }, h("span", null, this._translations.delete))) : undefined), this.paginationEnabled && !nextBackDisabled && h("div", { key: '61c551cc2b0c0a2981daa9bf67c7e13318508ca6', class: `display-flex padding-1-2 button-container top-border ${nextBackClass}` }, h("div", { key: '379dc6697743caedf8fdbea16423b83e9e823a5b' }, h("calcite-button", { key: '616a52367d2f56db0104ce279951a81fcf60a376', appearance: 'transparent', disabled: nextBackDisabled, iconFlipRtl: "both", iconStart: "chevron-left", id: "solutions-back", onClick: () => this._back(), width: "full" }), h("calcite-tooltip", { key: 'f7f83e145c25591de025650fd358ca6200c4b6c5', placement: "top", "reference-element": "solutions-back" }, h("span", { key: '8afbde57b91ee8597de237db87efda7eabc10d69' }, this._translations.back))), h("calcite-action", { key: '23344d4abac515d089b8770d63181a989971aa33', class: 'pagination-action', iconFlipRtl: true, onClick: () => this._toggleListView(), scale: "s", text: "", textEnabled: true }, h("span", { key: 'a4c784c5a2c7dfeb9442a58f86961a3242f55055', class: "pagination-count" }, this._count)), h("div", { key: '75e33452a93e9a77f30505957e87b8758ab8d2dd' }, h("calcite-button", { key: '0283a96c401e1929588e28d6ec014eb28b93d1f1', appearance: "transparent", disabled: nextBackDisabled, iconFlipRtl: "both", iconStart: "chevron-right", id: "solutions-next", onClick: () => this._next(), width: "full" }), h("calcite-tooltip", { key: '658a26b1bca471b96799cb81ee941f0556619dc9', placement: "top", "reference-element": "solutions-next" }, h("span", { key: '9892d4ee61a1b5656711bb0a188282d9b46bd3f9' }, this._translations.next))))), h("edit-card", { key: '541268c24631ab526bf1b65313d39f3ca606cb6d', class: editClass, enableEditGeometry: this.enableEditGeometry, graphicIndex: this._features?.selectedFeatureIndex, graphics: this.graphics, mapView: this.mapView, open: this._editRecordOpen }), h("calcite-alert", { key: '1cdff00f5d7e72b5db220750d290593a1baf68c4', icon: "layer-broken", kind: "warning", label: "", onCalciteAlertClose: () => this._alertClosed(), open: this._alertOpen, placement: "top" }, h("div", { key: 'bb250c5906f0e998a794b5c02c22f9643fab16a9', slot: "title" }, this._translations.editDisabled), h("div", { key: 'd330d1ce74473fc76630d2607ab3ca2584aabbd7', slot: "message" }, this._translations.enableEditing)))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [Features, reactiveUtils] = await loadModules([
            "esri/widgets/Features",
            "esri/core/reactiveUtils"
        ]);
        this.Features = Features;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Initializes the features widget if not created and updates the feature widget and other required states
     *
     * @protected
     */
    async setGraphics() {
        if (!this._features) {
            await this._initFeaturesWidget();
        }
        if (this.graphics.length > 0) {
            this._layer = this.graphics[0]?.layer;
            this._editEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsUpdate;
            this._mobileTitle = await this._popupUtils.getPopupTitle(this.graphics[0], this.mapView.map);
            this._features.open({
                features: this.graphics
            });
        }
        else {
            this._features.clear();
            this._features.close();
        }
        this._count = this._getCount();
    }
    /**
     * Init the Feature widget so we can display the popup content
     *
     * @returns a promise when the operation has completed
     *
     * @protected
     */
    async _initFeaturesWidget() {
        return this.isMobile !== undefined ? await this.mapView?.when(() => {
            if (!this._features) {
                this._features = new this.Features({
                    view: this.mapView,
                    container: this._featuresNodeId,
                    visibleElements: {
                        actionBar: false,
                        closeButton: false,
                        heading: !this.isMobile
                    }
                });
                this._features.viewModel.highlightEnabled = this.highlightEnabled;
                this.reactiveUtils.watch(() => this._features.viewModel.featureMenuOpen, (isOpen) => {
                    this._count = this._getCount();
                    if (!isOpen) {
                        this._showListView = isOpen;
                    }
                });
                this.reactiveUtils.watch(() => this._features.selectedFeatureIndex, (i) => {
                    if (i > -1) {
                        this.selectionChanged.emit({ selectedFeature: [this._features.selectedFeature], selectedFeatureIndex: this._features.selectedFeatureIndex });
                    }
                });
            }
            else {
                this._features.view = this.mapView;
                this._features.visibleElements.actionBar = false;
                this._features.visibleElements.closeButton = false;
                this._features.visibleElements.heading = !this.isMobile;
            }
        }) : Promise.resolve();
    }
    /**
     * Get the mobile header
     *
     * @returns the header node to display when in mobile mode
     *
     * @protected
     */
    _getHeader() {
        return this.isMobile && !this._editRecordOpen ? (h("calcite-panel", { class: "border-width-0", slot: "header" }, h("calcite-action", { class: "end-border", icon: "chevron-left", iconFlipRtl: true, onClick: () => this._closePopup(), scale: "s", slot: "header-actions-start", text: "" }), h("span", { class: "font-bold", slot: "header-content" }, this._mobileTitle))) : undefined;
    }
    /**
     * Close the popup and emit the selected features
     */
    _closePopup() {
        this.popupClosed.emit();
    }
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    _alertClosed() {
        this._alertOpen = false;
    }
    /**
     * Open the edit record
     */
    _openEditRecord() {
        if (this._editEnabled) {
            this._editRecordOpen = true;
        }
        else {
            this._alertOpen = true;
        }
    }
    /**
     * Go to the previous feature in the features widget
     */
    _back() {
        this._features.previous();
        this._count = this._getCount();
    }
    /**
     * Go to the next feature in the features widget
     */
    _next() {
        this._features.next();
        this._count = this._getCount();
    }
    /**
     * Get the current index of total string
     *
     * @returns the index of total string
     */
    _getCount() {
        const index = (this._features?.viewModel.selectedFeatureIndex + 1).toString();
        const total = this._features?.features?.length.toString();
        return this._translations.indexOfTotal
            .replace("{{index}}", index)
            .replace("{{total}}", total);
    }
    /**
     * Toggle the visibility of the features list view
     */
    _toggleListView() {
        this._showListView = !this._showListView;
        const i = this._features.selectedFeatureIndex;
        this._features.open({
            features: this.graphics,
            featureMenuOpen: this._showListView
        });
        this._features.selectedFeatureIndex = i;
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
};
InfoCard.style = InfoCardStyle0;

export { Alert as calcite_alert, FlowItem as calcite_flow_item, CreateFeature as create_feature, EditCard as edit_card, InfoCard as info_card };
