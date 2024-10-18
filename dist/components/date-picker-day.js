/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as dateToISO } from './date.js';
import { c as closestElementCrossShadowBoundary, t as toAriaBoolean } from './dom.js';
import { I as InteractiveContainer, u as updateHostInteraction } from './interactive.js';
import { i as isActivationKey } from './key.js';
import { n as numberStringFormatter } from './locale2.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';

const datePickerDayCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;cursor:pointer;color:var(--calcite-color-text-3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.day-v-wrapper{flex:1 1 auto}.day-wrapper{position:relative;display:flex;flex-direction:column;align-items:center}:host([range]) .day-wrapper::before,:host([range]) .day-wrapper::after,:host([range-hover]) .day-wrapper::before,:host([range-hover]) .day-wrapper::after{pointer-events:none;position:absolute;inset-block:0;content:\"\";block-size:var(--calcite-internal-day-size);inline-size:var(--calcite-internal-day-size)}.day{z-index:var(--calcite-z-index);display:flex;align-items:center;justify-content:center;border-radius:9999px;font-size:var(--calcite-font-size--2);line-height:1rem;line-height:1;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;background:none;box-shadow:0 0 0 2px transparent;block-size:var(--calcite-internal-day-size);inline-size:var(--calcite-internal-day-size)}.text{margin-block:1px 0px;margin-inline-start:0px}:host([scale=s]){--calcite-internal-day-size:27px}:host([scale=s]) .day-v-wrapper{padding-block:0.125rem}:host([scale=s]) .day-wrapper{padding:0px}:host([scale=s]) .day{font-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-internal-day-size:33px}:host([scale=m]) .day-v-wrapper{padding-block:0.25rem}:host([scale=m]) .day-wrapper{padding:0px}:host([scale=m]) .day{font-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-internal-day-size:43px}:host([scale=l]) .day-v-wrapper{padding-block:0.25rem}:host([scale=l]) .day-wrapper{padding-inline:0.25rem}:host([scale=l]) .day{font-size:var(--calcite-font-size-0)}:host(:not([current-month])) .day{opacity:var(--calcite-opacity-disabled)}:host(:hover:not([disabled]):not([selected])) .day,:host([active]:not([range]):not([selected])) .day{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host(:focus),:host([active]){outline:2px solid transparent;outline-offset:2px}:host(:focus:not([disabled])) .day{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([selected]) .day{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-color-brand);color:var(--calcite-color-foreground-1)}:host(:focus:not([disabled])) .day,:host([start-of-range]:not(:focus)) .day,:host([end-of-range]:not(:focus)) .day{box-shadow:0 0 0 2px var(--calcite-color-foreground-1)}:host([range-hover]:not([selected])) .day-wrapper::before,:host([highlighted]:not([selected])) .day-wrapper::before{inset-inline-end:50%;border-radius:0}:host([range-hover]:not([selected])) .day-wrapper::after,:host([highlighted]:not([selected])) .day-wrapper::after{inset-inline-start:50%;border-radius:0}:host([range-hover]:not([selected])) .day,:host([highlighted]:not([selected])) .day{color:var(--calcite-color-text-1)}:host([highlighted]) .day-wrapper::before,:host([highlighted]) .day-wrapper::after,:host([selected]:not(.hover--outside-range)) .day-wrapper::before,:host([selected]:not(.hover--outside-range)) .day-wrapper::after{background-color:var(--calcite-color-foreground-current)}:host([range-hover]:not([selected])) .day-wrapper::before,:host([range-hover]:not([selected])) .day-wrapper::after{background-color:var(--calcite-color-foreground-2)}:host(:hover[range-hover]:not([selected]).focused--end) .day-wrapper::before,:host([highlighted][end-of-range]) .day-wrapper::before,:host([highlighted][range-edge=end]) .day-wrapper::before,:host([range-hover][range-edge=end]) .day-wrapper::before,:host(:hover[range-hover].focused--end.hover--outside-range) .day-wrapper::before{inset-inline-end:50%}:host(:hover[range-hover]:not([selected]).focused--end) .day-wrapper::after,:host([highlighted][end-of-range]) .day-wrapper::after,:host([highlighted][range-edge=end]) .day-wrapper::after,:host([range-hover][range-edge=end]) .day-wrapper::after,:host(:hover[range-hover].focused--end.hover--outside-range) .day-wrapper::after{inset-inline-start:50%;border-start-end-radius:var(--calcite-internal-day-size);border-end-end-radius:var(--calcite-internal-day-size);inline-size:calc(var(--calcite-internal-day-size) / 2)}:host([highlighted][start-of-range]) .day-wrapper::before,:host([highlighted][range-edge=start]) .day-wrapper::before,:host([range-hover][range-edge=start]) .day-wrapper::before,:host(:hover[range-hover]:not([selected]).focused--start) .day-wrapper::before,:host([start-of-range].hover--inside-range) .day-wrapper::before,:host(:hover[range-hover].focused--start.hover--outside-range) .day-wrapper::before{inset-inline-end:50%;border-start-start-radius:var(--calcite-internal-day-size);border-end-start-radius:var(--calcite-internal-day-size);inline-size:calc(var(--calcite-internal-day-size) / 2)}:host([highlighted][start-of-range]) .day-wrapper::after,:host([highlighted][range-edge=start]) .day-wrapper::after,:host([range-hover][range-edge=start]) .day-wrapper::after,:host(:hover[range-hover]:not([selected]).focused--start) .day-wrapper::after,:host([start-of-range].hover--inside-range) .day-wrapper::after,:host(:hover[range-hover].focused--start.hover--outside-range) .day-wrapper::after{inset-inline-start:50%}:host([range-hover][start-of-range][range-edge=end]) .day-wrapper::after,:host([range-hover][start-of-range][range-edge=end]) .day-wrapper::before,:host([range-hover][end-of-range][range-edge=start]) .day-wrapper::after,:host([range-hover][end-of-range][range-edge=start]) .day-wrapper::before,:host([start-of-range][range-edge=end].hover--inside-range) .day-wrapper::after,:host([start-of-range][range-edge=end].hover--inside-range) .day-wrapper::before,:host([end-of-range]) .day-wrapper::after,:host([end-of-range]) .day-wrapper::before{content:unset}:host(:hover[range-hover]:not([selected]).focused--start) .day,:host(:hover[range-hover]:not([selected]).focused--end) .day,:host(:hover[range-hover]:not([selected]).focused--start.hover--outside-range) .day,:host(:hover[range-hover]:not([selected]).focused--end.hover--outside-range) .day{box-shadow:0 0 0 2px var(--calcite-color-foreground-1)}@media (forced-colors: active){.day{border-radius:0px}:host([selected]){outline:2px solid canvasText}:host(:hover:not([selected])) .day{border-radius:50%}:host([range][selected]) .day-wrapper::before,:host([range][selected]) .day-wrapper::after,:host([highlighted]) .day-wrapper::before,:host([highlighted]) .day-wrapper::after,:host([range-hover]:not([selected])) .day-wrapper::before,:host([range-hover]:not([selected])) .day-wrapper::after{background-color:highlight}:host([range-hover]) .day-wrapper::before,:host([range-hover]) .day-wrapper::after,:host([range][selected][start-of-range]) .day-wrapper::before,:host([range][selected][start-of-range]) .day-wrapper::after,:host([range][selected][end-of-range]) .day-wrapper::before,:host([range][selected][end-of-range]) .day-wrapper::after{background-color:canvas}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDatePickerDayStyle0 = datePickerDayCss;

const DatePickerDay = /*@__PURE__*/ proxyCustomElement(class DatePickerDay extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteDaySelect = createEvent(this, "calciteDaySelect", 6);
        this.calciteInternalDayHover = createEvent(this, "calciteInternalDayHover", 6);
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.onClick = () => {
            if (this.disabled) {
                return;
            }
            this.calciteDaySelect.emit();
        };
        this.keyDownHandler = (event) => {
            if (isActivationKey(event.key)) {
                !this.disabled && this.calciteDaySelect.emit();
                event.preventDefault();
            }
        };
        this.day = undefined;
        this.dateTimeFormat = undefined;
        this.disabled = false;
        this.currentMonth = false;
        this.selected = false;
        this.highlighted = false;
        this.range = false;
        this.rangeEdge = undefined;
        this.startOfRange = false;
        this.endOfRange = false;
        this.rangeHover = false;
        this.active = false;
        this.scale = undefined;
        this.value = undefined;
    }
    pointerOverHandler() {
        if (this.disabled) {
            return;
        }
        this.calciteInternalDayHover.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        this.parentDatePickerEl = closestElementCrossShadowBoundary(this.el, "calcite-date-picker");
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.el.focus();
    }
    render() {
        const dayId = dateToISO(this.value).replaceAll("-", "");
        if (this.parentDatePickerEl) {
            const { numberingSystem, lang: locale } = this.parentDatePickerEl;
            numberStringFormatter.numberFormatOptions = {
                useGrouping: false,
                ...(numberingSystem && { numberingSystem }),
                ...(locale && { locale }),
            };
        }
        const formattedDay = numberStringFormatter.localize(String(this.day));
        const dayLabel = this.dateTimeFormat.format(this.value);
        return (h(Host, { key: '99367dbc5f33128ec7e60922a7ccb68f54362f78', "aria-label": dayLabel, "aria-selected": toAriaBoolean(this.active), id: dayId, onClick: this.onClick, onKeyDown: this.keyDownHandler, role: "button", tabIndex: this.active && !this.disabled ? 0 : -1 }, h(InteractiveContainer, { key: '50e5172f11d617e5e52aade2bb9fbdd7c46ccc60', disabled: this.disabled }, h("div", { key: 'cfb5af0dcdb9283e00d3220e3658c253fc8fdc05', "aria-hidden": "true", class: { "day-v-wrapper": true } }, h("div", { key: 'f1a85d642b0abdf35676fea5873c2ac4c92d451c', class: "day-wrapper" }, h("span", { key: '79daaedf22745c9d633b4461c5a28b828b6803ae', class: "day" }, h("span", { key: '14152896fce841cbe975eeabd5171024ae5133d3', class: "text" }, formattedDay)))))));
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    get el() { return this; }
    static get style() { return CalciteDatePickerDayStyle0; }
}, [1, "calcite-date-picker-day", {
        "day": [2],
        "dateTimeFormat": [16],
        "disabled": [516],
        "currentMonth": [516, "current-month"],
        "selected": [516],
        "highlighted": [516],
        "range": [516],
        "rangeEdge": [513, "range-edge"],
        "startOfRange": [516, "start-of-range"],
        "endOfRange": [516, "end-of-range"],
        "rangeHover": [516, "range-hover"],
        "active": [516],
        "scale": [513],
        "value": [16],
        "setFocus": [64]
    }, [[1, "pointerover", "pointerOverHandler"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-date-picker-day"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, DatePickerDay);
            }
            break;
    } });
}
defineCustomElement();

export { DatePickerDay as D, defineCustomElement as d };
