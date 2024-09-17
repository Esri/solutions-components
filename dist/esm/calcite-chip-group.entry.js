/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-b793d9aa.js';
import { h as slotChangeGetAssignedElements, d as focusElementInGroup, t as toAriaBoolean } from './dom-b5c50286.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-742ba555.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable-73f289b6.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './browser-552eb2d0.js';

const chipGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;inline-size:100%;flex-wrap:wrap;gap:0.5rem}::slotted(calcite-chip){flex:none}:host([scale=s]) .container{gap:0.25rem}:host([scale=l]) .container{gap:0.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteChipGroupStyle0 = chipGroupCss;

const ChipGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteChipGroupSelect = createEvent(this, "calciteChipGroupSelect", 6);
        this.items = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.updateItems = (event) => {
            const itemsFromSlot = this.slotRefEl
                ?.assignedElements({ flatten: true })
                .filter((el) => el?.matches("calcite-chip"));
            this.items = !event
                ? itemsFromSlot
                : slotChangeGetAssignedElements(event);
            if (this.items?.length < 1) {
                return;
            }
            this.items?.forEach((el) => {
                el.interactive = true;
                el.scale = this.scale;
                el.selectionMode = this.selectionMode;
                el.parentChipGroup = this.el;
            });
            this.setSelectedItems(false);
        };
        this.updateSelectedItems = () => {
            this.selectedItems = this.items?.filter((el) => el.selected);
        };
        this.setSelectedItems = (emit, elToMatch) => {
            if (elToMatch) {
                this.items?.forEach((el) => {
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
            this.updateSelectedItems();
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
        connectInteractive(this);
    }
    componentDidRender() {
        disconnectInteractive(this);
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
    calciteInternalChipKeyEventListener(event) {
        if (event.composedPath().includes(this.el)) {
            const interactiveItems = this.items?.filter((el) => !el.disabled);
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
        event.stopPropagation();
    }
    calciteChipCloseListener(event) {
        const item = event.target;
        if (this.items?.includes(item)) {
            if (this.items?.indexOf(item) > 0) {
                focusElementInGroup(this.items, item, "previous");
            }
            else if (this.items?.indexOf(item) === 0) {
                focusElementInGroup(this.items, item, "next");
            }
            else {
                focusElementInGroup(this.items, item, "first");
            }
        }
        this.items = this.items?.filter((el) => el !== item);
        event.stopPropagation();
    }
    calciteChipSelectListener(event) {
        if (event.composedPath().includes(this.el)) {
            this.setSelectedItems(true, event.target);
        }
        event.stopPropagation();
    }
    calciteInternalChipSelectListener(event) {
        if (event.composedPath().includes(this.el)) {
            this.setSelectedItems(false, event.target);
        }
        event.stopPropagation();
    }
    calciteInternalSyncSelectedChips(event) {
        if (event.composedPath().includes(this.el)) {
            this.updateSelectedItems();
            if (this.selectionMode === "single" && this.selectedItems.length > 1) {
                this.setSelectedItems(false, event.target);
            }
        }
        event.stopPropagation();
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
        await componentFocusable(this);
        if (!this.disabled) {
            return (this.selectedItems[0] || this.items[0])?.setFocus();
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
        return (h(InteractiveContainer, { key: '341dd9e8f25d4d358ea6e33740d8b851a5fa0e9d', disabled: disabled }, h("div", { key: '66c9eaa00b7ca0c602f94a017f5b6ef6afc3bd93', "aria-disabled": toAriaBoolean(disabled), "aria-label": this.label, class: "container", role: role }, h("slot", { key: 'd62c336c6cdca0bbd5c6673975ae4a25bc8ef9df', onSlotchange: this.updateItems, ref: (el) => (this.slotRefEl = el) }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectionMode": ["onSelectionModeChange"]
    }; }
};
ChipGroup.style = CalciteChipGroupStyle0;

export { ChipGroup as calcite_chip_group };
