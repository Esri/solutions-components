/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './p-6eb37ed2.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './p-415cf05e.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-18f18ab3.js';
import './p-acaae81d.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
        registerInstance(this, hostRef);
        this.calciteSplitButtonPrimaryClick = createEvent(this, "calciteSplitButtonPrimaryClick", 6);
        this.calciteSplitButtonSecondaryClick = createEvent(this, "calciteSplitButtonSecondaryClick", 6);
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
        await componentFocusable(this);
        this.el.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
    }
    render() {
        const buttonWidth = this.width === "auto" ? "auto" : "full";
        return (h(InteractiveContainer, { key: 'ee973a15275bc3f95af17c40a4b8badbe3462d79', disabled: this.disabled }, h("div", { key: 'b2c812632a9ae8cd96060fcc6b22d052e957a9a7', class: CSS.container }, h("calcite-button", { key: '03a34e04ae9efa7811f1ac9d701fb230de7200a9', appearance: this.appearance, disabled: this.disabled, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, iconFlipRtl: this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null, kind: this.kind, label: this.primaryLabel, loading: this.loading, onClick: this.calciteSplitButtonPrimaryClickHandler, scale: this.scale, splitChild: "primary", type: "button", width: buttonWidth }, this.primaryText), h("div", { key: '1a1cfc004949b54b56cbc0f3076fb48e678ab314', class: CSS.dividerContainer }, h("div", { key: 'f38ecc61ec5712fe86924379347285977c285dc5', class: CSS.divider })), h("calcite-dropdown", { key: '719ccb5e274a7ccd04855daa1a39be9781fdcb76', disabled: this.disabled, flipPlacements: this.flipPlacements, onClick: this.calciteSplitButtonSecondaryClickHandler, open: this.active, overlayPositioning: this.overlayPositioning, placement: this.placement, scale: this.scale, "width-scale": this.scale }, h("calcite-button", { key: '098292b17056e7431adaadc843ecee4a9453bb7a', appearance: this.appearance, disabled: this.disabled, "icon-start": this.dropdownIcon, kind: this.kind, label: this.dropdownLabel, scale: this.scale, slot: "trigger", splitChild: "secondary", type: "button" }), h("slot", { key: 'cc73b47cb462df04f3572bb68565513f8abfa8a0' })))));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"],
        "active": ["activeHandler"]
    }; }
};
SplitButton.style = CalciteSplitButtonStyle0;

export { SplitButton as calcite_split_button };
