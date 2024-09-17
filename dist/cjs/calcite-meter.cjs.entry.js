/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const loadable = require('./loadable-2e2626dc.js');
const form = require('./form-5229f1c8.js');
const locale = require('./locale-42c21404.js');
const dom = require('./dom-6a9b6275.js');
const observers = require('./observers-8fed90f3.js');
require('./browser-69696af0.js');
require('./key-d6da79d8.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    fill: "fill",
    stepLine: "step-line",
    label: "label",
    labelHidden: "label-hidden",
    labelRange: "label-range",
    labelValue: "label-value",
    unitLabel: "unit-label",
    stepsVisible: "steps-visible",
    valueVisible: "value-visible",
    success: "fill-success",
    warning: "fill-warning",
    danger: "fill-danger",
};

const meterCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host{display:flex;--calcite-meter-space-internal:0.125rem;--calcite-meter-height-internal:1rem;--calcite-meter-font-size-internal:var(--calcite-font-size--1)}:host([scale=s]){--calcite-meter-height-internal:0.75rem;--calcite-meter-font-size-internal:var(--calcite-font-size--2)}:host([scale=l]){--calcite-meter-height-internal:1.5rem;--calcite-meter-font-size-internal:var(--calcite-font-size-0)}.container{position:relative;margin:0px;display:flex;inline-size:100%;align-items:center;block-size:var(--calcite-meter-height-internal);background-color:var(--calcite-color-foreground-2);border:1px solid var(--calcite-color-border-3);border-radius:var(--calcite-meter-height-internal)}.solid{border:1px solid var(--calcite-color-foreground-3);background-color:var(--calcite-color-foreground-3)}.outline{background-color:transparent}.value-visible{margin-block-start:1.5rem}.steps-visible{margin-block-end:1.5rem}.step-line{position:absolute;inset-block:0px;display:block;inline-size:var(--calcite-meter-space-internal);background-color:var(--calcite-color-border-3)}.label{position:absolute;font-size:var(--calcite-meter-font-size-internal)}.label-hidden{visibility:hidden;opacity:0}.label-value{inset-block-end:calc(100% + 0.5em);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.label-range{color:var(--calcite-color-text-3);inset-block-start:calc(100% + 0.5em)}.unit-label{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-3)}.label-value .unit-label{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2)}.fill{position:absolute;z-index:var(--calcite-z-index);display:block;background-color:var(--calcite-color-brand);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);inset-inline-start:var(--calcite-meter-space-internal);inset-block:var(--calcite-meter-space-internal);border-radius:var(--calcite-meter-height-internal);max-inline-size:calc(100% - var(--calcite-meter-space-internal) * 2);min-inline-size:calc(var(--calcite-meter-height-internal) - var(--calcite-meter-space-internal) * 2);transition-property:inline-size, background-color, box-shadow}.fill-danger{background-color:var(--calcite-color-status-danger)}.fill-success{background-color:var(--calcite-color-status-success)}.fill-warning{background-color:var(--calcite-color-status-warning)}.solid .fill{inset-block:0;inset-inline-start:0;max-inline-size:100%;min-inline-size:calc(var(--calcite-meter-height-internal));box-shadow:0 0 0 1px var(--calcite-color-brand)}.solid .fill-danger{box-shadow:0 0 0 1px var(--calcite-color-status-danger)}.solid .fill-success{box-shadow:0 0 0 1px var(--calcite-color-status-success)}.solid .fill-warning{box-shadow:0 0 0 1px var(--calcite-color-status-warning)}";
const CalciteMeterStyle0 = meterCss;

