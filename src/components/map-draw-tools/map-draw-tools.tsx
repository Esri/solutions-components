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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import state from "../../utils/publicNotificationStore";
import MapDrawTools_T9n from '../../assets/t9n/map-draw-tools/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'map-draw-tools',
  styleUrl: 'map-draw-tools.css',
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
  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
 * Contains the translations for this component.
 * All UI strings should be defined here.
 */
  @State() translations: typeof MapDrawTools_T9n;

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html?#constructors-summary
   */
  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
   */
  protected Sketch: typeof __esri.Sketch;

  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html
   */
  protected _sketchWidget: __esri.Sketch;

  /**
   * The container div for the sketch widget
   */
  protected _sketchDiv: HTMLElement;

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   */
  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch('graphics')
  graphicsWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      if (this.graphics && this.graphics.length > 0) {
        this._sketchGraphicsLayer.removeAll();
        this._sketchGraphicsLayer.addMany(this.graphics);
      }
    }
  }

  @Watch('mapView')
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

  @Method()
  async clear() {
    return this._clearSketch();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() sketchGraphicsChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad() {
    await this._initModules();
  }

  componentDidLoad() {
    this._getTranslations();
    this._init();
  }

  render() {
    return (
      <Host>
        <div>
          <div ref={(el) => { this._sketchDiv = el }} />
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  async _initModules(): Promise<void> {
    const [GraphicsLayer, Sketch]: [
      __esri.GraphicsLayerConstructor,
      __esri.SketchConstructor
    ] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Sketch = Sketch;
  }

  _init(): void {
    if (this.mapView && this._sketchDiv) {
      this._initGraphicsLayer();
      this._initDrawTools();
    }
  }

  _initGraphicsLayer(): void {
    const title = this.translations?.sketchLayer;
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

  _initDrawTools(): void {
    this._sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchDiv,
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
      if (evt.state === "complete" && this.active) {
        this.graphics = this._sketchGraphicsLayer.graphics.toArray();
        this.sketchGraphicsChange.emit(this.graphics);
      }
    })
  }

  _clearSketch() {
    this.graphics = undefined;
    this._sketchGraphicsLayer.removeAll();
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof MapDrawTools_T9n;
  }
}
