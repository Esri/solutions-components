/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{n as o}from"./p-83166522.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const t="CALCITE-COMBOBOX-ITEM",n="CALCITE-COMBOBOX-ITEM-GROUP",c=`${t}, ${n}`,e={removeTag:"Remove tag"};
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
function a(o){var t,n;const e=null===(t=o.parentElement)||void 0===t?void 0:t.closest(c);return[e,null===(n=null==e?void 0:e.parentElement)||void 0===n?void 0:n.closest(c)].filter((o=>o))}function i(o){var t;return(null===(t=o.ancestors)||void 0===t?void 0:t.filter((o=>"CALCITE-COMBOBOX-ITEM"===o.nodeName)))||[]}function r(t){return o(t.querySelectorAll("calcite-combobox-item"))}function u(t){return o(t.querySelectorAll("calcite-combobox-item")).filter((o=>o.selected)).length>0}function l(o){return document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",o,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}export{c as C,e as T,l as a,i as b,r as c,t as d,n as e,a as g,u as h}