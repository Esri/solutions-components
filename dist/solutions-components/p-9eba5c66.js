/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { n as numberKeys } from './p-73e23995.js';
import { c as createObserver } from './p-9a9955db.js';
import { c as closestElementCrossShadowBoundary, d as containsCrossShadowBoundary } from './p-83166522.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
// adopted from https://stackoverflow.com/a/66939244
class BigDecimal {
  constructor(input) {
    if (input instanceof BigDecimal) {
      return input;
    }
    const [integers, decimals] = String(input).split(".").concat("");
    this.value =
      BigInt(integers + decimals.padEnd(BigDecimal.DECIMALS, "0").slice(0, BigDecimal.DECIMALS)) +
        BigInt(BigDecimal.ROUNDED && decimals[BigDecimal.DECIMALS] >= "5");
    this.isNegative = input.charAt(0) === "-";
  }
  static _divRound(dividend, divisor) {
    return BigDecimal.fromBigInt(dividend / divisor + (BigDecimal.ROUNDED ? ((dividend * BigInt(2)) / divisor) % BigInt(2) : BigInt(0)));
  }
  static fromBigInt(bigint) {
    return Object.assign(Object.create(BigDecimal.prototype), { value: bigint });
  }
  toString() {
    const s = this.value
      .toString()
      .replace(new RegExp("-", "g"), "")
      .padStart(BigDecimal.DECIMALS + 1, "0");
    const i = s.slice(0, -BigDecimal.DECIMALS);
    const d = s.slice(-BigDecimal.DECIMALS).replace(/\.?0+$/, "");
    const value = i.concat(d.length ? "." + d : "");
    return `${this.isNegative ? "-" : ""}${value}`;
  }
  formatToParts(formatter) {
    const s = this.value
      .toString()
      .replace(new RegExp("-", "g"), "")
      .padStart(BigDecimal.DECIMALS + 1, "0");
    const i = s.slice(0, -BigDecimal.DECIMALS);
    const d = s.slice(-BigDecimal.DECIMALS).replace(/\.?0+$/, "");
    const parts = formatter.formatToParts(BigInt(i));
    this.isNegative && parts.unshift({ type: "minusSign", value: numberStringFormatter.minusSign });
    if (d.length) {
      parts.push({ type: "decimal", value: numberStringFormatter.decimal });
      d.split("").forEach((char) => parts.push({ type: "fraction", value: char }));
    }
    return parts;
  }
  format(formatter) {
    const s = this.value
      .toString()
      .replace(new RegExp("-", "g"), "")
      .padStart(BigDecimal.DECIMALS + 1, "0");
    const i = s.slice(0, -BigDecimal.DECIMALS);
    const d = s.slice(-BigDecimal.DECIMALS).replace(/\.?0+$/, "");
    const iFormatted = `${this.isNegative ? numberStringFormatter.minusSign : ""}${formatter.format(BigInt(i))}`;
    const dFormatted = d.length ? `${numberStringFormatter.decimal}${formatter.format(BigInt(d))}` : "";
    return `${iFormatted}${dFormatted}`;
  }
  add(num) {
    return BigDecimal.fromBigInt(this.value + new BigDecimal(num).value);
  }
  subtract(num) {
    return BigDecimal.fromBigInt(this.value - new BigDecimal(num).value);
  }
  multiply(num) {
    return BigDecimal._divRound(this.value * new BigDecimal(num).value, BigDecimal.SHIFT);
  }
  divide(num) {
    return BigDecimal._divRound(this.value * BigDecimal.SHIFT, new BigDecimal(num).value);
  }
}
// Configuration: constants
BigDecimal.DECIMALS = 100; // number of decimals on all instances
BigDecimal.ROUNDED = true; // numbers are truncated (false) or rounded (true)
BigDecimal.SHIFT = BigInt("1" + "0".repeat(BigDecimal.DECIMALS)); // derived constant
function isValidNumber(numberString) {
  return !(!numberString || isNaN(Number(numberString)));
}
function parseNumberString(numberString) {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return "";
  }
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
    let containsDecimal = false;
    const result = nonExpoNumString
      .split("")
      .filter((value, i) => {
      if (value.match(/\./g) && !containsDecimal) {
        containsDecimal = true;
        return true;
      }
      if (value.match(/\-/g) && i === 0) {
        return true;
      }
      return numberKeys.includes(value);
    })
      .reduce((string, part) => string + part);
    return isValidNumber(result) ? new BigDecimal(result).toString() : "";
  });
}
// regex for number sanitization
const allLeadingZerosOptionallyNegative = /^([-0])0+(?=\d)/;
const decimalOnlyAtEndOfString = /(?!^\.)\.$/;
const allHyphensExceptTheStart = /(?!^-)-/g;
const isNegativeDecimalOnlyZeros = /^-\b0\b\.?0*$/;
const sanitizeNumberString = (numberString) => sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
  const sanitizedValue = nonExpoNumString
    .replace(allHyphensExceptTheStart, "")
    .replace(decimalOnlyAtEndOfString, "")
    .replace(allLeadingZerosOptionallyNegative, "$1");
  return isValidNumber(sanitizedValue)
    ? isNegativeDecimalOnlyZeros.test(sanitizedValue)
      ? sanitizedValue
      : new BigDecimal(sanitizedValue).toString()
    : nonExpoNumString;
});
function sanitizeExponentialNumberString(numberString, func) {
  if (!numberString) {
    return numberString;
  }
  const firstE = numberString.toLowerCase().indexOf("e") + 1;
  if (!firstE) {
    return func(numberString);
  }
  return numberString
    .replace(/[eE]*$/g, "")
    .substring(0, firstE)
    .concat(numberString.slice(firstE).replace(/[eE]/g, ""))
    .split(/[eE]/)
    .map((section, i) => (i === 1 ? func(section.replace(/\./g, "")) : func(section)))
    .join("e")
    .replace(/^e/, "1e");
}
function stringContainsNumbers(string) {
  return numberKeys.some((number) => string.includes(number));
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const defaultLocale = "en";
const locales = [
  "ar",
  "bg",
  "bs",
  "ca",
  "cs",
  "da",
  "de",
  "de-CH",
  "el",
  defaultLocale,
  "en-AU",
  "en-CA",
  "en-GB",
  "es",
  "es-MX",
  "et",
  "fi",
  "fr",
  "fr-CH",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "it-CH",
  "ja",
  "ko",
  "lt",
  "lv",
  "mk",
  "nb",
  "nl",
  "pl",
  "pt",
  "pt-PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-HK",
  "zh-TW"
];
const numberingSystems = [
  "arab",
  "arabext",
  "bali",
  "beng",
  "deva",
  "fullwide",
  "gujr",
  "guru",
  "hanidec",
  "khmr",
  "knda",
  "laoo",
  "latn",
  "limb",
  "mlym",
  "mong",
  "mymr",
  "orya",
  "tamldec",
  "telu",
  "thai",
  "tibt"
];
const isNumberingSystemSupported = (numberingSystem) => numberingSystems.includes(numberingSystem);
const browserNumberingSystem = new Intl.NumberFormat().resolvedOptions().numberingSystem;
const defaultNumberingSystem = browserNumberingSystem === "arab" || !isNumberingSystemSupported(browserNumberingSystem)
  ? "latn"
  : browserNumberingSystem;
const getSupportedNumberingSystem = (numberingSystem) => isNumberingSystemSupported(numberingSystem) ? numberingSystem : defaultNumberingSystem;
function getSupportedLocale(locale) {
  if (locales.indexOf(locale) > -1) {
    return locale;
  }
  if (!locale) {
    return defaultLocale;
  }
  locale = locale.toLowerCase();
  // we support both 'nb' and 'no' (BCP 47) for Norwegian
  if (locale === "nb") {
    return "no";
  }
  if (locale.includes("-")) {
    locale = locale.replace(/(\w+)-(\w+)/, (_match, language, region) => `${language}-${region.toUpperCase()}`);
    if (!locales.includes(locale)) {
      locale = locale.split("-")[0];
    }
  }
  return locales.includes(locale) ? locale : defaultLocale;
}
const connectedComponents = new Set();
/**
 * This utility sets up internals for messages support.
 *
 * It needs to be called in `connectedCallback` before any logic that depends on locale
 *
 * @param component
 */
function connectLocalized(component) {
  updateEffectiveLocale(component);
  if (connectedComponents.size === 0) {
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
      subtree: true
    });
  }
  connectedComponents.add(component);
}
/**
 * This is only exported for components that implemented the now deprecated `locale` prop.
 *
 * Do not use this utils for new components.
 *
 * @param component
 */
