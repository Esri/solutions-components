/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-c2f00d41.js';
import { s as setRequestedIcon, t as toAriaBoolean, a as getSlotted } from './p-83166522.js';
import { S as StatusIcons } from './p-6fe17794.js';
import { c as connectOpenCloseComponent, d as disconnectOpenCloseComponent } from './p-2e9ed892.js';
import { c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter } from './p-9eba5c66.js';
import './p-729708a3.js';
import './p-a80b3880.js';
import './p-73e23995.js';
import './p-9a9955db.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const TEXT = {
  intlClose: "Close"
};
const DURATIONS = {
  slow: 14000,
  medium: 10000,
  fast: 6000
};
const SLOTS = {
  title: "title",
  message: "message",
  link: "link"
};

const alertCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.5rem;--calcite-alert-spacing-token-large:0.75rem}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .alert-queue-count{margin-inline:0.5rem}:host([scale=s]) .container{--calcite-alert-min-height:3.5rem}:host([scale=s]) .alert-close{padding:0.5rem}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .alert-queue-count{margin-inline:0.75rem}:host([scale=m]) .container{--calcite-alert-min-height:4.1875rem}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.25rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){-webkit-margin-after:0.25rem;margin-block-end:0.25rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .alert-queue-count{margin-inline:1rem}:host([scale=l]) .container{--calcite-alert-min-height:5.625rem}:host{--calcite-alert-edge-distance:2rem;display:block}:host .container{pointer-events:none;position:fixed;z-index:500;margin-block:0px;margin-inline:auto;display:flex;align-items:center;justify-content:center;background-color:var(--calcite-ui-foreground-1);opacity:0;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-radius:var(--calcite-border-radius);-webkit-border-before:0px solid transparent;border-block-start:0px solid transparent;border-inline:1px solid var(--calcite-ui-border-3);-webkit-border-after:1px solid var(--calcite-ui-border-3);border-block-end:1px solid var(--calcite-ui-border-3);min-block-size:var(--calcite-alert-min-height);inline-size:var(--calcite-alert-width);max-inline-size:calc(100% - (var(--calcite-alert-edge-distance) * 2 + 2px));max-block-size:0;transition:var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out}:host .container.bottom,:host .container.top{inset-inline-end:0;inset-inline-start:0}:host .container[class*=bottom]{transform:translate3d(0, var(--calcite-alert-edge-distance), 0);inset-block-end:var(--calcite-alert-edge-distance)}:host .container[class*=top]{transform:translate3d(0, calc(-1 * var(--calcite-alert-edge-distance)), 0);inset-block-start:var(--calcite-alert-edge-distance)}:host .container[class*=-start]{inset-inline-start:var(--calcite-alert-edge-distance);inset-inline-end:auto}:host .container[class*=-end]{inset-inline-end:var(--calcite-alert-edge-distance);inset-inline-start:auto}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.container{display:flex;inline-size:100%;align-items:center;justify-content:center}.alert-close{outline-color:transparent}.alert-close:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([open]) .container:not(.queued){max-block-size:100%;border-block-start-width:2px;opacity:1;pointer-events:initial}:host([open]) .container:not(.queued)[class*=bottom]{transform:translate3d(0, calc(-1 * var(--calcite-alert-edge-distance)), inherit)}:host([open]) .container:not(.queued)[class*=top]{transform:translate3d(0, var(--calcite-alert-edge-distance), inherit)}slot[name=title]::slotted(*),*::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){margin:0px;display:inline;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-2);-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}slot[name=link]::slotted(*),*::slotted([slot=link]){display:inline-flex;color:var(--calcite-ui-text-link)}.alert-content{transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-inline:var(--calcite-alert-spacing-token-large);flex:0 0 auto;overflow-wrap:break-word;background-color:var(--calcite-ui-foreground-1);flex:1 1 auto;min-inline-size:0;padding-block:var(--calcite-alert-spacing-token-small);padding-inline:0 var(--calcite-alert-spacing-token-small);border-end-start-radius:var(--calcite-border-radius);border-end-end-radius:var(--calcite-border-radius)}.alert-content:first-of-type:not(:only-child){-webkit-padding-start:var(--calcite-alert-spacing-token-large);padding-inline-start:var(--calcite-alert-spacing-token-large)}.alert-content:only-child{padding:var(--calcite-alert-spacing-token-small)}.alert-icon{transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-alert-spacing-token-small);padding-inline:var(--calcite-alert-spacing-token-large);flex:0 0 auto;display:flex;align-items:center;align-self:stretch;background-color:var(--calcite-ui-foreground-1);padding-block:0px}.alert-close{transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-alert-spacing-token-small);padding-inline:var(--calcite-alert-spacing-token-large);flex:0 0 auto;cursor:pointer;align-self:stretch;overflow:hidden;border-style:none;background-color:var(--calcite-ui-foreground-1);padding-block:0px;color:var(--calcite-ui-text-3);outline:2px solid transparent;outline-offset:2px;border-end-end-radius:var(--calcite-border-radius)}.alert-close:hover,.alert-close:focus{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.alert-close:open{background-color:var(--calcite-ui-foreground-3)}.alert-queue-count{visibility:hidden;display:flex;cursor:default;align-items:center;justify-content:space-around;align-self:stretch;overflow:hidden;background-color:var(--calcite-ui-foreground-1);text-align:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-2);opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-inline:0px solid transparent;border-start-end-radius:0}.alert-queue-count.active{visibility:visible;opacity:1}:host([auto-dismiss])>.alert-queue-count{-webkit-border-end:0px solid transparent;border-inline-end:0px solid transparent}.alert-dismiss-progress{position:absolute;display:block;inline-size:100%;overflow:hidden;inset-inline:0;inset-block-start:-2px;block-size:2px;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.alert-dismiss-progress:after{position:absolute;inset-block-start:0px;display:block;block-size:2px;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);inset-inline-end:0}:host([color=blue]) .container{border-block-start-color:var(--calcite-ui-info)}:host([color=blue]) .container .alert-icon{color:var(--calcite-ui-info)}:host([color=red]) .container{border-block-start-color:var(--calcite-ui-danger)}:host([color=red]) .container .alert-icon{color:var(--calcite-ui-danger)}:host([color=yellow]) .container{border-block-start-color:var(--calcite-ui-warning)}:host([color=yellow]) .container .alert-icon{color:var(--calcite-ui-warning)}:host([color=green]) .container{border-block-start-color:var(--calcite-ui-success)}:host([color=green]) .container .alert-icon{color:var(--calcite-ui-success)}:host([auto-dismiss-duration=fast]) .alert-dismiss-progress:after{animation:dismissProgress 6000ms ease-out}:host([auto-dismiss-duration=medium]) .alert-dismiss-progress:after{animation:dismissProgress 10000ms ease-out}:host([auto-dismiss-duration=slow]) .alert-dismiss-progress:after{animation:dismissProgress 14000ms ease-out}@keyframes dismissProgress{0%{inline-size:0px;opacity:0.75}100%{inline-size:100%;opacity:1}}";

