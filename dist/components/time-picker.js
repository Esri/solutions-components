/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { n as numberKeys } from './key.js';
import { n as numberStringFormatter, b as getDateTimeFormat, i as isValidNumber, f as getSupportedNumberingSystem, c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { d as decimalPlaces, g as getDecimals } from './math.js';
import { g as getIconScale } from './component.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const maxTenthForMinuteAndSecond = 5;
function createLocaleDateTimeFormatter(locale, numberingSystem, includeSeconds = true, fractionalSecondDigits) {
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        numberingSystem: getSupportedNumberingSystem(numberingSystem),
    };
    if (includeSeconds) {
        options.second = "2-digit";
        if (fractionalSecondDigits) {
            options.fractionalSecondDigits = fractionalSecondDigits;
        }
    }
    return getDateTimeFormat(locale, options);
}
function formatTimePart(number, minLength) {
    if (number === null || number === undefined) {
        return;
    }
    const numberAsString = number.toString();
    const numberDecimalPlaces = decimalPlaces(number);
    if (number < 1 && numberDecimalPlaces > 0 && numberDecimalPlaces < 4) {
        const fractionalDigits = numberAsString.replace("0.", "");
        if (!minLength || fractionalDigits.length === minLength) {
            return fractionalDigits;
        }
        if (fractionalDigits.length < minLength) {
            return fractionalDigits.padEnd(minLength, "0");
        }
        return fractionalDigits;
    }
    if (number >= 0 && number < 10) {
        return numberAsString.padStart(2, "0");
    }
    if (number >= 10) {
        return numberAsString;
    }
}
function formatTimeString(value) {
    if (!isValidTime(value)) {
        return null;
    }
    const { hour, minute, second, fractionalSecond } = parseTimeString(value);
    let formattedValue = `${formatTimePart(parseInt(hour))}:${formatTimePart(parseInt(minute))}`;
    if (second) {
        formattedValue += `:${formatTimePart(parseInt(second))}`;
        if (fractionalSecond) {
            formattedValue += `.${fractionalSecond}`;
        }
    }
    return formattedValue;
}
function fractionalSecondPartToMilliseconds(fractionalSecondPart) {
    return parseInt((parseFloat(`0.${fractionalSecondPart}`) / 0.001).toFixed(3));
}
function getLocaleHourCycle(locale, numberingSystem) {
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
    const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
    return getLocalizedTimePart("meridiem", parts) ? "12" : "24";
}
function getLocalizedDecimalSeparator(locale, numberingSystem) {
    numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem,
    };
    return numberStringFormatter.localize("1.1").split("")[1];
}
function getLocalizedTimePartSuffix(part, locale, numberingSystem = "latn") {
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
    const parts = formatter.formatToParts(new Date(Date.UTC(0, 0, 0, 0, 0, 0)));
    return getLocalizedTimePart(`${part}Suffix`, parts);
}
function getLocalizedTimePart(part, parts) {
    if (!part || !parts) {
        return null;
    }
    if (part === "hourSuffix") {
        const hourIndex = parts.indexOf(parts.find(({ type }) => type === "hour"));
        const minuteIndex = parts.indexOf(parts.find(({ type }) => type === "minute"));
        const hourSuffix = parts[hourIndex + 1];
        return hourSuffix && hourSuffix.type === "literal" && minuteIndex - hourIndex === 2
            ? hourSuffix.value?.trim() || null
            : null;
    }
    if (part === "minuteSuffix") {
        const minuteIndex = parts.indexOf(parts.find(({ type }) => type === "minute"));
        const secondIndex = parts.indexOf(parts.find(({ type }) => type === "second"));
        const minuteSuffix = parts[minuteIndex + 1];
        return minuteSuffix && minuteSuffix.type === "literal" && secondIndex - minuteIndex === 2
            ? minuteSuffix.value?.trim() || null
            : null;
    }
    if (part === "secondSuffix") {
        const secondIndex = parts.indexOf(parts.find(({ type }) => type === "second"));
        const secondSuffix = parts[secondIndex + 1];
        return secondSuffix && secondSuffix.type === "literal" ? secondSuffix.value?.trim() || null : null;
    }
    return parts.find(({ type }) => (part == "meridiem" ? type === "dayPeriod" : type === part))?.value || null;
}
function getMeridiem(hour) {
    if (!isValidNumber(hour)) {
        return null;
    }
    const hourAsNumber = parseInt(hour);
    return hourAsNumber >= 0 && hourAsNumber <= 11 ? "AM" : "PM";
}
function getMeridiemOrder(locale) {
    const isRtl = locale === "ar" || locale === "he";
    if (isRtl) {
        return 0;
    }
    const timeParts = getTimeParts({
        value: "00:00:00",
        locale,
        numberingSystem: "latn",
    });
    return timeParts.findIndex((value) => value.type === "dayPeriod");
}
function isValidTime(value) {
    if (!value || value.startsWith(":") || value.endsWith(":")) {
        return false;
    }
    const splitValue = value.split(":");
    const validLength = splitValue.length > 1 && splitValue.length < 4;
    if (!validLength) {
        return false;
    }
    const [hour, minute, second] = splitValue;
    const hourAsNumber = parseInt(splitValue[0]);
    const minuteAsNumber = parseInt(splitValue[1]);
    const secondAsNumber = parseInt(splitValue[2]);
    const hourValid = isValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
    const minuteValid = isValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
    const secondValid = isValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
    if ((hourValid && minuteValid && !second) || (hourValid && minuteValid && secondValid)) {
        return true;
    }
}
function isValidTimePart(value, part) {
    if (part === "meridiem") {
        return value === "AM" || value === "PM";
    }
    if (!isValidNumber(value)) {
        return false;
    }
    const valueAsNumber = Number(value);
    return part === "hour" ? valueAsNumber >= 0 && valueAsNumber < 24 : valueAsNumber >= 0 && valueAsNumber < 60;
}
function localizeTimePart({ value, part, locale, numberingSystem }) {
    if (part === "fractionalSecond") {
        const localizedDecimalSeparator = getLocalizedDecimalSeparator(locale, numberingSystem);
        let localizedFractionalSecond = null;
        if (value) {
            numberStringFormatter.numberFormatOptions = {
                locale,
                numberingSystem,
            };
            const localizedZero = numberStringFormatter.localize("0");
            if (parseInt(value) === 0) {
                localizedFractionalSecond = "".padStart(value.length, localizedZero);
            }
            else {
                localizedFractionalSecond = numberStringFormatter
                    .localize(`0.${value}`)
                    .replace(`${localizedZero}${localizedDecimalSeparator}`, "");
                if (localizedFractionalSecond.length < value.length) {
                    localizedFractionalSecond = localizedFractionalSecond.padEnd(value.length, localizedZero);
                }
            }
        }
        return localizedFractionalSecond;
    }
    if (!isValidTimePart(value, part)) {
        return;
    }
    const valueAsNumber = parseInt(value);
    const date = new Date(Date.UTC(0, 0, 0, part === "hour" ? valueAsNumber : part === "meridiem" ? (value === "AM" ? 0 : 12) : 0, part === "minute" ? valueAsNumber : 0, part === "second" ? valueAsNumber : 0));
    if (!date) {
        return;
    }
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
    const parts = formatter.formatToParts(date);
    return getLocalizedTimePart(part, parts);
}
function localizeTimeString({ value, locale, numberingSystem, includeSeconds = true, fractionalSecondDigits, }) {
    if (!isValidTime(value)) {
        return null;
    }
    const { hour, minute, second = "0", fractionalSecond } = parseTimeString(value);
    const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second), fractionalSecond && fractionalSecondPartToMilliseconds(fractionalSecond)));
    const formatter = createLocaleDateTimeFormatter(locale, numberingSystem, includeSeconds, fractionalSecondDigits);
    return formatter.format(dateFromTimeString) || null;
}
function localizeTimeStringToParts({ value, locale, numberingSystem = "latn", }) {
    if (!isValidTime(value)) {
        return null;
    }
    const { hour, minute, second = "0", fractionalSecond } = parseTimeString(value);
    const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
    if (dateFromTimeString) {
        const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
        const parts = formatter.formatToParts(dateFromTimeString);
        return {
            localizedHour: getLocalizedTimePart("hour", parts),
            localizedHourSuffix: getLocalizedTimePart("hourSuffix", parts),
            localizedMinute: getLocalizedTimePart("minute", parts),
            localizedMinuteSuffix: getLocalizedTimePart("minuteSuffix", parts),
            localizedSecond: getLocalizedTimePart("second", parts),
            localizedDecimalSeparator: getLocalizedDecimalSeparator(locale, numberingSystem),
            localizedFractionalSecond: localizeTimePart({
                value: fractionalSecond,
                part: "fractionalSecond",
                locale,
                numberingSystem,
            }),
            localizedSecondSuffix: getLocalizedTimePart("secondSuffix", parts),
            localizedMeridiem: getLocalizedTimePart("meridiem", parts),
        };
    }
    return null;
}
function getTimeParts({ value, locale, numberingSystem }) {
    if (!isValidTime(value)) {
        return null;
    }
    const { hour, minute, second = "0" } = parseTimeString(value);
    const dateFromTimeString = new Date(Date.UTC(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(second)));
    if (dateFromTimeString) {
        const formatter = createLocaleDateTimeFormatter(locale, numberingSystem);
        const parts = formatter.formatToParts(dateFromTimeString);
        return parts;
    }
    return null;
}
function parseTimeString(value) {
    if (isValidTime(value)) {
        const [hour, minute, secondDecimal] = value.split(":");
        let second = secondDecimal;
        let fractionalSecond = null;
        if (secondDecimal?.includes(".")) {
            [second, fractionalSecond] = secondDecimal.split(".");
        }
        return {
            fractionalSecond,
            hour,
            minute,
            second,
        };
    }
    return {
        fractionalSecond: null,
        hour: null,
        minute: null,
        second: null,
    };
}
function toISOTimeString(value, includeSeconds = true) {
    if (!isValidTime(value)) {
        return "";
    }
    const { hour, minute, second, fractionalSecond } = parseTimeString(value);
    let isoTimeString = `${formatTimePart(parseInt(hour))}:${formatTimePart(parseInt(minute))}`;
    if (includeSeconds) {
        isoTimeString += `:${formatTimePart(parseInt((includeSeconds && second) || "0"))}`;
        if (fractionalSecond) {
            isoTimeString += `.${fractionalSecond}`;
        }
    }
    return isoTimeString;
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
const TimePicker = /*@__PURE__*/ proxyCustomElement(class TimePicker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalTimePickerBlur = createEvent(this, "calciteInternalTimePickerBlur", 6);
        this.calciteInternalTimePickerChange = createEvent(this, "calciteInternalTimePickerChange", 6);
        this.calciteInternalTimePickerFocus = createEvent(this, "calciteInternalTimePickerFocus", 6);
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
            if (isValidNumber(this[key])) {
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
            const { key } = event;
            if (numberKeys.includes(key)) {
                const stepPrecision = decimalPlaces(this.step);
                const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
                const fractionalSecondAsIntegerLength = fractionalSecondAsInteger.toString().length;
                let newFractionalSecondAsIntegerString;
                if (fractionalSecondAsIntegerLength >= stepPrecision) {
                    newFractionalSecondAsIntegerString = key.padStart(stepPrecision, "0");
                }
                else if (fractionalSecondAsIntegerLength < stepPrecision) {
                    newFractionalSecondAsIntegerString = `${fractionalSecondAsInteger}${key}`.padStart(stepPrecision, "0");
                }
                this.setValuePart("fractionalSecond", parseFloat(`0.${newFractionalSecondAsIntegerString}`));
            }
            else {
                switch (key) {
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
            const { key } = event;
            if (numberKeys.includes(key)) {
                const keyAsNumber = parseInt(key);
                let newHour;
                if (isValidNumber(this.hour)) {
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
                switch (key) {
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
            const newHour = isValidNumber(this.hour)
                ? this.hour === "23"
                    ? 0
                    : parseInt(this.hour) + 1
                : 1;
            this.setValuePart("hour", newHour);
        };
        this.incrementMinuteOrSecond = (key) => {
            const newValue = isValidNumber(this[key])
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
            const { key } = event;
            if (numberKeys.includes(key)) {
                const keyAsNumber = parseInt(key);
                let newMinute;
                if (isValidNumber(this.minute) && this.minute.startsWith("0")) {
                    const minuteAsNumber = parseInt(this.minute);
                    newMinute =
                        minuteAsNumber > maxTenthForMinuteAndSecond
                            ? keyAsNumber
                            : `${minuteAsNumber}${keyAsNumber}`;
                }
                else {
                    newMinute = keyAsNumber;
                }
                this.setValuePart("minute", newMinute);
            }
            else {
                switch (key) {
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
            const stepDecimal = getDecimals(this.step);
            const stepPrecision = decimalPlaces(this.step);
            const fractionalSecondAsInteger = parseInt(this.fractionalSecond);
            const fractionalSecondAsFloat = parseFloat(`0.${this.fractionalSecond}`);
            let nudgedValue;
            let nudgedValueRounded;
            let nudgedValueRoundedDecimals;
            let newFractionalSecond;
            if (direction === "up") {
                nudgedValue = isNaN(fractionalSecondAsInteger) ? 0 : fractionalSecondAsFloat + stepDecimal;
                nudgedValueRounded = parseFloat(nudgedValue.toFixed(stepPrecision));
                nudgedValueRoundedDecimals = getDecimals(nudgedValueRounded);
                newFractionalSecond =
                    nudgedValueRounded < 1 && decimalPlaces(nudgedValueRoundedDecimals) > 0
                        ? formatTimePart(nudgedValueRoundedDecimals, stepPrecision)
                        : "".padStart(stepPrecision, "0");
            }
            if (direction === "down") {
                nudgedValue =
                    isNaN(fractionalSecondAsInteger) || fractionalSecondAsInteger === 0
                        ? 1 - stepDecimal
                        : fractionalSecondAsFloat - stepDecimal;
                nudgedValueRounded = parseFloat(nudgedValue.toFixed(stepPrecision));
                nudgedValueRoundedDecimals = getDecimals(nudgedValueRounded);
                newFractionalSecond =
                    nudgedValueRounded < 1 &&
                        decimalPlaces(nudgedValueRoundedDecimals) > 0 &&
                        Math.sign(nudgedValueRoundedDecimals) === 1
                        ? formatTimePart(nudgedValueRoundedDecimals, stepPrecision)
                        : "".padStart(stepPrecision, "0");
            }
            this.setValuePart("fractionalSecond", newFractionalSecond);
        };
        this.sanitizeValue = (value) => {
            const { hour, minute, second, fractionalSecond } = parseTimeString(value);
            if (fractionalSecond) {
                const sanitizedFractionalSecond = this.sanitizeFractionalSecond(fractionalSecond);
                return `${hour}:${minute}:${second}.${sanitizedFractionalSecond}`;
            }
            return isValidTime(value) && value;
        };
        this.sanitizeFractionalSecond = (fractionalSecond) => fractionalSecond && decimalPlaces(this.step) !== fractionalSecond.length
            ? parseFloat(`0.${fractionalSecond}`).toFixed(decimalPlaces(this.step)).replace("0.", "")
            : fractionalSecond;
        this.secondKeyDownHandler = (event) => {
            const { key } = event;
            if (numberKeys.includes(key)) {
                const keyAsNumber = parseInt(key);
                let newSecond;
                if (isValidNumber(this.second) && this.second.startsWith("0")) {
                    const secondAsNumber = parseInt(this.second);
                    newSecond =
                        secondAsNumber > maxTenthForMinuteAndSecond
                            ? keyAsNumber
                            : `${secondAsNumber}${keyAsNumber}`;
                }
                else {
                    newSecond = keyAsNumber;
                }
                this.setValuePart("second", newSecond);
            }
            else {
                switch (key) {
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
            if (isValidTime(value)) {
                const { hour, minute, second, fractionalSecond } = parseTimeString(value);
                const { effectiveLocale: locale, numberingSystem } = this;
                const { localizedHour, localizedHourSuffix, localizedMinute, localizedMinuteSuffix, localizedSecond, localizedDecimalSeparator, localizedFractionalSecond, localizedSecondSuffix, localizedMeridiem, } = localizeTimeStringToParts({ value, locale, numberingSystem });
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
                    this.meridiem = getMeridiem(this.hour);
                }
            }
            else {
                this.hour = null;
                this.fractionalSecond = null;
                this.localizedHour = null;
                this.localizedHourSuffix = getLocalizedTimePartSuffix("hour", this.effectiveLocale, this.numberingSystem);
                this.localizedMeridiem = null;
                this.localizedMinute = null;
                this.localizedMinuteSuffix = getLocalizedTimePartSuffix("minute", this.effectiveLocale, this.numberingSystem);
                this.localizedSecond = null;
                this.localizedDecimalSeparator = getLocalizedDecimalSeparator(this.effectiveLocale, this.numberingSystem);
                this.localizedFractionalSecond = null;
                this.localizedSecondSuffix = getLocalizedTimePartSuffix("second", this.effectiveLocale, this.numberingSystem);
                this.meridiem = null;
                this.minute = null;
                this.second = null;
                this.value = null;
            }
        };
        this.setValuePart = (key, value) => {
            const { effectiveLocale: locale, numberingSystem } = this;
            if (key === "meridiem") {
                this.meridiem = value;
                if (isValidNumber(this.hour)) {
                    const hourAsNumber = parseInt(this.hour);
                    switch (value) {
                        case "AM":
                            if (hourAsNumber >= 12) {
                                this.hour = formatTimePart(hourAsNumber - 12);
                            }
                            break;
                        case "PM":
                            if (hourAsNumber < 12) {
                                this.hour = formatTimePart(hourAsNumber + 12);
                            }
                            break;
                    }
                    this.localizedHour = localizeTimePart({
                        value: this.hour,
                        part: "hour",
                        locale,
                        numberingSystem,
                    });
                }
            }
            else if (key === "fractionalSecond") {
                const stepPrecision = decimalPlaces(this.step);
                if (typeof value === "number") {
                    this.fractionalSecond =
                        value === 0 ? "".padStart(stepPrecision, "0") : formatTimePart(value, stepPrecision);
                }
                else {
                    this.fractionalSecond = value;
                }
                this.localizedFractionalSecond = localizeTimePart({
                    value: this.fractionalSecond,
                    part: "fractionalSecond",
                    locale,
                    numberingSystem,
                });
            }
            else {
                this[key] = typeof value === "number" ? formatTimePart(value) : value;
                this[`localized${capitalize(key)}`] = localizeTimePart({
                    value: this[key],
                    part: key,
                    locale,
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
                ? localizeTimeStringToParts({ value: this.value, locale, numberingSystem })
                    ?.localizedMeridiem || null
                : localizeTimePart({ value: this.meridiem, part: "meridiem", locale, numberingSystem });
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
        this.calciteInternalTimePickerBlur.emit();
    }
    hostFocusHandler() {
        this.calciteInternalTimePickerFocus.emit();
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
        await componentFocusable(this);
        this.el?.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    async focusPart(target) {
        await componentFocusable(this);
        this[`${target || "hour"}El`]?.focus();
    }
    toggleSecond() {
        this.showSecond = this.step < 60;
        this.showFractionalSecond = decimalPlaces(this.step) > 0;
    }
    updateLocale() {
        updateMessages(this, this.effectiveLocale);
        this.hourCycle = getLocaleHourCycle(this.effectiveLocale, this.numberingSystem);
        this.localizedDecimalSeparator = getLocalizedDecimalSeparator(this.effectiveLocale, this.numberingSystem);
        this.meridiemOrder = getMeridiemOrder(this.effectiveLocale);
        this.setValue(this.sanitizeValue(this.value));
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        this.updateLocale();
        connectMessages(this);
        this.toggleSecond();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const hourIsNumber = isValidNumber(this.hour);
        const iconScale = getIconScale(this.scale);
        const minuteIsNumber = isValidNumber(this.minute);
        const secondIsNumber = isValidNumber(this.second);
        const fractionalSecondIsNumber = isValidNumber(this.fractionalSecond);
        const showMeridiem = this.hourCycle === "12";
        return (h("div", { key: 'b896c9e080ebc7d8810c48581026aec7159b6490', class: {
                [CSS.timePicker]: true,
                [CSS.showMeridiem]: showMeridiem,
                [CSS.showSecond]: this.showSecond,
                [CSS[`scale-${this.scale}`]]: true,
            }, dir: "ltr" }, h("div", { key: '785e1bce4a2440bcc89c6f3e71e224be8aac636a', class: CSS.column, role: "group" }, h("span", { key: 'ed2a6cff185d1589aad531730a9064c3d86abb8f', "aria-label": this.messages.hourUp, class: {
                [CSS.button]: true,
                [CSS.buttonHourUp]: true,
                [CSS.buttonTopLeft]: true,
            }, onClick: this.hourUpClickHandler, role: "button" }, h("calcite-icon", { key: 'cd8fff81bab8a40771f1f889f8e2a31dfd751c23', icon: "chevron-up", scale: iconScale })), h("span", { key: '137872f9897924e5d803a6c8691e76d97b9849ca', "aria-label": this.messages.hour, "aria-valuemax": "23", "aria-valuemin": "1", "aria-valuenow": (hourIsNumber && parseInt(this.hour)) || "0", "aria-valuetext": this.hour, class: {
                [CSS.input]: true,
                [CSS.hour]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.hourEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.hourKeyDownHandler, ref: this.setHourEl, role: "spinbutton", tabIndex: 0 }, this.localizedHour || "--"), h("span", { key: '29fb9c92a013801bad2653a993b5c33764c10d12', "aria-label": this.messages.hourDown, class: {
                [CSS.button]: true,
                [CSS.buttonHourDown]: true,
                [CSS.buttonBottomLeft]: true,
            }, onClick: this.hourDownClickHandler, role: "button" }, h("calcite-icon", { key: '557650c90ba66405b6d254a913281001d9553ccd', icon: "chevron-down", scale: iconScale }))), h("span", { key: '186666854fd27680137a6dcfffc708257f7296a1', class: CSS.delimiter }, this.localizedHourSuffix), h("div", { key: '68d54624a648d15fe9248abb5a2b7d47ebb8d4ae', class: CSS.column, role: "group" }, h("span", { key: '412d6dc40d3a5df85334e87c986ff22a2a4a89b2', "aria-label": this.messages.minuteUp, class: {
                [CSS.button]: true,
                [CSS.buttonMinuteUp]: true,
            }, onClick: this.minuteUpClickHandler, role: "button" }, h("calcite-icon", { key: '73ce5f6e4f296fedb75facd98806aaa0f9264f9e', icon: "chevron-up", scale: iconScale })), h("span", { key: '9e12170f05aba47a11f64b4986038588ba0d2526', "aria-label": this.messages.minute, "aria-valuemax": "12", "aria-valuemin": "1", "aria-valuenow": (minuteIsNumber && parseInt(this.minute)) || "0", "aria-valuetext": this.minute, class: {
                [CSS.input]: true,
                [CSS.minute]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.minuteEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.minuteKeyDownHandler, ref: this.setMinuteEl, role: "spinbutton", tabIndex: 0 }, this.localizedMinute || "--"), h("span", { key: 'a46f2686fc2b9c4e00b5917380ce32d00c426c13', "aria-label": this.messages.minuteDown, class: {
                [CSS.button]: true,
                [CSS.buttonMinuteDown]: true,
            }, onClick: this.minuteDownClickHandler, role: "button" }, h("calcite-icon", { key: '0442e7441c06408b4fbd08e5b9929ec28e292e2f', icon: "chevron-down", scale: iconScale }))), this.showSecond && h("span", { key: '3fa42032693c411259214cfeb2e8cb1b4b00e8ad', class: CSS.delimiter }, this.localizedMinuteSuffix), this.showSecond && (h("div", { key: 'b56d1df519432c1ed12a97c2ca0104dd9b0e10fc', class: CSS.column, role: "group" }, h("span", { key: 'ecfdd7599b18acc92b0367743878cb43b5124c8b', "aria-label": this.messages.secondUp, class: {
                [CSS.button]: true,
                [CSS.buttonSecondUp]: true,
            }, onClick: this.secondUpClickHandler, role: "button" }, h("calcite-icon", { key: '745355c72d3cc9acb8ae31c773ab210183335b4e', icon: "chevron-up", scale: iconScale })), h("span", { key: '8214dc9a5f44b758406e3914c562f3622c0111be', "aria-label": this.messages.second, "aria-valuemax": "59", "aria-valuemin": "0", "aria-valuenow": (secondIsNumber && parseInt(this.second)) || "0", "aria-valuetext": this.second, class: {
                [CSS.input]: true,
                [CSS.second]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.secondEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.secondKeyDownHandler, ref: this.setSecondEl, role: "spinbutton", tabIndex: 0 }, this.localizedSecond || "--"), h("span", { key: '9cf088e25e010c520aa3f1cec8744926b310bce6', "aria-label": this.messages.secondDown, class: {
                [CSS.button]: true,
                [CSS.buttonSecondDown]: true,
            }, onClick: this.secondDownClickHandler, role: "button" }, h("calcite-icon", { key: 'cbb0e61bef5ff64b65a68ffd96003a35cc49c778', icon: "chevron-down", scale: iconScale })))), this.showFractionalSecond && (h("span", { key: 'd544b2a64681f299b898d98c4c9484851b022a67', class: CSS.delimiter }, this.localizedDecimalSeparator)), this.showFractionalSecond && (h("div", { key: 'f74e8b291e21da12b89ce47e0e6ca98c5f87c53c', class: CSS.column, role: "group" }, h("span", { key: '742053eb033a078a338221e2ec37db9b3dcab106', "aria-label": this.messages.fractionalSecondUp, class: {
                [CSS.button]: true,
                [CSS.buttonFractionalSecondUp]: true,
            }, onClick: this.fractionalSecondUpClickHandler, role: "button" }, h("calcite-icon", { key: 'b4f4e9d78b27e7e49a18cffe87c53b5d983a7a24', icon: "chevron-up", scale: iconScale })), h("span", { key: 'a643735e771f0bfac44bc8fa70a7f7f44a2bd995', "aria-label": this.messages.fractionalSecond, "aria-valuemax": "999", "aria-valuemin": "1", "aria-valuenow": (fractionalSecondIsNumber && parseInt(this.fractionalSecond)) || "0", "aria-valuetext": this.localizedFractionalSecond, class: {
                [CSS.input]: true,
                [CSS.fractionalSecond]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.fractionalSecondEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.fractionalSecondKeyDownHandler, ref: this.setFractionalSecondEl, role: "spinbutton", tabIndex: 0 }, this.localizedFractionalSecond || "--"), h("span", { key: '606fa4272030adb287794834025c8ea5ab64b775', "aria-label": this.messages.fractionalSecondDown, class: {
                [CSS.button]: true,
                [CSS.buttonFractionalSecondDown]: true,
            }, onClick: this.fractionalSecondDownClickHandler, role: "button" }, h("calcite-icon", { key: '6088c70fbd84ba6628dd03ccc14bc8761b1474b0', icon: "chevron-down", scale: iconScale })))), this.localizedSecondSuffix && (h("span", { key: '896a343dcbc4fd063453978ab4ba23152c1d5b02', class: CSS.delimiter }, this.localizedSecondSuffix)), showMeridiem && (h("div", { key: '279201865dd76e7b3403f7d9950cc35b12314c4e', class: {
                [CSS.column]: true,
                [CSS.meridiemStart]: this.meridiemOrder === 0,
            }, role: "group" }, h("span", { key: '9c9d8fc7d24826a04ced761072d3a462e17960c6', "aria-label": this.messages.meridiemUp, class: {
                [CSS.button]: true,
                [CSS.buttonMeridiemUp]: true,
                [CSS.buttonTopRight]: true,
            }, onClick: this.meridiemUpClickHandler, role: "button" }, h("calcite-icon", { key: '8fc5b56ff6d42d03362ad4a61ef3097c0f518a7b', icon: "chevron-up", scale: iconScale })), h("span", { key: '9566bd9ba5d3154d873454e2b665ce60fa3cef87', "aria-label": this.messages.meridiem, "aria-valuemax": "2", "aria-valuemin": "1", "aria-valuenow": (this.meridiem === "PM" && "2") || "1", "aria-valuetext": this.meridiem, class: {
                [CSS.input]: true,
                [CSS.meridiem]: true,
                [CSS.inputFocus]: this.activeEl && this.activeEl === this.meridiemEl,
            }, onClick: this.inputClickHandler, onFocus: this.focusHandler, onKeyDown: this.meridiemKeyDownHandler, ref: this.setMeridiemEl, role: "spinbutton", tabIndex: 0 }, this.localizedMeridiem || "--"), h("span", { key: 'f19c68761eebad472f944ce66be8a44d4c1b9b94', "aria-label": this.messages.meridiemDown, class: {
                [CSS.button]: true,
                [CSS.buttonMeridiemDown]: true,
                [CSS.buttonBottomRight]: true,
            }, onClick: this.meridiemDownClickHandler, role: "button" }, h("calcite-icon", { key: '7592f3288984a22f0fc1d4b8df3967483768c05a', icon: "chevron-down", scale: iconScale }))))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "step": ["stepChange"],
        "value": ["valueWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
    static get style() { return CalciteTimePickerStyle0; }
}, [17, "calcite-time-picker", {
        "scale": [513],
        "step": [514],
        "numberingSystem": [1, "numbering-system"],
        "value": [1025],
        "messages": [1040],
        "messageOverrides": [1040],
        "activeEl": [32],
        "effectiveLocale": [32],
        "fractionalSecond": [32],
        "hour": [32],
        "hourCycle": [32],
        "localizedDecimalSeparator": [32],
        "localizedHour": [32],
        "localizedHourSuffix": [32],
        "localizedMeridiem": [32],
        "localizedFractionalSecond": [32],
        "localizedMinute": [32],
        "localizedMinuteSuffix": [32],
        "localizedSecond": [32],
        "localizedSecondSuffix": [32],
        "meridiem": [32],
        "minute": [32],
        "second": [32],
        "showFractionalSecond": [32],
        "showSecond": [32],
        "defaultMessages": [32],
        "setFocus": [64]
    }, [[0, "blur", "blurHandler"], [0, "focus", "hostFocusHandler"], [0, "keydown", "keyDownHandler"], [1, "pointerdown", "pointerDownHandler"]], {
        "step": ["stepChange"],
        "value": ["valueWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-time-picker", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-time-picker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TimePicker);
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

export { TimePicker as T, formatTimePart as a, defineCustomElement as d, formatTimeString as f, isValidTime as i, localizeTimeString as l, toISOTimeString as t };
