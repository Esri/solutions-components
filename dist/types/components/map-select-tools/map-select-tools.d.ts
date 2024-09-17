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
import { DistanceUnit, EWorkflowType, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
import MapSelectTools_T9n from "../../assets/t9n/map-select-tools/resources.json";
export declare class MapSelectTools {
    el: HTMLMapSelectToolsElement;
    /**
     * string | number[] |  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
     */
    bufferColor: any;
    /**
     * string | number[] | object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
     */
    bufferOutlineColor: any;
    /**
     * boolean: When true the user can define a name for each notification list
     */
    customLabelEnabled: boolean;
    /**
     * string[]: Optional list of enabled layer ids
     *  If empty all layers will be available
     */
    enabledLayerIds: string[];
    /**
     * boolean: When true users will be allowed to optionally use features from a layer as the selection geometry
     */
    enableLayerFeatures: boolean;
    /**
     * boolean: When true users will be allowed to optionally create a buffer around the selection geometry
     */
    enableSearchDistance: boolean;
    /**
     * boolean: When true sketch tools will be provided to allow users to draw a selection geometry
     */
    enableSketchTools: boolean;
    /**
     * number: The default value to show for the buffer distance
     */
    defaultBufferDistance: number;
    /**
     * number: The default value to show for the buffer unit
     */
    defaultBufferUnit: DistanceUnit;
    /**
     * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
     */
    geometries: __esri.Geometry[];
    /**
     * boolean: When true a new label is not generated for the stored selection set
     */
    isUpdate: boolean;
    /**
     * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
     */
    layerViews: __esri.FeatureLayerView[];
    /**
     * string: The current user locale.
     */
    locale: string;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string: The value to show for no results
     * when left empty the default text "0 selected features from {layerTitle}" will be shown
     */
    noResultText: string;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made.
     */
    selectionSet: ISelectionSet;
    /**
     * string[]: List of layer ids that should be shown as potential selection layers
     * when skectching with "Use layer features" option
     */
    selectionLayerIds: string[];
    /**
     * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
     */
    selectLayerView: __esri.FeatureLayerView;
    /**
     * esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
     *
     */
    sketchLineSymbol: __esri.SimpleLineSymbol;
    /**
     * esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
     *
     */
    sketchPointSymbol: __esri.SimpleMarkerSymbol;
    /**
     * esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
     *
     */
    sketchPolygonSymbol: __esri.SimpleFillSymbol;
    /**
     * number: The number of selected features
     */
    _numSelected: number;
    /**
     * boolean: when true buffer tools controls are enabled
     */
    _searchDistanceEnabled: boolean;
    /**
     * string: Text entered by the end user.
     * Used to search against the locator.
     */
    _searchTerm: string;
    /**
     * boolean: When true a loading indicator will be shown in place of the number of selected features
     */
    _selectionLoading: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof MapSelectTools_T9n;
    /**
     * boolean: when true drawn graphics will be used to select features
     */
    _useLayerFeaturesEnabled: boolean;
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    protected FeatureLayer: typeof import("esri/layers/FeatureLayer");
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    protected Graphic: typeof import("esri/Graphic");
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     */
    protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    protected Search: typeof import("esri/widgets/Search");
    /**
     * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
     */
    protected _geometryEngine: __esri.geometryEngine;
    /**
     * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
     */
    protected _bufferGeometry: __esri.Geometry;
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     */
    protected _bufferGraphicsLayer: __esri.GraphicsLayer;
    /**
     * HTMLBufferToolsElement: The container div for the buffer tools
     */
    protected _bufferTools: HTMLBufferToolsElement;
    /**
     * number: The current buffer distance
     */
    protected _distance: number;
    /**
     * HTMLMapDrawToolsElement: The container div for the sketch widget
     */
    protected _drawTools: HTMLMapDrawToolsElement;
    /**
     * CustomEvent: Used to prevent default behavior of layer selection change
     */
    protected _labelName: HTMLCalciteInputElement;
    /**
     * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
     */
    protected _selectLayers: __esri.FeatureLayerView[];
    /**
     * HTMLElement: The container div for the search widget
     */
    protected _searchElement: HTMLElement;
    /**
     * An array of objects representing the results of search
     */
    protected _searchResult: any;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    protected _searchWidget: __esri.widgetsSearch;
    /**
     * number[]: the oids of the selected features
     */
    protected _selectedIds: number[];
    /**
     * string: A label to help uniquely identify the selection set
     */
    protected _selectionLabel: string;
    /**
     * number[]: When empty or undefined the geometries will be used for selection
     *          When it has values they will be used directly when no buffer is provided
     *          see https://github.com/Esri/solutions-components/issues/148
     */
    protected _skipGeomOIDs: number[];
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     * Added to support https://github.com/Esri/solutions-components/issues/208
     */
    protected _sketchGraphic: __esri.Graphic;
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    protected _graphics: __esri.Graphic[];
    /**
     * string: The current buffer unit
     */
    protected _unit: string;
    /**
     * EWorkflowType: The current workflow type "SEARCH" | "SELECT" | "SKETCH"
     */
    protected _workflowType: EWorkflowType;
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    protected _featuresCollection: {
        [key: string]: __esri.Graphic[];
    };
    /**
     * Called each time the geometries prop is changed.
     *
     * @returns Promise when complete
     */
    watchGeometriesHandler(newValue: __esri.Geometry[], oldValue: __esri.Geometry[]): Promise<void>;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(v: any, oldV: any): Promise<void>;
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    watchSearchConfigurationHandler(newValue: ISearchConfiguration, oldValue: ISearchConfiguration): Promise<void>;
    /**
     * Clear any selection results
     *
     * @returns Promise when the results have been cleared
     */
    clearSelection(): Promise<void>;
    /**
     * Get the new selection set
     *
     * @returns Promise with the new selection set
     */
    getSelection(): Promise<ISelectionSet>;
    /**
     * Emitted on demand when the selection set changes.
     */
    selectionSetChange: EventEmitter<number>;
    /**
     * Handle changes to the search configuration
     */
    searchConfigurationChangeChanged(event: CustomEvent): void;
    /**
     * Handle changes to the buffer distance value
     */
    distanceChanged(event: CustomEvent): Promise<void>;
    /**
     * Handle changes to the buffer unit
     */
    unitChanged(event: CustomEvent): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * Renders the buffer tools component.
     */
    protected _getBufferOptions(): VNode;
    /**
     * Renders the map layer picker component.
     */
    protected _getUseLayerFeaturesOptions(): VNode;
    /**
     * Renders the number of selected features
     */
    protected _getNumSelected(): VNode;
    /**
     * Renders the custom label input
     */
    protected _getNameInput(): VNode;
    /**
     * Create the UI element that will expose the addressee layers
     *
     * @returns addressee layer list node
     * @protected
     */
    protected _getMapLayerPicker(): VNode;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Initialize the graphics layer, selection set, and search widget
     *
     * @returns Promise when the operation has completed
     */
    protected _init(): Promise<void>;
    /**
     * Initialize the state of the component with any stored values in a selection set
     *
     * @protected
     */
    protected _initSelectionSet(): Promise<void>;
    /**
     * Initialize the search widget
     *
     * @protected
     */
    protected _initSearchWidget(): Promise<void>;
    /**
     * Check if the current label should be cleared
     *
     * @returns true when the current label is based on search result
     * @protected
     */
    protected _searchClearLabel(): boolean;
    /**
     * Initialize the search widget based on user defined configuration
     *
     * @param searchConfiguration search configuration defined by the user
     * @param view the current map view
     *
     * @protected
     */
    protected _getSearchConfig(searchConfiguration: ISearchConfiguration, view: __esri.MapView): ISearchConfiguration;
    /**
     * Initialize the graphics layer used to store any buffer grapghics
     *
     * @protected
     */
    protected _initGraphicsLayer(): void;
    /**
     * Handle changes in the sketch graphics
     *
     * @param event stores the graphics that will be used to select features
     * @param forceUpdate when true the drawn graphic will be used to select features from
     * use layer features layer...then the selected layer features will be used to select from the main input layer
     *
     */
    protected _sketchGraphicsChanged(event: CustomEvent, forceUpdate?: boolean): Promise<void>;
    /**
     * Highlight the features in the map based on OIDs when skipOIDs have been defined
     *
     * @protected
     */
    protected _highlightWithOIDsOrGeoms(): Promise<void>;
    /**
     * Highlight the features in the map
     *
     * @param ids the ids that should be highlighted
     *
     * @protected
     */
    protected _highlightFeatures(ids: number[]): Promise<void>;
    /**
     * Query the selectLayerView based on any user drawn geometries or buffers
     *
     * @param geometries Array of geometries used for the selection of ids from the select layer view
     *
     * @returns Promise when the selection is complete and the graphics have been highlighted
     */
    protected _selectFeatures(geometries: __esri.Geometry[]): Promise<void>;
    /**
     * Query the selectLayerView based on any user drawn geometries or buffers
     *
     * @param evt CustomEvent that contains the result of the buffer
     *
     * @protected
     */
    protected _bufferComplete(evt: CustomEvent): Promise<void>;
    /**
     * Fetch a single geometry for each potential geometry type
     *
     * @param geometries All current selection geometries
     *
     * @protected
     */
    protected _geomQuery(geometries: __esri.Geometry[]): Promise<void>;
    /**
     * Clear all stored values and general state for the component
     *
     * @param clearSearchWidget Optional boolean for clearing the search widget (default is true)
     * @param clearLabel Optional boolean for clearing the search label (default is true)
     *
     * @protected
     */
    protected _clearResults(clearSearchWidget?: boolean, clearLabel?: boolean): Promise<void>;
    /**
     * Clear all the search widget and any stored search result
     *
     * @protected
     */
    protected _clearSearchWidget(): void;
    /**
     * Fetch a single geometry for the current geometry type
     *
     * @param type worflow type
     * @param graphics graphics to be used for selection
     * @param label selection label
     * @param useOIDs indicates if the OIDs should override the geometry for selection
     * @param oids list of IDs to select when useOIDs is true
     *
     * @protected
     */
    protected _updateSelection(graphics: __esri.Graphic[], useOIDs: boolean, oids?: number[]): void;
    /**
     * Updates the label for the selection set
     *
     * @protected
     */
    protected _updateLabel(): Promise<void>;
    /**
     * Gets the layer views from the map when the layer selection changes
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _layerSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * Fetch the layer from the map
     *
     * @param evt layer selection change event
     *
     * @returns Promise when the function has completed
     * @protected
     */
    protected _inputLayerSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * Handle changes to the buffer distance value
     */
    protected _distanceChanged(detail: any): Promise<void>;
    /**
     * Select features based on the input geometry
     *
     * @param geom the geometry used for selection
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _selectLayerFeatures(geom: __esri.Geometry): Promise<void>;
    /**
     * Store use layer features value and re-select features based on the original sketch graphic
     *
     * @protected
     */
    protected _useLayerFeaturesEnabledChanged(): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
