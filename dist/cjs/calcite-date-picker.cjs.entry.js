/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const date = require('./date-44859d62.js');
const loadable = require('./loadable-c64a459b.js');
const locale = require('./locale-e2cae6e8.js');
const t9n = require('./t9n-4664a8db.js');
const utils = require('./utils-0b3ef38d.js');
require('./dom-24094fab.js');
require('./guid-c58d5ead.js');
require('./resources-1f836572.js');
require('./key-d55baa11.js');
require('./observers-b0934d2a.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.2.0
 */
const HEADING_LEVEL = 2;

const datePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1);vertical-align:top}:host([scale=s]){max-inline-size:216px}:host([scale=m]){max-inline-size:286px}:host([scale=l]){max-inline-size:398px}";

const DatePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteDatePickerChange = index.createEvent(this, "calciteDatePickerChange", 6);
    this.calciteDatePickerRangeChange = index.createEvent(this, "calciteDatePickerRangeChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyDownHandler = (event) => {
      if (event.key === "Escape") {
        this.reset();
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
      const date$1 = new Date(event.detail);
      this.hoverRange = {
        focused: this.activeRange || "start",
        start,
        end
      };
      if (!this.proximitySelectionDisabled) {
        if (end) {
          const startDiff = date.getDaysDiff(date$1, start);
          const endDiff = date.getDaysDiff(date$1, end);
          if (endDiff > 0) {
            this.hoverRange.end = date$1;
            this.hoverRange.focused = "end";
          }
          else if (startDiff < 0) {
            this.hoverRange.start = date$1;
            this.hoverRange.focused = "start";
          }
          else if (startDiff > endDiff) {
            this.hoverRange.start = date$1;
            this.hoverRange.focused = "start";
          }
          else {
            this.hoverRange.end = date$1;
            this.hoverRange.focused = "end";
          }
        }
        else {
          if (start) {
            if (date$1 < start) {
              this.hoverRange = {
                focused: "start",
                start: date$1,
                end: start
              };
            }
            else {
              this.hoverRange.end = date$1;
              this.hoverRange.focused = "end";
            }
          }
        }
      }
      else {
        if (!end) {
          if (date$1 < start) {
            this.hoverRange = {
              focused: "start",
              start: date$1,
              end: start
            };
          }
          else {
            this.hoverRange.end = date$1;
            this.hoverRange.focused = "end";
          }
        }
        else {
          this.hoverRange = undefined;
        }
      }
      event.stopPropagation();
    };
    this.monthMouseOutChange = () => {
      if (this.hoverRange) {
        this.hoverRange = undefined;
      }
    };
    /**
     * Reset active date and close
     */
    this.reset = () => {
      var _a, _b, _c, _d, _e;
      const { valueAsDate } = this;
      if (!Array.isArray(valueAsDate) &&
        valueAsDate &&
        (valueAsDate === null || valueAsDate === void 0 ? void 0 : valueAsDate.getTime()) !== ((_a = this.activeDate) === null || _a === void 0 ? void 0 : _a.getTime())) {
        this.activeDate = new Date(valueAsDate);
      }
      if (Array.isArray(valueAsDate)) {
        if (valueAsDate[0] &&
          ((_b = valueAsDate[0]) === null || _b === void 0 ? void 0 : _b.getTime()) !==
            (this.activeStartDate instanceof Date && ((_c = this.activeStartDate) === null || _c === void 0 ? void 0 : _c.getTime()))) {
          this.activeStartDate = new Date(valueAsDate[0]);
        }
        if (valueAsDate[1] &&
          ((_d = valueAsDate[1]) === null || _d === void 0 ? void 0 : _d.getTime()) !==
            (this.activeStartDate instanceof Date && ((_e = this.activeEndDate) === null || _e === void 0 ? void 0 : _e.getTime()))) {
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
      const date$1 = new Date(event.detail);
      const isoDate = date.dateToISO(date$1);
      if (!this.range && isoDate === date.dateToISO(this.valueAsDate)) {
        return;
      }
      if (!this.range) {
        this.value = isoDate || "";
        this.valueAsDate = date$1 || null;
        this.activeDate = date$1 || null;
        this.calciteDatePickerChange.emit();
        return;
      }
      const start = this.getStartDate();
      const end = this.getEndDate();
      if (!start || (!end && date$1 < start)) {
        if (start) {
          this.setEndDate(new Date(start));
        }
        if (this.activeRange == "end") {
          this.setEndDate(date$1);
        }
        else {
          this.setStartDate(date$1);
        }
      }
      else if (!end) {
        this.setEndDate(date$1);
      }
      else {
        if (!this.proximitySelectionDisabled) {
          if (this.activeRange) {
            if (this.activeRange == "end") {
              this.setEndDate(date$1);
            }
            else {
              this.setStartDate(date$1);
            }
          }
          else {
            const startDiff = date.getDaysDiff(date$1, start);
            const endDiff = date.getDaysDiff(date$1, end);
            if (endDiff === 0 || startDiff < 0) {
              this.setStartDate(date$1);
            }
            else if (startDiff === 0 || endDiff < 0) {
              this.setEndDate(date$1);
            }
            else if (startDiff < endDiff) {
              this.setStartDate(date$1);
            }
            else {
              this.setEndDate(date$1);
            }
          }
        }
        else {
          this.setStartDate(date$1);
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
    this.activeStartDate = undefined;
    this.activeEndDate = undefined;
    this.startAsDate = undefined;
    this.endAsDate = undefined;
    this.effectiveLocale = "";
    this.defaultMessages = undefined;
    this.localeData = undefined;
    this.hoverRange = undefined;
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
    if (min) {
      this.minAsDate = date.dateFromISO(min);
    }
  }
  onMaxChanged(max) {
    if (max) {
      this.maxAsDate = date.dateFromISO(max);
    }
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
    await loadable.componentLoaded(this);
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    locale.connectLocalized(this);
    t9n.connectMessages(this);
    if (Array.isArray(this.value)) {
      this.valueAsDate = utils.getValueAsDateRange(this.value);
    }
    else if (this.value) {
      this.valueAsDate = date.dateFromISO(this.value);
    }
    if (this.min) {
      this.minAsDate = date.dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = date.dateFromISO(this.max);
    }
  }
  disconnectedCallback() {
    locale.disconnectLocalized(this);
    t9n.disconnectMessages(this);
  }
  async componentWillLoad() {
    loadable.setUpLoadableComponent(this);
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
    await t9n.setUpMessages(this);
  }
  componentDidLoad() {
    loadable.setComponentLoaded(this);
  }
  render() {
    var _a;
    const date$1 = date.dateFromRange(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate);
    let activeDate = this.getActiveDate(date$1, this.minAsDate, this.maxAsDate);
    const endDate = this.range && Array.isArray(this.valueAsDate)
      ? date.dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
      : null;
    const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
    if ((this.activeRange === "end" ||
      (((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.focused) === "end" && (!this.proximitySelectionDisabled || endDate))) &&
      activeEndDate) {
      activeDate = activeEndDate;
    }
    if (this.range && this.mostRecentRangeValue) {
      activeDate = this.mostRecentRangeValue;
    }
    const minDate = this.range && this.activeRange
      ? this.activeRange === "start"
        ? this.minAsDate
        : date$1 || this.minAsDate
      : this.minAsDate;
    const maxDate = this.range && this.activeRange
      ? this.activeRange === "start"
        ? endDate || this.maxAsDate
        : this.maxAsDate
      : this.maxAsDate;
    return (index.h(index.Host, { onBlur: this.reset, onKeyDown: this.keyDownHandler, role: "application" }, this.renderCalendar(activeDate, maxDate, minDate, date$1, endDate)));
  }
  effectiveLocaleChange() {
    t9n.updateMessages(this, this.effectiveLocale);
  }
  valueHandler(value) {
    if (Array.isArray(value)) {
      this.valueAsDate = utils.getValueAsDateRange(value);
    }
    else if (value) {
      this.valueAsDate = date.dateFromISO(value);
    }
  }
  async loadLocaleData() {
    locale.numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
    this.localeData = await utils.getLocaleData(this.effectiveLocale);
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
      index.h("calcite-date-picker-month-header", { activeDate: activeDate, headingLevel: this.headingLevel || HEADING_LEVEL, localeData: this.localeData, max: maxDate, messages: this.messages, min: minDate, onCalciteInternalDatePickerSelect: this.monthHeaderSelectChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date || new Date() }),
      index.h("calcite-date-picker-month", { activeDate: activeDate, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteInternalDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteInternalDatePickerHover: this.monthHoverChange, onCalciteInternalDatePickerMouseOut: this.monthMouseOutChange, onCalciteInternalDatePickerSelect: this.monthDateChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date, startDate: this.range ? date : undefined })
    ]);
  }
  getEndDate() {
    return (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined;
  }
  setEndDate(date$1) {
    const startDate = this.getStartDate();
    const newEndDate = date$1 ? date.setEndOfDay(date$1) : date$1;
    this.value = [date.dateToISO(startDate), date.dateToISO(date$1)];
    this.valueAsDate = [startDate, date$1];
    this.mostRecentRangeValue = newEndDate;
    this.calciteDatePickerRangeChange.emit();
    this.activeEndDate = date$1 || null;
  }
  getStartDate() {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
  }
  setStartDate(date$1) {
    const endDate = this.getEndDate();
    this.value = [date.dateToISO(date$1), date.dateToISO(endDate)];
    this.valueAsDate = [date$1, endDate];
    this.mostRecentRangeValue = date$1;
    this.calciteDatePickerRangeChange.emit();
    this.activeStartDate = date$1 || null;
  }
  /**
   * Get an active date using the value, or current date as default
   *
   * @param value
   * @param min
   * @param max
   */
  getActiveDate(value, min, max) {
    return date.dateFromRange(this.activeDate, min, max) || value || date.dateFromRange(new Date(), min, max);
  }
  getActiveEndDate(value, min, max) {
    return (date.dateFromRange(this.activeEndDate, min, max) || value || date.dateFromRange(new Date(), min, max));
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "activeDate": ["activeDateWatcher"],
    "valueAsDate": ["valueAsDateWatcher"],
    "min": ["onMinChanged"],
    "max": ["onMaxChanged"],
    "messageOverrides": ["onMessagesChange"],
    "effectiveLocale": ["effectiveLocaleChange", "loadLocaleData"],
    "value": ["valueHandler"]
  }; }
};
DatePicker.style = datePickerCss;

exports.calcite_date_picker = DatePicker;