function updateEffectiveLocale(component) {
  component.effectiveLocale = getLocale(component);
}
/**
 * This utility tears down internals for messages support.
 *
 * It needs to be called in `disconnectedCallback`
 *
 * @param component
 */
function disconnectLocalized(component) {
  connectedComponents.delete(component);
  if (connectedComponents.size === 0) {
    mutationObserver.disconnect();
  }
}
const mutationObserver = createObserver("mutation", (records) => {
  records.forEach((record) => {
    const el = record.target;
    connectedComponents.forEach((component) => {
      const hasOverridingLocale = !!(component.locale && !component.el.lang);
      const inUnrelatedSubtree = !containsCrossShadowBoundary(el, component.el);
      if (hasOverridingLocale || inUnrelatedSubtree) {
        return;
      }
      const closestLangEl = closestElementCrossShadowBoundary(component.el, "[lang]");
      if (!closestLangEl) {
        component.effectiveLocale = defaultLocale;
        return;
      }
      const closestLang = closestLangEl.lang;
      component.effectiveLocale =
        // user set lang="" means unknown language, so we use default
        closestLangEl.hasAttribute("lang") && closestLang === "" ? defaultLocale : closestLang;
    });
  });
});
/**
 * This util helps resolve a component's locale.
 * It will also fall back on the deprecated `locale` if a component implemented this previously.
 *
 * @param component
 */
