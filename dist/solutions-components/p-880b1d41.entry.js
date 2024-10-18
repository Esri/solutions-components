/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, F as Fragment, g as getElement } from './p-4e6eb06e.js';
import { i as initExternalCKEditorStyles, g as getMessages, a as generateUIData, s as store, E as EIcons, b as getLocales, l as languageTranslatorState, c as getUIDataKeys, u as updateLastSave } from './p-50fb7f47.js';
import { l as loadModules } from './p-4cd4cb85.js';
import { c as getComponentClosestLanguage } from './p-5ff711ee.js';
import { g as getPortalItemResource, f as fetchResourceData, L as LANGUAGE_DATA } from './p-7eb5d31a.js';
import './p-dc9d4be3.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-ac122d9e.js';

const instantAppsLanguageTranslatorCss = ".sc-instant-apps-language-translator-h{display:block}.sc-instant-apps-language-translator-h calcite-modal.sc-instant-apps-language-translator{--calcite-modal-content-padding:0}.sc-instant-apps-language-translator-h .instant-apps-language-translator__header.sc-instant-apps-language-translator{display:flex;justify-content:space-between;width:100%}.sc-instant-apps-language-translator-h .instant-apps-language-translator__header-text.sc-instant-apps-language-translator{font-size:18px}.sc-instant-apps-language-translator-h .instant-apps-language-translator__saving-indicator.sc-instant-apps-language-translator{display:flex;align-items:center;font-size:14.5px;color:var(--calcite-color-brand)}.sc-instant-apps-language-translator-h .instant-apps-language-translator__writing-icon.sc-instant-apps-language-translator{display:flex;justify-content:center;align-items:center;margin-right:5px}.sc-instant-apps-language-translator-h .instant-apps-language-translator__close-button.sc-instant-apps-language-translator{width:175px}.sc-instant-apps-language-translator-h .instant-apps-language-translator__header-tip.sc-instant-apps-language-translator{padding:20px;max-width:45vw}.sc-instant-apps-language-translator-h .instant-apps-language-translator__top-bar.sc-instant-apps-language-translator{display:flex;width:100%;position:sticky;top:0;background:var(--calcite-color-foreground-1);z-index:1}.sc-instant-apps-language-translator-h .instant-apps-language-translator__top-bar.sc-instant-apps-language-translator calcite-label.sc-instant-apps-language-translator{--calcite-label-margin-bottom:0;font-weight:var(--calcite-font-weight-medium)}.sc-instant-apps-language-translator-h .instant-apps-language-translator__top-bar-section.sc-instant-apps-language-translator{box-sizing:border-box;display:flex;align-items:center;width:50%;padding:0.5%}.sc-instant-apps-language-translator-h .instant-apps-language-translator__user-lang-text.sc-instant-apps-language-translator{font-weight:var(--calcite-font-weight-medium)}.sc-instant-apps-language-translator-h .instant-apps-language-translator__top-bar-section.sc-instant-apps-language-translator:first-child{display:flex;justify-content:space-between}.sc-instant-apps-language-translator-h .instant-apps-language-translator__top-bar-section.sc-instant-apps-language-translator:nth-child(2) calcite-select.sc-instant-apps-language-translator{width:255px}.sc-instant-apps-language-translator-h .instant-apps-language-translator__collapse-search-container.sc-instant-apps-language-translator{display:flex;justify-content:space-between}.sc-instant-apps-language-translator-h .instant-apps-language-translator__collapse-search-container.sc-instant-apps-language-translator calcite-input.sc-instant-apps-language-translator{width:300px;margin-left:30px}.sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator{display:flex;align-items:center}.sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator .instant-apps-language-translator__close-button.sc-instant-apps-language-translator,.sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator .instant-apps-language-translator__saving-indicator.sc-instant-apps-language-translator,.sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator .instant-apps-language-translator__last-auto-save.sc-instant-apps-language-translator{margin-right:20px}.ck.ck-reset.ck-editor.ck-rounded-corners.sc-instant-apps-language-translator{margin-top:10px !important;margin-left:55px !important}.ck-editor__editable.sc-instant-apps-language-translator{height:70px !important;font-size:0.875rem !important;line-height:1.375 !important}.ck.ck-editor__editable_inline.sc-instant-apps-language-translator>.sc-instant-apps-language-translator:first-child,.ck.ck-editor__editable_inline.sc-instant-apps-language-translator>.sc-instant-apps-language-translator:last-child{--ck-spacing-large:0.5rem !important}html[dir=rtl] .sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator .instant-apps-language-translator__close-button.sc-instant-apps-language-translator,html[dir=rtl] .sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator .instant-apps-language-translator__saving-indicator.sc-instant-apps-language-translator,html[dir=rtl] .sc-instant-apps-language-translator-h .instant-apps-language-translator__primary-content.sc-instant-apps-language-translator .instant-apps-language-translator__last-auto-save.sc-instant-apps-language-translator{margin-right:unset;margin-left:20px}";
const InstantAppsLanguageTranslatorStyle0 = instantAppsLanguageTranslatorCss;

