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

import { Component, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'map-fullscreen',
  styleUrl: 'map-fullscreen.css',
  shadow: true,
})
export class MapFullscreen {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html
   */
  @Prop() fullscreenWidget: __esri.Fullscreen;

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
   * esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html
   */
  protected Fullscreen: typeof import("esri/widgets/Fullscreen");

  /**
   * HTMLElement: The container div for the Fullscreen widget
   */
  protected _fullscreenElement: HTMLElement;

  /**
   * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
   */
  protected _fullscreenStateChangeHandle: __esri.WatchHandle;

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the mapView prop is changed.
   *
   * @returns Promise when complete
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(async () => {
      await this._initFullscreenWidget();
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
   * Emitted on demand when the fullscreen widget state has changed
   */
  @Event() fullscreenStateChange: EventEmitter<string>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._initModules();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div class="fullscreen-widget" ref={(el) => { this._fullscreenElement = el }} />
      </Host>
    );
  }

  /**
   * StencilJS: Called just after the component updates.
   * It's never called during the first render().
   */
  async componentDidUpdate(): Promise<void> {
    await this._initFullscreenWidget();
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad(): Promise<void> {
    await this._initFullscreenWidget();
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
    const [Fullscreen, reactiveUtils] = await loadModules([
      "esri/widgets/Fullscreen",
      "esri/core/reactiveUtils"
    ]);
    this.Fullscreen = Fullscreen;
    this.reactiveUtils = reactiveUtils;
  }

  /**
   * Initialize the search widget
   *
   * @protected
   */
  protected async _initFullscreenWidget(): Promise<void> {
    if (this.mapView && this._fullscreenElement && !this.fullscreenWidget) {
      this.fullscreenWidget = new this.Fullscreen({
        view: this.mapView
      });
      await this.fullscreenWidget.when(() => {
        if (this._fullscreenStateChangeHandle) {
          this._fullscreenStateChangeHandle.remove();
        }
        this._fullscreenStateChangeHandle = this.reactiveUtils.watch(
          () => this.fullscreenWidget.viewModel.state,
          (state) => this.fullscreenStateChange.emit(state)
        );
      })
    } else if (this.fullscreenWidget) {
      this.fullscreenWidget.view = this.mapView;
    }
  }

}
