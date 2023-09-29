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

import { Component, Element, Host, h, Listen, Prop, State, VNode } from "@stencil/core";
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode, IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration } from "../../utils/interfaces";

@Component({
  tag: "crowdsource-manager",
  styleUrl: "crowdsource-manager.css",
  shadow: false,
})
export class CrowdsourceManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCrowdsourceManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: when true the grid will display like the previous manager app with the table across the top
   */
  @Prop() classicGrid = false;

  /**
   * boolean: when true the layer table will auto refresh the data
   */
  @Prop() enableAutoRefresh = true;

  /**
   * boolean: when true the fullscreen widget will be available
   */
  @Prop() enableFloorFilter = true;

  /**
   * boolean: when true the fullscreen widget will be available
   */
  @Prop() enableFullscreen = true;

  /**
   * boolean: when true edits can be applied directly within the table
   */
  @Prop() enableInlineEdit = false;

  /**
   * boolean: when true the legend widget will be available
   */
  @Prop() enableLegend = true;

  /**
   * boolean: when true the search widget will be available
   */
  @Prop() enableSearch = true;

  /**
   * boolean: when true the home widget will be available
   */
  @Prop() enableHome = true;

  /**
   * boolean: when true the zoom widget will be available
   */
  @Prop() enableZoom = true;

  /**
   * boolean: when true the basemap widget will be available
   */
  @Prop() enableBasemap = true;

  /**
   * IBasemapConfig: List of any basemaps to filter out from the basemap widget
   */
  @Prop() basemapConfig: IBasemapConfig;

  /**
   * boolean: when true the table will be sorted by objectid in descending order by default
   */
  @Prop() showNewestFirst = true;

  /**
   * boolean: when true no map is displayed for the app
   */
  @Prop() hideMap = false;

  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers = true;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop() searchConfiguration: ISearchConfiguration;

  /**
   * "light" | "dark": Calcite theme to be used
   */
  @Prop() theme: "light" | "dark" = "light";

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected = false;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the info panel with the popup details will take the full height and prevent the map from displaying
   */
  @State() _expandPopup = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CrowdsourceManager_T9n;

  /**
   * Controls the layout of the application
   */
  @State() _layoutMode: ELayoutMode = ELayoutMode.GRID;

  /**
   * Stores the current map view
   */
  @State() _mapView: __esri.MapView;

  /**
   * Controls the layout of the application
   */
  @State() _panelOpen = true;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * IMapChange: The current map change details
   */
  protected _mapChange: IMapChange;

  /**
   * IMapInfo: The current map info stores configuration details
   */
  protected _mapInfo: IMapInfo;

  /**
   * boolean: When true the map view will be set after render due to popup obstructing the view
   * MapView.when is not fired when mapView is not currently visible
   */
  protected _shouldSetMapView = false;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

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
   * Listen for layoutChanged event to be fired so we can adjust the layout
   */
  @Listen("layoutChanged", { target: "window" })
  async layoutChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._layoutMode = evt.detail;
  }

  /**
   * Listen for mapChanged event to be fired then store the new mapView so components will be updated
   */
  @Listen("mapChanged", { target: "window" })
  async mapChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._mapChange = evt.detail;
    await this._mapChange.mapView.when(() => {
      this._setMapView();
    });
  }

  /**
   * Listen for beforeMapChanged and minimize the popup if it's expanded
   */
  @Listen("beforeMapChanged", { target: "window" })
  async beforeMapChanged(): Promise<void> {
    if (this._expandPopup) {
      this._shouldSetMapView = true;
      this._expandPopup = false;
    }
  }

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
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <calcite-shell class="position-relative">
          <calcite-panel
            class="width-full height-full"
          >
            {this._getBody(this._layoutMode, this._panelOpen, this.hideMap)}
          </calcite-panel>
        </calcite-shell>
      </Host>
    );
  }

  /**
   * Called after each render
   * Used to delay the setting of the mapView when the popup is expaneded and obstructs the view
   */
  componentDidRender() {
    if (this._shouldSetMapView) {
      this._shouldSetMapView = false;
      this._setMapView();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Get the icon name to use for the divider icon based on the current layout
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   *
   * @returns the icon name
   * @protected
   */
  protected _getDividerIcon(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let icon = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        icon = this.classicGrid ?
          (panelOpen ? "chevrons-down" : "chevrons-up") :
          (panelOpen ? "chevrons-up" : "chevrons-down");
        break;
      case ELayoutMode.VERTICAL:
        icon = this.classicGrid ?
          (panelOpen ? "chevrons-right" : "chevrons-left") :
          (panelOpen ? "chevrons-left" : "chevrons-right");
        break;
      case ELayoutMode.GRID:
        icon = this.classicGrid ?
          (panelOpen ? "chevrons-up" : "chevrons-down") :
          (panelOpen ? "chevrons-left" : "chevrons-right");
        break;
    }
    return icon;
  }

  /**
   * Get the css selector names to use for the map based on the current layout
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   *
   * @returns the css selectors
   * @protected
   */
  protected _getMapSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-0"} width-full position-relative`;
        break;
      case ELayoutMode.GRID:
        sizeClass = this.classicGrid ? `${panelOpen ? "position-relative" : "position-absolute-53"} height-full width-full display-flex` :
          `height-full position-relative ${panelOpen ? "width-1-3" : "width-0"}`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `height-full position-relative ${panelOpen ? "width-1-2" : "width-0"}`;
        break;
    }
    return sizeClass;
  }

  /**
   * Get the css selector names to use for the table based on the current layout
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   *
   * @returns the css selectors
   * @protected
   */
  protected _getTableSizeClass(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): string {
    let sizeClass = "";
    switch (layoutMode) {
      case ELayoutMode.HORIZONTAL:
        sizeClass = `${panelOpen ? "height-1-2" : "height-full"} width-full display-flex flex-column`;
        break;
      case ELayoutMode.GRID:
        sizeClass = this.classicGrid ?
          `${panelOpen ? "height-full" : "height-53"} position-relative width-full display-flex` :
          `${panelOpen ? "width-2-3" : "width-full"} height-full display-flex`;
        break;
      case ELayoutMode.VERTICAL:
        sizeClass = `${panelOpen ? "width-1-2" : "width-full"} height-full display-flex`;
        break;
    }
    return sizeClass;
  }

  /**
   * Get the table and map nodes based for the current layout
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   * @param hideMap when true no map is displayed
   *
   * @returns the parent node that contains the table and map
   * @protected
   */
  protected _getBody(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
    hideMap: boolean
  ): VNode {
    const contentClass = this.classicGrid && layoutMode === ELayoutMode.GRID && panelOpen ? "display-grid" :
      layoutMode === ELayoutMode.HORIZONTAL ? "" : "display-flex";
    return this.classicGrid ? (
      <calcite-panel class={"width-full height-full"}>
        <div class={`width-full height-full ${contentClass}`}>
          {this._getTable(layoutMode, panelOpen)}
          {this._getMapAndCard(layoutMode, panelOpen, hideMap)}
        </div>
      </calcite-panel>
    ) : (
      <calcite-panel class={"width-full height-full"}>
        <div class={`width-full height-full ${contentClass}`}>
          {this._getMapAndCard(layoutMode, panelOpen, hideMap)}
          {this._getTable(layoutMode, panelOpen)}
        </div>
      </calcite-panel>
    );
  }

  /**
   * Get the map and card nodes based for the current layout options
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   * @param hideMap when true no map is displayed
   *
   * @returns the map node
   * @protected
   */
  protected _getMapAndCard(
    layoutMode: ELayoutMode,
    panelOpen: boolean,
    hideMap: boolean
  ): VNode {
    const mapSizeClass = this._getMapSizeClass(layoutMode, panelOpen);
    return this.classicGrid ? (
      <div class={`${mapSizeClass} overflow-hidden`}>
        {this._getCardNode()}
        {this._getMapNode(layoutMode, hideMap)}
      </div>
    ) : (
      <div class={`${mapSizeClass} overflow-hidden`}>
        {this._getMapNode(layoutMode, hideMap)}
        {this._getPopupExpandNode()}
      </div>
    );
  }

  /**
   * Get the map node based for the current layout options
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param hideMap when true no map is displayed
   *
   * @returns the map node
   * @protected
   */
  protected _getMapNode(
    layoutMode: ELayoutMode,
    hideMap: boolean
  ): VNode {
    const mapDisplayClass = this.classicGrid && layoutMode === ELayoutMode.GRID ? "display-flex height-full width-1-2" :
      layoutMode === ELayoutMode.GRID && !hideMap ? "" : "display-none";
    const mapContainerClass = this.classicGrid && layoutMode === ELayoutMode.GRID ? "width-full" : this._expandPopup ? "height-50-px" : "adjusted-height-50";
    return (
      <div class={`${mapContainerClass} overflow-hidden ${mapDisplayClass}`} >
        <map-card
          basemapConfig={this.basemapConfig}
          class="width-full"
          enableBasemap={this.enableBasemap}
          enableFloorFilter={this.enableFloorFilter && (this._mapView?.map as any)?.floorInfo}
          enableFullscreen={this.enableFullscreen}
          enableLegend={this.enableLegend}
          enableSearch={this.enableSearch}
          mapInfos={this.mapInfos.filter(mapInfo => mapInfo.visible !== false)}
        />
      </div>
    );
  }

  /**
   * Get the expand node for the popup information
   *
   * @returns the expand node
   * @protected
   */
  protected _getPopupExpandNode(): VNode {
    const icon = this._expandPopup ? "chevrons-down" : "chevrons-up";
    const id = "expand-popup";
    const tooltip = this._expandPopup ? this._translations.collapsePopup : this._translations.expandPopup;
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <div class={"calcite-mode-dark height-full"}>
        <calcite-panel>
          <div
            class="display-flex align-items-center"
            slot="header-content"
          >
            <calcite-icon icon="information" scale="s" />
            <div class="padding-inline-start-75">
              {this._translations.information}
            </div>
          </div>
          <calcite-action
            class="height-49-px"
            icon={icon}
            id={id}
            onClick={() => this._togglePopup()}
            slot="header-actions-end"
          />
          <calcite-tooltip
            class={themeClass}
            label=""
            placement="bottom"
            reference-element={id}
          >
            <span>{tooltip}</span>
          </calcite-tooltip>
          {this._getCardNode()}
        </calcite-panel>
      </div>
    );
  }

  /**
   * Toggle the popup information
   *
   * @protected
   */
  protected _togglePopup(): void {
    this._expandPopup = !this._expandPopup;
  }

  /**
   * Get the card node based for the current layout options
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param hideMap when true no map is displayed
   *
   * @returns the map node
   * @protected
   */
  protected _getCardNode(): VNode {
    const cardManagerHeight = !this._expandPopup ? "height-50" : "height-full";
    const cardManagerContainer = this._expandPopup ? "width-50 adjusted-height-100-50" : "width-50 height-full";
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <div class={`${cardManagerContainer} ${themeClass}`}>
        <card-manager
          class={`${cardManagerHeight} width-full`}
          mapView={this?._mapView}
          zoomAndScrollToSelected={this.zoomAndScrollToSelected}
        />
      </div>
    );
  }

  /**
   * Get the table node based for the current layout
   *
   * @param layoutMode ELayoutMode the current layout mode
   * @param panelOpen boolean indicates if all panels are open
   *
   * @returns the table node
   * @protected
   */
  protected _getTable(
    layoutMode: ELayoutMode,
    panelOpen: boolean
  ): VNode {
    const tableSizeClass = this._getTableSizeClass(layoutMode, panelOpen)
    const icon = this._getDividerIcon(layoutMode, panelOpen);
    const tooltip = panelOpen ? this._translations.close : this._translations.open;
    const id = "toggle-layout";
    const toggleLayout = layoutMode === ELayoutMode.HORIZONTAL || this.classicGrid ? "horizontal" : "vertical";
    const toggleSlot = this.classicGrid && layoutMode !== ELayoutMode.VERTICAL ? "footer" :
      this.classicGrid && layoutMode === ELayoutMode.VERTICAL ? "panel-end" :
        layoutMode === ELayoutMode.HORIZONTAL  ? "header" : "panel-start";
    return (
      <calcite-shell class={tableSizeClass + " border-bottom"}>
        <calcite-action-bar
          class="border"
          expandDisabled={true}
          layout={toggleLayout}
          slot={toggleSlot}
        >
          <calcite-action
            class="toggle-node"
            icon={icon}
            id={id}
            onClick={() => this._toggleLayout()}
            text=""
          />
          <calcite-tooltip
            label={tooltip}
            placement="bottom"
            reference-element={id}
          >
            <span>{tooltip}</span>
          </calcite-tooltip>
        </calcite-action-bar>
        <div class="width-full height-full position-relative">
          <layer-table
            enableAutoRefresh={this.enableAutoRefresh}
            enableInlineEdit={this.enableInlineEdit}
            mapInfo={this._mapInfo}
            mapView={this?._mapView}
            onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
            showNewestFirst={this.showNewestFirst}
            zoomAndScrollToSelected={this.zoomAndScrollToSelected}
          />
        </div>
      </calcite-shell>
    );
  }

  /**
   * Open/Close the appropriate panel.
   * The panel that is toggled is dependent upon the layout mode and if using classic grid or not
   *
   * @returns void
   * @protected
   */
  protected _toggleLayout(): void {
    this._panelOpen = !this._panelOpen;
  }

  /**
   * Get the current map info (configuration details) when maps change
   *
   * @returns IMapInfo for the provided id
   * @protected
   */
  protected _getMapInfo(
    id: string
  ): IMapInfo {
    let mapInfo: IMapInfo;
    this.mapInfos.some(mi => {
      if (mi.id === id) {
        mapInfo = mi;
        return true;
      }
    })
    return mapInfo;
  }

  /**
   * Set the current map info when maps change
   *
   * @protected
   */
  protected _setMapView(): void {
    this._mapInfo = this._getMapInfo(this._mapChange.id);
    this._mapView = this._mapChange.mapView;
    this._mapView.popupEnabled = false;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CrowdsourceManager_T9n;
  }

}
