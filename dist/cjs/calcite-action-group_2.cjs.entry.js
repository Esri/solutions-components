/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const resources = require('./resources-2a9862c7.js');
const dom = require('./dom-4a580af6.js');
const resources$1 = require('./resources-2260d186.js');
const conditionalSlot = require('./conditionalSlot-baada7a3.js');
const array = require('./array-ace6d4b5.js');
const guid = require('./guid-84ac4d91.js');
const key = require('./key-55aca5c0.js');
require('./resources-b56bce71.js');
require('./observers-5311faf8.js');

const actionGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:flex;flex-direction:column;padding:0px;--calcite-action-group-columns:3}:host([columns=\"1\"]){--calcite-action-group-columns:1}:host([columns=\"2\"]){--calcite-action-group-columns:2}:host([columns=\"3\"]){--calcite-action-group-columns:3}:host([columns=\"4\"]){--calcite-action-group-columns:4}:host([columns=\"5\"]){--calcite-action-group-columns:5}:host([columns=\"6\"]){--calcite-action-group-columns:6}:host(:first-child){-webkit-padding-before:0px;padding-block-start:0px}:host([layout=horizontal]){flex-direction:row}:host([layout=grid]){display:grid;place-content:stretch;gap:1px;background-color:var(--calcite-ui-background);padding:1px;grid-template-columns:repeat(var(--calcite-action-group-columns), auto)}";

const ActionGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
     * Indicates the layout of the component.
     */
    this.layout = "vertical";
    /**
     * When `true`, the `calcite-action-menu` is open.
     */
    this.menuOpen = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setMenuOpen = (event) => {
      this.menuOpen = !!event.detail;
    };
  }
  expandedHandler() {
    this.menuOpen = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    conditionalSlot.connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    conditionalSlot.disconnectConditionalSlotComponent(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderTooltip() {
    const { el } = this;
    const hasTooltip = dom.getSlotted(el, resources.SLOTS.menuTooltip);
    return hasTooltip ? index.h("slot", { name: resources.SLOTS.menuTooltip, slot: resources$1.SLOTS.tooltip }) : null;
  }
  renderMenu() {
    const { el, expanded, intlMore, menuOpen, scale, layout } = this;
    const hasMenuItems = dom.getSlotted(el, resources.SLOTS.menuActions);
    return hasMenuItems ? (index.h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], label: intlMore || resources.TEXT.more, onCalciteActionMenuOpenChange: this.setMenuOpen, open: menuOpen, placement: layout === "horizontal" ? "bottom-leading" : "leading-start", scale: scale }, index.h("calcite-action", { icon: resources.ICONS.menu, scale: scale, slot: resources$1.SLOTS.trigger, text: intlMore || resources.TEXT.more, textEnabled: expanded }), index.h("slot", { name: resources.SLOTS.menuActions }), this.renderTooltip())) : null;
  }
  render() {
    return (index.h(index.Fragment, null, index.h("slot", null), this.renderMenu()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"]
  }; }
};
ActionGroup.style = actionGroupCss;

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
    const menuButtonSlot = (index.h("slot", { name: resources$1.SLOTS.trigger, onSlotchange: this.setMenuButtonEl }, index.h("calcite-action", { class: resources$1.CSS.defaultTrigger, icon: resources$1.ICONS.menu, ref: this.setDefaultMenuButtonEl, scale: scale, text: label, textEnabled: expanded })));
    return menuButtonSlot;
  }
  renderMenuItems() {
    const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning, flipPlacements } = this;
    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = (activeAction === null || activeAction === void 0 ? void 0 : activeAction.id) || null;
    return (index.h("calcite-popover", { disablePointer: true, flipPlacements: flipPlacements, label: label, offsetDistance: 0, open: open, overlayPositioning: overlayPositioning, placement: placement, referenceElement: menuButtonEl }, index.h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl === null || menuButtonEl === void 0 ? void 0 : menuButtonEl.id, class: resources$1.CSS.menu, id: menuId, onClick: this.handleCalciteActionClick, role: "menu", tabIndex: -1 }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
  }
  render() {
    return (index.h(index.Fragment, null, this.renderMenuButton(), this.renderMenuItems(), index.h("slot", { name: resources$1.SLOTS.tooltip, onSlotchange: this.updateTooltip })));
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

exports.calcite_action_group = ActionGroup;
exports.calcite_action_menu = ActionMenu;
