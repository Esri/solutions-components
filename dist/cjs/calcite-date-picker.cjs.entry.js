/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const resources = require('./resources-e81ca10e.js');
const date = require('./date-e21b2052.js');
const locale = require('./locale-73cab8e8.js');
require('./key-55aca5c0.js');
require('./observers-5311faf8.js');
require('./dom-4a580af6.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

const datePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);background-color:var(--calcite-ui-foreground-1);vertical-align:top}:host([scale=s]){max-inline-size:216px}:host([scale=m]){max-inline-size:286px}:host([scale=l]){max-inline-size:398px}";

const DatePicker = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteDatePickerChange = index.createEvent(this, "calciteDatePickerChange", 6);
    this.calciteDatePickerRangeChange = index.createEvent(this, "calciteDatePickerRangeChange", 6);
    /**
     * Localized string for "previous month" (used for aria label)
     *
     * @default "Previous month"
     */
    this.intlPrevMonth = resources.TEXT.prevMonth;
    /**
     * Localized string for "next month" (used for aria label)
     *
     * @default "Next month"
     */
    this.intlNextMonth = resources.TEXT.nextMonth;
    /**
     * Localized string for "year" (used for aria label)
     *
     * @default "Year"
     */
    this.intlYear = resources.TEXT.year;
    /** specify the scale of the date picker */
    this.scale = "m";
    /** Range mode activation */
    this.range = false;
    /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
    this.proximitySelectionDisabled = false;
    this.globalAttributes = {};
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.effectiveLocale = "";
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
      if (!this.startAsDate) {
        this.hoverRange = undefined;
        return;
      }
      const date$1 = new Date(event.detail);
      this.hoverRange = {
        focused: this.activeRange || "start",
        start: this.startAsDate,
        end: this.endAsDate
      };
      if (!this.proximitySelectionDisabled) {
        if (this.endAsDate) {
          const startDiff = date.getDaysDiff(date$1, this.startAsDate);
          const endDiff = date.getDaysDiff(date$1, this.endAsDate);
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
          if (date$1 < this.startAsDate) {
            this.hoverRange = {
              focused: "start",
              start: date$1,
              end: this.startAsDate
            };
          }
          else {
            this.hoverRange.end = date$1;
            this.hoverRange.focused = "end";
          }
        }
      }
      else {
        if (!this.endAsDate) {
          if (date$1 < this.startAsDate) {
            this.hoverRange = {
              focused: "start",
              start: date$1,
              end: this.startAsDate
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
      var _a, _b, _c, _d, _e, _f;
      if (!Array.isArray(this.valueAsDate) &&
        this.valueAsDate &&
        ((_a = this.valueAsDate) === null || _a === void 0 ? void 0 : _a.getTime()) !== ((_b = this.activeDate) === null || _b === void 0 ? void 0 : _b.getTime())) {
        this.activeDate = new Date(this.valueAsDate);
      }
      if (this.startAsDate && ((_c = this.startAsDate) === null || _c === void 0 ? void 0 : _c.getTime()) !== ((_d = this.activeStartDate) === null || _d === void 0 ? void 0 : _d.getTime())) {
        this.activeStartDate = new Date(this.startAsDate);
      }
      if (this.endAsDate && ((_e = this.endAsDate) === null || _e === void 0 ? void 0 : _e.getTime()) !== ((_f = this.activeEndDate) === null || _f === void 0 ? void 0 : _f.getTime())) {
        this.activeEndDate = new Date(this.endAsDate);
      }
    };
    /**
     * Event handler for when the selected date changes
     *
     * @param event
     */
    this.monthDateChange = (event) => {
      const date$1 = new Date(event.detail);
      if (!this.range) {
        this.value = date$1 ? date.dateToISO(date$1) : "";
        this.valueAsDate = date$1 || null;
        this.activeDate = date$1 || null;
        this.calciteDatePickerChange.emit(date$1);
        return;
      }
      if (!this.startAsDate || (!this.endAsDate && date$1 < this.startAsDate)) {
        if (this.startAsDate) {
          this.setEndDate(new Date(this.startAsDate));
        }
        if (this.activeRange == "end") {
          this.setEndDate(date$1);
        }
        else {
          this.setStartDate(date$1);
        }
      }
      else if (!this.endAsDate) {
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
            const startDiff = date.getDaysDiff(date$1, this.startAsDate);
            const endDiff = date.getDaysDiff(date$1, this.endAsDate);
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
          this.endAsDate = this.activeEndDate = this.end = undefined;
        }
      }
      this.calciteDatePickerChange.emit(date$1);
    };
  }
  handleValueAsDate(date) {
    if (!Array.isArray(date) && date && date !== this.activeDate) {
      this.activeDate = date;
    }
  }
  handleRangeChange() {
    const { startAsDate: startDate, endAsDate: endDate } = this;
    this.activeEndDate = endDate;
    this.activeStartDate = startDate;
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
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    locale.connectLocalized(this);
    if (Array.isArray(this.value)) {
      this.valueAsDate = resources.getValueAsDateRange(this.value);
      this.start = this.value[0];
      this.end = this.value[1];
    }
    else if (this.value) {
      this.valueAsDate = date.dateFromISO(this.value);
    }
    if (this.start) {
      this.setStartAsDate(date.dateFromISO(this.start));
    }
    if (this.end) {
      this.setEndAsDate(date.dateFromISO(this.end));
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
  }
  async componentWillLoad() {
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }
  render() {
    var _a;
    const date$1 = date.dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const activeStartDate = this.range
      ? this.getActiveStartDate(date$1, this.minAsDate, this.maxAsDate)
      : this.getActiveDate(date$1, this.minAsDate, this.maxAsDate);
    let activeDate = activeStartDate;
    const endDate = this.range
      ? date.dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
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
  valueHandler(value) {
    if (Array.isArray(value)) {
      this.valueAsDate = resources.getValueAsDateRange(value);
      this.start = value[0];
      this.end = value[1];
    }
    else if (value) {
      this.valueAsDate = date.dateFromISO(value);
      this.start = "";
      this.end = "";
    }
  }
  startWatcher(start) {
    this.setStartAsDate(date.dateFromISO(start));
  }
  endWatcher(end) {
    this.setEndAsDate(date.dateFromISO(end));
  }
  async loadLocaleData() {
    locale.numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
    this.localeData = await resources.getLocaleData(this.effectiveLocale);
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
      index.h("calcite-date-picker-month-header", { activeDate: activeDate, headingLevel: this.headingLevel || resources.HEADING_LEVEL, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, intlYear: this.intlYear, localeData: this.localeData, max: maxDate, min: minDate, onCalciteDatePickerSelect: this.monthHeaderSelectChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date || new Date() }),
      index.h("calcite-date-picker-month", { activeDate: activeDate, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteDatePickerSelect: this.monthDateChange, onCalciteInternalDatePickerHover: this.monthHoverChange, onCalciteInternalDatePickerMouseOut: this.monthMouseOutChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date, startDate: this.range ? date : undefined })
    ]);
  }
  /**
   * Update date instance of start if valid
   *
   * @param startDate
   * @param emit
   */
  setStartAsDate(startDate, emit) {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate,
        endDate: this.endAsDate
      });
    }
  }
  /**
   * Update date instance of end if valid
   *
   * @param endDate
   * @param emit
   */
  setEndAsDate(endDate, emit) {
    this.endAsDate = endDate ? date.setEndOfDay(endDate) : endDate;
    this.mostRecentRangeValue = this.endAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate: this.startAsDate,
        endDate
      });
    }
  }
  setEndDate(date$1) {
    this.end = date$1 ? date.dateToISO(date$1) : "";
    this.setEndAsDate(date$1, true);
    this.activeEndDate = date$1 || null;
  }
  setStartDate(date$1) {
    this.start = date$1 ? date.dateToISO(date$1) : "";
    this.setStartAsDate(date$1, true);
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
  getActiveStartDate(value, min, max) {
    return (date.dateFromRange(this.activeStartDate, min, max) || value || date.dateFromRange(new Date(), min, max));
  }
  getActiveEndDate(value, min, max) {
    return (date.dateFromRange(this.activeEndDate, min, max) || value || date.dateFromRange(new Date(), min, max));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "valueAsDate": ["handleValueAsDate"],
    "startAsDate": ["handleRangeChange"],
    "endAsDate": ["handleRangeChange"],
    "min": ["onMinChanged"],
    "max": ["onMaxChanged"],
    "value": ["valueHandler"],
    "start": ["startWatcher"],
    "end": ["endWatcher"],
    "effectiveLocale": ["loadLocaleData"]
  }; }
};
DatePicker.style = datePickerCss;

exports.calcite_date_picker = DatePicker;

//# sourceMappingURL=calcite-date-picker.cjs.entry.js.map