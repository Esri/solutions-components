/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$4 } from './checkbox.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './tree.js';
import { d as defineCustomElement$1 } from './tree-item.js';

const solutionOrganizationVariablesCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.container-border{overflow-y:auto}.org-var-header{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1rem}";

const SolutionOrganizationVariables = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get el() { return this; }
  static get watchers() { return {
    "value": ["valueWatchHandler"]
  }; }
  static get style() { return solutionOrganizationVariablesCss; }
}, [1, "solution-organization-variables", {
    "value": [1537],
    "_organizationVariables": [32],
    "_translations": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["solution-organization-variables", "calcite-checkbox", "calcite-icon", "calcite-tree", "calcite-tree-item"];
  components.forEach(tagName => { switch (tagName) {
    case "solution-organization-variables":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SolutionOrganizationVariables);
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-tree":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-tree-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { SolutionOrganizationVariables as S, defineCustomElement as d };
