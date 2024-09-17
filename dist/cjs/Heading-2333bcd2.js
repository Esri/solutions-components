/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const index = require('./index-5a0af791.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
function constrainHeadingLevel(level) {
    return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const Heading = (props, children) => {
    const HeadingTag = props.level ? `h${props.level}` : "div";
    delete props.level;
    return index.h(HeadingTag, { ...props }, children);
};

exports.Heading = Heading;
exports.constrainHeadingLevel = constrainHeadingLevel;