const Alert = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteAlertBeforeClose = createEvent(this, "calciteAlertBeforeClose", 6);
    this.calciteAlertClose = createEvent(this, "calciteAlertClose", 6);
    this.calciteAlertBeforeOpen = createEvent(this, "calciteAlertBeforeOpen", 6);
    this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 6);
    this.calciteInternalAlertSync = createEvent(this, "calciteInternalAlertSync", 6);
    this.calciteInternalAlertRegister = createEvent(this, "calciteInternalAlertRegister", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------------
    /**
     * When `true`, displays and positions the component.
     *
     * @deprecated use `open` instead.
     */
    this.active = false;
    /** When `true`, displays and positions the component. */
    this.open = false;
    /** When `true`, the component closes automatically (recommended for passive, non-blocking alerts). */
    this.autoDismiss = false;
    /** Specifies the duration before the component automatically closes (only use with `autoDismiss`). */
    this.autoDismissDuration = this.autoDismiss ? "medium" : null;
    /** Specifies the color for the component (will apply to top border and icon). */
    this.color = "blue";
    /**
     * Specifies the text label for the close button.
     *
     * @default "Close"
     */
    this.intlClose = TEXT.intlClose;
    /** Specifies the placement of the component */
    this.placement = "bottom";
    /** Specifies the size of the component. */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.effectiveLocale = "";
    /** the list of queued alerts */
    this.queue = [];
    /** the count of queued alerts */
    this.queueLength = 0;
    /** is the alert queued */
    this.queued = false;
    this.autoDismissTimeoutId = null;
    this.trackTimer = Date.now();
    this.openTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.setTransitionEl = (el) => {
      this.transitionEl = el;
      connectOpenCloseComponent(this);
    };
    /** close and emit calciteInternalAlertSync event with the updated queue payload */
    this.closeAlert = () => {
      this.autoDismissTimeoutId = null;
      this.queued = false;
      this.open = false;
      this.queue = this.queue.filter((el) => el !== this.el);
      this.determineActiveAlert();
      this.calciteInternalAlertSync.emit({ queue: this.queue });
    };
  }
  activeHandler(value) {
    this.open = value;
  }
  openHandler(value) {
    if (this.open && !this.queued) {
      this.calciteInternalAlertRegister.emit();
      this.active = value;
    }
    if (!this.open) {
      this.queue = this.queue.filter((el) => el !== this.el);
      this.calciteInternalAlertSync.emit({ queue: this.queue });
      this.active = false;
    }
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  updateDuration() {
    if (this.autoDismiss && this.autoDismissTimeoutId) {
      window.clearTimeout(this.autoDismissTimeoutId);
      this.autoDismissTimeoutId = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoDismissDuration] - (Date.now() - this.trackTimer));
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    const open = this.open || this.active;
    if (open && !this.queued) {
      this.activeHandler(open);
      this.openHandler(open);
      this.calciteInternalAlertRegister.emit();
    }
    connectOpenCloseComponent(this);
  }
  componentWillLoad() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  disconnectedCallback() {
    window.clearTimeout(this.autoDismissTimeoutId);
    disconnectOpenCloseComponent(this);
    disconnectLocalized(this);
  }
  render() {
    const closeButton = (h("button", { "aria-label": this.intlClose, class: "alert-close", onClick: this.closeAlert, ref: (el) => (this.closeButton = el), type: "button" }, h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      signDisplay: "always"
    };
    const queueNumber = this.queueLength > 2 ? this.queueLength - 1 : 1;
    const queueText = numberStringFormatter.numberFormatter.format(queueNumber);
    const queueCount = (h("div", { class: `${this.queueLength > 1 ? "active " : ""}alert-queue-count` }, h("calcite-chip", { scale: this.scale, value: queueText }, queueText)));
    const { active, autoDismiss, label, placement, queued, requestedIcon } = this;
    const role = autoDismiss ? "alert" : "alertdialog";
    const hidden = !active;
    return (h(Host, { "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "calcite-hydrated-hidden": hidden, role: role }, h("div", { class: {
        container: true,
        queued,
        [placement]: true
      }, ref: this.setTransitionEl }, requestedIcon ? (h("div", { class: "alert-icon" }, h("calcite-icon", { icon: requestedIcon, scale: this.scale === "l" ? "m" : "s" }))) : null, h("div", { class: "alert-content" }, h("slot", { name: SLOTS.title }), h("slot", { name: SLOTS.message }), h("slot", { name: SLOTS.link })), queueCount, !autoDismiss ? closeButton : null, active && !queued && autoDismiss ? h("div", { class: "alert-dismiss-progress" }) : null)));
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
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    const alertLinkEl = getSlotted(this.el, { selector: "calcite-link" });
    if (!this.closeButton && !alertLinkEl) {
      return;
    }
    else if (alertLinkEl) {
      alertLinkEl.setFocus();
    }
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }
  /** determine which alert is active */
  determineActiveAlert() {
    var _a;
    if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
      this.openAlert();
      if (this.autoDismiss && !this.autoDismissTimeoutId) {
        this.trackTimer = Date.now();
        this.autoDismissTimeoutId = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoDismissDuration]);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "open": ["openHandler"],
    "icon": ["updateRequestedIcon"],
    "color": ["updateRequestedIcon"],
    "autoDismissDuration": ["updateDuration"]
  }; }
};
Alert.style = alertCss;

export { Alert as calcite_alert };

//# sourceMappingURL=p-1d32df47.entry.js.map