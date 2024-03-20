/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
function getUserAgentData() {
    return navigator.userAgentData;
}
function getUserAgentString() {
    const uaData = getUserAgentData();
    return uaData?.brands
        ? uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ")
        : navigator.userAgent;
}

exports.getUserAgentString = getUserAgentString;
