/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const locale = require('./locale-42c21404.js');
const math = require('./math-2911c0c9.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const maxTenthForMinuteAndSecond = 5;
function createLocaleDateTimeFormatter(locale$1, numberingSystem, includeSeconds = true, fractionalSecondDigits) {
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        numberingSystem: locale.getSupportedNumberingSystem(numberingSystem),
    };
    if (includeSeconds) {
        options.second = "2-digit";
        if (fractionalSecondDigits) {
            options.fractionalSecondDigits = fractionalSecondDigits;
        }
    }
    return locale.getDateTimeFormat(locale$1, options);
}
function formatTimePart(number, minLength) {
    if (number === null || number === undefined) {
        return;
    }
    const numberAsString = number.toString();
    const numberDecimalPlaces = math.decimalPlaces(number);
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
function getLocalizedDecimalSeparator(locale$1, numberingSystem) {
    locale.numberStringFormatter.numberFormatOptions = {
        locale: locale$1,
        numberingSystem,
    };
    return locale.numberStringFormatter.localize("1.1").split("")[1];
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
    if (!locale.isValidNumber(hour)) {
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
    const hourValid = locale.isValidNumber(hour) && hourAsNumber >= 0 && hourAsNumber < 24;
    const minuteValid = locale.isValidNumber(minute) && minuteAsNumber >= 0 && minuteAsNumber < 60;
    const secondValid = locale.isValidNumber(second) && secondAsNumber >= 0 && secondAsNumber < 60;
    if ((hourValid && minuteValid && !second) || (hourValid && minuteValid && secondValid)) {
        return true;
    }
}
function isValidTimePart(value, part) {
    if (part === "meridiem") {
        return value === "AM" || value === "PM";
    }
    if (!locale.isValidNumber(value)) {
        return false;
    }
    const valueAsNumber = Number(value);
    return part === "hour" ? valueAsNumber >= 0 && valueAsNumber < 24 : valueAsNumber >= 0 && valueAsNumber < 60;
}
function localizeTimePart({ value, part, locale: locale$1, numberingSystem }) {
    if (part === "fractionalSecond") {
        const localizedDecimalSeparator = getLocalizedDecimalSeparator(locale$1, numberingSystem);
        let localizedFractionalSecond = null;
        if (value) {
            locale.numberStringFormatter.numberFormatOptions = {
                locale: locale$1,
                numberingSystem,
            };
            const localizedZero = locale.numberStringFormatter.localize("0");
            if (parseInt(value) === 0) {
                localizedFractionalSecond = "".padStart(value.length, localizedZero);
            }
            else {
                localizedFractionalSecond = locale.numberStringFormatter
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
    const formatter = createLocaleDateTimeFormatter(locale$1, numberingSystem);
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

exports.formatTimePart = formatTimePart;
exports.formatTimeString = formatTimeString;
exports.getLocaleHourCycle = getLocaleHourCycle;
exports.getLocalizedDecimalSeparator = getLocalizedDecimalSeparator;
exports.getLocalizedTimePartSuffix = getLocalizedTimePartSuffix;
exports.getMeridiem = getMeridiem;
exports.getMeridiemOrder = getMeridiemOrder;
exports.isValidTime = isValidTime;
exports.localizeTimePart = localizeTimePart;
exports.localizeTimeString = localizeTimeString;
exports.localizeTimeStringToParts = localizeTimeStringToParts;
exports.maxTenthForMinuteAndSecond = maxTenthForMinuteAndSecond;
exports.parseTimeString = parseTimeString;
exports.toISOTimeString = toISOTimeString;
