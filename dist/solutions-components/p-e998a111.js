/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{a as n}from"./p-f8be5d5f.js";import{c as o}from"./p-68f29a98.js";import{g as s}from"./p-0d207a2c.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */const a={},t={};async function r(o){const f=s(o);if(a[f])return a[f];t[f]||(t[f]=fetch(n(`./assets/date-picker/nls/${f}.json`)).then((n=>n.json())).catch((()=>(console.error(`Translations for "${f}" not found or invalid, falling back to english`),r("en")))));const i=await t[f];return a[f]=i,i}function f(n){return n.map(((n,s)=>o(n,1===s)))}export{r as a,f as g}