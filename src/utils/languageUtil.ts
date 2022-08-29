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

import { loadModules } from './loadModules';
import { APIVersion } from './types';

export const languageMap = new Map<string, string>([
  ['ar', 'ar'],
  ['bg', 'bg'],
  ['bs', 'bs'],
  ['ca', 'ca'],
  ['cs', 'cs'],
  ['da', 'da'],
  ['de', 'de'],
  ['el', 'el'],
  ['en', 'en'],
  ['es', 'es'],
  ['et', 'et'],
  ['fi', 'fi'],
  ['fr', 'fr'],
  ['he', 'he'],
  ['hr', 'hr'],
  ['hu', 'hu'],
  ['id', 'id'],
  ['it', 'it'],
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['lt', 'lt'],
  ['lv', 'lv'],
  ['nb', 'nb'],
  ['nl', 'nl'],
  ['pl', 'pl'],
  ['pt-br', 'pt-BR'],
  ['pt-pt', 'pt-PT'],
  ['ro', 'ro'],
  ['ru', 'ru'],
  ['sk', 'sk'],
  ['sl', 'sl'],
  ['sr', 'sr'],
  ['sv', 'sv'],
  ['th', 'th'],
  ['tr', 'tr'],
  ['uk', 'uk'],
  ['vi', 'vi'],
  ['zh-cn', 'zh-CN'],
  ['zh-hk', 'zh-HK'],
  ['zh-tw', 'zh-TW'],
]);

// rtl
export function getElementDir(el: HTMLElement): 'ltr' | 'rtl' {
  return getElementProp(el, 'dir', 'ltr');
}

function getElementProp(el: HTMLElement, prop, value): any {
  const closestWithProp = el.closest(`[${prop}]`);
  return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}

// css
export const CSS_UTILITY = {
  rtl: 'arcgis--rtl',
} as const;

export async function formatNumber(
  number: number,
  options?: {
    api: APIVersion;
    type: 'decimal' | 'percent';
    places: number;
  },
): Promise<string> {
  const { api = 4, type = 'decimal', places = 2 } = options || {};
  if (api === 4) {
    const [intl] = await loadModules(['esri/intl']);
    const numberFormatIntlOptions = intl.convertNumberFormatToIntlOptions({
      places,
      type,
      digitSeparator: true,
    });
    return intl.formatNumber(number, numberFormatIntlOptions);
  }
  const [dojoNumber] = await loadModules(['dojo/number']);
  return dojoNumber.format(number, {
    type,
    places,
  });
}
