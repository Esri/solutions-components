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
  tag: 'basemap-gallery',
  styleUrl: 'basemap-gallery.css',
  shadow: true,
})
export class BasemapGallery {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLBasemapGalleryElement;

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
   * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
   *
   * BasemapGallery instance
   */
  @Prop() basemapWidget: __esri.BasemapGallery;

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
   * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
   *
   * BasemapGallery constructor
   */
  protected BasemapGallery: typeof import("esri/widgets/BasemapGallery");

  /**
   * HTMLElement: The container div for the basemap gallery widget
   */
  protected _basemapElement: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(() => {
      this._initBaseMapGallery(this.mapView);
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
        <div ref={(el) => { this._basemapElement = el }} />
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
    const [BasemapGallery] = await loadModules([
      "esri/widgets/BasemapGallery"
    ]);
    this.BasemapGallery = BasemapGallery;
  }

  /**
   * Initialize the basemap gallery or reset the current view if it already exists
   *
   * @returns void
   *
   * @protected
   */
  protected _initBaseMapGallery(
    view: __esri.MapView
  ): void {
    if (view && this.BasemapGallery) {
      if (!this.basemapWidget) {
        this.basemapWidget = new this.BasemapGallery({
          container: this._basemapElement,
          view
        });
      } else {
        this.basemapWidget.view = view;
      }
    }
  }
}
