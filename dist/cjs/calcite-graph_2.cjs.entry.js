/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const guid = require('./guid-e84a8375.js');
const observers = require('./observers-18d87cb5.js');
const dom = require('./dom-795d4a33.js');
const form = require('./form-6dd8050a.js');
const interactive = require('./interactive-a128ac30.js');
const key = require('./key-47c9469a.js');
const label = require('./label-726fc287.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const math = require('./math-089392ef.js');
require('./browser-333a21c5.js');
require('./resources-18f799c7.js');
require('./component-5d190962.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * Calculate slope of the tangents
 * uses Steffen interpolation as it's monotonic
 * http://jrwalsh1.github.io/posts/interpolations/
 *
 * @param p0
 * @param p1
 * @param p2
 */
function slope(p0, p1, p2) {
    const dx = p1[0] - p0[0];
    const dx1 = p2[0] - p1[0];
    const dy = p1[1] - p0[1];
    const dy1 = p2[1] - p1[1];
    const m = dy / (dx || (dx1 < 0 && 0));
    const m1 = dy1 / (dx1 || (dx < 0 && 0));
    const p = (m * dx1 + m1 * dx) / (dx + dx1);
    return (Math.sign(m) + Math.sign(m1)) * Math.min(Math.abs(m), Math.abs(m1), 0.5 * Math.abs(p)) || 0;
}
/**
 * Calculate slope for just one tangent (single-sided)
 *
 * @param p0
 * @param p1
 * @param m
 */
function slopeSingle(p0, p1, m) {
    const dx = p1[0] - p0[0];
    const dy = p1[1] - p0[1];
    return dx ? ((3 * dy) / dx - m) / 2 : m;
}
/**
 * Given two points and their tangent slopes,
 * calculate the bezier handle coordinates and return draw command.
 *
 * Translates Hermite Spline to Bézier curve:
 * https://stackoverflow.com/questions/42574940/
 *
 * @param p0
 * @param p1
 * @param m0
 * @param m1
 * @param t
 */
function bezier(p0, p1, m0, m1, t) {
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    const dx = (x1 - x0) / 3;
    const h1 = t([x0 + dx, y0 + dx * m0]).join(",");
    const h2 = t([x1 - dx, y1 - dx * m1]).join(",");
    const p = t([x1, y1]).join(",");
    return `C ${h1} ${h2} ${p}`;
}
/**
 * Generate a function which will translate a point
 * from the data coordinate space to svg viewbox oriented pixels
 *
 * @param root0
 * @param root0.width
 * @param root0.height
 * @param root0.min
 * @param root0.max
 */
function translate({ width, height, min, max }) {
    const rangeX = max[0] - min[0];
    const rangeY = max[1] - min[1];
    return (point) => {
        const x = ((point[0] - min[0]) / rangeX) * width;
        const y = height - (point[1] / rangeY) * height;
        return [x, y];
    };
}
/**
 * Get the min and max values from the dataset
 *
 * @param data
 */
function range(data) {
    const [startX, startY] = data[0];
    const min = [startX, startY];
    const max = [startX, startY];
    return data.reduce(({ min, max }, [x, y]) => ({
        min: [Math.min(min[0], x), Math.min(min[1], y)],
        max: [Math.max(max[0], x), Math.max(max[1], y)],
    }), { min, max });
}
/**
 * Generate drawing commands for an area graph
 * returns a string can can be passed directly to a path element's `d` attribute
 *
 * @param root0
 * @param root0.data
 * @param root0.min
 * @param root0.max
 * @param root0.t
 */
function area({ data, min, max, t }) {
    if (data.length === 0) {
        return "";
    }
    // important points for beginning and ending the path
    const [startX, startY] = t(data[0]);
    const [minX, minY] = t(min);
    const [maxX] = t(max);
    // keep track of previous slope/points
    let m;
    let p0;
    let p1;
    // iterate over data points, calculating command for each
    const commands = data.reduce((acc, point, i) => {
        p0 = data[i - 2];
        p1 = data[i - 1];
        if (i > 1) {
            const m1 = slope(p0, p1, point);
            const m0 = m === undefined ? slopeSingle(p0, p1, m1) : m;
            const command = bezier(p0, p1, m0, m1, t);
            m = m1;
            return `${acc} ${command}`;
        }
        return acc;
    }, `M ${minX},${minY} L ${minX},${startY} L ${startX},${startY}`);
    // close the path
    const last = data[data.length - 1];
    const end = bezier(p1, last, m, slopeSingle(p1, last, m), t);
    return `${commands} ${end} L ${maxX},${minY} Z`;
}

const graphCss = ":host{display:block;block-size:100%}.svg{fill:currentColor;stroke:transparent;margin:0px;display:block;block-size:100%;inline-size:100%;padding:0px}.svg .graph-path--highlight{fill:var(--calcite-color-brand);opacity:0.5}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteGraphStyle0 = graphCss;

const Graph = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.graphId = `calcite-graph-${guid.guid()}`;
        this.resizeObserver = observers.createObserver("resize", () => index.forceUpdate(this));
        this.data = [];
        this.colorStops = undefined;
        this.highlightMin = undefined;
        this.highlightMax = undefined;
        this.min = undefined;
        this.max = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.resizeObserver?.observe(this.el);
    }
    disconnectedCallback() {
        this.resizeObserver?.disconnect();
    }
    render() {
        const { data, colorStops, el, highlightMax, highlightMin, min, max } = this;
        const id = this.graphId;
        const { clientHeight: height, clientWidth: width } = el;
        // if we have no data, return empty svg
        if (!data || data.length === 0) {
            return (index.h("svg", { "aria-hidden": "true", class: "svg", height: height, preserveAspectRatio: "none", viewBox: `0 0 ${width} ${height}`, width: width }));
        }
        const { min: rangeMin, max: rangeMax } = range(data);
        let currentMin = rangeMin;
        let currentMax = rangeMax;
        if (min < rangeMin[0] || min > rangeMin[0]) {
            currentMin = [min, 0];
        }
        if (max > rangeMax[0] || max < rangeMax[0]) {
            currentMax = [max, rangeMax[1]];
        }
        const t = translate({ min: currentMin, max: currentMax, width, height });
        const [hMinX] = t([highlightMin, currentMax[1]]);
        const [hMaxX] = t([highlightMax, currentMax[1]]);
        const areaPath = area({ data, min: rangeMin, max: rangeMax, t });
        const fill = colorStops ? `url(#linear-gradient-${id})` : undefined;
        return (index.h("svg", { "aria-hidden": "true", class: "svg", height: height, preserveAspectRatio: "none", viewBox: `0 0 ${width} ${height}`, width: width }, colorStops ? (index.h("defs", null, index.h("linearGradient", { id: `linear-gradient-${id}`, x1: "0", x2: "1", y1: "0", y2: "0" }, colorStops.map(({ offset, color, opacity }) => (index.h("stop", { offset: `${offset * 100}%`, "stop-color": color, "stop-opacity": opacity })))))) : null, highlightMin !== undefined ? ([
            index.h("mask", { height: "100%", id: `${id}1`, width: "100%", x: "0%", y: "0%" }, index.h("path", { d: `
            M 0,0
            L ${hMinX - 1},0
            L ${hMinX - 1},${height}
            L 0,${height}
            Z
          `, fill: "white" })),
            index.h("mask", { height: "100%", id: `${id}2`, width: "100%", x: "0%", y: "0%" }, index.h("path", { d: `
            M ${hMinX + 1},0
            L ${hMaxX - 1},0
            L ${hMaxX - 1},${height}
            L ${hMinX + 1}, ${height}
            Z
          `, fill: "white" })),
            index.h("mask", { height: "100%", id: `${id}3`, width: "100%", x: "0%", y: "0%" }, index.h("path", { d: `
                M ${hMaxX + 1},0
                L ${width},0
                L ${width},${height}
                L ${hMaxX + 1}, ${height}
                Z
              `, fill: "white" })),
            index.h("path", { class: "graph-path", d: areaPath, fill: fill, mask: `url(#${id}1)` }),
            index.h("path", { class: "graph-path--highlight", d: areaPath, fill: fill, mask: `url(#${id}2)` }),
            index.h("path", { class: "graph-path", d: areaPath, fill: fill, mask: `url(#${id}3)` }),
        ]) : (index.h("path", { class: "graph-path", d: areaPath, fill: fill }))));
    }
    get el() { return index.getElement(this); }
};
Graph.style = CalciteGraphStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    containerRange: "container--range",
    graph: "graph",
    handle: "handle",
    handleExtension: "handle-extension",
    handleLabel: "handle__label",
    handleLabelMinValue: "handle__label--minValue",
    handleLabelValue: "handle__label--value",
    hyphen: "hyphen",
    hyphenWrap: "hyphen--wrap",
    static: "static",
    thumb: "thumb",
    thumbActive: "thumb--active",
    thumbContainer: "thumb-container",
    thumbMinValue: "thumb--minValue",
    thumbPrecise: "thumb--precise",
    thumbValue: "thumb--value",
    tick: "tick",
    tickActive: "tick--active",
    tickLabel: "tick__label",
    tickMax: "tick__label--max",
    tickMin: "tick__label--min",
    ticks: "ticks",
    track: "track",
    trackRange: "track__range",
    transformed: "transformed",
};
const maxTickElementThreshold = 250;

const sliderCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.scale--s{--calcite-slider-handle-size:0.625rem;--calcite-slider-handle-extension-height:0.4rem;--calcite-slider-container-font-size:var(--calcite-font-size--3)}.scale--s .handle__label,.scale--s .tick__label{line-height:.75rem}.scale--m{--calcite-slider-handle-size:0.875rem;--calcite-slider-handle-extension-height:0.5rem;--calcite-slider-container-font-size:var(--calcite-font-size--2)}.scale--m .handle__label,.scale--m .tick__label{line-height:1rem}.scale--l{--calcite-slider-handle-size:1rem;--calcite-slider-handle-extension-height:0.65rem;--calcite-slider-container-font-size:var(--calcite-font-size--1)}.scale--l .handle__label,.scale--l .tick__label{line-height:1rem}.handle__label,.tick__label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);font-size:var(--calcite-slider-container-font-size)}:host{display:block}.container{position:relative;display:block;overflow-wrap:normal;word-break:normal;padding-inline:calc(var(--calcite-slider-handle-size) * 0.5);padding-block:calc(var(--calcite-slider-handle-size) * 0.5);margin-block:calc(var(--calcite-slider-handle-size) * 0.5);margin-inline:0;--calcite-slider-full-handle-height:calc(\n    var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height)\n  );touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([disabled]) .track__range,:host([disabled]) .tick--active{background-color:var(--calcite-color-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-0.375rem}.scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-0.5rem}.scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-0.55rem}:host([precise]:not([has-histogram])) .container .thumb--value{--calcite-slider-thumb-y-offset:calc(var(--calcite-slider-full-handle-height) * -1)}.thumb-container{position:relative;max-inline-size:100%}.thumb{--calcite-slider-thumb-x-offset:calc(var(--calcite-slider-handle-size) * 0.5);position:absolute;margin:0px;display:flex;cursor:pointer;flex-direction:column;align-items:center;border-style:none;background-color:transparent;padding:0px;font-family:inherit;outline:2px solid transparent;outline-offset:2px;transform:translate(var(--calcite-slider-thumb-x-offset), var(--calcite-slider-thumb-y-offset))}.thumb .handle__label.static,.thumb .handle__label.transformed{position:absolute;inset-block:0px;opacity:0}.thumb .handle__label.hyphen::after{content:\"—\";display:inline-block;inline-size:1em}.thumb .handle__label.hyphen--wrap{display:flex}.thumb .handle{box-sizing:border-box;border-radius:9999px;background-color:var(--calcite-color-foreground-1);outline-color:transparent;block-size:var(--calcite-slider-handle-size);inline-size:var(--calcite-slider-handle-size);box-shadow:0 0 0 2px var(--calcite-color-text-3) inset;transition:border var(--calcite-internal-animation-timing-medium) ease, background-color var(--calcite-internal-animation-timing-medium) ease, box-shadow var(--calcite-animation-timing) ease}.thumb .handle-extension{inline-size:0.125rem;block-size:var(--calcite-slider-handle-extension-height);background-color:var(--calcite-color-text-3)}.thumb:hover .handle{box-shadow:0 0 0 3px var(--calcite-color-brand) inset}.thumb:hover .handle-extension{background-color:var(--calcite-color-brand)}.thumb:focus .handle{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.thumb:focus .handle-extension{background-color:var(--calcite-color-brand)}.thumb.thumb--minValue{transform:translate(calc(var(--calcite-slider-thumb-x-offset) * -1), var(--calcite-slider-thumb-y-offset))}.thumb.thumb--precise{--calcite-slider-thumb-y-offset:-0.125rem}:host([label-handles]) .thumb{--calcite-slider-thumb-x-offset:50%}:host([label-handles]):host(:not([has-histogram])) .scale--s .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-1.4375rem}:host([label-handles]):host(:not([has-histogram])) .scale--m .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-1.875rem}:host([label-handles]):host(:not([has-histogram])) .scale--l .thumb:not(.thumb--precise){--calcite-slider-thumb-y-offset:-2rem}:host([has-histogram][label-handles]) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--minValue.thumb--precise .handle__label{margin-block-start:0.5em}:host(:not([has-histogram]):not([precise])) .handle__label,:host([label-handles]:not([has-histogram])) .thumb--value .handle__label{margin-block-end:0.5em}:host([label-handles][precise]):host(:not([has-histogram])) .scale--s .thumb--value{--calcite-slider-thumb-y-offset:-2.075rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--m .thumb--value{--calcite-slider-thumb-y-offset:-2.75rem}:host([label-handles][precise]):host(:not([has-histogram])) .scale--l .thumb--value{--calcite-slider-thumb-y-offset:-3.0625rem}.thumb:focus .handle,.thumb--active .handle{background-color:var(--calcite-color-brand);box-shadow:0 0 8px 0 rgba(0, 0, 0, 0.16)}.thumb:hover.thumb--precise::after,.thumb:focus.thumb--precise::after,.thumb--active.thumb--precise::after{background-color:var(--calcite-color-brand)}.track{position:relative;block-size:0.125rem;border-radius:0px;background-color:var(--calcite-color-border-2);transition:all var(--calcite-internal-animation-timing-medium) ease-in}.track__range{position:absolute;inset-block-start:0px;block-size:0.125rem;background-color:var(--calcite-color-brand)}.container--range .track__range:hover{cursor:ew-resize}.container--range .track__range::after{position:absolute;inline-size:100%;content:\"\";inset-block-start:calc(var(--calcite-slider-full-handle-height) * 0.5 * -1);block-size:calc(var(--calcite-slider-handle-size) + var(--calcite-slider-handle-extension-height))}@media (forced-colors: active){.thumb{outline-width:0;outline-offset:0}.handle{outline:2px solid transparent;outline-offset:2px}.thumb:focus .handle,.thumb .handle-extension,.thumb:hover .handle-extension,.thumb:focus .handle-extension,.thumb:active .handle-extension{background-color:canvasText}.track{background-color:canvasText}.track__range{background-color:highlight}}.tick{position:absolute;block-size:0.25rem;inline-size:0.125rem;border-width:1px;border-style:solid;background-color:var(--calcite-color-border-input);border-color:var(--calcite-color-foreground-1);inset-block-start:-2px;pointer-events:none;margin-inline-start:calc(-1 * 0.125rem)}.tick--active{background-color:var(--calcite-color-brand)}.tick__label{pointer-events:none;margin-block-start:0.875rem;display:flex;justify-content:center}.tick__label--min{transition:opacity var(--calcite-animation-timing)}.tick__label--max{transition:opacity var(--calcite-internal-animation-timing-fast)}:host([has-histogram][label-handles]) .tick__label--min,:host([has-histogram][label-handles]) .tick__label--max,:host([has-histogram][precise]) .tick__label--min,:host([has-histogram][precise]) .tick__label--max{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}.graph{color:var(--calcite-color-foreground-3);block-size:48px}:host([label-ticks][ticks]) .container{padding-block-end:calc(0.875rem + var(--calcite-slider-container-font-size))}:host([has-histogram]):host([precise][label-handles]) .container{padding-block-end:calc(var(--calcite-slider-full-handle-height) + 1em)}:host([has-histogram]):host([label-handles]:not([precise])) .container{padding-block-end:calc(var(--calcite-slider-handle-size) * 0.5 + 1em)}:host([has-histogram]):host([precise]:not([label-handles])) .container{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container{padding-block-start:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([precise]:not([label-handles])) .container--range{padding-block-end:var(--calcite-slider-full-handle-height)}:host(:not([has-histogram])):host([label-handles]:not([precise])) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container{padding-block-start:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}:host(:not([has-histogram])):host([label-handles][precise]) .container--range{padding-block-end:calc(var(--calcite-slider-full-handle-height) + var(--calcite-slider-container-font-size) + 4px)}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSliderStyle0 = sliderCss;

function isRange(value) {
    return Array.isArray(value);
}
const Slider = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteSliderInput = index.createEvent(this, "calciteSliderInput", 6);
        this.calciteSliderChange = index.createEvent(this, "calciteSliderChange", 6);
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.handleKeyDown = (event) => {
            const mirror = this.shouldMirror();
            const { activeProp, max, min, pageStep, step } = this;
            const value = this[activeProp];
            const { key: key$1 } = event;
            if (key.isActivationKey(key$1)) {
                event.preventDefault();
                return;
            }
            let adjustment;
            if (key$1 === "ArrowUp" || key$1 === "ArrowRight") {
                const directionFactor = mirror && key$1 === "ArrowRight" ? -1 : 1;
                adjustment = value + step * directionFactor;
            }
            else if (key$1 === "ArrowDown" || key$1 === "ArrowLeft") {
                const directionFactor = mirror && key$1 === "ArrowLeft" ? -1 : 1;
                adjustment = value - step * directionFactor;
            }
            else if (key$1 === "PageUp") {
                if (pageStep) {
                    adjustment = value + pageStep;
                }
            }
            else if (key$1 === "PageDown") {
                if (pageStep) {
                    adjustment = value - pageStep;
                }
            }
            else if (key$1 === "Home") {
                adjustment = min;
            }
            else if (key$1 === "End") {
                adjustment = max;
            }
            if (isNaN(adjustment)) {
                return;
            }
            event.preventDefault();
            const fixedDecimalAdjustment = Number(adjustment.toFixed(math.decimalPlaces(step)));
            this.setValue({
                [activeProp]: this.clamp(fixedDecimalAdjustment, activeProp),
            });
        };
        this.activeProp = "value";
        this.guid = `calcite-slider-${guid.guid()}`;
        this.onThumbBlur = () => {
            this.activeProp = null;
        };
        this.onThumbFocus = (event) => {
            const thumb = event.currentTarget;
            this.activeProp = thumb.getAttribute("data-value-prop");
        };
        this.onThumbPointerDown = (event) => {
            const thumb = event.currentTarget;
            this.pointerDownDragStart(event, thumb.getAttribute("data-value-prop"));
        };
        this.onTrackPointerDown = (event) => {
            this.pointerDownDragStart(event, "minMaxValue");
        };
        this.dragUpdate = (event) => {
            if (this.disabled) {
                return;
            }
            event.preventDefault();
            if (this.dragProp) {
                const value = this.mapToRange(event.clientX || event.pageX);
                if (isRange(this.value) && this.dragProp === "minMaxValue") {
                    if (this.minValueDragRange && this.maxValueDragRange && this.minMaxValueRange) {
                        const newMinValue = value - this.minValueDragRange;
                        const newMaxValue = value + this.maxValueDragRange;
                        if (newMaxValue <= this.max &&
                            newMinValue >= this.min &&
                            newMaxValue - newMinValue === this.minMaxValueRange) {
                            this.setValue({
                                minValue: this.clamp(newMinValue, "minValue"),
                                maxValue: this.clamp(newMaxValue, "maxValue"),
                            });
                        }
                    }
                    else {
                        this.minValueDragRange = value - this.minValue;
                        this.maxValueDragRange = this.maxValue - value;
                        this.minMaxValueRange = this.maxValue - this.minValue;
                    }
                }
                else {
                    this.setValue({ [this.dragProp]: this.clamp(value, this.dragProp) });
                }
            }
        };
        this.pointerUpDragEnd = (event) => {
            if (this.disabled || !dom.isPrimaryPointerButton(event)) {
                return;
            }
            this.dragEnd(event);
        };
        this.dragEnd = (event) => {
            if (this.disabled) {
                return;
            }
            this.removeDragListeners();
            this.focusActiveHandle(event.clientX);
            if (this.lastDragPropValue != this[this.dragProp]) {
                this.emitChange();
            }
            this.dragProp = null;
            this.lastDragPropValue = null;
            this.minValueDragRange = null;
            this.maxValueDragRange = null;
            this.minMaxValueRange = null;
        };
        this.storeTrackRef = (node) => {
            this.trackEl = node;
        };
        this.storeThumbRef = (el) => {
            if (!el) {
                return;
            }
            const valueProp = el.getAttribute("data-value-prop");
            valueProp === "minValue" ? (this.minHandle = el) : (this.maxHandle = el);
        };
        /**
         * Returns a string representing the localized label value based if the groupSeparator prop is parsed.
         *
         * @param value
         */
        this.formatValue = (value) => {
            locale.numberStringFormatter.numberFormatOptions = {
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                useGrouping: this.groupSeparator,
            };
            return locale.numberStringFormatter.localize(value.toString());
        };
        this.disabled = false;
        this.fillPlacement = "start";
        this.form = undefined;
        this.groupSeparator = false;
        this.hasHistogram = false;
        this.histogram = undefined;
        this.histogramStops = undefined;
        this.labelHandles = false;
        this.labelFormatter = undefined;
        this.labelTicks = false;
        this.max = 100;
        this.maxLabel = undefined;
        this.maxValue = undefined;
        this.min = 0;
        this.minLabel = undefined;
        this.minValue = undefined;
        this.mirrored = false;
        this.name = undefined;
        this.numberingSystem = undefined;
        this.pageStep = undefined;
        this.precise = false;
        this.required = false;
        this.snap = false;
        this.step = 1;
        this.ticks = undefined;
        this.value = 0;
        this.scale = "m";
        this.effectiveLocale = "";
        this.minMaxValueRange = null;
        this.minValueDragRange = null;
        this.maxValueDragRange = null;
        this.tickValues = [];
    }
    histogramWatcher(newHistogram) {
        this.hasHistogram = !!newHistogram;
    }
    ticksWatcher() {
        this.tickValues = this.generateTickValues();
    }
    valueHandler() {
        this.setMinMaxFromValue();
    }
    minMaxValueHandler() {
        this.setValueFromMinMax();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        locale.connectLocalized(this);
        this.setMinMaxFromValue();
        this.setValueFromMinMax();
        label.connectLabel(this);
        form.connectForm(this);
    }
    disconnectedCallback() {
        label.disconnectLabel(this);
        form.disconnectForm(this);
        locale.disconnectLocalized(this);
        this.removeDragListeners();
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        if (!isRange(this.value)) {
            this.value = this.snap ? this.getClosestStep(this.value) : this.clamp(this.value);
        }
        this.ticksWatcher();
        this.histogramWatcher(this.histogram);
        form.afterConnectDefaultValueSet(this, this.value);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        if (this.labelHandles) {
            this.adjustHostObscuredHandleLabel("value");
            if (isRange(this.value)) {
                this.adjustHostObscuredHandleLabel("minValue");
                if (!(this.precise && !this.hasHistogram)) {
                    this.hyphenateCollidingRangeHandleLabels();
                }
            }
        }
        this.hideObscuredBoundingTickLabels();
        interactive.updateHostInteraction(this);
    }
    render() {
        const id = this.el.id || this.guid;
        const value = isRange(this.value) ? this.maxValue : this.value;
        const min = this.minValue || this.min;
        const useMinValue = this.shouldUseMinValue();
        const minInterval = this.getUnitInterval(useMinValue ? this.minValue : min) * 100;
        const maxInterval = this.getUnitInterval(value) * 100;
        const mirror = this.shouldMirror();
        const valueIsRange = isRange(this.value);
        const thumbTypes = this.buildThumbType("max");
        const thumb = this.renderThumb({
            type: thumbTypes,
            thumbPlacement: thumbTypes.includes("histogram") ? "below" : "above",
            maxInterval,
            minInterval,
            mirror,
        });
        const minThumbTypes = this.buildThumbType("min");
        const minThumb = valueIsRange &&
            this.renderThumb({
                type: minThumbTypes,
                thumbPlacement: minThumbTypes.includes("histogram") || minThumbTypes.includes("precise")
                    ? "below"
                    : "above",
                maxInterval,
                minInterval,
                mirror,
            });
        const fillPlacement = valueIsRange ? "start" : this.fillPlacement;
        const trackRangePlacementStyles = fillPlacement === "none"
            ? {
                left: `unset`,
                right: `unset`,
            }
            : fillPlacement === "end"
                ? {
                    left: `${mirror ? minInterval : maxInterval}%`,
                    right: `${mirror ? maxInterval : minInterval}%`,
                }
                : /* default */
                    {
                        left: `${mirror ? 100 - maxInterval : minInterval}%`,
                        right: `${mirror ? minInterval : 100 - maxInterval}%`,
                    };
        return (index.h(index.Host, { key: 'dee9376120224b51dfa12f3e87fbdce4a481a1ed', id: id, onKeyDown: this.handleKeyDown, onTouchStart: this.handleTouchStart }, index.h(interactive.InteractiveContainer, { key: '65bca4d477d57ced846ef97b466917b6d7fc2f21', disabled: this.disabled }, index.h("div", { key: '99dd57b50ded2302ca1d255708d9e4bd90de3ecb', "aria-label": label.getLabelText(this), class: {
                [CSS.container]: true,
                [CSS.containerRange]: valueIsRange,
                [`scale--${this.scale}`]: true,
            } }, this.renderGraph(), index.h("div", { key: '47647c0d347232a0ddb384333b15860a0264aefa', class: CSS.track, ref: this.storeTrackRef }, index.h("div", { key: '3dc176871f6245f2dde77a016ddc747ad9571d3d', class: CSS.trackRange, onPointerDown: this.onTrackPointerDown, style: trackRangePlacementStyles }), index.h("div", { key: '0c08b977678d6ac7e8b9944157e51948969a5dc5', class: CSS.ticks }, this.tickValues.map((tick) => {
            const tickOffset = `${this.getUnitInterval(tick) * 100}%`;
            let activeTicks = false;
            if (fillPlacement === "start" || fillPlacement === "end") {
                if (useMinValue) {
                    activeTicks = tick >= this.minValue && tick <= this.maxValue;
                }
                else {
                    const rangeStart = fillPlacement === "start" ? min : value;
                    const rangeEnd = fillPlacement === "start" ? value : this.max;
                    activeTicks = tick >= rangeStart && tick <= rangeEnd;
                }
            }
            return (index.h("span", { class: {
                    [CSS.tick]: true,
                    [CSS.tickActive]: activeTicks,
                }, style: {
                    left: mirror ? "" : tickOffset,
                    right: mirror ? tickOffset : "",
                } }, this.renderTickLabel(tick)));
        }))), index.h("div", { key: '51996cb05142dbeec20093ca12b017adee23f293', class: CSS.thumbContainer }, minThumb, thumb, index.h(form.HiddenFormInputSlot, { key: '6fd5c00374205d47e226a417674264417323a5c3', component: this }))))));
    }
    renderThumb({ type, mirror, thumbPlacement, minInterval, maxInterval, }) {
        const isLabeled = type.includes("labeled");
        const isPrecise = type.includes("precise");
        const isMinThumb = type.includes("min");
        const valueIsRange = isRange(this.value);
        const value = isMinThumb
            ? this.minValue
            : valueIsRange
                ? this.maxValue
                : this.value;
        const valueProp = isMinThumb ? "minValue" : valueIsRange ? "maxValue" : "value";
        const ariaLabel = isMinThumb ? this.minLabel : valueIsRange ? this.maxLabel : this.minLabel;
        const ariaValuenow = isMinThumb ? this.minValue : value;
        const displayedValue = valueProp === "minValue"
            ? this.internalLabelFormatter(this.minValue, "min")
            : valueProp === "maxValue"
                ? this.internalLabelFormatter(this.maxValue, "max")
                : this.internalLabelFormatter(value, "value");
        const thumbStyle = isMinThumb
            ? { left: `${mirror ? 100 - minInterval : minInterval}%` }
            : { right: `${mirror ? maxInterval : 100 - maxInterval}%` };
        const thumbLabelClasses = `${CSS.handleLabel} ${isMinThumb ? CSS.handleLabelMinValue : CSS.handleLabelValue}`;
        const labels = isLabeled
            ? [
                index.h("span", { "aria-hidden": "true", class: thumbLabelClasses }, displayedValue),
                index.h("span", { "aria-hidden": "true", class: `${thumbLabelClasses} ${CSS.static}` }, displayedValue),
                index.h("span", { "aria-hidden": "true", class: `${thumbLabelClasses} ${CSS.transformed}` }, displayedValue),
            ]
            : [];
        const thumbContent = [
            ...labels,
            index.h("div", { class: CSS.handle }),
            isPrecise && index.h("div", { class: CSS.handleExtension }),
        ];
        if (thumbPlacement === "below") {
            thumbContent.reverse();
        }
        return (index.h("div", { "aria-label": ariaLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": ariaValuenow, class: {
                [CSS.thumb]: true,
                [CSS.thumbValue]: !isMinThumb,
                [CSS.thumbActive]: this.lastDragProp !== "minMaxValue" && this.dragProp === valueProp,
                [CSS.thumbPrecise]: isPrecise,
                [CSS.thumbMinValue]: isMinThumb,
            }, "data-value-prop": valueProp, key: type, onBlur: this.onThumbBlur, onFocus: this.onThumbFocus, onPointerDown: this.onThumbPointerDown, ref: this.storeThumbRef, role: "slider", style: thumbStyle, tabIndex: 0 }, thumbContent));
    }
    renderGraph() {
        return this.histogram ? (index.h("calcite-graph", { class: CSS.graph, colorStops: this.histogramStops, data: this.histogram, highlightMax: isRange(this.value) ? this.maxValue : this.value, highlightMin: isRange(this.value) ? this.minValue : this.min, max: this.max, min: this.min })) : null;
    }
    renderTickLabel(tick) {
        const { hasHistogram, labelHandles, labelTicks, max, min, precise, value } = this;
        const valueIsRange = isRange(value);
        const isMinTickLabel = tick === min;
        const isMaxTickLabel = tick === max;
        const isAtEdge = isMinTickLabel || isMaxTickLabel;
        const shouldDisplayLabel = labelTicks &&
            ((!hasHistogram && (isAtEdge || !precise || !valueIsRange)) ||
                (hasHistogram && (isAtEdge || (!precise && !labelHandles))));
        return shouldDisplayLabel ? (index.h("span", { class: {
                [CSS.tickLabel]: true,
                [CSS.tickMin]: isMinTickLabel,
                [CSS.tickMax]: isMaxTickLabel,
            } }, this.internalLabelFormatter(tick, "tick"))) : null;
    }
    pointerDownHandler(event) {
        if (this.disabled || !dom.isPrimaryPointerButton(event)) {
            return;
        }
        const x = event.clientX || event.pageX;
        const position = this.mapToRange(x);
        let prop = "value";
        if (isRange(this.value)) {
            const inRange = position >= this.minValue && position <= this.maxValue;
            if (inRange && this.lastDragProp === "minMaxValue") {
                prop = "minMaxValue";
            }
            else {
                const closerToMax = Math.abs(this.maxValue - position) < Math.abs(this.minValue - position);
                prop = closerToMax || position >= this.maxValue ? "maxValue" : "minValue";
            }
        }
        this.lastDragPropValue = this[prop];
        this.dragStart(prop);
        const isThumbActive = this.el.shadowRoot.querySelector(`.${CSS.thumb}:active`);
        if (!isThumbActive) {
            this.setValue({ [prop]: this.clamp(position, prop) });
        }
        this.focusActiveHandle(x);
    }
    handleTouchStart(event) {
        // needed to prevent extra click at the end of a handle drag
        event.preventDefault();
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        const handle = this.minHandle ? this.minHandle : this.maxHandle;
        handle?.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    buildThumbType(type) {
        const thumbTypeParts = [type];
        if (this.labelHandles) {
            thumbTypeParts.push("labeled");
        }
        if (this.precise) {
            thumbTypeParts.push("precise");
        }
        if (this.hasHistogram) {
            thumbTypeParts.push("histogram");
        }
        return thumbTypeParts.join("-");
    }
    setValueFromMinMax() {
        const { minValue, maxValue } = this;
        if (typeof minValue === "number" && typeof maxValue === "number") {
            this.value = [minValue, maxValue];
        }
    }
    setMinMaxFromValue() {
        const { value } = this;
        if (isRange(value)) {
            this.minValue = value[0];
            this.maxValue = value[1];
        }
    }
    onLabelClick() {
        this.setFocus();
    }
    shouldMirror() {
        return this.mirrored && !this.hasHistogram;
    }
    shouldUseMinValue() {
        if (!isRange(this.value)) {
            return false;
        }
        return ((this.hasHistogram && this.maxValue === 0) || (!this.hasHistogram && this.minValue === 0));
    }
    getTickDensity() {
        const density = (this.max - this.min) / this.ticks / maxTickElementThreshold;
        return density < 1 ? 1 : density;
    }
    generateTickValues() {
        const tickInterval = this.ticks ?? 0;
        if (tickInterval <= 0) {
            return [];
        }
        const ticks = [this.min];
        const density = this.getTickDensity();
        const tickOffset = tickInterval * density;
        let current = this.min;
        while (current < this.max) {
            current += tickOffset;
            ticks.push(Math.min(current, this.max));
        }
        if (!ticks.includes(this.max)) {
            ticks.push(this.max);
        }
        return ticks;
    }
    pointerDownDragStart(event, prop) {
        if (!dom.isPrimaryPointerButton(event)) {
            return;
        }
        this.dragStart(prop);
    }
    dragStart(prop) {
        this.dragProp = prop;
        this.lastDragProp = this.dragProp;
        this.activeProp = prop;
        window.addEventListener("pointermove", this.dragUpdate);
        window.addEventListener("pointerup", this.pointerUpDragEnd);
        window.addEventListener("pointercancel", this.dragEnd);
    }
    focusActiveHandle(valueX) {
        if (this.dragProp === "minValue") {
            this.minHandle.focus();
        }
        else if (this.dragProp === "maxValue" || this.dragProp === "value") {
            this.maxHandle.focus();
        }
        else if (this.dragProp === "minMaxValue") {
            this.getClosestHandle(valueX).focus();
        }
    }
    emitInput() {
        this.calciteSliderInput.emit();
    }
    emitChange() {
        this.calciteSliderChange.emit();
    }
    removeDragListeners() {
        window.removeEventListener("pointermove", this.dragUpdate);
        window.removeEventListener("pointerup", this.pointerUpDragEnd);
        window.removeEventListener("pointercancel", this.dragEnd);
    }
    /**
     * Set prop value(s) if changed at the component level
     *
     * @param {object} values - a set of key/value pairs delineating what properties in the component to update
     */
    setValue(values) {
        let valueChanged;
        Object.keys(values).forEach((propName) => {
            const newValue = values[propName];
            if (!valueChanged) {
                const oldValue = this[propName];
                valueChanged = oldValue !== newValue;
            }
            this[propName] = newValue;
        });
        if (!valueChanged) {
            return;
        }
        const dragging = this.dragProp;
        if (!dragging) {
            this.emitChange();
        }
        this.emitInput();
    }
    /**
     * If number is outside range, constrain to min or max
     *
     * @param value
     * @param prop
     * @internal
     */
    clamp(value, prop) {
        value = math.clamp(value, this.min, this.max);
        // ensure that maxValue and minValue don't swap positions
        if (prop === "maxValue") {
            value = Math.max(value, this.minValue);
        }
        if (prop === "minValue") {
            value = Math.min(value, this.maxValue);
        }
        return value;
    }
    /**
     * Translate a pixel position to value along the range
     *
     * @param x
     * @internal
     */
    mapToRange(x) {
        const range = this.max - this.min;
        const { left, width } = this.trackEl.getBoundingClientRect();
        const percent = (x - left) / width;
        const mirror = this.shouldMirror();
        const clampedValue = this.clamp(this.min + range * (mirror ? 1 - percent : percent));
        const value = Number(clampedValue.toFixed(math.decimalPlaces(this.step)));
        return !(this.snap && this.step) ? value : this.getClosestStep(value);
    }
    /**
     * Get closest allowed value along stepped values
     *
     * @param value
     * @internal
     */
    getClosestStep(value) {
        const { max, min, step } = this;
        // prevents floating point precision issues
        const bigDecimalString = new locale.BigDecimal(`${Math.floor((value - min) / step)}`)
            .multiply(`${step}`)
            .add(`${min}`)
            .toString();
        let snappedValue = this.clamp(Number(bigDecimalString));
        if (snappedValue > max) {
            snappedValue -= step;
        }
        return snappedValue;
    }
    getClosestHandle(valueX) {
        return this.getDistanceX(this.maxHandle, valueX) > this.getDistanceX(this.minHandle, valueX)
            ? this.minHandle
            : this.maxHandle;
    }
    getDistanceX(el, valueX) {
        return Math.abs(el.getBoundingClientRect().left - valueX);
    }
    getFontSizeForElement(element) {
        return Number(window.getComputedStyle(element).getPropertyValue("font-size").match(/\d+/)[0]);
    }
    /**
     * Get position of value along range as fractional value
     *
     * @param num
     * @return {number} number in the unit interval [0,1]
     * @internal
     */
    getUnitInterval(num) {
        num = this.clamp(num);
        const range = this.max - this.min;
        return (num - this.min) / range;
    }
    adjustHostObscuredHandleLabel(name) {
        const label = this.el.shadowRoot.querySelector(`.handle__label--${name}`);
        const labelStatic = this.el.shadowRoot.querySelector(`.handle__label--${name}.static`);
        const labelTransformed = this.el.shadowRoot.querySelector(`.handle__label--${name}.transformed`);
        const labelStaticBounds = labelStatic.getBoundingClientRect();
        const labelStaticOffset = this.getHostOffset(labelStaticBounds.left, labelStaticBounds.right);
        label.style.transform = `translateX(${labelStaticOffset}px)`;
        labelTransformed.style.transform = `translateX(${labelStaticOffset}px)`;
    }
    hyphenateCollidingRangeHandleLabels() {
        const { shadowRoot } = this.el;
        const mirror = this.shouldMirror();
        const leftModifier = mirror ? "value" : "minValue";
        const rightModifier = mirror ? "minValue" : "value";
        const leftValueLabel = shadowRoot.querySelector(`.handle__label--${leftModifier}`);
        const leftValueLabelStatic = shadowRoot.querySelector(`.handle__label--${leftModifier}.static`);
        const leftValueLabelTransformed = shadowRoot.querySelector(`.handle__label--${leftModifier}.transformed`);
        const leftValueLabelStaticHostOffset = this.getHostOffset(leftValueLabelStatic.getBoundingClientRect().left, leftValueLabelStatic.getBoundingClientRect().right);
        const rightValueLabel = shadowRoot.querySelector(`.handle__label--${rightModifier}`);
        const rightValueLabelStatic = shadowRoot.querySelector(`.handle__label--${rightModifier}.static`);
        const rightValueLabelTransformed = shadowRoot.querySelector(`.handle__label--${rightModifier}.transformed`);
        const rightValueLabelStaticHostOffset = this.getHostOffset(rightValueLabelStatic.getBoundingClientRect().left, rightValueLabelStatic.getBoundingClientRect().right);
        const labelFontSize = this.getFontSizeForElement(leftValueLabel);
        const labelTransformedOverlap = this.getRangeLabelOverlap(leftValueLabelTransformed, rightValueLabelTransformed);
        const hyphenLabel = leftValueLabel;
        const labelOffset = labelFontSize / 2;
        if (labelTransformedOverlap > 0) {
            hyphenLabel.classList.add(CSS.hyphen, CSS.hyphenWrap);
            if (rightValueLabelStaticHostOffset === 0 && leftValueLabelStaticHostOffset === 0) {
                // Neither handle overlaps the host boundary
                let leftValueLabelTranslate = labelTransformedOverlap / 2 - labelOffset;
                leftValueLabelTranslate =
                    Math.sign(leftValueLabelTranslate) === -1
                        ? Math.abs(leftValueLabelTranslate)
                        : -leftValueLabelTranslate;
                const leftValueLabelTransformedHostOffset = this.getHostOffset(leftValueLabelTransformed.getBoundingClientRect().left +
                    leftValueLabelTranslate -
                    labelOffset, leftValueLabelTransformed.getBoundingClientRect().right +
                    leftValueLabelTranslate -
                    labelOffset);
                let rightValueLabelTranslate = labelTransformedOverlap / 2;
                const rightValueLabelTransformedHostOffset = this.getHostOffset(rightValueLabelTransformed.getBoundingClientRect().left + rightValueLabelTranslate, rightValueLabelTransformed.getBoundingClientRect().right + rightValueLabelTranslate);
                if (leftValueLabelTransformedHostOffset !== 0) {
                    leftValueLabelTranslate += leftValueLabelTransformedHostOffset;
                    rightValueLabelTranslate += leftValueLabelTransformedHostOffset;
                }
                if (rightValueLabelTransformedHostOffset !== 0) {
                    leftValueLabelTranslate += rightValueLabelTransformedHostOffset;
                    rightValueLabelTranslate += rightValueLabelTransformedHostOffset;
                }
                leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
                leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelTranslate - labelOffset}px)`;
                rightValueLabel.style.transform = `translateX(${rightValueLabelTranslate}px)`;
                rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelTranslate}px)`;
            }
            else if (leftValueLabelStaticHostOffset > 0 || rightValueLabelStaticHostOffset > 0) {
                // labels overlap host boundary on the left side
                leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset + labelOffset}px)`;
                rightValueLabel.style.transform = `translateX(${labelTransformedOverlap + rightValueLabelStaticHostOffset}px)`;
                rightValueLabelTransformed.style.transform = `translateX(${labelTransformedOverlap + rightValueLabelStaticHostOffset}px)`;
            }
            else if (leftValueLabelStaticHostOffset < 0 || rightValueLabelStaticHostOffset < 0) {
                // labels overlap host boundary on the right side
                let leftValueLabelTranslate = Math.abs(leftValueLabelStaticHostOffset) + labelTransformedOverlap - labelOffset;
                leftValueLabelTranslate =
                    Math.sign(leftValueLabelTranslate) === -1
                        ? Math.abs(leftValueLabelTranslate)
                        : -leftValueLabelTranslate;
                leftValueLabel.style.transform = `translateX(${leftValueLabelTranslate}px)`;
                leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelTranslate - labelOffset}px)`;
            }
        }
        else {
            hyphenLabel.classList.remove(CSS.hyphen, CSS.hyphenWrap);
            leftValueLabel.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
            leftValueLabelTransformed.style.transform = `translateX(${leftValueLabelStaticHostOffset}px)`;
            rightValueLabel.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
            rightValueLabelTransformed.style.transform = `translateX(${rightValueLabelStaticHostOffset}px)`;
        }
    }
    /**
     * Hides bounding tick labels that are obscured by either handle.
     */
    hideObscuredBoundingTickLabels() {
        const valueIsRange = isRange(this.value);
        if (!this.hasHistogram && !valueIsRange && !this.labelHandles && !this.precise) {
            return;
        }
        if (!this.hasHistogram && !valueIsRange && this.labelHandles && !this.precise) {
            return;
        }
        if (!this.hasHistogram && !valueIsRange && !this.labelHandles && this.precise) {
            return;
        }
        if (!this.hasHistogram && !valueIsRange && this.labelHandles && this.precise) {
            return;
        }
        if (!this.hasHistogram && valueIsRange && !this.precise) {
            return;
        }
        if (this.hasHistogram && !this.precise && !this.labelHandles) {
            return;
        }
        const minHandle = this.el.shadowRoot.querySelector(`.${CSS.thumbMinValue}`);
        const maxHandle = this.el.shadowRoot.querySelector(`.${CSS.thumbValue}`);
        const minTickLabel = this.el.shadowRoot.querySelector(`.${CSS.tickMin}`);
        const maxTickLabel = this.el.shadowRoot.querySelector(`.${CSS.tickMax}`);
        if (!minHandle && maxHandle && minTickLabel && maxTickLabel) {
            minTickLabel.style.opacity = this.isMinTickLabelObscured(minTickLabel, maxHandle) ? "0" : "1";
            maxTickLabel.style.opacity = this.isMaxTickLabelObscured(maxTickLabel, maxHandle) ? "0" : "1";
        }
        if (minHandle && maxHandle && minTickLabel && maxTickLabel) {
            minTickLabel.style.opacity =
                this.isMinTickLabelObscured(minTickLabel, minHandle) ||
                    this.isMinTickLabelObscured(minTickLabel, maxHandle)
                    ? "0"
                    : "1";
            maxTickLabel.style.opacity =
                this.isMaxTickLabelObscured(maxTickLabel, minHandle) ||
                    (this.isMaxTickLabelObscured(maxTickLabel, maxHandle) && this.hasHistogram)
                    ? "0"
                    : "1";
        }
    }
    /**
     * Returns an integer representing the number of pixels to offset on the left or right side based on desired position behavior.
     *
     * @param leftBounds
     * @param rightBounds
     * @internal
     */
    getHostOffset(leftBounds, rightBounds) {
        const hostBounds = this.el.getBoundingClientRect();
        const buffer = 7;
        if (leftBounds + buffer < hostBounds.left) {
            return hostBounds.left - leftBounds - buffer;
        }
        if (rightBounds - buffer > hostBounds.right) {
            return -(rightBounds - hostBounds.right) + buffer;
        }
        return 0;
    }
    /**
     * Returns an integer representing the number of pixels that the two given span elements are overlapping, taking into account
     * a space in between the two spans equal to the font-size set on them to account for the space needed to render a hyphen.
     *
     * @param leftLabel
     * @param rightLabel
     */
    getRangeLabelOverlap(leftLabel, rightLabel) {
        const leftLabelBounds = leftLabel.getBoundingClientRect();
        const rightLabelBounds = rightLabel.getBoundingClientRect();
        const leftLabelFontSize = this.getFontSizeForElement(leftLabel);
        const rangeLabelOverlap = leftLabelBounds.right + leftLabelFontSize - rightLabelBounds.left;
        return Math.max(rangeLabelOverlap, 0);
    }
    /**
     * Returns a boolean value representing if the minLabel span element is obscured (being overlapped) by the given handle div element.
     *
     * @param minLabel
     * @param handle
     */
    isMinTickLabelObscured(minLabel, handle) {
        const minLabelBounds = minLabel.getBoundingClientRect();
        const handleBounds = handle.getBoundingClientRect();
        return dom.intersects(minLabelBounds, handleBounds);
    }
    /**
     * Returns a boolean value representing if the maxLabel span element is obscured (being overlapped) by the given handle div element.
     *
     * @param maxLabel
     * @param handle
     */
    isMaxTickLabelObscured(maxLabel, handle) {
        const maxLabelBounds = maxLabel.getBoundingClientRect();
        const handleBounds = handle.getBoundingClientRect();
        return dom.intersects(maxLabelBounds, handleBounds);
    }
    internalLabelFormatter(value, type) {
        const customFormatter = this.labelFormatter;
        if (!customFormatter) {
            return this.formatValue(value);
        }
        const formattedValue = customFormatter(value, type, this.formatValue);
        if (formattedValue == null) {
            return this.formatValue(value);
        }
        return formattedValue;
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "histogram": ["histogramWatcher"],
        "ticks": ["ticksWatcher"],
        "value": ["valueHandler"],
        "minValue": ["minMaxValueHandler"],
        "maxValue": ["minMaxValueHandler"]
    }; }
};
Slider.style = CalciteSliderStyle0;

exports.calcite_graph = Graph;
exports.calcite_slider = Slider;
