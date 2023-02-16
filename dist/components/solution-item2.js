/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$x } from './action.js';
import { d as defineCustomElement$w } from './action-group.js';
import { d as defineCustomElement$v } from './action-menu.js';
import { d as defineCustomElement$u } from './button.js';
import { d as defineCustomElement$t } from './checkbox.js';
import { d as defineCustomElement$s } from './icon.js';
import { d as defineCustomElement$r } from './input.js';
import { d as defineCustomElement$q } from './label.js';
import { d as defineCustomElement$p } from './loader.js';
import { d as defineCustomElement$o } from './panel.js';
import { d as defineCustomElement$n } from './pick-list-item.js';
import { d as defineCustomElement$m } from './popover.js';
import { d as defineCustomElement$l } from './progress.js';
import { d as defineCustomElement$k } from './scrim.js';
import { d as defineCustomElement$j } from './shell.js';
import { d as defineCustomElement$i } from './shell-panel.js';
import { d as defineCustomElement$h } from './switch.js';
import { d as defineCustomElement$g } from './tab.js';
import { d as defineCustomElement$f } from './tab-nav.js';
import { d as defineCustomElement$e } from './tab-title.js';
import { d as defineCustomElement$d } from './tabs.js';
import { d as defineCustomElement$c } from './tree.js';
import { d as defineCustomElement$b } from './tree-item.js';
import { d as defineCustomElement$a } from './value-list.js';
import { d as defineCustomElement$9 } from './value-list-item.js';
import { d as defineCustomElement$8 } from './json-editor2.js';
import { d as defineCustomElement$7 } from './solution-item-details2.js';
import { d as defineCustomElement$6 } from './solution-item-icon2.js';
import { d as defineCustomElement$5 } from './solution-item-sharing2.js';
import { d as defineCustomElement$4 } from './solution-organization-variables2.js';
import { d as defineCustomElement$3 } from './solution-resource-item2.js';
import { d as defineCustomElement$2 } from './solution-template-data2.js';
import { d as defineCustomElement$1 } from './solution-variables2.js';

const solutionItemCss = ".configuration-container{position:relative;height:100%;width:100%}.configuration{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:flex;padding:0.5rem;border:1px #808080 solid}.config-tabs{width:100%}.config-tab{width:100%;overflow-y:auto;height:inherit}";

const SolutionItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.authentication = undefined;
    this.itemId = "";
    this.solutionVariables = "";
    this.organizationVariables = "";
    this.itemType = undefined;
    this._translations = undefined;
  }
  itemIdWatchHandler() {
    const itemEdit = state.getItemInfo(this.itemId);
    this.itemType = itemEdit.type;
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
    return (h(Host, null, h("div", { class: "configuration-container" }, h("div", { class: "configuration" }, this._showGroupTabs(this.itemType === "Group"), this._showItemTabs(this.itemType !== "Group")))));
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
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Render tabs based on group item types
   *
   * @param visible Should the current tab be visible
   */
  _showGroupTabs(visible) {
    return h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.groupDetailsTab), h("calcite-tab-title", null, this._translations.sharingTab)), h("calcite-tab", { class: "config-tab", id: "group-tab", selected: true }, h("solution-item-details", { "item-id": this.itemId })), h("calcite-tab", { class: "config-tab", id: "share-tab" }, h("solution-item-sharing", { "group-id": this.itemId })));
  }
  /**
   * Render tabs based for an items details, data, and props section from a template
   *
   * @param visible Should the current tab be visible
   */
  _showItemTabs(visible) {
    return h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.itemDetailsTab), h("calcite-tab-title", null, this._translations.dataTab), h("calcite-tab-title", null, this._translations.propertiesTab), h("calcite-tab-title", null, this._translations.resourcesTab)), h("calcite-tab", { class: "config-tab", selected: true }, h("solution-item-details", { "item-id": this.itemId })), h("calcite-tab", { class: "config-tab", id: "data-tab" }, h("solution-template-data", { instanceid: "data", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), h("calcite-tab", { class: "config-tab", id: "props-tab" }, h("solution-template-data", { instanceid: "properties", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), h("calcite-tab", { class: "config-tab", id: "resources-tab" }, h("solution-resource-item", { authentication: this.authentication, class: "solutions-resource-container", "item-id": this.itemId })));
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
  get el() { return this; }
  static get watchers() { return {
    "itemId": ["itemIdWatchHandler"]
  }; }
  static get style() { return solutionItemCss; }
}, [0, "solution-item", {
    "authentication": [1040],
    "itemId": [1537, "item-id"],
    "solutionVariables": [1537, "solution-variables"],
    "organizationVariables": [1537, "organization-variables"],
    "itemType": [32],
    "_translations": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["solution-item", "calcite-action", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-checkbox", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-panel", "calcite-pick-list-item", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-shell", "calcite-shell-panel", "calcite-switch", "calcite-tab", "calcite-tab-nav", "calcite-tab-title", "calcite-tabs", "calcite-tree", "calcite-tree-item", "calcite-value-list", "calcite-value-list-item", "json-editor", "solution-item-details", "solution-item-icon", "solution-item-sharing", "solution-organization-variables", "solution-resource-item", "solution-template-data", "solution-variables"];
  components.forEach(tagName => { switch (tagName) {
    case "solution-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SolutionItem);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$x();
      }
      break;
    case "calcite-action-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "calcite-action-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "calcite-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "calcite-pick-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "calcite-popover":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "calcite-shell":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "calcite-shell-panel":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "calcite-switch":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "calcite-tab":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "calcite-tab-nav":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "calcite-tab-title":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "calcite-tabs":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "calcite-tree":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "calcite-tree-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-value-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-value-list-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "json-editor":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "solution-item-details":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "solution-item-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "solution-item-sharing":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "solution-organization-variables":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "solution-resource-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "solution-template-data":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "solution-variables":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { SolutionItem as S, defineCustomElement as d };
