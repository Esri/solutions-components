/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as createObserver } from './observers.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    accordion: "accordion",
    transparent: "accordion--transparent",
};

const accordionCss = ":host{position:relative;display:block;max-inline-size:100%;line-height:1.5rem}.accordion{border-width:1px;border-block-end-width:0px;border-style:solid;border-color:var(--calcite-accordion-border-color, var(--calcite-color-border-2));background-color:var(--calcite-accordion-background-color, var(--calcite-color-foreground-1))}.accordion--transparent{--calcite-accordion-border-color:transparent;border-color:var(--calcite-color-transparent);background-color:var(--calcite-color-transparent)}:host([scale=s]){--calcite-internal-accordion-item-spacing-unit:0.25rem;--calcite-internal-accordion-icon-margin:0.5rem;--calcite-internal-accordion-item-padding:var(--calcite-internal-accordion-item-spacing-unit) 0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-accordion-item-spacing-unit:0.5rem;--calcite-internal-accordion-icon-margin:0.75rem;--calcite-internal-accordion-item-padding:var(--calcite-internal-accordion-item-spacing-unit) 0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-accordion-item-spacing-unit:0.75rem;--calcite-internal-accordion-icon-margin:1rem;--calcite-internal-accordion-item-padding:var(--calcite-internal-accordion-item-spacing-unit) 1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteAccordionStyle0 = accordionCss;

const Accordion = /*@__PURE__*/ proxyCustomElement(class Accordion extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalAccordionChange = createEvent(this, "calciteInternalAccordionChange", 6);
        this.mutationObserver = createObserver("mutation", () => this.updateAccordionItems());
        this.appearance = "solid";
        this.iconPosition = "end";
        this.iconType = "chevron";
        this.scale = "m";
        this.selectionMode = "multiple";
    }
    handlePropsChange() {
        this.updateAccordionItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.mutationObserver?.observe(this.el, { childList: true });
        this.updateAccordionItems();
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    render() {
        const transparent = this.appearance === "transparent";
        return (h("div", { key: '049a706314a7d7bc6336ce3586dc2d48384134fc', class: {
                [CSS.transparent]: transparent,
                [CSS.accordion]: !transparent,
            } }, h("slot", { key: '831dee904c4ff5258ac0194effe21ad5fa5d27ad' })));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        this.calciteInternalAccordionChange.emit({
            requestedAccordionItem: event.detail.requestedAccordionItem,
        });
        event.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    updateAccordionItems() {
        this.el.querySelectorAll("calcite-accordion-item").forEach((item) => {
            item.iconPosition = this.iconPosition;
            item.iconType = this.iconType;
            item.scale = this.scale;
        });
        // sync props on items across shadow DOM
        document.dispatchEvent(new CustomEvent("calciteInternalAccordionItemsSync"));
    }
    get el() { return this; }
    static get watchers() { return {
        "iconPosition": ["handlePropsChange"],
        "iconType": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "selectionMode": ["handlePropsChange"]
    }; }
    static get style() { return CalciteAccordionStyle0; }
}, [1, "calcite-accordion", {
        "appearance": [513],
        "iconPosition": [513, "icon-position"],
        "iconType": [513, "icon-type"],
        "scale": [513],
        "selectionMode": [513, "selection-mode"]
    }, [[0, "calciteInternalAccordionItemSelect", "updateActiveItemOnChange"]], {
        "iconPosition": ["handlePropsChange"],
        "iconType": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "selectionMode": ["handlePropsChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-accordion"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-accordion":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Accordion);
            }
            break;
    } });
}
defineCustomElement();

export { Accordion as A, defineCustomElement as d };
