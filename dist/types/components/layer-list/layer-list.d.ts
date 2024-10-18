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
import LayerList_T9n from "../../assets/t9n/layer-list/resources.json";
export interface ILayerItemsHash {
    [key: string]: ILayerDetailsHash;
}
interface ILayerDetailsHash {
    name: string;
    formattedFeatureCount: string;
    supportsUpdate: boolean;
    supportsAdd: boolean;
}
export declare class LayerList {
    el: HTMLLayerListElement;
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string[]: If passed will show only these layers in the list if they are present in map and are editable
     */
    layers: string[];
    /**
     * boolean: if true display's feature count for each layer
     */
    showFeatureCount?: boolean;
    /**
     * boolean: If true display's arrow icon on each layer item
     */
    showNextIcon?: boolean;
    /**
     * boolean: If true will consider the FeatureFilter applied on the layerview
     */
    applyLayerViewFilter?: boolean;
    /**
     * boolean: When true will display message no layers found
     */
    _noLayersToDisplay: boolean;
    /**
     * string[]: list of layer ids from the map which will be listed
     */
    _mapLayerIds: string[];
    /**
     * boolean: When true display the loading indicator
     */
    _isLoading: boolean;
    /**
     * Contains the translations for this component.
     */
    _translations: typeof LayerList_T9n;
    /**
     * ILayerItemHash: id/name lookup
     */
    protected _layerItemsHash: ILayerItemsHash;
    /**
     * Refresh the layer list which will fetch the latest layer count and update the list
     * @returns Promise that resolves when the operation is complete
     */
    refresh(): Promise<void>;
    /**
     * Emitted on demand when feature layer clicked with details layerId and layerName
     */
    layerSelect: EventEmitter<{
        layerId: string;
        layerName: string;
    }>;
    /**
     * Emitted on demand when list of layers to be listed are created.
     * When empty array received in this event means no valid layers are found to be listed
     */
    layersListLoaded: EventEmitter<string[]>;
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
     * Fetch the ids of the layers from the map
     * @returns Promise when the operation has completed
     * @protected
     */
    setLayers(): Promise<void>;
    /**
     * Create a layer hash for layer name display
     * @returns Promise when the operation has completed
     * @protected
     */
    protected initLayerHash(): Promise<void>;
    /**
     * Set no layers to display state and emit event
     */
    protected handleNoLayersToDisplay(): void;
    /**
     * Returns the ids of configured layers that needs to be shown in the list
     * @param hash each layer item details
     * @returns array of layer ids
     */
    protected getLayersToBeShownInList(hash: ILayerItemsHash): string[];
    /**
     * Render feature layer list
     * @returns layer list
     * @protected
     */
    protected renderLayerList(): Node[];
    /**
     * Get each item
     * @param layerId Layer id
     * @returns individual item
     * @protected
     */
    protected getLayerListItem(layerId: string): VNode;
    /**On click of layer list item emit the event along with the selected layerId and layerName
     * @param layerId Layer id
     * @protected
     */
    protected onLayerItemSelected(layerId: string): void;
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
export {};
