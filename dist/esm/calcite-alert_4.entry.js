/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { s as slotChangeHasAssignedElement, t as toAriaBoolean, g as getSlotted, z as setRequestedIcon } from './dom-b5c50286.js';
import { g as getIconScale } from './component-c2c32481.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-73f289b6.js';
import { N as NumberStringFormat, c as connectLocalized, d as disconnectLocalized } from './locale-21e40b0c.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent-7b8f2e24.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n-2fb3af62.js';
import { K as KindIcons } from './resources-5ba50a1d.js';
import { g as getLocaleComponentStrings, l as loadModules } from './locale-b1d53fb1.js';
import { a as getAllLayers } from './mapViewUtils-3e3d33ea.js';
import { P as PopupUtils } from './popupUtils-349a26e6.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';
import './observers-e2484555.js';
import './esri-loader-c6842c6b.js';
import './_commonjsHelpers-089957fe.js';
import './interfaces-659e3836.js';
import './downloadUtils-74bc82ae.js';
import './solution-resource-966f8511.js';
import './restHelpersGet-788d7f7b.js';

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

const deleteButtonCss = ":host{display:block}.delete-modal{position:fixed}";
const DeleteButtonStyle0 = deleteButtonCss;

const DeleteButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.buttonType = "button";
        this.disabled = false;
        this.icon = undefined;
        this.ids = [];
        this.layer = undefined;
        this._confirmDelete = false;
        this._deleteEndabled = false;
        this._isDeleting = false;
        this._supportsDelete = undefined;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async idsWatchHandler() {
        this._setDeleteEnabled();
    }
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async layerWatchHandler() {
        this._setDeleteEnabled();
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
     * Emitted on demand when features have been deleted
     */
    editsComplete;
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
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '1ff43b4d224c4cf7bbfc0656e9605cd4ac4c971a' }, this.buttonType === "button" ? (h("calcite-button", { appearance: "outline", disabled: !this._deleteEndabled, id: "solutions-delete", kind: "danger", onClick: () => this._delete(), width: "full" }, this._translations.deleteCount.replace("{{n}}", this.ids.length.toString()))) : (h("calcite-action", { appearance: "solid", compact: true, disabled: !this._deleteEndabled, id: this.icon, onClick: () => this._delete(), scale: "s", text: this._translations.delete }, h("calcite-button", { appearance: "transparent", iconStart: this.icon, kind: "danger" }, this._translations.delete))), this._deleteMessage()));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        this._setDeleteEnabled();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Verify if the layer supports delete and that we have 1 or more ids
     */
    _setDeleteEnabled() {
        this._supportsDelete = this.layer?.editingEnabled && this.layer?.capabilities?.operations?.supportsDelete;
        this._deleteEndabled = !this.disabled || this._supportsDelete && this.ids.length > 0;
    }
    /**
     * Delete all selected records or shows an alert if the layer does not have editing enabled
     *
     * @returns a promise that will resolve when the operation is complete
     */
    _delete() {
        this._confirmDelete = true;
    }
    /**
     * Show delete confirmation message
     *
     * @returns node to confirm or deny the delete operation
     */
    _deleteMessage() {
        const confirmMessage = this.ids.length === 1 ? this._translations.confirmSingle :
            this._translations.confirmMultiple;
        return (h("calcite-modal", { "aria-labelledby": "modal-title", class: "delete-modal", kind: "danger", onCalciteModalClose: () => this._deleteClosed(), open: this._confirmDelete }, h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations.deleteFeature), h("div", { slot: "content" }, confirmMessage), h("calcite-button", { appearance: "outline", kind: "danger", onClick: () => this._deleteClosed(), slot: "secondary", width: "full" }, this._translations.cancel), h("calcite-button", { kind: "danger", loading: this._isDeleting, onClick: () => void this._deleteFeatures(), slot: "primary", width: "full" }, this._translations.delete)));
    }
    /**
     * Delete the currently selected features
     */
    async _deleteFeatures() {
        this._isDeleting = true;
        const deleteFeatures = this.ids.map((objectId) => {
            return { objectId };
        });
        await this.layer.applyEdits({
            deleteFeatures
        });
        this._isDeleting = false;
        this._deleteClosed();
        this.editsComplete.emit("delete");
    }
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    _deleteClosed() {
        this._confirmDelete = false;
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
        "ids": ["idsWatchHandler"],
        "layer": ["layerWatchHandler"]
    }; }
};
DeleteButton.style = DeleteButtonStyle0;

