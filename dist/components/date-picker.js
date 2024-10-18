/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { getAssetPath, proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as dateFromISO, g as getDaysDiff, a as dateToISO, b as dateFromRange, s as setEndOfDay } from './date.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { g as getSupportedLocale, c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter, b as getDateTimeFormat } from './locale2.js';
import { c as connectMessages, d as disconnectMessages, s as setUpMessages, u as updateMessages } from './t9n.js';
import { i as isBrowser } from './browser.js';
import { d as defineCustomElement$4 } from './date-picker-day.js';
import { d as defineCustomElement$3 } from './date-picker-month.js';
import { d as defineCustomElement$2 } from './date-picker-month-header.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const HEADING_LEVEL = 2;
const DATE_PICKER_FORMAT_OPTIONS = { dateStyle: "full" };

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * CLDR cache.
 * Exported for testing purposes.
 *
 * @private
 */
const translationCache = {};
/**
 * CLDR request cache.
 * Exported for testing purposes.
 *
 * @private
 */
const requestCache = {};
/**
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
async function getLocaleData(lang) {
    const locale = getSupportedLocale(lang);
    if (translationCache[locale]) {
        return translationCache[locale];
    }
    if (!requestCache[locale]) {
        requestCache[locale] = fetch(getAssetPath(`./assets/date-picker/nls/${locale}.json`))
            .then((resp) => resp.json())
            .catch(() => {
            console.error(`Translations for "${locale}" not found or invalid, falling back to english`);
            return getLocaleData("en");
        });
    }
    const data = await requestCache[locale];
    translationCache[locale] = data;
    return data;
}
/**
 *  Maps value to valueAsDate
 *
 * @param value
 */
function getValueAsDateRange(value) {
    return value.map((v, index) => dateFromISO(v, index === 1));
}

const datePickerCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-block;inline-size:auto;overflow:visible;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);vertical-align:top}:host([scale=s]){inline-size:234px;min-inline-size:216px;max-inline-size:380px}:host([scale=m]){inline-size:304px;min-inline-size:272px;max-inline-size:480px}:host([scale=l]){inline-size:370px;min-inline-size:320px;max-inline-size:600px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDatePickerStyle0 = datePickerCss;

const DatePicker = /*@__PURE__*/ proxyCustomElement(class DatePicker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteDatePickerChange = createEvent(this, "calciteDatePickerChange", 6);
        this.calciteDatePickerRangeChange = createEvent(this, "calciteDatePickerRangeChange", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.keyDownHandler = (event) => {
            if (event.key === "Escape") {
                this.resetActiveDates();
            }
        };
        this.monthHeaderSelectChange = (event) => {
            const date = new Date(event.detail);
            if (!this.range) {
                this.activeDate = date;
            }
            else {
                if (this.activeRange === "end") {
                    this.activeEndDate = date;
                }
                else {
                    this.activeStartDate = date;
                }
                this.mostRecentRangeValue = date;
            }
        };
        this.monthActiveDateChange = (event) => {
            const date = new Date(event.detail);
            if (!this.range) {
                this.activeDate = date;
            }
            else {
                if (this.activeRange === "end") {
                    this.activeEndDate = date;
                }
                else {
                    this.activeStartDate = date;
                }
                this.mostRecentRangeValue = date;
            }
        };
        this.monthHoverChange = (event) => {
            if (!this.range) {
                this.hoverRange = undefined;
                return;
            }
            const { valueAsDate } = this;
            const start = Array.isArray(valueAsDate) && valueAsDate[0];
            const end = Array.isArray(valueAsDate) && valueAsDate[1];
            const date = new Date(event.detail);
            this.hoverRange = {
                focused: this.activeRange || "start",
                start,
                end,
            };
            if (this.proximitySelectionDisabled) {
                if ((end && start) || (!end && date >= start)) {
                    this.hoverRange.focused = "end";
                    this.hoverRange.end = date;
                }
                else if (!end && date < start) {
                    this.hoverRange = {
                        focused: "start",
                        start: date,
                        end: start,
                    };
                }
                else {
                    this.hoverRange = undefined;
                }
            }
            else {
                if (start && end) {
                    const startDiff = getDaysDiff(date, start);
                    const endDiff = getDaysDiff(date, end);
                    if (endDiff > 0) {
                        this.hoverRange.end = date;
                        this.hoverRange.focused = "end";
                    }
                    else if (startDiff < 0) {
                        this.hoverRange.start = date;
                        this.hoverRange.focused = "start";
                    }
                    else if (startDiff > endDiff) {
                        this.hoverRange.start = date;
                        this.hoverRange.focused = "start";
                    }
                    else {
                        this.hoverRange.end = date;
                        this.hoverRange.focused = "end";
                    }
                }
                else {
                    if (start) {
                        if (date < start) {
                            this.hoverRange = {
                                focused: "start",
                                start: date,
                                end: start,
                            };
                        }
                        else {
                            this.hoverRange.end = date;
                            this.hoverRange.focused = "end";
                        }
                    }
                }
            }
            event.stopPropagation();
        };
        this.monthMouseOutChange = () => {
            if (this.hoverRange) {
                this.hoverRange = undefined;
            }
        };
        this.resetActiveDates = () => {
            const { valueAsDate } = this;
            if (!Array.isArray(valueAsDate) && valueAsDate && valueAsDate !== this.activeDate) {
                this.activeDate = new Date(valueAsDate);
            }
            if (Array.isArray(valueAsDate)) {
                if (valueAsDate[0] && valueAsDate[0] !== this.activeStartDate) {
                    this.activeStartDate = new Date(valueAsDate[0]);
                }
                if (valueAsDate[1] && valueAsDate[1] !== this.activeEndDate) {
                    this.activeEndDate = new Date(valueAsDate[1]);
                }
            }
        };
        /**
         * Event handler for when the selected date changes
         *
         * @param event
         */
        this.monthDateChange = (event) => {
            const date = new Date(event.detail);
            const isoDate = dateToISO(date);
            if (!this.range && isoDate === dateToISO(this.valueAsDate)) {
                return;
            }
            if (!this.range) {
                this.value = isoDate || "";
                this.valueAsDate = date || null;
                this.activeDate = date || null;
                this.calciteDatePickerChange.emit();
                return;
            }
            const start = this.getStartDate();
            const end = this.getEndDate();
            if (!start || (!end && date < start)) {
                if (start) {
                    this.setEndDate(new Date(start));
                }
                if (this.activeRange == "end") {
                    this.setEndDate(date);
                }
                else {
                    this.setStartDate(date);
                }
            }
            else if (!end) {
                this.setEndDate(date);
            }
            else {
                if (this.proximitySelectionDisabled) {
                    this.setStartDate(date);
                    this.setEndDate(null);
                }
                else {
                    if (this.activeRange) {
                        if (this.activeRange == "end") {
                            this.setEndDate(date);
                        }
                        else {
                            this.setStartDate(date);
                        }
                    }
                    else {
                        const startDiff = getDaysDiff(date, start);
                        const endDiff = getDaysDiff(date, end);
                        if (endDiff === 0 || startDiff < 0) {
                            this.setStartDate(date);
                        }
                        else if (startDiff === 0 || endDiff < 0) {
                            this.setEndDate(date);
                        }
                        else if (startDiff < endDiff) {
                            this.setStartDate(date);
                        }
                        else {
                            this.setEndDate(date);
                        }
                    }
                }
            }
            this.calciteDatePickerChange.emit();
        };
        this.activeDate = undefined;
        this.activeRange = undefined;
        this.value = undefined;
        this.headingLevel = undefined;
        this.valueAsDate = undefined;
        this.minAsDate = undefined;
        this.maxAsDate = undefined;
        this.min = undefined;
        this.max = undefined;
        this.numberingSystem = undefined;
        this.scale = "m";
        this.range = false;
        this.proximitySelectionDisabled = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.activeEndDate = undefined;
        this.activeStartDate = undefined;
        this.dateTimeFormat = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.endAsDate = undefined;
        this.hoverRange = undefined;
        this.localeData = undefined;
        this.mostRecentRangeValue = undefined;
        this.startAsDate = undefined;
    }
    activeDateWatcher(newActiveDate) {
        if (this.activeRange === "end") {
            this.activeEndDate = newActiveDate;
        }
    }
    valueAsDateWatcher(newValueAsDate) {
        if (this.range && Array.isArray(newValueAsDate)) {
            const { activeStartDate, activeEndDate } = this;
            const newActiveStartDate = newValueAsDate[0];
            const newActiveEndDate = newValueAsDate[1];
            this.activeStartDate = activeStartDate !== newActiveStartDate && newActiveStartDate;
            this.activeEndDate = activeEndDate !== newActiveEndDate && newActiveEndDate;
        }
        else if (newValueAsDate && newValueAsDate !== this.activeDate) {
            this.activeDate = newValueAsDate;
        }
    }
    onMinChanged(min) {
        this.minAsDate = dateFromISO(min);
    }
    onMaxChanged(max) {
        this.maxAsDate = dateFromISO(max);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await componentFocusable(this);
        this.el.focus();
    }
    /**
     * Resets active date state.
     * @internal
     */
    async reset() {
        this.resetActiveDates();
        this.mostRecentRangeValue = undefined;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        if (Array.isArray(this.value)) {
            this.valueAsDate = getValueAsDateRange(this.value);
        }
        else if (this.value) {
            this.valueAsDate = dateFromISO(this.value);
        }
        if (this.min) {
            this.minAsDate = dateFromISO(this.min);
        }
        if (this.max) {
            this.maxAsDate = dateFromISO(this.max);
        }
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await this.loadLocaleData();
        this.onMinChanged(this.min);
        this.onMaxChanged(this.max);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    render() {
        const date = dateFromRange(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate);
        let activeDate = this.getActiveDate(date, this.minAsDate, this.maxAsDate);
        const endDate = this.range && Array.isArray(this.valueAsDate)
            ? dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
            : null;
        const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
        if ((this.activeRange === "end" ||
            (this.hoverRange?.focused === "end" && (!this.proximitySelectionDisabled || endDate))) &&
            activeEndDate) {
            activeDate = activeEndDate;
        }
        if (this.range && this.mostRecentRangeValue) {
            activeDate = this.mostRecentRangeValue;
        }
        const minDate = this.range && this.activeRange
            ? this.activeRange === "start"
                ? this.minAsDate
                : date || this.minAsDate
            : this.minAsDate;
        const maxDate = this.range && this.activeRange
            ? this.activeRange === "start"
                ? endDate || this.maxAsDate
                : this.maxAsDate
            : this.maxAsDate;
        return (h(Host, { key: '32213cf1e0848af340d9a7cdaf0838f88d04e0cb', onBlur: this.resetActiveDates, onKeyDown: this.keyDownHandler }, this.renderCalendar(activeDate, maxDate, minDate, date, endDate)));
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    valueHandler(value) {
        if (Array.isArray(value)) {
            this.valueAsDate = getValueAsDateRange(value);
        }
        else if (value) {
            this.valueAsDate = dateFromISO(value);
        }
    }
    async loadLocaleData() {
        if (!isBrowser()) {
            return;
        }
        numberStringFormatter.numberFormatOptions = {
            numberingSystem: this.numberingSystem,
            locale: this.effectiveLocale,
            useGrouping: false,
        };
        this.localeData = await getLocaleData(this.effectiveLocale);
        this.dateTimeFormat = getDateTimeFormat(this.effectiveLocale, DATE_PICKER_FORMAT_OPTIONS);
    }
    /**
     * Render calcite-date-picker-month-header and calcite-date-picker-month
     *
     * @param activeDate
     * @param maxDate
     * @param minDate
     * @param date
     * @param endDate
     */
    renderCalendar(activeDate, maxDate, minDate, date, endDate) {
        return (this.localeData && [
            h("calcite-date-picker-month-header", { activeDate: activeDate, headingLevel: this.headingLevel || HEADING_LEVEL, localeData: this.localeData, max: maxDate, messages: this.messages, min: minDate, onCalciteInternalDatePickerSelect: this.monthHeaderSelectChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date || new Date() }),
            h("calcite-date-picker-month", { activeDate: activeDate, dateTimeFormat: this.dateTimeFormat, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteInternalDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteInternalDatePickerHover: this.monthHoverChange, onCalciteInternalDatePickerMouseOut: this.monthMouseOutChange, onCalciteInternalDatePickerSelect: this.monthDateChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date, startDate: this.range ? date : undefined }),
        ]);
    }
    getEndDate() {
        return (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined;
    }
    setEndDate(date) {
        const startDate = this.getStartDate();
        const newEndDate = date ? setEndOfDay(date) : date;
        this.value = [dateToISO(startDate), dateToISO(date)];
        this.valueAsDate = [startDate, date];
        this.mostRecentRangeValue = newEndDate;
        this.calciteDatePickerRangeChange.emit();
        this.activeEndDate = date || null;
    }
    getStartDate() {
        return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
    }
    setStartDate(date) {
        const endDate = this.getEndDate();
        this.value = [dateToISO(date), dateToISO(endDate)];
        this.valueAsDate = [date, endDate];
        this.mostRecentRangeValue = date;
        this.calciteDatePickerRangeChange.emit();
        this.activeStartDate = date || null;
    }
    /**
     * Get an active date using the value, or current date as default
     *
     * @param value
     * @param min
     * @param max
     */
    getActiveDate(value, min, max) {
        return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
    }
    getActiveEndDate(value, min, max) {
        return (dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "activeDate": ["activeDateWatcher"],
        "valueAsDate": ["valueAsDateWatcher"],
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange", "loadLocaleData"],
        "value": ["valueHandler"]
    }; }
    static get style() { return CalciteDatePickerStyle0; }
}, [17, "calcite-date-picker", {
        "activeDate": [1040],
        "activeRange": [513, "active-range"],
        "value": [1025],
        "headingLevel": [514, "heading-level"],
        "valueAsDate": [1040],
        "minAsDate": [1040],
        "maxAsDate": [1040],
        "min": [513],
        "max": [513],
        "numberingSystem": [513, "numbering-system"],
        "scale": [513],
        "range": [516],
        "proximitySelectionDisabled": [516, "proximity-selection-disabled"],
        "messageOverrides": [1040],
        "messages": [1040],
        "activeEndDate": [32],
        "activeStartDate": [32],
        "dateTimeFormat": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "endAsDate": [32],
        "hoverRange": [32],
        "localeData": [32],
        "mostRecentRangeValue": [32],
        "startAsDate": [32],
        "setFocus": [64],
        "reset": [64]
    }, undefined, {
        "activeDate": ["activeDateWatcher"],
        "valueAsDate": ["valueAsDateWatcher"],
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange", "loadLocaleData"],
        "value": ["valueHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-date-picker", "calcite-date-picker-day", "calcite-date-picker-month", "calcite-date-picker-month-header", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-date-picker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, DatePicker);
            }
            break;
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-date-picker-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-date-picker-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { DatePicker as D, getLocaleData as a, defineCustomElement as d, getValueAsDateRange as g };
