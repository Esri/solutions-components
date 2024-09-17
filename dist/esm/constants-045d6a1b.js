/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { l as loadModules } from './loadModules-03ba7abe.js';

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

export { LANGUAGE_DATA as L, fetchResourceData as f, getPortalItemResource as g };
