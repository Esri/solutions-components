/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const array = require('./array-286e5a3b.js');
const dom = require('./dom-795d4a33.js');
const form = require('./form-6dd8050a.js');
const guid = require('./guid-e84a8375.js');
const interactive = require('./interactive-a128ac30.js');
const label = require('./label-726fc287.js');
const loadable = require('./loadable-1c888c87.js');
require('./resources-18f799c7.js');
require('./component-5d190962.js');
require('./browser-333a21c5.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
};

const radioButtonCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;cursor:pointer}:host .container{position:relative;outline:2px solid transparent;outline-offset:2px}:host .radio{cursor:pointer;border-radius:9999px;background-color:var(--calcite-color-foreground-1);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;box-shadow:inset 0 0 0 1px var(--calcite-color-border-input)}:host([hovered]) .radio,:host(:not([checked])[focused]:not([disabled])) .radio{box-shadow:inset 0 0 0 2px var(--calcite-color-brand)}:host([focused]) .radio{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 1px var(--calcite-color-border-input)}:host([scale=s]){--calcite-radio-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-radio-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-radio-size:var(--calcite-font-size-0)}.radio{block-size:var(--calcite-radio-size);max-inline-size:var(--calcite-radio-size);min-inline-size:var(--calcite-radio-size)}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-color-brand)}:host([scale=s][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 4px var(--calcite-color-brand), 0 0 0 2px var(--calcite-color-foreground-1)}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-color-brand)}:host([scale=m][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 5px var(--calcite-color-brand), 0 0 0 2px var(--calcite-color-foreground-1)}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-color-brand)}:host([scale=l][focused][checked]:not([disabled])) .radio{box-shadow:inset 0 0 0 6px var(--calcite-color-brand), 0 0 0 2px var(--calcite-color-foreground-1)}@media (forced-colors: active){:host([checked]) .radio::after,:host([checked][disabled]) .radio::after{content:\"\";inline-size:var(--calcite-radio-size);block-size:var(--calcite-radio-size);background-color:windowText;display:block}}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteRadioButtonStyle0 = radioButtonCss;

const RadioButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalRadioButtonBlur = index.createEvent(this, "calciteInternalRadioButtonBlur", 6);
        this.calciteRadioButtonChange = index.createEvent(this, "calciteRadioButtonChange", 6);
        this.calciteInternalRadioButtonCheckedChange = index.createEvent(this, "calciteInternalRadioButtonCheckedChange", 6);
        this.calciteInternalRadioButtonFocus = index.createEvent(this, "calciteInternalRadioButtonFocus", 6);
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
            if (dom.getElementDir(el) === "rtl") {
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
                    this.selectItem(radioButtons, array.getRoundRobinIndex(Math.max(currentIndex - 1, -1), radioButtonsLength));
                    return;
                case "ArrowRight":
                case "ArrowDown":
                    event.preventDefault();
                    this.selectItem(radioButtons, array.getRoundRobinIndex(currentIndex + 1, radioButtonsLength));
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
        await loadable.componentFocusable(this);
        if (!this.disabled) {
            dom.focusElement(this.containerEl);
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
            index.forceUpdate(radioButton);
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
        this.guid = this.el.id || `calcite-radio-button-${guid.guid()}`;
        if (this.name) {
            this.checkLastRadioButton();
        }
        label.connectLabel(this);
        form.connectForm(this);
        this.updateTabIndexOfOtherRadioButtonsInGroup();
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        if (this.focused && !this.disabled) {
            this.setFocus();
        }
    }
    disconnectedCallback() {
        label.disconnectLabel(this);
        form.disconnectForm(this);
        this.updateTabIndexOfOtherRadioButtonsInGroup();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const tabIndex = this.getTabIndex();
        return (index.h(index.Host, { key: '45fcb686faaafd7fa14c61ae37c7e56394a2f75d', onClick: this.clickHandler, onKeyDown: this.handleKeyDown }, index.h(interactive.InteractiveContainer, { key: '3172c8e34562872615f7ff91f3cef82042b14c32', disabled: this.disabled }, index.h("div", { key: 'c33c5c4c5bdd1a8fdd821491bf9bf179e19eeef5', "aria-checked": dom.toAriaBoolean(this.checked), "aria-label": label.getLabelText(this), class: CSS.container, onBlur: this.onContainerBlur, onFocus: this.onContainerFocus, ref: this.setContainerEl, role: "radio", tabIndex: tabIndex }, index.h("div", { key: '88bc96d9b946384bf96aefa2dcdf5f6ca39ae7a2', class: "radio" })), index.h(form.HiddenFormInputSlot, { key: '0851a97b89e6f09ae9634c6417a9950ea3ba1ef6', component: this }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "hidden": ["handleHiddenChange"],
        "checked": ["checkedChanged"],
        "disabled": ["disabledChanged"],
        "name": ["nameChanged"]
    }; }
};
RadioButton.style = CalciteRadioButtonStyle0;

exports.calcite_radio_button = RadioButton;
