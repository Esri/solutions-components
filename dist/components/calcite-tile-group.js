/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { c as createObserver } from './observers.js';
import { y as focusElementInGroup } from './dom.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
};

const tileGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-sizing:border-box;display:inline-block}:host ::slotted(calcite-tile){margin-block-end:var(--calcite-spacing-px);margin-inline-end:var(--calcite-spacing-px)}.container{display:grid;grid-auto-rows:minmax(auto, 1fr)}:host([scale=s]) .container{grid-template-columns:repeat(auto-fit, minmax(100px, 1fr))}:host([scale=m]) .container{grid-template-columns:repeat(auto-fit, minmax(140px, 1fr))}:host([scale=l]) .container{grid-template-columns:repeat(auto-fit, minmax(160px, 1fr))}:host([layout=vertical]) .container{display:flex;flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTileGroupStyle0 = tileGroupCss;

const TileGroup = /*@__PURE__*/ proxyCustomElement(class TileGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        connectInteractive(this);
        this.mutationObserver?.observe(this.el, { childList: true });
        this.updateTiles();
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
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
        return (h(InteractiveContainer, { key: '85de45a7ce2b724d46e4e7a6456e94da0b34ddb9', disabled: this.disabled }, h("div", { key: '97b55eb827e1bd60b999eb42483119ff32a364a1', "aria-label": this.label, class: CSS.container, role: role }, h("slot", { key: 'ae45a8ec397c2a71c8e363eb4a37106b79807d6e', onSlotchange: this.updateTiles, ref: this.setSlotEl }))));
    }
    get el() { return this; }
    static get watchers() { return {
        "scale": ["scaleWatcher"],
        "selectionMode": ["handleSelectionModeOrAppearanceChange"],
        "selectionAppearance": ["handleSelectionModeOrAppearanceChange"]
    }; }
    static get style() { return CalciteTileGroupStyle0; }
}, [1, "calcite-tile-group", {
        "alignment": [513],
        "disabled": [516],
        "label": [1],
        "layout": [513],
        "scale": [513],
        "selectedItems": [1040],
        "selectionAppearance": [513, "selection-appearance"],
        "selectionMode": [513, "selection-mode"]
    }, [[0, "calciteInternalTileKeyEvent", "calciteInternalTileKeyEventListener"], [0, "calciteTileSelect", "calciteTileSelectHandler"]], {
        "scale": ["scaleWatcher"],
        "selectionMode": ["handleSelectionModeOrAppearanceChange"],
        "selectionAppearance": ["handleSelectionModeOrAppearanceChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tile-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tile-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TileGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTileGroup = TileGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteTileGroup, defineCustomElement };
