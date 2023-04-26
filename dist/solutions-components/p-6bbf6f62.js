/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{a as n}from"./p-f8be5d5f.js";import{g as t}from"./p-0d207a2c.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */const s={};function o(){throw new Error("could not fetch component message bundle")}function c(n){n.messages={...n.defaultMessages,...n.messageOverrides}}async function a(n){n.defaultMessages=await e(n,n.effectiveLocale),c(n)}async function e(c,a){const{el:e}=c,i=e.tagName.toLowerCase().replace("calcite-","");return async function(t,c){const a=`${c}_${t}`;return s[a]||(s[a]=fetch(n(`./assets/${c}/t9n/messages_${t}.json`)).then((n=>(n.ok||o(),n.json()))).catch((()=>o()))),s[a]}(t(a,"t9n"),i)}async function i(n,t){n.defaultMessages=await e(n,t),c(n)}function f(n){n.onMessagesChange=r}function u(n){n.onMessagesChange=void 0}function r(){c(this)}export{f as c,u as d,a as s,i as u}