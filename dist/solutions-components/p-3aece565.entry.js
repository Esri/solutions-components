/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement, F as Fragment } from './p-4e6eb06e.js';
import { a as dateToISO, h as sameDate, b as dateFromRange, i as inRange, j as getOrder, n as nextMonth, p as prevMonth, k as formatCalendarYear, l as parseCalendarYear } from './p-5d2cd0a4.js';
import { a as closestElementCrossShadowBoundary, t as toAriaBoolean } from './p-621ad249.js';
import { I as InteractiveContainer, u as updateHostInteraction } from './p-d6902512.js';
import { i as isActivationKey } from './p-233f219c.js';
import { n as numberStringFormatter } from './p-895e7b9c.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-ad9d1221.js';
import { H as Heading } from './p-b13aca6a.js';
import { g as getIconScale } from './p-4a291f79.js';
import './p-7d542581.js';
import './p-91371f97.js';
import './p-ff336351.js';
import './p-4f82eb55.js';

const datePickerDayCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;cursor:pointer;color:var(--calcite-color-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.day-v-wrapper{flex:1 1 auto}.day-wrapper{position:relative;display:flex;flex-direction:column;align-items:center}:host([range]) .day-wrapper::before,:host([range]) .day-wrapper::after,:host([range-hover]) .day-wrapper::before,:host([range-hover]) .day-wrapper::after{pointer-events:none;position:absolute;inset-block:0;content:\"\";block-size:var(--calcite-internal-day-size);inline-size:var(--calcite-internal-day-size)}.day{z-index:var(--calcite-z-index);display:flex;align-items:center;justify-content:center;border-radius:9999px;font-size:var(--calcite-font-size--2);line-height:1rem;line-height:1;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;background:none;box-shadow:0 0 0 2px transparent;block-size:var(--calcite-internal-day-size);inline-size:var(--calcite-internal-day-size)}.text{margin-block:1px 0px;margin-inline-start:0px}:host([scale=s]){--calcite-internal-day-size:27px}:host([scale=s]) .day-v-wrapper{padding-block:0.125rem}:host([scale=s]) .day-wrapper{padding:0px}:host([scale=s]) .day{font-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-internal-day-size:33px}:host([scale=m]) .day-v-wrapper{padding-block:0.25rem}:host([scale=m]) .day-wrapper{padding:0px}:host([scale=m]) .day{font-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-internal-day-size:43px}:host([scale=l]) .day-v-wrapper{padding-block:0.25rem}:host([scale=l]) .day-wrapper{padding-inline:0.25rem}:host([scale=l]) .day{font-size:var(--calcite-font-size-0)}:host(:not([current-month])) .day{opacity:var(--calcite-opacity-disabled)}:host(:hover:not([disabled]):not([selected])) .day,:host([active]:not([range]):not([selected])) .day{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host(:focus),:host([active]){outline:2px solid transparent;outline-offset:2px}:host(:focus:not([disabled])) .day{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([selected]) .day{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-color-brand);color:var(--calcite-color-foreground-1)}:host(:focus:not([disabled])) .day,:host([start-of-range]:not(:focus)) .day,:host([end-of-range]:not(:focus)) .day{box-shadow:0 0 0 2px var(--calcite-color-foreground-1)}:host([range-hover]:not([selected])) .day-wrapper::before,:host([highlighted]:not([selected])) .day-wrapper::before{inset-inline-end:50%;border-radius:0}:host([range-hover]:not([selected])) .day-wrapper::after,:host([highlighted]:not([selected])) .day-wrapper::after{inset-inline-start:50%;border-radius:0}:host([range-hover]:not([selected])) .day,:host([highlighted]:not([selected])) .day{color:var(--calcite-color-text-1)}:host([highlighted]) .day-wrapper::before,:host([highlighted]) .day-wrapper::after,:host([selected]:not(.hover--outside-range)) .day-wrapper::before,:host([selected]:not(.hover--outside-range)) .day-wrapper::after{background-color:var(--calcite-color-foreground-current)}:host([range-hover]:not([selected])) .day-wrapper::before,:host([range-hover]:not([selected])) .day-wrapper::after{background-color:var(--calcite-color-foreground-2)}:host(:hover[range-hover]:not([selected]).focused--end) .day-wrapper::before,:host([highlighted][end-of-range]) .day-wrapper::before,:host([highlighted][range-edge=end]) .day-wrapper::before,:host([range-hover][range-edge=end]) .day-wrapper::before,:host(:hover[range-hover].focused--end.hover--outside-range) .day-wrapper::before{inset-inline-end:50%}:host(:hover[range-hover]:not([selected]).focused--end) .day-wrapper::after,:host([highlighted][end-of-range]) .day-wrapper::after,:host([highlighted][range-edge=end]) .day-wrapper::after,:host([range-hover][range-edge=end]) .day-wrapper::after,:host(:hover[range-hover].focused--end.hover--outside-range) .day-wrapper::after{inset-inline-start:50%;border-start-end-radius:var(--calcite-internal-day-size);border-end-end-radius:var(--calcite-internal-day-size);inline-size:calc(var(--calcite-internal-day-size) / 2)}:host([highlighted][start-of-range]) .day-wrapper::before,:host([highlighted][range-edge=start]) .day-wrapper::before,:host([range-hover][range-edge=start]) .day-wrapper::before,:host(:hover[range-hover]:not([selected]).focused--start) .day-wrapper::before,:host([start-of-range].hover--inside-range) .day-wrapper::before,:host(:hover[range-hover].focused--start.hover--outside-range) .day-wrapper::before{inset-inline-end:50%;border-start-start-radius:var(--calcite-internal-day-size);border-end-start-radius:var(--calcite-internal-day-size);inline-size:calc(var(--calcite-internal-day-size) / 2)}:host([highlighted][start-of-range]) .day-wrapper::after,:host([highlighted][range-edge=start]) .day-wrapper::after,:host([range-hover][range-edge=start]) .day-wrapper::after,:host(:hover[range-hover]:not([selected]).focused--start) .day-wrapper::after,:host([start-of-range].hover--inside-range) .day-wrapper::after,:host(:hover[range-hover].focused--start.hover--outside-range) .day-wrapper::after{inset-inline-start:50%}:host([range-hover][start-of-range][range-edge=end]) .day-wrapper::after,:host([range-hover][start-of-range][range-edge=end]) .day-wrapper::before,:host([range-hover][end-of-range][range-edge=start]) .day-wrapper::after,:host([range-hover][end-of-range][range-edge=start]) .day-wrapper::before,:host([start-of-range][range-edge=end].hover--inside-range) .day-wrapper::after,:host([start-of-range][range-edge=end].hover--inside-range) .day-wrapper::before,:host([end-of-range]) .day-wrapper::after,:host([end-of-range]) .day-wrapper::before{content:unset}:host(:hover[range-hover]:not([selected]).focused--start) .day,:host(:hover[range-hover]:not([selected]).focused--end) .day,:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) .day,:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) .day{box-shadow:0 0 0 2px var(--calcite-color-foreground-1)}@media (forced-colors: active){.day{border-radius:0px}:host([selected]){outline:2px solid canvasText}:host(:hover:not([selected])) .day{border-radius:50%}:host([range][selected]) .day-wrapper::before,:host([range][selected]) .day-wrapper::after,:host([highlighted]) .day-wrapper::before,:host([highlighted]) .day-wrapper::after,:host([range-hover]:not([selected])) .day-wrapper::before,:host([range-hover]:not([selected])) .day-wrapper::after{background-color:highlight}:host([range-hover]) .day-wrapper::before,:host([range-hover]) .day-wrapper::after,:host([range][selected][start-of-range]) .day-wrapper::before,:host([range][selected][start-of-range]) .day-wrapper::after,:host([range][selected][end-of-range]) .day-wrapper::before,:host([range][selected][end-of-range]) .day-wrapper::after{background-color:canvas}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDatePickerDayStyle0 = datePickerDayCss;

const DatePickerDay = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteDaySelect = createEvent(this, "calciteDaySelect", 6);
        this.calciteInternalDayHover = createEvent(this, "calciteInternalDayHover", 6);
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.onClick = () => {
            if (this.disabled) {
                return;
            }
            this.calciteDaySelect.emit();
        };
        this.keyDownHandler = (event) => {
            if (isActivationKey(event.key)) {
                !this.disabled && this.calciteDaySelect.emit();
                event.preventDefault();
            }
        };
        this.day = undefined;
        this.dateTimeFormat = undefined;
        this.disabled = false;
        this.currentMonth = false;
        this.selected = false;
        this.highlighted = false;
        this.range = false;
        this.rangeEdge = undefined;
        this.startOfRange = false;
        this.endOfRange = false;
        this.rangeHover = false;
        this.active = false;
        this.scale = undefined;
        this.value = undefined;
    }
    pointerOverHandler() {
        if (this.disabled) {
            return;
        }
        this.calciteInternalDayHover.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.el.focus();
    }
    render() {
        const dayId = dateToISO(this.value).replaceAll("-", "");
        if (this.parentDatePickerEl) {
            const { numberingSystem, lang: locale } = this.parentDatePickerEl;
            numberStringFormatter.numberFormatOptions = {
                useGrouping: false,
                ...(numberingSystem && { numberingSystem }),
                ...(locale && { locale }),
            };
        }
        const formattedDay = numberStringFormatter.localize(String(this.day));
        const dayLabel = this.dateTimeFormat.format(this.value);
        return (h(Host, { key: '99367dbc5f33128ec7e60922a7ccb68f54362f78', "aria-label": dayLabel, "aria-selected": toAriaBoolean(this.active), id: dayId, onClick: this.onClick, onKeyDown: this.keyDownHandler, role: "button", tabIndex: this.active && !this.disabled ? 0 : -1 }, h(InteractiveContainer, { key: '50e5172f11d617e5e52aade2bb9fbdd7c46ccc60', disabled: this.disabled }, h("div", { key: 'cfb5af0dcdb9283e00d3220e3658c253fc8fdc05', "aria-hidden": "true", class: { "day-v-wrapper": true } }, h("div", { key: 'f1a85d642b0abdf35676fea5873c2ac4c92d451c', class: "day-wrapper" }, h("span", { key: '79daaedf22745c9d633b4461c5a28b828b6803ae', class: "day" }, h("span", { key: '14152896fce841cbe975eeabd5171024ae5133d3', class: "text" }, formattedDay)))))));
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    get el() { return getElement(this); }
};
DatePickerDay.style = CalciteDatePickerDayStyle0;

const datePickerMonthCss = ":host([hidden]){display:none}[hidden]{display:none}.calendar{margin-block-end:0.25rem}.week-headers{display:flex;border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px;padding-inline:0.25rem}.week-header{text-align:center;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-3);inline-size:14.2857142857%}.day{display:flex;min-inline-size:0px;justify-content:center;inline-size:100%}.day calcite-date-picker-day{inline-size:100%}:host([scale=s]) .week-header{padding-inline:0px;padding-block:0.5rem 0.75rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) .week-header{padding-inline:0px;padding-block:0.75rem 1rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=l]) .week-header{padding-inline:0px;padding-block:1rem 1.25rem;font-size:var(--calcite-font-size--1);line-height:1rem}.week-days{display:grid;grid-template-columns:repeat(7, 1fr);grid-auto-rows:1fr;padding-block:0;padding-inline:6px}.week-days:focus{outline:2px solid transparent;outline-offset:2px}";
const CalciteDatePickerMonthStyle0 = datePickerMonthCss;

const DAYS_PER_WEEK = 7;
const DAYS_MAXIMUM_INDEX = 6;
const DatePickerMonth = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
};
DatePickerMonth.style = CalciteDatePickerMonthStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    header: "header",
    month: "month",
    chevron: "chevron",
    suffix: "suffix",
    yearSuffix: "year--suffix",
    yearWrap: "year-wrap",
    textReverse: "text--reverse",
};
const ICON = {
    chevronLeft: "chevron-left",
    chevronRight: "chevron-right",
};

