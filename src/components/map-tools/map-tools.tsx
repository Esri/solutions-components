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

import { Component, Element, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import MapTools_T9n from "../../assets/t9n/map-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { IBasemapConfig, ISearchConfiguration } from "../../utils/interfaces";

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
   * IBasemapConfig: List of any basemaps to filter out from the basemap widget
   */
  @Prop() basemapConfig: IBasemapConfig;

  /**
   * boolean: when true the legend widget will be available
   */
  @Prop() enableLegend: boolean;

  /**
   * boolean: when true the floor filter widget will be available
   */
  @Prop() enableFloorFilter: boolean;

  /**
   * boolean: when true the fullscreen widget will be available
   */
  @Prop() enableFullscreen: boolean;

  /**
   * boolean: when true the search widget will be available
   */
  @Prop() enableSearch: boolean;

  /**
   * boolean: when true the basemap widget will be available
   */
  @Prop() enableBasemap: boolean;

  /**
   * boolean: when true map tools will be displayed within a expand/collapse widget
   */
  @Prop() enableMapToolsExpand: boolean;

  /**
   * "s" | "m" | "l": Used for Zoom and Home tools
   */
  @Prop() homeZoomToolsSize: "s" | "m" | "l" = "m";

  /**
   * "horizontal" | "vertical": used to control the orientation of the tools
   */
  @Prop() layout: "horizontal" | "vertical" = "vertical";

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * "s" | "m" | "l": Used for optional map tool widget
   */
  @Prop() mapWidgetsSize: "s" | "m" | "l" = "m";

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop() searchConfiguration: ISearchConfiguration;

  /**
   * boolean: When true the map widget tools will have no margin between them.
   * When false the map widget tools will have a margin between them.
   */
  @Prop() stackTools = true;

  /**
   *
   * Valid tools: "legend", "search", "fullscreen", "basemap", "floorfilter"
   */
  @Prop() toolOrder: string[];

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the map supports floor awareness
   */
  @State() _hasFloorInfo = false;

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
   * When true the floor filter widget will be displayed
   */
  @State() _showFloorFilter = false;

  /**
   * When true the map will be displayed in fullscreen mode
   */
  @State() _showFullscreen = false;

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
   * HTMLFloorFilterElement: The floor filter element node
   */
  protected _floorFilterElement: HTMLFloorFilterElement;

  /**
   * HTMLMapFullscreenElement: The fullscreen element node
   */
  protected _fullscreenElement: HTMLMapFullscreenElement;

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
   * When the mapView loads check if it supports floor awareness
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(() => {
      this._hasFloorInfo = (this.mapView?.map as any)?.floorInfo;
    });
  }

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
   * When the _showBasemapWidget property is true display the basemap gallery
   */
  @Watch("_showFloorFilter")
  async _showFloorFilterWatchHandler(
    v: boolean
  ): Promise<void> {
    const widget = this._floorFilterElement.floorFilterWidget;
    if (v) {
      this.mapView.ui.add(widget, {
        position: "top-right",
        index: 1
      });
    } else {
      this.mapView.ui.remove(widget);
    }
  }

  /**
   * When the _showFullscreen property is true the app will consume the full screen
   */
  @Watch("_showFullscreen")
  async _showFullscreenWatchHandler(
    v: boolean
  ): Promise<void> {
    const fs = this._fullscreenElement.fullscreenWidget;
    if (v) {
      if (fs.viewModel.state === "ready") {
        fs.viewModel.enter();
      }
    } else {
      if (fs.viewModel.state === "active") {
        fs.viewModel.exit();
      }
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
    this._setZoomToolsSize();
    const toggleIcon = this._showTools ? "chevrons-up" : "chevrons-down";
    const toolsClass = this._showTools ? "" : "display-none";
    const searchClass = this._showSearchWidget ? "" : "display-none";
    const basemapClass = this._showBasemapWidget ? "" : "display-none";
    const legendClass = this._showLegendWidget ? "" : "display-none";
    const floorFilterClass = this._showFloorFilter ? "" : "display-none";
    const fullscreenClass = this._showFullscreen ? "" : "display-none";
    const expandTip = this._showTools ? this._translations.collapse : this._translations.expand;
    const containerClass = !this.enableBasemap && !this.enableFullscreen && !this.enableLegend && !this.enableSearch ? "display-none" : "";
    const toolMarginClass = this.enableMapToolsExpand ? "margin-top-1-2" : "";
    const toolOrder = this.toolOrder ? this.toolOrder : ["legend", "search", "fullscreen", "floorfilter"];
    const shadowClass = this.stackTools ? "box-shadow" : "";
    return (
      <Host>
        <div class={containerClass}>
          {this.enableMapToolsExpand ? (
            <div class="box-shadow">
              {this._getActionGroup(toggleIcon, false, expandTip, () => this._toggleTools())}
            </div>
          ) : undefined}
          <div class={`${toolMarginClass} ${shadowClass} ${toolsClass}`}>
            {
              this._getMapWidgets(toolOrder)
            }
          </div>
        </div>
        <basemap-gallery
          basemapConfig={this.basemapConfig}
          class={basemapClass}
          mapView={this.mapView}
          ref={(el) => {this._basemapElement = el}}
        />
        <map-search
          class={searchClass}
          mapView={this.mapView}
          ref={(el) => { this._searchElement = el }}
          resultGraphicEnabled={true}
          searchConfiguration={this.searchConfiguration}
        />
        <map-legend
          class={legendClass}
          mapView={this.mapView}
          ref={(el) => {this._legendElement = el}}
        />
        <map-fullscreen
          class={fullscreenClass}
          mapView={this.mapView}
          onFullscreenStateChange={(evt) => this._fullscreenStateChange(evt.detail)}
          ref={(el) => {this._fullscreenElement = el}}
        />
        <floor-filter
          class={floorFilterClass}
          enabled={this.enableFloorFilter}
          mapView={this.mapView}
          ref={(el) => {this._floorFilterElement = el}}
        />
      </Host>
    );
  }

  /**
   * Set the size of the zoom tools based on the user defined homeZoomToolsSize variable.
   *
   * @protected
   */
  protected _setZoomToolsSize(): void {
    const zoomIn = document.getElementsByClassName("esri-zoom")[0]?.children[0];
    const zoomOut = document.getElementsByClassName("esri-zoom")[0]?.children[1];
    if (zoomIn && zoomOut) {
      const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
      (zoomIn as HTMLDivElement).style.width = size;
      (zoomIn as HTMLDivElement).style.height = size;
      (zoomOut as HTMLDivElement).style.width = size;
      (zoomOut as HTMLDivElement).style.height = size;
    }
  }

  /**
   * Get the map widgets considering the user defined enabled values and tool order
   *
   * @protected
   */
  protected _getMapWidgets(
    toolOrder: string[]
  ): VNode[] {
    const fullscreenIcon = this._showFullscreen ? "full-screen-exit" : "full-screen";
    const fullscreenTip = this._showFullscreen ? this._translations.exitFullscreen : this._translations.enterFullscreen;
    return toolOrder.map(t => {
      switch (t) {
        case "legend":
          return this.enableLegend ?
            this._getActionGroup("legend", false, this._translations.legend, () => this._showLegend()) :
            undefined;
        case "search":
          return this.enableSearch ?
            this._getActionGroup("magnifying-glass", false, this._translations.search, () => this._search()) :
            undefined;
        case "fullscreen":
          return this.enableFullscreen ?
            this._getActionGroup(fullscreenIcon, false, fullscreenTip, () => this._expand()) :
            undefined;
        case "basemap":
          return this.enableBasemap ?
            this._getActionGroup("basemap", false, this._translations.basemap, () => this._toggleBasemapPicker()) :
            undefined;
        case "floorfilter":
          return this.enableFloorFilter && this._hasFloorInfo ?
            this._getActionGroup("urban-model", false, this._translations.floorFilter, () => this._toggleFloorFilter()) :
            undefined;
        default:
          break;
      }
    });
  }

  /**
   * Respond to fullscreen state change and ensure our state var is in sync
   *
   * @param state The fullscreen view model's state.
   *
   * @protected
   */
  protected _fullscreenStateChange(
    state: string
  ): void {
    if (state === "ready" && this._showFullscreen) {
      this._showFullscreen = false;
    } else if (state === "active" && !this._showFullscreen) {
      this._showFullscreen = true;
    }
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
    const sizeClass = this.mapWidgetsSize === "s" ? "square-32" : this.mapWidgetsSize === "m" ? "square-40" : "square-48";
    const stackClass = this.stackTools ? "" : "margin-bottom-1-2";
    const shadowClass = this.stackTools ? "" : "box-shadow";
    return (
      <div>
        <calcite-action
          alignment="center"
          class={`${sizeClass} ${stackClass} border-bottom ${shadowClass}`}
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
   */
  protected _toggleBasemapPicker(): void {
    this._showBasemapWidget = !this._showBasemapWidget;
    this._showTools = false;
  }

  /**
   * Show/Hide the floor filter
   */
  protected _toggleFloorFilter(): void {
    this._showFloorFilter = !this._showFloorFilter;
    this._showTools = false;
  }

  /**
   * Enter/Exit fullscreen mode
   */
  protected _expand(): void {
    this._showFullscreen = !this._showFullscreen;
  }

  /**
   * Show/Hide the map tools
   */
  protected _toggleTools(): void {
    if (!this._showTools) {
      this._showBasemapWidget = false;
      this._showSearchWidget = false;
      this._showLegendWidget = false;
      this._showFloorFilter = false;
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
