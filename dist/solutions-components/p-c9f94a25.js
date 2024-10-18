/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { a as getTimezone, b as getCountryForTimezone } from './p-065e678f.js';

const global = 'Global';
/**
 * Check if a timezone is global (no country associated).
 */
function isGlobal(tz) {
    return getTimezone(tz).countries.length === 0;
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
    return getCountryForTimezone(timeZone)?.id ?? timeZone;
}

export { extractRegion, getCountry, global };
