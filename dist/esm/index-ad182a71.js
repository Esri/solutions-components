/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { t as timeZones } from './time-zones-211c88e3.js';
import { e as extractContinent, i as isRegularContinent } from './continent-125eb777.js';

const now = new Date();
const startDate = now.toISOString();
const daysInYear = 365;
const groupDateRange = daysInYear;
const defaultGroupingOptions = {
    groupDateRange,
    startDate,
};

const _getDates = (startDate, numberDays, dateEngine) => {
    const dateArray = [];
    let date = dateEngine.create(startDate);
    for (let i = 0; i <= numberDays; i++) {
        date = dateEngine.increase(date);
        dateArray.push(dateEngine.formatToIsoDateString(date));
    }
    return dateArray;
};
const generateTimeZoneMetadata = (timeZoneItems, startDate, numberDays, dateEngine) => {
    const processedDates = new Map();
    const theDates = _getDates(startDate, numberDays, dateEngine);
    return timeZoneItems.map((tzItem) => {
        const { label } = tzItem;
        const continent = extractContinent(label);
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
            isRegularContinent: isRegularContinent(continent),
            dates,
        };
    });
};
const compareDateArrs = (array1, array2, dateEngine) => array1.length === array2.length &&
    array1.every((value, index) => dateEngine.same(value, array2[index]));
const getGroupLabelTimeZoneIndices = (rawTZs, max = 5) => {
    const shrinkedTzs = rawTZs.filter(({ label }) => isRegularContinent(extractContinent(label)));
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

async function groupByOffset(options) {
    const { groupDateRange, startDate, dateEngine } = {
        ...defaultGroupingOptions,
        ...options,
    };
    const grouping = [];
    if (!dateEngine) {
        throw new Error('dateEngine is required');
    }
    const timeZoneItems = timeZones.map((tz) => ({ label: tz }));
    const timeZoneMetadata = generateTimeZoneMetadata(timeZoneItems, startDate, groupDateRange, dateEngine);
    // We traverse the mappedDB and see if we find matches by comparing each set
    // of transformed date for that specific TZ.
    for (const tzMetadatumI of timeZoneMetadata) {
        const { label, continent, dates } = tzMetadatumI;
        if (tzMetadatumI.visited) {
            continue;
        }
        tzMetadatumI.visited = true;
        const newGroup = {
            labelIdx: [],
            tzs: [{ label }],
        };
        for (const tzMetadatumJ of timeZoneMetadata.filter((_) => !_.visited)) {
            const { label: labelJ, continent: continentJ, isRegularContinent: isRegularContinentJ, dates: datesJ, } = tzMetadatumJ;
            // We define a matching TZ by:
            // 1) if both continents match (avoid grouping Antarctica with anything else)
            // 2) if the transformed dates match in both TZs
            if ((continent === continentJ || !isRegularContinentJ) &&
                compareDateArrs(dates, datesJ, dateEngine)) {
                const tzItem = { label: labelJ };
                newGroup.tzs.push(tzItem);
                tzMetadatumJ.visited = true;
            }
        }
        grouping.push(newGroup);
    }
    // Now that we have a group, we want an easy way to find a fitting label for the group
    // which is defined as the list of the most-common 7 cities, shown in alphabetical order
    return grouping
        .map((group) => {
        group.tzs = group.tzs.sort((a, b) => a.label.localeCompare(b.label));
        return {
            labelTzIdx: getGroupLabelTimeZoneIndices(group.tzs, 7),
            tzs: group.tzs.map((_) => _.label),
        };
    })
        .sort((a, b) => b.tzs.length - a.tzs.length);
}

export { groupByOffset };
