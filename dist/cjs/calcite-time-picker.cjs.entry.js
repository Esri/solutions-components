/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const key = require('./key-d55baa11.js');
const locale = require('./locale-e2cae6e8.js');
const t9n = require('./t9n-4664a8db.js');
const time = require('./time-5ab047b1.js');
const loadable = require('./loadable-c64a459b.js');
require('./dom-24094fab.js');
require('./guid-c58d5ead.js');
require('./resources-1f836572.js');
require('./observers-b0934d2a.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const CSS = {
  button: "button",
  buttonBottomLeft: "button--bottom-left",
  buttonBottomRight: "button--bottom-right",
  buttonHourDown: "button--hour-down",
  buttonHourUp: "button--hour-up",
  buttonMeridiemDown: "button--meridiem-down",
  buttonMeridiemUp: "button--meridiem-up",
  buttonMinuteDown: "button--minute-down",
  buttonMinuteUp: "button--minute-up",
  buttonSecondDown: "button--second-down",
  buttonSecondUp: "button--second-up",
  buttonTopLeft: "button--top-left",
  buttonTopRight: "button--top-right",
  column: "column",
  delimiter: "delimiter",
  hour: "hour",
  input: "input",
  meridiem: "meridiem",
  minute: "minute",
  second: "second",
  showMeridiem: "show-meridiem",
  showSecond: "show-second",
  "scale-s": "scale-s",
  "scale-m": "scale-m",
  "scale-l": "scale-l",
  timePicker: "time-picker",
  meridiemStart: "meridiem--start"
};

const timePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{display:inline-block}.time-picker{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;background-color:var(--calcite-ui-foreground-1);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-radius:var(--calcite-border-radius)}.time-picker .column{display:flex;flex-direction:column}.time-picker .meridiem--start{order:-1}.time-picker .button{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-ui-foreground-1)}.time-picker .button:hover,.time-picker .button:focus{background-color:var(--calcite-ui-foreground-2);outline:2px solid transparent;outline-offset:2px;z-index:400;outline-offset:0}.time-picker .button:active{background-color:var(--calcite-ui-foreground-3)}.time-picker .button.top-left{border-start-start-radius:var(--calcite-border-radius)}.time-picker .button.bottom-left{border-end-start-radius:var(--calcite-border-radius)}.time-picker .button.top-right{border-start-end-radius:var(--calcite-border-radius)}.time-picker .button.bottom-right{border-end-end-radius:var(--calcite-border-radius)}.time-picker .button calcite-icon{color:var(--calcite-ui-text-3)}.time-picker .input{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-ui-foreground-1);font-weight:var(--calcite-font-weight-medium)}.time-picker .input:hover{box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-2);z-index:400}.time-picker .input:focus,.time-picker .input:hover:focus{outline:2px solid transparent;outline-offset:2px;box-shadow:inset 0 0 0 2px var(--calcite-ui-brand);z-index:400;outline-offset:0}.time-picker.scale-s{font-size:var(--calcite-font-size--1)}.time-picker.scale-s .button,.time-picker.scale-s .input{padding-inline:0.75rem;padding-block:0.25rem}.time-picker.scale-s:not(.show-meridiem) .delimiter:last-child{-webkit-padding-end:0.75rem;padding-inline-end:0.75rem}.time-picker.scale-m{font-size:var(--calcite-font-size-0)}.time-picker.scale-m .button,.time-picker.scale-m .input{padding-inline:1rem;padding-block:0.5rem}.time-picker.scale-m:not(.show-meridiem) .delimiter:last-child{-webkit-padding-end:1rem;padding-inline-end:1rem}.time-picker.scale-l{font-size:var(--calcite-font-size-1)}.time-picker.scale-l .button,.time-picker.scale-l .input{padding-inline:1.25rem;padding-block:0.75rem}.time-picker.scale-l:not(.show-meridiem) .delimiter:last-child{-webkit-padding-end:1.25rem;padding-inline-end:1.25rem}";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const TimePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInternalTimePickerBlur = index.createEvent(this, "calciteInternalTimePickerBlur", 6);
    this.calciteInternalTimePickerChange = index.createEvent(this, "calciteInternalTimePickerChange", 6);
    this.calciteInternalTimePickerFocus = index.createEvent(this, "calciteInternalTimePickerFocus", 6);
    this.decrementHour = () => {
      const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
      this.setValuePart("hour", newHour);
    };
    this.decrementMeridiem = () => {
      const newMeridiem = this.meridiem === "PM" ? "AM" : "PM";
      this.setValuePart("meridiem", newMeridiem);
    };
    this.decrementMinuteOrSecond = (key) => {
      let newValue;
      if (locale.isValidNumber(this[key])) {
        const valueAsNumber = parseInt(this[key]);
        newValue = valueAsNumber === 0 ? 59 : valueAsNumber - 1;
      }
      else {
        newValue = 59;
      }
      this.setValuePart(key, newValue);
    };
    this.decrementMinute = () => {
      this.decrementMinuteOrSecond("minute");
    };
    this.decrementSecond = () => {
      this.decrementMinuteOrSecond("second");
    };
    this.focusHandler = (event) => {
      this.activeEl = event.currentTarget;
    };
    this.hourDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementHour();
      }
    };
    this.hourKeyDownHandler = (event) => {
      const { key: key$1 } = event;
      if (key.numberKeys.includes(key$1)) {
        const keyAsNumber = parseInt(key$1);
        let newHour;
        if (locale.isValidNumber(this.hour)) {
          switch (this.hourCycle) {
            case "12":
              newHour =
                this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2
                  ? `1${keyAsNumber}`
                  : keyAsNumber;
              break;
            case "24":
              if (this.hour === "01") {
                newHour = `1${keyAsNumber}`;
              }
              else if (this.hour === "02" && keyAsNumber >= 0 && keyAsNumber <= 3) {
                newHour = `2${keyAsNumber}`;
              }
              else {
                newHour = keyAsNumber;
              }
              break;
          }
        }
        else {
          newHour = keyAsNumber;
        }
        this.setValuePart("hour", newHour);
      }
      else {
        switch (key$1) {
          case "Backspace":
          case "Delete":
            this.setValuePart("hour", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementHour();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementHour();
            break;
          case " ":
            event.preventDefault();
            break;
        }
      }
    };
    this.hourUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementHour();
      }
    };
    this.incrementMeridiem = () => {
      const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
      this.setValuePart("meridiem", newMeridiem);
    };
    this.incrementHour = () => {
      const newHour = locale.isValidNumber(this.hour)
        ? this.hour === "23"
          ? 0
          : parseInt(this.hour) + 1
        : 1;
      this.setValuePart("hour", newHour);
    };
    this.incrementMinuteOrSecond = (key) => {
      const newValue = locale.isValidNumber(this[key])
        ? this[key] === "59"
          ? 0
          : parseInt(this[key]) + 1
        : 0;
      this.setValuePart(key, newValue);
    };
    this.incrementMinute = () => {
      this.incrementMinuteOrSecond("minute");
    };
    this.incrementSecond = () => {
      this.incrementMinuteOrSecond("second");
    };
    this.meridiemDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementMeridiem();
      }
    };
    this.meridiemKeyDownHandler = (event) => {
      switch (event.key) {
        case "a":
          this.setValuePart("meridiem", "AM");
          break;
        case "p":
          this.setValuePart("meridiem", "PM");
          break;
        case "Backspace":
        case "Delete":
          this.setValuePart("meridiem", null);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementMeridiem();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementMeridiem();
          break;
        case " ":
          event.preventDefault();
          break;
      }
    };
    this.meridiemUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementMeridiem();
      }
    };
    this.minuteDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementMinute();
      }
    };
    this.minuteKeyDownHandler = (event) => {
      const { key: key$1 } = event;
      if (key.numberKeys.includes(key$1)) {
        const keyAsNumber = parseInt(key$1);
        let newMinute;
        if (locale.isValidNumber(this.minute) && this.minute.startsWith("0")) {
          const minuteAsNumber = parseInt(this.minute);
          newMinute =
            minuteAsNumber > time.maxTenthForMinuteAndSecond
              ? keyAsNumber
              : `${minuteAsNumber}${keyAsNumber}`;
        }
        else {
          newMinute = keyAsNumber;
        }
        this.setValuePart("minute", newMinute);
      }
      else {
        switch (key$1) {
          case "Backspace":
          case "Delete":
            this.setValuePart("minute", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementMinute();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementMinute();
            break;
          case " ":
            event.preventDefault();
            break;
        }
      }
    };
    this.minuteUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementMinute();
      }
    };
    this.secondDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementSecond();
      }
    };
    this.secondKeyDownHandler = (event) => {
      const { key: key$1 } = event;
      if (key.numberKeys.includes(key$1)) {
        const keyAsNumber = parseInt(key$1);
        let newSecond;
        if (locale.isValidNumber(this.second) && this.second.startsWith("0")) {
          const secondAsNumber = parseInt(this.second);
          newSecond =
            secondAsNumber > time.maxTenthForMinuteAndSecond
              ? keyAsNumber
              : `${secondAsNumber}${keyAsNumber}`;
        }
        else {
          newSecond = keyAsNumber;
        }
        this.setValuePart("second", newSecond);
      }
      else {
        switch (key$1) {
          case "Backspace":
          case "Delete":
            this.setValuePart("second", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementSecond();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementSecond();
            break;
          case " ":
            event.preventDefault();
            break;
        }
      }
    };
    this.secondUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementSecond();
      }
    };
    this.setHourEl = (el) => (this.hourEl = el);
    this.setMeridiemEl = (el) => (this.meridiemEl = el);
    this.setMinuteEl = (el) => (this.minuteEl = el);
    this.setSecondEl = (el) => (this.secondEl = el);
    this.setValue = (value, emit = true) => {
      if (time.isValidTime(value)) {
        const { hour, minute, second } = time.parseTimeString(value);
        const { effectiveLocale: locale, numberingSystem } = this;
        const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond, localizedSecondSuffix, localizedMeridiem } = time.localizeTimeStringToParts({ value, locale, numberingSystem });
        this.localizedHour = localizedHour;
        this.localizedHourSuffix = localizedHourSuffix;
        this.localizedMinute = localizedMinute;
        this.localizedMinuteSuffix = localizedMinuteSuffix;
        this.localizedSecond = localizedSecond;
        this.localizedSecondSuffix = localizedSecondSuffix;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        if (localizedMeridiem) {
          this.localizedMeridiem = localizedMeridiem;
          this.meridiem = time.getMeridiem(this.hour);
          const formatParts = time.getTimeParts({ value, locale, numberingSystem });
          this.meridiemOrder = this.getMeridiemOrder(formatParts);
        }
      }
      else {
        this.hour = null;
        this.localizedHour = null;
        this.localizedHourSuffix = null;
        this.localizedMeridiem = null;
        this.localizedMinute = null;
        this.localizedMinuteSuffix = null;
        this.localizedSecond = null;
        this.localizedSecondSuffix = null;
        this.meridiem = null;
        this.minute = null;
        this.second = null;
        this.value = null;
      }
      if (emit) {
        this.calciteInternalTimePickerChange.emit();
      }
    };
    this.setValuePart = (key, value, emit = true) => {
      var _a;
      const { effectiveLocale: locale$1, numberingSystem } = this;
      if (key === "meridiem") {
        this.meridiem = value;
        if (locale.isValidNumber(this.hour)) {
          const hourAsNumber = parseInt(this.hour);
          switch (value) {
            case "AM":
              if (hourAsNumber >= 12) {
                this.hour = time.formatTimePart(hourAsNumber - 12);
              }
              break;
            case "PM":
              if (hourAsNumber < 12) {
                this.hour = time.formatTimePart(hourAsNumber + 12);
              }
              break;
          }
          this.localizedHour = time.localizeTimePart({
            value: this.hour,
            part: "hour",
            locale: locale$1,
            numberingSystem
          });
        }
      }
      else {
        this[key] = typeof value === "number" ? time.formatTimePart(value) : value;
        this[`localized${capitalize(key)}`] = time.localizeTimePart({
          value: this[key],
          part: key,
          locale: locale$1,
          numberingSystem
        });
      }
      if (this.hour && this.minute) {
        const showSeconds = this.second && this.showSecond;
        this.value = `${this.hour}:${this.minute}:${showSeconds ? this.second : "00"}`;
      }
      else {
        this.value = null;
      }
      this.localizedMeridiem = this.value
        ? ((_a = time.localizeTimeStringToParts({ value: this.value, locale: locale$1, numberingSystem })) === null || _a === void 0 ? void 0 : _a.localizedMeridiem) || null
        : time.localizeTimePart({ value: this.meridiem, part: "meridiem", locale: locale$1, numberingSystem });
      if (emit) {
        this.calciteInternalTimePickerChange.emit();
      }
    };
    this.scale = "m";
    this.step = 60;
    this.numberingSystem = undefined;
    this.value = null;
    this.messages = undefined;
    this.messageOverrides = undefined;
    this.effectiveLocale = "";
    this.hour = undefined;
    this.hourCycle = undefined;
    this.localizedHour = undefined;
    this.localizedHourSuffix = undefined;
    this.localizedMeridiem = undefined;
    this.localizedMinute = undefined;
    this.localizedMinuteSuffix = undefined;
    this.localizedSecond = undefined;
    this.localizedSecondSuffix = undefined;
    this.meridiem = undefined;
    this.minute = undefined;
    this.second = undefined;
    this.showSecond = this.step < 60;
    this.defaultMessages = undefined;
  }
  valueWatcher(newValue) {
    this.setValue(newValue, false);
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  effectiveLocaleWatcher() {
    this.updateLocale();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  hostBlurHandler() {
    this.calciteInternalTimePickerBlur.emit();
  }
  hostFocusHandler() {
    this.calciteInternalTimePickerFocus.emit();
  }
  keyDownHandler(event) {
    const { defaultPrevented, key } = event;
    if (defaultPrevented) {
      return;
    }
    switch (this.activeEl) {
      case this.hourEl:
        if (key === "ArrowRight") {
          this.focusPart("minute");
          event.preventDefault();
        }
        break;
      case this.minuteEl:
        switch (key) {
          case "ArrowLeft":
            this.focusPart("hour");
            event.preventDefault();
            break;
          case "ArrowRight":
            if (this.step !== 60) {
              this.focusPart("second");
              event.preventDefault();
            }
            else if (this.hourCycle === "12") {
              this.focusPart("meridiem");
              event.preventDefault();
            }
            break;
        }
        break;
      case this.secondEl:
        switch (key) {
          case "ArrowLeft":
            this.focusPart("minute");
            event.preventDefault();
            break;
          case "ArrowRight":
            if (this.hourCycle === "12") {
              this.focusPart("meridiem");
              event.preventDefault();
            }
            break;
        }
        break;
      case this.meridiemEl:
        switch (key) {
          case "ArrowLeft":
            if (this.step !== 60) {
              this.focusPart("second");
              event.preventDefault();
            }
            else {
              this.focusPart("minute");
              event.preventDefault();
            }
            break;
        }
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Sets focus on the component's first focusable element.
   */
  async setFocus() {
    var _a;
    await loadable.componentLoaded(this);
    (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  async focusPart(target) {
    var _a;
    await loadable.componentLoaded(this);
    (_a = this[`${target || "hour"}El`]) === null || _a === void 0 ? void 0 : _a.focus();
  }
  buttonActivated(event) {
    const { key: key$1 } = event;
    if (key$1 === " ") {
      event.preventDefault();
    }
    return key.isActivationKey(key$1);
  }
  getMeridiemOrder(formatParts) {
    const locale = this.effectiveLocale;
    const isRTLKind = locale === "ar" || locale === "he";
    if (formatParts && !isRTLKind) {
      const index = formatParts.findIndex((parts) => {
        return parts.value === this.localizedMeridiem;
      });
      return index;
    }
    return 0;
  }
  updateLocale() {
    t9n.updateMessages(this, this.effectiveLocale);
    this.hourCycle = time.getLocaleHourCycle(this.effectiveLocale, this.numberingSystem);
    this.setValue(this.value, false);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    locale.connectLocalized(this);
    this.updateLocale();
    t9n.connectMessages(this);
    this.meridiemOrder = this.getMeridiemOrder(time.getTimeParts({
      value: "0:00:00",
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem
    }));
  }
  async componentWillLoad() {
    loadable.setUpLoadableComponent(this);
    await t9n.setUpMessages(this);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
  }
  disconnectedCallback() {
    locale.disconnectLocalized(this);
    t9n.disconnectMessages(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const hourIsNumber = locale.isValidNumber(this.hour);
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const minuteIsNumber = locale.isValidNumber(this.minute);
    const secondIsNumber = locale.isValidNumber(this.second);
    const showMeridiem = this.hourCycle === "12";
    return (index.h("div", { class: {
        [CSS.timePicker]: true,
        [CSS.showMeridiem]: showMeridiem,
        [CSS.showSecond]: this.showSecond,
        [CSS[`scale-${this.scale}`]]: true
      }, dir: "ltr" }, index.h("div", { class: CSS.column, role: "group" }, index.h("span", { "aria-label": this.messages.hourUp, class: {
        [CSS.button]: true,
        [CSS.buttonHourUp]: true,
        [CSS.buttonTopLeft]: true
      }, onClick: this.incrementHour, onKeyDown: this.hourUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-up", scale: iconScale })), index.h("span", { "aria-label": this.messages.hour, "aria-valuemax": "23", "aria-valuemin": "1", "aria-valuenow": (hourIsNumber && parseInt(this.hour)) || "0", "aria-valuetext": this.hour, class: {
        [CSS.input]: true,
        [CSS.hour]: true
      }, onFocus: this.focusHandler, onKeyDown: this.hourKeyDownHandler, role: "spinbutton", tabIndex: 0,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setHourEl }, this.localizedHour || "--"), index.h("span", { "aria-label": this.messages.hourDown, class: {
        [CSS.button]: true,
        [CSS.buttonHourDown]: true,
        [CSS.buttonBottomLeft]: true
      }, onClick: this.decrementHour, onKeyDown: this.hourDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-down", scale: iconScale }))), index.h("span", { class: CSS.delimiter }, this.localizedHourSuffix), index.h("div", { class: CSS.column, role: "group" }, index.h("span", { "aria-label": this.messages.minuteUp, class: {
        [CSS.button]: true,
        [CSS.buttonMinuteUp]: true
      }, onClick: this.incrementMinute, onKeyDown: this.minuteUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-up", scale: iconScale })), index.h("span", { "aria-label": this.messages.minute, "aria-valuemax": "12", "aria-valuemin": "1", "aria-valuenow": (minuteIsNumber && parseInt(this.minute)) || "0", "aria-valuetext": this.minute, class: {
        [CSS.input]: true,
        [CSS.minute]: true
      }, onFocus: this.focusHandler, onKeyDown: this.minuteKeyDownHandler, role: "spinbutton", tabIndex: 0,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setMinuteEl }, this.localizedMinute || "--"), index.h("span", { "aria-label": this.messages.minuteDown, class: {
        [CSS.button]: true,
        [CSS.buttonMinuteDown]: true
      }, onClick: this.decrementMinute, onKeyDown: this.minuteDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-down", scale: iconScale }))), this.showSecond && index.h("span", { class: CSS.delimiter }, this.localizedMinuteSuffix), this.showSecond && (index.h("div", { class: CSS.column, role: "group" }, index.h("span", { "aria-label": this.messages.secondUp, class: {
        [CSS.button]: true,
        [CSS.buttonSecondUp]: true
      }, onClick: this.incrementSecond, onKeyDown: this.secondUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-up", scale: iconScale })), index.h("span", { "aria-label": this.messages.second, "aria-valuemax": "59", "aria-valuemin": "0", "aria-valuenow": (secondIsNumber && parseInt(this.second)) || "0", "aria-valuetext": this.second, class: {
        [CSS.input]: true,
        [CSS.second]: true
      }, onFocus: this.focusHandler, onKeyDown: this.secondKeyDownHandler, role: "spinbutton", tabIndex: 0,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setSecondEl }, this.localizedSecond || "--"), index.h("span", { "aria-label": this.messages.secondDown, class: {
        [CSS.button]: true,
        [CSS.buttonSecondDown]: true
      }, onClick: this.decrementSecond, onKeyDown: this.secondDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-down", scale: iconScale })))), this.localizedSecondSuffix && (index.h("span", { class: CSS.delimiter }, this.localizedSecondSuffix)), showMeridiem && (index.h("div", { class: {
        [CSS.column]: true,
        [CSS.meridiemStart]: this.meridiemOrder === 0
      }, role: "group" }, index.h("span", { "aria-label": this.messages.meridiemUp, class: {
        [CSS.button]: true,
        [CSS.buttonMeridiemUp]: true,
        [CSS.buttonTopRight]: true
      }, onClick: this.incrementMeridiem, onKeyDown: this.meridiemUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-up", scale: iconScale })), index.h("span", { "aria-label": this.messages.meridiem, "aria-valuemax": "2", "aria-valuemin": "1", "aria-valuenow": (this.meridiem === "PM" && "2") || "1", "aria-valuetext": this.meridiem, class: {
        [CSS.input]: true,
        [CSS.meridiem]: true
      }, onFocus: this.focusHandler, onKeyDown: this.meridiemKeyDownHandler, role: "spinbutton", tabIndex: 0,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setMeridiemEl }, this.localizedMeridiem || "--"), index.h("span", { "aria-label": this.messages.meridiemDown, class: {
        [CSS.button]: true,
        [CSS.buttonMeridiemDown]: true,
        [CSS.buttonBottomRight]: true
      }, onClick: this.decrementMeridiem, onKeyDown: this.meridiemDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, index.h("calcite-icon", { icon: "chevron-down", scale: iconScale }))))));
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueWatcher"],
    "messageOverrides": ["onMessagesChange"],
    "effectiveLocale": ["effectiveLocaleWatcher"]
  }; }
};
TimePicker.style = timePickerCss;

exports.calcite_time_picker = TimePicker;
