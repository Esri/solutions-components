/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getElementProp, t as toAriaBoolean } from './dom.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const SLOTS = {
  input: "input"
};
const CSS = {
  radioGroupItemIcon: "radio-group-item-icon"
};

const radioGroupItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-font-weight-normal);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-animation-timing) ease-in-out}:host label{pointer-events:none;margin:0.125rem;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-ui-text-3);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-internal-animation-timing-fast) ease-in-out, color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-1px}.label--scale-s{padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-block:0.125rem}.label--scale-m{padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-block:0.375rem}.label--scale-l{padding-inline:1rem;padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{cursor:default;border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-brand);color:var(--calcite-ui-background)}:host([checked]) .label--outline{border-color:var(--calcite-ui-brand);background-color:var(--calcite-ui-foreground-1);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}@media (forced-colors: active){:host([checked]) label{background-color:highlight}:host([checked]) .label--outline{outline:2px solid transparent;outline-offset:2px}:host([checked]) label:not([class~=label--outline]) .radio-group-item-icon{color:highlightText}}.radio-group-item-icon{position:relative;margin:0px;display:inline-flex;line-height:inherit}:host([icon-position=start]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([icon-position=end]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-position=start]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([icon-position=end]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}:host([icon-position=start]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([icon-position=end]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:1rem;margin-inline-start:1rem}:host([icon-start]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([icon-end]) .label--scale-s .radio-group-item-icon{-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-start]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([icon-end]) .label--scale-m .radio-group-item-icon{-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}:host([icon-start]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([icon-end]) .label--scale-l .radio-group-item-icon{-webkit-margin-start:1rem;margin-inline-start:1rem}";

const RadioGroupItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calciteInternalRadioGroupItemChange = createEvent(this, "calciteInternalRadioGroupItemChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** When `true`, the component is checked. */
    this.checked = false;
    /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
    this.iconFlipRtl = false;
    /**
     * Specifies the placement of the icon.
     *
     * @deprecated Use either `iconStart` or `iconEnd` but do not combine them with `icon` and `iconPosition`.
     */
    this.iconPosition = "start";
  }
  handleCheckedChange() {
    this.calciteInternalRadioGroupItemChange.emit();
  }
  render() {
    const { checked, value } = this;
    const scale = getElementProp(this.el, "scale", "m");
    const appearance = getElementProp(this.el, "appearance", "solid");
    const layout = getElementProp(this.el, "layout", "horizontal");
    const iconStartEl = this.iconStart ? (h("calcite-icon", { class: CSS.radioGroupItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconStart, key: "icon-start", scale: "s" })) : null;
    const iconEndEl = this.iconEnd ? (h("calcite-icon", { class: CSS.radioGroupItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconEnd, key: "icon-end", scale: "s" })) : null;
    const iconEl = (h("calcite-icon", { class: CSS.radioGroupItemIcon, flipRtl: this.iconFlipRtl, icon: this.icon, key: "icon", scale: "s" }));
    const iconAtStart = this.icon && this.iconPosition === "start" && !this.iconStart ? iconEl : null;
    const iconAtEnd = this.icon && this.iconPosition === "end" && !this.iconEnd ? iconEl : null;
    return (h(Host, { "aria-checked": toAriaBoolean(checked), "aria-label": value, role: "radio" }, h("label", { class: {
        "label--scale-s": scale === "s",
        "label--scale-m": scale === "m",
        "label--scale-l": scale === "l",
        "label--horizontal": layout === "horizontal",
        "label--outline": appearance === "outline"
      } }, iconAtStart, this.iconStart ? iconStartEl : null, h("slot", null, value), h("slot", { name: SLOTS.input }), iconAtEnd, this.iconEnd ? iconEndEl : null)));
  }
  get el() { return this; }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
  static get style() { return radioGroupItemCss; }
}, [1, "calcite-radio-group-item", {
    "checked": [1540],
    "icon": [513],
    "iconFlipRtl": [516, "icon-flip-rtl"],
    "iconPosition": [513, "icon-position"],
    "iconStart": [513, "icon-start"],
    "iconEnd": [513, "icon-end"],
    "value": [1032]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-radio-group-item", "calcite-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "calcite-radio-group-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RadioGroupItem);
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

export { RadioGroupItem as R, defineCustomElement as d };
