/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{E as t}from"./p-dbc9a5a8.js";
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
 */async function n(t,a,s){const o=a.capabilities.query.maxRecordCount,r={start:t,num:o,outFields:["*"],returnGeometry:!0,where:"1=1"},e=await a.queryFeatures(r);return s=s.concat(e.features),e.exceededTransferLimit?n(t+=o,a,s):Promise.resolve(s)}async function a(t,n){let a=[];const s=t.map((t=>async function(t,n){const a=n.createQuery();return a.spatialRelationship="intersects",a.geometry=t,n.queryObjectIds(a)}
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
 */(t,n)));return(await Promise.all(s)).forEach((t=>{a=[...a,...t||[]]})),a}async function s(t,n){const a=n.createQuery();return a.outFields=["*"],a.objectIds=t,n.queryFeatures(a)}async function o(t,n,a,s){const r=n.capabilities.query.maxRecordCount,e={start:t,num:r,outFields:["*"],returnGeometry:!0,geometry:a},c=await n.queryFeatures(e);return s[n.id]=s[n.id].concat(c.features),c.exceededTransferLimit?o(t+=r,n,a,s):Promise.resolve(s)}function r(t,n){return[...c(t,"polygon",n),...c(t,"polyline",n),...c(t,"point",n)]}function e(n,s){let o=Promise.resolve([]);return n.workflowType!==t.REFINE&&(o=a(n.buffer?[n.buffer]:r(n.geometries,s),n.layerView.layer)),o}function c(t,n,a){const s=t.filter((t=>t.type===n));return s.length<=1?s:[a.union(s)]}async function i(t){let n={};return await t.when((()=>{n=t.map.layers.toArray().reduce(((t,n)=>(t[n.id]=n.title,t)),{})})),n}async function u(t){let n=[];return await t.when((()=>{n=t.map.layers.toArray().map((t=>t.id))})),n}async function f(t,n){const a=await async function(t,n){let a=[];return await t.when((()=>{a=t.map.layers.toArray().filter((t=>t.id===n))})),a.length>0?a[0]:void 0}(t,n);return a?await t.whenLayerView(a):void 0}async function y(t,n,a,s=!1){return s&&await w(t,n,a,!1),n.highlight(t)}async function w(t,n,a,s=!0,o){const r=await async function(t,n){const a=n.createQuery();return a.objectIds=t,n.queryExtent(a)}(t,n.layer);await a.goTo(r.extent),s&&await async function(t,n,a){const s={objectIds:t};n.featureEffect=Object.assign(Object.assign({},a),{filter:s}),setTimeout((()=>{n.featureEffect=void 0}),1300)}(t,n,o)}export{f as a,n as b,e as c,a as d,r as e,o as f,w as g,y as h,u as i,i as j,s as q}