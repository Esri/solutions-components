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
import { EventEmitter } from "../../stencil-public-runtime";
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
export declare class CardManager {
    el: HTMLCardManagerElement;
    /**
     * string: custom notice text to display
     */
    customInfoText: string;
    /**
     * When true the geometry of the current feature will be editable
     */
    enableEditGeometry: boolean;
    /**
     * When true the component will render an optimized view for mobile devices
     */
    isMobile: boolean;
    /**
     * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    layer: __esri.FeatureLayer;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
     */
    zoomAndScrollToSelected: boolean;
    /**
     * A list of ids that are currently selected
     */
    selectedFeaturesIds: number[];
    /**
     * boolean: when true the users can have the option to create features
     */
    enableCreateFeatures: boolean;
    /**
     * boolean: When select feature from map message will shown
     */
    selectingFeatureFromMap: boolean;
    /**
     * When true a loading indicator will be shown in the current card
     */
    _cardLoading: boolean;
    /**
     * The current selected graphics
     */
    _graphics: __esri.Graphic[];
    /**
     * When true feature component is shown
     */
    _showCreateFeatureComponent: boolean;
    /**
     * boolean: When true show the create button
     */
    _showSubmitBtn: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof CardManager_T9n;
    /**
     * boolean: Flag to maintain if recently any feature has been created
     */
    protected _isFeatureCreated: boolean;
    /**
     * HTMLCreateFeatureElement: Create Feature component instance
     */
    protected _createFeature: HTMLCreateFeatureElement;
    /**
     * Emits when create work flow started
     */
    createWorkFlowStarted: EventEmitter<void>;
    /**
     * Emits when back from create work flow
     */
    backFromCreateWorkFlow: EventEmitter<void>;
    /**
     * Emits when feature/record is submitted
     */
    featureOrRecordSubmitted: EventEmitter<void>;
    /**
     * Query the layer for the provided ids and store the result graphics
     */
    featureSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * Get the layer view for the provided layer id
     */
    layerSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
   * Returns the editor component for adding feature
   * @returns Node
   */
    protected getEditorComponent(): Node;
    /**
     * Gets the Feature using its ids
     * @param ids list of ids that are currently selected
     * @returns Promise when complete
     * @protected
     */
    protected _getFeaturesByIds(ids: number[]): Promise<__esri.Graphic[]>;
    /**
     * Displays the feature creation functionality and changes the layout
     * @protected
     */
    protected _createFeatureBtnClicked(): void;
    /**
     * Closes the Create feature component
     * @protected
     */
    protected _backFromCreateFeature(): Promise<void>;
    /**
     * On Submitting the form show the creator feature again
     * @protected
     */
    protected _featureCreated(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
