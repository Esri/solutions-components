/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { j as datePartsFromISO, k as datePartsFromLocalizedString, l as dateFromLocalizedString, i as inRange, a as dateToISO, d as dateFromISO, b as dateFromRange } from './date.js';
import { k as focusFirstTabbable, t as toAriaBoolean } from './dom.js';
import { f as filterValidFlipPlacements, c as connectFloatingUI, e as defaultMenuPlacement, r as reposition, a as disconnectFloatingUI, F as FloatingCSS } from './floating-ui.js';
import { s as submitForm, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { n as numberKeys } from './key.js';
import { c as connectLabel, d as disconnectLabel } from './label.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized, e as getDateFormatSupportedLocale, f as getSupportedNumberingSystem } from './locale2.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent.js';
import { d as defineCustomElement$7, g as getValueAsDateRange, a as getLocaleData } from './date-picker.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { c as connectFocusTrap, d as deactivateFocusTrap, a as activateFocusTrap } from './focusTrapComponent.js';
import { g as guid } from './guid.js';
import { g as getIconScale } from './component.js';
import { V as Validation } from './Validation.js';
import { s as syncHiddenFormInput } from './input2.js';
import { i as isBrowser } from './browser.js';
import { d as defineCustomElement$6 } from './date-picker-day.js';
import { d as defineCustomElement$5 } from './date-picker-month.js';
import { d as defineCustomElement$4 } from './date-picker-month-header.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './input-text.js';
import { d as defineCustomElement$1 } from './progress.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * Specifies if an ISO string date (YYYY-MM-DD) has two digit year.
 *
 * @param {string} value
 * @returns {boolean}
 */
function isTwoDigitYear(value) {
    if (!value) {
        return false;
    }
    const { year } = datePartsFromISO(value);
    return Number(year) < 100;
}
/**
 * Returns a normalized year to current century from a given two digit year number.
 *
 * @param {number} twoDigitYear
 * @returns {string}
 */
function normalizeToCurrentCentury(twoDigitYear) {
    const currentYear = new Date().getFullYear();
    const normalizedYear = Math.floor(currentYear / 100) * 100 + twoDigitYear;
    return normalizedYear;
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    assistiveText: "assistive-text",
    calendarWrapper: "calendar-wrapper",
    calendarWrapperEnd: "calendar-wrapper--end",
    horizontalArrowContainer: "horizontal-arrow-container",
    inputBorderTopColorOne: "border-top-color-one",
    inputContainer: "input-container",
    inputNoBottomBorder: "no-bottom-border",
    inputWrapper: "input-wrapper",
    input: "input",
    menu: "menu-container",
    menuActive: "menu-container--active",
    toggleIcon: "toggle-icon",
    verticalArrowContainer: "vertical-arrow-container",
    chevronIcon: "chevron-icon",
};
const IDS = {
    validationMessage: "inputDatePickerValidationMessage",
};

const inputDatePickerCss = ":host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([scale=s]){--calcite-toggle-spacing:0.5rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1rem)}:host([scale=m]){--calcite-toggle-spacing:0.75rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1.5rem)}:host([scale=l]){--calcite-toggle-spacing:1rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 2rem)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calendar-wrapper{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}.input-wrapper .chevron-icon{color:var(--calcite-color-text-3)}.input-wrapper:focus-within .chevron-icon,.input-wrapper:active .chevron-icon,.input-wrapper:hover .chevron-icon{color:var(--calcite-color-text-1)}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing)}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:var(--calcite-z-index);margin-inline:1px;background-color:var(--calcite-color-foreground-1);padding-inline:0.625rem;inset-inline-start:0}.menu-container{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([open]) .menu-container{visibility:visible}.menu-container--active{visibility:visible}.input .calcite-input__wrapper{margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputDatePickerStyle0 = inputDatePickerCss;

const InputDatePicker = /*@__PURE__*/ proxyCustomElement(class InputDatePicker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInputDatePickerChange = createEvent(this, "calciteInputDatePickerChange", 6);
        this.calciteInputDatePickerBeforeClose = createEvent(this, "calciteInputDatePickerBeforeClose", 6);
        this.calciteInputDatePickerClose = createEvent(this, "calciteInputDatePickerClose", 6);
        this.calciteInputDatePickerBeforeOpen = createEvent(this, "calciteInputDatePickerBeforeOpen", 6);
        this.calciteInputDatePickerOpen = createEvent(this, "calciteInputDatePickerOpen", 6);
        this.calciteInternalInputInputHandler = (event) => {
            const target = event.target;
            const value = target.value;
            const parsedValue = this.parseNumerals(value);
            const formattedValue = this.formatNumerals(parsedValue);
            target.value = formattedValue;
            const { year } = datePartsFromLocalizedString(value, this.localeData);
            if (year && year.length < 4) {
                return;
            }
            const date = dateFromLocalizedString(value, this.localeData);
            if (inRange(date, this.min, this.max)) {
                this.datePickerActiveDate = date;
            }
        };
        this.calciteInternalInputBlurHandler = () => {
            this.commitValue();
        };
        this.dialogId = `date-picker-dialog--${guid()}`;
        this.focusOnOpen = false;
        this.userChangedValue = false;
        this.openTransitionProp = "opacity";
        this.valueAsDateChangedExternally = false;
        this.placeholderTextId = `calcite-input-date-picker-placeholder-${guid()}`;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.onInputWrapperPointerDown = () => {
            this.currentOpenInput = this.focusedInput;
        };
        this.onInputWrapperClick = (event) => {
            const { range, endInput, startInput, currentOpenInput } = this;
            const currentTarget = event.currentTarget;
            const position = currentTarget.getAttribute("data-position");
            const path = event.composedPath();
            const wasToggleClicked = path.find((el) => el.classList?.contains(CSS.toggleIcon));
            if (wasToggleClicked) {
                const targetInput = position === "start" ? startInput : endInput;
                targetInput.setFocus();
            }
            if (!range || !this.open || currentOpenInput === position) {
                this.open = !this.open;
            }
        };
        this.setFilteredPlacements = () => {
            const { el, flipPlacements } = this;
            this.filteredFlipPlacements = flipPlacements
                ? filterValidFlipPlacements(flipPlacements, el)
                : null;
        };
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.setStartInput = (el) => {
            this.startInput = el;
        };
        this.setEndInput = (el) => {
            this.endInput = el;
        };
        this.blurHandler = () => {
            this.open = false;
        };
        this.keyDownHandler = (event) => {
            const { defaultPrevented, key } = event;
            if (defaultPrevented) {
                return;
            }
            if (key === "Enter") {
                event.preventDefault();
                this.commitValue();
                if (this.shouldFocusRangeEnd()) {
                    this.endInput?.setFocus();
                }
                else if (this.shouldFocusRangeStart()) {
                    this.startInput?.setFocus();
                }
                if (submitForm(this)) {
                    this.restoreInputFocus();
                }
            }
            else if (key === "ArrowDown") {
                this.open = true;
                this.focusOnOpen = true;
                event.preventDefault();
            }
            else if (key === "Escape") {
                this.open = false;
                event.preventDefault();
                this.restoreInputFocus();
            }
        };
        this.startInputFocus = () => {
            this.focusedInput = "start";
        };
        this.endInputFocus = () => {
            this.focusedInput = "end";
        };
        this.setFloatingEl = (el) => {
            this.floatingEl = el;
            connectFloatingUI(this, this.referenceEl, this.floatingEl);
        };
        this.setStartWrapper = (el) => {
            this.startWrapper = el;
            this.setReferenceEl();
        };
        this.setEndWrapper = (el) => {
            this.endWrapper = el;
            this.setReferenceEl();
        };
        this.setDatePickerRef = (el) => {
            this.datePickerEl = el;
            connectFocusTrap(this, {
                focusTrapEl: el,
                focusTrapOptions: {
                    initialFocus: false,
                    setReturnFocus: false,
                },
            });
        };
        /**
         * Event handler for when the selected date changes
         *
         * @param event CalciteDatePicker custom change event
         */
        this.handleDateChange = (event) => {
            if (this.range) {
                return;
            }
            event.stopPropagation();
            this.setValue(event.target.valueAsDate);
            this.localizeInputValues();
            this.restoreInputFocus();
        };
        this.handleDateRangeChange = (event) => {
            if (!this.range) {
                return;
            }
            event.stopPropagation();
            const value = event.target.valueAsDate;
            this.setRangeValue(value);
            this.localizeInputValues();
            this.restoreInputFocus();
        };
        this.setInputValue = (newValue, input = "start") => {
            const inputEl = this[`${input}Input`];
            if (!inputEl) {
                return;
            }
            inputEl.value = newValue;
        };
        this.setRangeValue = (valueAsDate) => {
            if (!this.range) {
                return;
            }
            const { value: oldValue } = this;
            const oldValueIsArray = Array.isArray(oldValue);
            const valueIsArray = Array.isArray(valueAsDate);
            const newStartDate = valueIsArray ? valueAsDate[0] : null;
            let newStartDateISO = valueIsArray ? dateToISO(newStartDate) : "";
            if (newStartDateISO) {
                newStartDateISO = this.getNormalizedDate(newStartDateISO);
            }
            const newEndDate = valueIsArray ? valueAsDate[1] : null;
            let newEndDateISO = valueIsArray ? dateToISO(newEndDate) : "";
            if (newEndDateISO) {
                newEndDateISO = this.getNormalizedDate(newEndDateISO);
            }
            const newValue = newStartDateISO || newEndDateISO ? [newStartDateISO, newEndDateISO] : "";
            if (newValue === oldValue) {
                return;
            }
            this.userChangedValue = true;
            this.value = newValue;
            this.valueAsDate = newValue ? getValueAsDateRange(newValue) : undefined;
            const changeEvent = this.calciteInputDatePickerChange.emit();
            if (changeEvent && changeEvent.defaultPrevented) {
                this.value = oldValue;
                if (oldValueIsArray) {
                    this.setInputValue(oldValue[0], "start");
                    this.setInputValue(oldValue[1], "end");
                }
                else {
                    this.value = oldValue;
                    this.setInputValue(oldValue);
                }
            }
        };
        this.setValue = (value) => {
            if (this.range) {
                return;
            }
            const oldValue = this.value;
            let newValue = dateToISO(value);
            newValue = this.getNormalizedDate(newValue);
            if (newValue === oldValue) {
                return;
            }
            this.userChangedValue = true;
            this.valueAsDate = newValue ? dateFromISO(newValue) : undefined;
            this.value = newValue || "";
            const changeEvent = this.calciteInputDatePickerChange.emit();
            if (changeEvent.defaultPrevented) {
                this.value = oldValue;
                this.setInputValue(oldValue);
            }
        };
        this.commonDateSeparators = [".", "-", "/"];
        this.formatNumerals = (value) => value
            ? value
                .split("")
                .map((char) => this.commonDateSeparators?.includes(char)
                ? this.localeData?.separator
                : numberKeys?.includes(char)
                    ? numberStringFormatter?.numberFormatter?.format(Number(char))
                    : char)
                .join("")
            : "";
        this.parseNumerals = (value) => value
            ? value
                .split("")
                .map((char) => numberKeys.includes(char) ? numberStringFormatter.delocalize(char) : char)
                .join("")
            : "";
        this.disabled = false;
        this.focusTrapDisabled = false;
        this.form = undefined;
        this.readOnly = false;
        this.value = "";
        this.flipPlacements = undefined;
        this.headingLevel = undefined;
        this.valueAsDate = undefined;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.minAsDate = undefined;
        this.maxAsDate = undefined;
        this.min = undefined;
        this.max = undefined;
        this.open = false;
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.validity = {
            valid: false,
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valueMissing: false,
        };
        this.name = undefined;
        this.numberingSystem = undefined;
        this.scale = "m";
        this.status = "idle";
        this.placement = defaultMenuPlacement;
        this.range = false;
        this.required = false;
        this.overlayPositioning = "absolute";
        this.proximitySelectionDisabled = false;
        this.layout = "horizontal";
        this.datePickerActiveDate = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.focusedInput = "start";
        this.localeData = undefined;
    }
    handleFocusTrapDisabled(focusTrapDisabled) {
        if (!this.open) {
            return;
        }
        focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
    }
    handleDisabledAndReadOnlyChange(value) {
        if (!value) {
            this.open = false;
        }
    }
    valueWatcher(newValue) {
        if (!this.userChangedValue) {
            let newValueAsDate;
            if (Array.isArray(newValue)) {
                newValueAsDate = getValueAsDateRange(newValue);
            }
            else if (newValue) {
                newValueAsDate = dateFromISO(newValue);
            }
            else {
                newValueAsDate = undefined;
            }
            if (!this.valueAsDateChangedExternally && newValueAsDate !== this.valueAsDate) {
                this.valueAsDate = newValueAsDate;
            }
            this.localizeInputValues();
        }
        this.userChangedValue = false;
    }
    valueAsDateWatcher(valueAsDate) {
        this.datePickerActiveDate = valueAsDate;
        const newValue = this.range && Array.isArray(valueAsDate)
            ? [dateToISO(valueAsDate[0]), dateToISO(valueAsDate[1])]
            : dateToISO(valueAsDate);
        if (this.value !== newValue) {
            this.valueAsDateChangedExternally = true;
            this.value = newValue;
            this.valueAsDateChangedExternally = false;
        }
    }
    flipPlacementsHandler() {
        this.setFilteredPlacements();
        this.reposition(true);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    onMinChanged(min) {
        this.minAsDate = dateFromISO(min);
    }
    onMaxChanged(max) {
        this.maxAsDate = dateFromISO(max);
    }
    openHandler() {
        onToggleOpenCloseComponent(this);
        if (this.disabled || this.readOnly) {
            this.open = false;
            return;
        }
        this.reposition(true);
    }
    overlayPositioningHandler() {
        this.reposition(true);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteDaySelectHandler() {
        if (this.shouldFocusRangeStart() || this.shouldFocusRangeEnd()) {
            return;
        }
        this.open = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    /**
     * Updates the position of the component.
     *
     * @param delayed If true, the repositioning is delayed.
     * @returns void
     */
    async reposition(delayed = false) {
        const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;
        return reposition(this, {
            floatingEl,
            referenceEl,
            overlayPositioning,
            placement,
            flipPlacements: filteredFlipPlacements,
            type: "menu",
        }, delayed);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        this.handleDateTimeFormatChange();
        const { open } = this;
        open && this.openHandler();
        if (this.min) {
            this.minAsDate = dateFromISO(this.min);
        }
        if (this.max) {
            this.maxAsDate = dateFromISO(this.max);
        }
        if (Array.isArray(this.value)) {
            this.valueAsDate = getValueAsDateRange(this.value);
        }
        else if (this.value) {
            try {
                const date = dateFromISO(this.value);
                const dateInRange = dateFromRange(date, this.minAsDate, this.maxAsDate);
                this.valueAsDate = dateInRange;
            }
            catch (error) {
                this.warnAboutInvalidValue(this.value);
                this.value = "";
            }
        }
        else if (this.valueAsDate) {
            if (this.range && Array.isArray(this.valueAsDate)) {
                this.value = [dateToISO(this.valueAsDate[0]), dateToISO(this.valueAsDate[1])];
            }
            else if (!this.range && !Array.isArray(this.valueAsDate)) {
                this.value = dateToISO(this.valueAsDate);
            }
        }
        connectLabel(this);
        connectForm(this);
        connectMessages(this);
        this.setFilteredPlacements();
        numberStringFormatter.numberFormatOptions = {
            numberingSystem: this.numberingSystem,
            locale: this.effectiveLocale,
            useGrouping: false,
        };
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
        connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await Promise.all([this.loadLocaleData(), setUpMessages(this)]);
        this.onMinChanged(this.min);
        this.onMaxChanged(this.max);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        this.localizeInputValues();
        connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    disconnectedCallback() {
        deactivateFocusTrap(this);
        disconnectLabel(this);
        disconnectForm(this);
        disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        const { disabled, effectiveLocale, messages, numberingSystem, readOnly } = this;
        numberStringFormatter.numberFormatOptions = {
            numberingSystem,
            locale: effectiveLocale,
            useGrouping: false,
        };
        return (h(Host, { key: 'b31ae837415083aa63451c5f32b78253b1d6af1e', onBlur: this.blurHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: '7315a0e5773a1ef96c00b48b138c8afd50aca28a', disabled: this.disabled }, this.localeData && (h("div", { key: '022f86001938e2994ab523b30a2e3cb379a550b4', class: CSS.inputContainer }, h("div", { key: '4a3add7824ea7ec41b75ddd5e9b847afa1ca0708', class: CSS.inputWrapper, "data-position": "start", onClick: this.onInputWrapperClick, onPointerDown: this.onInputWrapperPointerDown, ref: this.setStartWrapper }, h("calcite-input-text", { key: 'd415c8d890333f76793fc5f804111c0a72f4d3c8', "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-describedby": this.placeholderTextId, "aria-errormessage": IDS.validationMessage, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": "dialog", "aria-invalid": toAriaBoolean(this.status === "invalid"), class: {
                [CSS.input]: true,
                [CSS.inputNoBottomBorder]: this.layout === "vertical" && this.range,
            }, disabled: disabled, icon: "calendar", onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputTextFocus: this.startInputFocus, placeholder: this.localeData?.placeholder, readOnly: readOnly, ref: this.setStartInput, role: "combobox", scale: this.scale, status: this.status }), !this.readOnly &&
            this.renderToggleIcon(this.open && this.focusedInput === "start"), h("span", { key: '7d5b86f35bde88b757f9a46485ce37bf8317ac88', "aria-hidden": "true", class: CSS.assistiveText, id: this.placeholderTextId }, "Date Format: ", this.localeData?.placeholder)), h("div", { key: '8d38fc155dcc3851865e699645f64e3278519f02', "aria-hidden": toAriaBoolean(!this.open), "aria-label": messages.chooseDate, "aria-live": "polite", "aria-modal": "true", class: {
                [CSS.menu]: true,
                [CSS.menuActive]: this.open,
            }, id: this.dialogId, ref: this.setFloatingEl, role: "dialog" }, h("div", { key: '92b37e521a0d2e0e8fb30ca129a53e75d26e9dd6', class: {
                [CSS.calendarWrapper]: true,
                [CSS.calendarWrapperEnd]: this.focusedInput === "end",
                [FloatingCSS.animation]: true,
                [FloatingCSS.animationActive]: this.open,
            }, ref: this.setTransitionEl }, h("calcite-date-picker", { key: '35aa39e5552eff762bb58368b4cbe1069692ee38', activeDate: this.datePickerActiveDate, activeRange: this.focusedInput, headingLevel: this.headingLevel, max: this.max, maxAsDate: this.maxAsDate, messageOverrides: this.messageOverrides, min: this.min, minAsDate: this.minAsDate, numberingSystem: numberingSystem, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, ref: this.setDatePickerRef, scale: this.scale, tabIndex: this.open ? undefined : -1, valueAsDate: this.valueAsDate }))), this.range && this.layout === "horizontal" && (h("div", { key: '386b0a687fc16a4f96ef9cc199aca653ab90071b', class: CSS.horizontalArrowContainer }, h("calcite-icon", { key: '65b1d5b9e7b77f524ef40cd1f0efda3776db33e1', flipRtl: true, icon: "arrow-right", scale: getIconScale(this.scale) }))), this.range && this.layout === "vertical" && this.scale !== "s" && (h("div", { key: '50b0b98f4d51c5866557ab5691692a42704d08f2', class: CSS.verticalArrowContainer }, h("calcite-icon", { key: '48758a61b800c61109b492d77ca468519ad65227', icon: "arrow-down", scale: getIconScale(this.scale) }))), this.range && (h("div", { key: 'af12058d6a8d299fd988ae4ac7fc0422d05342c6', class: CSS.inputWrapper, "data-position": "end", onClick: this.onInputWrapperClick, onPointerDown: this.onInputWrapperPointerDown, ref: this.setEndWrapper }, h("calcite-input-text", { key: '38c68e0df3d516ea5b840a1a937d1af6d1c971b0', "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-errormessage": IDS.validationMessage, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": "dialog", "aria-invalid": toAriaBoolean(this.status === "invalid"), class: {
                [CSS.input]: true,
                [CSS.inputBorderTopColorOne]: this.layout === "vertical" && this.range,
            }, disabled: disabled, icon: "calendar", onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputTextFocus: this.endInputFocus, placeholder: this.localeData?.placeholder, readOnly: readOnly, ref: this.setEndInput, role: "combobox", scale: this.scale, status: this.status }), !this.readOnly &&
            this.renderToggleIcon(this.open && this.focusedInput === "end"))))), h(HiddenFormInputSlot, { key: '65e98114397e07a95ccf82217412360be3a36d96', component: this }), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    renderToggleIcon(open) {
        return (
        // we set tab index to -1 to prevent delegatesFocus from stealing focus before we can set it
        h("span", { class: CSS.toggleIcon, tabIndex: -1 }, h("calcite-icon", { class: CSS.chevronIcon, icon: open ? "chevron-up" : "chevron-down", scale: getIconScale(this.scale) })));
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
        this.loadLocaleData();
    }
    handleDateTimeFormatChange() {
        const formattingOptions = {
            // we explicitly set numberingSystem to prevent the browser-inferred value
            // see https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195 for more info
            numberingSystem: getSupportedNumberingSystem(this.numberingSystem),
        };
        this.dateTimeFormat = new Intl.DateTimeFormat(getDateFormatSupportedLocale(this.effectiveLocale), formattingOptions);
    }
    setReferenceEl() {
        const { focusedInput, layout, endWrapper, startWrapper } = this;
        this.referenceEl =
            focusedInput === "end" || layout === "vertical"
                ? endWrapper || startWrapper
                : startWrapper || endWrapper;
        requestAnimationFrame(() => connectFloatingUI(this, this.referenceEl, this.floatingEl));
    }
    onLabelClick() {
        this.setFocus();
    }
    onBeforeOpen() {
        this.calciteInputDatePickerBeforeOpen.emit();
    }
    onOpen() {
        activateFocusTrap(this, {
            onActivate: () => {
                if (this.focusOnOpen) {
                    this.datePickerEl.setFocus();
                    this.focusOnOpen = false;
                }
            },
        });
        this.calciteInputDatePickerOpen.emit();
    }
    onBeforeClose() {
        this.calciteInputDatePickerBeforeClose.emit();
    }
    onClose() {
        this.calciteInputDatePickerClose.emit();
        deactivateFocusTrap(this);
        this.restoreInputFocus();
        this.focusOnOpen = false;
        this.datePickerEl.reset();
    }
    syncHiddenFormInput(input) {
        syncHiddenFormInput("date", this, input);
    }
    commitValue() {
        const { focusedInput, value } = this;
        const focusedInputName = `${focusedInput}Input`;
        const focusedInputValue = this[focusedInputName].value;
        const date = dateFromLocalizedString(focusedInputValue, this.localeData);
        const dateAsISO = dateToISO(date);
        const valueIsArray = Array.isArray(value);
        if (this.range) {
            const focusedInputValueIndex = focusedInput === "start" ? 0 : 1;
            if (valueIsArray) {
                if (dateAsISO === value[focusedInputValueIndex]) {
                    return;
                }
                if (date) {
                    this.setRangeValue([
                        focusedInput === "start" ? date : dateFromISO(value[0]),
                        focusedInput === "end" ? date : dateFromISO(value[1]),
                    ]);
                    this.localizeInputValues();
                }
                else {
                    this.setRangeValue([
                        focusedInput === "end" && dateFromISO(value[0]),
                        focusedInput === "start" && dateFromISO(value[1]),
                    ]);
                }
            }
            else {
                if (date) {
                    this.setRangeValue([
                        focusedInput === "start" ? date : dateFromISO(value[0]),
                        focusedInput === "end" ? date : dateFromISO(value[1]),
                    ]);
                    this.localizeInputValues();
                }
            }
        }
        else {
            if (dateAsISO === value) {
                return;
            }
            this.setValue(date);
            this.localizeInputValues();
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
        this.localizeInputValues();
    }
    shouldFocusRangeStart() {
        const startValue = this.value[0];
        const endValue = this.value[1];
        return !!(endValue && !startValue && this.focusedInput === "end" && this.startInput);
    }
    shouldFocusRangeEnd() {
        const startValue = this.value[0];
        const endValue = this.value[1];
        return !!(startValue && !endValue && this.focusedInput === "start" && this.endInput);
    }
    restoreInputFocus() {
        if (!this.range) {
            this.startInput.setFocus();
            return;
        }
        const focusedInput = this.focusedInput === "start" ? this.startInput : this.endInput;
        focusedInput.setFocus();
    }
    localizeInputValues() {
        const date = dateFromRange((this.range
            ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
            : this.valueAsDate), this.minAsDate, this.maxAsDate);
        const endDate = this.range
            ? dateFromRange((Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined, this.minAsDate, this.maxAsDate)
            : null;
        this.setInputValue((date && this.dateTimeFormat.format(date)) ?? "", "start");
        this.setInputValue((this.range && endDate && this.dateTimeFormat.format(endDate)) ?? "", "end");
    }
    warnAboutInvalidValue(value) {
        console.warn(`The specified value "${value}" does not conform to the required format, "YYYY-MM-DD".`);
    }
    getNormalizedDate(value) {
        if (!value) {
            return "";
        }
        if (!isTwoDigitYear(value)) {
            return value;
        }
        const { day, month, year } = datePartsFromISO(value);
        const normalizedYear = normalizeToCurrentCentury(Number(year));
        return `${normalizedYear}-${month}-${day}`;
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "focusTrapDisabled": ["handleFocusTrapDisabled"],
        "disabled": ["handleDisabledAndReadOnlyChange"],
        "readOnly": ["handleDisabledAndReadOnlyChange"],
        "value": ["valueWatcher"],
        "valueAsDate": ["valueAsDateWatcher"],
        "flipPlacements": ["flipPlacementsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"],
        "open": ["openHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "effectiveLocale": ["effectiveLocaleChange", "handleDateTimeFormatChange"],
        "numberingSystem": ["handleDateTimeFormatChange"],
        "layout": ["setReferenceEl"],
        "focusedInput": ["setReferenceEl"]
    }; }
    static get style() { return CalciteInputDatePickerStyle0; }
}, [17, "calcite-input-date-picker", {
        "disabled": [516],
        "focusTrapDisabled": [516, "focus-trap-disabled"],
        "form": [513],
        "readOnly": [516, "read-only"],
        "value": [1025],
        "flipPlacements": [16],
        "headingLevel": [514, "heading-level"],
        "valueAsDate": [1040],
        "messageOverrides": [1040],
        "messages": [1040],
        "minAsDate": [1040],
        "maxAsDate": [1040],
        "min": [513],
        "max": [513],
        "open": [1540],
        "validationMessage": [1, "validation-message"],
        "validationIcon": [520, "validation-icon"],
        "validity": [1040],
        "name": [513],
        "numberingSystem": [513, "numbering-system"],
        "scale": [513],
        "status": [513],
        "placement": [513],
        "range": [516],
        "required": [516],
        "overlayPositioning": [513, "overlay-positioning"],
        "proximitySelectionDisabled": [4, "proximity-selection-disabled"],
        "layout": [513],
        "datePickerActiveDate": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "focusedInput": [32],
        "localeData": [32],
        "setFocus": [64],
        "reposition": [64]
    }, [[0, "calciteDaySelect", "calciteDaySelectHandler"]], {
        "focusTrapDisabled": ["handleFocusTrapDisabled"],
        "disabled": ["handleDisabledAndReadOnlyChange"],
        "readOnly": ["handleDisabledAndReadOnlyChange"],
        "value": ["valueWatcher"],
        "valueAsDate": ["valueAsDateWatcher"],
        "flipPlacements": ["flipPlacementsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "min": ["onMinChanged"],
        "max": ["onMaxChanged"],
        "open": ["openHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "effectiveLocale": ["effectiveLocaleChange", "handleDateTimeFormatChange"],
        "numberingSystem": ["handleDateTimeFormatChange"],
        "layout": ["setReferenceEl"],
        "focusedInput": ["setReferenceEl"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-input-date-picker", "calcite-date-picker", "calcite-date-picker-day", "calcite-date-picker-month", "calcite-date-picker-month-header", "calcite-icon", "calcite-input-text", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-input-date-picker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputDatePicker);
            }
            break;
        case "calcite-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-date-picker-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-date-picker-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-input-text":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InputDatePicker as I, defineCustomElement as d };
