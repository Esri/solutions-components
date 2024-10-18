/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
const decimalNumberRegex = new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
/**
 * Returns the quantity of real decimal places for a number, which excludes trailing zeros.
 *
 * Adapted from {@link https://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number}.
 *
 * @param decimal - decimal value
 * @param value
 * @returns {number} the amount of decimal places in a number
 */
const decimalPlaces = (value) => {
    const match = ("" + value).match(decimalNumberRegex);
    if (!match || parseInt(match[1]) === 0) {
        return 0;
    }
    return Math.max(0, 
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
        // Adjust for scientific notation.
        (match[2] ? +match[2] : 0));
};
function getDecimals(value) {
    if (decimalPlaces(value) > 0 && value > 0) {
        return parseFloat(`0.${value.toString().split(".")[1]}`);
    }
    return value;
}
function remap(value, fromMin, fromMax, toMin, toMax) {
    return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}
/**
 * Helper to determine if a value is close to the edge of a range within a threshold.
 *
 * @param value
 * @param range
 * @param threshold
 * @returns -1 if close to lower edge, 1 if close to upper edge, 0 otherwise.
 */
function closeToRangeEdge(value, range, threshold) {
    return value < threshold ? -1 : value > range - threshold ? 1 : 0;
}

exports.clamp = clamp;
exports.closeToRangeEdge = closeToRangeEdge;
exports.decimalPlaces = decimalPlaces;
exports.getDecimals = getDecimals;
exports.remap = remap;
