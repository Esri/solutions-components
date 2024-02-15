/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const label = require('./label-32573e1d.js');
const interactive = require('./interactive-3ab7044d.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const loadable = require('./loadable-5a794992.js');
const form = require('./form-fed676d6.js');
require('./dom-c9c2c835.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./component-ac7c3bd8.js');
require('./browser-d08a5f99.js');
require('./key-c5504030.js');
require('./observers-db4527e4.js');

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
                Promise.resolve().then(function () { return require('./index-c0ee2715.js'); }),
                Promise.resolve().then(function () { return require('./index-4c1b0d3c.js'); }),
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
function getTimeZoneShortOffset(timeZone, locale$1, referenceDateInMs = Date.now()) {
    const dateTimeFormat = locale.getDateTimeFormat(locale$1, { timeZone, timeZoneName: "shortOffset" });
    const parts = dateTimeFormat.formatToParts(referenceDateInMs);
    return parts.find(({ type }) => type === "timeZoneName").value;
}

const inputTimeZoneCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

const InputTimeZone = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInputTimeZoneBeforeClose = index.createEvent(this, "calciteInputTimeZoneBeforeClose", 6);
        this.calciteInputTimeZoneBeforeOpen = index.createEvent(this, "calciteInputTimeZoneBeforeOpen", 6);
        this.calciteInputTimeZoneChange = index.createEvent(this, "calciteInputTimeZoneChange", 6);
        this.calciteInputTimeZoneClose = index.createEvent(this, "calciteInputTimeZoneClose", 6);
        this.calciteInputTimeZoneOpen = index.createEvent(this, "calciteInputTimeZoneOpen", 6);
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
        await loadable.componentFocusable(this);
        await this.comboboxEl.setFocus();
    }
    effectiveLocaleWatcher() {
        t9n.updateMessages(this, this.effectiveLocale);
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
        form.connectForm(this);
        label.connectLabel(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    disconnectedCallback() {
        form.disconnectForm(this);
        label.disconnectLabel(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
        await this.updateTimeZoneItemsAndSelection();
        const selectedValue = `${this.selectedTimeZoneItem.value}`;
        form.afterConnectDefaultValueSet(this, selectedValue);
        this.value = selectedValue;
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(index.Host, null, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("calcite-combobox", { clearDisabled: true, disabled: this.disabled, label: this.messages.chooseTimeZone, lang: this.effectiveLocale, maxItems: this.maxItems, onCalciteComboboxBeforeClose: this.onComboboxBeforeClose, onCalciteComboboxBeforeOpen: this.onComboboxBeforeOpen, onCalciteComboboxChange: this.onComboboxChange, onCalciteComboboxClose: this.onComboboxClose, onCalciteComboboxOpen: this.onComboboxOpen, open: this.open, overlayPositioning: this.overlayPositioning, scale: this.scale, selectionMode: "single-persist", status: this.status, "validation-icon": this.validationIcon, "validation-message": this.validationMessage,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setComboboxRef }, this.timeZoneItems.map((group) => {
            const selected = this.selectedTimeZoneItem === group;
            const { label, value } = group;
            return (index.h("calcite-combobox-item", { "data-value": value, key: label, selected: selected, textLabel: label, value: `${group.filterValue}` }));
        })), index.h(form.HiddenFormInputSlot, { component: this }))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "messages": ["handleTimeZoneItemPropsChange"],
        "mode": ["handleTimeZoneItemPropsChange"],
        "referenceDate": ["handleTimeZoneItemPropsChange"],
        "value": ["handleValueChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
};
InputTimeZone.style = inputTimeZoneCss;

exports.calcite_input_time_zone = InputTimeZone;
