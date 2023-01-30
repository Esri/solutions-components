/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, g as getElement } from './index-09deaa39.js';
import { g as guid } from './guid-15fce7c0.js';
import { c as connectLabel, d as disconnectLabel } from './label-aa562647.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-dd3f6c86.js';
import { u as updateHostInteraction } from './interactive-822ffed6.js';
import { i as isActivationKey } from './key-acb660e7.js';
import './dom-3bdc69ee.js';
import './resources-436ae282.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const TEXT = {
  rating: "Rating",
  stars: "Stars: ${num}"
};

const ratingCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:flex;align-items:center;inline-size:-moz-fit-content;inline-size:fit-content}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){block-size:1.5rem;--calcite-rating-spacing-unit:0.25rem}:host([scale=m]){block-size:2rem;--calcite-rating-spacing-unit:0.5rem}:host([scale=l]){block-size:2.75rem;--calcite-rating-spacing-unit:0.75rem}:host([read-only]){pointer-events:none}.fieldset{margin:0px;display:flex;border-width:0px;padding:0px}.wrapper{display:inline-block;-webkit-margin-end:var(--calcite-rating-spacing-unit);margin-inline-end:var(--calcite-rating-spacing-unit)}.star{position:relative;display:flex;cursor:pointer;outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:var(--calcite-ui-border-input)}.focused{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.average,.fraction{color:var(--calcite-ui-warning)}.hovered,.selected,:host([read-only]) .average,:host([read-only]) .fraction{color:var(--calcite-ui-brand)}:host .fraction{pointer-events:none;position:absolute;inset-block-start:0px;overflow:hidden;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:var(--calcite-font-weight-bold)}.number--count{color:var(--calcite-ui-text-2);font-style:italic}.number--count:not(:first-child){-webkit-margin-start:var(--calcite-rating-spacing-unit);margin-inline-start:var(--calcite-rating-spacing-unit)}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const Rating = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRatingChange = createEvent(this, "calciteRatingChange", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** Specifies the size of the component. */
    this.scale = "m";
    /** The component's value. */
    this.value = 0;
    /** When `true`, the component's value can be read, but cannot be modified. */
    this.readOnly = false;
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    /** When `true`, and if available, displays the `average` and/or `count` data summary in a `calcite-chip`. */
    this.showChip = false;
    /**
     * Accessible name for the component.
     *
     * @default "Rating"
     */
    this.intlRating = TEXT.rating;
    /**
     * Accessible name for each star. The `${num}` in the string will be replaced by the number.
     *
     * @default "Stars: ${num}"
     */
    this.intlStars = TEXT.stars;
    /**
     * When `true`, the component must have a value in order for the form to submit.
     *
     * @internal
     */
    this.required = false;
    this.onKeyboardPressed = (event) => {
      if (!this.required && isActivationKey(event.key)) {
        event.preventDefault();
        this.updateValue(0);
      }
    };
    this.onFocusChange = (selectedRatingValue) => {
      this.hasFocus = true;
      if (!this.required && this.focusValue === selectedRatingValue) {
        this.updateValue(0);
      }
      else {
        this.focusValue = selectedRatingValue;
      }
    };
    this.guid = `calcite-ratings-${guid()}`;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectLabel(this);
    connectForm(this);
  }
  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  blurHandler() {
    this.hasFocus = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderStars() {
    return [1, 2, 3, 4, 5].map((i) => {
      const selected = this.value >= i;
      const average = this.average && !this.value && i <= this.average;
      const hovered = i <= this.hoverValue;
      const fraction = this.average && this.average + 1 - i;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const focused = this.hasFocus && this.focusValue === i;
      return (h("span", { class: { wrapper: true } }, h("label", { class: { star: true, focused, selected, average, hovered, partial }, htmlFor: `${this.guid}-${i}`, onPointerOver: () => {
          this.hoverValue = i;
        } }, h("calcite-icon", { "aria-hidden": "true", class: "icon", icon: selected || average || this.readOnly ? "star-f" : "star", scale: this.scale }), partial && (h("div", { class: "fraction", style: { width: `${fraction * 100}%` } }, h("calcite-icon", { icon: "star-f", scale: this.scale }))), h("span", { class: "visually-hidden" }, this.intlStars.replace("${num}", `${i}`))), h("input", { checked: i === this.value, class: "visually-hidden", disabled: this.disabled || this.readOnly, id: `${this.guid}-${i}`, name: this.guid, onChange: () => this.updateValue(i), onClick: (event) => 
        // click is fired from the component's label, so we treat this as an internal event
        event.stopPropagation(), onFocus: () => this.onFocusChange(i), onKeyDown: this.onKeyboardPressed, ref: (el) => (i === 1 || i === this.value) && (this.inputFocusRef = el), type: "radio", value: i })));
    });
  }
  render() {
    const { disabled, intlRating, showChip, scale, count, average } = this;
    return (h(Fragment, null, h("fieldset", { class: "fieldset", disabled: disabled, onBlur: () => (this.hoverValue = null), onPointerLeave: () => (this.hoverValue = null), onTouchEnd: () => (this.hoverValue = null) }, h("legend", { class: "visually-hidden" }, intlRating), this.renderStars()), (count || average) && showChip ? (h("calcite-chip", { scale: scale, value: count === null || count === void 0 ? void 0 : count.toString() }, !!average && h("span", { class: "number--average" }, average.toString()), !!count && h("span", { class: "number--count" }, "(", count === null || count === void 0 ? void 0 :
      count.toString(), ")"))) : null, h(HiddenFormInputSlot, { component: this })));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  onLabelClick() {
    this.setFocus();
  }
  updateValue(value) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.inputFocusRef) === null || _a === void 0 ? void 0 : _a.focus();
  }
  get el() { return getElement(this); }
};
Rating.style = ratingCss;

export { Rating as calcite_rating };

//# sourceMappingURL=calcite-rating.entry.js.map