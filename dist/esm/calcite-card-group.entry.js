/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { d as focusElementInGroup, e as focusElement, t as toAriaBoolean } from './dom-b5c50286.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-742ba555.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, b as componentLoaded } from './loadable-73f289b6.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './browser-552eb2d0.js';

const cardGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{--calcite-card-group-gap:var(--calcite-size-md);display:block}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-card-group-gap)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteCardGroupStyle0 = cardGroupCss;

const CardGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    connectedCallback() {
        connectInteractive(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
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
        return (h(Host, { key: 'f7d72ac0d0c8b0cec9b1c5c048ed2a8ee304d9e2' }, h(InteractiveContainer, { key: 'b477bbced684168f1e68c1fe0d8511a689653995', disabled: this.disabled }, h("div", { key: 'ce0aa841b96ad23886e109203a14ac2b0e54b948', "aria-disabled": toAriaBoolean(this.disabled), "aria-label": this.label, class: "container", role: role }, h("slot", { key: '338c12be0a5a675daf911aad6049aff6319d3064', onSlotchange: this.updateItemsOnSlotChange, ref: (el) => (this.slotRefEl = el) })))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectionMode": ["onSelectionModeChange"]
    }; }
};
CardGroup.style = CalciteCardGroupStyle0;

export { CardGroup as calcite_card_group };
