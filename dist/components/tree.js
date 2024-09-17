/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { f as focusElement, A as nodeListToArray } from './dom.js';

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

const Tree = /*@__PURE__*/ proxyCustomElement(class Tree extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 6);
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
        return (h(Host, { key: 'bf35df5ec62af45c25800f0a911e0004ac9a0e8f', "aria-multiselectable": this.child
                ? undefined
                : (this.selectionMode === "multiple" || this.selectionMode === "multichildren").toString(), onKeyDown: this.keyDownHandler, role: !this.child ? "tree" : undefined, tabIndex: this.getRootTabIndex() }, h("slot", { key: 'cff28234e6e4cc20dbeaf714667de2c2facabaf0' })));
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
    onInternalTreeItemSelect(event) {
        if (this.child) {
            return;
        }
        const target = event.target;
        const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
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
            const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
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
            : nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected);
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
        this.selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected);
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
    get el() { return this; }
    static get style() { return CalciteTreeStyle0; }
}, [1, "calcite-tree", {
        "lines": [1540],
        "child": [1540],
        "scale": [1537],
        "selectionMode": [1537, "selection-mode"],
        "selectedItems": [1040]
    }, [[0, "focus", "onFocus"], [0, "focusin", "onFocusIn"], [0, "focusout", "onFocusOut"], [0, "calciteInternalTreeItemSelect", "onInternalTreeItemSelect"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tree"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tree":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Tree);
            }
            break;
    } });
}
defineCustomElement();

export { Tree as T, defineCustomElement as d };
