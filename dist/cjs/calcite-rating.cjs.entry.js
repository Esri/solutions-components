/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const form = require('./form-5229f1c8.js');
const guid = require('./guid-02e5380f.js');
const interactive = require('./interactive-89f913ba.js');
const label = require('./label-26ee0ddb.js');
const loadable = require('./loadable-2e2626dc.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
const dom = require('./dom-6a9b6275.js');
require('./browser-69696af0.js');
require('./component-a4c6a35d.js');
require('./key-d6da79d8.js');
require('./observers-8fed90f3.js');
require('./resources-dfe71ff2.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const StarIcon = ({ full, scale, partial }) => (index.h("calcite-icon", { class: partial ? undefined : "icon",
    icon: full ? "star-f" : "star",
    scale }));

const ratingCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([read-only]) *,:host([disabled]) *,:host([read-only]) ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;align-items:center;inline-size:-moz-fit-content;inline-size:fit-content}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){block-size:1.5rem;--calcite-rating-spacing-unit:0.25rem}:host([scale=m]){block-size:2rem;--calcite-rating-spacing-unit:0.5rem}:host([scale=l]){block-size:2.75rem;--calcite-rating-spacing-unit:0.75rem}.fieldset{margin:0;display:flex;border-width:0;padding:0;align-items:center;gap:var(--calcite-rating-spacing-unit)}.wrapper{display:inline-block}.star{transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;position:relative;display:flex;flex-direction:column;cursor:pointer;color:var(--calcite-color-border-input)}.star:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.average,.fraction{color:var(--calcite-color-status-warning)}.hovered,.selected{color:var(--calcite-color-brand)}.fraction{transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;position:absolute;pointer-events:none;inset-block-start:0;overflow:hidden;inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:bold}.number--count{color:var(--calcite-color-text-2);font-style:italic}.number--count:not(:first-child){margin-inline-start:var(--calcite-rating-spacing-unit)}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteRatingStyle0 = ratingCss;

