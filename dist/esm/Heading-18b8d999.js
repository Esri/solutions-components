/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h } from './index-09deaa39.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
function constrainHeadingLevel(level) {
  return Math.min(Math.max(Math.ceil(level), 1), 6);
}
const Heading = (props, children) => {
  const HeadingTag = `h${props.level}`;
  delete props.level;
  return h(HeadingTag, { ...props }, children);
};

export { Heading as H, constrainHeadingLevel as c };

//# sourceMappingURL=Heading-18b8d999.js.map