/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$5 } from './checkbox.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './tree.js';
import { d as defineCustomElement$2 } from './tree-item.js';
import { d as defineCustomElement$1 } from './solution-item-icon2.js';

const solutionContentsCss = ".icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";

const SolutionContents = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.solutionItemSelected = createEvent(this, "solutionItemSelected", 7);
    this.selectedItemId = undefined;
    this.templateHierarchy = [];
  }
  valueWatchHandler(v, oldV) {
    if (v && v !== oldV && Array.isArray(v) && v.length > 0) {
      this._treeItemSelected(v[0].id);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.valueWatchHandler(this.templateHierarchy, []);
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("calcite-tree", null, this.renderHierarchy(this.templateHierarchy))));
  }
  renderHierarchy(objs) {
    return objs.map((obj) => {
      const selected = this.selectedItemId && this.selectedItemId === obj.id;
      return (obj.dependencies && obj.dependencies.length > 0) ?
        (h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this.renderHierarchy(obj.dependencies))))
        :
          (h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), h("span", { class: "icon-text", title: obj.title }, obj.title)));
    });
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
   * Publishes the `solutionItemSelected` event containing `solutionItem` of the selected item.
   *
   * Also toggles the expanded state of the tree item.
   *
   * @param solutionItem the selected solution item to emit
   * @param evt MouseEvent or undefined
   */
  _treeItemSelected(itemId, evt = undefined) {
    var _a;
    const treeItem = (_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
    if (treeItem) {
      treeItem.expanded = !(treeItem === null || treeItem === void 0 ? void 0 : treeItem.expanded);
    }
    this.selectedItemId = itemId;
    this.solutionItemSelected.emit(itemId);
  }
  static get assetsDirs() { return ["item-type-icons"]; }
  get el() { return this; }
  static get watchers() { return {
    "templateHierarchy": ["valueWatchHandler"]
  }; }
  static get style() { return solutionContentsCss; }
}, [0, "solution-contents", {
    "selectedItemId": [1537, "selected-item-id"],
    "templateHierarchy": [1040]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["solution-contents", "calcite-checkbox", "calcite-icon", "calcite-tree", "calcite-tree-item", "solution-item-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "solution-contents":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, SolutionContents);
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-tree":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-tree-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "solution-item-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { SolutionContents as S, defineCustomElement as d };
