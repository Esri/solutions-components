/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const indexP4VH55K1 = require('./index-p4VH55K1-8a6a97cb.js');

const global = 'Global';
/**
 * Check if a timezone is global (no country associated).
 */
function isGlobal(tz) {
    return indexP4VH55K1.getTimezone(tz).countries.length === 0;
}
/**
 * Extract the region from a timezone.
 */
function extractRegion(tz) {
    if (isGlobal(tz)) {
        return global;
    }
    const separatorIndex = tz.indexOf('/');
    return separatorIndex === -1 ? tz : tz.slice(0, separatorIndex);
}
/**
 * Gets the country code for a timezone.
 */
function getCountry(timeZone) {
    return indexP4VH55K1.getCountryForTimezone(timeZone)?.id ?? timeZone;
}

exports.extractRegion = extractRegion;
exports.getCountry = getCountry;
exports.global = global;
