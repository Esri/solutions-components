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
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');
require('./observers-5311faf8.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  header: "header",
  footer: "footer",
  title: "title",
  subtitle: "subtitle",
  checkboxWrapper: "checkbox-wrapper",
  thumbnailWrapper: "thumbnail-wrapper"
};
const SLOTS = {
  thumbnail: "thumbnail",
  title: "title",
  subtitle: "subtitle",
  footerLeading: "footer-leading",
  footerTrailing: "footer-trailing"
};
const TEXT = {
  select: "Select",
  deselect: "Deselect",
  loading: "Loading"
};

const cardCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block;max-inline-size:100%}:host .calcite-card-container{position:relative;display:flex;block-size:100%;flex-direction:column;justify-content:space-between;overflow:hidden;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-3);--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);border-radius:var(--calcite-border-radius-base)}.container{position:relative;display:flex;flex:1 1 auto;flex-direction:column}:host([loading]) .calcite-card-container *:not(calcite-loader):not(.calcite-card-loader-container){pointer-events:none;opacity:0}:host([loading]) .calcite-card-loader-container{position:absolute;inset:0px;display:flex;align-items:center}.header,.footer{display:flex;padding-inline:0.75rem;padding-block:0.75rem 0.25rem}.header{flex-direction:column}.footer{-webkit-margin-before:auto;margin-block-start:auto;flex-direction:row;align-content:space-between;justify-content:space-between;padding-inline:0.75rem;padding-block:0.25rem 0.75rem}.card-content{padding:0.75rem;font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-ui-text-3)}:host([selected]) .calcite-card-container{border-color:var(--calcite-ui-brand)}slot[name=title]::slotted(*),*::slotted([slot=title]){margin:0px;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([selectable]) .header{-webkit-padding-end:2rem;padding-inline-end:2rem}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){margin:0px;-webkit-margin-before:0.5rem;margin-block-start:0.5rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-2)}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){min-inline-size:100%;max-inline-size:100%}slot[name=footer-leading]::slotted(*),*::slotted([slot=footer-leading]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375;-webkit-margin-end:auto;margin-inline-end:auto}slot[name=footer-trailing]::slotted(*),*::slotted([slot=footer-trailing]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375}.checkbox-wrapper{position:absolute;margin:0px;padding:0px;inset-block-start:0.5rem;inset-inline-end:0.5rem}.thumbnail-wrapper{display:flex}.calcite-card-container.inline{flex-direction:row}.calcite-card-container.inline>.container{inline-size:60%}.calcite-card-container.inline>.thumbnail-wrapper{inline-size:40%;align-items:flex-start}.calcite-card-container.inline slot[name=thumbnail]::slotted(img),.calcite-card-container.inline img::slotted([slot=thumbnail]){inline-size:100%}slot[name=footer-leading]::slotted(*),slot[name=footer-trailing]::slotted(*){display:flex;gap:0.25rem}";

const Card = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteCardSelect = index.createEvent(this, "calciteCardSelect", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**  When `true`, a busy indicator is displayed. */
    this.loading = false;
    /** When `true`, the component is selected. */
    this.selected = false;
    /** When `true`, the component is selectable. */
    this.selectable = false;
    /**
     * Accessible name when the component is loading.
     *
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /**
     * When `selectable` is `true`, the accessible name for the component's checkbox for selection.
     *
     * @default "Select"
     */
    this.intlSelect = TEXT.select;
    /**
     * When `selectable` is `true`, the accessible name for the component's checkbox for deselection.
     *
     * @default "Deselect"
     */
    this.intlDeselect = TEXT.deselect;
    /** Sets the placement of the thumbnail defined in the `thumbnail` slot. */
    this.thumbnailPosition = "block-start";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.cardSelectClick = () => {
      this.selectCard();
    };
    this.cardSelectKeyDown = (event) => {
      switch (event.key) {
        case " ":
        case "Enter":
          this.selectCard();
          event.preventDefault();
          break;
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    conditionalSlot.connectConditionalSlotComponent(this);
  }
  disonnectedCallback() {
    conditionalSlot.disconnectConditionalSlotComponent(this);
  }
  render() {
    const thumbnailInline = this.thumbnailPosition.startsWith("inline");
    const thumbnailStart = this.thumbnailPosition.endsWith("start");
    return (index.h("div", { class: { "calcite-card-container": true, inline: thumbnailInline } }, this.loading ? (index.h("div", { class: "calcite-card-loader-container" }, index.h("calcite-loader", { active: true, label: this.intlLoading }))) : null, thumbnailStart && this.renderThumbnail(), index.h("section", { "aria-busy": dom.toAriaBoolean(this.loading), class: { [CSS.container]: true } }, this.selectable ? this.renderCheckbox() : null, this.renderHeader(), index.h("div", { class: "card-content" }, index.h("slot", null)), this.renderFooter()), !thumbnailStart && this.renderThumbnail()));
  }
  selectCard() {
    this.selected = !this.selected;
    this.calciteCardSelect.emit();
  }
  renderThumbnail() {
    return dom.getSlotted(this.el, SLOTS.thumbnail) ? (index.h("section", { class: CSS.thumbnailWrapper }, index.h("slot", { name: SLOTS.thumbnail }))) : null;
  }
  renderCheckbox() {
    const checkboxLabel = this.selected ? this.intlDeselect : this.intlSelect;
    return (index.h("calcite-label", { class: CSS.checkboxWrapper, onClick: this.cardSelectClick, onKeyDown: this.cardSelectKeyDown }, index.h("calcite-checkbox", { checked: this.selected, label: checkboxLabel })));
  }
  renderHeader() {
    const { el } = this;
    const title = dom.getSlotted(el, SLOTS.title);
    const subtitle = dom.getSlotted(el, SLOTS.subtitle);
    const hasHeader = title || subtitle;
    return hasHeader ? (index.h("header", { class: CSS.header }, index.h("slot", { name: SLOTS.title }), index.h("slot", { name: SLOTS.subtitle }))) : null;
  }
  renderFooter() {
    const { el } = this;
    const leadingFooter = dom.getSlotted(el, SLOTS.footerLeading);
    const trailingFooter = dom.getSlotted(el, SLOTS.footerTrailing);
    const hasFooter = leadingFooter || trailingFooter;
    return hasFooter ? (index.h("footer", { class: CSS.footer }, index.h("slot", { name: SLOTS.footerLeading }), index.h("slot", { name: SLOTS.footerTrailing }))) : null;
  }
  get el() { return index.getElement(this); }
};
Card.style = cardCss;

exports.calcite_card = Card;

//# sourceMappingURL=calcite-card.cjs.entry.js.map