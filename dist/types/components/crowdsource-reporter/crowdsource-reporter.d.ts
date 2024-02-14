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
/// <reference types="arcgis-js-api" />
import { VNode, EventEmitter } from "../../stencil-public-runtime";
import { IMapChange, IMapClick, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
import CrowdsourceReporter_T9n from "../../assets/t9n/crowdsource-reporter/resources.json";
export declare class CrowdsourceReporter {
    el: HTMLCrowdsourceReporterElement;
    /**
     * string: The text that will display under the title on the landing page
     */
    description: string;
    /**
     * boolean: When true the application will be in mobile mode, controls the mobile or desktop view
     */
    isMobile: boolean;
    /**
     * boolean: When true the anonymous users will be allowed to submit reports and comments
     */
    enableAnonymousAccess: boolean;
    /**
     * boolean: When true the anonymous users will be allowed to submit comments
     */
    enableAnonymousComments: boolean;
    /**
     * boolean: When true the user will be allowed to submit comments
     */
    enableComments: boolean;
    /**
     * boolean: When true the user will be provided a login page
     */
    enableLogin: boolean;
    /**
     * boolean: When true the user will be allowed to submit new reports
     */
    enableNewReports: boolean;
    /**
     * string[]: list of layer ids
     */
    layers: string[];
    /**
     * string: The text that will display at the top of the landing page
     */
    loginTitle: string;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string: Layer id of the feature from URL params
     */
    layerId: string;
    /**
     * string: Object id of the feature from URL params
     */
    objectId: string;
    /**
     * string: The word(s) to display in the reports submit button
     */
    reportButtonText: string;
    /**
     * string: The word(s) to display in the reports header
     */
    reportsHeader: string;
    /**
     * string: The message to display when the report has been submitted
     */
    reportSubmittedMessage: string;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * boolean: When true the comments from all users will be visible
     */
    showComments: boolean;
    /**
     * string: Item ID of the web map that should be selected by default
     */
    defaultWebmap: string;
    /**
     * boolean: when true the search widget will be available
     */
    enableSearch: boolean;
    /**
     * boolean: when true the home widget will be available
     */
    enableHome: boolean;
    /**
     * IMapInfo[]: array of map infos (name and id)
     */
    mapInfos: IMapInfo[];
    /**
     * theme: "light" | "dark" theme to be used
     */
    theme: theme;
    /**
     * boolean: when true the zoom widget will be available
     */
    enableZoom: boolean;
    /**
     * IMapInfo: The current map info stores configuration details
     */
    _mapInfo: IMapInfo;
    /**
     * string[]: Reporter flow items list
     */
    _flowItems: string[];
    /**
     * boolean: Controls the state for panel in mobile view
     */
    _sidePanelCollapsed: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof CrowdsourceReporter_T9n;
    /**
     * boolean: When true show the sort and filter icon
     */
    _hasValidLayers: boolean;
    /**
    * string: The selected feature layer's name from the layer's list
    */
    _selectedLayerName: string;
    /**
     * boolean: When true show the success message in the panel
     */
    _reportSubmitted: boolean;
    /**
     * boolean: When true show the submit and cancel button
     */
    _showSubmitCancelButton: boolean;
    /**
     * string: Error message when feature creation fails
     */
    _featureCreationFailedErrorMsg: string;
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
    /**
     * Called each time the mapView prop is changed.
     */
    isMobileWatchHandler(): Promise<void>;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(): Promise<void>;
    /**
    * Emitted when toggle panel button is clicked in reporter
    */
    togglePanel: EventEmitter<boolean>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * Create component translations and monitor the mediaQuery change to detect mobile/desktop mode
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Set the selected layer id and layer name
     * @param layerId string layerId of the selected layer
     * @param layerName string layerName of the selected layer
     */
    protected setSelectedLayer(layerId: string, layerName: string): void;
    /**
     * Get the reporter app functionality
     * @protected
     */
    protected _getReporter(): VNode;
    /**
     * Get the feature layer list
     * @returns the layer list items
     * @protected
     */
    protected getLayerListFlowItem(): Node;
    /**
     * Get the layer list for creating a report
     * @returns Choose category flow item
     * @protected
     */
    protected getChooseCategoryFlowItem(): Node;
    /**
     * Get Feature create form of the selected feature layer
     * @returns feature create form
     * @protected
     */
    protected getFeatureCreateFlowItem(): Node;
    /**
     * When drawing of incident location completed on map show the submit and cancel button
     * @protected
     */
    protected onDrawComplete(): void;
    /**
     * When Add attachment panel is enabled hide the submit and cancel button
     * @protected
     */
    protected showSubmitCancelButton(evt: CustomEvent): void;
    /**
     * On back from create feature, call submit editor to destroy the Editor widget instance
     * @protected
     */
    protected onSubmitButtonClick(): void;
    /**
     * On back from create feature, call close editor to destroy the Editor widget instance
     * @protected
     */
    protected backFromCreateFeaturePanel(): void;
    /**
     * On creating the feature is failed, show the error message
     * @param evt Event which has feature failed message
     * @protected
     */
    protected createFeatureFailed(evt: CustomEvent): void;
    /**
     * On submit report navigate to the layer list home page and refresh the layer list
     * @protected
     */
    protected onReportSubmitted(): void;
    /**
     * Navigates to layer-list
     * @protected
     */
    protected navigateToHomePage(): void;
    /**
     * Update the selected layer id and name
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    protected highlightSelectedLayer(evt: CustomEvent): void;
    /**
     * On next button click open the feature create flow item
     * @protected
     */
    protected navigateToCreateFeature(): Promise<void>;
    /**
     * On report an incident button click open the create a report panel with the layer list
     * @protected
     */
    protected navigateToChooseCategory(): void;
    /**
     * When layer list is loaded, we will receive the list of layers, if its  means we don't have any valid layer to be listed
     * @param evt Event which has list of layers
     * @protected
     */
    protected layerListLoaded(evt: CustomEvent): Promise<void>;
    /**On click of layer list item show feature list
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    protected displayFeaturesList(evt: CustomEvent): void;
    /**
     * On back from selected panel navigate to the previous panel
     * @protected
     */
    protected backFromSelectedPanel(): void;
    /**
     * Toggle side panel in case of mobile mode
     * @protected
     */
    protected toggleSidePanel(): void;
    /**
     * When feature is selected from list store that and show feature details
     * @param evt Event which has details of selected feature
     */
    protected onFeatureSelectFromList(evt: CustomEvent): Promise<void>;
    /**
     * Get feature list of the selected feature layer
     * @param layerId Layer id
     * @param layerName Layer name
     * @returns feature list node
     * @protected
     */
    protected getFeatureListFlowItem(layerId: string, layerName: string): Node;
    /**
     * Returns the calcite-flow item for feature details
     * @returns Node
     */
    protected getFeatureDetailsFlowItem(): Node;
    /**
     * Sets the selected features and updates the first feature as the current selected feature
     * @param features Graphics array of the features selected
     */
    protected setSelectedFeatures(features: __esri.Graphic[]): void;
    /**
     * Set the object id of the current selected feature, and also updates the current selected layer details
     * @param selectedFeature Graphic currently shown in feature details
     */
    protected setCurrentFeature(selectedFeature?: __esri.Graphic): void;
    /**
     * On Feature details change update the Layer title and the current selected layer id
     * @param evt Event hold the details of current feature graphic in the info-card
     */
    protected featureDetailsChanged(evt: CustomEvent): void;
    /**
     * Highlights the feature on map
     * @param selectedFeature Graphic currently shown in feature details
     */
    protected highlightOnMap(selectedFeature?: __esri.Graphic): Promise<void>;
    /**
     * Clears the highlight
     * @protected
     */
    protected clearHighlights(): void;
    /**
     * Returns the action button to Expand/Collapse side panel in mobile mode
     * @protected
     */
    protected getActionToExpandCollapsePanel(): Node;
    /**
     * Set the current map info when maps change
     * @protected
     */
    protected setMapView(): Promise<void>;
    /**
     * Handle map click event
     * @param layers Array of layerIds
     *
     * @protected
     */
    protected handleMapClick(): void;
    /**
     * On map click do hitTest and get the clicked graphics of valid layers and show feature details
     * @param event IMapClick map click event details
     *
     * @protected
     */
    protected onMapClick(event: IMapClick): Promise<void>;
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
    /**
     * Updates the share url for current selected feature
     * @protected
    */
    protected _updateShareURL(): void;
    /**
     * Navigates to selected features detail based on the URL params
     * @protected
     */
    protected loadFeatureFromURLParams(): Promise<void>;
}
