/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const Heading = require('./Heading-bd401e0a.js');
const loadable = require('./loadable-5a794992.js');
const openCloseComponent = require('./openCloseComponent-19a769d0.js');
const date = require('./date-9de4dd6f.js');
const utils = require('./utils-7bc7f595.js');
require('./observers-db4527e4.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');
require('./key-c5504030.js');

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
        index.registerInstance(this, hostRef);
        this.calciteBlockBeforeClose = index.createEvent(this, "calciteBlockBeforeClose", 6);
        this.calciteBlockBeforeOpen = index.createEvent(this, "calciteBlockBeforeOpen", 6);
        this.calciteBlockClose = index.createEvent(this, "calciteBlockClose", 6);
        this.calciteBlockOpen = index.createEvent(this, "calciteBlockOpen", 6);
        this.calciteBlockToggle = index.createEvent(this, "calciteBlockToggle", 6);
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
        openCloseComponent.onToggleOpenCloseComponent(this);
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
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.el);
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
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        loadable.setUpLoadableComponent(this);
        if (this.open) {
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderScrim() {
        const { loading } = this;
        const defaultSlot = index.h("slot", null);
        return [loading ? index.h("calcite-scrim", { loading: loading }) : null, defaultSlot];
    }
    renderIcon() {
        const { loading, messages, status } = this;
        const hasSlottedIcon = !!dom.getSlotted(this.el, SLOTS.icon);
        return loading ? (index.h("div", { class: CSS.icon, key: "loader" }, index.h("calcite-loader", { inline: true, label: messages.loading }))) : !!status ? (index.h("div", { class: CSS.icon, key: "status-icon" }, index.h("calcite-icon", { class: {
                [CSS.statusIcon]: true,
                [CSS.valid]: status == "valid",
                [CSS.invalid]: status == "invalid",
            }, icon: ICONS[status], scale: "s" }))) : hasSlottedIcon ? (index.h("div", { class: CSS.icon, key: "icon-slot" }, index.h("slot", { key: "icon-slot", name: SLOTS.icon }))) : null;
    }
    renderTitle() {
        const { heading, headingLevel, description } = this;
        return heading || description ? (index.h("div", { class: CSS.title }, index.h(Heading.Heading, { class: CSS.heading, level: headingLevel }, heading), description ? index.h("div", { class: CSS.description }, description) : null)) : null;
    }
    render() {
        const { collapsible, el, loading, open, heading, messages } = this;
        const toggleLabel = open ? messages.collapse : messages.expand;
        const headerContent = (index.h("header", { class: CSS.header, id: IDS.header }, this.renderIcon(), this.renderTitle()));
        const hasControl = !!dom.getSlotted(el, SLOTS.control);
        const hasMenuActions = !!dom.getSlotted(el, SLOTS.headerMenuActions);
        const collapseIcon = open ? ICONS.opened : ICONS.closed;
        const headerNode = (index.h("div", { class: CSS.headerContainer }, this.dragHandle ? index.h("calcite-handle", { label: heading }) : null, collapsible ? (index.h("button", { "aria-controls": IDS.content, "aria-describedby": IDS.header, "aria-expanded": collapsible ? dom.toAriaBoolean(open) : null, class: CSS.toggle, id: IDS.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent, index.h("calcite-icon", { "aria-hidden": "true", class: CSS.toggleIcon, icon: collapseIcon, scale: "s" }))) : (headerContent), hasControl ? (index.h("div", { class: CSS.controlContainer }, index.h("slot", { name: SLOTS.control }))) : null, hasMenuActions ? (index.h("calcite-action-menu", { label: messages.options, overlayPositioning: this.overlayPositioning }, index.h("slot", { name: SLOTS.headerMenuActions }))) : null));
        return (index.h(index.Host, null, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("article", { "aria-busy": dom.toAriaBoolean(loading), class: {
                [CSS.container]: true,
            } }, headerNode, index.h("section", { "aria-labelledby": IDS.toggle, class: CSS.content, hidden: !open, id: IDS.content,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, this.renderScrim())))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
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
            const date$1 = new Date(event.detail);
            this.hoverRange = {
                focused: this.activeRange || "start",
                start,
                end,
            };
            if (!this.proximitySelectionDisabled) {
                if (start && end) {
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
                                end: start,
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
                            end: start,
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
        await loadable.componentFocusable(this);
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
        return (index.h(index.Host, { onBlur: this.resetActiveDates, onKeyDown: this.keyDownHandler }, this.renderCalendar(activeDate, maxDate, minDate, date$1, endDate)));
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
            useGrouping: false,
        };
        this.localeData = await utils.getLocaleData(this.effectiveLocale);
        this.dateTimeFormat = locale.getDateTimeFormat(this.effectiveLocale, DATE_PICKER_FORMAT_OPTIONS);
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
            index.h("calcite-date-picker-month", { activeDate: activeDate, dateTimeFormat: this.dateTimeFormat, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteInternalDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteInternalDatePickerHover: this.monthHoverChange, onCalciteInternalDatePickerMouseOut: this.monthMouseOutChange, onCalciteInternalDatePickerSelect: this.monthDateChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date, startDate: this.range ? date : undefined }),
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

exports.calcite_block = Block;
exports.calcite_date_picker = DatePicker;
