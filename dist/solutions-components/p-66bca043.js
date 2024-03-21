/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{c as e}from"./p-18f1e8b5.js";import{d as t}from"./p-c1cf3ebc.js";import{E as r,j as i,S as s}from"./p-b503d01d.js";import"./p-a230b270.js";import{c as n,r as a,b as o,d as c,f as u,h as l,a as f,s as p}from"./p-94c634ba.js";
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
***************************************************************************** */
var m=function(){return m=Object.assign||function(e){for(var t,r=1,i=arguments.length;r<i;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},m.apply(this,arguments)};function d(e){return void 0===e&&(e={}),e.portal?n(e.portal):e.authentication?e.authentication.portal:"https://www.arcgis.com/sharing/rest"}function h(e){return e.owner?Promise.resolve(e.owner):e.item&&e.item.owner?Promise.resolve(e.item.owner):e.authentication&&e.authentication.getUsername?e.authentication.getUsername():Promise.reject(new Error("Could not determine the owner of this item. Pass the `owner`, `item.owner`, or `authentication` option."))}
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
function v(e,t=0){const i=e.split("/");let s=i.pop(),n="";const a=i.shift();let o=r.Resource;if(a)if(a.endsWith("_info_thumbnail"))o=r.Thumbnail;else if(a.endsWith("_info_metadata"))o=r.Metadata,s="metadata.xml";else if(a.endsWith("_info_data"))o=r.Data;else if(a.endsWith("_info_dataz"))s=s.replace(/\.zip$/,""),o=r.Data;else if(t<1){const e=a.indexOf("_");e>0&&(n=a.substr(e+1))}else n=i.join("/");return{type:o,folder:n,filename:s}}
/** @license
 * Copyright 2021 Esri
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
 */function w(e,t,r){return{...e,fetchedFromSource:t,copiedToDestination:r}}
/** @license
 * Copyright 2021 Esri
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
 * Copyright 2021 Esri
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
function b(e,t,r,s=40){return new Promise((n=>{let a=[];const o=[];e.length>0&&function(e,t){const r=[];let i=0;for(;i<e.length;)r.push(e.slice(i,i+t)),i+=t;return r}(e,s).forEach(((e,t)=>{const r={filename:`resources${t}.zip`,zip:new i,filelist:[]};a=a.concat(e.map((e=>function(e,t){return e.folder?t.zip.folder(e.folder).file(e.filename,e.file,{binary:!0}):t.zip.file(e.filename,e.file,{binary:!0}),t.filelist.push(e),w(e,!0)}
/** @license
 * Copyright 2021 Esri
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
 */(e,r)))),o.push(r)})),a.length>0?Promise.all(a).then((e=>{e=e.filter((e=>!(e.fetchedFromSource&&void 0===e.copiedToDestination))),function(e,t,r){return new Promise((i=>{const s=e.filter((e=>Object.keys(e.zip.files).length>0));s.length>0?S(s,t,r).then((e=>{i(e)})):i([])}))}(o,t,r).then((t=>{n(e.concat(t))}))})):n([])}))}function S(e,t,r){return new Promise((i=>{let s=[];const n=e.pop();let c=Promise.resolve([]);e.length>0&&(c=S(e,t,r)),c.then((e=>(s=e,new Promise((e=>{setTimeout((()=>e()),1e3)}))))).then((()=>function(e,t,r){return new Promise((i=>{e.zip.generateAsync({type:"blob"}).then((t=>o(t,e.filename,"application/zip"))).then((e=>{return h(i={id:t,resource:e,authentication:r,params:{archive:!0}}).then((function(e){var t=d(i)+"/content/users/"+e+"/items/"+i.id+"/addResources";return i.params=m({file:i.resource,fileName:i.name,resourcesPrefix:i.prefix,text:i.content,access:i.private?"private":"inherit"},i.params),a(t,i)}));var i})).then((()=>i(w(e,!0,!0))),(()=>i(w(e,!0,!1))))}))}(n,t,r))).then((e=>{e.filelist.forEach((t=>{s.push(w(t,!0,e.copiedToDestination))})),i(s)}))}))}
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
const _={solutionItemId:"",defaultWkid:void 0,solutionData:{metadata:{},templates:[]},templateEdits:{},featureServices:[],spatialReferenceInfo:{enabled:!1,services:{},spatialReference:void 0}},g=class{static get Store(){return this._instance||(this._instance=new this)}constructor(){this._hasChanges=!1,this._store=e(Object.assign({},_))}getItemInfo(e){let t;return this._store.get("solutionData").templates.some((r=>e==r.itemId&&(t=r,!0))),t}getStoreInfo(e){return this._store.get(e)}async loadSolution(e,t){this._authentication=t;const r=await l(e,t);if(r){const i=f(r,"params.wkid.default");await this._prepareSolutionItemsForEditing(e,r.templates,t);const s=this._getFeatureServices(r.templates),n=this._getSpatialReferenceInfo(s,i);this._store.set("solutionItemId",e),this._store.set("defaultWkid",i),this._store.set("solutionData",r),this._store.set("featureServices",s),this._store.set("spatialReferenceInfo",n)}this._flagStoreHasChanges(!1)}replaceItemThumbnail(e){e.resourceFilePaths.forEach((e=>{e.type===r.Thumbnail&&(e.updateType===t.None?e.updateType=t.Remove:e.updateType!==t.Add&&e.updateType!==t.Update||(e.updateType=t.Obsolete))})),e.resourceFilePaths=e.resourceFilePaths.filter((e=>e.updateType!=t.Obsolete)),e.resourceFilePaths.push({blob:e.thumbnail,filename:e.thumbnail.name,type:r.Thumbnail,updateType:t.Add}),this.setItemInfo(e)}async saveSolution(){const e=this._store.get("solutionItemId"),t=this._store.get("solutionData"),r=this._store.get("spatialReferenceInfo");await this._prepareSolutionItemsForStorage(e,t.templates,this._authentication);const i=this._setSpatialReferenceInfo(r,t.templates);p(t,"params.wkid",i?{label:"Spatial Reference",default:i,valueType:"spatialReference",attributes:{required:"true"}}:{});const s={id:e,text:t};
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
await function(e,t){return new Promise(((r,i)=>{var s;(s={item:e,folderId:void 0,authentication:t,params:{}},h(s).then((function(e){var t,r,i,n=s.folderId?d(s)+"/content/users/"+e+"/"+s.folderId+"/items/"+s.item.id+"/update":d(s)+"/content/users/"+e+"/items/"+s.item.id+"/update";return s.params=m(m({},s.params),(t=s.item,(r=JSON.parse(JSON.stringify(t))).data&&("undefined"!=typeof Blob&&t.data instanceof Blob||"ReadStream"===t.data.constructor.name?r.file=t.data:r.text=t.data,delete r.data),r)),s.params.extent&&(i=s.params.extent,Array.isArray(i)&&Array.isArray(i[0])&&Array.isArray(i[1]))&&(s.params.extent=function(e){return e.join(",")}(s.params.extent)),a(n,s)}))).then((e=>e.success?r(e):i(e)),(e=>i(e)))}))}(s,this._authentication)}setItemInfo(e){const t=this._store.get("solutionData");t.templates.some((r=>e.itemId==r.itemId&&(r=e,this._store.set("solutionData",t),this._flagStoreHasChanges(!0),!0)))}setStoreInfo(e,t){this._store.set(e,t),this._flagStoreHasChanges(!0)}_testAccess(e,t,r,i){switch(e){case"_emptyTheStore":this._emptyTheStore();break;case"_getFeatureServices":return this._getFeatureServices(t);case"_getItemsSharedWithThisGroup":return this._getItemsSharedWithThisGroup(t,r);case"_getResourceFilePaths":return this._getResourceFilePaths(t,r,i);case"_getResourceStorageName":return this._getResourceStorageName(t,r);case"_getSpatialReferenceInfo":return this._getSpatialReferenceInfo(t,r);case"_prepareSolutionItemsForEditing":return this._prepareSolutionItemsForEditing(t,r,i);case"_prepareSolutionItemsForStorage":return this._prepareSolutionItemsForStorage(t,r,i);case"_setSpatialReferenceInfo":return this._setSpatialReferenceInfo(t,r);case"_splitFilename":return this._splitFilename(t)}return null}_emptyTheStore(){this._store.set("solutionItemId",_.solutionItemId),this._store.set("defaultWkid",_.defaultWkid),this._store.set("solutionData",_.solutionData),this._store.set("templateEdits",_.templateEdits),this._store.set("featureServices",_.featureServices),this._store.set("spatialReferenceInfo",_.spatialReferenceInfo)}_flagStoreHasChanges(e){this._hasChanges!==e&&window.dispatchEvent(new CustomEvent("solutionStoreHasChanges",{detail:e,bubbles:!0,cancelable:!1,composed:!0})),this._hasChanges=e}_getCustomizableFeatureServices(e){return e.reduce(((e,t)=>("Feature Service"===t.type&&t.item.typeKeywords.indexOf("View Service")<0&&e.push(t),e)),[])}_getFeatureServices(e){return this._getCustomizableFeatureServices(e).map((e=>({name:e.item.title||e.item.name,enabled:f(e,"properties.service.spatialReference.wkid").toString().startsWith("{{params.wkid||")})))}_getItemsSharedWithThisGroup(e,t){return t.reduce(((t,r)=>(r.itemId!==e.itemId&&"Group"!==r.type&&t.push({id:r.itemId,title:r.item.name||r.item.title,isShared:(r.groups||[]).indexOf(e.itemId)>-1,shareItem:(r.groups||[]).indexOf(e.itemId)>-1,type:r.type,typeKeywords:r.item.typeKeywords}),t)),[])}_getResourceFilePaths(e,r,i){return function(e,t,r=[],i=0){return r.map((r=>{return{url:(s=e,n=t,a=r,c(s)+"content/items/"+n+"/resources/"+a),...v(r,i)};var s,n,a}))}(i,e,r.resources,s).map((e=>(e.updateType=t.None,e)))}_getResourceStorageName(e,t){let i=e;switch(t.type){case r.Data:i=`${i}_info_data`;break;case r.Info:i=`${i}_info`;break;case r.Metadata:i=`${i}_info_metadata`;break;case r.Resource:break;case r.Thumbnail:i=`${i}_info_thumbnail`}let s=t.filename;return t.type==r.Data&&s&&!function(e){const t=e.match(/\.([a-z]+)$/i);return!!t&&"|.json|.xml|.txt|.png|.pbf|.zip|.jpeg|.jpg|.gif|.bmp|.gz|.svg|.svgz|.geodatabase|".indexOf("|"+t[0]+"|")>=0}(s)&&(s+=".zip",i+="z"),i+"/"+(t.folder?t.folder+"/"+s:s)}_getSpatialReferenceInfo(e,t){const r={};return e.forEach((e=>{r[e.name]=e.enabled})),{enabled:void 0!==t,services:r,spatialReference:t||void 0}}async _prepareSolutionItemsForEditing(e,t,i){const s=[];t.forEach((n=>{n.resourceFilePaths=this._getResourceFilePaths(e,n,i.portal),s.push(n.resourceFilePaths.length>0?function(e,t){let i,s;return t.forEach((e=>{e.type===r.Thumbnail&&(i=e.url,s=e.filename)})),i?u(i,s,e):Promise.resolve(null)}(i,n.resourceFilePaths):Promise.resolve()),n.groupDetails="Group"===n.type?this._getItemsSharedWithThisGroup(n,t):[]}));const n=await Promise.all(s);return t.forEach(((e,t)=>{e.thumbnail=n[t]?n[t]:void 0})),Promise.resolve()}async _prepareSolutionItemsForStorage(e,r,i){const s=[],n=[];return r.forEach((r=>{r.resourceFilePaths.forEach((async o=>{const c=this._getResourceStorageName(r.itemId,o);switch(o.updateType){case t.Add:const{prefix:u,suffix:l}=this._splitFilename(c);r.resources.push(c),s.push({itemId:r.itemId,file:o.blob,folder:u,filename:l});break;case t.Update:n.push(new Promise((async t=>{try{await function(e,t,r,i){const s=t.split("/"),n=s.length>1?s.slice(0,s.length-1).join("/"):void 0;return h(o={id:e,prefix:n,name:s[s.length-1],resource:r,authentication:i}).then((function(e){var t=d(o)+"/content/users/"+e+"/items/"+o.id+"/updateResources";return o.params=m({file:o.resource,fileName:o.name,resourcesPrefix:o.prefix,text:o.content},o.params),void 0!==o.private&&(o.params.access=o.private?"private":"inherit"),a(t,o)}));var o}(e,c,o.blob,i)}catch(e){console.log("Unable to update "+c+" for item "+r.itemId+": "+JSON.stringify(e))}t()})));break;case t.Remove:n.push(new Promise((async t=>{try{await function(e,t,r){return h(i={id:e,resource:t,authentication:r}).then((function(e){var t=d(i)+"/content/users/"+e+"/items/"+i.id+"/removeResources";return i.params=m(m({},i.params),{resource:i.resource}),void 0!==i.deleteAll&&(i.params.deleteAll=i.deleteAll),a(t,i)}));var i}(e,c,i),r.resources=r.resources.filter((e=>e!==c))}catch(e){console.log("Unable to remove "+c+" for item "+r.itemId+": "+JSON.stringify(e))}t()})))}return Promise.resolve()})),delete r.resourceFilePaths,delete r.thumbnail,delete r.groupDetails})),Promise.all(n).then((async()=>{var t,r,n;return s.length>0&&await(t=s,r=e,n=i,new Promise((e=>{b(t,r,n).then((t=>{e(t.filter((e=>e.fetchedFromSource&&e.copiedToDestination)).map((e=>e.folder+"/"+e.filename)))}))}))),Promise.resolve()}))}_setSpatialReferenceInfo(e,t){const r="{{params.wkid||",i=this._getCustomizableFeatureServices(t);return e.enabled?(i.forEach((t=>{let i;e.services[t.item.title||t.item.name]?(i=`{{params.wkid||${e.spatialReference}}}`,p(t,"properties.service.spatialReference.wkid",i)):(i=f(t,"properties.service.spatialReference.wkid"),i.toString().startsWith(r)&&(i=i.toString().substring(15,i.length-2),p(t,"properties.service.spatialReference.wkid",i)))})),e.spatialReference):void i.forEach((e=>{const t=f(e,"properties.service.spatialReference.wkid");t.toString().startsWith(r)&&p(e,"properties.service.spatialReference.wkid",t.toString().substring(15,t.length-2))}))}_splitFilename(e){const t=e.split("/");return{prefix:t.length>1?t.slice(0,t.length-1).join("/"):void 0,suffix:t[t.length-1]}}}.Store;export{g as s}