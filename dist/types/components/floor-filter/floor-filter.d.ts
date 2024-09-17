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
export declare class FloorFilter {
    el: HTMLFloorFilterElement;
    /**
     * boolean: when true the Floor Filter widget will be available
     */
    enabled: boolean;
    /**
     * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
     *
     * FloorFilter instance
     */
    floorFilterWidget: __esri.FloorFilter;
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
     *
     * FloorFilter constructor
     */
    protected FloorFilter: typeof import("esri/widgets/FloorFilter");
    /**
     * HTMLElement: The container div for the floor filter widget
     */
    protected _floorFilterElement: HTMLElement;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _facilityHandle: __esri.WatchHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _levelHandle: __esri.WatchHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _siteHandle: __esri.WatchHandle;
    /**
     * Watch for changes to the mapView and re-init the floor filter
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * Watch for changes to the enabled property and re-init or destroy the floor filter
     */
    enabledWatchHandler(): Promise<void>;
    /**
     * Emitted on demand when the Facility is changed
     */
    facilityChanged: EventEmitter<string>;
    /**
     * Emitted on demand when the Level is changed
     */
    levelChanged: EventEmitter<string>;
    /**
     * Emitted on demand when the Site is changed
     */
    siteChanged: EventEmitter<string>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * StencilJS: Called once just after the component is first loaded.
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
     * Destroy the widget and remove the containing element if it exists
     *
     * @protected
     */
    protected _destroyWidget(): void;
    /**
     * Destroy the widget and remove the containing element then re-create the container element
     *
     * @protected
     */
    protected _initContainer(): void;
    /**
     * Initialize the floor filter or reset the current view if it already exists
     */
    protected _initFloorFilter(view: __esri.MapView): Promise<void>;
}
