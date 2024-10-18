/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { i as initExternalCKEditorStyles, g as getMessages, a as generateUIData, s as store, E as EIcons, b as getLocales, l as languageTranslatorState, c as getUIDataKeys, u as updateLastSave } from './utils4.js';
import { l as loadModules } from './loadModules2.js';
import { c as getComponentClosestLanguage } from './locale3.js';
import { d as defineCustomElement$g } from './action.js';
import { d as defineCustomElement$f } from './button.js';
import { d as defineCustomElement$e } from './icon.js';
import { d as defineCustomElement$d } from './input.js';
import { d as defineCustomElement$c } from './label2.js';
import { d as defineCustomElement$b } from './loader.js';
import { d as defineCustomElement$a } from './modal.js';
import { d as defineCustomElement$9 } from './notice.js';
import { d as defineCustomElement$8 } from './option.js';
import { d as defineCustomElement$7 } from './popover.js';
import { d as defineCustomElement$6 } from './progress.js';
import { d as defineCustomElement$5 } from './scrim.js';
import { d as defineCustomElement$4 } from './select.js';
import { d as defineCustomElement$3 } from './instant-apps-ckeditor-wrapper2.js';
import { d as defineCustomElement$2 } from './instant-apps-language-translator-item2.js';
import { d as defineCustomElement$1 } from './instant-apps-language-translator-search2.js';

