/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement, a as getAssetPath } from './index-09deaa39.js';
import { f as focusElement, n as nodeListToArray, m as getRootNode, a as getSlotted, b as getElementDir, t as toAriaBoolean, j as filterDirectChildren } from './dom-3bdc69ee.js';
import { C as CSS_UTILITY } from './resources-436ae282.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-e96b0a4f.js';
import { u as updateHostInteraction } from './interactive-822ffed6.js';
import './guid-15fce7c0.js';
import './observers-31601001.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
var TreeSelectionMode;
(function (TreeSelectionMode) {
  TreeSelectionMode["Single"] = "single";
  TreeSelectionMode["Multi"] = "multi";
  TreeSelectionMode["None"] = "none";
  TreeSelectionMode["Children"] = "children";
  TreeSelectionMode["MultiChildren"] = "multi-children";
  TreeSelectionMode["Ancestors"] = "ancestors";
})(TreeSelectionMode || (TreeSelectionMode = {}));

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
function isTreeItem(element) {
  return element === null || element === void 0 ? void 0 : element.matches("calcite-tree-item");
}
function getEnabledSiblingItem(el, direction) {
  const directionProp = direction === "down" ? "nextElementSibling" : "previousElementSibling";
  let currentEl = el;
  let enabledEl = null;
  while (isTreeItem(currentEl)) {
    if (!currentEl.disabled) {
      enabledEl = currentEl;
      break;
    }
    currentEl = currentEl[directionProp];
  }
  return enabledEl;
}

const treeCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block}:host(:focus){outline:2px solid transparent;outline-offset:2px}";

