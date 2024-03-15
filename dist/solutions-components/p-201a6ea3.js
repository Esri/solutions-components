/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{h as t}from"./p-7d280d8a.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */const e={width:12,height:6,strokeWidth:1},i=({floatingLayout:i,key:o,ref:r})=>{const{width:a,height:h,strokeWidth:s}=e,d=a/2,n="vertical"===i,l=`M0,0 H${a} L${a-d},${h} Q${d},${h} ${d},${h} Z`;return t("svg",{"aria-hidden":"true",class:"calcite-floating-ui-arrow",height:a,key:o,viewBox:`0 0 ${a} ${a+(n?0:s)}`,width:a+(n?s:0),ref:r},s>0&&t("path",{class:"calcite-floating-ui-arrow__stroke",d:l,fill:"none","stroke-width":s+1}),t("path",{d:l,stroke:"none"}))};export{i as F}