async function fetchResourceData(request, resource) {
    var _a, _b, _c;
    try {
        const token = (_c = (_b = (_a = resource === null || resource === void 0 ? void 0 : resource.portalItem) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b['credential']) === null || _c === void 0 ? void 0 : _c['token'];
        const reqConfig = { responseType: 'json' };
        if (token)
            reqConfig.query = { token };
        var cacheBuster = 'cacheBuster=' + Date.now();
        const url = `${resource.url}?${cacheBuster}`;
        const reqRes = await request(url, reqConfig);
        const t9nData = reqRes.data;
        return Promise.resolve(t9nData);
    }
    catch (err) {
        console.error('Unable to get resource t9n data.');
    }
}
async function getPortalItemResource(portalItem) {
    if (!portalItem)
        return null;
    const [PortalItemResource] = await loadModules(['esri/portal/PortalItemResource']);
    const existingResourcesRes = await portalItem.fetchResources({
        num: 100,
    });
    const path = `t9n/${portalItem === null || portalItem === void 0 ? void 0 : portalItem.id}.json`;
    const resource = new PortalItemResource({ path, portalItem });
    const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
    if (existingResourceArr.length === 0) {
        const type = 'application/json';
        const content = new Blob([JSON.stringify({})], { type });
        try {
            await portalItem.addResource(resource, content);
            const existingResourcesRes = await portalItem.fetchResources();
            const path = `t9n/${portalItem === null || portalItem === void 0 ? void 0 : portalItem.id}.json`;
            const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
            const existingResource = existingResourceArr[0].resource;
            return Promise.resolve(existingResource);
        }
        catch (err) {
            console.error('ERROR: ', err);
            return Promise.reject(null);
        }
    }
    else {
        const existingResource = existingResourceArr[0].resource;
        return Promise.resolve(existingResource);
    }
}

const LANGUAGE_DATA = {
    full: {
        ar: {
            language: "Arabic",
            translated: "عربي",
        },
        bg: {
            language: "Bulgarian",
            translated: "Български",
        },
        bs: {
            language: "Bosnian",
            translated: "Bosanski",
        },
        ca: {
            language: "Catalan",
            translated: "Català",
        },
        cs: {
            language: "Czech",
            translated: "čeština",
        },
        da: {
            language: "Danish",
            translated: "Dansk",
        },
        de: {
            language: "German",
            translated: "Deutsch",
        },
        el: {
            language: "Greek",
            translated: "Ελλάδα",
        },
        en: {
            language: "English",
            translated: "English",
        },
        es: {
            language: "Spanish",
            translated: "Español",
        },
        et: {
            language: "Estonian",
            translated: "Eesti",
        },
        fi: {
            language: "Finnish",
            translated: "Suomi",
        },
        fr: {
            language: "French",
            translated: "Français",
        },
        he: {
            language: "Hebrew",
            translated: "עברית",
        },
        hr: {
            language: "Croatian",
            translated: "Hrvatski",
        },
        hu: {
            language: "Hungarian",
            translated: "Magyar",
        },
        id: {
            language: "Indonesian",
            translated: "Bahasa Indonesia",
        },
        it: {
            language: "Italian",
            translated: "Italiano",
        },
        ja: {
            language: "Japanese",
            translated: "日本語",
        },
        ko: {
            language: "Korean",
            translated: "한국어",
        },
        lt: {
            language: "Lithuanian",
            translated: "Lietuvių",
        },
        lv: {
            language: "Latvian",
            translated: "Latviešu",
        },
        nb: {
            language: "Norwegian",
            translated: "Norsk",
        },
        nl: {
            language: "Dutch",
            translated: "Nederlands",
        },
        pl: {
            language: "Polish",
            translated: "Polski",
        },
        "pt-BR": {
            language: "Portuguese (Brazil)",
            translated: "Português (Brasil)",
        },
        "pt-PT": {
            language: "Portuguese (Portugal)",
            translated: "Português (Portugal)",
        },
        ro: {
            language: "Romanian",
            translated: "Română",
        },
        ru: {
            language: "Russian",
            translated: "Русский",
        },
        sk: {
            language: "Slovak",
            translated: "Slovenčina",
        },
        sl: {
            language: "Slovenian",
            translated: "Slovenščina",
        },
        sr: {
            language: "Serbian",
            translated: "Srpski",
        },
        sv: {
            language: "Swedish",
            translated: "Svenska",
        },
        th: {
            language: "Thai",
            translated: "ไทย",
        },
        tr: {
            language: "Turkish",
            translated: "Türkiye",
        },
        uk: {
            language: "Ukrainian",
            translated: "Україна",
        },
        vi: {
            language: "Vietnamese",
            translated: "Tiếng Việt",
        },
        "zh-CN": {
            language: "Simplified Chinese",
            translated: "简体中文",
        },
        "zh-HK": {
            language: "Traditional Chinese (Hong Kong)",
            translated: "繁體中文（香港）",
        },
        "zh-TW": {
            language: "Traditional Chinese (Taiwan)",
            translated: "繁體中文（台灣）",
        },
    },
    partial: {
        ab: {
            language: "Abkhaz",
            translated: "Аҧсуа",
        },
        aa: {
            language: "Afar",
            translated: "Afar",
        },
        af: {
            language: "Afrikaans",
            translated: "Afrikaans",
        },
        ak: {
            language: "Akan",
            translated: "Akan",
        },
        sq: {
            language: "Albanian",
            translated: "Shqip",
        },
        am: {
            language: "Amharic",
            translated: "አማርኛ",
        },
        an: {
            language: "Aragonese",
            translated: "Aragonés",
        },
        hy: {
            language: "Armenian",
            translated: "Հայերեն",
        },
        as: {
            language: "Assamese",
            translated: "অসমীয়া",
        },
        av: {
            language: "Avaric",
            translated: "авар мацӀ",
        },
        ae: {
            language: "Avestan",
            translated: "Avesta",
        },
        ay: {
            language: "Aymara",
            translated: "aymar aru",
        },
        az: {
            language: "Azerbaijani",
            translated: "azərbaycan dili",
        },
        bm: {
            language: "Bambara",
            translated: "bamanankan",
        },
        ba: {
            language: "Bashkir",
            translated: "Башҡорт теле",
        },
        eu: {
            language: "Basque",
            translated: "euskara",
        },
        be: {
            language: "Belarusian",
            translated: "Беларуская",
        },
        bn: {
            language: "Bengali",
            translated: "বাংলা",
        },
        bh: {
            language: "Bihari",
            translated: "भोजपुरी",
        },
        bi: {
            language: "Bislama",
            translated: "Bislama",
        },
        br: {
            language: "Breton",
            translated: "Brezhoneg",
        },
        my: {
            language: "Burmese",
            translated: "ဗမာစာ",
        },
        ch: {
            language: "Chamorro",
            translated: "Chamoru",
        },
        ce: {
            language: "Chechen",
            translated: "нохчийн мотт",
        },
        ny: {
            language: "Chichewa",
            translated: "chiCheŵa",
        },
        cu: {
            language: "Church Slavic",
            translated: "ѩзыкъ словѣньскъ",
        },
        cv: {
            language: "Chuvash",
            translated: "чӑваш чӗлхи",
        },
        kw: {
            language: "Cornish",
            translated: "Kernewek",
        },
        co: {
            language: "Corsican",
            translated: "corsu",
        },
        cr: {
            language: "Cree",
            translated: "ᓀᐦᐃᔭᐍᐏᐣ",
        },
        dv: {
            language: "Divehi",
            translated: "ދިވެހި",
        },
        eo: {
            language: "Esperanto",
            translated: "Esperanto",
        },
        ee: {
            language: "Ewe",
            translated: "Ɛʋɛgbɛ",
        },
        fo: {
            language: "Faroese",
            translated: "føroyskt",
        },
        fj: {
            language: "Fijian",
            translated: "Vosa Vakaviti",
        },
        ff: {
            language: "Fulah",
            translated: "Fulfulde",
        },
        gl: {
            language: "Galician",
            translated: "galego",
        },
        ka: {
            language: "Georgian",
            translated: "ქართული",
        },
        gn: {
            language: "Guarani",
            translated: "Avañe'ẽ",
        },
        gu: {
            language: "Gujarati",
            translated: "ગુજરાતી",
        },
        ht: {
            language: "Haitian",
            translated: "Kreyòl Ayisyen",
        },
        ha: {
            language: "Hausa",
            translated: "هَوُسَ",
        },
        hz: {
            language: "Herero",
            translated: "Otjiherero",
        },
        hi: {
            language: "Hindi",
            translated: "हिन्दी",
        },
        ho: {
            language: "Hiri Motu",
            translated: "Hiri Motu",
        },
        is: {
            language: "Icelandic",
            translated: "Íslenska",
        },
        io: {
            language: "Ido",
            translated: "Ido",
        },
        ig: {
            language: "Igbo",
            translated: "Asụsụ Igbo",
        },
        ia: {
            language: "Interlingua",
            translated: "Interlingua",
        },
        ie: {
            language: "Interlingue",
            translated: "Interlingue",
        },
        iu: {
            language: "Inuktitut",
            translated: "ᐃᓄᒃᑎᑐᑦ",
        },
        ip: {
            language: "Inupiaq",
            translated: "Iñupiaq",
        },
        ga: {
            language: "Irish",
            translated: "Gaeilge",
        },
        jv: {
            language: "Javanese",
            translated: "ꦧꦱꦗꦮ",
        },
        kl: {
            language: "Kalaallisut",
            translated: "kalaallisut",
        },
        kn: {
            language: "Kannada",
            translated: "ಕನ್ನಡ",
        },
        kr: {
            language: "Kanuri",
            translated: "Kanuri",
        },
        ks: {
            language: "Kashmiri",
            translated: "कश्मीरी",
        },
        kk: {
            language: "Kazakh",
            translated: "қазақ тілі",
        },
        km: {
            language: "Khmer",
            translated: "ខ្មែរ",
        },
        ki: {
            language: "Kikuyu",
            translated: "Gĩkũyũ",
        },
        rw: {
            language: "Kinyarwanda",
            translated: "Kinyarwanda",
        },
        rn: {
            language: "Kirundi",
            translated: "Ikirundi",
        },
        kv: {
            language: "Komi",
            translated: "коми кыв",
        },
        kg: {
            language: "Kongo",
            translated: "Kikongo",
        },
        ku: {
            language: "Kurdish",
            translated: "Kurdî",
        },
        kj: {
            language: "Kwanyama",
            translated: "Kuanyama",
        },
        ky: {
            language: "Kyrgyz",
            translated: "Кыргызча",
        },
        lo: {
            language: "Lao",
            translated: "ພາສາລາວ",
        },
        la: {
            language: "Latin",
            translated: "latine",
        },
        li: {
            language: "Limburgish",
            translated: "Limburgs",
        },
        ln: {
            language: "Lingala",
            translated: "Lingála",
        },
        lu: {
            language: "Luba-Katanga",
            translated: "Kiluba",
        },
        lg: {
            language: "Luganda",
            translated: "Luganda",
        },
        lb: {
            language: "Luxembourgish",
            translated: "Lëtzebuergesch",
        },
        mk: {
            language: "Macedonian",
            translated: "македонски јазик",
        },
        mg: {
            language: "Malagasy",
            translated: "fiteny malagasy",
        },
        ms: {
            language: "Malay",
            translated: "Bahasa Melayu",
        },
        ml: {
            language: "Malayalam",
            translated: "മലയാളം",
        },
        mt: {
            language: "Maltese",
            translated: "Malti",
        },
        gv: {
            language: "Manx",
            translated: "Gailck",
        },
        mi: {
            language: "Maori",
            translated: "te reo Māori",
        },
        mr: {
            language: "Marathi",
            translated: "मराठी",
        },
        mh: {
            language: "Marshallese",
            translated: "Kajin M̧ajeļ",
        },
        mn: {
            language: "Mongolian",
            translated: "Монгол хэл",
        },
        na: {
            language: "Nauru",
            translated: "Ekakairũ Naoero",
        },
        nv: {
            language: "Navajo",
            translated: "Diné bizaad",
        },
        ng: {
            language: "Ndonga",
            translated: "Owambo",
        },
        ne: {
            language: "Nepali",
            translated: "नेपाली",
        },
        nd: {
            language: "North Ndebele",
            translated: "isiNdebele",
        },
        se: {
            language: "Northern Sami",
            translated: "Davvisámegiella",
        },
        no: {
            language: "Norwegian",
            translated: "Norsk",
        },
        nn: {
            language: "Norwegian Nynorsk",
            translated: "Norsk nynorsk",
        },
        ii: {
            language: "Nuosu",
            translated: "ꆈꌠ꒿ Nuosuhxop",
        },
        oc: {
            language: "Occitan",
            translated: "occitan",
        },
        oj: {
            language: "Ojibwe",
            translated: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
        },
        or: {
            language: "Oriya",
            translated: "ଓଡ଼ିଆ",
        },
        om: {
            language: "Oromo",
            translated: "Afaan Oromoo",
        },
        os: {
            language: "Ossetian",
            translated: "ирон æвзаг",
        },
        pi: {
            language: "Pali",
            translated: "पाऴि",
        },
        pa: {
            language: "Panjabi",
            translated: "ਪੰਜਾਬੀ",
        },
        ps: {
            language: "Pashto",
            translated: "پښتو",
        },
        fa: {
            language: "Persian",
            translated: "فارسی",
        },
        qu: {
            language: "Quechua",
            translated: "Runa Simi",
        },
        rm: {
            language: "Romansh",
            translated: "rumantsch grischun",
        },
        sm: {
            language: "Samoan",
            translated: "gagana fa'a Samoa",
        },
        sg: {
            language: "Sango",
            translated: "yângâ tî sängö",
        },
        sa: {
            language: "Sanskrit",
            translated: "संस्कृतम्",
        },
        sc: {
            language: "Sardinian",
            translated: "sardu",
        },
        gd: {
            language: "Scottish Gaelic",
            translated: "Gàidhlig",
        },
        sn: {
            language: "Shona",
            translated: "chiShona",
        },
        sd: {
            language: "Sindhi",
            translated: "सिन्धी",
        },
        si: {
            language: "Sinhala",
            translated: "සිංහල",
        },
        so: {
            language: "Somali",
            translated: "Soomaaliga",
        },
        nr: {
            language: "South Ndebele",
            translated: "isiNdebele",
        },
        st: {
            language: "Southern Sotho",
            translated: "Sesotho",
        },
        su: {
            language: "Sundanese",
            translated: "Basa Sunda",
        },
        sw: {
            language: "Swahili",
            translated: "Kiswahili",
        },
        ss: {
            language: "Swati",
            translated: "SiSwati",
        },
        tl: {
            language: "Tagalog",
            translated: "Wikang Tagalog",
        },
        ty: {
            language: "Tahitian",
            translated: "Reo Tahiti",
        },
        tg: {
            language: "Tajik",
            translated: "тоҷикӣ",
        },
        ta: {
            language: "Tamil",
            translated: "தமிழ்",
        },
        tt: {
            language: "Tatar",
            translated: "татар теле",
        },
        te: {
            language: "Telugu",
            translated: "తెలుగు",
        },
        bo: {
            language: "Tibetan",
            translated: "བོད་ཡིག",
        },
        ti: {
            language: "Tigrinya",
            translated: "ትግርኛ",
        },
        to: {
            language: "Tonga",
            translated: "faka Tonga",
        },
        ts: {
            language: "Tsonga",
            translated: "Xitsonga",
        },
        tn: {
            language: "Tswana",
            translated: "Setswana",
        },
        tk: {
            language: "Turkmen",
            translated: "Türkmen",
        },
        tw: {
            language: "Twi",
            translated: "Twi",
        },
        ug: {
            language: "Uighur",
            translated: "Uyƣurqə",
        },
        ur: {
            language: "Urdu",
            translated: "اردو",
        },
        uz: {
            language: "Uzbek",
            translated: "O'zbek",
        },
        ve: {
            language: "Venda",
            translated: "Tshivenḓa",
        },
        vo: {
            language: "Volapük",
            translated: "Volapük",
        },
        wa: {
            language: "Walloon",
            translated: "walon",
        },
        cy: {
            language: "Welsh",
            translated: "Cymraeg",
        },
        fy: {
            language: "Western Frisian",
            translated: "Frysk",
        },
        wo: {
            language: "Wolof",
            translated: "Wollof",
        },
        xh: {
            language: "Xhosa",
            translated: "isiXhosa",
        },
        yi: {
            language: "Yiddish",
            translated: "ייִדיש",
        },
        yo: {
            language: "Yoruba",
            translated: "Yorùbá",
        },
        za: {
            language: "Zhuang",
            translated: "Saɯ cueŋƅ",
        },
        zu: {
            language: "Zulu",
            translated: "isiZulu",
        },
    },
};

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
const InstantAppsLanguageTranslator = /*@__PURE__*/ proxyCustomElement(class InstantAppsLanguageTranslator extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
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
    get el() { return this; }
    static get watchers() { return {
        "locales": ["handleLocaleChange"],
        "appSettings": ["handleAppSettings"]
    }; }
    static get style() { return InstantAppsLanguageTranslatorStyle0; }
}, [6, "instant-apps-language-translator", {
        "portalItem": [16],
        "appSettings": [16],
        "locales": [16],
        "open": [1028],
        "userLocaleInputOnChangeCallback": [16],
        "translatedLocaleInputOnChangeCallback": [16],
        "saving": [32],
        "messages": [32],
        "isCollapse": [32],
        "getTranslationData": [64],
        "setTranslationData": [64],
        "getPortalItemResource": [64],
        "batchWriteToPortalItemResource": [64]
    }, [[8, "translatorItemDataUpdated", "handleT9nItemUpdate"]], {
        "locales": ["handleLocaleChange"],
        "appSettings": ["handleAppSettings"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-language-translator", "calcite-action", "calcite-button", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-modal", "calcite-notice", "calcite-option", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "instant-apps-ckeditor-wrapper", "instant-apps-language-translator-item", "instant-apps-language-translator-search"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-language-translator":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsLanguageTranslator);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "instant-apps-ckeditor-wrapper":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "instant-apps-language-translator-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "instant-apps-language-translator-search":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsLanguageTranslator as I, LANGUAGE_DATA as L, defineCustomElement as d, fetchResourceData as f, getPortalItemResource as g };
