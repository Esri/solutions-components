/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{c as e}from"./p-4ff653eb.js";
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
 */const{state:a,onChange:s}=e({managedLayers:[],highlightHandles:[],layerNameHash:{},removeHandles:()=>{a.highlightHandles.forEach((e=>null==e?void 0:e.remove())),a.highlightHandles=[]}}),n=new CustomEvent("managedLayersChanged",{bubbles:!0,cancelable:!1,composed:!0});s("managedLayers",(()=>{dispatchEvent(n)}));export{a as s}