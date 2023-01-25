/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, g as getElement } from './index-09deaa39.js';
import { S as SLOTS$1, C as CSS$1, I as ICONS, T as TEXT, H as HEADING_LEVEL } from './resources-9eb63965.js';
import { b as getElementDir, t as toAriaBoolean, a as getSlotted } from './dom-3bdc69ee.js';
import { H as Heading } from './Heading-18b8d999.js';
import { S as SLOTS$2 } from './resources-d60362c3.js';
import { u as updateHostInteraction } from './interactive-822ffed6.js';
import { c as createObserver } from './observers-31601001.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-e96b0a4f.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';

const panelCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3);--calcite-panel-max-height:unset;--calcite-panel-width:100%;--calcite-panel-min-width:unset;--calcite-panel-max-width:unset}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-ui-text-2);color:var(--calcite-ui-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.container{margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-ui-background);padding:0px;max-block-size:var(--calcite-panel-max-height);inline-size:var(--calcite-panel-width);max-inline-size:var(--calcite-panel-max-width);min-inline-size:var(--calcite-panel-min-width);transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}:host([height-scale=s]){--calcite-panel-max-height:40vh}:host([height-scale=m]){--calcite-panel-max-height:60vh}:host([height-scale=l]){--calcite-panel-max-height:80vh}:host([width-scale=s]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}.container[hidden]{display:none}.header{-webkit-border-after:1px solid;border-block-end:1px solid;position:sticky;inset-block-start:0px;z-index:400;inline-size:100%;align-items:stretch;justify-content:flex-start;background-color:var(--calcite-ui-foreground-1);border-block-end-color:var(--calcite-ui-border-3);flex:0 0 auto}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;-webkit-margin-end:auto;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium)}.header-content .heading:only-child{-webkit-margin-after:0px;margin-block-end:0px}.header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{-webkit-margin-start:auto;margin-inline-start:auto}.content-wrapper{overflow:auto}.content-height{block-size:100%}.content-container{display:flex;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;background-color:var(--calcite-ui-background)}.footer{-webkit-border-before:1px solid;border-block-start:1px solid;position:sticky;inset-block-end:0px;display:flex;inline-size:100%;justify-content:space-evenly;background-color:var(--calcite-ui-foreground-1);border-block-start-color:var(--calcite-ui-border-3);flex:0 0 auto;min-block-size:3rem;padding:0.5rem}.fab-container{position:sticky;inset-block-end:0px;z-index:300;margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}[hidden]{display:none}";

