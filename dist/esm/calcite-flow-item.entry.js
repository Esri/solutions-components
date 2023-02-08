/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-c246d90e.js';
import { b as getElementDir } from './dom-3bdc69ee.js';
import { S as SLOTS$1 } from './resources-9eb63965.js';
import { u as updateHostInteraction } from './interactive-822ffed6.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  backButton: "back-button"
};
const ICONS = {
  backLeft: "chevron-left",
  backRight: "chevron-right"
};
const TEXT = {
  back: "Back"
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

const flowItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3);border-inline-end-width:1px}";

const FlowItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteFlowItemBack = createEvent(this, "calciteFlowItemBack", 6);
    this.calciteFlowItemBackClick = createEvent(this, "calciteFlowItemBackClick", 6);
    this.calciteFlowItemScroll = createEvent(this, "calciteFlowItemScroll", 6);
    this.calciteFlowItemClose = createEvent(this, "calciteFlowItemClose", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** When true, displays a close button in the trailing side of the header */
    this.closable = false;
    /** When true, flow-item will be hidden */
    this.closed = false;
    /**
     *  When true, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * When true, a busy indicator is displayed.
     */
    this.loading = false;
    /**
     * When true, the action menu items in the `header-menu-actions` slot are open.
     */
    this.menuOpen = false;
    /**
     * When true, displays a back button in the header.
     */
    this.showBackButton = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handlePanelScroll = (event) => {
      event.stopPropagation();
      this.calciteFlowItemScroll.emit();
    };
    this.handlePanelClose = (event) => {
      event.stopPropagation();
      this.calciteFlowItemClose.emit();
    };
    this.backButtonClick = () => {
      this.calciteFlowItemBackClick.emit();
      this.calciteFlowItemBack.emit();
    };
    this.setBackRef = (node) => {
      this.backButtonEl = node;
    };
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.getBackLabel = () => {
      return this.intlBack || TEXT.back;
    };
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
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Sets focus on the component.
   */
  async setFocus() {
    const { backButtonEl, containerEl } = this;
    if (backButtonEl) {
      backButtonEl.setFocus();
      return;
    }
    containerEl === null || containerEl === void 0 ? void 0 : containerEl.setFocus();
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
    await ((_a = this.containerEl) === null || _a === void 0 ? void 0 : _a.scrollContentTo(options));
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, backButtonClick } = this;
    const label = this.getBackLabel();
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "flow-back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: "header-actions-start", text: label })) : null;
  }
  render() {
    const { closable, closed, description, disabled, heading, headingLevel, heightScale, intlBack, intlClose, intlOptions, loading, menuOpen, widthScale, backButtonEl } = this;
    const label = this.getBackLabel();
    return (h(Host, null, h("calcite-panel", { closable: closable, closed: closed, description: description, disabled: disabled, heading: heading, headingLevel: headingLevel, heightScale: heightScale, intlBack: intlBack, intlClose: intlClose, intlOptions: intlOptions, loading: loading, menuOpen: menuOpen, onCalcitePanelClose: this.handlePanelClose, onCalcitePanelScroll: this.handlePanelScroll, ref: this.setContainerRef, widthScale: widthScale }, this.renderBackButton(), h("slot", { name: SLOTS.headerActionsStart, slot: SLOTS$1.headerActionsStart }), h("slot", { name: SLOTS.headerActionsEnd, slot: SLOTS$1.headerActionsEnd }), h("slot", { name: SLOTS.headerContent, slot: SLOTS$1.headerContent }), h("slot", { name: SLOTS.headerMenuActions, slot: SLOTS$1.headerMenuActions }), h("slot", { name: SLOTS.fab, slot: SLOTS$1.fab }), h("slot", { name: SLOTS.footerActions, slot: SLOTS$1.footerActions }), h("slot", { name: SLOTS.footer, slot: SLOTS$1.footer }), h("slot", null)), backButtonEl ? (h("calcite-tooltip", { label: label, placement: "auto", referenceElement: backButtonEl }, label)) : null));
  }
  get el() { return getElement(this); }
};
FlowItem.style = flowItemCss;

export { FlowItem as calcite_flow_item };

//# sourceMappingURL=calcite-flow-item.entry.js.map