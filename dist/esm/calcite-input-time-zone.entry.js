/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-904bc599.js';
import { c as connectLabel, d as disconnectLabel } from './label-272c5973.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive-98ed6b6f.js';
import { a as getDateTimeFormat, c as connectLocalized, d as disconnectLocalized } from './locale-24516fec.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n-9a5d28cf.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-7cb2fc6f.js';
import { c as connectForm, d as disconnectForm, a as afterConnectDefaultValueSet, H as HiddenFormInputSlot } from './form-d45062d8.js';
import './dom-75c641a7.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './component-83541c88.js';
import './key-e6b442de.js';
import './observers-c83631e8.js';
import './browser-b67d8df6.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    offset: "offset",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const hourToMinutes = 60;
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
async function getNormalizer(mode) {
    if (mode === "offset") {
        return (timeZone) => timeZone;
    }
    const { normalize } = await import('./time-zones-044d518b.js');
    return normalize;
}
async function createTimeZoneItems(locale, messages, mode, referenceDate, standardTime) {
    if (mode === "name") {
        const { groupByName } = await import('./index-3aaf8d41.js');
        const groups = await groupByName();
        return groups
            .map(({ label: timeZone }) => {
            const label = toUserFriendlyName(timeZone);
            const value = timeZone;
            return {
                label,
                value,
                metadata: {
                    filterValue: timeZone,
                },
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
        const [{ groupByRegion }, { getCountry, global: globalLabel }] = await Promise.all([
            import('./index-46fa2a72.js'),
            import('./region-a37e45f7.js'),
        ]);
        const groups = await groupByRegion();
        return groups
            .map(({ label: region, tzs }) => {
            tzs.sort((timeZoneA, timeZoneB) => {
                const labeledTimeZoneA = getTimeZoneLabel(timeZoneA, messages);
                const labeledTimeZoneB = getTimeZoneLabel(timeZoneB, messages);
                const gmtTimeZoneString = "Etc/GMT";
                if (timeZoneA.startsWith(gmtTimeZoneString) && timeZoneB.startsWith(gmtTimeZoneString)) {
                    // we use the IANA timezone for simpler and consistent sorting across locales
                    const offsetStringA = timeZoneA.substring(gmtTimeZoneString.length);
                    const offsetStringB = timeZoneB.substring(gmtTimeZoneString.length);
                    const offsetA = offsetStringA === "" ? 0 : parseInt(offsetStringA);
                    const offsetB = offsetStringB === "" ? 0 : parseInt(offsetStringB);
                    return offsetB - offsetA;
                }
                return labeledTimeZoneA.localeCompare(labeledTimeZoneB);
            });
            return {
                label: getMessageOrKeyFallback(messages, region),
                items: tzs.map((timeZone) => {
                    const decimalOffset = timeZoneOffsetToDecimal(getTimeZoneShortOffset(timeZone, effectiveLocale, referenceDateInMs));
                    const label = getTimeZoneLabel(timeZone, messages);
                    const filterValue = region === globalLabel
                        ? // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
                            // in addition to the label we also add "Global" and "Etc" to allow searching for these items
                            `${getTimeZoneLabel(globalLabel, messages)} Etc`
                        : toUserFriendlyName(timeZone);
                    const countryCode = getCountry(timeZone);
                    const country = getMessageOrKeyFallback(messages, countryCode);
                    return {
                        label,
                        value: timeZone,
                        metadata: {
                            country: country === label ? undefined : country,
                            filterValue,
                            offset: decimalOffset,
                        },
                    };
                }),
            };
        })
            .sort((groupA, groupB) => groupA.label === globalLabel ? -1 : groupB.label === globalLabel ? 1 : groupA.label.localeCompare(groupB.label));
    }
    const [{ groupByOffset }, { DateEngine }] = await Promise.all([
        import('./index-19dc829d.js'),
        import('./index-8fda18f5.js'),
    ]);
    const groups = await groupByOffset({
        dateEngine: new DateEngine(),
        groupDateRange: 1,
        startDate: new Date(referenceDateInMs).toISOString(),
    });
    const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });
    const offsetTimeZoneNameBlockList = ["Factory", "Etc/UTC"];
    // we remove blocked entries from tzs and adjust label indices accordingly
    groups.forEach((group) => {
        const indexOffsets = [];
        let removedSoFar = 0;
        group.tzs.forEach((tz, index) => {
            if (offsetTimeZoneNameBlockList.includes(tz)) {
                removedSoFar++;
            }
            indexOffsets[index] = removedSoFar;
        });
        group.tzs = group.tzs.filter((tz) => !offsetTimeZoneNameBlockList.includes(tz));
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
            metadata: {
                filterValue: tzs.map((tz) => toUserFriendlyName(tz)),
            },
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
function getTimeZoneShortOffset(timeZone, locale, referenceDateInMs = Date.now()) {
    const dateTimeFormat = getDateTimeFormat(locale, { timeZone, timeZoneName: "shortOffset" });
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
        registerInstance(this, hostRef);
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
            const selected = this.findTimeZoneItemByLabel(selectedItem.getAttribute("data-label"));
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
        if (!this.timeZoneItems) {
            return;
        }
        this.updateTimeZoneItems();
        this.updateTimeZoneSelection();
    }
    openChanged() {
        // we set the property instead of the attribute to ensure open/close events are emitted properly
        this.comboboxEl.open = this.open;
    }
    handleValueChange(value, oldValue) {
        value = this.normalizeValue(value);
        if (!value) {
            if (this.clearable) {
                this.value = value;
                this.selectedTimeZoneItem = null;
                return;
            }
            this.value = oldValue;
            this.selectedTimeZoneItem = this.findTimeZoneItem(oldValue);
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
        this.comboboxEl.selectedItems[0].textLabel =
            !metadata.country || open
                ? label
                : getSelectedRegionTimeZoneLabel(label, metadata.country, this.messages);
    }
    findTimeZoneItem(value) {
        return findTimeZoneItemByProp(this.timeZoneItems, "value", value);
    }
    findTimeZoneItemByLabel(label) {
        return findTimeZoneItemByProp(this.timeZoneItems, "label", label);
    }
    async updateTimeZoneItems() {
        this.timeZoneItems = await this.createTimeZoneItems();
    }
    async updateTimeZoneSelection() {
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
    normalizeValue(value) {
        value = value === null ? "" : value;
        return value ? this.normalizer(value) : value;
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        const [, normalizer] = await Promise.all([setUpMessages(this), getNormalizer(this.mode)]);
        this.normalizer = normalizer;
        await this.updateTimeZoneItems();
        this.value = this.normalizeValue(this.value);
        await this.updateTimeZoneSelection();
        const selectedValue = this.selectedTimeZoneItem ? `${this.selectedTimeZoneItem.value}` : null;
        afterConnectDefaultValueSet(this, selectedValue);
        this.value = selectedValue;
    }
    componentDidLoad() {
        setComponentLoaded(this);
        this.openChanged();
    }
    componentDidRender() {
        updateHostInteraction(this);
        this.overrideSelectedLabelForRegion(this.open);
    }
    render() {
        return (h(Host, { key: 'b94fb2d93cdcaf0c44bbd2a0c7deaf59701078bf' }, h(InteractiveContainer, { key: '45246bbab441e9daf0e372832e74d7660039c770', disabled: this.disabled }, h("calcite-combobox", { key: '294e44d8ab01079651c417f7808348e584f135b7', clearDisabled: !this.clearable, disabled: this.disabled, label: this.messages.chooseTimeZone, lang: this.effectiveLocale, maxItems: this.maxItems, onCalciteComboboxBeforeClose: this.onComboboxBeforeClose, onCalciteComboboxBeforeOpen: this.onComboboxBeforeOpen, onCalciteComboboxChange: this.onComboboxChange, onCalciteComboboxClose: this.onComboboxClose, onCalciteComboboxOpen: this.onComboboxOpen, overlayPositioning: this.overlayPositioning, placeholder: this.mode === "name"
                ? this.messages.namePlaceholder
                : this.mode === "offset"
                    ? this.messages.offsetPlaceholder
                    : this.messages.regionPlaceholder, placeholderIcon: "search", readOnly: this.readOnly, ref: this.setComboboxRef, scale: this.scale, selectionMode: this.clearable ? "single" : "single-persist", status: this.status, "validation-icon": this.validationIcon, "validation-message": this.validationMessage }, this.renderItems()), h(HiddenFormInputSlot, { key: '0b7a0694166f1d5b36b780d3436dad15d466bc3c', component: this }))));
    }
    renderItems() {
        if (this.mode === "region") {
            return this.renderRegionItems();
        }
        return this.timeZoneItems.map((group) => {
            const selected = this.selectedTimeZoneItem === group;
            const { label, metadata, value } = group;
            return (h("calcite-combobox-item", { "data-label": label, key: label, metadata: metadata, selected: selected, textLabel: label, value: value }));
        });
    }
    renderRegionItems() {
        return this.timeZoneItems.flatMap(({ label, items }) => (h("calcite-combobox-item-group", { key: label, label: label }, items.map((item) => {
            const selected = this.selectedTimeZoneItem === item;
            const { label, metadata, value } = item;
            return (h("calcite-combobox-item", { "data-label": label, description: metadata.country, key: label, metadata: metadata, selected: selected, textLabel: label, value: value }, h("span", { class: CSS.offset, slot: "content-end" }, metadata.offset)));
        }))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "messages": ["handleTimeZoneItemPropsChange"],
        "mode": ["handleTimeZoneItemPropsChange"],
        "referenceDate": ["handleTimeZoneItemPropsChange"],
        "open": ["openChanged"],
        "value": ["handleValueChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
};
InputTimeZone.style = CalciteInputTimeZoneStyle0;

export { InputTimeZone as calcite_input_time_zone };
