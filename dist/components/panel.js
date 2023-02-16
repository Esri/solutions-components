/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { c as getElementDir, t as toAriaBoolean } from './dom.js';
import { H as Heading } from './Heading.js';
import { S as SLOTS$1, d as defineCustomElement$5 } from './action-menu.js';
import { u as updateHostInteraction } from './interactive.js';
import { c as createObserver } from './observers.js';
import { d as defineCustomElement$6 } from './action.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './popover.js';
import { d as defineCustomElement$1 } from './scrim.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  backButton: "back-button",
  container: "container",
  header: "header",
  heading: "heading",
  summary: "summary",
  description: "description",
  headerContent: "header-content",
  headerActions: "header-actions",
  headerActionsEnd: "header-actions--end",
  headerActionsStart: "header-actions--start",
  contentWrapper: "content-wrapper",
  contentContainer: "content-container",
  contentHeight: "content-height",
  fabContainer: "fab-container",
  footer: "footer"
};
const ICONS = {
  close: "x",
  menu: "ellipsis",
  backLeft: "chevron-left",
  backRight: "chevron-right"
};
const SLOTS = {
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerActions: "footer-actions"
};
const TEXT = {
  back: "Back",
  close: "Close",
  open: "Open",
  options: "Options"
};
const HEADING_LEVEL = 3;

const panelCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3);--calcite-panel-max-height:unset;--calcite-panel-width:100%;--calcite-panel-min-width:unset;--calcite-panel-max-width:unset}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-ui-text-2);color:var(--calcite-ui-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.container{margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-ui-background);padding:0px;max-block-size:var(--calcite-panel-max-height);inline-size:var(--calcite-panel-width);max-inline-size:var(--calcite-panel-max-width);min-inline-size:var(--calcite-panel-min-width);transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}:host([height-scale=s]){--calcite-panel-max-height:40vh}:host([height-scale=m]){--calcite-panel-max-height:60vh}:host([height-scale=l]){--calcite-panel-max-height:80vh}:host([width-scale=s]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}.container[hidden]{display:none}.header{-webkit-border-after:1px solid;border-block-end:1px solid;position:sticky;inset-block-start:0px;z-index:400;inline-size:100%;align-items:stretch;justify-content:flex-start;background-color:var(--calcite-ui-foreground-1);border-block-end-color:var(--calcite-ui-border-3);flex:0 0 auto}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;-webkit-margin-end:auto;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium)}.header-content .heading:only-child{-webkit-margin-after:0px;margin-block-end:0px}.header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{-webkit-margin-start:auto;margin-inline-start:auto}.content-wrapper{overflow:auto}.content-height{block-size:100%}.content-container{display:flex;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;background-color:var(--calcite-ui-background)}.footer{-webkit-border-before:1px solid;border-block-start:1px solid;position:sticky;inset-block-end:0px;display:flex;inline-size:100%;justify-content:space-evenly;background-color:var(--calcite-ui-foreground-1);border-block-start-color:var(--calcite-ui-border-3);flex:0 0 auto;min-block-size:3rem;padding:0.5rem}.fab-container{position:sticky;inset-block-end:0px;z-index:300;margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}[hidden]{display:none}";

