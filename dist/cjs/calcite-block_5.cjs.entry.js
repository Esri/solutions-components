/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const conditionalSlot = require('./conditionalSlot-6b5d9b84.js');
const dom = require('./dom-6a9b6275.js');
const interactive = require('./interactive-89f913ba.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
const Heading = require('./Heading-2333bcd2.js');
const loadable = require('./loadable-2e2626dc.js');
const openCloseComponent = require('./openCloseComponent-14628d11.js');
const date = require('./date-5a57b606.js');
const browser = require('./browser-69696af0.js');
const floatingUi = require('./floating-ui-b20fd1f7.js');
const form = require('./form-5229f1c8.js');
const key = require('./key-d6da79d8.js');
const label = require('./label-26ee0ddb.js');
const focusTrapComponent = require('./focusTrapComponent-a4531bc7.js');
const guid = require('./guid-02e5380f.js');
const component = require('./component-a4c6a35d.js');
const Validation = require('./Validation-aa47298a.js');
const input = require('./input-33270a99.js');
const loadModules = require('./loadModules-8567855e.js');
const locale$1 = require('./locale-a1bcb6eb.js');
const mode = require('./mode-3478ba36.js');
require('./observers-8fed90f3.js');
require('./resources-dfe71ff2.js');
require('./debounce-7f1e04d6.js');
require('./config-afe9063b.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./languageUtil-a3e1eafd.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const IDS$1 = {
    content: "content",
    toggle: "toggle",
    header: "header",
};
const CSS$3 = {
    actionsEnd: "actions-end",
    button: "button",
    container: "container",
    content: "content",
    contentStart: "content-start",
    controlContainer: "control-container",
    description: "description",
    header: "header",
    headerContainer: "header-container",
    headerHasText: "header--has-text",
    heading: "heading",
    icon: "icon",
    iconStart: "icon--start",
    iconEnd: "icon--end",
    iconEndContainer: "icon-end-container",
    invalid: "invalid",
    statusIcon: "status-icon",
    summary: "summary",
    title: "title",
    toggle: "toggle",
    toggleIcon: "toggle-icon",
    valid: "valid",
};
const SLOTS = {
    actionsEnd: "actions-end",
    contentStart: "content-start",
    control: "control",
    headerMenuActions: "header-menu-actions",
    icon: "icon",
};
const ICONS = {
    opened: "chevron-up",
    closed: "chevron-down",
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
};

const blockCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding:0px;transition-property:margin;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-timing-function:cubic-bezier(0.215, 0.440, 0.420, 0.880);flex-basis:auto;transition-duration:var(--calcite-animation-timing)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.header{justify-content:flex-start}.header--has-text{padding:var(--calcite-spacing-md)}.header,.toggle{grid-area:header}.header-container{display:grid;align-items:stretch;grid-template:auto/auto 1fr auto auto;grid-template-areas:\"handle header control menu actions-end\";grid-column:header-start/actions-end;grid-row:1/2}.content-start,.icon,.icon--start,.icon--end{margin-inline-end:var(--calcite-spacing-md)}.icon calcite-loader{margin-inline-end:var(--calcite-spacing-xxxs)}.icon--start,.icon--end{color:var(--calcite-color-text-3)}.actions-end{grid-area:actions-end}.toggle{margin:0px;display:flex;cursor:pointer;flex-wrap:nowrap;align-items:center;justify-content:space-between;border-style:none;padding:0px;font-family:var(--calcite-font-family);outline-color:transparent;text-align:initial;background-color:transparent}.toggle:hover{background-color:var(--calcite-color-foreground-2)}.toggle:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}calcite-loader[inline]{grid-area:control;align-self:center}calcite-handle{grid-area:handle}.title{margin:0px}.header .title .heading{padding:0px;font-size:var(--calcite-font-size--1);font-weight:var(--calcite-font-weight-medium);line-height:1.25;color:var(--calcite-color-text-2);transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);word-wrap:break-word;word-break:break-word}.description{margin-block-start:0.125rem;padding:0px;font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-color-text-3);word-wrap:break-word;word-break:break-word}.icon{display:flex}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}@keyframes spin{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}.icon-end-container{display:flex;align-items:center;margin-inline-start:auto}.toggle-icon{align-self:center;justify-self:end;color:var(--calcite-color-text-3);transition-property:color;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline-end:var(--calcite-spacing-md)}.toggle:hover .toggle-icon{color:var(--calcite-color-text-1)}.container{position:relative;display:flex;block-size:100%;flex-direction:column}.content{position:relative;min-block-size:0px;flex:1 1 0%}@keyframes in{0%{opacity:0}100%{opacity:1}}.content{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;padding-block:var(--calcite-block-padding, var(--calcite-spacing-sm));padding-inline:var(--calcite-block-padding, var(--calcite-spacing-md))}.content-start{display:flex;align-items:center;color:var(--calcite-color-text-3)}.control-container{margin:0px;display:flex;grid-area:control}calcite-action-menu{grid-area:menu}.actions-end{display:flex;align-items:stretch}:host([open]){margin-block:0.5rem}:host([open]) .header .title .heading{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteBlockStyle0 = blockCss;

const Block = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteBlockBeforeClose = index.createEvent(this, "calciteBlockBeforeClose", 6);
        this.calciteBlockBeforeOpen = index.createEvent(this, "calciteBlockBeforeOpen", 6);
        this.calciteBlockClose = index.createEvent(this, "calciteBlockClose", 6);
        this.calciteBlockOpen = index.createEvent(this, "calciteBlockOpen", 6);
        this.calciteBlockToggle = index.createEvent(this, "calciteBlockToggle", 6);
        this.openTransitionProp = "margin-top";
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.onHeaderClick = () => {
            this.open = !this.open;
            this.calciteBlockToggle.emit();
        };
        this.actionsEndSlotChangeHandler = (event) => {
            this.hasEndActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleContentStartSlotChange = (event) => {
            this.hasContentStart = dom.slotChangeHasAssignedElement(event);
        };
        this.collapsible = false;
        this.disabled = false;
        this.dragHandle = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.loading = false;
        this.open = false;
        this.status = undefined;
        this.description = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.overlayPositioning = "absolute";
        this.defaultMessages = undefined;
        this.effectiveLocale = undefined;
        this.hasContentStart = false;
        this.hasEndActions = false;
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
        this.transitionEl = this.el;
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
    renderLoaderStatusIcon() {
        const { loading, messages, status } = this;
        const hasSlottedIcon = !!dom.getSlotted(this.el, SLOTS.icon);
        return loading ? (index.h("div", { class: CSS$3.icon, key: "loader" }, index.h("calcite-loader", { inline: true, label: messages.loading }))) : status ? (index.h("div", { class: CSS$3.icon, key: "status-icon" }, index.h("calcite-icon", { class: {
                [CSS$3.statusIcon]: true,
                [CSS$3.valid]: status == "valid",
                [CSS$3.invalid]: status == "invalid",
            }, icon: ICONS[status], scale: "s" }))) : hasSlottedIcon ? (index.h("div", { class: CSS$3.icon, key: "icon-slot" }, index.h("slot", { key: "icon-slot", name: SLOTS.icon }))) : null;
    }
    renderActionsEnd() {
        return (index.h("div", { class: CSS$3.actionsEnd }, index.h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.actionsEndSlotChangeHandler })));
    }
    renderContentStart() {
        const { hasContentStart } = this;
        return (index.h("div", { class: CSS$3.contentStart, hidden: !hasContentStart }, index.h("slot", { name: SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange })));
    }
    renderTitle() {
        const { heading, headingLevel, description } = this;
        return heading || description ? (index.h("div", { class: CSS$3.title }, index.h(Heading.Heading, { class: CSS$3.heading, level: headingLevel }, heading), description ? index.h("div", { class: CSS$3.description }, description) : null)) : null;
    }
    renderIcon(position) {
        const { iconFlipRtl } = this;
        const flipRtl = iconFlipRtl === "both" || position === "start"
            ? iconFlipRtl === "start"
            : iconFlipRtl === "end";
        const iconValue = position === "start" ? this.iconStart : this.iconEnd;
        const iconClass = position === "start" ? CSS$3.iconStart : CSS$3.iconEnd;
        if (!iconValue) {
            return undefined;
        }
        /** Icon scale is not variable as the component does not have a scale property */
        return (index.h("calcite-icon", { class: iconClass, flipRtl: flipRtl, icon: iconValue, key: iconValue, scale: "s" }));
    }
    render() {
        const { collapsible, el, loading, open, heading, messages, description } = this;
        const toggleLabel = open ? messages.collapse : messages.expand;
        const headerContent = (index.h("header", { key: '91deb640f5a591cd70dbb6328cdc588a40b600d5', class: { [CSS$3.header]: true, [CSS$3.headerHasText]: !!(heading || description) }, id: IDS$1.header }, this.renderIcon("start"), this.renderContentStart(), this.renderLoaderStatusIcon(), this.renderTitle()));
        const hasControl = !!dom.getSlotted(el, SLOTS.control);
        const hasMenuActions = !!dom.getSlotted(el, SLOTS.headerMenuActions);
        const collapseIcon = open ? ICONS.opened : ICONS.closed;
        const headerNode = (index.h("div", { key: 'ebba82b4e065978eaa9ed1e59f05ad80843cc9ab', class: CSS$3.headerContainer }, this.dragHandle ? index.h("calcite-handle", { label: heading }) : null, collapsible ? (index.h("button", { "aria-controls": IDS$1.content, "aria-describedby": IDS$1.header, "aria-expanded": collapsible ? dom.toAriaBoolean(open) : null, class: CSS$3.toggle, id: IDS$1.toggle, onClick: this.onHeaderClick, title: toggleLabel }, headerContent, index.h("div", { class: CSS$3.iconEndContainer }, this.renderIcon("end"), index.h("calcite-icon", { class: CSS$3.toggleIcon, icon: collapseIcon, scale: "s" })))) : this.iconEnd ? (index.h("div", null, headerContent, index.h("div", { class: CSS$3.iconEndContainer }, this.renderIcon("end")))) : (headerContent), hasControl ? (index.h("div", { "aria-labelledby": IDS$1.header, class: CSS$3.controlContainer }, index.h("slot", { name: SLOTS.control }))) : null, hasMenuActions ? (index.h("calcite-action-menu", { label: messages.options, overlayPositioning: this.overlayPositioning }, index.h("slot", { name: SLOTS.headerMenuActions }))) : null, this.renderActionsEnd()));
        return (index.h(index.Host, { key: 'b5c12059b36785bf45ce61e7309a35278b928088' }, index.h(interactive.InteractiveContainer, { key: '90a5013ca2e30dadbd76c146700a53391f3aea62', disabled: this.disabled }, index.h("article", { key: '825f15336afb992c7ea8c718b5ffad7c4bf2507e', "aria-busy": dom.toAriaBoolean(loading), class: {
                [CSS$3.container]: true,
            } }, headerNode, index.h("section", { key: '4f690563d78615b68a225456aaae593af6adb826', "aria-labelledby": IDS$1.toggle, class: CSS$3.content, hidden: !open, id: IDS$1.content }, this.renderScrim())))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "open": ["openHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Block.style = CalciteBlockStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const HEADING_LEVEL = 2;
const DATE_PICKER_FORMAT_OPTIONS = { dateStyle: "full" };

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
/**
 * CLDR cache.
 * Exported for testing purposes.
 *
 * @private
 */
const translationCache = {};
/**
 * CLDR request cache.
 * Exported for testing purposes.
 *
 * @private
 */
const requestCache = {};
/**
 * Fetch calendar data for a given locale from list of supported languages
 *
 * @param lang
 * @public
 */
async function getLocaleData(lang) {
    const locale$1 = locale.getSupportedLocale(lang);
    if (translationCache[locale$1]) {
        return translationCache[locale$1];
    }
    if (!requestCache[locale$1]) {
        requestCache[locale$1] = fetch(index.getAssetPath(`./assets/date-picker/nls/${locale$1}.json`))
            .then((resp) => resp.json())
            .catch(() => {
            console.error(`Translations for "${locale$1}" not found or invalid, falling back to english`);
            return getLocaleData("en");
        });
    }
    const data = await requestCache[locale$1];
    translationCache[locale$1] = data;
    return data;
}
/**
 *  Maps value to valueAsDate
 *
 * @param value
 */
function getValueAsDateRange(value) {
    return value.map((v, index) => date.dateFromISO(v, index === 1));
}

const datePickerCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:inline-block;inline-size:auto;overflow:visible;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);vertical-align:top}:host([scale=s]){inline-size:234px;min-inline-size:216px;max-inline-size:380px}:host([scale=m]){inline-size:304px;min-inline-size:272px;max-inline-size:480px}:host([scale=l]){inline-size:370px;min-inline-size:320px;max-inline-size:600px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDatePickerStyle0 = datePickerCss;

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
            if (this.proximitySelectionDisabled) {
                if ((end && start) || (!end && date$1 >= start)) {
                    this.hoverRange.focused = "end";
                    this.hoverRange.end = date$1;
                }
                else if (!end && date$1 < start) {
                    this.hoverRange = {
                        focused: "start",
                        start: date$1,
                        end: start,
                    };
                }
                else {
                    this.hoverRange = undefined;
                }
            }
            else {
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
                if (this.proximitySelectionDisabled) {
                    this.setStartDate(date$1);
                    this.setEndDate(null);
                }
                else {
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
        this.minAsDate = date.dateFromISO(min);
    }
    onMaxChanged(max) {
        this.maxAsDate = date.dateFromISO(max);
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
            this.valueAsDate = getValueAsDateRange(this.value);
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
        const date$1 = date.dateFromRange(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate);
        let activeDate = this.getActiveDate(date$1, this.minAsDate, this.maxAsDate);
        const endDate = this.range && Array.isArray(this.valueAsDate)
            ? date.dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
            : null;
        const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
        if ((this.activeRange === "end" ||
            (this.hoverRange?.focused === "end" && (!this.proximitySelectionDisabled || endDate))) &&
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
        return (index.h(index.Host, { key: '52087d405fc20cd885910944004caef0e4b4e33b', onBlur: this.resetActiveDates, onKeyDown: this.keyDownHandler }, this.renderCalendar(activeDate, maxDate, minDate, date$1, endDate)));
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    valueHandler(value) {
        if (Array.isArray(value)) {
            this.valueAsDate = getValueAsDateRange(value);
        }
        else if (value) {
            this.valueAsDate = date.dateFromISO(value);
        }
    }
    async loadLocaleData() {
        if (!browser.isBrowser()) {
            return;
        }
        locale.numberStringFormatter.numberFormatOptions = {
            numberingSystem: this.numberingSystem,
            locale: this.effectiveLocale,
            useGrouping: false,
        };
        this.localeData = await getLocaleData(this.effectiveLocale);
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
DatePicker.style = CalciteDatePickerStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
    const { year } = date.datePartsFromISO(value);
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
 * v2.12.0
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
    chevronIcon: "chevron-icon",
};
const IDS = {
    validationMessage: "inputDatePickerValidationMessage",
};

const inputDatePickerCss = ":host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([scale=s]){--calcite-toggle-spacing:0.5rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1rem)}:host([scale=m]){--calcite-toggle-spacing:0.75rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 1.5rem)}:host([scale=l]){--calcite-toggle-spacing:1rem;--calcite-internal-input-text-input-padding-inline-end:calc(var(--calcite-toggle-spacing) + 2rem)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calendar-wrapper{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}.input-wrapper .chevron-icon{color:var(--calcite-color-text-3)}.input-wrapper:focus-within .chevron-icon,.input-wrapper:active .chevron-icon,.input-wrapper:hover .chevron-icon{color:var(--calcite-color-text-1)}.toggle-icon{position:absolute;display:flex;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing)}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:var(--calcite-z-index);margin-inline:1px;background-color:var(--calcite-color-foreground-1);padding-inline:0.625rem;inset-inline-start:0}.menu-container{--calcite-floating-ui-z-index:var(--calcite-z-index-dropdown);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.menu-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.menu-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.menu-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([open]) .menu-container{visibility:visible}.menu-container--active{visibility:visible}.input .calcite-input__wrapper{margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputDatePickerStyle0 = inputDatePickerCss;

const InputDatePicker = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInputDatePickerChange = index.createEvent(this, "calciteInputDatePickerChange", 6);
        this.calciteInputDatePickerBeforeClose = index.createEvent(this, "calciteInputDatePickerBeforeClose", 6);
        this.calciteInputDatePickerClose = index.createEvent(this, "calciteInputDatePickerClose", 6);
        this.calciteInputDatePickerBeforeOpen = index.createEvent(this, "calciteInputDatePickerBeforeOpen", 6);
        this.calciteInputDatePickerOpen = index.createEvent(this, "calciteInputDatePickerOpen", 6);
        this.calciteInternalInputInputHandler = (event) => {
            const target = event.target;
            const value = target.value;
            const parsedValue = this.parseNumerals(value);
            const formattedValue = this.formatNumerals(parsedValue);
            target.value = formattedValue;
            const { year } = date.datePartsFromLocalizedString(value, this.localeData);
            if (year && year.length < 4) {
                return;
            }
            const date$1 = date.dateFromLocalizedString(value, this.localeData);
            if (date.inRange(date$1, this.min, this.max)) {
                this.datePickerActiveDate = date$1;
            }
        };
        this.calciteInternalInputBlurHandler = () => {
            this.commitValue();
        };
        this.dialogId = `date-picker-dialog--${guid.guid()}`;
        this.focusOnOpen = false;
        this.userChangedValue = false;
        this.openTransitionProp = "opacity";
        this.valueAsDateChangedExternally = false;
        this.placeholderTextId = `calcite-input-date-picker-placeholder-${guid.guid()}`;
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
            const wasToggleClicked = path.find((el) => el.classList?.contains(CSS$2.toggleIcon));
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
                ? floatingUi.filterValidFlipPlacements(flipPlacements, el)
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
                if (form.submitForm(this)) {
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
            floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
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
            focusTrapComponent.connectFocusTrap(this, {
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
            let newStartDateISO = valueIsArray ? date.dateToISO(newStartDate) : "";
            if (newStartDateISO) {
                newStartDateISO = this.getNormalizedDate(newStartDateISO);
            }
            const newEndDate = valueIsArray ? valueAsDate[1] : null;
            let newEndDateISO = valueIsArray ? date.dateToISO(newEndDate) : "";
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
            let newValue = date.dateToISO(value);
            newValue = this.getNormalizedDate(newValue);
            if (newValue === oldValue) {
                return;
            }
            this.userChangedValue = true;
            this.valueAsDate = newValue ? date.dateFromISO(newValue) : undefined;
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
                : key.numberKeys?.includes(char)
                    ? locale.numberStringFormatter?.numberFormatter?.format(Number(char))
                    : char)
                .join("")
            : "";
        this.parseNumerals = (value) => value
            ? value
                .split("")
                .map((char) => key.numberKeys.includes(char) ? locale.numberStringFormatter.delocalize(char) : char)
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
        this.placement = floatingUi.defaultMenuPlacement;
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
        focusTrapDisabled ? focusTrapComponent.deactivateFocusTrap(this) : focusTrapComponent.activateFocusTrap(this);
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
                newValueAsDate = date.dateFromISO(newValue);
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
            ? [date.dateToISO(valueAsDate[0]), date.dateToISO(valueAsDate[1])]
            : date.dateToISO(valueAsDate);
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
        this.minAsDate = date.dateFromISO(min);
    }
    onMaxChanged(max) {
        this.maxAsDate = date.dateFromISO(max);
    }
    openHandler() {
        openCloseComponent.onToggleOpenCloseComponent(this);
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
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.el);
    }
    /**
     * Updates the position of the component.
     *
     * @param delayed If true, the repositioning is delayed.
     * @returns void
     */
    async reposition(delayed = false) {
        const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;
        return floatingUi.reposition(this, {
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
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        this.handleDateTimeFormatChange();
        const { open } = this;
        open && this.openHandler();
        if (this.min) {
            this.minAsDate = date.dateFromISO(this.min);
        }
        if (this.max) {
            this.maxAsDate = date.dateFromISO(this.max);
        }
        if (Array.isArray(this.value)) {
            this.valueAsDate = getValueAsDateRange(this.value);
        }
        else if (this.value) {
            try {
                const date$1 = date.dateFromISO(this.value);
                const dateInRange = date.dateFromRange(date$1, this.minAsDate, this.maxAsDate);
                this.valueAsDate = dateInRange;
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
                this.value = date.dateToISO(this.valueAsDate);
            }
        }
        label.connectLabel(this);
        form.connectForm(this);
        t9n.connectMessages(this);
        this.setFilteredPlacements();
        locale.numberStringFormatter.numberFormatOptions = {
            numberingSystem: this.numberingSystem,
            locale: this.effectiveLocale,
            useGrouping: false,
        };
        if (this.open) {
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await Promise.all([this.loadLocaleData(), t9n.setUpMessages(this)]);
        this.onMinChanged(this.min);
        this.onMaxChanged(this.max);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        this.localizeInputValues();
        floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl);
    }
    disconnectedCallback() {
        focusTrapComponent.deactivateFocusTrap(this);
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
        floatingUi.disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        const { disabled, effectiveLocale, messages, numberingSystem, readOnly } = this;
        locale.numberStringFormatter.numberFormatOptions = {
            numberingSystem,
            locale: effectiveLocale,
            useGrouping: false,
        };
        return (index.h(index.Host, { key: '38f3ea7b3206b0b5d404c6691d54811ce9e09753', onBlur: this.blurHandler, onKeyDown: this.keyDownHandler }, index.h(interactive.InteractiveContainer, { key: '64296d7cf55e492e041eee729d969733f0aeeede', disabled: this.disabled }, this.localeData && (index.h("div", { key: 'bb1244e8a1ac6e32bc71f08a98d8007b17a3332d', class: CSS$2.inputContainer }, index.h("div", { key: 'fcb3e2430616bae57d9e09ea1f631bdb6c9810f0', class: CSS$2.inputWrapper, "data-position": "start", onClick: this.onInputWrapperClick, onPointerDown: this.onInputWrapperPointerDown, ref: this.setStartWrapper }, index.h("calcite-input-text", { key: '4c1e9dea4f553f206251bafefd05993b5c897b41', "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-describedby": this.placeholderTextId, "aria-errormessage": IDS.validationMessage, "aria-expanded": dom.toAriaBoolean(this.open), "aria-haspopup": "dialog", "aria-invalid": dom.toAriaBoolean(this.status === "invalid"), class: {
                [CSS$2.input]: true,
                [CSS$2.inputNoBottomBorder]: this.layout === "vertical" && this.range,
            }, disabled: disabled, icon: "calendar", onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputTextFocus: this.startInputFocus, placeholder: this.localeData?.placeholder, readOnly: readOnly, ref: this.setStartInput, role: "combobox", scale: this.scale, status: this.status }), !this.readOnly &&
            this.renderToggleIcon(this.open && this.focusedInput === "start"), index.h("span", { key: '705abe452a2f49cc167f1051ca193b397d6cef9f', "aria-hidden": "true", class: CSS$2.assistiveText, id: this.placeholderTextId }, "Date Format: ", this.localeData?.placeholder)), index.h("div", { key: 'bf71124065fdfefa0a6024e245aee31eee3a5b5e', "aria-hidden": dom.toAriaBoolean(!this.open), "aria-label": messages.chooseDate, "aria-live": "polite", "aria-modal": "true", class: {
                [CSS$2.menu]: true,
                [CSS$2.menuActive]: this.open,
            }, id: this.dialogId, ref: this.setFloatingEl, role: "dialog" }, index.h("div", { key: '9803f72d5454230914a2604cceb3b1d30fd32083', class: {
                [CSS$2.calendarWrapper]: true,
                [CSS$2.calendarWrapperEnd]: this.focusedInput === "end",
                [floatingUi.FloatingCSS.animation]: true,
                [floatingUi.FloatingCSS.animationActive]: this.open,
            }, ref: this.setTransitionEl }, index.h("calcite-date-picker", { key: '667c3488db40269e60d79f28f374a6cf9ff610da', activeDate: this.datePickerActiveDate, activeRange: this.focusedInput, headingLevel: this.headingLevel, max: this.max, maxAsDate: this.maxAsDate, messageOverrides: this.messageOverrides, min: this.min, minAsDate: this.minAsDate, numberingSystem: numberingSystem, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, ref: this.setDatePickerRef, scale: this.scale, tabIndex: this.open ? undefined : -1, valueAsDate: this.valueAsDate }))), this.range && this.layout === "horizontal" && (index.h("div", { key: '1c657ea9c4b667035d58a13bffb784489586bbdd', class: CSS$2.horizontalArrowContainer }, index.h("calcite-icon", { key: '970d61e19c5372d503ef070fcbd30817b2231c86', flipRtl: true, icon: "arrow-right", scale: component.getIconScale(this.scale) }))), this.range && this.layout === "vertical" && this.scale !== "s" && (index.h("div", { key: 'b5c83aafbddb396900c44b97d642b0c1c7b2a27b', class: CSS$2.verticalArrowContainer }, index.h("calcite-icon", { key: 'b00438be61ed6f73b1c0b074ff1a8b26ce32e7e2', icon: "arrow-down", scale: component.getIconScale(this.scale) }))), this.range && (index.h("div", { key: '38a7533192d085470cef7e59d091cebe8088980d', class: CSS$2.inputWrapper, "data-position": "end", onClick: this.onInputWrapperClick, onPointerDown: this.onInputWrapperPointerDown, ref: this.setEndWrapper }, index.h("calcite-input-text", { key: '03fbeddd6785ce5e6abb29d9c40ee34842376e31', "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-errormessage": IDS.validationMessage, "aria-expanded": dom.toAriaBoolean(this.open), "aria-haspopup": "dialog", "aria-invalid": dom.toAriaBoolean(this.status === "invalid"), class: {
                [CSS$2.input]: true,
                [CSS$2.inputBorderTopColorOne]: this.layout === "vertical" && this.range,
            }, disabled: disabled, icon: "calendar", onCalciteInputTextInput: this.calciteInternalInputInputHandler, onCalciteInternalInputTextBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputTextFocus: this.endInputFocus, placeholder: this.localeData?.placeholder, readOnly: readOnly, ref: this.setEndInput, role: "combobox", scale: this.scale, status: this.status }), !this.readOnly &&
            this.renderToggleIcon(this.open && this.focusedInput === "end"))))), index.h(form.HiddenFormInputSlot, { key: '9086e6f1f425cb7c583bf8f195b877e42c6a6aa6', component: this }), this.validationMessage && this.status === "invalid" ? (index.h(Validation.Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    renderToggleIcon(open) {
        return (
        // we set tab index to -1 to prevent delegatesFocus from stealing focus before we can set it
        index.h("span", { class: CSS$2.toggleIcon, tabIndex: -1 }, index.h("calcite-icon", { class: CSS$2.chevronIcon, icon: open ? "chevron-up" : "chevron-down", scale: component.getIconScale(this.scale) })));
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
        this.loadLocaleData();
    }
    handleDateTimeFormatChange() {
        const formattingOptions = {
            // we explicitly set numberingSystem to prevent the browser-inferred value
            // see https://github.com/Esri/calcite-design-system/issues/3079#issuecomment-1168964195 for more info
            numberingSystem: locale.getSupportedNumberingSystem(this.numberingSystem),
        };
        this.dateTimeFormat = new Intl.DateTimeFormat(locale.getDateFormatSupportedLocale(this.effectiveLocale), formattingOptions);
    }
    setReferenceEl() {
        const { focusedInput, layout, endWrapper, startWrapper } = this;
        this.referenceEl =
            focusedInput === "end" || layout === "vertical"
                ? endWrapper || startWrapper
                : startWrapper || endWrapper;
        requestAnimationFrame(() => floatingUi.connectFloatingUI(this, this.referenceEl, this.floatingEl));
    }
    onLabelClick() {
        this.setFocus();
    }
    onBeforeOpen() {
        this.calciteInputDatePickerBeforeOpen.emit();
    }
    onOpen() {
        focusTrapComponent.activateFocusTrap(this, {
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
        focusTrapComponent.deactivateFocusTrap(this);
        this.restoreInputFocus();
        this.focusOnOpen = false;
        this.datePickerEl.reset();
    }
    syncHiddenFormInput(input$1) {
        input.syncHiddenFormInput("date", this, input$1);
    }
    commitValue() {
        const { focusedInput, value } = this;
        const focusedInputName = `${focusedInput}Input`;
        const focusedInputValue = this[focusedInputName].value;
        const date$1 = date.dateFromLocalizedString(focusedInputValue, this.localeData);
        const dateAsISO = date.dateToISO(date$1);
        const valueIsArray = Array.isArray(value);
        if (this.range) {
            const focusedInputValueIndex = focusedInput === "start" ? 0 : 1;
            if (valueIsArray) {
                if (dateAsISO === value[focusedInputValueIndex]) {
                    return;
                }
                if (date$1) {
                    this.setRangeValue([
                        focusedInput === "start" ? date$1 : date.dateFromISO(value[0]),
                        focusedInput === "end" ? date$1 : date.dateFromISO(value[1]),
                    ]);
                    this.localizeInputValues();
                }
                else {
                    this.setRangeValue([
                        focusedInput === "end" && date.dateFromISO(value[0]),
                        focusedInput === "start" && date.dateFromISO(value[1]),
                    ]);
                }
            }
            else {
                if (date$1) {
                    this.setRangeValue([
                        focusedInput === "start" ? date$1 : date.dateFromISO(value[0]),
                        focusedInput === "end" ? date$1 : date.dateFromISO(value[1]),
                    ]);
                    this.localizeInputValues();
                }
            }
        }
        else {
            if (dateAsISO === value) {
                return;
            }
            this.setValue(date$1);
            this.localizeInputValues();
        }
    }
    async loadLocaleData() {
        if (!browser.isBrowser()) {
            return;
        }
        locale.numberStringFormatter.numberFormatOptions = {
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
        const date$1 = date.dateFromRange((this.range
            ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
            : this.valueAsDate), this.minAsDate, this.maxAsDate);
        const endDate = this.range
            ? date.dateFromRange((Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined, this.minAsDate, this.maxAsDate)
            : null;
        this.setInputValue((date$1 && this.dateTimeFormat.format(date$1)) ?? "", "start");
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
        const { day, month, year } = date.datePartsFromISO(value);
        const normalizedYear = normalizeToCurrentCentury(Number(year));
        return `${normalizedYear}-${month}-${day}`;
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
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
};
InputDatePicker.style = CalciteInputDatePickerStyle0;

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

const instantAppsFilterListCss = ":host{display:block}.instant-apps-filter-list *{box-sizing:border-box}.instant-apps-filter-list__container{height:100%}.instant-apps-filter-list__container calcite-block:last-of-type{margin-bottom:0}.instant-apps-filter-list__footer{padding:12px;display:flex}.instant-apps-filter-list__footer calcite-button:nth-child(2){margin-left:6px}.instant-apps-filter-list__item-container,.instant-apps-filter-list__item-container--user-input{display:flex;justify-content:space-between;align-items:center}.instant-apps-filter-list__item-container:not(:last-child),.instant-apps-filter-list__item-container--user-input:not(:last-child){padding-bottom:20px}.instant-apps-filter-list__item-container--user-input{margin:0;display:flex;flex-direction:column;align-items:flex-start}.instant-apps-filter-list__item-container--user-input>span{margin:0 0 6px;font-size:14px;font-weight:normal}.instant-apps-filter-list__item-container--user-input calcite-combobox{width:100%;font-size:16px;--calcite-combobox-input-height:24px}.instant-apps-filter-list__number-input-container{width:100%;display:flex;justify-content:center}.instant-apps-filter-list__number-input-container calcite-slider{width:90%}.instant-apps-filter-list__date-picker-input-container{display:flex;align-items:center;justify-content:unset;width:100%}.instant-apps-filter-list__date-picker-input-container calcite-action{height:64px;border-top:1px solid var(--calcite-color-border-input);border-right:1px solid var(--calcite-color-border-input);border-bottom:1px solid var(--calcite-color-border-input)}.instant-apps-filter-list__title{margin-right:20px}.instant-apps-filter-list__title>p{font-size:14px;font-weight:normal;margin:0}.instant-apps-filter-list__checkbox-container{display:flex}.instant-apps-filter-list__checkbox-container calcite-checkbox{height:18px}.instant-apps-filter-list__operator-description{margin:0;--calcite-font-size--1:12px}.instant-apps-filter-list__zoom-to{display:flex;justify-content:flex-end;margin:8px 0 20px}.instant-apps-filter-list__zoom-to calcite-action{width:-moz-min-content;width:min-content}.instant-apps-filter-list calcite-input-date-picker{--calcite-font-size--1:16px}@media (prefers-reduced-motion){.instant-apps-filter-list calcite-loader{--calcite-internal-duration-factor:2;--calcite-internal-animation-timing-slow:calc(300ms * 2)}}.instant-apps-filter-list.calcite-mode-dark .instant-apps-filter-list__header-container{background:#2b2b2b;color:#fff}.instant-apps-filter-list.calcite-mode-dark .instant-apps-filter-list__operator-description{background:#353535}";
const InstantAppsFilterListStyle0 = instantAppsFilterListCss;

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
        index.registerInstance(this, hostRef);
        this.filterListReset = index.createEvent(this, "filterListReset", 7);
        this.filterUpdate = index.createEvent(this, "filterUpdate", 7);
        this.layerExpressions = undefined;
        this.autoUpdateUrl = false;
        this.closeBtn = false;
        this.closeBtnOnClick = undefined;
        this.comboboxOverlayPositioning = 'absolute';
        this.closeBtnText = undefined;
        this.openFilters = false;
        this.extentSelector = false;
        this.extentSelectorConfig = undefined;
        this.urlParams = undefined;
        this.filterCount = 0;
        this.view = undefined;
        this.zoomBtn = true;
        this.resetFiltersOnDisconnect = true;
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
            this.filterLayerExpressions = structuredClone(this.layerExpressions);
            this.handleLayerExpressionsUpdate();
            this.hasLayerExpression = true;
        }
    }
    getFilterInitState() {
        return Promise.resolve({
            initDefExpressions: this.initDefExpressions,
            initMapImageExpressions: this.initMapImageExpressions,
            initPointCloudFilters: this.initPointCloudFilters,
        });
    }
    forceReset() {
        this.filterLayerExpressions = structuredClone(this.layerExpressions);
        this.resetAllFilters();
        this.generateURLParams();
        this.filterListReset.emit();
        return Promise.resolve();
    }
    restoreFilters(filterParamString, filterInitState) {
        this.filterLayerExpressions = structuredClone(this.layerExpressions);
        this.initDefExpressions = filterInitState.initDefExpressions;
        this.initMapImageExpressions = filterInitState.initMapImageExpressions;
        this.initPointCloudFilters = filterInitState.initPointCloudFilters;
        const filters = filterParamString === null || filterParamString === void 0 ? void 0 : filterParamString.split(';').map(filter => JSON.parse(filter));
        if (filters) {
            this.filterCount = this.applyFilters(filters);
        }
        return this.initExpressions();
    }
    async componentWillLoad() {
        var _a;
        this.baseClass = mode.getMode(this.el) === 'dark' ? baseClassDark : baseClassLight;
        await this.initializeModules();
        locale$1.getMessages(this);
        this.hasLayerExpression = this.layerExpressions != null;
        this.filterLayerExpressions = this.layerExpressions != null ? structuredClone(this.layerExpressions) : [];
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
            this.filterLayerExpressions = structuredClone(this.layerExpressions);
            this.handleLayerExpressionsUpdate();
            this.hasLayerExpression = true;
        }
    }
    componentWillRender() {
        var _a;
        this.disabled = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) > 0 ? undefined : true;
    }
    disconnectedCallback() {
        if (this.resetFiltersOnDisconnect) {
            this.filterLayerExpressions = structuredClone(this.layerExpressions);
            this.resetAllFilters();
        }
    }
    async initializeModules() {
        const [intl, geometryJsonUtils, reactiveUtils] = await loadModules.loadModules(['esri/intl', 'esri/geometry/support/jsonUtils', 'esri/core/reactiveUtils']);
        this.geometryJsonUtils = geometryJsonUtils;
        this.reactiveUtils = reactiveUtils;
        this.locale = intl.getLocale();
        this.intl = intl;
    }
    render() {
        const filterConfig = this.loading ? this.renderLoading() : this.initFilterConfig();
        const footer = this.closeBtn ? this.renderFullFooter() : this.renderFooter();
        return (index.h(index.Host, { key: '181ccdf55ab638144081c06baec41e73132cf13b' }, index.h("calcite-panel", { key: 'd2ab223ac64dfa7772ff33189f80e25bd12e53a6', class: this.baseClass, ref: el => (this.panelEl = el) }, index.h("slot", { key: '2426703d0ce85635322e50d27e8c3d209a173e38', slot: "header-content", name: "filter-header-content" }), index.h("slot", { key: '4004059a7ce46f2d05ace0e98fa0be6f3aefd82a', slot: "header-actions-end", name: "filter-header-actions-end" }), index.h("div", { key: "filter-container", class: CSS$1.filterContainer }, filterConfig, footer))));
    }
    renderLoading() {
        return index.h("calcite-loader", { label: "Loading filters..." });
    }
    renderFilter(layerExpression) {
        const { id } = layerExpression;
        return layerExpression.expressions.map((expression, index$1) => {
            return expression.type == 'checkbox' || expression.type == null ? (index.h("div", { key: `${id}-${index$1}`, class: CSS$1.filterItemContainer }, index.h("div", { class: CSS$1.filterItemTitle }, index.h("p", null, expression.name)), index.h("div", { class: CSS$1.checkboxContainer }, index.h("calcite-checkbox", { id: expression.id.toString(), scale: "l", checked: expression === null || expression === void 0 ? void 0 : expression.active, onCalciteCheckboxChange: this.handleCheckboxChange.bind(this, layerExpression, expression) })))) : (this.initInput(layerExpression, expression));
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
        return (index.h("calcite-block", { key: layerExpression.id, heading: layerExpression.title, description: (_a = this.messages) === null || _a === void 0 ? void 0 : _a[operatorTranslation], open: this.openFilters ? true : undefined, collapsible: true }, zoomTo, filter));
    }
    renderCombobox(layerExpression, expression) {
        var _a;
        return (index.h("label", { key: "combo-select", class: CSS$1.filterUIItemContainer }, index.h("span", null, expression.name), index.h("calcite-combobox", { id: expression.id.toString(), onCalciteComboboxChange: this.handleComboSelect.bind(this, expression, layerExpression), label: expression.name, placeholder: expression.placeholder, selectionMode: "multiple", "max-items": "6", scale: "s", overlayPositioning: this.comboboxOverlayPositioning }, (_a = expression.fields) === null || _a === void 0 ? void 0 : _a.map((value, index) => this.renderComboboxItem(expression, value, index)))));
    }
    renderComboboxItem(expression, value, index$1) {
        var _a;
        const label = this.createLabel(expression, value);
        const selectedFields = expression === null || expression === void 0 ? void 0 : expression.selectedFields;
        const selected = (_a = selectedFields === null || selectedFields === void 0 ? void 0 : selectedFields.includes(value)) !== null && _a !== void 0 ? _a : false;
        return index.h("calcite-combobox-item", { key: `${label}-${index$1}`, value: value, textLabel: `${label}`, selected: selected });
    }
    initFilterConfig() {
        var _a, _b;
        if (((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            if (this.filterLayerExpressions.length === 1) {
                const { operator } = this.filterLayerExpressions[0];
                const operatorTranslation = (operator === null || operator === void 0 ? void 0 : operator.trim()) === 'OR' ? 'orOperator' : 'andOperator';
                const zoomTo = this.renderZoomTo(this.filterLayerExpressions[0]);
                return (index.h("calcite-block", { class: CSS$1.operatorDesc, heading: (_b = this.messages) === null || _b === void 0 ? void 0 : _b[operatorTranslation], open: true }, zoomTo, this.renderFilter(this.filterLayerExpressions[0])));
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
        return check ? (index.h("label", { key: expression === null || expression === void 0 ? void 0 : expression.id.toString(), class: CSS$1.filterUIItemContainer }, index.h("span", null, expression === null || expression === void 0 ? void 0 : expression.name), index.h("div", { class: CSS$1.numberInputContainer }, index.h("calcite-slider", { id: expression === null || expression === void 0 ? void 0 : expression.id.toString(), onCalciteSliderChange: this.handleSliderChange.bind(this, expression, layerExpression), min: min, max: max, minValue: min, maxValue: max, "min-label": (_e = (_d = this.messages) === null || _d === void 0 ? void 0 : _d.minSlider) === null || _e === void 0 ? void 0 : _e.replace('{field}', field), "max-label": (_g = (_f = this.messages) === null || _f === void 0 ? void 0 : _f.maxSlider) === null || _g === void 0 ? void 0 : _g.replace('{field}', field), step: step, labelHandles: true, snap: true, value: value, "group-separator": (_h = expression === null || expression === void 0 ? void 0 : expression.format) === null || _h === void 0 ? void 0 : _h.digitSeparator })))) : undefined;
    }
    renderDatePicker(layerExpression, expression) {
        var _a, _b, _c, _d;
        const { min, max } = expression;
        const value = [(_a = expression === null || expression === void 0 ? void 0 : expression.range) === null || _a === void 0 ? void 0 : _a.min, (_b = expression === null || expression === void 0 ? void 0 : expression.range) === null || _b === void 0 ? void 0 : _b.max];
        const check = min != null && max != null;
        return check ? (index.h("label", { class: CSS$1.filterUIItemContainer }, index.h("span", null, expression === null || expression === void 0 ? void 0 : expression.name), index.h("div", { class: CSS$1.dateInputContainer }, index.h("calcite-input-date-picker", { id: expression === null || expression === void 0 ? void 0 : expression.id.toString(), onCalciteInputDatePickerChange: this.handleDatePickerRangeChange.bind(this, expression, layerExpression), min: min, max: max, "overlay-positioning": "fixed", lang: (_c = this.locale) !== null && _c !== void 0 ? _c : 'en', layout: "vertical", value: value, range: true }), index.h("calcite-action", { onClick: this.handleResetDatePicker.bind(this, expression, layerExpression), icon: "reset", text: (_d = this.messages) === null || _d === void 0 ? void 0 : _d.resetDatePicker, scale: "s" })))) : null;
    }
    renderFooter() {
        var _a;
        return (index.h("div", { class: CSS$1.footer, slot: "footer" }, index.h("calcite-button", { appearance: "outline", width: "full", disabled: this.disabled, onClick: this.handleResetFilter.bind(this) }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.resetFilter)));
    }
    renderFullFooter() {
        var _a, _b, _c;
        const closeText = this.closeBtnText != null ? this.closeBtnText : (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close;
        return (index.h("div", { class: CSS$1.footer, slot: "footer" }, index.h("calcite-button", { appearance: "outline", width: "half", disabled: this.disabled, onClick: this.handleResetFilter.bind(this) }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.resetFilter), index.h("calcite-button", { appearance: "solid", width: "half", kind: "brand", onClick: (_c = this.closeBtnOnClick) === null || _c === void 0 ? void 0 : _c.bind(this) }, closeText)));
    }
    renderZoomTo(layerExpression) {
        var _a;
        const id = (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) ? `zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `zoom-to-${layerExpression.id}`;
        return this.zoomBtn ? (index.h("div", { class: CSS$1.zoomTo }, index.h("calcite-button", { id: id, appearance: "transparent", kind: "neutral", scale: "s", iconStart: "magnifying-glass-plus", onClick: this.handleZoomTo.bind(this, layerExpression) }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.zoomTo))) : undefined;
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
        const { type, numDisplayOption, displayOption } = expression;
        const isDropdown = numDisplayOption === 'drop-down' || displayOption === 'drop-down';
        if (type === 'string' || type === 'coded-value' || ((type === 'number' || type === 'range' || type === 'date') && isDropdown)) {
            return this.renderCombobox(layerExpression, expression);
        }
        else if (type === 'number' || type === 'range') {
            return this.renderNumberSlider(layerExpression, expression);
        }
        else if (type === 'date') {
            return this.renderDatePicker(layerExpression, expression);
        }
        return;
    }
    async initExpressions() {
        this.loading = true;
        if (this.filterLayerExpressions == null)
            return;
        const tmpLE = await this.processExpressions();
        this.loading = false;
        this.filterLayerExpressions = [...tmpLE];
    }
    async processExpressions() {
        var _a;
        if (!this.filterLayerExpressions)
            return [];
        for (const layerExpression of this.filterLayerExpressions) {
            for (const expression of layerExpression.expressions || []) {
                expression.active = (_a = expression.active) !== null && _a !== void 0 ? _a : expression.definitionExpression != null;
                await this.setInitExpression(layerExpression, expression);
            }
        }
        return this.filterLayerExpressions;
    }
    handleResetFilter() {
        var _a;
        (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.forEach(layerExpression => {
            var _a;
            (_a = layerExpression.expressions) === null || _a === void 0 ? void 0 : _a.forEach(expression => {
                const { type, numDisplayOption, displayOption } = expression;
                let uiType = '';
                if (type === 'string' ||
                    type === 'coded-value' ||
                    (type === 'date' && (numDisplayOption === 'drop-down' || displayOption === 'drop-down')) ||
                    ((type === 'number' || type === 'range') && (numDisplayOption === 'drop-down' || displayOption === 'drop-down'))) {
                    uiType = 'combobox';
                }
                else if (type === 'date') {
                    uiType = 'datePicker';
                }
                else if (type === 'number' || type === 'range') {
                    uiType = 'numberRange';
                }
                if (uiType) {
                    this.resetExpressionUI(uiType, expression);
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
    resetExpressionUI(type, expression) {
        const { id } = expression;
        switch (type) {
            case 'combobox':
                expression.selectedFields = undefined;
                const combobox = this.panelEl.querySelector(`[id='${id}']`);
                if (combobox) {
                    Array.from(combobox.children).forEach(child => {
                        child.selected = false;
                    });
                }
                break;
            case 'datePicker':
                expression.range = undefined;
                const datePicker = this.panelEl.querySelector(`[id='${id}']`);
                resetDatePicker(datePicker);
                break;
            case 'numberRange':
                expression.range = undefined;
                const slider = this.panelEl.querySelector(`[id='${id}']`);
                if (slider) {
                    slider.minValue = expression.min;
                    slider.maxValue = expression.max;
                }
                break;
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
            if (!supportedTypes.includes(layer.type))
                return;
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
        });
    }
    async updateStringExpression(layerExpression, expression) {
        const layer = this.findFilterLayer(layerExpression);
        await this.getFeatureAttributes(layer, expression);
        this.handleDateField(layer, expression);
        if (expression === null || expression === void 0 ? void 0 : expression.selectedFields) {
            expression.definitionExpression = this.createDefinitionExpression(expression);
            return true;
        }
        return false;
    }
    handleDateField(layer, expression) {
        if (expression.type === 'date') {
            const layerField = layer.fields.find(({ name }) => name === expression.field);
            if ((layerField === null || layerField === void 0 ? void 0 : layerField.type) === 'date-only') {
                expression.dateOnly = true;
            }
        }
    }
    createDefinitionExpression(expression) {
        var _a;
        if (!((_a = expression.selectedFields) === null || _a === void 0 ? void 0 : _a.length))
            return '';
        const selectedFields = expression.selectedFields.map((field) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
        return `${expression.field} IN (${selectedFields.join(',')})`;
    }
    async updateNumberExpression(layerExpression, expression) {
        var _a, _b;
        if ((!(expression === null || expression === void 0 ? void 0 : expression.min) && (expression === null || expression === void 0 ? void 0 : expression.min) !== 0) || (!(expression === null || expression === void 0 ? void 0 : expression.max) && (expression === null || expression === void 0 ? void 0 : expression.max) !== 0)) {
            const layer = this.findFilterLayer(layerExpression);
            const { field } = expression;
            if (field != null) {
                this.setExpressionFormat(layer, expression, field);
                if ((expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
                    await this.getFeatureAttributes(layer, expression);
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
        var _a, _b;
        if (!(layerField === null || layerField === void 0 ? void 0 : layerField.domain) || ((_a = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _a === void 0 ? void 0 : _a.type) !== 'coded-value') {
            return false;
        }
        const domain = layerField.domain;
        const codedValuesMap = domain.codedValues.reduce((acc, { code, name }) => {
            acc[code] = name;
            return acc;
        }, {});
        expression.codedValues = codedValuesMap;
        expression.fields = Object.keys(codedValuesMap);
        if ((_b = expression.selectedFields) === null || _b === void 0 ? void 0 : _b.length) {
            const selectedFieldsExpression = expression.selectedFields.map((field) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`)).join(',');
            expression.definitionExpression = `${expression.field} IN (${selectedFieldsExpression})`;
            return true;
        }
        return false;
    }
    updateRangeExpression(expression, layerField) {
        var _a;
        if (!(layerField === null || layerField === void 0 ? void 0 : layerField.domain) || ((_a = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _a === void 0 ? void 0 : _a.type) !== 'range') {
            return false;
        }
        const { field, range } = expression;
        expression.min = layerField.domain.minValue;
        expression.max = layerField.domain.maxValue;
        if (range && Object.keys(range).length) {
            expression.definitionExpression = `${field} BETWEEN ${range.min} AND ${range.max}`;
            return true;
        }
        return false;
    }
    async getFeatureAttributes(layer, expression) {
        if (!this.isLayerSupported(layer)) {
            expression.fields = [];
            return;
        }
        const queryLayer = await this.getQueryLayer(layer);
        const { maxRecordCount, supportsMaxRecordCountFactor } = this.extractQueryCapabilities(layer);
        const featureCount = await queryLayer.queryFeatureCount();
        const query = this.createQuery(queryLayer, expression);
        await this.queryDistinctFeatures(queryLayer, query, expression);
        if (this.shouldPaginate(maxRecordCount, featureCount, supportsMaxRecordCountFactor)) {
            this.handlePagination(queryLayer, query, maxRecordCount, supportsMaxRecordCountFactor, featureCount, expression);
        }
    }
    isLayerSupported(layer) {
        return layer && supportedTypes.includes(layer.type);
    }
    extractQueryCapabilities(queryLayer) {
        var _a, _b, _c, _d, _e, _f;
        return {
            maxRecordCount: (_c = (_b = (_a = queryLayer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.maxRecordCount) !== null && _c !== void 0 ? _c : (_d = queryLayer.sourceJSON) === null || _d === void 0 ? void 0 : _d.maxRecordCount,
            supportsMaxRecordCountFactor: (_f = (_e = queryLayer.capabilities) === null || _e === void 0 ? void 0 : _e.query) === null || _f === void 0 ? void 0 : _f.supportsMaxRecordCountFactor,
        };
    }
    createQuery(queryLayer, expression) {
        const query = queryLayer.createQuery();
        this.applyCacheHint(queryLayer, query);
        const field = expression === null || expression === void 0 ? void 0 : expression.field;
        if (field) {
            const initDefExpr = this.getInitDefExprFromLayer(queryLayer);
            query.where = initDefExpr || '1=1';
            query.outFields = [field];
            query.orderByFields = [`${field} ASC`];
            query.returnDistinctValues = true;
            query.returnGeometry = false;
            query.maxRecordCountFactor = 5;
            this.applyQueryGeometryFromExtentSelector(query);
        }
        return query;
    }
    async queryDistinctFeatures(queryLayer, query, expression) {
        if (!query.outFields)
            return;
        const features = (await this.queryForFeatures(queryLayer, query, query.outFields[0]));
        if (features === null || features === void 0 ? void 0 : features.length) {
            expression.fields = [...new Set(features)];
            if (expression.type === 'string') {
                expression.fields = expression.fields.sort();
            }
            else if (expression.type === 'number') {
                expression.fields = expression.fields.sort((a, b) => a - b);
            }
        }
    }
    getQueryCount(maxRecordCount, supportsMaxRecordCountFactor) {
        return supportsMaxRecordCountFactor ? maxRecordCount * 5 : maxRecordCount;
    }
    shouldPaginate(maxRecordCount, featureCount, supportsMaxRecordCountFactor) {
        const queryCount = this.getQueryCount(maxRecordCount, supportsMaxRecordCountFactor);
        return maxRecordCount != null && featureCount > queryCount;
    }
    async handlePagination(queryLayer, query, maxRecordCount, supportsMaxRecordCountFactor, featureCount, expression) {
        const queryCount = this.getQueryCount(maxRecordCount, supportsMaxRecordCountFactor);
        const promises = [];
        for (let index = queryCount; index < featureCount; index += queryCount) {
            const paginatedQuery = query.clone();
            paginatedQuery.num = maxRecordCount;
            paginatedQuery.start = index;
            promises.push(this.queryForFeatures(queryLayer, paginatedQuery, query.outFields[0]));
        }
        Promise.all(promises).then(results => {
            results.forEach((features) => {
                if ((features === null || features === void 0 ? void 0 : features.length) && expression.fields) {
                    expression.fields.push(...features);
                }
            });
            expression.fields = [...new Set(expression.fields)].sort();
            this.filterLayerExpressions = [...this.filterLayerExpressions];
        });
    }
    async queryForFeatures(layer, query, field) {
        const results = await layer.queryFeatures(query);
        const features = results === null || results === void 0 ? void 0 : results.features.filter(feature => { var _a; return (_a = feature.attributes) === null || _a === void 0 ? void 0 : _a[field]; });
        return features === null || features === void 0 ? void 0 : features.map(feature => { var _a; return (_a = feature.attributes) === null || _a === void 0 ? void 0 : _a[field]; });
    }
    async calculateMinMaxStatistics(layer, field) {
        if (!layer || !supportedTypes.includes(layer.type) || !field) {
            return [];
        }
        const query = this.createStatisticsQuery(layer, field);
        const results = await layer.queryFeatures(query);
        return (results === null || results === void 0 ? void 0 : results.features) || [];
    }
    createStatisticsQuery(layer, field) {
        const query = layer.createQuery();
        query.where = this.getInitDefExprFromLayer(layer) || '1=1';
        this.applyCacheHint(layer, query);
        query.outStatistics = [
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
        this.applyQueryGeometryFromExtentSelector(query);
        return query;
    }
    getExtent(extentSelector, extentSelectorConfig) {
        if (extentSelector && extentSelectorConfig) {
            const { constraints } = extentSelectorConfig;
            let newConstraints = Object.assign({}, constraints);
            const geometry = newConstraints === null || newConstraints === void 0 ? void 0 : newConstraints.geometry;
            if (geometry) {
                const tmpExtent = 'extent' in geometry ? geometry : this.geometryJsonUtils.fromJSON(geometry);
                if ((tmpExtent === null || tmpExtent === void 0 ? void 0 : tmpExtent.type) === 'extent' || (tmpExtent === null || tmpExtent === void 0 ? void 0 : tmpExtent.type) === 'polygon') {
                    return tmpExtent;
                }
            }
        }
        return;
    }
    async setInitExpression(layerExpression, expression) {
        if (!expression.field || !expression.type) {
            await this.updateExpression(layerExpression, expression, undefined);
            return;
        }
        const filterLayer = this.findFilterLayer(layerExpression);
        if (!filterLayer) {
            return;
        }
        if (filterLayer.loadStatus === 'not-loaded' || filterLayer.loadStatus === 'failed') {
            await filterLayer.load();
        }
        await filterLayer.when(async () => {
            var _a, _b;
            const layerField = (_a = filterLayer.fields) === null || _a === void 0 ? void 0 : _a.find(({ name }) => name === expression.field);
            const domainType = (_b = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _b === void 0 ? void 0 : _b.type;
            expression.type = domainType === 'coded-value' || domainType === 'range' ? domainType : expression.type;
            await this.updateExpression(layerExpression, expression, layerField);
        });
    }
    async updateExpression(layerExpression, expression, layerField) {
        const update = await this.handleExpressionType(layerExpression, expression, layerField);
        if (update) {
            this.generateOutput(layerExpression);
        }
    }
    async handleExpressionType(layerExpression, expression, layerField) {
        var _a;
        switch (expression.type) {
            case 'string':
                return await this.updateStringExpression(layerExpression, expression);
            case 'number':
                return await this.updateNumberExpression(layerExpression, expression);
            case 'date':
                return this.updateDateExpressionBasedOnDisplayOption(layerExpression, expression);
            case 'coded-value':
                return this.updateCodedValueExpression(expression, layerField);
            case 'range':
                return this.updateRangeExpressionBasedOnDisplayOption(layerExpression, expression, layerField);
            case 'checkbox':
            case null:
                return (_a = expression.active) !== null && _a !== void 0 ? _a : false;
            default:
                return false;
        }
    }
    async updateDateExpressionBasedOnDisplayOption(layerExpression, expression) {
        if (expression.displayOption === 'drop-down') {
            return await this.updateStringExpression(layerExpression, expression);
        }
        else {
            return await this.updateDateExpression(layerExpression, expression);
        }
    }
    async updateRangeExpressionBasedOnDisplayOption(layerExpression, expression, layerField) {
        if (expression.displayOption === 'drop-down') {
            return await this.updateStringExpression(layerExpression, expression);
        }
        else {
            return this.updateRangeExpression(expression, layerField);
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
        const { field, type } = expression;
        expression.selectedFields = items.map(({ value }) => value);
        if (items.length) {
            const values = items.map(({ value }) => (typeof value === 'number' ? value : `'${handleSingleQuote(value)}'`));
            expression.definitionExpression = type === 'date' ? values.map(value => this.buildDateExpression(value, field)).join(' OR ') : `${field} IN (${values.join(',')})`;
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
        const start = startDate ? convertToDate(Math.floor(startDate.getTime()), true) : undefined;
        const end = endDate ? convertToDate(Math.floor(endDate.getTime()), true) : undefined;
        if (start || end) {
            expression.definitionExpression = this.constructDefinitionExpression(expression.field, start, end);
            expression.range = { min: start, max: end };
            expression.active = true;
            this.generateOutput(layerExpression);
        }
    }
    constructDefinitionExpression(field, start, end) {
        if (!start)
            return `${field} < '${end}'`;
        if (!end)
            return `${field} > '${start}'`;
        return `${field} BETWEEN '${start}' AND '${end}'`;
    }
    handleURLParams() {
        if (!('URLSearchParams' in window))
            return;
        const params = new URLSearchParams(document.location.search);
        const filterParamString = params.get('filter');
        if (!filterParamString) {
            this.filterCount = 0;
            return;
        }
        const filters = filterParamString.split(';').map(filter => JSON.parse(filter));
        this.filterCount = this.applyFilters(filters);
    }
    applyFilters(filters) {
        let filterCount = 0;
        filters.forEach(filter => {
            var _a, _b;
            const layerExpression = (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.find(le => le.id === filter.layerId);
            if (!layerExpression)
                return;
            (_b = layerExpression.expressions) === null || _b === void 0 ? void 0 : _b.forEach(expression => {
                var _a, _b;
                if (((_a = expression.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = filter.expressionId) === null || _b === void 0 ? void 0 : _b.toString())) {
                    this.activateExpression(expression, filter);
                    filterCount++;
                }
            });
        });
        return filterCount;
    }
    activateExpression(expression, filter) {
        expression.active = true;
        if (filter.type === 'range') {
            expression.range = filter.range;
        }
        else if (filter.type === 'select') {
            expression.selectedFields = filter.selectedFields;
        }
    }
    createURLParamExpression(layerExpression, expression) {
        const { id, range, selectedFields, type } = expression;
        if (type === 'string' || type === 'coded-value' || (expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
            return {
                type: 'select',
                layerId: layerExpression.id,
                expressionId: id.toString(),
                selectedFields,
            };
        }
        else if (type === 'number' || type === 'range' || type === 'date') {
            return {
                type: 'range',
                layerId: layerExpression.id,
                expressionId: id.toString(),
                range,
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
            const url = params.toString() ? `${window.location.pathname}?${params}`.trim() : window.location.pathname;
            window.history.replaceState({}, '', url);
        }
    }
    generateURLParams() {
        var _a;
        if (!('URLSearchParams' in window))
            return;
        const params = new URLSearchParams(window.location.search);
        const expressions = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.flatMap(layerExpr => { var _a; return ((_a = layerExpr === null || layerExpr === void 0 ? void 0 : layerExpr.expressions) === null || _a === void 0 ? void 0 : _a.filter(expression => expression.active).map(expression => JSON.stringify(this.createURLParamExpression(layerExpr, expression)))) || []; })) || [];
        this.filterCount = expressions.length;
        expressions.length > 0 ? params.set('filter', expressions.join(';')) : params.delete('filter');
        this.autoUpdateURLCheck(params);
        this.urlParams = params;
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
        map.allLayers.concat(map.allTables).forEach(layer => {
            if (!supportedTypes.includes(layer.type))
                return;
            const fl = layer;
            if (fl.type === 'point-cloud') {
                this.initPointCloudFilters[fl.id] = fl.filters;
            }
            else if (fl.type === 'map-image') {
                this.initMapImageExpressions[fl.id] = fl.allSublayers.reduce((acc, sublayer) => {
                    acc[sublayer.id] = sublayer.definitionExpression;
                    return acc;
                }, {});
            }
            else {
                this.initDefExpressions[fl.id] = fl.definitionExpression;
            }
        });
        this.initExpressions();
        this.handleURLParams();
    }
    async handleZoomTo(layerExpression) {
        const zoomId = (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) ? `#zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `#zoom-to-${layerExpression.id}`;
        const zoomToBtn = this.panelEl.querySelector(zoomId);
        const toggleZoomButtonState = (isLoading, isDisabled) => {
            if (zoomToBtn) {
                zoomToBtn.loading = isLoading;
                zoomToBtn.disabled = isDisabled;
            }
        };
        toggleZoomButtonState(true, true);
        await this.getZoomToExtent(layerExpression);
        const goToOptions = this.zoomToExtent.type === 'point' && this.zoomToExtent.count === 1 ? { target: this.zoomToExtent.extent, zoom: 10 } : this.zoomToExtent.extent;
        await this.view.goTo(goToOptions);
        toggleZoomButtonState(false, false);
    }
    async getZoomToExtent(layerExpression) {
        var _a;
        const layerView = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id);
        const baseLayer = layerView.layer;
        const layer = baseLayer.type === 'map-image' ? baseLayer.findSublayerById(layerExpression.sublayerId) : baseLayer;
        if (layer.type !== 'point-cloud' && supportedTypes.includes(layer === null || layer === void 0 ? void 0 : layer.type)) {
            const queryLayer = await this.getQueryLayer(layer);
            const query = queryLayer.createQuery();
            query.where = (_a = queryLayer.definitionExpression) !== null && _a !== void 0 ? _a : '1=1';
            const results = await queryLayer.queryExtent(query);
            this.zoomToExtent = Object.assign(Object.assign({}, results), { type: queryLayer.geometryType });
        }
    }
    applyFilterToQuery(query, layerExpression) {
        var _a, _b;
        const layerView = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id);
        const filter = (_b = (_a = layerView === null || layerView === void 0 ? void 0 : layerView.featureEffect) === null || _a === void 0 ? void 0 : _a.filter) !== null && _b !== void 0 ? _b : layerView.filter;
        if (filter) {
            ['objectIds', 'distance', 'geometry', 'spatialRelationship', 'units', 'where', 'timeExtent'].forEach(prop => {
                if (filter[prop] != null) {
                    query[prop] = filter[prop];
                }
            });
        }
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
    scientificRounding(num, decimalPlaces, operation) {
        if (num == null)
            return undefined;
        let result;
        if (!String(num).includes('e')) {
            result = Math[operation](num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        }
        else {
            const [base, exponent] = String(num)
                .split('e')
                .map(item => Number(item));
            const adjustedExponent = exponent + decimalPlaces;
            const adjustedNumber = Math[operation](+`${base}e${adjustedExponent}`);
            result = adjustedNumber * Math.pow(10, -decimalPlaces);
        }
        return +result.toFixed(decimalPlaces);
    }
    roundMinNumberDown(num, decimalPlaces) {
        return this.scientificRounding(num, decimalPlaces, 'floor');
    }
    roundMaxNumberUp(num, decimalPlaces) {
        return this.scientificRounding(num, decimalPlaces, 'ceil');
    }
    roundNumber(num, decimalPlaces) {
        var _a;
        return (_a = this.scientificRounding(num, decimalPlaces, 'round')) !== null && _a !== void 0 ? _a : num;
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
    createLabel(expression, value) {
        var _a, _b, _c;
        if (expression.type === 'coded-value') {
            return (_a = expression.codedValues) === null || _a === void 0 ? void 0 : _a[value];
        }
        if (expression.type === 'number' && typeof value === 'number') {
            let formattedValue = value;
            if (((_b = expression.format) === null || _b === void 0 ? void 0 : _b.places) != null) {
                formattedValue = this.roundNumber(value, expression.format.places);
            }
            if ((_c = expression.format) === null || _c === void 0 ? void 0 : _c.digitSeparator) {
                return this.numberWithCommas(formattedValue);
            }
            return formattedValue;
        }
        if (expression.type === 'date' && !expression.dateOnly) {
            const format = this.intl.convertDateFormatToIntlOptions('short-date-long-time');
            return this.intl.formatDate(value, format);
        }
        return value;
    }
    buildDateExpression(date, field) {
        if (date) {
            const tmpDate = new Date(date);
            const tmpCompareDate = new Date(date);
            const tmpCompareDate1 = new Date(tmpCompareDate.setDate(tmpDate.getDate() + 1));
            const formattedDate = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`;
            const time = `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
            const compareTime = `${tmpCompareDate1.getHours()}:${tmpCompareDate1.getMinutes()}:${tmpCompareDate1.getSeconds()}`;
            const compareFormattedDate = `${tmpCompareDate1.getFullYear()}-${tmpCompareDate1.getMonth() + 1}-${tmpCompareDate1.getDate()}`;
            return `${field} BETWEEN '${formattedDate} ${time}' AND '${compareFormattedDate} ${compareTime}'`;
        }
        return;
    }
    async getQueryLayer(layer) {
        return layer.type === 'sublayer' ? await layer.createFeatureLayer() : layer;
    }
    applyCacheHint(queryLayer, query) {
        var _a, _b;
        if ((_b = (_a = queryLayer === null || queryLayer === void 0 ? void 0 : queryLayer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.supportsCacheHint) {
            query.cacheHint = true;
        }
    }
    applyQueryGeometryFromExtentSelector(query) {
        if (!this.extentSelector || !this.extentSelectorConfig)
            return;
        const geometry = this.getExtent(this.extentSelector, this.extentSelectorConfig);
        if (!geometry)
            return;
        query.geometry = geometry;
        query.spatialRelationship = 'intersects';
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "view": ["watchViewHandler"],
        "layerExpressions": ["watchLayerExpressions"]
    }; }
};
InstantAppsFilterList.style = InstantAppsFilterListStyle0;

const instantAppsSocialShareCss = ":host{display:block;--instant-apps-social-share-action-width:initial;--instant-apps-social-share-width--s:200px;--instant-apps-social-share-width--m:280px;--instant-apps-social-share-width--l:320px;--instant-apps-social-share-width-horizontal--s:300px;--instant-apps-social-share-width-horizontal--m:380px;--instant-apps-social-share-width-horizontal--l:420px;--instant-apps-social-share-background-color:var(--calcite-color-foreground-1);--instant-apps-social-share-popover-button-background-color:transparent;--instant-apps-social-share-popover-button-icon-color:var(--calcite-ui-icon-color);--instant-apps-social-share-embed-border:1px solid $border;--instant-apps-social-share-embed-text-area-text:#468540}:host .instant-apps-social-share__popover-button{background-color:var(--instant-apps-social-share-popover-button-background-color)}:host .instant-apps-social-share__popover-button calcite-icon{color:var(--instant-apps-social-share-popover-button-icon-color)}:host .instant-apps-social-share__dialog,:host .instant-apps-social-share__dialog-embed{background-color:var(--instant-apps-social-share-background-color);border:var(--instant-apps-social-share-embed-border)}:host .instant-apps-social-share__dialog{box-sizing:border-box;height:auto;padding:10px 0;border-radius:5px;color:var(--calcite-color-text-1)}:host .instant-apps-social-share__options{margin:0;padding:1% 0 0 0;list-style-type:none}:host .instant-apps-social-share__options li{box-sizing:border-box;display:flex;align-items:center;width:100%;padding:5%;transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__options li .instant-apps-social-share__icon,:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{display:inline-block}:host .instant-apps-social-share__options li .instant-apps-social-share__icon{display:flex;align-items:center}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{width:85%;margin-left:10px;word-break:break-word}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text--rtl{margin-left:0;margin-right:10px}:host .instant-apps-social-share__options li:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2)}:host .instant-apps-social-share__options__x-logo--light path{fill:#000000}:host .instant-apps-social-share__options__x-logo--dark path{fill:#ffffff}:host .instant-apps-social-share__tip{box-sizing:border-box;padding:0 5% 1% 5%}:host .instant-apps-social-share__tip-header{display:flex;align-items:center;color:#007ac2;margin:8px 0 5px 0}:host .instant-apps-social-share__tip-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__tip-content{line-height:17px;margin:0;padding-top:2%}:host .instant-apps-social-share__success{display:flex;flex-direction:column;padding:15px}:host .instant-apps-social-share__success-header{display:flex;align-items:center;font-weight:bold;margin-bottom:10px}:host .instant-apps-social-share__success-icon{display:flex;align-items:center;margin-right:5px}:host .instant-apps-social-share__success-icon calcite-icon{color:var(--calcite-color-status-success)}:host .instant-apps-social-share__success-message{line-height:16px}:host .instant-apps-social-share__embed{box-sizing:border-box;width:100%;padding:5%;margin-bottom:10px;border-top:1px solid #d3d3d3}:host .instant-apps-social-share__embed-header{display:flex;align-items:center;margin-bottom:5px}:host .instant-apps-social-share__embed-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__embed-code-text-area{border:1px solid #d3d3d3}:host .instant-apps-social-share__embed-code-text-area textarea{box-sizing:border-box;padding:4%;border:none;resize:none;background:transparent;width:100%;font-family:var(--calcite-sans-family);color:var(--calcite-color-text-1)}:host .instant-apps-social-share__embed-code-text-area button{display:flex;align-items:center;text-align:start;width:100%;border:none;border-top:1px solid #d3d3d3;background-color:transparent;line-height:16px;font-weight:400;padding:3%;color:var(--calcite-color-text-1)}:host .instant-apps-social-share__embed-code-text-area button calcite-icon{color:#007ac2;margin-right:3px}:host .instant-apps-social-share__embed-code-text-area button:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2);transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__embed-text-area-text{font-weight:600;color:var(--instant-apps-social-share-embed-text-area-text)}:host .instant-apps-social-share__embed .instant-apps-social-share__text-area--rtl{text-align:left;direction:ltr}:host .instant-apps-social-share__embed-dimensions{display:flex;justify-content:space-between;margin-top:10px}:host .instant-apps-social-share__embed-dimensions-input{width:47%;box-sizing:border-box}:host .instant-apps-social-share__embed-dimensions-input input{border:1px solid #d3d3d3;width:100%;height:25px;font-family:var(--calcite-sans-family)}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options{display:flex;justify-content:space-around;margin-bottom:8%}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li{flex-direction:column;padding:0}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li .instant-apps-social-share__option-text{word-break:break-word;margin-left:0;margin-top:10px;text-align:center}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li:hover{background-color:unset}:host .instant-apps-social-share__icon-container{display:flex;align-items:center}:host calcite-action{width:var(--instant-apps-social-share-action-width)}:host([scale=s]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--s)}:host([scale=s]) .instant-apps-social-share__icon{width:16px;height:16px}:host([scale=s]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size--1)}:host([scale=s]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--s)}:host([scale=s]) .instant-apps-social-share__tip-header,:host([scale=s]) .instant-apps-social-share__tip-content,:host([scale=s]) .instant-apps-social-share__embed-header,:host([scale=s]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--2)}:host([scale=m]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--m)}:host([scale=m]) .instant-apps-social-share__icon{width:24px;height:24px}:host([scale=m]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-0)}:host([scale=m]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--m)}:host([scale=m]) .instant-apps-social-share__tip-header,:host([scale=m]) .instant-apps-social-share__tip-content,:host([scale=m]) .instant-apps-social-share__embed-header,:host([scale=m]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--1)}:host([scale=l]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--l)}:host([scale=l]) .instant-apps-social-share__icon{width:32px;height:32px}:host([scale=l]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-1)}:host([scale=l]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--l)}:host([scale=l]) .instant-apps-social-share__tip-header,:host([scale=l]) .instant-apps-social-share__tip-content,:host([scale=l]) .instant-apps-social-share__embed-header,:host([scale=l]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size-0)}";
const InstantAppsSocialShareStyle0 = instantAppsSocialShareCss;

const base = 'instant-apps-social-share';
const CALCITE_MODE_DARK = '.calcite-mode-dark';
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
    xLogo: {
        light: `${base}__x-logo--light`,
        dark: `${base}__x-logo--dark`,
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
    x: 'https://x.com/intent/post?url={url}',
    linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};
const SHORTEN_API = 'https://arcg.is/prod/shorten';
const MIN_WIDTH_HEIGHT_VALUE = '1';
const InstantAppsSocialShare = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.popoverPositioning = 'absolute';
        this.removePopoverOffset = false;
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
        locale$1.getMessages(this);
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
        const content = this.copied && this.mode === 'popover' ? (this.renderSuccess()) : (index.h("div", { class: CSS.dialogContent }, this.renderOptions(), this.displayTipText ? this.renderTip() : null, this.embed ? this.renderEmbed() : null));
        const layoutClass = this.shareIconsLayout === 'vertical' ? ` ${CSS.layout.vertical}` : ` ${CSS.layout.horizontal}`;
        const mode = ` calcite-mode-${!!this.el.closest(CALCITE_MODE_DARK) ? 'dark' : 'light'}`;
        const dialogContent = (index.h("div", { key: '1d10b5a2fb75584357c9c0f4fbd75e4904ad20ef', ref: el => (this.dialogContentRef = el), class: `${CSS.dialog}${layoutClass}${mode}` }, content));
        const defaultOffset = 6;
        const offsetDistance = this.removePopoverOffset ? 0 : defaultOffset;
        return (index.h(index.Host, { key: '75f577c38604ff752062434134a04d6d85263c16' }, this.mode === 'popover'
            ? [
                index.h("calcite-popover", { ref: (el) => (this.popoverRef = el), label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, referenceElement: "shareButton", placement: "bottom-start", scale: this.scale, "overlay-positioning": this.popoverPositioning, "offset-distance": offsetDistance, "pointer-disabled": this.removePopoverOffset }, dialogContent),
                this.renderButton(),
            ]
            : [
                dialogContent,
                index.h("calcite-popover", { ref: (el) => (this.copyLinkPopoverRef = el), label: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, referenceElement: "copyToClipboard", placement: this.inlineSuccessPopoverPlacement, scale: this.scale }, this.renderSuccess()),
                index.h("calcite-popover", { ref: (el) => (this.copyEmbedPopoverRef = el), label: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, referenceElement: "copyEmbedToClipboard", placement: this.inlineSuccessPopoverPlacement, scale: this.scale }, this.renderEmbedSuccess()),
            ]));
    }
    renderButton() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const scale = this.shareButtonScale != null ? this.shareButtonScale : this.scale;
        return this.shareButtonType === 'button' ? (index.h("calcite-button", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, kind: this.shareButtonColor, appearance: "transparent", label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, title: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, scale: scale }, index.h("div", { class: CSS.iconContainer }, index.h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale })))) : (index.h("calcite-action", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, appearance: "transparent", label: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, title: (_h = (_g = this.messages) === null || _g === void 0 ? void 0 : _g.share) === null || _h === void 0 ? void 0 : _h.label, scale: scale, text: "", alignment: "center" }, index.h("div", { class: CSS.iconContainer }, index.h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale }))));
    }
    renderSuccess() {
        var _a;
        const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
        return (index.h("div", { class: CSS.success.container }, index.h("span", { class: CSS.success.header }, index.h("span", { class: CSS.success.icon }, index.h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
            success.label), index.h("span", { class: CSS.success.message }, this.successMessage || (success === null || success === void 0 ? void 0 : success.url))));
    }
    renderEmbedSuccess() {
        var _a;
        const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
        return (index.h("div", { class: CSS.success.container }, index.h("span", { class: CSS.success.header }, index.h("span", { class: CSS.success.icon }, index.h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
            success.label), index.h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.embed)));
    }
    renderOptions() {
        var _a, _b, _c, _d;
        const options = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.options;
        const optionText_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.optionText}` : '';
        return (index.h("ul", { ref: el => (this.shareListRef = el), class: CSS.options, role: "menu" }, index.h("li", { id: "copyToClipboard", onClick: this.handleShareItem.bind(this, 'link'), onKeyDown: this.handleOptionKeyDown('link'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, index.h("calcite-icon", { icon: "link", scale: this.scale })), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_b = options === null || options === void 0 ? void 0 : options.link) === null || _b === void 0 ? void 0 : _b.label)), this.socialMedia
            ? [
                index.h("li", { onClick: this.handleShareItem.bind(this, 'facebook'), onKeyDown: this.handleOptionKeyDown('facebook'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, this.renderFacebookIcon()), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_c = options === null || options === void 0 ? void 0 : options.facebook) === null || _c === void 0 ? void 0 : _c.label)),
                index.h("li", { onClick: this.handleShareItem.bind(this, 'x'), onKeyDown: this.handleOptionKeyDown('x'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, this.renderXIcon()), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, "X")),
                index.h("li", { onClick: this.handleShareItem.bind(this, 'linkedIn'), onKeyDown: this.handleOptionKeyDown('linkedIn'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, this.renderLinkedInIcon()), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_d = options === null || options === void 0 ? void 0 : options.linkedIn) === null || _d === void 0 ? void 0 : _d.label)),
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
        return (index.h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, index.h("g", null, index.h("path", { d: "M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z", style: { fill: '#1877f2', fillRule: 'nonzero' } }), index.h("path", { d: "M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z", style: { fill: '#fff', fillRule: 'nonzero' } }))));
    }
    renderXIcon() {
        const isCalciteModeDark = !!this.el.closest(CALCITE_MODE_DARK);
        return (index.h("svg", { class: isCalciteModeDark ? CSS.xLogo.dark : CSS.xLogo.light, viewBox: "0 0 1200 1227", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("rect", { height: "400", style: { fill: 'none' }, width: "400", x: "56", y: "56" }), index.h("path", { d: "M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z", fill: isCalciteModeDark ? 'white' : 'black' })));
    }
    renderLinkedInIcon() {
        return (index.h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, index.h("g", { id: "g5891" }, index.h("path", { d: "M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z", id: "background", style: { fill: '#2867b2' } }), index.h("g", { id: "shapes" }, index.h("rect", { height: "257.962", id: "rect11", style: { fill: '#fff' }, width: "85.76", x: "61.053", y: "178.667" }), index.h("path", { d: "M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z", id: "path13-0", style: { fill: '#fff', fillRule: 'nonzero' } }), index.h("path", { d: "M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z", id: "path15", style: { fill: '#fff', fillRule: 'nonzero' } })))));
    }
    renderTip() {
        var _a;
        const info = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.info;
        return (index.h("div", { class: CSS.tipContainer }, index.h("span", { class: CSS.tipHeader }, index.h("calcite-icon", { icon: "lightbulb", scale: this.scale }), index.h("span", null, info === null || info === void 0 ? void 0 : info.label)), index.h("p", { class: CSS.tipContent }, info === null || info === void 0 ? void 0 : info.tooltip)));
    }
    renderEmbed() {
        var _a, _b, _c;
        const embedMessages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.embed;
        const textarea_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.textArea}` : '';
        return (index.h("div", { class: CSS.embed.container }, index.h("span", { class: CSS.embed.header }, index.h("calcite-icon", { icon: "code", scale: this.scale }), index.h("span", null, (_c = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.embed) === null || _c === void 0 ? void 0 : _c.label)), index.h("div", { class: CSS.embed.embedCode.container }, index.h("div", { class: CSS.embed.embedCode.textArea }, index.h("textarea", { ref: el => (this.embedCodeRef = el), cols: 30, rows: 5, readonly: true, class: textarea_RTL, value: this.getEmbedCode() }), index.h("button", { id: "copyEmbedToClipboard", onClick: this.copyEmbedCode.bind(this), class: CSS.embed.embedCode.copyButton }, index.h("calcite-icon", { icon: "copy", scale: this.scale }), index.h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.copy))), index.h("span", { class: CSS.embed.textAreaText }, index.h("slot", { name: "text-area-text" })), index.h("div", { class: CSS.embed.dimensions.container }, index.h("label", { class: CSS.embed.dimensions.input }, index.h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.width), index.h("input", { ref: el => (this.embedWidthRef = el), type: "number", onKeyDown: e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault(), onChange: this.handleNumberInputOnChange('width'), value: this.embedWidth, min: "1" })), index.h("label", { class: CSS.embed.dimensions.input }, index.h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.height), index.h("input", { ref: el => (this.embedHeightRef = el), type: "number", onKeyDown: e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault(), onChange: this.handleNumberInputOnChange('height'), value: this.embedHeight, min: "1" }))))));
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
            case 'x':
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
                const data = type === 'x' ? Object.assign(Object.assign({}, urlData), { text: this.shareText }) : urlData;
                const [intl] = await loadModules.loadModules(['esri/intl']);
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
        const [esriRequest] = await loadModules.loadModules(['esri/request']);
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
        const [Point, SpatialReference] = await loadModules.loadModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']);
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
        const [SpatialReference, projection] = await loadModules.loadModules(['esri/geometry/SpatialReference', 'esri/geometry/projection']);
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
        var _a, _b, _c, _d, _e;
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
        let hiddenLayers;
        if (graphic && visible && ((_e = graphic === null || graphic === void 0 ? void 0 : graphic.layer) === null || _e === void 0 ? void 0 : _e.type) === 'feature') {
            const featureLayer = graphic === null || graphic === void 0 ? void 0 : graphic.layer;
            layerId = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.id;
            oid = graphic.attributes[featureLayer.objectIdField];
        }
        hiddenLayers = this.view.map.allLayers
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
    get el() { return index.getElement(this); }
};
InstantAppsSocialShare.style = InstantAppsSocialShareStyle0;

exports.calcite_block = Block;
exports.calcite_date_picker = DatePicker;
exports.calcite_input_date_picker = InputDatePicker;
exports.instant_apps_filter_list = InstantAppsFilterList;
exports.instant_apps_social_share = InstantAppsSocialShare;
