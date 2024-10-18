/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
function getIconScale(componentScale) {
    return componentScale === "l" ? "m" : "s";
}
/**
 * This util helps us wait for a component to be ready for both lazy-loading (`dist` output) and non-lazy-loading (`components` output) components.
 *
 * Based on https://github.com/ionic-team/ionic-framework/blob/1a8bd6d/core/src/utils/helpers.ts#L60C1-L79C3
 *
 * @param el - the host element to wait for
 */
async function componentOnReady(el) {
    await (isStencilEl(el)
        ? el.componentOnReady()
        : new Promise((resolve) => requestAnimationFrame(() => resolve())));
}
function isStencilEl(el) {
    return typeof el.componentOnReady === "function";
}

exports.componentOnReady = componentOnReady;
exports.getIconScale = getIconScale;
