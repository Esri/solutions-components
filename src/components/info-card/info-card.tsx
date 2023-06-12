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

import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'info-card',
  styleUrl: 'info-card.css',
  shadow: false,
})
export class InfoCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLInfoCardElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop() graphic: __esri.Graphic;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
   * used for module import
   */
  protected Feature: typeof import("esri/widgets/Feature");

  /**
   * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
   * used for widget instance
   */
  protected _feature: __esri.Feature;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Watch for changes to the graphic and update the feature widget
   */
  @Watch("graphic")
  graphicWatchHandler(): void {
    if (this._feature && this.graphic) {
      this._feature.graphic = this.graphic;
    }
  }

  /**
   * Watch for changes to the mapView and re-init the Feature widget
   */
  @Watch("mapView")
  mapViewWatchHandler(): void {
    this._initFeatureWidget();
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

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
    await this._initModules();;
  }

  /**
   * StencilJS: Init the feature widget after the comoponent loads
   */
  async componentDidLoad(): Promise<void> {
    this._initFeatureWidget();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <calcite-shell>
          <div class="esri-widget" id="feature-node"/>
        </calcite-shell>
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
    const [Feature] = await loadModules([
      "esri/widgets/Feature"
    ]);
    this.Feature = Feature;
  }

  /**
   * Init the Feature widget so we can display the popup content
   *
   * @protected
   */
  protected _initFeatureWidget(): void {
    if (this.mapView && !this._feature) {
      // map and spatialReference must be set for Arcade
      // expressions to execute and display content
      this._feature = new this.Feature({
        map: this.mapView.map,
        spatialReference: this.mapView.spatialReference,
        container: "feature-node"
      });
    }
  }
}
