/* Copyright (c) 2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

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
window.localeInUrl = localeInUrl;

// Update the app's page
const dirNode = document.querySelector('html');
dirNode.setAttribute('lang', locale);
dirNode.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

// Test support and initialize requirejs
const requireConfig = { paths: { vs: '../assets/monaco-editor/min/vs' } };

const appLocale = getLocaleSupport(locale, '|ar|bg|bs|ca|cs|da|de|el|en|es|et|fi|fr|he|hr|hu|id|it|ja|ko|lt|lv|nb|nl|no|pl|pt-br|pt-pt|ro|ru|sk|sl|sr|sv|th|tr|uk|vi|zh-cn|zh-hk|zh-tw|');
if (appLocale) {
  requireConfig.config = { i18n: { locale: appLocale } };
}

const monacoLocale = getLocaleSupport(locale, '|de|es|fr|it|ja|ko|ru|zh-cn|zh-tw|');
if (monacoLocale) {
  requireConfig['vs/nls'] = { availableLanguages: { '*': monacoLocale } };
}

requirejs.config(requireConfig);


// -------------------------------------------------------------------------------------------------------------------//

/**
 * Tests if the two-letter language code part of a locale is `ar` or `he`.
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
 * Returns highest level of support for a locale: locale and region, locale, or not supported.
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
