/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const hexChar = /^[0-9A-F]$/i;
const shorthandHex = /^#[0-9A-F]{3}$/i;
const longhandHex = /^#[0-9A-F]{6}$/i;
const shorthandHexWithAlpha = /^#[0-9A-F]{4}$/i;
const longhandHexWithAlpha = /^#[0-9A-F]{8}$/i;
const alphaToOpacity = (alpha) => Number((alpha * 100).toFixed());
const opacityToAlpha = (opacity) => Number((opacity / 100).toFixed(2));
function isValidHex(hex, hasAlpha = false) {
    return isShorthandHex(hex, hasAlpha) || isLonghandHex(hex, hasAlpha);
}
function evaluateHex(hex, length, pattern) {
    if (!hex) {
        return false;
    }
    return hex.length === length && pattern.test(hex);
}
function isShorthandHex(hex, hasAlpha = false) {
    const hexLength = hasAlpha ? 5 : 4;
    const hexPattern = hasAlpha ? shorthandHexWithAlpha : shorthandHex;
    return evaluateHex(hex, hexLength, hexPattern);
}
function isLonghandHex(hex, hasAlpha = false) {
    const hexLength = hasAlpha ? 9 : 7;
    const hexPattern = hasAlpha ? longhandHexWithAlpha : longhandHex;
    return evaluateHex(hex, hexLength, hexPattern);
}
function normalizeHex(hex, hasAlpha = false, convertFromHexToHexa = false) {
    hex = hex.toLowerCase();
    if (!hex.startsWith("#")) {
        hex = `#${hex}`;
    }
    if (isShorthandHex(hex, hasAlpha)) {
        return rgbToHex(hexToRGB(hex, hasAlpha));
    }
    if (hasAlpha && convertFromHexToHexa && isValidHex(hex, false /* we only care about RGB hex for conversion */)) {
        const isShorthand = isShorthandHex(hex, false);
        return rgbToHex(hexToRGB(`${hex}${isShorthand ? "f" : "ff"}`, true));
    }
    return hex;
}
function hexify(color, hasAlpha = false) {
    return hasAlpha ? color.hexa() : color.hex();
}
function rgbToHex(color) {
    const { r, g, b } = color;
    const rChars = numToHex(r);
    const gChars = numToHex(g);
    const bChars = numToHex(b);
    const alphaChars = "a" in color ? numToHex(color.a * 255) : "";
    return `#${rChars}${gChars}${bChars}${alphaChars}`.toLowerCase();
}
function numToHex(num) {
    return num.toString(16).padStart(2, "0");
}
function normalizeAlpha(colorObject) {
    const normalized = { ...colorObject, a: colorObject.alpha ?? 1 /* Color() will omit alpha if 1 */ };
    delete normalized.alpha;
    return normalized;
}
function normalizeColor(alphaColorObject) {
    const normalized = { ...alphaColorObject, alpha: alphaColorObject.a ?? 1 };
    delete normalized.a;
    return normalized;
}
function hexToRGB(hex, hasAlpha = false) {
    if (!isValidHex(hex, hasAlpha)) {
        return null;
    }
    hex = hex.replace("#", "");
    let r;
    let g;
    let b;
    let a;
    const isShorthand = hex.length === 3 || hex.length === 4;
    if (isShorthand) {
        const [first, second, third, fourth] = hex.split("");
        r = parseInt(`${first}${first}`, 16);
        g = parseInt(`${second}${second}`, 16);
        b = parseInt(`${third}${third}`, 16);
        a = parseInt(`${fourth}${fourth}`, 16) / 255;
    }
    else {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
        a = parseInt(hex.slice(6, 8), 16) / 255;
    }
    return isNaN(a) ? { r, g, b } : { r, g, b, a };
}
// these utils allow users to pass enum values as strings without having to access the enum
// based on the approach suggested by https://github.com/microsoft/TypeScript/issues/17690#issuecomment-321365759,
const enumify = (x) => x;
const CSSColorMode = enumify({
    HEX: "hex",
    HEXA: "hexa",
    RGB_CSS: "rgb-css",
    RGBA_CSS: "rgba-css",
    HSL_CSS: "hsl-css",
    HSLA_CSS: "hsla-css",
});
const ObjectColorMode = enumify({
    RGB: "rgb",
    RGBA: "rgba",
    HSL: "hsl",
    HSLA: "hsla",
    HSV: "hsv",
    HSVA: "hsva",
});
function parseMode(colorValue) {
    if (typeof colorValue === "string") {
        if (colorValue.startsWith("#")) {
            const { length } = colorValue;
            if (length === 4 || length === 7) {
                return CSSColorMode.HEX;
            }
            if (length === 5 || length === 9) {
                return CSSColorMode.HEXA;
            }
        }
        if (colorValue.startsWith("rgba(")) {
            return CSSColorMode.RGBA_CSS;
        }
        if (colorValue.startsWith("rgb(")) {
            return CSSColorMode.RGB_CSS;
        }
        if (colorValue.startsWith("hsl(")) {
            return CSSColorMode.HSL_CSS;
        }
        if (colorValue.startsWith("hsla(")) {
            return CSSColorMode.HSLA_CSS;
        }
    }
    if (typeof colorValue === "object") {
        if (hasChannels(colorValue, "r", "g", "b")) {
            return hasChannels(colorValue, "a") ? ObjectColorMode.RGBA : ObjectColorMode.RGB;
        }
        if (hasChannels(colorValue, "h", "s", "l")) {
            return hasChannels(colorValue, "a") ? ObjectColorMode.HSLA : ObjectColorMode.HSL;
        }
        if (hasChannels(colorValue, "h", "s", "v")) {
            return hasChannels(colorValue, "a") ? ObjectColorMode.HSVA : ObjectColorMode.HSV;
        }
    }
    return null;
}
function hasChannels(colorObject, ...channels) {
    return channels.every((channel) => channel && colorObject && `${channel}` in colorObject);
}
function colorEqual(value1, value2) {
    return value1?.rgb().array().toString() === value2?.rgb().array().toString();
}
function alphaCompatible(mode) {
    return (mode === CSSColorMode.HEXA ||
        mode === CSSColorMode.RGBA_CSS ||
        mode === CSSColorMode.HSLA_CSS ||
        mode === ObjectColorMode.RGBA ||
        mode === ObjectColorMode.HSLA ||
        mode === ObjectColorMode.HSVA);
}
function toAlphaMode(mode) {
    const alphaMode = mode === CSSColorMode.HEX
        ? CSSColorMode.HEXA
        : mode === CSSColorMode.RGB_CSS
            ? CSSColorMode.RGBA_CSS
            : mode === CSSColorMode.HSL_CSS
                ? CSSColorMode.HSLA_CSS
                : mode === ObjectColorMode.RGB
                    ? ObjectColorMode.RGBA
                    : mode === ObjectColorMode.HSL
                        ? ObjectColorMode.HSLA
                        : mode === ObjectColorMode.HSV
                            ? ObjectColorMode.HSVA
                            : mode;
    return alphaMode;
}
function toNonAlphaMode(mode) {
    const nonAlphaMode = mode === CSSColorMode.HEXA
        ? CSSColorMode.HEX
        : mode === CSSColorMode.RGBA_CSS
            ? CSSColorMode.RGB_CSS
            : mode === CSSColorMode.HSLA_CSS
                ? CSSColorMode.HSL_CSS
                : mode === ObjectColorMode.RGBA
                    ? ObjectColorMode.RGB
                    : mode === ObjectColorMode.HSLA
                        ? ObjectColorMode.HSL
                        : mode === ObjectColorMode.HSVA
                            ? ObjectColorMode.HSV
                            : mode;
    return nonAlphaMode;
}

exports.CSSColorMode = CSSColorMode;
exports.alphaCompatible = alphaCompatible;
exports.alphaToOpacity = alphaToOpacity;
exports.colorEqual = colorEqual;
exports.hexChar = hexChar;
exports.hexToRGB = hexToRGB;
exports.hexify = hexify;
exports.isLonghandHex = isLonghandHex;
exports.isValidHex = isValidHex;
exports.normalizeAlpha = normalizeAlpha;
exports.normalizeColor = normalizeColor;
exports.normalizeHex = normalizeHex;
exports.opacityToAlpha = opacityToAlpha;
exports.parseMode = parseMode;
exports.rgbToHex = rgbToHex;
exports.toAlphaMode = toAlphaMode;
exports.toNonAlphaMode = toNonAlphaMode;
