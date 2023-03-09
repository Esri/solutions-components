/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{E as n}from"./p-59fd466e.js";
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
 */async function t(n,a,s){const c=a.capabilities.query.maxRecordCount,o=a.createQuery();o.start=n,o.num=c,o.where=a.definitionExpression||"1=1";const i=await a.queryFeatures(o);return s=s.concat(i.features),i.exceededTransferLimit?t(n+=c,a,s):Promise.resolve(s)}async function a(n,t){let a=[];const s=n?n.map((n=>async function(n,t){const a=t.createQuery();return a.spatialRelationship="intersects",a.geometry=n,t.queryObjectIds(a)}
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
 */(n,t))):[Promise.resolve()];return(await Promise.all(s)).forEach((n=>{a=[...a,...n||[]]})),a}async function s(n,t){const a=t.createQuery();return a.objectIds=n,t.queryFeatures(a)}async function c(n,t,a,s){const o=t.capabilities.query.maxRecordCount,i=t.createQuery();i.start=n,i.num=o,i.geometry=a;const e=await t.queryFeatures(i);return s[t.id]=s[t.id].concat(e.features),e.exceededTransferLimit?c(n+=o,t,a,s):Promise.resolve(s)}function o(n,t){return[...e(n,"polygon",t),...e(n,"polyline",t),...e(n,"point",t)]}function i(t,s){let c=Promise.resolve([]);return t.workflowType!==n.REFINE&&(c=a(t.buffer?[t.buffer]:o(t.geometries,s),t.layerView.layer)),c}function e(n,t,a){const s=(null==n?void 0:n.filter((n=>n.type===t)))||[];return s.length<=1?s:[a.union(s)]}async function r(n){let t={};return await n.when((()=>{t=n.map.allLayers.toArray().reduce(((n,t)=>("feature"===t.type&&(n[t.id]=t.title),n)),{})})),t}async function u(n){let t=[];return await n.when((()=>{t=n.map.allLayers.toArray().reduce(((n,t)=>("feature"===t.type&&n.push(t.id),n)),[])})),t}async function f(n,t){const a=await async function(n,t){let a=[];return await n.when((()=>{a=n.map.allLayers.toArray().filter((n=>n.id===t))})),a.length>0?a[0]:void 0}(n,t);return a?await n.whenLayerView(a):void 0}async function y(n,t,a,s=!1){return s&&await w(n,t,a,!1),t.highlight(n)}async function w(n,t,a,s=!0,c){const o=await async function(n,t){const a=t.createQuery();return a.objectIds=n,t.queryExtent(a)}(n,t.layer);await a.goTo(o.extent),s&&await async function(n,t,a){const s={objectIds:n};t.featureEffect=Object.assign(Object.assign({},a),{filter:s}),setTimeout((()=>{t.featureEffect=void 0}),1300)}(n,t,c)}export{f as a,s as b,i as c,a as d,o as e,c as f,w as g,y as h,u as i,r as j,t as q}