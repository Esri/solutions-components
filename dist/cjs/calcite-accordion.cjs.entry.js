/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const observers = require('./observers-8fed90f3.js');
require('./browser-69696af0.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    accordion: "accordion",
    transparent: "accordion--transparent",
};

const accordionCss = ":host{position:relative;display:block;max-inline-size:100%;line-height:1.5rem}.accordion{border-width:1px;border-block-end-width:0px;border-style:solid;border-color:var(--calcite-accordion-border-color, var(--calcite-color-border-2));background-color:var(--calcite-accordion-background-color, var(--calcite-color-foreground-1))}.accordion--transparent{--calcite-accordion-border-color:transparent;border-color:var(--calcite-color-transparent);background-color:var(--calcite-color-transparent)}:host([scale=s]){--calcite-internal-accordion-item-spacing-unit:0.25rem;--calcite-internal-accordion-icon-margin:0.5rem;--calcite-internal-accordion-item-padding:var(--calcite-internal-accordion-item-spacing-unit) 0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-accordion-item-spacing-unit:0.5rem;--calcite-internal-accordion-icon-margin:0.75rem;--calcite-internal-accordion-item-padding:var(--calcite-internal-accordion-item-spacing-unit) 0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-accordion-item-spacing-unit:0.75rem;--calcite-internal-accordion-icon-margin:1rem;--calcite-internal-accordion-item-padding:var(--calcite-internal-accordion-item-spacing-unit) 1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteAccordionStyle0 = accordionCss;

const Accordion = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalAccordionChange = index.createEvent(this, "calciteInternalAccordionChange", 6);
        this.mutationObserver = observers.createObserver("mutation", () => this.updateAccordionItems());
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
        return (index.h("div", { key: '1399ab312fad432bde78fdedd0435848b53109ef', class: {
                [CSS.transparent]: transparent,
                [CSS.accordion]: !transparent,
            } }, index.h("slot", { key: '3ab7863d23eabb6c5ce499de42dab74df885ccdd' })));
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "iconPosition": ["handlePropsChange"],
        "iconType": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "selectionMode": ["handlePropsChange"]
    }; }
};
Accordion.style = CalciteAccordionStyle0;

exports.calcite_accordion = Accordion;
