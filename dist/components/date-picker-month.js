/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as sameDate, b as dateFromRange, i as inRange } from './date.js';
import { d as defineCustomElement$1 } from './date-picker-day.js';

const datePickerMonthCss = ":host([hidden]){display:none}[hidden]{display:none}.calendar{margin-block-end:0.25rem}.week-headers{display:flex;border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px;padding-inline:0.25rem}.week-header{text-align:center;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-3);inline-size:14.2857142857%}.day{display:flex;min-inline-size:0px;justify-content:center;inline-size:100%}.day calcite-date-picker-day{inline-size:100%}:host([scale=s]) .week-header{padding-inline:0px;padding-block:0.5rem 0.75rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) .week-header{padding-inline:0px;padding-block:0.75rem 1rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=l]) .week-header{padding-inline:0px;padding-block:1rem 1.25rem;font-size:var(--calcite-font-size--1);line-height:1rem}.week-days{display:grid;grid-template-columns:repeat(7, 1fr);grid-auto-rows:1fr;padding-block:0;padding-inline:6px}.week-days:focus{outline:2px solid transparent;outline-offset:2px}";
const CalciteDatePickerMonthStyle0 = datePickerMonthCss;

const DAYS_PER_WEEK = 7;
const DAYS_MAXIMUM_INDEX = 6;
const DatePickerMonth = /*@__PURE__*/ proxyCustomElement(class DatePickerMonth extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalDatePickerSelect = createEvent(this, "calciteInternalDatePickerSelect", 6);
        this.calciteInternalDatePickerHover = createEvent(this, "calciteInternalDatePickerHover", 6);
        this.calciteInternalDatePickerActiveDateChange = createEvent(this, "calciteInternalDatePickerActiveDateChange", 6);
        this.calciteInternalDatePickerMouseOut = createEvent(this, "calciteInternalDatePickerMouseOut", 6);
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const isRTL = this.el.dir === "rtl";
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    this.addDays(-7);
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    this.addDays(isRTL ? -1 : 1);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    this.addDays(7);
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    this.addDays(isRTL ? 1 : -1);
                    break;
                case "PageUp":
                    event.preventDefault();
                    this.addMonths(-1);
                    break;
                case "PageDown":
                    event.preventDefault();
                    this.addMonths(1);
                    break;
                case "Home":
                    event.preventDefault();
                    this.activeDate.setDate(1);
                    this.addDays();
                    break;
                case "End":
                    event.preventDefault();
                    this.activeDate.setDate(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0).getDate());
                    this.addDays();
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();
                    break;
                case "Tab":
                    this.activeFocus = false;
            }
        };
        /**
         * Once user is not interacting via keyboard,
         * disable auto focusing of active date
         */
        this.disableActiveFocus = () => {
            this.activeFocus = false;
        };
        this.dayHover = (event) => {
            const target = event.target;
            if (target.disabled) {
                this.calciteInternalDatePickerMouseOut.emit();
            }
            else {
                this.calciteInternalDatePickerHover.emit(target.value);
            }
            event.stopPropagation();
        };
        this.daySelect = (event) => {
            const target = event.target;
            this.calciteInternalDatePickerSelect.emit(target.value);
        };
        this.dateTimeFormat = undefined;
        this.selectedDate = undefined;
        this.activeDate = new Date();
        this.startDate = undefined;
        this.endDate = undefined;
        this.min = undefined;
        this.max = undefined;
        this.scale = undefined;
        this.localeData = undefined;
        this.hoverRange = undefined;
    }
    pointerOutHandler() {
        this.calciteInternalDatePickerMouseOut.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const month = this.activeDate.getMonth();
        const year = this.activeDate.getFullYear();
        const startOfWeek = this.localeData.weekStart % 7;
        const { abbreviated, short, narrow } = this.localeData.days;
        const weekDays = this.scale === "s" ? narrow || short || abbreviated : short || abbreviated || narrow;
        const adjustedWeekDays = [...weekDays.slice(startOfWeek, 7), ...weekDays.slice(0, startOfWeek)];
        const curMonDays = this.getCurrentMonthDays(month, year);
        const prevMonDays = this.getPreviousMonthDays(month, year, startOfWeek);
        const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
        let dayInWeek = 0;
        const getDayInWeek = () => dayInWeek++ % 7;
        const days = [
            ...prevMonDays.map((day) => {
                return {
                    active: false,
                    day,
                    dayInWeek: getDayInWeek(),
                    date: new Date(year, month - 1, day),
                };
            }),
            ...curMonDays.map((day) => {
                const date = new Date(year, month, day);
                const active = sameDate(date, this.activeDate);
                return {
                    active,
                    currentMonth: true,
                    day,
                    dayInWeek: getDayInWeek(),
                    date,
                    ref: true,
                };
            }),
            ...nextMonDays.map((day) => {
                return {
                    active: false,
                    day,
                    dayInWeek: getDayInWeek(),
                    date: new Date(year, month + 1, day),
                };
            }),
        ];
        return (h(Host, { onFocusout: this.disableActiveFocus, onKeyDown: this.keyDownHandler }, h("div", { class: "calendar", role: "grid" }, h("div", { class: "week-headers", role: "row" }, adjustedWeekDays.map((weekday) => (h("span", { class: "week-header", role: "columnheader" }, weekday)))), h("div", { class: "week-days", role: "row" }, days.map((day, index) => this.renderDateDay(day, index))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Add n months to the current month
     *
     * @param step
     */
    addMonths(step) {
        const nextDate = new Date(this.activeDate);
        nextDate.setMonth(this.activeDate.getMonth() + step);
        this.calciteInternalDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    }
    /**
     * Add n days to the current date
     *
     * @param step
     */
    addDays(step = 0) {
        const nextDate = new Date(this.activeDate);
        nextDate.setDate(this.activeDate.getDate() + step);
        this.calciteInternalDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
        this.activeFocus = true;
    }
    /**
     * Get dates for last days of the previous month
     *
     * @param month
     * @param year
     * @param startOfWeek
     */
    getPreviousMonthDays(month, year, startOfWeek) {
        const lastDate = new Date(year, month, 0);
        const date = lastDate.getDate();
        const startDay = lastDate.getDay();
        const days = [];
        if (startDay === (startOfWeek + DAYS_MAXIMUM_INDEX) % DAYS_PER_WEEK) {
            return days;
        }
        if (startDay === startOfWeek) {
            return [date];
        }
        for (let i = (DAYS_PER_WEEK + startDay - startOfWeek) % DAYS_PER_WEEK; i >= 0; i--) {
            days.push(date - i);
        }
        return days;
    }
    /**
     * Get dates for the current month
     *
     * @param month
     * @param year
     */
    getCurrentMonthDays(month, year) {
        const num = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < num; i++) {
            days.push(i + 1);
        }
        return days;
    }
    /**
     * Get dates for first days of the next month
     *
     * @param month
     * @param year
     * @param startOfWeek
     */
    getNextMonthDays(month, year, startOfWeek) {
        const endDay = new Date(year, month + 1, 0).getDay();
        const days = [];
        if (endDay === (startOfWeek + DAYS_MAXIMUM_INDEX) % DAYS_PER_WEEK) {
            return days;
        }
        for (let i = 0; i < (DAYS_MAXIMUM_INDEX - (endDay - startOfWeek)) % DAYS_PER_WEEK; i++) {
            days.push(i + 1);
        }
        return days;
    }
    /**
     * Determine if the date is in between the start and end dates
     *
     * @param date
     */
    betweenSelectedRange(date) {
        return !!(this.startDate &&
            this.endDate &&
            date > this.startDate &&
            date < this.endDate &&
            !this.isRangeHover(date));
    }
    /**
     * Determine if the date should be in selected state
     *
     * @param date
     */
    isSelected(date) {
        return !!(sameDate(date, this.selectedDate) ||
            (this.startDate && sameDate(date, this.startDate)) ||
            (this.endDate && sameDate(date, this.endDate)));
    }
    /**
     * Determine if the date is the start of the date range
     *
     * @param date
     */
    isStartOfRange(date) {
        return !!(this.startDate &&
            !sameDate(this.startDate, this.endDate) &&
            sameDate(this.startDate, date) &&
            !this.isEndOfRange(date));
    }
    isEndOfRange(date) {
        return !!((this.endDate && !sameDate(this.startDate, this.endDate) && sameDate(this.endDate, date)) ||
            (!this.endDate &&
                this.hoverRange &&
                sameDate(this.startDate, this.hoverRange.end) &&
                sameDate(date, this.hoverRange.end)));
    }
    /**
     * Render calcite-date-picker-day
     *
     * @param active.active
     * @param active
     * @param day
     * @param dayInWeek
     * @param date
     * @param currentMonth
     * @param ref
     * @param active.currentMonth
     * @param active.date
     * @param active.day
     * @param active.dayInWeek
     * @param active.ref
     * @param key
     */
    renderDateDay({ active, currentMonth, date, day, dayInWeek, ref }, key) {
        const isFocusedOnStart = this.isFocusedOnStart();
        const isHoverInRange = this.isHoverInRange() ||
            (!this.endDate && this.hoverRange && sameDate(this.hoverRange?.end, this.startDate));
        return (h("div", { class: "day", key: key, role: "gridcell" }, h("calcite-date-picker-day", { active: active, class: {
                "hover--inside-range": this.startDate && isHoverInRange,
                "hover--outside-range": this.startDate && !isHoverInRange,
                "focused--start": isFocusedOnStart,
                "focused--end": !isFocusedOnStart,
            }, currentMonth: currentMonth, dateTimeFormat: this.dateTimeFormat, day: day, disabled: !inRange(date, this.min, this.max), endOfRange: this.isEndOfRange(date), highlighted: this.betweenSelectedRange(date), onCalciteDaySelect: this.daySelect, onCalciteInternalDayHover: this.dayHover, range: !!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate), rangeEdge: dayInWeek === 0 ? "start" : dayInWeek === 6 ? "end" : undefined, rangeHover: this.isRangeHover(date), ref: (el) => {
                // when moving via keyboard, focus must be updated on active date
                if (ref && active && this.activeFocus) {
                    el?.setFocus();
                }
            }, scale: this.scale, selected: this.isSelected(date), startOfRange: this.isStartOfRange(date), value: date })));
    }
    isFocusedOnStart() {
        return this.hoverRange?.focused === "start";
    }
    isHoverInRange() {
        if (!this.hoverRange) {
            return false;
        }
        const { start, end } = this.hoverRange;
        return !!((!this.isFocusedOnStart() && this.startDate && (!this.endDate || end < this.endDate)) ||
            (this.isFocusedOnStart() && this.startDate && start > this.startDate));
    }
    isRangeHover(date) {
        if (!this.hoverRange) {
            return false;
        }
        const { start, end } = this.hoverRange;
        const isStart = this.isFocusedOnStart();
        const insideRange = this.isHoverInRange();
        const cond1 = insideRange &&
            ((!isStart && date > this.startDate && (date < end || sameDate(date, end))) ||
                (isStart && date < this.endDate && (date > start || sameDate(date, start))));
        const cond2 = !insideRange &&
            ((!isStart && date >= this.endDate && (date < end || sameDate(date, end))) ||
                (isStart &&
                    ((this.startDate && date < this.startDate) ||
                        (this.endDate && sameDate(date, this.startDate))) &&
                    ((start && date > start) || sameDate(date, start))));
        return cond1 || cond2;
    }
    get el() { return this; }
    static get style() { return CalciteDatePickerMonthStyle0; }
}, [1, "calcite-date-picker-month", {
        "dateTimeFormat": [16],
        "selectedDate": [16],
        "activeDate": [16],
        "startDate": [16],
        "endDate": [16],
        "min": [16],
        "max": [16],
        "scale": [513],
        "localeData": [16],
        "hoverRange": [16]
    }, [[1, "pointerout", "pointerOutHandler"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-date-picker-month", "calcite-date-picker-day"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-date-picker-month":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, DatePickerMonth);
            }
            break;
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { DatePickerMonth as D, defineCustomElement as d };
