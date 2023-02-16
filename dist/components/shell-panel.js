/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, forceUpdate } from '@stencil/core/internal/client';
import { c as getElementDir, i as isPrimaryPointerButton, b as getSlotted } from './dom.js';
import { c as clamp } from './math.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentDetached: "content--detached",
  separator: "separator"
};
const SLOTS = {
  actionBar: "action-bar",
  header: "header"
};
const TEXT = {
  resize: "Resize"
};

const shellPanelCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{pointer-events:none;display:flex;flex:0 1 auto;align-items:stretch;--calcite-shell-panel-detached-max-height:unset}.container{pointer-events:none;box-sizing:border-box;display:flex;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-2)}.container *{box-sizing:border-box}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-ui-border-3)}.separator{pointer-events:auto;position:absolute;inset-block:0px;display:flex;block-size:100%;inline-size:0.125rem;background-color:transparent;opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-ui-border-2)}.separator:focus{background-color:var(--calcite-ui-brand);opacity:1}:host([position=start]) .separator{inset-inline-end:-2px}:host([position=end]) .separator{inset-inline-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-ui-background);padding:0px;inline-size:var(--calcite-shell-panel-width);max-inline-size:var(--calcite-shell-panel-max-width);min-inline-size:var(--calcite-shell-panel-min-width);transition:max-block-size var(--calcite-animation-timing), max-inline-size var(--calcite-animation-timing)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}:host([width-scale=s]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height:40vh}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height:60vh}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height:80vh}.content--detached{margin-inline:0.5rem;margin-block:0.5rem auto;block-size:auto;overflow:hidden;border-radius:0.25rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);max-block-size:var(--calcite-shell-panel-detached-max-height)}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-block-size:unset}:host([position=start]) .content--detached ::slotted(calcite-panel),:host([position=start]) .content--detached ::slotted(calcite-flow),:host([position=end]) .content--detached ::slotted(calcite-panel),:host([position=end]) .content--detached ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([dismissed])){border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]) .content ::slotted(calcite-flow),:host([position=start]) .content ::slotted(calcite-panel){-webkit-border-start:none;border-inline-start:none}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]) .content ::slotted(calcite-flow),:host([position=end]) .content ::slotted(calcite-panel){-webkit-border-end:none;border-inline-end:none}";

const ShellPanel = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    const hasHeader = getSlotted(el, SLOTS.header);
    return hasHeader ? (h("div", { class: CSS.contentHeader, key: "header" }, h("slot", { name: SLOTS.header }))) : null;
  }
  render() {
    const { collapsed, detached, position, initialContentWidth, contentWidth, contentWidthMax, contentWidthMin, intlResize, resizable } = this;
    const allowResizing = !detached && resizable;
    const contentNode = (h("div", { class: { [CSS.content]: true, [CSS.contentDetached]: detached }, hidden: collapsed, key: "content", ref: this.storeContentEl, style: allowResizing && contentWidth ? { width: `${contentWidth}px` } : null }, this.renderHeader(), h("div", { class: CSS.contentBody }, h("slot", null))));
    const separatorNode = allowResizing ? (h("div", { "aria-label": intlResize, "aria-orientation": "horizontal", "aria-valuemax": contentWidthMax, "aria-valuemin": contentWidthMin, "aria-valuenow": contentWidth !== null && contentWidth !== void 0 ? contentWidth : initialContentWidth, class: CSS.separator, key: "separator", onKeyDown: this.separatorKeyDown, ref: this.connectSeparator, role: "separator", tabIndex: 0, "touch-action": "none" })) : null;
    const actionBarNode = h("slot", { key: "action-bar", name: SLOTS.actionBar });
    const mainNodes = [actionBarNode, contentNode, separatorNode];
    if (position === "end") {
      mainNodes.reverse();
    }
    return h("div", { class: { [CSS.container]: true } }, mainNodes);
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
  get el() { return this; }
  static get watchers() { return {
    "collapsed": ["watchHandler"]
  }; }
  static get style() { return shellPanelCss; }
}, [1, "calcite-shell-panel", {
    "collapsed": [516],
    "detached": [516],
    "detachedHeightScale": [513, "detached-height-scale"],
    "widthScale": [513, "width-scale"],
    "position": [513],
    "intlResize": [1, "intl-resize"],
    "resizable": [516],
    "contentWidth": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-shell-panel"];
  components.forEach(tagName => { switch (tagName) {
    case "calcite-shell-panel":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ShellPanel);
      }
      break;
  } });
}
defineCustomElement();

export { ShellPanel as S, defineCustomElement as d };
