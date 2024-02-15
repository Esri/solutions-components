/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as connectLabel, d as disconnectLabel } from './label.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { b as getDateTimeFormat, c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { c as connectForm, d as disconnectForm, a as afterConnectDefaultValueSet, H as HiddenFormInputSlot } from './form.js';
import { d as defineCustomElement$5 } from './chip.js';
import { d as defineCustomElement$4 } from './combobox.js';
import { d as defineCustomElement$3 } from './combobox-item.js';
import { d as defineCustomElement$2 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const hourToMinutes = 60;
const timeZoneNameBlockList = [
    "CET",
    "CST6CDT",
    "EET",
    "EST",
    "EST5EDT",
    "Factory",
    "HST",
    "MET",
    "MST",
    "MST7MDT",
    "PST8PDT",
    "UTC",
    "WET",
];
function timeZoneOffsetToDecimal(shortOffsetTimeZoneName) {
    const minusSign = "−";
    const hyphen = "-";
    return (shortOffsetTimeZoneName
        .replace(":15", ".25")
        .replace(":30", ".5")
        .replace(":45", ".75")
        // ensures decimal string representation is parseable
        .replace(minusSign, hyphen));
}
function toOffsetValue(timeZoneName, referenceDateInMs) {
    // we use "en-US" to allow us to reliably remove the standard time token
    const offset = getTimeZoneShortOffset(timeZoneName, "en-US", referenceDateInMs).replace("GMT", "");
    if (offset === "") {
        return 0;
    }
    return Number(timeZoneOffsetToDecimal(offset)) * hourToMinutes;
}
function getUserTimeZoneOffset() {
    const localDate = new Date();
    return localDate.getTimezoneOffset() * -1;
}
function getUserTimeZoneName() {
    const dateFormatter = new Intl.DateTimeFormat();
    return dateFormatter.resolvedOptions().timeZone;
}
/**
 * The lazy-loaded timezone-groups lib to be used across instances.
 */
let timeZoneGroups;
async function createTimeZoneItems(locale, messages, mode, referenceDate) {
    const referenceDateInMs = referenceDate.getTime();
    const timeZoneNames = Intl.supportedValuesOf("timeZone");
    if (mode === "offset") {
        if (!timeZoneGroups) {
            timeZoneGroups = Promise.all([
                import('./index5.js'),
                import('./index6.js'),
            ]);
        }
        return timeZoneGroups.then(async ([{ groupTimeZones }, { DateEngine }]) => {
            const timeZoneGroups = await groupTimeZones({
                dateEngine: new DateEngine(),
                groupDateRange: 1,
                startDate: new Date(referenceDateInMs).toISOString(),
            });
            const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });
            // we remove blocked entries from tzs and adjust label indices accordingly
            timeZoneGroups.forEach((group) => {
                const indexOffsets = [];
                let removedSoFar = 0;
                group.tzs.forEach((tz, index) => {
                    if (timeZoneNameBlockList.includes(tz)) {
                        removedSoFar++;
                    }
                    indexOffsets[index] = removedSoFar;
                });
                group.tzs = group.tzs.filter((tz) => !timeZoneNameBlockList.includes(tz));
                group.labelTzIndices = group.labelTzIndices
                    .map((index) => index - indexOffsets[index])
                    .filter((index) => index >= 0 && index < group.tzs.length);
            });
            return timeZoneGroups
                .map(({ labelTzIndices, tzs }) => {
                const groupRepTz = tzs[0];
                const decimalOffset = timeZoneOffsetToDecimal(getTimeZoneShortOffset(groupRepTz, locale, referenceDateInMs));
                const value = toOffsetValue(groupRepTz, referenceDateInMs);
                const tzLabels = labelTzIndices.map((index) => {
                    const timeZone = tzs[index];
                    const timeZoneLabel = messages[timeZone];
                    return (timeZoneLabel ||
                        // get city token
                        timeZone.split("/").pop());
                });
                const label = createTimeZoneOffsetLabel(messages, decimalOffset, listFormatter.format(tzLabels));
                return {
                    label,
                    value,
                    filterValue: tzs.map((tz) => toUserFriendlyName(tz)),
                };
            })
                .filter((group) => !!group)
                .sort((groupA, groupB) => groupA.value - groupB.value);
        });
    }
    return timeZoneNames
        .map((timeZone) => {
        const label = toUserFriendlyName(timeZone);
        const value = timeZone;
        return {
            label,
            value,
            filterValue: timeZone,
        };
    })
        .filter((group) => !!group)
        .sort();
}
/**
 * Exported for testing purposes only
 *
 * @internal
 */
