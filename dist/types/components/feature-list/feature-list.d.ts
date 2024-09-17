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
import { IPopupUtils, IReportingOptions, ISortingInfo } from "../../utils/interfaces";
import FeatureList_T9n from "../../assets/t9n/feature-list/resources.json";
export declare class FeatureList {
    el: HTMLFeatureListElement;
    /**
     * string: Layer id of the feature layer to show the list
     */
    selectedLayerId: string;
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string: Message to be displayed when features are not found
     */
    noFeaturesFoundMsg?: string;
    /**
     * number: Number features to be fetched per page, by default 100 features will be fetched
     */
    pageSize?: number;
    /**
     * boolean: Highlight feature on map optional (default false) boolean to indicate if we should highlight and zoom to the extent of the feature geometry
     */
    highlightOnMap?: boolean;
    /**
     * boolean: Highlight feature on map optional (default false) boolean to indicate if we should highlight when hover on Feature in list
     */
    highlightOnHover?: boolean;
    /**
     * ISortingInfo: Sorting field and order using which features list will be sorted
     */
    sortingInfo?: ISortingInfo;
    /**
     * string: where clause to filter the features list
     */
    whereClause?: string;
    /**
     * string(small/large): Controls the font size of the title
     */
    textSize?: "small" | "large";
    /**
     * boolean: Show initial loading indicator when creating list
     */
    showInitialLoading?: boolean;
    /**
     * boolean: If true will show error msg when features are not present
     */
    showErrorWhenNoFeatures?: boolean;
    /**
     * boolean: If true display's profile img on each feature item
     */
    showUserImageInList?: boolean;
    /**
     * boolean: If true display's feature symbol on each feature item
     */
    showFeatureSymbol?: boolean;
    /**
     * boolean: If true will consider the FeatureFilter applied on the layerview
     */
    applyLayerViewFilter?: boolean;
    /**
     * IReportingOptions: Key options for reporting
     */
    reportingOptions: IReportingOptions;
    /**
     * calcite-list-item list of features with popup titles
     */
    _featureItems: any[];
    /**
     * number: Total number of feature count
     */
    _featuresCount: number;
    /**
     * boolean: Check if selected layer's features fetching process is completed
     */
    _isLoading: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof FeatureList_T9n;
    /**
     * "esri/Color": https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
     * The Color instance
     */
    protected Color: typeof import("esri/Color");
    /**
     * "esri/config": https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html
     * Esri config
     */
    protected esriConfig: typeof import("esri/config");
    /**
     * "esri/symbols/support/symbolUtils": https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-support-symbolUtils.html
     * Symbol utils
     */
    protected symbolUtils: typeof import("esri/symbols/support/symbolUtils");
    /**
     * IPopupUtils: To fetch the list label using popup titles
     */
    protected _popupUtils: IPopupUtils;
    /**
     * __esri.FeatureLayer: Selected feature layer from the layer list
     */
    protected _selectedLayer: __esri.FeatureLayer;
    /**
     * __esri.Handle: Highlight handle of the selections
     */
    protected _highlightHandle: __esri.Handle;
    /**
     * HTMLCalcitePaginationElement: Calcite pagination element instance
     */
    protected _pagination: HTMLCalcitePaginationElement;
    /**
     * string[]: Valid field types for like
     */
    protected _validFieldTypes: string[];
    /**
     * string: Abbrivated like count of the feature
     */
    protected _abbreviatedLikeCount: string;
    /**
     * boolean: When true configured like field is available in selected layer
     */
    protected _likeFieldAvailable: boolean;
    /**
     * Watch for selectedLayerId change and update layer instance and features list for new layerId
     */
    selectedLayerWatchHandler(): Promise<void>;
    /**
     * Watch for sorting field or order change and update the features list
     */
    sortingInfoWatchHandler(): Promise<void>;
    /**
     * Watch for whereclause change and update the features list
     */
    whereClauseHandler(): Promise<void>;
    /**
     * Refresh the feature list which will fetch the latest features and update the features list
     * @returns Promise that resolves when the operation is complete
     */
    refresh(): Promise<void>;
    /**
     * Emitted on demand when feature is selected using the list
     */
    featureSelect: EventEmitter<__esri.Graphic>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    protected initModules(): Promise<void>;
    /**
     * Return the where condition string considering the defined where clause and layer's definition expression
     * @protected
     */
    protected getWhereCondition(): Promise<string>;
    /**
     * Initialize the features list using the selected layer
     * @protected
     */
    protected initializeFeatureItems(): Promise<void>;
    /**
     * On page change get the next updated feature list
     * @param event page change event
     * @protected
     */
    protected pageChanged(event: any): Promise<void>;
    /**
     * On feature click in feature list highlight the feature on the map
     * @param event feature clicked event
     * @param selectedFeature selected feature graphic
     * @protected
     */
    protected featureClicked(event: any, selectedFeature: __esri.Graphic): Promise<void>;
    /**
     * Emit selected feature with its complete graphics and attributes
     * @param graphic selected feature graphic
     * @protected
     */
    protected emitSelectedFeature(graphic: __esri.Graphic): Promise<void>;
    /**
     * On feature hover in feature list highlight the feature on the map
     * @param selectedFeature mouse hovered feature graphic
     * @protected
     */
    protected onFeatureHover(selectedFeature: __esri.Graphic): Promise<void>;
    /**
     * Clears the highlight
     * @protected
     */
    protected clearHighlights(): void;
    /**
     * Query the selected feature layer, in descending order of object id's
     * @param page 0th page number in the pagination item
     * @returns List of features items to be rendered
     * @protected
     */
    protected queryPage(page: number): Promise<VNode[]>;
    /**
     * Creates list of items using the popup titles
     * @param featureSet Queried FeatureSet
     * @returns List of features items to be rendered
     * @protected
     */
    protected createFeatureItem(featureSet: any): Promise<VNode[]>;
    /**
     * Displays the abbrivated like count on the feature list
     * @param feature feature of the layer
     * @protected
     */
    protected getAbbreviatedLikeCount(feature: __esri.Graphic): void;
    /**
     * Get each feature item
     * @param selectedFeature Each individual feature instance to be listed
     * @param popupTitle feature popup title
     * @returns individual feature item to be rendered
     * @protected
     */
    protected getFeatureItem(selectedFeature: __esri.Graphic, popupTitle: string, featureSymbol: HTMLDivElement, userInfo: any): VNode;
    /**
     *
     * @param feature Each individual feature instance to be listed
     * @param creatorField Feature's creator field from the layer
     * @returns user information
     * @protected
     */
    protected getUserInformation(feature: __esri.Graphic, creatorField: string): Promise<any>;
    /**
     * Creates a feature symbology
     * @param feature Each individual feature
     * @returns Feature symbology
     * @protected
     */
    protected getFeatureSymbol(feature: __esri.Graphic): Promise<HTMLDivElement>;
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
