/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h } from './index-164d485a.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    arrow: "calcite-floating-ui-arrow",
    arrowStroke: "calcite-floating-ui-arrow__stroke",
};
const DEFAULTS = {
    width: 12,
    height: 6,
    strokeWidth: 1,
};
/**
 * Renders a SVG element to be used as a floating-ui arrow.
 *
 * This functional component should be rendered inside a `FloatingUIComponent` when it needs an arrow element.
 *
 * @param floatingLayout.floatingLayout
 * @param floatingLayout – The effective floating layout to render the arrow vertically or horizontally. Possible values: `vertical` or `horizontal`.
 *
 * See [floating-ui](https://github.com/Esri/calcite-design-system/blob/main/src/utils/floating-ui.ts)
 * @param floatingLayout.key
 * @param floatingLayout.ref
 */
const FloatingArrow = ({ floatingLayout, key, ref, }) => {
    const { width, height, strokeWidth } = DEFAULTS;
    const svgX = width / 2;
    const isVertical = floatingLayout === "vertical";
    const dValue = "M0,0" +
        ` H${width}` +
        ` L${width - svgX},${height}` +
        ` Q${svgX},${height} ${svgX},${height}` +
        " Z";
    return (h("svg", { "aria-hidden": "true", class: CSS.arrow, height: width, key: key, viewBox: `0 0 ${width} ${width + (!isVertical ? strokeWidth : 0)}`, width: width + (isVertical ? strokeWidth : 0),
        // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
        ref: ref }, strokeWidth > 0 && (h("path", { class: CSS.arrowStroke, d: dValue, fill: "none", "stroke-width": strokeWidth + 1 })), h("path", { d: dValue, stroke: "none" })));
};

export { FloatingArrow as F };
