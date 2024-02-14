/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { d as datePartsFromISO, a as datePartsFromLocalizedString, b as dateFromLocalizedString, i as inRange, c as dateToISO, e as dateFromISO, f as dateFromRange } from './date-5630530d.js';
import { t as toAriaBoolean } from './dom-38c6f027.js';
import { f as filterComputedPlacements, c as connectFloatingUI, d as defaultMenuPlacement, r as reposition, a as disconnectFloatingUI, F as FloatingCSS } from './floating-ui-41dfe3f1.js';
import { s as submitForm, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-50dcd52e.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-39bf5602.js';
import { n as numberKeys } from './key-c83d835f.js';
import { c as connectLabel, d as disconnectLabel } from './label-b4cea72e.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-37e7fbd6.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized, b as getSupportedNumberingSystem } from './locale-904407bf.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent-9f90f493.js';
import { g as getValueAsDateRange, a as getLocaleData } from './utils-9fb4104a.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-436fb2b1.js';
import { c as connectFocusTrap, d as deactivateFocusTrap, a as activateFocusTrap } from './focusTrapComponent-47ddce58.js';
import { g as guid } from './guid-b75a5f7b.js';
import { g as getIconScale } from './component-edd2c3cd.js';
import { V as Validation } from './Validation-ea480265.js';
import { l as loadModules } from './loadModules-b677d6d7.js';
import { g as getMessages } from './locale-c7d9e9aa.js';
import { g as getMode } from './mode-66911cb5.js';
import './resources-8834f920.js';
import './debounce-229b1a22.js';
import './browser-d60104bd.js';
import './observers-d04d1da9.js';
import './esri-loader-eda07632.js';
import './_commonjsHelpers-d5f9d613.js';
import './languageUtil-8b54477c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$2 = {
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
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
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

const inputDatePickerCss = ":host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([scale=s]){--calcite-toggle-spacing:0.5rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1rem)}:host([scale=m]){--calcite-toggle-spacing:0.75rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1.5rem)}:host([scale=l]){--calcite-toggle-spacing:1rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 2rem)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calendar-wrapper{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing)}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:var(--calcite-z-index);margin-inline:1px;background-color:var(--calcite-color-foreground-1);padding-inline:0.625rem;inset-inline-start:0}.menu-container{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([open]) .menu-container{visibility:visible}.menu-container--active{visibility:visible}.input .calcite-input__wrapper{margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";

const InputDatePicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            const wasToggleClicked = path.find((el) => { var _a; return (_a = el.classList) === null || _a === void 0 ? void 0 : _a.contains(CSS$2.toggleIcon); });
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
                ? filterComputedPlacements(flipPlacements, el)
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
            var _a, _b;
            const { defaultPrevented, key } = event;
            if (defaultPrevented) {
                return;
            }
            if (key === "Enter") {
                this.commitValue();
                if (this.shouldFocusRangeEnd()) {
                    (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
                }
                else if (this.shouldFocusRangeStart()) {
                    (_b = this.startInput) === null || _b === void 0 ? void 0 : _b.setFocus();
                }
                if (submitForm(this)) {
                    event.preventDefault();
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
                .map((char) => {
                var _a, _b, _c;
                return ((_a = this.commonDateSeparators) === null || _a === void 0 ? void 0 : _a.includes(char))
                    ? (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.separator
                    : (numberKeys === null || numberKeys === void 0 ? void 0 : numberKeys.includes(char))
                        ? (_c = numberStringFormatter === null || numberStringFormatter === void 0 ? void 0 : numberStringFormatter.numberFormatter) === null || _c === void 0 ? void 0 : _c.format(Number(char))
                        : char;
            })
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
        if (min) {
            this.minAsDate = dateFromISO(min);
        }
    }
    onMaxChanged(max) {
        if (max) {
            this.maxAsDate = dateFromISO(max);
        }
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
        this.el.focus();
    }
    /**
     * Updates the position of the component.
     *
     * @param delayed
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
        connectInteractive(this);
        connectLocalized(this);
        const { open } = this;
        open && this.openHandler();
        if (Array.isArray(this.value)) {
            this.valueAsDate = getValueAsDateRange(this.value);
        }
        else if (this.value) {
            try {
                this.valueAsDate = dateFromISO(this.value);
            }
            catch (error) {
                this.warnAboutInvalidValue(this.value);
                this.value = "";
            }
        }
        else if (this.valueAsDate) {
            if (this.range) {
                this.setRangeValue(this.valueAsDate);
            }
            else if (!Array.isArray(this.valueAsDate)) {
                this.value = dateToISO(this.valueAsDate);
            }
        }
        if (this.min) {
            this.minAsDate = dateFromISO(this.min);
        }
        if (this.max) {
            this.maxAsDate = dateFromISO(this.max);
        }
        connectLabel(this);
        connectForm(this);
        connectMessages(this);
        this.setFilteredPlacements();
        this.reposition(true);
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
        this.reposition(true);
    }
    disconnectedCallback() {
        deactivateFocusTrap(this);
        disconnectInteractive(this);
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
        var _a, _b, _c;
        const { disabled, effectiveLocale, messages, numberingSystem, readOnly } = this;
        numberStringFormatter.numberFormatOptions = {
            numberingSystem,
            locale: effectiveLocale,
            useGrouping: false,
        };
        return (h(Host, { onBlur: this.blurHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { disabled: this.disabled }, this.localeData && (h("div", { class: CSS$2.inputContainer }, h("div", { class: CSS$2.inputWrapper, "data-position": "start", onClick: this.onInputWrapperClick, onPointerDown: this.onInputWrapperPointerDown,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setStartWrapper }, h("calcite-input-text", { "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-describedby": this.placeholderTextId, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": "dialog", class: {
                [CSS$2.input]: true,
                [CSS$2.inputNoBottomBorder]: this.layout === "vertical" && this.range,
            }, disabled: disabled, icon: "calendar", onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputTextFocus: this.startInputFocus, placeholder: (_a = this.localeData) === null || _a === void 0 ? void 0 : _a.placeholder, readOnly: readOnly, role: "combobox", scale: this.scale, status: this.status,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setStartInput }), !this.readOnly &&
            this.renderToggleIcon(this.open && this.focusedInput === "start"), h("span", { "aria-hidden": "true", class: CSS$2.assistiveText, id: this.placeholderTextId }, "Date Format: ", (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.placeholder)), h("div", { "aria-hidden": toAriaBoolean(!this.open), "aria-label": messages.chooseDate, "aria-live": "polite", "aria-modal": "true", class: {
                [CSS$2.menu]: true,
                [CSS$2.menuActive]: this.open,
            }, id: this.dialogId, role: "dialog",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setFloatingEl }, h("div", { class: {
                [CSS$2.calendarWrapper]: true,
                [CSS$2.calendarWrapperEnd]: this.focusedInput === "end",
                [FloatingCSS.animation]: true,
                [FloatingCSS.animationActive]: this.open,
            },
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, h("calcite-date-picker", { activeDate: this.datePickerActiveDate, activeRange: this.focusedInput, headingLevel: this.headingLevel, max: this.max, maxAsDate: this.maxAsDate, messageOverrides: this.messageOverrides, min: this.min, minAsDate: this.minAsDate, numberingSystem: numberingSystem, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, scale: this.scale, tabIndex: this.open ? undefined : -1, valueAsDate: this.valueAsDate,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setDatePickerRef }))), this.range && this.layout === "horizontal" && (h("div", { class: CSS$2.horizontalArrowContainer }, h("calcite-icon", { flipRtl: true, icon: "arrow-right", scale: getIconScale(this.scale) }))), this.range && this.layout === "vertical" && this.scale !== "s" && (h("div", { class: CSS$2.verticalArrowContainer }, h("calcite-icon", { icon: "arrow-down", scale: getIconScale(this.scale) }))), this.range && (h("div", { class: CSS$2.inputWrapper, "data-position": "end", onClick: this.onInputWrapperClick, onPointerDown: this.onInputWrapperPointerDown,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setEndWrapper }, h("calcite-input-text", { "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": "dialog", class: {
                [CSS$2.input]: true,
                [CSS$2.inputBorderTopColorOne]: this.layout === "vertical" && this.range,
            }, disabled: disabled, icon: "calendar", onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputTextFocus: this.endInputFocus, placeholder: (_c = this.localeData) === null || _c === void 0 ? void 0 : _c.placeholder, readOnly: readOnly, role: "combobox", scale: this.scale, status: this.status,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setEndInput }), !this.readOnly &&
            this.renderToggleIcon(this.open && this.focusedInput === "end"))))), h(HiddenFormInputSlot, { component: this }), this.validationMessage ? (h(Validation, { icon: this.validationIcon, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    renderToggleIcon(open) {
        return (
        // we set tab index to -1 to prevent delegatesFocus from stealing focus before we can set it
        h("span", { class: CSS$2.toggleIcon, tabIndex: -1 }, h("calcite-icon", { icon: open ? "chevron-up" : "chevron-down", scale: getIconScale(this.scale) })));
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
        var _a;
        const date = dateFromRange((this.range
            ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
            : this.valueAsDate), this.minAsDate, this.maxAsDate);
        const endDate = this.range
            ? dateFromRange((Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined, this.minAsDate, this.maxAsDate)
            : null;
        const formattingOptions = {
            // we explicitly set numberingSystem to prevent the browser-inferred value
            // see https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195 for more info
            numberingSystem: getSupportedNumberingSystem(this.numberingSystem),
        };
        const localizedDate = date && date.toLocaleDateString(this.effectiveLocale, formattingOptions);
        const localizedEndDate = endDate && endDate.toLocaleDateString(this.effectiveLocale, formattingOptions);
        this.setInputValue(localizedDate !== null && localizedDate !== void 0 ? localizedDate : "", "start");
        this.setInputValue((_a = (this.range && localizedEndDate)) !== null && _a !== void 0 ? _a : "", "end");
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
    get el() { return getElement(this); }
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
        "layout": ["setReferenceEl"],
        "focusedInput": ["setReferenceEl"],
        "effectiveLocale": ["loadLocaleData"]
    }; }
};
InputDatePicker.style = inputDatePickerCss;

const baseClassLight = 'instant-apps-filter-list calcite-mode-light';
const baseClassDark = 'instant-apps-filter-list calcite-mode-dark';
const supportedTypes = ['feature', 'geojson', 'wfs', 'csv', 'scene', 'subtype-group', 'point-cloud', 'map-image', 'sublayer'];

function handleSingleQuote(value) {
  return value.replaceAll("'", "''");
}
function convertToDate(date, includeTime = false) {
  if (date) {
    const tmpDate = new Date(date);
    const formattedDate = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`;
    if (includeTime) {
      const time = `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
      return `${formattedDate} ${time}`;
    }
    else {
      return formattedDate;
    }
  }
  return;
}
function resetDatePicker(datePicker) {
  var _a;
  if (datePicker != null) {
    datePicker.value = ['', ''];
    const inputs = (_a = datePicker.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('calcite-input');
    if (inputs != null) {
      for (const input of inputs) {
        input.value = '';
      }
    }
  }
}

const instantAppsFilterListCss = ":host{display:block}.instant-apps-filter-list *{box-sizing:border-box}.instant-apps-filter-list__container{height:100%}.instant-apps-filter-list__container calcite-block:last-of-type{margin-bottom:0}.instant-apps-filter-list__footer{padding:12px;display:flex}.instant-apps-filter-list__footer calcite-button:nth-child(2){margin-left:6px}.instant-apps-filter-list__item-container,.instant-apps-filter-list__item-container--user-input{display:flex;justify-content:space-between;align-items:center}.instant-apps-filter-list__item-container:not(:last-child),.instant-apps-filter-list__item-container--user-input:not(:last-child){padding-bottom:20px}.instant-apps-filter-list__item-container--user-input{margin:0;display:flex;flex-direction:column;align-items:flex-start}.instant-apps-filter-list__item-container--user-input>span{margin:0 0 6px;font-size:14px;font-weight:normal}.instant-apps-filter-list__item-container--user-input calcite-combobox{width:100%}.instant-apps-filter-list__number-input-container{width:100%;display:flex;justify-content:center}.instant-apps-filter-list__number-input-container calcite-slider{width:90%}.instant-apps-filter-list__date-picker-input-container{display:flex;align-items:center;justify-content:unset;width:100%}.instant-apps-filter-list__date-picker-input-container calcite-action{height:48px;border-top:1px solid var(--calcite-color-border-input);border-right:1px solid var(--calcite-color-border-input);border-bottom:1px solid var(--calcite-color-border-input)}.instant-apps-filter-list__title{margin-right:20px}.instant-apps-filter-list__title>p{font-size:14px;font-weight:normal;margin:0}.instant-apps-filter-list__checkbox-container{display:flex}.instant-apps-filter-list__checkbox-container calcite-checkbox{height:18px}.instant-apps-filter-list__operator-description{margin:0;--calcite-font-size--1:12px}.instant-apps-filter-list__zoom-to{display:flex;justify-content:flex-end;margin:8px 0 20px}.instant-apps-filter-list__zoom-to calcite-action{width:-moz-min-content;width:min-content}@media (prefers-reduced-motion){.instant-apps-filter-list calcite-loader{--calcite-internal-duration-factor:2;--calcite-internal-animation-timing-slow:calc(300ms * 2)}}.instant-apps-filter-list.calcite-mode-dark .instant-apps-filter-list__header-container{background:#2b2b2b;color:#fff}.instant-apps-filter-list.calcite-mode-dark .instant-apps-filter-list__operator-description{background:#353535}";

const CSS$1 = {
    base: 'instant-apps-filter-list',
    filterContainer: 'instant-apps-filter-list__container',
    footer: 'instant-apps-filter-list__footer',
    filterItemTitle: 'instant-apps-filter-list__title',
    filterItemContainer: 'instant-apps-filter-list__item-container',
    filterUIItemContainer: 'instant-apps-filter-list__item-container--user-input',
    checkboxContainer: 'instant-apps-filter-list__checkbox-container',
    numberInputContainer: 'instant-apps-filter-list__number-input-container',
    dateInputContainer: 'instant-apps-filter-list__date-picker-input-container',
    operatorDesc: 'instant-apps-filter-list__operator-description',
    zoomTo: 'instant-apps-filter-list__zoom-to',
};
const InstantAppsFilterList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.filterListReset = createEvent(this, "filterListReset", 7);
        this.filterUpdate = createEvent(this, "filterUpdate", 7);
        this.layerExpressions = undefined;
        this.autoUpdateUrl = false;
        this.closeBtn = false;
        this.closeBtnOnClick = undefined;
        this.closeBtnText = undefined;
        this.openFilters = false;
        this.extentSelector = false;
        this.extentSelectorConfig = undefined;
        this.urlParams = undefined;
        this.view = undefined;
        this.zoomBtn = true;
        this.loading = undefined;
        this.filterLayerExpressions = undefined;
        this.messages = undefined;
        this.baseClass = baseClassLight;
        this.disabled = true;
        this.hasLayerExpression = false;
        this.initDefExpressions = undefined;
        this.initMapImageExpressions = undefined;
        this.initPointCloudFilters = undefined;
    }
    watchViewHandler() {
        this.handleWhenView();
    }
    watchLayerExpressions() {
        if (!this.hasLayerExpression) {
            this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
            this.handleLayerExpressionsUpdate();
            this.hasLayerExpression = true;
        }
    }
    async componentWillLoad() {
        var _a;
        this.baseClass = getMode(this.el) === 'dark' ? baseClassDark : baseClassLight;
        await this.initializeModules();
        getMessages(this);
        this.hasLayerExpression = this.layerExpressions != null;
        this.filterLayerExpressions = this.layerExpressions != null ? JSON.parse(JSON.stringify(this.layerExpressions)) : undefined;
        this.disabled = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) ? undefined : true;
        this.reactiveUtils.whenOnce(() => this.view).then(() => this.handleLayerExpressionsUpdate());
    }
    componentShouldUpdate(newValue, _oldValue, name) {
        if (name === 'view' && newValue != null) {
            this.handleWhenView();
        }
        else if (name === 'layerExpressions') {
            if (this.hasLayerExpression) {
                this.resetAllFilters();
            }
            this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
            this.handleLayerExpressionsUpdate();
            this.hasLayerExpression = true;
        }
    }
    componentWillRender() {
        var _a;
        this.disabled = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) > 0 ? undefined : true;
    }
    disconnectedCallback() {
        this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
        this.resetAllFilters();
    }
    async initializeModules() {
        const [intl, geometryJsonUtils, reactiveUtils] = await loadModules(['esri/intl', 'esri/geometry/support/jsonUtils', 'esri/core/reactiveUtils']);
        this.geometryJsonUtils = geometryJsonUtils;
        this.reactiveUtils = reactiveUtils;
        this.locale = intl.getLocale();
        return Promise.resolve();
    }
    render() {
        const filterConfig = this.loading ? this.renderLoading() : this.initFilterConfig();
        const footer = this.closeBtn ? this.renderFullFooter() : this.renderFooter();
        return (h(Host, null, h("calcite-panel", { class: this.baseClass, ref: el => (this.panelEl = el) }, h("slot", { slot: "header-content", name: "filter-header-content" }), h("slot", { slot: "header-actions-end", name: "filter-header-actions-end" }), h("div", { key: "filter-container", class: CSS$1.filterContainer }, filterConfig, footer))));
    }
    renderLoading() {
        return h("calcite-loader", { label: "Loading filters..." });
    }
    renderFilter(layerExpression) {
        const { id } = layerExpression;
        return layerExpression.expressions.map((expression, index) => {
            return expression.type == 'checkbox' || expression.type == null ? (h("div", { key: `${id}-${index}`, class: CSS$1.filterItemContainer }, h("div", { class: CSS$1.filterItemTitle }, h("p", null, expression.name)), h("div", { class: CSS$1.checkboxContainer }, h("calcite-checkbox", { id: expression.id.toString(), scale: "l", checked: expression === null || expression === void 0 ? void 0 : expression.active, onCalciteCheckboxChange: this.handleCheckboxChange.bind(this, layerExpression, expression) })))) : (this.initInput(layerExpression, expression));
        });
    }
    renderLayerBlock() {
        return this.filterLayerExpressions.map(layerExpression => {
            return this.renderFilterBlocks(layerExpression);
        });
    }
    renderFilterBlocks(layerExpression) {
        var _a;
        const filter = this.renderFilter(layerExpression);
        const { operator } = layerExpression;
        const operatorTranslation = (operator === null || operator === void 0 ? void 0 : operator.trim()) === 'OR' ? 'orOperator' : 'andOperator';
        const zoomTo = this.renderZoomTo(layerExpression);
        return (h("calcite-block", { key: layerExpression.id, heading: layerExpression.title, description: (_a = this.messages) === null || _a === void 0 ? void 0 : _a[operatorTranslation], open: this.openFilters ? true : undefined, collapsible: true }, zoomTo, filter));
    }
    renderCombobox(layerExpression, expression) {
        var _a;
        return (h("label", { key: "combo-select", class: CSS$1.filterUIItemContainer }, h("span", null, expression.name), h("calcite-combobox", { id: expression.id.toString(), onCalciteComboboxChange: this.handleComboSelect.bind(this, expression, layerExpression), label: expression.name, placeholder: expression.placeholder, overlayPositioning: "fixed", selectionMode: "multiple", scale: "s", "max-items": "6" }, (_a = expression.fields) === null || _a === void 0 ? void 0 : _a.map((value, index) => this.renderComboboxItem(expression, value, index)))));
    }
    renderComboboxItem(expression, value, index) {
        var _a, _b;
        let label = value;
        if (expression.type === 'coded-value') {
            label = (_a = expression.codedValues) === null || _a === void 0 ? void 0 : _a[value];
        }
        else if (expression.type === 'number' && typeof value === 'number' && expression.format != null) {
            if (expression.format.places != null) {
                label = this.roundNumber(value, expression.format.places);
            }
            if (expression.format.digitSeparator) {
                label = this.numberWithCommas(label);
            }
        }
        const selectedFields = expression === null || expression === void 0 ? void 0 : expression.selectedFields;
        const selected = (_b = selectedFields === null || selectedFields === void 0 ? void 0 : selectedFields.includes(value)) !== null && _b !== void 0 ? _b : false;
        return h("calcite-combobox-item", { key: `${label}-${index}`, value: value, textLabel: `${label}`, selected: selected });
    }
    initFilterConfig() {
        var _a, _b;
        if (((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            if (this.filterLayerExpressions.length === 1) {
                const { operator } = this.filterLayerExpressions[0];
                const operatorTranslation = (operator === null || operator === void 0 ? void 0 : operator.trim()) === 'OR' ? 'orOperator' : 'andOperator';
                const zoomTo = this.renderZoomTo(this.filterLayerExpressions[0]);
                return (h("calcite-block", { class: CSS$1.operatorDesc, heading: (_b = this.messages) === null || _b === void 0 ? void 0 : _b[operatorTranslation], open: true }, zoomTo, this.renderFilter(this.filterLayerExpressions[0])));
            }
            else if (this.filterLayerExpressions.length > 1) {
                return this.renderLayerBlock();
            }
        }
        return;
    }
    renderNumberSlider(layerExpression, expression) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const min = expression === null || expression === void 0 ? void 0 : expression.min;
        const max = expression === null || expression === void 0 ? void 0 : expression.max;
        const step = (expression === null || expression === void 0 ? void 0 : expression.step) ? expression.step : 1;
        const check = min != null && max != null;
        const field = (_a = expression === null || expression === void 0 ? void 0 : expression.field) !== null && _a !== void 0 ? _a : '';
        const minValue = ((_b = expression === null || expression === void 0 ? void 0 : expression.range) === null || _b === void 0 ? void 0 : _b.min) != null ? expression.range.min : min;
        const maxValue = ((_c = expression === null || expression === void 0 ? void 0 : expression.range) === null || _c === void 0 ? void 0 : _c.max) != null ? expression.range.max : max;
        const value = [minValue, maxValue];
        return check ? (h("label", { key: expression === null || expression === void 0 ? void 0 : expression.id.toString(), class: CSS$1.filterUIItemContainer }, h("span", null, expression === null || expression === void 0 ? void 0 : expression.name), h("div", { class: CSS$1.numberInputContainer }, h("calcite-slider", { id: expression === null || expression === void 0 ? void 0 : expression.id.toString(), onCalciteSliderChange: this.handleSliderChange.bind(this, expression, layerExpression), min: min, max: max, minValue: min, maxValue: max, "min-label": (_e = (_d = this.messages) === null || _d === void 0 ? void 0 : _d.minSlider) === null || _e === void 0 ? void 0 : _e.replace('{field}', field), "max-label": (_g = (_f = this.messages) === null || _f === void 0 ? void 0 : _f.maxSlider) === null || _g === void 0 ? void 0 : _g.replace('{field}', field), step: step, labelHandles: true, snap: true, value: value, "group-separator": (_h = expression === null || expression === void 0 ? void 0 : expression.format) === null || _h === void 0 ? void 0 : _h.digitSeparator })))) : undefined;
    }
    renderDatePicker(layerExpression, expression) {
        var _a, _b, _c, _d;
        const min = convertToDate(expression.min);
        const max = convertToDate(expression.max);
        const value = [(_a = expression === null || expression === void 0 ? void 0 : expression.range) === null || _a === void 0 ? void 0 : _a.min, (_b = expression === null || expression === void 0 ? void 0 : expression.range) === null || _b === void 0 ? void 0 : _b.max];
        const check = min != null && max != null;
        return check ? (h("label", { class: CSS$1.filterUIItemContainer }, h("span", null, expression === null || expression === void 0 ? void 0 : expression.name), h("div", { class: CSS$1.dateInputContainer }, h("calcite-input-date-picker", { id: expression === null || expression === void 0 ? void 0 : expression.id.toString(), onCalciteInputDatePickerChange: this.handleDatePickerRangeChange.bind(this, expression, layerExpression), min: min, max: max, scale: "s", lang: (_c = this.locale) !== null && _c !== void 0 ? _c : 'en', "overlay-positioning": "fixed", layout: "vertical", value: value, range: true }), h("calcite-action", { onClick: this.handleResetDatePicker.bind(this, expression, layerExpression), icon: "reset", text: (_d = this.messages) === null || _d === void 0 ? void 0 : _d.resetDatePicker, scale: "s" })))) : null;
    }
    renderFooter() {
        var _a;
        return (h("div", { class: CSS$1.footer, slot: "footer" }, h("calcite-button", { appearance: "outline", width: "full", disabled: this.disabled, onClick: this.handleResetFilter.bind(this) }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.resetFilter)));
    }
    renderFullFooter() {
        var _a, _b, _c;
        const closeText = this.closeBtnText != null ? this.closeBtnText : (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close;
        return (h("div", { class: CSS$1.footer, slot: "footer" }, h("calcite-button", { appearance: "outline", width: "half", disabled: this.disabled, onClick: this.handleResetFilter.bind(this) }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.resetFilter), h("calcite-button", { appearance: "solid", width: "half", kind: "brand", onClick: (_c = this.closeBtnOnClick) === null || _c === void 0 ? void 0 : _c.bind(this) }, closeText)));
    }
    renderZoomTo(layerExpression) {
        var _a;
        const id = (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) ? `zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `zoom-to-${layerExpression.id}`;
        return this.zoomBtn ? (h("div", { class: CSS$1.zoomTo }, h("calcite-button", { id: id, appearance: "transparent", kind: "neutral", scale: "s", iconStart: "magnifying-glass-plus", onClick: this.handleZoomTo.bind(this, layerExpression) }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.zoomTo))) : undefined;
    }
    handleResetDatePicker(expression, layerExpression) {
        const datePicker = this.panelEl.querySelector(`[id='${expression.id}']`);
        resetDatePicker(datePicker);
        expression.active = false;
        expression.definitionExpression = undefined;
        expression.range = undefined;
        this.generateOutput(layerExpression);
    }
    initInput(layerExpression, expression) {
        const { type } = expression;
        if (type === 'string' || type == 'coded-value') {
            return this.renderCombobox(layerExpression, expression);
        }
        else if (type === 'number' || type == 'range') {
            if ((expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
                return this.renderCombobox(layerExpression, expression);
            }
            return this.renderNumberSlider(layerExpression, expression);
        }
        else if (type === 'date') {
            if ((expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
                return this.renderCombobox(layerExpression, expression);
            }
            return this.renderDatePicker(layerExpression, expression);
        }
        return;
    }
    async initExpressions() {
        this.loading = true;
        if (this.filterLayerExpressions == null)
            return;
        const tmpLE = this.filterLayerExpressions;
        for (let i = 0; i < (tmpLE === null || tmpLE === void 0 ? void 0 : tmpLE.length); i++) {
            const expressions = tmpLE[i].expressions;
            for (let j = 0; j < (expressions === null || expressions === void 0 ? void 0 : expressions.length); j++) {
                if (expressions[j].active == null && expressions[j].definitionExpression != null) {
                    expressions[j].active = false;
                }
                await this.setInitExpression(tmpLE[i], expressions[j]);
            }
        }
        this.loading = false;
        this.filterLayerExpressions = [...tmpLE];
    }
    handleResetFilter() {
        var _a;
        (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.forEach(layerExpression => {
            var _a;
            (_a = layerExpression.expressions) === null || _a === void 0 ? void 0 : _a.forEach(expression => {
                const { type } = expression;
                if (type === 'string' || type === 'coded-value') {
                    this.resetCombobox(expression);
                }
                else if (type === 'date') {
                    this.resetDatePicker(expression);
                }
                else if (type === 'number' || type === 'range') {
                    if ((expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
                        this.resetCombobox(expression);
                    }
                    else {
                        this.resetNumberRange(expression);
                    }
                }
                else {
                    this.resetCheckbox(expression);
                }
                expression.active = false;
            });
        });
        this.resetAllFilters();
        this.generateURLParams();
        this.filterListReset.emit();
    }
    resetCombobox(expression) {
        const { id } = expression;
        expression.selectedFields = undefined;
        const combobox = this.panelEl.querySelector(`[id='${id}']`);
        if (combobox != null) {
            for (let i = 0; i < combobox.children.length; i++) {
                const comboboxItem = combobox.children[i];
                comboboxItem.selected = false;
            }
        }
    }
    resetDatePicker(expression) {
        const { id } = expression;
        expression.range = undefined;
        const datePicker = this.panelEl.querySelector(`[id='${id}']`);
        resetDatePicker(datePicker);
    }
    resetNumberRange(expression) {
        expression.range = undefined;
        const { id, max, min } = expression;
        const slider = this.panelEl.querySelector(`[id='${id}']`);
        if (slider != null) {
            slider.minValue = min;
            slider.maxValue = max;
        }
    }
    resetCheckbox(expression) {
        const { id } = expression;
        const checkbox = this.panelEl.querySelector(`[id='${id}']`);
        if (checkbox != null) {
            checkbox.checked = false;
        }
    }
    resetAllFilters() {
        var _a, _b, _c, _d, _e;
        const allLayersAndTables = (_c = (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.allLayers) === null || _c === void 0 ? void 0 : _c.concat((_e = (_d = this.view) === null || _d === void 0 ? void 0 : _d.map) === null || _e === void 0 ? void 0 : _e.allTables);
        allLayersAndTables === null || allLayersAndTables === void 0 ? void 0 : allLayersAndTables.forEach(layer => {
            var _a, _b;
            if (supportedTypes.includes(layer.type)) {
                const fl = layer;
                if (fl.type === 'point-cloud') {
                    fl.filters = (_a = this.initPointCloudFilters) === null || _a === void 0 ? void 0 : _a[fl.id];
                }
                else if (fl.type === 'map-image') {
                    fl.allSublayers.forEach(sublayer => {
                        var _a, _b;
                        sublayer.definitionExpression = (_b = (_a = this.initMapImageExpressions) === null || _a === void 0 ? void 0 : _a[fl.id]) === null || _b === void 0 ? void 0 : _b[sublayer.id];
                    });
                }
                else {
                    fl.definitionExpression = (_b = this.initDefExpressions) === null || _b === void 0 ? void 0 : _b[fl.id];
                }
            }
        });
    }
    async updateStringExpression(layerExpression, expression) {
        const { field } = expression;
        const layer = this.findFilterLayer(layerExpression);
        expression.fields = await this.getFeatureAttributes(layer, field);
        if (expression === null || expression === void 0 ? void 0 : expression.selectedFields) {
            const selectedFields = expression.selectedFields.map((field) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
            expression.definitionExpression = `${field} IN (${selectedFields.join(',')})`;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    async updateNumberExpression(layerExpression, expression) {
        var _a, _b;
        if ((!(expression === null || expression === void 0 ? void 0 : expression.min) && (expression === null || expression === void 0 ? void 0 : expression.min) !== 0) || (!(expression === null || expression === void 0 ? void 0 : expression.max) && (expression === null || expression === void 0 ? void 0 : expression.max) !== 0)) {
            const layer = this.findFilterLayer(layerExpression);
            const { field } = expression;
            if (field != null) {
                this.setExpressionFormat(layer, expression, field);
                if ((expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
                    const fields = (await this.getFeatureAttributes(layer, field));
                    fields.sort((a, b) => a - b);
                    expression.fields = fields;
                }
                else {
                    const graphic = await this.calculateMinMaxStatistics(layer, field);
                    const attributes = (_a = graphic === null || graphic === void 0 ? void 0 : graphic[0]) === null || _a === void 0 ? void 0 : _a.attributes;
                    if (((_b = expression.format) === null || _b === void 0 ? void 0 : _b.places) != null) {
                        expression.min = this.roundMinNumberDown(attributes[`min${field}`], expression.format.places);
                        expression.max = this.roundMaxNumberUp(attributes[`max${field}`], expression.format.places);
                    }
                    else {
                        expression.min = attributes[`min${field}`];
                        expression.max = attributes[`max${field}`];
                    }
                    if ((expression === null || expression === void 0 ? void 0 : expression.range) && Object.keys(expression.range).length) {
                        const { min, max } = expression.range;
                        expression.definitionExpression = `${expression.field} BETWEEN ${min} AND ${max}`;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    async updateDateExpression(layerExpression, expression) {
        var _a;
        const { field, range } = expression;
        const layer = this.findFilterLayer(layerExpression);
        const graphic = await this.calculateMinMaxStatistics(layer, field);
        const attributes = (_a = graphic === null || graphic === void 0 ? void 0 : graphic[0]) === null || _a === void 0 ? void 0 : _a.attributes;
        expression.min = convertToDate(attributes[`min${field}`]);
        expression.max = convertToDate(attributes[`max${field}`]);
        if (range != null && ((range === null || range === void 0 ? void 0 : range.max) != null || (range === null || range === void 0 ? void 0 : range.min) != null)) {
            let { min, max } = range;
            min = min === null || min === void 0 ? void 0 : min.replace('+', ' ');
            max = max === null || max === void 0 ? void 0 : max.replace('+', ' ');
            if (min || max) {
                const chevron = max && !min ? '<' : !max && min ? '>' : null;
                if (chevron) {
                    expression.definitionExpression = `${field} ${chevron} '${min !== null && min !== void 0 ? min : max}'`;
                }
                else {
                    expression.definitionExpression = `${field} BETWEEN '${min}' AND '${max}'`;
                }
                return true;
            }
        }
        return false;
    }
    updateCodedValueExpression(expression, layerField) {
        var _a;
        const { field } = expression;
        const fields = [];
        expression.codedValues = {};
        const domain = layerField === null || layerField === void 0 ? void 0 : layerField.domain;
        (_a = domain === null || domain === void 0 ? void 0 : domain.codedValues) === null || _a === void 0 ? void 0 : _a.forEach(cv => {
            const { code, name } = cv;
            fields.push(code);
            if (expression.codedValues != null) {
                expression.codedValues[code] = name;
            }
        });
        expression.fields = fields;
        if (expression === null || expression === void 0 ? void 0 : expression.selectedFields) {
            const selectedFields = expression.selectedFields.map((field) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
            const definitionExpression = `${field} IN (${selectedFields.join(',')})`;
            expression.definitionExpression = definitionExpression;
            return true;
        }
        return false;
    }
    updateRangeExpression(expression, layerField) {
        const { field, range } = expression;
        const domain = layerField === null || layerField === void 0 ? void 0 : layerField.domain;
        expression.min = domain === null || domain === void 0 ? void 0 : domain.minValue;
        expression.max = domain === null || domain === void 0 ? void 0 : domain.maxValue;
        if (range && Object.keys(range).length) {
            const { min, max } = range;
            const definitionExpression = `${field} BETWEEN ${min} AND ${max}`;
            expression.definitionExpression = definitionExpression;
            return true;
        }
        return false;
    }
    async getFeatureAttributes(layer, field) {
        var _a, _b, _c;
        if (layer && supportedTypes.includes(layer.type)) {
            const query = layer.createQuery();
            if ((_b = (_a = layer === null || layer === void 0 ? void 0 : layer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b['supportsCacheHint']) {
                query.cacheHint = true;
            }
            if (field) {
                const initDefExpr = this.getInitDefExprFromLayer(layer);
                query.where = initDefExpr || '1=1';
                query.outFields = [field];
                query.orderByFields = [`${field} DESC`];
                query.returnDistinctValues = true;
                query.returnGeometry = false;
                query.maxRecordCountFactor = 3;
                if (this.extentSelector && this.extentSelectorConfig) {
                    const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
                    if (geo != null)
                        query.geometry = geo;
                    query.spatialRelationship = 'intersects';
                }
                return (_c = (await this.queryForFeatures(layer, query, field))) === null || _c === void 0 ? void 0 : _c.sort();
            }
        }
        return [];
    }
    async queryForFeatures(layer, query, field) {
        const results = await layer.queryFeatures(query);
        const features = results === null || results === void 0 ? void 0 : results.features.filter(feature => { var _a; return (_a = feature.attributes) === null || _a === void 0 ? void 0 : _a[field]; });
        return features === null || features === void 0 ? void 0 : features.map(feature => { var _a; return (_a = feature.attributes) === null || _a === void 0 ? void 0 : _a[field]; });
    }
    async calculateMinMaxStatistics(layer, field) {
        var _a, _b;
        if (layer && supportedTypes.includes(layer.type)) {
            const query = layer.createQuery();
            let initDefExpr = this.getInitDefExprFromLayer(layer);
            query.where = initDefExpr || '1=1';
            if ((_b = (_a = layer === null || layer === void 0 ? void 0 : layer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.supportsCacheHint) {
                query.cacheHint = true;
            }
            if (field) {
                const tmp = [
                    {
                        onStatisticField: field,
                        outStatisticFieldName: `max${field}`,
                        statisticType: 'max',
                    },
                    {
                        onStatisticField: field,
                        outStatisticFieldName: `min${field}`,
                        statisticType: 'min',
                    },
                ];
                query.outStatistics = tmp;
                if (this.extentSelector && this.extentSelectorConfig) {
                    const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
                    if (geo != null) {
                        query.geometry = geo;
                    }
                    query.spatialRelationship = 'intersects';
                }
                const results = await layer.queryFeatures(query);
                return results === null || results === void 0 ? void 0 : results.features;
            }
        }
        return [];
    }
    getExtent(extentSelector, extentSelectorConfig) {
        if (extentSelector && extentSelectorConfig) {
            const { constraints } = extentSelectorConfig;
            let newConstraints = Object.assign({}, constraints);
            const geometry = newConstraints === null || newConstraints === void 0 ? void 0 : newConstraints.geometry;
            if (geometry) {
                const tmpExtent = this.geometryJsonUtils.fromJSON(geometry);
                if (tmpExtent && ((tmpExtent === null || tmpExtent === void 0 ? void 0 : tmpExtent.type) === 'extent' || (tmpExtent === null || tmpExtent === void 0 ? void 0 : tmpExtent.type) === 'polygon')) {
                    return tmpExtent;
                }
            }
        }
        return;
    }
    setInitExpression(layerExpression, expression) {
        if (expression.field && expression.type) {
            const filterLayer = this.findFilterLayer(layerExpression);
            if (filterLayer == null) {
                return Promise.resolve();
            }
            if (filterLayer.loadStatus === 'not-loaded' || filterLayer.loadStatus === 'failed') {
                filterLayer.load();
            }
            return filterLayer.when(async () => {
                var _a, _b;
                const layerField = (_a = filterLayer.fields) === null || _a === void 0 ? void 0 : _a.find(({ name }) => name === expression.field);
                const domainType = (_b = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _b === void 0 ? void 0 : _b.type;
                expression.type = domainType === 'coded-value' || domainType === 'range' ? domainType : expression.type;
                await this.updateExpression(layerExpression, expression, layerField);
            });
        }
        else {
            this.updateExpression(layerExpression, expression, undefined);
            return Promise.resolve();
        }
    }
    async updateExpression(layerExpression, expression, layerField) {
        let update = false;
        const { type } = expression;
        if (type === 'string') {
            update = await this.updateStringExpression(layerExpression, expression);
        }
        else if (type === 'number') {
            update = await this.updateNumberExpression(layerExpression, expression);
        }
        else if (type === 'date') {
            if (expression.displayOption === 'drop-down') {
                update = await this.updateStringExpression(layerExpression, expression);
            }
            else {
                update = await this.updateDateExpression(layerExpression, expression);
            }
        }
        else if (type === 'coded-value') {
            update = this.updateCodedValueExpression(expression, layerField);
        }
        else if (type === 'range') {
            update = this.updateRangeExpression(expression, layerField);
        }
        else if (expression.active && (type === 'checkbox' || type == null)) {
            update = true;
        }
        if (update) {
            this.generateOutput(layerExpression);
        }
    }
    updateRangeExpressions(expression, layerExpression, max, min) {
        const initExp = this.getInitDefExprFromLayerExpression(layerExpression);
        if ((min || min === 0) && (max || max === 0)) {
            if (min === (expression === null || expression === void 0 ? void 0 : expression.min) && max === (expression === null || expression === void 0 ? void 0 : expression.max)) {
                expression.definitionExpression = undefined;
                expression.active = false;
            }
            else {
                expression.definitionExpression = initExp ? `(${initExp}) AND ${expression === null || expression === void 0 ? void 0 : expression.field} BETWEEN ${min} AND ${max}` : `${expression === null || expression === void 0 ? void 0 : expression.field} BETWEEN ${min} AND ${max}`;
                expression.active = true;
            }
        }
        expression.range = { min, max };
    }
    handleCheckboxChange(layerExpression, expression, event) {
        const node = event.target;
        expression.active = node.checked;
        this.generateOutput(layerExpression);
    }
    handleSliderChange(expression, layerExpression, event) {
        const { maxValue, minValue } = event.target;
        this.updateRangeExpressions(expression, layerExpression, maxValue, minValue);
        this.generateOutput(layerExpression);
    }
    handleComboSelect(expression, layerExpression, event) {
        const combobox = event.target;
        const items = combobox.selectedItems;
        const { field } = expression;
        if (items && items.length) {
            const values = items.map(({ value }) => (typeof value === 'number' ? value : `'${handleSingleQuote(value)}'`));
            expression.selectedFields = items.map(({ value }) => value);
            const definitionExpression = `${field} IN (${values.join(',')})`;
            expression.definitionExpression = definitionExpression;
            expression.active = true;
        }
        else {
            expression.definitionExpression = undefined;
            expression.active = false;
        }
        this.generateOutput(layerExpression);
    }
    handleDatePickerRangeChange(expression, layerExpression, event) {
        const datePicker = event.target;
        const [startDate, endDate] = datePicker.valueAsDate;
        const start = startDate != null ? convertToDate(Math.floor(startDate.getTime()), true) : undefined;
        const end = endDate != null ? convertToDate(Math.floor(endDate.getTime()), true) : undefined;
        if (start != null || end != null) {
            const chevron = end && start == null ? '<' : end == null && start ? '>' : null;
            if (chevron) {
                expression.definitionExpression = `${expression.field} ${chevron} '${start !== null && start !== void 0 ? start : end}'`;
            }
            else {
                expression.definitionExpression = `${expression.field} BETWEEN '${start}' AND '${end}'`;
            }
            expression.range = { min: start, max: end };
            expression.active = true;
            this.generateOutput(layerExpression);
        }
    }
    handleURLParams() {
        var _a;
        if ('URLSearchParams' in window) {
            const params = new URLSearchParams(document.location.search);
            const filters = (_a = params.get('filter')) === null || _a === void 0 ? void 0 : _a.split(';');
            filters === null || filters === void 0 ? void 0 : filters.forEach(filter => {
                var _a;
                const tmpFilter = JSON.parse(filter);
                (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.forEach(layerExpression => {
                    var _a;
                    if ((tmpFilter === null || tmpFilter === void 0 ? void 0 : tmpFilter.layerId) === layerExpression.id) {
                        (_a = layerExpression.expressions) === null || _a === void 0 ? void 0 : _a.forEach(expression => {
                            var _a, _b;
                            if (((_a = expression.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = tmpFilter === null || tmpFilter === void 0 ? void 0 : tmpFilter.expressionId) === null || _b === void 0 ? void 0 : _b.toString())) {
                                expression.active = true;
                                if (tmpFilter.type === 'range') {
                                    expression.range = tmpFilter.range;
                                }
                                else if (tmpFilter.type === 'select') {
                                    expression.selectedFields = tmpFilter.selectedFields;
                                }
                            }
                        });
                    }
                });
            });
        }
    }
    createURLParamExpression(layerExpression, expression) {
        const { id, range, selectedFields, type } = expression;
        if (type === 'number' || type === 'range' || type === 'date') {
            return {
                type: 'range',
                layerId: layerExpression.id,
                expressionId: id.toString(),
                range,
            };
        }
        else if (type === 'string' || type === 'coded-value') {
            return {
                type: 'select',
                layerId: layerExpression.id,
                expressionId: id.toString(),
                selectedFields,
            };
        }
        else {
            return {
                layerId: layerExpression.id,
                expressionId: id.toString(),
            };
        }
    }
    autoUpdateURLCheck(params) {
        if (this.autoUpdateUrl) {
            if (params.toString()) {
                window.history.replaceState({}, '', `${window.location.pathname}?${params} `);
            }
            else {
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    }
    generateURLParams() {
        var _a;
        if ('URLSearchParams' in window) {
            const params = new URLSearchParams(window.location.search);
            const expressions = [];
            (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.forEach(layerExpr => {
                var _a;
                (_a = layerExpr === null || layerExpr === void 0 ? void 0 : layerExpr.expressions) === null || _a === void 0 ? void 0 : _a.forEach(expression => {
                    if (expression.active) {
                        const paramExpression = this.createURLParamExpression(layerExpr, expression);
                        expressions.push(JSON.stringify(paramExpression));
                    }
                });
            });
            if (expressions.length > 0) {
                params.set('filter', expressions.join(';'));
            }
            else {
                params.delete('filter');
            }
            this.autoUpdateURLCheck(params);
            this.urlParams = params;
        }
    }
    updateFilter(layerExpression, defExpressions, filters) {
        const { id } = layerExpression;
        const fl = (this.view.map.findLayerById(id) || this.view.map.findTableById(id));
        if (fl != null) {
            if (fl.type === 'point-cloud') {
                this.updateFilterLayerPCLFilter(fl, filters);
            }
            else if (fl.type === 'map-image') {
                const sublayer = fl.findSublayerById(layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId);
                if (sublayer != null) {
                    this.updateFilterLayerDefExpression(sublayer, defExpressions, layerExpression);
                }
            }
            else {
                this.updateFilterLayerDefExpression(fl, defExpressions, layerExpression);
            }
        }
    }
    updateFilterLayerDefExpression(layer, defExpressions, layerExpression) {
        const { operator } = layerExpression;
        let initDefExpressions = this.getInitDefExprFromLayer(layer);
        const combinedExpressions = (defExpressions === null || defExpressions === void 0 ? void 0 : defExpressions.length) > 0 && initDefExpressions != null
            ? `(${defExpressions.join(operator)}) AND (${initDefExpressions})`
            : defExpressions.length > 0
                ? defExpressions.join(operator)
                : initDefExpressions;
        layer.definitionExpression = combinedExpressions;
    }
    updateFilterLayerPCLFilter(layer, filters) {
        layer.filters = filters;
    }
    async handleWhenView() {
        if (this.view == null)
            return;
        const map = this.view.map;
        await map.loadAll();
        this.handleLayerExpressionsUpdate();
    }
    async handleLayerExpressionsUpdate() {
        if (this.view == null)
            return;
        const map = this.view.map;
        this.initDefExpressions = {};
        this.initPointCloudFilters = {};
        this.initMapImageExpressions = {};
        const layersAndTables = map.allLayers.concat(map.allTables);
        for (let i = 0; i < layersAndTables.length; i++) {
            const layer = layersAndTables.getItemAt(i);
            if (supportedTypes.includes(layer.type)) {
                const fl = layer;
                if (fl.type === 'point-cloud') {
                    this.initPointCloudFilters[fl.id] = fl.filters;
                }
                else if (fl.type === 'map-image') {
                    this.initMapImageExpressions[fl.id] = {};
                    fl.allSublayers.forEach(sublayer => {
                        this.initMapImageExpressions[fl.id][sublayer.id] = sublayer.definitionExpression;
                    });
                }
                else {
                    this.initDefExpressions[fl.id] = fl.definitionExpression;
                }
            }
        }
        this.initExpressions();
        this.handleURLParams();
    }
    async handleZoomTo(layerExpression) {
        const zoomId = (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) ? `#zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `#zoom-to-${layerExpression.id}`;
        const zoomToBtn = this.panelEl.querySelector(zoomId);
        if (zoomToBtn != null) {
            zoomToBtn.loading = true;
            zoomToBtn.disabled = true;
        }
        this.zoomToGraphics = [];
        let loadingTime = 0;
        let startGoTo = false;
        const zoomToInterval = setInterval(() => {
            if (loadingTime >= 1000 && startGoTo) {
                this.view.goTo(this.zoomToGraphics);
                if (zoomToBtn != null) {
                    zoomToBtn.loading = false;
                    zoomToBtn.disabled = false;
                }
                clearInterval(zoomToInterval);
            }
            loadingTime += 500;
        }, 500);
        await this.getZoomToGraphics(layerExpression);
        startGoTo = true;
    }
    async getZoomToGraphics(layerExpression) {
        var _a, _b, _c, _d, _e;
        const lv = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id);
        const layer = lv.layer;
        const queryLayer = layer.type === 'map-image' ? layer.findSublayerById(layerExpression.sublayerId) : layer;
        if (queryLayer.type !== 'point-cloud' && supportedTypes.includes(queryLayer === null || queryLayer === void 0 ? void 0 : queryLayer.type)) {
            const query = queryLayer.createQuery();
            if ((_b = (_a = layer === null || layer === void 0 ? void 0 : layer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b['supportsCacheHint']) {
                query.cacheHint = true;
            }
            query.where = (_c = queryLayer.definitionExpression) !== null && _c !== void 0 ? _c : '1=1';
            query.returnGeometry = true;
            query.returnDistinctValues = true;
            query.maxRecordCountFactor = 3;
            query.returnExceededLimitFeatures = true;
            query.outFields = [];
            if (this.extentSelector && this.extentSelectorConfig) {
                const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
                if (geo != null)
                    query.geometry = geo;
                query.spatialRelationship = 'intersects';
            }
            const filter = ((_d = lv === null || lv === void 0 ? void 0 : lv.featureEffect) === null || _d === void 0 ? void 0 : _d.filter) != null ? lv.featureEffect.filter : lv.filter;
            if (filter != null) {
                if (filter.objectIds != null) {
                    query.objectIds = filter.objectIds;
                }
                if (filter.distance != null) {
                    query.distance = filter.distance;
                }
                if (filter.geometry != null) {
                    query.geometry = filter.geometry;
                }
                if (filter.distance != null) {
                    query.distance = filter.distance;
                }
                if (filter.spatialRelationship != null) {
                    query.spatialRelationship = filter.spatialRelationship;
                }
                if (filter.units != null) {
                    query.units = filter.units;
                }
                if (filter.where != null) {
                    query.where = filter.where;
                }
                if (filter.timeExtent != null) {
                    query.timeExtent = filter.timeExtent;
                }
            }
            try {
                const results = await queryLayer.queryFeatures(query);
                this.zoomToGraphics.push(...results.features);
            }
            catch (error) {
                if ((_e = error === null || error === void 0 ? void 0 : error.message) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes('distinct')) {
                    try {
                        query.returnDistinctValues = false;
                        const results = await queryLayer.queryFeatures(query);
                        this.zoomToGraphics.push(...results.features);
                    }
                    catch (_f) { }
                }
            }
        }
        return Promise.resolve();
    }
    generateOutput(layerExpression) {
        if (this.view == null)
            return;
        const defExpressions = [];
        let filters = [];
        if (layerExpression) {
            for (const expression of layerExpression.expressions) {
                const { active, definitionExpression, pointCloudFilters } = expression;
                if (active && definitionExpression) {
                    defExpressions.push(`(${definitionExpression})`);
                }
                if (active && pointCloudFilters != null && pointCloudFilters.length > 0) {
                    filters = filters.concat(pointCloudFilters);
                }
            }
            this.updateFilter(layerExpression, defExpressions, filters);
            this.generateURLParams();
            this.filterUpdate.emit();
        }
    }
    numberWithCommas(num) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 20 });
    }
    // If fieldInfo.format.places limits decimal digits then use this for min value to make sure the min is actually included in slider.
    // e.g. when using Math.round() with a min of 1.058 with only 2 decimal places would be 1.06 so the slider wouldn't contain the min. Math.floor() ensures it does.
    // Inverse of this reasoning for roundMaxNumberUp().
    roundMinNumberDown(num, decimalPlaces) {
        if (num == null)
            return;
        if (!('' + num).includes('e')) {
            return +(Math.floor((num + 'e+' + decimalPlaces)) + 'e-' + decimalPlaces);
        }
        else {
            var arr = ('' + num).split('e');
            var sig = '';
            if (+arr[1] + decimalPlaces > 0) {
                sig = '+';
            }
            return +(Math.floor((+arr[0] + 'e' + sig + (+arr[1] + decimalPlaces))) + 'e-' + decimalPlaces);
        }
    }
    roundMaxNumberUp(num, decimalPlaces) {
        if (num == null)
            return;
        if (!('' + num).includes('e')) {
            return +(Math.ceil((num + 'e+' + decimalPlaces)) + 'e-' + decimalPlaces);
        }
        else {
            var arr = ('' + num).split('e');
            var sig = '';
            if (+arr[1] + decimalPlaces > 0) {
                sig = '+';
            }
            return +(Math.ceil((+arr[0] + 'e' + sig + (+arr[1] + decimalPlaces))) + 'e-' + decimalPlaces);
        }
    }
    roundNumber(num, decimalPlaces) {
        if (num == null)
            return;
        if (!('' + num).includes('e')) {
            return +(Math.round((num + 'e+' + decimalPlaces)) + 'e-' + decimalPlaces);
        }
        else {
            var arr = ('' + num).split('e');
            var sig = '';
            if (+arr[1] + decimalPlaces > 0) {
                sig = '+';
            }
            return +(Math.round((+arr[0] + 'e' + sig + (+arr[1] + decimalPlaces))) + 'e-' + decimalPlaces);
        }
    }
    setExpressionFormat(layer, expression, field) {
        if ((layer === null || layer === void 0 ? void 0 : layer.popupTemplate) != null) {
            const fieldInfo = layer.popupTemplate.fieldInfos.find(({ fieldName }) => fieldName === field);
            expression.format = fieldInfo === null || fieldInfo === void 0 ? void 0 : fieldInfo.format;
        }
    }
    getInitDefExprFromLayer(layer) {
        var _a, _b, _c;
        return layer.type === 'sublayer' ? (_b = (_a = this.initMapImageExpressions) === null || _a === void 0 ? void 0 : _a[layer.layer.id]) === null || _b === void 0 ? void 0 : _b[layer.id] : (_c = this.initDefExpressions) === null || _c === void 0 ? void 0 : _c[layer.id];
    }
    getInitDefExprFromLayerExpression(layerExpression) {
        var _a, _b, _c;
        return (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) != null ? (_b = (_a = this.initMapImageExpressions) === null || _a === void 0 ? void 0 : _a[layerExpression.id]) === null || _b === void 0 ? void 0 : _b[layerExpression.sublayerId] : (_c = this.initDefExpressions) === null || _c === void 0 ? void 0 : _c[layerExpression.id];
    }
    findFilterLayer(layerExpression) {
        const allLayersAndTables = this.view.map.allLayers.concat(this.view.map.allTables);
        const layer = allLayersAndTables.find(({ id }) => id === layerExpression.id);
        if (layer.type === 'map-image') {
            return layer === null || layer === void 0 ? void 0 : layer.findSublayerById(layerExpression.sublayerId);
        }
        else {
            return layer;
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "view": ["watchViewHandler"],
        "layerExpressions": ["watchLayerExpressions"]
    }; }
};
InstantAppsFilterList.style = instantAppsFilterListCss;

const instantAppsSocialShareCss = ":host{display:block;--instant-apps-social-share-width--s:200px;--instant-apps-social-share-width--m:280px;--instant-apps-social-share-width--l:320px;--instant-apps-social-share-width-horizontal--s:300px;--instant-apps-social-share-width-horizontal--m:380px;--instant-apps-social-share-width-horizontal--l:420px;--instant-apps-social-share-background-color:var(--calcite-color-foreground-1);--instant-apps-social-share-popover-button-background-color:transparent;--instant-apps-social-share-popover-button-icon-color:var(--calcite-ui-icon-color);--instant-apps-social-share-embed-border:1px solid $border;--instant-apps-social-share-embed-text-area-text:#468540}:host .instant-apps-social-share__popover-button{background-color:var(--instant-apps-social-share-popover-button-background-color)}:host .instant-apps-social-share__popover-button calcite-icon{color:var(--instant-apps-social-share-popover-button-icon-color)}:host .instant-apps-social-share__dialog,:host .instant-apps-social-share__dialog-embed{background-color:var(--instant-apps-social-share-background-color);border:var(--instant-apps-social-share-embed-border)}:host .instant-apps-social-share__dialog{box-sizing:border-box;height:auto;padding:10px 0;border-radius:5px}:host .instant-apps-social-share__options{margin:0;padding:1% 0 0 0;list-style-type:none}:host .instant-apps-social-share__options li{box-sizing:border-box;display:flex;align-items:center;width:100%;padding:5%;transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__options li .instant-apps-social-share__icon,:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{display:inline-block}:host .instant-apps-social-share__options li .instant-apps-social-share__icon{display:flex;align-items:center}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{width:85%;margin-left:10px;word-break:break-word}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text--rtl{margin-left:0;margin-right:10px}:host .instant-apps-social-share__options li:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2)}:host .instant-apps-social-share__tip{box-sizing:border-box;padding:0 5% 1% 5%}:host .instant-apps-social-share__tip-header{display:flex;align-items:center;color:#007ac2;margin:8px 0 5px 0}:host .instant-apps-social-share__tip-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__tip-content{line-height:17px;margin:0;padding-top:2%}:host .instant-apps-social-share__success{display:flex;flex-direction:column;padding:15px}:host .instant-apps-social-share__success-header{display:flex;align-items:center;font-weight:bold;margin-bottom:10px}:host .instant-apps-social-share__success-icon{display:flex;align-items:center;margin-right:5px}:host .instant-apps-social-share__success-icon calcite-icon{color:var(--calcite-color-status-success)}:host .instant-apps-social-share__success-message{line-height:16px}:host .instant-apps-social-share__embed{box-sizing:border-box;width:100%;padding:5%;margin-bottom:10px;border-top:1px solid #d3d3d3}:host .instant-apps-social-share__embed-header{display:flex;align-items:center;margin-bottom:5px}:host .instant-apps-social-share__embed-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__embed-code-text-area{border:1px solid #d3d3d3}:host .instant-apps-social-share__embed-code-text-area textarea{box-sizing:border-box;padding:4%;border:none;resize:none;background:transparent;width:100%;font-family:var(--calcite-sans-family);color:var(--calcite-color-text-1)}:host .instant-apps-social-share__embed-code-text-area button{display:flex;align-items:center;text-align:start;width:100%;border:none;border-top:1px solid #d3d3d3;background-color:transparent;line-height:16px;font-weight:400;padding:3%;color:var(--calcite-color-text-1)}:host .instant-apps-social-share__embed-code-text-area button calcite-icon{color:#007ac2;margin-right:3px}:host .instant-apps-social-share__embed-code-text-area button:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2);transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__embed-text-area-text{font-weight:600;color:var(--instant-apps-social-share-embed-text-area-text)}:host .instant-apps-social-share__embed .instant-apps-social-share__text-area--rtl{text-align:left}:host .instant-apps-social-share__embed-dimensions{display:flex;justify-content:space-between;margin-top:10px}:host .instant-apps-social-share__embed-dimensions-input{width:47%;box-sizing:border-box}:host .instant-apps-social-share__embed-dimensions-input input{border:1px solid #d3d3d3;width:100%;height:25px;font-family:var(--calcite-sans-family)}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options{display:flex;justify-content:space-around;margin-bottom:8%}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li{flex-direction:column;padding:0}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li .instant-apps-social-share__option-text{word-break:break-word;margin-left:0;margin-top:10px;text-align:center}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li:hover{background-color:unset}:host .instant-apps-social-share__icon-container{display:flex;align-items:center}:host([scale=s]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--s)}:host([scale=s]) .instant-apps-social-share__icon{width:16px;height:16px}:host([scale=s]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size--1)}:host([scale=s]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--s)}:host([scale=s]) .instant-apps-social-share__tip-header,:host([scale=s]) .instant-apps-social-share__tip-content,:host([scale=s]) .instant-apps-social-share__embed-header,:host([scale=s]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--2)}:host([scale=m]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--m)}:host([scale=m]) .instant-apps-social-share__icon{width:24px;height:24px}:host([scale=m]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-0)}:host([scale=m]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--m)}:host([scale=m]) .instant-apps-social-share__tip-header,:host([scale=m]) .instant-apps-social-share__tip-content,:host([scale=m]) .instant-apps-social-share__embed-header,:host([scale=m]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--1)}:host([scale=l]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--l)}:host([scale=l]) .instant-apps-social-share__icon{width:32px;height:32px}:host([scale=l]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-1)}:host([scale=l]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--l)}:host([scale=l]) .instant-apps-social-share__tip-header,:host([scale=l]) .instant-apps-social-share__tip-content,:host([scale=l]) .instant-apps-social-share__embed-header,:host([scale=l]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size-0)}";

const base = 'instant-apps-social-share';
const CSS = {
    base,
    dialog: `${base}__dialog`,
    dialogEmbed: `${base}__dialog-embed`,
    dialogContent: `${base}__dialog-content`,
    options: `${base}__options`,
    tipContainer: `${base}__tip`,
    tipHeader: `${base}__tip-header`,
    tipContent: `${base}__tip-content`,
    icon: `${base}__icon`,
    iconContainer: `${base}__icon-container`,
    optionText: `${base}__option-text`,
    popoverButton: `${base}__popover-button`,
    layout: {
        vertical: `${base}__layout--vertical`,
        horizontal: `${base}__layout--horizontal`,
    },
    success: {
        container: `${base}__success`,
        header: `${base}__success-header`,
        message: `${base}__success-message`,
        icon: `${base}__success-icon`,
    },
    embed: {
        container: `${base}__embed`,
        header: `${base}__embed-header`,
        embedCode: {
            container: `${base}__embed-code`,
            textArea: `${base}__embed-code-text-area`,
            copyButton: `${base}__embed-code-copy-button`,
        },
        textAreaText: `${base}__embed-text-area-text`,
        dimensions: {
            container: `${base}__embed-dimensions`,
            input: `${base}__embed-dimensions-input`,
        },
    },
    rtl: {
        optionText: `${base}__option-text--rtl`,
        textArea: `${base}__text-area--rtl`,
    },
};
const SOCIAL_URL_TEMPLATES = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    twitter: 'https://twitter.com/intent/tweet?text={text}&url={url}',
    linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};
const SHORTEN_API = 'https://arcg.is/prod/shorten';
const MIN_WIDTH_HEIGHT_VALUE = '1';
const InstantAppsSocialShare = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.mode = 'popover';
        this.shareUrl = window.location.href;
        this.autoUpdateShareUrl = true;
        this.shareText = '';
        this.embed = false;
        this.shareButtonColor = 'neutral';
        this.shareButtonType = 'button';
        this.shareButtonScale = undefined;
        this.iframeInnerText = '';
        this.popoverButtonIconScale = 'm';
        this.view = undefined;
        this.displayTipText = true;
        this.shortenShareUrl = true;
        this.socialMedia = true;
        this.shareIconsLayout = 'vertical';
        this.scale = 'm';
        this.successMessage = '';
        this.defaultUrlParams = null;
        this.inlineSuccessPopoverPlacement = 'trailing';
        this.messages = undefined;
        this.opened = false;
        this.copied = false;
        this.inlineCopyLinkOpened = false;
        this.inlineCopyEmbedOpened = false;
        this.embedWidth = 400;
        this.embedHeight = 600;
    }
    componentDidLoad() {
        var _a, _b;
        getMessages(this);
        this.setupAutoCloseListeners();
        if (this.mode === 'popover') {
            if (this.opened)
                this.popoverRef.open = true;
            this.popoverRef.addEventListener('calcitePopoverOpen', () => {
                if (!this.shareListRef)
                    return;
                const firstNode = this.shareListRef.children[0];
                firstNode.focus();
            });
            this.popoverRef.addEventListener('keydown', this.handlePopoverRefKeyDown.bind(this));
        }
        if (this.embed) {
            (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.updateDimensions.bind(this, 'width'));
            (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.addEventListener('change', this.updateDimensions.bind(this, 'height'));
        }
    }
    disconnectedCallback() {
        var _a, _b, _c;
        document.documentElement.removeEventListener('click', this.autoCloseCallback.bind(this));
        if (this.mode === 'popover') {
            if (this.popoverRef != null) {
                this.popoverRef.removeEventListener('click', this.stopPropagationCallback.bind(this));
                this.popoverRef.removeEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
                this.popoverRef.removeEventListener('keydown', this.handlePopoverRefKeyDown.bind(this));
            }
        }
        else {
            (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.updateDimensions.bind(this));
            (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('change', this.updateDimensions.bind(this));
            (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.stopPropagationCallback.bind(this));
        }
    }
    setupAutoCloseListeners() {
        var _a, _b, _c;
        document.documentElement.addEventListener('click', this.autoCloseCallback.bind(this));
        if (this.mode === 'popover') {
            (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.stopPropagationCallback.bind(this));
            (_b = this.popoverRef) === null || _b === void 0 ? void 0 : _b.addEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
        }
        else {
            (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.stopPropagationCallback.bind(this));
        }
    }
    handlePopoverRefKeyDown(e) {
        var _a, _b;
        if (e.code === 'Tab') {
            if (!this.shareListRef)
                return;
            const node = e.target;
            const firstFocusableEl = this.shareListRef.children[0];
            const lastFocusableEl = this.shareListRef.children[((_a = this.shareListRef) === null || _a === void 0 ? void 0 : _a.children.length) - 1];
            if (e.shiftKey && node === firstFocusableEl) {
                e.preventDefault();
                lastFocusableEl.focus();
            }
            else if (!e.shiftKey && node === lastFocusableEl) {
                e.preventDefault();
                firstFocusableEl.focus();
            }
        }
        else if (e.code === 'Escape') {
            this.closePopover();
            (_b = this.popoverButtonRef) === null || _b === void 0 ? void 0 : _b.setFocus();
        }
    }
    autoCloseCallback() {
        if (this.mode === 'popover') {
            this.opened = false;
            this.popoverRef.open = this.opened;
        }
        else {
            if (this.copyLinkPopoverRef)
                this.copyLinkPopoverRef.open = false;
            this.inlineCopyLinkOpened = false;
            if (this.copyEmbedPopoverRef)
                this.copyEmbedPopoverRef.open = false;
            this.inlineCopyEmbedOpened = false;
        }
    }
    stopPropagationCallback(event) {
        event.stopPropagation();
    }
    resetPopoverCopyState() {
        var _a;
        (_a = this.popoverButtonRef) === null || _a === void 0 ? void 0 : _a.setFocus();
        setTimeout(() => {
            this.copied = false;
        }, 200);
    }
    updateDimensions(type) {
        var _a, _b;
        if (type === 'width') {
            const value = (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.value;
            this.embedWidth = parseInt(value);
        }
        else {
            const value = (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.value;
            this.embedHeight = parseInt(value);
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        const content = this.copied && this.mode === 'popover' ? (this.renderSuccess()) : (h("div", { class: CSS.dialogContent }, this.renderOptions(), this.displayTipText ? this.renderTip() : null, this.embed ? this.renderEmbed() : null));
        const layoutClass = this.shareIconsLayout === 'vertical' ? ` ${CSS.layout.vertical}` : ` ${CSS.layout.horizontal}`;
        const dialogContent = (h("div", { ref: el => (this.dialogContentRef = el), class: `${CSS.dialog}${layoutClass}` }, content));
        return (h(Host, null, this.mode === 'popover'
            ? [
                h("calcite-popover", { ref: (el) => (this.popoverRef = el), label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, referenceElement: "shareButton", placement: "bottom-start", scale: this.scale }, dialogContent),
                this.renderButton(),
            ]
            : [
                dialogContent,
                h("calcite-popover", { ref: (el) => (this.copyLinkPopoverRef = el), label: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, referenceElement: "copyToClipboard", placement: this.inlineSuccessPopoverPlacement, scale: this.scale }, this.renderSuccess()),
                h("calcite-popover", { ref: (el) => (this.copyEmbedPopoverRef = el), label: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, referenceElement: "copyEmbedToClipboard", placement: this.inlineSuccessPopoverPlacement, scale: this.scale }, this.renderEmbedSuccess()),
            ]));
    }
    renderButton() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const scale = this.shareButtonScale != null ? this.shareButtonScale : this.scale;
        return this.shareButtonType === 'button' ? (h("calcite-button", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, kind: this.shareButtonColor, appearance: "transparent", label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, title: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, scale: scale }, h("div", { class: CSS.iconContainer }, h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale })))) : (h("calcite-action", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, appearance: "transparent", label: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, title: (_h = (_g = this.messages) === null || _g === void 0 ? void 0 : _g.share) === null || _h === void 0 ? void 0 : _h.label, scale: scale, text: "" }, h("div", { class: CSS.iconContainer }, h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale }))));
    }
    renderSuccess() {
        var _a;
        const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
        return (h("div", { class: CSS.success.container }, h("span", { class: CSS.success.header }, h("span", { class: CSS.success.icon }, h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
            success.label), h("span", { class: CSS.success.message }, this.successMessage || (success === null || success === void 0 ? void 0 : success.url))));
    }
    renderEmbedSuccess() {
        var _a;
        const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
        return (h("div", { class: CSS.success.container }, h("span", { class: CSS.success.header }, h("span", { class: CSS.success.icon }, h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
            success.label), h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.embed)));
    }
    renderOptions() {
        var _a, _b, _c, _d;
        const options = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.options;
        const optionText_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.optionText}` : '';
        return (h("ul", { ref: el => (this.shareListRef = el), class: CSS.options, role: "menu" }, h("li", { id: "copyToClipboard", onClick: this.handleShareItem.bind(this, 'link'), onKeyDown: this.handleOptionKeyDown('link'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, h("calcite-icon", { icon: "link", scale: this.scale })), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_b = options === null || options === void 0 ? void 0 : options.link) === null || _b === void 0 ? void 0 : _b.label)), this.socialMedia
            ? [
                h("li", { onClick: this.handleShareItem.bind(this, 'facebook'), onKeyDown: this.handleOptionKeyDown('facebook'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, this.renderFacebookIcon()), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_c = options === null || options === void 0 ? void 0 : options.facebook) === null || _c === void 0 ? void 0 : _c.label)),
                h("li", { onClick: this.handleShareItem.bind(this, 'twitter'), onKeyDown: this.handleOptionKeyDown('twitter'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, this.renderTwitterIcon()), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, "Twitter")),
                h("li", { onClick: this.handleShareItem.bind(this, 'linkedIn'), onKeyDown: this.handleOptionKeyDown('linkedIn'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, this.renderLinkedInIcon()), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_d = options === null || options === void 0 ? void 0 : options.linkedIn) === null || _d === void 0 ? void 0 : _d.label)),
            ]
            : null));
    }
    handleOptionKeyDown(type) {
        return (e) => {
            const keyCode = e.code;
            const canActivate = keyCode === 'Space' || keyCode === 'Enter';
            if (!canActivate)
                return;
            this.handleShareItem(type);
        };
    }
    renderFacebookIcon() {
        return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h("g", null, h("path", { d: "M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z", style: { fill: '#1877f2', fillRule: 'nonzero' } }), h("path", { d: "M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z", style: { fill: '#fff', fillRule: 'nonzero' } }))));
    }
    renderTwitterIcon() {
        return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h("rect", { height: "400", style: { fill: 'none' }, width: "400", x: "56", y: "56" }), h("path", { d: "M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104", style: { fill: '#1da1f2', fillRule: 'nonzero' } })));
    }
    renderLinkedInIcon() {
        return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h("g", { id: "g5891" }, h("path", { d: "M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z", id: "background", style: { fill: '#2867b2' } }), h("g", { id: "shapes" }, h("rect", { height: "257.962", id: "rect11", style: { fill: '#fff' }, width: "85.76", x: "61.053", y: "178.667" }), h("path", { d: "M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z", id: "path13-0", style: { fill: '#fff', fillRule: 'nonzero' } }), h("path", { d: "M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z", id: "path15", style: { fill: '#fff', fillRule: 'nonzero' } })))));
    }
    renderTip() {
        var _a;
        const info = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.info;
        return (h("div", { class: CSS.tipContainer }, h("span", { class: CSS.tipHeader }, h("calcite-icon", { icon: "lightbulb", scale: this.scale }), h("span", null, info === null || info === void 0 ? void 0 : info.label)), h("p", { class: CSS.tipContent }, info === null || info === void 0 ? void 0 : info.tooltip)));
    }
    renderEmbed() {
        var _a, _b, _c;
        const embedMessages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.embed;
        const textarea_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.textArea}` : '';
        return (h("div", { class: CSS.embed.container }, h("span", { class: CSS.embed.header }, h("calcite-icon", { icon: "code", scale: this.scale }), h("span", null, (_c = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.embed) === null || _c === void 0 ? void 0 : _c.label)), h("div", { class: CSS.embed.embedCode.container }, h("div", { class: CSS.embed.embedCode.textArea }, h("textarea", { ref: el => (this.embedCodeRef = el), cols: 30, rows: 5, readonly: true, class: textarea_RTL, value: this.getEmbedCode() }), h("button", { id: "copyEmbedToClipboard", onClick: this.copyEmbedCode.bind(this), class: CSS.embed.embedCode.copyButton }, h("calcite-icon", { icon: "copy", scale: this.scale }), h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.copy))), h("span", { class: CSS.embed.textAreaText }, h("slot", { name: "text-area-text" })), h("div", { class: CSS.embed.dimensions.container }, h("label", { class: CSS.embed.dimensions.input }, h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.width), h("input", { ref: el => (this.embedWidthRef = el), type: "number", onKeyDown: e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault(), onChange: this.handleNumberInputOnChange('width'), value: this.embedWidth, min: "1" })), h("label", { class: CSS.embed.dimensions.input }, h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.height), h("input", { ref: el => (this.embedHeightRef = el), type: "number", onKeyDown: e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault(), onChange: this.handleNumberInputOnChange('height'), value: this.embedHeight, min: "1" }))))));
    }
    handleNumberInputOnChange(type) {
        const ref = (type === 'width' ? this.embedWidthRef : this.embedHeightRef);
        const valType = type === 'width' ? 'embedWidth' : 'embedHeight';
        return () => {
            if (ref) {
                const value = parseFloat(ref.value);
                if (value <= 0) {
                    this[valType] = parseInt(MIN_WIDTH_HEIGHT_VALUE);
                    ref.value = MIN_WIDTH_HEIGHT_VALUE;
                }
            }
        };
    }
    togglePopover(event) {
        event.stopPropagation();
        this.opened = !this.opened;
        this.popoverRef.open = this.opened;
    }
    closePopover() {
        this.opened = false;
        this.popoverRef.open = this.opened;
    }
    async handleShareItem(type) {
        var _a, _b, _c, _d;
        this.shareUrl = await this.generateShareUrl();
        let shortenedUrl = null;
        // Detects Safari - If Safari, do not shorten URL due to Safari not allowing clipboard copy after network requests
        const isChrome = (_b = (_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes('Chrome')) !== null && _b !== void 0 ? _b : false;
        const isSafari = ((_d = (_c = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _c === void 0 ? void 0 : _c.includes('Safari')) !== null && _d !== void 0 ? _d : false) && !isChrome;
        if (!isSafari && this.shortenShareUrl) {
            shortenedUrl = await this.shortenUrl(this.shareUrl);
        }
        let urlToUse = shortenedUrl ? shortenedUrl : this.shareUrl;
        switch (type) {
            case 'link':
                navigator.clipboard.writeText(urlToUse);
                if (this.embed) {
                    this.copyEmbedPopoverRef.open = false;
                    this.inlineCopyEmbedOpened = false;
                }
                if (this.mode === 'inline') {
                    this.copyLinkPopoverRef.open = true;
                    setTimeout(() => (this.copyLinkPopoverRef.open = false), 3000);
                }
                this.inlineCopyLinkOpened = true;
                this.copied = true;
                if (this.mode === 'popover')
                    setTimeout(() => this.closePopover(), 2000);
                return;
            case 'facebook':
            case 'twitter':
            case 'linkedIn':
                let socialWin;
                if (isSafari) {
                    socialWin = window.open('', '_blank');
                    if (this.shortenShareUrl) {
                        urlToUse = (await this.shortenUrl(this.shareUrl)) || urlToUse;
                    }
                }
                const urlData = {
                    url: encodeURI(urlToUse),
                };
                const data = type === 'twitter' ? Object.assign(Object.assign({}, urlData), { text: this.shareText }) : urlData;
                const [intl] = await loadModules(['esri/intl']);
                const url = intl.substitute(SOCIAL_URL_TEMPLATES[type], data);
                if (this.mode === 'popover') {
                    this.closePopover();
                }
                // With Safari, need to open new tab using the triggering event, so add shortened URL after opening.
                // Safari truncates URL without this approach.
                if (isSafari && socialWin) {
                    socialWin.location = url;
                    socialWin.focus();
                }
                else {
                    window.open(encodeURI(url), '_blank');
                }
                return;
        }
    }
    async shortenUrl(url) {
        var _a, _b;
        const [esriRequest] = await loadModules(['esri/request']);
        const request = await esriRequest(SHORTEN_API, {
            query: {
                longUrl: url,
                f: 'json',
            },
        });
        const shortUrl = (_b = (_a = request === null || request === void 0 ? void 0 : request.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url;
        if (shortUrl) {
            return shortUrl.replace('http://', 'https://');
        }
    }
    getEmbedCode() {
        return `<iframe src="${this.shareUrl}" width="${this.embedWidth}" height="${this.embedHeight}" frameborder="0" style="border:0" allowfullscreen>${this.iframeInnerText}</iframe>`;
    }
    copyEmbedCode() {
        navigator.clipboard.writeText(this.getEmbedCode());
        this.copyLinkPopoverRef.open = false;
        this.inlineCopyLinkOpened = false;
        this.copyEmbedPopoverRef.open = true;
        setTimeout(() => (this.copyEmbedPopoverRef.open = false), 3000);
        this.inlineCopyEmbedOpened = true;
    }
    // VIEW LOGIC
    async generateShareUrl() {
        var _a;
        if (this.autoUpdateShareUrl) {
            // Update shareUrl--it may have changes since the component was loaded
            this.shareUrl = window.location.href;
        }
        // If view is not ready
        if (!this.view || !((_a = this.view) === null || _a === void 0 ? void 0 : _a.ready)) {
            return this.shareUrl;
        }
        // Use x/y values and the spatial reference of the view to instantiate a geometry point
        const { x, y } = this.view.center;
        const { spatialReference } = this.view;
        const [Point, SpatialReference] = await loadModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']);
        const updatedSpatialReference = new SpatialReference(Object.assign({}, spatialReference.toJSON()));
        const centerPoint = new Point({
            x,
            y,
            spatialReference: updatedSpatialReference,
        });
        // Use pointToConvert to project point. Once projected, pass point to generate the share URL parameters
        const point = await this.processPoint(centerPoint);
        const { isWGS84, isWebMercator } = point.spatialReference;
        const isNotProjected = isWGS84 || isWebMercator;
        return this.generateShareUrlParams(point, isNotProjected);
    }
    async processPoint(point) {
        const { isWGS84, isWebMercator } = point.spatialReference;
        // If spatial reference is WGS84 or Web Mercator, use longitude/latitude values to generate the share URL parameters
        if (isWGS84 || isWebMercator) {
            return point;
        }
        const [SpatialReference, projection] = await loadModules(['esri/geometry/SpatialReference', 'esri/geometry/projection']);
        const outputSpatialReference = new SpatialReference({ wkid: 4326 });
        try {
            await projection.load();
            const projectedPoint = projection.project(point, outputSpatialReference);
            return Promise.resolve(projectedPoint);
        }
        catch (err) {
            console.error('Failed to project point', err);
            return Promise.reject(null);
        }
    }
    generateShareUrlParams(point, isNotProjected) {
        var _a, _b, _c, _d;
        const { longitude, latitude, x, y } = point;
        if (longitude === undefined || latitude === undefined) {
            return this.shareUrl;
        }
        const roundedLon = this.roundValue(isNotProjected ? longitude : x);
        const roundedLat = this.roundValue(isNotProjected ? latitude : y);
        const { zoom } = this.view;
        const roundedZoom = this.roundValue(zoom);
        const graphic = (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.popup) === null || _b === void 0 ? void 0 : _b.selectedFeature;
        const visible = (_d = (_c = this.view) === null || _c === void 0 ? void 0 : _c.popup) === null || _d === void 0 ? void 0 : _d.visible;
        let layerId;
        let oid;
        if (graphic && visible) {
            const featureLayer = graphic === null || graphic === void 0 ? void 0 : graphic.layer;
            layerId = featureLayer.id;
            oid = graphic.attributes[featureLayer.objectIdField];
        }
        const hiddenLayers = this.view.map.allLayers
            .filter(layer => !layer.visible)
            .toArray()
            .map(featureLayer => featureLayer.id)
            .toString()
            .replaceAll(',', ';');
        const { type } = this.view;
        const { defaultUrlParams } = this;
        const url = new URL(this.shareUrl);
        const { searchParams } = url;
        // Resets existing URL params
        if (searchParams.get('center'))
            searchParams.delete('center');
        if (searchParams.get('level'))
            searchParams.delete('level');
        if (searchParams.get('selectedFeature'))
            searchParams.delete('selectedFeature');
        if (searchParams.get('hiddenLayers'))
            searchParams.delete('hiddenLayers');
        if (searchParams.get('viewpoint'))
            searchParams.delete('viewpoint');
        // Checks if view.type is 3D, if so, set 3D url parameters
        if (type === '3d') {
            // viewpoint=cam:{camera.position.longitude},{camera.position.latitude},{camera.position.z};{camera.heading},{camera.tilt}
            const { camera } = this.view;
            const { heading, position, tilt } = camera;
            const { longitude, latitude, z } = position;
            const viewpoint_Values = {
                longitude: this.roundValue(longitude, 8),
                latitude: this.roundValue(latitude, 8),
                z: this.roundValue(z, 3),
                heading: this.roundValue(heading, 3),
                tilt: this.roundValue(tilt, 3),
            };
            const viewpointVal = `cam:${viewpoint_Values.longitude},${viewpoint_Values.latitude},${viewpoint_Values.z};${viewpoint_Values.heading},${viewpoint_Values.tilt}`;
            if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.viewpoint) !== false)
                url.searchParams.set('viewpoint', viewpointVal);
            if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
                url.searchParams.set('selectedFeature', `${layerId};${oid}`);
            if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.hiddenLayers) !== false)
                url.searchParams.set('hiddenLayers', hiddenLayers);
            url.search = decodeURIComponent(url.search);
            return url.href;
        }
        // Otherwise, just return original url for 2D
        if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.center) !== false)
            url.searchParams.set('center', `${roundedLon};${roundedLat}`);
        if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.level) !== false)
            url.searchParams.set('level', `${roundedZoom}`);
        if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
            url.searchParams.set('selectedFeature', `${layerId};${oid}`);
        if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.hiddenLayers) !== false)
            url.searchParams.set('hiddenLayers', hiddenLayers);
        url.search = decodeURIComponent(url.search);
        return url.href;
    }
    roundValue(val, decimalPoints = 4) {
        return parseFloat(val.toFixed(decimalPoints));
    }
    get el() { return getElement(this); }
};
InstantAppsSocialShare.style = instantAppsSocialShareCss;

export { InputDatePicker as calcite_input_date_picker, InstantAppsFilterList as instant_apps_filter_list, InstantAppsSocialShare as instant_apps_social_share };
