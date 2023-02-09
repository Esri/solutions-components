/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { T as TreeSelectionMode } from './interfaces2.js';
import { b as getSlotted, c as getElementDir, C as CSS_UTILITY, t as toAriaBoolean, m as filterDirectChildren, n as nodeListToArray } from './dom.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { u as updateHostInteraction } from './interactive.js';
import { d as defineCustomElement$2 } from './checkbox.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  checkboxLabel: "checkbox-label",
  checkbox: "checkbox",
  chevron: "chevron",
  nodeContainer: "node-container",
  childrenContainer: "children-container",
  bulletPointIcon: "bullet-point",
  checkmarkIcon: "checkmark"
};
const SLOTS = {
  children: "children"
};
const ICONS = {
  bulletPoint: "bullet-point",
  checkmark: "check",
  chevronRight: "chevron-right",
  blank: "blank"
};

const treeItemCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block;max-inline-size:100%;cursor:pointer;color:var(--calcite-ui-text-3)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .node-container{--calcite-tree-padding-y:0.25rem}:host([scale=s]) .node-container .checkbox,:host([scale=s]) .node-container .chevron,:host([scale=s]) .node-container .checkmark,:host([scale=s]) .node-container .bullet-point{margin-inline:0.25rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .node-container{--calcite-tree-padding-y:0.5rem}:host([scale=m]) .node-container .checkbox,:host([scale=m]) .node-container .chevron,:host([scale=m]) .node-container .checkmark,:host([scale=m]) .node-container .bullet-point{margin-inline:0.5rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .node-container{--calcite-tree-padding-y:0.75rem}:host([scale=l]) .node-container .checkbox,:host([scale=l]) .node-container .chevron,:host([scale=l]) .node-container .checkmark,:host([scale=l]) .node-container .bullet-point{margin-inline:0.75rem}:host([lines]) .children-container:after{position:absolute;inset-block-start:0px;z-index:1;inline-size:1px;transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;block-size:96%;content:\"\";background-color:var(--calcite-ui-border-2)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){inline-size:100%;-webkit-text-decoration-line:none;text-decoration-line:none}:host{outline-color:transparent}:host(:focus:not([disabled])){outline:2px solid transparent;outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.checkbox{line-height:0}.checkbox-label{pointer-events:none;display:flex;align-items:center}.checkbox:focus{outline:2px solid transparent;outline-offset:2px}.children-container{position:relative;block-size:0px;overflow:hidden;-webkit-margin-start:1.25rem;margin-inline-start:1.25rem;transform:scaleY(0);opacity:0;transition:var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out;transform-origin:top}:host([expanded])>.children-container{transform:scaleY(1);opacity:1;block-size:auto}.node-container{position:relative;display:flex;align-items:center;padding-block:var(--calcite-tree-padding-y);padding-inline:0}.node-container .checkmark,.node-container .bullet-point{opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:var(--calcite-ui-border-1)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus:not([disabled])) .node-container .checkmark,:host(:focus:not([disabled])) .node-container .bullet-point{opacity:1}:host([selected])>.node-container,:host([selected])>.node-container:hover{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([selected])>.node-container .bullet-point,:host([selected])>.node-container .checkmark,:host([selected])>.node-container:hover .bullet-point,:host([selected])>.node-container:hover .checkmark{opacity:1;color:var(--calcite-ui-brand)}:host([selection-mode=none]:not([has-children])):host([scale=s])>.node-container{-webkit-padding-start:0.5rem;padding-inline-start:0.5rem}:host([selection-mode=none]:not([has-children])):host([scale=m])>.node-container{-webkit-padding-start:1rem;padding-inline-start:1rem}:host([selection-mode=none]:not([has-children])):host([scale=l])>.node-container{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=s])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.25rem;padding-inline-start:1.25rem}:host(:not([has-children])):host([scale=m])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=l])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.75rem;padding-inline-start:1.75rem}:host([has-children])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-margin-start:0;margin-inline-start:0}:host([has-children])>.node-container .bullet-point,:host([has-children])>.node-container .checkmark{display:none}:host([has-children][expanded]:not([selected]):not([selection-mode=none]))>.node-container ::slotted(*){font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([has-children][selected])>.node-container[data-selection-mode=children],:host([has-children][selected])>.node-container[data-selection-mode=multi-children]{color:var(--calcite-ui-brand)}.chevron{position:relative;align-self:center;color:var(--calcite-ui-text-3);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;flex:0 0 auto;transform:rotate(0deg)}.calcite--rtl .chevron{transform:rotate(180deg)}:host([expanded])>.node-container>.chevron{transform:rotate(90deg)}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-ui-brand)}";

const TreeItem = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.calciteInternalTreeItemSelect = createEvent(this, "calciteInternalTreeItemSelect", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /** When `true`, the component is selected. */
    this.selected = false;
    /** When `true`, the component is expanded. */
    this.expanded = false;
    /**
     * @internal
     */
    this.parentExpanded = false;
    /**
     * @internal
     */
    this.depth = -1;
    /**
     * @internal
     */
    this.hasChildren = null;
    this.iconClickHandler = (event) => {
      event.stopPropagation();
      this.expanded = !this.expanded;
    };
    this.childrenClickHandler = (event) => event.stopPropagation();
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.updateParentIsExpanded = (el, expanded) => {
      const items = getSlotted(el, SLOTS.children, {
        all: true,
        selector: "calcite-tree-item"
      });
      items.forEach((item) => (item.parentExpanded = expanded));
    };
    this.updateAncestorTree = () => {
      var _a;
      if (this.selected && this.selectionMode === TreeSelectionMode.Ancestors) {
        const ancestors = [];
        let parent = this.parentTreeItem;
        while (parent) {
          ancestors.push(parent);
          parent = (_a = parent.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
        }
        ancestors.forEach((item) => (item.indeterminate = true));
        return;
      }
    };
  }
  expandedHandler(newValue) {
    this.updateParentIsExpanded(this.el, newValue);
  }
  getselectionMode() {
    this.isSelectionMultiLike =
      this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.parentTreeItem = (_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
    if (this.parentTreeItem) {
      const { expanded } = this.parentTreeItem;
      this.updateParentIsExpanded(this.parentTreeItem, expanded);
    }
    connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
  }
  componentWillRender() {
    var _a;
    this.hasChildren = !!this.el.querySelector("calcite-tree");
    this.depth = 0;
    let parentTree = this.el.closest("calcite-tree");
    if (!parentTree) {
      return;
    }
    this.selectionMode = parentTree.selectionMode;
    this.scale = parentTree.scale || "m";
    this.lines = parentTree.lines;
    let nextParentTree;
    while (parentTree) {
      nextParentTree = (_a = parentTree.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree");
      if (nextParentTree === parentTree) {
        break;
      }
      else {
        parentTree = nextParentTree;
        this.depth = this.depth + 1;
      }
    }
  }
  componentDidLoad() {
    this.updateAncestorTree();
  }
  componentDidRender() {
    updateHostInteraction(this, () => this.parentExpanded || this.depth === 1);
  }
  render() {
    const rtl = getElementDir(this.el) === "rtl";
    const showBulletPoint = this.selectionMode === TreeSelectionMode.Single ||
      this.selectionMode === TreeSelectionMode.Children;
    const showCheckmark = this.selectionMode === TreeSelectionMode.Multi ||
      this.selectionMode === TreeSelectionMode.MultiChildren;
    const showBlank = this.selectionMode === TreeSelectionMode.None && !this.hasChildren;
    const chevron = this.hasChildren ? (h("calcite-icon", { class: {
        [CSS.chevron]: true,
        [CSS_UTILITY.rtl]: rtl
      }, "data-test-id": "icon", icon: ICONS.chevronRight, onClick: this.iconClickHandler, scale: "s" })) : null;
    const defaultSlotNode = h("slot", { key: "default-slot" });
    const checkbox = this.selectionMode === TreeSelectionMode.Ancestors ? (h("label", { class: CSS.checkboxLabel, key: "checkbox-label" }, h("calcite-checkbox", { checked: this.selected, class: CSS.checkbox, "data-test-id": "checkbox", indeterminate: this.hasChildren && this.indeterminate, scale: this.scale, tabIndex: -1 }), defaultSlotNode)) : null;
    const selectedIcon = showBulletPoint
      ? ICONS.bulletPoint
      : showCheckmark
        ? ICONS.checkmark
        : showBlank
          ? ICONS.blank
          : null;
    const itemIndicator = selectedIcon ? (h("calcite-icon", { class: {
        [CSS.bulletPointIcon]: selectedIcon === ICONS.bulletPoint,
        [CSS.checkmarkIcon]: selectedIcon === ICONS.checkmark,
        [CSS_UTILITY.rtl]: rtl
      }, icon: selectedIcon, scale: "s" })) : null;
    const hidden = !(this.parentExpanded || this.depth === 1);
    return (h(Host, { "aria-expanded": this.hasChildren ? toAriaBoolean(this.expanded) : undefined, "aria-hidden": toAriaBoolean(hidden), "aria-selected": this.selected ? "true" : showCheckmark ? "false" : undefined, "calcite-hydrated-hidden": hidden, role: "treeitem" }, h("div", { class: {
        [CSS.nodeContainer]: true,
        [CSS_UTILITY.rtl]: rtl
      }, "data-selection-mode": this.selectionMode, ref: (el) => (this.defaultSlotWrapper = el) }, chevron, itemIndicator, checkbox ? checkbox : defaultSlotNode), h("div", { class: {
        [CSS.childrenContainer]: true,
        [CSS_UTILITY.rtl]: rtl
      }, "data-test-id": "calcite-tree-children", onClick: this.childrenClickHandler, ref: (el) => (this.childrenSlotWrapper = el), role: this.hasChildren ? "group" : undefined }, h("slot", { name: SLOTS.children }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(event) {
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren(this.el, "a");
    if (link && event.composedPath()[0].tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.calciteInternalTreeItemSelect.emit({
      modifyCurrentSelection: this.selectionMode === TreeSelectionMode.Ancestors || this.isSelectionMultiLike,
      forceToggle: false
    });
  }
  keyDownHandler(event) {
    let root;
    switch (event.key) {
      case " ":
        this.calciteInternalTreeItemSelect.emit({
          modifyCurrentSelection: this.isSelectionMultiLike,
          forceToggle: false
        });
        event.preventDefault();
        break;
      case "Enter":
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find((el) => el.matches("a"));
        if (link) {
          link.click();
          this.selected = true;
        }
        else {
          this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.isSelectionMultiLike,
            forceToggle: false
          });
        }
        event.preventDefault();
        break;
      case "Home":
        root = this.el.closest("calcite-tree:not([child])");
        const firstNode = root.querySelector("calcite-tree-item");
        firstNode === null || firstNode === void 0 ? void 0 : firstNode.focus();
        break;
      case "End":
        root = this.el.closest("calcite-tree:not([child])");
        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find((el) => el.matches("calcite-tree"));
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find((el) => el.matches("calcite-tree"));
        }
        currentNode === null || currentNode === void 0 ? void 0 : currentNode.focus();
        break;
    }
  }
  get el() { return this; }
  static get watchers() { return {
    "expanded": ["expandedHandler"],
    "selectionMode": ["getselectionMode"]
  }; }
  static get style() { return treeItemCss; }
}, [1, "calcite-tree-item", {
    "disabled": [516],
    "selected": [1540],
    "expanded": [1540],
    "parentExpanded": [4, "parent-expanded"],
    "depth": [1538],
    "hasChildren": [1540, "has-children"],
    "lines": [1540],
    "inputEnabled": [4, "input-enabled"],
    "scale": [1537],
    "indeterminate": [516],
    "selectionMode": [1537, "selection-mode"]
  }, [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["calcite-tree-item", "calcite-checkbox", "calcite-icon"];
  components.forEach(tagName => { switch (tagName) {
    case "calcite-tree-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, TreeItem);
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { TreeItem as T, defineCustomElement as d };
