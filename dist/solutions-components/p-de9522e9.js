/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{f as t}from"./p-7d280d8a.js";import{c as o}from"./p-1f65ab1e.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */const n=new Set;let s;const c={childList:!0};function f(t){s||(s=o("mutation",i)),s.observe(t.el,c)}function a(t){n.delete(t.el),i(s.takeRecords()),s.disconnect();for(const[t]of n.entries())s.observe(t,c)}function i(o){o.forEach((({target:o})=>{t(o)}))}export{f as c,a as d}