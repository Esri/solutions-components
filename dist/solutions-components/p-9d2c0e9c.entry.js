/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, f as forceUpdate, g as getElement, H as Host, F as Fragment } from './p-c2f00d41.js';
import { b as getElementDir, i as isPrimaryPointerButton, a as getSlotted, n as nodeListToArray, j as filterDirectChildren, g as getElementProp, t as toAriaBoolean } from './p-83166522.js';
import { c as clamp } from './p-63f6e8f1.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-1c247f54.js';
import { g as guid } from './p-a80b3880.js';
import { c as createObserver } from './p-9a9955db.js';
import { u as updateHostInteraction } from './p-7daea1df.js';
import { S as Sortable } from './p-77182c3a.js';
import { o as getItemIndex, m as mutationObserverCallback, d as deselectRemovedItems, a as deselectSiblingItems, s as selectSiblings, h as handleFilter, g as getItemData, k as keyDownHandler, p as moveItemIndex, i as initialize, b as initializeObserver, c as cleanUpObserver, j as calciteListFocusOutHandler, r as removeItem, e as calciteListItemChangeHandler, f as calciteInternalListItemValueChangeHandler, l as setUpItems, n as setFocus, L as List } from './p-d56b3f65.js';
import { I as ICON_TYPES$1 } from './p-b978636e.js';
import { C as CSS$2, S as SLOTS$3 } from './p-de5416e8.js';
import { g as getLocaleComponentStrings } from './p-4f462875.js';
import { s as state, E as EFileType } from './p-dd11eeb2.js';
import { e as EUpdateType } from './p-dbc9a5a8.js';
import './p-729708a3.js';
import './p-e947d3b0.js';
import './p-ae1fd76b.js';
import './p-4e32bf8c.js';
import './p-e1a4994d.js';
import './p-00444009.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS$1 = {
  container: "container",
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentDetached: "content--detached",
  separator: "separator"
};
const SLOTS$2 = {
  actionBar: "action-bar",
  header: "header"
};
const TEXT = {
  resize: "Resize"
};

const shellPanelCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{pointer-events:none;display:flex;flex:0 1 auto;align-items:stretch;--calcite-shell-panel-detached-max-height:unset}.container{pointer-events:none;box-sizing:border-box;display:flex;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-2)}.container *{box-sizing:border-box}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-ui-border-3)}.separator{pointer-events:auto;position:absolute;inset-block:0px;display:flex;block-size:100%;inline-size:0.125rem;background-color:transparent;opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-ui-border-2)}.separator:focus{background-color:var(--calcite-ui-brand);opacity:1}:host([position=start]) .separator{inset-inline-end:-2px}:host([position=end]) .separator{inset-inline-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-ui-background);padding:0px;inline-size:var(--calcite-shell-panel-width);max-inline-size:var(--calcite-shell-panel-max-width);min-inline-size:var(--calcite-shell-panel-min-width);transition:max-block-size var(--calcite-animation-timing), max-inline-size var(--calcite-animation-timing)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}:host([width-scale=s]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height:40vh}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height:60vh}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height:80vh}.content--detached{margin-inline:0.5rem;margin-block:0.5rem auto;block-size:auto;overflow:hidden;border-radius:0.25rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);max-block-size:var(--calcite-shell-panel-detached-max-height)}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-block-size:unset}:host([position=start]) .content--detached ::slotted(calcite-panel),:host([position=start]) .content--detached ::slotted(calcite-flow),:host([position=end]) .content--detached ::slotted(calcite-panel),:host([position=end]) .content--detached ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([dismissed])){border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]) .content ::slotted(calcite-flow),:host([position=start]) .content ::slotted(calcite-panel){-webkit-border-start:none;border-inline-start:none}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]) .content ::slotted(calcite-flow),:host([position=end]) .content ::slotted(calcite-panel){-webkit-border-end:none;border-inline-end:none}";

const ShellPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteShellPanelToggle = createEvent(this, "calciteShellPanelToggle", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, hides the component's content area.
     */
    this.collapsed = false;
    /**
     * When `true`, the content area displays like a floating panel.
     */
    this.detached = false;
    /**
     * When `detached`, specifies the maximum height of the component.
     */
    this.detachedHeightScale = "l";
    /**
     * Specifies the width of the component's content area.
     */
    this.widthScale = "m";
    /**
     * Accessible name for the resize separator.
     *
     * @default "Resize"
     */
    this.intlResize = TEXT.resize;
    /**
     * When `true` and not `detached`, the component's content area is resizable.
     */
    this.resizable = false;
    this.contentWidth = null;
    this.initialContentWidth = null;
    this.initialClientX = null;
    this.contentWidthMax = null;
    this.contentWidthMin = null;
    this.step = 1;
    this.stepMultiplier = 10;
    this.storeContentEl = (contentEl) => {
      this.contentEl = contentEl;
    };
    this.getKeyAdjustedWidth = (event) => {
      const { key } = event;
      const { el, step, stepMultiplier, contentWidthMin, contentWidthMax, initialContentWidth, position } = this;
      const multipliedStep = step * stepMultiplier;
      const MOVEMENT_KEYS = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "PageUp",
        "PageDown"
      ];
      if (MOVEMENT_KEYS.indexOf(key) > -1) {
        event.preventDefault();
      }
      const dir = getElementDir(el);
      const directionKeys = ["ArrowLeft", "ArrowRight"];
      const directionFactor = dir === "rtl" && directionKeys.includes(key) ? -1 : 1;
      const increaseKeys = key === "ArrowUp" ||
        (position === "end" ? key === directionKeys[0] : key === directionKeys[1]);
      if (increaseKeys) {
        const stepValue = event.shiftKey ? multipliedStep : step;
        return initialContentWidth + directionFactor * stepValue;
      }
      const decreaseKeys = key === "ArrowDown" ||
        (position === "end" ? key === directionKeys[1] : key === directionKeys[0]);
      if (decreaseKeys) {
        const stepValue = event.shiftKey ? multipliedStep : step;
        return initialContentWidth - directionFactor * stepValue;
      }
      if (typeof contentWidthMin === "number" && key === "Home") {
        return contentWidthMin;
      }
      if (typeof contentWidthMax === "number" && key === "End") {
        return contentWidthMax;
      }
      if (key === "PageDown") {
        return initialContentWidth - multipliedStep;
      }
      if (key === "PageUp") {
        return initialContentWidth + multipliedStep;
      }
      return null;
    };
    this.separatorKeyDown = (event) => {
      this.setInitialContentWidth();
      const width = this.getKeyAdjustedWidth(event);
      if (typeof width === "number") {
        this.setContentWidth(width);
      }
    };
    this.separatorPointerMove = (event) => {
      event.preventDefault();
      const { el, initialContentWidth, position, initialClientX } = this;
      const offset = event.clientX - initialClientX;
      const dir = getElementDir(el);
      const adjustmentDirection = dir === "rtl" ? -1 : 1;
      const adjustedOffset = position === "end" ? -adjustmentDirection * offset : adjustmentDirection * offset;
      const width = initialContentWidth + adjustedOffset;
      this.setContentWidth(width);
    };
    this.separatorPointerUp = (event) => {
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      event.preventDefault();
      document.removeEventListener("pointerup", this.separatorPointerUp);
      document.removeEventListener("pointermove", this.separatorPointerMove);
    };
    this.setInitialContentWidth = () => {
      var _a;
      this.initialContentWidth = (_a = this.contentEl) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width;
    };
    this.separatorPointerDown = (event) => {
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      event.preventDefault();
      const { separatorEl } = this;
      separatorEl && document.activeElement !== separatorEl && separatorEl.focus();
      this.setInitialContentWidth();
      this.initialClientX = event.clientX;
      document.addEventListener("pointerup", this.separatorPointerUp);
      document.addEventListener("pointermove", this.separatorPointerMove);
    };
    this.connectSeparator = (separatorEl) => {
      this.disconnectSeparator();
      this.separatorEl = separatorEl;
      separatorEl.addEventListener("pointerdown", this.separatorPointerDown);
    };
    this.disconnectSeparator = () => {
      var _a;
      (_a = this.separatorEl) === null || _a === void 0 ? void 0 : _a.removeEventListener("pointerdown", this.separatorPointerDown);
    };
  }
  watchHandler() {
    this.calciteShellPanelToggle.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
    this.disconnectSeparator();
  }
  componentDidLoad() {
    this.updateAriaValues();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const { el } = this;
    const hasHeader = getSlotted(el, SLOTS$2.header);
    return hasHeader ? (h("div", { class: CSS$1.contentHeader, key: "header" }, h("slot", { name: SLOTS$2.header }))) : null;
  }
  render() {
    const { collapsed, detached, position, initialContentWidth, contentWidth, contentWidthMax, contentWidthMin, intlResize, resizable } = this;
    const allowResizing = !detached && resizable;
    const contentNode = (h("div", { class: { [CSS$1.content]: true, [CSS$1.contentDetached]: detached }, hidden: collapsed, key: "content", ref: this.storeContentEl, style: allowResizing && contentWidth ? { width: `${contentWidth}px` } : null }, this.renderHeader(), h("div", { class: CSS$1.contentBody }, h("slot", null))));
    const separatorNode = allowResizing ? (h("div", { "aria-label": intlResize, "aria-orientation": "horizontal", "aria-valuemax": contentWidthMax, "aria-valuemin": contentWidthMin, "aria-valuenow": contentWidth !== null && contentWidth !== void 0 ? contentWidth : initialContentWidth, class: CSS$1.separator, key: "separator", onKeyDown: this.separatorKeyDown, ref: this.connectSeparator, role: "separator", tabIndex: 0, "touch-action": "none" })) : null;
    const actionBarNode = h("slot", { key: "action-bar", name: SLOTS$2.actionBar });
    const mainNodes = [actionBarNode, contentNode, separatorNode];
    if (position === "end") {
      mainNodes.reverse();
    }
    return h("div", { class: { [CSS$1.container]: true } }, mainNodes);
  }
  // --------------------------------------------------------------------------
  //
  //  private Methods
  //
  // --------------------------------------------------------------------------
  setContentWidth(width) {
    const { contentWidthMax, contentWidthMin } = this;
    const roundedWidth = Math.round(width);
    this.contentWidth =
      typeof contentWidthMax === "number" && typeof contentWidthMin === "number"
        ? clamp(roundedWidth, contentWidthMin, contentWidthMax)
        : roundedWidth;
  }
  updateAriaValues() {
    const { contentEl } = this;
    const computedStyle = contentEl && getComputedStyle(contentEl);
    if (!computedStyle) {
      return;
    }
    const max = parseInt(computedStyle.getPropertyValue("max-width"), 10);
    const min = parseInt(computedStyle.getPropertyValue("min-width"), 10);
    const valueNow = parseInt(computedStyle.getPropertyValue("width"), 10);
    if (typeof valueNow === "number" && !isNaN(valueNow)) {
      this.initialContentWidth = valueNow;
    }
    if (typeof max === "number" && !isNaN(max)) {
      this.contentWidthMax = max;
    }
    if (typeof min === "number" && !isNaN(min)) {
      this.contentWidthMin = min;
    }
    forceUpdate(this);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "collapsed": ["watchHandler"]
  }; }
};
ShellPanel.style = shellPanelCss;

const tabCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([selected]) section,:host([selected]) .container{display:block}:host{display:none;block-size:100%;inline-size:100%}:host([selected]){display:block;block-size:100%;inline-size:100%;overflow:auto}section,.container{display:none;block-size:100%;inline-size:100%}:host([scale=s]){padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}";

const Tab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInternalTabRegister = createEvent(this, "calciteInternalTabRegister", 6);
    /**
     * When `true`, the component's contents are selected.
     *
     * Only one tab can be selected within the `calcite-tabs` parent.
     *
     * @deprecated Use `selected` instead.
     */
    this.active = false;
    /**
     * When `true`, the component's contents are selected.
     *
     * Only one tab can be selected within the `calcite-tabs` parent.
     */
    this.selected = false;
    /**
     * @internal
     */
    this.scale = "m";
    this.guid = `calcite-tab-title-${guid()}`;
  }
  activeHandler(value) {
    this.selected = value;
  }
  selectedHandler(value) {
    this.active = value;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const id = this.el.id || this.guid;
    return (h(Host, { "aria-labelledby": this.labeledBy, id: id }, h("div", { class: "container", role: "tabpanel", tabIndex: this.selected ? 0 : -1 }, h("section", null, h("slot", null)))));
  }
  connectedCallback() {
    this.parentTabsEl = this.el.closest("calcite-tabs");
    const isSelected = this.selected || this.active;
    if (isSelected) {
      this.activeHandler(isSelected);
      this.selectedHandler(isSelected);
    }
  }
  componentDidLoad() {
    this.calciteInternalTabRegister.emit();
  }
  componentWillRender() {
    var _a;
    this.scale = (_a = this.parentTabsEl) === null || _a === void 0 ? void 0 : _a.scale;
  }
  disconnectedCallback() {
    var _a;
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    (_a = document.body) === null || _a === void 0 ? void 0 : _a.dispatchEvent(new CustomEvent("calciteTabUnregister", {
      detail: this.el
    }));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  internalTabChangeHandler(event) {
    const targetTabsEl = event
      .composedPath()
      .find((el) => el.tagName === "CALCITE-TABS");
    // to allow `<calcite-tabs>` to be nested we need to make sure this
    // `calciteTabChange` event was actually fired from a within the same
    // `<calcite-tabs>` that is the a parent of this tab.
    if (targetTabsEl !== this.parentTabsEl) {
      return;
    }
    if (this.tab) {
      this.selected = this.tab === event.detail.tab;
    }
    else {
      this.getTabIndex().then((index) => {
        this.selected = index === event.detail.tab;
      });
    }
    event.stopPropagation();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Returns the index of the component item within the tab array.
   */
  async getTabIndex() {
    return Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab")), this.el);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * @param tabIds
   * @param titleIds
   * @internal
   */
  async updateAriaInfo(tabIds = [], titleIds = []) {
    this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "selected": ["selectedHandler"]
  }; }
};
Tab.style = tabCss;

const tabNavCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:flex}:host([scale=s]){min-block-size:1.5rem}:host([scale=m]){min-block-size:2rem}:host([scale=l]){min-block-size:2.75rem}.tab-nav{display:flex;inline-size:100%;justify-content:flex-start;overflow:auto}.tab-nav-active-indicator-container{position:absolute;inset-inline:0px;inset-block-end:0px;block-size:0.125rem;inline-size:100%;overflow:hidden}.tab-nav-active-indicator{position:absolute;inset-block-end:0px;display:block;block-size:0.125rem;background-color:var(--calcite-ui-brand);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-timing-function:cubic-bezier(0, 0, 0.2, 1)}:host([position=below]) .tab-nav-active-indicator{inset-block-end:unset;inset-block-start:0px}:host([position=bottom]) .tab-nav-active-indicator{inset-block-end:unset;inset-block-start:0px}:host([position=below]) .tab-nav-active-indicator-container{inset-block-start:0px;inset-block-end:unset}:host([position=bottom]) .tab-nav-active-indicator-container{inset-block-end:unset;inset-block-start:0px}:host([bordered]) .tab-nav-active-indicator-container{inset-block-end:unset}:host([bordered][position=below]) .tab-nav-active-indicator-container{inset-block-end:0;inset-block-start:unset}:host([bordered][position=bottom]) .tab-nav-active-indicator-container{inset-block-end:0;inset-block-start:unset}@media (forced-colors: active){.tab-nav-active-indicator{background-color:highlight}}";

const TabNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTabChange = createEvent(this, "calciteTabChange", 6);
    this.calciteInternalTabChange = createEvent(this, "calciteInternalTabChange", 6);
    /**
     * @internal
     */
    this.scale = "m";
    /**
     * @internal
     */
    this.layout = "inline";
    /**
     * @internal
     */
    this.position = "bottom";
    /**
     * @internal
     */
    this.bordered = false;
    this.animationActiveDuration = 0.3;
    this.resizeObserver = createObserver("resize", () => {
      // remove active indicator transition duration during resize to prevent wobble
      this.activeIndicatorEl.style.transitionDuration = "0s";
      this.updateActiveWidth();
      this.updateOffsetPosition();
    });
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.handleContainerScroll = () => {
      // remove active indicator transition duration while container is scrolling to prevent wobble
      this.activeIndicatorEl.style.transitionDuration = "0s";
      this.updateOffsetPosition();
    };
  }
  async selectedTabChanged() {
    if (localStorage &&
      this.storageId &&
      this.selectedTab !== undefined &&
      this.selectedTab !== null) {
      localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTab));
    }
    this.calciteInternalTabChange.emit({
      tab: this.selectedTab
    });
    this.selectedTabEl = await this.getTabTitleById(this.selectedTab);
  }
  selectedTabElChanged() {
    this.updateOffsetPosition();
    this.updateActiveWidth();
    // reset the animation time on tab selection
    this.activeIndicatorEl.style.transitionDuration = `${this.animationActiveDuration}s`;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.parentTabsEl = this.el.closest("calcite-tabs");
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentWillLoad() {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTab = storedTab;
    }
  }
  componentWillRender() {
    const { parentTabsEl } = this;
    this.layout = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.layout;
    this.position = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.position;
    this.scale = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.scale;
    this.bordered = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.bordered;
    // fix issue with active tab-title not lining up with blue indicator
    if (this.selectedTabEl) {
      this.updateOffsetPosition();
    }
  }
  componentDidRender() {
    // if every tab title is active select the first tab.
    if (this.tabTitles.length &&
      this.tabTitles.every((title) => !title.active) &&
      !this.selectedTab) {
      this.tabTitles[0].getTabIdentifier().then((tab) => {
        this.calciteInternalTabChange.emit({
          tab
        });
      });
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const width = `${this.indicatorWidth}px`;
    const offset = `${this.indicatorOffset}px`;
    const indicatorStyle = dir !== "rtl" ? { width, left: offset } : { width, right: offset };
    return (h(Host, { role: "tablist" }, h("div", { class: "tab-nav", onScroll: this.handleContainerScroll, ref: (el) => (this.tabNavEl = el) }, h("div", { class: "tab-nav-active-indicator-container", ref: (el) => (this.activeIndicatorContainerEl = el) }, h("div", { class: "tab-nav-active-indicator", ref: (el) => (this.activeIndicatorEl = el), style: indicatorStyle })), h("slot", null))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  focusPreviousTabHandler(event) {
    const currentIndex = this.getIndexOfTabTitle(event.target, this.enabledTabTitles);
    const previousTab = this.enabledTabTitles[currentIndex - 1] ||
      this.enabledTabTitles[this.enabledTabTitles.length - 1];
    previousTab === null || previousTab === void 0 ? void 0 : previousTab.focus();
    event.stopPropagation();
    event.preventDefault();
  }
  focusNextTabHandler(event) {
    const currentIndex = this.getIndexOfTabTitle(event.target, this.enabledTabTitles);
    const nextTab = this.enabledTabTitles[currentIndex + 1] || this.enabledTabTitles[0];
    nextTab === null || nextTab === void 0 ? void 0 : nextTab.focus();
    event.stopPropagation();
    event.preventDefault();
  }
  internalActivateTabHandler(event) {
    this.selectedTab = event.detail.tab
      ? event.detail.tab
      : this.getIndexOfTabTitle(event.target);
    event.stopPropagation();
    event.preventDefault();
  }
  activateTabHandler(event) {
    this.calciteTabChange.emit({
      tab: this.selectedTab
    });
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * Check for active tabs on register and update selected
   *
   * @param event
   */
  updateTabTitles(event) {
    if (event.target.active) {
      this.selectedTab = event.detail;
    }
  }
  globalInternalTabChangeHandler(event) {
    if (this.syncId &&
      event.target !== this.el &&
      event.target.syncId === this.syncId &&
      this.selectedTab !== event.detail.tab) {
      this.selectedTab = event.detail.tab;
    }
    event.stopPropagation();
  }
  iconStartChangeHandler() {
    this.updateActiveWidth();
  }
  updateOffsetPosition() {
    var _a, _b, _c, _d, _e;
    const dir = getElementDir(this.el);
    const navWidth = (_a = this.activeIndicatorContainerEl) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    const tabLeft = (_b = this.selectedTabEl) === null || _b === void 0 ? void 0 : _b.offsetLeft;
    const tabWidth = (_c = this.selectedTabEl) === null || _c === void 0 ? void 0 : _c.offsetWidth;
    const offsetRight = navWidth - (tabLeft + tabWidth);
    this.indicatorOffset =
      dir !== "rtl" ? tabLeft - ((_d = this.tabNavEl) === null || _d === void 0 ? void 0 : _d.scrollLeft) : offsetRight + ((_e = this.tabNavEl) === null || _e === void 0 ? void 0 : _e.scrollLeft);
  }
  updateActiveWidth() {
    var _a;
    this.indicatorWidth = (_a = this.selectedTabEl) === null || _a === void 0 ? void 0 : _a.offsetWidth;
  }
  getIndexOfTabTitle(el, tabTitles = this.tabTitles) {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }
  async getTabTitleById(id) {
    return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
      return this.tabTitles[ids.indexOf(id)];
    });
  }
  get tabTitles() {
    return filterDirectChildren(this.el, "calcite-tab-title");
  }
  get enabledTabTitles() {
    return filterDirectChildren(this.el, "calcite-tab-title:not([disabled])");
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "selectedTab": ["selectedTabChanged"],
    "selectedTabEl": ["selectedTabElChanged"]
  }; }
};
TabNav.style = tabNavCss;

const tabTitleCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block;flex:0 1 auto;outline:2px solid transparent;outline-offset:2px;-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host([layout=center]){margin-block:0px;margin-inline:1.25rem;text-align:center;flex-basis:12rem;margin:auto}:host([position=below]) .container{border-block-end-width:0px;border-block-start-width:2px;border-block-start-color:transparent;border-block-start-style:solid}:host([position=bottom]) .container{border-block-end-width:0px;border-block-start-width:2px;border-block-start-color:transparent;border-block-start-style:solid}:host .container{outline-color:transparent}:host(:focus) .container{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host(:active) a,:host(:focus) a,:host(:hover) a{border-color:var(--calcite-ui-border-2);color:var(--calcite-ui-text-1);-webkit-text-decoration-line:none;text-decoration-line:none}:host([selected]) .container{border-color:transparent;color:var(--calcite-ui-text-1)}:host([disabled]) .container{pointer-events:none;opacity:0.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){-webkit-margin-end:1rem;margin-inline-end:1rem}:host([scale=s]) .container{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]) .container{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){-webkit-margin-end:1.5rem;margin-inline-end:1.5rem}:host([scale=l]) .container{padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.container{box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;justify-content:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-block-end-width:2px;padding-inline:0px;padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-3);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-block-end-color:transparent;border-block-end-style:solid}.calcite-tab-title--icon{position:relative;margin:0px;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.container--has-text{padding:0.25rem}.container--has-text .calcite-tab-title--icon.icon-start{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}.container--has-text .calcite-tab-title--icon.icon-end{-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([bordered]){-webkit-margin-end:0;margin-inline-end:0}:host([bordered][selected]){box-shadow:inset 0px -2px var(--calcite-ui-foreground-1)}:host([bordered][selected][position=below]){box-shadow:inset 0 2px 0 var(--calcite-ui-foreground-1)}:host([bordered][selected][position=bottom]){box-shadow:inset 0 2px 0 var(--calcite-ui-foreground-1)}:host([bordered]:hover) .container,:host([bordered]:focus) .container,:host([bordered]:active) .container{position:relative}:host([bordered]:hover) .container{background-color:var(--calcite-button-transparent-hover)}:host([bordered]) .container{border-block-end-style:unset;-webkit-border-start:1px solid transparent;border-inline-start:1px solid transparent;-webkit-border-end:1px solid transparent;border-inline-end:1px solid transparent}:host([bordered][position=below]) .container{border-block-start-style:unset}:host([bordered][position=bottom]) .container{border-block-start-style:unset}:host([selected][bordered]) .container{border-inline-start-color:var(--calcite-ui-border-1);border-inline-end-color:var(--calcite-ui-border-1)}:host([bordered]) .container{padding-inline:0.75rem}:host([bordered][scale=s]) .container{padding-inline:0.5rem}:host([bordered][scale=l]) .container{padding-inline:1rem}@media (forced-colors: active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered]) .container{border-block-end-style:solid}:host([bordered][position=below]) .container{border-block-start-style:solid}:host([bordered][position=bottom]) .container{border-block-start-style:solid}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][position=below][selected]) .container{border-block-start-style:none}:host([bordered][position=bottom][selected]) .container{border-block-start-style:none}}";

