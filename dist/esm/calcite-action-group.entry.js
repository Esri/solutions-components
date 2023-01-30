/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, F as Fragment, g as getElement } from './index-09deaa39.js';
import { S as SLOTS, I as ICONS, T as TEXT } from './resources-3d641588.js';
import { a as getSlotted } from './dom-3bdc69ee.js';
import { S as SLOTS$1 } from './resources-d60362c3.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-e96b0a4f.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';
import './observers-31601001.js';

const actionGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:flex;flex-direction:column;padding:0px;--calcite-action-group-columns:3}:host([columns=\"1\"]){--calcite-action-group-columns:1}:host([columns=\"2\"]){--calcite-action-group-columns:2}:host([columns=\"3\"]){--calcite-action-group-columns:3}:host([columns=\"4\"]){--calcite-action-group-columns:4}:host([columns=\"5\"]){--calcite-action-group-columns:5}:host([columns=\"6\"]){--calcite-action-group-columns:6}:host(:first-child){-webkit-padding-before:0px;padding-block-start:0px}:host([layout=horizontal]){flex-direction:row}:host([layout=grid]){display:grid;place-content:stretch;gap:1px;background-color:var(--calcite-ui-background);padding:1px;grid-template-columns:repeat(var(--calcite-action-group-columns), auto)}";

const ActionGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderTooltip() {
    const { el } = this;
    const hasTooltip = getSlotted(el, SLOTS.menuTooltip);
    return hasTooltip ? h("slot", { name: SLOTS.menuTooltip, slot: SLOTS$1.tooltip }) : null;
  }
  renderMenu() {
    const { el, expanded, intlMore, menuOpen, scale, layout } = this;
    const hasMenuItems = getSlotted(el, SLOTS.menuActions);
    return hasMenuItems ? (h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], label: intlMore || TEXT.more, onCalciteActionMenuOpenChange: this.setMenuOpen, open: menuOpen, placement: layout === "horizontal" ? "bottom-leading" : "leading-start", scale: scale }, h("calcite-action", { icon: ICONS.menu, scale: scale, slot: SLOTS$1.trigger, text: intlMore || TEXT.more, textEnabled: expanded }), h("slot", { name: SLOTS.menuActions }), this.renderTooltip())) : null;
  }
  render() {
    return (h(Fragment, null, h("slot", null), this.renderMenu()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"]
  }; }
};
ActionGroup.style = actionGroupCss;

export { ActionGroup as calcite_action_group };

//# sourceMappingURL=calcite-action-group.entry.js.map