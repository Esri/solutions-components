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
import { ESelectionType, ISketchGraphicsChange } from "../../utils/interfaces";
import MapDrawTools_T9n from "../../assets/t9n/map-draw-tools/resources.json";
export declare class MapDrawTools {
  el: HTMLMapDrawToolsElement;
  /**
   * boolean: sketch is used by multiple components...need a way to know who should respond...
   */
  active: boolean;
  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  graphics: __esri.Graphic[];
  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * esri/symbols/SimpleMarkerSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
   */
  pointSymbol: __esri.SimpleMarkerSymbol;
  /**
   * esri/symbols/SimpleLineSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
   */
  polylineSymbol: __esri.SimpleLineSymbol;
  /**
   * esri/symbols/SimpleFillSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
   */
  polygonSymbol: __esri.SimpleFillSymbol;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof MapDrawTools_T9n;
  /**
   * utils/interfaces/ESelectionType: POINT, LINE, POLY, RECT
   */
  _selectionMode: ESelectionType;
  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html?#constructors-summary
   */
  protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");
  /**
   * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
   * The sketch view model constructor
   */
  protected SketchViewModel: typeof import("esri/widgets/Sketch/SketchViewModel");
  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
   */
  protected Sketch: typeof import("esri/widgets/Sketch");
  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   * The graphics layer used to show selections.
   */
  protected _sketchGraphicsLayer: __esri.GraphicsLayer;
  /**
   * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
   */
  protected _sketchViewModel: __esri.SketchViewModel;
  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
   */
  protected _sketchWidget: __esri.Sketch;
  /**
   * The container element for the sketch widget
   */
  protected _sketchElement: HTMLElement;
  /**
   * Called each time the graphics prop is changed.
   */
  graphicsWatchHandler(v: any, oldV: any): void;
  /**
   * Called each time the mapView prop is changed.
   */
  mapViewWatchHandler(v: any, oldV: any): void;
  /**
   * Clears the user drawn graphics
   *
   * @returns Promise that resolves when the operation is complete
   */
  clear(): Promise<void>;
  /**
   * Set the sketch widget to update mode with the current graphic
   *
   * @returns Promise that resolves when the operation is complete
   */
  updateGraphics(): Promise<void>;
  /**
   * Emitted on demand when selection starts or ends.
   */
  selectionLoadingChange: EventEmitter<boolean>;
  /**
   * Emitted on demand when the sketch graphics change.
   */
  sketchGraphicsChange: EventEmitter<ISketchGraphicsChange>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   *
   * @returns Promise when complete
   */
  componentDidLoad(): void;
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
   * Initialize the graphics layer and the tools that support creating new graphics
   *
   * @protected
   */
  protected _init(): void;
  /**
   * Initialize the graphics layer
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _initGraphicsLayer(): void;
  /**
   * Initialize the skecth widget
   *
   * @protected
   */
  protected _initSketch(): void;
  /**
   * Clear any stored graphics and remove all graphics from the graphics layer
   *
   * @protected
   */
  protected _clearSketch(): void;
  /**
   * Set the sketch widget to update mode with the current graphic
   *
   * reshape tool only supports a single graphic
   *
   * @protected
   */
  protected _updateGraphics(): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
