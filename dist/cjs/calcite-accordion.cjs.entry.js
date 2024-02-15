/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const observers = require('./observers-db4527e4.js');

const accordionCss = ":host([scale=s]){--calcite-accordion-item-spacing-unit:0.25rem;--calcite-accordion-icon-margin:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-icon-margin:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-icon-margin:1rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host{position:relative;display:block;max-inline-size:100%;line-height:1.5rem;--calcite-accordion-item-border:var(--calcite-color-border-2);--calcite-accordion-item-background:var(--calcite-color-foreground-1)}.accordion--transparent{--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}.accordion{border-width:1px;border-block-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-2)}:host([hidden]){display:none}[hidden]{display:none}";

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
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
        this.updateAccordionItems();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    render() {
        const transparent = this.appearance === "transparent";
        return (index.h("div", { class: {
                "accordion--transparent": transparent,
                accordion: !transparent,
            } }, index.h("slot", null)));
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
Accordion.style = accordionCss;

exports.calcite_accordion = Accordion;
