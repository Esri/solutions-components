/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { l as logLevel } from './p-a02e2069.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * Exported for testing purposes only
 */
const loggedDeprecations = new Set();
const logLevels = {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 4,
    error: 8,
    off: 10,
};
function willLog(level) {
    return logLevels[level] >= logLevels[logLevel];
}
function forwardToConsole(level, ...data) {
    if (!willLog(level)) {
        return;
    }
    const badgeTemplate = "%ccalcite";
    const badgeStyle = "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";
    console[level].call(this, badgeTemplate, badgeStyle, ...data);
}
let listFormatter;
const logger = {
    debug: (message) => forwardToConsole("debug", message),
    info: (message) => forwardToConsole("info", message),
    warn: (message) => forwardToConsole("warn", message),
    error: (message) => forwardToConsole("error", message),
    trace: (message) => forwardToConsole("trace", message),
    deprecated,
};
function deprecated(context, { component, name, suggested, removalVersion }) {
    const key = `${context}:${context === "component" ? "" : component}${name}`;
    if (loggedDeprecations.has(key)) {
        return;
    }
    loggedDeprecations.add(key);
    const multiSuggestions = Array.isArray(suggested);
    if (multiSuggestions && !listFormatter) {
        listFormatter = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
    }
    const message = `[${name}] ${context} is deprecated and will be removed in ${removalVersion === "future" ? `a future version` : `v${removalVersion}`}.${suggested ? ` Use ${multiSuggestions ? listFormatter.format(suggested.map((suggestion) => `"${suggestion}"`)) : `"${suggested}"`} instead.` : ""}`;
    forwardToConsole("warn", message);
}

export { logger as l };
