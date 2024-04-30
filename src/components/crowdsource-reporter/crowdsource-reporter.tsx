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

import { Component, Element, Host, h, Prop, VNode, State, Watch, Event, EventEmitter } from "@stencil/core";
import { IMapChange, IMapClick, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
import { getLocaleComponentStrings } from "../../utils/locale";
import { loadModules } from "../../utils/loadModules";
import CrowdsourceReporter_T9n from "../../assets/t9n/crowdsource-reporter/resources.json";
import { getAllLayers, getFeatureLayerView, getLayerOrTable, getMapLayerHash, highlightFeatures } from "../../utils/mapViewUtils";
import { queryFeaturesByID } from "../../utils/queryUtils";
import { ILayerItemsHash } from "../layer-list/layer-list";

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
   * boolean: When true the application will be in mobile mode, controls the mobile or desktop view
   */
  @Prop() isMobile: boolean;

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
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * string: Layer id of the feature from URL params
   */
  @Prop() layerId: string;

  /**
   * string: Object id of the feature from URL params
   */
  @Prop() objectId: string;

  /**
   * string: Semicolon delimited numbers that will be used as the maps center point from URL params
   */
  @Prop() center: string;

  /**
   * string: Id of the zoom level from URL params
   */
  @Prop() level: string;

  /**
   * string: The color that will be displayed on hover when expanding the popup header
   */
  @Prop() popupHeaderHoverColor: string;

  /**
   * string: The background color to apply to the popup header
   */
  @Prop() popupHeaderColor: string;

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

  /**
   * number: default scale to zoom to when zooming to a single point feature
   */
  @Prop() zoomToScale: number;

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
   * string[]: Reporter flow items list
   */
  @State() _flowItems: string[] = [];

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

   /**
   * string: The selected feature layer's name from the layer's list
   */
  @State() _selectedLayerName: string;

  /**
   * boolean: When true show the success message in the panel
   */
  @State() _reportSubmitted = false;

  /**
   * boolean: When true show the submit and cancel button
   */
  @State() _showSubmitCancelButton = false;

  /**
   * string: Error message when feature creation fails
   */
  @State() _featureCreationFailedErrorMsg: string;

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
   * __esri.FeatureLayer[]: Valid layers from the current map
   */
  protected _validLayers: __esri.FeatureLayer[];

  /**
   * string[]: Configured/all layers id from current map which can be used for reporting
   */
  protected _editableLayerIds: string[];

  /**
   * string: The selected feature layer's id from the layer's list
   */
  protected _selectedLayerId: string;

  /**
   * __esri.Graphic: The selected feature
   */
  protected _selectedFeature: __esri.Graphic[];

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  /**
   * IHandle: The map click handle
   */
  protected _mapClickHandle: IHandle;

  /**
   * HTMLCreateFeatureElement: Create Feature component instance
   */
  protected _createFeature: HTMLCreateFeatureElement;

  /**
   * HTMLLayerListElement: Create Layer list component instance
   */
  protected _layerList: HTMLLayerListElement;

  /**
   * HTMLFeatureListElement: Create feature list component instance
   */
  protected _featureList: HTMLFeatureListElement;

  /**
   * HTMLInstantAppsSocialShareElement: Share element
   */
  protected _shareNode: HTMLInstantAppsSocialShareElement;

  /**
   * ObjectId of the feature currently shown in the details
   */
  protected _currentFeatureId: string;

  /**
   * boolean: Maintains a flag to know if urls params are loaded or not
   */
  protected _urlParamsLoaded: boolean;

  /**
   * __esri.Handle: Highlight handles of the selections
   */
  protected _highlightHandle: __esri.Handle;

  //HARDCODED IN EN
  protected _noLayerToDisplayErrorMsg = "Web map does not contain any editable layers.";

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the mapView prop is changed.
   */
  @Watch("isMobile")
  async isMobileWatchHandler(): Promise<void> {
      this._sidePanelCollapsed = false;
  }

  /**
   * Called each time the mapView prop is changed.
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    await this.mapView.when(async () => {
      await this.setMapView();
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
   * Emitted when toggle panel button is clicked in reporter
   */
   @Event() togglePanel: EventEmitter<boolean>;

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
    this._urlParamsLoaded = false;
    await this._initModules();
    await this._getTranslations();
    await this.mapView?.when(async () => {
      await this.setMapView();
    });
  }

  /**
   * Renders the component.
   */
  render() {
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <Host>
        {this._reportSubmitted && <calcite-alert
          auto-close
          class={themeClass + " report-submitted-msg"}
          icon="check-circle"
          kind="success"
          label=""
          onCalciteAlertClose={() => { this._reportSubmitted = false }}
          open
          placement={"top"}>
          <div slot="message">{this.reportSubmittedMessage ? this.reportSubmittedMessage : this._translations.submitMsg}</div>
        </calcite-alert>}
        {this._featureCreationFailedErrorMsg && <calcite-alert
          auto-close
          class={themeClass}
          icon="x-octagon"
          kind="danger"
          label=""
          onCalciteAlertClose={() => { this._featureCreationFailedErrorMsg = "" }}
          open
          placement={"top"}>
          <div slot="title">{this._translations.error}</div>
          <div slot="message">{this._featureCreationFailedErrorMsg}</div>
        </calcite-alert>}
        <div>
          <calcite-shell content-behind >
            {this._getReporter()}
          </calcite-shell>
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
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
    const [reactiveUtils] = await loadModules([
      "esri/core/reactiveUtils"
    ]);
    this.reactiveUtils = reactiveUtils;
  }

  /**
   * Set the selected layer id and layer name
   * @param layerId string layerId of the selected layer
   * @param layerName string layerName of the selected layer
   */
  protected setSelectedLayer(layerId: string, layerName: string): void {
    this._selectedLayerId = layerId;
    this._selectedLayerName = layerName;
    //show only current layer on map and hide other valid editable layers
    //if layerId is empty then show all the layers on map
    this._validLayers.forEach(layer => {
      layer.set('visible', !layerId || (layer.id === layerId))
    })
  }

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
        case "reporting-layer-list":
          renderLists.push(this.getChooseCategoryFlowItem());
          break;
        case "feature-create":
          renderLists.push(this.getFeatureCreateFlowItem());
          break;
      }
    });
    const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
    return (
      <calcite-panel class={"width-full " + themeClass}>
        {this.mapView
          ? <calcite-flow>
            {renderLists?.length > 0 && renderLists}
          </calcite-flow>
          : <calcite-loader label="" scale="m" />}
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
      <calcite-flow-item
        collapsed={this.isMobile && this._sidePanelCollapsed}
        heading={this.reportsHeader}>
        {/* {this._hasValidLayers &&
          <calcite-action
            icon="sort-ascending-arrow"
            slot={this.isMobile ? "header-menu-actions" : "header-actions-end"}
            text={this._translations.sort}
            text-enabled={this.isMobile} />}
        {this._hasValidLayers &&
          <calcite-action
            icon="filter"
            slot={this.isMobile ? "header-menu-actions" : "header-actions-end"}
            text={this._translations.filter}
            text-enabled={this.isMobile} />} */}
        {this.isMobile && this.getActionToExpandCollapsePanel()}
        {this._hasValidLayers && this.enableNewReports &&
          <calcite-button
            appearance="solid"
            onClick={this.navigateToChooseCategory.bind(this)}
            slot="footer"
            width="full">
            {this.reportButtonText ? this.reportButtonText : this._translations.createReportButtonText}
          </calcite-button>}
        <calcite-panel
          full-height
          full-width>
          <layer-list
            class="height-full"
            layers={this._editableLayerIds?.length > 0 ? this._editableLayerIds : this.layers}
            mapView={this.mapView}
            noLayerErrorMsg={this._noLayerToDisplayErrorMsg}
            onLayerSelect={this.displayFeaturesList.bind(this)}
            onLayersListLoaded={this.layerListLoaded.bind(this)}
            ref={el => this._layerList = el as HTMLLayerListElement}
            showFeatureCount
            showNextIcon />
        </calcite-panel>
      </calcite-flow-item>);
  }

  /**
   * Get the layer list for creating a report
   * @returns Choose category flow item
   * @protected
   */
  protected getChooseCategoryFlowItem(): Node {
    return (
      <calcite-flow-item
        collapsed={this.isMobile && this._sidePanelCollapsed}
        heading={this.reportButtonText ? this.reportButtonText : this._translations.createReportButtonText}
        onCalciteFlowItemBack={this.backFromSelectedPanel.bind(this)}>
        {this.isMobile && this.getActionToExpandCollapsePanel()}
        <calcite-panel
          full-height
          full-width>
          <calcite-notice
            class="notice-msg"
            icon="lightbulb"
            kind="success"
            open>
            <div slot="message">{this._translations.chooseCategoryMsg}</div>
          </calcite-notice>
          <layer-list
            class="height-full"
            layers={this.layers}
            mapView={this.mapView}
            noLayerErrorMsg={this._noLayerToDisplayErrorMsg}
            onLayerSelect={this.navigateToCreateFeature.bind(this)}
            showFeatureCount={false}
            showNextIcon={false} />
        </calcite-panel>
      </calcite-flow-item>);
  }

  /**
   * Get Feature create form of the selected feature layer
   * @returns feature create form
   * @protected
   */
  protected getFeatureCreateFlowItem(): Node {
    return (
      <calcite-flow-item
        collapsed={this.isMobile && this._sidePanelCollapsed}
        heading={this._selectedLayerName}
        onCalciteFlowItemBack={this.backFromCreateFeaturePanel.bind(this)}>
        {this.isMobile && this.getActionToExpandCollapsePanel()}
        {this._showSubmitCancelButton && <div class={"width-full"}
          slot="footer">
          <calcite-button
            appearance="solid"
            class={"footer-top-button footer-button"}
            onClick={this.onSubmitButtonClick.bind(this)}
            width="full">
            {this._translations.submit}
          </calcite-button>
          <calcite-button
            appearance="outline"
            class={"footer-button"}
            onClick={this.backFromCreateFeaturePanel.bind(this)}
            width="full">
            {this._translations.cancel}
          </calcite-button>
        </div>}
        <calcite-panel
          full-height
          full-width>
          <calcite-notice
            class="notice-msg"
            icon="lightbulb"
            kind="success"
            open>
            <div slot="message">{this._translations.featureEditFormInfoMsg}</div>
          </calcite-notice>
          <create-feature
            customizeSubmit
            mapView={this.mapView}
            onDrawComplete={this.onDrawComplete.bind(this)}
            onEditingAttachment={this.showSubmitCancelButton.bind(this)}
            onFail={this.createFeatureFailed.bind(this)}
            onSuccess={this.onReportSubmitted.bind(this)}
            ref={el => this._createFeature = el as HTMLCreateFeatureElement}
            searchConfiguration={this.searchConfiguration}
            selectedLayerId={this._selectedLayerId}
          />
        </calcite-panel>
      </calcite-flow-item>);
  }

  /**
   * When drawing of incident location completed on map show the submit and cancel button
   * @protected
   */
  protected onDrawComplete(): void {
    this._showSubmitCancelButton = true;
  }

  /**
   * When Add attachment panel is enabled hide the submit and cancel button
   * @protected
   */
  protected showSubmitCancelButton(evt: CustomEvent): void {
    this._showSubmitCancelButton = !evt.detail;
  }

  /**
   * On back from create feature, call submit editor to destroy the Editor widget instance
   * @protected
   */
  protected onSubmitButtonClick(): void {
    if (this._createFeature) {
      this._createFeature.submit();
    }
  }

  /**
   * On back from create feature, call close editor to destroy the Editor widget instance
   * @protected
   */
  protected backFromCreateFeaturePanel(): void {
    if(this._createFeature){
      this._createFeature.close();
    }
    this.backFromSelectedPanel();
  }

  /**
   * On creating the feature is failed, show the error message
   * @param evt Event which has feature failed message
   * @protected
   */
  protected createFeatureFailed(evt: CustomEvent): void {
    console.error(evt.detail);
    this._featureCreationFailedErrorMsg = evt.detail.message;
  }

  /**
   * On submit report navigate to the layer list home page and refresh the layer list
   * @protected
   */
  protected onReportSubmitted(): void {
    this._reportSubmitted = true;
    void this.navigateToHomePage()
  }

  /**
   * Navigates to layer-list
   * @protected
   */
  protected async navigateToHomePage(): Promise<void> {
    if (this._createFeature) {
      this._createFeature.close();
    }
    if (this._layerList) {
      this._layerList.refresh();
    }
    this.setSelectedFeatures([]);

    if (this._editableLayerIds.length === 1) {
      await this._featureList.refresh();
      this._flowItems = ["feature-list"];
    } else {
      this._flowItems = ["layer-list"];
    }
  }

  /**
   * On layer select open the feature create flow item
   * @param evt Event which has details of selected layerId and layerName
   * @protected
   */
  protected async navigateToCreateFeature(evt: CustomEvent): Promise<void> {
    if (evt.detail.layerId && evt.detail.layerName) {
      this.setSelectedLayer(evt.detail.layerId, evt.detail.layerName);
    }
    this._showSubmitCancelButton = false;
    this._flowItems = [...this._flowItems, "feature-create"];
  }

  /**
   * On report an incident button click open the create a report panel with the layer list
   * @protected
   */
  protected navigateToChooseCategory(): void {
    this._flowItems = [...this._flowItems, "reporting-layer-list"];
  }

  /**
   * When layer list is loaded, we will receive the list of layers, if its  means we don't have any valid layer to be listed
   * @param evt Event which has list of layers
   * @protected
   */
  protected async layerListLoaded(evt: CustomEvent): Promise<void> {
    const layersListed = evt.detail;
    //consider only the layers listed in the layer-list component
    const allMapLayers = await getAllLayers(this.mapView);
    this._validLayers = [];
    allMapLayers.forEach((eachLayer: __esri.FeatureLayer) => {
      if (layersListed.includes(eachLayer.id)) {
        this._validLayers.push(eachLayer);
      }
    })
    //handleMap click on layer list loaded
    this.handleMapClick();
    //update the has valid layer state
    this._hasValidLayers = layersListed.length > 0;
    //navigate to the feature details if URL params found
    if (!this._urlParamsLoaded) {
      this._urlParamsLoaded = true;
      await this.loadFeatureFromURLParams();
    }
  }

  /**On click of layer list item show feature list
   * @param evt Event which has details of selected layerId and layerName
   * @protected
   */
  protected displayFeaturesList(evt: CustomEvent): void {
    this.setSelectedLayer(evt.detail.layerId, evt.detail.layerName);
    this._flowItems = [...this._flowItems, "feature-list"];
  }

  /**
   * On back from selected panel navigate to the previous panel
   * @protected
   */
  protected backFromSelectedPanel(): void {
    const updatedFlowItems = [...this._flowItems];
    updatedFlowItems.pop();
    this.clearHighlights();
    //Back to layer list, and return as the flowItems will be reset in navigateToHomePage
    if (updatedFlowItems.length === 1 && updatedFlowItems[0] === 'layer-list') {
      void this.navigateToHomePage();
      return;
    }
    this._flowItems = [...updatedFlowItems];
  }

  /**
   * Toggle side panel in case of mobile mode
   * @protected
   */
  protected toggleSidePanel(): void {
    this._sidePanelCollapsed = !this._sidePanelCollapsed;
    this.togglePanel.emit(this._sidePanelCollapsed);
  }

  /**
   * When feature is selected from list store that and show feature details
   * @param evt Event which has details of selected feature
   */
  protected async onFeatureSelectFromList(evt: CustomEvent): Promise<void> {
    this.setSelectedFeatures([evt.detail]);
    this._flowItems = [...this._flowItems, "feature-details"];
  }

  /**
   * Get feature list of the selected feature layer
   * @param layerId Layer id
   * @param layerName Layer name
   * @returns feature list node
   * @protected
   */
  protected getFeatureListFlowItem(layerId: string, layerName: string): Node {
    return (
      <calcite-flow-item
        collapsed={this.isMobile && this._sidePanelCollapsed}
        heading={layerName}
        onCalciteFlowItemBack={this.backFromSelectedPanel.bind(this)}>
        {/* <calcite-action
          icon="sort-ascending-arrow"
          slot={this.isMobile ? "header-menu-actions" : "header-actions-end"}
          text={this._translations.sort}
          text-enabled={this.isMobile} />
        <calcite-action
          icon="filter"
          slot={this.isMobile ? "header-menu-actions" : "header-actions-end"}
          text={this._translations.filter}
          text-enabled={this.isMobile} /> */}
        {this.isMobile && this.getActionToExpandCollapsePanel()}
        {this.enableNewReports &&
          <calcite-button
            appearance="solid"
            onClick={this.navigateToCreateFeature.bind(this)}
            slot="footer"
            width="full">
            {this.reportButtonText ? this.reportButtonText : this._translations.createReportButtonText}
          </calcite-button>}
        <calcite-panel full-height>
          {<feature-list
            class="height-full"
            highlightOnHover
            mapView={this.mapView}
            noFeaturesFoundMsg={this._translations.featureErrorMsg}
            onFeatureSelect={this.onFeatureSelectFromList.bind(this)}
            pageSize={30}
            ref={el => this._featureList = el as HTMLFeatureListElement}
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
      <calcite-flow-item
        collapsed={this.isMobile && this._sidePanelCollapsed}
        heading={this._selectedLayerName}
        onCalciteFlowItemBack={this.backFromSelectedPanel.bind(this)}>
        {this.isMobile && this.getActionToExpandCollapsePanel()}
        {/* Create share button */}
        <instant-apps-social-share
          autoUpdateShareUrl={false}
          embed={false}
          popoverButtonIconScale="s"
          ref={el => this._shareNode = el}
          scale="m"
          shareButtonColor="neutral"
          shareButtonType="action"
          slot={"header-actions-end"}
          socialMedia={true}
          view={this.mapView}
        />
        <calcite-panel full-height>
          <info-card
            allowEditing={false}
            graphics={this._selectedFeature}
            highlightEnabled={false}
            isLoading={false}
            isMobile={false}
            mapView={this.mapView}
            onSelectionChanged={this.featureDetailsChanged.bind(this)}
            zoomAndScrollToSelected={true}
          />
        </calcite-panel>
      </calcite-flow-item>
    );
  }

  /**
   * Sets the selected features and updates the first feature as the current selected feature
   * @param features Graphics array of the features selected
   */
  protected setSelectedFeatures(features: __esri.Graphic[]): void {
    this._selectedFeature = features;
    this.setCurrentFeature(this._selectedFeature.length ? this._selectedFeature[0] : null);
  }

  /**
   * Set the object id of the current selected feature, and also updates the current selected layer details
   * @param selectedFeature Graphic currently shown in feature details
   */
  protected setCurrentFeature(selectedFeature?: __esri.Graphic): void {
    if (selectedFeature && selectedFeature.layer) {
      const layer = selectedFeature.layer as __esri.FeatureLayer;
      this.setSelectedLayer(layer.id, layer.title);
      this._currentFeatureId = selectedFeature.attributes[layer.objectIdField];
    } else {
      if (this._editableLayerIds.length > 1) {
        this.setSelectedLayer('', '');
      }
      this._currentFeatureId = '';
    }
    this._updateShareURL();
  }

  /**
   * On Feature details change update the Layer title and the current selected layer id
   * @param evt Event hold the details of current feature graphic in the info-card
   */
  protected featureDetailsChanged(evt: CustomEvent): void {
    this.setCurrentFeature(evt.detail[0]);
    void this.highlightOnMap(evt.detail[0]);
  }

  /**
   * Highlights the feature on map
   * @param selectedFeature Graphic currently shown in feature details
   */
  protected async highlightOnMap(selectedFeature?: __esri.Graphic): Promise<void> {
    // if a feature is already highlighted, remove the previous highlight
    this.clearHighlights();
    // highlight the newly selected feature only when it has valid geometry
    if (selectedFeature && selectedFeature.geometry && selectedFeature.layer) {
      const selectedLayerView = await getFeatureLayerView(this.mapView, selectedFeature.layer.id);
      // remove previous highlight options (if any) to highlight the feature by default color
      selectedLayerView.highlightOptions = null;
      this._highlightHandle = await highlightFeatures(
        [selectedFeature.getObjectId()],
        selectedLayerView,
        this.mapView,
        true
      )
    }
  }

  /**
   * Clears the highlight
   * @protected
   */
  protected clearHighlights():void {
    //if a feature is already highlighted, then remove the highlight
    if(this._highlightHandle) {
      this._highlightHandle.remove();
     }
  }

  /**
   * Returns the action button to Expand/Collapse side panel in mobile mode
   * @protected
   */
  protected getActionToExpandCollapsePanel(): Node {
    return (
      <calcite-action
        icon={this._sidePanelCollapsed ? "chevrons-up" : "chevrons-down"}
        onClick={this.toggleSidePanel.bind(this)}
        slot="header-actions-end"
        text={this._sidePanelCollapsed ? this._translations.expand : this._translations.collapse} />
    );
  }

  /**
   * Set the current map info when maps change
   * @protected
   */
  protected async setMapView(): Promise<void> {
    await this.getLayersToShowInList();
    // if only one valid layer is present then directly render features list
    if (this._editableLayerIds?.length === 1) {
      await this.renderFeaturesList();
    } else {
      this._flowItems = ['layer-list'];
    }

    this.mapView.popupEnabled = false;
    if (this._defaultCenter && this._defaultLevel) {
      await this.mapView.goTo({
        center: this._defaultCenter,
        zoom: this._defaultLevel
      });
      this._defaultCenter = undefined;
      this._defaultLevel = undefined;
    }
  }

  /**
   * Handle map click event
   * @param layers Array of layerIds
   *
   * @protected
   */
  protected handleMapClick(): void {
    if (this._mapClickHandle) {
      this._mapClickHandle.remove();
    }
    this._mapClickHandle = this.reactiveUtils.on(
      () => this.mapView,
      "click",
      this.onMapClick.bind(this)
    );
  }

  /**
   * On map click do hitTest and get the clicked graphics from both reporting and non-reporting layers, and show feature details
   * @param event IMapClick map click event details
   *
   * @protected
   */
  protected async onMapClick(event: IMapClick): Promise<void> {
    //disable map popup
    this.mapView.popupEnabled = false;
    // Perform a hitTest on the View
    const hitTest = await this.mapView.hitTest(event);
    if (hitTest.results.length > 0) {
      const clickedGraphics = [];
      hitTest.results.forEach(function (result) {
        // check if the result type is graphic
        if (result.type === 'graphic') {
          clickedGraphics.push(result.graphic);
        }
      });
      const reportingLayerGraphics = clickedGraphics.filter((graphic) => {
        return this._validLayers.includes(graphic.layer);
      })
      const nonReportingLayerGraphics = clickedGraphics.filter((graphic) => {
        return !this._validLayers.includes(graphic.layer) && graphic?.layer?.id;
      })

      // if clicked graphic's layer is one of the reporting layers then show details in layer panel
      if (reportingLayerGraphics.length > 0) {
        //update the selectedFeature
        this.setSelectedFeatures(reportingLayerGraphics);
        //if featureDetails not open then add it to the list else just reInit flowItems which will update details with newly selected features
        // eslint-disable-next-line unicorn/prefer-ternary
        if (this._flowItems.length && this._flowItems[this._flowItems.length - 1] !== "feature-details") {
          this._flowItems = [...this._flowItems, "feature-details"];
        } else {
          this._flowItems = [...this._flowItems];
          void this.highlightOnMap(clickedGraphics[0]);
        }
      }

      // if clicked graphic's layer is from non reporting layers then show popup on map
      if (nonReportingLayerGraphics.length > 0) {
        this.mapView.popupEnabled = true;
        const options = {
          features: nonReportingLayerGraphics,
          updateLocationEnabled: true
        };
        await this.mapView.openPopup(options);
      }
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

  /**
   * Returns the ids of all OR configured layers that support edits with the update capability
   * @param hash each layer item details
   * @param layers list of layers id
   * @returns array of editable layer ids
   */
  protected reduceToConfiguredLayers(
    hash: ILayerItemsHash
  ): string[] {
    const configuredLayers = this.layers?.length > 0 ? this.layers : [];
    return Object.keys(hash).reduce((prev, cur) => {
      let showLayer = hash[cur].supportsAdd;
      if (configuredLayers?.length > 0) {
        showLayer = configuredLayers.indexOf(cur) > -1 ? hash[cur].supportsAdd : false;
      }
      if (showLayer) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }

  /**
   * Creates the list of layers to be listed in layer list
   * @protected
   */
  protected async getLayersToShowInList(): Promise<void> {
    const layerItemsHash = await getMapLayerHash(this.mapView, true) as ILayerItemsHash;
    const allMapLayers = await getAllLayers(this.mapView);
    allMapLayers.forEach((eachLayer: __esri.FeatureLayer) => {
      if (eachLayer?.type === "feature" && eachLayer?.editingEnabled && eachLayer?.capabilities?.operations?.supportsAdd) {
        layerItemsHash[eachLayer.id].supportsAdd = true;
      }
    })
    this._editableLayerIds = this.reduceToConfiguredLayers(layerItemsHash);
  }

  /**
   * renders feature list
   * @protected
   */
  protected async renderFeaturesList(): Promise<void> {
    const evt = {
      detail: this._editableLayerIds
    } as CustomEvent
    await this.layerListLoaded(evt);
    this.setSelectedLayer(this._validLayers[0].id, this._validLayers[0].title);
    this._flowItems = ['feature-list'];
  }

  /**
   * Updates the share url for current selected feature
   * @protected
   */
   protected _updateShareURL(): void {
    const url = this._shareNode?.shareUrl;
    if (!url) {
      return;
    }
    const urlObj = new URL(url);
    //set the selected layers id
    if (this._selectedLayerId) {
      urlObj.searchParams.set("layerid", this._selectedLayerId);
    } else {
      urlObj.searchParams.delete("layerid");
    }
    //Set the selected features objectid
    if (this._selectedFeature?.length) {
      urlObj.searchParams.set("oid", this._currentFeatureId);
    } else {
      urlObj.searchParams.delete("oid");
    }
    //update the url in share component
    this._shareNode.shareUrl = urlObj.href;
  }

  /**
   * Navigates to selected features detail based on the URL params
   * @protected
   */
  protected async loadFeatureFromURLParams(): Promise<void> {
    if (this.center && this.level) {
      await this.mapView.goTo({
        center: this.center.split(';').map(Number),
        zoom: this.level
      });
    }
    if (this.layerId && this.objectId) {
      const layer = await getLayerOrTable(this.mapView, this.layerId);
      if (layer) {
        // only query if we have some ids...query with no ids will result in all features being returned
        const featureSet = await queryFeaturesByID([Number(this.objectId)], layer, [], true, this.mapView.spatialReference);
        if (featureSet.length) {
          //update the selectedFeature
          this._selectedFeature = featureSet;
          //if featureDetails not open then add it to the list else just reInit flowItems which will update details with newly selected features
          // eslint-disable-next-line unicorn/prefer-ternary
          if (this._flowItems.length && this._flowItems[this._flowItems.length - 1] !== "feature-details") {
            this._flowItems = [...this._flowItems, "feature-details"];
          } else {
            this._flowItems = [...this._flowItems];
          }
          await this.highlightOnMap(featureSet[0]);
        }
      }
    }
  }
}
