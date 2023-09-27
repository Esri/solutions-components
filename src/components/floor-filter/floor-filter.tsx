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
  tag: 'floor-filter',
  styleUrl: 'floor-filter.css',
  shadow: true,
})
export class FloorFilter {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLFloorFilterElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
   *
   * FloorFilter instance
   */
  @Prop() floorFilterWidget: __esri.FloorFilter;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
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
   * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
   *
   * FloorFilter constructor
   */
  protected FloorFilter: typeof import("esri/widgets/FloorFilter");

  /**
   * HTMLElement: The container div for the floor filter widget
   */
  protected _floorFilterElement: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(() => {
      this._initFloorFilter(this.mapView);
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

  render() {
    return (
      <Host>
        <div ref={(el) => { this._floorFilterElement = el }} />
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
    const [FloorFilter] = await loadModules([
      "esri/widgets/FloorFilter"
    ]);
    this.FloorFilter = FloorFilter;
  }

  /**
   * Initialize the floor filter or reset the current view if it already exists
   *
   * @returns void
   *
   * @protected
   */
  protected _initFloorFilter(
    view: __esri.MapView
  ): void {
    if (view && this.FloorFilter) {
      if (!this.floorFilterWidget) {
        this.floorFilterWidget = new this.FloorFilter({
          container: this._floorFilterElement,
          view
        });
      } else {
        this.floorFilterWidget.view = view;
      }
    }
  }
}
