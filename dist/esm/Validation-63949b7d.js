/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h } from './index-b793d9aa.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    validationContainer: "validation-container",
};
const Validation = ({ scale, status, id, icon, message, }) => (h("div", { class: CSS.validationContainer }, h("calcite-input-message", { "aria-live": "polite", icon: icon, id: id, scale: scale, status: status }, message)));

export { Validation as V };
