/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { y as focusElementInGroup, f as focusElement } from './dom.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, b as componentLoaded } from './loadable.js';

const cardGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-card-group-space, var(--calcite-card-group-gap, var(--calcite-size-md)))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteCardGroupStyle0 = cardGroupCss;

const CardGroup = /*@__PURE__*/ proxyCustomElement(class CardGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteCardGroupSelect = createEvent(this, "calciteCardGroupSelect", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Properties
        //
        //--------------------------------------------------------------------------
        this.items = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.udpateItemsOnSelectionModeChange = () => {
            this.updateSlottedItems(this.slotRefEl);
            this.updateSelectedItems();
        };
        this.updateItemsOnSlotChange = (event) => {
            this.updateSlottedItems(event.target);
            this.updateSelectedItems();
        };
        this.updateSlottedItems = (target) => {
            this.items = target
                .assignedElements({ flatten: true })
                .filter((el) => el?.matches("calcite-card"));
        };
        this.updateSelectedItems = () => {
            this.items.forEach((el) => {
                el.selectionMode = this.selectionMode;
            });
            this.setSelectedItems(false);
        };
        this.setSelectedItems = (emit, elToMatch) => {
            if (elToMatch) {
                this.items.forEach((el) => {
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
            this.selectedItems = this.items.filter((el) => el.selected);
            if (emit && this.selectionMode !== "none" && !this.disabled) {
                this.calciteCardGroupSelect.emit();
            }
        };
        this.disabled = false;
        this.label = undefined;
        this.selectionMode = "none";
        this.selectedItems = [];
    }
    onSelectionModeChange() {
        this.udpateItemsOnSelectionModeChange();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidRender() {
        updateHostInteraction(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalCardKeyEventListener(event) {
        if (event.composedPath().includes(this.el)) {
            const interactiveItems = this.items.filter((el) => !el.disabled);
            switch (event.detail["key"]) {
                case "ArrowRight":
                    focusElementInGroup(interactiveItems, event.target, "next");
                    break;
                case "ArrowLeft":
                    focusElementInGroup(interactiveItems, event.target, "previous");
                    break;
                case "Home":
                    focusElementInGroup(interactiveItems, event.target, "first");
                    break;
                case "End":
                    focusElementInGroup(interactiveItems, event.target, "last");
                    break;
            }
        }
    }
    calciteCardSelectListener(event) {
        if (event.composedPath().includes(this.el) &&
            !event.target.selectable) {
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
        await componentLoaded(this);
        if (!this.disabled) {
            focusElement(this.items[0]);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const role = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
        return (h(Host, { key: '2aa2152806418f305065d23ec9779668086f10c9' }, h(InteractiveContainer, { key: '64717db7b05788f5448b898ab9bfc2a553ed6ac9', disabled: this.disabled }, h("div", { key: 'f6725d6c8942a0c69aed287bee24d79fd42c7e89', "aria-label": this.label, class: "container", role: role }, h("slot", { key: 'a88d6f133fdceafba10ceb9517428b3c7ee8cffb', onSlotchange: this.updateItemsOnSlotChange, ref: (el) => (this.slotRefEl = el) })))));
    }
    get el() { return this; }
    static get watchers() { return {
        "selectionMode": ["onSelectionModeChange"]
    }; }
    static get style() { return CalciteCardGroupStyle0; }
}, [1, "calcite-card-group", {
        "disabled": [516],
        "label": [1],
        "selectionMode": [513, "selection-mode"],
        "selectedItems": [1040],
        "setFocus": [64]
    }, [[0, "calciteInternalCardKeyEvent", "calciteInternalCardKeyEventListener"], [0, "calciteCardSelect", "calciteCardSelectListener"]], {
        "selectionMode": ["onSelectionModeChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-card-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-card-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CardGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteCardGroup = CardGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteCardGroup, defineCustomElement };
