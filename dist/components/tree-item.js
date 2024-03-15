/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as getSlotted, j as slotChangeHasAssignedElement, g as getElementDir, t as toAriaBoolean, y as filterDirectChildren } from './dom.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { C as CSS_UTILITY } from './resources.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$2 } from './checkbox.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    actionsEnd: "actions-end",
    checkboxLabel: "checkbox-label",
    checkbox: "checkbox",
    chevron: "chevron",
    nodeContainer: "node-container",
    childrenContainer: "children-container",
    bulletPointIcon: "bullet-point",
    checkmarkIcon: "checkmark",
    itemExpanded: "item--expanded",
    iconStart: "icon-start",
    nodeAndActionsContainer: "node-actions-container",
};
const SLOTS = {
    actionsEnd: "actions-end",
    children: "children",
};
const ICONS = {
    bulletPoint: "bullet-point",
    checkmark: "check",
    chevronRight: "chevron-right",
    blank: "blank",
};

const treeItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;max-inline-size:100%;cursor:pointer;color:var(--calcite-color-text-3)}.node-actions-container{display:flex}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .node-actions-container{min-block-size:1.5rem}:host([scale=s]) .node-actions-container .node-container .checkbox,:host([scale=s]) .node-actions-container .node-container .chevron,:host([scale=s]) .node-actions-container .node-container .checkmark,:host([scale=s]) .node-actions-container .node-container .bullet-point{margin-inline:0.25rem}:host([scale=s]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .node-actions-container{min-block-size:2rem}:host([scale=m]) .node-actions-container .node-container .checkbox,:host([scale=m]) .node-actions-container .node-container .chevron,:host([scale=m]) .node-actions-container .node-container .checkmark,:host([scale=m]) .node-actions-container .node-container .bullet-point{margin-inline:0.5rem}:host([scale=m]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .node-actions-container{min-block-size:2.75rem}:host([scale=l]) .node-actions-container .node-container .checkbox,:host([scale=l]) .node-actions-container .node-container .chevron,:host([scale=l]) .node-actions-container .node-container .checkmark,:host([scale=l]) .node-actions-container .node-container .bullet-point{margin-inline:0.75rem}:host([scale=l]) .node-actions-container .node-container .icon-start{margin-inline:0.75rem}:host([lines]) .children-container:after{position:absolute;inset-block-start:0px;z-index:var(--calcite-z-index);inline-size:1px;transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;block-size:96%;content:\"\";background-color:var(--calcite-color-border-2)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){inline-size:100%;-webkit-text-decoration-line:none;text-decoration-line:none}:host{outline:2px solid transparent;outline-offset:2px}:host .node-container{outline-color:transparent}:host:focus .node-container,:host:active .node-container{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus:not([disabled])) .node-container{outline:2px solid transparent;outline-offset:2px;outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.actions-end{display:flex;flex-direction:row;align-items:center;align-self:stretch}.checkbox{line-height:0}.checkbox-label{pointer-events:none;display:flex;align-items:center}.checkbox:focus{outline:2px solid transparent;outline-offset:2px}.children-container{position:relative;block-size:0px;transform-origin:top;overflow:hidden;opacity:0;margin-inline-start:1.25rem;transform:scaleY(0);transition:var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out}.item--expanded>.children-container{overflow:visible;opacity:1;transform:none;block-size:auto}.node-container{position:relative;display:flex;min-inline-size:0px;flex-grow:1;align-items:center}.node-container .checkmark,.node-container .bullet-point{opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:var(--calcite-color-border-1)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus:not([disabled])) .node-container .checkmark,:host(:focus:not([disabled])) .node-container .bullet-point{opacity:1}:host([selected]) .node-container,:host([selected]) .node-container:hover{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}:host([selected]) .node-container .bullet-point,:host([selected]) .node-container .checkmark,:host([selected]) .node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark{opacity:1;color:var(--calcite-color-brand)}:host([selection-mode=none]:not([has-children])):host([scale=s]) .node-container{padding-inline-start:0.5rem}:host([selection-mode=none]:not([has-children])):host([scale=m]) .node-container{padding-inline-start:1rem}:host([selection-mode=none]:not([has-children])):host([scale=l]) .node-container{padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=s]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.25rem}:host(:not([has-children])):host([scale=m]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=l]) .node-container[data-selection-mode=ancestors] .checkbox{padding-inline-start:1.75rem}:host([has-children]) .node-container[data-selection-mode=ancestors] .checkbox{margin-inline-start:0}:host([has-children]) .node-container .bullet-point,:host([has-children]) .node-container .checkmark{display:none}.chevron{position:relative;align-self:center;color:var(--calcite-color-text-3);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;flex:0 0 auto;transform:rotate(0deg)}.calcite--rtl .chevron{transform:rotate(180deg)}.item--expanded .node-container>.chevron{transform:rotate(90deg)}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-color-brand)}:host([hidden]){display:none}[hidden]{display:none}";

const TreeItem = /*@__PURE__*/ proxyCustomElement(class TreeItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalTreeItemSelect = createEvent(this, "calciteInternalTreeItemSelect", 6);
        this.iconClickHandler = (event) => {
            event.stopPropagation();
            this.expanded = !this.expanded;
        };
        this.childrenClickHandler = (event) => event.stopPropagation();
        this.userChangedValue = false;
        this.updateParentIsExpanded = (el, expanded) => {
            const items = getSlotted(el, SLOTS.children, {
                all: true,
                selector: "calcite-tree-item",
            });
            items.forEach((item) => (item.parentExpanded = expanded));
        };
        this.actionsEndSlotChangeHandler = (event) => {
            this.hasEndActions = slotChangeHasAssignedElement(event);
        };
        this.disabled = false;
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
        var _a;
        this.parentTreeItem = (_a = this.el.parentElement) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
        if (this.parentTreeItem) {
            const { expanded } = this.parentTreeItem;
            this.updateParentIsExpanded(this.parentTreeItem, expanded);
        }
        connectConditionalSlotComponent(this);
        connectInteractive(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
        disconnectInteractive(this);
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
    componentWillLoad() {
        requestAnimationFrame(() => (this.updateAfterInitialRender = true));
    }
    componentDidLoad() {
        this.updateAncestorTree();
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        const rtl = getElementDir(this.el) === "rtl";
        const showBulletPoint = this.selectionMode === "single" || this.selectionMode === "children";
        const showCheckmark = this.selectionMode === "multiple" || this.selectionMode === "multichildren";
        const showBlank = this.selectionMode === "none" && !this.hasChildren;
        const chevron = this.hasChildren ? (h("calcite-icon", { class: {
                [CSS.chevron]: true,
                [CSS_UTILITY.rtl]: rtl,
            }, "data-test-id": "icon", icon: ICONS.chevronRight, onClick: this.iconClickHandler, scale: getIconScale(this.scale) })) : null;
        const defaultSlotNode = h("slot", { key: "default-slot" });
        const checkbox = this.selectionMode === "ancestors" ? (h("label", { class: CSS.checkboxLabel, key: "checkbox-label" }, h("calcite-checkbox", { checked: this.selected, class: CSS.checkbox, "data-test-id": "checkbox", indeterminate: this.hasChildren && this.indeterminate, scale: this.scale, tabIndex: -1 }), defaultSlotNode)) : null;
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
                [CSS_UTILITY.rtl]: rtl,
            }, icon: selectedIcon, scale: getIconScale(this.scale) })) : null;
        const hidden = !(this.parentExpanded || this.depth === 1);
        const isExpanded = this.updateAfterInitialRender && this.expanded;
        const { hasEndActions } = this;
        const slotNode = (h("slot", { key: "actionsEndSlot", name: SLOTS.actionsEnd, onSlotchange: this.actionsEndSlotChangeHandler }));
        const iconStartEl = (h("calcite-icon", { class: CSS.iconStart, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: getIconScale(this.scale) }));
        return (h(Host, { "aria-expanded": this.hasChildren ? toAriaBoolean(isExpanded) : undefined, "aria-hidden": toAriaBoolean(hidden), "aria-selected": this.selected ? "true" : showCheckmark ? "false" : undefined, "calcite-hydrated-hidden": hidden, role: "treeitem", tabIndex: this.disabled ? -1 : 0 }, h(InteractiveContainer, { disabled: this.disabled }, h("div", { class: { [CSS.itemExpanded]: isExpanded } }, h("div", { class: CSS.nodeAndActionsContainer }, h("div", { class: {
                [CSS.nodeContainer]: true,
                [CSS_UTILITY.rtl]: rtl,
            }, "data-selection-mode": this.selectionMode,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.defaultSlotWrapper = el) }, chevron, itemIndicator, this.iconStart ? iconStartEl : null, checkbox ? checkbox : defaultSlotNode), h("div", { class: CSS.actionsEnd, hidden: !hasEndActions, ref: (el) => (this.actionSlotWrapper = el) }, slotNode)), h("div", { class: {
                [CSS.childrenContainer]: true,
                [CSS_UTILITY.rtl]: rtl,
            }, "data-test-id": "calcite-tree-children", onClick: this.childrenClickHandler, role: this.hasChildren ? "group" : undefined }, h("slot", { name: SLOTS.children }))))));
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
        const [link] = filterDirectChildren(this.el, "a");
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
            case "Enter":
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
            const siblings = Array.from(parentTree === null || parentTree === void 0 ? void 0 : parentTree.children);
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
    get el() { return this; }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "selected": ["handleSelectedChange"],
        "selectionMode": ["getSelectionMode"]
    }; }
    static get style() { return treeItemCss; }
}, [1, "calcite-tree-item", {
        "disabled": [516],
        "expanded": [1540],
        "iconFlipRtl": [513, "icon-flip-rtl"],
        "iconStart": [513, "icon-start"],
        "selected": [1540],
        "parentExpanded": [4, "parent-expanded"],
        "depth": [1538],
        "hasChildren": [1540, "has-children"],
        "lines": [1540],
        "scale": [1537],
        "indeterminate": [516],
        "selectionMode": [1537, "selection-mode"],
        "hasEndActions": [32],
        "updateAfterInitialRender": [32]
    }, [[0, "click", "onClick"], [0, "keydown", "keyDownHandler"]], {
        "expanded": ["expandedHandler"],
        "selected": ["handleSelectedChange"],
        "selectionMode": ["getSelectionMode"]
    }]);
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
