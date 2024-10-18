/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { g as getLayerOrTable, d as getMapLayerHash, e as getMapTableHash } from './mapViewUtils.js';
import { s as state } from './publicNotificationStore.js';
import { d as defineCustomElement$f } from './action.js';
import { d as defineCustomElement$e } from './button.js';
import { d as defineCustomElement$d } from './chip.js';
import { d as defineCustomElement$c } from './combobox.js';
import { d as defineCustomElement$b } from './combobox-item.js';
import { d as defineCustomElement$a } from './dropdown.js';
import { d as defineCustomElement$9 } from './dropdown-group.js';
import { d as defineCustomElement$8 } from './dropdown-item.js';
import { d as defineCustomElement$7 } from './icon.js';
import { d as defineCustomElement$6 } from './label2.js';
import { d as defineCustomElement$5 } from './loader.js';
import { d as defineCustomElement$4 } from './notice.js';
import { d as defineCustomElement$3 } from './option.js';
import { d as defineCustomElement$2 } from './select.js';
import { d as defineCustomElement$1 } from './tooltip.js';

const mapLayerPickerCss = ":host{display:block}.map-layer-picker-container{width:100%;align-items:center}.map-layer-picker{position:relative;width:100%;display:inline-block}.padding-bottom-1{padding-bottom:1rem}.layer-picker-dropdown{height:100%;width:100%}.max-width-350{max-width:350px}.height-100{height:100%}.disabled{cursor:default !important;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled);pointer-events:none}.no-bottom-margin{--calcite-label-margin-bottom:0px}.layer-picker-label-container{align-items:center;display:inline-flex;height:100%;padding-inline-start:1rem;padding-inline-end:1rem}.padding-start-1{padding-inline-start:1rem}.cursor-default{cursor:default}";
const MapLayerPickerStyle0 = mapLayerPickerCss;

