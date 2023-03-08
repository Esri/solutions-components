/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{E as n}from"./p-dbc9a5a8.js";
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
 */async function t(n,a,c){const s=a.capabilities.query.maxRecordCount,o=a.createQuery();o.start=n,o.num=s,o.where=a.definitionExpression||"1=1";const i=await a.queryFeatures(o);return c=c.concat(i.features),i.exceededTransferLimit?t(n+=s,a,c):Promise.resolve(c)}async function a(n,t){let a=[];const c=n?n.map((n=>async function(n,t){const a=t.createQuery();return a.spatialRelationship="intersects",a.geometry=n,t.queryObjectIds(a)}
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
 */(n,t))):[Promise.resolve()];return(await Promise.all(c)).forEach((n=>{a=[...a,...n||[]]})),a}async function c(n,t){const a=t.createQuery();return a.objectIds=n,t.queryFeatures(a)}async function s(n,t,a,c){const o=t.capabilities.query.maxRecordCount,i=t.createQuery();i.start=n,i.num=o,i.geometry=a;const r=await t.queryFeatures(i);return c[t.id]=c[t.id].concat(r.features),r.exceededTransferLimit?s(n+=o,t,a,c):Promise.resolve(c)}function o(n,t){return[...r(n,"polygon",t),...r(n,"polyline",t),...r(n,"point",t)]}function i(t,c){let s=Promise.resolve([]);return t.workflowType!==n.REFINE&&(s=a(t.buffer?[t.buffer]:o(t.geometries,c),t.layerView.layer)),s}function r(n,t,a){const c=(null==n?void 0:n.filter((n=>n.type===t)))||[];return c.length<=1?c:[a.union(c)]}async function e(n){let t={};return await n.when((()=>{t=n.map.allLayers.toArray().reduce(((n,t)=>("feature"===t.type&&(n[t.id]=t.title),n)),{})})),t}async function u(n){let t=[];return await n.when((()=>{t=n.map.allLayers.toArray().reduce(((n,t)=>("feature"===t.type&&n.push(t.id),n)),[])})),t}async function f(n,t){const a=await async function(n,t){let a=[];return await n.when((()=>{a=n.map.allLayers.toArray().filter((n=>n.id===t))})),a.length>0?a[0]:void 0}(n,t);return a?await n.whenLayerView(a):void 0}async function y(n,t,a,c=!1){return c&&await w(n,t,a,!1),t.highlight(n)}async function w(n,t,a,c=!0,s){const o=await async function(n,t){const a=t.createQuery();return a.objectIds=n,t.queryExtent(a)}(n,t.layer);await a.goTo(o.extent),c&&await async function(n,t,a){const c={objectIds:n};t.featureEffect=Object.assign(Object.assign({},a),{filter:c}),setTimeout((()=>{t.featureEffect=void 0}),1300)}(n,t,s)}export{f as a,c as b,i as c,a as d,o as e,s as f,w as g,y as h,u as i,e as j,t as q}