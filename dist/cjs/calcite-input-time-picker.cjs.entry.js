/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const guid = require('./guid-84ac4d91.js');
const time = require('./time-3f5577cb.js');
const label = require('./label-24fcd8a5.js');
const form = require('./form-c94c0c4d.js');
const interactive = require('./interactive-0a68ab99.js');
const locale = require('./locale-73cab8e8.js');
const key = require('./key-55aca5c0.js');
require('./dom-4a580af6.js');
require('./resources-b56bce71.js');
require('./observers-5311faf8.js');

const inputTimePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:inline-block;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const InputTimePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInputTimePickerChange = index.createEvent(this, "calciteInputTimePickerChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, the component is active.
     *
     * @deprecated Use `open` instead.
     */
    this.active = false;
    /** When `true`, displays the `calcite-time-picker` component. */
    this.open = false;
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    /**
     * When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified.
     *
     * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
     */
    this.readOnly = false;
    /**
     * When `true`, the component must have a value in order for the form to submit.
     *
     * @internal
     */
    this.required = false;
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * Determines the type of positioning to use for the overlaid content.
     *
     * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
     *
     * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
     *
     */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the popover will be positioned relative to the input.
     *
     * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
     */
    this.placement = "auto";
    /** Specifies the granularity the component's `value` must adhere to (in seconds). */
    this.step = 60;
    /** The component's value in UTC (always 24-hour format). */
    this.value = null;
    /** whether the value of the input was changed as a result of user typing or not */
    this.internalValueChange = false;
    this.previousValidValue = null;
    this.referenceElementId = `input-time-picker-${guid.guid()}`;
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    this.effectiveLocale = "";
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.calciteInternalInputBlurHandler = () => {
      this.open = false;
      const shouldIncludeSeconds = this.shouldIncludeSeconds();
      const { effectiveLocale: locale$1, numberingSystem, value, calciteInputEl } = this;
      locale.numberStringFormatter.numberFormatOptions = {
        locale: locale$1,
        numberingSystem,
        useGrouping: false
      };
      const delocalizedValue = locale.numberStringFormatter.delocalize(calciteInputEl.value);
      const localizedInputValue = time.localizeTimeString({
        value: delocalizedValue,
        includeSeconds: shouldIncludeSeconds,
        locale: locale$1,
        numberingSystem
      });
      this.setInputValue(localizedInputValue ||
        time.localizeTimeString({ value, locale: locale$1, numberingSystem, includeSeconds: shouldIncludeSeconds }));
    };
    this.calciteInternalInputFocusHandler = (event) => {
      if (!this.readOnly) {
        this.open = true;
        event.stopPropagation();
      }
    };
    this.calciteInputInputHandler = (event) => {
      const target = event.target;
      locale.numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: false
      };
      const delocalizedValue = locale.numberStringFormatter.delocalize(target.value);
      this.setValue({ value: delocalizedValue });
      // only translate the numerals until blur
      const localizedValue = delocalizedValue
        .split("")
        .map((char) => key.numberKeys.includes(char)
        ? locale.numberStringFormatter.numberFormatter.format(Number(char))
        : char)
        .join("");
      this.setInputValue(localizedValue);
    };
    this.timePickerChangeHandler = (event) => {
      event.stopPropagation();
      const target = event.target;
      const value = target.value;
      this.setValue({ value, origin: "time-picker" });
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.keyDownHandler = (event) => {
      const { defaultPrevented, key } = event;
      if (defaultPrevented) {
        return;
      }
      if (key === "Enter") {
        if (form.submitForm(this)) {
          event.preventDefault();
        }
      }
      if (key === "Escape" && this.open) {
        this.open = false;
        event.preventDefault();
      }
    };
    this.setCalcitePopoverEl = (el) => {
      this.popoverEl = el;
    };
    this.setCalciteInputEl = (el) => {
      this.calciteInputEl = el;
    };
    this.setCalciteTimePickerEl = (el) => {
      this.calciteTimePickerEl = el;
    };
    this.setInputValue = (newInputValue) => {
      if (!this.calciteInputEl) {
        return;
      }
      this.calciteInputEl.value = newInputValue;
    };
    this.setValue = ({ value, origin = "input" }) => {
      const previousValue = this.value;
      const newValue = time.formatTimeString(value);
      const newLocalizedValue = time.localizeTimeString({
        value: newValue,
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        includeSeconds: this.shouldIncludeSeconds()
      });
      this.internalValueChange = origin !== "external" && origin !== "loading";
      const shouldEmit = origin !== "loading" &&
        origin !== "external" &&
        ((value !== this.previousValidValue && !value) ||
          !!(!this.previousValidValue && newValue) ||
          (newValue !== this.previousValidValue && newValue));
      if (value) {
        if (shouldEmit) {
          this.previousValidValue = newValue;
        }
        if (newValue && newValue !== this.value) {
          this.value = newValue;
        }
        this.localizedValue = newLocalizedValue;
      }
      else {
        this.value = value;
        this.localizedValue = null;
      }
      if (origin === "time-picker" || origin === "external") {
        this.setInputValue(newLocalizedValue);
      }
      if (shouldEmit) {
        const changeEvent = this.calciteInputTimePickerChange.emit();
        if (changeEvent.defaultPrevented) {
          this.internalValueChange = false;
          this.value = previousValue;
          this.setInputValue(previousValue);
          this.previousValidValue = previousValue;
        }
        else {
          this.previousValidValue = newValue;
        }
      }
    };
  }
  activeHandler(value) {
    this.open = value;
  }
  openHandler(value) {
    this.active = value;
    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }
    if (value) {
      this.reposition(true);
    }
  }
  handleDisabledAndReadOnlyChange(value) {
    if (!value) {
      this.open = false;
    }
  }
  localeChanged() {
    locale.updateEffectiveLocale(this);
  }
  valueWatcher(newValue) {
    if (!this.internalValueChange) {
      this.setValue({ value: newValue, origin: "external" });
    }
    this.internalValueChange = false;
  }
  effectiveLocaleWatcher() {
    this.setInputValue(time.localizeTimeString({
      value: this.value,
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      includeSeconds: this.shouldIncludeSeconds()
    }));
  }
  clickHandler(event) {
    if (event.composedPath().includes(this.calciteTimePickerEl)) {
      return;
    }
    this.setFocus();
  }
  timePickerBlurHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.open = false;
  }
  timePickerFocusHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.readOnly) {
      this.open = true;
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.calciteInputEl) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  async reposition(delayed = false) {
    var _a;
    (_a = this.popoverEl) === null || _a === void 0 ? void 0 : _a.reposition(delayed);
  }
  onLabelClick() {
    this.setFocus();
  }
  shouldIncludeSeconds() {
    return this.step < 60;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    locale.connectLocalized(this);
    const { active, open } = this;
    if (this.value) {
      this.setValue({ value: time.isValidTime(this.value) ? this.value : undefined, origin: "loading" });
    }
    label.connectLabel(this);
    form.connectForm(this);
    if (open) {
      this.active = open;
    }
    else if (active) {
      this.open = active;
    }
  }
  componentDidLoad() {
    this.setInputValue(this.localizedValue);
  }
  disconnectedCallback() {
    label.disconnectLabel(this);
    form.disconnectForm(this);
    locale.disconnectLocalized(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const popoverId = `${this.referenceElementId}-popover`;
    return (index.h(index.Host, { onKeyDown: this.keyDownHandler }, index.h("div", { "aria-controls": popoverId, "aria-haspopup": "dialog", "aria-label": this.name, "aria-owns": popoverId, id: this.referenceElementId, role: "combobox" }, index.h("calcite-input", { disabled: this.disabled, icon: "clock", label: label.getLabelText(this), onCalciteInputInput: this.calciteInputInputHandler, onCalciteInternalInputBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputFocus: this.calciteInternalInputFocusHandler, readOnly: this.readOnly, ref: this.setCalciteInputEl, scale: this.scale, step: this.step })), index.h("calcite-popover", { id: popoverId, label: "Time Picker", open: this.open, overlayPositioning: this.overlayPositioning, placement: this.placement, ref: this.setCalcitePopoverEl, referenceElement: this.referenceElementId, triggerDisabled: true }, index.h("calcite-time-picker", { intlHour: this.intlHour, intlHourDown: this.intlHourDown, intlHourUp: this.intlHourUp, intlMeridiem: this.intlMeridiem, intlMeridiemDown: this.intlMeridiemDown, intlMeridiemUp: this.intlMeridiemUp, intlMinute: this.intlMinute, intlMinuteDown: this.intlMinuteDown, intlMinuteUp: this.intlMinuteUp, intlSecond: this.intlSecond, intlSecondDown: this.intlSecondDown, intlSecondUp: this.intlSecondUp, lang: this.effectiveLocale, numberingSystem: this.numberingSystem, onCalciteInternalTimePickerChange: this.timePickerChangeHandler, ref: this.setCalciteTimePickerEl, scale: this.scale, step: this.step, value: this.value })), index.h(form.HiddenFormInputSlot, { component: this })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "open": ["openHandler"],
    "disabled": ["handleDisabledAndReadOnlyChange"],
    "readOnly": ["handleDisabledAndReadOnlyChange"],
    "locale": ["localeChanged"],
    "value": ["valueWatcher"],
    "effectiveLocale": ["effectiveLocaleWatcher"]
  }; }
};
InputTimePicker.style = inputTimePickerCss;

exports.calcite_input_time_picker = InputTimePicker;
