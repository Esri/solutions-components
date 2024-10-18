/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { timeZones } from './p-7b862835.js';
import { extractRegion } from './p-c9f94a25.js';
import './p-065e678f.js';

const generateTimeZoneMetadata = (timeZoneItems) => {
    return timeZoneItems.map((tzItem) => {
        const { label } = tzItem;
        const continent = extractRegion(label);
        return {
            ...tzItem,
            continent,
        };
    });
};

async function groupByRegion() {
    const grouping = [];
    const timeZoneItems = timeZones.map((tz) => ({ label: tz }));
    const timeZoneMetadata = generateTimeZoneMetadata(timeZoneItems);
    for (const tzMetadatum of timeZoneMetadata) {
        const { label, continent } = tzMetadatum;
        if (tzMetadatum.visited) {
            continue;
        }
        tzMetadatum.visited = true;
        const newGroup = {
            label: continent,
            tzs: [{ label }],
        };
        for (const tzMetadatumJ of timeZoneMetadata.filter((_) => !_.visited)) {
            const { label: labelJ, continent: continentJ } = tzMetadatumJ;
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

export { groupByRegion };
