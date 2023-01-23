/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{a as n}from"./p-c023e6a1.js";import{g as o}from"./p-9eba5c66.js";import{a as t}from"./p-f42e014b.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const s={},a={};async function r(t){const e=o(t);if(s[e])return s[e];a[e]||(a[e]=fetch(n(`./assets/date-picker/nls/${e}.json`)).then((n=>n.json())).catch((()=>(console.error(`Translations for "${e}" not found or invalid, falling back to english`),r("en")))));const i=await a[e];return s[e]=i,i}function e(n){return n.map(((n,o)=>t(n,1===o)))}
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const i=2,c={nextMonth:"Next month",prevMonth:"Previous month",year:"Year"};export{i as H,c as T,r as a,e as g}