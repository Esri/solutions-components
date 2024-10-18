/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { g as getMessages } from './utils4.js';
import { l as loadModules } from './loadModules2.js';
import { a as getDefaultLanguage } from './locale3.js';
import { d as defineCustomElement$4, g as getPortalItemResource, f as fetchResourceData, L as LANGUAGE_DATA } from './instant-apps-language-translator2.js';
import { d as defineCustomElement$k } from './action.js';
import { d as defineCustomElement$j } from './button.js';
import { d as defineCustomElement$i } from './dropdown.js';
import { d as defineCustomElement$h } from './dropdown-item.js';
import { d as defineCustomElement$g } from './icon.js';
import { d as defineCustomElement$f } from './input.js';
import { d as defineCustomElement$e } from './label2.js';
import { d as defineCustomElement$d } from './loader.js';
import { d as defineCustomElement$c } from './modal.js';
import { d as defineCustomElement$b } from './notice.js';
import { d as defineCustomElement$a } from './option.js';
import { d as defineCustomElement$9 } from './popover.js';
import { d as defineCustomElement$8 } from './progress.js';
import { d as defineCustomElement$7 } from './scrim.js';
import { d as defineCustomElement$6 } from './select.js';
import { d as defineCustomElement$5 } from './instant-apps-ckeditor-wrapper2.js';
import { d as defineCustomElement$3 } from './instant-apps-language-translator-item2.js';
import { d as defineCustomElement$2 } from './instant-apps-language-translator-search2.js';

const instantAppsLanguageSwitcherCss = ":host{display:block;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);min-width:200px}:host calcite-dropdown{width:100%}:host calcite-button{--calcite-color-brand:var(--calcite-color-text-3);--calcite-color-brand-hover:var(--calcite-color-text-3)}";
const InstantAppsLanguageSwitcherStyle0 = instantAppsLanguageSwitcherCss;

const InstantAppsLanguageSwitcher$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsLanguageSwitcher extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.selectedLanguageUpdated = createEvent(this, "selectedLanguageUpdated", 7);
        this.icon = 'language';
        this.portalItem = undefined;
        this.view = undefined;
        this.locales = [];
        this.defaultLocale = undefined;
        this.selectedLanguage = null;
        this.messages = undefined;
        this.t9nData = null;
    }
    async componentWillLoad() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
                this.defaultWebMapId = (_j = webmap === null || webmap === void 0 ? void 0 : webmap.portalItem) === null || _j === void 0 ? void 0 : _j.id;
                const translatedWebmap = (_m = (_l = (_k = this.locales) === null || _k === void 0 ? void 0 : _k.filter(localeItem => (localeItem === null || localeItem === void 0 ? void 0 : localeItem.webmap) && (localeItem === null || localeItem === void 0 ? void 0 : localeItem.webmap) !== this.defaultWebMapId && (localeItem === null || localeItem === void 0 ? void 0 : localeItem.locale) === this.selectedLanguage)) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.webmap;
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
        return (h("calcite-dropdown", { key: '292b75e8a6f9d7ab2739e4d85f90d975f5b49c1e', onCalciteDropdownBeforeOpen: () => (this.trigger.iconEnd = 'chevron-up'), onCalciteDropdownBeforeClose: () => (this.trigger.iconEnd = 'chevron-down'), "width-scale": "m" }, trigger, defaultLocale, dropdown));
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
        const partialSupportLocales = Object.keys(LANGUAGE_DATA.partial);
        const isPartial = partialSupportLocales.indexOf(translatedLanguage) !== -1;
        const type = isPartial ? 'partial' : 'full';
        const data = LANGUAGE_DATA[type];
        const { language, translated } = data[translatedLanguage];
        return `${language} - ${translated}`;
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
    get el() { return this; }
    static get style() { return InstantAppsLanguageSwitcherStyle0; }
}, [1, "instant-apps-language-switcher", {
        "icon": [1],
        "portalItem": [16],
        "view": [16],
        "locales": [16],
        "defaultLocale": [1, "default-locale"],
        "selectedLanguage": [1, "selected-language"],
        "messages": [32],
        "t9nData": [32],
        "refresh": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-language-switcher", "calcite-action", "calcite-button", "calcite-dropdown", "calcite-dropdown-item", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-option", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "instant-apps-ckeditor-wrapper", "instant-apps-language-translator", "instant-apps-language-translator-item", "instant-apps-language-translator-search"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-language-switcher":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsLanguageSwitcher$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "instant-apps-ckeditor-wrapper":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "instant-apps-language-translator":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "instant-apps-language-translator-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "instant-apps-language-translator-search":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsLanguageSwitcher = InstantAppsLanguageSwitcher$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsLanguageSwitcher, defineCustomElement };
