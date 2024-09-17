/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { t as timeZones } from './time-zones.js';

async function groupByName() {
    return timeZones.sort().map((tz) => ({ label: tz }));
}

export { groupByName };
