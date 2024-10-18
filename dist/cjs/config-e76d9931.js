/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

require('./index-4b68e4b4.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const existingConfig = globalThis["calciteConfig"];
const focusTrapStack = existingConfig?.focusTrapStack || [];
const logLevel = existingConfig?.logLevel || ("info");
// the following placeholders are replaced by the build
const version = "__CALCITE_VERSION__";
const buildDate = "__CALCITE_BUILD_DATE__";
const revision = "__CALCITE_REVISION__";
/**
 * Stamp the version onto the global config.
 */
function stampVersion() {
    if (existingConfig && existingConfig.version) {
        return;
    }
    console.info(`Using Calcite Components ${version} [Date: ${buildDate}, Revision: ${revision}]`);
    const target = existingConfig || globalThis["calciteConfig"] || {};
    Object.defineProperty(target, "version", {
        value: version,
        writable: false,
    });
    globalThis["calciteConfig"] = target;
}

exports.focusTrapStack = focusTrapStack;
exports.logLevel = logLevel;
exports.stampVersion = stampVersion;
