/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-60e775f3.js';
import { g as getSlotted, a as getElementDir, t as toAriaBoolean, c as closestElementCrossShadowBoundary } from './dom-b5c50286.js';
import { C as CSS_UTILITY } from './resources-defbb49f.js';
import { g as getIconScale } from './component-c2c32481.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-73f289b6.js';
import './observers-e2484555.js';
import './browser-552eb2d0.js';
import './guid-4c746a7f.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const SLOTS = {
    actionsStart: "actions-start",
    actionsEnd: "actions-end",
};
const CSS = {
    actionsEnd: "actions-end",
    actionsStart: "actions-start",
    content: "content",
    description: "description",
    expandIcon: "expand-icon",
    header: "header",
    headerContainer: "header-container",
    headerContent: "header-content",
    headerText: "header-text",
    heading: "heading",
    icon: "icon",
    iconEnd: "icon--end",
    iconStart: "icon--start",
};
const IDS = {
    section: "section",
    sectionToggle: "section-toggle",
};

const accordionItemCss = ".icon-position--end,.icon-position--start{--calcite-internal-accordion-item-icon-rotation:calc(90deg * -1);--calcite-internal-accordion-item-active-icon-rotation:0deg;--calcite-internal-accordion-item-icon-rotation-rtl:90deg;--calcite-internal-accordion-item-active-icon-rotation-rtl:0deg}:host{position:relative;display:flex;flex-direction:column;text-decoration-line:none;color:var(--calcite-accordion-text-color, var(--calcite-color-text-3));border-width:0}.icon-position--start{--calcite-internal-accordion-item-flex-direction:row-reverse;--calcite-internal-accordion-item-icon-spacing-start:0;--calcite-internal-accordion-item-icon-spacing-end:var(--calcite-internal-accordion-icon-margin)}.icon-position--end{--calcite-internal-accordion-item-flex-direction:row;--calcite-internal-accordion-item-icon-spacing-start:var(--calcite-internal-accordion-icon-margin);--calcite-internal-accordion-item-icon-spacing-end:0}.icon-position--end:not(.icon-type--plus-minus){--calcite-internal-accordion-item-icon-rotation:0deg;--calcite-internal-accordion-item-active-icon-rotation:180deg;--calcite-internal-accordion-item-icon-rotation-rtl:0deg;--calcite-internal-accordion-item-active-icon-rotation-rtl:calc(180deg * -1)}.content,.header{border-block-end-width:var(--calcite-border-width-sm);border-block-end-style:solid;border-color:var(--calcite-accordion-border-color, var(--calcite-color-border-2))}.header-content,.content{padding:var(--calcite-accordion-item-content-space, var(--calcite-internal-accordion-item-padding, var(--calcite-internal-accordion-item-spacing-unit, 0.5rem 0.75rem)))}.header{display:flex;align-items:stretch}.header *{display:inline-flex;align-items:center;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);word-wrap:break-word;word-break:break-word}.header-content{flex-grow:1;cursor:pointer;outline-color:transparent;flex-direction:var(--calcite-internal-accordion-item-flex-direction)}.header-content:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.header-content:focus,.header-content:hover,.header-content:active{color:var(--calcite-accordion-text-color-hover, var(--calcite-color-text-2))}.header-content:focus .expand-icon,.header-content:focus .heading,.header-content:hover .expand-icon,.header-content:hover .heading,.header-content:active .expand-icon,.header-content:active .heading{color:var(--calcite-accordion-text-color-pressed, var(--calcite-color-text-1))}.header-container{inline-size:100%}.header-text{margin-block:0px;flex-grow:1;flex-direction:column;padding-block:0px;text-align:initial;margin-inline-end:auto}.heading,.description{display:flex;inline-size:100%}.heading{font-weight:var(--calcite-font-weight-medium)}.actions-start,.actions-end{display:flex;align-items:center}.icon{display:flex;align-items:center;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-end)}.icon--start{margin-inline-end:var(--calcite-internal-accordion-icon-margin)}.icon--end{margin-inline-end:var(--calcite-internal-accordion-icon-margin);margin-inline-start:var(--calcite-internal-accordion-icon-margin)}.expand-icon{color:var(--calcite-accordion-text-color, var(--calcite-color-text-3));margin-inline-start:var(--calcite-internal-accordion-item-icon-spacing-start);margin-inline-end:var(--calcite-internal-accordion-item-icon-spacing-end);transform:rotate(var(--calcite-internal-accordion-item-icon-rotation))}.calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-icon-rotation-rtl))}.description{margin-block-start:0.25rem}.content{display:none;padding-block-start:0px;text-align:initial}:host(:not(:focus):not(:hover):not([expanded])) .heading{color:var(--calcite-accordion-text-color-hover, var(--calcite-color-text-2))}:host([expanded]){color:var(--calcite-accordion-text-color-pressed, var(--calcite-color-text-1))}:host([expanded]) .header{border-block-end-color:transparent}:host([expanded]) .expand-icon{color:var(--calcite-accordion-text-color-hover, var(--calcite-color-text-2));transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation))}:host([expanded]) .calcite--rtl .expand-icon{transform:rotate(var(--calcite-internal-accordion-item-active-icon-rotation-rtl))}:host([expanded]) .description{color:var(--calcite-accordion-text-color-hover, var(--calcite-color-text-2))}:host([expanded]) .content{display:block}@media (forced-colors: active){:host([expanded]) .header{border-block-end:none}:host([expanded]) .heading{font-weight:bolder}.header-content:hover .heading,.header-content:focus .heading{text-decoration:underline}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteAccordionItemStyle0 = accordionItemCss;

const AccordionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalAccordionItemSelect = createEvent(this, "calciteInternalAccordionItemSelect", 6);
        this.calciteInternalAccordionItemClose = createEvent(this, "calciteInternalAccordionItemClose", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.storeHeaderEl = (el) => {
            this.headerEl = el;
        };
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
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
        const iconStartEl = this.iconStart ? (h("calcite-icon", { class: { [CSS.icon]: true, [CSS.iconStart]: true }, flipRtl: iconFlipRtl === "both" || iconFlipRtl === "start", icon: this.iconStart, key: "icon-start", scale: getIconScale(this.scale) })) : null;
        const iconEndEl = this.iconEnd ? (h("calcite-icon", { class: { [CSS.iconEnd]: true, [CSS.icon]: true }, flipRtl: iconFlipRtl === "both" || iconFlipRtl === "end", icon: this.iconEnd, key: "icon-end", scale: getIconScale(this.scale) })) : null;
        const { description } = this;
        return (h(Host, { key: '814d4825cae2104f75b2f9929536082846cf57bd' }, h("div", { key: '2db2128ea0666b97849c6dae790540f233c9d0c1', class: {
                [`icon-position--${this.iconPosition}`]: true,
                [`icon-type--${this.iconType}`]: true,
            } }, h("div", { key: '64fe888d6f47db3f9338327280b3e321bb770518', class: { [CSS.header]: true, [CSS_UTILITY.rtl]: dir === "rtl" } }, this.renderActionsStart(), h("div", { key: '9b76d09efa231d1840c913245832a10bedd8ea4b', "aria-controls": IDS.section, "aria-expanded": toAriaBoolean(this.expanded), class: CSS.headerContent, id: IDS.sectionToggle, onClick: this.itemHeaderClickHandler, ref: this.storeHeaderEl, role: "button", tabindex: "0" }, h("div", { key: '59c73bc01a0321f23b296b12fa4bd9476084ce4b', class: CSS.headerContainer }, iconStartEl, h("div", { key: 'c9d3551a823a31d4cc54934f780272e437f38ef1', class: CSS.headerText }, h("span", { key: '350ea0660f827ced975b326287dc285ad1417b4c', class: CSS.heading }, this.heading), description ? h("span", { class: CSS.description }, description) : null), iconEndEl), h("calcite-icon", { key: '497edd46ef65a4ac27a844f7c6c5de5cfb2cb0e7', class: CSS.expandIcon, icon: this.iconType === "chevron"
                ? "chevronDown"
                : this.iconType === "caret"
                    ? "caretDown"
                    : this.expanded
                        ? "minus"
                        : "plus", scale: getIconScale(this.scale) })), this.renderActionsEnd()), h("section", { key: '1b7cd480d664d6b3f65c145e19c5866107d19413', "aria-labelledby": IDS.sectionToggle, class: CSS.content, id: IDS.section }, h("slot", { key: '1156f3056966f11ee0836a5185cce700911c8c8b' })))));
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
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.headerEl.focus();
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
    get el() { return getElement(this); }
};
AccordionItem.style = CalciteAccordionItemStyle0;

export { AccordionItem as calcite_accordion_item };
