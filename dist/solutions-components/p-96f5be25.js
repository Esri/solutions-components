/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{a as t}from"./p-c1cf3ebc.js";
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
 */async function n(t){const n=t.createQuery();return n.where=t.definitionExpression||"1=1",await t.queryObjectIds(n)}async function a(t,n){let a=[];const s=t?t.map((t=>async function(t,n){const a=n.createQuery();return a.spatialRelationship="intersects",a.geometry=t,n.queryObjectIds(a)}
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
 */(t,n))):[Promise.resolve()];return(await Promise.all(s)).forEach((t=>{a=[...a,...t||[]]})),a}async function s(t,n,a,c,o,e){var i;const r=null===(i=n.capabilities)||void 0===i?void 0:i.query.maxRecordCount,u=n.createQuery();u.start=0,u.returnGeometry=c,u.objectIds=t.slice(0,r),r&&(u.num=r),o&&(u.outSpatialReference=o),e&&(u.outFields=e);const f=await n.queryFeatures(u);a=a.concat(f.features);const w=t.slice(r,t.length);return w.length>0?s(w,n,a,c,o):Promise.resolve(a)}async function c(t,n){const a=n.globalIdField;if(!a)return[];const s=n.createQuery();return s.returnGeometry=!1,s.outFields=[n.objectIdField],s.where=t.map((t=>`${a} = '${t}'`)).join(" or "),(await n.queryFeatures(s)).features}async function o(t,n,a,s){const c=n.capabilities.query.maxRecordCount,e=n.createQuery();e.start=t,e.num=c,e.geometry=a;const i=await n.queryFeatures(e);return s[n.id]=s[n.id].concat(i.features),i.exceededTransferLimit?o(t+=c,n,a,s):Promise.resolve(s)}async function e(t,n,a){const s=t.createQuery();return s.where=n||"1=1",s.orderByFields=a,await t.queryObjectIds(s)}function i(t,n){return[...r(t,"polygon",n),...r(t,"polyline",n),...r(t,"point",n)]}function r(t,n,a){const s=(null==t?void 0:t.filter((t=>t.type===n)))||[];return s.length<=1?s:[a.union(s)]}async function u(t,n){let a;return await t.when((()=>{a=t.map.allLayers.toArray().reduce(((t,n)=>("feature"===n.type&&(t[n.id]={name:n.title,supportsUpdate:void 0}),t)),{})})),w(n,a,t)}async function f(t,n){let a;return await t.when((()=>{a=t.map.allTables.toArray().reduce(((t,n)=>(t[n.id]={name:n.title,supportsUpdate:void 0},t)),{})})),w(n,a,t)}async function w(t,n,a){if(t){const t={},s=Object.keys(n);for(let c=0;c<s.length;c++){const o=s[c],e=await l(a,o);await e.load(),await e.when(),t[o]={name:n[o].name,supportsUpdate:e.editingEnabled&&e.capabilities.operations.supportsUpdate}}return t}return n}async function y(t,n){const a=await l(t,n);return a?await t.whenLayerView(a):void 0}async function l(t,n){let a=[];return await t.when((()=>{a=[...t.map.allLayers.toArray(),...t.map.allTables.toArray()].filter((t=>t.id===n))})),a.length>0?a[0]:void 0}async function d(t){const n=t.map.allLayers.toArray();let a;return await t.when((()=>{a=n.map((n=>t.whenLayerView(n)))})),await Promise.allSettled(a),n}async function p(t,n,a,s=!1){return s&&(await j(t,n,a,!1),await new Promise((t=>setTimeout(t,1e3)))),n.highlight(t)}async function m(t){const n=b(t);return Object.keys(n).reduce(((t,a)=>{const s=n[a];return t.push(s.layerView.highlight(s.ids)),t}),[])}function b(n){return n.reduce(((n,a)=>{const s=a.layerView,c=null==s?void 0:s.layer.id;return c&&Object.keys(n).indexOf(c)>-1?n[c].ids=[...new Set([...a.selectedIds,...n[c].ids])]:c&&(n[c]={layerView:s,ids:a.selectedIds}),a.workflowType===t.REFINE&&Object.keys(a.refineInfos).forEach((t=>{const s=a.refineInfos[t];Object.keys(n).indexOf(t)>-1&&(n[t].ids=[...new Set([...s.addIds,...n[t].ids])],n[t].ids=n[t].ids.filter((t=>s.removeIds.indexOf(t)<0)))})),n}),{})}async function j(t,n,a,s=!0,c){const o=await async function(t,n){const a=n.createQuery();return a.objectIds=t,n.queryExtent(a)}(t,n.layer);await a.goTo(o.extent),s&&await async function(t,n,a){const s={objectIds:t};n.featureEffect=Object.assign(Object.assign({},a),{filter:s}),setTimeout((()=>{n.featureEffect=void 0}),1300)}(t,n,c)}export{d as a,y as b,j as c,u as d,n as e,e as f,l as g,p as h,c as i,a as j,i as k,o as l,b as m,m as n,f as o,s as q}