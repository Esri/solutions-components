/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{n as t}from"./p-dd3d070d.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */const n="CALCITE-COMBOBOX-ITEM",o="CALCITE-COMBOBOX-ITEM-GROUP",c=`${n}, ${o}`
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */;function e(t){const n=t.parentElement?.closest(c),o=n?.parentElement?.closest(c);return[n,o].filter((t=>t))}function a(t){return t.ancestors?.filter((t=>"CALCITE-COMBOBOX-ITEM"===t.nodeName))||[]}function r(n){return t(n.querySelectorAll("calcite-combobox-item"))}function s(n){return t(n.querySelectorAll("calcite-combobox-item")).filter((t=>t.selected)).length>0}function u(t){return document.evaluate("ancestor::calcite-combobox-item",t,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}export{c as C,u as a,a as b,r as c,n as d,o as e,e as g,s as h}