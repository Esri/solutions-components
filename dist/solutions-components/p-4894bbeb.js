/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{d as e,a as t}from"./p-729708a3.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */function n(){const{classList:n}=document.body,o=window.matchMedia("(prefers-color-scheme: dark)").matches,d=()=>n.contains(e)||n.contains(t)&&o?"dark":"light",c=e=>document.body.dispatchEvent(new CustomEvent("calciteThemeChange",{bubbles:!0,detail:{theme:e}})),i=e=>{a!==e&&c(e),a=e};let a=d();c(a),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>i(e.matches?"dark":"light"))),new MutationObserver((()=>i(d()))).observe(document.body,{attributes:!0,attributeFilter:["class"]})}const o=function(){"undefined"!=typeof window&&"undefined"!=typeof location&&"undefined"!=typeof document&&window.location===location&&window.document===document&&("interactive"===document.readyState?n():document.addEventListener("DOMContentLoaded",(()=>n()),{once:!0}))};export{o as g}