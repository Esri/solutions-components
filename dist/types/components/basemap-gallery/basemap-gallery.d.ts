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
import { IBasemapConfig } from '../../utils/interfaces';
export declare class BasemapGallery {
    el: HTMLBasemapGalleryElement;
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * IBasemapConfig: List of any basemaps to filter out from the basemap widget
     */
    basemapConfig: IBasemapConfig;
    /**
     * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
     *
     * BasemapGallery instance
     */
    basemapWidget: __esri.BasemapGallery;
    /**
     * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
     *
     * BasemapGallery constructor
     */
    protected BasemapGallery: typeof import("esri/widgets/BasemapGallery");
    /**
     * esri/widgets/BasemapGallery/support/PortalBasemapsSource: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery-support-PortalBasemapsSource.html
     *
     * PortalBasemapsSource constructor
     */
    protected PortalBasemapsSource: typeof import("esri/widgets/BasemapGallery/support/PortalBasemapsSource");
    /**
     * HTMLElement: The container div for the basemap gallery widget
     */
    protected _basemapElement: HTMLElement;
    mapViewWatchHandler(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Renders the component.
     */
    render(): any;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad(): Promise<void>;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Initialize the basemap gallery or reset the current view if it already exists
     *
     * @protected
     */
    protected _initBaseMapGallery(view: __esri.MapView): Promise<void>;
}
