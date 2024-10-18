/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { timeZones } from './time-zones-044d518b.js';
import './index-p4VH55K1-881b80d8.js';

async function groupByName() {
    return timeZones.sort().map((tz) => ({ label: tz }));
}

export { groupByName };
