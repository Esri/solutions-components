/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const interactive = require('./interactive-a128ac30.js');
const loadable = require('./loadable-1c888c87.js');
require('./browser-333a21c5.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    dividerContainer: "divider-container",
    divider: "divider",
    widthAuto: "width-auto",
    widthHalf: "width-half",
    widthFull: "width-full",
};

const splitButtonCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}:host([kind=brand]){--calcite-internal-split-button-background:var(--calcite-color-brand);--calcite-internal-split-button-divider:var(--calcite-color-foreground-1)}:host([kind=danger]){--calcite-internal-split-button-background:var(--calcite-color-status-danger);--calcite-internal-split-button-divider:var(--calcite-color-foreground-1)}:host([kind=neutral]){--calcite-internal-split-button-background:var(--calcite-color-foreground-3);--calcite-internal-split-button-divider:var(--calcite-color-text-1)}:host([kind=inverse]){--calcite-internal-split-button-background:var(--calcite-color-inverse);--calcite-internal-split-button-divider:var(--calcite-color-foreground-1)}:host([appearance=transparent]){--calcite-internal-split-button-background:transparent}:host([appearance=transparent]):host([kind=brand]){--calcite-internal-split-button-divider:var(--calcite-color-brand)}:host([appearance=transparent]):host([kind=danger]){--calcite-internal-split-button-divider:var(--calcite-color-status-danger)}:host([appearance=transparent]):host([kind=neutral]){--calcite-internal-split-button-divider:var(--calcite-color-text-1)}:host([appearance=transparent]):host([kind=inverse]){--calcite-internal-split-button-divider:var(--calcite-color-foreground-1)}:host([appearance=outline]):host([kind=brand]),:host([appearance=outline]):host([kind=danger]),:host([appearance=outline]):host([kind=neutral]),:host([appearance=outline]):host([kind=inverse]){--calcite-internal-split-button-background:transparent}:host([appearance=outline-fill]):host([kind=brand]),:host([appearance=outline-fill]):host([kind=danger]),:host([appearance=outline-fill]):host([kind=neutral]),:host([appearance=outline-fill]):host([kind=inverse]){--calcite-internal-split-button-background:var(--calcite-color-background)}:host([appearance=outline]):host([kind=brand]),:host([appearance=outline-fill]):host([kind=brand]){--calcite-internal-split-button-divider:var(--calcite-color-brand)}:host([appearance=outline]):host([kind=danger]),:host([appearance=outline-fill]):host([kind=danger]){--calcite-internal-split-button-divider:var(--calcite-color-status-danger)}:host([appearance=outline]):host([kind=neutral]),:host([appearance=outline-fill]):host([kind=neutral]){--calcite-internal-split-button-divider:var(--calcite-color-border-1)}:host([appearance=outline]):host([kind=inverse]),:host([appearance=outline-fill]):host([kind=inverse]){--calcite-internal-split-button-divider:var(--calcite-color-inverse)}.container{display:flex;align-items:stretch}.container>calcite-dropdown>calcite-button{block-size:100%;vertical-align:top}.divider-container{display:flex;inline-size:1px;align-items:stretch;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;background-color:var(--calcite-internal-split-button-background)}.divider{margin-block:0.25rem;display:inline-block;inline-size:1px;background-color:var(--calcite-internal-split-button-divider)}:host([appearance=outline-fill]) .divider-container,:host([appearance=outline]) .divider-container{border-block:1px solid var(--calcite-internal-split-button-divider)}:host([appearance=outline-fill]):hover .divider-container,:host([appearance=outline]):hover .divider-container{background-color:var(--calcite-internal-split-button-divider)}:host([appearance=outline-fill]:hover) .divider-container,:host([appearance=outline]:hover) .divider-container{background-color:var(--calcite-internal-split-button-divider)}:host([appearance=outline-fill]:focus-within):host([kind=brand]),:host([appearance=outline]:focus-within):host([kind=brand]){--calcite-internal-split-button-divider:var(--calcite-color-brand-press)}:host([appearance=outline-fill]:focus-within):host([kind=danger]),:host([appearance=outline]:focus-within):host([kind=danger]){--calcite-internal-split-button-divider:var(--calcite-color-status-danger-press)}:host([appearance=outline-fill]:focus-within) .divider-container,:host([appearance=outline]:focus-within) .divider-container{background-color:var(--calcite-internal-split-button-divider)}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}:host([disabled]):host([appearance=outline-fill]) .divider-container{background-color:var(--calcite-color-background)}:host([disabled]):host([appearance=outline]) .divider-container{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSplitButtonStyle0 = splitButtonCss;

const SplitButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteSplitButtonPrimaryClick = index.createEvent(this, "calciteSplitButtonPrimaryClick", 6);
        this.calciteSplitButtonSecondaryClick = index.createEvent(this, "calciteSplitButtonSecondaryClick", 6);
        this.calciteSplitButtonPrimaryClickHandler = () => this.calciteSplitButtonPrimaryClick.emit();
        this.calciteSplitButtonSecondaryClickHandler = () => this.calciteSplitButtonSecondaryClick.emit();
        this.appearance = "solid";
        this.kind = "brand";
        this.disabled = false;
        this.active = false;
        this.dropdownIconType = "chevron";
        this.dropdownLabel = undefined;
        this.flipPlacements = undefined;
        this.loading = false;
        this.overlayPositioning = "absolute";
        this.placement = "bottom-end";
        this.primaryIconEnd = undefined;
        this.primaryIconFlipRtl = undefined;
        this.primaryIconStart = undefined;
        this.primaryLabel = undefined;
        this.primaryText = undefined;
        this.scale = "m";
        this.width = "auto";
    }
    handleDisabledChange(value) {
        if (!value) {
            this.active = false;
        }
    }
    activeHandler() {
        if (this.disabled) {
            this.active = false;
        }
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
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        const buttonWidth = this.width === "auto" ? "auto" : "full";
        return (index.h(interactive.InteractiveContainer, { key: 'dacdf1583d8cb4551cb4882b8508c558d782b4d4', disabled: this.disabled }, index.h("div", { key: 'a61c78ee84cd89d78a7d2c9479917838ed410c16', class: CSS.container }, index.h("calcite-button", { key: 'f70e6b5aa7457c7d51093be9a0033c28134b7a1f', appearance: this.appearance, disabled: this.disabled, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, iconFlipRtl: this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null, kind: this.kind, label: this.primaryLabel, loading: this.loading, onClick: this.calciteSplitButtonPrimaryClickHandler, scale: this.scale, splitChild: "primary", type: "button", width: buttonWidth }, this.primaryText), index.h("div", { key: '6a666aff420b7aee2d413ac298a8cf7c743b63fe', class: CSS.dividerContainer }, index.h("div", { key: '34e4ea2b452fb53d5503d0cc03b8d8644e08f8a3', class: CSS.divider })), index.h("calcite-dropdown", { key: '44dfd708df7c0e961259ffca36e181306043e64f', disabled: this.disabled, flipPlacements: this.flipPlacements, onClick: this.calciteSplitButtonSecondaryClickHandler, open: this.active, overlayPositioning: this.overlayPositioning, placement: this.placement, scale: this.scale, "width-scale": this.scale }, index.h("calcite-button", { key: '4f746ce80d07518b03ae4602bd2417f369aacba3', appearance: this.appearance, disabled: this.disabled, "icon-start": this.dropdownIcon, kind: this.kind, label: this.dropdownLabel, scale: this.scale, slot: "trigger", splitChild: "secondary", type: "button" }), index.h("slot", { key: '80aa3fefc8d08c1a6e222a88f2e873cbcc209f1a' })))));
    }
    get dropdownIcon() {
        return this.dropdownIconType === "chevron"
            ? "chevronDown"
            : this.dropdownIconType === "caret"
                ? "caretDown"
                : this.dropdownIconType === "ellipsis"
                    ? "ellipsis"
                    : "handle-vertical";
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "active": ["activeHandler"]
    }; }
};
SplitButton.style = CalciteSplitButtonStyle0;

exports.calcite_split_button = SplitButton;
