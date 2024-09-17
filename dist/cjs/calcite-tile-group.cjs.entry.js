/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const interactive = require('./interactive-89f913ba.js');
const observers = require('./observers-8fed90f3.js');
const dom = require('./dom-6a9b6275.js');
require('./browser-69696af0.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');

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

const TileGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteTileGroupSelect = index.createEvent(this, "calciteTileGroupSelect", 6);
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
        this.mutationObserver = observers.createObserver("mutation", () => this.updateTiles());
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
        interactive.connectInteractive(this);
        this.mutationObserver?.observe(this.el, { childList: true });
        this.updateTiles();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
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
                    dom.focusElementInGroup(interactiveItems, event.detail.target, "next");
                    break;
                case "ArrowUp":
                case "ArrowLeft":
                    dom.focusElementInGroup(interactiveItems, event.detail.target, "previous");
                    break;
                case "Home":
                    dom.focusElementInGroup(interactiveItems, event.detail.target, "first");
                    break;
                case "End":
                    dom.focusElementInGroup(interactiveItems, event.detail.target, "last");
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
        return (index.h(interactive.InteractiveContainer, { key: '85de45a7ce2b724d46e4e7a6456e94da0b34ddb9', disabled: this.disabled }, index.h("div", { key: '97b55eb827e1bd60b999eb42483119ff32a364a1', "aria-label": this.label, class: CSS.container, role: role }, index.h("slot", { key: 'ae45a8ec397c2a71c8e363eb4a37106b79807d6e', onSlotchange: this.updateTiles, ref: this.setSlotEl }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "scale": ["scaleWatcher"],
        "selectionMode": ["handleSelectionModeOrAppearanceChange"],
        "selectionAppearance": ["handleSelectionModeOrAppearanceChange"]
    }; }
};
TileGroup.style = CalciteTileGroupStyle0;

exports.calcite_tile_group = TileGroup;
