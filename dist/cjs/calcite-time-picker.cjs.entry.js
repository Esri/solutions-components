/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const key = require('./key-47c9469a.js');
const locale = require('./locale-da840314.js');
const t9n = require('./t9n-ed5c03a7.js');
const time = require('./time-a92ca33f.js');
const component = require('./component-5d190962.js');
const loadable = require('./loadable-1c888c87.js');
const math = require('./math-089392ef.js');
require('./dom-795d4a33.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./observers-18d87cb5.js');
require('./browser-333a21c5.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    button: "button",
    buttonBottomLeft: "button--bottom-left",
    buttonBottomRight: "button--bottom-right",
    buttonFractionalSecondDown: "button--fractionalSecond-down",
    buttonFractionalSecondUp: "button--fractionalSecond-up",
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
    fractionalSecond: "fractionalSecond",
    hour: "hour",
    input: "input",
    inputFocus: "inputFocus",
    meridiem: "meridiem",
    minute: "minute",
    second: "second",
    showMeridiem: "show-meridiem",
    showSecond: "show-second",
    "scale-s": "scale-s",
    "scale-m": "scale-m",
    "scale-l": "scale-l",
    timePicker: "time-picker",
    meridiemStart: "meridiem--start",
};

const timePickerCss = ":host{display:inline-block}.time-picker{display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;background-color:var(--calcite-color-foreground-1);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-radius:var(--calcite-border-radius)}.time-picker .column{display:flex;flex-direction:column}.time-picker .meridiem--start{order:-1}.time-picker .button{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1)}.time-picker .button:hover,.time-picker .button:focus{background-color:var(--calcite-color-foreground-2);outline:2px solid transparent;outline-offset:2px;z-index:var(--calcite-z-index-header);outline-offset:0}.time-picker .button:active{background-color:var(--calcite-color-foreground-3)}.time-picker .button.top-left{border-start-start-radius:var(--calcite-border-radius)}.time-picker .button.bottom-left{border-end-start-radius:var(--calcite-border-radius)}.time-picker .button.top-right{border-start-end-radius:var(--calcite-border-radius)}.time-picker .button.bottom-right{border-end-end-radius:var(--calcite-border-radius)}.time-picker .button calcite-icon{color:var(--calcite-color-text-3)}.time-picker .input{display:inline-flex;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);font-weight:var(--calcite-font-weight-medium)}.time-picker .input:hover{box-shadow:inset 0 0 0 2px var(--calcite-color-foreground-2);z-index:var(--calcite-z-index-header)}.time-picker .input:focus,.time-picker .input:hover:focus{outline:2px solid transparent;outline-offset:2px;outline-offset:0}.time-picker .input.inputFocus,.time-picker .input:hover.inputFocus{box-shadow:inset 0 0 0 2px var(--calcite-color-brand);z-index:var(--calcite-z-index-header)}.time-picker.scale-s{font-size:var(--calcite-font-size--1)}.time-picker.scale-s .button,.time-picker.scale-s .input{padding-inline:0.75rem;padding-block:0.25rem}.time-picker.scale-s:not(.show-meridiem) .delimiter:last-child{padding-inline-end:0.75rem}.time-picker.scale-m{font-size:var(--calcite-font-size-0)}.time-picker.scale-m .button,.time-picker.scale-m .input{padding-inline:1rem;padding-block:0.5rem}.time-picker.scale-m:not(.show-meridiem) .delimiter:last-child{padding-inline-end:1rem}.time-picker.scale-l{font-size:var(--calcite-font-size-1)}.time-picker.scale-l .button,.time-picker.scale-l .input{padding-inline:1.25rem;padding-block:0.75rem}.time-picker.scale-l:not(.show-meridiem) .delimiter:last-child{padding-inline-end:1.25rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTimePickerStyle0 = timePickerCss;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const TimePicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalTimePickerChange = index.createEvent(this, "calciteInternalTimePickerChange", 6);
        this.pointerActivated = false;
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
            if (this.pointerActivated) {
                return;
            }
            this.activeEl = event.currentTarget;
        };
        this.fractionalSecondKeyDownHandler = (event) => {
            const { key: key$1 } = event;
            if (key.numberKeys.includes(key$1)) {
                const stepPrecision = math.decimalPlaces(this.step);
                const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
                const fractionalSecondAsIntegerLength = fractionalSecondAsInteger.toString().length;
                let newFractionalSecondAsIntegerString;
                if (fractionalSecondAsIntegerLength >= stepPrecision) {
                    newFractionalSecondAsIntegerString = key$1.padStart(stepPrecision, "0");
                }
                else if (fractionalSecondAsIntegerLength < stepPrecision) {
                    newFractionalSecondAsIntegerString = `${fractionalSecondAsInteger}${key$1}`.padStart(stepPrecision, "0");
                }
                this.setValuePart("fractionalSecond", parseFloat(`0.${newFractionalSecondAsIntegerString}`));
            }
            else {
                switch (key$1) {
                    case "Backspace":
                    case "Delete":
                        this.setValuePart("fractionalSecond", null);
                        break;
                    case "ArrowDown":
                        event.preventDefault();
                        this.nudgeFractionalSecond("down");
                        break;
                    case "ArrowUp":
                        event.preventDefault();
                        this.nudgeFractionalSecond("up");
                        break;
                    case " ":
                        event.preventDefault();
                        break;
                }
            }
        };
        this.fractionalSecondDownClickHandler = () => {
            this.activeEl = this.fractionalSecondEl;
            this.fractionalSecondEl.focus();
            this.nudgeFractionalSecond("down");
        };
        this.fractionalSecondUpClickHandler = () => {
            this.activeEl = this.fractionalSecondEl;
            this.fractionalSecondEl.focus();
            this.nudgeFractionalSecond("up");
        };
        this.hourDownClickHandler = () => {
            this.activeEl = this.hourEl;
            this.hourEl.focus();
            this.decrementHour();
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
        this.hourUpClickHandler = () => {
            this.activeEl = this.hourEl;
            this.hourEl.focus();
            this.incrementHour();
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
        this.inputClickHandler = (event) => {
            this.activeEl = event.target;
        };
        this.meridiemUpClickHandler = () => {
            this.activeEl = this.meridiemEl;
            this.meridiemEl.focus();
            this.incrementMeridiem();
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
        this.meridiemDownClickHandler = () => {
            this.activeEl = this.meridiemEl;
            this.meridiemEl.focus();
            this.decrementMeridiem();
        };
        this.minuteDownClickHandler = () => {
            this.activeEl = this.minuteEl;
            this.minuteEl.focus();
            this.decrementMinute();
        };
        this.minuteUpClickHandler = () => {
            this.activeEl = this.minuteEl;
            this.minuteEl.focus();
            this.incrementMinute();
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
        this.nudgeFractionalSecond = (direction) => {
            const stepDecimal = math.getDecimals(this.step);
            const stepPrecision = math.decimalPlaces(this.step);
            const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
            const fractionalSecondAsFloat = parseFloat(`0.${this.fractionalSecond}`);
            let nudgedValue;
            let nudgedValueRounded;
            let nudgedValueRoundedDecimals;
            let newFractionalSecond;
            if (direction === "up") {
                nudgedValue = isNaN(fractionalSecondAsInteger) ? 0 : fractionalSecondAsFloat + stepDecimal;
                nudgedValueRounded = parseFloat(nudgedValue.toFixed(stepPrecision));
                nudgedValueRoundedDecimals = math.getDecimals(nudgedValueRounded);
                newFractionalSecond =
                    nudgedValueRounded < 1 && math.decimalPlaces(nudgedValueRoundedDecimals) > 0
                        ? time.formatTimePart(nudgedValueRoundedDecimals, stepPrecision)
                        : "".padStart(stepPrecision, "0");
            }
            if (direction === "down") {
                nudgedValue =
                    isNaN(fractionalSecondAsInteger) || fractionalSecondAsInteger === 0
                        ? 1 - stepDecimal
                        : fractionalSecondAsFloat - stepDecimal;
                nudgedValueRounded = parseFloat(nudgedValue.toFixed(stepPrecision));
                nudgedValueRoundedDecimals = math.getDecimals(nudgedValueRounded);
                newFractionalSecond =
                    nudgedValueRounded < 1 &&
                        math.decimalPlaces(nudgedValueRoundedDecimals) > 0 &&
                        Math.sign(nudgedValueRoundedDecimals) === 1
                        ? time.formatTimePart(nudgedValueRoundedDecimals, stepPrecision)
                        : "".padStart(stepPrecision, "0");
            }
            this.setValuePart("fractionalSecond", newFractionalSecond);
        };
        this.sanitizeValue = (value) => {
            const { hour, minute, second, fractionalSecond } = time.parseTimeString(value);
            if (fractionalSecond) {
                const sanitizedFractionalSecond = this.sanitizeFractionalSecond(fractionalSecond);
                return `${hour}:${minute}:${second}.${sanitizedFractionalSecond}`;
            }
            return time.isValidTime(value) && value;
        };
        this.sanitizeFractionalSecond = (fractionalSecond) => fractionalSecond && math.decimalPlaces(this.step) !== fractionalSecond.length
            ? parseFloat(`0.${fractionalSecond}`).toFixed(math.decimalPlaces(this.step)).replace("0.", "")
            : fractionalSecond;
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
        this.secondDownClickHandler = () => {
            this.activeEl = this.secondEl;
            this.secondEl.focus();
            this.decrementSecond();
        };
        this.secondUpClickHandler = () => {
            this.activeEl = this.secondEl;
            this.secondEl.focus();
            this.incrementSecond();
        };
        this.setHourEl = (el) => (this.hourEl = el);
        this.setMeridiemEl = (el) => (this.meridiemEl = el);
        this.setMinuteEl = (el) => (this.minuteEl = el);
        this.setSecondEl = (el) => (this.secondEl = el);
        this.setFractionalSecondEl = (el) => (this.fractionalSecondEl = el);
        this.setValue = (value) => {
            if (time.isValidTime(value)) {
                const { hour, minute, second, fractionalSecond } = time.parseTimeString(value);
                const { effectiveLocale: locale, numberingSystem } = this;
                const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond, localizedDecimalSeparator, localizedFractionalSecond, localizedSecondSuffix, localizedMeridiem, } = time.localizeTimeStringToParts({ value, locale, numberingSystem });
                this.hour = hour;
                this.minute = minute;
                this.second = second;
                this.fractionalSecond = this.sanitizeFractionalSecond(fractionalSecond);
                this.localizedHour = localizedHour;
                this.localizedHourSuffix = localizedHourSuffix;
                this.localizedMinute = localizedMinute;
                this.localizedMinuteSuffix = localizedMinuteSuffix;
                this.localizedSecond = localizedSecond;
                this.localizedDecimalSeparator = localizedDecimalSeparator;
                this.localizedFractionalSecond = localizedFractionalSecond;
                this.localizedSecondSuffix = localizedSecondSuffix;
                if (localizedMeridiem) {
                    this.localizedMeridiem = localizedMeridiem;
                    this.meridiem = time.getMeridiem(this.hour);
                }
            }
            else {
                this.hour = null;
                this.fractionalSecond = null;
                this.localizedHour = null;
                this.localizedHourSuffix = time.getLocalizedTimePartSuffix("hour", this.effectiveLocale, this.numberingSystem);
                this.localizedMeridiem = null;
                this.localizedMinute = null;
                this.localizedMinuteSuffix = time.getLocalizedTimePartSuffix("minute", this.effectiveLocale, this.numberingSystem);
                this.localizedSecond = null;
                this.localizedDecimalSeparator = time.getLocalizedDecimalSeparator(this.effectiveLocale, this.numberingSystem);
                this.localizedFractionalSecond = null;
                this.localizedSecondSuffix = time.getLocalizedTimePartSuffix("second", this.effectiveLocale, this.numberingSystem);
                this.meridiem = null;
                this.minute = null;
                this.second = null;
                this.value = null;
            }
        };
        this.setValuePart = (key, value) => {
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
                        numberingSystem,
                    });
                }
            }
            else if (key === "fractionalSecond") {
                const stepPrecision = math.decimalPlaces(this.step);
                if (typeof value === "number") {
                    this.fractionalSecond =
                        value === 0 ? "".padStart(stepPrecision, "0") : time.formatTimePart(value, stepPrecision);
                }
                else {
                    this.fractionalSecond = value;
                }
                this.localizedFractionalSecond = time.localizeTimePart({
                    value: this.fractionalSecond,
                    part: "fractionalSecond",
                    locale: locale$1,
                    numberingSystem,
                });
            }
            else {
                this[key] = typeof value === "number" ? time.formatTimePart(value) : value;
                this[`localized${capitalize(key)}`] = time.localizeTimePart({
                    value: this[key],
                    part: key,
                    locale: locale$1,
                    numberingSystem,
                });
            }
            let emit = false;
            let newValue;
            if (this.hour && this.minute) {
                newValue = `${this.hour}:${this.minute}`;
                if (this.showSecond) {
                    newValue = `${newValue}:${this.second ?? "00"}`;
                    if (this.showFractionalSecond && this.fractionalSecond) {
                        newValue = `${newValue}.${this.fractionalSecond}`;
                    }
                }
            }
            else {
                newValue = null;
            }
            if (this.value !== newValue) {
                emit = true;
            }
            this.value = newValue;
            this.localizedMeridiem = this.value
                ? time.localizeTimeStringToParts({ value: this.value, locale: locale$1, numberingSystem })
                    ?.localizedMeridiem || null
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
        this.activeEl = undefined;
        this.effectiveLocale = "";
        this.fractionalSecond = undefined;
        this.hour = undefined;
        this.hourCycle = undefined;
        this.localizedDecimalSeparator = ".";
        this.localizedHour = undefined;
        this.localizedHourSuffix = undefined;
        this.localizedMeridiem = undefined;
        this.localizedFractionalSecond = undefined;
        this.localizedMinute = undefined;
        this.localizedMinuteSuffix = undefined;
        this.localizedSecond = undefined;
        this.localizedSecondSuffix = undefined;
        this.meridiem = undefined;
        this.minute = undefined;
        this.second = undefined;
        this.showFractionalSecond = undefined;
        this.showSecond = undefined;
        this.defaultMessages = undefined;
    }
    stepChange() {
        this.toggleSecond();
    }
    valueWatcher(newValue) {
        this.setValue(newValue);
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
    blurHandler() {
        this.activeEl = undefined;
        this.pointerActivated = false;
    }
    keyDownHandler(event) {
        this.pointerActivated = false;
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
                        if (this.showFractionalSecond) {
                            this.focusPart("fractionalSecond");
                        }
                        else if (this.hourCycle === "12") {
                            this.focusPart("meridiem");
                            event.preventDefault();
                        }
                        break;
                }
                break;
            case this.fractionalSecondEl:
                switch (key) {
                    case "ArrowLeft":
                        this.focusPart("second");
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
                        if (this.showFractionalSecond) {
                            this.focusPart("fractionalSecond");
                        }
                        else if (this.step !== 60) {
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
    pointerDownHandler() {
        this.pointerActivated = true;
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
        await loadable.componentFocusable(this);
        this.el?.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    async focusPart(target) {
        await loadable.componentFocusable(this);
        this[`${target || "hour"}El`]?.focus();
    }
    toggleSecond() {
        this.showSecond = this.step < 60;
        this.showFractionalSecond = math.decimalPlaces(this.step) > 0;
    }
    updateLocale() {
        t9n.updateMessages(this, this.effectiveLocale);
        this.hourCycle = time.getLocaleHourCycle(this.effectiveLocale, this.numberingSystem);
        this.localizedDecimalSeparator = time.getLocalizedDecimalSeparator(this.effectiveLocale, this.numberingSystem);
        this.meridiemOrder = time.getMeridiemOrder(this.effectiveLocale);
        this.setValue(this.sanitizeValue(this.value));
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
        this.toggleSecond();
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
        const iconScale = component.getIconScale(this.scale);
        const minuteIsNumber = locale.isValidNumber(this.minute);
        const secondIsNumber = locale.isValidNumber(this.second);
        const fractionalSecondIsNumber = locale.isValidNumber(this.fractionalSecond);
        const showMeridiem = this.hourCycle === "12";
        return (index.h("div", { key: 'e15ff4d20ae40919921b991d99c8c76625a73cfc', class: {
                [CSS.timePicker]: true,
                [CSS.showMeridiem]: showMeridiem,
                [CSS.showSecond]: this.showSecond,
                [CSS[`scale-${this.scale}`]]: true,
            }, dir: "ltr" }, index.h("div", { key: 'd4bfad89ac334afbb31bb4fc8e8fe386142f6d4b', class: CSS.column, role: "group" }, index.h("span", { key: 'ba564179d2ca507bbb659b9b38de09625afe35f2', "aria-label": this.messages.hourUp, class: {
                [CSS.button]: true,
                [CSS.buttonHourUp]: true,
                [CSS.buttonTopLeft]: true,
            }, onClick: this.hourUpClickHandler, role: "button" }, index.h("calcite-icon", { key: '5aa45f9254a0394584e214fc5173d2607a706832', icon: "chevron-up", scale: iconScale })), index.h("span", { key: '79e888572eabf36cefd24f15e06c4e36f0550b63', "aria-label": this.messages.hour, "aria-valuemax": "23", "aria-valuemin": "1", "aria-valuenow": (hourIsNumber && parseInt(this.hour)) || "0", "aria-valuetext": this.hour, class: {
                [CSS.input]: true,
                [CSS.hour]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.hourEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.hourKeyDownHandler, ref: this.setHourEl, role: "spinbutton", tabIndex: 0 }, this.localizedHour || "--"), index.h("span", { key: '6964ac9f00917c3da0b9161f14cfdc85c38dfef4', "aria-label": this.messages.hourDown, class: {
                [CSS.button]: true,
                [CSS.buttonHourDown]: true,
                [CSS.buttonBottomLeft]: true,
            }, onClick: this.hourDownClickHandler, role: "button" }, index.h("calcite-icon", { key: 'c3985301caa70272059aecfb18a29a0b7ba7fb83', icon: "chevron-down", scale: iconScale }))), index.h("span", { key: 'a9aa1571b4a9266276c7f684053b665397164582', class: CSS.delimiter }, this.localizedHourSuffix), index.h("div", { key: '0b1f353766357c699e1815af3105a5c0bc1d1a32', class: CSS.column, role: "group" }, index.h("span", { key: 'ed36c1fe986b96db3f8f50c6b518c78d5a1239d6', "aria-label": this.messages.minuteUp, class: {
                [CSS.button]: true,
                [CSS.buttonMinuteUp]: true,
            }, onClick: this.minuteUpClickHandler, role: "button" }, index.h("calcite-icon", { key: '7da952d6ef1a05f63367b5d67dd7625f0efc12f8', icon: "chevron-up", scale: iconScale })), index.h("span", { key: '90bc5c9b7d12a8a7769a42e4a4dc86053da03b22', "aria-label": this.messages.minute, "aria-valuemax": "12", "aria-valuemin": "1", "aria-valuenow": (minuteIsNumber && parseInt(this.minute)) || "0", "aria-valuetext": this.minute, class: {
                [CSS.input]: true,
                [CSS.minute]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.minuteEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.minuteKeyDownHandler, ref: this.setMinuteEl, role: "spinbutton", tabIndex: 0 }, this.localizedMinute || "--"), index.h("span", { key: '9ebd5b4a961b9b20758bab5a58d8778c6795db40', "aria-label": this.messages.minuteDown, class: {
                [CSS.button]: true,
                [CSS.buttonMinuteDown]: true,
            }, onClick: this.minuteDownClickHandler, role: "button" }, index.h("calcite-icon", { key: '2845804742fae9b51db039666ea693c1486d19bf', icon: "chevron-down", scale: iconScale }))), this.showSecond && index.h("span", { key: '0816f11d5eeb5478a6c1c9e0872f56ad4a1ecaa2', class: CSS.delimiter }, this.localizedMinuteSuffix), this.showSecond && (index.h("div", { key: '3b83633e26c0e024cb5084499f88edc7d72f79fc', class: CSS.column, role: "group" }, index.h("span", { key: '90a351d935269aa847aee19d0e91cbbb0b66d3df', "aria-label": this.messages.secondUp, class: {
                [CSS.button]: true,
                [CSS.buttonSecondUp]: true,
            }, onClick: this.secondUpClickHandler, role: "button" }, index.h("calcite-icon", { key: '56ec5929764834986e91054432a1ec1c746f4a45', icon: "chevron-up", scale: iconScale })), index.h("span", { key: 'c44f0a291d49a94141a1eaf03b9baea12365e417', "aria-label": this.messages.second, "aria-valuemax": "59", "aria-valuemin": "0", "aria-valuenow": (secondIsNumber && parseInt(this.second)) || "0", "aria-valuetext": this.second, class: {
                [CSS.input]: true,
                [CSS.second]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.secondEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.secondKeyDownHandler, ref: this.setSecondEl, role: "spinbutton", tabIndex: 0 }, this.localizedSecond || "--"), index.h("span", { key: '4009df6e3dc774e30cbd77fc01802bc8be2f8ddf', "aria-label": this.messages.secondDown, class: {
                [CSS.button]: true,
                [CSS.buttonSecondDown]: true,
            }, onClick: this.secondDownClickHandler, role: "button" }, index.h("calcite-icon", { key: '2140cd873a3f10c72b7314da6c6d913b8345c778', icon: "chevron-down", scale: iconScale })))), this.showFractionalSecond && (index.h("span", { key: '99be37a3a562a8a217c690612d757d2a463b98fe', class: CSS.delimiter }, this.localizedDecimalSeparator)), this.showFractionalSecond && (index.h("div", { key: '7b1095f7972da474f96a3190097eeaf282726743', class: CSS.column, role: "group" }, index.h("span", { key: 'c66e94a7309934bcfe86f8d73170101937bcbbdd', "aria-label": this.messages.fractionalSecondUp, class: {
                [CSS.button]: true,
                [CSS.buttonFractionalSecondUp]: true,
            }, onClick: this.fractionalSecondUpClickHandler, role: "button" }, index.h("calcite-icon", { key: '45fa888598fda5d21ab6a5e2f8561314c04cfba8', icon: "chevron-up", scale: iconScale })), index.h("span", { key: '61d5ae14f3b1a1984d07437e57ca6e60ba64f27b', "aria-label": this.messages.fractionalSecond, "aria-valuemax": "999", "aria-valuemin": "1", "aria-valuenow": (fractionalSecondIsNumber && parseInt(this.fractionalSecond)) || "0", "aria-valuetext": this.localizedFractionalSecond, class: {
                [CSS.input]: true,
                [CSS.fractionalSecond]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.fractionalSecondEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.fractionalSecondKeyDownHandler, ref: this.setFractionalSecondEl, role: "spinbutton", tabIndex: 0 }, this.localizedFractionalSecond || "--"), index.h("span", { key: '35d0b37c0113289a9a060ae236f9ed88597707a7', "aria-label": this.messages.fractionalSecondDown, class: {
                [CSS.button]: true,
                [CSS.buttonFractionalSecondDown]: true,
            }, onClick: this.fractionalSecondDownClickHandler, role: "button" }, index.h("calcite-icon", { key: '0dfd40ceff6d507cbd3495c5f5f4104b98d2ba99', icon: "chevron-down", scale: iconScale })))), this.localizedSecondSuffix && (index.h("span", { key: '4cee863e88b4eac2a1da4ea48cac56777025a36c', class: CSS.delimiter }, this.localizedSecondSuffix)), showMeridiem && (index.h("div", { key: '7cfcd524e6742691774e49e2c6ad053865f11256', class: {
                [CSS.column]: true,
                [CSS.meridiemStart]: this.meridiemOrder === 0,
            }, role: "group" }, index.h("span", { key: '640bcd84761d7dec7783092a53c79f5a49795014', "aria-label": this.messages.meridiemUp, class: {
                [CSS.button]: true,
                [CSS.buttonMeridiemUp]: true,
                [CSS.buttonTopRight]: true,
            }, onClick: this.meridiemUpClickHandler, role: "button" }, index.h("calcite-icon", { key: '134662da0e72d17cbd6d6d83657c6f37b8de9520', icon: "chevron-up", scale: iconScale })), index.h("span", { key: '8097bcea625e4d272c86ae1598e471e6d55e98af', "aria-label": this.messages.meridiem, "aria-valuemax": "2", "aria-valuemin": "1", "aria-valuenow": (this.meridiem === "PM" && "2") || "1", "aria-valuetext": this.meridiem, class: {
                [CSS.input]: true,
                [CSS.meridiem]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.meridiemEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.meridiemKeyDownHandler, ref: this.setMeridiemEl, role: "spinbutton", tabIndex: 0 }, this.localizedMeridiem || "--"), index.h("span", { key: '42a40925539e83e3ab8aeae295fbbad21795e5bc', "aria-label": this.messages.meridiemDown, class: {
                [CSS.button]: true,
                [CSS.buttonMeridiemDown]: true,
                [CSS.buttonBottomRight]: true,
            }, onClick: this.meridiemDownClickHandler, role: "button" }, index.h("calcite-icon", { key: '36364532badec14bcc07124127156ab1561539d4', icon: "chevron-down", scale: iconScale }))))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "step": ["stepChange"],
        "value": ["valueWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
};
TimePicker.style = CalciteTimePickerStyle0;

exports.calcite_time_picker = TimePicker;
