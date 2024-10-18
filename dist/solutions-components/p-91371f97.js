/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const autoMode = "calcite-mode-auto";
const darkMode = "calcite-mode-dark";
const lightMode = "calcite-mode-light";
const CSS_UTILITY = {
    autoMode,
    darkMode,
    lightMode,
    rtl: "calcite--rtl",
    calciteAnimate: "calcite-animate",
    calciteAnimateIn: "calcite-animate__in",
    calciteAnimateInUp: "calcite-animate__in-up",
    calciteAnimateInDown: "calcite-animate__in-down",
    calciteAnimateInRight: "calcite-animate__in-right",
    calciteAnimateInLeft: "calcite-animate__in-left",
    calciteAnimateInScale: "calcite-animate__in-scale",
};
const DEBOUNCE = {
    filter: 250,
    nextTick: 0,
    resize: 150,
    reposition: 100,
};

export { CSS_UTILITY as C, DEBOUNCE as D, autoMode as a, darkMode as d };