function getLocale(component) {
  var _a;
  return (component.el.lang ||
    component.locale ||
    ((_a = closestElementCrossShadowBoundary(component.el, "[lang]")) === null || _a === void 0 ? void 0 : _a.lang) ||
    document.documentElement.lang ||
    defaultLocale);
}
/**
 * This util formats and parses numbers for localization
 */
class NumberStringFormat {
  constructor() {
    this.delocalize = (numberString) => 
    // For performance, (de)localization is skipped if the formatter isn't initialized.
    // In order to localize/delocalize, e.g. when lang/numberingSystem props are not default values,
    // `numberFormatOptions` must be set in a component to create and cache the formatter.
    this._numberFormatOptions
      ? sanitizeExponentialNumberString(numberString, (nonExpoNumString) => nonExpoNumString
        .trim()
        .replace(new RegExp(`[${this._minusSign}]`, "g"), "-")
        .replace(new RegExp(`[${this._group}]`, "g"), "")
        .replace(new RegExp(`[${this._decimal}]`, "g"), ".")
        .replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex))
      : numberString;
    this.localize = (numberString) => this._numberFormatOptions
      ? sanitizeExponentialNumberString(numberString, (nonExpoNumString) => isValidNumber(nonExpoNumString.trim())
        ? new BigDecimal(nonExpoNumString.trim())
          .format(this._numberFormatter)
          .replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group)
        : nonExpoNumString)
      : numberString;
  }
  get group() {
    return this._group;
  }
  get decimal() {
    return this._decimal;
  }
  get minusSign() {
    return this._minusSign;
  }
  get digits() {
    return this._digits;
  }
  get numberFormatter() {
    return this._numberFormatter;
  }
  get numberFormatOptions() {
    return this._numberFormatOptions;
  }
  /**
   * numberFormatOptions needs to be set before localize/delocalize is called to ensure the options are up to date
   */
  set numberFormatOptions(options) {
    options.locale = getSupportedLocale(options === null || options === void 0 ? void 0 : options.locale);
    options.numberingSystem = getSupportedNumberingSystem(options === null || options === void 0 ? void 0 : options.numberingSystem);
    if (
    // No need to create the formatter if `locale` and `numberingSystem`
    // are the default values and `numberFormatOptions` has not been set
    (!this._numberFormatOptions &&
      options.locale === defaultLocale &&
      options.numberingSystem === defaultNumberingSystem &&
      // don't skip initialization if any options besides locale/numberingSystem are set
      Object.keys(options).length === 2) ||
      // cache formatter by only recreating when options change
      JSON.stringify(this._numberFormatOptions) === JSON.stringify(options)) {
      return;
    }
    this._numberFormatOptions = options;
    this._numberFormatter = new Intl.NumberFormat(this._numberFormatOptions.locale, this._numberFormatOptions);
    this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: false,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const index = new Map(this._digits.map((d, i) => [d, i]));
    const parts = new Intl.NumberFormat(this._numberFormatOptions.locale).formatToParts(-12345678.9);
    this._actualGroup = parts.find((d) => d.type === "group").value;
    // change whitespace group characters that don't render correctly
    this._group = this._actualGroup.trim().length === 0 ? " " : this._actualGroup;
    this._decimal = parts.find((d) => d.type === "decimal").value;
    this._minusSign = parts.find((d) => d.type === "minusSign").value;
    this._getDigitIndex = (d) => index.get(d);
  }
}
const numberStringFormatter = new NumberStringFormat();

export { defaultNumberingSystem as a, getSupportedNumberingSystem as b, connectLocalized as c, disconnectLocalized as d, getSupportedLocale as g, isValidNumber as i, numberStringFormatter as n, parseNumberString as p, sanitizeNumberString as s, updateEffectiveLocale as u };

//# sourceMappingURL=p-9eba5c66.js.map