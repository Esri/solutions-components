/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h } from '@stencil/core/internal/client';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
function constrainHeadingLevel(level) {
    return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const Heading = (props, children) => {
    const HeadingTag = props.level ? `h${props.level}` : "div";
    delete props.level;
    return (h(HeadingTag, { class: props.class, key: props.key }, children));
};

export { Heading as H, constrainHeadingLevel as c };