const Tree = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Displays indentation guide lines. */
    this.lines = false;
    /**
     * Display input
     *
     * @deprecated Use `selectionMode="ancestors"` for checkbox input.
     */
    this.inputEnabled = false;
    /** Specifies the size of the component. */
    this.scale = "m";
    /**
     * Customize how the component's selection works.
     *
     * @default "single"
     * @see [TreeSelectionMode](https://github.com/Esri/calcite-components/blob/master/src/components/tree/interfaces.ts#L5)
     */
    this.selectionMode = TreeSelectionMode.Single;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillRender() {
    var _a;
    const parent = (_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree");
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.child = !!parent;
  }
  render() {
    return (h(Host, { "aria-multiselectable": this.child
        ? undefined
        : (this.selectionMode === TreeSelectionMode.Multi ||
          this.selectionMode === TreeSelectionMode.MultiChildren).toString(), role: !this.child ? "tree" : undefined, tabIndex: this.getRootTabIndex() }, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onFocus() {
    if (!this.child) {
      const focusTarget = this.el.querySelector("calcite-tree-item[selected]:not([disabled])") || this.el.querySelector("calcite-tree-item:not([disabled])");
      focusElement(focusTarget);
    }
  }
  onFocusIn(event) {
    const focusedFromRootOrOutsideTree = event.relatedTarget === this.el || !this.el.contains(event.relatedTarget);
    if (focusedFromRootOrOutsideTree) {
      // gives user the ability to tab into external elements (modifying tabindex property will not work in firefox)
      this.el.removeAttribute("tabindex");
    }
  }
  onFocusOut(event) {
    const willFocusOutsideTree = !this.el.contains(event.relatedTarget);
    if (willFocusOutsideTree) {
      this.el.tabIndex = this.getRootTabIndex();
    }
  }
  onClick(event) {
    const target = event.target;
    const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
    if (this.child) {
      return;
    }
    if (!this.child) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.selectionMode === TreeSelectionMode.Ancestors && !this.child) {
      this.updateAncestorTree(event);
      return;
    }
    const isNoneSelectionMode = this.selectionMode === TreeSelectionMode.None;
    const shouldSelect = this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren)));
    const shouldModifyToCurrentSelection = !isNoneSelectionMode &&
      event.detail.modifyCurrentSelection &&
      (this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren);
    const shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
      this.selectionMode === TreeSelectionMode.Children;
    const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
      (((this.selectionMode === TreeSelectionMode.Single ||
        this.selectionMode === TreeSelectionMode.Multi) &&
        childItems.length <= 0) ||
        this.selectionMode === TreeSelectionMode.Children ||
        this.selectionMode === TreeSelectionMode.MultiChildren);
    const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
      this.selectionMode === TreeSelectionMode.MultiChildren;
    if (!this.child) {
      const targetItems = [];
      if (shouldSelect) {
        targetItems.push(target);
      }
      if (shouldSelectChildren) {
        childItems.forEach((treeItem) => {
          targetItems.push(treeItem);
        });
      }
      if (shouldClearCurrentSelection) {
        const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
        selectedItems.forEach((treeItem) => {
          if (!targetItems.includes(treeItem)) {
            treeItem.selected = false;
          }
        });
      }
      if (shouldExpandTarget && !event.detail.forceToggle) {
        target.expanded = true;
      }
      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }
      if ((shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && event.detail.forceToggle)) {
        targetItems.forEach((treeItem) => {
          if (!treeItem.disabled) {
            treeItem.selected = false;
          }
        });
      }
      else if (!isNoneSelectionMode) {
        targetItems.forEach((treeItem) => {
          if (!treeItem.disabled) {
            treeItem.selected = true;
          }
        });
      }
    }
    const selected = isNoneSelectionMode
      ? [target]
      : nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected);
    this.calciteTreeSelect.emit({ selected });
    event.stopPropagation();
  }
  keyDownHandler(event) {
    var _a;
    const root = this.el.closest("calcite-tree:not([child])");
    const target = event.target;
    if (!(root === this.el && target.tagName === "CALCITE-TREE-ITEM" && this.el.contains(target))) {
      return;
    }
    if (event.key === "ArrowDown") {
      const next = getEnabledSiblingItem(target.nextElementSibling, "down");
      if (next) {
        next.focus();
        event.preventDefault();
      }
      return;
    }
    if (event.key === "ArrowUp") {
      const previous = getEnabledSiblingItem(target.previousElementSibling, "up");
      if (previous) {
        previous.focus();
        event.preventDefault();
      }
    }
    if (event.key === "ArrowLeft" && !target.disabled) {
      // When focus is on an open node, closes the node.
      if (target.hasChildren && target.expanded) {
        target.expanded = false;
        event.preventDefault();
        return;
      }
      // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
      const parentItem = target.parentElement.closest("calcite-tree-item");
      if (parentItem && (!target.hasChildren || target.expanded === false)) {
        parentItem.focus();
        event.preventDefault();
        return;
      }
      // When focus is on a root node that is also either an end node or a closed node, does nothing.
      return;
    }
    if (event.key === "ArrowRight" && !target.disabled) {
      if (target.hasChildren) {
        if (target.expanded && getRootNode(this.el).activeElement === target) {
          // When focus is on an open node, moves focus to the first child node.
          (_a = getEnabledSiblingItem(target.querySelector("calcite-tree-item"), "down")) === null || _a === void 0 ? void 0 : _a.focus();
          event.preventDefault();
        }
        else {
          // When focus is on a closed node, opens the node; focus does not move.
          target.expanded = true;
          event.preventDefault();
        }
      }
      return;
    }
  }
  updateAncestorTree(event) {
    const item = event.target;
    if (item.disabled) {
      return;
    }
    const ancestors = [];
    let parent = item.parentElement.closest("calcite-tree-item");
    while (parent) {
      ancestors.push(parent);
      parent = parent.parentElement.closest("calcite-tree-item");
    }
    const childItems = Array.from(item.querySelectorAll("calcite-tree-item:not([disabled])"));
    const childItemsWithNoChildren = childItems.filter((child) => !child.hasChildren);
    const childItemsWithChildren = childItems.filter((child) => child.hasChildren);
    const futureSelected = item.hasChildren
      ? !(item.selected || item.indeterminate)
      : !item.selected;
    childItemsWithNoChildren.forEach((el) => {
      el.selected = futureSelected;
      el.indeterminate = false;
    });
    function updateItemState(childItems, item) {
      const selected = childItems.filter((child) => child.selected);
      const unselected = childItems.filter((child) => !child.selected);
      item.selected = selected.length === childItems.length;
      item.indeterminate = selected.length > 0 && unselected.length > 0;
    }
    childItemsWithChildren.forEach((el) => {
      const directChildItems = Array.from(el.querySelectorAll(":scope > calcite-tree > calcite-tree-item"));
      updateItemState(directChildItems, el);
    });
    if (item.hasChildren) {
      updateItemState(childItems, item);
    }
    else {
      item.selected = futureSelected;
      item.indeterminate = false;
    }
    ancestors.forEach((ancestor) => {
      const descendants = nodeListToArray(ancestor.querySelectorAll("calcite-tree-item"));
      const activeDescendants = descendants.filter((el) => el.selected);
      if (activeDescendants.length === 0) {
        ancestor.selected = false;
        ancestor.indeterminate = false;
        return;
      }
      const indeterminate = activeDescendants.length < descendants.length;
      ancestor.indeterminate = indeterminate;
      ancestor.selected = !indeterminate;
    });
    this.calciteTreeSelect.emit({
      selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected)
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getRootTabIndex() {
    return !this.child ? 0 : -1;
  }
  get el() { return getElement(this); }
};
Tree.style = treeCss;

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

const TreeItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"],
    "selectionMode": ["getselectionMode"]
  }; }
};
TreeItem.style = treeItemCss;

