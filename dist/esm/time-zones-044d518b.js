/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { g as getAllTimezones, a as getTimezone } from './index-p4VH55K1-881b80d8.js';

/**
 * Handling these deprecated timezones locally until `countries-and-timezones` is updated with the latest IANA time zone db
 *
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 * @see https://github.com/eggert/tz/commit/782d082623aaa130178d944bdbfbb563d2e1adfa
 * @see https://github.com/eggert/tz/commit/a0b09c0230089252acf2eb0f1ba922e99f7f4a03
 */
const deprecatedTimeZonesToAlias = {
    /* eslint-disable @typescript-eslint/naming-convention */
    CET: 'Europe/Brussels',
    CST6CDT: 'America/Chicago',
    EET: 'Europe/Athens',
    EST: 'America/Panama',
    EST5EDT: 'America/New_York',
    HST: 'Pacific/Honolulu',
    MET: 'Europe/Brussels',
    MST: 'America/Phoenix',
    MST7MDT: 'America/Denver',
    PST8PDT: 'America/Los_Angeles',
    WET: 'Europe/Lisbon',
    /* eslint-enable @typescript-eslint/naming-convention */
};
/**
 * List of all supported, canonical, timezones.
 */
const timeZones = (() => {
    const futureDeprecatedTimeZones = Object.keys(deprecatedTimeZonesToAlias);
    return Object.keys(getAllTimezones()).filter((tz) => !futureDeprecatedTimeZones.includes(tz));
})();
/**
 * Normalize an IANA timezone name to its canonical equivalent.
 */
function normalize(tz) {
    const localDeprecatedTimeZone = deprecatedTimeZonesToAlias[tz];
    if (localDeprecatedTimeZone) {
        return localDeprecatedTimeZone;
    }
    const tzData = getTimezone(tz);
    return tzData?.aliasOf ?? tz;
}

export { normalize, timeZones };
