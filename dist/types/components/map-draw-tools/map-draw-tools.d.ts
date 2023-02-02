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
import MapDrawTools_T9n from "../../assets/t9n/map-draw-tools/resources.json";
export declare class MapDrawTools {
  el: HTMLMapDrawToolsElement;
  /**
   * boolean: sketch is used by multiple components...need a way to know who should respond...
   */
  active: boolean;
  /**
   * boolean: Optionally draw a border around the draw tools
   */
  border: boolean;
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
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  graphics: __esri.Graphic[];
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof MapDrawTools_T9n;
  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html?#constructors-summary
   */
  protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");
  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
   */
  protected Sketch: typeof import("esri/widgets/Sketch");
  /**
   * A timer used to prevent redundant selections while drawing shapes
   */
  protected _selectionTimer: any;
  /**
   * The container element for the sketch widget
   */
  protected _sketchElement: HTMLElement;
  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   */
  protected _sketchGraphicsLayer: __esri.GraphicsLayer;
  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html
   */
  protected _sketchWidget: __esri.Sketch;
  /**
   * Called each time the graphics prop is changed.
   *
   */
  graphicsWatchHandler(v: any, oldV: any): void;
  /**
   * Called each time the mapView prop is changed.
   *
   */
  mapViewWatchHandler(v: any, oldV: any): void;
  /**
   * Clears the user drawn graphics
   *
   * @returns Promise that resolves when the operation is complete
   */
  clear(): Promise<void>;
  /**
   * Emitted on demand when the sketch graphics change.
   *
   */
  sketchGraphicsChange: EventEmitter<__esri.Graphic[]>;
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
   * Create or find the graphics layer and add any existing graphics
   *
   * @protected
   */
  protected _initGraphicsLayer(): void;
  /**
   * Initialize the skecth widget and store the associated symbols for each geometry type
   *
   * @protected
   */
  protected _initDrawTools(): void;
  /**
   * Clear any stored graphics and remove all graphics from the graphics layer
   *
   * @protected
   */
  protected _clearSketch(): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