const solutionItemIconCss = ".item-type-icon{pointer-events:none;display:block;height:1rem;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}.item-type-icon-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.item-type-icon-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.item-type-icon-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.item-type-icon-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.item-type-icon-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.item-type-icon-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.item-type-icon-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.item-type-icon-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>.item-type-icon{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>.item-type-icon{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>.item-type-icon{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>.item-type-icon{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>.item-type-icon{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>.item-type-icon{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>.item-type-icon{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>.item-type-icon{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>.item-type-icon{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>.item-type-icon{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>.item-type-icon{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>.item-type-icon{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>.item-type-icon{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>.item-type-icon{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>.item-type-icon{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>.item-type-icon{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face .item-type-icon{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face .item-type-icon b,.code-face .item-type-icon strong{font-weight:400}.code-italic .item-type-icon{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic .item-type-icon b,.code-italic .item-type-icon strong{font-weight:400}.item-type-icon{margin-top:0.15em !important;min-width:16px;fill:currentColor;transform:rotate(360deg)}.item-type-icon-margin{-webkit-margin-end:0.375rem;margin-inline-end:0.375rem}";

const SolutionItemIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isPortal = false;
    this.type = "";
    this.typeKeywords = [];
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * Renders the component.
   */
  render() {
    return h("div", { title: this.type }, h("img", { class: "item-type-icon item-type-icon-margin", height: "16", src: this._getIconUrl(this.type, this.typeKeywords), width: "16" }));
  }
  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------
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
   * This function was copied and slightly modified from the arcgis-portal-app.
   *
   * This will construct the path to the icon based on type and typeKeyword info.
   *
   * @param type The item type
   * @param typeKeywords The item typeKeywords
   */
  _getIconUrl(type, typeKeywords) {
    const itemType = (type && type.toLowerCase()) || "", imgDir = "./item-icons/", size = "16"; //for now we only support 16x16 pixel images
    let isHosted = false, isRouteLayer = false, isMarkupLayer = false, isTable = false, isSpatiotemporal = false, isRelational = false, imgName = "";
    typeKeywords = typeKeywords || [];
    if (itemType.indexOf("service") > 0 || itemType === "feature collection" || itemType === "kml" || itemType === "wms" || itemType === "wmts" || itemType === "wfs") {
      isHosted = typeKeywords.indexOf("Hosted Service") > -1;
      if (itemType === "feature service" || itemType === "feature collection" || itemType === "kml" || itemType === "wfs") {
        isTable = typeKeywords.indexOf("Table") > -1;
        isRouteLayer = typeKeywords.indexOf("Route Layer") > -1;
        isMarkupLayer = typeKeywords.indexOf("Markup") > -1;
        isSpatiotemporal = typeKeywords.indexOf("Spatiotemporal") !== -1;
        imgName = isSpatiotemporal && isTable ? "spatiotemporaltable" : (isTable ? "table" : (isRouteLayer ? "routelayer" : (isMarkupLayer ? "markup" : (isSpatiotemporal ? "spatiotemporal" : (isHosted ? "featureshosted" : "features")))));
      }
      else if (itemType === "map service" || itemType === "wms" || itemType === "wmts") {
        isSpatiotemporal = typeKeywords.indexOf("Spatiotemporal") !== -1;
        isRelational = typeKeywords.indexOf("Relational") !== -1;
        if (isSpatiotemporal || isRelational) {
          imgName = "mapimages";
        }
        else {
          imgName = (isHosted || typeKeywords.indexOf("Tiled") > -1 || itemType === "wmts") ? "maptiles" : "mapimages";
        }
      }
      else if (itemType === "scene service") {
        if (typeKeywords.indexOf("Line") > -1) {
          imgName = "sceneweblayerline";
        }
        else if (typeKeywords.indexOf("3DObject") > -1) {
          imgName = "sceneweblayermultipatch";
        }
        else if (typeKeywords.indexOf("Point") > -1) {
          imgName = "sceneweblayerpoint";
        }
        else if (typeKeywords.indexOf("IntegratedMesh") > -1) {
          imgName = "sceneweblayermesh";
        }
        else if (typeKeywords.indexOf("PointCloud") > -1) {
          imgName = "sceneweblayerpointcloud";
        }
        else if (typeKeywords.indexOf("Polygon") > -1) {
          imgName = "sceneweblayerpolygon";
        }
        else if (typeKeywords.indexOf("Building") > -1) {
          imgName = "sceneweblayerbuilding";
        }
        else {
          imgName = "sceneweblayer";
        }
      }
      else if (itemType === "image service") {
        imgName = typeKeywords.indexOf("Elevation 3D Layer") > -1 ? "elevationlayer" : (typeKeywords.indexOf("Tiled Imagery") > -1 ? "tiledimagerylayer" : "imagery");
      }
      else if (itemType === "stream service") {
        imgName = "streamlayer";
      }
      else if (itemType === "vector tile service") {
        imgName = "vectortile";
      }
      else if (itemType === "datastore catalog service") {
        imgName = "datastorecollection";
      }
      else if (itemType === "geocoding service") {
        imgName = "geocodeservice";
      }
      else if (itemType === "geoprocessing service") {
        imgName = (typeKeywords.indexOf("Web Tool") > -1 && (this.isPortal)) ? "tool" : "layers";
      }
      else {
        imgName = "layers";
      }
    }
    else if (itemType === "web map" || itemType === "cityengine web scene") {
      imgName = "maps";
    }
    else if (itemType === "web scene") {
      imgName = typeKeywords.indexOf("ViewingMode-Local") > -1 ? "webscenelocal" : "websceneglobal";
    }
    else if (itemType === "web mapping application" || itemType === "mobile application" || itemType === "application" ||
      itemType === "operation view" || itemType === "desktop application") {
      imgName = "apps";
    }
    else if (itemType === "map document" || itemType === "map package" || itemType === "published map" || itemType === "scene document" ||
      itemType === "globe document" || itemType === "basemap package" || itemType === "mobile basemap package" || itemType === "mobile map package" ||
      itemType === "project package" || itemType === "project template" || itemType === "pro map" || itemType === "layout" ||
      (itemType === "layer" && typeKeywords.indexOf("ArcGIS Pro") > -1) || (itemType === "explorer map" && typeKeywords.indexOf("Explorer Document"))) {
      imgName = "mapsgray";
    }
    else if (itemType === "service definition" || itemType === "csv" || itemType === "shapefile" || itemType === "cad drawing" || itemType === "geojson" || itemType === "360 vr experience" || itemType === "netcdf" || itemType === "administrative report") {
      imgName = "datafiles";
    }
    else if (itemType === "explorer add in" || itemType === "desktop add in" || itemType === "windows viewer add in" || itemType === "windows viewer configuration") {
      imgName = "appsgray";
    }
    else if (itemType === "arcgis pro add in" || itemType === "arcgis pro configuration") {
      imgName = "addindesktop";
    }
    else if (itemType === "rule package" || itemType === "file geodatabase" || itemType === "sqlite geodatabase" || itemType === "csv collection" || itemType === "kml collection" ||
      itemType === "windows mobile package" || itemType === "map template" || itemType === "desktop application template" || itemType === "gml" ||
      itemType === "arcpad package" || itemType === "code sample" || itemType === "form" || itemType === "document link" ||
      itemType === "operations dashboard add in" || itemType === "rules package" || itemType === "image" || itemType === "workflow manager package" ||
      (itemType === "explorer map" && typeKeywords.indexOf("Explorer Mapping Application") > -1 || typeKeywords.indexOf("Document") > -1)) {
      imgName = "datafilesgray";
    }
    else if (itemType === "network analysis service" || itemType === "geoprocessing service" ||
      itemType === "geodata service" || itemType === "geometry service" || itemType === "geoprocessing package" ||
      itemType === "locator package" || itemType === "geoprocessing sample" || itemType === "workflow manager service") {
      imgName = "toolsgray";
    }
    else if (itemType === "layer" || itemType === "layer package" || itemType === "explorer layer") {
      imgName = "layersgray";
    }
    else if (itemType === "scene package") {
      imgName = "scenepackage";
    }
    else if (itemType === "mobile scene package") {
      imgName = "mobilescenepackage";
    }
    else if (itemType === "tile package" || itemType === "compact tile package") {
      imgName = "tilepackage";
    }
    else if (itemType === "task file") {
      imgName = "taskfile";
    }
    else if (itemType === "report template") {
      imgName = "report-template";
    }
    else if (itemType === "statistical data collection") {
      imgName = "statisticaldatacollection";
    }
    else if (itemType === "insights workbook") {
      imgName = "workbook";
    }
    else if (itemType === "insights model") {
      imgName = "insightsmodel";
    }
    else if (itemType === "insights page") {
      imgName = "insightspage";
    }
    else if (itemType === "insights theme") {
      imgName = "insightstheme";
    }
    else if (itemType === "hub initiative") {
      imgName = "hubinitiative";
    }
    else if (itemType === "hub page") {
      imgName = "hubpage";
    }
    else if (itemType === "hub site application") {
      imgName = "hubsite";
    }
    else if (itemType === "hub event") {
      imgName = "hubevent";
    }
    else if (itemType === "relational database connection") {
      imgName = "relationaldatabaseconnection";
    }
    else if (itemType === "big data file share") {
      imgName = "datastorecollection";
    }
    else if (itemType === "image collection") {
      imgName = "imagecollection";
    }
    else if (itemType === "desktop style") {
      imgName = "desktopstyle";
    }
    else if (itemType === "style") {
      imgName = "style";
    }
    else if (itemType === "dashboard") {
      imgName = "dashboard";
    }
    else if (itemType === "raster function template") {
      imgName = "rasterprocessingtemplate";
    }
    else if (itemType === "vector tile package") {
      imgName = "vectortilepackage";
    }
    else if (itemType === "ortho mapping project") {
      imgName = "orthomappingproject";
    }
    else if (itemType === "ortho mapping template") {
      imgName = "orthomappingtemplate";
    }
    else if (itemType === "solution") {
      imgName = "solutions";
    }
    else if (itemType === "geopackage") {
      imgName = "geopackage";
    }
    else if (itemType === "deep learning package") {
      imgName = "deeplearningpackage";
    }
    else if (itemType === "real time analytic") {
      imgName = "realtimeanalytics";
    }
    else if (itemType === "big data analytic") {
      imgName = "bigdataanalytics";
    }
    else if (itemType === "feed") {
      imgName = "feed";
    }
    else if (itemType === "excalibur imagery project") {
      imgName = "excaliburimageryproject";
    }
    else if (itemType === "notebook") {
      imgName = "notebook";
    }
    else if (itemType === "storymap") {
      imgName = "storymap";
    }
    else if (itemType === "survey123 add in") {
      imgName = "survey123addin";
    }
    else if (itemType === "mission") {
      imgName = "mission";
    }
    else if (itemType === "mission report") {
      imgName = "missionreport";
    }
    else if (itemType === "quickcapture project") {
      imgName = "quickcaptureproject";
    }
    else if (itemType === "pro report") {
      imgName = "proreport";
    }
    else if (itemType === "urban model") {
      imgName = "urbanmodel";
    }
    else if (itemType === "web experience") {
      imgName = "experiencebuilder";
    }
    else if (itemType === "web experience template") {
      imgName = "webexperiencetemplate";
    }
    else if (itemType === "workflow") {
      imgName = "workflow";
    }
    else if (itemType === "kernel gateway connection") {
      imgName = "kernelgatewayconnection";
    }
    else if (itemType === "insights script") {
      imgName = "insightsscript";
    }
    else if (itemType === "hub initiative template") {
      imgName = "hubinitiativetemplate";
    }
    else if (itemType === "storymap theme") {
      imgName = "storymaptheme";
    }
    else if (itemType === "group") {
      imgName = "group";
    }
    else {
      imgName = "maps";
    }
    return imgName ? getAssetPath(imgDir + imgName + size + ".png") : null;
  }
  static get assetsDirs() { return ["item-icons"]; }
  get el() { return getElement(this); }
};
SolutionItemIcon.style = solutionItemIconCss;

export { Tree as calcite_tree, TreeItem as calcite_tree_item, SolutionItemIcon as solution_item_icon };
