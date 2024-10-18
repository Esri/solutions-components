/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { getAssetPath } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { l as languageMap } from './languageUtil.js';

// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
const TEST_ENV_ORIGIN = 'localhost:4444';
const IS_TEST_ENV = new URL(window.location.href).origin.includes(TEST_ENV_ORIGIN);
function getComponentClosestLanguage() {
    // language set by the calling application or browser. defaults to english.
    const lang = (document.documentElement.lang || (navigator === null || navigator === void 0 ? void 0 : navigator.language) || 'en').toLowerCase();
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
async function fetchLocaleStringsForComponent(componentName, locale) {
    const localePath = `assets/t9n/${componentName}/resources_${locale}.json`;
    const fallbackURL = `${getFallbackUrl()}/dist/${localePath}`;
    async function fetchJson(url) {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Fetch failed with status ${response.status}: ${response.statusText}`);
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            // Attempt to read response as text for debugging purposes
            const responseBody = await response.text();
            console.error(`Expected JSON, but received (${contentType}): ${responseBody}`);
            throw new Error('Fetched content is not JSON');
        }
        return await response.json();
    }
    try {
        return await fetchJson(IS_TEST_ENV ? fallbackURL : getAssetPath(localePath));
    }
    catch (primaryError) {
        console.error(`Primary fetch error: ${primaryError}`); // Log primary fetch error with more context
        try {
            return await fetchJson(fallbackURL);
        }
        catch (fallbackError) {
            console.error(`Fallback fetch error: ${fallbackError}`); // Log fallback fetch error with more context
            throw new Error('Both primary and fallback fetches failed');
        }
    }
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
    const componentLanguage = locale !== null && locale !== void 0 ? locale : getComponentClosestLanguage();
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
    try {
        const messages = await getLocaleComponentStrings(component.el);
        updateMessages(component, messages, messageOverrides);
    }
    catch (_a) {
    }
    finally {
        try {
            const [intl] = await loadModules(['esri/intl']);
            intl.onLocaleChange(handleOnLocaleChange(component, messageOverrides));
        }
        catch (_b) { }
    }
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
function getFallbackUrl() {
    return new URL(window.location.href).origin;
}

export { getDefaultLanguage as a, getLocaleComponentStrings as b, getComponentClosestLanguage as c, getMessages as g };
