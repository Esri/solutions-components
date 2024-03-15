/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{n as i}from"./p-3dd92f0d.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */const n="CALCITE-COMBOBOX-ITEM",t="CALCITE-COMBOBOX-ITEM-GROUP",e=`${n}, ${t}`,o={chipInvisible:"chip--invisible",selectionDisplayFit:"selection-display-fit",selectionDisplaySingle:"selection-display-single",listContainer:"list-container"};
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
function c(i){const n=i.parentElement?.closest(e),t=n?.parentElement?.closest(e);return[n,t].filter((i=>i))}function s(i){return i.ancestors?.filter((i=>"CALCITE-COMBOBOX-ITEM"===i.nodeName))||[]}function a(n){return i(n.querySelectorAll("calcite-combobox-item"))}function l(n){return i(n.querySelectorAll("calcite-combobox-item")).filter((i=>i.selected)).length>0}function r(i){return document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",i,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}function u(i){return i.includes("single")}export{o as C,r as a,e as b,s as c,a as d,n as e,t as f,c as g,l as h,u as i}