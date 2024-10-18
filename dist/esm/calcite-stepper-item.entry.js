/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-904bc599.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive-98ed6b6f.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './locale-24516fec.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-7cb2fc6f.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-9a5d28cf.js';
import './dom-75c641a7.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './key-e6b442de.js';
import './observers-c83631e8.js';
import './browser-b67d8df6.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    stepperItemContent: "stepper-item-content",
    stepperItemDescription: "stepper-item-description",
    stepperItemHeader: "stepper-item-header",
    stepperItemHeading: "stepper-item-heading",
    stepperItemHeaderText: "stepper-item-header-text",
    stepperItemNumber: "stepper-item-number",
    visuallyHidden: "visually-hidden",
};

const stepperItemCss = ":host([layout=horizontal][disabled]) .stepper-item-header,:host([layout=horizontal-single][disabled]) .stepper-item-header,:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([layout=horizontal][disabled]) .stepper-item-header *,:host([layout=horizontal-single][disabled]) .stepper-item-header *,:host([disabled]) *,:host([layout=horizontal][disabled]) .stepper-item-header ::slotted(*),:host([layout=horizontal-single][disabled]) .stepper-item-header ::slotted(*),:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-stepper-item-spacing-unit-s:0.25rem;--calcite-stepper-item-spacing-unit-m:0.75rem;--calcite-stepper-item-spacing-unit-l:1rem;--calcite-internal-stepper-action-inline-size:2rem;font-size:var(--calcite-font-size--1);line-height:1rem;margin-inline-end:0.25rem}:host([scale=s]) .stepper-item-description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-stepper-item-spacing-unit-s:0.5rem;--calcite-stepper-item-spacing-unit-m:1rem;--calcite-stepper-item-spacing-unit-l:1.25rem;--calcite-internal-stepper-action-inline-size:2.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-inline-end:0.5rem}:host([scale=m]) .stepper-item-description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-stepper-item-spacing-unit-s:0.75rem;--calcite-stepper-item-spacing-unit-m:1.25rem;--calcite-stepper-item-spacing-unit-l:1.5rem;--calcite-internal-stepper-action-inline-size:3rem;font-size:var(--calcite-font-size-1);line-height:1.5rem;margin-inline-end:0.75rem}:host([scale=l]) .stepper-item-description{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host{position:relative;display:flex;flex-grow:1;flex-direction:column;align-self:flex-start;margin-block-end:var(--calcite-stepper-item-spacing-unit-s)}:host .container{position:relative;display:flex;flex-grow:1;cursor:pointer;flex-direction:column;border-width:0px;border-block-start-width:2px;border-style:solid;border-color:var(--calcite-color-border-3);color:var(--calcite-color-text-3);text-decoration-line:none;outline:2px solid transparent;outline-offset:2px}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host .stepper-item-header{display:flex;cursor:pointer;align-items:flex-start}:host .stepper-item-content,:host .stepper-item-header{padding-block:var(--calcite-stepper-item-spacing-unit-l);padding-inline-end:var(--calcite-stepper-item-spacing-unit-m);text-align:start}:host .stepper-item-header *{display:inline-flex;align-items:center}:host .stepper-item-content{display:none;inline-size:100%;flex-direction:column;font-size:var(--calcite-font-size--2);line-height:1.375}:host .stepper-item-icon{margin-inline-end:var(--calcite-stepper-item-spacing-unit-m);margin-block-start:1px;display:inline-flex;block-size:0.75rem;flex-shrink:0;align-self:flex-start;color:var(--calcite-color-text-3);opacity:var(--calcite-opacity-disabled)}:host .stepper-item-header-text{flex-direction:column;text-align:initial;margin-inline-end:auto}:host .stepper-item-heading,:host .stepper-item-description{display:flex;inline-size:100%}:host .stepper-item-heading{margin-block-end:0.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}:host .stepper-item-description{color:var(--calcite-color-text-3)}:host .stepper-item-number{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-3);margin-inline-end:var(--calcite-stepper-item-spacing-unit-m)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([complete]) .container{border-color:rgba(0, 122, 194, 0.5)}:host([complete]) .container .stepper-item-icon{color:var(--calcite-color-brand)}:host([error]) .container{border-block-start-color:var(--calcite-color-status-danger)}:host([error]) .container .stepper-item-number{color:var(--calcite-color-status-danger)}:host([error]) .container .stepper-item-icon{opacity:1;color:var(--calcite-color-status-danger)}:host(:hover:not([disabled]):not([selected])) .container,:host(:focus:not([disabled]):not([selected])) .container{border-block-start-color:var(--calcite-color-brand)}:host(:hover:not([disabled]):not([selected])) .container .stepper-item-heading,:host(:focus:not([disabled]):not([selected])) .container .stepper-item-heading{color:var(--calcite-color-text-1)}:host(:hover:not([disabled]):not([selected])) .container .stepper-item-description,:host(:focus:not([disabled]):not([selected])) .container .stepper-item-description{color:var(--calcite-color-text-2)}:host([error]:hover:not([disabled]):not([selected])) .container,:host([error]:focus:not([disabled]):not([selected])) .container{border-block-start-color:var(--calcite-color-status-danger-hover)}:host([selected]) .container{border-block-start-color:var(--calcite-color-brand)}:host([selected]) .container .stepper-item-heading{color:var(--calcite-color-text-1)}:host([selected]) .container .stepper-item-description{color:var(--calcite-color-text-2)}:host([selected]) .container .stepper-item-number{color:var(--calcite-color-brand)}:host([selected]) .container .stepper-item-icon{color:var(--calcite-color-brand);opacity:1}:host([selected]) .container .stepper-item-content{display:flex}:host([layout=vertical]){inline-size:100%}:host([layout=vertical]) .container{margin-inline:0px;margin-block-start:0px;flex:1 1 auto;border-block-start-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px;border-inline-start-width:2px;padding-inline-start:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]) .container .stepper-item-icon{order:3;margin-block:1px 0px;padding-inline-start:var(--calcite-stepper-item-spacing-unit-s);margin-inline-start:auto}:host([layout=vertical]) .container .stepper-item-header{padding-inline-end:0px}:host([layout=vertical]) .container .stepper-item-content{padding:0px}:host([layout=vertical][complete]) .container{border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][complete]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical][complete]:focus:not([disabled]):not([selected])) .container{border-color:var(--calcite-color-brand)}:host([layout=vertical][error]) .container{border-color:var(--calcite-color-status-danger)}:host([layout=vertical][selected]) .container{border-color:var(--calcite-color-brand)}:host([layout=vertical][selected]) .container .stepper-item-content:not(:empty){margin-block-end:var(--calcite-stepper-item-spacing-unit-l)}:host([layout=vertical]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical]:focus:not([disabled]):not([selected])) .container{border-color:rgba(0, 122, 194, 0.5)}:host([layout=vertical][error]:hover:not([disabled]):not([selected])) .container,:host([layout=vertical][error]:focus:not([disabled]):not([selected])) .container{border-color:var(--calcite-color-status-danger-hover)}:host([layout=horizontal]),:host([layout=horizontal-single]){display:contents}:host([layout=horizontal]) .container,:host([layout=horizontal-single]) .container{display:contents}:host([layout=horizontal]) .stepper-item-header,:host([layout=horizontal-single]) .stepper-item-header{border-width:0px;border-block-start-width:2px;border-style:solid;border-color:var(--calcite-color-border-3);outline-color:transparent;grid-row:items}:host([layout=horizontal]) .stepper-item-header:focus,:host([layout=horizontal-single]) .stepper-item-header:focus{transition-duration:0s;outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([layout=horizontal]) .stepper-item-content,:host([layout=horizontal-single]) .stepper-item-content{cursor:auto;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);padding-block:0;padding-inline-end:var(--calcite-stepper-item-spacing-unit-m);text-align:start}:host([layout=horizontal-single]) .stepper-item-header{grid-area:1/1/1/-1}:host([layout=horizontal]) .stepper-item-content,:host([layout=horizontal-single]) .stepper-item-content{grid-area:2/1/2/-1}:host([layout=horizontal][complete]) .stepper-item-header,:host([layout=horizontal-single][complete]) .stepper-item-header{border-color:rgba(0, 122, 194, 0.5)}:host([layout=horizontal][complete]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal][complete]:focus:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][complete]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][complete]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:var(--calcite-color-brand)}:host([layout=horizontal][error]) .stepper-item-header,:host([layout=horizontal-single][error]) .stepper-item-header{border-color:var(--calcite-color-status-danger)}:host([layout=horizontal][selected]) .stepper-item-header,:host([layout=horizontal-single][selected]) .stepper-item-header{border-color:var(--calcite-color-brand)}:host([layout=horizontal]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal]:focus:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:rgba(0, 122, 194, 0.5)}:host([layout=horizontal][error]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal][error]:focus:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][error]:hover:not([disabled]):not([selected])) .stepper-item-header,:host([layout=horizontal-single][error]:focus:not([disabled]):not([selected])) .stepper-item-header{border-color:var(--calcite-color-status-danger-hover)}@media (forced-colors: active){:host .container{outline-width:0;outline-offset:0}:host(:focus),:host(:focus-visible){outline-color:canvasText}:host([selected]) .container{border-block-start-color:highlight}:host([selected]) .container .stepper-item-number{color:highlight}:host([selected]) .container .stepper-item-icon{color:highlight}:host([layout=vertical][selected]) .container{border-color:highlight}}:host([layout=horizontal-single]) .stepper-item-header{margin-inline-end:0px;box-sizing:border-box;border-style:none;inline-size:100%;padding-inline:calc(var(--calcite-internal-stepper-action-inline-size) + 0.5rem)}:host([layout=horizontal-single][error]) .container .stepper-item-number{color:var(--calcite-color-status-danger)}:host([layout=horizontal-single][error]) .container .stepper-item-icon{opacity:1;color:var(--calcite-color-status-danger)}:host([layout=horizontal-single][error][selected]),:host([layout=horizontal-single][complete][selected]) .container{color:var(--calcite-color-text-3)}:host([layout=horizontal-single][error][selected]) .stepper-item-heading,:host([layout=horizontal-single][complete][selected]) .container .stepper-item-heading{color:var(--calcite-color-text-2)}:host([layout=horizontal-single][complete][selected]) .container .stepper-item-icon{opacity:var(--calcite-opacity-disabled)}:host([layout=horizontal-single][complete][selected]) .container .stepper-item-number{color:var(--calcite-color-text-3)}.visually-hidden{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteStepperItemStyle0 = stepperItemCss;

const StepperItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalStepperItemKeyEvent = createEvent(this, "calciteInternalStepperItemKeyEvent", 6);
        this.calciteInternalStepperItemSelect = createEvent(this, "calciteInternalStepperItemSelect", 6);
        this.calciteInternalStepperItemRegister = createEvent(this, "calciteInternalStepperItemRegister", 6);
        this.calciteStepperItemSelect = createEvent(this, "calciteStepperItemSelect", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.keyDownHandler = (event) => {
            if (!this.disabled && event.target === this.el) {
                switch (event.key) {
                    case " ":
                    case "Enter":
                        this.emitUserRequestedItem();
                        event.preventDefault();
                        break;
                    case "ArrowUp":
                    case "ArrowDown":
                    case "ArrowLeft":
                    case "ArrowRight":
                    case "Home":
                    case "End":
                        this.calciteInternalStepperItemKeyEvent.emit({ item: event });
                        event.preventDefault();
                        break;
                }
            }
        };
        this.handleItemClick = (event) => {
            if (this.disabled ||
                (this.layout === "horizontal" &&
                    event
                        .composedPath()
                        .some((el) => el.classList?.contains("stepper-item-content")))) {
                return;
            }
            this.emitUserRequestedItem();
        };
        this.emitUserRequestedItem = () => {
            this.emitRequestedItem();
            if (!this.disabled) {
                this.calciteStepperItemSelect.emit();
            }
        };
        this.emitRequestedItem = () => {
            if (!this.disabled) {
                const position = this.itemPosition;
                this.calciteInternalStepperItemSelect.emit({
                    position,
                });
            }
        };
        this.selected = false;
        this.complete = false;
        this.error = false;
        this.disabled = false;
        this.heading = undefined;
        this.description = undefined;
        this.iconFlipRtl = false;
        this.numberingSystem = undefined;
        this.icon = false;
        this.layout = undefined;
        this.messages = undefined;
        this.numbered = false;
        this.scale = "m";
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    selectedHandler() {
        if (this.selected) {
            this.emitRequestedItem();
        }
    }
    // watch for removal of disabled to register step
    disabledWatcher() {
        this.registerStepperItem();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleWatcher(locale) {
        numberStringFormatter.numberFormatOptions = {
            locale,
            numberingSystem: this.numberingSystem,
            useGrouping: false,
        };
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
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        this.parentStepperEl = this.el.parentElement;
        this.itemPosition = this.getItemPosition();
        this.registerStepperItem();
        if (this.selected) {
            this.emitRequestedItem();
        }
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    render() {
        return (h(Host, { key: '21ead444066e7670e2884bf44eb33b1d6e16278e', "aria-current": this.selected ? "step" : "false", onClick: this.handleItemClick, onKeyDown: this.keyDownHandler, tabIndex: this.disabled ? -1 : 0 }, h(InteractiveContainer, { key: '5d687fcf0ca63a518df6ac408bce87adb8cf4141', disabled: this.disabled }, h("div", { key: 'a8eb28baf17f7d302cd8acc06c87432c2a5b59da', class: CSS.container }, this.complete && (h("span", { key: 'dd645ac0548cfb09daa4cb36d4ca08f7f3df67bf', "aria-live": "polite", class: CSS.visuallyHidden }, this.messages.complete)), h("div", { key: '6c14bec4509a8b48e08f3d140e852ce6441a7418', class: CSS.stepperItemHeader, ref: (el) => (this.headerEl = el), tabIndex: 
            /* additional tab index logic needed because of display: contents */
            this.layout === "horizontal" && !this.disabled ? 0 : null }, this.icon ? this.renderIcon() : null, this.numbered ? (h("div", { class: CSS.stepperItemNumber }, this.renderNumbers(), ".")) : null, h("div", { key: '49ebae3bd3affcdf6d68581e89d8a7c65b8606a6', class: CSS.stepperItemHeaderText }, h("span", { key: '523fbb51267df84902a47ccd4b2c047b52e7df07', class: CSS.stepperItemHeading }, this.heading), h("span", { key: 'f6c4f69b00a5e5d9f52089156ec77adecc1bdffc', class: CSS.stepperItemDescription }, this.description))), h("div", { key: '086f0f9320d3098de87d1e9f3728164a83caf35d', class: CSS.stepperItemContent }, h("slot", { key: '8e049fb74154fbce4d685d4d00ebca9b3ff57f63' }))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        if (event.target === this.parentStepperEl ||
            event.composedPath().includes(this.parentStepperEl)) {
            this.selectedPosition = event.detail.position;
            this.determineSelectedItem();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        (this.layout === "vertical" ? this.el : this.headerEl)?.focus();
    }
    renderIcon() {
        let path = "circle";
        if (this.selected && (this.layout !== "horizontal-single" || (!this.error && !this.complete))) {
            path = "circleF";
        }
        else if (this.error) {
            path = "exclamationMarkCircleF";
        }
        else if (this.complete) {
            path = "checkCircleF";
        }
        return (h("calcite-icon", { class: "stepper-item-icon", flipRtl: this.iconFlipRtl, icon: path, scale: "s" }));
    }
    determineSelectedItem() {
        this.selected = !this.disabled && this.itemPosition === this.selectedPosition;
    }
    registerStepperItem() {
        this.calciteInternalStepperItemRegister.emit({
            position: this.itemPosition,
        });
    }
    getItemPosition() {
        return Array.from(this.parentStepperEl?.querySelectorAll("calcite-stepper-item")).indexOf(this.el);
    }
    renderNumbers() {
        numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            useGrouping: false,
        };
        return numberStringFormatter.numberFormatter.format(this.itemPosition + 1);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selected": ["selectedHandler"],
        "disabled": ["disabledWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleWatcher"]
    }; }
};
StepperItem.style = CalciteStepperItemStyle0;

export { StepperItem as calcite_stepper_item };
