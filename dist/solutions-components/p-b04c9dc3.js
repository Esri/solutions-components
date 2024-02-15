/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{e as t}from"./p-d918ec36.js";import{a}from"./p-7d280d8a.js";
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
 */const n=async(a,n)=>(await t.loadModules(a,n)).map((t=>t.__esModule&&t.default?t.default:t)),e=new Map([["ar","ar"],["bg","bg"],["bs","bs"],["ca","ca"],["cs","cs"],["da","da"],["de","de"],["el","el"],["en","en"],["es","es"],["et","et"],["fi","fi"],["fr","fr"],["he","he"],["hr","hr"],["hu","hu"],["id","id"],["it","it"],["ja","ja"],["ko","ko"],["lt","lt"],["lv","lv"],["nb","nb"],["nl","nl"],["pl","pl"],["pt-br","pt-BR"],["pt-pt","pt-PT"],["ro","ro"],["ru","ru"],["sk","sk"],["sl","sl"],["sr","sr"],["sv","sv"],["th","th"],["tr","tr"],["uk","uk"],["vi","vi"],["zh-cn","zh-CN"],["zh-hk","zh-HK"],["zh-tw","zh-TW"]]);async function o(t,a){const{api:e=4,type:o="decimal",places:r=2}=a||{};if(4===e){const[a]=await n(["esri/intl"]),e=a.convertNumberFormatToIntlOptions({places:r,type:o,digitSeparator:!0});return a.formatNumber(t,e)}const[s]=await n(["dojo/number"]);return s.format(t,{type:o,places:r})}
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
 */function r(t){var a,n,o;const r=null!==(a=t.closest("[lang]"))&&void 0!==a?a:null===(o=null===(n=t.shadowRoot)||void 0===n?void 0:n.ownerDocument)||void 0===o?void 0:o.documentElement,s=((null==r?void 0:r.lang)||(null===navigator||void 0===navigator?void 0:navigator.language)||"en").toLowerCase();return e.has(s)?e.get(s):e.has(s.slice(0,2))?e.get(s.slice(0,2)):"en"}function s(t,n){return new Promise(((e,o)=>{fetch(a(`../assets/t9n/${t}/resources_${n}.json`)).then((t=>{t.ok?e(t.json()):o()}),(()=>o()))}))}async function i(t){const a=t.tagName.toLowerCase(),n=r(t);let e;try{e=await s(a,n)}catch(t){console.warn(`no locale for ${a} (${n}) loading default locale en.`),e=await s(a,"en")}return[e,n]}export{r as a,o as f,i as g,n as l}