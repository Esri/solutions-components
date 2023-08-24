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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import MapTools_T9n from "../../assets/t9n/map-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EExpandType } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules"

@Component({
  tag: 'map-tools',
  styleUrl: 'map-tools.css',
  shadow: true,
})
export class MapTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLMapToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * "horizontal" | "vertical": used to control the orientation of the tools
   */
  @Prop() layout: "horizontal" | "vertical" = "vertical";

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapTools_T9n;

  /**
   * When true the tool action bar will be displayed
   */
  @State() _showTools = true;

  /**
   * When true the basemap picker will be displayed
   */
  @State() _showBasemapPicker = false;

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
   * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
   *
   * BasemapGallery instance
   */
  protected _baseMapGallery: __esri.BasemapGallery;

  /**
   * esri/geometry/Extent: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Extent.html
   */
  protected _homeExtent: __esri.Extent;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Store the home extent and update the basemap gallery when the map view changes
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(() => {
      this._homeExtent = this.mapView.extent;
      this._initBaseMapGallery(this.mapView);
    });
  }

  /**
   * When the _showBasemapPicker property is true display the basemap gallery
   */
  @Watch("_showBasemapPicker")
  async _showBasemapPickerWatchHandler(
    v: boolean
  ): Promise<void> {
    if (v) {
      if (!this._baseMapGallery) {
        this._initBaseMapGallery(this.mapView);
      }
      this.mapView.ui.add(this._baseMapGallery, {
        position: "top-right",
        index: 1
      });
    } else {
      this.mapView.ui.remove(this._baseMapGallery);
    }
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
   * Emitted when the expand button is clicked
   */
  @Event() expandMap: EventEmitter<EExpandType>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    return this._initModules();
  }

  /**
   * StencilJS: Renders the component.
   */
  render() {
    const toggleIcon = this._showTools ? "chevrons-up" : "chevrons-down";
    const toolsClass = this._showTools ? "" : "display-none";
    return (
      <Host>
        <div>
          <calcite-action
            alignment="center"
            class="border"
            compact={false}
            icon={toggleIcon}
            onClick={() => { this._toggleTools() }}
            text=""
          />
          <calcite-action-bar class={`border margin-top-1-2 ${toolsClass}`} expand-disabled layout={this.layout}>
            {this._getActionGroup("home", false, this._translations.home, () => void this._goHome())}
            {this._getActionGroup("plus", false, this._translations.zoomIn, () => void this._zoomIn())}
            {this._getActionGroup("minus", false, this._translations.zoomOut, () => void this._zoomOut())}
            {this._getActionGroup("list", false, this._translations.list, () => this._showList())}
            {this._getActionGroup("magnifying-glass", false, this._translations.search, () => this._search())}
            {this._getActionGroup("expand", false, this._translations.expand, () => this._expand())}
            {this._getActionGroup("basemap", false, this._translations.basemap, () => this._toggleBasemapPicker())}
          </calcite-action-bar>
        </div>
        <div id="basemap-container" />
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
      if (!this._baseMapGallery) {
        this._baseMapGallery = new this.BasemapGallery({
          container: "basemap-container",
          view
        });
      } else {
        this._baseMapGallery.view = view;
      }
    }
  }

  /**
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param tip information tip to display helpful details to end user
   * @param func the associated onClick function to execute
   *
   * @returns the dom node for the action group
   *
   * @protected
   */
  protected _getActionGroup(
    icon: string,
    disabled: boolean,
    tip: string,
    func: any
  ): VNode {
    return (
      <calcite-action-group>
        <calcite-action
          alignment="center"
          compact={false}
          disabled={disabled}
          icon={icon}
          id={icon}
          onClick={func}
          text=""
        >
          <calcite-icon icon={"cheveron-up"} scale="s" slot="icon" />
        </calcite-action>
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  /**
   * Go to the exent that was first used when loading the map
   *
   * @returns void
   *
   * @protected
   */
  protected async _goHome(): Promise<void> {
    await this.mapView.goTo(this._homeExtent);
  }

  // need to discuss this with the team
  protected _showList(): void {
    alert("show list")
  }

  // Need to discuss this with the team
  protected _search(): void {
    alert("search")
  }

  /**
   * Fixed zoom in
   *
   * @returns void
   *
   * @protected
   */
  protected async _zoomIn(): Promise<void> {
    await this._zoom(this.mapView.zoom + 1);
  }

  /**
   * Fixed zoom out
   *
   * @returns void
   *
   * @protected
   */
  protected async _zoomOut(): Promise<void> {
    await this._zoom(this.mapView.zoom - 1);
  }

  /**
   * Zoom in/out at the maps current center point
   *
   * @param zoom Number to zoom level to go to
   *
   * @returns void
   *
   * @protected
   */
  protected async _zoom(
    zoom: number
  ): Promise<void> {
    await this.mapView?.goTo({
      target: this.mapView.center,
      zoom
    });
  }

  /**
   * Show/Hide the basemap picker
   *
   * @returns void
   *
   * @protected
   */
  protected _toggleBasemapPicker(): void {
    this._showBasemapPicker = !this._showBasemapPicker;
    this._showTools = false;
  }

  /**
   * Emit the expand map event
   *
   * @returns void
   *
   * @protected
   */
  protected _expand(): void {
    this.expandMap.emit(EExpandType.EXPAND);
  }

  /**
   * Show/Hide the map tools
   *
   * @returns void
   *
   * @protected
   */
  protected _toggleTools(): void {
    if (!this._showTools) {
      this._showBasemapPicker = false;
    }
    this._showTools = !this._showTools;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MapTools_T9n;
  }
}
