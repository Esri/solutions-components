/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { u as slotChangeHasAssignedElement, t as toAriaBoolean, g as getSlotted, x as setRequestedIcon } from './dom-38c6f027.js';
import { g as getIconScale } from './component-edd2c3cd.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-37e7fbd6.js';
import { N as NumberStringFormat, c as connectLocalized, d as disconnectLocalized } from './locale-904407bf.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent-9f90f493.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n-436fb2b1.js';
import { K as KindIcons } from './resources-88a48c5c.js';
import { g as getLocaleComponentStrings, l as loadModules } from './locale-bcbea4ef.js';
import { a as getAllLayers } from './mapViewUtils-20504620.js';
import { P as PopupUtils } from './popupUtils-af124b47.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';
import './key-c83d835f.js';
import './observers-d04d1da9.js';
import './esri-loader-1b324844.js';
import './_commonjsHelpers-0f74c230.js';
import './interfaces-586e863c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
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
    containerQueued: "container--queued",
    containerTop: "container--top",
    containerTopEnd: "container--top-end",
    containerTopStart: "container--top-start",
    content: "content",
    contentContainer: "content-container",
    dismissProgress: "dismiss-progress",
    footer: "footer",
    icon: "icon",
    containerSlottedInShell: "container--slotted-in-shell",
    queueCount: "queue-count",
    queueCountActive: "queue-count--active",
    textContainer: "text-container",
};

