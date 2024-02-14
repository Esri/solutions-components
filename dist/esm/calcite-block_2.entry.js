/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-12c4fcfb.js';
import { f as focusFirstTabbable, g as getSlotted, t as toAriaBoolean } from './dom-38c6f027.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-39bf5602.js';
import { c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter, a as getDateTimeFormat } from './locale-904407bf.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n-436fb2b1.js';
import { H as Heading } from './Heading-94780f62.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-37e7fbd6.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent-9f90f493.js';
import { g as getDaysDiff, c as dateToISO, e as dateFromISO, f as dateFromRange, s as setEndOfDay } from './date-5630530d.js';
import { g as getValueAsDateRange, a as getLocaleData } from './utils-9fb4104a.js';
import './observers-d04d1da9.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';
import './browser-d60104bd.js';
import './key-c83d835f.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const IDS = {
    content: "content",
    toggle: "toggle",
    header: "header",
};
const CSS = {
    button: "button",
    container: "container",
    content: "content",
    controlContainer: "control-container",
    description: "description",
    header: "header",
    headerContainer: "header-container",
    heading: "heading",
    icon: "icon",
    invalid: "invalid",
    statusIcon: "status-icon",
    summary: "summary",
    title: "title",
    toggle: "toggle",
    toggleIcon: "toggle-icon",
    valid: "valid",
};
const SLOTS = {
    icon: "icon",
    control: "control",
    headerMenuActions: "header-menu-actions",
};
const ICONS = {
    opened: "chevron-up",
    closed: "chevron-down",
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
};

const blockCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding:0px;transition-property:margin;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-timing-function:cubic-bezier(0.215, 0.440, 0.420, 0.880);flex-basis:auto}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.header{justify-content:flex-start;padding:0px}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto;grid-template-areas:\"handle header control menu\";grid-column:header-start/menu-end;grid-row:1/2}.toggle{margin:0px;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;padding:0px;font-family:inherit;outline-color:transparent;text-align:initial;background-color:transparent}.toggle:hover{background-color:var(--calcite-color-foreground-2)}.toggle:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}calcite-loader[inline]{grid-area:control;align-self:center}calcite-handle{grid-area:handle}.title{margin:0px;padding:0.75rem}.header .title .heading{padding:0px;font-size:var(--calcite-font-size--1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;color:var(--calcite-color-text-2);transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);word-wrap:break-word;word-break:break-word}.description{margin-block-start:0.125rem;padding:0px;font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-color-text-3);word-wrap:break-word;word-break:break-word}.icon{display:flex;margin-inline-start:0.75rem;margin-inline-end:0px}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.toggle-icon{margin-block:0.75rem;align-self:center;justify-self:end;color:var(--calcite-color-text-3);transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline-end:0.75rem;margin-inline-start:auto}.toggle:hover .toggle-icon{color:var(--calcite-color-text-1)}.container{position:relative;display:flex;block-size:100%;flex-direction:column}.content{position:relative;min-block-size:0px;flex:1 1 0%}@keyframes in{0%{opacity:0}100%{opacity:1}}.content{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;padding-block:var(--calcite-block-padding, 0.5rem);padding-inline:var(--calcite-block-padding, 0.625rem)}.control-container{margin:0px;display:flex;grid-area:control}calcite-action-menu{grid-area:menu}:host([open]){margin-block:0.5rem}:host([open]) .header .title .heading{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}";

