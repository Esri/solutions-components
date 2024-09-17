/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
function extractContinent(label, strict = false) {
    if (label.includes('Istanbul')) {
        return 'Europe';
    }
    const indexFindFunction = strict ? 'indexOf' : 'lastIndexOf';
    const separatorIndex = label[indexFindFunction]('/');
    return separatorIndex === -1 ? label : label.slice(0, separatorIndex);
}
function isRegularContinent(continent) {
    return continentAllowList.has(continent);
}

export { extractContinent as e, isRegularContinent as i };
