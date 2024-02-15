/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-164d485a.js';
import { g as getMessages } from './utils-b46c535b.js';
import { l as loadModules } from './loadModules-b677d6d7.js';
import { a as getDefaultLanguage } from './locale-c7d9e9aa.js';
import { g as getPortalItemResource, f as fetchResourceData } from './languageSwitcher-62232826.js';
import './index-477ea182.js';
import './esri-loader-eda07632.js';
import './_commonjsHelpers-d5f9d613.js';
import './languageUtil-8b54477c.js';

const instantAppsLanguageSwitcherCss = ":host{display:block;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);min-width:200px}:host calcite-dropdown{width:100%}:host calcite-button{--calcite-color-brand:var(--calcite-color-text-3);--calcite-color-brand-hover:var(--calcite-color-text-3)}";

const InstantAppsLanguageSwitcher = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selectedLanguageUpdated = createEvent(this, "selectedLanguageUpdated", 7);
        this.icon = 'language';
        this.portalItem = undefined;
        this.view = undefined;
        this.locales = [];
        this.defaultLocale = undefined;
        this.messages = undefined;
        this.selectedLanguage = null;
        this.t9nData = null;
    }
    async componentWillLoad() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const [intl, WebMap, request] = await loadModules(['esri/intl', 'esri/WebMap', 'esri/request']);
        this.intl = intl;
        this.request = request;
        this.messages = await getMessages(document.createElement('instant-apps-language-translator'));
        try {
            this.portalItemResource = (await getPortalItemResource(this.portalItem));
            const t9nData = await fetchResourceData(request, this.portalItemResource);
            this.t9nData = t9nData !== null && t9nData !== void 0 ? t9nData : {};
        }
        catch (err) {
            this.t9nData = {};
            console.error('NO PORTAL ITEM RESOURCE AVAILABLE.');
        }
        finally {
            // Language that the app was configured in
            this.userLocale = this.defaultLocale;
            // Language from URL parameter
            const params = new URLSearchParams(window.location.search);
            const localeUrlParam = params.get('locale');
            const localeUrlFromParamExists = ((_c = (_b = (_a = this.locales) === null || _a === void 0 ? void 0 : _a.map(locale => locale === null || locale === void 0 ? void 0 : locale.locale)) === null || _b === void 0 ? void 0 : _b.filter(localeFlag => localeFlag === localeUrlParam)) === null || _c === void 0 ? void 0 : _c.length) > 0;
            // Browser's default language
            const defaultLangauge = getDefaultLanguage(intl, this.portalItem.portal);
            const localeFromDefaultLanguageExists = ((_f = (_e = (_d = this.locales) === null || _d === void 0 ? void 0 : _d.map(locale => locale === null || locale === void 0 ? void 0 : locale.locale)) === null || _e === void 0 ? void 0 : _e.filter(localeFlag => localeFlag === defaultLangauge)) === null || _f === void 0 ? void 0 : _f.length) > 0;
            this.selectedLanguage = localeUrlFromParamExists ? localeUrlParam : localeFromDefaultLanguageExists ? defaultLangauge : this.userLocale;
            const selectedLanguage = this.selectedLanguage;
            if (selectedLanguage !== this.userLocale) {
                this.calciteDropdownItemSelectCallback(selectedLanguage)();
                this.selectedLanguageUpdated.emit({ locale: selectedLanguage, data: (_h = (_g = this.t9nData) === null || _g === void 0 ? void 0 : _g[selectedLanguage]) !== null && _h !== void 0 ? _h : null });
            }
            if (this.view) {
                const webmap = this.view.map;
                this.defaultWebMapId = webmap.portalItem.id;
                const translatedWebmap = (_l = (_k = (_j = this.locales) === null || _j === void 0 ? void 0 : _j.filter(localeItem => (localeItem === null || localeItem === void 0 ? void 0 : localeItem.webmap) && (localeItem === null || localeItem === void 0 ? void 0 : localeItem.webmap) !== this.defaultWebMapId && (localeItem === null || localeItem === void 0 ? void 0 : localeItem.locale) === this.selectedLanguage)) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.webmap;
                if (translatedWebmap) {
                    this.view.map = new WebMap({
                        portalItem: {
                            id: translatedWebmap,
                        },
                    });
                }
            }
        }
    }
    render() {
        const trigger = this.renderTrigger();
        const dropdown = this.renderDropdownItems();
        const defaultLocale = this.renderDefaultLocale();
        return (h("calcite-dropdown", { onCalciteDropdownBeforeOpen: () => (this.trigger.iconEnd = 'chevron-up'), onCalciteDropdownBeforeClose: () => (this.trigger.iconEnd = 'chevron-down'), "width-scale": "m" }, trigger, defaultLocale, dropdown));
    }
    renderDefaultLocale() {
        const { userLocale } = this;
        return (h("calcite-dropdown-item", { key: `default-${userLocale}`, onCalciteDropdownItemSelect: this.calciteDropdownItemSelectCallback(userLocale), selected: this.selectedLanguage === this.userLocale }, this.getSelectedLanguageText(userLocale)));
    }
    renderTrigger() {
        return (h("calcite-button", { ref: node => (this.trigger = node), slot: "trigger", "icon-start": this.icon, "icon-end": "chevron-down", width: "full", appearance: "outline" }, this.getSelectedLanguageText(this.selectedLanguage)));
    }
    renderDropdownItems() {
        var _a, _b;
        return (_b = (_a = this.locales) === null || _a === void 0 ? void 0 : _a.map(localeItem => localeItem.locale)) === null || _b === void 0 ? void 0 : _b.map(translatedLanguage => this.renderDropdownItem(translatedLanguage));
    }
    renderDropdownItem(translatedLanguage) {
        const text = this.getSelectedLanguageText(translatedLanguage);
        const selected = translatedLanguage === this.selectedLanguage;
        return (h("calcite-dropdown-item", { key: translatedLanguage, selected: selected, onCalciteDropdownItemSelect: this.calciteDropdownItemSelectCallback(translatedLanguage) }, text));
    }
    calciteDropdownItemSelectCallback(translatedLanguage) {
        return async () => {
            var _a, _b, _c, _d, _e;
            this.selectedLanguage = translatedLanguage;
            const { intl, selectedLanguage, t9nData, userLocale } = this;
            const eventData = this.locales.filter(locale => locale.locale === selectedLanguage)[0];
            if (selectedLanguage !== userLocale)
                eventData['data'] = t9nData[translatedLanguage];
            const params = new URLSearchParams(window.location.search);
            if (selectedLanguage !== userLocale) {
                // Set url parameter 'locale' with value
                params.set('locale', this.selectedLanguage);
            }
            else {
                params.delete('locale');
            }
            intl.setLocale(selectedLanguage);
            if (this.view) {
                const [WebMap] = await loadModules(['esri/WebMap']);
                const webmap = (_b = (_a = this.locales.filter(localeItem => localeItem.locale === selectedLanguage)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.webmap;
                if (webmap) {
                    this.view.map = new WebMap({
                        portalItem: {
                            id: webmap,
                        },
                    });
                }
                else {
                    const currentMapId = (_e = (_d = (_c = this.view) === null || _c === void 0 ? void 0 : _c.map) === null || _d === void 0 ? void 0 : _d.portalItem) === null || _e === void 0 ? void 0 : _e.id;
                    if (currentMapId && this.defaultWebMapId !== currentMapId) {
                        this.view.map = new WebMap({
                            portalItem: {
                                id: this.defaultWebMapId,
                            },
                        });
                    }
                }
            }
            document.documentElement.setAttribute('lang', this.selectedLanguage);
            const prefersRTL = this.intl.prefersRTL();
            if (prefersRTL) {
                document.documentElement.setAttribute('dir', 'rtl');
            }
            else {
                document.documentElement.setAttribute('dir', 'ltr');
            }
            window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));
            this.selectedLanguageUpdated.emit(eventData);
        };
    }
    getSelectedLanguageText(translatedLanguage) {
        const { messages } = this;
        const translatedLanguageNames = messages === null || messages === void 0 ? void 0 : messages.translatedLanguageNames;
        const enLanguageNames = messages === null || messages === void 0 ? void 0 : messages.languages;
        const translatedLanguageName = translatedLanguageNames === null || translatedLanguageNames === void 0 ? void 0 : translatedLanguageNames[translatedLanguage];
        const enLanguageName = enLanguageNames === null || enLanguageNames === void 0 ? void 0 : enLanguageNames[translatedLanguage];
        return `${translatedLanguageName} - ${enLanguageName}`;
    }
    /**
     * Refreshes the component by fetching the latest translation data from the portal item resource.
     */
    async refresh() {
        try {
            const resource = (await getPortalItemResource(this.portalItem));
            const t9nData = await fetchResourceData(this.request, resource);
            this.t9nData = t9nData;
            const refreshedData = { locale: this.selectedLanguage, data: t9nData[this.selectedLanguage] };
            this.selectedLanguageUpdated.emit(refreshedData);
        }
        catch (_a) { }
    }
    get el() { return getElement(this); }
};
InstantAppsLanguageSwitcher.style = instantAppsLanguageSwitcherCss;

export { InstantAppsLanguageSwitcher as instant_apps_language_switcher };
