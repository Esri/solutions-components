/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{c as t}from"./p-7dcab29d.js";
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
 */async function c(c,e){const n=(await t(e,c.layer)).features.map((t=>t.attributes)),o={},s=n[0];Object.keys(s).forEach((t=>{s.hasOwnProperty(t)&&(o[t]=t)})),function(t,c,e){t&&c.unshift(t);const n=c.reduce(((t,c)=>t+Object.values(c).map((t=>`"${t}"`)).join(",")+"\r\n"),""),o=document.createElement("a");void 0!==o.download&&(o.href=URL.createObjectURL(new Blob([n],{type:"text/csv;charset=utf-8;"})),o.download=`${e}.csv`||"export.csv",o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o))}(o,n,`notify-${Date.now().toString()}`)}export{c as e}