const MapLayerPicker = /*@__PURE__*/ proxyCustomElement(class MapLayerPicker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.idsFound = createEvent(this, "idsFound", 7);
        this.noLayersFound = createEvent(this, "noLayersFound", 7);
        this.layerSelectionChange = createEvent(this, "layerSelectionChange", 7);
        this.appearance = "transparent";
        this.defaultLayerId = "";
        this.display = "inline-block";
        this.enabledLayerIds = [];
        this.enabledTableIds = [];
        this.height = undefined;
        this.isMobile = undefined;
        this.mapView = undefined;
        this.onlyShowUpdatableLayers = undefined;
        this.placeholderIcon = "";
        this.selectedIds = [];
        this.scale = "m";
        this.showTables = undefined;
        this.showTablesDisabled = undefined;
        this.showSingleLayerAsLabel = false;
        this.type = "select";
        this._hasMultipleLayers = true;
        this._hasValidLayers = true;
        this._isDropdownOpen = undefined;
        this.ids = [];
        this.selectedName = "";
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: When true the default layer has been loaded once and should no longer be used
     */
    defaultLayerHonored = false;
    /**
     * HTMLCalciteSelectElement: The html element for selecting layers
     */
    _layerElement;
    /**
     * IMapItemHash: id/name lookup
     */
    _layerNameHash;
    /**
     * IMapItemHash: id/name lookup
     */
    _tableNameHash;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     */
    async mapViewWatchHandler() {
        await this._setLayers();
        if (this.ids.length > 0) {
            this._hasValidLayers = true;
            this._hasMultipleLayers = this.ids.length > 1;
            this._setSelectedLayer(this.ids[0]);
        }
        else {
            this._hasValidLayers = false;
            this.noLayersFound.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * updates the layers
     */
    async updateLayer() {
        this._setSelectedLayer(this.ids[0]);
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when valid layers are found
     *
     */
    idsFound;
    /**
     * Emitted on demand when no valid layers are found
     *
     */
    noLayersFound;
    /**
     * Emitted on demand when a layer is selected
     *
     */
    layerSelectionChange;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._setLayers();
    }
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillRender() {
        if (this.ids.length > 0 || this.selectedIds.length === 1) {
            const id = this.selectedIds.length === 1 ? this.selectedIds[0] : this.ids[0];
            if (id !== this.selectedIds[0]) {
                this._setSelectedLayer(id);
            }
            // update the layer name when changing the layout (for crowdsource manager)
            else {
                const layer = await getLayerOrTable(this.mapView, this.selectedIds[0]);
                this.selectedName = layer?.title;
            }
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const id = "map-layer-picker";
        let style = this.height > 0 ? { "height": `${this.height.toString()}px` } : {};
        style = { ...style, "display": this.display };
        return (h(Host, { key: 'a876ec719aede5ec43af1b40f09e4c9e6b693f34' }, h("div", { key: '78e720facdf3c124208ff8dbde18a056234e63ac', class: "map-layer-picker-container", style: style }, h("div", { key: '6bb47ccb7c28565b140d79b6af6399a235e3ccf9', class: "map-layer-picker", style: style }, !this._hasValidLayers ? this._getInvalidPlaceholder() :
            !this._hasMultipleLayers && this.showSingleLayerAsLabel ? this._getSingleLayerPlaceholder() :
                this.type === "combobox" ? this._getCombobox(id) :
                    this.type === "select" ? this._getSelect(id) : this._getDropdown(id)))));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        if (this.ids.length > 0 || this.selectedIds.length === 1) {
            const id = this.selectedIds.length === 1 ? this.selectedIds[0] : this.ids[0];
            if (this.type === "select") {
                this._layerElement.value = id;
            }
            else if (this.type === "dropdown") {
                this.selectedName = Object.keys(this._layerNameHash).indexOf(id) > -1 ?
                    this._layerNameHash[id].name : Object.keys(this._tableNameHash).indexOf(id) > -1 ?
                    this._tableNameHash[id].name : "";
            }
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Create a notice to inform the user that no layers were found
     *
     * @returns Calcite Notice component with the message
     */
    _getInvalidPlaceholder() {
        return (h("div", null, h("calcite-notice", { class: "height-100", icon: "exclamation-mark-triangle", id: "no-valid-layers", kind: "danger", open: true }, h("div", { slot: "message" }, this._translations.noLayersFound)), h("calcite-tooltip", { label: this._translations.enableEditUpdate, placement: "bottom", "reference-element": "no-valid-layers" }, h("span", null, this._translations.enableEditUpdate))));
    }
    /**
     * Show layer name as a label with icon
     *
     * @returns Calcite label with the layer name and icon
     */
    _getSingleLayerPlaceholder() {
        const itemTypeIcon = this._getItemTypeIcon();
        return (h("div", { class: "layer-picker-label-container cursor-default" }, h("calcite-icon", { icon: itemTypeIcon, scale: "s" }), h("calcite-label", { class: "no-bottom-margin padding-start-1" }, this.selectedName)));
    }
    /**
     * Create a list of layers from the map
     * Used for selecting a single layer.
     *
     * @param id the id for the select component used to support the tooltip
     *
     * @returns Calcite Select component with the ids of the layers from the map
     */
    _getSelect(id) {
        return (h("calcite-select", { id: id, label: "", onCalciteSelectChange: () => this._layerSelectionChange(), ref: (el) => { this._layerElement = el; }, scale: this.scale }, this._getMapLayerOptions()));
    }
    /**
     * Create a list of layer ids from the map
     * Used for selecting multiple layers
     *
     * @param id the id for the combobox component used to support the tooltip
     *
     * @returns Calcite ComboBox component with the ids of the layers from the map
     */
    _getCombobox(id) {
        return (h("calcite-combobox", { clearDisabled: true, id: id, label: "", onCalciteComboboxChange: () => this._layerSelectionChange(), "placeholder-icon": this.placeholderIcon, ref: (el) => { this._layerElement = el; }, scale: this.scale, "selection-mode": "single" }, this._getMapLayerOptions()));
    }
    /**
     * Hydrate a dropdown component with items to display the layer names
     *
     * @param id the id for the dropdown component used to support the tooltip
     *
     * @returns Array of Dropdown items with layer names
     */
    _getDropdown(id) {
        return (h("calcite-dropdown", { class: "layer-picker-dropdown", onCalciteDropdownBeforeClose: () => this._isDropdownOpen = false, onCalciteDropdownBeforeOpen: () => this._isDropdownOpen = true }, this.isMobile ? this._getDropdownButton() : this._getActionDropdownButton(id), h("calcite-dropdown-group", { "selection-mode": "single" }, this._getMapLayerOptions())));
    }
    /**
     * Get the button that will open the dropdown list wrapped in an action
     *
     * @returns the node for the action and button
     */
    _getActionDropdownButton(id) {
        return (h("calcite-action", { id: id, slot: "trigger", text: "" }, this._getDropdownButton()));
    }
    /**
     * Get the button that will open the dropdown list
     *
     * @returns the node for the button
     */
    _getDropdownButton() {
        const itemTypeIcon = this._getItemTypeIcon();
        const buttonClass = this.isMobile ? "" : "max-width-350";
        const buttonSlot = this.isMobile ? "trigger" : "";
        const buttonIcon = this._isDropdownOpen ? "chevron-up" : "chevron-down";
        return (h("calcite-button", { alignment: "icon-end-space-between", appearance: this.appearance, class: buttonClass, iconEnd: buttonIcon, iconStart: itemTypeIcon, kind: "neutral", slot: buttonSlot, width: "full" }, h("div", null, this.selectedName)));
    }
    /**
     * Get the appropriate icon based on the selected layer or table
     *
     * @returns a string for the appropriate icon
     */
    _getItemTypeIcon() {
        let itemTypeIcon = "layers";
        if (this.selectedIds.length > 0) {
            const id = this.selectedIds[0];
            itemTypeIcon = Object.keys(this._layerNameHash).indexOf(id) > -1 ? "layers" : "table";
        }
        return itemTypeIcon;
    }
    /**
     * Get the appropriate type of dom nodes for each valid layer or table
     *
     * @returns Array of dom nodes with the names of the layers and optionally of the tables
     */
    _getMapLayerOptions() {
        return this.ids.reduce((prev, cur) => {
            if (this._validLayer(cur)) {
                prev.push(this._getItem(cur, "layer"));
            }
            else if (this._validTable(cur)) {
                prev.push(this._getItem(cur, "table"));
            }
            return prev;
        }, []);
    }
    /**
     * Get the appropriate type of dom node for the current layer or table id
     *
     * @returns A dom node with the name of the layer or table
     */
    _getItem(id, itemType) {
        const item = itemType === "layer" ? this._layerNameHash[id] : this._tableNameHash[id];
        const disabled = this.onlyShowUpdatableLayers ? !item.supportsUpdate : false;
        const name = item.name;
        const selected = this.selectedIds.indexOf(id) > -1;
        return this.type === "combobox" ? (h("calcite-combobox-item", { disabled: disabled, selected: selected, textLabel: name, value: id })) :
            this.type === "select" ? (h("calcite-option", { disabled: disabled, label: name, selected: selected, value: id })) : (h("calcite-dropdown-group", { class: disabled ? "disabled" : "", selectionMode: disabled ? "none" : "single" }, h("calcite-dropdown-item", { disabled: itemType === 'table' && this.showTablesDisabled, "icon-start": itemType, onClick: disabled ? undefined : () => void this._setSelectedLayer(id), selected: selected }, name)));
    }
    /**
     * Store the layer name based on the user selection
     */
    _setSelectedLayer(id) {
        let item;
        const hasDefaultLayer = this.defaultLayerId && !this.defaultLayerHonored;
        if (hasDefaultLayer) {
            item = this._getLayerFromHash(this.defaultLayerId);
            this.defaultLayerHonored = item !== undefined;
            id = this.defaultLayerHonored ? this.defaultLayerId : id;
        }
        item = item ? item : this._getLayerFromHash(id);
        this.selectedName = item?.name;
        this.selectedIds = [id];
        this.layerSelectionChange.emit(this.selectedIds);
    }
    /**
     * Fetch layer hash info for the given id
     *
     * @returns ILayerHashInfo for the id
     */
    _getLayerFromHash(id) {
        return Object.keys(this._layerNameHash).indexOf(id) > -1 ?
            this._layerNameHash[id] : Object.keys(this._tableNameHash).indexOf(id) > -1 ?
            this._tableNameHash[id] : undefined;
    }
    /**
     * Fetch the ids of the layers from the map
     *
     * @returns Promise when the operation has completed
     */
    async _setLayers() {
        if (this.mapView) {
            await this._initLayerTableHash();
            const layerIds = this.onlyShowUpdatableLayers ?
                this._getEditableIds(this._layerNameHash) : Object.keys(this._layerNameHash);
            const tableIds = this.showTables ? this.onlyShowUpdatableLayers ?
                this._getEditableIds(this._tableNameHash) : Object.keys(this._tableNameHash) : [];
            this.ids = [
                ...layerIds.reverse().filter(n => this.enabledLayerIds?.length > 0 ? this.enabledLayerIds.reverse().indexOf(n) > -1 : true),
                ...tableIds.reverse().filter(n => this.enabledTableIds?.length > 0 ? this.enabledTableIds.reverse().indexOf(n) > -1 : true),
            ];
            this.idsFound.emit({
                layerIds,
                tableIds
            });
        }
    }
    /**
     * Fetch the ids of all layers that support edits with the update capability
     *
     * @returns array of layer ids
     */
    _getEditableIds(hash) {
        return Object.keys(hash).reduce((prev, cur) => {
            if (hash[cur].supportsUpdate) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * Create a layer id:title hash for layer name display
     *
     * @returns Promise when the operation has completed
     */
    async _initLayerTableHash() {
        this._layerNameHash = await getMapLayerHash(this.mapView, this.onlyShowUpdatableLayers);
        this._tableNameHash = this.showTables ? await getMapTableHash(this.mapView, this.onlyShowUpdatableLayers) : {};
    }
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the layer will be used in the current layer picker type
     */
    _validLayer(id) {
        const name = this._layerNameHash[id]?.name;
        return name && Object.keys(state.managedLayers).indexOf(name) < 0 && (this.enabledLayerIds.length > 0 ?
            this.enabledLayerIds.indexOf(id) > -1 : true);
    }
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the table will be used in the current layer picker type
     */
    _validTable(id) {
        const name = this._tableNameHash[id]?.name;
        const validName = name && this.showTables;
        return validName ? state.managedTables.indexOf(name) < 0 &&
            (this.enabledTableIds.length > 0 ? this.enabledTableIds.indexOf(id) > -1 : true) : validName;
    }
    /**
     * Fetch the ids of the layers from the map
     *
     * @returns Promise when the operation has completed
     */
    _layerSelectionChange() {
        const ids = Array.isArray(this._layerElement.value) ? this._layerElement.value : [this._layerElement.value];
        if (JSON.stringify(ids) !== JSON.stringify([""])) {
            this.selectedIds = ids;
            this.layerSelectionChange.emit(this.selectedIds);
        }
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return MapLayerPickerStyle0; }
}, [0, "map-layer-picker", {
        "appearance": [1],
        "defaultLayerId": [1, "default-layer-id"],
        "display": [1],
        "enabledLayerIds": [16],
        "enabledTableIds": [16],
        "height": [2],
        "isMobile": [4, "is-mobile"],
        "mapView": [16],
        "onlyShowUpdatableLayers": [4, "only-show-updatable-layers"],
        "placeholderIcon": [1, "placeholder-icon"],
        "selectedIds": [1040],
        "scale": [1],
        "showTables": [4, "show-tables"],
        "showTablesDisabled": [4, "show-tables-disabled"],
        "showSingleLayerAsLabel": [4, "show-single-layer-as-label"],
        "type": [1],
        "_hasMultipleLayers": [32],
        "_hasValidLayers": [32],
        "_isDropdownOpen": [32],
        "ids": [32],
        "selectedName": [32],
        "_translations": [32],
        "updateLayer": [64]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-layer-picker", "calcite-action", "calcite-button", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-icon", "calcite-label", "calcite-loader", "calcite-notice", "calcite-option", "calcite-select", "calcite-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapLayerPicker);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { MapLayerPicker as M, defineCustomElement as d };