const datePickerMonthHeaderCss = ":host{display:block}.header{display:flex;justify-content:space-between;padding-block:0px;padding-inline:0.25rem}:host([scale=s]) .text{margin-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .chevron{block-size:2.25rem}:host([scale=m]) .text{margin-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .chevron{block-size:3rem}:host([scale=l]) .text{margin-block:1rem;font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .chevron{block-size:3.5rem}.chevron{margin-inline:-0.25rem;box-sizing:content-box;display:flex;flex-grow:0;cursor:pointer;align-items:center;justify-content:center;border-style:none;background-color:var(--calcite-color-foreground-1);padding-inline:0.25rem;color:var(--calcite-color-text-3);outline:2px solid transparent;outline-offset:2px;outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inline-size:14.2857142857%}.chevron:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.chevron:hover,.chevron:focus{background-color:var(--calcite-color-foreground-2);fill:var(--calcite-color-text-1);color:var(--calcite-color-text-1)}.chevron:active{background-color:var(--calcite-color-foreground-3)}.chevron[aria-disabled=true]{pointer-events:none;opacity:0}.text{margin-block:auto;display:flex;inline-size:100%;flex:1 1 auto;align-items:center;justify-content:center;text-align:center;line-height:1}.text--reverse{flex-direction:row-reverse}.month,.year,.suffix{margin-inline:0.25rem;margin-block:auto;display:inline-block;background-color:var(--calcite-color-foreground-1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;color:var(--calcite-color-text-1);font-size:inherit}.year{position:relative;inline-size:2.5rem;border-style:none;background-color:transparent;text-align:center;font-family:inherit;outline-color:transparent}.year:hover{transition-duration:100ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-property:outline-color;outline:2px solid var(--calcite-color-border-2);outline-offset:2px}.year:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.year--suffix{text-align:start}.year-wrap{position:relative}.suffix{inset-block-start:0px;white-space:nowrap;text-align:start;inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDatePickerMonthHeaderStyle0 = datePickerMonthHeaderCss;

const DatePickerMonthHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalDatePickerSelect = createEvent(this, "calciteInternalDatePickerSelect", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        /**
         * Increment year on UP/DOWN keys
         *
         * @param event
         */
        this.onYearKey = (event) => {
            const localizedYear = this.parseCalendarYear(event.target.value);
            switch (event.key) {
                case "ArrowDown":
                    event.preventDefault();
                    this.setYear({ localizedYear, offset: -1 });
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    this.setYear({ localizedYear, offset: 1 });
                    break;
            }
        };
        this.onYearChange = (event) => {
            this.setYear({
                localizedYear: this.parseCalendarYear(event.target.value),
            });
        };
        this.onYearInput = (event) => {
            this.setYear({
                localizedYear: this.parseCalendarYear(event.target.value),
                commit: false,
            });
        };
        this.prevMonthClick = (event) => {
            this.handleArrowClick(event, this.prevMonthDate);
        };
        this.prevMonthKeydown = (event) => {
            if (isActivationKey(event.key)) {
                this.prevMonthClick(event);
            }
        };
        this.nextMonthClick = (event) => {
            this.handleArrowClick(event, this.nextMonthDate);
        };
        this.nextMonthKeydown = (event) => {
            if (isActivationKey(event.key)) {
                this.nextMonthClick(event);
            }
        };
        /*
         * Update active month on clicks of left/right arrows
         */
        this.handleArrowClick = (event, date) => {
            event.preventDefault();
            this.calciteInternalDatePickerSelect.emit(date);
        };
        this.selectedDate = undefined;
        this.activeDate = undefined;
        this.headingLevel = undefined;
        this.min = undefined;
        this.max = undefined;
        this.scale = undefined;
        this.localeData = undefined;
        this.messages = undefined;
        this.nextMonthDate = undefined;
        this.prevMonthDate = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
    }
    connectedCallback() {
        this.setNextPrevMonthDates();
    }
    render() {
        return h("div", { key: '4943ff396e6db2ee2ba30f4994a75fb2d5afeda1', class: CSS.header }, this.renderContent());
    }
    renderContent() {
        const { messages, localeData, activeDate } = this;
        if (!activeDate || !localeData) {
            return null;
        }
        if (this.parentDatePickerEl) {
            const { numberingSystem, lang: locale } = this.parentDatePickerEl;
            numberStringFormatter.numberFormatOptions = {
                useGrouping: false,
                ...(numberingSystem && { numberingSystem }),
                ...(locale && { locale }),
            };
        }
        const activeMonth = activeDate.getMonth();
        const { months, unitOrder } = localeData;
        const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
        const localizedYear = this.formatCalendarYear(activeDate.getFullYear());
        const order = getOrder(unitOrder);
        const reverse = order.indexOf("y") < order.indexOf("m");
        const suffix = localeData.year?.suffix;
        return (h(Fragment, null, h("a", { "aria-disabled": `${this.prevMonthDate.getMonth() === activeMonth}`, "aria-label": messages.prevMonth, class: CSS.chevron, href: "#", onClick: this.prevMonthClick, onKeyDown: this.prevMonthKeydown, role: "button", tabindex: this.prevMonthDate.getMonth() === activeMonth ? -1 : 0 }, h("calcite-icon", { "flip-rtl": true, icon: ICON.chevronLeft, scale: getIconScale(this.scale) })), h("div", { class: { text: true, [CSS.textReverse]: reverse } }, h(Heading, { class: CSS.month, level: this.headingLevel }, localizedMonth), h("span", { class: CSS.yearWrap }, h("input", { "aria-label": messages.year, class: {
                year: true,
                [CSS.yearSuffix]: !!suffix,
            }, inputmode: "numeric", maxlength: "4", minlength: "1", onChange: this.onYearChange, onInput: this.onYearInput, onKeyDown: this.onYearKey, pattern: "\\d*", ref: (el) => (this.yearInput = el), type: "text", value: localizedYear }), suffix && h("span", { class: CSS.suffix }, suffix))), h("a", { "aria-disabled": `${this.nextMonthDate.getMonth() === activeMonth}`, "aria-label": messages.nextMonth, class: CSS.chevron, href: "#", onClick: this.nextMonthClick, onKeyDown: this.nextMonthKeydown, role: "button", tabindex: this.nextMonthDate.getMonth() === activeMonth ? -1 : 0 }, h("calcite-icon", { "flip-rtl": true, icon: ICON.chevronRight, scale: getIconScale(this.scale) }))));
    }
    setNextPrevMonthDates() {
        if (!this.activeDate) {
            return;
        }
        this.nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
        this.prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
    }
    formatCalendarYear(year) {
        return numberStringFormatter.localize(`${formatCalendarYear(year, this.localeData)}`);
    }
    parseCalendarYear(year) {
        return numberStringFormatter.localize(`${parseCalendarYear(Number(numberStringFormatter.delocalize(year)), this.localeData)}`);
    }
    getInRangeDate({ localizedYear, offset = 0, }) {
        const { min, max, activeDate } = this;
        const parsedYear = Number(numberStringFormatter.delocalize(localizedYear));
        const length = parsedYear.toString().length;
        const year = isNaN(parsedYear) ? false : parsedYear + offset;
        const inRange = year && (!min || min.getFullYear() <= year) && (!max || max.getFullYear() >= year);
        // if you've supplied a year and it's in range
        if (year && inRange && length === localizedYear.length) {
            const nextDate = new Date(activeDate);
            nextDate.setFullYear(year);
            return dateFromRange(nextDate, min, max);
        }
    }
    /**
     * Parse localized year string from input,
     * set to active if in range
     *
     * @param root0
     * @param root0.localizedYear
     * @param root0.commit
     * @param root0.offset
     */
    setYear({ localizedYear, commit = true, offset = 0, }) {
        const { yearInput, activeDate } = this;
        const inRangeDate = this.getInRangeDate({ localizedYear, offset });
        // if you've supplied a year and it's in range, update active date
        if (inRangeDate) {
            this.calciteInternalDatePickerSelect.emit(inRangeDate);
        }
        if (commit) {
            yearInput.value = this.formatCalendarYear((inRangeDate || activeDate).getFullYear());
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "min": ["setNextPrevMonthDates"],
        "max": ["setNextPrevMonthDates"],
        "activeDate": ["setNextPrevMonthDates"]
    }; }
};
DatePickerMonthHeader.style = CalciteDatePickerMonthHeaderStyle0;

export { DatePickerDay as calcite_date_picker_day, DatePickerMonth as calcite_date_picker_month, DatePickerMonthHeader as calcite_date_picker_month_header };
