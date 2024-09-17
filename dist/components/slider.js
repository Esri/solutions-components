/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as guid } from './guid.js';
import { i as isPrimaryPointerButton, b as intersects } from './dom.js';
import { c as connectForm, d as disconnectForm, a as afterConnectDefaultValueSet, H as HiddenFormInputSlot } from './form.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { i as isActivationKey } from './key.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized, B as BigDecimal } from './locale2.js';
import { d as decimalPlaces, c as clamp } from './math.js';
import { d as defineCustomElement$1 } from './graph.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
const Slider = /*@__PURE__*/ proxyCustomElement(class Slider extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteSliderInput = createEvent(this, "calciteSliderInput", 6);
        this.calciteSliderChange = createEvent(this, "calciteSliderChange", 6);
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.handleKeyDown = (event) => {
            const mirror = this.shouldMirror();
            const { activeProp, max, min, pageStep, step } = this;
            const value = this[activeProp];
            const { key } = event;
            if (isActivationKey(key)) {
                event.preventDefault();
                return;
            }
            let adjustment;
            if (key === "ArrowUp" || key === "ArrowRight") {
                const directionFactor = mirror && key === "ArrowRight" ? -1 : 1;
                adjustment = value + step * directionFactor;
            }
            else if (key === "ArrowDown" || key === "ArrowLeft") {
                const directionFactor = mirror && key === "ArrowLeft" ? -1 : 1;
                adjustment = value - step * directionFactor;
            }
            else if (key === "PageUp") {
                if (pageStep) {
                    adjustment = value + pageStep;
                }
            }
            else if (key === "PageDown") {
                if (pageStep) {
                    adjustment = value - pageStep;
                }
            }
            else if (key === "Home") {
                adjustment = min;
            }
            else if (key === "End") {
                adjustment = max;
            }
            if (isNaN(adjustment)) {
                return;
            }
            event.preventDefault();
            const fixedDecimalAdjustment = Number(adjustment.toFixed(decimalPlaces(step)));
            this.setValue({
                [activeProp]: this.clamp(fixedDecimalAdjustment, activeProp),
            });
        };
        this.activeProp = "value";
        this.guid = `calcite-slider-${guid()}`;
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
                const value = this.translate(event.clientX || event.pageX);
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
            if (this.disabled || !isPrimaryPointerButton(event)) {
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
            numberStringFormatter.numberFormatOptions = {
                locale: this.effectiveLocale,
                numberingSystem: this.numberingSystem,
                useGrouping: this.groupSeparator,
            };
            return numberStringFormatter.localize(value.toString());
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
        connectInteractive(this);
        connectLocalized(this);
        this.setMinMaxFromValue();
        this.setValueFromMinMax();
        connectLabel(this);
        connectForm(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLabel(this);
        disconnectForm(this);
        disconnectLocalized(this);
        this.removeDragListeners();
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
        if (!isRange(this.value)) {
            this.value = this.snap ? this.getClosestStep(this.value) : this.clamp(this.value);
        }
        this.ticksWatcher();
        this.histogramWatcher(this.histogram);
        afterConnectDefaultValueSet(this, this.value);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
        updateHostInteraction(this);
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
        return (h(Host, { key: 'c0ebc9073b3609d1d47379b5efccbe31c68915ed', id: id, onKeyDown: this.handleKeyDown, onTouchStart: this.handleTouchStart }, h(InteractiveContainer, { key: '1f6930631e4c83e5b47ae1d5c64c10dbe58ed8e7', disabled: this.disabled }, h("div", { key: '09a30ae372ca5e52fde36a0a85adc76d14ca1461', "aria-label": getLabelText(this), class: {
                [CSS.container]: true,
                [CSS.containerRange]: valueIsRange,
                [`scale--${this.scale}`]: true,
            } }, this.renderGraph(), h("div", { key: 'e996119bc9bba42340d24b2dc8b2ad7daaf02e6e', class: CSS.track, ref: this.storeTrackRef }, h("div", { key: 'fb768d8462137621d7a891d0767e2e27864307fc', class: CSS.trackRange, onPointerDown: this.onTrackPointerDown, style: trackRangePlacementStyles }), h("div", { key: '408a0a05ef7503b1af724cfd95e3fb40f94bcbf8', class: CSS.ticks }, this.tickValues.map((tick) => {
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
            return (h("span", { class: {
                    [CSS.tick]: true,
                    [CSS.tickActive]: activeTicks,
                }, style: {
                    left: mirror ? "" : tickOffset,
                    right: mirror ? tickOffset : "",
                } }, this.renderTickLabel(tick)));
        }))), h("div", { key: 'c511ee11206dadb2b23199708abf2d2703423559', class: CSS.thumbContainer }, minThumb, thumb, h(HiddenFormInputSlot, { key: 'f6684d5f25ade745730db775a5e51298b5eb8048', component: this }))))));
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
                h("span", { "aria-hidden": "true", class: thumbLabelClasses }, displayedValue),
                h("span", { "aria-hidden": "true", class: `${thumbLabelClasses} ${CSS.static}` }, displayedValue),
                h("span", { "aria-hidden": "true", class: `${thumbLabelClasses} ${CSS.transformed}` }, displayedValue),
            ]
            : [];
        const thumbContent = [
            ...labels,
            h("div", { class: CSS.handle }),
            isPrecise && h("div", { class: CSS.handleExtension }),
        ];
        if (thumbPlacement === "below") {
            thumbContent.reverse();
        }
        return (h("div", { "aria-disabled": this.disabled, "aria-label": ariaLabel, "aria-orientation": "horizontal", "aria-valuemax": this.max, "aria-valuemin": this.min, "aria-valuenow": ariaValuenow, class: {
                [CSS.thumb]: true,
                [CSS.thumbValue]: !isMinThumb,
                [CSS.thumbActive]: this.lastDragProp !== "minMaxValue" && this.dragProp === valueProp,
                [CSS.thumbPrecise]: isPrecise,
                [CSS.thumbMinValue]: isMinThumb,
            }, "data-value-prop": valueProp, key: type, onBlur: this.onThumbBlur, onFocus: this.onThumbFocus, onPointerDown: this.onThumbPointerDown, ref: this.storeThumbRef, role: "slider", style: thumbStyle, tabIndex: 0 }, thumbContent));
    }
    renderGraph() {
        return this.histogram ? (h("calcite-graph", { class: CSS.graph, colorStops: this.histogramStops, data: this.histogram, highlightMax: isRange(this.value) ? this.maxValue : this.value, highlightMin: isRange(this.value) ? this.minValue : this.min, max: this.max, min: this.min })) : null;
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
        return shouldDisplayLabel ? (h("span", { class: {
                [CSS.tickLabel]: true,
                [CSS.tickMin]: isMinTickLabel,
                [CSS.tickMax]: isMaxTickLabel,
            } }, this.internalLabelFormatter(tick, "tick"))) : null;
    }
    pointerDownHandler(event) {
        if (this.disabled || !isPrimaryPointerButton(event)) {
            return;
        }
        const x = event.clientX || event.pageX;
        const position = this.translate(x);
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
        await componentFocusable(this);
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
        if (!isPrimaryPointerButton(event)) {
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
        value = clamp(value, this.min, this.max);
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
    translate(x) {
        const range = this.max - this.min;
        const { left, width } = this.trackEl.getBoundingClientRect();
        const percent = (x - left) / width;
        const mirror = this.shouldMirror();
        const clampedValue = this.clamp(this.min + range * (mirror ? 1 - percent : percent));
        const value = Number(clampedValue.toFixed(decimalPlaces(this.step)));
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
        const bigDecimalString = new BigDecimal(`${Math.floor((value - min) / step)}`)
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
        return intersects(minLabelBounds, handleBounds);
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
        return intersects(maxLabelBounds, handleBounds);
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
    get el() { return this; }
    static get watchers() { return {
        "histogram": ["histogramWatcher"],
        "ticks": ["ticksWatcher"],
        "value": ["valueHandler"],
        "minValue": ["minMaxValueHandler"],
        "maxValue": ["minMaxValueHandler"]
    }; }
    static get style() { return CalciteSliderStyle0; }
}, [17, "calcite-slider", {
        "disabled": [516],
        "fillPlacement": [513, "fill-placement"],
        "form": [513],
        "groupSeparator": [516, "group-separator"],
        "hasHistogram": [1540, "has-histogram"],
        "histogram": [16],
        "histogramStops": [16],
        "labelHandles": [516, "label-handles"],
        "labelFormatter": [16],
        "labelTicks": [516, "label-ticks"],
        "max": [514],
        "maxLabel": [1, "max-label"],
        "maxValue": [1026, "max-value"],
        "min": [514],
        "minLabel": [1, "min-label"],
        "minValue": [1026, "min-value"],
        "mirrored": [516],
        "name": [513],
        "numberingSystem": [1, "numbering-system"],
        "pageStep": [514, "page-step"],
        "precise": [516],
        "required": [516],
        "snap": [516],
        "step": [514],
        "ticks": [514],
        "value": [1538],
        "scale": [513],
        "effectiveLocale": [32],
        "minMaxValueRange": [32],
        "minValueDragRange": [32],
        "maxValueDragRange": [32],
        "tickValues": [32],
        "setFocus": [64]
    }, [[1, "pointerdown", "pointerDownHandler"]], {
        "histogram": ["histogramWatcher"],
        "ticks": ["ticksWatcher"],
        "value": ["valueHandler"],
        "minValue": ["minMaxValueHandler"],
        "maxValue": ["minMaxValueHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-slider", "calcite-graph"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Slider);
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Slider as S, defineCustomElement as d };
