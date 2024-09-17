/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import './index-b793d9aa.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const isBrowser = () => typeof navigator !== "undefined" &&
    typeof window !== "undefined" &&
    typeof location !== "undefined" &&
    typeof document !== "undefined" &&
    window.location === location &&
    window.document === document;
function getUserAgentData() {
    return navigator.userAgentData;
}
function getUserAgentString() {
    if (!isBrowser()) {
        return "";
    }
    const uaData = getUserAgentData();
    return uaData?.brands
        ? uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ")
        : navigator.userAgent;
}

export { getUserAgentString as g, isBrowser as i };
