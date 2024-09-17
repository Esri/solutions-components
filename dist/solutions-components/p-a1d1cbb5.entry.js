/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { g as getRoundRobinIndex } from './p-e98c4f93.js';
import { a as getElementDir, e as focusElement, t as toAriaBoolean } from './p-68ec5c15.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './p-9f63a45c.js';
import { g as guid } from './p-ff8343ec.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './p-415cf05e.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './p-ac52e0ba.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-18f18ab3.js';
import './p-b39c5275.js';
import './p-acaae81d.js';
import './p-d559f79c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
};

const radioButtonCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;cursor:pointer}:host .container{position:relative;outline:2px solid transparent;outline-offset:2px}:host .radio{cursor:pointer;border-radius:9999px;background-color:var(--calcite-color-foreground-1);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;box-shadow:inset 0 0 0 1px var(--calcite-color-border-input)}:host([hovered]) .radio,:host(:not([checked])[focused]:not([disabled])) .radio{box-shadow:inset 0 0 0 2px var(--calcite-color-brand)}:host([focused]) .radio{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 1px var(--calcite-color-border-input)}:host([scale=s]){--calcite-radio-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-radio-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-radio-size:var(--calcite-font-size-0)}.radio{block-size:var(--calcite-radio-size);max-inline-size:var(--calcite-radio-size);min-inline-size:var(--calcite-radio-size)}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-color-brand)}:host([scale=s][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 4px var(--calcite-color-brand), 0 0 0 2px var(--calcite-color-foreground-1)}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-color-brand)}:host([scale=m][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 5px var(--calcite-color-brand), 0 0 0 2px var(--calcite-color-foreground-1)}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-color-brand)}:host([scale=l][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 6px var(--calcite-color-brand), 0 0 0 2px var(--calcite-color-foreground-1)}@media (forced-colors: active){:host([checked]) .radio::after,:host([checked][disabled]) .radio::after{content:\"\";inline-size:var(--calcite-radio-size);block-size:var(--calcite-radio-size);background-color:windowText;display:block}}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteRadioButtonStyle0 = radioButtonCss;

const RadioButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalRadioButtonBlur = createEvent(this, "calciteInternalRadioButtonBlur", 6);
        this.calciteRadioButtonChange = createEvent(this, "calciteRadioButtonChange", 6);
        this.calciteInternalRadioButtonCheckedChange = createEvent(this, "calciteInternalRadioButtonCheckedChange", 6);
        this.calciteInternalRadioButtonFocus = createEvent(this, "calciteInternalRadioButtonFocus", 6);
        this.selectItem = (items, selectedIndex) => {
            items[selectedIndex].click();
        };
        this.queryButtons = () => {
            return Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter((radioButton) => radioButton.name === this.name);
        };
        this.isFocusable = () => {
            const radioButtons = this.queryButtons();
            const firstFocusable = radioButtons.find((radioButton) => !radioButton.disabled);
            const checked = radioButtons.find((radioButton) => radioButton.checked);
            return firstFocusable === this.el && !checked;
        };
        this.check = () => {
            if (this.disabled) {
                return;
            }
            this.focused = true;
            this.setFocus();
            if (this.checked) {
                return;
            }
            this.uncheckAllRadioButtonsInGroup();
            this.checked = true;
            this.calciteRadioButtonChange.emit();
        };
        this.clickHandler = () => {
            if (this.disabled) {
                return;
            }
            this.check();
        };
        this.setContainerEl = (el) => {
            this.containerEl = el;
        };
        this.handleKeyDown = (event) => {
            const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
            const { key } = event;
            const { el } = this;
            if (keys.indexOf(key) === -1) {
                return;
            }
            if (key === " ") {
                this.check();
                event.preventDefault();
                return;
            }
            let adjustedKey = key;
            if (getElementDir(el) === "rtl") {
                if (key === "ArrowRight") {
                    adjustedKey = "ArrowLeft";
                }
                if (key === "ArrowLeft") {
                    adjustedKey = "ArrowRight";
                }
            }
            const radioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button:not([hidden])")).filter((radioButton) => radioButton.name === this.name);
            let currentIndex = 0;
            const radioButtonsLength = radioButtons.length;
            radioButtons.some((item, index) => {
                if (item.checked) {
                    currentIndex = index;
                    return true;
                }
            });
            switch (adjustedKey) {
                case "ArrowLeft":
                case "ArrowUp":
                    event.preventDefault();
                    this.selectItem(radioButtons, getRoundRobinIndex(Math.max(currentIndex - 1, -1), radioButtonsLength));
                    return;
                case "ArrowRight":
                case "ArrowDown":
                    event.preventDefault();
                    this.selectItem(radioButtons, getRoundRobinIndex(currentIndex + 1, radioButtonsLength));
                    return;
                default:
                    return;
            }
        };
        this.onContainerBlur = () => {
            this.focused = false;
            this.calciteInternalRadioButtonBlur.emit();
        };
        this.onContainerFocus = () => {
            if (!this.disabled) {
                this.focused = true;
                this.calciteInternalRadioButtonFocus.emit();
            }
        };
        this.checked = false;
        this.disabled = false;
        this.focused = false;
        this.form = undefined;
        this.guid = undefined;
        this.hovered = false;
        this.label = undefined;
        this.name = undefined;
        this.required = false;
        this.scale = "m";
        this.value = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Global attributes
    //
    //--------------------------------------------------------------------------
    handleHiddenChange() {
        this.updateTabIndexOfOtherRadioButtonsInGroup();
    }
    checkedChanged(newChecked) {
        if (newChecked) {
            this.uncheckOtherRadioButtonsInGroup();
        }
        this.calciteInternalRadioButtonCheckedChange.emit();
    }
    disabledChanged() {
        this.updateTabIndexOfOtherRadioButtonsInGroup();
    }
    nameChanged() {
        this.checkLastRadioButton();
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        if (!this.disabled) {
            focusElement(this.containerEl);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    syncHiddenFormInput(input) {
        input.type = "radio";
    }
    onLabelClick(event) {
        if (this.disabled || this.el.hidden) {
            return;
        }
        const label = event.currentTarget;
        const radioButton = label.for
            ? this.rootNode.querySelector(`calcite-radio-button[id="${label.for}"]`)
            : label.querySelector(`calcite-radio-button[name="${this.name}"]`);
        if (!radioButton) {
            return;
        }
        radioButton.focused = true;
        this.setFocus();
        if (radioButton.checked) {
            return;
        }
        this.uncheckOtherRadioButtonsInGroup();
        radioButton.checked = true;
        this.calciteRadioButtonChange.emit();
    }
    checkLastRadioButton() {
        const radioButtons = this.queryButtons();
        const checkedRadioButtons = radioButtons.filter((radioButton) => radioButton.checked);
        if (checkedRadioButtons?.length > 1) {
            const lastCheckedRadioButton = checkedRadioButtons[checkedRadioButtons.length - 1];
            checkedRadioButtons
                .filter((checkedRadioButton) => checkedRadioButton !== lastCheckedRadioButton)
                .forEach((checkedRadioButton) => {
                checkedRadioButton.checked = false;
                checkedRadioButton.emitCheckedChange();
            });
        }
    }
    /** @internal */
    async emitCheckedChange() {
        this.calciteInternalRadioButtonCheckedChange.emit();
    }
    uncheckAllRadioButtonsInGroup() {
        const radioButtons = this.queryButtons();
        radioButtons.forEach((radioButton) => {
            if (radioButton.checked) {
                radioButton.checked = false;
                radioButton.focused = false;
            }
        });
    }
    uncheckOtherRadioButtonsInGroup() {
        const radioButtons = this.queryButtons();
        const otherRadioButtons = radioButtons.filter((radioButton) => radioButton.guid !== this.guid);
        otherRadioButtons.forEach((otherRadioButton) => {
            if (otherRadioButton.checked) {
                otherRadioButton.checked = false;
                otherRadioButton.focused = false;
            }
        });
    }
    updateTabIndexOfOtherRadioButtonsInGroup() {
        const radioButtons = this.queryButtons();
        const otherFocusableRadioButtons = radioButtons.filter((radioButton) => radioButton.guid !== this.guid && !radioButton.disabled);
        otherFocusableRadioButtons.forEach((radioButton) => {
            forceUpdate(radioButton);
        });
    }
    getTabIndex() {
        if (this.disabled) {
            return undefined;
        }
        return this.checked || this.isFocusable() ? 0 : -1;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    pointerEnterHandler() {
        if (this.disabled) {
            return;
        }
        this.hovered = true;
    }
    pointerLeaveHandler() {
        if (this.disabled) {
            return;
        }
        this.hovered = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.rootNode = this.el.getRootNode();
        this.guid = this.el.id || `calcite-radio-button-${guid()}`;
        if (this.name) {
            this.checkLastRadioButton();
        }
        connectInteractive(this);
        connectLabel(this);
        connectForm(this);
        this.updateTabIndexOfOtherRadioButtonsInGroup();
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        if (this.focused && !this.disabled) {
            this.setFocus();
        }
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLabel(this);
        disconnectForm(this);
        this.updateTabIndexOfOtherRadioButtonsInGroup();
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const tabIndex = this.getTabIndex();
        return (h(Host, { key: 'ba3eb165cc92980ff2dbc1ad92b96e05e67c7738', onClick: this.clickHandler, onKeyDown: this.handleKeyDown }, h(InteractiveContainer, { key: 'cc34b939f2d7461239102e360d862e7b770b4f51', disabled: this.disabled }, h("div", { key: '9fe5d157ecf61a7dfbb68b174c0a072cafa7fb93', "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: CSS.container, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, ref: this.setContainerEl, role: "radio", tabIndex: tabIndex }, h("div", { key: '82e64cb36cd384a2b05b6768c996cba67490db48', class: "radio" })), h(HiddenFormInputSlot, { key: 'aec9b59e49dbb867432a4fd006cf32db53306d1c', component: this }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hidden": ["handleHiddenChange"],
        "checked": ["checkedChanged"],
        "disabled": ["disabledChanged"],
        "name": ["nameChanged"]
    }; }
};
RadioButton.style = CalciteRadioButtonStyle0;

export { RadioButton as calcite_radio_button };
