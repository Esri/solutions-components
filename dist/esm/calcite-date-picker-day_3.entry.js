/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement, F as Fragment } from './index-c246d90e.js';
import { c as closestElementCrossShadowBoundary, b as getElementDir } from './dom-3bdc69ee.js';
import { C as CSS_UTILITY } from './resources-436ae282.js';
import { u as updateHostInteraction } from './interactive-822ffed6.js';
import { i as isActivationKey } from './key-acb660e7.js';
import { n as numberStringFormatter } from './locale-9dd0777b.js';
import { c as sameDate, b as dateFromRange, i as inRange, e as getOrder, n as nextMonth, f as prevMonth } from './date-03618c4c.js';
import { H as Heading } from './Heading-34ddc076.js';
import './guid-15fce7c0.js';
import './observers-31601001.js';

const datePickerDayCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex;min-inline-size:0px;cursor:pointer;justify-content:center;color:var(--calcite-ui-text-3);inline-size:14.2857142857%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.day-v-wrapper{flex:1 1 auto}.day-wrapper{display:flex;flex-direction:column;align-items:center}.day{display:flex;align-items:center;justify-content:center;border-radius:9999px;font-size:var(--calcite-font-size--2);line-height:1rem;line-height:1;color:var(--calcite-ui-text-3);opacity:var(--calcite-ui-opacity-disabled);outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;background:none;box-shadow:0 0 0 2px transparent}.text{margin-block:1px 0px;-webkit-margin-start:0px;margin-inline-start:0px}:host([scale=s]) .day-v-wrapper{padding-block:0.125rem}:host([scale=s]) .day-wrapper{padding:0px}:host([scale=s]) .day{block-size:27px;inline-size:27px;font-size:var(--calcite-font-size--2)}:host([scale=m]) .day-v-wrapper{padding-block:0.25rem}:host([scale=m]) .day-wrapper{padding-inline:0.25rem}:host([scale=m]) .day{block-size:33px;inline-size:33px;font-size:var(--calcite-font-size--1)}:host([scale=l]) .day-v-wrapper{padding-block:0.25rem}:host([scale=l]) .day-wrapper{padding-inline:0.25rem}:host([scale=l]) .day{block-size:43px;inline-size:43px;font-size:var(--calcite-font-size-0)}:host([current-month]) .day{opacity:1}:host(:hover:not([disabled])) .day,:host([active]:not([range])) .day{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:focus),:host([active]){outline:2px solid transparent;outline-offset:2px}:host(:focus:not([disabled])) .day{outline:2px solid var(--calcite-ui-brand);outline-offset:2px;box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host([selected]) .day{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-ui-brand) !important;color:var(--calcite-ui-foreground-1) !important}:host([range][selected]) .day-wrapper{background-color:var(--calcite-ui-foreground-current)}:host([start-of-range]) .day-wrapper{border-start-start-radius:40%;border-end-start-radius:40%}:host([end-of-range]) .day-wrapper{border-start-end-radius:40%;border-end-end-radius:40%}:host([start-of-range]) :not(.calcite--rtl) .day-wrapper{box-shadow:inset 4px 0 var(--calcite-ui-foreground-1)}:host([start-of-range]) .calcite--rtl .day-wrapper{box-shadow:inset -4px 0 var(--calcite-ui-foreground-1)}:host([start-of-range]) .day{opacity:1}:host([end-of-range]) :not(.calcite--rtl) .day-wrapper{box-shadow:inset -4px 0 var(--calcite-ui-foreground-1)}:host([end-of-range]) .calcite--rtl .day-wrapper{box-shadow:inset 4px 0 var(--calcite-ui-foreground-1)}:host([end-of-range]) .day{opacity:1}:host([start-of-range]:not(:focus)) :not(.calcite--rtl) .day{box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host([start-of-range]:not(:focus)) .calcite--rtl .day{box-shadow:0 0 0 -2px var(--calcite-ui-foreground-1)}:host([end-of-range]:not(:focus)) :not(.calcite--rtl) .day{box-shadow:0 0 0 -2px var(--calcite-ui-foreground-1)}:host([end-of-range]:not(:focus)) .calcite--rtl .day{box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host([start-of-range][scale=l]) :not(.calcite--rtl) .day-wrapper{box-shadow:inset 8px 0 var(--calcite-ui-foreground-1)}:host([start-of-range][scale=l]) .calcite--rtl .day-wrapper{box-shadow:inset -8px 0 var(--calcite-ui-foreground-1)}:host([end-of-range][scale=l]) :not(.calcite--rtl) .day-wrapper{box-shadow:inset -8px 0 var(--calcite-ui-foreground-1)}:host([end-of-range][scale=l]) .calcite--rtl .day-wrapper{box-shadow:inset 8px 0 var(--calcite-ui-foreground-1)}:host([highlighted]) .day-wrapper{background-color:var(--calcite-ui-foreground-current)}:host([highlighted]) .day-wrapper .day{color:var(--calcite-ui-text-1)}:host([highlighted]:not([active]:focus)) .day{border-radius:0px;color:var(--calcite-ui-text-1)}:host([range-hover]:not([selected])) .day-wrapper{background-color:var(--calcite-ui-foreground-2)}:host([range-hover]:not([selected])) .day{border-radius:0px}:host([start-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper{background-image:linear-gradient(to left, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2));border-radius:0px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([start-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2));border-radius:0px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([end-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2));border-radius:0px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([end-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:linear-gradient(to left, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2));border-radius:0px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host(:hover[end-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper,:host(:hover[start-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1));border-radius:0px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host(:hover[start-of-range][range-hover]) :not(.calcite--rtl) .day-wrapper,:host(:hover[end-of-range][range-hover]) .calcite--rtl .day-wrapper{background-image:linear-gradient(to left, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1));border-radius:0px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host(:hover[range-hover]:not([selected]).focused--start) :not(.calcite--rtl) .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2))}:host(:hover[range-hover]:not([selected]).focused--start) .calcite--rtl .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current))}:host(:hover[range-hover]:not([selected]).focused--start) .day{border-radius:9999px;opacity:1;box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[range-hover]:not([selected]).focused--end) :not(.calcite--rtl) .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current))}:host(:hover[range-hover]:not([selected]).focused--end) .calcite--rtl .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-current), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2))}:host(:hover[range-hover]:not([selected]).focused--end) .day{border-radius:9999px;opacity:1;box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) :not(.calcite--rtl) .day-wrapper,:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) .calcite--rtl .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2))}:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) :not(.calcite--rtl) .day,:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) .calcite--rtl .day{border-radius:9999px;opacity:1;box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) :not(.calcite--rtl) .day-wrapper,:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) .calcite--rtl .day-wrapper{background-image:linear-gradient(to right, var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-2), var(--calcite-ui-foreground-1), var(--calcite-ui-foreground-1))}:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) :not(.calcite--rtl) .day,:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) .calcite--rtl .day{border-radius:9999px;opacity:1;box-shadow:0 0 0 2px var(--calcite-ui-foreground-1)}:host(:hover[start-of-range].hover--inside-range.focused--end) .day-wrapper,:host(:hover[end-of-range].hover--inside-range.focused--start) .day-wrapper{background-image:none}:host([start-of-range].hover--inside-range.focused--end) .day-wrapper,:host([end-of-range].hover--inside-range.focused--start) .day-wrapper{background-color:var(--calcite-ui-foreground-2)}:host([highlighted]:last-child) :not(.calcite--rtl) .day-wrapper,:host([range-hover]:last-child) :not(.calcite--rtl) .day-wrapper,:host([highlighted]:first-child) .calcite--rtl .day-wrapper,:host([range-hover]:first-child) .calcite--rtl .day-wrapper{box-shadow:inset -4px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([highlighted]:first-child) :not(.calcite--rtl) .day-wrapper,:host([range-hover]:first-child) :not(.calcite--rtl) .day-wrapper,:host([highlighted]:last-child) .calcite--rtl .day-wrapper,:host([range-hover]:last-child) .calcite--rtl .day-wrapper{box-shadow:inset 4px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=s][highlighted]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][range-hover]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][highlighted]:first-child) .calcite--rtl .day-wrapper,:host([scale=s][range-hover]:first-child) .calcite--rtl .day-wrapper{box-shadow:inset -1px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=s][highlighted]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][range-hover]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=s][highlighted]:last-child) .calcite--rtl .day-wrapper,:host([scale=s][range-hover]:last-child) .calcite--rtl .day-wrapper{box-shadow:inset 1px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([scale=l][highlighted]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][range-hover]:first-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][highlighted]:last-child) .calcite--rtl .day-wrapper,:host([scale=l][range-hover]:last-child) .calcite--rtl .day-wrapper{box-shadow:inset 6px 0px 0px 0px var(--calcite-ui-foreground-1)}:host([highlighted]:first-child) .day-wrapper,:host([range-hover]:first-child) .day-wrapper{border-start-start-radius:45%;border-end-start-radius:45%}:host([highlighted]:last-child) .day-wrapper,:host([range-hover]:last-child) .day-wrapper{border-start-end-radius:45%;border-end-end-radius:45%}:host([scale=l][highlighted]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][range-hover]:last-child) :not(.calcite--rtl) .day-wrapper,:host([scale=l][highlighted]:first-child) .calcite--rtl .day-wrapper,:host([scale=l][range-hover]:first-child) .calcite--rtl .day-wrapper{box-shadow:inset -6px 0px 0px 0px var(--calcite-ui-foreground-1)}@media (forced-colors: active){:host(:hover:not([disabled])) .day,:host([active]:not([range])) .day{border-radius:0px}:host([selected]){outline:2px solid canvasText}:host([selected]) .day{border-radius:0px;background-color:highlight}:host([range][selected]) .day-wrapper,:host([highlighted]) .day-wrapper,:host([range-hover]:not([selected])) .day-wrapper{background-color:highlight}:host([range][selected][start-of-range]) .day-wrapper,:host([range][selected][end-of-range]) .day-wrapper{background-color:canvas}}";

