/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h, proxyCustomElement, HTMLElement, createEvent, Host } from '@stencil/core/internal/client';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form.js';
import { g as guid } from './guid.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as connectLabel, d as disconnectLabel } from './label.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { k as focusFirstTabbable } from './dom.js';
import { d as defineCustomElement$3 } from './chip.js';
import { d as defineCustomElement$2 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const StarIcon = ({ full, scale, partial }) => (h("calcite-icon", { class: partial ? undefined : "icon", icon: full ? "star-f" : "star", scale: scale }));

const ratingCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([read-only]) *,:host([disabled]) *,:host([read-only]) ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;align-items:center;inline-size:-moz-fit-content;inline-size:fit-content}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){block-size:1.5rem;--calcite-rating-spacing-unit:0.25rem}:host([scale=m]){block-size:2rem;--calcite-rating-spacing-unit:0.5rem}:host([scale=l]){block-size:2.75rem;--calcite-rating-spacing-unit:0.75rem}.fieldset{margin:0;display:flex;border-width:0;padding:0;align-items:center;gap:var(--calcite-rating-spacing-unit)}.wrapper{display:inline-block}.star{transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;position:relative;display:flex;flex-direction:column;cursor:pointer;color:var(--calcite-color-border-input)}.star:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.average,.fraction{color:var(--calcite-color-status-warning)}.hovered,.selected{color:var(--calcite-color-brand)}.fraction{transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;position:absolute;pointer-events:none;inset-block-start:0;overflow:hidden;inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:bold}.number--count{color:var(--calcite-color-text-2);font-style:italic}.number--count:not(:first-child){margin-inline-start:var(--calcite-rating-spacing-unit)}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteRatingStyle0 = ratingCss;

const Rating = /*@__PURE__*/ proxyCustomElement(class Rating extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteRatingChange = createEvent(this, "calciteRatingChange", 6);
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
        this.guid = `calcite-ratings-${guid()}`;
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
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        connectLabel(this);
        connectForm(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
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
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectLabel(this);
        disconnectForm(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        return (h(Host, { key: '0e3159f00247860bc8c33e0913f9dd1e9248d887', onKeyDown: this.handleHostKeyDown, onPointerOut: this.handleRatingPointerOut, onPointerOver: this.handleRatingPointerOver }, h(InteractiveContainer, { key: '04013c4189a6c47e8c4ca61ee51b4b8491108964', disabled: this.disabled }, h("span", { key: '0fca81bc548e56b36cbf1695076517ba8204bef1', class: "wrapper" }, h("fieldset", { key: '30578fd314ff0e26c7963d5a9ad5bf787c4a6af0', class: "fieldset", disabled: this.disabled }, h("legend", { key: '18147ef049b4602781c7b7a2c102af81be7149d7', class: "visually-hidden" }, this.messages.rating), this.starsMap.map(({ average, checked, fraction, hovered, id, partial, selected, value, tabIndex, }) => {
            return (h("label", { class: {
                    star: true,
                    selected,
                    hovered,
                    average,
                    partial,
                }, "data-value": value, htmlFor: id, onClick: this.handleLabelClick, onFocus: this.handleLabelFocus, onKeyDown: this.handleLabelKeyDown, onPointerDown: this.handleLabelPointerDown, onPointerOver: this.handleLabelPointerOver, ref: this.setLabelEl, tabIndex: tabIndex }, h("input", { checked: checked, class: "visually-hidden", disabled: this.disabled || this.readOnly, id: id, name: this.guid, onChange: this.handleInputChange, tabIndex: -1, type: "radio", value: value }), h(StarIcon, { full: selected || average, scale: this.scale }), partial && (h("div", { class: "fraction", style: { width: `${fraction * 100}%` } }, h(StarIcon, { full: true, partial: true, scale: this.scale }))), h("span", { class: "visually-hidden" }, this.messages.stars.replace("{num}", `${value}`))));
        }), (this.count || this.average) && this.showChip ? (h("calcite-chip", { scale: this.scale, value: this.count?.toString() }, !!this.average && h("span", { class: "number--average" }, this.average.toString()), !!this.count && h("span", { class: "number--count" }, "(", this.count?.toString(), ")"))) : null), h(HiddenFormInputSlot, { key: '2aabd4db649ddc70a0b70d9f406f34e632676796', component: this })))));
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
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "value": ["handleValueUpdate"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteRatingStyle0; }
}, [1, "calcite-rating", {
        "average": [514],
        "count": [514],
        "disabled": [516],
        "form": [513],
        "messages": [1040],
        "messageOverrides": [1040],
        "name": [513],
        "readOnly": [516, "read-only"],
        "required": [516],
        "scale": [513],
        "showChip": [516, "show-chip"],
        "value": [1538],
        "effectiveLocale": [32],
        "defaultMessages": [32],
        "hoverValue": [32],
        "setFocus": [64]
    }, undefined, {
        "messageOverrides": ["onMessagesChange"],
        "value": ["handleValueUpdate"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-rating", "calcite-chip", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-rating":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Rating);
            }
            break;
        case "calcite-chip":
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

const CalciteRating = Rating;
const defineCustomElement = defineCustomElement$1;

export { CalciteRating, defineCustomElement };
