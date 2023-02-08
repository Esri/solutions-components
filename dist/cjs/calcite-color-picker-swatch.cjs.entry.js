/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const index$1 = require('./index-951f09d7.js');
const dom = require('./dom-4a580af6.js');
require('./_commonjsHelpers-384729db.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  swatch: "swatch",
  noColorIcon: "no-color-icon"
};
const COLORS = {
  borderLight: "rgba(0, 0, 0, 0.3)",
  borderDark: "rgba(255, 255, 255, 0.15)"
};

const colorPickerSwatchCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:inline-flex}:host([scale=s]){block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:1.5rem;inline-size:1.5rem}:host([scale=l]){block-size:2rem;inline-size:2rem}.swatch{overflow:visible;block-size:inherit;inline-size:inherit}.swatch rect{transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.no-color-icon{position:absolute;inset:0px;block-size:100%;inline-size:100%}";

const ColorPickerSwatch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, the component is active.
     */
    this.active = false;
    /**
     * Specifies the size of the component.
     */
    this.scale = "m";
  }
  handleColorChange(color) {
    this.internalColor = index$1.color(color);
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
    const { active, el, internalColor } = this;
    const borderRadius = active ? "100%" : "0";
    const hex = internalColor.hex();
    const theme = dom.getThemeName(el);
    const borderColor = theme === "light" ? COLORS.borderLight : COLORS.borderDark;
    return (index.h("svg", { class: CSS.swatch, xmlns: "http://www.w3.org/2000/svg" }, index.h("title", null, hex), index.h("rect", { fill: hex, height: "100%", id: "swatch", rx: borderRadius, stroke: borderColor, "stroke-width": "2", style: { "clip-path": `inset(0 round ${borderRadius})` }, width: "100%" })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "color": ["handleColorChange"]
  }; }
};
ColorPickerSwatch.style = colorPickerSwatchCss;

exports.calcite_color_picker_swatch = ColorPickerSwatch;

//# sourceMappingURL=calcite-color-picker-swatch.cjs.entry.js.map