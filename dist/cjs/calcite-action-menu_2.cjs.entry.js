/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const resources = require('./resources-2260d186.js');
const dom = require('./dom-4a580af6.js');
const array = require('./array-ace6d4b5.js');
const guid = require('./guid-84ac4d91.js');
const key = require('./key-55aca5c0.js');
const floatingUi = require('./floating-ui-7e3d7775.js');
const openCloseComponent = require('./openCloseComponent-bf986132.js');
const Heading = require('./Heading-c10b33b5.js');
require('./resources-b56bce71.js');
require('./debounce-69c3bada.js');

const actionMenuCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{box-sizing:border-box;display:flex;flex-direction:column;background-color:var(--calcite-ui-foreground-1);font-size:var(--calcite-font-size-1);color:var(--calcite-ui-text-2)}.menu ::slotted(calcite-action){margin:0.125rem;display:flex;outline-color:transparent}.menu ::slotted(calcite-action[active]){outline:2px solid var(--calcite-ui-brand);outline-offset:0px}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{flex-direction:column;flex-wrap:nowrap;outline:2px solid transparent;outline-offset:2px}";

const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const ActionMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteActionMenuOpenChange = index.createEvent(this, "calciteActionMenuOpenChange", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, the component is expanded.
     */
    this.expanded = false;
    /**
     * When `true`, the component is open.
     */
    this.open = false;
    /**
     * Determines the type of positioning to use for the overlaid content.
     *
     * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
     * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
     *
     */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the component will be positioned relative to the `referenceElement`.
     *
     * @see [LogicalPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/floating-ui.ts#L25)
     */
    this.placement = "auto";
    this.actionElements = [];
    this.guid = `calcite-action-menu-${guid.guid()}`;
    this.menuId = `${this.guid}-menu`;
    this.menuButtonId = `${this.guid}-menu-button`;
    this.activeMenuItemIndex = -1;
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    this.connectMenuButtonEl = () => {
      const { menuButtonId, menuId, open, label } = this;
      const menuButtonEl = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
      if (this.menuButtonEl === menuButtonEl) {
        return;
      }
      this.disconnectMenuButtonEl();
      this.menuButtonEl = menuButtonEl;
      this.setTooltipReferenceElement();
      if (!menuButtonEl) {
        return;
      }
      menuButtonEl.active = open;
      menuButtonEl.setAttribute("aria-controls", menuId);
      menuButtonEl.setAttribute("aria-expanded", dom.toAriaBoolean(open));
      menuButtonEl.setAttribute("aria-haspopup", "true");
      if (!menuButtonEl.id) {
        menuButtonEl.id = menuButtonId;
      }
      if (!menuButtonEl.label) {
        menuButtonEl.label = label;
      }
      if (!menuButtonEl.text) {
        menuButtonEl.text = label;
      }
      menuButtonEl.addEventListener("pointerdown", this.menuButtonClick);
      menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
    };
    this.disconnectMenuButtonEl = () => {
      const { menuButtonEl } = this;
      if (!menuButtonEl) {
        return;
      }
      menuButtonEl.removeEventListener("pointerdown", this.menuButtonClick);
      menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
    };
    this.setMenuButtonEl = (event) => {
      const actions = event.target
        .assignedElements({
        flatten: true
      })
        .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action"));
      this.slottedMenuButtonEl = actions[0];
      this.connectMenuButtonEl();
    };
    this.setDefaultMenuButtonEl = (el) => {
      this.defaultMenuButtonEl = el;
      this.connectMenuButtonEl();
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleCalciteActionClick = () => {
      this.open = false;
      this.setFocus();
    };
    this.menuButtonClick = (event) => {
      if (!dom.isPrimaryPointerButton(event)) {
        return;
      }
      this.toggleOpen();
    };
    this.updateTooltip = (event) => {
      const tooltips = event.target
        .assignedElements({
        flatten: true
      })
        .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-tooltip"));
      this.tooltipEl = tooltips[0];
      this.setTooltipReferenceElement();
    };
    this.setTooltipReferenceElement = () => {
      const { tooltipEl, expanded, menuButtonEl, open } = this;
      if (tooltipEl) {
        tooltipEl.referenceElement = !expanded && !open ? menuButtonEl : null;
      }
    };
    this.updateAction = (action, index) => {
      const { guid, activeMenuItemIndex } = this;
      const id = `${guid}-action-${index}`;
      action.tabIndex = -1;
      action.setAttribute("role", "menuitem");
      if (!action.id) {
        action.id = id;
      }
      action.active = index === activeMenuItemIndex;
    };
    this.updateActions = (actions) => {
      actions === null || actions === void 0 ? void 0 : actions.forEach(this.updateAction);
    };
    this.handleDefaultSlotChange = (event) => {
      const actions = event.target
        .assignedElements({
        flatten: true
      })
        .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action"));
      this.actionElements = actions;
    };
    this.menuButtonKeyDown = (event) => {
      const { key: key$1 } = event;
      const { actionElements, activeMenuItemIndex, open } = this;
      if (!actionElements.length) {
        return;
      }
      if (key.isActivationKey(key$1)) {
        event.preventDefault();
        if (!open) {
          this.toggleOpen();
          return;
        }
        const action = actionElements[activeMenuItemIndex];
        action ? action.click() : this.toggleOpen(false);
      }
      if (key$1 === "Tab") {
        this.open = false;
        return;
      }
      if (key$1 === "Escape") {
        this.toggleOpen(false);
        event.preventDefault();
        return;
      }
      this.handleActionNavigation(event, key$1, actionElements);
    };
    this.handleActionNavigation = (event, key, actions) => {
      if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!this.open) {
        this.toggleOpen();
        if (key === "Home" || key === "ArrowDown") {
          this.activeMenuItemIndex = 0;
        }
        if (key === "End" || key === "ArrowUp") {
          this.activeMenuItemIndex = actions.length - 1;
        }
        return;
      }
      if (key === "Home") {
        this.activeMenuItemIndex = 0;
      }
      if (key === "End") {
        this.activeMenuItemIndex = actions.length - 1;
      }
      const currentIndex = this.activeMenuItemIndex;
      if (key === "ArrowUp") {
        this.activeMenuItemIndex = array.getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
      }
      if (key === "ArrowDown") {
        this.activeMenuItemIndex = array.getRoundRobinIndex(currentIndex + 1, actions.length);
      }
    };
    this.toggleOpenEnd = () => {
      this.setFocus();
      this.el.removeEventListener("calcitePopoverOpen", this.toggleOpenEnd);
    };
    this.toggleOpen = (value = !this.open) => {
      this.el.addEventListener("calcitePopoverOpen", this.toggleOpenEnd);
      this.open = value;
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  disconnectedCallback() {
    this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = false;
    this.setTooltipReferenceElement();
  }
  openHandler(open) {
    this.activeMenuItemIndex = this.open ? 0 : -1;
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
    }
    this.calciteActionMenuOpenChange.emit(open);
    this.setTooltipReferenceElement();
  }
  closeCalciteActionMenuOnClick(event) {
    if (!dom.isPrimaryPointerButton(event)) {
      return;
    }
    const composedPath = event.composedPath();
    if (composedPath.includes(this.el)) {
      return;
    }
    this.open = false;
  }
  activeMenuItemIndexHandler() {
    this.updateActions(this.actionElements);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    dom.focusElement(this.menuButtonEl);
  }
  renderMenuButton() {
    const { label, scale, expanded } = this;
    const menuButtonSlot = (index.h("slot", { name: resources.SLOTS.trigger, onSlotchange: this.setMenuButtonEl }, index.h("calcite-action", { class: resources.CSS.defaultTrigger, icon: resources.ICONS.menu, ref: this.setDefaultMenuButtonEl, scale: scale, text: label, textEnabled: expanded })));
    return menuButtonSlot;
  }
  renderMenuItems() {
    const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning, flipPlacements } = this;
    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = (activeAction === null || activeAction === void 0 ? void 0 : activeAction.id) || null;
    return (index.h("calcite-popover", { disablePointer: true, flipPlacements: flipPlacements, label: label, offsetDistance: 0, open: open, overlayPositioning: overlayPositioning, placement: placement, referenceElement: menuButtonEl }, index.h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl === null || menuButtonEl === void 0 ? void 0 : menuButtonEl.id, class: resources.CSS.menu, id: menuId, onClick: this.handleCalciteActionClick, role: "menu", tabIndex: -1 }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
  }
  render() {
    return (index.h(index.Fragment, null, this.renderMenuButton(), this.renderMenuItems(), index.h("slot", { name: resources.SLOTS.tooltip, onSlotchange: this.updateTooltip })));
  }
  isValidKey(key, supportedKeys) {
    return !!supportedKeys.find((k) => k === key);
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"],
    "open": ["openHandler"],
    "activeMenuItemIndex": ["activeMenuItemIndexHandler"]
  }; }
};
ActionMenu.style = actionMenuCss;

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
      if (event.defaultPrevented || !key.isActivationKey(event.key)) {
        return;
      }
      this.togglePopovers(event);
    };
    this.clickHandler = (event) => {
      if (dom.isPrimaryPointerButton(event)) {
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
const Popover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calcitePopoverBeforeClose = index.createEvent(this, "calcitePopoverBeforeClose", 6);
    this.calcitePopoverClose = index.createEvent(this, "calcitePopoverClose", 6);
    this.calcitePopoverBeforeOpen = index.createEvent(this, "calcitePopoverBeforeOpen", 6);
    this.calcitePopoverOpen = index.createEvent(this, "calcitePopoverOpen", 6);
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
    this.offsetDistance = floatingUi.defaultOffsetDistance;
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
    this.guid = `calcite-popover-${guid.guid()}`;
    this.openTransitionProp = "opacity";
    this.hasLoaded = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setTransitionEl = (el) => {
      this.transitionEl = el;
      openCloseComponent.connectOpenCloseComponent(this);
    };
    this.setFilteredPlacements = () => {
      const { el, flipPlacements } = this;
      this.filteredFlipPlacements = flipPlacements
        ? floatingUi.filterComputedPlacements(flipPlacements, el)
        : null;
    };
    this.setUpReferenceElement = (warn = true) => {
      this.removeReferences();
      this.effectiveReferenceElement = this.getReferenceElement();
      floatingUi.connectFloatingUI(this, this.effectiveReferenceElement, this.el);
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
        effectiveReferenceElement.setAttribute(ARIA_EXPANDED, dom.toAriaBoolean(open));
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
      floatingUi.updateAfterClose(this.el);
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
    openCloseComponent.connectOpenCloseComponent(this);
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
    floatingUi.disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
    openCloseComponent.disconnectOpenCloseComponent(this);
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
    return floatingUi.reposition(this, {
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
      index.forceUpdate(closeButtonEl);
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
      ? dom.queryElementRoots(el, { id: referenceElement })
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
    return closable || closeButton ? (index.h("div", { class: CSS.closeButtonContainer }, index.h("calcite-action", { class: CSS.closeButton, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), scale: heading ? "s" : "m", text: intlClose }, index.h("calcite-icon", { icon: "x", scale: heading ? "s" : "m" })))) : null;
  }
  renderHeader() {
    const { heading, headingLevel } = this;
    const headingNode = heading ? (index.h(Heading.Heading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    return headingNode ? (index.h("div", { class: CSS.header }, headingNode, this.renderCloseButton())) : null;
  }
  render() {
    const { effectiveReferenceElement, heading, label, open, disablePointer } = this;
    const displayed = effectiveReferenceElement && open;
    const hidden = !displayed;
    const arrowNode = !disablePointer ? index.h("div", { class: CSS.arrow, ref: this.storeArrowEl }) : null;
    return (index.h(index.Host, { "aria-hidden": dom.toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, index.h("div", { class: {
        [floatingUi.FloatingCSS.animation]: true,
        [floatingUi.FloatingCSS.animationActive]: displayed
      }, ref: this.setTransitionEl }, arrowNode, index.h("div", { class: {
        [CSS.hasHeader]: !!heading,
        [CSS.container]: true
      } }, this.renderHeader(), index.h("div", { class: CSS.content }, index.h("slot", null)), !heading ? this.renderCloseButton() : null))));
  }
  get el() { return index.getElement(this); }
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
};
Popover.style = popoverCss;

exports.calcite_action_menu = ActionMenu;
exports.calcite_popover = Popover;
