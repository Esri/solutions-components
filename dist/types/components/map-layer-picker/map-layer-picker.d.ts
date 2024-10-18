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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import MapLayerPicker_T9n from "../../assets/t9n/map-layer-picker/resources.json";
import { ILayerAndTableIds, ILayerHashInfo, IMapItemHash } from "../../utils/interfaces";
export declare class MapLayerPicker {
    el: HTMLMapLayerPickerElement;
    /**
     * "transparent" | "solid": controls the button appearance when using the "dropdown" type
     */
    appearance: "transparent" | "solid";
    /**
     * string: when provided this layer ID will be used when the app loads
     */
    defaultLayerId: string;
    /**
     * "inline-flex" | "inline-block": controls the display style of the dropdown
     */
    display: "inline-flex" | "inline-block";
    /**
     * string[]: Optional list of enabled layer ids
     *  If empty all layers will be available
     */
    enabledLayerIds: string[];
    /**
     * string[]: Optional list of enabled table ids
     *  If empty all tables will be available
     */
    enabledTableIds: string[];
    /**
     * number: optional fixed height value for the control.
     * Specified as pixel height.
     */
    height: number;
    /**
     * When true the component will render an optimized view for mobile devices
     */
    isMobile: boolean;
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * boolean: When true only editable layers that support the update capability will be available
     */
    onlyShowUpdatableLayers: boolean;
    /**
     * string: optional placeholder icon used with "combobox" type
     */
    placeholderIcon: string;
    /**
     * string[]: list of layer ids that have been selected by the end user
     */
    selectedIds: string[];
    /**
     * "s" | "m" | "l": scale to render the component
     */
    scale: "s" | "m" | "l";
    /**
     * boolean: when true standalone tables will also be available
     */
    showTables: boolean;
    /**
     * boolean: when true table will shown as disabled
     */
    showTablesDisabled: boolean;
    /**
     * boolean: when true a map with a single layer will show a label rather than a dropdown
     * Used in conjunction with _hasMultipleLayers
     */
    showSingleLayerAsLabel: boolean;
    /**
     * "select" | "combobox" | "dropdown": type of component to leverage
     */
    type: "select" | "combobox" | "dropdown";
    /**
     * boolean: when true the map contains more than one valid layers
     * Used in conjunction with showSingleLayerAsLabel
     */
    _hasMultipleLayers: boolean;
    /**
     * boolean: when true the map contains valid layers and all expected tools will be enabled
     */
    _hasValidLayers: boolean;
    /**
     * boolean: when true the layer dropdown is open
     */
    _isDropdownOpen: boolean;
    /**
     * string[]: list of layer and table (if showTables is true) ids from the map
     */
    ids: string[];
    /**
     * string: current layer name to display when using "dropdown" type
     */
    selectedName: string;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof MapLayerPicker_T9n;
    /**
     * boolean: When true the default layer has been loaded once and should no longer be used
     */
    protected defaultLayerHonored: boolean;
    /**
     * HTMLCalciteSelectElement: The html element for selecting layers
     */
    protected _layerElement: HTMLCalciteSelectElement | HTMLCalciteComboboxElement;
    /**
     * IMapItemHash: id/name lookup
     */
    protected _layerNameHash: IMapItemHash;
    /**
     * IMapItemHash: id/name lookup
     */
    protected _tableNameHash: IMapItemHash;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * updates the layers
     */
    updateLayer(): Promise<void>;
    /**
     * Emitted on demand when valid layers are found
     *
     */
    idsFound: EventEmitter<ILayerAndTableIds>;
    /**
     * Emitted on demand when no valid layers are found
     *
     */
    noLayersFound: EventEmitter<void>;
    /**
     * Emitted on demand when a layer is selected
     *
     */
    layerSelectionChange: EventEmitter<string[]>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillRender(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad(): Promise<void>;
    /**
     * Create a notice to inform the user that no layers were found
     *
     * @returns Calcite Notice component with the message
     */
    protected _getInvalidPlaceholder(): VNode;
    /**
     * Show layer name as a label with icon
     *
     * @returns Calcite label with the layer name and icon
     */
    protected _getSingleLayerPlaceholder(): VNode;
    /**
     * Create a list of layers from the map
     * Used for selecting a single layer.
     *
     * @param id the id for the select component used to support the tooltip
     *
     * @returns Calcite Select component with the ids of the layers from the map
     */
    _getSelect(id: string): VNode;
    /**
     * Create a list of layer ids from the map
     * Used for selecting multiple layers
     *
     * @param id the id for the combobox component used to support the tooltip
     *
     * @returns Calcite ComboBox component with the ids of the layers from the map
     */
    _getCombobox(id: string): VNode;
    /**
     * Hydrate a dropdown component with items to display the layer names
     *
     * @param id the id for the dropdown component used to support the tooltip
     *
     * @returns Array of Dropdown items with layer names
     */
    _getDropdown(id: string): VNode;
    /**
     * Get the button that will open the dropdown list wrapped in an action
     *
     * @returns the node for the action and button
     */
    protected _getActionDropdownButton(id: string): VNode;
    /**
     * Get the button that will open the dropdown list
     *
     * @returns the node for the button
     */
    protected _getDropdownButton(): VNode;
    /**
     * Get the appropriate icon based on the selected layer or table
     *
     * @returns a string for the appropriate icon
     */
    _getItemTypeIcon(): string;
    /**
     * Get the appropriate type of dom nodes for each valid layer or table
     *
     * @returns Array of dom nodes with the names of the layers and optionally of the tables
     */
    _getMapLayerOptions(): VNode[];
    /**
     * Get the appropriate type of dom node for the current layer or table id
     *
     * @returns A dom node with the name of the layer or table
     */
    _getItem(id: string, itemType: "layer" | "table"): VNode;
    /**
     * Store the layer name based on the user selection
     */
    _setSelectedLayer(id: string): void;
    /**
     * Fetch layer hash info for the given id
     *
     * @returns ILayerHashInfo for the id
     */
    protected _getLayerFromHash(id: string): ILayerHashInfo;
    /**
     * Fetch the ids of the layers from the map
     *
     * @returns Promise when the operation has completed
     */
    _setLayers(): Promise<void>;
    /**
     * Fetch the ids of all layers that support edits with the update capability
     *
     * @returns array of layer ids
     */
    protected _getEditableIds(hash: IMapItemHash): string[];
    /**
     * Create a layer id:title hash for layer name display
     *
     * @returns Promise when the operation has completed
     */
    protected _initLayerTableHash(): Promise<void>;
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the layer will be used in the current layer picker type
     */
    protected _validLayer(id: string): boolean;
    /**
     * Evaluate if the id exists in the current hash and verify if it should be excluded
     *
     * @returns boolean when true the table will be used in the current layer picker type
     */
    protected _validTable(id: string): boolean;
    /**
     * Fetch the ids of the layers from the map
     *
     * @returns Promise when the operation has completed
     */
    _layerSelectionChange(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
