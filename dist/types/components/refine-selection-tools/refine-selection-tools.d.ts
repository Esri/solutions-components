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
import { ERefineMode, ESelectionMode, ESelectionType, IRefineOperation, ISelectionSet } from "../../utils/interfaces";
import RefineSelectionTools_T9n from "../../assets/t9n/refine-selection-tools/resources.json";
export declare class RefineSelectionTools {
  el: HTMLRefineSelectionToolsElement;
  /**
   * boolean: sketch is used by multiple components...need a way to know who should respond...
   */
  active: boolean;
  /**
   * boolean: Optionally draw a border around the draw tools
   */
  border: boolean;
  /**
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  enabledLayerIds: string[];
  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  graphics: __esri.Graphic[];
  /**
   * number: The oids of the selected features
   */
  ids: number[];
  /**
   * esri/views/layers/LayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html
   */
  layerView: __esri.FeatureLayerView;
  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  layerViews: __esri.FeatureLayerView[];
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * utils/interfaces/ESelectionMode: ADD, REMOVE
   */
  mode: ESelectionMode;
  /**
   * utils/interfaces/ERefineMode: ALL, SUBSET
   */
  refineMode: ERefineMode;
  /**
   * utils/interfaces/ISelectionSet: Refine selection set
   */
  refineSelectionSet: ISelectionSet;
  /**
   * boolean: Used to control the visibility of the layer picker
   */
  useLayerPicker: boolean;
  /**
   * boolean: Is selected enabled
   */
  _selectEnabled: boolean;
  /**
   * utils/interfaces/ESelectionType: POINT, LINE, POLY, RECT
   */
  _selectionMode: ESelectionType;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof RefineSelectionTools_T9n;
  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   * The graphics layer constructor
   */
  protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");
  /**
   * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
   * The sketch view model constructor
   */
  protected SketchViewModel: typeof import("esri/widgets/Sketch/SketchViewModel");
  /**
   * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
   */
  protected _featuresCollection: {
    [key: string]: __esri.Graphic[];
  };
  /**
   * esri/core/Handles: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Handles.html#Handle
   */
  protected _hitTestHandle: __esri.Handle;
  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  protected _sketchGeometry: __esri.Geometry;
  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   * The graphics layer used to show selections.
   */
  protected _sketchGraphicsLayer: __esri.GraphicsLayer;
  /**
   * esri/widgets/Sketch/SketchViewModel: The html element for selecting buffer unit
   * The sketch view model used to create graphics
   */
  protected _sketchViewModel: __esri.SketchViewModel;
  /**
   * Called each time the ids prop is changed.
   * Highlight the features based on the provided ids
   */
  idsWatchHandler(v: any, oldV: any): void;
  /**
   * Reset the ids collection
   *
   * @returns Promise when complete
   */
  reset(): Promise<void>;
  /**
   * Clear current highlight handle
   *
   * @returns Promise when complete
   */
  clearHighlight(): Promise<void>;
  /**
   * Emitted on demand when selection graphics change.
   */
  refineSelectionGraphicsChange: EventEmitter<any[]>;
  /**
   * Emitted on demand when selection ids change
   */
  refineSelectionIdsChange: EventEmitter<{
    addIds: any[];
    removeIds: any[];
  }>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): void;
  /**
   * StencilJS: Called every time the component is disconnected from the DOM, ie,
   * it can be dispatched more than once, DO not confuse with a "onDestroy" kind of event.
   */
  disconnectedCallback(): void;
  /**
   * Called every time the component is connected to the DOM.
   * When the component is first connected, this method is called before componentWillLoad.
   */
  connectedCallback(): void;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Initialize the graphics layer and skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _init(): void;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
  /**
   * Initialize the skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _initSketchViewModel(): void;
  /**
   * Clear any skecth graphics
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _clear(): void;
  /**
   * Initialize the graphics layer
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _initGraphicsLayer(): void;
  /**
   * Clear selection based on map click
   *
   * @protected
   */
  protected _initHitTest(): void;
  /**
   * Gets the layer views from the map when the layer selection changes
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _layerSelectionChange(evt: CustomEvent): Promise<void>;
  /**
   * Store the current selection mode
   *
   * @protected
   */
  protected _setSelectionMode(mode: ESelectionType): void;
  /**
   * Select features based on the input geometry
   *
   * @param geom the geometry used for selection
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _selectFeatures(geom: __esri.Geometry): Promise<void>;
  /**
   * Highlight any selected features in the map
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected _highlightFeatures(ids: number[], updateExtent?: boolean): Promise<void>;
  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  protected _clearHighlight(): void;
  /**
   * Update the ids for any ADD or REMOVE operation and highlight the features.
   *
   * @param oids the ids to add or remove
   * @param mode ADD or REMOVE this will control if the ids are added or removed
   * @param operationStack the undo or redo stack to push the operation to
   * @param operationMode ADD or REMOVE the mode of the individual refine operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _updateIds(oids: number[], mode: ESelectionMode, operationStack: IRefineOperation[], operationMode: ESelectionMode): Promise<void>;
  /**
   * Undo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _undo(): void;
  /**
   * Redo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _redo(): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