const TabTitle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 6);
    this.calciteInternalTabsActivate = createEvent(this, "calciteInternalTabsActivate", 6);
    this.calciteInternalTabsFocusNext = createEvent(this, "calciteInternalTabsFocusNext", 6);
    this.calciteInternalTabsFocusPrevious = createEvent(this, "calciteInternalTabsFocusPrevious", 6);
    this.calciteInternalTabTitleRegister = createEvent(this, "calciteInternalTabTitleRegister", 6);
    this.calciteInternalTabIconChanged = createEvent(this, "calciteInternalTabIconChanged", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, the component and its respective `calcite-tab` contents are selected.
     *
     * Only one tab can be selected within the `calcite-tabs` parent.
     *
     * @deprecated Use `selected` instead.
     */
    this.active = false;
    /**
     * When `true`, the component and its respective `calcite-tab` contents are selected.
     *
     * Only one tab can be selected within the `calcite-tabs` parent.
     */
    this.selected = false;
    /** When `true`, interaction is prevented and the component is displayed with lower opacity.  */
    this.disabled = false;
    /**
     * @internal
     */
    this.bordered = false;
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** watches for changing text content */
    this.mutationObserver = createObserver("mutation", () => this.updateHasText());
    /** determine if there is slotted text for styling purposes */
    this.hasText = false;
    this.resizeObserver = createObserver("resize", () => {
      this.calciteInternalTabIconChanged.emit();
    });
    this.guid = `calcite-tab-title-${guid()}`;
  }
  activeHandler(value) {
    this.selected = value;
  }
  selectedHandler(value) {
    this.active = value;
    if (this.selected) {
      this.emitActiveTab(false);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    const { selected, active } = this;
    if (selected) {
      this.active = selected;
    }
    else if (active) {
      this.activeHandler(active);
    }
    this.setupTextContentObserver();
    this.parentTabNavEl = this.el.closest("calcite-tab-nav");
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  disconnectedCallback() {
    var _a, _b, _c;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    (_b = document.body) === null || _b === void 0 ? void 0 : _b.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
      detail: this.el
    }));
    (_c = this.resizeObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
  }
  componentWillLoad() {
    {
      this.updateHasText();
    }
    if (this.tab && this.selected) {
      this.emitActiveTab(false);
    }
  }
  componentWillRender() {
    if (this.parentTabsEl) {
      this.layout = this.parentTabsEl.layout;
      this.position = this.parentTabsEl.position;
      this.scale = this.parentTabsEl.scale;
      this.bordered = this.parentTabsEl.bordered;
    }
    // handle case when tab-nav is only parent
    if (!this.parentTabsEl && this.parentTabNavEl) {
      this.position = getElementProp(this.parentTabNavEl, "position", this.position);
      this.scale = getElementProp(this.parentTabNavEl, "scale", this.scale);
    }
  }
  render() {
    const id = this.el.id || this.guid;
    const iconStartEl = (h("calcite-icon", { class: "calcite-tab-title--icon icon-start", flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: "calcite-tab-title--icon icon-end", flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    return (h(Host, { "aria-controls": this.controls, "aria-selected": toAriaBoolean(this.selected), id: id, role: "tab", tabIndex: this.selected ? 0 : -1 }, h("div", { class: {
        container: true,
        "container--has-text": this.hasText
      }, ref: (el) => { var _a; return (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(el); } }, this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
  }
  async componentDidLoad() {
    this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
  }
  componentDidRender() {
    updateHostInteraction(this, () => {
      return this.selected;
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  internalTabChangeHandler(event) {
    const targetTabsEl = event
      .composedPath()
      .find((el) => el.tagName === "CALCITE-TABS");
    if (targetTabsEl !== this.parentTabsEl) {
      return;
    }
    if (this.tab) {
      this.selected = this.tab === event.detail.tab;
    }
    else {
      this.getTabIndex().then((index) => {
        this.selected = index === event.detail.tab;
      });
    }
    event.stopPropagation();
  }
  onClick() {
    this.emitActiveTab();
  }
  keyDownHandler(event) {
    switch (event.key) {
      case " ":
      case "Enter":
        this.emitActiveTab();
        event.preventDefault();
        break;
      case "ArrowRight":
        event.preventDefault();
        if (getElementDir(this.el) === "ltr") {
          this.calciteInternalTabsFocusNext.emit();
        }
        else {
          this.calciteInternalTabsFocusPrevious.emit();
        }
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (getElementDir(this.el) === "ltr") {
          this.calciteInternalTabsFocusPrevious.emit();
        }
        else {
          this.calciteInternalTabsFocusNext.emit();
        }
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Returns the index of the title within the `calcite-tab-nav`.
   */
  async getTabIndex() {
    return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el);
  }
  /**
   * @internal
   */
  async getTabIdentifier() {
    return this.tab ? this.tab : this.getTabIndex();
  }
  /**
   * @param tabIds
   * @param titleIds
   * @internal
   */
  async updateAriaInfo(tabIds = [], titleIds = []) {
    this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  setupTextContentObserver() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  emitActiveTab(userTriggered = true) {
    if (this.disabled) {
      return;
    }
    const payload = { tab: this.tab };
    this.calciteInternalTabsActivate.emit(payload);
    if (userTriggered) {
      this.calciteTabsActivate.emit(payload);
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "selected": ["selectedHandler"]
  }; }
};
TabTitle.style = tabTitleCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const SLOTS$1 = {
  tabNav: "tab-nav"
};

const tabsCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:flex;flex-direction:column}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1)}:host([bordered]:not([position=below])) ::slotted(calcite-tab-nav){-webkit-margin-after:-1px;margin-block-end:-1px}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){-webkit-margin-after:-1px;margin-block-end:-1px}:host([bordered][position=below]) ::slotted(calcite-tab-nav){-webkit-margin-before:-1px;margin-block-start:-1px}:host([bordered][position=below]){box-shadow:inset 0 1px 0 var(--calcite-ui-border-1), inset 0 -1px 0 var(--calcite-ui-border-1)}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-ui-border-1), inset 0 -1px 0 var(--calcite-ui-border-1)}:host([bordered]) section{border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1)}:host([bordered][scale=s]) section{padding:0.75rem}:host([bordered][scale=m]) section{padding:0.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=below]){flex-direction:column-reverse}:host([position=bottom]){flex-direction:column-reverse}section{display:flex;flex-grow:1;overflow:hidden;border-block-start-width:1px;border-block-start-color:var(--calcite-ui-border-1);border-block-start-style:solid}:host([position=below]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px;border-block-end-color:var(--calcite-ui-border-1)}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px;border-block-end-color:var(--calcite-ui-border-1)}:host([position=below]:not([bordered])) section{border-block-end-style:solid}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid}@media (forced-colors: active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=below][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}";

const Tabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * Specifies the layout of the `calcite-tab-nav`, justifying the `calcite-tab-title`s to the start (`"inline"`), or across and centered (`"center"`).
     */
    this.layout = "inline";
    /**
     * Specifies the position of the component in relation to the `calcite-tab`s. The `"above"` and `"below"` values are deprecated.
     *
     */
    this.position = "top";
    /**
     * Specifies the size of the component.
     */
    this.scale = "m";
    /**
     * When `true`, the component will display with a folder style menu.
     */
    this.bordered = false;
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /**
     *
     * Stores an array of ids of `<calcite-tab-titles>`s to match up ARIA
     * attributes.
     */
    this.titles = [];
    /**
     *
     * Stores an array of ids of `<calcite-tab>`s to match up ARIA attributes.
     */
    this.tabs = [];
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    return (h(Fragment, null, h("slot", { name: SLOTS$1.tabNav }), h("section", null, h("slot", null))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  /**
   * @param event
   * @internal
   */
  calciteInternalTabTitleRegister(event) {
    this.titles = [...this.titles, event.target];
    this.registryHandler();
    event.stopPropagation();
  }
  /**
   * @param event
   * @internal
   */
  calciteTabTitleUnregister(event) {
    this.titles = this.titles.filter((el) => el !== event.detail);
    this.registryHandler();
    event.stopPropagation();
  }
  /**
   * @param event
   * @internal
   */
  calciteInternalTabRegister(event) {
    this.tabs = [...this.tabs, event.target];
    this.registryHandler();
    event.stopPropagation();
  }
  /**
   * @param event
   * @internal
   */
  calciteTabUnregister(event) {
    this.tabs = this.tabs.filter((el) => el !== event.detail);
    this.registryHandler();
    event.stopPropagation();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   *
   * Matches up elements from the internal `tabs` and `titles` to automatically
   * update the ARIA attributes and link `<calcite-tab>` and
   * `<calcite-tab-title>` components.
   */
  async registryHandler() {
    let tabIds;
    let titleIds;
    // determine if we are using `tab` based or `index` based tab identifiers.
    if (this.tabs.some((el) => el.tab) || this.titles.some((el) => el.tab)) {
      // if we are using `tab` based identifiers sort by `tab` to account for
      // possible out of order tabs and get the id of each tab
      tabIds = this.tabs.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
      titleIds = this.titles.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
    }
    else {
      // if we are using index based tabs then the `<calcite-tab>` and
      // `<calcite-tab-title>` might have been rendered out of order so the
      // order of `this.tabs` and `this.titles` might not reflect the DOM state,
      // and might not match each other so we need to get the index of all the
      // tabs and titles in the DOM order to match them up as a source of truth
      const tabDomIndexes = await Promise.all(this.tabs.map((el) => el.getTabIndex()));
      const titleDomIndexes = await Promise.all(this.titles.map((el) => el.getTabIndex()));
      // once we have the DOM order as a source of truth we can build the
      // matching tabIds and titleIds arrays
      tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
        ids[indexInDOM] = this.tabs[registryIndex].id;
        return ids;
      }, []);
      titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
        ids[indexInDOM] = this.titles[registryIndex].id;
        return ids;
      }, []);
    }
    // pass all our new aria information to each `<calcite-tab>` and
    // `<calcite-tab-title>` which will check if they can update their internal
    // `controlled` or `labeledBy` states and re-render if necessary
    this.tabs.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
    this.titles.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
  }
  get el() { return getElement(this); }
};
Tabs.style = tabsCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  handle: "handle"
};
var ICON_TYPES;
(function (ICON_TYPES) {
  ICON_TYPES["grip"] = "grip";
})(ICON_TYPES || (ICON_TYPES = {}));

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
function getScreenReaderText(item, status, valueList) {
  const { items, intlDragHandleIdle, intlDragHandleActive, intlDragHandleChange, intlDragHandleCommit } = valueList;
  const total = items.length;
  const position = getItemIndex(valueList, item) + 1;
  if (status === "idle") {
    const idleText = intlDragHandleIdle
      ? replacePlaceholders(intlDragHandleIdle, item.label, position, total)
      : `${item.label}, press space and use arrow keys to reorder content. Current position ${position} of ${total}.`;
    return idleText;
  }
  else if (status === "active") {
    const activeText = intlDragHandleActive
      ? replacePlaceholders(intlDragHandleActive, item.label, position, total)
      : `Reordering ${item.label}, current position ${position} of ${total}.`;
    return activeText;
  }
  else if (status === "change") {
    const changeText = intlDragHandleChange
      ? replacePlaceholders(intlDragHandleChange, item.label, position, total)
      : `${item.label}, new position ${position} of ${total}. Press space to confirm.`;
    return changeText;
  }
  else {
    const commitText = intlDragHandleCommit
      ? replacePlaceholders(intlDragHandleCommit, item.label, position, total)
      : `${item.label}, current position ${position} of ${total}.`;
    return commitText;
  }
}
function getHandleAndItemElement(event) {
  const handle = event
    .composedPath()
    .find((item) => { var _a; return ((_a = item.dataset) === null || _a === void 0 ? void 0 : _a.jsHandle) !== undefined; });
  const item = event
    .composedPath()
    .find((item) => { var _a; return ((_a = item.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "calcite-value-list-item"; });
  return { handle, item };
}
function replacePlaceholders(text, label, position, total) {
  const replacePosition = text.replace("${position}", position.toString());
  const replaceLabel = replacePosition.replace("${item.label}", label);
  return replaceLabel.replace("${total}", total.toString());
}

const valueListCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}calcite-value-list-item:last-of-type{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header{-webkit-margin-after:0.25rem;margin-block-end:0.25rem;display:flex;align-items:center;justify-content:flex-end;background-color:var(--calcite-ui-foreground-1);--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:300}calcite-filter{-webkit-margin-after:1px;margin-block-end:1px}";

const ValueList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteListChange = createEvent(this, "calciteListChange", 6);
    this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * When `true`, `calcite-value-list-item`s are sortable via a draggable button.
     */
    this.dragEnabled = false;
    /**
     * When `true`, an input appears at the top of the component that can be used by end users to filter list items.
     */
    this.filterEnabled = false;
    /**
     * When `true`, a busy indicator is displayed.
     */
    this.loading = false;
    /**
     * Similar to standard radio buttons and checkboxes.
     * When `true`, a user can select multiple `calcite-value-list-item`s at a time.
     * When `false`, only a single `calcite-value-list-item` can be selected at a time,
     * and a new selection will deselect previous selections.
     */
    this.multiple = false;
    /**
     * When `true` and single-selection is enabled, the selection changes when navigating `calcite-value-list-item`s via keyboard.
     */
    this.selectionFollowsFocus = false;
    // --------------------------------------------------------------------------
    //
    //  Private Properties
    //
    // --------------------------------------------------------------------------
    this.selectedValues = new Map();
    this.dataForFilter = [];
    this.lastSelectedItem = null;
    this.mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));
    this.setFilterEl = (el) => {
      this.filterEl = el;
    };
    this.deselectRemovedItems = deselectRemovedItems.bind(this);
    this.deselectSiblingItems = deselectSiblingItems.bind(this);
    this.selectSiblings = selectSiblings.bind(this);
    this.handleFilter = handleFilter.bind(this);
    this.getItemData = getItemData.bind(this);
    this.keyDownHandler = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      const { handle, item } = getHandleAndItemElement(event);
      if (handle && !item.handleActivated && event.key === " ") {
        this.updateScreenReaderText(getScreenReaderText(item, "commit", this));
      }
      if (!handle || !item.handleActivated) {
        keyDownHandler.call(this, event);
        return;
      }
      const { items } = this;
      if (event.key === " ") {
        this.updateScreenReaderText(getScreenReaderText(item, "active", this));
      }
      if ((event.key !== "ArrowUp" && event.key !== "ArrowDown") || items.length <= 1) {
        return;
      }
      event.preventDefault();
      const { el } = this;
      const nextIndex = moveItemIndex(this, item, event.key === "ArrowUp" ? "up" : "down");
      if (nextIndex === items.length - 1) {
        el.appendChild(item);
      }
      else {
        const itemAtNextIndex = el.children[nextIndex];
        const insertionReferenceItem = itemAtNextIndex === item.nextElementSibling
          ? itemAtNextIndex.nextElementSibling
          : itemAtNextIndex;
        el.insertBefore(item, insertionReferenceItem);
      }
      this.items = this.getItems();
      this.calciteListOrderChange.emit(this.items.map(({ value }) => value));
      requestAnimationFrame(() => handle === null || handle === void 0 ? void 0 : handle.focus());
      item.handleActivated = true;
      this.updateHandleAriaLabel(handle, getScreenReaderText(item, "change", this));
    };
    this.storeAssistiveEl = (el) => {
      this.assistiveTextEl = el;
    };
    this.handleFocusIn = (event) => {
      const { handle, item } = getHandleAndItemElement(event);
      if (!(item === null || item === void 0 ? void 0 : item.handleActivated) && item && handle) {
        this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    initialize.call(this);
    initializeObserver.call(this);
  }
  componentDidLoad() {
    this.setUpDragAndDrop();
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  disconnectedCallback() {
    cleanUpObserver.call(this);
    this.cleanUpDragAndDrop();
  }
  calciteListFocusOutHandler(event) {
    calciteListFocusOutHandler.call(this, event);
  }
  calciteListItemRemoveHandler(event) {
    removeItem.call(this, event);
  }
  calciteListItemChangeHandler(event) {
    calciteListItemChangeHandler.call(this, event);
  }
  calciteInternalListItemPropsChangeHandler(event) {
    event.stopPropagation();
    this.setUpFilter();
  }
  calciteInternalListItemValueChangeHandler(event) {
    calciteInternalListItemValueChangeHandler.call(this, event);
    event.stopPropagation();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  getItems() {
    return Array.from(this.el.querySelectorAll("calcite-value-list-item"));
  }
  setUpItems() {
    setUpItems.call(this, "calcite-value-list-item");
  }
  setUpFilter() {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }
  setUpDragAndDrop() {
    this.cleanUpDragAndDrop();
    if (!this.dragEnabled) {
      return;
    }
    this.sortable = Sortable.create(this.el, {
      dataIdAttr: "id",
      handle: `.${CSS.handle}`,
      draggable: "calcite-value-list-item",
      group: this.group,
      onSort: () => {
        this.items = Array.from(this.el.querySelectorAll("calcite-value-list-item"));
        const values = this.items.map((item) => item.value);
        this.calciteListOrderChange.emit(values);
      }
    });
  }
  cleanUpDragAndDrop() {
    var _a;
    (_a = this.sortable) === null || _a === void 0 ? void 0 : _a.destroy();
    this.sortable = null;
  }
  handleBlur() {
    if (this.dragEnabled) {
      this.updateScreenReaderText("");
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Returns the currently selected items */
  async getSelectedItems() {
    return this.selectedValues;
  }
  /**
   * Sets focus on the component.
   *
   * @param focusId
   */
  async setFocus(focusId) {
    return setFocus.call(this, focusId);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  getIconType() {
    let type = null;
    if (this.dragEnabled) {
      type = ICON_TYPES.grip;
    }
    return type;
  }
  updateScreenReaderText(text) {
    this.assistiveTextEl.textContent = text;
  }
  updateHandleAriaLabel(handleElement, text) {
    handleElement.ariaLabel = text;
  }
  render() {
    return (h(List, { onBlur: this.handleBlur, onFocusin: this.handleFocusIn, onKeyDown: this.keyDownHandler, props: this }));
  }
  get el() { return getElement(this); }
};
ValueList.style = valueListCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const ICONS = {
  drag: "drag"
};
const SLOTS = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start"
};

const valueListItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{-webkit-margin-after:1px;margin-block-end:1px;box-sizing:border-box;display:flex;background-color:var(--calcite-ui-foreground-1);font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-2);--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}:host *{box-sizing:border-box}calcite-pick-list-item{position:relative;margin:0px;flex-grow:1;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([active]),:host([selected]){--tw-shadow:0 0 0 1px var(--calcite-ui-brand);--tw-shadow-colored:0 0 0 1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.handle{display:flex;cursor:move;align-items:center;justify-content:center;border-style:none;background-color:transparent;padding-block:0px;padding-inline:0.25rem;color:var(--calcite-ui-border-input);outline-color:transparent}.handle:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.handle:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.handle--activated{background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-1)}.handle calcite-icon{color:inherit}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}";

const ValueListItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteListItemRemove = createEvent(this, "calciteListItemRemove", 7);
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * @internal
     */
    this.disableDeselect = false;
    /**
     * When `true`, prevents the content of the component from user interaction.
     */
    this.nonInteractive = false;
    /**
     * @internal
     */
    this.handleActivated = false;
    /**
     * Determines the icon SVG symbol that will be shown. Options are circle, square, grip or null.
     *
     * @see [ICON_TYPES](https://github.com/Esri/calcite-components/blob/master/src/components/pick-list/resources.ts#L5)
     */
    this.icon = null;
    /**
     * When `true`, adds an action to remove the component.
     */
    this.removable = false;
    /**
     * When `true`, the component is selected.
     */
    this.selected = false;
    this.pickListItem = null;
    this.guid = `calcite-value-list-item-${guid()}`;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.getPickListRef = (el) => (this.pickListItem = el);
    this.handleKeyDown = (event) => {
      if (event.key === " ") {
        this.handleActivated = !this.handleActivated;
      }
    };
    this.handleBlur = () => {
      this.handleActivated = false;
    };
    this.handleSelectChange = (event) => {
      this.selected = event.detail.selected;
    };
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
  componentDidRender() {
    updateHostInteraction(this, this.el.closest("calcite-value-list") ? "managed" : false);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Toggle the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   *
   * @param coerce
   */
  async toggleSelected(coerce) {
    this.pickListItem.toggleSelected(coerce);
  }
  /** Set focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.pickListItem) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  calciteListItemChangeHandler(event) {
    // adjust item payload from wrapped item before bubbling
    event.detail.item = this.el;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderActionsEnd() {
    const { el } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);
    return hasActionsEnd ? (h("slot", { name: SLOTS.actionsEnd, slot: SLOTS$3.actionsEnd })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);
    return hasActionsStart ? (h("slot", { name: SLOTS.actionsStart, slot: SLOTS$3.actionsStart })) : null;
  }
  renderHandle() {
    const { icon } = this;
    if (icon === ICON_TYPES$1.grip) {
      return (h("span", { class: {
          [CSS$2.handle]: true,
          [CSS$2.handleActivated]: this.handleActivated
        }, "data-js-handle": true, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, role: "button", tabindex: "0" }, h("calcite-icon", { icon: ICONS.drag, scale: "s" })));
    }
  }
  render() {
    return (h(Host, { id: this.el.id || this.guid }, this.renderHandle(), h("calcite-pick-list-item", { description: this.description, disableDeselect: this.disableDeselect, disabled: this.disabled, label: this.label, metadata: this.metadata, nonInteractive: this.nonInteractive, onCalciteListItemChange: this.handleSelectChange, ref: this.getPickListRef, removable: this.removable, selected: this.selected, value: this.value }, this.renderActionsStart(), this.renderActionsEnd())));
  }
  get el() { return getElement(this); }
};
ValueListItem.style = valueListItemCss;

const jsonEditorCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.editor-container{position:relative;height:100%}.editor-controls{height:2.75rem;padding-right:0.5rem;background-color:#F4F4F4}.editor-buttons{float:right}html[dir=rtl] .editor-buttons{float:left}.edit-error-flag{padding-top:0.5rem;color:red;visibility:hidden}.edit-button{-webkit-padding-start:0.5rem;padding-inline-start:0.5rem}.editor-text{width:100%;overflow-y:auto;background-color:#FFFFFF}.edit-width{width:100%}.edit-parent{box-sizing:border-box;width:100%;height:calc(100% - 46px)}.json-edit-container{height:100%;width:100%;border:1px #808080 solid}.padding-right{-webkit-padding-end:0.125rem;padding-inline-end:0.125rem}.btn{margin-bottom:1rem;display:flex;align-content:center;height:25px;width:120px}.select-ctrl{margin-bottom:1rem}.all-edits{margin-top:4rem}.floating-title{font-size:2rem;z-index:100;position:absolute;left:0.5rem;pointer-events:none}.floating-title-button{pointer-events:auto}.json-editor-position1{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:100%;padding:0px;overflow:hidden;max-height:100% !important}.json-editor-position2a{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:50%;padding:0px;overflow:hidden;max-height:100% !important}.json-editor-position2b{position:absolute;right:0px;top:0px;margin:0px;height:100%;width:50%;padding:0px;overflow:hidden;max-height:100% !important}";

const JsonEditor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._loaded = false;
    this._useDiffEditor = false;
    this.hasChanges = false;
    this.hasErrors = false;
    this.instanceid = "";
    this.value = "";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad() {
    const editorContainer = document.getElementById(`${this.instanceid}-container`);
    if (editorContainer) {
      this._editor = monaco.editor.create(editorContainer, {
        value: this.value,
        language: "json",
        theme: "vs",
        minimap: {
          enabled: false
        },
        automaticLayout: true,
        scrollBeyondLastLine: false
      });
      this._currentModel = this._editor.getModel();
      this._contentChanged = this._currentModel.onDidChangeContent(this._onEditorChange.bind(this));
      // Intercept the monaco function call that shows error markers to see if our content has errors
      const setModelMarkers = monaco.editor.setModelMarkers;
      const self = this;
      monaco.editor.setModelMarkers = function (model, owner, markers) {
        var _a, _b;
        // If this call was for our model, it acts like an onEditorChange event
        // but gives us access to the error state as well
        if (model.id === self._currentModel.id) {
          // Set the error state & dispatch event if state has changed
          self._flagEditorHasErrors(markers.length > 0);
          // Set the changed state & dispatch event if state has changed, but only if there are no errors
          if (!self.hasErrors) {
            self._flagEditorHasChanges((_a = self._currentModel) === null || _a === void 0 ? void 0 : _a.canUndo());
            if ((_b = self._currentModel) === null || _b === void 0 ? void 0 : _b.canUndo()) {
              self._flagEditorContentChanged();
            }
          }
          // Show the error flag if there are errors
          const errorFlag = document.getElementById(`${self.instanceid}-errorFlag`);
          errorFlag.style.visibility = self.hasErrors ? "visible" : "hidden";
        }
        // Pass on the call to the next editor in a chain of intercepts or, finally, to monaco
        setModelMarkers.call(monaco.editor, model, owner, markers);
      };
      this._diffEditor = monaco.editor.createDiffEditor(document.getElementById(`${this.instanceid}-diff-container`), {
        automaticLayout: true
      });
      this._setDiffModel();
      this._loaded = true;
      this._toggleUndoRedo();
    }
  }
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    this._initValueObserver();
    await this._getTranslations();
    return;
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { id: `${this.instanceid}-editor-container`, class: "editor-container padding-right" }, h("div", { class: "editor-controls" }, h("div", { class: "editor-buttons" }, h("calcite-icon", { id: `${this.instanceid}-errorFlag`, icon: "exclamation-mark-triangle", title: this._translations.errorFlag, scale: "s", class: "edit-error-flag" }), h("calcite-button", { id: `${this.instanceid}-undo`, color: "blue", appearance: "solid", title: this._translations.undo, onClick: () => this._undo(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "undo", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-redo`, color: "blue", appearance: "solid", title: this._translations.redo, onClick: () => this._redo(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "redo", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-diff`, color: "blue", appearance: "solid", title: this._translations.diff, onClick: () => this._toggleEditor(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "compare", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-search`, appearance: "outline", color: "blue", title: this._translations.search, onClick: () => this._search(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "search", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-reset`, color: "blue", appearance: "solid", disabled: true, title: this._translations.cancelEdits, onClick: () => this._reset(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "reset", scale: "s" })))), h("div", { class: "edit-parent" }, h("div", { id: `${this.instanceid}-container`, class: "json-edit-container" }), h("div", { id: `${this.instanceid}-diff-container`, class: "json-edit-container display-none" })))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  /**
   * Gets the contents of the editor.
   *
   * @returns Promise resolving with the current contents of the editor
   */
  async getEditorContents() {
    return new Promise((resolve, reject) => {
      try {
        const currentValue = this._currentModel.getValue();
        resolve(currentValue);
      }
      catch (e) {
        reject(e);
      }
    });
  }
  /**
   * Frees the editor events and memory; to be called when the web component is no longer needed.
   *
   * Because the component lifecycle doesn't include an "onDestroy" event
   * (@see https://stenciljs.com/docs/component-lifecycle#disconnectedcallback)
   * and TypeScript/JavaScript does automatic garbage collection without a callback
   * hook until ES2021
   * (@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry),
   * this cleanup call needs to be called manually.
   */
  async prepareForDeletion() {
    var _a, _b, _c, _d, _e;
    (_a = this._searchBtnHandler) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this._search);
    (_b = this._cancelEditsBtnHandler) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", this._reset);
    (_c = this._valueObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
    (_d = this._contentChanged) === null || _d === void 0 ? void 0 : _d.dispose();
    (_e = this._editor) === null || _e === void 0 ? void 0 : _e.dispose();
  }
  /**
   * Replaces the current selection with the supplied text, inserting if nothing is selected.
   *
   * @param replacement Text to use for replacement or insertion
   * @returns Promise resolving when function is done
   */
  async replaceCurrentSelection(replacement) {
    const currentSelection = this._editor.getSelection();
    this._editor.executeEdits("", [
      { range: currentSelection, text: replacement }
    ]);
  }
  /**
   * Resets the contents of the editor with the current `value`.
   *
   * @returns Promise resolving when function is done
   */
  async reset() {
    return new Promise((resolve, reject) => {
      try {
        this._reset();
        resolve({ success: true });
      }
      catch (e) {
        reject(e);
      }
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Disables a button.
   *
   * @param buttonId Id of button to disable
   *
    * @protected
   */
  _disableButton(buttonId) {
    var _a;
    (_a = document.getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
  }
  /**
   * Enables a button.
   *
   * @param buttonId Id of button to enable
   *
   * @protected
   */
  _enableButton(buttonId) {
    var _a;
    (_a = document.getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
  }
  /**
   * Dispatches an event that the editor's content has changed.
   *
   * @protected
   */
  _flagEditorContentChanged() {
    // Event for notifying that the editor contents have changed
    window.dispatchEvent(new CustomEvent("solutionEditorContentChanged", {
      detail: {
        id: this.instanceid,
        contents: this._currentModel.getValue()
      },
      bubbles: true,
      cancelable: false,
      composed: true
    }));
  }
  /**
   * Sets the editor's flag indicating if it has changes and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasChanges Current state of change in the editor; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  _flagEditorHasChanges(flagHasChanges) {
    // Event for notifying if the editor has updated the value of its hasChanges property
    if (this.hasChanges !== flagHasChanges) {
      window.dispatchEvent(new CustomEvent("solutionEditorHasChanges", {
        detail: flagHasChanges,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
      this.hasChanges = flagHasChanges;
    }
  }
  /**
   * Sets the editor's flag indicating if it has errors and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasErrors Current state of errors in the editor; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  _flagEditorHasErrors(flagHasErrors) {
    // Event for notifying if the editor has updated the value of its hasErrors property
    if (this.hasErrors !== flagHasErrors) {
      window.dispatchEvent(new CustomEvent("solutionEditorHasErrors", {
        detail: flagHasErrors,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
      this.hasErrors = flagHasErrors;
    }
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  /**
   * Initializes the observer that will monitor and respond to changes of the value.
   *
   * @protected
   */
  _initValueObserver() {
    this._valueObserver = new MutationObserver(ml => {
      ml.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === "value") {
          const newValue = mutation.target[mutation.attributeName];
          if ((newValue !== mutation.oldValue && this._loaded)) {
            this._currentModel.setValue(this.value);
          }
        }
      });
    });
    this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }
  /**
   * Handles activites appropriate to changes in the editor.
   *
   * @protected
   */
  _onEditorChange() {
    // Note: we're not flagging that the editor has changes here because this event
    // arrives before the model markers event, which indicates errors. We don't want
    // to notify about changes if there are errors.
    this._toggleUndoRedo();
  }
  /**
   * Redoes the previous edit operation.
   *
   * @protected
   */
  _redo() {
    var _a;
    if ((_a = this._currentModel) === null || _a === void 0 ? void 0 : _a.canRedo()) {
      this._currentModel.redo();
      this._toggleUndoRedo();
    }
  }
  /**
   * Resets the stored model to the original value.
   *
   * @protected
   */
  _reset() {
    // Restore the original value
    this._currentModel.setValue(this.value);
    // update the ui
    this._toggleUndoRedo();
  }
  /**
   * Handles click on "Search" button.
   *
   * @protected
   */
  _search() {
    this._editor.trigger('toggleFind', 'actions.find');
  }
  /**
   * Sets the models for the diff editor.
   *
   * @protected
   */
  _setDiffModel() {
    if (this._diffEditor) {
      this._diffEditor.setModel({
        original: monaco.editor.createModel(this.value, "json"),
        modified: this._editor.getModel()
      });
    }
  }
  /**
   * Shows/Hides the appropriate editor: regular or diff.
   *
   * @protected
   */
  _toggleEditor() {
    this._useDiffEditor = !this._useDiffEditor;
    let diffContainer = document.getElementById(`${this.instanceid}-diff-container`);
    let container = document.getElementById(`${this.instanceid}-container`);
    if (this._useDiffEditor) {
      this._setDiffModel();
      diffContainer.classList.remove("display-none");
      container.classList.add("display-none");
    }
    else {
      diffContainer.classList.add("display-none");
      container.classList.remove("display-none");
    }
  }
  /**
   * Toggles the undo and redo buttons.
   *
   * @protected
   */
  _toggleUndoRedo() {
    var _a, _b, _c, _d;
    if ((_a = this._currentModel) === null || _a === void 0 ? void 0 : _a.canUndo()) {
      this._enableButton(`${this.instanceid}-undo`);
    }
    else {
      this._disableButton(`${this.instanceid}-undo`);
    }
    if ((_b = this._currentModel) === null || _b === void 0 ? void 0 : _b.canRedo()) {
      this._enableButton(`${this.instanceid}-redo`);
    }
    else {
      this._disableButton(`${this.instanceid}-redo`);
    }
    if (((_c = this._currentModel) === null || _c === void 0 ? void 0 : _c.canUndo()) || ((_d = this._currentModel) === null || _d === void 0 ? void 0 : _d.canRedo())) {
      this._enableButton(`${this.instanceid}-reset`);
    }
    else {
      this._disableButton(`${this.instanceid}-reset`);
    }
  }
  /**
   * Undoes the current edit operation.
   *
   * @protected
   */
  _undo() {
    var _a;
    if ((_a = this._currentModel) === null || _a === void 0 ? void 0 : _a.canUndo()) {
      this._currentModel.undo();
      this._toggleUndoRedo();
    }
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
};
JsonEditor.style = jsonEditorCss;

const solutionItemDetailsCss = ".inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.icon-inline--on-left,.icon-inline--on-right{display:inline;vertical-align:middle;-webkit-margin-end:0.375rem;margin-inline-end:0.375rem;fill:#0079c1}.scale-down{-o-object-fit:scale-down;object-fit:scale-down}.img-container{display:inline;-webkit-margin-end:1rem;margin-inline-end:1rem;max-width:363px}.summary-count-container{display:inline;flex-grow:1;-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}.snippet-count-container{width:calc(100vw - 363px)}.parent-container{max-width:100%;padding:1rem}label{position:relative;margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem;display:block;min-width:-moz-min-content;min-width:min-content;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}label-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}label-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}label-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}label-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}label-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}label-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}label-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}label-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>label{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>label{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>label{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>label{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>label{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>label{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>label{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>label{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>label{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>label{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>label{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>label{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>label{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>label{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>label{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>label{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face label{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face label b,.code-face label strong{font-weight:400}.code-italic label{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic label b,.code-italic label strong{font-weight:400}";

const SolutionItemDetails = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.itemId = "";
    this.itemDetails = {
      accessInformation: "",
      description: "",
      licenseInfo: "",
      snippet: "",
      tags: [],
      title: ""
    };
    this.itemEdit = undefined;
    this._translations = undefined;
    this.thumbnail = undefined;
    this.thumbnailContainer = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    return this._getTranslations();
  }
  async componentWillRender() {
    this.itemEdit = state.getItemInfo(this.itemId);
    if (this.itemEdit) {
      this.itemDetails = this.itemEdit.item;
      this.itemType = this.itemDetails.type;
    }
    return Promise.resolve();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "parent-container" }, h("div", { class: "inputBottomSeparation" }, h("calcite-input", { id: "item-title", value: this.itemDetails.title })), h("div", { class: "inputBottomSeparation" }, h("input", { accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "display-none", onChange: (event) => (this._updateThumbnail(event)), ref: (el) => (this.browseForThumbnail = el), type: "file" }), h("button", { class: "font-size--3 btn-link inline-block trailer-quarter", onClick: () => this._getThumbnail() }, h("svg", { class: "icon-inline icon-inline--on-left", height: "16", viewBox: "0 0 16 16", width: "16" }, h("path", { d: "M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" })), this._translations.editThumbnail), h("div", { class: "flex" }, h("div", { class: "img-container", ref: (el) => (this.thumbnailContainer = el) }, h("img", { class: "scale-down", height: "133", id: "item-thumbnail", ref: (el) => (this.thumbnail = el), width: "200" })), h("div", { class: "snippet-count-container" }, h("calcite-input", { id: "item-snippet", maxLength: 250, type: "textarea", value: this.itemDetails.snippet }), h("label", { class: "font-size--3", id: "item-snippet-count", ref: (el) => (this.itemSnippetCount = el) })))), h("calcite-label", null, this._translations.description, h("label", { id: "item-description-label" }, h("calcite-input", { id: "item-description", type: "textarea", value: this.itemDetails.description }))), h("calcite-label", null, this._translations.tags, h("label", { id: "item-tags-label" }, h("calcite-input", { id: "item-tags", value: (this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",") }))), this.itemType !== "Group" ? h("calcite-label", null, this._translations.credits, h("label", { id: "item-credits-label" }, h("calcite-input", { id: "item-credits", value: this.itemDetails.accessInformation }))) : null, this.itemType !== "Group" ? h("calcite-label", null, h("label", { id: "item-terms-label" }, this._translations.termsOfUse, h("calcite-input", { id: "item-terms", type: "textarea", value: this.itemDetails.licenseInfo }))) : null)));
  }
  componentDidRender() {
    this._loadThumb();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  /**
   * Updates the component's value with changes to the input fields.
   */
  inputReceivedHandler(event) {
    switch (event.target.id) {
      case "item-title":
        this.itemDetails.title = event.target.value;
        this._updateStore();
        break;
      case "item-snippet":
        if (event.target.value.length > 250) {
          event.target.value = event.target.value.substring(0, 250);
        }
        this.itemDetails.snippet = event.target.value;
        this._updateLengthLabel(this.itemDetails.snippet);
        this._updateStore();
        break;
      case "item-description":
        this.itemDetails.description = event.target.value;
        this._updateStore();
        break;
      case "item-tags":
        this.itemDetails.tags = event.target.value;
        this._updateStore();
        break;
      case "item-credits":
        this.itemDetails.accessInformation = event.target.value;
        this._updateStore();
        break;
      case "item-terms":
        this.itemDetails.licenseInfo = event.target.value;
        this._updateStore();
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Opens image file browse dialog.
   *
   */
  _getThumbnail() {
    this.browseForThumbnail.click();
  }
  /**
   * Load the templates thumbnail
   *
   */
  _loadThumb() {
    var _a;
    if (this.thumbnail && ((_a = this.itemEdit) === null || _a === void 0 ? void 0 : _a.thumbnail)) {
      // Show the thumbnail
      this.thumbnail.src = URL.createObjectURL(this.itemEdit.thumbnail);
      this.thumbnailContainer.classList.remove("empty-box");
      this.thumbnail.classList.remove("display-none");
    }
    else {
      // Replace the thumbnail with an empty box
      this.thumbnailContainer.classList.add("empty-box");
      this.thumbnail.classList.add("display-none");
    }
  }
  /**
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported.
   *
   * @param phrase the current phrase from the control
   */
  _updateLengthLabel(phrase) {
    this.itemSnippetCount.innerText =
      this._translations.snippetCountPattern.replace("{{n}}", phrase.length.toString());
  }
  /**
   * Add or remove the value from the store
   */
  _updateStore() {
    this.itemEdit = state.getItemInfo(this.itemId);
    this.itemEdit.item = this.itemDetails;
    state.setItemInfo(this.itemEdit);
  }
  /**
   * Gets and displays image result from browse and updates the item in the store.
   *
   * @param event The input controls event that contains the new file
   * @param updateStore boolean that controls if the new value is written to the store
   *  should be false on the initial load but true the rest of the time
   */
  _updateThumbnail(event) {
    const files = event.target.files;
    if (files && files[0]) {
      if (this.thumbnail) {
        // Update UI
        this.thumbnail.src = URL.createObjectURL(files[0]);
        // Update info in store
        this.itemEdit = state.getItemInfo(this.itemId);
        this.itemEdit.thumbnail = files[0];
        state.replaceItemThumbnail(this.itemEdit);
      }
    }
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
};
SolutionItemDetails.style = solutionItemDetailsCss;

const solutionItemSharingCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.container-border{padding:1rem}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";

const SolutionItemSharing = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.groupId = "";
    this._translations = undefined;
    this.sharing = [];
  }
  itemIdWatchHandler() {
    const itemEdit = state.getItemInfo(this.groupId);
    this.sharing = itemEdit.groupDetails;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "container-border" }, h("calcite-label", null, this._translations.groupInfo), this._renderItems(this.sharing))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  async getShareInfo() {
    return this.sharing;
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Render share options based on the list of share details
   *
   * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
   */
  _renderItems(objs) {
    return objs && objs.length > 0
      ? objs.map(item => {
        return (h("calcite-label", { layout: "inline" }, h("calcite-switch", { checked: item.shareItem, id: item.id, name: "setting", onCalciteSwitchChange: (event) => this._updateItem(event), scale: "m", value: "enabled" }), h("solution-item-icon", { type: item.type, typeKeywords: item.typeKeywords }), h("span", { class: "icon-text", title: item.title }, item.title)));
      })
      : null;
  }
  /**
   * Update the items share prop based on the switch state
   *
   * @param event onCalciteSwitchChange event
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _updateItem(event) {
    const id = event.target.id;
    this.sharing = this.sharing.map((itemShare) => {
      if (itemShare.id === id) {
        // update the item
        itemShare.shareItem = event.detail.switched;
        // update the item in the store
        const itemEdit = state.getItemInfo(id);
        if (itemShare.shareItem) {
          // Add the group to the item if it's not already there
          if (!itemEdit.groups) {
            itemEdit.groups = [this.groupId];
          }
          else if (itemEdit.groups.indexOf(this.groupId) < 0) {
            itemEdit.groups.push(this.groupId);
          }
        }
        else {
          // Remove the group from the item if it's there
          if (itemEdit.groups) {
            const i = itemEdit.groups.indexOf(this.groupId);
            if (i > -1) {
              itemEdit.groups.splice(i, 1);
            }
          }
        }
        state.setItemInfo(itemEdit);
      }
      return itemShare;
    });
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "groupId": ["itemIdWatchHandler"]
  }; }
};
SolutionItemSharing.style = solutionItemSharingCss;

const solutionOrganizationVariablesCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.container-border{overflow-y:auto}.org-var-header{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1rem}";

const SolutionOrganizationVariables = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.organizationVariableSelected = createEvent(this, "organizationVariableSelected", 7);
    this.value = "";
    this._organizationVariables = [];
    this._translations = undefined;
  }
  valueWatchHandler() {
    this._organizationVariables = JSON.parse(this.value);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("h4", { class: "org-var-header" }, this._translations.orgVariables)), h("div", { class: "container-border" }, h("calcite-tree", { id: "variable-label" }, this._renderHierarchy(this._organizationVariables)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Renders the organization based variable items the user can insert at runtime
   *
   * @param objs a list of organization variables to render
   */
  _renderHierarchy(objs) {
    const hierarchy = objs.map(obj => {
      return (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
    });
    return hierarchy;
  }
  /**
   * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param itemId Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  _treeItemSelected(itemId, value) {
    this.organizationVariableSelected.emit({
      itemId,
      value
    });
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueWatchHandler"]
  }; }
};
SolutionOrganizationVariables.style = solutionOrganizationVariablesCss;

const solutionResourceItemCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.resource-item{padding:1rem}.resource-button{-webkit-margin-end:1rem;margin-inline-end:1rem}.resource-progress{padding-top:1rem}.resources-container{border:1px #808080 solid}.margin-bottom-1{margin-bottom:1rem}";

const SolutionResourceItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._removedResources = {};
    this.authentication = undefined;
    this.itemId = "";
    this.resourceFilePaths = [];
    this.resources = [];
    this._translations = undefined;
  }
  itemIdWatchHandler() {
    const item = state.getItemInfo(this.itemId);
    this.resourceFilePaths = item.resourceFilePaths;
    this.resources = item.resources.map(
    // False linting error
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    (path) => path.substring(path.lastIndexOf("/") + 1));
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    const hasValidResources = this._hasValidResources();
    return (h(Host, null, h("div", { class: "resource-item" }, h("div", { class: "margin-bottom-1" }, h("calcite-button", { appearance: "solid", class: "resource-button", color: "blue", onClick: () => this._addNewResource() }, this._translations.addResource), h("calcite-button", { appearance: "solid", color: "blue", disabled: !hasValidResources, onClick: () => this._downloadAll() }, this._translations.downloadAll)), h("div", { class: "resources-container", style: { display: hasValidResources ? "inherit" : "none" } }, this._renderResourceList()))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Render resources while avoiding thumbnail resoures that are managed by solution-item
   *
   */
  _renderResourceList() {
    return (h("calcite-value-list", { multiple: true }, this.resourceFilePaths.reduce((prev, cur) => {
      if (cur.type !== EFileType.Thumbnail) {
        prev.push(this._renderResource(cur));
      }
      return prev;
    }, [])));
  }
  /**
   * Render the resource and supporting actions for download/update/delete/(reset..if deleted)
   *
   * @param resource the filename and url used to interact with the resource
   */
  _renderResource(resource) {
    const resettable = resource.updateType === EUpdateType.Remove;
    const fullname = resource.folder ? resource.folder + "/" + resource.filename : resource.filename;
    return (h("calcite-value-list-item", { class: resettable ? "disabled" : "", label: fullname, nonInteractive: true, value: resource.url }, h("calcite-action-group", { "expand-disabled": "true", layout: "horizontal", slot: "actions-end" }, h("calcite-action", { disabled: resettable, icon: "download", label: this._translations.download, onClick: () => this._download(resource.url, resource.filename), scale: "m", text: this._translations.download, title: this._translations.download }), h("calcite-action", { disabled: resettable, icon: "upload-to", label: this._translations.update, onClick: () => this._upload(resource), scale: "m", text: this._translations.update, title: this._translations.update }), h("calcite-action", { disabled: resettable, icon: "trash", label: this._translations.delete, onClick: () => this._delete(resource), scale: "m", text: this._translations.delete, title: this._translations.delete }), resettable ? h("calcite-action", { icon: "reset", label: this._translations.reset, onClick: () => this._reset(resource.filename), scale: "m", text: this._translations.reset, title: this._translations.reset }) : h("div", { class: "display-none" }))));
  }
  /**
   * Adds the name to the deleted array so it will be skipped while rendering
   *  but still exist if the user chooses to reset
   *
   * @param resource the resource to be updated
   */
  _delete(resource) {
    resource.updateType = EUpdateType.Remove;
    this.resourceFilePaths = [...this.resourceFilePaths]; // to trigger refresh
    this._updateStore();
  }
  /**
   * Remove the name from the deleted array so it will again be rendered
   *
   * @param name the name to be added to the deleted array
   */
  _reset(name) {
    // need to make sure I know if this reset is from the source or a new one
    // Because the item's `resources` array is not updated until (and if) the solution is saved,
    // we can use it for the reset info
    this.resources.some(resourceName => resourceName === name) ?
      // Undo removing an existing resource
      this.resourceFilePaths = this.resourceFilePaths.map(p => {
        if (p.filename === name) {
          p.updateType = EUpdateType.None;
        }
        return p;
      }) :
      // Undo cancelling the adding of a resource
      this.resourceFilePaths = this.resourceFilePaths.map(p => {
        if (p.filename === name) {
          p.updateType = EUpdateType.Add;
        }
        return p;
      });
    this._updateStore();
  }
  /**
   * Download all of the templates resources
   *
   */
  _downloadAll() {
    this.resourceFilePaths.forEach((resource) => {
      this._download(resource.url, resource.filename);
    });
  }
  /**
   * Download the current resource
   *
   * @param url the resource url
   * @param name the resource name
   */
  _download(url, name) {
    // files that have been added manually do not need to be requested from the item
    if (url.startsWith("blob")) {
      this.downloadFile(url, name);
    }
    else {
      const _url = `${url}?token=${this.authentication.token}`;
      void this.fetchAndDownload(_url, name);
    }
  }
  /**
   * Dynamically creates an anchor and downloads the file
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  downloadFile(url, name) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.target = "_blank";
    link.click();
  }
  /**
   * Check if the template resources have any non-thumbnail resources
   *
   * @returns true if we have data resources and false if only thumbnail
   */
  _hasValidResources() {
    return this.resourceFilePaths.some(r => r.url.indexOf("_info_thumbnail") < 0);
  }
  /**
   * Fetches and downloads the resource from the solution
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  async fetchAndDownload(url, name) {
    const image = await fetch(url);
    const b = await image.blob();
    const bURL = URL.createObjectURL(b);
    this.downloadFile(bURL, name);
  }
  /**
   * Create an input element to support the uploading of the resource and upload the resource
   *
   * @param resource the resource to be updated
   */
  _upload(resource) {
    const _input = document.createElement("input");
    _input.classList.add("display-none");
    _input.onchange = this._updateResource.bind(this, resource);
    _input.type = "file";
    _input.click();
  }
  /**
   * Create an input element to support the uploading of a resource and add the new resource
   *
   */
  _addNewResource() {
    const _input = document.createElement("input");
    _input.classList.add("display-none");
    _input.onchange = this._add.bind(this);
    _input.type = "file";
    _input.click();
  }
  /**
   * Replace the resource file path when update action is used
   *
   * @param resourcePath the resource to be updated
   * @param event the input event that contains the file
   */
  _updateResource(resourcePath, event) {
    const files = event.target.files;
    if (files && files[0]) {
      resourcePath.blob = files[0];
      resourcePath.updateType = EUpdateType.Update;
      this._updateStore();
    }
  }
  /**
   * Add the new resource to the resource file paths
   *
   * @param event the inputs event that contains the new file
   */
  _add(event) {
    const files = event.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const filename = files[0].name;
      // Add the item if it's not already in the resource file paths list
      if (!this.resourceFilePaths.some(r => r.filename === filename && r.url === url)) {
        this.resourceFilePaths = [
          ...this.resourceFilePaths,
          {
            url,
            type: EFileType.Data,
            folder: undefined,
            filename,
            blob: files[0],
            updateType: EUpdateType.Add
          }
        ];
        this._updateStore();
      }
    }
  }
  /**
   * Add or remove the value from the store
   */
  _updateStore() {
    const item = state.getItemInfo(this.itemId);
    item.resourceFilePaths = this.resourceFilePaths;
    state.setItemInfo(item);
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "itemId": ["itemIdWatchHandler"]
  }; }
};
SolutionResourceItem.style = solutionResourceItemCss;

const solutionTemplateDataCss = ":host{display:flexbox}.solution-data-container{position:absolute;height:-moz-available;height:calc(100% - 48px);height:-webkit-fill-available;height:stretch;width:-moz-available;width:100%;width:-webkit-fill-available;width:stretch}.solution-data-child-container{display:flex;height:100%;width:100%;flex-direction:column;overflow-y:auto}.solution-data-editor-container{height:100%}.solution-data-child-container-collapsed{display:flex;height:100%;flex-direction:column;overflow:auto;width:50px}.inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.json-editor{margin:1rem;width:auto;width:-webkit-fill-available -moz-available}.collapse-btn{padding-left:1rem;padding-right:1rem;padding-top:1rem;padding-bottom:0px}.org-vars{padding-left:1rem;padding-right:1rem;padding-top:1rem;padding-bottom:0px}.sol-vars{padding-top:0px;padding-bottom:0px;padding-left:1rem;padding-right:1rem;min-height:45%}.padding-1{padding:1rem}.light{background-color:#F4F4F4}";

const SolutionTemplateData = class {
  itemIdWatchHandler() {
    this._initializing = true;
    this.value = JSON.stringify(this.instanceid === "data"
      ? state.getItemInfo(this.itemId).data
      : state.getItemInfo(this.itemId).properties, null, 2);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._initializing = false;
    this.instanceid = "";
    this.itemId = "";
    this.organizationVariables = "";
    this.solutionVariables = "";
    this.varsOpen = true;
    this._translations = undefined;
    this.value = "";
    window.addEventListener("solutionEditorContentChanged", (evt) => {
      if (this.itemId) {
        const { id, contents } = evt.detail;
        const [itemId, instanceId] = id.split("|");
        if (itemId == this.itemId && instanceId === this.instanceid) {
          if (!this._initializing && contents.length > 0) {
            const itemEdit = state.getItemInfo(itemId);
            if (instanceId === "data") {
              itemEdit.data = JSON.parse(contents);
            }
            else {
              itemEdit.properties = JSON.parse(contents);
            }
            state.setItemInfo(itemEdit);
          }
          this._initializing = false;
        }
      }
    });
  }
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "solution-data-container" }, h("calcite-shell", { class: "light var-container", dir: "ltr" }, h("calcite-panel", { class: "json-editor" }, h("div", { class: "solution-data-child-container calcite-match-height" }, h("json-editor", { class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), h("calcite-shell-panel", { "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, h("div", { class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, h("calcite-button", { appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), h("div", { class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, h("solution-organization-variables", { value: this.organizationVariables })), h("div", { class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, h("solution-variables", { value: this.solutionVariables }))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Toggle varsOpen prop to show/hide variable containers
   */
  _toggleVars() {
    this.varsOpen = !this.varsOpen;
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "itemId": ["itemIdWatchHandler"]
  }; }
};
SolutionTemplateData.style = solutionTemplateDataCss;

const solutionVariablesCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.container-border{overflow-y:hidden}.org-var-header{margin-top:1rem;margin-bottom:1rem;margin-left:0px;margin-right:0px}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";

const SolutionVariables = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.solutionVariableSelected = createEvent(this, "solutionVariableSelected", 7);
    this.value = "";
    this._solutionVariables = [];
    this._translations = undefined;
  }
  valueWatchHandler() {
    this._solutionVariables = JSON.parse(this.value);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("h4", { class: "org-var-header" }, this._translations.solVariables)), h("div", { class: "container-border" }, h("calcite-tree", { id: "variable-label" }, this._renderHierarchy(this._solutionVariables)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Render the solution item variables that the user can insert into temaplates at runtime.
   *
   * @param objs a list of variable items that have been gathered from the solutions templates
   */
  _renderHierarchy(objs) {
    const hierarchy = objs.map(obj => {
      return obj.dependencies && obj.dependencies.length > 0 ? (h("calcite-tree-item", { onClick: (evt) => this._toggleExpand(evt) }, h("solution-item-icon", { type: obj.type }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this._renderHierarchy(obj.dependencies)))) : (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
    });
    return hierarchy;
  }
  /**
   * Publishes the `solutionVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param id Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  _treeItemSelected(id, value) {
    this.solutionVariableSelected.emit({
      itemId: id,
      value
    });
  }
  /**
   * Toggle the tree item that was clicked
   *
   * @param evt the clicks mouse event
   */
  _toggleExpand(evt = undefined) {
    var _a;
    const treeItem = (_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
    if (treeItem) {
      treeItem.expanded = !treeItem.expanded;
    }
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueWatchHandler"]
  }; }
};
SolutionVariables.style = solutionVariablesCss;

export { ShellPanel as calcite_shell_panel, Tab as calcite_tab, TabNav as calcite_tab_nav, TabTitle as calcite_tab_title, Tabs as calcite_tabs, ValueList as calcite_value_list, ValueListItem as calcite_value_list_item, JsonEditor as json_editor, SolutionItemDetails as solution_item_details, SolutionItemSharing as solution_item_sharing, SolutionOrganizationVariables as solution_organization_variables, SolutionResourceItem as solution_resource_item, SolutionTemplateData as solution_template_data, SolutionVariables as solution_variables };
