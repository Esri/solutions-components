/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { l as loadModules } from './loadModules-b677d6d7.js';
import { l as languageMap } from './languageUtil-8b54477c.js';

// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
function getComponentClosestLanguage(element) {
  var _a, _b, _c;
  const closestElement = (_a = element.closest('[lang]')) !== null && _a !== void 0 ? _a : (_c = (_b = element.shadowRoot) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = ((closestElement === null || closestElement === void 0 ? void 0 : closestElement.lang) || (navigator === null || navigator === void 0 ? void 0 : navigator.language) || 'en').toLowerCase();
  if (languageMap.has(lang)) {
    return languageMap.get(lang);
  }
  else {
    // "ru-RU" maps to "ru" use case
    if (languageMap.has(lang.slice(0, 2))) {
      return languageMap.get(lang.slice(0, 2));
    }
    else {
      return 'en';
    }
  }
}
function fetchLocaleStringsForComponent(componentName, locale) {
  return new Promise((resolve, reject) => {
    const t9nDir = './assets/t9n';
    const fileName = `resources_${locale}.json`;
    const localeFilePath = `${t9nDir}/${componentName}/${fileName}`;
    const { href } = new URL(localeFilePath, window.location.href);
    fetch(href).then(result => {
      if (result.ok)
        resolve(result.json());
      else
        reject();
    }, () => reject());
  });
}
function getDefaultLanguage(intl, portal) {
  var _a, _b;
  // User profile - locale set in user profile
  const userProfileLocale = (_a = portal === null || portal === void 0 ? void 0 : portal.user) === null || _a === void 0 ? void 0 : _a.culture;
  // Browser - window.navigator.language
  const browserLocale = (_b = window === null || window === void 0 ? void 0 : window.navigator) === null || _b === void 0 ? void 0 : _b.language;
  // ArcGIS JS API - locale currently set in JS api
  const jsapiLocale = intl.getLocale();
  // Fallback locale - "en"
  const fallbackLocale = 'en';
  return intl.normalizeMessageBundleLocale(userProfileLocale || browserLocale || jsapiLocale || fallbackLocale);
}
async function getLocaleComponentStrings(element, locale) {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = locale !== null && locale !== void 0 ? locale : getComponentClosestLanguage(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  }
  catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en');
  }
  return [strings, componentLanguage];
}
async function getMessages(component, messageOverrides) {
  const messages = await getLocaleComponentStrings(component.el);
  updateMessages(component, messages, messageOverrides);
  const [intl] = await loadModules(['esri/intl']);
  intl.onLocaleChange(handleOnLocaleChange(component, messageOverrides));
}
function updateMessages(component, messages, messageOverrides) {
  component.messages = messages[0];
  if (messageOverrides) {
    component.messages = Object.assign(Object.assign({}, component.messages), messageOverrides);
  }
}
function handleOnLocaleChange(component, messageOverrides) {
  return async (locale) => {
    const messages = await getLocaleComponentStrings(component.el, locale);
    updateMessages(component, messages, messageOverrides);
  };
}

export { getDefaultLanguage as a, getLocaleComponentStrings as b, getComponentClosestLanguage as c, getMessages as g };
