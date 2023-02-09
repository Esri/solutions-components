/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{f as t}from"./p-c2f00d41.js";import{c as o}from"./p-9a9955db.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const n=new Set;let c;const s={childList:!0};function f(t){c||(c=o("mutation",a)),c.observe(t.el,s)}function i(t){n.delete(t.el),a(c.takeRecords()),c.disconnect();for(const[t]of n.entries())c.observe(t,s)}function a(o){o.forEach((({target:o})=>{t(o)}))}export{f as c,i as d}