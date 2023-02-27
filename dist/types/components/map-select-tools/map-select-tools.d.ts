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
/// <reference types="arcgis-js-api" />
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { DistanceUnit, ISearchConfiguration, EWorkflowType, ISelectionSet, ESketchType } from "../../utils/interfaces";
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
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  enabledLayerIds: string[];
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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  searchConfiguration: ISearchConfiguration;
  /**
   * utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made.
   */
  selectionSet: ISelectionSet;
  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  selectLayerView: __esri.FeatureLayerView;
  /**
   * boolean: When true the buffer tools will be available for use
   */
  showBufferTools: boolean;
  _layerSelectChecked: boolean;
  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  _searchTerm: string;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof MapSelectTools_T9n;
  /**
   * EWorkflowType: "SEARCH", "SELECT", "SKETCH", "REFINE"
   */
  _workflowType: EWorkflowType;
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
   * HTMLMapDrawToolsElement: The container div for the sketch widget
   */
  protected _drawTools: HTMLMapDrawToolsElement;
  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  protected _refineSelectLayers: __esri.FeatureLayerView[];
  /**
   * HTMLRefineSelectionToolsElement: The container div for the sketch widget
   */
  protected _refineTools: HTMLRefineSelectionToolsElement;
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
   * HTMLCalciteCheckboxElement: The checkbox element that controls if user drawn graphics
   * are used, if checked, to first make a selection on the layer and use the returned geomerties to select from the addressee layer
   */
  protected _selectFromLayerElement: HTMLCalciteCheckboxElement;
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
   * Called each time the geometries prop is changed.
   *
   * @returns Promise when complete
   */
  watchGeometriesHandler(newValue: __esri.Geometry[], oldValue: __esri.Geometry[]): Promise<void>;
  /**
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  watchSearchConfigurationHandler(newValue: ISearchConfiguration, oldValue: ISearchConfiguration): Promise<void>;
  /**
   * Called each time the workflowType prop is changed and emits the workflowTypeChange event.
   *
   * @returns Promise when complete
   */
  workflowTypeHandler(newValue: EWorkflowType, oldValue: EWorkflowType): Promise<void>;
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
   * Emitted on demand when selection starts or ends.
   */
  selectionLoadingChange: EventEmitter<boolean>;
  /**
   * Emitted on demand when the selection set changes.
   *
   */
  selectionSetChange: EventEmitter<number>;
  /**
   * Emitted on demand when the sketch type changes.
   *
   */
  sketchTypeChange: EventEmitter<ESketchType>;
  /**
   * Emitted on demand when the workflow type changes.
   *
   */
  workflowTypeChange: EventEmitter<EWorkflowType>;
  /**
   * Handle changes to the selection sets
   */
  labelChange(event: CustomEvent): void;
  /**
   * Handle changes to the search configuration
   */
  searchConfigurationChangeChanged(event: CustomEvent): void;
  /**
   * Listen to changes in the sketch graphics
   *
   */
  sketchGraphicsChange(event: CustomEvent): void;
  /**
   * Listen to changes in the refine graphics
   *
   */
  refineSelectionGraphicsChange(event: CustomEvent): Promise<void>;
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
   * Get the default label base when the user has not provided a value
   *
   * @protected
   */
  protected _getSelectionBaseLabel(): string;
  /**
   * Initialize the search widget
   *
   * @protected
   */
  protected _initSearchWidget(): void;
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
   * Store the layer select checked change
   *
   * @protected
   */
  protected _layerSelectChanged(): void;
  /**
   * Store workflow type change
   *
   * @protected
   */
  protected _workflowChange(evt: CustomEvent): void;
  /**
   * Highlight the features in the map based on OIDs when skipOIDs have been defined
   *
   * @protected
   */
  protected _highlightWithOIDsOrGeoms(): Promise<void>;
  /**
   * Highlight the features in the map
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
  protected _updateSelection(type: EWorkflowType, graphics: __esri.Graphic[], label: string, useOIDs: boolean, oids?: number[]): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
