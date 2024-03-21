/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{d as t}from"./p-7d280d8a.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */function n(t){return"opened"in t?t.opened:t.open}function i(t,i=!1){(i?t[t.transitionProp]:n(t))?t.onBeforeOpen():t.onBeforeClose(),(i?t[t.transitionProp]:n(t))?t.onOpen():t.onClose()}function o(o,r=!1){t((()=>{if(o.transitionEl){const{transitionDuration:t,transitionProperty:a}=getComputedStyle(o.transitionEl),s=t.split(","),e=s[a.split(",").indexOf(o.openTransitionProp)]??s[0];if("0s"===e)return void i(o,r);const c=setTimeout((()=>{o.transitionEl.removeEventListener("transitionstart",u),o.transitionEl.removeEventListener("transitionend",d),o.transitionEl.removeEventListener("transitioncancel",d),i(o,r)}),1e3*parseFloat(e));function u(t){t.propertyName===o.openTransitionProp&&t.target===o.transitionEl&&(clearTimeout(c),o.transitionEl.removeEventListener("transitionstart",u),(r?o[o.transitionProp]:n(o))?o.onBeforeOpen():o.onBeforeClose())}function d(t){t.propertyName===o.openTransitionProp&&t.target===o.transitionEl&&((r?o[o.transitionProp]:n(o))?o.onOpen():o.onClose(),o.transitionEl.removeEventListener("transitionend",d),o.transitionEl.removeEventListener("transitioncancel",d))}o.transitionEl.addEventListener("transitionstart",u),o.transitionEl.addEventListener("transitionend",d),o.transitionEl.addEventListener("transitioncancel",d)}}))}export{o}