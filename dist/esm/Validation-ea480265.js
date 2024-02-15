/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h } from './index-164d485a.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    validationContainer: "validation-container",
};
const Validation = ({ scale, status, icon, message, }) => (h("div", { class: CSS.validationContainer }, h("calcite-input-message", { icon: icon, scale: scale, status: status }, message)));

export { Validation as V };
