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
     * When true a loading indicator will be shown in the current card
     */
    _cardLoading: boolean;
    /**
     * The current selected graphics
     */
    _graphics: __esri.Graphic[];
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof CardManager_T9n;
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
     * Gets the Feature using its ids
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getFeaturesByIds(ids: number[]): Promise<__esri.Graphic[]>;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
