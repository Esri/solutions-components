/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{E as t}from"./p-be41429f.js";
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
 */async function n(t,e,a){const r=e.capabilities.query.maxRecordCount,o={start:t,num:r,outFields:["*"],returnGeometry:!0,where:"1=1"},s=await e.queryFeatures(o);return a=a.concat(s.features),s.exceededTransferLimit?n(t+=r,e,a):Promise.resolve(a)}async function e(t,n){let e=[];const a=t.map((t=>async function(t,n){const e=n.createQuery();return e.spatialRelationship="intersects",e.geometry=t,n.queryObjectIds(e)}
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
 */(t,n)));return(await Promise.all(a)).forEach((t=>{e=[...e,...t]})),e}async function a(t,n){const e=n.createQuery();return e.outFields=["*"],e.objectIds=t,n.queryFeatures(e)}async function r(t,n,e,a){const o=n.capabilities.query.maxRecordCount,s={start:t,num:o,outFields:["*"],returnGeometry:!0,geometry:e},i=await n.queryFeatures(s);return a[n.title]=a[n.title].concat(i.features),i.exceededTransferLimit?r(t+=o,n,e,a):Promise.resolve(a)}function o(t,n){return[...i(t,"polygon",n),...i(t,"polyline",n),...i(t,"point",n)]}function s(n,a){let r=Promise.resolve([]);return n.workflowType!==t.REFINE&&(r=e(n.buffer?[n.buffer]:o(n.geometries,a),n.layerView.layer)),r}function i(t,n,e){const a=t.filter((t=>t.type===n));return a.length<=1?a:[e.union(a)]}async function c(t){let n=[];return await t.when((()=>{n=t.map.layers.toArray().map((t=>t.title))})),n}async function u(t,n){const e=await async function(t,n){let e=[];return await t.when((()=>{e=t.map.layers.toArray().filter((t=>t.title===n))})),e.length>0?e[0]:void 0}(t,n);return e?await t.whenLayerView(e):void 0}async function f(t,n,e,a=!1){return a&&await y(t,n,e,!1),n.highlight(t)}async function y(t,n,e,a=!0){const r=await async function(t,n){const e=n.createQuery();return e.objectIds=t,n.queryExtent(e)}(t,n.layer);await e.goTo(r.extent),a&&await async function(t,n){n.featureEffect={filter:{objectIds:t},includedEffect:"invert(100%)",excludedEffect:"blur(5px)"},setTimeout((()=>{n.featureEffect=void 0}),1300)}(t,n)}export{y as a,u as b,n as c,s as d,e,o as f,c as g,f as h,r as i,a as q}