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
  tag: 'map-legend',
  styleUrl: 'map-legend.css',
  shadow: true,
})
export class MapLegend {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLMapLegendElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * esri/widgets/Legend: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html
   *
   * Legend instance
   */
  @Prop() legendWidget: __esri.Legend;

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
   * esri/widgets/Legend: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html
   *
   * Legend constructor
   */
  protected Legend: typeof import("esri/widgets/Legend");

  /**
   * HTMLElement: The container div for the basemap gallery widget
   */
  protected _legendElement: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(() => {
      this._initLegend(this.mapView);
    });
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
   */
  async componentWillLoad(): Promise<void> {
    return this._initModules();
  }

  /**
   * StencilJS: Renders the component.
   */
  render() {
    return (
      <Host>
        <div ref={(el) => { this._legendElement = el }} />
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
    const [Legend] = await loadModules([
      "esri/widgets/Legend"
    ]);
    this.Legend = Legend;
  }

  /**
   * Initialize the basemap gallery or reset the current view if it already exists
   *
   * @returns void
   *
   * @protected
   */
  protected _initLegend(
    view: __esri.MapView
  ): void {
    if (view && this.Legend) {
      if (!this.legendWidget) {
        this.legendWidget = new this.Legend({
          container: this._legendElement,
          view
        });
      } else {
        this.legendWidget.view = view;
      }
    }
  }
}
