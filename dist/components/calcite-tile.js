/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { j as slotChangeHasAssignedElement, t as toAriaBoolean } from './dom.js';
import { c as componentFocusable, a as setComponentLoaded, s as setUpLoadableComponent } from './loadable.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './link.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    contentContainer: "content-container",
    contentContainerHasContent: "content-container--has-content",
    contentContainerHasOnlyContentTopAndBottom: "content-container--has-only-content-top-and-bottom",
    textContentContainer: "text-content-container",
    description: "description",
    heading: "heading",
    icon: "icon",
    interactive: "interactive",
    largeVisualDeprecated: "large-visual-deprecated",
    row: "row",
    selected: "selected",
    selectionIcon: "selection-icon",
    textContent: "text-content",
};
const ICONS = {
    selectedMultiple: "check-square-f",
    selectedSingle: "circle-f",
    unselectedMultiple: "square",
    unselectedSingle: "circle",
};
const SLOTS = {
    contentBottom: "content-bottom",
    contentEnd: "content-end",
    contentStart: "content-start",
    contentTop: "content-top",
};

const tileCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-tile-background-color:var(--calcite-color-foreground-1);--calcite-tile-border-color:var(--calcite-color-border-2);--calcite-tile-description-text-color:var(--calcite-color-text-3);--calcite-tile-heading-text-color:var(--calcite-color-text-2);--calcite-icon-color:var(--calcite-color-text-3);box-sizing:border-box;display:inline-block}.container{background-color:var(--calcite-tile-background-color);block-size:var(--calcite-container-size-content-fluid);box-sizing:border-box;inline-size:var(--calcite-container-size-content-fluid);outline:var(--calcite-border-width-sm, 1px) solid var(--calcite-tile-border-color);-webkit-user-select:none;-moz-user-select:none;user-select:none}.container.interactive{cursor:pointer}.container.interactive:hover,.container.interactive:focus,.container.interactive.selected{outline-color:var(--calcite-color-brand);position:relative}.container.interactive:hover .selection-icon,.container.interactive:focus .selection-icon,.container.interactive.selected .selection-icon{--calcite-icon-color:var(--calcite-color-brand)}.container.interactive.selected{z-index:var(--calcite-z-index)}.container.interactive:focus{box-shadow:inset 0 0 0 1px var(--calcite-color-brand);z-index:var(--calcite-z-index-sticky)}.content-container,.row{align-items:flex-start;display:flex}.content-container{flex-direction:column}.text-content-container{inline-size:100%;outline-color:transparent;padding:0}.text-content{display:flex;flex-direction:column}.heading{color:var(--calcite-tile-heading-text-color);font-weight:var(--calcite-font-weight-medium);line-height:1.20313rem;overflow-wrap:break-word}.large-visual-deprecated{align-items:center;justify-content:center;min-block-size:12rem;text-align:center}.large-visual-deprecated calcite-icon{align-self:center;block-size:64px;inline-size:64px}.large-visual-deprecated .text-content-container{justify-content:center}.description{color:var(--calcite-tile-description-text-color);font-weight:var(--calcite-font-weight-regular);overflow-wrap:break-word}:host([alignment=center]) .icon{align-self:center}:host([alignment=center]) .text-content-container{justify-content:center}:host([alignment=center]) .text-content{text-align:center}:host([alignment=center]) slot[name=content-start]::slotted(*),:host([alignment=center]) slot[name=content-end]::slotted(*),:host([alignment=center]) slot[name=content-top]::slotted(*),:host([alignment=center]) slot[name=content-bottom]::slotted(*){align-self:center}:host([scale=s]){max-inline-size:400px;min-inline-size:100px}:host([scale=s]) .container{padding:var(--calcite-spacing-sm)}:host([scale=s]) .content-container--has-content,:host([scale=s]) .row{gap:var(--calcite-spacing-sm)}:host([scale=s]) .heading{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=s]) .description{font-size:var(--calcite-font-size--3);line-height:0.85938rem}:host([scale=s]) .content-container--has-only-content-top-and-bottom slot[name=content-top]::slotted(*){margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]){max-inline-size:460px;min-inline-size:140px}:host([scale=m]) .container{padding:var(--calcite-spacing-md)}:host([scale=m]) .content-container--has-content,:host([scale=m]) .row{gap:var(--calcite-spacing-md)}:host([scale=m]) .heading{font-size:var(--calcite-font-size--1);line-height:1.20313rem}:host([scale=m]) .description{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=m]) .content-container--has-only-content-top-and-bottom slot[name=content-top]::slotted(*){margin-block-end:var(--calcite-spacing-md)}:host([scale=l]){max-inline-size:520px;min-inline-size:160px}:host([scale=l]) .container{padding:var(--calcite-spacing-xl)}:host([scale=l]) .content-container--has-content,:host([scale=l]) .row{gap:var(--calcite-spacing-xl)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-0);line-height:1.375rem}:host([scale=l]) .description{font-size:var(--calcite-font-size--1);line-height:1.20313rem}:host([scale=l]) .content-container--has-only-content-top-and-bottom slot[name=content-top]::slotted(*){margin-block-end:var(--calcite-spacing-xl)}:host([selection-appearance=border][layout=horizontal]) .container.selected:focus::before,:host([selection-appearance=border][layout=vertical]) .container.selected:focus::before{block-size:100%;box-shadow:inset 0 0 0 1px var(--calcite-color-brand);content:\"\";display:block;inline-size:100%;inset-block-start:0;inset-inline-start:0;position:absolute}:host([selection-appearance=border][layout=horizontal]) .container.selected{box-shadow:inset 0 -4px 0 0 var(--calcite-color-brand)}:host([selection-appearance=border][layout=vertical]) .container.selected{box-shadow:inset 4px 0 0 0 var(--calcite-color-brand)}:host([href]:focus:not([disabled])),:host([href]:hover:not([disabled])){--calcite-tile-border-color:var(--calcite-color-text-link);--calcite-tile-heading-text-color:var(--calcite-color-text-link);--calcite-icon-color:var(--calcite-color-text-link)}:host([href]:focus:not([disabled])) .container,:host([href]:hover:not([disabled])) .container{position:relative;z-index:var(--calcite-z-index)}:host([href]:active:not([disabled])) .container{box-shadow:0 0 0 3px var(--calcite-tile-border-color)}:host([embed]) .container{box-shadow:none;padding:0}:host([selection-mode=none]) .container{outline-color:var(--calcite-tile-border-color)}:host([selection-mode=none]) .container:focus{outline-color:var(--calcite-color-brand);position:relative}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host(:hover:not([disabled])),:host([active]:not([disabled])){--calcite-tile-description-text-color:var(--calcite-color-text-2);--calcite-tile-heading-text-color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}::slotted(*){max-inline-size:100%}";
const CalciteTileStyle0 = tileCss;

const Tile = /*@__PURE__*/ proxyCustomElement(class Tile extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalTileKeyEvent = createEvent(this, "calciteInternalTileKeyEvent", 6);
        this.calciteTileSelect = createEvent(this, "calciteTileSelect", 7);
        this.clickHandler = () => {
            if (this.interactive) {
                this.setFocus();
                this.handleSelectEvent();
            }
        };
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleSelectEvent = () => {
            if (this.disabled ||
                !this.interactive ||
                (this.selectionMode === "single-persist" && this.selected === true)) {
                return;
            }
            this.calciteTileSelect.emit();
        };
        this.handleSlotChange = (event) => {
            const slotName = event.target.dataset.name;
            this[`has${slotName}`] = slotChangeHasAssignedElement(event);
        };
        this.setContainerEl = (el) => {
            this.containerEl = el;
        };
        this.active = false;
        this.alignment = "start";
        this.description = undefined;
        this.disabled = false;
        this.embed = false;
        this.heading = undefined;
        this.href = undefined;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.interactive = false;
        this.label = undefined;
        this.layout = "horizontal";
        this.scale = "m";
        this.selected = false;
        this.selectionAppearance = "icon";
        this.selectionMode = "none";
        this.hasContentBottom = false;
        this.hasContentEnd = false;
        this.hasContentStart = false;
        this.hasContentTop = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        if (!this.disabled && this.interactive) {
            this.containerEl?.focus();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(event) {
        if (event.target === this.el) {
            switch (event.key) {
                case " ":
                case "Enter":
                    this.handleSelectEvent();
                    event.preventDefault();
                    break;
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                case "ArrowUp":
                case "Home":
                case "End":
                    this.calciteInternalTileKeyEvent.emit(event);
                    event.preventDefault();
                    break;
            }
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderSelectionIcon() {
        const { selected, selectionAppearance, selectionMode } = this;
        if (selectionAppearance === "icon" && selectionMode !== "none") {
            return (h("calcite-icon", { class: CSS.selectionIcon, icon: selected
                    ? selectionMode === "multiple"
                        ? ICONS.selectedMultiple
                        : ICONS.selectedSingle
                    : selectionMode === "multiple"
                        ? ICONS.unselectedMultiple
                        : ICONS.unselectedSingle, scale: "s" }));
        }
        return;
    }
    renderTile() {
        const { description, disabled, hasContentBottom, hasContentEnd, hasContentStart, hasContentTop, heading, icon, iconFlipRtl, interactive, selectionMode, } = this;
        const isLargeVisual = heading && icon && !description;
        const disableInteraction = Boolean(this.href) || !interactive;
        const role = selectionMode === "multiple" && interactive
            ? "checkbox"
            : selectionMode !== "none" && interactive
                ? "radio"
                : interactive
                    ? "button"
                    : undefined;
        const hasContent = !!(description || hasContentEnd || hasContentStart || heading || icon);
        const hasOnlyContentTopAndBottom = !hasContent && hasContentTop && hasContentBottom;
        return (h("div", { "aria-checked": selectionMode !== "none" && interactive ? toAriaBoolean(this.selected) : undefined, "aria-disabled": disableInteraction ? toAriaBoolean(disabled) : undefined, "aria-label": role && this.label, class: {
                [CSS.container]: true,
                [CSS.interactive]: interactive,
                // [Deprecated] Use the content-top slot for rendering icon with alignment="center" instead
                [CSS.largeVisualDeprecated]: isLargeVisual,
                [CSS.row]: true,
                [CSS.selected]: this.selected,
            }, onClick: this.clickHandler, ref: this.setContainerEl, role: role, tabIndex: disableInteraction ? undefined : 0 }, this.renderSelectionIcon(), h("div", { class: {
                [CSS.contentContainer]: true,
                [CSS.contentContainerHasContent]: hasContent,
                [CSS.contentContainerHasOnlyContentTopAndBottom]: hasOnlyContentTopAndBottom,
            } }, h("slot", { "data-name": "ContentTop", name: SLOTS.contentTop, onSlotchange: this.handleSlotChange }), icon && h("calcite-icon", { class: CSS.icon, flipRtl: iconFlipRtl, icon: icon, scale: "l" }), h("div", { class: { [CSS.textContentContainer]: true, [CSS.row]: true } }, h("slot", { "data-name": "ContentStart", name: SLOTS.contentStart, onSlotchange: this.handleSlotChange }), h("div", { class: CSS.textContent }, heading && h("div", { class: CSS.heading }, heading), description && h("div", { class: CSS.description }, description)), h("slot", { "data-name": "ContentEnd", name: SLOTS.contentEnd, onSlotchange: this.handleSlotChange })), h("slot", { "data-name": "ContentBottom", name: SLOTS.contentBottom, onSlotchange: this.handleSlotChange }))));
    }
    render() {
        const { disabled } = this;
        return (h(InteractiveContainer, { key: 'f865a9a77fa149a492adf4ccb7d620928ad1991e', disabled: disabled }, this.href ? (h("calcite-link", { disabled: disabled, href: this.href }, this.renderTile())) : (this.renderTile())));
    }
    get el() { return this; }
    static get style() { return CalciteTileStyle0; }
}, [1, "calcite-tile", {
        "active": [516],
        "alignment": [513],
        "description": [513],
        "disabled": [516],
        "embed": [516],
        "heading": [513],
        "href": [513],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "interactive": [4],
        "label": [1],
        "layout": [513],
        "scale": [513],
        "selected": [516],
        "selectionAppearance": [513, "selection-appearance"],
        "selectionMode": [513, "selection-mode"],
        "hasContentBottom": [32],
        "hasContentEnd": [32],
        "hasContentStart": [32],
        "hasContentTop": [32],
        "setFocus": [64]
    }, [[0, "keydown", "keyDownHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tile", "calcite-icon", "calcite-link"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tile":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Tile);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTile = Tile;
const defineCustomElement = defineCustomElement$1;

export { CalciteTile, defineCustomElement };
