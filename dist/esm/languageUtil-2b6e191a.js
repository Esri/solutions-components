/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import './esri-loader-c6842c6b.js';

/*
 *   Copyright (c) 2024 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */
const languageMap = new Map([
    ['ar', 'ar'],
    ['bg', 'bg'],
    ['bs', 'bs'],
    ['ca', 'ca'],
    ['cs', 'cs'],
    ['da', 'da'],
    ['de', 'de'],
    ['el', 'el'],
    ['en', 'en'],
    ['es', 'es'],
    ['et', 'et'],
    ['fi', 'fi'],
    ['fr', 'fr'],
    ['he', 'he'],
    ['hr', 'hr'],
    ['hu', 'hu'],
    ['id', 'id'],
    ['it', 'it'],
    ['ja', 'ja'],
    ['ko', 'ko'],
    ['lt', 'lt'],
    ['lv', 'lv'],
    ['nb', 'nb'],
    ['nl', 'nl'],
    ['pl', 'pl'],
    ['pt-br', 'pt-BR'],
    ['pt-pt', 'pt-PT'],
    ['ro', 'ro'],
    ['ru', 'ru'],
    ['sk', 'sk'],
    ['sl', 'sl'],
    ['sr', 'sr'],
    ['sv', 'sv'],
    ['th', 'th'],
    ['tr', 'tr'],
    ['uk', 'uk'],
    ['vi', 'vi'],
    ['zh-cn', 'zh-CN'],
    ['zh-hk', 'zh-HK'],
    ['zh-tw', 'zh-TW'],
]);
// rtl
function getElementDir(el) {
    return getElementProp(el, 'dir', 'ltr');
}
function getElementProp(el, prop, value) {
    const closestWithProp = el.closest(`[${prop}]`);
    return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}

export { getElementDir as g, languageMap as l };