const BASE = 'instant-apps-language-translator';
const CSS = {
    BASE,
    header: `${BASE}__header`,
    headerText: `${BASE}__header-text`,
    savingIndicator: `${BASE}__saving-indicator`,
    closeButton: `${BASE}__close-button`,
    headerTip: `${BASE}__header-tip`,
    topBar: `${BASE}__top-bar`,
    topBarSection: `${BASE}__top-bar-section`,
    collapseSearchContainer: `${BASE}__collapse-search-container`,
    userLangText: `${BASE}__user-lang-text`,
    lastItem: `${BASE}--last-item`,
    writingIcon: `${BASE}__writing-icon`,
    primaryContent: `${BASE}__primary-content`,
    lastAutoSave: `${BASE}__last-auto-save`,
};
const InstantAppsLanguageTranslator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.translatorDataUpdated = createEvent(this, "translatorDataUpdated", 7);
        this.portalItem = undefined;
        this.appSettings = undefined;
        this.locales = undefined;
        this.open = false;
        this.userLocaleInputOnChangeCallback = undefined;
        this.translatedLocaleInputOnChangeCallback = undefined;
        this.saving = false;
        this.messages = undefined;
        this.isCollapse = true;
    }
    handleT9nItemUpdate() {
        this.translatorDataUpdated.emit();
    }
    handleLocaleChange() {
        this.initUIData();
        this.initSelectLanguage();
    }
    handleAppSettings() {
        this.initUIData();
        this.initSelectLanguage();
    }
    componentWillLoad() {
        initExternalCKEditorStyles();
    }
    async componentDidLoad() {
        this.initialize();
    }
    async initialize() {
        const [intl, request] = await loadModules(['esri/intl', 'esri/request']);
        this.intl = intl;
        this.request = request;
        await this.initMessages();
        this.initUIData();
        this.initPortalItemResourceT9nData();
        this.initSelectLanguage();
    }
    // Init t9n files
    async initMessages() {
        try {
            const { el } = this;
            const messages = await getMessages(el);
            this.messages = messages;
            return Promise.resolve();
        }
        catch (_a) {
            return Promise.reject();
        }
    }
    initUIData() {
        // Initialize store with UI Data (for translator-item rendering)
        const { appSettings, locales } = this;
        const uiData = generateUIData(appSettings, locales);
        store.set('uiData', uiData);
    }
    // Initialize selected language
    initSelectLanguage() {
        var _a, _b;
        if (!this.intl)
            return;
        const { locales } = this;
        const initialLanguage = (_b = (_a = locales === null || locales === void 0 ? void 0 : locales[0]) === null || _a === void 0 ? void 0 : _a.locale) !== null && _b !== void 0 ? _b : this.intl.getLocale();
        const currentLanguage = store.get('currentLanguage');
        const reselectLanguage = this.locales.filter(locale => locale.locale === currentLanguage).length === 0;
        if (reselectLanguage) {
            store.set('currentLanguage', initialLanguage);
        }
    }
    // Fetch portal item resource associated with portal item. Fetch and store t9n data
    async initPortalItemResourceT9nData() {
        try {
            const portalItemResource = (await getPortalItemResource(this.portalItem));
            store.set('portalItemResource', portalItemResource);
            const t9nData = await fetchResourceData(this.request, portalItemResource);
            store.set('lastSave', t9nData.lastSave);
            store.set('portalItemResourceT9n', t9nData !== null && t9nData !== void 0 ? t9nData : {});
        }
        catch (_a) { }
    }
    render() {
        return (h(Host, { key: '1f68786d3e9bced7a2242033cf51fc4937bc910a' }, this.renderModal(), this.renderPopoverTip()));
    }
    renderModal() {
        return (h("calcite-modal", { open: this.open, scale: "l", fullscreen: true, onCalciteModalClose: this.close.bind(this) }, this.renderHeader(), this.renderContent(), this.renderPrimaryContent()));
    }
    renderPopoverTip() {
        var _a;
        return (h("calcite-popover", { label: "", referenceElement: "headerTip", placement: "trailing", "auto-close": true, closable: true }, h("div", { class: CSS.headerTip }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.headerTip)));
    }
    renderHeader() {
        return (h("header", { class: CSS.header, slot: "header" }, this.renderHeaderText()));
    }
    renderHeaderText() {
        const { messages } = this;
        return (h("div", { class: CSS.headerText }, h("span", null, messages === null || messages === void 0 ? void 0 : messages.header), h("calcite-button", { id: "headerTip", appearance: "transparent" }, h("calcite-icon", { icon: EIcons.Popover, scale: "s" }))));
    }
    renderSavingIndicator() {
        var _a;
        const t9n = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.saving;
        return (h("div", { class: CSS.savingIndicator }, h("calcite-loader", { label: t9n, inline: true }), h("span", null, t9n)));
    }
    renderContent() {
        const localeItems = getLocales(this.locales);
        return (h("div", { slot: "content" }, this.renderTopBar(), (localeItems === null || localeItems === void 0 ? void 0 : localeItems.length) > 0 ? this.renderUIData() : this.renderNotice()));
    }
    renderTopBar() {
        return (h("div", { class: CSS.topBar }, this.renderLeadingTopBarSection(), this.renderTrailingTopBarSection()));
    }
    renderLeadingTopBarSection() {
        return (h("div", { class: CSS.topBarSection }, this.renderUserLocale(), this.renderCollapseSearchContainer()));
    }
    renderUserLocale() {
        var _a;
        const languages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.languages;
        const localeFlag = getComponentClosestLanguage();
        const langText = languages === null || languages === void 0 ? void 0 : languages[localeFlag];
        return h("div", { class: CSS.userLangText }, langText);
    }
    renderCollapseSearchContainer() {
        return (h("div", { class: CSS.collapseSearchContainer }, this.renderExpandCollapseButton(), this.renderSearch()));
    }
    renderExpandCollapseButton() {
        const { isCollapse, messages } = this;
        const text = isCollapse ? messages === null || messages === void 0 ? void 0 : messages.collapseAll : messages === null || messages === void 0 ? void 0 : messages.expandAll;
        return (h(Fragment, null, h("slot", { name: "primary-custom-action" }), h("slot", { name: "secondary-custom-action" }), h("calcite-button", { onClick: this.handleExpandCollapseAll.bind(this), appearance: "transparent", "icon-start": EIcons.ExpandCollapse }, text)));
    }
    renderSearch() {
        var _a;
        return (h("instant-apps-language-translator-search", { onSuggestionSelected: this.onSuggestionSelect.bind(this), t9nPlaceholder: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.searchPlaceholder }));
    }
    renderTrailingTopBarSection() {
        return (h("div", { class: CSS.topBarSection }, this.renderLanguageSelection(), h("slot", { name: "translation-custom-action" })));
    }
    renderLanguageSelection() {
        var _a;
        return (h("calcite-label", { layout: "inline" }, (_a = this.messages) === null || _a === void 0 ? void 0 :
            _a.translatedLanguage, h("calcite-select", { label: "", onCalciteSelectChange: this.handleLanguageSelection.bind(this) }, this.renderTranslatedLangOptions())));
    }
    renderTranslatedLangOptions() {
        const uiData = store.get('uiData');
        const locales = uiData === null || uiData === void 0 ? void 0 : uiData.get('locales');
        const localeFlags = getLocales(locales);
        const partialSupportLocales = Object.keys(LANGUAGE_DATA.partial);
        return localeFlags === null || localeFlags === void 0 ? void 0 : localeFlags.map(locale => {
            const isPartial = partialSupportLocales.indexOf(locale) !== -1;
            const type = isPartial ? 'partial' : 'full';
            const data = LANGUAGE_DATA[type];
            const { language, translated } = data[locale];
            const text = `${language} - ${translated}`;
            return (h("calcite-option", { key: `translated-lang-option-${locale}`, value: locale }, text));
        });
    }
    renderUIData() {
        if (!(languageTranslatorState === null || languageTranslatorState === void 0 ? void 0 : languageTranslatorState.uiData))
            return;
        const uiDataKeys = getUIDataKeys();
        return h("div", null, uiDataKeys === null || uiDataKeys === void 0 ? void 0 : uiDataKeys.map((key, keyIndex) => this.renderUIDataItem(key, keyIndex, uiDataKeys.length)));
    }
    renderNotice() {
        var _a;
        const noLanguage = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.noLanguage;
        return (h("calcite-notice", { open: true, icon: "exclamation-mark-triangle", kind: "warning" }, h("div", { slot: "title" }, noLanguage === null || noLanguage === void 0 ? void 0 : noLanguage.title), h("div", { slot: "message" }, noLanguage === null || noLanguage === void 0 ? void 0 : noLanguage.message)));
    }
    renderUIDataItem(key, keyIndex, uiDataKeysLen) {
        var _a, _b;
        const translatedLanguageLabels = (_b = (_a = this.appSettings) === null || _a === void 0 ? void 0 : _a.translatedLanguageLabels) === null || _b === void 0 ? void 0 : _b[languageTranslatorState.currentLanguage];
        const isLast = `${keyIndex === uiDataKeysLen - 1 ? CSS.lastItem : ''}`;
        const setting = this.appSettings.content.filter(contentItem => contentItem.id === key)[0];
        return (h("instant-apps-language-translator-item", { key: `${key}-${keyIndex}`, class: isLast, fieldName: key, translatedLanguageLabels: translatedLanguageLabels, setting: setting, userLocaleInputOnChangeCallback: async (fieldName, value) => {
                try {
                    await this.userLocaleInputOnChangeCallback(fieldName, value);
                    const resource = store.get('portalItemResource');
                    updateLastSave(resource);
                }
                catch (_a) { }
            }, translatedLocaleInputOnChangeCallback: async (fieldName, value, locale, resource) => {
                try {
                    await this.translatedLocaleInputOnChangeCallback(fieldName, value, locale, resource);
                    updateLastSave(resource);
                }
                catch (_a) { }
            } }));
    }
    renderPrimaryContent() {
        var _a, _b;
        return (h("div", { class: CSS.primaryContent, slot: "primary" }, store.get('saving') ? this.renderSavingIndicator() : null, store.get('lastSave') ? (h("span", { key: "last-save", class: CSS.lastAutoSave }, (_a = this.messages) === null || _a === void 0 ? void 0 :
            _a.lastAutoSave, " ", this.intl.formatDate(store.get('lastSave')))) : null, h("calcite-button", { onClick: () => (this.open = false), class: CSS.closeButton }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.close)));
    }
    handleExpandCollapseAll() {
        this.isCollapse = !this.isCollapse;
        const uiData = new Map(languageTranslatorState.uiData);
        const uiDataKeys = getUIDataKeys();
        uiDataKeys.forEach(key => (uiData.get(key).expanded = this.isCollapse));
        store.set('uiData', uiData);
    }
    onSuggestionSelect(e) {
        const fieldName = e.detail;
        const uiData = new Map(languageTranslatorState.uiData);
        const uiDataKeys = getUIDataKeys();
        const handleSelection = (key) => {
            const setting = uiData.get(key);
            if (key === fieldName) {
                setting.selected = true;
                return;
            }
            setting.selected = false;
        };
        uiDataKeys.forEach(handleSelection);
        store.set('uiData', uiData);
    }
    close() {
        this.open = false;
    }
    handleLanguageSelection(e) {
        const node = e.target;
        const value = node.value;
        store.set('currentLanguage', value);
    }
    /**
     * Gets translation data for all languages and fields.
     */
    async getTranslationData() {
        return store.get('portalItemResourceT9n');
    }
    /**
     * Updates translation data for all languages and fields.
     */
    async setTranslationData(data) {
        return store.set('portalItemResourceT9n', data);
    }
    /**
     * Gets portal item resource containing the translation data.
     */
    async getPortalItemResource() {
        return store.get('portalItemResource');
    }
    /**
     * Batch write data to associated portal item resource.
     */
    async batchWriteToPortalItemResource(data) {
        store.set('saving', true);
        try {
            const resource = await this.getPortalItemResource();
            const lastSave = Date.now();
            store.set('lastSave', lastSave);
            const dataStr = JSON.stringify(Object.assign(Object.assign({}, data), { lastSave }));
            const blobParts = [dataStr];
            const options = { type: 'application/json' };
            const blob = new Blob(blobParts, options);
            await resource.update(blob);
            setTimeout(() => store.set('saving', false), 1500);
            this.translatorDataUpdated.emit();
            return Promise.resolve();
        }
        catch (err) {
            console.error('Error writing to portal item resource: ', err);
            store.set('saving', false);
            return Promise.reject();
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "locales": ["handleLocaleChange"],
        "appSettings": ["handleAppSettings"]
    }; }
};
InstantAppsLanguageTranslator.style = InstantAppsLanguageTranslatorStyle0;

export { InstantAppsLanguageTranslator as instant_apps_language_translator };
