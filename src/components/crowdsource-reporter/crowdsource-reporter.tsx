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

import { Component, Element, Host, h, Prop, VNode, State, Listen } from "@stencil/core";
import { IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
import { getLocaleComponentStrings } from "../../utils/locale";
import CrowdsourceReporter_T9n from "../../assets/t9n/crowdsource-reporter/resources.json";

@Component({
  tag: "crowdsource-reporter",
  styleUrl: "crowdsource-reporter.css",
  shadow: false,
})
export class CrowdsourceReporter {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCrowdsourceReporterElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: The text that will display under the title on the landing page
   */
  @Prop() description: string;

  /**
   * boolean: When true the anonymous users will be allowed to submit reports and comments
   */
  @Prop() enableAnonymousAccess: boolean;

  /**
   * boolean: When true the anonymous users will be allowed to submit comments
   */
  @Prop() enableAnonymousComments: boolean;

  /**
   * boolean: When true the user will be allowed to submit comments
   */
  @Prop() enableComments: boolean;

  /**
   * boolean: When true the user will be provided a login page
   */
  @Prop() enableLogin: boolean;

  /**
   * boolean: When true the user will be allowed to submit new reports
   */
  @Prop() enableNewReports: boolean;

  /**
   * string[]: list of layer ids
   */
  @Prop() layers: string[];

  /**
   * string: The text that will display at the top of the landing page
   */
  @Prop() loginTitle: string;

  /**
   * string: The word(s) to display in the reports submit button
   */
  @Prop() reportButtonText: string;

  /**
   * string: The word(s) to display in the reports header
   */
  @Prop() reportsHeader: string;

  /**
   * string: The message to display when the report has been submitted
   */
  @Prop() reportSubmittedMessage: string;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop() searchConfiguration: ISearchConfiguration;

  /**
   * boolean: When true the comments from all users will be visible
   */
  @Prop() showComments: boolean;

  /**
   * string: Item ID of the web map that should be selected by default
   */
  @Prop() defaultWebmap = "";

  /**
   * boolean: when true the search widget will be available
   */
  @Prop() enableSearch = true;

  /**
   * boolean: when true the home widget will be available
   */
  @Prop() enableHome = true;

  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  @Prop() mapInfos: IMapInfo[] = [];

  /**
   * theme: "light" | "dark" theme to be used
   */
  @Prop() theme: theme = "light";

  /**
   * boolean: when true the zoom widget will be available
   */
  @Prop() enableZoom = true;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * IMapInfo: The current map info stores configuration details
   */
  @State() _mapInfo: IMapInfo;

  /**
   * __esri.MapView: Stores the current map view
   */
  @State() _mapView: __esri.MapView;

  /**
   * boolean: When true the application will be in mobile mode, controls the mobile or desktop view
   */
  @State() _isMobile = false;

  /**
   * string[]: Reporter flow items list
   */
  @State() _flowItems: string[] = ["layer-list"];

  /**
   * boolean: Controls the state for panel in mobile view
   */
  @State() _sidePanelCollapsed = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CrowdsourceReporter_T9n;

  /**
   * boolean: When true show the sort and filter icon
   */
  @State() _hasValidLayers = false;

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
   * number[]: X,Y pair used to center the map
   */
  protected _defaultCenter: number[];

  /**
   * number: zoom level the map should go to
   */
  protected _defaultLevel: number;

  /**
   * string: The selected feature layer's id from the layer's list
   */
  protected _selectedLayerId: string;

  /**
   * string: The selected feature layer's name from the layer's list
   */
  protected _selectedLayerName: string;

  /**
   * __esri.Graphic: The selected feature
   */
  protected _selectedFeature: __esri.Graphic[];
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
   * Listen for mapChanged event to be fired then store the new mapView so components will be updated
   */
  @Listen("mapChanged", { target: "window" })
  async mapChanged(
    evt: CustomEvent
  ): Promise<void> {
    this._mapChange = evt.detail;
    await this._mapChange.mapView.when(async () => {
      await this.setMapView();
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   * Create component translations and monitor the mediaQuery change to detect mobile/desktop mode
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    const mediaQueryList = window.matchMedia("screen and (max-width: 600px)");
    this._isMobile = mediaQueryList.matches;
    //on change update the state for is mobile and the sidePanelCollapsed
    mediaQueryList.onchange = (e) => {
      this._isMobile = e.matches;
      this._sidePanelCollapsed = false;
    }
  }

  /**
   * Renders the component.
   */
  render() {
    let  validConfiguration = true;
    //Check if webMap id is configured
    if(!this.mapInfos || this.mapInfos.length<=0  || (this.mapInfos?.length>0 && !this.mapInfos[0]?.id)){
      validConfiguration = false
    }
    return (
      <Host>
        <div>
          {validConfiguration &&
            <calcite-shell content-behind >
              {this._getReporter()}
              {this._getMapNode()}
            </calcite-shell>
          }
          {!validConfiguration &&
            <calcite-notice class="error-msg" icon="configure" kind="danger" open>
              <div slot="title">{this._translations.error}</div>
              <div slot="message">{ this._translations.invalidConfigurationErrorMsg}</div>
            </calcite-notice>
          }
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Get the reporter app functionality
   * @protected
   */
  protected _getReporter(): VNode {
    const renderLists = []
    this._flowItems.forEach((item) => {
      switch (item) {
        case "layer-list":
          renderLists.push(this.getLayerListFlowItem());
          break;
        case "feature-list":
          renderLists.push(this.getFeatureListFlowItem(this._selectedLayerId, this._selectedLayerName));
          break;
          case "feature-details":
            renderLists.push(this.getFeatureDetailsFlowItem());
            break;
          
      }
    });
    let sidePanelClass = "side-panel";
    //in case of mobile handle for collapsed styles of the panel
    if (this._isMobile && this._sidePanelCollapsed) {
      sidePanelClass += " collapsed-side-panel";
    }
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <calcite-panel class={sidePanelClass + " " + themeClass}>
        {this._mapView
          ? <calcite-flow>
            {renderLists?.length > 0 && renderLists}
          </calcite-flow>
          : <calcite-loader scale="m" />}
      </calcite-panel>
    );
  }

  /**
   * Get the feature layer list
   * @returns the layer list items
   * @protected
   */
  protected getLayerListFlowItem(): Node {
    return (
      <calcite-flow-item collapsed={this._isMobile && this._sidePanelCollapsed} heading={this.reportsHeader}>
        {this._hasValidLayers && <calcite-action icon="sort-ascending-arrow" slot={this._isMobile ? "header-menu-actions" : "header-actions-end"}
          text={this._translations.sort} text-enabled={this._isMobile} />}
        {this._hasValidLayers && <calcite-action icon="filter" slot={this._isMobile ? "header-menu-actions" : "header-actions-end"}
          text={this._translations.filter} text-enabled={this._isMobile} />}
        {this._isMobile && this.getActionToExpandCollapsePanel()}
        {this._hasValidLayers && this.enableNewReports && <calcite-button appearance="secondary" slot="footer" width="full">
          {this.reportButtonText}
        </calcite-button>}
        <calcite-panel full-height full-width>
          <layer-list class="height-full"
            layers={this.layers}
            mapView={this._mapView}
            noLayerErrorMsg={this._translations.noLayerToDisplayErrorMsg}
            onLayerSelect={this.displayFeaturesList.bind(this)}
            onLayersListLoaded={this.layerListLoaded.bind(this)} />
        </calcite-panel>
      </calcite-flow-item>);
  }

  /**
   * When layer list is loaded, we will receive the list of layers, if its  means we don't have any valid layer to be listed
   * @param evt Event which has list of layers
   * @protected
   */
  protected layerListLoaded(evt: CustomEvent): void {
    const layersListed = evt.detail;
    this._hasValidLayers = layersListed.length > 0;
  }

  /**On click of layer list item show feature list
   * @param evt Event which has details of selected layerId and layerName
   * @protected
   */
  protected displayFeaturesList(evt: CustomEvent): void {
    this._selectedLayerId = evt.detail.layerId;
    this._selectedLayerName = evt.detail.layerName;
    this._flowItems = [...this._flowItems, "feature-list"];
  }

  /**
   * On back from feature list navigate to the Layer list panel
   * @protected
   */
  protected backFromFeatureList(): void {
    const updatedFlowItems = [...this._flowItems];
    updatedFlowItems.pop();
    this._flowItems = [...updatedFlowItems];
  }

  /**
   * Toggle side panel in case of mobile mode
   * @protected
   */
  protected toggleSidePanel(): void {
    this._sidePanelCollapsed = !this._sidePanelCollapsed;
  }

  /**
   * When feature is selected from list store that and show feature details
   * @param evt Event which has details of selected feature
   */
  protected async onFeatureSelectFromList(evt: CustomEvent): Promise<void> {
    this._selectedFeature = [evt.detail];
    this._flowItems = [...this._flowItems, "feature-details"];
  }

  /**
   * Get feature list of the selected feature layer
   * @param layerId Layer id
   * @returns feature list node
   * @protected
   */
  protected getFeatureListFlowItem(layerId: string, layerName: string): Node {
    return (
      <calcite-flow-item collapsed={this._isMobile && this._sidePanelCollapsed} heading={layerName} onCalciteFlowItemBack={this.backFromFeatureList.bind(this)}>
        <calcite-action icon="sort-ascending-arrow" slot={this._isMobile ? "header-menu-actions" : "header-actions-end"}
          text={this._translations.sort} text-enabled={this._isMobile} />
        <calcite-action icon="filter" slot={this._isMobile ? "header-menu-actions" : "header-actions-end"}
          text={this._translations.filter} text-enabled={this._isMobile} />
        {this._isMobile && this.getActionToExpandCollapsePanel()}
        {this.enableNewReports && <calcite-button appearance="secondary" slot="footer" width="full">
          {this.reportButtonText}
        </calcite-button>}
        <calcite-panel full-height>
          {<feature-list class="height-full"
            highlightOnMap
            mapView={this._mapView}
            noFeaturesFoundMsg={this._translations.featureErrorMsg}
            onFeatureSelect={this.onFeatureSelectFromList.bind(this)}
            pageSize={100}
            selectedLayerId={layerId}
          />}
        </calcite-panel>
      </calcite-flow-item>);
  }

  /**
   * Returns the calcite-flow item for feature details
   * @returns Node
   */
  protected getFeatureDetailsFlowItem(): Node {
    return (
      <calcite-flow-item collapsed={this._isMobile && this._sidePanelCollapsed} heading={this._selectedLayerName} onCalciteFlowItemBack={this.backFromFeatureList.bind(this)}>
        {this._isMobile && this.getActionToExpandCollapsePanel()}
        <calcite-action icon="share" slot={"header-actions-end"} text={this._translations.share} />
        <calcite-panel full-height>
          <info-card
            allowEditing={false}
            graphics={this._selectedFeature}
            isLoading={false}
            isMobile={false}
            mapView={this._mapView}
            zoomAndScrollToSelected={true}
          />
        </calcite-panel>
      </calcite-flow-item>
    );
  }

  /**
   * Returns the action button to Expand/Collapse side panel in mobile mode
   */
  protected getActionToExpandCollapsePanel(): Node {
    return (
      <calcite-action icon={this._sidePanelCollapsed ? "chevrons-up" : "chevrons-down"} onClick={this.toggleSidePanel.bind(this)} slot="header-actions-end"
        text={this._sidePanelCollapsed ? this._translations.expand : this._translations.collapse} />
    );
  }

  /**
   * Get the map node based for the current layout options
   * @returns the map node
   * @protected
   */
  protected _getMapNode(): VNode {
    let mapContainerClass = "overflow-hidden map-container";
    if (this._isMobile) {
      if (this._sidePanelCollapsed) {
        mapContainerClass += " map-container-mobile";
      }
    } else {
      mapContainerClass += " height-full";
    }
    
    return (
      <div class={mapContainerClass}>
        <map-card
          class="width-full"
          defaultWebmapId={this.defaultWebmap}
          enableBasemap={false}
          enableFloorFilter={false}
          enableFullscreen={false}
          enableHome={this.enableHome}
          enableLegend={true}
          enableSearch={this.enableSearch}
          enableSingleExpand={false}
          hidden={false}
          homeZoomIndex={0}
          homeZoomPosition={"top-left"}
          homeZoomToolsSize={"s"}
          mapInfos={this.mapInfos?.filter(mapInfo => mapInfo.visible !== false)}
          mapWidgetsIndex={this.enableHome ? 4 : 3}
          mapWidgetsPosition={"top-left"}
          mapWidgetsSize={"s"}
          stackTools={false}
          theme={this.theme}
          toolOrder={["search", "legend", "fullscreen", "basemap", "floorfilter"]}
        />
      </div>);
  }

  /**
   * Get the current map info (configuration details) when maps change
   * @param id Id of the map to be returned
   * @returns IMapInfo for the provided id
   * @protected
   */
  protected getMapInfo(id: string): IMapInfo {
    let mapInfo: IMapInfo;
    this.mapInfos.some(mi => {
      if (mi.id === id) {
        mapInfo = mi;
        return true;
      }
    })
    return { ...mapInfo };
  }

  /**
   * Set the current map info when maps change
   * @protected
   */
  protected async setMapView(): Promise<void> {
    this._mapInfo = this.getMapInfo(this._mapChange.id);
    this._mapView = this._mapChange.mapView;
    this.initMapZoom();
    this._mapView.popupEnabled = false;
    if (this._defaultCenter && this._defaultLevel) {
      await this._mapView.goTo({
        center: this._defaultCenter,
        zoom: this._defaultLevel
      });
      this._defaultCenter = undefined;
      this._defaultLevel = undefined;
    }
  }

  /**
   * Add/remove zoom tools based on enableZoom prop
   * @protected
   */
  protected initMapZoom(): void {
    if (!this.enableZoom) {
      this._mapView.ui.remove("zoom");
    } else if (this.enableZoom) {
      this._mapView.ui.add({
        component: "zoom",
        position: "top-left",
        index: 0
      });
    }
  }

  /**
   * Fetches the component's translations
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CrowdsourceReporter_T9n;
  }
}