const Block = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteBlockBeforeClose = createEvent(this, "calciteBlockBeforeClose", 6);
        this.calciteBlockBeforeOpen = createEvent(this, "calciteBlockBeforeOpen", 6);
        this.calciteBlockClose = createEvent(this, "calciteBlockClose", 6);
        this.calciteBlockOpen = createEvent(this, "calciteBlockOpen", 6);
        this.calciteBlockToggle = createEvent(this, "calciteBlockToggle", 6);
        this.openTransitionProp = "opacity";
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.onHeaderClick = () => {
            this.open = !this.open;
            this.calciteBlockToggle.emit();
        };
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.collapsible = false;
        this.disabled = false;
        this.dragHandle = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.open = false;
        this.status = undefined;
        this.description = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.overlayPositioning = "absolute";
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    openHandler() {
        onToggleOpenCloseComponent(this);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Sets focus on the component's first tabbable element.
     *
     */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    onBeforeOpen() {
        this.calciteBlockBeforeOpen.emit();
    }
    onOpen() {
        this.calciteBlockOpen.emit();
    }
    onBeforeClose() {
        this.calciteBlockBeforeClose.emit();
    }
    onClose() {
        this.calciteBlockClose.emit();
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderScrim() {
        const { loading } = this;
        const defaultSlot = h("slot", null);
        return [loading ? h("calcite-scrim", { loading: loading }) : null, defaultSlot];
    }
    renderIcon() {
        const { loading, messages, status } = this;
        const hasSlottedIcon = !!getSlotted(this.el, SLOTS.icon);
        return loading ? (h("div", { class: CSS.icon, key: "loader" }, h("calcite-loader", { inline: true, label: messages.loading }))) : !!status ? (h("div", { class: CSS.icon, key: "status-icon" }, h("calcite-icon", { class: {
                [CSS.statusIcon]: true,
                [CSS.valid]: status == "valid",
                [CSS.invalid]: status == "invalid",
            }, icon: ICONS[status], scale: "s" }))) : hasSlottedIcon ? (h("div", { class: CSS.icon, key: "icon-slot" }, h("slot", { key: "icon-slot", name: SLOTS.icon }))) : null;
    }
    renderTitle() {
        const { heading, headingLevel, description } = this;
        return heading || description ? (h("div", { class: CSS.title }, h(Heading, { class: CSS.heading, level: headingLevel }, heading), description ? h("div", { class: CSS.description }, description) : null)) : null;
    }
    render() {
        const { collapsible, el, loading, open, heading, messages } = this;
        const toggleLabel = open ? messages.collapse : messages.expand;
        const headerContent = (h("header", { class: CSS.header, id: IDS.header }, this.renderIcon(), this.renderTitle()));
        const hasControl = !!getSlotted(el, SLOTS.control);
        const hasMenuActions = !!getSlotted(el, SLOTS.headerMenuActions);
        const collapseIcon = open ? ICONS.opened : ICONS.closed;
        const headerNode = (h("div", { class: CSS.headerContainer }, this.dragHandle ? h("calcite-handle", { label: heading }) : null, collapsible ? (h("button", { "aria-controls": IDS.content, "aria-describedby": IDS.header, "aria-expanded": collapsible ? toAriaBoolean(open) : null, class: CSS.toggle, id: IDS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent, h("calcite-icon", { "aria-hidden": "true", class: CSS.toggleIcon, icon: collapseIcon, scale: "s" }))) : (headerContent), hasControl ? (h("div", { class: CSS.controlContainer }, h("slot", { name: SLOTS.control }))) : null, hasMenuActions ? (h("calcite-action-menu", { label: messages.options, overlayPositioning: this.overlayPositioning }, h("slot", { name: SLOTS.headerMenuActions }))) : null));
        return (h(Host, null, h(InteractiveContainer, { disabled: this.disabled }, h("article", { "aria-busy": toAriaBoolean(loading), class: {
                [CSS.container]: true,
            } }, headerNode, h("section", { "aria-labelledby": IDS.toggle, class: CSS.content, hidden: !open, id: IDS.content,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, this.renderScrim())))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Block.style = blockCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const HEADING_LEVEL = 2;
const DATE_PICKER_FORMAT_OPTIONS = { dateStyle: "full" };

const datePickerCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-block;inline-size:auto;overflow:visible;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);vertical-align:top}:host([scale=s]){inline-size:234px;min-inline-size:216px;max-inline-size:380px}:host([scale=m]){inline-size:304px;min-inline-size:272px;max-inline-size:480px}:host([scale=l]){inline-size:370px;min-inline-size:320px;max-inline-size:600px}:host([hidden]){display:none}[hidden]{display:none}";

const DatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            if (!this.proximitySelectionDisabled) {
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
            else {
                if (!end) {
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
                if (!this.proximitySelectionDisabled) {
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
                else {
                    this.setStartDate(date);
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
        if (min) {
            this.minAsDate = dateFromISO(min);
        }
    }
    onMaxChanged(max) {
        if (max) {
            this.maxAsDate = dateFromISO(max);
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
        var _a;
        const date = dateFromRange(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate);
        let activeDate = this.getActiveDate(date, this.minAsDate, this.maxAsDate);
        const endDate = this.range && Array.isArray(this.valueAsDate)
            ? dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
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
                : date || this.minAsDate
            : this.minAsDate;
        const maxDate = this.range && this.activeRange
            ? this.activeRange === "start"
                ? endDate || this.maxAsDate
                : this.maxAsDate
            : this.maxAsDate;
        return (h(Host, { onBlur: this.resetActiveDates, onKeyDown: this.keyDownHandler }, this.renderCalendar(activeDate, maxDate, minDate, date, endDate)));
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
    get el() { return getElement(this); }
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

export { Block as calcite_block, DatePicker as calcite_date_picker };
