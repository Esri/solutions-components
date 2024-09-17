/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const conditionalSlot = require('./conditionalSlot-6b5d9b84.js');
const dom = require('./dom-6a9b6275.js');
const resources = require('./resources-dfe71ff2.js');
const component = require('./component-a4c6a35d.js');
const loadable = require('./loadable-2e2626dc.js');
require('./observers-8fed90f3.js');
require('./browser-69696af0.js');
require('./guid-02e5380f.js');

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
        index.registerInstance(this, hostRef);
        this.calciteInternalAccordionItemSelect = index.createEvent(this, "calciteInternalAccordionItemSelect", 6);
        this.calciteInternalAccordionItemClose = index.createEvent(this, "calciteInternalAccordionItemClose", 6);
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
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderActionsStart() {
        const { el } = this;
        return dom.getSlotted(el, SLOTS.actionsStart) ? (index.h("div", { class: CSS.actionsStart }, index.h("slot", { name: SLOTS.actionsStart }))) : null;
    }
    renderActionsEnd() {
        const { el } = this;
        return dom.getSlotted(el, SLOTS.actionsEnd) ? (index.h("div", { class: CSS.actionsEnd }, index.h("slot", { name: SLOTS.actionsEnd }))) : null;
    }
    render() {
        const { iconFlipRtl } = this;
        const dir = dom.getElementDir(this.el);
        const iconStartEl = this.iconStart ? (index.h("calcite-icon", { class: { [CSS.icon]: true, [CSS.iconStart]: true }, flipRtl: iconFlipRtl === "both" || iconFlipRtl === "start", icon: this.iconStart, key: "icon-start", scale: component.getIconScale(this.scale) })) : null;
        const iconEndEl = this.iconEnd ? (index.h("calcite-icon", { class: { [CSS.iconEnd]: true, [CSS.icon]: true }, flipRtl: iconFlipRtl === "both" || iconFlipRtl === "end", icon: this.iconEnd, key: "icon-end", scale: component.getIconScale(this.scale) })) : null;
        const { description } = this;
        return (index.h(index.Host, { key: '814d4825cae2104f75b2f9929536082846cf57bd' }, index.h("div", { key: '2db2128ea0666b97849c6dae790540f233c9d0c1', class: {
                [`icon-position--${this.iconPosition}`]: true,
                [`icon-type--${this.iconType}`]: true,
            } }, index.h("div", { key: '64fe888d6f47db3f9338327280b3e321bb770518', class: { [CSS.header]: true, [resources.CSS_UTILITY.rtl]: dir === "rtl" } }, this.renderActionsStart(), index.h("div", { key: '9b76d09efa231d1840c913245832a10bedd8ea4b', "aria-controls": IDS.section, "aria-expanded": dom.toAriaBoolean(this.expanded), class: CSS.headerContent, id: IDS.sectionToggle, onClick: this.itemHeaderClickHandler, ref: this.storeHeaderEl, role: "button", tabindex: "0" }, index.h("div", { key: '59c73bc01a0321f23b296b12fa4bd9476084ce4b', class: CSS.headerContainer }, iconStartEl, index.h("div", { key: 'c9d3551a823a31d4cc54934f780272e437f38ef1', class: CSS.headerText }, index.h("span", { key: '350ea0660f827ced975b326287dc285ad1417b4c', class: CSS.heading }, this.heading), description ? index.h("span", { class: CSS.description }, description) : null), iconEndEl), index.h("calcite-icon", { key: '497edd46ef65a4ac27a844f7c6c5de5cfb2cb0e7', class: CSS.expandIcon, icon: this.iconType === "chevron"
                ? "chevronDown"
                : this.iconType === "caret"
                    ? "caretDown"
                    : this.expanded
                        ? "minus"
                        : "plus", scale: component.getIconScale(this.scale) })), this.renderActionsEnd()), index.h("section", { key: '1b7cd480d664d6b3f65c145e19c5866107d19413', "aria-labelledby": IDS.sectionToggle, class: CSS.content, id: IDS.section }, index.h("slot", { key: '1156f3056966f11ee0836a5185cce700911c8c8b' })))));
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
        const parent = dom.closestElementCrossShadowBoundary(this.el, "calcite-accordion");
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
        const closestAccordionParent = dom.closestElementCrossShadowBoundary(accordionItem, "calcite-accordion");
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
        await loadable.componentFocusable(this);
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
    get el() { return index.getElement(this); }
};
AccordionItem.style = CalciteAccordionItemStyle0;

exports.calcite_accordion_item = AccordionItem;
