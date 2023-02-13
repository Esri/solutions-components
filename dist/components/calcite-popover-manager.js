/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { c as createObserver } from './observers.js';

const popoverManagerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:block}";

const PopoverManager = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.mutationObserver = createObserver("mutation", () => this.setAutoClose());
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * CSS Selector to match reference elements for popovers. Reference elements will be identified by this selector in order to open their associated popover.
     *
     * @default `[data-calcite-popover-reference]`
     */
    this.selector = "[data-calcite-popover-reference]";
    /**
     * Automatically closes any currently open popovers when clicking outside of a popover.
     */
    this.autoClose = false;
  }
  autoCloseHandler() {
    this.setAutoClose();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.setAutoClose();
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return h("slot", null);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setAutoClose() {
    const { autoClose, el } = this;
    el.querySelectorAll("calcite-popover").forEach((popover) => (popover.autoClose = autoClose));
  }
  get el() { return this; }
  static get watchers() { return {
    "autoClose": ["autoCloseHandler"]
  }; }
  static get style() { return popoverManagerCss; }
}, [1, "calcite-popover-manager", {
    "selector": [513],
    "autoClose": [516, "auto-close"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-popover-manager"];
  components.forEach(tagName => { switch (tagName) {
    case "calcite-popover-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PopoverManager);
      }
      break;
  } });
}
defineCustomElement$1();

const CalcitePopoverManager = PopoverManager;
const defineCustomElement = defineCustomElement$1;

export { CalcitePopoverManager, defineCustomElement };
