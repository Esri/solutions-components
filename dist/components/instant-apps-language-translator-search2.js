/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { s as store, c as getUIDataKeys } from './utils4.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './input.js';
import { d as defineCustomElement$1 } from './progress.js';

const instantAppsLanguageTranslatorSearchCss = ".sc-instant-apps-language-translator-search-h{display:block;position:relative}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__input.sc-instant-apps-language-translator-search{width:235.5px}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list.sc-instant-apps-language-translator-search{position:absolute;margin:0;padding:0;width:100%;max-height:30vh;overflow:auto;border-left:none;background-color:var(--calcite-color-foreground-1);border:1px solid #c0c0c0;z-index:702}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list-item.sc-instant-apps-language-translator-search:first-child{border:none}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list-item.sc-instant-apps-language-translator-search{margin-top:0;padding:0.8em 1em;border-top:solid 1px rgba(110, 110, 110, 0.3);display:flex;flex-direction:column;cursor:pointer;word-break:break-word}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list-item.sc-instant-apps-language-translator-search:hover{background-color:var(--calcite-color-foreground-2)}";
const InstantAppsLanguageTranslatorSearchStyle0 = instantAppsLanguageTranslatorSearchCss;

const BASE = 'instant-apps-language-translator-search';
const CSS = {
    base: BASE,
    input: `${BASE}__input`,
    suggestionList: `${BASE}__suggestion-list`,
    suggestionListItem: `${BASE}__suggestion-list-item`,
};
const InstantAppsLanguageTranslatorSearch = /*@__PURE__*/ proxyCustomElement(class InstantAppsLanguageTranslatorSearch extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.suggestionSelected = createEvent(this, "suggestionSelected", 7);
        this.t9nPlaceholder = undefined;
        this.results = [];
    }
    render() {
        return (h(Host, { key: '71fa373371b7b33faa8f3d91959dc50b1e3b0f34' }, this.renderSearchInput(), this.renderSuggestions()));
    }
    renderSearchInput() {
        return (h("calcite-input", { ref: (node) => (this.searchInput = node), class: CSS.input, onCalciteInputInput: this.handleSearch.bind(this), type: "search", placeholder: this.t9nPlaceholder, icon: "search" }));
    }
    renderSuggestions() {
        return this.results.length > 0 ? this.renderSuggestionList() : null;
    }
    renderSuggestionList() {
        return h("ul", { class: CSS.suggestionList }, this.results.map(result => this.renderSuggestionListItem(result)));
    }
    renderSuggestionListItem(result) {
        return (h("li", { onClick: this.selectSuggestion.bind(this), class: CSS.suggestionListItem, "data-field-name": result.fieldName }, result.userLocaleData.label));
    }
    handleSearch(e) {
        var _a, _b;
        const node = e.target;
        const userInput = (_b = (_a = node.value) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
        const uiData = store.get('uiData');
        const settingKeys = getUIDataKeys();
        const portalItemResrouceT9n = store.get('portalItemResourceT9n');
        const currentLanguage = store.get('currentLanguage');
        const translatedData = portalItemResrouceT9n[currentLanguage];
        const possibleResultKeys = this.getSettingDataItems(settingKeys);
        const matchedResults = possibleResultKeys.filter(this.matchedResultsCallback(uiData, translatedData, userInput, currentLanguage));
        this.results = [
            ...matchedResults.map(matchedKey => {
                const result = Object.assign({ fieldName: matchedKey }, uiData.get(matchedKey));
                return result;
            }),
        ];
    }
    matchedResultsCallback(uiData, translatedData, userInput, currentLanguage) {
        return (key) => {
            var _a;
            const setting = uiData.get(key);
            const { label } = setting.userLocaleData;
            const { value } = setting.userLocaleData;
            const translatedLanguageLabels = uiData.get('translatedLanguageLabels');
            const translatedLanguageLabel = (_a = translatedLanguageLabels === null || translatedLanguageLabels === void 0 ? void 0 : translatedLanguageLabels[currentLanguage]) === null || _a === void 0 ? void 0 : _a[key];
            const translatedLanguageValue = translatedData === null || translatedData === void 0 ? void 0 : translatedData[key];
            const labelMatch = this.testUserInput(label, userInput);
            const valueMatch = this.testUserInput(value, userInput);
            const translatedLanguageLabelMatch = this.testUserInput(translatedLanguageLabel, userInput);
            const translatedLanguageValueMatch = this.testUserInput(translatedLanguageValue, userInput);
            const isMatch = labelMatch || valueMatch || translatedLanguageLabelMatch || translatedLanguageValueMatch;
            return isMatch;
        };
    }
    getSettingDataItems(settingKeys) {
        return settingKeys.filter(key => key !== 'locales' && key !== 'translatedLanguageLabels');
    }
    testUserInput(testValue, userInput) {
        var _a;
        return !!(testValue === null || testValue === void 0 ? void 0 : testValue.trim()) && !!(userInput === null || userInput === void 0 ? void 0 : userInput.trim()) && ((_a = testValue === null || testValue === void 0 ? void 0 : testValue.toLowerCase()) === null || _a === void 0 ? void 0 : _a.search(userInput)) !== -1;
    }
    selectSuggestion(e) {
        const node = e.target;
        const fieldName = node.getAttribute('data-field-name');
        this.suggestionSelected.emit(fieldName);
        this.resetSearchInput();
    }
    resetSearchInput() {
        this.searchInput.value = '';
        this.results = [];
    }
    static get style() { return InstantAppsLanguageTranslatorSearchStyle0; }
}, [2, "instant-apps-language-translator-search", {
        "t9nPlaceholder": [1, "t-9n-placeholder"],
        "results": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-language-translator-search", "calcite-icon", "calcite-input", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-language-translator-search":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsLanguageTranslatorSearch);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsLanguageTranslatorSearch as I, defineCustomElement as d };
