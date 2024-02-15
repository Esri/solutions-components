/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import"./p-d89fff3a.js";import"./p-a230b270.js";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])},n(e,t)},e=function(){return e=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var o in e=arguments[t])Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n},e.apply(this,arguments)};function t(n){return Object.keys(n).some((function(e){var t=n[e];if(!t)return!1;switch(t&&t.toParam&&(t=t.toParam()),t.constructor.name){case"Array":case"Object":case"Date":case"Function":case"Boolean":case"String":case"Number":return!1;default:return!0}}))}function r(n){var e={};return Object.keys(n).forEach((function(t){var r,o,i=n[t];if(i&&i.toParam&&(i=i.toParam()),i||0===i||"boolean"==typeof i||"string"==typeof i){var a;switch(i.constructor.name){case"Array":var u=null===(o=null===(r=i[0])||void 0===r?void 0:r.constructor)||void 0===o?void 0:o.name;a="Array"===u?i:"Object"===u?JSON.stringify(i):i.join(",");break;case"Object":a=JSON.stringify(i);break;case"Date":a=i.valueOf();break;case"Function":a=null;break;case"Boolean":a=i+"";break;default:a=i}(a||0===a||"string"==typeof a||Array.isArray(a))&&(e[t]=a)}})),e}function o(n,e){return Array.isArray(e)&&e[0]&&Array.isArray(e[0])?e.map((function(e){return o(n,e)})).join("&"):encodeURIComponent(n)+"="+encodeURIComponent(e)}function i(n){var e=r(n);return Object.keys(e).map((function(n){return o(n,e[n])})).join("&")}var a=function(n,e,t,r,o){n=n||"UNKNOWN_ERROR",e=e||"UNKNOWN_ERROR_CODE",this.name="ArcGISRequestError",this.message="UNKNOWN_ERROR_CODE"===e?n:e+": "+n,this.originalMessage=n,this.code=e,this.response=t,this.url=r,this.options=o};a.prototype=Object.create(Error.prototype),a.prototype.constructor=a;var u="@esri/arcgis-rest-js",c={httpMethod:"POST",params:{f:"json"}},s=function(t){function r(n,e,r,o,i){void 0===n&&(n="AUTHENTICATION_ERROR"),void 0===e&&(e="AUTHENTICATION_ERROR_CODE");var a=t.call(this,n,e,r,o,i)||this;return a.name="ArcGISAuthError",a.message="AUTHENTICATION_ERROR_CODE"===e?n:e+": "+n,a}return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(r,t),r.prototype.retry=function(n,t){var r=this;void 0===t&&(t=3);var o=0,i=function(a,u){n(r.url,r.options).then((function(n){var t=e(e({},r.options),{authentication:n});return o+=1,f(r.url,t)})).then((function(n){a(n)})).catch((function(n){"ArcGISAuthError"===n.name&&o<t?i(a,u):u("ArcGISAuthError"===n.name&&o>=t?r:n)}))};return new Promise((function(n,e){i(n,e)}))},r}(a);function f(n,o){void 0===o&&(o={params:{f:"json"}});var f=e(e(e({httpMethod:"POST"},c),o),{params:e(e({},c.params),o.params),headers:e(e({},c.headers),o.headers)}),l=[],d=[];if(f.fetch||"undefined"==typeof fetch?(l.push("`fetch`"),d.push("`node-fetch`")):f.fetch=fetch.bind(Function("return this")()),"undefined"==typeof Promise&&(l.push("`Promise`"),d.push("`es6-promise`")),"undefined"==typeof FormData&&(l.push("`FormData`"),d.push("`isomorphic-form-data`")),!f.fetch||"undefined"==typeof Promise||"undefined"==typeof FormData)throw new Error("`arcgis-rest-request` requires a `fetch` implementation and global variables for `Promise` and `FormData` to be present in the global scope. You are missing "+l.join(", ")+". We recommend installing the "+d.join(", ")+" modules at the root of your application to add these to the global scope. See https://bit.ly/2KNwWaJ for more info.");var p=f.httpMethod,h=f.authentication,m=f.rawResponse,w=e({f:"json"},f.params),O=null,v={method:p,credentials:f.credentials||"same-origin"};return f.headers&&f.headers["X-Esri-Auth-Client-Id"]&&n.indexOf("/oauth2/platformSelf")>-1&&(v.credentials="include"),(h?h.getToken(n,{fetch:f.fetch}).catch((function(e){return e.url=n,e.options=f,O=e,Promise.resolve("")})):Promise.resolve("")).then((function(o){o.length&&(w.token=o),h&&h.getDomainCredentials&&(v.credentials=h.getDomainCredentials(n));var a={};if("GET"===v.method){w.token&&f.hideToken&&"undefined"==typeof window&&(a["X-Esri-Authorization"]="Bearer "+w.token,delete w.token);var c=""===i(w)?n:n+"?"+i(w);f.maxUrlLength&&c.length>f.maxUrlLength||w.token&&f.hideToken?(v.method="POST",o.length&&f.hideToken&&(w.token=o,delete a["X-Esri-Authorization"])):n=c}var s=new RegExp("/items/.+/updateResources").test(n);return"POST"===v.method&&(v.body=function(n,e){var o=t(n)||e,a=r(n);if(o){var u=new FormData;return Object.keys(a).forEach((function(n){"undefined"!=typeof Blob&&a[n]instanceof Blob?u.append(n,a[n],a.fileName||a[n].name||n):u.append(n,a[n])})),u}return i(n)}(w,s)),v.headers=e(e({},a),f.headers),"undefined"!=typeof window||v.headers.referer||(v.headers.referer=u),t(w)||s||(v.headers["Content-Type"]="application/x-www-form-urlencoded"),f.fetch(n,v)})).then((function(e){if(!e.ok)throw new a(e.statusText,"HTTP "+e.status,e,n,f);if(m)return e;switch(w.f){case"json":case"geojson":return e.json();case"html":case"text":return e.text();default:return e.blob()}})).then((function(e){if("json"!==w.f&&"geojson"!==w.f||m)return e;var t=function(n,e,t,r,o){if(n.code>=400)throw new a(u=n.message,c=n.code,n,e,r);if(n.error){var i=n.error,u=i.message,c=i.code,f=i.messageCode,l=f||c||"UNKNOWN_ERROR_CODE";if(498===c||499===c||"GWM_0003"===f||400===c&&"Unable to generate token."===u)throw o||new s(u,l,n,e,r);throw new a(u,l,n,e,r)}if("failed"===n.status||"failure"===n.status){u=void 0,c="UNKNOWN_ERROR_CODE";try{u=JSON.parse(n.statusMessage).message,c=JSON.parse(n.statusMessage).code}catch(e){u=n.statusMessage||n.message}throw new a(u,c,n,e,r)}return n}(e,n,0,f,O);if(O){var r=n.toLowerCase().split(/\/rest(\/admin)?\/services\//)[0];f.authentication.federatedServers[r]={token:[],expires:new Date(Date.now()+864e5)},O=null}return t}))}function l(n){return"string"!=typeof n||"/"===(n=n.trim())[n.length-1]&&(n=n.slice(0,-1)),n}
/** @license
 * Copyright 2020 Esri
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
/** @license
 * Copyright 2018 Esri
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
function d(n){return new Promise((e=>{h(n).then((n=>{try{e(JSON.parse(n))}catch(n){e(null)}}),(()=>e(null)))}))}function p(n,e,t){return n?function(n,e,t){let r;try{r=new File(n,e,t)}catch(o){r=function(){void 0===t&&(t={type:""});const r=new Blob(n,t);return r.lastModified=new Date,r.name=e,r}()}return r}([n],e||"",{type:t||n.type}):null}function h(n){return new Promise((e=>{const t=new FileReader;t.onload=function(n){e(n.target.result||"")},t.readAsText(n)}))}function m(n){return n?n.endsWith("/")?n:n+"/":n}function w(n,e){return e.split(".").reduce((function(n,e){return n?n[e]:void 0}),n)}function O(n,e,t){const r=e.split(".");r.reduce(((n,e,o)=>o===r.length-1?(n[e]=t,t):(n[e]||(n[e]={}),n[e])),n)}function v(n,e,t={}){return n?f(n,{authentication:e,rawResponse:!0,...t}).then((n=>n.blob())):Promise.reject("Url must be provided")}
/** @license
 * Copyright 2018 Esri
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
 */const b="PK";function R(n,e,t=[]){return new Promise(((r,o)=>{v(n,e).then((n=>{E(n).then((n=>{"application/json"===n.type?d(n).then((e=>{if(e?.error){const n=e.error.code;void 0!==n&&t.indexOf(n)>=0?r(null):o(e)}else r(n)})):r(n)}),o)}),o)}))}function y(n,e){return new Promise((t=>{(function(n,e){return new Promise((t=>{const r=function(n,e){return`${function(n){return w(n,"portal")||"https://www.arcgis.com/sharing/rest"}(e)}/content/items/${n}/data`}(n,e);R(r,e,[400,500]).then((n=>t(E(n))),(()=>t(null)))}))})(n,e).then((n=>t(d(n))),(()=>t(null)))}))}function N(n,e){return v(n,e,{httpMethod:"GET"}).then((n=>E(n))).then((n=>"application/json"===n.type?d(n):Promise.resolve(null)))}function j(n,e,t){return new Promise((r=>{(function(n,e,t,r=[],o){return new Promise(((i,a)=>{R(n,t,r).then((n=>i(n?p(n,e,o):null)),a)}))})(n,e,t,[500]).then(r,(()=>r(null)))}))}function E(n){return new Promise(((e,t)=>{n&&n.size>0&&(n.type.startsWith("text/plain")||n.type.startsWith("application/json"))?h(n).then((t=>{try{JSON.parse(t),e(new Blob([n],{type:"application/json"}))}catch(r){t.length>4&&t.substr(0,4)===b?e(new Blob([n],{type:"application/zip"})):t.startsWith("<")?e(new Blob([n],{type:"text/xml"})):e(n)}}),t):n?e(n):t()}))}export{s as A,u as N,e as _,w as a,p as b,l as c,m as d,i as e,j as f,N as g,y as h,f as r,O as s}