/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { b as getLocaleComponentStrings } from './locale3.js';
import { c as createStore } from './index3.js';

var EInputType;
(function (EInputType) {
    EInputType["User"] = "user";
    EInputType["Translation"] = "translation";
})(EInputType || (EInputType = {}));
var ESettingType;
(function (ESettingType) {
    ESettingType["String"] = "string";
    ESettingType["TextEditor"] = "textEditor";
})(ESettingType || (ESettingType = {}));
var EIcons;
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
})(EIcons || (EIcons = {}));
var ECalciteMode;
(function (ECalciteMode) {
    ECalciteMode["Light"] = "calcite-mode-light";
    ECalciteMode["Dark"] = "calcite-mode-dark";
})(ECalciteMode || (ECalciteMode = {}));

const CKEditorStyles = `
  .instant-apps-language-translator-item__nested-input .ck.ck-reset.ck-editor.ck-rounded-corners {
    margin-left: 30px !important;
  }
`;

const LanguageTranslatorStore = createStore({
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
    const messages = await getLocaleComponentStrings(el);
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
    return document.body.classList.contains(ECalciteMode.Dark);
}
function initExternalCKEditorStyles() {
    const style = document.createElement('style');
    style.innerHTML = CKEditorStyles;
    document.head.appendChild(style);
}
async function updateLastSave(resource) {
    const data = await resource.fetch();
    const lastSave = Date.now();
    store.set('lastSave', lastSave);
    const dataStr = JSON.stringify(Object.assign(Object.assign({}, data), { lastSave }));
    const blobParts = [dataStr];
    const options = { type: 'application/json' };
    const blob = new Blob(blobParts, options);
    resource.update(blob);
}

export { EIcons as E, generateUIData as a, getLocales as b, getUIDataKeys as c, ESettingType as d, isCalciteModeDark as e, ECalciteMode as f, getMessages as g, EInputType as h, initExternalCKEditorStyles as i, getT9nData as j, languageTranslatorState as l, store as s, updateLastSave as u };