const alertCss = ":host{--calcite-alert-edge-distance:2rem;--calcite-alert-dismiss-progress-background:var(--calcite-color-transparent-tint);display:block}.container{pointer-events:none;position:fixed;z-index:var(--calcite-z-index-toast);margin-inline:auto;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:-moz-min-content;min-inline-size:min-content;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);text-align:start;opacity:0;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-radius:var(--calcite-border-radius);border-block-start:0 solid transparent;border-inline:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3);inline-size:var(--calcite-alert-width);max-inline-size:calc(100% - var(--calcite-alert-edge-distance) * 2);transition:var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out}.container--bottom,.container--top{inset-inline-end:0;inset-inline-start:0}.container[class*=bottom]{transform:translate3d(0, var(--calcite-alert-edge-distance), 0);inset-block-end:var(--calcite-alert-edge-distance)}.container[class*=top]{transform:translate3d(0, calc(-1 * var(--calcite-alert-edge-distance)), 0);inset-block-start:var(--calcite-alert-edge-distance)}.container[class*=start]{inset-inline-start:var(--calcite-alert-edge-distance);inset-inline-end:auto}.container[class*=end]{inset-inline-end:var(--calcite-alert-edge-distance);inset-inline-start:auto}.icon{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0px;margin-block:auto;margin-inline-end:auto;padding-inline-start:var(--calcite-alert-spacing-token-large)}.close{display:flex;cursor:pointer;align-items:center;justify-content:flex-end;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline:2px solid transparent;outline-offset:2px;-webkit-appearance:none;padding:var(--calcite-alert-spacing-token-large);outline-color:transparent}.close:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:hover,.close:focus{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.close:active{background-color:var(--calcite-color-foreground-3)}.queue-count{visibility:hidden;display:flex;min-inline-size:-moz-min-content;min-inline-size:min-content;cursor:default;align-items:center;justify-content:space-around;align-self:stretch;overflow:hidden;background-color:var(--calcite-color-foreground-1);text-align:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline:0 solid transparent;border-start-end-radius:0}.queue-count--active{visibility:visible;opacity:1}.dismiss-progress{position:absolute;display:block;inline-size:100%;overflow:hidden;inset-inline:0;inset-block-start:-2px;block-size:2px;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.dismiss-progress:after{position:absolute;inset-block-start:0px;display:block;block-size:2px;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);inset-inline-end:0}.actions-end{display:flex;align-self:stretch}.text-container{box-sizing:border-box;display:flex;min-inline-size:0px;flex:1 1 auto;flex-direction:column;overflow-wrap:break-word;padding-block:var(--calcite-alert-spacing-token-small);padding-inline:var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small)}.footer{position:relative;display:flex;inline-size:auto;justify-content:flex-end;align-self:stretch;padding-block-start:1px;block-size:inherit}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.5rem;--calcite-alert-spacing-token-large:0.75rem;--calcite-alert-footer-height:2rem;--calcite-alert-footer-divider-gap:0.125rem}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .queue-count{margin-inline:0.5rem}:host([scale=s]) .container{--calcite-alert-min-height:3.5rem}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem;--calcite-alert-footer-height:3rem;--calcite-alert-footer-divider-gap:0.25rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .queue-count{margin-inline:0.75rem}:host([scale=m]) .container{--calcite-alert-min-height:4.1875rem}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.25rem;--calcite-alert-footer-height:4rem;--calcite-alert-footer-divider-gap:0.5rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){margin-block-end:0.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .queue-count{margin-inline:1rem}:host([scale=l]) .container{--calcite-alert-min-height:5.625rem}:host([open]) .container:not(.container--queued){border-block-start-width:2px;opacity:1;pointer-events:initial}:host([open]) .container:not(.container--queued)[class*=bottom]{transform:translate3d(0, calc(-1 * var(--calcite-alert-edge-distance)), inherit)}:host([open]) .container:not(.container--queued)[class*=top]{transform:translate3d(0, var(--calcite-alert-edge-distance), inherit)}:host([auto-close])>.queue-count{border-inline-end:0 solid transparent}slot[name=title]::slotted(*),*::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){margin:0px;display:inline;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2);margin-inline-end:0.5rem}slot[name=link]::slotted(*),*::slotted([slot=link]){display:inline-flex;color:var(--calcite-color-text-link)}:host([kind=brand]) .container{border-block-start-color:var(--calcite-color-brand)}:host([kind=brand]) .container .icon{color:var(--calcite-color-brand)}:host([kind=info]) .container{border-block-start-color:var(--calcite-color-status-info)}:host([kind=info]) .container .icon{color:var(--calcite-color-status-info)}:host([kind=danger]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([kind=danger]) .container .icon{color:var(--calcite-color-status-danger)}:host([kind=success]) .container{border-block-start-color:var(--calcite-color-status-success)}:host([kind=success]) .container .icon{color:var(--calcite-color-status-success)}:host([kind=warning]) .container{border-block-start-color:var(--calcite-color-status-warning)}:host([kind=warning]) .container .icon{color:var(--calcite-color-status-warning)}:host([auto-close-duration=fast]) .dismiss-progress:after{animation:dismissProgress 6000ms ease-out}:host(:hover[auto-close-duration=fast]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=medium]) .dismiss-progress:after{animation:dismissProgress 10000ms ease-out}:host(:hover[auto-close-duration=medium]) .dismiss-progress:after{animation-play-state:paused}:host([auto-close-duration=slow]) .dismiss-progress:after{animation:dismissProgress 14000ms ease-out}:host(:hover[auto-close-duration=slow]) .dismiss-progress:after{animation-play-state:paused}@keyframes dismissProgress{0%{inline-size:0px;opacity:0.75}100%{inline-size:100%;opacity:1}}.container--slotted-in-shell{position:absolute}:host([hidden]){display:none}[hidden]{display:none}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}";

