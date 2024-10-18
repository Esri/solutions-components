/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const DEFAULT_FONT_FAMILY = "'Avenir Next','Avenir','Helvetica Neue',sans-serif";
function getFontFamily(fontFamily) {
    return fontFamily ? fontFamily : DEFAULT_FONT_FAMILY;
}

exports.getFontFamily = getFontFamily;
