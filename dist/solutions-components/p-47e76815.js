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
async function n(t,a,c){const s=a.capabilities.query.maxRecordCount,o=a.createQuery();o.start=t,o.num=s,o.where=a.definitionExpression||"1=1";const i=await a.queryFeatures(o);return c=c.concat(i.features),i.exceededTransferLimit?n(t+=s,a,c):Promise.resolve(c)}async function t(n,t){let a=[];const c=n?n.map((n=>async function(n,t){const a=t.createQuery();return a.spatialRelationship="intersects",a.geometry=n,t.queryObjectIds(a)}
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
 */(n,t))):[Promise.resolve()];return(await Promise.all(c)).forEach((n=>{a=[...a,...n||[]]})),a}async function a(n,t){const a=t.createQuery();return a.objectIds=n,t.queryFeatures(a)}async function c(n,t,a,s){const o=t.capabilities.query.maxRecordCount,i=t.createQuery();i.start=n,i.num=o,i.geometry=a;const e=await t.queryFeatures(i);return s[t.id]=s[t.id].concat(e.features),e.exceededTransferLimit?c(n+=o,t,a,s):Promise.resolve(s)}function s(n,t){return[...o(n,"polygon",t),...o(n,"polyline",t),...o(n,"point",t)]}function o(n,t,a){const c=(null==n?void 0:n.filter((n=>n.type===t)))||[];return c.length<=1?c:[a.union(c)]}async function i(n){let t={};return await n.when((()=>{t=n.map.allLayers.toArray().reduce(((n,t)=>("feature"===t.type&&(n[t.id]=t.title),n)),{})})),t}async function e(n){let t=[];return await n.when((()=>{t=n.map.allLayers.toArray().reduce(((n,t)=>("feature"===t.type&&n.push(t.id),n)),[])})),t}async function r(n,t){const a=await async function(n,t){let a=[];return await n.when((()=>{a=n.map.allLayers.toArray().filter((n=>n.id===t))})),a.length>0?a[0]:void 0}(n,t);return a?await n.whenLayerView(a):void 0}async function u(n,t,a,c=!1){return c&&await f(n,t,a,!1),t.highlight(n)}async function f(n,t,a,c=!0,s){const o=await async function(n,t){const a=t.createQuery();return a.objectIds=n,t.queryExtent(a)}(n,t.layer);await a.goTo(o.extent),c&&await async function(n,t,a){const c={objectIds:n};t.featureEffect=Object.assign(Object.assign({},a),{filter:c}),setTimeout((()=>{t.featureEffect=void 0}),1300)}(n,t,s)}export{s as a,r as b,c,a as d,e,n as f,f as g,u as h,i,t as q}