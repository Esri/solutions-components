/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{a as n}from"./p-7d280d8a.js";import{g as t}from"./p-13f2d901.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */const s={};function o(){throw new Error("could not fetch component message bundle")}function c(n){n.messages={...n.defaultMessages,...n.messageOverrides}}async function a(n){n.defaultMessages=await i(n,n.effectiveLocale),c(n)}async function i(c,a){const{el:i}=c,e=i.tagName.toLowerCase().replace("calcite-","");return async function(t,c){const a=`${c}_${t}`;return s[a]||(s[a]=fetch(n(`./assets/${c}/t9n/messages_${t}.json`)).then((n=>(n.ok||o(),n.json()))).catch((()=>o()))),s[a]}(t(a,"t9n"),e)}async function e(n,t){n.defaultMessages=await i(n,t),c(n)}function f(n){n.onMessagesChange=r}function u(n){n.onMessagesChange=void 0}function r(){c(this)}export{f as c,u as d,a as s,e as u}