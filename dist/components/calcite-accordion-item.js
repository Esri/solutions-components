/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted, g as getElementDir, t as toAriaBoolean, c as closestElementCrossShadowBoundary } from './dom.js';
import { C as CSS_UTILITY } from './resources.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$2 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const SLOTS = {
    actionsStart: "actions-start",
    actionsEnd: "actions-end",
};
const CSS = {
    icon: "icon",
    header: "header",
    headerContent: "header-content",
    actionsStart: "actions-start",
    actionsEnd: "actions-end",
    headerText: "header-text",
    heading: "heading",
    description: "description",
    expandIcon: "expand-icon",
    content: "content",
    iconStart: "icon--start",
    iconEnd: "icon--end",
    headerContainer: "header-container",
};
const IDS = {
    section: "section",
    sectionToggle: "section-toggle",
};

const accordionItemCss = ".icon-position--end,.icon-position--start{--calcite-accordion-item-icon-rotation:calc(90deg * -1);--calcite-accordion-item-active-icon-rotation:0deg;--calcite-accordion-item-icon-rotation-rtl:90deg;--calcite-accordion-item-active-icon-rotation-rtl:0deg}.icon-position--start{--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(--calcite-accordion-icon-margin)}.icon-position--end{--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-spacing-start:var(--calcite-accordion-icon-margin);--calcite-accordion-item-icon-spacing-end:0}.icon-position--end:not(.icon-type--plus-minus){--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:calc(180deg * -1)}:host{position:relative;display:flex;flex-direction:column;color:var(--calcite-color-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;background-color:var(--calcite-accordion-item-background, var(--calcite-color-foreground-1))}:host .header-content{outline-color:transparent}:host(:focus) .header-content{outline:2px solid transparent;outline-offset:2px;outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([expanded]){color:var(--calcite-color-text-1)}:host([expanded]) .content{display:block;color:var(--calcite-color-text-1)}:host([expanded]) .header{border-block-end-color:transparent}:host .header{display:flex;align-items:stretch}:host .icon{position:relative;margin:0px;display:inline-flex;color:var(--calcite-color-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline-end:var(--calcite-accordion-item-icon-spacing-start);margin-inline-start:var(--calcite-accordion-item-icon-spacing-end)}.icon--start{display:flex;align-items:center;margin-inline-end:var(--calcite-accordion-icon-margin)}.icon--end{display:flex;align-items:center;margin-inline-end:var(--calcite-accordion-icon-margin);margin-inline-start:var(--calcite-accordion-icon-margin)}.header-container{inline-size:100%}.content{padding:var(--calcite-accordion-item-padding)}:host .content,:host .header{border-block-end:1px solid var(--calcite-accordion-item-border, var(--calcite-color-border-2))}:host .header *{display:inline-flex;align-items:center;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);word-wrap:break-word;word-break:break-word}:host .content{display:none;padding-block-start:0px;color:var(--calcite-color-text-3);text-align:initial}:host .expand-icon{color:var(--calcite-color-text-3);margin-inline-start:var(--calcite-accordion-item-icon-spacing-start);margin-inline-end:var(--calcite-accordion-item-icon-spacing-end);transform:rotate(var(--calcite-accordion-item-icon-rotation))}.calcite--rtl .expand-icon{transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([expanded]) .expand-icon{color:var(--calcite-color-text-3);transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([expanded]) .calcite--rtl .expand-icon{transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}:host .header-text{margin-block:0px;flex-grow:1;flex-direction:column;padding-block:0px;text-align:initial;margin-inline-end:auto}:host .heading,:host .description{display:flex;inline-size:100%}:host .heading{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}:host .description{margin-block-start:0.25rem;color:var(--calcite-color-text-3)}:host(:focus) .heading,:host(:hover) .heading{color:var(--calcite-color-text-1)}:host(:focus) .icon,:host(:hover) .icon{color:var(--calcite-color-text-1)}:host(:focus) .expand-icon,:host(:hover) .expand-icon{color:var(--calcite-color-text-1)}:host(:focus) .description,:host(:hover) .description{color:var(--calcite-color-text-2)}:host(:focus) .heading,:host(:active) .heading,:host([expanded]) .heading{color:var(--calcite-color-text-1)}:host(:focus) .icon,:host(:active) .icon,:host([expanded]) .icon{color:var(--calcite-color-text-1)}:host(:focus) .description,:host(:active) .description,:host([expanded]) .description{color:var(--calcite-color-text-2)}.header-content{flex-grow:1;cursor:pointer;padding:var(--calcite-accordion-item-padding);flex-direction:var(--calcite-accordion-item-flex-direction)}.actions-start,.actions-end{display:flex;align-items:center}@media (forced-colors: active){:host([expanded]) .header{border-block-end:none}:host([expanded]) .heading{font-weight:bolder}:host(:hover) .heading,:host(:focus) .heading{text-decoration:underline}}:host([hidden]){display:none}[hidden]{display:none}";

