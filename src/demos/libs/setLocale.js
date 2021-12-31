/* Copyright (c) 2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/*
  Defines global variables
    * locale: Locale as defined in URL, local storage, or browser (in that priority order), defaulting to "en";
          value is coerced to lowercase

  Defines script variables
    * appLocale: `locale` constrained to the locales supported by this app, defaulting to null
    * dirNode: The `html` node, in which this script sets the `lang` and `dir` attributes
    * isRTL: Indicates if the locale represents a RTL locale
    * lang: Contains the language (initial) part of `locale`, e.g., "fr" for "fr" or "fr-ch" locales
    * localeConfig: app and monaco editor locale configuration
    * localeInBrowser: Locale as defined as the first of navigator.languages, navigator.language, or
    *     naviagor.userLanguage (in that priority order), defaulting to null
    * localeInLocalStorage: Locale as defined in local storage under the key `locale`, defaulting to null
    * localeInUrl: locale as defined in URL via the `locale` parameter, defaulting to ""
    * monacoLocale: `locale` constrained to the locales supported by the monaco editor, defaulting to null

  Defines global functions
    * getIsRTL: Tests if the two-letter language code represents a RTL language.
    * getLocaleLang: Returns language part of a locale specification.
    * getLocaleSupport: Returns highest level of support for a locale: locale and region, locale, or not supported.
*/

// Get locale sources
const localeInUrl = ((/[\?&](locale\b=\b[^&]*)/g.exec(window.location.search) || []).pop() || '').split('=').pop();
const localeInLocalStorage = localStorage.getItem('locale');
const localeInBrowser = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
var locale = 'en';
if (localeInUrl) {
  locale = localeInUrl.toLowerCase();
} else if (localeInLocalStorage) {
  locale = localeInLocalStorage.toLowerCase();
} else if (localeInBrowser) {
  locale = localeInBrowser.toLowerCase();
}

const lang = locale.split("-")[0];
const isRTL = getIsRTL(locale);

// Update the app's page
const dirNode = document.querySelector('html');
dirNode.setAttribute('lang', locale);
dirNode.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

// Test support and initialize config file for loader
const localeConfig = {
  isRTL,
  paths: { vs: '../assets/monaco-editor/min/vs' }
};

const appLocale = getLocaleSupport(locale, '|ar|bg|bs|ca|cs|da|de|el|en|es|et|fi|fr|he|hr|hu|id|it|ja|ko|lt|lv|nb|nl|no|pl|pt-br|pt-pt|ro|ru|sk|sl|sr|sv|th|tr|uk|vi|zh-cn|zh-hk|zh-tw|');
if (appLocale) {
  localeConfig.config = { i18n: { locale: appLocale } };  // requirejs i18n format
}

const monacoLocale = getLocaleSupport(locale, '|de|es|fr|it|ja|ko|ru|zh-cn|zh-tw|');
if (monacoLocale) {
  localeConfig['vs/nls'] = { availableLanguages: { '*': monacoLocale } };
}

// -------------------------------------------------------------------------------------------------------------------//

/**
 * Tests if the two-letter language code represents a RTL language.
 *
 * @param [string] locale Locale to test
 * @return [boolean] Locale's language is RTL (i.e., `ar` or `he`)
 */
function getIsRTL(locale) {
  const lang = getLocaleLang(locale);
  return lang === 'ar' || lang === 'he';
}

/**
 * Returns language part of a locale specification.
 *
 * @param [string] locale Specification from which to extract lang (characters
 *               before optional "-")
 * @return [string] Language in locale
 */
function getLocaleLang(locale) {
  return locale.split("-")[0];
}

/**
 * Returns highest level of support for a locale: locale and region, locale, or
 * not supported.
 *
 * @param [string] locale Locale to test
 * @param [string] supportedLocales "|"-separated list of supported locales
 * @return [string] Locale with region if supported, or locale language if supported, or null
 */
function getLocaleSupport(locale, supportedLocales) {
  if (locale) {
    if (supportedLocales.indexOf('|' + locale + '|') >= 0) {
      return locale;
    } else if (locale.length > 2) {
      // Fall back to language without region
      const lang = getLocaleLang(locale);
      if (supportedLocales.indexOf('|' + lang + '|') >= 0) {
        return lang;
      }
    }
  }
  return null;
}
