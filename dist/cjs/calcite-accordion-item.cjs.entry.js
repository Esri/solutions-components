/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const dom = require('./dom-4a580af6.js');
const conditionalSlot = require('./conditionalSlot-d8471163.js');
const resources = require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');
require('./observers-5311faf8.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const SLOTS = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end"
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
  headerContainer: "header-container"
};

const accordionItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}.icon-position--end,.icon-position--start{--calcite-accordion-item-icon-rotation:calc(90deg * -1);--calcite-accordion-item-active-icon-rotation:0deg;--calcite-accordion-item-icon-rotation-rtl:90deg;--calcite-accordion-item-active-icon-rotation-rtl:0deg}.icon-position--start{--calcite-accordion-item-flex-direction:row-reverse;--calcite-accordion-item-icon-spacing-start:0;--calcite-accordion-item-icon-spacing-end:var(--calcite-accordion-icon-margin)}.icon-position--end{--calcite-accordion-item-flex-direction:row;--calcite-accordion-item-icon-spacing-start:var(--calcite-accordion-icon-margin);--calcite-accordion-item-icon-spacing-end:0}.icon-position--end:not(.icon-type--plus-minus){--calcite-accordion-item-icon-rotation:0deg;--calcite-accordion-item-active-icon-rotation:180deg;--calcite-accordion-item-icon-rotation-rtl:0deg;--calcite-accordion-item-active-icon-rotation-rtl:calc(180deg * -1)}:host{position:relative;display:flex;flex-direction:column;color:var(--calcite-ui-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;background-color:var(--calcite-accordion-item-background, var(--calcite-ui-foreground-1))}:host .header-content{outline-color:transparent}:host(:focus) .header-content{outline:2px solid transparent;outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([expanded]){color:var(--calcite-ui-text-1)}:host([expanded]) .content{display:block;color:var(--calcite-ui-text-1)}:host([expanded]) .header{border-block-end-color:transparent}:host .header{display:flex;align-items:stretch}:host .icon{position:relative;margin:0px;display:inline-flex;color:var(--calcite-ui-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-margin-end:var(--calcite-accordion-item-icon-spacing-start);margin-inline-end:var(--calcite-accordion-item-icon-spacing-start);-webkit-margin-start:var(--calcite-accordion-item-icon-spacing-end);margin-inline-start:var(--calcite-accordion-item-icon-spacing-end)}.icon--start{display:flex;align-items:center;-webkit-margin-end:var(--calcite-accordion-icon-margin);margin-inline-end:var(--calcite-accordion-icon-margin)}.icon--end{display:flex;align-items:center;-webkit-margin-end:var(--calcite-accordion-icon-margin);margin-inline-end:var(--calcite-accordion-icon-margin);-webkit-margin-start:var(--calcite-accordion-icon-margin);margin-inline-start:var(--calcite-accordion-icon-margin)}.header-container{inline-size:100%}.content{padding:var(--calcite-accordion-item-padding)}:host .content,:host .header{-webkit-border-after:1px solid var(--calcite-accordion-item-border, var(--calcite-ui-border-2));border-block-end:1px solid var(--calcite-accordion-item-border, var(--calcite-ui-border-2))}:host .header *{display:inline-flex;align-items:center;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host .content{display:none;-webkit-padding-before:0px;padding-block-start:0px;color:var(--calcite-ui-text-3);text-align:initial}:host .expand-icon{color:var(--calcite-ui-text-3);-webkit-margin-start:var(--calcite-accordion-item-icon-spacing-start);margin-inline-start:var(--calcite-accordion-item-icon-spacing-start);-webkit-margin-end:var(--calcite-accordion-item-icon-spacing-end);margin-inline-end:var(--calcite-accordion-item-icon-spacing-end);transform:rotate(var(--calcite-accordion-item-icon-rotation))}.calcite--rtl .expand-icon{transform:rotate(var(--calcite-accordion-item-icon-rotation-rtl))}:host([expanded]) .expand-icon{color:var(--calcite-ui-text-1);transform:rotate(var(--calcite-accordion-item-active-icon-rotation))}:host([expanded]) .calcite--rtl .expand-icon{transform:rotate(var(--calcite-accordion-item-active-icon-rotation-rtl))}:host .header-text{margin-block:0px;flex-grow:1;flex-direction:column;padding-block:0px;text-align:initial;-webkit-margin-end:auto;margin-inline-end:auto}:host .heading,:host .description{display:flex;inline-size:100%}:host .heading{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-2)}:host .description{-webkit-margin-before:0.25rem;margin-block-start:0.25rem;color:var(--calcite-ui-text-3)}:host(:focus) .heading,:host(:hover) .heading{color:var(--calcite-ui-text-1)}:host(:focus) .icon,:host(:hover) .icon{color:var(--calcite-ui-text-1)}:host(:focus) .expand-icon,:host(:hover) .expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .description,:host(:hover) .description{color:var(--calcite-ui-text-2)}:host(:focus) .heading,:host(:active) .heading,:host([expanded]) .heading{color:var(--calcite-ui-text-1)}:host(:focus) .icon,:host(:active) .icon,:host([expanded]) .icon{color:var(--calcite-ui-text-1)}:host(:focus) .expand-icon,:host(:active) .expand-icon,:host([expanded]) .expand-icon{color:var(--calcite-ui-text-1)}:host(:focus) .description,:host(:active) .description,:host([expanded]) .description{color:var(--calcite-ui-text-2)}.header-content{flex-grow:1;cursor:pointer;padding:var(--calcite-accordion-item-padding);flex-direction:var(--calcite-accordion-item-flex-direction)}.actions-start,.actions-end{display:flex;align-items:center}@media (forced-colors: active){:host([expanded]) .header{-webkit-border-after:none;border-block-end:none}:host([expanded]) .heading{font-weight:bolder}:host(:hover) .heading,:host(:focus) .heading{text-decoration:underline}}";

const AccordionItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteInternalAccordionItemKeyEvent = index.createEvent(this, "calciteInternalAccordionItemKeyEvent", 6);
    this.calciteInternalAccordionItemSelect = index.createEvent(this, "calciteInternalAccordionItemSelect", 6);
    this.calciteInternalAccordionItemClose = index.createEvent(this, "calciteInternalAccordionItemClose", 6);
    this.calciteInternalAccordionItemRegister = index.createEvent(this, "calciteInternalAccordionItemRegister", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, the component is active.
     *
     * @deprecated use `expanded` instead.
     */
    this.active = false;
    /** When `true`, the component is expanded. */
    this.expanded = false;
    /** what icon position does the parent accordion specify */
    this.iconPosition = "end";
    /** handle clicks on item header */
    this.itemHeaderClickHandler = () => this.emitRequestedItem();
  }
  activeHandler(value) {
    this.expanded = value;
  }
  expandedHandler(value) {
    this.active = value;
  }
  iconHandler(value) {
    this.iconStart = value;
  }
  iconStartHandler(value) {
    this.icon = value;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.parent = this.el.parentElement;
    this.selectionMode = dom.getElementProp(this.el, "selection-mode", "multi");
    this.iconType = dom.getElementProp(this.el, "icon-type", "chevron");
    this.iconPosition = dom.getElementProp(this.el, "icon-position", this.iconPosition);
    const isExpanded = this.active || this.expanded;
    if (isExpanded) {
      this.activeHandler(isExpanded);
      this.expandedHandler(isExpanded);
    }
    if (this.iconStart) {
      this.icon = this.iconStart;
    }
    else if (this.icon) {
      this.iconStart = this.icon;
    }
    conditionalSlot.connectConditionalSlotComponent(this);
  }
  componentDidLoad() {
    this.itemPosition = this.getItemPosition();
    this.calciteInternalAccordionItemRegister.emit({
      parent: this.parent,
      position: this.itemPosition
    });
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
    const dir = dom.getElementDir(this.el);
    const iconStartEl = this.iconStart ? (index.h("calcite-icon", { class: CSS.iconStart, icon: this.iconStart, key: "icon-start", scale: "s" })) : null;
    const iconEndEl = this.iconEnd ? (index.h("calcite-icon", { class: CSS.iconEnd, icon: this.iconEnd, key: "icon-end", scale: "s" })) : null;
    const description = this.description || this.itemSubtitle;
    return (index.h(index.Host, null, index.h("div", { class: {
        [`icon-position--${this.iconPosition}`]: true,
        [`icon-type--${this.iconType}`]: true
      } }, index.h("div", { class: { [CSS.header]: true, [resources.CSS_UTILITY.rtl]: dir === "rtl" } }, this.renderActionsStart(), index.h("div", { "aria-expanded": dom.toAriaBoolean(this.active || this.expanded), class: CSS.headerContent, onClick: this.itemHeaderClickHandler, role: "button", tabindex: "0" }, index.h("div", { class: CSS.headerContainer }, iconStartEl, index.h("div", { class: CSS.headerText }, index.h("span", { class: CSS.heading }, this.heading || this.itemTitle), description ? index.h("span", { class: CSS.description }, description) : null), iconEndEl), index.h("calcite-icon", { class: CSS.expandIcon, icon: this.iconType === "chevron"
        ? "chevronDown"
        : this.iconType === "caret"
          ? "caretDown"
          : this.expanded || this.active
            ? "minus"
            : "plus", scale: "s" })), this.renderActionsEnd()), index.h("div", { class: CSS.content }, index.h("slot", null)))));
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
        case "ArrowUp":
        case "ArrowDown":
        case "Home":
        case "End":
          this.calciteInternalAccordionItemKeyEvent.emit({
            parent: this.parent,
            item: event
          });
          event.preventDefault();
          break;
      }
    }
  }
  updateActiveItemOnChange(event) {
    this.requestedAccordionItem = event.detail
      .requestedAccordionItem;
    if (this.el.parentNode !== this.requestedAccordionItem.parentNode) {
      return;
    }
    this.determineActiveItem();
    event.stopPropagation();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedAccordionItem) {
          this.expanded = !this.expanded;
        }
        break;
      case "single":
        this.expanded = this.el === this.requestedAccordionItem ? !this.expanded : false;
        break;
      case "single-persist":
        this.expanded = this.el === this.requestedAccordionItem;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteInternalAccordionItemSelect.emit({
      requestedAccordionItem: this.el
    });
  }
  getItemPosition() {
    return Array.prototype.indexOf.call(this.parent.querySelectorAll("calcite-accordion-item"), this.el);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "expanded": ["expandedHandler"],
    "icon": ["iconHandler"],
    "iconStart": ["iconStartHandler"]
  }; }
};
AccordionItem.style = accordionItemCss;

exports.calcite_accordion_item = AccordionItem;

//# sourceMappingURL=calcite-accordion-item.cjs.entry.js.map