const AccordionItem = /*@__PURE__*/ proxyCustomElement(class AccordionItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalAccordionItemSelect = createEvent(this, "calciteInternalAccordionItemSelect", 6);
        this.calciteInternalAccordionItemClose = createEvent(this, "calciteInternalAccordionItemClose", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        /** handle clicks on item header */
        this.itemHeaderClickHandler = () => this.emitRequestedItem();
        this.expanded = false;
        this.heading = undefined;
        this.description = undefined;
        this.iconStart = undefined;
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconPosition = undefined;
        this.iconType = undefined;
        this.accordionParent = undefined;
        this.scale = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderActionsStart() {
        const { el } = this;
        return getSlotted(el, SLOTS.actionsStart) ? (h("div", { class: CSS.actionsStart }, h("slot", { name: SLOTS.actionsStart }))) : null;
    }
    renderActionsEnd() {
        const { el } = this;
        return getSlotted(el, SLOTS.actionsEnd) ? (h("div", { class: CSS.actionsEnd }, h("slot", { name: SLOTS.actionsEnd }))) : null;
    }
    render() {
        const { iconFlipRtl } = this;
        const dir = getElementDir(this.el);
        const iconStartEl = this.iconStart ? (h("calcite-icon", { class: CSS.iconStart, flipRtl: iconFlipRtl === "both" || iconFlipRtl === "start", icon: this.iconStart, key: "icon-start", scale: getIconScale(this.scale) })) : null;
        const iconEndEl = this.iconEnd ? (h("calcite-icon", { class: CSS.iconEnd, flipRtl: iconFlipRtl === "both" || iconFlipRtl === "end", icon: this.iconEnd, key: "icon-end", scale: getIconScale(this.scale) })) : null;
        const { description } = this;
        return (h(Host, null, h("div", { class: {
                [`icon-position--${this.iconPosition}`]: true,
                [`icon-type--${this.iconType}`]: true,
            } }, h("div", { class: { [CSS.header]: true, [CSS_UTILITY.rtl]: dir === "rtl" } }, this.renderActionsStart(), h("div", { "aria-controls": IDS.section, "aria-expanded": toAriaBoolean(this.expanded), class: CSS.headerContent, id: IDS.sectionToggle, onClick: this.itemHeaderClickHandler, role: "button", tabindex: "0" }, h("div", { class: CSS.headerContainer }, iconStartEl, h("div", { class: CSS.headerText }, h("span", { class: CSS.heading }, this.heading), description ? h("span", { class: CSS.description }, description) : null), iconEndEl), h("calcite-icon", { class: CSS.expandIcon, icon: this.iconType === "chevron"
                ? "chevronDown"
                : this.iconType === "caret"
                    ? "caretDown"
                    : this.expanded
                        ? "minus"
                        : "plus", scale: getIconScale(this.scale) })), this.renderActionsEnd()), h("section", { "aria-labelledby": IDS.sectionToggle, class: CSS.content, id: IDS.section }, h("slot", null)))));
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
                    this.emitRequestedItem();
                    event.preventDefault();
                    break;
            }
        }
    }
    updateActiveItemOnChange(event) {
        const [accordion] = event.composedPath();
        const parent = closestElementCrossShadowBoundary(this.el, "calcite-accordion");
        if (accordion !== parent) {
            return;
        }
        this.determineActiveItem(parent.selectionMode, event.detail.requestedAccordionItem);
        event.stopPropagation();
    }
    accordionItemSyncHandler(event) {
        const [accordion] = event.composedPath();
        const accordionItem = this.el;
        // we sync with our accordion parent via event only if the item is wrapped within another component's shadow DOM,
        // otherwise, the accordion parent will sync the item directly
        const willBeSyncedByDirectParent = accordionItem.parentElement === accordion;
        if (willBeSyncedByDirectParent) {
            return;
        }
        const closestAccordionParent = closestElementCrossShadowBoundary(accordionItem, "calcite-accordion");
        if (accordion !== closestAccordionParent) {
            return;
        }
        accordionItem.iconPosition = closestAccordionParent.iconPosition;
        accordionItem.iconType = closestAccordionParent.iconType;
        accordionItem.scale = closestAccordionParent.scale;
        event.stopPropagation();
    }
    determineActiveItem(selectionMode, requestedItem) {
        switch (selectionMode) {
            case "multiple":
                if (this.el === requestedItem) {
                    this.expanded = !this.expanded;
                }
                break;
            case "single":
                this.expanded = this.el === requestedItem ? !this.expanded : false;
                break;
            case "single-persist":
                this.expanded = this.el === requestedItem;
                break;
        }
    }
    emitRequestedItem() {
        this.calciteInternalAccordionItemSelect.emit({
            requestedAccordionItem: this.el,
        });
    }
    get el() { return this; }
    static get style() { return accordionItemCss; }
}, [1, "calcite-accordion-item", {
        "expanded": [1540],
        "heading": [1],
        "description": [1],
        "iconStart": [513, "icon-start"],
        "iconEnd": [513, "icon-end"],
        "iconFlipRtl": [513, "icon-flip-rtl"],
        "iconPosition": [1, "icon-position"],
        "iconType": [1, "icon-type"],
        "accordionParent": [16],
        "scale": [1]
    }, [[0, "keydown", "keyDownHandler"], [16, "calciteInternalAccordionChange", "updateActiveItemOnChange"], [4, "calciteInternalAccordionItemsSync", "accordionItemSyncHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-accordion-item", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-accordion-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, AccordionItem);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteAccordionItem = AccordionItem;
const defineCustomElement = defineCustomElement$1;

export { CalciteAccordionItem, defineCustomElement };
