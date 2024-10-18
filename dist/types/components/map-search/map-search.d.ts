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
import { ISearchConfiguration } from "../../utils/interfaces";
export declare class MapSearch {
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * boolean: When true the selected feature popup will be shown when serach result is found
     */
    popupEnabled: boolean;
    /**
     * boolean: When true a graphic will be added for the search result
     */
    resultGraphicEnabled: boolean;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * string: Text entered by the end user.
     * Used to search against the locator.
     */
    searchTerm: string;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    searchWidget: __esri.widgetsSearch;
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    protected FeatureLayer: typeof import("esri/layers/FeatureLayer");
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    protected Search: typeof import("esri/widgets/Search");
    /**
     * HTMLElement: The container div for the search widget
     */
    protected _searchElement: HTMLElement;
    /**
     * An array of objects representing the results of search
     */
    protected _searchResult: any;
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    watchSearchConfigurationHandler(): Promise<void>;
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
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
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Initialize the search widget
     *
     * @protected
     */
    protected _initSearchWidget(): void;
    /**
     * Initialize the search widget based on user defined configuration
     *
     * @param searchConfiguration search configuration defined by the user
     * @param view the current map view
     *
     * @protected
     */
    protected _getSearchConfig(searchConfiguration: ISearchConfiguration, view: __esri.MapView): ISearchConfiguration;
}
