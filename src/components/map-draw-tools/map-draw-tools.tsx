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

import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import Sketch from "@arcgis/core/widgets/Sketch";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

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
  @Element() el: HTMLPublicNotificationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Credentials for requests
   */
  //@Prop({ mutable: true }) authentication: UserSession;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  @Watch('mapView')
  mapViewWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      void this.mapView.when(() => {
        this._initGraphicsLayer();
        this._initDrawTools();
      });
      
    }
  }

  /**
   * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html
   */
  @Prop() sketchWidget: Sketch;

  /**
   * esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html
   */
  @Prop() portal: __esri.Portal;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  componentDidLoad() {
    void this.mapView.when(() => {
      this._initGraphicsLayer();
      this._initDrawTools();
    });
  }

  render() {
    return (
      <Host>
        <div class="padding-bottom-1">
          <div ref={(el) => { this._sketchDiv = el }} />
        </div>
      </Host>
    );
  }

  private _sketchDiv: HTMLElement;

  private _sketchGraphicsLayer: __esri.GraphicsLayer;

  _initGraphicsLayer(): void {
    this._sketchGraphicsLayer = new GraphicsLayer();
    this.mapView.map.layers.add(this._sketchGraphicsLayer);
  }

  _initDrawTools(): void {
    if (this.mapView && this._sketchDiv) {
      this.sketchWidget = new Sketch({
        layer: this._sketchGraphicsLayer,
        view: this.mapView,
        container: this._sketchDiv,
        creationMode: "update"
      });

      this.sketchWidget.visibleElements = {
        selectionTools:{
          "lasso-selection": false,
          "rectangle-selection": false
        }
      }
    }
  }

}