const Meter = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.labelFlipMax = 0.8;
        this.labelFlipProximity = 0.15;
        this.maxPercent = 100;
        this.minPercent = 0;
        this.resizeObserver = observers.createObserver("resize", () => this.resizeHandler());
        this.formatLabel = (value, labelType) => {
            if (labelType === "percent") {
                if (!this.percentFormatting) {
                    const locale$1 = locale.getSupportedLocale(this.effectiveLocale);
                    const formatter = new Intl.NumberFormat(locale$1, {
                        useGrouping: this.groupSeparator,
                        style: "percent",
                    });
                    this.percentFormatting = { formatter, locale: locale$1 };
                }
                return this.percentFormatting.formatter.format(value);
            }
            else {
                locale.numberStringFormatter.numberFormatOptions = {
                    locale: this.effectiveLocale,
                    numberingSystem: this.numberingSystem,
                    useGrouping: this.groupSeparator,
                };
                return locale.numberStringFormatter.localize(value.toString());
            }
        };
        this.appearance = "outline-fill";
        this.disabled = false;
        this.fillType = "range";
        this.form = undefined;
        this.groupSeparator = false;
        this.high = undefined;
        this.label = undefined;
        this.low = undefined;
        this.max = 100;
        this.min = 0;
        this.name = undefined;
        this.numberingSystem = undefined;
        this.rangeLabels = false;
        this.rangeLabelType = "percent";
        this.scale = "m";
        this.unitLabel = "";
        this.value = undefined;
        this.valueLabel = false;
        this.valueLabelType = "percent";
        this.currentPercent = undefined;
        this.effectiveLocale = undefined;
        this.highActive = undefined;
        this.highPercent = undefined;
        this.lowActive = undefined;
        this.lowPercent = undefined;
    }
    handleRangeChange() {
        this.calculateValues();
        this.updateLabels();
    }
    handleLabelChange() {
        this.updateLabels();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        this.calculateValues();
        form.afterConnectDefaultValueSet(this, this.value);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        this.updateLabels();
    }
    connectedCallback() {
        locale.connectLocalized(this);
        form.connectForm(this);
        this.resizeObserver?.observe(this.el);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        form.disconnectForm(this);
        this.resizeObserver?.disconnect();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    resizeHandler() {
        this.updateLabels();
    }
    updateLabels() {
        if (this.valueLabelEl) {
            this.determineValueLabelPosition();
        }
        if (this.rangeLabels) {
            this.determineVisibleLabels();
        }
    }
    calculateValues() {
        const { min, max, low, high, value } = this;
        const lowPercent = (100 * (low - min)) / (max - min);
        const highPercent = (100 * (high - min)) / (max - min);
        const currentPercent = (100 * (value - min)) / (max - min);
        if (!low || low < min || low > high || low > max) {
            this.low = min;
        }
        if (!high || high > max || high < low || high < min) {
            this.high = max;
        }
        if (!value) {
            this.value = min;
        }
        this.lowPercent = lowPercent;
        this.highPercent = highPercent;
        this.currentPercent = value ? currentPercent : 0;
        this.lowActive = !!low && low > min && (!value || low > value) && (!high || low < high);
        this.highActive =
            !!high && min <= high && high < max && (!value || high > value) && (!low || high > low);
    }
    getMeterKindCssClass() {
        const { low, high, min, max, value } = this;
        const lowest = low ? low : min;
        const highest = high ? high : max;
        const aboveLowest = value >= lowest;
        const belowLowest = value < lowest;
        const aboveHighest = value >= highest;
        const belowHighest = value < highest;
        if (!value || (!low && belowHighest) || belowLowest) {
            return CSS.success;
        }
        else if (aboveLowest && belowHighest) {
            return CSS.warning;
        }
        else if (aboveHighest) {
            return CSS.danger;
        }
        else {
            return CSS.success;
        }
    }
    intersects(el1, el2) {
        return el1 && el2 && dom.intersects(el1.getBoundingClientRect(), el2.getBoundingClientRect());
    }
    determineVisibleLabels() {
        const { minLabelEl, lowLabelEl, highLabelEl, maxLabelEl } = this;
        const highMaxOverlap = this.intersects(highLabelEl, maxLabelEl);
        const lowHighOverlap = this.intersects(lowLabelEl, highLabelEl);
        const lowMaxOverlap = this.intersects(lowLabelEl, maxLabelEl);
        const minHighOverlap = this.intersects(minLabelEl, highLabelEl);
        const minLowOverlap = this.intersects(minLabelEl, lowLabelEl);
        const minMaxOverlap = this.intersects(minLabelEl, maxLabelEl);
        const hiddenClass = CSS.labelHidden;
        if (lowLabelEl) {
            if (minLowOverlap || lowMaxOverlap || lowHighOverlap) {
                lowLabelEl.classList.add(hiddenClass);
            }
            else {
                lowLabelEl.classList.remove(hiddenClass);
            }
        }
        if (highLabelEl) {
            if (minHighOverlap || lowMaxOverlap || highMaxOverlap) {
                highLabelEl.classList.add(hiddenClass);
            }
            else {
                highLabelEl.classList.remove(hiddenClass);
            }
        }
        if (minLabelEl && maxLabelEl) {
            if (minMaxOverlap) {
                maxLabelEl.classList.add(hiddenClass);
            }
            else {
                maxLabelEl.classList.remove(hiddenClass);
            }
        }
    }
    determineValueLabelPosition() {
        const { valueLabelEl, meterContainerEl, currentPercent } = this;
        const valuePosition = currentPercent > 100 ? 100 : currentPercent > 0 ? currentPercent : 0;
        const valueLabelWidth = valueLabelEl.getBoundingClientRect().width;
        const containerWidth = meterContainerEl.getBoundingClientRect().width;
        const labelWidthPercent = (100 * (valueLabelWidth - 0)) / (containerWidth - 0);
        if (valuePosition + labelWidthPercent >= 100) {
            valueLabelEl.style.insetInlineEnd = "0%";
            valueLabelEl.style.removeProperty("inset-inline-start");
        }
        else {
            valueLabelEl.style.insetInlineStart = `${valuePosition}% `;
            valueLabelEl.style.removeProperty("inset-inline-end");
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderMeterFill() {
        const { currentPercent, fillType } = this;
        const kindClass = this.getMeterKindCssClass();
        return (index.h("div", { class: { [CSS.fill]: true, [kindClass]: fillType !== "single" }, style: { width: `${currentPercent}%` } }));
    }
    renderRangeLine(position) {
        const style = { insetInlineStart: `${position}%` };
        return index.h("div", { class: CSS.stepLine, style: style });
    }
    renderValueLabel() {
        const { currentPercent, valueLabelType, unitLabel, value } = this;
        const label = this.formatLabel(valueLabelType === "percent" ? currentPercent / 100 : value || 0, valueLabelType);
        return (index.h("div", { class: { [CSS.label]: true, [CSS.labelValue]: true }, key: "low-label-line", ref: (el) => (this.valueLabelEl = el) }, label, unitLabel && valueLabelType !== "percent" && (index.h("span", { class: CSS.unitLabel }, "\u00A0", unitLabel))));
    }
    renderMinLabel() {
        const { rangeLabelType, min, minPercent, unitLabel } = this;
        const style = { insetInlineStart: `${minPercent}%` };
        const labelMin = this.formatLabel(rangeLabelType === "percent" ? minPercent : min, rangeLabelType);
        return (index.h("div", { class: { [CSS.label]: true, [CSS.labelRange]: true }, key: "min-label-line", ref: (el) => (this.minLabelEl = el), style: style }, labelMin, unitLabel && rangeLabelType !== "percent" && (index.h("span", { class: CSS.unitLabel }, "\u00A0", unitLabel))));
    }
    renderLowLabel() {
        const { rangeLabelType, low, lowPercent, highPercent, labelFlipProximity } = this;
        const label = low
            ? this.formatLabel(rangeLabelType === "percent" ? lowPercent / 100 : low, rangeLabelType)
            : "";
        const styleDefault = { insetInlineStart: `${lowPercent}%` };
        const styleFlipped = { insetInlineEnd: `${100 - lowPercent}%` };
        const style = (highPercent - lowPercent) / 100 < labelFlipProximity ? styleFlipped : styleDefault;
        return (index.h("div", { class: { [CSS.label]: true, [CSS.labelRange]: true }, key: "low-label-line", ref: (el) => (this.lowLabelEl = el), style: style }, label));
    }
    renderHighLabel() {
        const { rangeLabelType, high, highPercent, labelFlipMax } = this;
        const label = high
            ? this.formatLabel(rangeLabelType === "percent" ? highPercent / 100 : high, rangeLabelType)
            : "";
        const styleDefault = { insetInlineStart: `${highPercent}%` };
        const styleFlipped = { insetInlineEnd: `${100 - highPercent}%` };
        const style = highPercent / 100 >= labelFlipMax ? styleFlipped : styleDefault;
        return (index.h("div", { class: { [CSS.label]: true, [CSS.labelRange]: true }, key: "high-label-line", ref: (el) => (this.highLabelEl = el), style: style }, label));
    }
    renderMaxLabel() {
        const { rangeLabelType, max, maxPercent } = this;
        const style = { insetInlineEnd: `${100 - maxPercent}%` };
        const labelMax = this.formatLabel(rangeLabelType === "percent" ? maxPercent / 100 : max, rangeLabelType);
        return (index.h("div", { class: { [CSS.label]: true, [CSS.labelRange]: true }, key: "max-label-line", ref: (el) => (this.maxLabelEl = el), style: style }, labelMax));
    }
    render() {
        const { appearance, currentPercent, highActive, highPercent, label, lowActive, lowPercent, max, maxPercent, min, minPercent, rangeLabels, rangeLabelType, unitLabel, value, valueLabel, valueLabelType, } = this;
        const textPercentLabelWithPercent = this.formatLabel(currentPercent / 100, "percent");
        const textUnitLabel = `${value} ${unitLabel}`;
        const valueText = valueLabelType === "percent"
            ? textPercentLabelWithPercent
            : unitLabel
                ? textUnitLabel
                : undefined;
        return (index.h(index.Host, { key: '63487d7e530d66178ca535feed2ff2c149fef627' }, index.h("div", { key: '98b299ee370f14bdb266e69d9b9c8d303b580de9', "aria-label": label, "aria-valuemax": rangeLabelType === "percent" ? maxPercent : max, "aria-valuemin": rangeLabelType === "percent" ? minPercent : min, "aria-valuenow": valueLabelType === "percent" ? currentPercent : value, "aria-valuetext": valueText, class: {
                [CSS.container]: true,
                [CSS.stepsVisible]: rangeLabels,
                [CSS.valueVisible]: valueLabel,
                [appearance]: appearance !== "outline-fill",
            }, ref: (el) => (this.meterContainerEl = el), role: "meter" }, this.renderMeterFill(), valueLabel && this.renderValueLabel(), lowActive && this.renderRangeLine(lowPercent), highActive && this.renderRangeLine(highPercent), rangeLabels && this.renderMinLabel(), rangeLabels && lowActive && this.renderLowLabel(), rangeLabels && highActive && this.renderHighLabel(), rangeLabels && this.renderMaxLabel())));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "min": ["handleRangeChange"],
        "max": ["handleRangeChange"],
        "low": ["handleRangeChange"],
        "high": ["handleRangeChange"],
        "value": ["handleRangeChange"],
        "rangeLabels": ["handleLabelChange"],
        "rangeLabelType": ["handleLabelChange"],
        "unitLabel": ["handleLabelChange"],
        "valueLabel": ["handleLabelChange"],
        "valueLabelType": ["handleLabelChange"]
    }; }
};
Meter.style = CalciteMeterStyle0;

exports.calcite_meter = Meter;
