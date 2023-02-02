/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { a as getAssetPath } from './index-c246d90e.js';
import { g as getSupportedLocale } from './locale-9dd0777b.js';
import { a as dateFromISO } from './date-03618c4c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
/**
 * CLDR cache.
 * Exported for testing purposes.
 *
 * @private
 */
const translationCache = {};
/**
 * CLDR request cache.
 * Exported for testing purposes.
 *
 * @private
 */
const requestCache = {};
/**
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
async function getLocaleData(lang) {
  const locale = getSupportedLocale(lang);
  if (translationCache[locale]) {
    return translationCache[locale];
  }
  if (!requestCache[locale]) {
    requestCache[locale] = fetch(getAssetPath(`./assets/date-picker/nls/${locale}.json`))
      .then((resp) => resp.json())
      .catch(() => {
      console.error(`Translations for "${locale}" not found or invalid, falling back to english`);
      return getLocaleData("en");
    });
  }
  const data = await requestCache[locale];
  translationCache[locale] = data;
  return data;
}
/**
 *  Maps value to valueAsDate
 *
 * @param value
 */
function getValueAsDateRange(value) {
  return value.map((v, index) => dateFromISO(v, index === 1));
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const HEADING_LEVEL = 2;
const TEXT = {
  nextMonth: "Next month",
  prevMonth: "Previous month",
  year: "Year"
};

export { HEADING_LEVEL as H, TEXT as T, getLocaleData as a, getValueAsDateRange as g };

//# sourceMappingURL=resources-8a9faf6e.js.map