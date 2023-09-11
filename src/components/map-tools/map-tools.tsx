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
import { EExpandType, ISearchConfiguration } from "../../utils/interfaces";

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

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop() searchConfiguration: ISearchConfiguration;

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
  @State() _showBasemapWidget = false;

  /**
   * When true the legend widget will be displayed
   */
  @State() _showLegendWidget = false;

  /**
   * When true the search widget will be displayed
   */
  @State() _showSearchWidget = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLMapSearchElement: The search element node
   */
  protected _basemapElement: HTMLBasemapGalleryElement;

  /**
   * HTMLLegendElement: The legend element node
   */
  protected _legendElement: HTMLMapLegendElement;

  /**
   * HTMLMapSearchElement: The search element node
   */
  protected _searchElement: HTMLMapSearchElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * When the _showBasemapWidget property is true display the basemap gallery
   */
  @Watch("_showBasemapWidget")
  async _showBasemapWidgetWatchHandler(
    v: boolean
  ): Promise<void> {
    if (v) {
      this.mapView.ui.add(this._basemapElement.basemapWidget, {
        position: "top-right",
        index: 1
      });
    } else {
      this.mapView.ui.remove(this._basemapElement.basemapWidget);
    }
  }

  /**
   * When the _showLegendWidget property is true display the search widget
   */
  @Watch("_showLegendWidget")
  async _showLegendWidgetWatchHandler(
    v: boolean
  ): Promise<void> {
    if (v) {
      this.mapView.ui.add(this._legendElement.legendWidget, {
        position: "top-right",
        index: 1
      });
    } else {
      this.mapView.ui.remove(this._legendElement.legendWidget);
    }
  }

  /**
   * When the _showSearchWidget property is true display the search widget
   */
  @Watch("_showSearchWidget")
  async _showSearchWidgetWatchHandler(
    v: boolean
  ): Promise<void> {
    if (v) {
      this.mapView.ui.add(this._searchElement.searchWidget, {
        position: "top-right",
        index: 1
      });
    } else {
      this.mapView.ui.remove(this._searchElement.searchWidget);
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
  }

  /**
   * StencilJS: Renders the component.
   */
  render() {
    const toggleIcon = this._showTools ? "chevrons-up" : "chevrons-down";
    const toolsClass = this._showTools ? "" : "display-none";
    const searchClass = this._showSearchWidget ? "" : "display-none";
    const basemapClass = this._showBasemapWidget ? "" : "display-none";
    const legendClass = this._showLegendWidget ? "" : "display-none";
    const expandTip = this._showTools ? this._translations.collapse : this._translations.expand;
    return (
      <Host>
        <div>
          <div class="box-shadow">
            {this._getActionGroup(toggleIcon, false, expandTip, () => this._toggleTools())}
          </div>
          <div class={`margin-top-1-2 box-shadow ${toolsClass}`}>
            {this._getActionGroup("legend", false, this._translations.legend, () => this._showLegend())}
            {this._getActionGroup("magnifying-glass", false, this._translations.search, () => this._search())}
            {this._getActionGroup("expand", false, this._translations.expand, () => this._expand())}
            {this._getActionGroup("basemap", false, this._translations.basemap, () => this._toggleBasemapPicker())}
          </div>
        </div>
        <basemap-gallery
          class={basemapClass}
          mapView={this.mapView}
          ref={(el) => {this._basemapElement = el}}
        />
        <map-search
          class={searchClass}
          mapView={this.mapView}
          ref={(el) => { this._searchElement = el }}
          searchConfiguration={this.searchConfiguration}
        />
        <map-legend
          class={legendClass}
          mapView={this.mapView}
          ref={(el) => {this._legendElement = el}}
        />
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

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
      <div class="border-bottom">
        <calcite-action
          alignment="center"
          class="square-40"
          compact={false}
          disabled={disabled}
          icon={icon}
          id={icon}
          onClick={func}
          scale="s"
          text=""
        >
          <calcite-icon icon={"cheveron-up"} scale="s" slot="icon" />
        </calcite-action>
        <calcite-tooltip label="" placement="trailing" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </div>
    );
  }

  // need to discuss this with the team
  protected _showLegend(): void {
    this._showLegendWidget = !this._showLegendWidget;
    this._showTools = false;
  }

  // Need to discuss this with the team
  protected _search(): void {
    this._showSearchWidget = !this._showSearchWidget;
    this._showTools = false;
  }

  /**
   * Show/Hide the basemap picker
   *
   * @returns void
   *
   * @protected
   */
  protected _toggleBasemapPicker(): void {
    this._showBasemapWidget = !this._showBasemapWidget;
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
      this._showBasemapWidget = false;
      this._showSearchWidget = false;
      this._showLegendWidget = false;
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
