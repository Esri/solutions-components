/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
import { languageMap } from "./languageUtil";
import { getAssetPath } from "@stencil/core";
function getComponentClosestLanguage(element) {
  var _a, _b, _c;
  const closestElement = (_a = (element.closest("[lang]"))) !== null && _a !== void 0 ? _a : (_c = (_b = element.shadowRoot) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = ((closestElement === null || closestElement === void 0 ? void 0 : closestElement.lang) || (navigator === null || navigator === void 0 ? void 0 : navigator.language) || "en").toLowerCase();
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
    fetch(getAssetPath(`../assets/t9n/${componentName}/resources_${locale}.json`)).then(result => {
      if (result.ok) {
        resolve(result.json());
      }
      else {
        reject();
      }
    }, () => reject());
  });
}
export async function getLocaleComponentStrings(element) {
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
export function fetchLocaleStringsForComponent2(fileName) {
  return new Promise((resolve, reject) => {
    fetch(getAssetPath(`../assets/arcgis-pdf-creator/${fileName}`)).then(result => {
      if (result.ok) {
        resolve(result.json());
      }
      else {
        reject();
      }
    }, () => reject());
  });
}
// export async function getLocaleComponentStrings2<T extends StringBundle = StringBundle>(fileName: string): Promise<[T]> {
//   let strings: T = await fetchLocaleStringsForComponent2(fileName);
//   return strings;
// }
