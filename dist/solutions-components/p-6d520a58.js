/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{g as n}from"./p-ba7d55ea.js";import{h as t}from"./p-7d280d8a.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const i=/firefox/i.test(n()),o=i?new WeakMap:null;function e(){const{disabled:n}=this;n||HTMLElement.prototype.click.call(this)}function r(n){const t=n.target;if(i&&!o.get(t))return;const{disabled:e}=t;e&&n.preventDefault()}const a=["mousedown","mouseup","click"];function c(n){if(i&&!o.get(n.target))return;const{disabled:t}=n.target;t&&(n.stopImmediatePropagation(),n.preventDefault())}const s={capture:!0};function d(n){if(n.disabled)return n.el.setAttribute("aria-disabled","true"),n.el.contains(document.activeElement)&&document.activeElement.blur(),void u(n);l(n),n.el.removeAttribute("aria-disabled")}function u(n){var t;n.el.click=e,(t=i?f(n):n.el)&&(t.addEventListener("pointerdown",r,s),a.forEach((n=>t.addEventListener(n,c,s))))}function f(n){return o.get(n.el)}function l(n){var t;delete n.el.click,(t=i?f(n):n.el)&&(t.removeEventListener("pointerdown",r,s),a.forEach((n=>t.removeEventListener(n,c,s))))}function p(n){n.disabled&&i&&(o.set(n.el,n.el.parentElement||n.el),u(n))}function m(n){i&&(o.delete(n.el),l(n))}function b({disabled:n},i){return t("div",{class:"interaction-container",inert:n},...i)}export{b as I,p as c,m as d,d as u}