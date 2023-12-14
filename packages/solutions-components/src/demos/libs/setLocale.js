/* Copyright (c) 2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

// Get locale sources
const localeInUrl = ((/[\?&](locale\b=\b[^&]*)/g.exec(window.location.search) || []).pop() || '').split('=').pop();
const localeInBrowser = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
var locale = 'en';
if (localeInUrl) {
  locale = localeInUrl;
} else if (localeInBrowser) {
  locale = localeInBrowser;
}

const lang = locale.split("-")[0];
const isRTL = lang === 'ar' || lang === 'he';

// Update the app's page
const dirNode = document.querySelector('html');
dirNode.setAttribute('lang', locale);
dirNode.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

requirejs.config({ config: { i18n: { locale } } });

