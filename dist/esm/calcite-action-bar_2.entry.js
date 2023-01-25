/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-09deaa39.js';
import { t as toggleChildActionText, o as overflowActionsDebounceInMs, q as queryActions, g as geActionDimensions, a as overflowActions, E as ExpandToggle, b as getOverflowCount } from './ExpandToggle-44138042.js';
import { f as focusElement, a as getSlotted, i as isPrimaryPointerButton, q as queryElementRoots, t as toAriaBoolean } from './dom-3bdc69ee.js';
import { c as createObserver } from './observers-31601001.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-e96b0a4f.js';
import { d as debounce } from './debounce-4c884e5c.js';
import { g as guid } from './guid-15fce7c0.js';
import { b as defaultOffsetDistance, c as connectFloatingUI, u as updateAfterClose, a as disconnectFloatingUI, r as reposition, F as FloatingCSS } from './floating-ui-6010f963.js';
import './resources-d60362c3.js';
import './resources-3d641588.js';
import './resources-436ae282.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS$1 = {
  actionGroupBottom: "action-group--bottom"
};
const SLOTS = {
  bottomActions: "bottom-actions",
  expandTooltip: "expand-tooltip"
};
const TEXT = {
  expand: "Expand",
  collapse: "Collapse"
};

const actionBarCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{pointer-events:auto;display:inline-flex;align-self:stretch;background:transparent;--calcite-action-bar-expanded-max-width:auto}:host([layout=vertical]){flex-direction:column}:host([layout=horizontal]){flex-direction:row}:host([layout=vertical][overflow-actions-disabled]){overflow-y:auto}:host([layout=horizontal][overflow-actions-disabled]){overflow-x:auto}:host([layout=vertical][expanded]){max-inline-size:var(--calcite-action-bar-expanded-max-width)}::slotted(calcite-action-group){border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-width:0px;border-inline-end-width:1px;border-style:solid}::slotted(calcite-action-group:last-child){border-block-end-width:0px;border-inline-end-width:0px}.action-group--bottom{flex-grow:1;justify-content:flex-end;-webkit-padding-after:0px;padding-block-end:0px;-webkit-padding-end:0px;padding-inline-end:0px}";

const ActionBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteActionBarToggle = createEvent(this, "calciteActionBarToggle", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, the expand-toggling behavior is disabled.
     */
    this.expandDisabled = false;
    /**
     * When `true`, the component is expanded.
     */
    this.expanded = false;
    /**
     *  The layout direction of the actions.
     */
    this.layout = "vertical";
    /**
     * Disables automatically overflowing `calcite-action`s that won't fit into menus.
     */
    this.overflowActionsDisabled = false;
    this.mutationObserver = createObserver("mutation", () => {
      const { el, expanded } = this;
      toggleChildActionText({ parent: el, expanded });
      this.conditionallyOverflowActions();
    });
    this.resizeObserver = createObserver("resize", (entries) => this.resizeHandlerEntries(entries));
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.actionMenuOpenChangeHandler = (event) => {
      if (event.detail) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.resizeHandlerEntries = (entries) => {
      entries.forEach(this.resizeHandler);
    };
    this.resizeHandler = (entry) => {
      const { width, height } = entry.contentRect;
      this.resize({ width, height });
    };
    this.resize = debounce(({ width, height }) => {
      const { el, expanded, expandDisabled, layout } = this;
      if ((layout === "vertical" && !height) || (layout === "horizontal" && !width)) {
        return;
      }
      const actions = queryActions(el);
      const actionCount = expandDisabled ? actions.length : actions.length + 1;
      const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
      const groupCount = getSlotted(el, SLOTS.bottomActions) || !expandDisabled
        ? actionGroups.length + 1
        : actionGroups.length;
      const { actionHeight, actionWidth } = geActionDimensions(actions);
      const overflowCount = getOverflowCount({
        layout,
        actionCount,
        actionHeight,
        actionWidth,
        height,
        width,
        groupCount
      });
      overflowActions({
        actionGroups,
        expanded,
        overflowCount
      });
    }, overflowActionsDebounceInMs);
    this.conditionallyOverflowActions = () => {
      if (!this.overflowActionsDisabled) {
        this.overflowActions();
      }
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
      this.calciteActionBarToggle.emit();
    };
    this.setExpandToggleRef = (el) => {
      this.expandToggleEl = el;
    };
  }
  expandHandler() {
    this.conditionallyOverflowActions();
  }
  expandedHandler(expanded) {
    toggleChildActionText({ parent: this.el, expanded });
    this.conditionallyOverflowActions();
  }
  overflowDisabledHandler(overflowActionsDisabled) {
    overflowActionsDisabled
      ? this.resizeObserver.disconnect()
      : this.resizeObserver.observe(this.el);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentDidLoad() {
    this.conditionallyOverflowActions();
  }
  connectedCallback() {
    var _a, _b;
    const { el, expanded } = this;
    toggleChildActionText({ parent: el, expanded });
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(el, { childList: true, subtree: true });
    if (!this.overflowActionsDisabled) {
      (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.observe(el);
    }
    this.conditionallyOverflowActions();
    connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    var _a, _b;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
    disconnectConditionalSlotComponent(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Overflows actions that won't fit into menus.
   *
   * @internal
   */
  async overflowActions() {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }
  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  async setFocus(focusId) {
    var _a;
    if (focusId === "expand-toggle") {
      await focusElement(this.expandToggleEl);
      return;
    }
    (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, intlExpand, intlCollapse, el, position, toggleExpand, scale, layout } = this;
    const tooltip = getSlotted(el, SLOTS.expandTooltip);
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const expandToggleNode = !expandDisabled ? (h(ExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, ref: this.setExpandToggleRef, scale: scale, toggle: toggleExpand, tooltip: tooltip })) : null;
    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (h("calcite-action-group", { class: CSS$1.actionGroupBottom, layout: layout, scale: scale }, h("slot", { name: SLOTS.bottomActions }), h("slot", { name: SLOTS.expandTooltip }), expandToggleNode)) : null;
  }
  render() {
    return (h(Host, { onCalciteActionMenuOpenChange: this.actionMenuOpenChangeHandler }, h("slot", null), this.renderBottomActionGroup()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expandDisabled": ["expandHandler"],
    "expanded": ["expandedHandler"],
    "overflowActionsDisabled": ["overflowDisabledHandler"]
  }; }
};
ActionBar.style = actionBarCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  arrow: "arrow"
};
const TOOLTIP_DELAY_MS = 500;
const ARIA_DESCRIBED_BY = "aria-describedby";

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
class TooltipManager {
  constructor() {
    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------
    this.registeredElements = new WeakMap();
    this.hoverTimeouts = new WeakMap();
    this.registeredElementCount = 0;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.queryTooltip = (composedPath) => {
      const { registeredElements } = this;
      const registeredElement = composedPath.find((pathEl) => registeredElements.has(pathEl));
      return registeredElements.get(registeredElement);
    };
    this.keyDownHandler = (event) => {
      if (event.key === "Escape") {
        const { activeTooltipEl } = this;
        if (activeTooltipEl) {
          this.clearHoverTimeout(activeTooltipEl);
          this.toggleTooltip(activeTooltipEl, false);
        }
      }
    };
    this.mouseEnterShow = (event) => {
      this.hoverEvent(event, true);
    };
    this.mouseLeaveHide = (event) => {
      this.hoverEvent(event, false);
    };
    this.clickHandler = (event) => {
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      const clickedTooltip = this.queryTooltip(event.composedPath());
      this.clickedTooltip = clickedTooltip;
      if (clickedTooltip === null || clickedTooltip === void 0 ? void 0 : clickedTooltip.closeOnClick) {
        this.toggleTooltip(clickedTooltip, false);
        this.clearHoverTimeout(clickedTooltip);
      }
    };
    this.focusShow = (event) => {
      this.focusEvent(event, true);
    };
    this.blurHide = (event) => {
      this.focusEvent(event, false);
    };
    this.hoverToggle = (tooltip, value) => {
      const { hoverTimeouts } = this;
      hoverTimeouts.delete(tooltip);
      if (value) {
        this.closeExistingTooltip();
      }
      this.toggleTooltip(tooltip, value);
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  registerElement(referenceEl, tooltip) {
    this.registeredElementCount++;
    this.registeredElements.set(referenceEl, tooltip);
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
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("pointerover", this.mouseEnterShow, { capture: true });
    document.addEventListener("pointerout", this.mouseLeaveHide, { capture: true });
    document.addEventListener("pointerdown", this.clickHandler, { capture: true });
    document.addEventListener("focusin", this.focusShow, { capture: true });
    document.addEventListener("focusout", this.blurHide, { capture: true });
  }
  removeListeners() {
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("pointerover", this.mouseEnterShow, { capture: true });
    document.removeEventListener("pointerout", this.mouseLeaveHide, { capture: true });
    document.removeEventListener("pointerdown", this.clickHandler, { capture: true });
    document.removeEventListener("focusin", this.focusShow, { capture: true });
    document.removeEventListener("focusout", this.blurHide, { capture: true });
  }
  clearHoverTimeout(tooltip) {
    const { hoverTimeouts } = this;
    if (hoverTimeouts.has(tooltip)) {
      window.clearTimeout(hoverTimeouts.get(tooltip));
      hoverTimeouts.delete(tooltip);
    }
  }
  closeExistingTooltip() {
    const { activeTooltipEl } = this;
    if (activeTooltipEl) {
      this.toggleTooltip(activeTooltipEl, false);
    }
  }
  focusTooltip(tooltip, value) {
    this.closeExistingTooltip();
    if (value) {
      this.clearHoverTimeout(tooltip);
    }
    this.toggleTooltip(tooltip, value);
  }
  toggleTooltip(tooltip, value) {
    tooltip.open = value;
    if (value) {
      this.activeTooltipEl = tooltip;
    }
  }
  hoverTooltip(tooltip, value) {
    this.clearHoverTimeout(tooltip);
    const { hoverTimeouts } = this;
    const timeoutId = window.setTimeout(() => this.hoverToggle(tooltip, value), TOOLTIP_DELAY_MS );
    hoverTimeouts.set(tooltip, timeoutId);
  }
  activeTooltipHover(event) {
    const { activeTooltipEl, hoverTimeouts } = this;
    const { type } = event;
    if (!activeTooltipEl) {
      return;
    }
    if (type === "pointerover" && event.composedPath().includes(activeTooltipEl)) {
      this.clearHoverTimeout(activeTooltipEl);
    }
    else if (type === "pointerout" && !hoverTimeouts.has(activeTooltipEl)) {
      this.hoverTooltip(activeTooltipEl, false);
    }
  }
  hoverEvent(event, value) {
    const tooltip = this.queryTooltip(event.composedPath());
    this.activeTooltipHover(event);
    if (!tooltip) {
      return;
    }
    this.hoverTooltip(tooltip, value);
  }
  focusEvent(event, value) {
    const tooltip = this.queryTooltip(event.composedPath());
    if (!tooltip || tooltip === this.clickedTooltip) {
      this.clickedTooltip = null;
      return;
    }
    this.focusTooltip(tooltip, value);
  }
}

const tooltipCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{transform:translateY(-5px)}:host([data-placement^=top]) .calcite-floating-ui-anim{transform:translateY(5px)}:host([data-placement^=left]) .calcite-floating-ui-anim{transform:translateX(5px)}:host([data-placement^=right]) .calcite-floating-ui-anim{transform:translateX(-5px)}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.arrow,.arrow::before{position:absolute;inline-size:8px;block-size:8px;z-index:-1}.arrow::before{content:\"\";--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-placement^=top]) .arrow{inset-block-end:-4px}:host([data-placement^=bottom]) .arrow{inset-block-start:-4px}:host([data-placement^=left]) .arrow{direction:ltr;inset-inline-end:-4px}:host([data-placement^=right]) .arrow{direction:ltr;inset-inline-start:-4px}.container{position:relative;overflow:hidden;border-radius:0.25rem;background-color:var(--calcite-ui-foreground-1);padding-block:0.75rem;padding-inline:1rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);max-inline-size:20rem;max-block-size:20rem;text-align:start}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);background-color:var(--calcite-ui-foreground-1)}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}";

const manager = new TooltipManager();
const Tooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** Closes the component when the `referenceElement` is clicked. */
    this.closeOnClick = false;
    /**
     * Offset the position of the component away from the `referenceElement`.
     *
     * @default 6
     */
    this.offsetDistance = defaultOffsetDistance;
    /**
     * Offset the position of the component along the `referenceElement`.
     */
    this.offsetSkidding = 0;
    /**
     * When `true`, the component is open.
     */
    this.open = false;
    /**
     * Determines the type of positioning to use for the overlaid content.
     *
     * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
     *
     * The `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
     *
     */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the component will be positioned relative to the `referenceElement`.
     *
     * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
     */
    this.placement = "auto";
    this.guid = `calcite-tooltip-${guid()}`;
    this.hasLoaded = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
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
    this.addReferences = () => {
      const { effectiveReferenceElement } = this;
      if (!effectiveReferenceElement) {
        return;
      }
      const id = this.getId();
      if ("setAttribute" in effectiveReferenceElement) {
        effectiveReferenceElement.setAttribute(ARIA_DESCRIBED_BY, id);
      }
      manager.registerElement(effectiveReferenceElement, this.el);
    };
    this.removeReferences = () => {
      const { effectiveReferenceElement } = this;
      if (!effectiveReferenceElement) {
        return;
      }
      if ("removeAttribute" in effectiveReferenceElement) {
        effectiveReferenceElement.removeAttribute(ARIA_DESCRIBED_BY);
      }
      manager.unregisterElement(effectiveReferenceElement);
    };
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
  }
  overlayPositioningHandler() {
    this.reposition(true);
  }
  placementHandler() {
    this.reposition(true);
  }
  referenceElementHandler() {
    this.setUpReferenceElement();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.setUpReferenceElement(this.hasLoaded);
  }
  componentDidLoad() {
    if (this.referenceElement && !this.effectiveReferenceElement) {
      this.setUpReferenceElement();
    }
    this.reposition(true);
    this.hasLoaded = true;
  }
  disconnectedCallback() {
    this.removeReferences();
    disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
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
    const { el, effectiveReferenceElement, placement, overlayPositioning, offsetDistance, offsetSkidding, arrowEl } = this;
    return reposition(this, {
      floatingEl: el,
      referenceEl: effectiveReferenceElement,
      overlayPositioning,
      placement,
      offsetDistance,
      offsetSkidding,
      includeArrow: true,
      arrowEl,
      type: "tooltip"
    }, delayed);
  }
  getReferenceElement() {
    const { referenceElement, el } = this;
    return ((typeof referenceElement === "string"
      ? queryElementRoots(el, { id: referenceElement })
      : referenceElement) || null);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { effectiveReferenceElement, label, open } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;
    return (h(Host, { "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "tooltip" }, h("div", { class: {
        [FloatingCSS.animation]: true,
        [FloatingCSS.animationActive]: displayed
      } }, h("div", { class: CSS.arrow, ref: (arrowEl) => (this.arrowEl = arrowEl) }), h("div", { class: CSS.container }, h("slot", null)))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "offsetDistance": ["offsetDistanceOffsetHandler"],
    "offsetSkidding": ["offsetSkiddingHandler"],
    "open": ["openHandler"],
    "overlayPositioning": ["overlayPositioningHandler"],
    "placement": ["placementHandler"],
    "referenceElement": ["referenceElementHandler"]
  }; }
};
Tooltip.style = tooltipCss;

export { ActionBar as calcite_action_bar, Tooltip as calcite_tooltip };
