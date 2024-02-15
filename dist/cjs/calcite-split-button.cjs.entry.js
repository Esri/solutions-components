/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const interactive = require('./interactive-3ab7044d.js');
const loadable = require('./loadable-5a794992.js');
require('./browser-d08a5f99.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    dividerContainer: "divider-container",
    divider: "divider",
    widthAuto: "width-auto",
    widthHalf: "width-half",
    widthFull: "width-full",
};

const splitButtonCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}:host:host([kind=brand]){--calcite-split-button-background:var(--calcite-color-brand);--calcite-split-button-divider:var(--calcite-color-foreground-1)}:host:host([kind=danger]){--calcite-split-button-background:var(--calcite-color-status-danger);--calcite-split-button-divider:var(--calcite-color-foreground-1)}:host:host([kind=neutral]){--calcite-split-button-background:var(--calcite-color-foreground-3);--calcite-split-button-divider:var(--calcite-color-text-1)}:host:host([kind=inverse]){--calcite-split-button-background:var(--calcite-color-inverse);--calcite-split-button-divider:var(--calcite-color-foreground-1)}:host([appearance=transparent]):host([kind=brand]){--calcite-split-button-divider:var(--calcite-color-brand);--calcite-split-button-background:transparent}:host([appearance=transparent]):host([kind=danger]){--calcite-split-button-divider:var(--calcite-color-status-danger);--calcite-split-button-background:transparent}:host([appearance=transparent]):host([kind=neutral]){--calcite-split-button-divider:var(--calcite-color-text-1);--calcite-split-button-background:transparent}:host([appearance=transparent]):host([kind=inverse]){--calcite-split-button-divider:var(--calcite-color-foreground-1);--calcite-split-button-background:transparent}:host([appearance=outline]){--calcite-split-button-background:transparent}:host([appearance=outline-fill]){--calcite-split-button-background:var(--calcite-color-foreground-1)}:host([appearance=outline]):host([kind=brand]),:host([appearance=outline-fill]):host([kind=brand]){--calcite-split-button-divider:var(--calcite-color-brand)}:host([appearance=outline]):host([kind=danger]),:host([appearance=outline-fill]):host([kind=danger]){--calcite-split-button-divider:var(--calcite-color-status-danger)}:host([appearance=outline]):host([kind=neutral]),:host([appearance=outline-fill]):host([kind=neutral]){--calcite-split-button-divider:var(--calcite-color-border-1);--calcite-split-button-background:var(--calcite-color-border-1)}:host([appearance=outline]):host([kind=inverse]),:host([appearance=outline-fill]):host([kind=inverse]){--calcite-split-button-divider:var(--calcite-color-inverse)}.container{display:flex;align-items:stretch}.container>calcite-dropdown>calcite-button{block-size:100%;vertical-align:top}.divider-container{display:flex;inline-size:1px;align-items:stretch;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;background-color:var(--calcite-split-button-background)}.divider{margin-block:0.25rem;display:inline-block;inline-size:1px;background-color:var(--calcite-split-button-divider)}:host([appearance=outline-fill]) .divider-container,:host([appearance=outline]) .divider-container{border-block:1px solid var(--calcite-split-button-divider)}:host([appearance=outline-fill]):hover .divider-container,:host([appearance=outline]):hover .divider-container{background-color:var(--calcite-split-button-divider)}:host([appearance=outline-fill]:hover) .divider-container,:host([appearance=outline]:hover) .divider-container{background-color:var(--calcite-split-button-divider)}:host([appearance=outline-fill]:focus-within):host([kind=brand]),:host([appearance=outline]:focus-within):host([kind=brand]){--calcite-split-button-divider:var(--calcite-color-brand-press)}:host([appearance=outline-fill]:focus-within):host([kind=danger]),:host([appearance=outline]:focus-within):host([kind=danger]){--calcite-split-button-divider:var(--calcite-color-status-danger-press)}:host([appearance=outline-fill]:focus-within) .divider-container,:host([appearance=outline]:focus-within) .divider-container{background-color:var(--calcite-split-button-divider)}:host([disabled]) .divider-container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

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
        this.loading = false;
        this.overlayPositioning = "absolute";
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
    connectedCallback() {
        interactive.connectInteractive(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
    }
    render() {
        const buttonWidth = this.width === "auto" ? "auto" : "full";
        return (index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("div", { class: CSS.container }, index.h("calcite-button", { appearance: this.appearance, disabled: this.disabled, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, iconFlipRtl: this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null, kind: this.kind, label: this.primaryLabel, loading: this.loading, onClick: this.calciteSplitButtonPrimaryClickHandler, scale: this.scale, splitChild: "primary", type: "button", width: buttonWidth }, this.primaryText), index.h("div", { class: CSS.dividerContainer }, index.h("div", { class: CSS.divider })), index.h("calcite-dropdown", { disabled: this.disabled, onClick: this.calciteSplitButtonSecondaryClickHandler, open: this.active, overlayPositioning: this.overlayPositioning, placement: "bottom-end", scale: this.scale, "width-scale": this.scale }, index.h("calcite-button", { appearance: this.appearance, disabled: this.disabled, "icon-start": this.dropdownIcon, kind: this.kind, label: this.dropdownLabel, scale: this.scale, slot: "trigger", splitChild: "secondary", type: "button" }), index.h("slot", null)))));
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
SplitButton.style = splitButtonCss;

exports.calcite_split_button = SplitButton;
