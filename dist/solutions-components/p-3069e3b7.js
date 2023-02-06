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
function t(t){!function(t,e){const n=document.createElement("a");void 0!==n.download&&(n.href=URL.createObjectURL(new Blob(t,{type:"text/csv;charset=utf-8;"})),n.download=`${e}.csv`||"export.csv",n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n))}(t.map((t=>Object.values(t).map((t=>`"${t}"`)).join(",")+"\r\n")),`notify-${Date.now().toString()}`)}export{t as e}