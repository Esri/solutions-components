/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const conditionalSlot = require('./conditionalSlot-6b5d9b84.js');
const interactive = require('./interactive-89f913ba.js');
const resources = require('./resources-dfe71ff2.js');
const component = require('./component-a4c6a35d.js');
require('./guid-02e5380f.js');
require('./observers-8fed90f3.js');
require('./browser-69696af0.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
function isTreeItem(element) {
    return element?.tagName === "CALCITE-TREE-ITEM";
}
function getTraversableItems(root) {
    return Array.from(root.querySelectorAll("calcite-tree-item:not([disabled])")).filter((item) => {
        let currentItem = item;
        while (currentItem !== root && currentItem !== undefined) {
            const parent = currentItem.parentElement;
            const traversable = !isTreeItem(parent) || !parent.hasChildren || parent.expanded;
            if (!traversable) {
                return false;
            }
            currentItem = currentItem.parentElement;
        }
        return true;
    });
}

const treeCss = ":host{display:block}:host(:focus){outline:2px solid transparent;outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTreeStyle0 = treeCss;

const Tree = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteTreeSelect = index.createEvent(this, "calciteTreeSelect", 6);
        this.keyDownHandler = (event) => {
            if (this.child) {
                return;
            }
            const root = this.el;
            const target = event.target;
            const supportedKeys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End", "Tab"];
            if (!(isTreeItem(target) && this.el.contains(target)) || !supportedKeys.includes(event.key)) {
                return;
            }
            const traversableItems = getTraversableItems(root);
            if (event.key === "Tab") {
                // root tabindex will be restored when blurred/focused
                traversableItems.forEach((item) => (item.tabIndex = -1));
                return;
            }
            if (event.key === "ArrowDown") {
                const currentItemIndex = traversableItems.indexOf(target);
                const nextItem = traversableItems[currentItemIndex + 1];
                nextItem?.focus();
                event.preventDefault();
                return;
            }
            if (event.key === "ArrowUp") {
                const currentItemIndex = traversableItems.indexOf(target);
                const previousItem = traversableItems[currentItemIndex - 1];
                previousItem?.focus();
                event.preventDefault();
                return;
            }
            if (event.key === "ArrowLeft") {
                if (target.hasChildren && target.expanded) {
                    target.expanded = false;
                    event.preventDefault();
                    return;
                }
                const rootToItemPath = traversableItems.slice(0, traversableItems.indexOf(target)).reverse();
                const parentItem = rootToItemPath.find((item) => item.depth === target.depth - 1);
                parentItem?.focus();
                event.preventDefault();
                return;
            }
            if (event.key === "ArrowRight") {
                if (!target.disabled && target.hasChildren) {
                    if (!target.expanded) {
                        target.expanded = true;
                        event.preventDefault();
                    }
                    else {
                        const currentItemIndex = traversableItems.indexOf(target);
                        const nextItem = traversableItems[currentItemIndex + 1];
                        nextItem?.focus();
                        event.preventDefault();
                    }
                }
                return;
            }
            if (event.key === "Home") {
                const firstNode = traversableItems.shift();
                if (firstNode) {
                    firstNode.focus();
                    event.preventDefault();
                }
                return;
            }
            if (event.key === "End") {
                const lastNode = traversableItems.pop();
                if (lastNode) {
                    lastNode.focus();
                    event.preventDefault();
                }
                return;
            }
        };
        this.lines = false;
        this.child = undefined;
        this.scale = "m";
        this.selectionMode = "single";
        this.selectedItems = [];
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillRender() {
        const parent = this.el.parentElement?.closest("calcite-tree");
        this.lines = parent ? parent.lines : this.lines;
        this.scale = parent ? parent.scale : this.scale;
        this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
        this.child = !!parent;
    }
    render() {
        return (index.h(index.Host, { key: 'bf35df5ec62af45c25800f0a911e0004ac9a0e8f', "aria-multiselectable": this.child
                ? undefined
                : (this.selectionMode === "multiple" || this.selectionMode === "multichildren").toString(), onKeyDown: this.keyDownHandler, role: !this.child ? "tree" : undefined, tabIndex: this.getRootTabIndex() }, index.h("slot", { key: 'cff28234e6e4cc20dbeaf714667de2c2facabaf0' })));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onFocus() {
        if (!this.child) {
            const focusTarget = this.el.querySelector("calcite-tree-item[selected]:not([disabled])") || this.el.querySelector("calcite-tree-item:not([disabled])");
            dom.focusElement(focusTarget);
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
    onInternalTreeItemSelect(event) {
        if (this.child) {
            return;
        }
        const target = event.target;
        const childItems = dom.nodeListToArray(target.querySelectorAll("calcite-tree-item"));
        event.preventDefault();
        event.stopPropagation();
        if (this.selectionMode === "ancestors") {
            this.updateAncestorTree(event);
            return;
        }
        const isNoneSelectionMode = this.selectionMode === "none";
        const shouldSelect = this.selectionMode !== null &&
            (!target.hasChildren ||
                (target.hasChildren &&
                    (this.selectionMode === "children" || this.selectionMode === "multichildren")));
        const shouldDeselectAllChildren = this.selectionMode === "multichildren" && target.hasChildren;
        const shouldModifyToCurrentSelection = !isNoneSelectionMode &&
            event.detail.modifyCurrentSelection &&
            (this.selectionMode === "multiple" || this.selectionMode === "multichildren");
        const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
            (((this.selectionMode === "single" || this.selectionMode === "multiple") &&
                childItems.length <= 0) ||
                this.selectionMode === "children" ||
                this.selectionMode === "multichildren" ||
                (this.selectionMode === "single-persist" && !target.hasChildren));
        const shouldUpdateExpand = ["multiple", "none", "single", "single-persist"].includes(this.selectionMode) &&
            target.hasChildren;
        const targetItems = [];
        if (shouldSelect) {
            targetItems.push(target);
        }
        if (shouldClearCurrentSelection) {
            const selectedItems = dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
            selectedItems.forEach((treeItem) => {
                if (!targetItems.includes(treeItem)) {
                    treeItem.selected = false;
                }
            });
        }
        if (shouldUpdateExpand &&
            ["multiple", "none", "single", "single-persist"].includes(this.selectionMode)) {
            target.expanded = !target.expanded;
        }
        if (shouldDeselectAllChildren) {
            childItems.forEach((item) => {
                item.selected = false;
                if (item.hasChildren) {
                    item.expanded = false;
                }
            });
        }
        if (shouldModifyToCurrentSelection) {
            window.getSelection().removeAllRanges();
        }
        if (shouldModifyToCurrentSelection && target.selected) {
            targetItems.forEach((treeItem) => {
                if (!treeItem.disabled) {
                    treeItem.selected = false;
                }
            });
        }
        else if (!isNoneSelectionMode) {
            targetItems.forEach((treeItem) => {
                if (!treeItem.disabled) {
                    treeItem.selected = this.selectionMode !== "single" || !treeItem.selected;
                }
            });
        }
        this.selectedItems = isNoneSelectionMode
            ? []
            : dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected);
        this.calciteTreeSelect.emit();
        event.stopPropagation();
    }
    updateAncestorTree(event) {
        const item = event.target;
        const updateItem = event.detail.updateItem;
        if (item.disabled || (item.indeterminate && !updateItem)) {
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
        let futureSelected;
        if (updateItem) {
            futureSelected = item.hasChildren ? !(item.selected || item.indeterminate) : !item.selected;
        }
        else {
            futureSelected = item.selected;
        }
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
        childItemsWithChildren.reverse().forEach((el) => {
            const directChildItems = Array.from(el.querySelectorAll(":scope > calcite-tree > calcite-tree-item"));
            updateItemState(directChildItems, el);
        });
        if (updateItem) {
            if (item.hasChildren) {
                updateItemState(childItems, item);
            }
            else {
                item.selected = futureSelected;
                item.indeterminate = false;
            }
        }
        ancestors.forEach((ancestor) => {
            const descendants = dom.nodeListToArray(ancestor.querySelectorAll("calcite-tree-item"));
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
        this.selectedItems = dom.nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected);
        if (updateItem) {
            this.calciteTreeSelect.emit();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getRootTabIndex() {
        return !this.child ? 0 : -1;
    }
    get el() { return index.getElement(this); }
};
Tree.style = CalciteTreeStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    actionsEnd: "actions-end",
    bulletPointIcon: "bullet-point",
    checkbox: "checkbox",
    checkboxContainer: "checkbox-container",
    checkboxLabel: "checkbox-label",
    checkmarkIcon: "checkmark",
    chevron: "chevron",
    childrenContainer: "children-container",
    iconStart: "icon-start",
    itemExpanded: "item--expanded",
    nodeAndActionsContainer: "node-actions-container",
    nodeContainer: "node-container",
};
const SLOTS = {
    actionsEnd: "actions-end",
    children: "children",
};
const ICONS = {
    blank: "blank",
    bulletPoint: "bullet-point",
    checkmark: "check",
    checkSquareF: "check-square-f",
    chevronRight: "chevron-right",
    minusSquareF: "minus-square-f",
    square: "square",
};

const treeItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;max-inline-size:100%;cursor:pointer;color:var(--calcite-color-text-3)}.node-actions-container{display:flex}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .node-actions-container{min-block-size:1.5rem}:host([scale=s]) .node-actions-container .node-container .checkbox,:host([scale=s]) .node-actions-container .node-container .checkmark,:host([scale=s]) .node-actions-container .node-container .bullet-point{margin-inline:0.25rem}:host([scale=s]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=s]) .node-actions-container .node-container .chevron{padding:0.25rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .node-actions-container{min-block-size:2rem}:host([scale=m]) .node-actions-container .node-container .checkbox,:host([scale=m]) .node-actions-container .node-container .checkmark,:host([scale=m]) .node-actions-container .node-container .bullet-point{margin-inline:0.5rem}:host([scale=m]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=m]) .node-actions-container .node-container .chevron{padding:0.5rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .node-actions-container{min-block-size:2.75rem}:host([scale=l]) .node-actions-container .node-container .checkbox,:host([scale=l]) .node-actions-container .node-container .checkmark,:host([scale=l]) .node-actions-container .node-container .bullet-point{margin-inline:0.75rem}:host([scale=l]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=l]) .node-actions-container .node-container .chevron{padding-inline:var(--calcite-size-md);padding-block:var(--calcite-size-sm-plus)}:host([lines]) .children-container::after{position:absolute;inset-block-start:0px;z-index:var(--calcite-z-index);inline-size:1px;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;block-size:96%;content:\"\";background-color:var(--calcite-color-border-2)}:host(:not([lines])) .node-container::after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){inline-size:100%;text-decoration-line:none}:host{outline:2px solid transparent;outline-offset:2px}:host .node-container{outline-color:transparent}:host:focus .node-container,:host:active .node-container{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus:not([disabled])) .node-container{outline:2px solid transparent;outline-offset:2px;outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus:not([disabled])) .checkbox{outline:2px solid transparent;outline-offset:2px}.actions-end{display:flex;flex-direction:row;align-items:center;align-self:stretch}.checkbox-container{display:flex;align-items:center}.checkbox{line-height:0;color:var(--calcite-color-border-input)}.checkbox-label{pointer-events:none;display:flex;align-items:center}.children-container{position:relative;block-size:0px;transform-origin:top;overflow:hidden;opacity:0;margin-inline-start:1.25rem;transform:scaleY(0);transition:var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out}.item--expanded>.children-container{overflow:visible;opacity:1;transform:none;block-size:auto}.node-container{position:relative;display:flex;min-inline-size:0px;flex-grow:1;align-items:center}.node-container .checkmark,.node-container .bullet-point{opacity:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:var(--calcite-color-border-1)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus:not([disabled])) .node-container .checkmark,:host(:focus:not([disabled])) .node-container .bullet-point{opacity:1}:host([selected]) .node-container,:host([selected]) .node-container:hover{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}:host([selected]) .node-container .bullet-point,:host([selected]) .node-container .checkmark,:host([selected]) .node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark{opacity:1;color:var(--calcite-color-brand)}:host([selection-mode=none]:not([has-children])):host([scale=s]) .node-container{padding-inline-start:0.5rem}:host([selection-mode=none]:not([has-children])):host([scale=m]) .node-container{padding-inline-start:1rem}:host([selection-mode=none]:not([has-children])):host([scale=l]) .node-container{padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=s]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.25rem}:host(:not([has-children])):host([scale=m]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=l]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.75rem}:host([has-children]) .node-container[data-selection-mode=ancestors] .checkbox{margin-inline-start:0}:host([has-children]) .node-container .bullet-point,:host([has-children]) .node-container .checkmark{display:none}.chevron{position:relative;align-self:center;color:var(--calcite-color-text-3);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;flex:0 0 auto;transform:rotate(0deg)}.calcite--rtl .chevron{transform:rotate(180deg)}.item--expanded .node-container>.chevron{transform:rotate(90deg)}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-color-brand)}:host([selected]) .checkbox{color:var(--calcite-color-brand)}:host([has-children][indeterminate]) .checkbox{color:var(--calcite-color-brand)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTreeItemStyle0 = treeItemCss;

const TreeItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalTreeItemSelect = index.createEvent(this, "calciteInternalTreeItemSelect", 6);
        this.iconClickHandler = (event) => {
            event.stopPropagation();
            this.expanded = !this.expanded;
        };
        this.childrenClickHandler = (event) => event.stopPropagation();
        this.userChangedValue = false;
        this.updateParentIsExpanded = (el, expanded) => {
            const items = dom.getSlotted(el, SLOTS.children, {
                all: true,
                selector: "calcite-tree-item",
            });
            items.forEach((item) => (item.parentExpanded = expanded));
        };
        this.actionsEndSlotChangeHandler = (event) => {
            this.hasEndActions = dom.slotChangeHasAssignedElement(event);
        };
        this.disabled = false;
        this.label = undefined;
        this.expanded = false;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.selected = false;
        this.parentExpanded = false;
        this.depth = -1;
        this.hasChildren = null;
        this.lines = undefined;
        this.scale = undefined;
        this.indeterminate = false;
        this.selectionMode = undefined;
        this.hasEndActions = false;
        this.updateAfterInitialRender = false;
    }
    expandedHandler(newValue) {
        this.updateParentIsExpanded(this.el, newValue);
    }
    handleSelectedChange(value) {
        if (this.selectionMode === "ancestors" && !this.userChangedValue) {
            if (value) {
                this.indeterminate = false;
            }
            this.calciteInternalTreeItemSelect.emit({
                modifyCurrentSelection: true,
                updateItem: false,
            });
        }
    }
    getSelectionMode() {
        this.isSelectionMultiLike =
            this.selectionMode === "multiple" || this.selectionMode === "multichildren";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.parentTreeItem = this.el.parentElement?.closest("calcite-tree-item");
        if (this.parentTreeItem) {
            const { expanded } = this.parentTreeItem;
            this.updateParentIsExpanded(this.parentTreeItem, expanded);
        }
        conditionalSlot.connectConditionalSlotComponent(this);
        interactive.connectInteractive(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
        interactive.disconnectInteractive(this);
    }
    componentWillRender() {
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
            nextParentTree = parentTree.parentElement?.closest("calcite-tree");
            if (nextParentTree === parentTree) {
                break;
            }
            else {
                parentTree = nextParentTree;
                this.depth = this.depth + 1;
            }
        }
    }
    componentWillLoad() {
        requestAnimationFrame(() => (this.updateAfterInitialRender = true));
    }
    componentDidLoad() {
        this.updateAncestorTree();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        const rtl = dom.getElementDir(this.el) === "rtl";
        const showBulletPoint = this.selectionMode === "single" ||
            this.selectionMode === "children" ||
            this.selectionMode === "single-persist";
        const showCheckmark = this.selectionMode === "multiple" || this.selectionMode === "multichildren";
        const showBlank = this.selectionMode === "none" && !this.hasChildren;
        const checkboxIsIndeterminate = this.hasChildren && this.indeterminate;
        const chevron = this.hasChildren ? (index.h("calcite-icon", { class: {
                [CSS.chevron]: true,
                [resources.CSS_UTILITY.rtl]: rtl,
            }, "data-test-id": "icon", icon: ICONS.chevronRight, onClick: this.iconClickHandler, scale: component.getIconScale(this.scale) })) : null;
        const defaultSlotNode = index.h("slot", { key: "default-slot" });
        const checkbox = this.selectionMode === "ancestors" ? (index.h("div", { class: CSS.checkboxContainer }, index.h("calcite-icon", { class: CSS.checkbox, icon: this.selected
                ? ICONS.checkSquareF
                : checkboxIsIndeterminate
                    ? ICONS.minusSquareF
                    : ICONS.square, scale: component.getIconScale(this.scale) }), index.h("label", { class: CSS.checkboxLabel }, defaultSlotNode))) : null;
        const selectedIcon = showBulletPoint
            ? ICONS.bulletPoint
            : showCheckmark
                ? ICONS.checkmark
                : showBlank
                    ? ICONS.blank
                    : null;
        const itemIndicator = selectedIcon ? (index.h("calcite-icon", { class: {
                [CSS.bulletPointIcon]: selectedIcon === ICONS.bulletPoint,
                [CSS.checkmarkIcon]: selectedIcon === ICONS.checkmark,
                [resources.CSS_UTILITY.rtl]: rtl,
            }, icon: selectedIcon, scale: component.getIconScale(this.scale) })) : null;
        const hidden = !(this.parentExpanded || this.depth === 1);
        const isExpanded = this.updateAfterInitialRender && this.expanded;
        const { hasEndActions } = this;
        const slotNode = (index.h("slot", { key: "actionsEndSlot", name: SLOTS.actionsEnd, onSlotchange: this.actionsEndSlotChangeHandler }));
        const iconStartEl = (index.h("calcite-icon", { key: '72784b82d479a4aa782b95bd198ded6f5e6e78a9', class: CSS.iconStart, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: component.getIconScale(this.scale) }));
        return (index.h(index.Host, { key: '6671da841c7970480cc35c492ddcf0e486dc029f', "aria-checked": this.selectionMode === "multiple" ||
                this.selectionMode === "multichildren" ||
                this.selectionMode === "ancestors"
                ? dom.toAriaBoolean(this.selected)
                : undefined, "aria-expanded": this.hasChildren ? dom.toAriaBoolean(isExpanded) : undefined, "aria-hidden": dom.toAriaBoolean(hidden), "aria-live": "polite", "aria-selected": this.selectionMode === "single" ||
                this.selectionMode === "children" ||
                this.selectionMode === "single-persist"
                ? dom.toAriaBoolean(this.selected)
                : undefined, "calcite-hydrated-hidden": hidden, role: "treeitem", tabIndex: this.disabled ? -1 : 0 }, index.h(interactive.InteractiveContainer, { key: '152e8d19db10b36fe8727be17f082d773fb4cf09', disabled: this.disabled }, index.h("div", { key: '8c8733c4b1baac1848ec46a3b8820d1dabf5ac43', class: { [CSS.itemExpanded]: isExpanded } }, index.h("div", { key: '6e3b101ca30ebe415a9733b6972c7dfae39df37f', class: CSS.nodeAndActionsContainer }, index.h("div", { key: '285fbcc2d1539313c63aeff3f1d8c511c0a5b865', class: {
                [CSS.nodeContainer]: true,
                [resources.CSS_UTILITY.rtl]: rtl,
            }, "data-selection-mode": this.selectionMode, ref: (el) => (this.defaultSlotWrapper = el) }, chevron, itemIndicator, this.iconStart ? iconStartEl : null, checkbox ? checkbox : defaultSlotNode), index.h("div", { key: '47ce5bcccc12bb85815706fdea4cf2c230fb9a44', class: CSS.actionsEnd, hidden: !hasEndActions, ref: (el) => (this.actionSlotWrapper = el) }, slotNode)), index.h("div", { key: '3b307110b4ed213c3be5dcd923a05deafba1db5c', class: {
                [CSS.childrenContainer]: true,
                [resources.CSS_UTILITY.rtl]: rtl,
            }, "data-test-id": "calcite-tree-children", onClick: this.childrenClickHandler, role: this.hasChildren ? "group" : undefined }, index.h("slot", { key: 'df26d502672e8ec2b946adcfe11e4115ae514887', name: SLOTS.children }))))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    onClick(event) {
        if (this.disabled || this.isActionEndEvent(event)) {
            return;
        }
        // Solve for if the item is clicked somewhere outside the slotted anchor.
        // Anchor is triggered anywhere you click
        const [link] = dom.filterDirectChildren(this.el, "a");
        if (link && event.composedPath()[0].tagName.toLowerCase() !== "a") {
            const target = link.target === "" ? "_self" : link.target;
            window.open(link.href, target);
        }
        this.calciteInternalTreeItemSelect.emit({
            modifyCurrentSelection: this.selectionMode === "ancestors" || this.isSelectionMultiLike,
            updateItem: true,
        });
        this.userChangedValue = true;
    }
    keyDownHandler(event) {
        if (this.isActionEndEvent(event) || event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case " ":
                this.userChangedValue = true;
                this.calciteInternalTreeItemSelect.emit({
                    modifyCurrentSelection: this.isSelectionMultiLike,
                    updateItem: true,
                });
                event.preventDefault();
                break;
            case "Enter": {
                // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
                const link = Array.from(this.el.children).find((el) => el.matches("a"));
                this.userChangedValue = true;
                if (link) {
                    link.click();
                    this.selected = true;
                }
                else {
                    this.calciteInternalTreeItemSelect.emit({
                        modifyCurrentSelection: this.isSelectionMultiLike,
                        updateItem: true,
                    });
                }
                event.preventDefault();
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    isActionEndEvent(event) {
        const composedPath = event.composedPath();
        return composedPath.includes(this.actionSlotWrapper);
    }
    /**
     * This is meant to be called in `componentDidLoad` in order to take advantage of the hierarchical component lifecycle
     * and help check for item selection as items are initialized
     *
     * @private
     */
    updateAncestorTree() {
        const parentItem = this.parentTreeItem;
        if (this.selectionMode !== "ancestors" || !parentItem) {
            return;
        }
        if (this.selected) {
            const parentTree = this.el.parentElement;
            const siblings = Array.from(parentTree?.children);
            const selectedSiblings = siblings.filter((child) => child.selected);
            if (siblings.length === selectedSiblings.length) {
                parentItem.selected = true;
                parentItem.indeterminate = false;
            }
            else if (selectedSiblings.length > 0) {
                parentItem.indeterminate = true;
            }
            const childItems = Array.from(this.el.querySelectorAll("calcite-tree-item:not([disabled])"));
            childItems.forEach((item) => {
                item.selected = true;
                item.indeterminate = false;
            });
        }
        else if (this.indeterminate) {
            const parentItem = this.parentTreeItem;
            parentItem.indeterminate = true;
        }
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "selected": ["handleSelectedChange"],
        "selectionMode": ["getSelectionMode"]
    }; }
};
TreeItem.style = CalciteTreeItemStyle0;

const solutionItemIconCss = ".item-type-icon{pointer-events:none;display:block;height:1rem;margin-top:0.15em !important;min-width:16px;fill:currentColor;transform:rotate(360deg)}.item-type-icon-margin{margin-inline-end:0.375rem}";
const SolutionItemIconStyle0 = solutionItemIconCss;

const SolutionItemIcon = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.isPortal = false;
        this.type = "";
        this.typeKeywords = [];
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * Renders the component.
     */
    render() {
        return index.h("div", { key: 'e14a2bed4b4c74b5959d7b12f73f9c8a1b374e6d', title: this.type }, index.h("img", { key: 'd7a7eccc3361946b2641e8499af21b199792a223', class: "item-type-icon item-type-icon-margin", height: "16", src: this._getIconUrl(this.type, this.typeKeywords), width: "16" }));
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
        return imgName ? index.getAssetPath(imgDir + imgName + size + ".png") : null;
    }
    static get assetsDirs() { return ["item-icons"]; }
};
SolutionItemIcon.style = SolutionItemIconStyle0;

exports.calcite_tree = Tree;
exports.calcite_tree_item = TreeItem;
exports.solution_item_icon = SolutionItemIcon;
