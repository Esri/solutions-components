/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './p-c2f00d41.js';
import { a as getSlotted } from './p-83166522.js';
import { g as guid } from './p-a80b3880.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-1c247f54.js';
import './p-729708a3.js';
import './p-9a9955db.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  title: "title",
  close: "close",
  imageContainer: "image-container",
  chipIcon: "chip-icon",
  closeIcon: "close-icon"
};
const TEXT = {
  close: "Close"
};
const SLOTS = {
  image: "image"
};
const ICONS = {
  close: "x"
};

const chipCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([scale=s]){block-size:1.5rem;font-size:var(--calcite-font-size--2);--calcite-chip-spacing-unit-l:0.5rem;--calcite-chip-spacing-unit-s:0.25rem}:host([scale=s]) .image-container{block-size:1.25rem;inline-size:1.25rem}:host([scale=m]){block-size:2rem;font-size:var(--calcite-font-size--1);--calcite-chip-spacing-unit-l:0.75rem;--calcite-chip-spacing-unit-s:6px}:host([scale=m]) .image-container{block-size:1.5rem;inline-size:1.5rem;-webkit-padding-start:0.25rem;padding-inline-start:0.25rem}:host([scale=l]){block-size:2.75rem;font-size:var(--calcite-font-size-0);--calcite-chip-spacing-unit-l:1rem;--calcite-chip-spacing-unit-s:0.5rem}:host([scale=l]) .image-container{block-size:2rem;inline-size:2rem;-webkit-padding-start:0.25rem;padding-inline-start:0.25rem}:host{box-sizing:border-box;display:inline-flex;cursor:default;align-items:center;border-radius:9999px;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}.container{display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center}.title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host span{padding-block:0;padding-inline:var(--calcite-chip-spacing-unit-l)}:host([closable]) span{padding-inline:var(--calcite-chip-spacing-unit-l) var(--calcite-chip-spacing-unit-s)}:host([icon]:not([closable])) span{padding-block:0;padding-inline:var(--calcite-chip-spacing-unit-l)}:host button{margin:0px;display:inline-flex;max-block-size:100%;min-block-size:100%;cursor:pointer;align-items:center;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-ui-text-1);outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;-webkit-appearance:none;border-start-start-radius:0;border-start-end-radius:50px;border-end-end-radius:50px;border-end-start-radius:0;padding-block:0;padding-inline:var(--calcite-chip-spacing-unit-s);color:inherit;--calcite-chip-transparent-hover:var(--calcite-button-transparent-hover);--calcite-chip-transparent-press:var(--calcite-button-transparent-press)}:host button:hover{background-color:var(--calcite-chip-transparent-hover)}:host button:focus{background-color:var(--calcite-chip-transparent-hover);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host button:active{background-color:var(--calcite-chip-transparent-press)}.image-container{display:inline-flex;overflow:hidden;border-radius:50%}:host slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-margin-end:0;margin-inline-end:0;-webkit-margin-start:var(--calcite-chip-spacing-unit-l);margin-inline-start:var(--calcite-chip-spacing-unit-l);border-start-start-radius:0;border-start-end-radius:50px;border-end-end-radius:50px;border-end-start-radius:0}:host([color=blue]){border-color:transparent;background-color:var(--calcite-ui-info);color:var(--calcite-ui-text-inverse)}:host([color=red]){border-color:transparent;background-color:var(--calcite-ui-danger);color:var(--calcite-ui-text-inverse)}:host([color=yellow]){border-color:transparent;background-color:var(--calcite-ui-warning);color:#151515}:host([color=green]){border-color:transparent;background-color:var(--calcite-ui-success);color:#151515}:host([color=grey]){border-color:transparent;background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host([color=grey]) button,:host([color=grey]) .close-icon{color:var(--calcite-ui-text-3)}:host([color=grey]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-ui-text-3))}:host([appearance=clear]),:host([appearance=transparent]){background-color:transparent;color:var(--calcite-ui-text-1)}:host([color=blue][appearance=clear]),:host([color=blue][appearance=transparent]){border-color:var(--calcite-ui-info)}:host([color=blue][appearance=clear]) .chip-icon,:host([color=blue][appearance=transparent]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-ui-info))}:host([color=red][appearance=clear]),:host([color=red][appearance=transparent]){border-color:var(--calcite-ui-danger)}:host([color=red][appearance=clear]) .chip-icon,:host([color=red][appearance=transparent]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-ui-danger))}:host([color=yellow][appearance=clear]),:host([color=yellow][appearance=transparent]){border-color:var(--calcite-ui-warning)}:host([color=yellow][appearance=clear]) .chip-icon,:host([color=yellow][appearance=transparent]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-ui-warning))}:host([color=green][appearance=clear]),:host([color=green][appearance=transparent]){border-color:var(--calcite-ui-success)}:host([color=green][appearance=clear]) .chip-icon,:host([color=green][appearance=transparent]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-ui-success))}:host([color=grey][appearance=clear]),:host([color=grey][appearance=transparent]){border-color:var(--calcite-ui-border-1)}:host([color=grey][appearance=clear]) .chip-icon,:host([color=grey][appearance=transparent]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-ui-text-3))}:host([closed]){display:none}";

const Chip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteChipDismiss = createEvent(this, "calciteChipDismiss", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Specifies the appearance style of the component. */
    this.appearance = "solid";
    /** Specifies the color for the component. */
    this.color = "grey";
    /**
     * When `true`, a close button is added to the component.
     *
     * @deprecated use `closable` instead.
     */
    this.dismissible = false;
    /** When `true`, a close button is added to the component. */
    this.closable = false;
    /**
     * Accessible name for the component's close button.
     *
     * @default "Close"
     */
    this.dismissLabel = TEXT.close;
    /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
    this.iconFlipRtl = false;
    /** Specifies the size of the component. */
    this.scale = "m";
    /** When `true`, hides the component. */
    this.closed = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.closeClickHandler = (event) => {
      event.preventDefault();
      this.calciteChipDismiss.emit(this.el);
      this.closed = true;
    };
    this.guid = guid();
  }
  handleDismissible(value) {
    this.closable = value;
  }
  handleClosable(value) {
    this.dismissible = value;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectConditionalSlotComponent(this);
    if (this.dismissible) {
      this.handleDismissible(this.dismissible);
    }
    if (this.closable) {
      this.handleClosable(this.closable);
    }
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChipImage() {
    const { el } = this;
    const hasChipImage = getSlotted(el, SLOTS.image);
    return hasChipImage ? (h("div", { class: CSS.imageContainer, key: "image" }, h("slot", { name: SLOTS.image }))) : null;
  }
  render() {
    const iconEl = (h("calcite-icon", { class: CSS.chipIcon, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "s" }));
    const closeButton = (h("button", { "aria-describedby": this.guid, "aria-label": this.dismissLabel, class: CSS.close, onClick: this.closeClickHandler, ref: (el) => (this.closeButton = el) }, h("calcite-icon", { class: CSS.closeIcon, icon: ICONS.close, scale: "s" })));
    return (h("div", { class: "container" }, this.renderChipImage(), this.icon ? iconEl : null, h("span", { class: CSS.title, id: this.guid }, h("slot", null)), this.closable ? closeButton : null));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "dismissible": ["handleDismissible"],
    "closable": ["handleClosable"]
  }; }
};
Chip.style = chipCss;

export { Chip as calcite_chip };
