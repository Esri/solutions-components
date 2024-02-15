/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
const l="calcite-mode-dark";function o(o){const e=null==o?void 0:o.closest(`.${l}, .calcite-mode-light`);return null==e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":(null==e?void 0:e.classList.contains(l))?"dark":"light"}export{o as g}