function toUserFriendlyName(timeZoneName) {
    return timeZoneName.replace(/_/g, " ");
}
function createTimeZoneOffsetLabel(messages, offsetLabel, groupLabel) {
    return messages.timeZoneLabel.replace("{offset}", offsetLabel).replace("{cities}", groupLabel);
}
function getTimeZoneShortOffset(timeZone, locale, referenceDateInMs = Date.now()) {
    const dateTimeFormat = getDateTimeFormat(locale, { timeZone, timeZoneName: "shortOffset" });
    const parts = dateTimeFormat.formatToParts(referenceDateInMs);
    return parts.find(({ type }) => type === "timeZoneName").value;
}

const inputTimeZoneCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const InputTimeZone = /*@__PURE__*/ proxyCustomElement(class InputTimeZone extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInputTimeZoneBeforeClose = createEvent(this, "calciteInputTimeZoneBeforeClose", 6);
        this.calciteInputTimeZoneBeforeOpen = createEvent(this, "calciteInputTimeZoneBeforeOpen", 6);
        this.calciteInputTimeZoneChange = createEvent(this, "calciteInputTimeZoneChange", 6);
        this.calciteInputTimeZoneClose = createEvent(this, "calciteInputTimeZoneClose", 6);
        this.calciteInputTimeZoneOpen = createEvent(this, "calciteInputTimeZoneOpen", 6);
        this.setComboboxRef = (el) => {
            this.comboboxEl = el;
        };
        this.onComboboxBeforeClose = (event) => {
            event.stopPropagation();
            this.calciteInputTimeZoneBeforeClose.emit();
        };
        this.onComboboxBeforeOpen = (event) => {
            event.stopPropagation();
            this.calciteInputTimeZoneBeforeOpen.emit();
        };
        this.onComboboxChange = (event) => {
            event.stopPropagation();
            const combobox = event.target;
            const selected = this.findTimeZoneItem(combobox.selectedItems[0].getAttribute("data-value"));
            const selectedValue = `${selected.value}`;
            if (this.value === selectedValue) {
                return;
            }
            this.value = selectedValue;
            this.selectedTimeZoneItem = selected;
            this.calciteInputTimeZoneChange.emit();
        };
        this.onComboboxClose = (event) => {
            event.stopPropagation();
            this.open = false;
            this.calciteInputTimeZoneClose.emit();
        };
        this.onComboboxOpen = (event) => {
            this.open = true;
            event.stopPropagation();
            this.calciteInputTimeZoneOpen.emit();
        };
        this.disabled = false;
        this.form = undefined;
        this.maxItems = 0;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.mode = "offset";
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.name = undefined;
        this.open = false;
        this.overlayPositioning = "absolute";
        this.referenceDate = undefined;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.value = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleTimeZoneItemPropsChange() {
        this.updateTimeZoneItemsAndSelection();
    }
    handleValueChange(value, oldValue) {
        const timeZoneItem = this.findTimeZoneItem(value);
        if (!timeZoneItem) {
            this.value = oldValue;
            return;
        }
        this.selectedTimeZoneItem = timeZoneItem;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    async setFocus() {
        await componentFocusable(this);
        await this.comboboxEl.setFocus();
    }
    effectiveLocaleWatcher() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    onLabelClick() {
        this.setFocus();
    }
    findTimeZoneItem(value) {
        const valueToMatch = value;
        return this.timeZoneItems.find(({ value }) => 
        // intentional == to match string to number
        value == valueToMatch);
    }
    async updateTimeZoneItemsAndSelection() {
        var _a;
        this.timeZoneItems = await this.createTimeZoneItems();
        const fallbackValue = this.mode === "offset" ? getUserTimeZoneOffset() : getUserTimeZoneName();
        const valueToMatch = (_a = this.value) !== null && _a !== void 0 ? _a : fallbackValue;
        this.selectedTimeZoneItem = this.findTimeZoneItem(valueToMatch);
        if (!this.selectedTimeZoneItem) {
            this.selectedTimeZoneItem = this.findTimeZoneItem(fallbackValue);
        }
    }
    async createTimeZoneItems() {
        var _a;
        if (!this.effectiveLocale || !this.messages) {
            return [];
        }
        return createTimeZoneItems(this.effectiveLocale, this.messages, this.mode, this.referenceDate instanceof Date
            ? this.referenceDate
            : new Date((_a = this.referenceDate) !== null && _a !== void 0 ? _a : Date.now()));
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectForm(this);
        connectLabel(this);
        connectLocalized(this);
        connectMessages(this);
    }
    disconnectedCallback() {
        disconnectForm(this);
        disconnectLabel(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
        await this.updateTimeZoneItemsAndSelection();
        const selectedValue = `${this.selectedTimeZoneItem.value}`;
        afterConnectDefaultValueSet(this, selectedValue);
        this.value = selectedValue;
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        return (h(Host, null, h(InteractiveContainer, { disabled: this.disabled }, h("calcite-combobox", { clearDisabled: true, disabled: this.disabled, label: this.messages.chooseTimeZone, lang: this.effectiveLocale, maxItems: this.maxItems, onCalciteComboboxBeforeClose: this.onComboboxBeforeClose, onCalciteComboboxBeforeOpen: this.onComboboxBeforeOpen, onCalciteComboboxChange: this.onComboboxChange, onCalciteComboboxClose: this.onComboboxClose, onCalciteComboboxOpen: this.onComboboxOpen, open: this.open, overlayPositioning: this.overlayPositioning, scale: this.scale, selectionMode: "single-persist", status: this.status, "validation-icon": this.validationIcon, "validation-message": this.validationMessage,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setComboboxRef }, this.timeZoneItems.map((group) => {
            const selected = this.selectedTimeZoneItem === group;
            const { label, value } = group;
            return (h("calcite-combobox-item", { "data-value": value, key: label, selected: selected, textLabel: label, value: `${group.filterValue}` }));
        })), h(HiddenFormInputSlot, { component: this }))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "messages": ["handleTimeZoneItemPropsChange"],
        "mode": ["handleTimeZoneItemPropsChange"],
        "referenceDate": ["handleTimeZoneItemPropsChange"],
        "value": ["handleValueChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
    static get style() { return inputTimeZoneCss; }
}, [17, "calcite-input-time-zone", {
        "disabled": [516],
        "form": [513],
        "maxItems": [514, "max-items"],
        "messages": [1040],
        "messageOverrides": [1040],
        "mode": [513],
        "validationMessage": [1, "validation-message"],
        "validationIcon": [520, "validation-icon"],
        "name": [513],
        "open": [1540],
        "overlayPositioning": [513, "overlay-positioning"],
        "referenceDate": [1, "reference-date"],
        "required": [516],
        "scale": [513],
        "status": [513],
        "value": [1025],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "setFocus": [64]
    }, undefined, {
        "messageOverrides": ["onMessagesChange"],
        "messages": ["handleTimeZoneItemPropsChange"],
        "mode": ["handleTimeZoneItemPropsChange"],
        "referenceDate": ["handleTimeZoneItemPropsChange"],
        "value": ["handleValueChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-input-time-zone", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-input-time-zone":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputTimeZone);
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteInputTimeZone = InputTimeZone;
const defineCustomElement = defineCustomElement$1;

export { CalciteInputTimeZone, defineCustomElement };
