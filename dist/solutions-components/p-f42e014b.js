/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{n}from"./p-9eba5c66.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */function t(n,t,e){const a=n.getTime(),r=!(t instanceof Date)||a>=t.getTime(),s=!(e instanceof Date)||a<=e.getTime();return r&&s}function e(n,t,e){if(!(n instanceof Date))return null;const a=n.getTime(),r=t instanceof Date&&a<t.getTime(),s=e instanceof Date&&a>e.getTime();return r?t:s?e:n}function a(n,t=!1){if(n instanceof Date)return n;if(!n||"string"!=typeof n)return null;const e=n.split(/[: T-]/).map(parseFloat),a=new Date(e[0],(e[1]||1)-1,e[2]||1);if(a.setFullYear(e[0]),isNaN(a.getTime()))throw new Error(`Invalid ISO 8601 date: "${n}"`);return t?D(a):a}function r(n){return"string"==typeof n?n:n instanceof Date?new Date(n.getTime()-6e4*n.getTimezoneOffset()).toISOString().split("T")[0]:""}function s(n,t){return n instanceof Date&&t instanceof Date&&n.getDate()===t.getDate()&&n.getMonth()===t.getMonth()&&n.getFullYear()===t.getFullYear()}function o(n){const t=n.getMonth(),e=new Date(n);return e.setMonth(t-1),t===e.getMonth()?new Date(n.getFullYear(),t,0):e}function i(n){const t=n.getMonth(),e=new Date(n);return e.setMonth(t+1),(t+2)%7==e.getMonth()%7?new Date(n.getFullYear(),t+2,0):e}function c(t,e){const{separator:a,unitOrder:r}=e,s=f(r),o=t.split(a).map((t=>n.delocalize(t)));return{day:parseInt(o[s.indexOf("d")]),month:parseInt(o[s.indexOf("m")])-1,year:parseInt(o[s.indexOf("y")])}}function f(n){const t=n.toLowerCase();return["d","m","y"].sort(((n,e)=>t.indexOf(n)-t.indexOf(e)))}function u(n,t){return(n.getTime()-t.getTime())/864e5}function D(n){return n.setHours(23,59,59,999),n}export{a,e as b,s as c,r as d,f as e,o as f,u as g,t as i,i as n,c as p,D as s}