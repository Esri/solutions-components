/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const index = require('./index-4b68e4b4.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    validationContainer: "validation-container",
};
const Validation = ({ scale, status, id, icon, message, }) => (index.h("div", { class: CSS.validationContainer }, index.h("calcite-input-message", { "aria-live": "polite", icon: icon, id: id, scale: scale, status: status }, message)));

exports.Validation = Validation;
