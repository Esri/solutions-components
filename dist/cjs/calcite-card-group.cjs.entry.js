/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const dom = require('./dom-795d4a33.js');
const interactive = require('./interactive-a128ac30.js');
const loadable = require('./loadable-1c888c87.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./browser-333a21c5.js');

const cardGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}.container{display:flex;flex-wrap:wrap;gap:var(--calcite-card-group-space, var(--calcite-card-group-gap, var(--calcite-size-md)))}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteCardGroupStyle0 = cardGroupCss;

const CardGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteCardGroupSelect = index.createEvent(this, "calciteCardGroupSelect", 6);
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
        interactive.updateHostInteraction(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
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
                    dom.focusElementInGroup(interactiveItems, event.target, "next");
                    break;
                case "ArrowLeft":
                    dom.focusElementInGroup(interactiveItems, event.target, "previous");
                    break;
                case "Home":
                    dom.focusElementInGroup(interactiveItems, event.target, "first");
                    break;
                case "End":
                    dom.focusElementInGroup(interactiveItems, event.target, "last");
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
        await loadable.componentLoaded(this);
        if (!this.disabled) {
            dom.focusElement(this.items[0]);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const role = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
        return (index.h(index.Host, { key: '2aa2152806418f305065d23ec9779668086f10c9' }, index.h(interactive.InteractiveContainer, { key: '64717db7b05788f5448b898ab9bfc2a553ed6ac9', disabled: this.disabled }, index.h("div", { key: 'f6725d6c8942a0c69aed287bee24d79fd42c7e89', "aria-label": this.label, class: "container", role: role }, index.h("slot", { key: 'a88d6f133fdceafba10ceb9517428b3c7ee8cffb', onSlotchange: this.updateItemsOnSlotChange, ref: (el) => (this.slotRefEl = el) })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selectionMode": ["onSelectionModeChange"]
    }; }
};
CardGroup.style = CalciteCardGroupStyle0;

exports.calcite_card_group = CardGroup;
