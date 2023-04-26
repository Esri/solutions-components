/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{f as t}from"./p-f8be5d5f.js";import{c as o}from"./p-631b6461.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */const n=new Set;let f;const s={childList:!0};function c(t){f||(f=o("mutation",r)),f.observe(t.el,s)}function i(t){n.delete(t.el),r(f.takeRecords()),f.disconnect();for(const[t]of n.entries())f.observe(t,s)}function r(o){o.forEach((({target:o})=>{t(o)}))}export{c,i as d}