/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-c246d90e.js';

const accordionCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([scale=s]){--calcite-accordion-item-spacing-unit:0.25rem;--calcite-accordion-icon-margin:0.5rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-accordion-item-spacing-unit:0.5rem;--calcite-accordion-icon-margin:0.75rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-accordion-item-spacing-unit:0.75rem;--calcite-accordion-icon-margin:1rem;--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 1rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host{position:relative;display:block;max-inline-size:100%;line-height:1.5rem;--calcite-accordion-item-border:var(--calcite-ui-border-2);--calcite-accordion-item-background:var(--calcite-ui-foreground-1)}.accordion--transparent{--calcite-accordion-item-border:transparent;--calcite-accordion-item-background:transparent}.accordion--minimal{--calcite-accordion-item-padding:var(--calcite-accordion-item-spacing-unit) 0}.accordion{border-width:1px;border-block-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-2)}";

const Accordion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInternalAccordionChange = createEvent(this, "calciteInternalAccordionChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Specifies the appearance of the component. */
    this.appearance = "solid";
    /** Specifies the placement of the icon in the header. */
    this.iconPosition = "end";
    /** Specifies the type of the icon in the header. */
    this.iconType = "chevron";
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * Specifies the selection mode - `"multi"` (allow any number of open items), `"single"` (allow one open item),
     * or `"single-persist"` (allow and require one open item).
     */
    this.selectionMode = "multi";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** created list of Accordion items */
    this.items = [];
    /** keep track of whether the items have been sorted so we don't re-sort */
    this.sorted = false;
    this.sortItems = (items) => items.sort((a, b) => a.position - b.position).map((a) => a.item);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidLoad() {
    if (!this.sorted) {
      this.items = this.sortItems(this.items);
      this.sorted = true;
    }
  }
  render() {
    const transparent = this.appearance === "transparent";
    const minimal = this.appearance === "minimal";
    return (h("div", { class: {
        "accordion--transparent": transparent,
        "accordion--minimal": minimal,
        accordion: !transparent && !minimal
      } }, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteInternalAccordionItemKeyEvent(event) {
    const item = event.detail.item;
    const parent = event.detail.parent;
    if (this.el === parent) {
      const { key } = item;
      const itemToFocus = event.target;
      const isFirstItem = this.itemIndex(itemToFocus) === 0;
      const isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
      switch (key) {
        case "ArrowDown":
          if (isLastItem) {
            this.focusFirstItem();
          }
          else {
            this.focusNextItem(itemToFocus);
          }
          break;
        case "ArrowUp":
          if (isFirstItem) {
            this.focusLastItem();
          }
          else {
            this.focusPrevItem(itemToFocus);
          }
          break;
        case "Home":
          this.focusFirstItem();
          break;
        case "End":
          this.focusLastItem();
          break;
      }
    }
    event.stopPropagation();
  }
  registerCalciteAccordionItem(event) {
    const item = {
      item: event.target,
      parent: event.detail.parent,
      position: event.detail.position
    };
    if (this.el === item.parent) {
      this.items.push(item);
    }
    event.stopPropagation();
  }
  updateActiveItemOnChange(event) {
    this.requestedAccordionItem = event.detail.requestedAccordionItem;
    this.calciteInternalAccordionChange.emit({
      requestedAccordionItem: this.requestedAccordionItem
    });
    event.stopPropagation();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  focusFirstItem() {
    const firstItem = this.items[0];
    this.focusElement(firstItem);
  }
  focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.focusElement(lastItem);
  }
  focusNextItem(el) {
    const index = this.itemIndex(el);
    const nextItem = this.items[index + 1] || this.items[0];
    this.focusElement(nextItem);
  }
  focusPrevItem(el) {
    const index = this.itemIndex(el);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.focusElement(prevItem);
  }
  itemIndex(el) {
    return this.items.indexOf(el);
  }
  focusElement(item) {
    const target = item;
    target === null || target === void 0 ? void 0 : target.focus();
  }
  get el() { return getElement(this); }
};
Accordion.style = accordionCss;

export { Accordion as calcite_accordion };

//# sourceMappingURL=calcite-accordion.entry.js.map