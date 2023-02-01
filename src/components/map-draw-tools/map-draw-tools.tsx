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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import state from "../../utils/publicNotificationStore";
import MapDrawTools_T9n from "../../assets/t9n/map-draw-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: "map-draw-tools",
  styleUrl: "map-draw-tools.css",
  shadow: false,
})
export class MapDrawTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLMapDrawToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: sketch is used by multiple components...need a way to know who should respond...
   */
  @Prop() active = false;

  /**
   * boolean: Optionally draw a border around the draw tools
   */
  @Prop() border = false;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop({ mutable: true }) mapView: __esri.MapView;

  /**
   * esri/symbols/SimpleMarkerSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
   */
  @Prop({ mutable: true }) pointSymbol: __esri.SimpleMarkerSymbol;

  /**
   * esri/symbols/SimpleLineSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
   */
  @Prop({ mutable: true }) polylineSymbol: __esri.SimpleLineSymbol;

  /**
   * esri/symbols/SimpleFillSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
   */
  @Prop({ mutable: true }) polygonSymbol: __esri.SimpleFillSymbol;

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop({ mutable: true }) graphics: __esri.Graphic[] = [];

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof MapDrawTools_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

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
  protected _selectionTimer;

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

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the graphics prop is changed.
   *
   */
  @Watch("graphics")
  graphicsWatchHandler(v: any, oldV: any): void {
    if (v && v.length > 0 && JSON.stringify(v) !== JSON.stringify(oldV) && this._sketchGraphicsLayer) {
      this._sketchGraphicsLayer.removeAll();
      this._sketchGraphicsLayer.addMany(v);
    }
  }

  /**
   * Called each time the mapView prop is changed.
   *
   */
  @Watch("mapView")
  mapViewWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._init();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Clears the user drawn graphics
   *
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async clear(): Promise<void> {
    this._clearSketch();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when the sketch graphics change.
   *
   */
  @Event() sketchGraphicsChange: EventEmitter<__esri.Graphic[]>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   *
   * @returns Promise when complete
   */
  componentDidLoad(): void {
    this._init();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const drawClass = this.border ? "border" : "";
    return (
      <Host>
        <div class={drawClass}>
          <div ref={(el) => { this._sketchElement = el }} />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
    const [GraphicsLayer, Sketch] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Sketch = Sketch;
  }

  /**
   * Initialize the graphics layer and the tools that support creating new graphics
   *
   * @protected
   */
  protected _init(): void {
    if (this.mapView && this._sketchElement) {
      this._initGraphicsLayer();
      this._initDrawTools();
    }
  }

  /**
   * Create or find the graphics layer and add any existing graphics
   *
   * @protected
   */
  protected _initGraphicsLayer(): void {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex) as __esri.GraphicsLayer;
    } else {
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }

    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }

  /**
   * Initialize the skecth widget and store the associated symbols for each geometry type
   *
   * @protected
   */
  protected _initDrawTools(): void {
    this._sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchElement,
      creationMode: "update",
      defaultCreateOptions: {
        "mode": "hybrid"
      }
    });

    this.pointSymbol = this._sketchWidget.viewModel.pointSymbol as __esri.SimpleMarkerSymbol;
    this.polylineSymbol = this._sketchWidget.viewModel.polylineSymbol as __esri.SimpleLineSymbol;
    this.polygonSymbol = this._sketchWidget.viewModel.polygonSymbol as __esri.SimpleFillSymbol;

    this._sketchWidget.visibleElements = {
      selectionTools: {
        "lasso-selection": false,
        "rectangle-selection": false
      }, createTools: {
        "circle": false,
        "point": false
      }
    }

    this._sketchWidget.on("update", (evt) => {
      if (evt.state === "start") {
        this.graphics = [
          ...this.graphics,
          ...evt.graphics
        ];
        this.sketchGraphicsChange.emit(this.graphics);
      }
      if (evt.state === "active") {
        clearTimeout(this._selectionTimer);
        this._selectionTimer = setTimeout(() => {
          this.graphics = [
            ...this.graphics,
            ...evt.graphics
          ];
          this.sketchGraphicsChange.emit(this.graphics);
        }, 500);
      }
    });
  }

  /**
   * Clear any stored graphics and remove all graphics from the graphics layer
   *
   * @protected
   */
  protected _clearSketch(): void {
    this.graphics = [];
    this._sketchGraphicsLayer.removeAll();
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof MapDrawTools_T9n;
  }
}