const Alert = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteAlertBeforeClose = createEvent(this, "calciteAlertBeforeClose", 6);
        this.calciteAlertClose = createEvent(this, "calciteAlertClose", 6);
        this.calciteAlertBeforeOpen = createEvent(this, "calciteAlertBeforeOpen", 6);
        this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 6);
        this.calciteInternalAlertSync = createEvent(this, "calciteInternalAlertSync", 6);
        this.calciteInternalAlertRegister = createEvent(this, "calciteInternalAlertRegister", 6);
        this.autoCloseTimeoutId = null;
        this.totalOpenTime = 0;
        this.totalHoverTime = 0;
        this.openTransitionProp = "opacity";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        /** close and emit calciteInternalAlertSync event with the updated queue payload */
        this.closeAlert = () => {
            this.autoCloseTimeoutId = null;
            this.queued = false;
            this.open = false;
            this.queue = this.queue.filter((el) => el !== this.el);
            this.determineActiveAlert();
            this.calciteInternalAlertSync.emit({ queue: this.queue });
        };
        this.actionsEndSlotChangeHandler = (event) => {
            this.hasEndActions = slotChangeHasAssignedElement(event);
        };
        this.handleMouseOver = () => {
            window.clearTimeout(this.autoCloseTimeoutId);
            this.totalOpenTime = Date.now() - this.initialOpenTime;
            this.lastMouseOverBegin = Date.now();
        };
        this.handleMouseLeave = () => {
            const hoverDuration = Date.now() - this.lastMouseOverBegin;
            const timeRemaining = DURATIONS[this.autoCloseDuration] - this.totalOpenTime + this.totalHoverTime;
            this.totalHoverTime = this.totalHoverTime ? hoverDuration + this.totalHoverTime : hoverDuration;
            this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), timeRemaining);
        };
        this.open = false;
        this.autoClose = false;
        this.autoCloseDuration = "medium";
        this.kind = "brand";
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.numberingSystem = undefined;
        this.placement = "bottom";
        this.scale = "m";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.slottedInShell = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.numberStringFormatter = new NumberStringFormat();
        this.hasEndActions = false;
        this.queue = [];
        this.queueLength = 0;
        this.queued = false;
    }
    openHandler() {
        onToggleOpenCloseComponent(this);
        if (this.open && !this.queued) {
            this.calciteInternalAlertRegister.emit();
        }
        if (!this.open) {
            this.queue = this.queue.filter((el) => el !== this.el);
            this.calciteInternalAlertSync.emit({ queue: this.queue });
        }
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    updateDuration() {
        if (this.autoClose && this.autoCloseTimeoutId) {
            window.clearTimeout(this.autoCloseTimeoutId);
            this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoCloseDuration]);
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
        if (open && !this.queued) {
            this.calciteInternalAlertRegister.emit();
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
        window.dispatchEvent(new CustomEvent("calciteInternalAlertUnregister", {
            detail: { alert: this.el },
        }));
        window.clearTimeout(this.autoCloseTimeoutId);
        window.clearTimeout(this.queueTimeout);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.slottedInShell = false;
    }
    render() {
        const { open, autoClose, label, placement, queued } = this;
        const role = autoClose ? "alert" : "alertdialog";
        const hidden = !open;
        const effectiveIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
        const hasQueuedAlerts = this.queueLength > 1;
        return (h(Host, { "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "calcite-hydrated-hidden": hidden, role: role }, h("div", { class: {
                [CSS.container]: true,
                [CSS.containerQueued]: queued,
                [`${CSS.container}--${placement}`]: true,
                [CSS.containerSlottedInShell]: this.slottedInShell,
            }, onPointerEnter: this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null, onPointerLeave: this.autoClose && this.autoCloseTimeoutId ? this.handleMouseLeave : null,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, effectiveIcon && this.renderIcon(effectiveIcon), h("div", { class: CSS.textContainer }, h("slot", { name: SLOTS.title }), h("slot", { name: SLOTS.message }), h("slot", { name: SLOTS.link })), this.renderActionsEnd(), hasQueuedAlerts ? this.renderQueueCount() : null, this.renderCloseButton(), open && !queued && autoClose ? h("div", { class: CSS.dismissProgress }) : null)));
    }
    renderCloseButton() {
        return (h("button", { "aria-label": this.messages.close, class: CSS.close, key: "close", onClick: this.closeAlert, type: "button",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.closeButton = el) }, h("calcite-icon", { icon: "x", scale: getIconScale(this.scale) })));
    }
    renderQueueCount() {
        const queueNumber = this.queueLength > 2 ? this.queueLength - 1 : 1;
        const queueText = this.numberStringFormatter.numberFormatter.format(queueNumber);
        return (h("div", { class: {
                [CSS.queueCount]: true,
                [CSS.queueCountActive]: this.queueLength > 1,
            }, key: "queue-count" }, h("calcite-chip", { scale: this.scale, value: queueText }, queueText)));
    }
    renderActionsEnd() {
        return (h("div", { class: CSS.actionsEnd }, h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.actionsEndSlotChangeHandler })));
    }
    renderIcon(icon) {
        return (h("div", { class: CSS.icon }, h("calcite-icon", { flipRtl: this.iconFlipRtl, icon: icon, scale: getIconScale(this.scale) })));
    }
    // when an alert is opened or closed, update queue and determine active alert
    alertSync(event) {
        if (this.queue !== event.detail.queue) {
            this.queue = event.detail.queue;
        }
        this.queueLength = this.queue.length;
        this.determineActiveAlert();
        event.stopPropagation();
    }
    // when an alert is first registered, trigger a queue sync
    alertRegister() {
        if (this.open && !this.queue.includes(this.el)) {
            this.queued = true;
            this.queue.push(this.el);
        }
        this.calciteInternalAlertSync.emit({ queue: this.queue });
        this.determineActiveAlert();
    }
    // Event is dispatched on the window because the element is not in the DOM so bubbling won't occur.
    alertUnregister(event) {
        const queue = this.queue.filter((el) => el !== event.detail.alert);
        this.queue = queue;
        window.dispatchEvent(new CustomEvent("calciteInternalAlertSync", {
            detail: { queue },
        }));
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's "close" button, the first focusable item. */
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
    /** determine which alert is active */
    determineActiveAlert() {
        var _a;
        if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
            this.openAlert();
            if (this.autoClose && !this.autoCloseTimeoutId) {
                this.initialOpenTime = Date.now();
                this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoCloseDuration]);
            }
        }
        else {
            return;
        }
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
    /** remove queued class after animation completes */
    openAlert() {
        window.clearTimeout(this.queueTimeout);
        this.queueTimeout = window.setTimeout(() => (this.queued = false), 300);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "messageOverrides": ["onMessagesChange"],
        "autoCloseDuration": ["updateDuration"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "numberingSystem": ["numberingSystemChange"]
    }; }
};
Alert.style = alertCss;

