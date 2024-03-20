/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { w as focusElementInGroup, t as toAriaBoolean } from './dom.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as createObserver } from './observers.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable.js';

const chipGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;inline-size:100%;flex-wrap:wrap;gap:0.5rem}::slotted(calcite-chip){flex:none}:host([scale=s]) .container{gap:0.25rem}:host([scale=l]) .container{gap:0.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const ChipGroup = /*@__PURE__*/ proxyCustomElement(class ChipGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteChipGroupSelect = createEvent(this, "calciteChipGroupSelect", 6);
        this.mutationObserver = createObserver("mutation", () => this.updateItems());
        this.items = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.updateItems = (event) => {
            var _a;
            const target = event ? event.target : this.slotRefEl;
            this.items = target === null || target === void 0 ? void 0 : target.assignedElements({ flatten: true }).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-chip"));
            (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
                el.interactive = true;
                el.scale = this.scale;
                el.selectionMode = this.selectionMode;
            });
            this.setSelectedItems(false);
        };
        this.setSelectedItems = (emit, elToMatch) => {
            var _a, _b;
            if (elToMatch) {
                (_a = this.items) === null || _a === void 0 ? void 0 : _a.forEach((el) => {
                    const matchingEl = elToMatch === el;
                    switch (this.selectionMode) {
                        case "multiple":
                            if (matchingEl) {
                                el.selected = !el.selected;
                            }
                            break;
                        case "single":
                            el.selected = matchingEl ? !el.selected : false;
                            break;
                        case "single-persist":
                            el.selected = !!matchingEl;
                            break;
                    }
                });
            }
            this.selectedItems = (_b = this.items) === null || _b === void 0 ? void 0 : _b.filter((el) => el.selected);
            if (emit) {
                this.calciteChipGroupSelect.emit();
            }
        };
        this.disabled = false;
        this.label = undefined;
        this.scale = "m";
        this.selectionMode = "none";
        this.selectedItems = [];
    }
    onSelectionModeChange() {
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        connectInteractive(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    componentDidRender() {
        disconnectInteractive(this);
        updateHostInteraction(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalChipKeyEventListener(event) {
        var _a;
        if (event.composedPath().includes(this.el)) {
            const interactiveItems = (_a = this.items) === null || _a === void 0 ? void 0 : _a.filter((el) => !el.disabled);
            switch (event.detail.key) {
                case "ArrowRight":
                    focusElementInGroup(interactiveItems, event.detail.target, "next");
                    break;
                case "ArrowLeft":
                    focusElementInGroup(interactiveItems, event.detail.target, "previous");
                    break;
                case "Home":
                    focusElementInGroup(interactiveItems, event.detail.target, "first");
                    break;
                case "End":
                    focusElementInGroup(interactiveItems, event.detail.target, "last");
                    break;
            }
        }
    }
    calciteChipCloseListener(event) {
        var _a, _b, _c, _d;
        const item = event.target;
        if ((_a = this.items) === null || _a === void 0 ? void 0 : _a.includes(item)) {
            if (((_b = this.items) === null || _b === void 0 ? void 0 : _b.indexOf(item)) > 0) {
                focusElementInGroup(this.items, item, "previous");
            }
            else if (((_c = this.items) === null || _c === void 0 ? void 0 : _c.indexOf(item)) === 0) {
                focusElementInGroup(this.items, item, "next");
            }
            else {
                focusElementInGroup(this.items, item, "first");
            }
        }
        this.items = (_d = this.items) === null || _d === void 0 ? void 0 : _d.filter((el) => el !== item);
    }
    calciteChipSelectListener(event) {
        if (event.composedPath().includes(this.el)) {
            this.setSelectedItems(true, event.target);
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Sets focus on the component's first focusable element.
     */
    async setFocus() {
        var _a;
        await componentFocusable(this);
        if (!this.disabled) {
            return (_a = (this.selectedItems[0] || this.items[0])) === null || _a === void 0 ? void 0 : _a.setFocus();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const role = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
        const { disabled } = this;
        return (h(InteractiveContainer, { disabled: disabled }, h("div", { "aria-disabled": toAriaBoolean(disabled), "aria-label": this.label, class: "container", role: role }, h("slot", { onSlotchange: this.updateItems, ref: (el) => (this.slotRefEl = el) }))));
    }
    get el() { return this; }
    static get watchers() { return {
        "selectionMode": ["onSelectionModeChange"]
    }; }
    static get style() { return chipGroupCss; }
}, [1, "calcite-chip-group", {
        "disabled": [516],
        "label": [1],
        "scale": [513],
        "selectionMode": [513, "selection-mode"],
        "selectedItems": [1040],
        "setFocus": [64]
    }, [[0, "calciteInternalChipKeyEvent", "calciteInternalChipKeyEventListener"], [0, "calciteChipClose", "calciteChipCloseListener"], [0, "calciteChipSelect", "calciteChipSelectListener"]], {
        "selectionMode": ["onSelectionModeChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-chip-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-chip-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ChipGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteChipGroup = ChipGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteChipGroup, defineCustomElement };
