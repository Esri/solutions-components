/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const label = require('./label-26ee0ddb.js');
const interactive = require('./interactive-89f913ba.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
const loadable = require('./loadable-2e2626dc.js');
const form = require('./form-5229f1c8.js');
require('./dom-6a9b6275.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./component-a4c6a35d.js');
require('./browser-69696af0.js');
require('./key-d6da79d8.js');
require('./observers-8fed90f3.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    offset: "offset",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
async function createTimeZoneItems(locale, messages, mode, referenceDate, standardTime) {
    if (mode === "name") {
        const { groupByName } = await Promise.resolve().then(function () { return require('./index-d21e03cd.js'); });
        const groups = await groupByName();
        return groups
            .map(({ label: timeZone }) => {
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
    const effectiveLocale = standardTime === "user"
        ? locale
        : // we use locales that will always yield a short offset that matches `standardTime`
            standardTime === "utc"
                ? "fr"
                : "en-GB";
    const referenceDateInMs = referenceDate.getTime();
    if (mode === "region") {
        const [{ groupByRegion }, { getCountry }] = await Promise.all([
            Promise.resolve().then(function () { return require('./index-6189d0bb.js'); }),
            Promise.resolve().then(function () { return require('./country-a8539532.js'); }),
        ]);
        const groups = await groupByRegion();
        return groups
            .map(({ label: region, tzs }) => {
            return {
                label: region,
                items: tzs.map((timeZone) => {
                    const decimalOffset = timeZoneOffsetToDecimal(getTimeZoneShortOffset(timeZone, effectiveLocale, referenceDateInMs));
                    return {
                        label: getTimeZoneLabel(timeZone, messages),
                        value: timeZone,
                        filterValue: toUserFriendlyName(timeZone),
                        metadata: {
                            offset: decimalOffset,
                            country: getCountry(timeZone),
                        },
                    };
                }),
            };
        })
            .sort((groupA, groupB) => groupA.label.localeCompare(groupB.label));
    }
    const [{ groupByOffset }, { DateEngine }] = await Promise.all([
        Promise.resolve().then(function () { return require('./index-866b8a4c.js'); }),
        Promise.resolve().then(function () { return require('./index-04255c05.js'); }),
    ]);
    const groups = await groupByOffset({
        dateEngine: new DateEngine(),
        groupDateRange: 1,
        startDate: new Date(referenceDateInMs).toISOString(),
    });
    const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });
    // we remove blocked entries from tzs and adjust label indices accordingly
    groups.forEach((group) => {
        const indexOffsets = [];
        let removedSoFar = 0;
        group.tzs.forEach((tz, index) => {
            if (timeZoneNameBlockList.includes(tz)) {
                removedSoFar++;
            }
            indexOffsets[index] = removedSoFar;
        });
        group.tzs = group.tzs.filter((tz) => !timeZoneNameBlockList.includes(tz));
        group.labelTzIdx = group.labelTzIdx
            .map((index) => index - indexOffsets[index])
            .filter((index) => index >= 0 && index < group.tzs.length);
    });
    return groups
        .map(({ labelTzIdx, tzs }) => {
        const groupRepTz = tzs[0];
        const decimalOffset = timeZoneOffsetToDecimal(getTimeZoneShortOffset(groupRepTz, effectiveLocale, referenceDateInMs));
        const value = toOffsetValue(groupRepTz, referenceDateInMs);
        const tzLabels = labelTzIdx.map((index) => getTimeZoneLabel(tzs[index], messages));
        const label = createTimeZoneOffsetLabel(messages, decimalOffset, listFormatter.format(tzLabels));
        return {
            label,
            value,
            filterValue: tzs.map((tz) => toUserFriendlyName(tz)),
        };
    })
        .filter((group) => !!group)
        .sort((groupA, groupB) => groupA.value - groupB.value);
}
function getTimeZoneLabel(timeZone, messages) {
    return messages[timeZone] || getCity(timeZone);
}
function getSelectedRegionTimeZoneLabel(city, country, messages) {
    const template = messages.timeZoneRegionLabel;
    return template.replace("{city}", city).replace("{country}", getMessageOrKeyFallback(messages, country));
}
function getMessageOrKeyFallback(messages, key) {
    return messages[key] || key;
}
/**
 * Exported for testing purposes only
 *
 * @internal
 */
function getCity(timeZone) {
    return timeZone.split("/").pop();
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
function isGroup(item) {
    return item.items !== undefined;
}
function flattenTimeZoneItems(timeZoneItems) {
    return isGroup(timeZoneItems[0]) ? timeZoneItems.flatMap((item) => item.items) : timeZoneItems;
}
function findTimeZoneItemByProp(timeZoneItems, prop, valueToMatch) {
    return valueToMatch == null
        ? null
        : flattenTimeZoneItems(timeZoneItems).find((item) => 
        // intentional == to match string to number
        item[prop] == valueToMatch);
}

const inputTimeZoneCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.offset{white-space:nowrap}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";
const CalciteInputTimeZoneStyle0 = inputTimeZoneCss;

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
            this.overrideSelectedLabelForRegion(false);
            this.calciteInputTimeZoneBeforeClose.emit();
        };
        this.onComboboxBeforeOpen = (event) => {
            event.stopPropagation();
            this.overrideSelectedLabelForRegion(true);
            this.calciteInputTimeZoneBeforeOpen.emit();
        };
        this.onComboboxChange = (event) => {
            event.stopPropagation();
            const combobox = event.target;
            const selectedItem = combobox.selectedItems[0];
            if (!selectedItem) {
                this.value = null;
                this.selectedTimeZoneItem = null;
                this.calciteInputTimeZoneChange.emit();
                return;
            }
            const selected = this.findTimeZoneItemByLabel(selectedItem.textLabel);
            const selectedValue = `${selected.value}`;
            if (this.value === selectedValue && selected.label === this.selectedTimeZoneItem.label) {
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
        this.clearable = false;
        this.disabled = false;
        this.form = undefined;
        this.maxItems = 0;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.mode = "offset";
        this.offsetStyle = "user";
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
        this.open = false;
        this.overlayPositioning = "absolute";
        this.referenceDate = undefined;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.value = undefined;
        this.readOnly = false;
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
        value = this.normalizeValue(value);
        if (!value && this.clearable) {
            this.value = value;
            this.selectedTimeZoneItem = null;
            return;
        }
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
    /**
     * Helps override the selected item's label for region mode outside of item rendering logic to avoid flickering text change
     *
     * @param open
     * @private
     */
    overrideSelectedLabelForRegion(open) {
        if (this.mode !== "region" || !this.selectedTimeZoneItem) {
            return;
        }
        const { label, metadata } = this.selectedTimeZoneItem;
        this.comboboxEl.selectedItems[0].textLabel = open
            ? label
            : getSelectedRegionTimeZoneLabel(label, metadata.country, this.messages);
    }
    findTimeZoneItem(value) {
        return findTimeZoneItemByProp(this.timeZoneItems, "value", value);
    }
    findTimeZoneItemByLabel(label) {
        return findTimeZoneItemByProp(this.timeZoneItems, "label", label);
    }
    async updateTimeZoneItemsAndSelection() {
        this.timeZoneItems = await this.createTimeZoneItems();
        if (this.value === "" && this.clearable) {
            this.selectedTimeZoneItem = null;
            return;
        }
        const fallbackValue = this.mode === "offset" ? getUserTimeZoneOffset() : getUserTimeZoneName();
        const valueToMatch = this.value ?? fallbackValue;
        this.selectedTimeZoneItem =
            this.findTimeZoneItem(valueToMatch) || this.findTimeZoneItem(fallbackValue);
    }
    async createTimeZoneItems() {
        if (!this.effectiveLocale || !this.messages) {
            return [];
        }
        return createTimeZoneItems(this.effectiveLocale, this.messages, this.mode, this.referenceDate instanceof Date
            ? this.referenceDate
            : new Date(this.referenceDate ?? Date.now()), this.offsetStyle);
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
    normalizeValue(value) {
        return value === null ? "" : value;
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
        this.value = this.normalizeValue(this.value);
        await this.updateTimeZoneItemsAndSelection();
        const selectedValue = this.selectedTimeZoneItem ? `${this.selectedTimeZoneItem.value}` : null;
        form.afterConnectDefaultValueSet(this, selectedValue);
        this.value = selectedValue;
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        this.overrideSelectedLabelForRegion(this.open);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(index.Host, { key: '812212005676701893065226cd3594995779c332' }, index.h(interactive.InteractiveContainer, { key: '5c2ddca0fa6198a055ea78b3039a8239973cc4a4', disabled: this.disabled }, index.h("calcite-combobox", { key: 'ab33d3ebd756d1841870b516a7d174f8f3d20f13', clearDisabled: !this.clearable, disabled: this.disabled, label: this.messages.chooseTimeZone, lang: this.effectiveLocale, maxItems: this.maxItems, onCalciteComboboxBeforeClose: this.onComboboxBeforeClose, onCalciteComboboxBeforeOpen: this.onComboboxBeforeOpen, onCalciteComboboxChange: this.onComboboxChange, onCalciteComboboxClose: this.onComboboxClose, onCalciteComboboxOpen: this.onComboboxOpen, open: this.open, overlayPositioning: this.overlayPositioning, placeholder: this.mode === "name"
                ? this.messages.namePlaceholder
                : this.mode === "offset"
                    ? this.messages.offsetPlaceholder
                    : this.messages.regionPlaceholder, placeholderIcon: "search", readOnly: this.readOnly, ref: this.setComboboxRef, scale: this.scale, selectionMode: this.clearable ? "single" : "single-persist", status: this.status, "validation-icon": this.validationIcon, "validation-message": this.validationMessage }, this.renderItems()), index.h(form.HiddenFormInputSlot, { key: '850e92f46d459fd7599183613151ab5d2b75ead6', component: this }))));
    }
    renderItems() {
        if (this.mode === "region") {
            return this.renderRegionItems();
        }
        return this.timeZoneItems.map((group) => {
            const selected = this.selectedTimeZoneItem === group;
            const { label, value } = group;
            return (index.h("calcite-combobox-item", { "data-value": value, key: label, selected: selected, textLabel: label, value: `${group.filterValue}` }));
        });
    }
    renderRegionItems() {
        return this.timeZoneItems.flatMap(({ label, items }) => (index.h("calcite-combobox-item-group", { key: label, label: getMessageOrKeyFallback(this.messages, label) }, items.map((item) => {
            const selected = this.selectedTimeZoneItem === item;
            const { label, value } = item;
            return (index.h("calcite-combobox-item", { "data-value": value, description: getMessageOrKeyFallback(this.messages, item.metadata.country), key: label, metadata: item.metadata, selected: selected, textLabel: label, value: `${item.filterValue}` }, index.h("span", { class: CSS.offset, slot: "content-end" }, item.metadata.offset)));
        }))));
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
InputTimeZone.style = CalciteInputTimeZoneStyle0;

exports.calcite_input_time_zone = InputTimeZone;
