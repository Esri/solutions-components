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
 */async function n(t,a,e){const r=a.capabilities.query.maxRecordCount,s={start:t,num:r,outFields:["*"],returnGeometry:!0,where:"1=1"},o=await a.queryFeatures(s);return e=e.concat(o.features),o.exceededTransferLimit?n(t+=r,a,e):Promise.resolve(e)}async function a(t,n){let a=[];const e=t.map((t=>async function(t,n){const a=n.createQuery();return a.spatialRelationship="intersects",a.geometry=t,n.queryObjectIds(a)}
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
 */(t,n)));return(await Promise.all(e)).forEach((t=>{a=[...a,...t||[]]})),a}async function e(t,n){const a=n.createQuery();return a.outFields=["*"],a.objectIds=t,n.queryFeatures(a)}async function r(t,n,a,e){const s=n.capabilities.query.maxRecordCount,o={start:t,num:s,outFields:["*"],returnGeometry:!0,geometry:a},c=await n.queryFeatures(o);return e[n.id]=e[n.id].concat(c.features),c.exceededTransferLimit?r(t+=s,n,a,e):Promise.resolve(e)}function s(t,n){return[...c(t,"polygon",n),...c(t,"polyline",n),...c(t,"point",n)]}function o(n,e){let r=Promise.resolve([]);return n.workflowType!==t.REFINE&&(r=a(n.buffer?[n.buffer]:s(n.geometries,e),n.layerView.layer)),r}function c(t,n,a){const e=t.filter((t=>t.type===n));return e.length<=1?e:[a.union(e)]}async function i(t){let n={};return await t.when((()=>{n=t.map.allLayers.toArray().reduce(((t,n)=>("feature"===n.type&&(t[n.id]=n.title),t)),{})})),n}async function u(t){let n=[];return await t.when((()=>{n=t.map.allLayers.toArray().reduce(((t,n)=>("feature"===n.type&&t.push(n.id),t)),[])})),n}async function f(t,n){const a=await async function(t,n){let a=[];return await t.when((()=>{a=t.map.allLayers.toArray().filter((t=>t.id===n))})),a.length>0?a[0]:void 0}(t,n);return a?await t.whenLayerView(a):void 0}async function y(t,n,a,e=!1){return e&&await w(t,n,a,!1),n.highlight(t)}async function w(t,n,a,e=!0,r){const s=await async function(t,n){const a=n.createQuery();return a.objectIds=t,n.queryExtent(a)}(t,n.layer);await a.goTo(s.extent),e&&await async function(t,n,a){const e={objectIds:t};n.featureEffect=Object.assign(Object.assign({},a),{filter:e}),setTimeout((()=>{n.featureEffect=void 0}),1300)}(t,n,r)}export{f as a,e as b,o as c,a as d,s as e,r as f,w as g,y as h,u as i,i as j,n as q}