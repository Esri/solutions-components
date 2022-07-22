/** @license
 * Copyright 2021 Esri
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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import state from "../../utils/publicNotificationStore";

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
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  // sketch is used by multiple components...need a way to know who should respond...
  @Prop() active = false;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop({ mutable: true, reflect: true }) mapView: __esri.MapView;

  @Watch('mapView')
  mapViewWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._init();
    }
  }

  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html
   */
  @Prop() sketchWidget: __esri.Sketch;

  /**
   * esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html
   */
  @Prop() portal: __esri.Portal;

  @Prop({ mutable: true }) pointSymbol: any;

  @Prop({ mutable: true }) polylineSymbol: any;

  @Prop({ mutable: true }) polygonSymbol: any;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  @Watch('graphics')
  graphicsWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      if (this.graphics && this.graphics.length > 0) {
        this._sketchGraphicsLayer.removeAll();
        this._sketchGraphicsLayer.addMany(this.graphics);
      }
    }
  }

  @Event() sketchGraphicsChange: EventEmitter;

  @Method()
  async clear() {
    return this._clearSketch();
  }

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected Sketch: typeof __esri.Sketch;

  private _sketchDiv: HTMLElement;

  private _sketchGraphicsLayer: __esri.GraphicsLayer;

  async componentWillLoad() {
    await this._initModules();
  }

  componentDidLoad() {
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
    this.sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchDiv,
      creationMode: "update",
      defaultCreateOptions: {
        "mode": "hybrid"
      }
    });

    this.pointSymbol = this.sketchWidget.viewModel.pointSymbol;
    this.polylineSymbol = this.sketchWidget.viewModel.polylineSymbol;
    this.polygonSymbol = this.sketchWidget.viewModel.polygonSymbol;

    this.sketchWidget.visibleElements = {
      selectionTools: {
        "lasso-selection": false,
        "rectangle-selection": false
      }, createTools: {
        "circle": false,
        "point": false
      }
    }

    this.sketchWidget.on("update", (evt) => {
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

}
