/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const resources = require('./resources-18f799c7.js');
const config = require('./config-e76d9931.js');
const browser = require('./browser-333a21c5.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * Emits when the mode is dynamically toggled between light and dark on <body> or in OS preferences.
 */
function initModeChangeEvent() {
    const { classList } = document.body;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const getMode = () => classList.contains(resources.darkMode) || (classList.contains(resources.autoMode) && prefersDark) ? "dark" : "light";
    const emitModeChange = (mode) => document.body.dispatchEvent(new CustomEvent("calciteModeChange", { bubbles: true, detail: { mode } }));
    const modeChangeHandler = (newMode) => {
        currentMode !== newMode && emitModeChange(newMode);
        currentMode = newMode;
    };
    let currentMode = getMode();
    // emits event on page load
    emitModeChange(currentMode);
    // emits event when changing OS mode preferences
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => modeChangeHandler(event.matches ? "dark" : "light"));
    // emits event when toggling between mode classes on <body>
    new MutationObserver(() => modeChangeHandler(getMode())).observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
    });
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript}
 */
function appGlobalScript () {
    if (browser.isBrowser()) {
        if (document.readyState === "interactive") {
            initModeChangeEvent();
        }
        else {
            document.addEventListener("DOMContentLoaded", () => initModeChangeEvent(), { once: true });
        }
    }
    config.stampVersion();
}

const globalScripts = appGlobalScript;

exports.globalScripts = globalScripts;
