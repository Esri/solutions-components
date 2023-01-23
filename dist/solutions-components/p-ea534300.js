/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{f as t}from"./p-c023e6a1.js";import{c as o}from"./p-9a9955db.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const n=new Set;let c;const s={childList:!0};function a(t){c||(c=o("mutation",i)),c.observe(t.el,s)}function f(t){n.delete(t.el),i(c.takeRecords()),c.disconnect();for(const[t]of n.entries())c.observe(t,s)}function i(o){o.forEach((({target:o})=>{t(o)}))}export{a as c,f as d}