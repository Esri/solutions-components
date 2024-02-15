/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{a as n}from"./p-7d280d8a.js";import{e as o}from"./p-94de9279.js";import{g as s}from"./p-13f2d901.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */const t={},a={};async function r(o){const e=s(o);if(t[e])return t[e];a[e]||(a[e]=fetch(n(`./assets/date-picker/nls/${e}.json`)).then((n=>n.json())).catch((()=>(console.error(`Translations for "${e}" not found or invalid, falling back to english`),r("en")))));const i=await a[e];return t[e]=i,i}function e(n){return n.map(((n,s)=>o(n,1===s)))}export{r as a,e as g}