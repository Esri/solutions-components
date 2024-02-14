/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
const supportedTimeZones = (() => {
    const platformTimeZones = Intl.supportedValuesOf('timeZone');
    // not all browsers include these time zones, so we add them to ensure consistent groups
    const etcTimeZones = [
        "Etc/GMT+1",
        "Etc/GMT+10",
        "Etc/GMT+11",
        "Etc/GMT+12",
        "Etc/GMT+2",
        "Etc/GMT+3",
        "Etc/GMT+4",
        "Etc/GMT+5",
        "Etc/GMT+6",
        "Etc/GMT+7",
        "Etc/GMT+8",
        "Etc/GMT+9",
        "Etc/GMT-1",
        "Etc/GMT-10",
        "Etc/GMT-11",
        "Etc/GMT-12",
        "Etc/GMT-13",
        "Etc/GMT-14",
        "Etc/GMT-2",
        "Etc/GMT-3",
        "Etc/GMT-4",
        "Etc/GMT-5",
        "Etc/GMT-6",
        "Etc/GMT-7",
        "Etc/GMT-8",
        "Etc/GMT-9"
    ];
    return [...new Set([...platformTimeZones, ...etcTimeZones])];
})();

const now = new Date();
const startDate = now.toISOString();
const daysInYear = 365;
const groupDateRange = daysInYear;
const defaultGroupingOptions = {
    startDate,
    groupDateRange,
    debug: false,
};

const continentAllowList = new Set([
    'Europe',
    'Asia',
    'America',
    'America/Argentina',
    'Africa',
    'Australia',
    'Pacific',
    'Atlantic',
    'Antarctica',
    'Arctic',
    'Indian',
]);
const _getDates = (startDate, numberDays, dateEngine) => {
    const dateArray = [];
    let date = dateEngine.create(startDate);
    for (let i = 0; i <= numberDays; i++) {
        date = dateEngine.increase(date);
        dateArray.push(dateEngine.formatToIsoDateString(date));
    }
    return dateArray;
};
const _extractContinent = (label) => {
    if (label.includes('Istanbul')) {
        return 'Europe';
    }
    const lastIndex = label.lastIndexOf('/');
    return lastIndex === -1 ? label : label.slice(0, lastIndex);
};
const _isRegularContinent = (continent) => continentAllowList.has(continent);
const generateTimeZoneMetadata = (timeZoneItems, startDate, numberDays, dateEngine, debug = false) => {
    const processedDates = new Map();
    if (debug) {
        console.log(`Initializing data starting ${startDate} with ${numberDays} days in the future, comparing ${timeZoneItems.length} timezones`);
    }
    const theDates = _getDates(startDate, numberDays, dateEngine);
    return timeZoneItems.map((tzItem) => {
        const label = tzItem.label;
        const continent = _extractContinent(label);
        const dates = theDates.map((date) => {
            const key = `${date}-${label}`;
            let utc = processedDates.get(key);
            if (utc) {
                return utc;
            }
            utc = dateEngine.isoToTimeZone(date, label);
            processedDates.set(key, utc);
            return utc;
        });
        return {
            ...tzItem,
            continent,
            isRegularContinent: _isRegularContinent(continent),
            dates,
        };
    });
};
const compareDateArrs = (array1, array2, dateEngine) => array1.length === array2.length &&
    array1.every((value, index) => dateEngine.same(value, array2[index]));
const getGroupLabelTimeZoneIndices = (rawTZs, max = 5) => {
    const shrinkedTzs = rawTZs.filter(({ label }) => _isRegularContinent(_extractContinent(label)));
    if (shrinkedTzs.length === 0) {
        return [0];
    }
    const validLabels = shrinkedTzs.map((tz) => rawTZs.indexOf(tz));
    return equallyDistributedSampling(validLabels, max);
};
function equallyDistributedSampling(items, maxItems = 5) {
    const totalItems = items.length;
    if (totalItems <= maxItems) {
        return items;
    }
    const numberItemsToSelect = Math.min(totalItems - 2, maxItems - 2);
    const stepSize = (totalItems - 1) / (numberItemsToSelect + 1);
    return [
        items[0],
        ...Array.from({ length: numberItemsToSelect }, (_, i) => items[Math.round((i + 1) * stepSize)]),
        items[totalItems - 1],
    ];
}

async function groupTimeZones(options) {
    const { debug, groupDateRange, hooks, startDate, dateEngine } = {
        ...defaultGroupingOptions,
        ...options,
    };
    const grouping = [];
    if (!dateEngine) {
        throw new Error('dateEngine is required');
    }
    const timeZoneItems = supportedTimeZones.map((tz) => ({ label: tz }));
    hooks?.onBeforeTimeZoneMetadataCreate?.(timeZoneItems);
    const timeZoneMetadata = generateTimeZoneMetadata(timeZoneItems, startDate, groupDateRange, dateEngine, debug);
    hooks?.onTimeZoneMetadataCreate?.(timeZoneMetadata);
    // We traverse the mappedDB and see if we find matches by comparing each set
    // of transformed date for that specific TZ.
    for (const tzMetadatumI of timeZoneMetadata) {
        const { label, continent, dates } = tzMetadatumI;
        // ignore if we visited this element already
        if (tzMetadatumI.visited) {
            continue;
        }
        // Mark element as already visited
        tzMetadatumI.visited = true;
        // The grouped timezone that we want as a result
        const newGroup = {
            labelTzIndices: undefined,
            tzs: [{ label }],
        };
        hooks?.onGroupCreate?.(newGroup, tzMetadatumI);
        for (const tzMetadatumJ of timeZoneMetadata.filter((_) => !_.visited)) {
            const { label: labelJ, continent: continentJ, isRegularContinent: isRegularContinentJ, dates: datesJ, } = tzMetadatumJ;
            // We define a matching TZ by:
            // 1) if both continents match (avoid grouping Antarctica with anything else)
            // 2) if the transformed dates match in both TZs
            if ((continent === continentJ || !isRegularContinentJ) &&
                compareDateArrs(dates, datesJ, dateEngine)) {
                const tzItem = { label: labelJ };
                newGroup.tzs.push(tzItem);
                hooks?.onGroupTimeZoneAdd?.(newGroup, tzItem, tzMetadatumJ);
                // Mark element as already visited
                tzMetadatumJ.visited = true;
            }
        }
        grouping.push(newGroup);
        hooks?.onGroupAdd?.(newGroup);
    }
    // Now that we have a group, we want an easy way to find a fitting label for the group
    // which is defined as the list of the most-common 7 cities, shown in alphabetical order
    const finalGrouping = grouping
        .map((group) => {
        hooks?.onBeforeFinalGroupCreate?.(group);
        group.tzs = group.tzs.sort((a, b) => a.label.localeCompare(b.label));
        const finalGrouping = {
            labelTzIndices: getGroupLabelTimeZoneIndices(group.tzs, 7),
            tzs: group.tzs.map((_) => _.label),
        };
        hooks?.onFinalGroupCreate?.(finalGrouping, group);
        return finalGrouping;
    })
        .sort((a, b) => b.tzs.length - a.tzs.length);
    if (debug) {
        const missingTzs = supportedTimeZones
            .map((tz) => (finalGrouping.some((y) => y.tzs.includes(tz)) ? null : tz))
            .filter(Boolean);
        if (missingTzs.length > 0) {
            throw new Error(`There are ${missingTzs.length} missing timezones: ${missingTzs.toString()}`);
        }
    }
    return hooks?.onFinalGroupingCreate
        ? hooks.onFinalGroupingCreate(finalGrouping)
        : finalGrouping;
}

export { groupTimeZones };
