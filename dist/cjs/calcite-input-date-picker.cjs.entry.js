/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const date = require('./date-44859d62.js');
const dom = require('./dom-24094fab.js');
const floatingUi = require('./floating-ui-c1943df4.js');
const form = require('./form-102203a5.js');
const interactive = require('./interactive-772d59fe.js');
const key = require('./key-d55baa11.js');
const label = require('./label-5bd96bc0.js');
const loadable = require('./loadable-c64a459b.js');
const locale = require('./locale-e2cae6e8.js');
const openCloseComponent = require('./openCloseComponent-434d14e6.js');
const utils = require('./utils-0b3ef38d.js');
require('./guid-c58d5ead.js');
require('./resources-1f836572.js');
require('./debounce-69c3bada.js');
require('./observers-b0934d2a.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS = {
  menu: "menu-container",
  menuActive: "menu-container--active"
};

const inputDatePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.calendar-picker-wrapper{position:static;inline-size:100%;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-picker-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:1;margin-inline:1px;background-color:var(--calcite-ui-foreground-1);padding-inline:0.625rem;inset-inline-start:0}:host([scale=s][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:216px}:host([scale=m][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:286px}:host([scale=l][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:398px}.menu-container{--calcite-floating-ui-z-index:600;display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([open]) .menu-container{visibility:visible}.menu-container--active{visibility:visible}.input .calcite-input__wrapper{-webkit-margin-before:0px;margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;-webkit-padding-start:0.75rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const InputDatePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInputDatePickerChange = index.createEvent(this, "calciteInputDatePickerChange", 6);
    this.calciteInputDatePickerBeforeClose = index.createEvent(this, "calciteInputDatePickerBeforeClose", 6);
    this.calciteInputDatePickerClose = index.createEvent(this, "calciteInputDatePickerClose", 6);
    this.calciteInputDatePickerBeforeOpen = index.createEvent(this, "calciteInputDatePickerBeforeOpen", 6);
    this.calciteInputDatePickerOpen = index.createEvent(this, "calciteInputDatePickerOpen", 6);
    this.calciteInternalInputInputHandler = (event) => {
      const target = event.target;
      const value = target.value;
      const parsedValue = this.parseNumerals(value);
      const formattedValue = this.formatNumerals(parsedValue);
      target.value = formattedValue;
      const { year } = date.datePartsFromLocalizedString(value, this.localeData);
      if (year && year.length < 4) {
        return;
      }
      const date$1 = date.dateFromLocalizedString(value, this.localeData);
      if (date.inRange(date$1, this.min, this.max)) {
        this.datePickerActiveDate = date$1;
      }
    };
    this.calciteInternalInputBlurHandler = () => {
      this.commitValue();
    };
    this.userChangedValue = false;
    this.openTransitionProp = "opacity";
    this.valueAsDateChangedExternally = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.setFilteredPlacements = () => {
      const { el, flipPlacements } = this;
      this.filteredFlipPlacements = flipPlacements
        ? floatingUi.filterComputedPlacements(flipPlacements, el)
        : null;
    };
    this.setTransitionEl = (el) => {
      this.transitionEl = el;
      openCloseComponent.connectOpenCloseComponent(this);
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
      var _a, _b;
      const { defaultPrevented, key } = event;
      if (key === "Enter" && !defaultPrevented) {
        this.commitValue();
        if (this.shouldFocusRangeEnd()) {
          (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
        }
        else if (this.shouldFocusRangeStart()) {
          (_b = this.startInput) === null || _b === void 0 ? void 0 : _b.setFocus();
        }
        if (form.submitForm(this)) {
          event.preventDefault();
        }
      }
      else if (key === "Escape" && !defaultPrevented) {
        this.open = false;
        event.preventDefault();
      }
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
    this.setFloatingEl = (el) => {
      if (el) {
        this.floatingEl = el;
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
     * @param event CalciteDatePicker custom change event
     */
    this.handleDateChange = (event) => {
      if (this.range) {
        return;
      }
      event.stopPropagation();
      this.setValue(event.target.valueAsDate);
      this.localizeInputValues();
    };
    this.handleDateRangeChange = (event) => {
      var _a, _b;
      if (!this.range) {
        return;
      }
      event.stopPropagation();
      const value = event.target.valueAsDate;
      this.setRangeValue(value);
      this.localizeInputValues();
      if (this.shouldFocusRangeEnd()) {
        (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
      }
      else if (this.shouldFocusRangeStart()) {
        (_b = this.startInput) === null || _b === void 0 ? void 0 : _b.setFocus();
      }
    };
    this.setInputValue = (newValue, input = "start") => {
      const inputEl = this[`${input}Input`];
      if (!inputEl) {
        return;
      }
      inputEl.value = newValue;
    };
    this.setRangeValue = (valueAsDate) => {
      if (!this.range) {
        return;
      }
      const { value: oldValue } = this;
      const oldValueIsArray = Array.isArray(oldValue);
      const valueIsArray = Array.isArray(valueAsDate);
      const newStartDate = valueIsArray ? valueAsDate[0] : null;
      const newStartDateISO = valueIsArray ? date.dateToISO(newStartDate) : "";
      const newEndDate = valueIsArray ? valueAsDate[1] : null;
      const newEndDateISO = valueIsArray ? date.dateToISO(newEndDate) : "";
      const newValue = newStartDateISO || newEndDateISO ? [newStartDateISO, newEndDateISO] : "";
      if (newValue === oldValue) {
        return;
      }
      this.userChangedValue = true;
      this.value = newValue;
      this.valueAsDate = newValue ? utils.getValueAsDateRange(newValue) : undefined;
      const changeEvent = this.calciteInputDatePickerChange.emit();
      if (changeEvent && changeEvent.defaultPrevented) {
        this.value = oldValue;
        if (oldValueIsArray) {
          this.setInputValue(oldValue[0], "start");
          this.setInputValue(oldValue[1], "end");
        }
        else {
          this.value = oldValue;
          this.setInputValue(oldValue);
        }
      }
    };
    this.setValue = (value) => {
      if (this.range) {
        return;
      }
      const oldValue = this.value;
      const newValue = date.dateToISO(value);
      if (newValue === oldValue) {
        return;
      }
      this.userChangedValue = true;
      this.valueAsDate = newValue ? date.dateFromISO(newValue) : undefined;
      this.value = newValue || "";
      const changeEvent = this.calciteInputDatePickerChange.emit();
      if (changeEvent.defaultPrevented) {
        this.value = oldValue;
        this.setInputValue(oldValue);
      }
    };
    this.commonDateSeparators = [".", "-", "/"];
    this.formatNumerals = (value) => value
      ? value
        .split("")
        .map((char) => {
        var _a, _b, _c;
        return ((_a = this.commonDateSeparators) === null || _a === void 0 ? void 0 : _a.includes(char))
          ? (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.separator
          : (key.numberKeys === null || key.numberKeys === void 0 ? void 0 : key.numberKeys.includes(char))
            ? (_c = locale.numberStringFormatter === null || locale.numberStringFormatter === void 0 ? void 0 : locale.numberStringFormatter.numberFormatter) === null || _c === void 0 ? void 0 : _c.format(Number(char))
            : char;
      })
        .join("")
      : "";
    this.parseNumerals = (value) => value
      ? value
        .split("")
        .map((char) => key.numberKeys.includes(char) ? locale.numberStringFormatter.delocalize(char) : char)
        .join("")
      : "";
    this.disabled = false;
    this.form = undefined;
    this.readOnly = false;
    this.value = "";
    this.flipPlacements = undefined;
    this.headingLevel = undefined;
    this.valueAsDate = undefined;
    this.minAsDate = undefined;
    this.maxAsDate = undefined;
    this.min = undefined;
    this.max = undefined;
    this.open = false;
    this.name = undefined;
    this.numberingSystem = undefined;
    this.scale = "m";
    this.placement = floatingUi.defaultMenuPlacement;
    this.range = false;
    this.required = false;
    this.overlayPositioning = "absolute";
    this.proximitySelectionDisabled = false;
    this.layout = "horizontal";
    this.messageOverrides = undefined;
    this.datePickerActiveDate = undefined;
    this.effectiveLocale = "";
    this.focusedInput = "start";
    this.globalAttributes = {};
    this.localeData = undefined;
  }
  handleDisabledAndReadOnlyChange(value) {
    if (!value) {
      this.open = false;
    }
  }
  valueWatcher(newValue) {
    if (!this.userChangedValue) {
      let newValueAsDate;
      if (Array.isArray(newValue)) {
        newValueAsDate = utils.getValueAsDateRange(newValue);
      }
      else if (newValue) {
        newValueAsDate = date.dateFromISO(newValue);
      }
      else {
        newValueAsDate = undefined;
      }
      if (!this.valueAsDateChangedExternally && newValueAsDate !== this.valueAsDate) {
        this.valueAsDate = newValueAsDate;
      }
      this.localizeInputValues();
    }
    this.userChangedValue = false;
  }
  valueAsDateWatcher(valueAsDate) {
    this.datePickerActiveDate = valueAsDate;
    const newValue = this.range && Array.isArray(valueAsDate)
      ? [date.dateToISO(valueAsDate[0]), date.dateToISO(valueAsDate[1])]
      : date.dateToISO(valueAsDate);
    if (this.value !== newValue) {
      this.valueAsDateChangedExternally = true;
      this.value = newValue;
      this.valueAsDateChangedExternally = false;
    }
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements();
    this.reposition(true);
  }
  onMinChanged(min) {
    if (min) {
      this.minAsDate = date.dateFromISO(min);
    }
  }
  onMaxChanged(max) {
    if (max) {
      this.maxAsDate = date.dateFromISO(max);
    }
  }
  openHandler(value) {
    if (this.disabled || this.readOnly) {
      if (!value) {
        floatingUi.updateAfterClose(this.floatingEl);
      }
      this.open = false;
      return;
    }
    if (value) {
      this.reposition(true);
    }
    else {
      floatingUi.updateAfterClose(this.floatingEl);
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
    await loadable.componentLoaded(this);
    this.el.focus();
  }
  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  async reposition(delayed = false) {
    const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;
    return floatingUi.reposition(this, {
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
    locale.connectLocalized(this);
    const { open } = this;
    open && this.openHandler(open);
    if (Array.isArray(this.value)) {
      this.valueAsDate = utils.getValueAsDateRange(this.value);
    }
    else if (this.value) {
      try {
        this.valueAsDate = date.dateFromISO(this.value);
      }
      catch (error) {
        this.warnAboutInvalidValue(this.value);
        this.value = "";
      }
    }
    else if (this.range && this.valueAsDate) {
      this.setRangeValue(this.valueAsDate);
    }
    if (this.min) {
      this.minAsDate = date.dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = date.dateFromISO(this.max);
    }
    label.connectLabel(this);
    form.connectForm(this);
    openCloseComponent.connectOpenCloseComponent(this);
    this.setFilteredPlacements();
    this.reposition(true);
    locale.numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
  }
  async componentWillLoad() {
    loadable.setUpLoadableComponent(this);
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
    this.localizeInputValues();
    this.reposition(true);
  }
  disconnectedCallback() {
    label.disconnectLabel(this);
    form.disconnectForm(this);
    floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    openCloseComponent.disconnectOpenCloseComponent(this);
    locale.disconnectLocalized(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this);
  }
  render() {
    var _a, _b;
    const { disabled, effectiveLocale, numberingSystem, readOnly } = this;
    locale.numberStringFormatter.numberFormatOptions = {
      numberingSystem,
      locale: effectiveLocale,
      useGrouping: false
    };
    return (index.h(index.Host, { onBlur: this.deactivate, onKeyDown: this.keyDownHandler, role: "application" }, this.localeData && (index.h("div", { "aria-expanded": dom.toAriaBoolean(this.open), class: "input-container", role: "application" }, index.h("div", { class: "input-wrapper",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setStartWrapper }, index.h("calcite-input", { class: `input ${this.layout === "vertical" && this.range ? `no-bottom-border` : ``}`, disabled: disabled, icon: "calendar", label: label.getLabelText(this), "number-button-type": "none", numberingSystem: numberingSystem, onCalciteInputInput: this.calciteInternalInputInputHandler, onCalciteInternalInputBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputFocus: this.startInputFocus, placeholder: (_a = this.localeData) === null || _a === void 0 ? void 0 : _a.placeholder, readOnly: readOnly, scale: this.scale, type: "text",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setStartInput })), index.h("div", { "aria-hidden": dom.toAriaBoolean(!this.open), class: {
        [CSS.menu]: true,
        [CSS.menuActive]: this.open
      },
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setFloatingEl }, index.h("div", { class: {
        ["calendar-picker-wrapper"]: true,
        ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
        [floatingUi.FloatingCSS.animation]: true,
        [floatingUi.FloatingCSS.animationActive]: this.open
      },
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setTransitionEl }, index.h("calcite-date-picker", { activeDate: this.datePickerActiveDate, activeRange: this.focusedInput, headingLevel: this.headingLevel, max: this.max, maxAsDate: this.maxAsDate, messageOverrides: this.messageOverrides, min: this.min, minAsDate: this.minAsDate, numberingSystem: numberingSystem, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, scale: this.scale, tabIndex: 0, valueAsDate: this.valueAsDate }))), this.range && this.layout === "horizontal" && (index.h("div", { class: "horizontal-arrow-container" }, index.h("calcite-icon", { flipRtl: true, icon: "arrow-right", scale: this.scale === "l" ? "m" : "s" }))), this.range && this.layout === "vertical" && this.scale !== "s" && (index.h("div", { class: "vertical-arrow-container" }, index.h("calcite-icon", { icon: "arrow-down", scale: this.scale === "l" ? "m" : "s" }))), this.range && (index.h("div", { class: "input-wrapper",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setEndWrapper }, index.h("calcite-input", { class: {
        input: true,
        "border-top-color-one": this.layout === "vertical" && this.range
      }, disabled: disabled, icon: "calendar", "number-button-type": "none", numberingSystem: numberingSystem, onCalciteInputInput: this.calciteInternalInputInputHandler, onCalciteInternalInputBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputFocus: this.endInputFocus, placeholder: (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.placeholder, readOnly: readOnly, scale: this.scale, type: "text",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setEndInput }))))), index.h(form.HiddenFormInputSlot, { component: this })));
  }
  setReferenceEl() {
    const { focusedInput, layout, endWrapper, startWrapper } = this;
    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;
    floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
  commitValue() {
    const { focusedInput, value } = this;
    const focusedInputName = `${focusedInput}Input`;
    const focusedInputValue = this[focusedInputName].value;
    const date$1 = date.dateFromLocalizedString(focusedInputValue, this.localeData);
    const dateAsISO = date.dateToISO(date$1);
    const valueIsArray = Array.isArray(value);
    if (this.range) {
      const focusedInputValueIndex = focusedInput === "start" ? 0 : 1;
      if (valueIsArray) {
        if (dateAsISO === value[focusedInputValueIndex]) {
          return;
        }
        if (date$1) {
          this.setRangeValue([
            focusedInput === "start" ? date$1 : date.dateFromISO(value[0]),
            focusedInput === "end" ? date$1 : date.dateFromISO(value[1])
          ]);
          this.localizeInputValues();
        }
        else {
          this.setRangeValue([
            focusedInput === "end" && date.dateFromISO(value[0]),
            focusedInput === "start" && date.dateFromISO(value[1])
          ]);
        }
      }
      else {
        if (date$1) {
          this.setRangeValue([
            focusedInput === "start" ? date$1 : date.dateFromISO(value[0]),
            focusedInput === "end" ? date$1 : date.dateFromISO(value[1])
          ]);
          this.localizeInputValues();
        }
      }
    }
    else {
      if (dateAsISO === value) {
        return;
      }
      this.setValue(date$1);
      this.localizeInputValues();
    }
  }
  async loadLocaleData() {
    locale.numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
    this.localeData = await utils.getLocaleData(this.effectiveLocale);
    this.localizeInputValues();
  }
  shouldFocusRangeStart() {
    const startValue = this.value[0] || undefined;
    const endValue = this.value[1] || undefined;
    return !!(endValue && !startValue && this.focusedInput === "end" && this.startInput);
  }
  shouldFocusRangeEnd() {
    const startValue = this.value[0] || undefined;
    const endValue = this.value[1] || undefined;
    return !!(startValue && !endValue && this.focusedInput === "start" && this.endInput);
  }
  localizeInputValues() {
    const date$1 = date.dateFromRange((this.range
      ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
      : this.valueAsDate), this.minAsDate, this.maxAsDate);
    const endDate = this.range
      ? date.dateFromRange((Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined, this.minAsDate, this.maxAsDate)
      : null;
    const localizedDate = date$1 && this.formatNumerals(date$1.toLocaleDateString(this.effectiveLocale));
    const localizedEndDate = endDate && this.formatNumerals(endDate.toLocaleDateString(this.effectiveLocale));
    localizedDate && this.setInputValue(localizedDate, "start");
    this.range && localizedEndDate && this.setInputValue(localizedEndDate, "end");
  }
  warnAboutInvalidValue(value) {
    console.warn(`The specified value "${value}" does not conform to the required format, "YYYY-MM-DD".`);
  }
  static get delegatesFocus() { return true; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "disabled": ["handleDisabledAndReadOnlyChange"],
    "readOnly": ["handleDisabledAndReadOnlyChange"],
    "value": ["valueWatcher"],
    "valueAsDate": ["valueAsDateWatcher"],
    "flipPlacements": ["flipPlacementsHandler"],
    "min": ["onMinChanged"],
    "max": ["onMaxChanged"],
    "open": ["openHandler"],
    "overlayPositioning": ["overlayPositioningHandler"],
    "layout": ["setReferenceEl"],
    "focusedInput": ["setReferenceEl"],
    "effectiveLocale": ["loadLocaleData"]
  }; }
};
InputDatePicker.style = inputDatePickerCss;

exports.calcite_input_date_picker = InputDatePicker;
