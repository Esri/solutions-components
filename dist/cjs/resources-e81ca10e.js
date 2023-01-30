/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const index = require('./index-ee607805.js');
const locale = require('./locale-73cab8e8.js');
const date = require('./date-e21b2052.js');

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
  const locale$1 = locale.getSupportedLocale(lang);
  if (translationCache[locale$1]) {
    return translationCache[locale$1];
  }
  if (!requestCache[locale$1]) {
    requestCache[locale$1] = fetch(index.getAssetPath(`./assets/date-picker/nls/${locale$1}.json`))
      .then((resp) => resp.json())
      .catch(() => {
      console.error(`Translations for "${locale$1}" not found or invalid, falling back to english`);
      return getLocaleData("en");
    });
  }
  const data = await requestCache[locale$1];
  translationCache[locale$1] = data;
  return data;
}
/**
 *  Maps value to valueAsDate
 *
 * @param value
 */
function getValueAsDateRange(value) {
  return value.map((v, index) => date.dateFromISO(v, index === 1));
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

exports.HEADING_LEVEL = HEADING_LEVEL;
exports.TEXT = TEXT;
exports.getLocaleData = getLocaleData;
exports.getValueAsDateRange = getValueAsDateRange;

//# sourceMappingURL=resources-e81ca10e.js.map