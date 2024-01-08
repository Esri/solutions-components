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

import { Component, Element, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
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
   * boolean: when true the Floor Filter widget will be available
   */
  @Prop() enabled: boolean;

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

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _levelHandle: __esri.WatchHandle;

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

  /**
   * Emitted on demand when the Level is changed
   */
  @Event() levelChanged: EventEmitter<string>;

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
    const [FloorFilter, reactiveUtils] = await loadModules([
      "esri/widgets/FloorFilter",
      "esri/core/reactiveUtils"
    ]);
    this.FloorFilter = FloorFilter;
    this.reactiveUtils = reactiveUtils;
  }

  /**
   * Initialize the floor filter or reset the current view if it already exists
   */
  protected _initFloorFilter(
    view: __esri.MapView
  ): void {
    if (view && this.enabled && this.FloorFilter && (view?.map as any)?.floorInfo) {
      if (!this.floorFilterWidget) {
        this.floorFilterWidget = new this.FloorFilter({
          container: this._floorFilterElement,
          view
        });

        if (this._levelHandle) {
          this._levelHandle.remove();
        }

        this._levelHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.level,
          (level) => {
            this.levelChanged.emit(level);
          });
      } else {
        this.floorFilterWidget.view = view;
      }
    }
  }
}
