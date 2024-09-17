/** @license
 * Copyright 2023 Esri
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
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IMapInfo } from "../../utils/interfaces";
import MapPicker_T9n from "../../assets/t9n/map-picker/resources.json";
export declare class MapPicker {
    el: HTMLMapPickerElement;
    /**
     * IMapInfo[]: array of map infos (name and id)
     */
    mapInfos: IMapInfo[];
    /**
     * boolean: when true map list will shown in half width.
     */
    isMapLayout?: boolean;
    /**
     * boolean: controls the state of the map list
     */
    _mapListExpanded: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof MapPicker_T9n;
    /**
     * IMapInfo: id and name of the map to display
     */
    _webMapInfo: IMapInfo;
    /**
     * HTMLCalciteListElement: this list of map names
     */
    protected _list: HTMLCalciteListElement;
    /**
     * string: the id of map currently displayed
     */
    protected _loadedId: string;
    /**
     * Called each time the _webMapInfo prop is changed.
     */
    _webMapInfoWatchHandler(v: IMapInfo, oldV: IMapInfo): void;
    /**
     * Called each time the mapInfos prop is changed.
     */
    mapInfosWatchHandler(v: IMapInfo[], oldV: IMapInfo[]): Promise<void>;
    setMapByID(id: string): Promise<void>;
    /**
     * Closes the list
     */
    close(): Promise<void>;
    /**
     * Expands the list
     */
    toggle(mapListExpanded: boolean): Promise<void>;
    /**
     * Emitted when a new map is loaded
     */
    mapInfoChange: EventEmitter<IMapInfo>;
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
     * Called once after the component has loaded
     */
    componentDidLoad(): Promise<void>;
    /**
     * Get a calcite action group for the map list
     * Actions do not support multiple icons so this uses a block
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    protected _getMapPicker(): VNode;
    /**
     * Create the toolbar (controls used for map and app interactions)
     *
     * @returns The dom node with the toolbar
     *
     * @protected
     */
    protected _getToolbar(): VNode;
    /**
     * Get a pick list for all maps in mapInfos
     *
     * @param show boolean to indicate if the list should be shown or hidden
     *
     * @returns the dom node for the list of maps
     *
     * @protected
     */
    protected _getMapNameList(show: boolean): VNode;
    /**
     * Fired when the user clicks on the map list
     *
     * @param webMapInfo the web map id and name selected from the list
     */
    protected _webMapSelected(webMapInfo: IMapInfo): void;
    /**
     * Toggles the open/close state of the map list
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    protected _chooseMap(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
