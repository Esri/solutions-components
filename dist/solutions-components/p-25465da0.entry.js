/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './p-4e6eb06e.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './p-d6902512.js';
import { c as createObserver } from './p-ff336351.js';
import { b as focusElementInGroup } from './p-621ad249.js';
import './p-4f82eb55.js';
import './p-7d542581.js';
import './p-91371f97.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
};

const tileGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-sizing:border-box;display:inline-block}:host ::slotted(calcite-tile){margin-block-end:var(--calcite-spacing-px);margin-inline-end:var(--calcite-spacing-px)}.container{display:grid;grid-auto-rows:minmax(auto, 1fr)}:host([scale=s]) .container{grid-template-columns:repeat(auto-fit, minmax(100px, 1fr))}:host([scale=m]) .container{grid-template-columns:repeat(auto-fit, minmax(140px, 1fr))}:host([scale=l]) .container{grid-template-columns:repeat(auto-fit, minmax(160px, 1fr))}:host([layout=vertical]) .container{display:flex;flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTileGroupStyle0 = tileGroupCss;

const TileGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTileGroupSelect = createEvent(this, "calciteTileGroupSelect", 6);
        this.items = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.getSlottedTiles = () => {
            return this.slotEl
                ?.assignedElements({ flatten: true })
                .filter((el) => el?.matches("calcite-tile"));
        };
        this.mutationObserver = createObserver("mutation", () => this.updateTiles());
        this.selectItem = (item) => {
            if (!item) {
                return;
            }
            this.items?.forEach((el) => {
                const matchingEl = item === el;
                switch (this.selectionMode) {
                    case "multiple":
                        if (matchingEl) {
                            el.selected = !el.selected;
                        }
                        break;
                    case "single":
                        el.selected = matchingEl && !el.selected;
                        break;
                    case "single-persist":
                        el.selected = !!matchingEl;
                        break;
                }
            });
            this.updateSelectedItems();
            this.calciteTileGroupSelect.emit();
        };
        this.setSlotEl = (el) => {
            this.slotEl = el;
        };
        this.updateSelectedItems = () => {
            const selectedItems = this.items?.filter((el) => el.selected);
            if ((this.selectionMode === "single" || this.selectionMode === "single-persist") &&
                selectedItems?.length > 1) {
                this.selectedItems = [selectedItems.pop()];
                this.items?.forEach((el) => {
                    if (this.selectedItems.indexOf(el) === -1) {
                        el.selected = false;
                    }
                });
            }
            else {
                this.selectedItems = selectedItems ?? [];
            }
        };
        this.updateTiles = () => {
            this.items = this.getSlottedTiles();
            this.items?.forEach((el) => {
                el.alignment = this.alignment;
                el.interactive = true;
                el.layout = this.layout;
                el.scale = this.scale;
                el.selectionAppearance = this.selectionAppearance;
                el.selectionMode = this.selectionMode;
            });
            this.updateSelectedItems();
        };
        this.alignment = "start";
        this.disabled = false;
        this.label = undefined;
        this.layout = "horizontal";
        this.scale = "m";
        this.selectedItems = [];
        this.selectionAppearance = "icon";
        this.selectionMode = "none";
    }
    scaleWatcher() {
        this.updateTiles();
    }
    handleSelectionModeOrAppearanceChange() {
        this.updateTiles();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.mutationObserver?.observe(this.el, { childList: true });
        this.updateTiles();
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalTileKeyEventListener(event) {
        if (event.composedPath().includes(this.el)) {
            event.preventDefault();
            event.stopPropagation();
            const interactiveItems = this.items?.filter((el) => !el.disabled);
            switch (event.detail.key) {
                case "ArrowDown":
                case "ArrowRight":
                    focusElementInGroup(interactiveItems, event.detail.target, "next");
                    break;
                case "ArrowUp":
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
    calciteTileSelectHandler(event) {
        if (event.composedPath().includes(this.el)) {
            this.selectItem(event.target);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        const role = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
        return (h(InteractiveContainer, { key: 'b6652c98d563b78b3eda1dfffb61efdbbfbbae58', disabled: this.disabled }, h("div", { key: 'e708dc17cf003fd7799f3f510f2dd76bb236a418', "aria-label": this.label, class: CSS.container, role: role }, h("slot", { key: 'e3fa46a38e975d2c45371fc9b5c1a89d271143e3', onSlotchange: this.updateTiles, ref: this.setSlotEl }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "scale": ["scaleWatcher"],
        "selectionMode": ["handleSelectionModeOrAppearanceChange"],
        "selectionAppearance": ["handleSelectionModeOrAppearanceChange"]
    }; }
};
TileGroup.style = CalciteTileGroupStyle0;

export { TileGroup as calcite_tile_group };
