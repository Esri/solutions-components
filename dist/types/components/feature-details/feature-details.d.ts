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
import { EventEmitter } from '../../stencil-public-runtime';
import { IReportingOptions } from '../../components';
import { ILayerItemsHash } from "../layer-list/layer-list";
export declare class FeatureDetails {
    el: HTMLFeatureDetailsElement;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    graphics: __esri.Graphic[];
    /**
     * IReportingOptions: Key options for reporting
     */
    reportingOptions: IReportingOptions;
    /**
     * ILayerItemsHash: LayerDetailsHash for each layer in the map
     */
    layerItemsHash: ILayerItemsHash;
    /**
     * boolean: When true the profile image of the comment creator will be shown in the comments list
     */
    showUserImageInCommentsList: boolean;
    /**
     * boolean: When true configured like field is available in selected layer
     */
    _likeFieldAvailable: boolean;
    /**
     * number: Increment the liked count for feature when like button is clicked
     */
    _likeCount: number;
    /**
     * number: Decrement the disliked count for feature when dislike button is clicked
     */
    _disLikeCount: number;
    /**
     * boolean: When true configured dislike field is available in selected layer
     */
    _dislikeFieldAvailable: boolean;
    /**
     * boolean: When true comments are configured and its table is available in selected layer
     */
    _commentsAvailable: boolean;
    /**
     * boolean: When true button will get brand color
     */
    _isLikeBtnClicked: boolean;
    /**
     * boolean: When true button will get brand color
     */
    _isDislikeBtnClicked: boolean;
    /**
     * string[]: objects ids of the related features (comments)
     */
    _relatedFeaturesOIDs: string[];
    /**
     * boolean: When performing any operations set this to true (This will be used to show loading on like/dislike buttons)
     */
    _updating: boolean;
    /**
     * HTMLCreateFeatureElement: info card component instance
     */
    protected _infoCard: HTMLInfoCardElement;
    /**
     * HTMLFeatureListElement: Feature list component's instance to show the comments
     */
    protected _commentsList: HTMLFeatureListElement;
    /**
     * __esri.Graphic: The current selected feature graphic
     */
    protected _selectedGraphic: __esri.Graphic;
    /**
     * string: Available like field in the layer
     */
    protected _likeField: string;
    /**
     * string: Available dislike field in the layer
     */
    protected _dislikeField: string;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    protected Graphic: typeof import("esri/Graphic");
    /**
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-RelationshipQuery.html
     * used for module import
     */
    protected RelationshipQuery: typeof import("esri/rest/support/RelationshipQuery");
    /**
     * string[]: Valid field types for like and dislike
     */
    protected _validFieldTypes: string[];
    /**
     *string: related table id of selected feature
     */
    protected relatedTableId: string;
    /**
     * Called each time the graphics prop is changed
     */
    graphicsWatchHandler(): Promise<void>;
    /**
     * Refresh the features comments which will fetch like, dislike and update the component
     * @returns Promise that resolves when the operation is complete
     */
    refresh(graphic?: __esri.Graphic): Promise<void>;
    /**
     * Go to the previous feature in the features widget
     */
    back(): Promise<void>;
    /**
     * Go to the next feature in the features widget
     */
    next(): Promise<void>;
    /**
     * Toggle the visibility of the features list view
     */
    toggleListView(): Promise<void>;
    /**
     * Emitted on demand when like or dislike button is clicked
     */
    loadingStatus: EventEmitter<boolean>;
    /**
     * Emitted on demand when comment is selected using the feature-list
     */
    commentSelect: EventEmitter<__esri.Graphic>;
    /**
     * Emitted on demand when the selected index changes
     */
    featureSelectionChange: EventEmitter<{
        selectedFeature: __esri.Graphic[];
        selectedFeatureIndex: number;
    }>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
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
     * Get complete graphic with complete attributes
     * @param graphic selected feature graphic
     * @protected
     */
    protected getCompleteGraphic(graphic: __esri.Graphic): Promise<void>;
    /**
     * Process the comments functionality.
     * If comments are configured, fetches the related comments ans creates the input for comments list
     * @protected
     */
    protected processComments(): Promise<void>;
    /**
     * Checks if the layers is configured for like dislike or not
     * @param selectedLayer Feature layer
     * @returns boolean
     * @protected
     */
    protected isLikeDislikeConfigured(selectedLayer: __esri.FeatureLayer): boolean;
    /**
     * Check if configured like or dislike fields are available in the selected layer
     * @protected
     */
    protected checkLikeDislikeFields(): void;
    /**
     * On like button click highlight the like button and update the feature
     * @protected
     */
    protected onLikeButtonClick(): void;
    /**
     * On dislike button click highlight the dislike button and update the feature
     * @protected
     */
    protected onDislikeButtonClick(): void;
    /**
     * Update the feature if user click on like or dislike button
     * @param fieldName field name of the feature for like or dislike attribute
     * @param buttonClicked is like or dislike button clicked
     * @protected
     */
    protected updateFeaturesLikeDislikeField(fieldName: string, buttonClicked: boolean): Promise<void>;
    /**
     * Gets the like/dislike information form local storage and updates the like and dislike button states
     * @protected
     */
    protected getFromLocalStorage(): void;
    /**
     * Sets the like/dislike information for the current selected graphic in local storage
     * @protected
     */
    protected setInLocalStorage(): void;
}
