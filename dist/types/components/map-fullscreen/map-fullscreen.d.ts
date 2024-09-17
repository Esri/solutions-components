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
export declare class MapFullscreen {
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html
     */
    fullscreenWidget: __esri.Fullscreen;
    /**
     * esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html
     */
    protected Fullscreen: typeof import("esri/widgets/Fullscreen");
    /**
     * HTMLElement: The container div for the Fullscreen widget
     */
    protected _fullscreenElement: HTMLElement;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _fullscreenStateChangeHandle: __esri.WatchHandle;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * Emitted on demand when the fullscreen widget state has changed
     */
    fullscreenStateChange: EventEmitter<string>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * StencilJS: Called just after the component updates.
     * It's never called during the first render().
     */
    componentDidUpdate(): Promise<void>;
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
     * Initialize the search widget
     *
     * @protected
     */
    protected _initFullscreenWidget(): Promise<void>;
}