const Rating = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteRatingChange = index.createEvent(this, "calciteRatingChange", 6);
        this.handleRatingPointerOver = () => {
            this.isKeyboardInteraction = false;
        };
        this.handleRatingPointerOut = () => {
            this.isKeyboardInteraction = true;
            this.hoverValue = null;
        };
        this.handleHostKeyDown = () => {
            this.isKeyboardInteraction = true;
        };
        this.handleLabelKeyDown = (event) => {
            const inputValue = this.getValueFromLabelEvent(event);
            const key = event.key;
            const numberKey = key == " " ? undefined : Number(key);
            this.emit = true;
            if (isNaN(numberKey)) {
                switch (key) {
                    case "Enter":
                    case " ":
                        this.value = !this.required && this.value === inputValue ? 0 : inputValue;
                        break;
                    case "ArrowLeft":
                        this.value = this.getPreviousRatingValue(inputValue);
                        this.updateFocus();
                        event.preventDefault();
                        break;
                    case "ArrowRight":
                        this.value = this.getNextRatingValue(inputValue);
                        this.updateFocus();
                        event.preventDefault();
                        break;
                    case "Tab":
                        this.hoverValue = null;
                        break;
                }
            }
            else {
                if (!this.required && numberKey >= 0 && numberKey <= this.max) {
                    this.value = numberKey;
                }
                else if (this.required && numberKey > 0 && numberKey <= this.max) {
                    this.value = numberKey;
                }
                this.updateFocus();
            }
        };
        this.handleInputChange = (event) => {
            if (this.isKeyboardInteraction === true) {
                const inputVal = Number(event.target["value"]);
                this.hoverValue = inputVal;
                this.value = inputVal;
            }
        };
        this.handleLabelPointerOver = (event) => {
            this.hoverValue = this.getValueFromLabelEvent(event);
        };
        this.handleLabelPointerDown = (event) => {
            const target = event.currentTarget;
            const inputValue = this.getValueFromLabelEvent(event);
            this.hoverValue = inputValue;
            this.emit = true;
            this.value = !this.required && this.value === inputValue ? 0 : inputValue;
            target.focus();
        };
        this.handleLabelClick = (event) => {
            //preventing pointerdown event will supress any compatability mouse events except for click event.
            event.preventDefault();
        };
        this.handleLabelFocus = (event) => {
            const inputValue = this.getValueFromLabelEvent(event);
            this.hoverValue = inputValue;
        };
        this.setLabelEl = (el) => {
            this.labelElements.push(el);
        };
        this.emit = false;
        this.guid = `calcite-ratings-${guid.guid()}`;
        this.isKeyboardInteraction = true;
        this.labelElements = [];
        this.max = 5;
        this.average = undefined;
        this.count = undefined;
        this.disabled = false;
        this.form = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.name = undefined;
        this.readOnly = false;
        this.required = false;
        this.scale = "m";
        this.showChip = false;
        this.value = 0;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
        this.hoverValue = undefined;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleValueUpdate(newValue) {
        this.hoverValue = newValue;
        if (this.emit) {
            this.calciteRatingChange.emit();
        }
        this.emit = false;
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        label.connectLabel(this);
        form.connectForm(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        loadable.setUpLoadableComponent(this);
    }
    componentWillRender() {
        this.starsMap = Array.from({ length: this.max }, (_, i) => {
            const value = i + 1;
            const average = !this.hoverValue && this.average && !this.value && value <= this.average;
            const checked = value === this.value;
            const fraction = this.average && this.average + 1 - value;
            const hovered = value <= this.hoverValue;
            const id = `${this.guid}-${value}`;
            const partial = !this.hoverValue && !this.value && !hovered && fraction > 0 && fraction < 1;
            const selected = this.value >= value;
            const tabIndex = this.getTabIndex(value);
            return {
                average,
                checked,
                fraction,
                hovered,
                id,
                partial,
                selected,
                value,
                tabIndex,
            };
        });
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(index.Host, { key: '9c08ab0a8eee6854a1d88fd2ed538e1a95ce5d62', onKeyDown: this.handleHostKeyDown, onPointerOut: this.handleRatingPointerOut, onPointerOver: this.handleRatingPointerOver }, index.h(interactive.InteractiveContainer, { key: 'fc3a022e1943f0e52eaba60423ac44eb58011326', disabled: this.disabled }, index.h("span", { key: '89dba59e95b9bdc552d5557df7e7df32b71ac4e4', class: "wrapper" }, index.h("fieldset", { key: '69a2c7a774dc7a19c15fd2e9b36f4da8f088b1ef', class: "fieldset", disabled: this.disabled }, index.h("legend", { key: '9266db4c44647a70b367581bff35c67e0a5ba3be', class: "visually-hidden" }, this.messages.rating), this.starsMap.map(({ average, checked, fraction, hovered, id, partial, selected, value, tabIndex, }) => {
            return (index.h("label", { class: {
                    star: true,
                    selected,
                    hovered,
                    average,
                    partial,
                }, "data-value": value, htmlFor: id, onClick: this.handleLabelClick, onFocus: this.handleLabelFocus, onKeyDown: this.handleLabelKeyDown, onPointerDown: this.handleLabelPointerDown, onPointerOver: this.handleLabelPointerOver, ref: this.setLabelEl, tabIndex: tabIndex }, index.h("input", { checked: checked, class: "visually-hidden", disabled: this.disabled || this.readOnly, id: id, name: this.guid, onChange: this.handleInputChange, tabIndex: -1, type: "radio", value: value }), index.h(StarIcon, { full: selected || average, scale: this.scale }), partial && (index.h("div", { class: "fraction", style: { width: `${fraction * 100}%` } }, index.h(StarIcon, { full: true, partial: true, scale: this.scale }))), index.h("span", { class: "visually-hidden" }, this.messages.stars.replace("{num}", `${value}`))));
        }), (this.count || this.average) && this.showChip ? (index.h("calcite-chip", { scale: this.scale, value: this.count?.toString() }, !!this.average && index.h("span", { class: "number--average" }, this.average.toString()), !!this.count && index.h("span", { class: "number--count" }, "(", this.count?.toString(), ")"))) : null), index.h(form.HiddenFormInputSlot, { key: '80020e22ccaacc218647bf50d7a3aa6fbfadf5fb', component: this })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    onLabelClick() {
        this.setFocus();
    }
    updateFocus() {
        this.hoverValue = this.value;
        this.labelElements[this.value - 1].focus();
    }
    getTabIndex(value) {
        if (this.readOnly || (this.value !== value && (this.value || value !== 1))) {
            return -1;
        }
        return 0;
    }
    getValueFromLabelEvent(event) {
        const target = event.currentTarget;
        return Number(target.getAttribute("data-value"));
    }
    getNextRatingValue(currentValue) {
        return currentValue === 5 ? 1 : currentValue + 1;
    }
    getPreviousRatingValue(currentValue) {
        return currentValue === 1 ? 5 : currentValue - 1;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.el);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "value": ["handleValueUpdate"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Rating.style = CalciteRatingStyle0;

exports.calcite_rating = Rating;
