/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Host, h } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getMapLayerHash, getMapTableHash } from "../../utils/mapViewUtils";
import state from "../../utils/publicNotificationStore";
export class MapLayerPicker {
    constructor() {
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
        this.showSingleLayerAsLabel = false;
        this.type = "select";
        this._hasMultipleLayers = true;
        this._hasValidLayers = true;
        this._isDropdownOpen = undefined;
        this.ids = [];
        this.selectedName = "";
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when no valid layers are found
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
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const id = "map-layer-picker";
        let style = this.height > 0 ? { "height": `${this.height.toString()}px` } : {};
        style = { ...style, "display": this.display };
        return (h(Host, { key: '6bd9676490aafa65af126b9cd8ed78e20040d90d' }, h("div", { key: '7664ab6c8631f32632120cc9fc2a75a5677ce808', class: "map-layer-picker-container", style: style }, h("div", { key: 'ddf7ba679279c436448d9a29a21e17e32ea24e58', class: "map-layer-picker", style: style }, !this._hasValidLayers ? this._getInvalidPlaceholder() :
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
        return (h("div", { class: "layer-picker-label-container cursor-default" }, h("calcite-icon", { icon: "layers", scale: "s" }), h("calcite-label", { class: "no-bottom-margin padding-start-1" }, this.selectedName)));
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
        const buttonClass = this.isMobile ? "" : "max-width-350";
        const buttonSlot = this.isMobile ? "trigger" : "";
        const buttonIcon = this._isDropdownOpen ? "chevron-up" : "chevron-down";
        return (h("calcite-button", { alignment: "icon-end-space-between", appearance: this.appearance, class: buttonClass, iconEnd: buttonIcon, iconStart: "layers", kind: "neutral", slot: buttonSlot, width: "full" }, h("div", null, this.selectedName)));
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
            this.type === "select" ? (h("calcite-option", { disabled: disabled, label: name, selected: selected, value: id })) : (h("calcite-dropdown-group", { class: disabled ? "disabled" : "", selectionMode: disabled ? "none" : "single" }, h("calcite-dropdown-item", { onClick: disabled ? undefined : () => void this._setSelectedLayer(id), selected: selected }, name)));
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
    static get is() { return "map-layer-picker"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-layer-picker.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-layer-picker.css"]
        };
    }
    static get properties() {
        return {
            "appearance": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"transparent\" | \"solid\"",
                    "resolved": "\"solid\" | \"transparent\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"transparent\" | \"solid\": controls the button appearance when using the \"dropdown\" type"
                },
                "attribute": "appearance",
                "reflect": false,
                "defaultValue": "\"transparent\""
            },
            "defaultLayerId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: when provided this layer ID will be used when the app loads"
                },
                "attribute": "default-layer-id",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "display": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"inline-flex\" | \"inline-block\"",
                    "resolved": "\"inline-block\" | \"inline-flex\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"inline-flex\" | \"inline-block\": controls the display style of the dropdown"
                },
                "attribute": "display",
                "reflect": false,
                "defaultValue": "\"inline-block\""
            },
            "enabledLayerIds": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string[]: Optional list of enabled layer ids\r\n If empty all layers will be available"
                },
                "defaultValue": "[]"
            },
            "enabledTableIds": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string[]: Optional list of enabled table ids\r\n If empty all tables will be available"
                },
                "defaultValue": "[]"
            },
            "height": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: optional fixed height value for the control.\r\nSpecified as pixel height."
                },
                "attribute": "height",
                "reflect": false
            },
            "isMobile": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true the component will render an optimized view for mobile devices"
                },
                "attribute": "is-mobile",
                "reflect": false
            },
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "onlyShowUpdatableLayers": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true only editable layers that support the update capability will be available"
                },
                "attribute": "only-show-updatable-layers",
                "reflect": false
            },
            "placeholderIcon": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: optional placeholder icon used with \"combobox\" type"
                },
                "attribute": "placeholder-icon",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "selectedIds": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string[]: list of layer ids that have been selected by the end user"
                },
                "defaultValue": "[]"
            },
            "scale": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\" | \"l\"",
                    "resolved": "\"l\" | \"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"s\" | \"m\" | \"l\": scale to render the component"
                },
                "attribute": "scale",
                "reflect": false,
                "defaultValue": "\"m\""
            },
            "showTables": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true standalone tables will also be available"
                },
                "attribute": "show-tables",
                "reflect": false
            },
            "showSingleLayerAsLabel": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true a map with a single layer will show a label rather than a dropdown\r\nUsed in conjunction with _hasMultipleLayers"
                },
                "attribute": "show-single-layer-as-label",
                "reflect": false,
                "defaultValue": "false"
            },
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"select\" | \"combobox\" | \"dropdown\"",
                    "resolved": "\"combobox\" | \"dropdown\" | \"select\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"select\" | \"combobox\" | \"dropdown\": type of component to leverage"
                },
                "attribute": "type",
                "reflect": false,
                "defaultValue": "\"select\""
            }
        };
    }
    static get states() {
        return {
            "_hasMultipleLayers": {},
            "_hasValidLayers": {},
            "_isDropdownOpen": {},
            "ids": {},
            "selectedName": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "idsFound",
                "name": "idsFound",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when no valid layers are found"
                },
                "complexType": {
                    "original": "ILayerAndTableIds",
                    "resolved": "ILayerAndTableIds",
                    "references": {
                        "ILayerAndTableIds": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ILayerAndTableIds"
                        }
                    }
                }
            }, {
                "method": "noLayersFound",
                "name": "noLayersFound",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when no valid layers are found"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "layerSelectionChange",
                "name": "layerSelectionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when a layer is selected"
                },
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