const DatePickerDay = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDaySelect = createEvent(this, "calciteDaySelect", 6);
    this.calciteInternalDayHover = createEvent(this, "calciteInternalDayHover", 6);
    /** Date is outside of range and can't be selected */
    this.disabled = false;
    /** Date is in the current month. */
    this.currentMonth = false;
    /** Date is the current selected date of the picker */
    this.selected = false;
    /** Date is currently highlighted as part of the range */
    this.highlighted = false;
    /** Showing date range */
    this.range = false;
    /** Date is the start of date range */
    this.startOfRange = false;
    /** Date is the end of date range */
    this.endOfRange = false;
    /** Date is being hovered and within the set range */
    this.rangeHover = false;
    /** Date is actively in focus for keyboard navigation */
    this.active = false;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.onClick = () => {
      !this.disabled && this.calciteDaySelect.emit();
    };
    this.keyDownHandler = (event) => {
      if (isActivationKey(event.key)) {
        !this.disabled && this.calciteDaySelect.emit();
        event.preventDefault();
      }
    };
  }
  mouseoverHandler() {
    this.calciteInternalDayHover.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
  }
  render() {
    if (this.parentDatePickerEl) {
      const { numberingSystem, lang: locale } = this.parentDatePickerEl;
      numberStringFormatter.numberFormatOptions = Object.assign(Object.assign({ useGrouping: false }, (numberingSystem && { numberingSystem })), (locale && { locale }));
    }
    const formattedDay = numberStringFormatter.localize(String(this.day));
    const dir = getElementDir(this.el);
    return (h(Host, { onClick: this.onClick, onKeyDown: this.keyDownHandler, role: "gridcell" }, h("div", { class: { "day-v-wrapper": true, [CSS_UTILITY.rtl]: dir === "rtl" } }, h("div", { class: "day-wrapper" }, h("span", { class: "day" }, h("span", { class: "text" }, formattedDay))))));
  }
  componentDidRender() {
    updateHostInteraction(this, this.isTabbable);
  }
  isTabbable() {
    return this.active;
  }
  get el() { return getElement(this); }
};
DatePickerDay.style = datePickerDayCss;

const datePickerMonthCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}.calender{-webkit-margin-after:0.25rem;margin-block-end:0.25rem}.week-headers{display:flex;border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);padding-block:0px;padding-inline:0.25rem}.week-header{text-align:center;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-ui-text-3);inline-size:14.2857142857%}:host([scale=s]) .week-header{padding-inline:0px;padding-block:0.5rem 0.75rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) .week-header{padding-inline:0px;padding-block:0.75rem 1rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=l]) .week-header{padding-inline:0px;padding-block:1rem 1.25rem;font-size:var(--calcite-font-size--1);line-height:1rem}.week-days{display:flex;flex-direction:row;padding-block:0px;padding-inline:6px}.week-days:focus{outline:2px solid transparent;outline-offset:2px}";

const DatePickerMonth = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerSelect = createEvent(this, "calciteDatePickerSelect", 6);
    this.calciteInternalDatePickerHover = createEvent(this, "calciteInternalDatePickerHover", 6);
    this.calciteDatePickerActiveDateChange = createEvent(this, "calciteDatePickerActiveDateChange", 6);
    this.calciteInternalDatePickerMouseOut = createEvent(this, "calciteInternalDatePickerMouseOut", 6);
    /** Date currently active.*/
    this.activeDate = new Date();
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
      this.calciteDatePickerSelect.emit(target.value);
    };
  }
  mouseoutHandler() {
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
    const prevMonDays = this.getPrevMonthdays(month, year, startOfWeek);
    const nextMonDays = this.getNextMonthDays(month, year, startOfWeek);
    const days = [
      ...prevMonDays.map((day) => {
        const date = new Date(year, month - 1, day);
        return this.renderDateDay(false, day, date);
      }),
      ...curMonDays.map((day) => {
        const date = new Date(year, month, day);
        const active = sameDate(date, this.activeDate);
        return this.renderDateDay(active, day, date, true, true);
      }),
      ...nextMonDays.map((day) => {
        const date = new Date(year, month + 1, day);
        return this.renderDateDay(false, day, date);
      })
    ];
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return (h(Host, { onFocusOut: this.disableActiveFocus, onKeyDown: this.keyDownHandler }, h("div", { class: "calender", role: "grid" }, h("div", { class: "week-headers", role: "row" }, adjustedWeekDays.map((weekday) => (h("span", { class: "week-header", role: "columnheader" }, weekday)))), weeks.map((days) => (h("div", { class: "week-days", role: "row" }, days))))));
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
    this.calciteDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
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
    this.calciteDatePickerActiveDateChange.emit(dateFromRange(nextDate, this.min, this.max));
    this.activeFocus = true;
  }
  /**
   * Get dates for last days of the previous month
   *
   * @param month
   * @param year
   * @param startOfWeek
   */
  getPrevMonthdays(month, year, startOfWeek) {
    const lastDate = new Date(year, month, 0);
    const date = lastDate.getDate();
    const day = lastDate.getDay();
    const days = [];
    if (day - 6 === startOfWeek) {
      return days;
    }
    for (let i = lastDate.getDay() - startOfWeek; i >= 0; i--) {
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
    if (endDay === (startOfWeek + 6) % 7) {
      return days;
    }
    for (let i = 0; i < (6 - (endDay - startOfWeek)) % 7; i++) {
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
   * @param active
   * @param day
   * @param date
   * @param currentMonth
   * @param ref
   */
  renderDateDay(active, day, date, currentMonth, ref) {
    var _a;
    const isFocusedOnStart = this.isFocusedOnStart();
    const isHoverInRange = this.isHoverInRange() ||
      (!this.endDate && this.hoverRange && sameDate((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.end, this.startDate));
    return (h("calcite-date-picker-day", { active: active, class: {
        "hover--inside-range": this.startDate && isHoverInRange,
        "hover--outside-range": this.startDate && !isHoverInRange,
        "focused--start": isFocusedOnStart,
        "focused--end": !isFocusedOnStart
      }, currentMonth: currentMonth, day: day, disabled: !inRange(date, this.min, this.max), endOfRange: this.isEndOfRange(date), highlighted: this.betweenSelectedRange(date), key: date.toDateString(), onCalciteDaySelect: this.daySelect, onCalciteInternalDayHover: this.dayHover, range: !!this.startDate && !!this.endDate && !sameDate(this.startDate, this.endDate), rangeHover: this.isRangeHover(date), ref: (el) => {
        // when moving via keyboard, focus must be updated on active date
        if (ref && active && this.activeFocus) {
          el === null || el === void 0 ? void 0 : el.focus();
        }
      }, scale: this.scale, selected: this.isSelected(date), startOfRange: this.isStartOfRange(date), value: date }));
  }
  isFocusedOnStart() {
    var _a;
    return ((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.focused) === "start";
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
          (date < this.startDate || (this.endDate && sameDate(date, this.startDate))) &&
          (date > start || sameDate(date, start))));
    return cond1 || cond2;
  }
  get el() { return getElement(this); }
};
DatePickerMonth.style = datePickerMonthCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const BUDDHIST_CALENDAR_YEAR_OFFSET = 543;

const datePickerMonthHeaderCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block}.header{display:flex;justify-content:space-between;padding-block:0px;padding-inline:0.25rem}:host([scale=s]) .text{margin-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .chevron{block-size:2.25rem}:host([scale=m]) .text{margin-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .chevron{block-size:3rem}:host([scale=l]) .text{margin-block:1rem;font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .chevron{block-size:3.5rem}.chevron{margin-inline:-0.25rem;box-sizing:content-box;display:flex;flex-grow:0;cursor:pointer;align-items:center;justify-content:center;border-style:none;background-color:var(--calcite-ui-foreground-1);padding-inline:0.25rem;color:var(--calcite-ui-text-3);outline:2px solid transparent;outline-offset:2px;outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inline-size:14.2857142857%}.chevron:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.chevron:hover,.chevron:focus{background-color:var(--calcite-ui-foreground-2);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1)}.chevron:active{background-color:var(--calcite-ui-foreground-3)}.chevron[aria-disabled=true]{pointer-events:none;opacity:0}.text{margin-block:auto;display:flex;inline-size:100%;flex:1 1 auto;align-items:center;justify-content:center;text-align:center;line-height:1}.text--reverse{flex-direction:row-reverse}.month,.year,.suffix{margin-inline:0.25rem;margin-block:auto;display:inline-block;background-color:var(--calcite-ui-foreground-1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;color:var(--calcite-ui-text-1);font-size:inherit}.year{position:relative;inline-size:2.5rem;border-style:none;background-color:transparent;text-align:center;font-family:inherit;outline-color:transparent}.year:hover{transition-duration:100ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-property:outline-color;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}.year:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.year--suffix{text-align:start}.year-wrap{position:relative}.suffix{inset-block-start:0px;white-space:nowrap;text-align:start;inset-inline-start:0}";

const DatePickerMonthHeader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerSelect = createEvent(this, "calciteDatePickerSelect", 6);
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.globalAttributes = {};
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
        localizedYear: this.parseCalendarYear(event.target.value)
      });
    };
    this.onYearInput = (event) => {
      this.setYear({
        localizedYear: this.parseCalendarYear(event.target.value),
        commit: false
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
      this.calciteDatePickerSelect.emit(date);
    };
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
    return h("div", { class: "header" }, this.renderContent());
  }
  renderContent() {
    var _a;
    if (!this.activeDate || !this.localeData) {
      return null;
    }
    if (this.parentDatePickerEl) {
      const { numberingSystem, lang: locale } = this.parentDatePickerEl;
      numberStringFormatter.numberFormatOptions = Object.assign(Object.assign({ useGrouping: false }, (numberingSystem && { numberingSystem })), (locale && { locale }));
    }
    const activeMonth = this.activeDate.getMonth();
    const { months, unitOrder } = this.localeData;
    const localizedMonth = (months.wide || months.narrow || months.abbreviated)[activeMonth];
    const localizedYear = this.formatCalendarYear(this.activeDate.getFullYear());
    const iconScale = this.scale === "l" ? "m" : "s";
    const order = getOrder(unitOrder);
    const reverse = order.indexOf("y") < order.indexOf("m");
    const suffix = (_a = this.localeData.year) === null || _a === void 0 ? void 0 : _a.suffix;
    return (h(Fragment, null, h("a", { "aria-disabled": `${this.prevMonthDate.getMonth() === activeMonth}`, "aria-label": this.intlPrevMonth, class: "chevron", href: "#", onClick: this.prevMonthClick, onKeyDown: this.prevMonthKeydown, role: "button", tabindex: this.prevMonthDate.getMonth() === activeMonth ? -1 : 0 }, h("calcite-icon", { "flip-rtl": true, icon: "chevron-left", scale: iconScale })), h("div", { class: { text: true, "text--reverse": reverse } }, h(Heading, { class: "month", level: this.headingLevel }, localizedMonth), h("span", { class: "year-wrap" }, h("input", { "aria-label": this.intlYear, class: {
        year: true,
        "year--suffix": !!suffix
      }, inputmode: "numeric", maxlength: "4", minlength: "1", onChange: this.onYearChange, onInput: this.onYearInput, onKeyDown: this.onYearKey, pattern: "\\d*", ref: (el) => (this.yearInput = el), type: "text", value: localizedYear }), suffix && h("span", { class: "suffix" }, suffix))), h("a", { "aria-disabled": `${this.nextMonthDate.getMonth() === activeMonth}`, "aria-label": this.intlNextMonth, class: "chevron", href: "#", onClick: this.nextMonthClick, onKeyDown: this.nextMonthKeydown, role: "button", tabindex: this.nextMonthDate.getMonth() === activeMonth ? -1 : 0 }, h("calcite-icon", { "flip-rtl": true, icon: "chevron-right", scale: iconScale }))));
  }
  setNextPrevMonthDates() {
    if (!this.activeDate) {
      return;
    }
    this.nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
    this.prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
  }
  formatCalendarYear(year) {
    const { localeData } = this;
    const buddhistCalendar = localeData["default-calendar"] === "buddhist";
    const yearOffset = buddhistCalendar ? BUDDHIST_CALENDAR_YEAR_OFFSET : 0;
    return numberStringFormatter.localize(`${year + yearOffset}`);
  }
  parseCalendarYear(year) {
    const { localeData } = this;
    const buddhistCalendar = localeData["default-calendar"] === "buddhist";
    const yearOffset = buddhistCalendar ? BUDDHIST_CALENDAR_YEAR_OFFSET : 0;
    const parsedYear = Number(numberStringFormatter.delocalize(year)) - yearOffset;
    return numberStringFormatter.localize(`${parsedYear}`);
  }
  getInRangeDate({ localizedYear, offset = 0 }) {
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
  setYear({ localizedYear, commit = true, offset = 0 }) {
    const { yearInput, activeDate } = this;
    const inRangeDate = this.getInRangeDate({ localizedYear, offset });
    // if you've supplied a year and it's in range, update active date
    if (inRangeDate) {
      this.calciteDatePickerSelect.emit(inRangeDate);
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
DatePickerMonthHeader.style = datePickerMonthHeaderCss;

export { DatePickerDay as calcite_date_picker_day, DatePickerMonth as calcite_date_picker_month, DatePickerMonthHeader as calcite_date_picker_month_header };