const editCardCss = ":host{display:block}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:var(--calcite-font-weight-bold)}.font-500{font-weight:var(--calcite-font-weight-medium)}.font-italic{font-style:italic}#feature-form{--calcite-color-background:none;padding-top:0px}.padding-sides-bottom-1{padding:0 1rem 1rem 1rem}.position-relative{position:relative}.esri-editor__prompt--danger{position:relative !important;width:100% !important;background-color:var(--calcite-color-foreground-1) !important}.esri-feature__content-node{background-color:var(--calcite-color-foreground-1) !important}.esri-editor__panel-toolbar{display:none !important}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}";
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
            this._layerEditHandle = this._layer.on("edits", () => {
                console.log("IN _layerEditHandle");
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
        return (h(Host, { key: 'b949a39b8da61165f3e553d74780fff45dcd1119' }, h("div", { key: '114907838c53f09b64006fbe8cbc0089b51a0ea4', class: "position-absolute" }, editDisabled ? (h("calcite-notice", { kind: "warning", open: true, slot: "content-top", width: "full" }, h("div", { slot: "message" }, this._translations.enableEditing))) : undefined, h("div", { key: '946de894a81c649282da42b4ea31d026eeda42e9', class: "position-absolute" }, h("div", { key: 'cc984a05b6ea3990b3cf42ec97dced227fa6525b', class: tableNodeClass, id: "feature-form", ref: (el) => this._editContainer = el }), h("calcite-loader", { key: 'd1839fb5e7c3dcbf06d49a4bde7e724693c5820c', class: loadingClass, label: "", scale: "s" })))));
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
                console.log("IN _attachmentHandle");
                this._shouldClose = false;
            });
            this._activeWorkflowHandle = this.reactiveUtils.watch(() => this._editor.viewModel.activeWorkflow?.activeWorkflow, (activeWorkflow) => {
                console.log("IN _activeWorkflowHandle");
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
        console.log("_closeEdit");
        this._shouldClose = true;
        if (destroyOnClose && this._editor?.activeWorkflow) {
            console.log("_closeEdit destroyOnClose");
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
        console.log("startUpdateWorkflowAtFeatureEdit");
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
        return (h(Host, { key: '8714c3ab52be88e3622888c7984c9ded5759fa17' }, h("calcite-shell", { key: 'f63b166a00794815af852a1260fe7b67784428d4', style: { position: this.position } }, this._getHeader(), h("calcite-loader", { key: 'b937ff64982989f3dec3c94236932698300b0eb6', class: loadingClass, label: this._translations.fetchingData }), h("div", { key: '0f7b914839ab400b1f757eb50cd0ba5f60628336', class: "esri-widget feature-node " + featureNodeClass, id: this._featuresNodeId }), h("div", { key: '9867c94363da7d060bc718e77eab0ed139d4ba7d', class: `${editButtonClass} width-100`, slot: "footer" }, this.allowEditing &&
            h("div", { key: 'a90edcda183289259db99b9255d28d6c31809d40', class: "display-flex top-border padding-1-2" }, h("calcite-button", { key: 'b1bc47ed857efc478c11e1353216bb8925b75885', appearance: "solid", id: "solutions-edit", onClick: () => this._openEditRecord(), width: "full" }, this._translations.edit), this.isMobile && deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-100", id: "solutions-delete", ids: ids, layer: this._layer, onEditsComplete: () => this._closePopup() })) : undefined, h("calcite-tooltip", { key: 'd493735dadf6dd34a767332a1a179716fbfa6384', placement: "bottom", "reference-element": "solutions-edit" }, h("span", { key: '663217b0b2c078aa7ac1b99a891af5380b9521c1' }, this._translations.edit)), this.isMobile ? (h("calcite-tooltip", { placement: "bottom", "reference-element": "solutions-delete" }, h("span", null, this._translations.delete))) : undefined), this.paginationEnabled && !nextBackDisabled && h("div", { key: 'df2249f431b0df3a25c44fb6d54adec903bbe328', class: `display-flex padding-1-2 button-container top-border ${nextBackClass}` }, h("div", { key: '31b82d904e766f938c2c1fc5bd76625921e7fe10' }, h("calcite-button", { key: '49656c590d330796f1d508ef33689f909991a6ec', appearance: 'transparent', disabled: nextBackDisabled, iconStart: "chevron-left", id: "solutions-back", onClick: () => this._back(), width: "full" }), h("calcite-tooltip", { key: 'f5238fdc65fa68152961253d536be38a044aeb76', placement: "top", "reference-element": "solutions-back" }, h("span", { key: '470c4da1cd28940155bdbd30acc8b742d827a891' }, this._translations.back))), h("calcite-action", { key: 'be9e9b4d4dbabe2c11bf13043bfb33cdae093315', class: 'pagination-action', onClick: () => this._toggleListView(), scale: "s", text: "", textEnabled: true }, h("span", { key: 'd7d3313b537691ac131b958475e6547f3659c6ac', class: "pagination-count" }, this._count)), h("div", { key: '0ef506ac483cf51a958e335b16cbe9a764bb497e' }, h("calcite-button", { key: 'f3c1a25fe1a619275f32058d1fa646467e83cca5', appearance: "transparent", disabled: nextBackDisabled, iconStart: "chevron-right", id: "solutions-next", onClick: () => this._next(), width: "full" }), h("calcite-tooltip", { key: 'cddbf1200a3acd465e5ef23f34b5bf26c81ffad5', placement: "top", "reference-element": "solutions-next" }, h("span", { key: '9e9454c303b8f37f12d4ad07b3401d50bd04141d' }, this._translations.next))))), h("edit-card", { key: '3497893bbb59f3a2ace941d3bb1d98b0fa7fac0c', class: editClass, enableEditGeometry: this.enableEditGeometry, graphicIndex: this._features?.selectedFeatureIndex, graphics: this.graphics, mapView: this.mapView, open: this._editRecordOpen }), h("calcite-alert", { key: '4fa290b977bf7c619cc349176bb1e244c554b58d', icon: "layer-broken", kind: "warning", label: "", onCalciteAlertClose: () => this._alertClosed(), open: this._alertOpen, placement: "top" }, h("div", { key: '1e3998afedd33582d33e0c1556a1bcac87902761', slot: "title" }, this._translations.editDisabled), h("div", { key: '489ef148cc4da2a7d7e881d4de9cd6a71ac53809', slot: "message" }, this._translations.enableEditing)))));
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

export { Alert as calcite_alert, DeleteButton as delete_button, EditCard as edit_card, InfoCard as info_card };
