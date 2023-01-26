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
function t(t,n,e=!0){const c=function(t,n=null,e=!0){let c=t.map((t=>Object.values(t).map((t=>`"${t}"`)).join(",")+"\r\n"));if(e){const t=new Set;c.forEach((n=>t.add(n))),c=Array.from(t)}if(n){const t=Object.values(n).map((t=>`"${t}"`)).join(",")+"\r\n";c.unshift(t)}return c}(n,t,e);console.log(c),function(t,n){const e=document.createElement("a");void 0!==e.download&&(e.href=URL.createObjectURL(new Blob(t,{type:"text/csv;charset=utf-8;"})),e.download=`${n}.csv`||"export.csv",e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e))}(c,`notify-${Date.now().toString()}`)}export{t as e}