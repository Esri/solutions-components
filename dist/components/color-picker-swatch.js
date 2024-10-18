/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Fragment } from '@stencil/core/internal/client';
import { c as Color, a as hexify } from './utils.js';
import { v as getModeName } from './dom.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    swatch: "swatch",
    noColorSwatch: "swatch--no-color",
    checker: "checker",
};
const COLORS = {
    borderLight: "rgba(0, 0, 0, 0.3)",
    borderDark: "rgba(255, 255, 255, 0.15)",
};
const checkerSquareSize = 4;
const CHECKER_DIMENSIONS = {
    squareSize: checkerSquareSize,
    size: checkerSquareSize * 2,
};

const colorPickerSwatchCss = ":host{position:relative;display:inline-flex}:host([scale=s]){block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:1.5rem;inline-size:1.5rem}:host([scale=l]){block-size:2rem;inline-size:2rem}.swatch{overflow:hidden;block-size:inherit;inline-size:inherit}.swatch rect{transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.swatch--no-color rect{fill:var(--calcite-color-foreground-1)}.swatch--no-color line{stroke:var(--calcite-color-status-danger)}.checker{fill:#cacaca}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteColorPickerSwatchStyle0 = colorPickerSwatchCss;

const ColorPickerSwatch = /*@__PURE__*/ proxyCustomElement(class ColorPickerSwatch extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.active = false;
        this.color = undefined;
        this.scale = "m";
    }
    handleColorChange(color) {
        this.internalColor = color ? Color(color) : null;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.handleColorChange(this.color);
    }
    render() {
        const isEmpty = !this.internalColor;
        const classes = {
            [CSS.swatch]: true,
            [CSS.noColorSwatch]: isEmpty,
        };
        return (h("svg", { key: 'd808ca40b9f81aad24291cabcfaf95d74d89f7cd', class: classes, xmlns: "http://www.w3.org/2000/svg" }, this.renderSwatch()));
    }
    renderSwatch() {
        const { active, el, internalColor } = this;
        const borderRadius = active ? "100%" : "0";
        const theme = getModeName(el);
        const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
        const isEmpty = !internalColor;
        const commonSwatchProps = {
            height: "100%",
            rx: borderRadius,
            stroke: borderColor,
            strokeWidth: "2",
            width: "100%",
        };
        if (isEmpty) {
            return (h(Fragment, null, h("clipPath", { id: "shape" }, h("rect", { height: "100%", rx: borderRadius, width: "100%" })), this.renderSwatchRect({
                clipPath: `inset(0 round ${borderRadius})`,
                ...commonSwatchProps,
            }), h("line", { "clip-path": "url(#shape)", "stroke-width": "3", x1: "100%", x2: "0", y1: "0", y2: "100%" })));
        }
        const alpha = internalColor.alpha();
        const hex = hexify(internalColor);
        const hexa = hexify(internalColor, alpha < 1);
        return (h(Fragment, null, h("title", null, hexa), h("defs", null, h("pattern", { height: CHECKER_DIMENSIONS.size, id: "checker", patternUnits: "userSpaceOnUse", width: CHECKER_DIMENSIONS.size, x: "0", y: "0" }, h("rect", { class: CSS.checker, height: CHECKER_DIMENSIONS.squareSize, width: CHECKER_DIMENSIONS.squareSize, x: "0", y: "0" }), h("rect", { class: CSS.checker, height: CHECKER_DIMENSIONS.squareSize, width: CHECKER_DIMENSIONS.squareSize, x: CHECKER_DIMENSIONS.squareSize, y: CHECKER_DIMENSIONS.squareSize }))), this.renderSwatchRect({
            fill: "url(#checker)",
            rx: commonSwatchProps.rx,
            height: commonSwatchProps.height,
            width: commonSwatchProps.width,
        }), this.renderSwatchRect({
            clipPath: alpha < 1 ? "polygon(100% 0, 0 0, 0 100%)" : `inset(0 round ${borderRadius})`,
            fill: hex,
            ...commonSwatchProps,
        }), alpha < 1
            ? this.renderSwatchRect({
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                fill: hexa,
                key: "opacity-fill",
                ...commonSwatchProps,
            })
            : null));
    }
    renderSwatchRect({ clipPath, fill, height, key, rx, stroke, strokeWidth, width, }) {
        return (h("rect", { "clip-path": clipPath, fill: fill, height: height, key: key, rx: rx, stroke: stroke, "stroke-width": strokeWidth, width: width }));
    }
    get el() { return this; }
    static get watchers() { return {
        "color": ["handleColorChange"]
    }; }
    static get style() { return CalciteColorPickerSwatchStyle0; }
}, [1, "calcite-color-picker-swatch", {
        "active": [516],
        "color": [1],
        "scale": [513]
    }, undefined, {
        "color": ["handleColorChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-color-picker-swatch"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-color-picker-swatch":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ColorPickerSwatch);
            }
            break;
    } });
}
defineCustomElement();

export { ColorPickerSwatch as C, defineCustomElement as d };
