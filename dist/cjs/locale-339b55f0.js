/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const esriLoader = require('./esri-loader-08dc41bd.js');
const index = require('./index-4b68e4b4.js');

/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const loadModules = async (moduleNames, options) => {
    const mods = await esriLoader.esriLoader.exports.loadModules(moduleNames, options);
    return mods.map((mod) => (mod.__esModule && mod.default ? mod.default : mod));
};

/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const languageMap = new Map([
    ["ar", "ar"],
    ["bg", "bg"],
    ["bs", "bs"],
    ["ca", "ca"],
    ["cs", "cs"],
    ["da", "da"],
    ["de", "de"],
    ["el", "el"],
    ["en", "en"],
    ["es", "es"],
    ["et", "et"],
    ["fi", "fi"],
    ["fr", "fr"],
    ["he", "he"],
    ["hr", "hr"],
    ["hu", "hu"],
    ["id", "id"],
    ["it", "it"],
    ["ja", "ja"],
    ["ko", "ko"],
    ["lt", "lt"],
    ["lv", "lv"],
    ["nb", "nb"],
    ["nl", "nl"],
    ["pl", "pl"],
    ["pt-br", "pt-BR"],
    ["pt-pt", "pt-PT"],
    ["ro", "ro"],
    ["ru", "ru"],
    ["sk", "sk"],
    ["sl", "sl"],
    ["sr", "sr"],
    ["sv", "sv"],
    ["th", "th"],
    ["tr", "tr"],
    ["uk", "uk"],
    ["vi", "vi"],
    ["zh-cn", "zh-CN"],
    ["zh-hk", "zh-HK"],
    ["zh-tw", "zh-TW"],
]);
async function formatNumber(number, options) {
    const { api = 4, type = "decimal", places = 2 } = options || {};
    if (api === 4) {
        const [intl] = await loadModules(["esri/intl"]);
        const numberFormatIntlOptions = intl.convertNumberFormatToIntlOptions({
            places,
            type,
            digitSeparator: true,
        });
        return intl.formatNumber(number, numberFormatIntlOptions);
    }
    const [dojoNumber] = await loadModules(["dojo/number"]);
    return dojoNumber.format(number, {
        type,
        places,
    });
}

/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getComponentClosestLanguage(element) {
    const closestElement = (element.closest("[lang]")) ?? element.shadowRoot?.ownerDocument?.documentElement;
    // language set by the calling application or browser. defaults to english.
    const lang = (closestElement?.lang || navigator?.language || "en").toLowerCase();
    if (languageMap.has(lang)) {
        return languageMap.get(lang);
    }
    else {
        // "ru-RU" maps to "ru" use case
        return languageMap.has(lang.slice(0, 2)) ? languageMap.get(lang.slice(0, 2)) : "en";
    }
}
function fetchLocaleStringsForComponent(componentName, locale) {
    return new Promise((resolve, reject) => {
        fetch(index.getAssetPath(`assets/t9n/${componentName}/resources_${locale}.json`)).then(result => {
            if (result.ok) {
                resolve(result.json());
            }
            else {
                reject();
            }
        }, () => reject());
    });
}
async function getLocaleComponentStrings(element) {
    const componentName = element.tagName.toLowerCase();
    const componentLanguage = getComponentClosestLanguage(element);
    let strings;
    try {
        strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
    }
    catch (e) {
        console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
        strings = await fetchLocaleStringsForComponent(componentName, "en");
    }
    return [strings, componentLanguage];
}

exports.formatNumber = formatNumber;
exports.getComponentClosestLanguage = getComponentClosestLanguage;
exports.getLocaleComponentStrings = getLocaleComponentStrings;
exports.loadModules = loadModules;
