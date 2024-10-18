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
import { VNode, EventEmitter } from "../../stencil-public-runtime";
import { ILayerExpression, IMapChange, IMapClick, IMapInfo, IReportingOption, IReportingOptions, ISearchConfiguration, ISortingInfo, theme } from "../../utils/interfaces";
import CrowdsourceReporter_T9n from "../../assets/t9n/crowdsource-reporter/resources.json";
import { ILayerItemsHash } from "../layer-list/layer-list";
import { FilterInitState } from "@esri/instant-apps-components";
export declare class CrowdsourceReporter {
    el: HTMLCrowdsourceReporterElement;
    /**
     * string: Semicolon delimited numbers that will be used as the maps center point from URL params
     */
    center: string;
    /**
     * string: User configurable text to display for the comment button
     */
    commentButtonText: string;
    /**
     * string: User configurable nessage to display when a comment is submitted
     */
    commentSubmittedMessage: string;
    /**
     * string: Item ID of the web map that should be selected by default
     */
    defaultWebmap: string;
    /**
     * string: The text that will display under the title on the landing page
     */
    description: string;
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
     * boolean: when true the home widget will be available
     */
    enableHome: boolean;
    /**
     * boolean: When true the user will be provided a login page
     */
    enableLogin: boolean;
    /**
     * boolean: When true the user will be allowed to submit new reports
     */
    enableNewReports: boolean;
    /**
     * boolean: when true the search widget will be available
     */
    enableSearch: boolean;
    /**
     * boolean: when true the zoom widget will be available
     */
    enableZoom: boolean;
    /**
     * boolean: When true the application will be in mobile mode, controls the mobile or desktop view
     */
    isMobile: boolean;
    /**
     * ILayerExpression[]: Array of layer expressions for layers (filter configuration)
     */
    layerExpressions: ILayerExpression[];
    /**
     * string: Layer id of the feature from URL params
     */
    layerId: string;
    /**
     * string: Id of the zoom level from URL params
     */
    level: string;
    /**
     * string: The text that will display at the top of the landing page
     */
    loginTitle: string;
    /**
     * IMapInfo[]: array of map infos (name and id)
     */
    mapInfos: IMapInfo[];
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string: Object id of the feature from URL params
     */
    objectId: string;
    /**
     * string: The word(s) to display in the reports submit button
     */
    reportButtonText: string;
    /**
     * IReportingOptions: Key options for reporting
     */
    reportingOptions: IReportingOptions;
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
     * boolean: When true the profile image of the comment creator will be shown in the comments list
     */
    showUserImageInCommentsList: boolean;
    /**
     * boolean: When true the feature symbology of the feature will shown in the features list
     */
    showFeatureSymbol: boolean;
    /**
     * boolean: To show only those features which are created by the logged in user
     */
    showMyReportsOnly?: boolean;
    /**
     * theme: "light" | "dark" theme to be used
     */
    theme: theme;
    /**
     * number: default scale to zoom to when zooming to a single point feature
     */
    zoomToScale: number;
    /**
     * string: selected floor level
     */
    floorLevel: string;
    /**
     * string: Error message when feature creation fails
     */
    _featureCreationFailedErrorMsg: string;
    /**
     * boolean: When true an indicator will be shown on the action
     */
    _filterActive: boolean;
    /**
     * string[]: Reporter flow items list
     */
    _flowItems: string[];
    /**
     * boolean: Will be true when has valid reporting layers (This will be used to show the create report button on layer list)
     */
    _hasValidLayers: boolean;
    /**
     * IMapInfo: The current map info stores configuration details
     */
    _mapInfo: IMapInfo;
    /**
     * boolean: When true show the success message in the panel
     */
    _reportSubmitted: boolean;
    /**
    * string: The selected feature layer's name from the layer's list
    */
    _selectedLayerName: string;
    /**
     * boolean: When true show the submit and cancel button
     */
    _showSubmitCancelButton: boolean;
    /**
     * boolean: show loading indicator in the reporter component
     */
    _showLoadingIndicator: boolean;
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
     * number: Show the updated progress bar status
     */
    _updatedProgressBarStatus: number;
    /**
     * ISortingInfo: Sort the feature list depending on the sort field and order
     */
    _updatedSorting: ISortingInfo;
    /**
     * string: Selected sort option
     */
    _updatedSortOption: string;
    /**
     * boolean: When true show the success message in the panel
     */
    _commentSubmitted: boolean;
    /**
     * string: Error message when feature creation fails
     */
    _addingCommentFailed: boolean;
    /**
     * HTMLCreateFeatureElement: Create Feature component instance
     */
    protected _createFeature: HTMLCreateFeatureElement;
    /**
     * ObjectId of the feature currently shown in the details
     */
    protected _currentFeatureId: string;
    /**
     * number[]: X,Y pair used to center the map
     */
    protected _defaultCenter: number[];
    /**
     * number: zoom level the map should go to
     */
    protected _defaultLevel: number;
    /**
     * string[]: Configured/all layers id from current map which can be used for reporting
     */
    protected _editableLayerIds: string[];
    /**
     * HTMLCreateFeatureElement: features details component instance
     */
    protected _featureDetails: HTMLFeatureDetailsElement;
    /**
     * HTMLFeatureListElement: Create feature list component instance
     */
    protected _featureList: HTMLFeatureListElement;
    /**
     * __esri.Graphic: The current selected feature
     */
    protected _currentFeature: __esri.Graphic;
    /**
     * __esri.Graphic: The selected related feature from layer table
     */
    protected _selectedRelatedFeature: __esri.Graphic[];
    /**
     * __esri.FeatureLayer: The related table from map
     */
    protected _relatedTable: __esri.FeatureLayer;
    /**
     * HTMLInstantAppsFilterListElement: Component from Instant Apps that supports interacting with the current filter config
     */
    protected _filterList: HTMLInstantAppsFilterListElement;
    /**
     * __esri.Handle: Highlight handles of the selections
     */
    protected _highlightHandle: __esri.Handle;
    /**
     * HTMLLayerListElement: Create Layer list component instance
     */
    protected _layerList: HTMLLayerListElement;
    /**
     * HTMLCreateFeatureElement: Create Feature component instance
     */
    protected _createRelatedFeature: HTMLCreateRelatedFeatureElement;
    /**
     * string[]: list of configured reporting layer ids
     */
    protected _layers: string[];
    /**
     * IMapChange: The current map change details
     */
    protected _mapChange: IMapChange;
    /**
     * IHandle: The map click handle
     */
    protected _mapClickHandle: IHandle;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * "esri/layers/support/FeatureFilter": https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureFilter.html
     * Esri FeatureFilter
     */
    protected FeatureFilter: typeof import("esri/layers/support/FeatureFilter");
    /**
     * __esri.Graphic: The selected feature
     */
    protected _selectedFeature: __esri.Graphic[];
    /**
     * number: selected feature index
     */
    protected _selectedFeatureIndex: number;
    /**
     * string: The selected feature layer's id from the layer's list
     */
    protected _selectedLayerId: string;
    /**
     * HTMLInstantAppsSocialShareElement: Share element
     */
    protected _shareNode: HTMLInstantAppsSocialShareElement;
    /**
     * boolean: Maintains a flag to know if urls params are loaded or not
     */
    protected _urlParamsLoaded: boolean;
    /**
     * __esri.FeatureLayer[]: Valid layers from the current map
     */
    protected _validLayers: __esri.FeatureLayer[];
    /**
     * __esri.FeatureLayer[]: layer from map whom visibility is disabled
     */
    protected _nonVisibleValidLayers: __esri.FeatureLayer[];
    /**
     * __esri.FeatureLayer: Selected feature layer from the layer list
     */
    protected _selectedLayer: __esri.FeatureLayer;
    /**
     * ILayerItemsHash: LayerDetailsHash for each layer in the map
     */
    protected _layerItemsHash: ILayerItemsHash;
    /**
     * boolean: when true allow panel to show in full height
     */
    protected _showFullPanel: boolean;
    /**
     * string: The current floor expression
     */
    protected _floorExpression: string;
    /**
     * _esri.Element: form elements of the selected layer
     */
    protected _formElements: any[];
    /**
     * string[]: URL params set by using filters.
     */
    protected _filterUrlParams: string[];
    /**
     * FilterInitState: filter's init state
     */
    protected _filterInitState: FilterInitState;
    /**
     * string: Previous selected layer id
     */
    protected _prevSelectedLayerId: string;
    /**
     * Called each time the mapView prop is changed.
     */
    isMobileWatchHandler(): Promise<void>;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * Called each time the floorLevel prop is changed.
     */
    floorLevelWatchHandler(): Promise<void>;
    /**
     * Called each time the my reports toggle is changed
     */
    showMyReportsOnlyWatchHandler(): Promise<void>;
    /**
    * Emitted when toggle panel button is clicked in reporter
    */
    togglePanel: EventEmitter<{
        panelState: boolean;
        isFormOpen: boolean;
    }>;
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
    protected setSelectedLayer(layerId: string, layerName: string): Promise<void>;
    /**
     * Returns the layers configuration
     * @param layerId string layerId of the selected layer
     * @returns Configuration for the layerId
     */
    protected _getLayersConfig(layerId: string): IReportingOption | null;
    /**
     * Get the reporter app functionality
     * @protected
     */
    protected _getReporter(): VNode;
    /**
     * On sort option click update the sort field and sort order
     * @param sortField sort field
     * @param sortOrder sort order
     * @param sortOption selected sort option (Newest/Oldest/Highest Voted/Lowest Voted)
     */
    protected sortOptionClick(sortField: string, sortOrder: "asc" | "desc", sortOption: string): Promise<void>;
    /**
     * On sort button click, display the sorting options
     * @returns Sort options list
     */
    protected _toggleSort(): Node;
    /**
     * Restores the applied filters
     * @protected
     */
    protected _restoreFilters(): void;
    /**
     * Reset the filter
     * @protected
     */
    protected _handleFilterListReset(): Promise<void>;
    /**
     * Check if the layers definitionExpression has been modified and update the feature list depending on the applied filters
     * @protected
     */
    protected _handleFilterUpdate(): Promise<void>;
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
     * Update the progress bar status when editor panel changes
     * @param evt Event which has progress bar status
     * @protected
     */
    protected updatedProgressStatus(evt: CustomEvent): void;
    /**
     * When form is ready then show submit and cancel button
     * @protected
     */
    protected onFormReady(): void;
    /**
     * When Add attachment panel is enabled hide the submit and cancel button
     * @protected
     */
    protected showSubmitCancelButton(evt: CustomEvent): void;
    /**
     * On back from create feature, call submit editor to destroy the Editor widget instance
     * @protected
     */
    protected onCreateFeatureSubmitButtonClick(): void;
    /**
     * On back from create feature, call close editor to destroy the Editor widget instance
     * @protected
     */
    protected backFromCreateFeaturePanel(): void;
    /**
     * On back from create realated feature, call submit editor to destroy the Editor widget instance
     * @protected
     */
    protected onCreateRelatedFeatureSubmitButtonClick(): void;
    /**
     * On back from create related feature, call close editor to destroy the Editor widget instance
     * @protected
     */
    protected backFromCreateRelatedFeaturePanel(): void;
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
    protected onReportSubmitted(): Promise<void>;
    /**
     * On adding the is failed, show the error message
     * @param evt Event which has comment failed message
     * @protected
     */
    protected addCommentFailed(evt: CustomEvent): void;
    /**
     * On submit comment navigate to the feature list and refresh the feature details
     * @protected
     */
    protected onCommentSubmitted(): Promise<void>;
    /**
     * Navigates to layer-list
     * @protected
     */
    protected navigateToHomePage(): Promise<void>;
    /**
     * On layer select open the feature create flow item
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    protected navigateToCreateFeature(evt: CustomEvent): Promise<void>;
    /**
     * On report an incident button click open the create a report panel with the layer list
     * @protected
     */
    protected navigateToChooseCategory(): void;
    /**
     * updates the non visible layer visibility
     * @param visible boolean value to set the layers visibility
     */
    protected updateNonVisibleLayersOnMap(visible: boolean): void;
    /**
     * When layer list is loaded, we will receive the list of layers, if its  means we don't have any valid layer to be listed
     * @param evt Event which has list of layers
     * @protected
     */
    protected layerListLoaded(evt: CustomEvent): Promise<void>;
    /**
     * On click of layer list item show feature list
     * @param evt Event which has details of selected layerId and layerName
     * @protected
     */
    protected displayFeaturesList(evt: CustomEvent): Promise<void>;
    /**
     * Reset's the applied filter
     * @protected
     */
    protected resetFilter(): Promise<void>;
    /**
     * On back from filter panel get the filter's init state
     * @protected
     */
    protected backFromFilterPanel(): Promise<void>;
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
     * Updates the Panel state
     * @param sidePanelCollapsed side panel collapsed state
     * @param showFullPanel updated panel state
     * @protected
     */
    protected updatePanelState(sidePanelCollapsed: boolean, showFullPanel: boolean): void;
    /**
     * When feature is selected from list store that and show feature details
     * @param evt Event which has details of selected feature
     */
    protected onFeatureSelectFromList(evt: CustomEvent): Promise<void>;
    /**
     * Gets related table id of the selected feature's layer
     * @protected
     */
    protected getRelatedTable(): Promise<void>;
    /**
     * Show loading indicator while updating the feature details component
     * @param isLoading is feature detail component loading
     */
    protected updatingFeatureDetails(isLoading: boolean): Promise<void>;
    /**
   * On Feature details change update the Layer title and the current selected layer id
   * @param evt Event hold the details of current feature graphic from the feature-details
   * @protected
   */
    protected selectionChanged(evt: CustomEvent): Promise<void>;
    /**
     * Shows the add comments panel
     */
    protected showAddCommentsPanel(): void;
    /**
     * When comment is selected from list store that and show comment details
     * @param evt Event which has details of selected feature
     * @protected
     */
    protected onCommentSelectFromList(evt: CustomEvent): Promise<void>;
    /**
     * Get feature list of the selected feature layer
     * @param layerId Layer id
     * @param layerName Layer name
     * @returns feature list node
     * @protected
     */
    protected getFeatureListFlowItem(layerId: string, layerName: string): Node;
    /**
     * Returns the calcite-flow item for filter
     * @returns Node
     * @protected
     */
    protected getFilterPanel(): Node;
    /**
     * Returns the calcite-flow item for feature details
     * @returns Node
     */
    protected getFeatureDetailsFlowItem(): Node;
    /**
     * Returns the pagination for the multiple features
     * Create pagination to avoid the overlap of like, dislike and comment section
     * @returns Node
     */
    protected getFeaturesPagination(): Node;
    /**
     * Returns the calcite-flow item for comment details
     * @returns Node
     */
    protected getCommentDetailsFlowItem(): Node;
    /**
     * Returns the calcite-flow item for add comment
     * @returns Node
     */
    protected getAddCommentFlowItem(): Node;
    /**
     * Sets the selected features and updates the first feature as the current selected feature
     * @param features Graphics array of the features selected
     */
    protected setSelectedFeatures(features: __esri.Graphic[]): Promise<void>;
    /**
     * Set the object id of the current selected feature, and also updates the current selected layer details
     * @param selectedFeature Graphic currently shown in feature details
     */
    protected setCurrentFeature(selectedFeature?: __esri.Graphic): Promise<void>;
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
     * On map click do hitTest and get the clicked graphics from both reporting and non-reporting layers, and show feature details
     * @param event IMapClick map click event details
     *
     * @protected
     */
    protected onMapClick(event: IMapClick): Promise<void>;
    /**
   * Get the current index of total string
   *
   * @returns the index of total string
   * @protected
   */
    protected _getCount(): string;
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
    /**
     * Applies a definition expression when floor field and level are available
     * @param layer FeatureLayer on which the definitionExpression should be updated
     * @protected
     */
    protected _updateFloorDefinitionExpression(layer: __esri.FeatureLayer): void;
    /**
     * Gets the form template elements
     * @protected
     */
    protected _getFormElements(): void;
    /**
     * Returns the ids of all OR configured layers that support edits with the update capability
     * @param hash each layer item details
     * @param layersEditingDisabled list layer ids for which editing is disabled
     * @returns array of editable layer ids
     */
    protected reduceToConfiguredLayers(hash: ILayerItemsHash, layersEditingDisabled: string[]): string[];
    /**
     * updates the features for layer/feature list
     * @protected
     */
    protected _updateFeatures(): Promise<void>;
    /**
     * Show only loggedIn user's features
     * @param featureLayerView on which the filter should be applied
     * @protected
     */
    protected _showMyFeaturesOnly(featureLayerView: __esri.FeatureLayerView): Promise<void>;
    /**
     * Creates the list of layers to be listed in layer list
     * @protected
     */
    protected getLayersToShowInList(): Promise<void>;
    /**
     * renders feature list
     * @protected
     */
    protected renderFeaturesList(): Promise<void>;
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
