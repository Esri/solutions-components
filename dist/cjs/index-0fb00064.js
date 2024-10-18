/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const timeZones = require('./time-zones-a7e83971.js');
require('./index-p4VH55K1-8a6a97cb.js');

async function groupByName() {
    return timeZones.timeZones.sort().map((tz) => ({ label: tz }));
}

exports.groupByName = groupByName;
