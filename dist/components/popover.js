/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, forceUpdate, h, Host } from '@stencil/core/internal/client';
import { b as defaultOffsetDistance, f as filterComputedPlacements, c as connectFloatingUI, u as updateAfterClose, a as disconnectFloatingUI, r as reposition, F as FloatingCSS } from './floating-ui.js';
import { g as guid } from './guid.js';
import { i as isPrimaryPointerButton, t as toAriaBoolean, q as queryElementRoots } from './dom.js';
import { c as connectOpenCloseComponent, d as disconnectOpenCloseComponent } from './openCloseComponent.js';
import { H as Heading } from './Heading.js';
import { i as isActivationKey } from './key.js';
import { d as defineCustomElement$3 } from './action.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  arrow: "arrow",
  imageContainer: "image-container",
  closeButtonContainer: "close-button-container",
  closeButton: "close-button",
  content: "content",
  hasHeader: "has-header",
  header: "header",
  headerContent: "header-content",
  heading: "heading"
};
const TEXT = {
  close: "Close"
};
const defaultPopoverPlacement = "auto";
const ARIA_CONTROLS = "aria-controls";
const ARIA_EXPANDED = "aria-expanded";
const HEADING_LEVEL = 2;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
class PopoverManager {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------
    this.registeredElements = new Map();
    this.registeredElementCount = 0;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.queryPopover = (composedPath) => {
      const { registeredElements } = this;
      const registeredElement = composedPath.find((pathEl) => registeredElements.has(pathEl));
      return registeredElements.get(registeredElement);
    };
    this.togglePopovers = (event) => {
      const composedPath = event.composedPath();
      const togglePopover = this.queryPopover(composedPath);
      if (togglePopover && !togglePopover.triggerDisabled) {
        togglePopover.toggle();
      }
      Array.from(this.registeredElements.values())
        .filter((popover) => popover !== togglePopover && popover.autoClose && popover.open && !composedPath.includes(popover))
        .forEach((popover) => popover.toggle(false));
    };
    this.keyHandler = (event) => {
      if (event.defaultPrevented || !isActivationKey(event.key)) {
        return;
      }
      this.togglePopovers(event);
    };
    this.clickHandler = (event) => {
      if (isPrimaryPointerButton(event)) {
        this.togglePopovers(event);
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  registerElement(referenceEl, popover) {
    this.registeredElementCount++;
    this.registeredElements.set(referenceEl, popover);
    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }
  unregisterElement(referenceEl) {
    if (this.registeredElements.delete(referenceEl)) {
      this.registeredElementCount--;
    }
    if (this.registeredElementCount === 0) {
      this.removeListeners();
    }
  }
  addListeners() {
    document.addEventListener("pointerdown", this.clickHandler, { capture: true });
    document.addEventListener("keydown", this.keyHandler, { capture: true });
  }
  removeListeners() {
    document.removeEventListener("pointerdown", this.clickHandler, { capture: true });
    document.removeEventListener("keydown", this.keyHandler, { capture: true });
  }
}

const popoverCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:900}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{transform:translateY(-5px)}:host([data-placement^=top]) .calcite-floating-ui-anim{transform:translateY(5px)}:host([data-placement^=left]) .calcite-floating-ui-anim{transform:translateX(5px)}:host([data-placement^=right]) .calcite-floating-ui-anim{transform:translateX(-5px)}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.arrow,.arrow::before{position:absolute;inline-size:8px;block-size:8px;z-index:-1}.arrow::before{content:\"\";--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-placement^=top]) .arrow{inset-block-end:-4px}:host([data-placement^=bottom]) .arrow{inset-block-start:-4px}:host([data-placement^=left]) .arrow{direction:ltr;inset-inline-end:-4px}:host([data-placement^=right]) .arrow{direction:ltr;inset-inline-start:-4px}:host{pointer-events:none}:host([open]){pointer-events:initial}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);background-color:var(--calcite-ui-foreground-1)}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-block-end-width:1px;border-style:solid;background-color:var(--calcite-ui-foreground-1);border-block-end-color:var(--calcite-ui-border-3)}.heading{margin:0px;display:block;flex:1 1 auto;align-self:center;white-space:normal;padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);word-wrap:break-word;word-break:break-word}.container{position:relative;display:flex;block-size:100%;flex-direction:row;flex-wrap:nowrap;border-radius:0.25rem;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1)}.container.has-header{flex-direction:column}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button-container{display:flex;overflow:hidden;flex:0 0 auto;border-start-end-radius:0.25rem;border-end-end-radius:0.25rem}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%}";

const manager = new PopoverManager();
const Popover = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calcitePopoverBeforeClose = createEvent(this, "calcitePopoverBeforeClose", 6);
    this.calcitePopoverClose = createEvent(this, "calcitePopoverClose", 6);
    this.calcitePopoverBeforeOpen = createEvent(this, "calcitePopoverBeforeOpen", 6);
    this.calcitePopoverOpen = createEvent(this, "calcitePopoverOpen", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, clicking outside of the component automatically closes open `calcite-popover`s.
     */
    this.autoClose = false;
    /**
     * When `true`, a close button is added to the component.
     *
     * @deprecated use dismissible instead.
     */
    this.closeButton = false;
    /**
     * When `true`, a close button is added to the component.
     *
     * @deprecated use `closable` instead.
     */
    this.dismissible = false;
    /** When `true`, display a close button within the component. */
    this.closable = false;
    /**
     * When `true`, prevents flipping the component's placement when overlapping its `referenceElement`.
     */
    this.disableFlip = false;
    /**
     * When `true`, removes the caret pointer.
     */
    this.disablePointer = false;
    /**
     * Offsets the position of the component away from the `referenceElement`.
     *
     * @default 6
     */
    this.offsetDistance = defaultOffsetDistance;
    /**
     * Offsets the position of the component along the `referenceElement`.
     */
    this.offsetSkidding = 0;
    /**
     * When `true`, displays and positions the component.
     */
    this.open = false;
    /**
     * Determines the type of positioning to use for the overlaid content.
     *
     * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
     *
     * `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
     *
     */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the component will be positioned relative to the `referenceElement`.
     *
     * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
     */
    this.placement = defaultPopoverPlacement;
    /**
     * When `true`, disables automatically toggling the component when its `referenceElement` has been triggered.
     *
     * This property can be set to `true` to manage when the component is open.
     */
    this.triggerDisabled = false;
    /**
     * Accessible name for the component's close button.
     *
     * @default "Close"
     */
    this.intlClose = TEXT.close;
    this.guid = `calcite-popover-${guid()}`;
    this.openTransitionProp = "opacity";
    this.hasLoaded = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setTransitionEl = (el) => {
      this.transitionEl = el;
      connectOpenCloseComponent(this);
    };
    this.setFilteredPlacements = () => {
      const { el, flipPlacements } = this;
      this.filteredFlipPlacements = flipPlacements
        ? filterComputedPlacements(flipPlacements, el)
        : null;
    };
    this.setUpReferenceElement = (warn = true) => {
      this.removeReferences();
      this.effectiveReferenceElement = this.getReferenceElement();
      connectFloatingUI(this, this.effectiveReferenceElement, this.el);
      const { el, referenceElement, effectiveReferenceElement } = this;
      if (warn && referenceElement && !effectiveReferenceElement) {
        console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
          el
        });
      }
      this.addReferences();
    };
    this.getId = () => {
      return this.el.id || this.guid;
    };
    this.setExpandedAttr = () => {
      const { effectiveReferenceElement, open } = this;
      if (!effectiveReferenceElement) {
        return;
      }
      if ("setAttribute" in effectiveReferenceElement) {
        effectiveReferenceElement.setAttribute(ARIA_EXPANDED, toAriaBoolean(open));
      }
    };
    this.addReferences = () => {
      const { effectiveReferenceElement } = this;
      if (!effectiveReferenceElement) {
        return;
      }
      const id = this.getId();
      if ("setAttribute" in effectiveReferenceElement) {
        effectiveReferenceElement.setAttribute(ARIA_CONTROLS, id);
      }
      manager.registerElement(effectiveReferenceElement, this.el);
      this.setExpandedAttr();
    };
    this.removeReferences = () => {
      const { effectiveReferenceElement } = this;
      if (!effectiveReferenceElement) {
        return;
      }
      if ("removeAttribute" in effectiveReferenceElement) {
        effectiveReferenceElement.removeAttribute(ARIA_CONTROLS);
        effectiveReferenceElement.removeAttribute(ARIA_EXPANDED);
      }
      manager.unregisterElement(effectiveReferenceElement);
    };
    this.hide = () => {
      this.open = false;
    };
    this.storeArrowEl = (el) => {
      this.arrowEl = el;
      this.reposition(true);
    };
  }
  handleDismissible(value) {
    this.closable = value;
  }
  handleClosable(value) {
    this.dismissible = value;
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements();
    this.reposition(true);
  }
  offsetDistanceOffsetHandler() {
    this.reposition(true);
  }
  offsetSkiddingHandler() {
    this.reposition(true);
  }
  openHandler(value) {
    if (value) {
      this.reposition(true);
    }
    else {
      updateAfterClose(this.el);
    }
    this.setExpandedAttr();
  }
  overlayPositioningHandler() {
    this.reposition(true);
  }
  placementHandler() {
    this.reposition(true);
  }
  referenceElementHandler() {
    this.setUpReferenceElement();
    this.reposition(true);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.setFilteredPlacements();
    connectOpenCloseComponent(this);
    const closable = this.closable || this.dismissible;
    if (closable) {
      this.handleDismissible(closable);
    }
    if (closable) {
      this.handleClosable(closable);
    }
    this.setUpReferenceElement(this.hasLoaded);
  }
  componentDidLoad() {
    if (this.referenceElement && !this.effectiveReferenceElement) {
      this.setUpReferenceElement();
    }
    this.reposition();
    this.hasLoaded = true;
  }
  disconnectedCallback() {
    this.removeReferences();
    disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
    disconnectOpenCloseComponent(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  async reposition(delayed = false) {
    const { el, effectiveReferenceElement, placement, overlayPositioning, disableFlip, filteredFlipPlacements, offsetDistance, offsetSkidding, arrowEl } = this;
    return reposition(this, {
      floatingEl: el,
      referenceEl: effectiveReferenceElement,
      overlayPositioning,
      placement,
      disableFlip,
      flipPlacements: filteredFlipPlacements,
      offsetDistance,
      offsetSkidding,
      includeArrow: !this.disablePointer,
      arrowEl,
      type: "popover"
    }, delayed);
  }
  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  async setFocus(focusId) {
    var _a;
    const { closeButtonEl } = this;
    if (focusId === "close-button" && closeButtonEl) {
      forceUpdate(closeButtonEl);
      closeButtonEl.setFocus();
      return;
    }
    (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
  }
  /**
   * Toggles the component's open property.
   *
   * @param value
   */
  async toggle(value = !this.open) {
    this.open = value;
  }
  getReferenceElement() {
    const { referenceElement, el } = this;
    return ((typeof referenceElement === "string"
      ? queryElementRoots(el, { id: referenceElement })
      : referenceElement) || null);
  }
  onBeforeOpen() {
    this.calcitePopoverBeforeOpen.emit();
  }
  onOpen() {
    this.calcitePopoverOpen.emit();
  }
  onBeforeClose() {
    this.calcitePopoverBeforeClose.emit();
  }
  onClose() {
    this.calcitePopoverClose.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderCloseButton() {
    const { closeButton, intlClose, heading, closable } = this;
    return closable || closeButton ? (h("div", { class: CSS.closeButtonContainer }, h("calcite-action", { class: CSS.closeButton, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), scale: heading ? "s" : "m", text: intlClose }, h("calcite-icon", { icon: "x", scale: heading ? "s" : "m" })))) : null;
  }
  renderHeader() {
    const { heading, headingLevel } = this;
    const headingNode = heading ? (h(Heading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    return headingNode ? (h("div", { class: CSS.header }, headingNode, this.renderCloseButton())) : null;
  }
  render() {
    const { effectiveReferenceElement, heading, label, open, disablePointer } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;
    const arrowNode = !disablePointer ? h("div", { class: CSS.arrow, ref: this.storeArrowEl }) : null;
    return (h(Host, { "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, h("div", { class: {
        [FloatingCSS.animation]: true,
        [FloatingCSS.animationActive]: displayed
      }, ref: this.setTransitionEl }, arrowNode, h("div", { class: {
        [CSS.hasHeader]: !!heading,
        [CSS.container]: true
      } }, this.renderHeader(), h("div", { class: CSS.content }, h("slot", null)), !heading ? this.renderCloseButton() : null))));
  }
  get el() { return this; }
  static get watchers() { return {
    "dismissible": ["handleDismissible"],
    "closable": ["handleClosable"],
    "flipPlacements": ["flipPlacementsHandler"],
    "offsetDistance": ["offsetDistanceOffsetHandler"],
    "offsetSkidding": ["offsetSkiddingHandler"],
    "open": ["openHandler"],
    "overlayPositioning": ["overlayPositioningHandler"],
    "placement": ["placementHandler"],
    "referenceElement": ["referenceElementHandler"]
  }; }
  static get style() { return popoverCss; }
}, [1, "calcite-popover", {
    "autoClose": [516, "auto-close"],
    "closeButton": [516, "close-button"],
    "dismissible": [1540],
    "closable": [1540],
    "disableFlip": [516, "disable-flip"],
    "disablePointer": [516, "disable-pointer"],
    "flipPlacements": [16],
    "heading": [1],
    "headingLevel": [514, "heading-level"],
    "label": [1],
    "offsetDistance": [514, "offset-distance"],
    "offsetSkidding": [514, "offset-skidding"],
    "open": [1540],
    "overlayPositioning": [513, "overlay-positioning"],
    "placement": [513],
    "referenceElement": [1, "reference-element"],
    "triggerDisabled": [516, "trigger-disabled"],
    "intlClose": [1, "intl-close"],
    "effectiveReferenceElement": [32],
    "reposition": [64],
    "setFocus": [64],
    "toggle": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-popover", "calcite-action", "calcite-icon", "calcite-loader"];
  components.forEach(tagName => { switch (tagName) {
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Popover);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { Popover as P, defineCustomElement as d };