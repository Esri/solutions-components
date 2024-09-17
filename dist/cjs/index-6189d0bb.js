/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const timeZones = require('./time-zones-cd027b1e.js');
const continent = require('./continent-cdee1112.js');

const generateTimeZoneMetadata = (timeZoneItems) => {
    return timeZoneItems.map((tzItem) => {
        const { label } = tzItem;
        const continent$1 = continent.extractContinent(label, true);
        return {
            ...tzItem,
            continent: continent$1,
            isRegularContinent: continent.isRegularContinent(continent$1),
        };
    });
};

async function groupByRegion() {
    const grouping = [];
    const timeZoneItems = timeZones.timeZones.map((tz) => ({ label: tz }));
    const timeZoneMetadata = generateTimeZoneMetadata(timeZoneItems);
    for (const tzMetadatum of timeZoneMetadata) {
        const { label, continent, isRegularContinent } = tzMetadatum;
        if (tzMetadatum.visited) {
            continue;
        }
        tzMetadatum.visited = true;
        if (!isRegularContinent) {
            tzMetadatum.visited = true;
            continue;
        }
        const newGroup = {
            label: continent,
            tzs: [{ label }],
        };
        for (const tzMetadatumJ of timeZoneMetadata.filter((_) => !_.visited)) {
            const { label: labelJ, continent: continentJ, isRegularContinent: isRegularContinentJ, } = tzMetadatumJ;
            if (continent === continentJ) {
                const tzItem = { label: labelJ };
                newGroup.tzs.push(tzItem);
                tzMetadatumJ.visited = true;
            }
        }
        grouping.push(newGroup);
    }
    return grouping
        .map((group) => {
        group.tzs = group.tzs.sort((a, b) => a.label.localeCompare(b.label));
        return {
            label: group.label,
            tzs: group.tzs.map((_) => _.label),
        };
    })
        .sort((a, b) => a.label.localeCompare(b.label));
}

exports.groupByRegion = groupByRegion;
