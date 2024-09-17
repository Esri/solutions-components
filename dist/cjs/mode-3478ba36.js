/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const lightMode = 'calcite-mode-light';
const darkMode = 'calcite-mode-dark';
function getMode(el) {
    const closestEl = el === null || el === void 0 ? void 0 : el.closest(`.${darkMode}, .${lightMode}`);
    if (closestEl == null) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    return (closestEl === null || closestEl === void 0 ? void 0 : closestEl.classList.contains(darkMode)) ? 'dark' : 'light';
}

exports.getMode = getMode;