const Panel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calcitePanelClose = createEvent(this, "calcitePanelClose", 6);
    this.calcitePanelDismiss = createEvent(this, "calcitePanelDismiss", 6);
    this.calcitePanelDismissedChange = createEvent(this, "calcitePanelDismissedChange", 6);
    this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 6);
    this.calcitePanelBackClick = createEvent(this, "calcitePanelBackClick", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, hides the component.
     *
     * @deprecated use `closed` instead.
     */
    this.dismissed = false;
    /** When `true`, the component will be hidden. */
    this.closed = false;
    /**
     *  When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * When `true`, a close button is added to the component.
     *
     * @deprecated use `closable` instead
     */
    this.dismissible = false;
    /** When `true`, displays a close button in the trailing side of the header. */
    this.closable = false;
    /**
     * When `true`, displays a back button in the header.
     *
     * @deprecated use `calcite-flow-item` instead.
     */
    this.showBackButton = false;
    /**
     * When `true`, a busy indicator is displayed.
     */
    this.loading = false;
    /**
     * When `true`, the action menu items in the `header-menu-actions` slot are open.
     */
    this.menuOpen = false;
    this.resizeObserver = createObserver("resize", () => this.resizeHandler());
    this.hasStartActions = false;
    this.hasEndActions = false;
    this.hasMenuItems = false;
    this.hasHeaderContent = false;
    this.hasFooterContent = false;
    this.hasFooterActions = false;
    this.hasFab = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.resizeHandler = () => {
      const { panelScrollEl } = this;
      if (!panelScrollEl ||
        typeof panelScrollEl.scrollHeight !== "number" ||
        typeof panelScrollEl.offsetHeight !== "number") {
        return;
      }
      panelScrollEl.tabIndex = panelScrollEl.scrollHeight > panelScrollEl.offsetHeight ? 0 : -1;
    };
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.setCloseRef = (node) => {
      this.closeButtonEl = node;
    };
    this.setBackRef = (node) => {
      this.backButtonEl = node;
    };
    this.panelKeyDownHandler = (event) => {
      if (this.closable && event.key === "Escape" && !event.defaultPrevented) {
        this.close();
        event.preventDefault();
      }
    };
    this.close = () => {
      this.closed = true;
      this.calcitePanelDismiss.emit();
      this.calcitePanelClose.emit();
    };
    this.panelScrollHandler = () => {
      this.calcitePanelScroll.emit();
    };
    this.backButtonClick = () => {
      this.calcitePanelBackClick.emit();
    };
    this.handleHeaderActionsStartSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasStartActions = !!elements.length;
    };
    this.handleHeaderActionsEndSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasEndActions = !!elements.length;
    };
    this.handleHeaderMenuActionsSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasMenuItems = !!elements.length;
    };
    this.handleHeaderContentSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasHeaderContent = !!elements.length;
    };
    this.handleFooterSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasFooterContent = !!elements.length;
    };
    this.handleFooterActionsSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasFooterActions = !!elements.length;
    };
    this.handleFabSlotChange = (event) => {
      const elements = event.target.assignedElements({
        flatten: true
      });
      this.hasFab = !!elements.length;
    };
    this.setPanelScrollEl = (el) => {
      var _a, _b;
      this.panelScrollEl = el;
      (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
      if (el) {
        (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.observe(el);
        this.resizeHandler();
      }
    };
  }
  dismissedHandler(value) {
    this.closed = value;
    this.calcitePanelDismissedChange.emit();
  }
  closedHandler(value) {
    this.dismissed = value;
  }
  dismissibleHandler(value) {
    this.closable = value;
  }
  closableHandler(value) {
    this.dismissible = value;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidRender() {
    updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    const isClosed = this.dismissed || this.closed;
    const isClosable = this.dismissible || this.closable;
    if (isClosed) {
      this.dismissedHandler(isClosed);
      this.closedHandler(isClosed);
    }
    if (isClosable) {
      this.dismissibleHandler(isClosable);
      this.closableHandler(isClosable);
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  async setFocus(focusId) {
    const { backButtonEl, closeButtonEl, containerEl } = this;
    if (focusId === "back-button") {
      backButtonEl === null || backButtonEl === void 0 ? void 0 : backButtonEl.setFocus();
      return;
    }
    if (focusId === "dismiss-button") {
      closeButtonEl === null || closeButtonEl === void 0 ? void 0 : closeButtonEl.setFocus();
      return;
    }
    if (backButtonEl) {
      backButtonEl.setFocus();
      return;
    }
    if (closeButtonEl) {
      closeButtonEl.setFocus();
      return;
    }
    containerEl === null || containerEl === void 0 ? void 0 : containerEl.focus();
  }
  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options
   */
  async scrollContentTo(options) {
    var _a;
    (_a = this.panelScrollEl) === null || _a === void 0 ? void 0 : _a.scrollTo(options);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS$1.backButton, icon: icon, key: "back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: SLOTS$1.headerActionsStart, text: label })) : null;
  }
  renderHeaderContent() {
    const { heading, headingLevel, summary, description, hasHeaderContent } = this;
    const headingNode = heading ? (h(Heading, { class: CSS$1.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    const descriptionNode = description || summary ? h("span", { class: CSS$1.description }, description || summary) : null;
    return !hasHeaderContent && (headingNode || descriptionNode) ? (h("div", { class: CSS$1.headerContent, key: "header-content" }, headingNode, descriptionNode)) : null;
  }
  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent() {
    return (h("div", { class: CSS$1.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, h("slot", { name: SLOTS$1.headerContent, onSlotchange: this.handleHeaderContentSlotChange })));
  }
  renderHeaderStartActions() {
    const { hasStartActions } = this;
    return (h("div", { class: { [CSS$1.headerActionsStart]: true, [CSS$1.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, h("slot", { name: SLOTS$1.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange })));
  }
  renderHeaderActionsEnd() {
    const { close, hasEndActions, intlClose, closable } = this;
    const text = intlClose || TEXT.close;
    const closableNode = closable ? (h("calcite-action", { "aria-label": text, icon: ICONS.close, onClick: close, ref: this.setCloseRef, text: text })) : null;
    const slotNode = (h("slot", { name: SLOTS$1.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange }));
    const showContainer = hasEndActions || closableNode;
    return (h("div", { class: { [CSS$1.headerActionsEnd]: true, [CSS$1.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, closableNode));
  }
  renderMenu() {
    const { hasMenuItems, intlOptions, menuOpen } = this;
    return (h("calcite-action-menu", { flipPlacements: ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: intlOptions || TEXT.options, open: menuOpen, placement: "bottom-end" }, h("calcite-action", { icon: ICONS.menu, slot: SLOTS$2.trigger, text: intlOptions || TEXT.options }), h("slot", { name: SLOTS$1.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange })));
  }
  renderHeaderNode() {
    const { showBackButton, hasHeaderContent, hasStartActions, hasEndActions, closable, hasMenuItems } = this;
    const headerContentNode = this.renderHeaderContent();
    const showHeader = showBackButton ||
      hasHeaderContent ||
      headerContentNode ||
      hasStartActions ||
      hasEndActions ||
      closable ||
      hasMenuItems;
    return (h("header", { class: CSS$1.header, hidden: !showHeader }, this.renderBackButton(), this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd(), this.renderMenu()));
  }
  renderFooterNode() {
    const { hasFooterContent, hasFooterActions } = this;
    const showFooter = hasFooterContent || hasFooterActions;
    return (h("footer", { class: CSS$1.footer, hidden: !showFooter }, h("slot", { key: "footer-slot", name: SLOTS$1.footer, onSlotchange: this.handleFooterSlotChange }), h("slot", { key: "footer-actions-slot", name: SLOTS$1.footerActions, onSlotchange: this.handleFooterActionsSlotChange })));
  }
  renderContent() {
    const { hasFab } = this;
    const defaultSlotNode = h("slot", { key: "default-slot" });
    const containerNode = hasFab ? (h("section", { class: CSS$1.contentContainer }, defaultSlotNode)) : (defaultSlotNode);
    return (h("div", { class: {
        [CSS$1.contentWrapper]: true,
        [CSS$1.contentContainer]: !hasFab,
        [CSS$1.contentHeight]: hasFab
      }, onScroll: this.panelScrollHandler, ref: this.setPanelScrollEl }, containerNode, this.renderFab()));
  }
  renderFab() {
    return (h("div", { class: CSS$1.fabContainer, hidden: !this.hasFab }, h("slot", { name: SLOTS$1.fab, onSlotchange: this.handleFabSlotChange })));
  }
  render() {
    const { loading, panelKeyDownHandler, closed, closable } = this;
    const panelNode = (h("article", { "aria-busy": toAriaBoolean(loading), class: CSS$1.container, hidden: closed, onKeyDown: panelKeyDownHandler, ref: this.setContainerRef, tabIndex: closable ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderFooterNode()));
    return (h(Fragment, null, loading ? h("calcite-scrim", { loading: loading }) : null, panelNode));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "dismissed": ["dismissedHandler"],
    "closed": ["closedHandler"],
    "dismissible": ["dismissibleHandler"],
    "closable": ["closableHandler"]
  }; }
};
Panel.style = panelCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  main: "main",
  mainReversed: "main--reversed",
  content: "content",
  contentBehind: "content--behind",
  footer: "footer"
};
const SLOTS = {
  centerRow: "center-row",
  primaryPanel: "primary-panel",
  contextualPanel: "contextual-panel",
  panelStart: "panel-start",
  panelEnd: "panel-end",
  header: "header",
  footer: "footer"
};

const shellCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:absolute;inset:0px;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.main--reversed{flex-direction:row-reverse}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0px;border-width:0px;z-index:calc(1 - 1);display:initial}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-end]::slotted(calcite-shell-panel){-webkit-margin-start:auto;margin-inline-start:auto}::slotted(calcite-shell-panel),::slotted(calcite-shell-center-row){position:relative;z-index:1}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-ui-border-3)}::slotted(calcite-tip-manager){position:absolute;z-index:500;box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);inset-block-end:0.5rem;inset-inline:var(--calcite-shell-tip-spacing)}";

const Shell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Positions the center content behind any `calcite-shell-panel`s.
     */
    this.contentBehind = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const hasHeader = !!getSlotted(this.el, SLOTS.header);
    return hasHeader ? h("slot", { key: "header", name: SLOTS.header }) : null;
  }
  renderContent() {
    const defaultSlotNode = h("slot", { key: "default-slot" });
    const centerRowSlotNode = h("slot", { key: "center-row-slot", name: SLOTS.centerRow });
    const contentContainerKey = "content-container";
    const content = !!this.contentBehind
      ? [
        h("div", { class: {
            [CSS.content]: true,
            [CSS.contentBehind]: true
          }, key: contentContainerKey }, defaultSlotNode),
        centerRowSlotNode
      ]
      : [
        h("div", { class: CSS.content, key: contentContainerKey }, defaultSlotNode, centerRowSlotNode)
      ];
    return content;
  }
  renderFooter() {
    const hasFooter = !!getSlotted(this.el, SLOTS.footer);
    return hasFooter ? (h("div", { class: CSS.footer, key: "footer" }, h("slot", { name: SLOTS.footer }))) : null;
  }
  renderMain() {
    const primaryPanel = getSlotted(this.el, SLOTS.primaryPanel);
    const mainClasses = {
      [CSS.main]: true,
      [CSS.mainReversed]: (primaryPanel === null || primaryPanel === void 0 ? void 0 : primaryPanel.position) === "end"
    };
    return (h("div", { class: mainClasses }, h("slot", { name: SLOTS.primaryPanel }), h("slot", { name: SLOTS.panelStart }), this.renderContent(), h("slot", { name: SLOTS.panelEnd }), h("slot", { name: SLOTS.contextualPanel })));
  }
  render() {
    return (h(Fragment, null, this.renderHeader(), this.renderMain(), this.renderFooter()));
  }
  get el() { return getElement(this); }
};
Shell.style = shellCss;

export { Panel as calcite_panel, Shell as calcite_shell };
