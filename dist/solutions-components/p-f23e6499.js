/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{l as t}from"./p-b04c9dc3.js";
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
*/class i{async getPopupTitle(t,i){var o,l,s;this.arcade||await this._initModules();let e={};for(const[i,o]of Object.entries(t.attributes))e=Object.assign(Object.assign({},e),{[`{${i.toUpperCase()}}`]:o});const n=t.layer,a=this._removeTags(null===(o=null==n?void 0:n.popupTemplate)||void 0===o?void 0:o.title);if(a.includes("{expression/expr")&&null!=(null===(l=null==n?void 0:n.popupTemplate)||void 0===l?void 0:l.expressionInfos))for(let o=0;o<(null===(s=n.popupTemplate)||void 0===s?void 0:s.expressionInfos.length);o++){const l=n.popupTemplate.expressionInfos[o],s=this.arcade.createArcadeProfile("popup");try{const o=await this.arcade.createArcadeExecutor(l.expression,s),a=await o.executeAsync({$feature:t,$layer:n,$map:i});null==a&&""===a||(e[`{expression/${l.name}}`.toUpperCase()]=a)}catch(t){console.error(t);continue}}return null==a?void 0:a.replace(/{.*?}/g,(t=>null!=e[t.toUpperCase()]?e[t.toUpperCase()]:""))}_removeTags(t){return null==t||""===t?"":t.toString().replace(/(<([^>]+)>)/gi,"")}async _initModules(){const[i]=await t(["esri/arcade"]);this.arcade=i}}export{i as P}