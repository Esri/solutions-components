/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-09deaa39.js';
import { T as TEXT, g as getValueAsDateRange, a as getLocaleData } from './resources-421bd81b.js';
import { d as dateToISO, a as dateFromISO, s as setEndOfDay, b as dateFromRange, c as sameDate, p as parseDateString, i as inRange } from './date-03618c4c.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-aa562647.js';
import { s as submitForm, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-dd3f6c86.js';
import { d as defaultMenuPlacement, f as filterComputedPlacements, c as connectFloatingUI, u as updateAfterClose, r as reposition, a as disconnectFloatingUI, F as FloatingCSS } from './floating-ui-6010f963.js';
import { u as updateHostInteraction } from './interactive-822ffed6.js';
import { t as toAriaBoolean } from './dom-3bdc69ee.js';
import { c as connectOpenCloseComponent, d as disconnectOpenCloseComponent } from './openCloseComponent-5caff873.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './locale-9dd0777b.js';
import { n as numberKeys } from './key-acb660e7.js';
import './debounce-4c884e5c.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';
import './observers-31601001.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  menu: "menu-container",
  menuActive: "menu-container--active"
};

const inputDatePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.calendar-picker-wrapper{position:static;inline-size:100%;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-picker-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:1;margin-inline:1px;background-color:var(--calcite-ui-foreground-1);padding-inline:0.625rem;inset-inline-start:0}:host([scale=s][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:216px}:host([scale=m][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:286px}:host([scale=l][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:398px}.menu-container{display:block;position:absolute;z-index:900;inline-size:0;block-size:0;overflow:hidden;pointer-events:none;visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([open]) .menu-container{pointer-events:initial;visibility:visible;inline-size:unset;block-size:unset;overflow:unset}.menu-container--active{pointer-events:initial;visibility:visible;inline-size:unset;block-size:unset;overflow:unset}.input .calcite-input__wrapper{-webkit-margin-before:0px;margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;-webkit-padding-start:0.75rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const InputDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerChange = createEvent(this, "calciteDatePickerChange", 6);
    this.calciteDatePickerRangeChange = createEvent(this, "calciteDatePickerRangeChange", 6);
    this.calciteInputDatePickerChange = createEvent(this, "calciteInputDatePickerChange", 6);
    this.calciteInputDatePickerBeforeClose = createEvent(this, "calciteInputDatePickerBeforeClose", 6);
    this.calciteInputDatePickerClose = createEvent(this, "calciteInputDatePickerClose", 6);
    this.calciteInputDatePickerBeforeOpen = createEvent(this, "calciteInputDatePickerBeforeOpen", 6);
    this.calciteInputDatePickerOpen = createEvent(this, "calciteInputDatePickerOpen", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * When `true`, the component's value can be read, but controls are not accessible and the value cannot be modified.
     *
     * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
     */
    this.readOnly = false;
    /**
     * When `true`, the component is active.
     *
     * @deprecated use `open` instead.
     */
    this.active = false;
    /** When `true`, displays the `calcite-date-picker` component. */
    this.open = false;
    /**
     * Accessible name for the component's previous month button.
     *
     * @default "Previous month"
     */
    this.intlPrevMonth = TEXT.prevMonth;
    /**
     * Accessible name for the component's next month button.
     *
     * @default "Next month"
     */
    this.intlNextMonth = TEXT.nextMonth;
    /**
     * Accessible name for the component's year input.
     *
     * @default "Year"
     */
    this.intlYear = TEXT.year;
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * Specifies the placement of the `calcite-date-picker` relative to the component.
     *
     * @default "bottom-start"
     */
    this.placement = defaultMenuPlacement;
    /** When `true`, activates a range for the component. */
    this.range = false;
    /**
     * When `true`, the component must have a value in order for the form to submit.
     *
     * @internal
     */
    this.required = false;
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
     * When `true`, disables the default behavior on the third click of narrowing or extending the range.
     * Instead starts a new range.
     */
    this.proximitySelectionDisabled = false;
    /** Defines the layout of the component. */
    this.layout = "horizontal";
    this.effectiveLocale = "";
    this.focusedInput = "start";
    this.globalAttributes = {};
    this.openTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.setFilteredPlacements = () => {
      const { el, flipPlacements } = this;
      this.filteredFlipPlacements = flipPlacements
        ? filterComputedPlacements(flipPlacements, el)
        : null;
    };
    this.setTransitionEl = (el) => {
      this.transitionEl = el;
      connectOpenCloseComponent(this);
    };
    this.setStartInput = (el) => {
      this.startInput = el;
    };
    this.setEndInput = (el) => {
      this.endInput = el;
    };
    this.deactivate = () => {
      this.open = false;
    };
    this.keyDownHandler = (event) => {
      const { defaultPrevented, key } = event;
      if (key === "Enter" && !defaultPrevented) {
        if (submitForm(this)) {
          event.preventDefault();
        }
      }
      else if (key === "Escape" && !defaultPrevented) {
        this.active = false;
        this.open = false;
        event.preventDefault();
      }
    };
    this.inputBlur = (event) => {
      this.blur(event.currentTarget);
    };
    this.startInputFocus = () => {
      if (!this.readOnly) {
        this.open = true;
      }
      this.focusedInput = "start";
    };
    this.endInputFocus = () => {
      if (!this.readOnly) {
        this.open = true;
      }
      this.focusedInput = "end";
    };
    this.startInputInput = () => {
      const parsedValue = this.parseNumerals(this.startInput.value);
      const formattedValue = this.formatNumerals(parsedValue);
      this.startInput.value = formattedValue;
      this.input(parsedValue);
    };
    this.endInputInput = () => {
      const parsedValue = this.parseNumerals(this.endInput.value);
      const formattedValue = this.formatNumerals(parsedValue);
      this.endInput.value = formattedValue;
      this.input(parsedValue);
    };
    this.setFloatingEl = (el) => {
      if (el) {
        this.floatingEl = el;
        connectFloatingUI(this, this.referenceEl, this.floatingEl);
      }
    };
    this.setStartWrapper = (el) => {
      this.startWrapper = el;
      this.setReferenceEl();
    };
    this.setEndWrapper = (el) => {
      this.endWrapper = el;
      this.setReferenceEl();
    };
    /**
     * Event handler for when the selected date changes
     *
     * @param event
     */
    this.handleDateChange = (event) => {
      if (this.range) {
        return;
      }
      this.value = dateToISO(event.detail);
    };
    this.handleDateRangeChange = (event) => {
      var _a, _b;
      if (!this.range || !event.detail) {
        return;
      }
      const { startDate, endDate } = event.detail;
      this.start = dateToISO(startDate);
      this.end = dateToISO(endDate);
      this.value = [this.start, this.end];
      if (this.shouldFocusRangeEnd()) {
        (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
      }
      else if (this.shouldFocusRangeStart()) {
        (_b = this.startInput) === null || _b === void 0 ? void 0 : _b.setFocus();
      }
    };
    this.commonDateSeparators = [".", "-", "/"];
    this.formatNumerals = (value) => value
      ? value
        .split("")
        .map((char) => 
      // convert common separators to the locale's
      this.commonDateSeparators.includes(char)
        ? this.localeData.separator
        : numberKeys.includes(char)
          ? numberStringFormatter.numberFormatter.format(Number(char))
          : char)
        .join("")
      : "";
    this.parseNumerals = (value) => value
      ? value
        .split("")
        .map((char) => numberKeys.includes(char) ? numberStringFormatter.delocalize(char) : char)
        .join("")
      : "";
  }
  handleDisabledAndReadOnlyChange(value) {
    if (!value) {
      this.open = false;
    }
  }
  valueHandler(value) {
    if (Array.isArray(value)) {
      this.valueAsDate = getValueAsDateRange(value);
      this.start = value[0];
      this.end = value[1];
    }
    else if (value) {
      this.valueAsDate = dateFromISO(value);
      this.start = "";
      this.end = "";
    }
    else {
      this.valueAsDate = undefined;
      this.start = undefined;
      this.end = undefined;
    }
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements();
    this.reposition(true);
  }
  onMinChanged(min) {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }
  onMaxChanged(max) {
    if (max) {
      this.maxAsDate = dateFromISO(max);
    }
  }
  activeHandler(value) {
    this.open = value;
  }
  openHandler(value) {
    this.active = value;
    if (this.disabled || this.readOnly) {
      if (!value) {
        updateAfterClose(this.floatingEl);
      }
      this.open = false;
      return;
    }
    if (value) {
      this.reposition(true);
    }
    else {
      updateAfterClose(this.floatingEl);
    }
  }
  overlayPositioningHandler() {
    this.reposition(true);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleDateOrRangeChange() {
    this.calciteInputDatePickerChange.emit();
  }
  calciteDaySelectHandler() {
    if (this.shouldFocusRangeStart() || this.shouldFocusRangeEnd()) {
      return;
    }
    this.open = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.startInput) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  async reposition(delayed = false) {
    const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;
    return reposition(this, {
      floatingEl,
      referenceEl,
      overlayPositioning,
      placement,
      flipPlacements: filteredFlipPlacements,
      type: "menu"
    }, delayed);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    const isOpen = this.active || this.open;
    isOpen && this.activeHandler(isOpen);
    isOpen && this.openHandler(isOpen);
    if (Array.isArray(this.value)) {
      this.valueAsDate = getValueAsDateRange(this.value);
      this.start = this.value[0];
      this.end = this.value[1];
    }
    else if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
      this.start = "";
      this.end = "";
    }
    if (this.start) {
      this.startAsDate = dateFromISO(this.start);
    }
    if (this.end) {
      this.endAsDate = setEndOfDay(dateFromISO(this.end));
    }
    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
    connectLabel(this);
    connectForm(this);
    connectOpenCloseComponent(this);
    this.setFilteredPlacements();
    this.reposition(true);
    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
  }
  async componentWillLoad() {
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }
  componentDidLoad() {
    this.reposition(true);
  }
  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    disconnectOpenCloseComponent(this);
    disconnectLocalized(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  render() {
    var _a, _b;
    const { disabled, readOnly, numberingSystem, effectiveLocale } = this;
    numberStringFormatter.numberFormatOptions = {
      numberingSystem,
      locale: effectiveLocale,
      useGrouping: false
    };
    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const formattedEndDate = endDate
      ? this.formatNumerals(endDate.toLocaleDateString(effectiveLocale))
      : "";
    const formattedDate = date ? this.formatNumerals(date.toLocaleDateString(effectiveLocale)) : "";
    return (h(Host, { onBlur: this.deactivate, onKeyDown: this.keyDownHandler, role: "application" }, this.localeData && (h("div", { "aria-expanded": toAriaBoolean(this.open), class: "input-container", role: "application" }, h("div", { class: "input-wrapper", ref: this.setStartWrapper }, h("calcite-input", { class: `input ${this.layout === "vertical" && this.range ? `no-bottom-border` : ``}`, disabled: disabled, icon: "calendar", label: getLabelText(this), lang: effectiveLocale, "number-button-type": "none", numberingSystem: numberingSystem, onCalciteInputInput: this.startInputInput, onCalciteInternalInputBlur: this.inputBlur, onCalciteInternalInputFocus: this.startInputFocus, placeholder: (_a = this.localeData) === null || _a === void 0 ? void 0 : _a.placeholder, readOnly: readOnly, ref: this.setStartInput, scale: this.scale, type: "text", value: formattedDate })), h("div", { "aria-hidden": toAriaBoolean(!this.open), class: {
        [CSS.menu]: true,
        [CSS.menuActive]: this.open
      }, ref: this.setFloatingEl }, h("div", { class: {
        ["calendar-picker-wrapper"]: true,
        ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
        [FloatingCSS.animation]: true,
        [FloatingCSS.animationActive]: this.open
      }, ref: this.setTransitionEl }, h("calcite-date-picker", { activeRange: this.focusedInput, endAsDate: this.endAsDate, headingLevel: this.headingLevel, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, intlYear: this.intlYear, lang: effectiveLocale, max: this.max, maxAsDate: this.maxAsDate, min: this.min, minAsDate: this.minAsDate, numberingSystem: numberingSystem, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, scale: this.scale, startAsDate: this.startAsDate, tabIndex: 0, valueAsDate: this.valueAsDate }))), this.range && this.layout === "horizontal" && (h("div", { class: "horizontal-arrow-container" }, h("calcite-icon", { flipRtl: true, icon: "arrow-right", scale: "s" }))), this.range && this.layout === "vertical" && this.scale !== "s" && (h("div", { class: "vertical-arrow-container" }, h("calcite-icon", { icon: "arrow-down", scale: "s" }))), this.range && (h("div", { class: "input-wrapper", ref: this.setEndWrapper }, h("calcite-input", { class: {
        input: true,
        "border-top-color-one": this.layout === "vertical" && this.range
      }, disabled: disabled, icon: "calendar", lang: effectiveLocale, "number-button-type": "none", numberingSystem: numberingSystem, onCalciteInputInput: this.endInputInput, onCalciteInternalInputBlur: this.inputBlur, onCalciteInternalInputFocus: this.endInputFocus, placeholder: (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.placeholder, readOnly: readOnly, ref: this.setEndInput, scale: this.scale, type: "text", value: formattedEndDate }))))), h(HiddenFormInputSlot, { component: this })));
  }
  setReferenceEl() {
    const { focusedInput, layout, endWrapper, startWrapper } = this;
    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;
    connectFloatingUI(this, this.referenceEl, this.floatingEl);
  }
  onLabelClick() {
    this.setFocus();
  }
  onBeforeOpen() {
    this.calciteInputDatePickerBeforeOpen.emit();
  }
  onOpen() {
    this.calciteInputDatePickerOpen.emit();
  }
  onBeforeClose() {
    this.calciteInputDatePickerBeforeClose.emit();
  }
  onClose() {
    this.calciteInputDatePickerClose.emit();
  }
  startWatcher(start) {
    this.startAsDate = dateFromISO(start);
  }
  endWatcher(end) {
    this.endAsDate = end ? setEndOfDay(dateFromISO(end)) : dateFromISO(end);
  }
  async loadLocaleData() {
    this.localeData = await getLocaleData(this.effectiveLocale);
  }
  clearCurrentValue() {
    if (!this.range) {
      if (typeof this.value === "string" && this.value) {
        this.calciteDatePickerChange.emit();
      }
      this.value = "";
      return;
    }
    const { focusedInput } = this;
    if (focusedInput === "start") {
      if (this.start) {
        this.calciteDatePickerRangeChange.emit();
      }
      this.value = Array.isArray(this.value) ? ["", this.value[1] || ""] : [""];
      this.start = undefined;
    }
    else if (focusedInput === "end") {
      if (this.end) {
        this.calciteDatePickerRangeChange.emit();
      }
      this.value = Array.isArray(this.value) ? [this.value[0] || "", ""] : ["", ""];
      this.end = undefined;
    }
  }
  /**
   * If inputted string is a valid date, update value/active
   *
   * @param value
   */
  input(value) {
    const date = this.getDateFromInput(value);
    if (!date) {
      this.clearCurrentValue();
      return;
    }
    if (!this.range) {
      this.value = dateToISO(date);
      this.calciteDatePickerChange.emit(date);
      return;
    }
    const { focusedInput } = this;
    if (focusedInput === "start") {
      if (!this.startAsDate || !sameDate(date, this.startAsDate)) {
        const startDateISO = dateToISO(date);
        this.value = Array.isArray(this.value)
          ? [startDateISO, this.value[1] || ""]
          : [startDateISO];
        this.start = startDateISO;
        this.calciteDatePickerRangeChange.emit({
          startDate: date,
          endDate: this.endAsDate
        });
      }
    }
    else if (focusedInput === "end") {
      if (!this.endAsDate || !sameDate(date, this.endAsDate)) {
        const endDateISO = dateToISO(date);
        this.value = Array.isArray(this.value)
          ? [this.value[0] || "", endDateISO]
          : ["", endDateISO];
        this.end = endDateISO;
        this.calciteDatePickerRangeChange.emit({
          startDate: this.startAsDate,
          endDate: setEndOfDay(date)
        });
      }
    }
  }
  /**
   * Clean up invalid date from input on blur
   *
   * @param target
   */
  blur(target) {
    const { focusedInput, endAsDate, range, startAsDate, valueAsDate } = this;
    const locale = this.effectiveLocale;
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!range && valueAsDate) {
        target.value = this.formatNumerals(Array.isArray(valueAsDate)
          ? valueAsDate[focusedInput === "end" ? 1 : 0].toLocaleDateString(locale)
          : valueAsDate.toLocaleDateString(locale));
      }
      else if (focusedInput === "start" && startAsDate) {
        target.value = this.formatNumerals(startAsDate.toLocaleDateString(locale));
      }
      else if (focusedInput === "end" && endAsDate) {
        target.value = this.formatNumerals(endAsDate.toLocaleDateString(locale));
      }
    }
  }
  shouldFocusRangeStart() {
    return !!(this.endAsDate &&
      !this.startAsDate &&
      this.focusedInput === "end" &&
      this.startInput);
  }
  shouldFocusRangeEnd() {
    return !!(this.startAsDate &&
      !this.endAsDate &&
      this.focusedInput === "start" &&
      this.endInput);
  }
  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   *
   * @param value
   */
  getDateFromInput(value) {
    if (!this.localeData) {
      return false;
    }
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.localeData);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    date.setFullYear(year);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 0;
    if (validDay &&
      validMonth &&
      validDate &&
      validLength &&
      validYear &&
      inRange(date, this.min, this.max)) {
      return date;
    }
    return false;
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["handleDisabledAndReadOnlyChange"],
    "readOnly": ["handleDisabledAndReadOnlyChange"],
    "value": ["valueHandler"],
    "flipPlacements": ["flipPlacementsHandler"],
    "min": ["onMinChanged"],
    "max": ["onMaxChanged"],
    "active": ["activeHandler"],
    "open": ["openHandler"],
    "overlayPositioning": ["overlayPositioningHandler"],
    "layout": ["setReferenceEl"],
    "focusedInput": ["setReferenceEl"],
    "start": ["startWatcher"],
    "end": ["endWatcher"],
    "effectiveLocale": ["loadLocaleData"]
  }; }
};
InputDatePicker.style = inputDatePickerCss;

export { InputDatePicker as calcite_input_date_picker };