const deleteButtonCss = ":host{display:block}";

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
        return (h(Host, null, this.buttonType === "button" ? (h("calcite-button", { appearance: "outline", disabled: !this._deleteEndabled, id: "solutions-delete", kind: "danger", onClick: () => this._delete(), width: "full" }, this._translations.deleteCount.replace("{{n}}", this.ids.length.toString()))) : (h("calcite-action", { appearance: "solid", compact: true, disabled: !this._deleteEndabled, id: this.icon, onClick: () => this._delete(), scale: "s", text: this._translations.delete }, h("calcite-button", { appearance: "transparent", iconStart: this.icon, kind: "danger" }, this._translations.delete))), this._deleteMessage()));
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
        var _a, _b, _c, _d;
        this._supportsDelete = ((_a = this.layer) === null || _a === void 0 ? void 0 : _a.editingEnabled) && ((_d = (_c = (_b = this.layer) === null || _b === void 0 ? void 0 : _b.capabilities) === null || _c === void 0 ? void 0 : _c.operations) === null || _d === void 0 ? void 0 : _d.supportsDelete);
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
        return (h("calcite-modal", { "aria-labelledby": "modal-title", kind: "danger", onCalciteModalClose: () => this._deleteClosed(), open: this._confirmDelete }, h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations.deleteFeature), h("div", { slot: "content" }, confirmMessage), h("calcite-button", { appearance: "outline", kind: "danger", onClick: () => this._deleteClosed(), slot: "secondary", width: "full" }, this._translations.cancel), h("calcite-button", { kind: "danger", loading: this._isDeleting, onClick: () => void this._deleteFeatures(), slot: "primary", width: "full" }, this._translations.delete)));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "ids": ["idsWatchHandler"],
        "layer": ["layerWatchHandler"]
    }; }
};
DeleteButton.style = deleteButtonCss;

