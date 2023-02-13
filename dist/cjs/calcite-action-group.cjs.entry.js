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
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');
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

exports.calcite_action_group = ActionGroup;
