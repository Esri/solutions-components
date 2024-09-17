/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { s as slotChangeHasAssignedElement, g as getSlotted, t as toAriaBoolean } from './p-68ec5c15.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { c as connectMessages, d as disconnectMessages, s as setUpMessages, u as updateMessages } from './p-1a9a47a0.js';
import { c as componentFocusable, a as setComponentLoaded, s as setUpLoadableComponent } from './p-18f18ab3.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './p-415cf05e.js';
import { i as isActivationKey } from './p-fe6f7734.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-c638d28e.js';
import './p-acaae81d.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    contentWrapper: "content-wrapper",
    header: "header",
    footer: "footer",
    heading: "heading",
    description: "description",
    checkboxWrapper: "checkbox-wrapper",
    checkboxWrapperDeprecated: "checkbox-wrapper-deprecated",
    thumbnailWrapper: "thumbnail-wrapper",
    headerTextContainer: "header-text-container",
    cardContent: "card-content",
    hasSlottedContent: "has-slotted-content",
};
const SLOTS = {
    thumbnail: "thumbnail",
    heading: "heading",
    description: "description",
    footerStart: "footer-start",
    footerEnd: "footer-end",
    title: "title",
    subtitle: "subtitle",
};
const ICONS = {
    selected: "check-square-f",
    unselected: "square",
    selectedSingle: "circle-f",
    unselectedSingle: "circle",
};

const cardCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;max-inline-size:100%;--calcite-card-corner-radius:var(--calcite-corner-radius-sharp);--calcite-card-background-color:var(--calcite-color-foreground-1);--calcite-card-border-color:var(--calcite-color-border-3);--calcite-card-shadow:var(--calcite-shadow-none);--calcite-card-accent-color-selected:var(--calcite-color-brand);--calcite-card-selection-background-color:transparent;--calcite-card-selection-background-color-hover:var(--calcite-color-transparent-hover);--calcite-card-selection-background-color-active:var(--calcite-color-transparent-press);--calcite-card-selection-background-color-selected:transparent;--calcite-card-selection-icon-color:var(--calcite-color-text-3);--calcite-card-selection-icon-color-hover:var(--calcite-color-text-2);--calcite-card-selection-icon-color-selected:var(--calcite-color-brand)}.content-wrapper{position:relative;display:flex;block-size:100%;flex-direction:column;justify-content:space-between;overflow:hidden;border:var(--calcite-border-width-sm) solid var(--calcite-card-border-color);border-radius:var(--calcite-card-corner-radius);background-color:var(--calcite-card-background-color);box-shadow:var(--calcite-card-shadow);pointer-events:none}::slotted(*){pointer-events:auto}:host(:not([selectable])) .content-wrapper:not(.non-interactive){outline-color:transparent}:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.container{position:relative;display:flex;flex:1 1 auto;flex-direction:column}:host([loading]) .content-wrapper *:not(calcite-loader):not(.calcite-card-loader-container){pointer-events:none;opacity:0}:host([loading]) .calcite-card-loader-container{position:absolute;inset:0px;display:flex;align-items:center}.header{display:flex;flex-direction:row;align-items:flex-start}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;justify-content:space-between;padding-inline:var(--calcite-spacing-md);padding-block-start:var(--calcite-spacing-xxs);padding-block-end:var(--calcite-spacing-md)}.header-text-container{display:flex;inline-size:100%;flex-direction:column;justify-content:center;padding-inline:0.75rem;padding-block:0.5rem}.header-text-container:not(:only-child){padding-inline-end:0.125rem}.footer{margin-block-start:auto;flex-direction:row;align-content:space-between;justify-content:space-between;padding-inline:0.75rem;padding-block:0.25rem 0.75rem}.card-content{block-size:auto;font-size:var(--calcite-font-size--2);line-height:1.375}.has-slotted-content{padding:0.75rem}:host([selected]) .content-wrapper{box-shadow:inset 0 -4px 0 0 var(--calcite-card-accent-color-selected)}:host([selectable]) .header{padding-inline-end:var(--calcite-spacing-xxxl)}slot[name=title]::slotted(*),*::slotted([slot=title]){margin:0px;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){margin:0px;margin-block-start:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}slot[name=heading]::slotted(*),*::slotted([slot=heading]){margin:0px;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}slot[name=description]::slotted(*),*::slotted([slot=description]){margin:0px;margin-block-start:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){min-inline-size:100%;max-inline-size:100%}slot[name=footer-start]::slotted(*),*::slotted([slot=footer-start]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375;margin-inline-end:auto}slot[name=footer-end]::slotted(*),*::slotted([slot=footer-end]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375}.checkbox-wrapper-deprecated{pointer-events:auto;position:absolute;inset-block-start:var(--calcite-spacing-sm);inset-inline-end:var(--calcite-spacing-sm);margin:0;padding:0}.checkbox-wrapper{pointer-events:auto;margin:0.5rem;cursor:pointer;padding:0.5rem;outline-color:transparent;background-color:var(--calcite-card-selection-background-color);display:flex;align-items:center;justify-items:center;--calcite-icon-color:var(--calcite-card-selection-icon-color)}.checkbox-wrapper:hover{background-color:var(--calcite-card-selection-background-color-hover);--calcite-icon-color:var(--calcite-card-selection-icon-color-hover)}.checkbox-wrapper:active{background-color:var(--calcite-card-selection-background-color-active)}.checkbox-wrapper calcite-icon{pointer-events:none}:host([selected]) .checkbox-wrapper{--calcite-icon-color:var(--calcite-card-selection-icon-color-selected);background-color:var(--calcite-card-selection-background-color-selected)}:host([selected]) .checkbox-wrapper:hover{background-color:var(--calcite-card-selection-background-color-hover)}:host([selected]) .checkbox-wrapper:active{background-color:var(--calcite-card-selection-background-color-active)}:host(:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper{background-color:var(--calcite-card-selection-background-color-hover);--calcite-icon-color:var(--calcite-card-selection-icon-color-hover)}:host([selected]:not([selectable])) .content-wrapper:not(.non-interactive):focus .checkbox-wrapper{background-color:var(--calcite-card-selection-background-color-active);--calcite-icon-color:var(--calcite-card-selection-icon-color-selected)}.thumbnail-wrapper{display:flex}.content-wrapper.inline{flex-direction:row}.content-wrapper.inline>.container{inline-size:60%}.content-wrapper.inline>.thumbnail-wrapper{inline-size:40%;align-items:flex-start}.content-wrapper.inline slot[name=thumbnail]::slotted(img),.content-wrapper.inline img::slotted([slot=thumbnail]){inline-size:100%}slot[name=footer-start]::slotted(*),slot[name=footer-end]::slotted(*){display:flex;gap:0.25rem}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteCardStyle0 = cardCss;

const Card = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteCardSelect = createEvent(this, "calciteCardSelect", 6);
        this.calciteInternalCardKeyEvent = createEvent(this, "calciteInternalCardKeyEvent", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.handleDefaultSlotChange = (event) => {
            this.hasContent = slotChangeHasAssignedElement(event);
        };
        this.keyDownHandler = (event) => {
            if (event.target === this.containerEl && !this.selectable && !this.disabled) {
                if (isActivationKey(event.key) && this.selectionMode !== "none") {
                    this.calciteCardSelect.emit();
                    event.preventDefault();
                }
                else {
                    switch (event.key) {
                        case "ArrowRight":
                        case "ArrowLeft":
                        case "Home":
                        case "End":
                            this.calciteInternalCardKeyEvent.emit(event);
                            event.preventDefault();
                            break;
                    }
                }
            }
        };
        this.cardBodyClickHandler = (event) => {
            const isFromScreenReader = event.target === this.containerEl;
            if (isFromScreenReader && !this.selectable && !this.disabled && this.selectionMode !== "none") {
                this.calciteCardSelect.emit();
            }
        };
        this.cardSelectKeyDownDeprecated = (event) => {
            switch (event.key) {
                case " ":
                case "Enter":
                    this.selectCardDeprecated();
                    event.preventDefault();
                    break;
            }
        };
        this.selectCardDeprecated = () => {
            this.selected = !this.selected;
            this.calciteCardSelect.emit();
        };
        this.cardSelectClick = (event) => {
            if (!this.disabled) {
                event.preventDefault();
                this.calciteCardSelect.emit();
                this.setFocus();
            }
        };
        this.loading = false;
        this.thumbnailPosition = "block-start";
        this.disabled = false;
        this.label = undefined;
        this.selectable = false;
        this.selected = false;
        this.messages = undefined;
        this.selectionMode = "none";
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
        this.hasContent = false;
    }
    onMessagesChange() {
        /* wired up by t9n util */
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
        connectLocalized(this);
        connectMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    renderCheckboxDeprecated() {
        return (h("calcite-label", { class: CSS.checkboxWrapperDeprecated }, h("calcite-checkbox", { checked: this.selected, label: this.messages.select, onClick: this.selectCardDeprecated, onKeyDown: this.cardSelectKeyDownDeprecated })));
    }
    renderThumbnail() {
        return getSlotted(this.el, SLOTS.thumbnail) ? (h("section", { class: CSS.thumbnailWrapper }, h("slot", { name: SLOTS.thumbnail }))) : null;
    }
    renderSelectionIcon() {
        const icon = this.selectionMode === "multiple" && this.selected
            ? ICONS.selected
            : this.selectionMode === "multiple"
                ? ICONS.unselected
                : this.selected
                    ? ICONS.selectedSingle
                    : ICONS.unselectedSingle;
        return (h("div", { class: CSS.checkboxWrapper, onPointerDown: this.cardSelectClick, tabIndex: -1 }, h("calcite-icon", { icon: icon, scale: "s" })));
    }
    renderHeader() {
        const { el } = this;
        const heading = getSlotted(el, SLOTS.heading);
        const description = getSlotted(el, SLOTS.description);
        const hasHeader = heading || description;
        const subtitle = getSlotted(el, SLOTS.subtitle);
        const title = getSlotted(el, SLOTS.title);
        const hasDeprecatedHeader = subtitle || title;
        return hasHeader || hasDeprecatedHeader ? (h("header", { class: CSS.header }, this.selectable ? this.renderCheckboxDeprecated() : null, h("div", { class: CSS.headerTextContainer }, h("slot", { key: "heading-slot", name: SLOTS.heading }), h("slot", { key: "description-slot", name: SLOTS.description }), h("slot", { key: "deprecated-title-slot", name: SLOTS.title }), h("slot", { key: "deprecated-subtitle-slot", name: SLOTS.subtitle })), this.selectionMode !== "none" && this.renderSelectionIcon())) : null;
    }
    renderFooter() {
        const { el } = this;
        const startFooter = getSlotted(el, SLOTS.footerStart);
        const endFooter = getSlotted(el, SLOTS.footerEnd);
        const hasFooter = startFooter || endFooter;
        return hasFooter ? (h("footer", { class: CSS.footer }, h("slot", { name: SLOTS.footerStart }), h("slot", { name: SLOTS.footerEnd }))) : null;
    }
    render() {
        const thumbnailInline = this.thumbnailPosition.startsWith("inline");
        const thumbnailStart = this.thumbnailPosition.endsWith("start");
        const role = this.selectionMode === "multiple"
            ? "checkbox"
            : this.selectionMode !== "none"
                ? "radio"
                : undefined;
        return (h(Host, { key: 'e33b76130cd91d3caa6662f1f58b79d238c708fb' }, h(InteractiveContainer, { key: '772da2a3a1274eb467d1febb915ffb97953beae7', disabled: this.disabled }, h("div", { key: 'b9fdbb51cfb07964479d0f723add39b8a2384f86', "aria-checked": this.selectionMode !== "none" ? toAriaBoolean(this.selected) : undefined, "aria-disabled": this.disabled, "aria-label": this.label, class: { [CSS.contentWrapper]: true, inline: thumbnailInline }, onClick: this.cardBodyClickHandler, onKeyDown: this.keyDownHandler, ref: (el) => (this.containerEl = el), role: role, tabIndex: !this.selectable || this.disabled ? 0 : -1 }, this.loading ? (h("div", { "aria-live": "polite", class: "calcite-card-loader-container" }, h("calcite-loader", { label: this.messages.loading }))) : null, thumbnailStart && this.renderThumbnail(), h("section", { key: '51cfe132a589ec65b39544b4c1246545b0b864f2', "aria-busy": toAriaBoolean(this.loading), class: { [CSS.container]: true } }, this.renderHeader(), h("div", { key: 'c256998e330a949d47a12b23127c68cba081854e', class: {
                [CSS.cardContent]: true,
                [CSS.hasSlottedContent]: this.hasContent,
            } }, h("slot", { key: '17fb9b0a9919f09a474d3c54818e770be9a85b77', onSlotchange: this.handleDefaultSlotChange })), this.renderFooter()), !thumbnailStart && this.renderThumbnail()))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Card.style = CalciteCardStyle0;

export { Card as calcite_card };