const editCardCss = ":host{display:block}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:var(--calcite-font-weight-bold)}.font-500{font-weight:var(--calcite-font-weight-medium)}.font-italic{font-style:italic}#feature-form{--calcite-color-background:none;padding-top:0px}.padding-sides-bottom-1{padding:0 1rem 1rem 1rem}.position-relative{position:relative}.esri-editor__prompt--danger{position:relative !important;width:100% !important;background-color:var(--calcite-color-foreground-1) !important}.esri-feature__content-node{background-color:var(--calcite-color-foreground-1) !important}.esri-editor__panel-toolbar{display:none !important}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}";

const EditCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.closeEdit = createEvent(this, "closeEdit", 7);
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.refreshGraphics = createEvent(this, "refreshGraphics", 7);
        /**
         * boolean: When true the Editor widget should be closed
         * Without this logic we are taken to the Editors "Select" workflow step
         */
        this._shouldClose = false;
        this.graphics = undefined;
        this.mapView = undefined;
        this.open = false;
        this.graphicIndex = 0;
        this._editorLoading = false;
        this._translations = undefined;
    }
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
        var _a;
        if (v && ((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.graphicIndex > -1) {
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
        var _a, _b;
        if (((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = this.graphics[0]) === null || _b === void 0 ? void 0 : _b.layer)) {
            this._layer = this.graphics[0].layer;
            if (this._layerEditHandle) {
                this._layerEditHandle.remove();
            }
            this._layerEditHandle = this._layer.on("edits", () => {
                this.editsComplete.emit();
            });
        }
    }
    /**
     * Renders the component.
     */
    render() {
        var _a;
        // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
        // when you use MULTI edit mode...is fine in SINGLE
        const editDisabled = ((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.graphics[0] ?
            !this.graphics[0].layer.editingEnabled : true;
        const tableNodeClass = this._editorLoading ? "display-none" : "position-absolute";
        const loadingClass = this._editorLoading ? "" : "display-none";
        return (h(Host, null, h("div", { class: "position-absolute" }, editDisabled ? (h("calcite-notice", { kind: "warning", open: true, slot: "content-top", width: "full" }, h("div", { slot: "message" }, this._translations.enableEditing))) : undefined, h("div", { class: "position-absolute" }, h("div", { class: tableNodeClass, id: "feature-form", ref: (el) => this._editContainer = el }), h("calcite-loader", { class: loadingClass, label: "", scale: "s" })))));
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
                    geometryUpdatesEnabled: false
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
            this._activeWorkflowHandle = this.reactiveUtils.watch(() => { var _a; return (_a = this._editor.viewModel.activeWorkflow) === null || _a === void 0 ? void 0 : _a.activeWorkflow; }, (activeWorkflow) => {
                var _a, _b;
                if ((activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.type) === "update-table-record" || (activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.type) === "create-features") {
                    this._shouldClose = false;
                }
                // Handle back click and when feature is de-selected from the table
                // this ensures that we are not shown the Editors "Select" workflow step
                if ((!(activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.type) && !(activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.hasPendingEdits) && !this._editor.activeWorkflow) || !((_b = (_a = this._editor) === null || _a === void 0 ? void 0 : _a.activeWorkflow) === null || _b === void 0 ? void 0 : _b.started)) {
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
        var _a, _b, _c, _d;
        this._shouldClose = true;
        if (destroyOnClose && ((_a = this._editor) === null || _a === void 0 ? void 0 : _a.activeWorkflow)) {
            if ((_c = (_b = this._editor.activeWorkflow) === null || _b === void 0 ? void 0 : _b.activeWorkflow) === null || _c === void 0 ? void 0 : _c.hasPendingEdits) {
                await this._editor.activeWorkflow.reset();
                await this._editor.cancelWorkflow();
            }
            this._editor.destroy();
        }
        else {
            if (this.graphicIndex > -1 && ((_d = this.graphics) === null || _d === void 0 ? void 0 : _d.length) > 0) {
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "open": ["openWatchHandler"]
    }; }
};
EditCard.style = editCardCss;

const infoCardCss = ":host{display:block;--calcite-label-margin-bottom:0}.padding-1-2{padding:0.5rem}.display-none{display:none !important}.display-flex{display:flex}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}.esri-features__footer{display:none !important}.button-container{justify-content:space-between;align-items:center}.top-border{border-top:1px solid var(--calcite-color-border-1)}.min-width-100{min-width:100px}.width-100{width:100%}.esri-features__container{padding:0.5rem !important;background-color:var(--calcite-color-foreground-1) !important;height:100% !important}.overflow-hidden{overflow:hidden}.height-40{height:40px}.end-border{border-inline-end:1px solid var(--calcite-color-border-1)}.font-bold{font-weight:bold}.visibility-hidden{visibility:hidden;height:0px}.padding-inline-start-1{padding-inline-start:1rem}.border-width-0{border-width:0px}";

const InfoCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.popupClosed = createEvent(this, "popupClosed", 7);
        this.selectionChanged = createEvent(this, "selectionChanged", 7);
        this.graphics = undefined;
        this.isLoading = false;
        this.isMobile = undefined;
        this.mapView = undefined;
        this.zoomAndScrollToSelected = undefined;
        this.allowEditing = true;
        this.highlightEnabled = true;
        this._alertOpen = false;
        this._count = "";
        this._editRecordOpen = false;
        this._mobileTitle = "";
        this._showListView = false;
        this._translations = undefined;
    }
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
        var _a;
        this._showListView = false;
        if ((_a = this._features) === null || _a === void 0 ? void 0 : _a.viewModel) {
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
        var _a;
        if (((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            await this.setGraphics();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const loadingClass = this.isLoading ? "" : "display-none";
        const featureNodeClass = this.isLoading || this._editRecordOpen ? "visibility-hidden" : "position-absolute";
        const editClass = !this.isLoading && this._editRecordOpen ? "position-absolute" : "display-none";
        const editButtonClass = (!this.isLoading && this._editRecordOpen) || this._showListView ? "display-none" : "";
        const nextBackDisabled = ((_b = (_a = this._features) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.length) < 2;
        const nextBackClass = this.isMobile ? "display-none" : "";
        const id = (_d = (_c = this._features) === null || _c === void 0 ? void 0 : _c.selectedFeature) === null || _d === void 0 ? void 0 : _d.getObjectId();
        const ids = parseInt(id === null || id === void 0 ? void 0 : id.toString(), 10) > -1 ? [id] : [];
        const deleteEnabled = ((_e = this._layer) === null || _e === void 0 ? void 0 : _e.editingEnabled) && ((_h = (_g = (_f = this._layer) === null || _f === void 0 ? void 0 : _f.capabilities) === null || _g === void 0 ? void 0 : _g.operations) === null || _h === void 0 ? void 0 : _h.supportsDelete);
        return (h(Host, null, h("calcite-shell", null, this._getHeader(), h("calcite-loader", { class: loadingClass, label: this._translations.fetchingData }), h("div", { class: "esri-widget " + featureNodeClass, id: "features-node" }), h("div", { class: `${editButtonClass} width-100`, slot: "footer" }, this.allowEditing &&
            h("div", { class: "display-flex top-border padding-1-2" }, h("calcite-button", { appearance: "solid", id: "solutions-edit", onClick: () => this._openEditRecord(), width: "full" }, this._translations.edit), this.isMobile && deleteEnabled ? (h("delete-button", { class: "padding-inline-start-1 width-100", id: "solutions-delete", ids: ids, layer: this._layer, onEditsComplete: () => this._closePopup() })) : undefined, h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": "solutions-edit" }, h("span", null, this._translations.edit)), this.isMobile ? (h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": "solutions-delete" }, h("span", null, this._translations.delete))) : undefined), !nextBackDisabled && h("div", { class: `display-flex padding-1-2 button-container top-border ${nextBackClass}` }, h("div", { class: "min-width-100" }, h("calcite-button", { appearance: "outline", disabled: nextBackDisabled, id: "solutions-back", onClick: () => this._back(), width: "full" }, this._translations.back), h("calcite-tooltip", { label: "", placement: "top", "reference-element": "solutions-back" }, h("span", null, this._translations.back))), h("div", null, h("calcite-action", { icon: "list", onClick: () => this._toggleListView(), scale: "s", text: this._count, textEnabled: true })), h("div", { class: "min-width-100" }, h("calcite-button", { appearance: "outline", disabled: nextBackDisabled, id: "solutions-next", onClick: () => this._next(), width: "full" }, this._translations.next), h("calcite-tooltip", { label: "", placement: "top", "reference-element": "solutions-next" }, h("span", null, this._translations.next))))), h("edit-card", { class: editClass, graphicIndex: (_j = this._features) === null || _j === void 0 ? void 0 : _j.selectedFeatureIndex, graphics: this.graphics, mapView: this.mapView, open: this._editRecordOpen }), h("calcite-alert", { icon: "layer-broken", kind: "warning", label: "", onCalciteAlertClose: () => this._alertClosed(), open: this._alertOpen, placement: "top" }, h("div", { slot: "title" }, this._translations.editDisabled), h("div", { slot: "message" }, this._translations.enableEditing)))));
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
        var _a;
        if (!this._features) {
            await this._initFeaturesWidget();
        }
        if (this.graphics.length > 0) {
            this._layer = (_a = this.graphics[0]) === null || _a === void 0 ? void 0 : _a.layer;
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
        var _a;
        return this.isMobile !== undefined ? await ((_a = this.mapView) === null || _a === void 0 ? void 0 : _a.when(() => {
            if (!this._features) {
                this._features = new this.Features({
                    view: this.mapView,
                    container: "features-node",
                    visibleElements: {
                        actionBar: false,
                        closeButton: false,
                        heading: !this.isMobile
                    }
                });
                this._features.viewModel.highlightEnabled = this.highlightEnabled;
                this.reactiveUtils.watch(() => this._features.viewModel.featureMenuOpen, (isOpen) => {
                    if (!isOpen) {
                        this._showListView = isOpen;
                    }
                });
                if (this.zoomAndScrollToSelected) {
                    this.reactiveUtils.watch(() => this._features.selectedFeatureIndex, (i) => {
                        if (i > -1) {
                            this.selectionChanged.emit([this._features.selectedFeature]);
                        }
                    });
                }
            }
            else {
                this._features.view = this.mapView;
                this._features.visibleElements.actionBar = false;
                this._features.visibleElements.closeButton = false;
                this._features.visibleElements.heading = !this.isMobile;
            }
        })) : Promise.resolve();
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
        var _a, _b, _c;
        const index = (((_a = this._features) === null || _a === void 0 ? void 0 : _a.viewModel.selectedFeatureIndex) + 1).toString();
        const total = (_c = (_b = this._features) === null || _b === void 0 ? void 0 : _b.features) === null || _c === void 0 ? void 0 : _c.length.toString();
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "isMobile": ["isMobileWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
};
InfoCard.style = infoCardCss;

export { Alert as calcite_alert, DeleteButton as delete_button, EditCard as edit_card, InfoCard as info_card };
