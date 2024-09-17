/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const locale = require('./locale-a1bcb6eb.js');
const index = require('./index-da709a10.js');

exports.EInputType = void 0;
(function (EInputType) {
    EInputType["User"] = "user";
    EInputType["Translation"] = "translation";
})(exports.EInputType || (exports.EInputType = {}));
exports.ESettingType = void 0;
(function (ESettingType) {
    ESettingType["String"] = "string";
    ESettingType["TextEditor"] = "textEditor";
})(exports.ESettingType || (exports.ESettingType = {}));
exports.EIcons = void 0;
(function (EIcons) {
    EIcons["ExpandCollapse"] = "list-merge";
    EIcons["SettingIndicator"] = "list-button";
    EIcons["Popover"] = "information";
    EIcons["Expanded"] = "chevron-down";
    EIcons["Collapsed"] = "chevron-right";
    EIcons["Copy"] = "copy-to-clipboard";
    EIcons["Breadcrumb"] = "chevron-right";
    EIcons["DefaultIcon"] = "language";
    EIcons["Title"] = "title";
    EIcons["Subtitle"] = "subheading";
    EIcons["Text"] = "text";
    EIcons["Description"] = "description";
    EIcons["Button"] = "button";
    EIcons["String"] = "string";
})(exports.EIcons || (exports.EIcons = {}));
exports.ECalciteMode = void 0;
(function (ECalciteMode) {
    ECalciteMode["Light"] = "calcite-mode-light";
    ECalciteMode["Dark"] = "calcite-mode-dark";
})(exports.ECalciteMode || (exports.ECalciteMode = {}));

const LanguageTranslatorStore = index.createStore({
    uiData: null,
    currentLanguage: null,
    lastSave: null,
    saving: false,
    currentLocaleSettingItem: null,
    portalItemResource: null,
    portalItemResourceT9n: null,
});
const languageTranslatorState = LanguageTranslatorStore.state;
const store = LanguageTranslatorStore;

function generateUIData(appSettings, locales) {
    var _a;
    if (!appSettings)
        return;
    const existingUIData = store.get('uiData');
    const uiData = new Map();
    uiData.set('locales', locales);
    uiData.set('translatedLanguageLabels', Object.assign({}, appSettings.translatedLanguageLabels));
    appSettings.content.forEach(contentItem => {
        var _a, _b;
        const { type, label, value, uiLocation } = contentItem;
        const setting = existingUIData === null || existingUIData === void 0 ? void 0 : existingUIData.get(contentItem.id);
        uiData.set(contentItem.id, {
            userLocaleData: {
                type: type !== null && type !== void 0 ? type : null,
                label: label !== null && label !== void 0 ? label : null,
                value: value !== null && value !== void 0 ? value : null,
            },
            expanded: true,
            selected: (_a = setting === null || setting === void 0 ? void 0 : setting['selected']) !== null && _a !== void 0 ? _a : false,
            uiLocation,
            tip: (_b = contentItem === null || contentItem === void 0 ? void 0 : contentItem.tip) !== null && _b !== void 0 ? _b : null,
        });
    });
    const settingKeys = appSettings.content.map(contentItem => contentItem.id);
    const noneSelected = settingKeys.every((key) => {
        const setting = uiData.get(key);
        return !setting.selected;
    });
    const setting = uiData.get(settingKeys[0]);
    if (noneSelected && setting) {
        const existingData = existingUIData === null || existingUIData === void 0 ? void 0 : existingUIData.get(settingKeys[0]);
        setting.selected = (_a = existingData === null || existingData === void 0 ? void 0 : existingData['selected']) !== null && _a !== void 0 ? _a : true;
    }
    return uiData;
}
async function getMessages(el) {
    const messages = await locale.getLocaleComponentStrings(el);
    return messages[0];
}
function getUIDataKeys() {
    var _a;
    const settingKeys = [];
    (_a = languageTranslatorState.uiData) === null || _a === void 0 ? void 0 : _a.forEach((_value, key) => {
        if (key !== 'locales' && key !== 'translatedLanguageLabels') {
            settingKeys.push(key);
        }
    });
    return settingKeys;
}
function getT9nData(locale, data) {
    const portalItemResourceT9n = store.get('portalItemResourceT9n');
    let dataToWrite;
    if (!(portalItemResourceT9n === null || portalItemResourceT9n === void 0 ? void 0 : portalItemResourceT9n[locale])) {
        portalItemResourceT9n[locale] = {};
    }
    dataToWrite = Object.assign(Object.assign({}, portalItemResourceT9n), { [locale]: Object.assign(Object.assign({}, portalItemResourceT9n[locale]), data) });
    return dataToWrite;
}
function getLocales(localeItems) {
    var _a;
    return (_a = localeItems === null || localeItems === void 0 ? void 0 : localeItems.map(localeItem => localeItem.locale)) !== null && _a !== void 0 ? _a : [];
}
function isCalciteModeDark() {
    return document.body.classList.contains(exports.ECalciteMode.Dark);
}

exports.generateUIData = generateUIData;
exports.getLocales = getLocales;
exports.getMessages = getMessages;
exports.getT9nData = getT9nData;
exports.getUIDataKeys = getUIDataKeys;
exports.isCalciteModeDark = isCalciteModeDark;
exports.languageTranslatorState = languageTranslatorState;
exports.store = store;