const Panel = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: SLOTS.headerActionsStart, text: label })) : null;
  }
  renderHeaderContent() {
    const { heading, headingLevel, summary, description, hasHeaderContent } = this;
    const headingNode = heading ? (h(Heading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    const descriptionNode = description || summary ? h("span", { class: CSS.description }, description || summary) : null;
    return !hasHeaderContent && (headingNode || descriptionNode) ? (h("div", { class: CSS.headerContent, key: "header-content" }, headingNode, descriptionNode)) : null;
  }
  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent() {
    return (h("div", { class: CSS.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, h("slot", { name: SLOTS.headerContent, onSlotchange: this.handleHeaderContentSlotChange })));
  }
  renderHeaderStartActions() {
    const { hasStartActions } = this;
    return (h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, h("slot", { name: SLOTS.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange })));
  }
  renderHeaderActionsEnd() {
    const { close, hasEndActions, intlClose, closable } = this;
    const text = intlClose || TEXT.close;
    const closableNode = closable ? (h("calcite-action", { "aria-label": text, icon: ICONS.close, onClick: close, ref: this.setCloseRef, text: text })) : null;
    const slotNode = (h("slot", { name: SLOTS.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange }));
    const showContainer = hasEndActions || closableNode;
    return (h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, closableNode));
  }
  renderMenu() {
    const { hasMenuItems, intlOptions, menuOpen } = this;
    return (h("calcite-action-menu", { flipPlacements: ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: intlOptions || TEXT.options, open: menuOpen, placement: "bottom-end" }, h("calcite-action", { icon: ICONS.menu, slot: SLOTS$1.trigger, text: intlOptions || TEXT.options }), h("slot", { name: SLOTS.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange })));
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
    return (h("header", { class: CSS.header, hidden: !showHeader }, this.renderBackButton(), this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd(), this.renderMenu()));
  }
  renderFooterNode() {
    const { hasFooterContent, hasFooterActions } = this;
    const showFooter = hasFooterContent || hasFooterActions;
    return (h("footer", { class: CSS.footer, hidden: !showFooter }, h("slot", { key: "footer-slot", name: SLOTS.footer, onSlotchange: this.handleFooterSlotChange }), h("slot", { key: "footer-actions-slot", name: SLOTS.footerActions, onSlotchange: this.handleFooterActionsSlotChange })));
  }
  renderContent() {
    const { hasFab } = this;
    const defaultSlotNode = h("slot", { key: "default-slot" });
    const containerNode = hasFab ? (h("section", { class: CSS.contentContainer }, defaultSlotNode)) : (defaultSlotNode);
    return (h("div", { class: {
        [CSS.contentWrapper]: true,
        [CSS.contentContainer]: !hasFab,
        [CSS.contentHeight]: hasFab
      }, onScroll: this.panelScrollHandler, ref: this.setPanelScrollEl }, containerNode, this.renderFab()));
  }
  renderFab() {
    return (h("div", { class: CSS.fabContainer, hidden: !this.hasFab }, h("slot", { name: SLOTS.fab, onSlotchange: this.handleFabSlotChange })));
  }
  render() {
    const { loading, panelKeyDownHandler, closed, closable } = this;
    const panelNode = (h("article", { "aria-busy": toAriaBoolean(loading), class: CSS.container, hidden: closed, onKeyDown: panelKeyDownHandler, ref: this.setContainerRef, tabIndex: closable ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderFooterNode()));
    return (h(Fragment, null, loading ? h("calcite-scrim", { loading: loading }) : null, panelNode));
  }
  get el() { return this; }
  static get watchers() { return {
    "dismissed": ["dismissedHandler"],
    "closed": ["closedHandler"],
    "dismissible": ["dismissibleHandler"],
    "closable": ["closableHandler"]
  }; }
  static get style() { return panelCss; }
}, [1, "calcite-panel", {
    "dismissed": [1540],
    "closed": [1540],
    "beforeBack": [16],
    "disabled": [516],
    "dismissible": [1540],
    "closable": [1540],
    "headingLevel": [514, "heading-level"],
    "showBackButton": [516, "show-back-button"],
    "intlBack": [1, "intl-back"],
    "heightScale": [513, "height-scale"],
    "widthScale": [513, "width-scale"],
    "loading": [516],
    "intlClose": [1, "intl-close"],
    "intlOptions": [1, "intl-options"],
    "heading": [1],
    "summary": [1],
    "description": [1],
    "menuOpen": [516, "menu-open"],
    "hasStartActions": [32],
    "hasEndActions": [32],
    "hasMenuItems": [32],
    "hasHeaderContent": [32],
    "hasFooterContent": [32],
    "hasFooterActions": [32],
    "hasFab": [32],
    "setFocus": [64],
    "scrollContentTo": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-panel", "calcite-action", "calcite-action-menu", "calcite-icon", "calcite-loader", "calcite-popover", "calcite-scrim"];
  components.forEach(tagName => { switch (tagName) {
    case "calcite-panel":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Panel);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-action-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { Panel as P, SLOTS as S, defineCustomElement as d };
