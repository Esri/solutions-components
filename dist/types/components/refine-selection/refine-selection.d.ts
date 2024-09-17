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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ESelectionMode, IRefineOperation, ISelectionSet } from "../../utils/interfaces";
import RefineSelection_T9n from "../../assets/t9n/refine-selection/resources.json";
export declare class RefineSelection {
    el: HTMLRefineSelectionElement;
    /**
     * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
     */
    addresseeLayer: __esri.FeatureLayerView;
    /**
     * string[]: Optional list of enabled layer ids
     *  If empty all layers will be available
     */
    enabledLayerIds: string[];
    /**
     * string: The current user locale.
     */
    locale: string;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * utils/interfaces/ISelectionSet: An array of user defined selection sets
     */
    selectionSets: ISelectionSet[];
    /**
     * esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
     *
     */
    sketchLineSymbol: __esri.SimpleLineSymbol;
    /**
     * esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
     *
     */
    sketchPointSymbol: __esri.SimpleMarkerSymbol;
    /**
     * esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
     *
     */
    sketchPolygonSymbol: __esri.SimpleFillSymbol;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof RefineSelection_T9n;
    /**
     * The current selection mode ADD or REMOVE
     */
    _selectionMode: ESelectionMode;
    /**
     * The current layer to refine
     */
    _refineLayer: __esri.FeatureLayerView;
    /**
     * boolean: Indicates if any new graphics should be added or removed
     */
    protected _addEnabled: boolean;
    /**
     * HTMLMapDrawToolsElement: The tools used to create graphics
     */
    protected _drawTools: HTMLMapDrawToolsElement;
    /**
     * ISelectionSet[]: The current list of selection sets
     */
    protected _refineSets: ISelectionSet[];
    /**
     * string[]: The list of all layers that have current selections
     */
    protected _enabledLayerIds: string[];
    /**
     * HTMLMapLayerPickerElement: The layer picker used to define what layer you are refining
     */
    protected _layerPicker: HTMLMapLayerPickerElement;
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    protected _featuresCollection: {
        [key: string]: __esri.Graphic[];
    };
    /**
     * ISelectionSet: The current selection set to refine
     */
    protected _refineSelectionSet: ISelectionSet;
    /**
     * Emitted on demand when selection starts or ends.
     */
    selectionLoadingChange: EventEmitter<boolean>;
    /**
     * Emitted on demand when selection sets change.
     *
     */
    selectionSetsChanged: EventEmitter<ISelectionSet[]>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * Set the user selected layer as the current refine layer
     *
     * @param evt contains the selected layer id
     *
     * @protected
     */
    protected _layerSelectionChange(evt: CustomEvent): void;
    /**
     * Store the current selection mode
     *
     * @param selectionMode the current selection mode ADD || REMOVE
     *
     * @protected
     */
    protected _setSelectionMode(selectionMode: ESelectionMode): void;
    /**
     * Select features based on the user drawn geometry
     *
     * @param evt ISketchGraphicsChange stores the new graphics and a boolean useOIDs
     * useOIDs is leveraged in some situations to use the feature OIDs rather than the graphic geometry
     *
     * @protected
     */
    protected _sketchGraphicsChanged(evt: CustomEvent): void;
    /**
     * Get the layer ids for all layers in the selection sets
     *
     * @protected
     */
    protected _getEnabledLayerIds(): string[];
    /**
     * Set the refine layer...any adds or removes will be done against this layer
     *
     * @param id the id of the layer that should be used as the current refine layer
     *
     * @protected
     */
    protected _setRefineSet(id: string): Promise<void>;
    /**
     * Initialize the refine selection set
     *
     * @param id the layer id to use for the refine selection set
     * @param selectionSet the current refine selection set
     *
     * @protected
     */
    protected _initRefineSet(id: string, selectionSet: ISelectionSet): Promise<void>;
    /**
     * Undo the most current ADD or REMOVE operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _undo(): void;
    /**
     * Redo the most current ADD or REMOVE operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _redo(): void;
    /**
     * Create a list to show the number added/removed/total unique selected
     *
     * @returns the list node
     * @protected
     */
    protected _getRefineSelectionSetList(): VNode[];
    /**
     * Get the total number od ids across all selection sets
     *
     * @returns the total number of ids
     * @protected
     */
    protected _getTotal(selectionSets: ISelectionSet[]): number;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
    /**
     * Select features based on the input geometry
     *
     * @param geom the geometry used for selection
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _selectFeatures(geom: __esri.Geometry): Promise<void>;
    /**
     * Highlight any selected features in the map
     *
     * @returns Promise resolving when function is done
     * @protected
     */
    protected _highlightFeatures(): Promise<void>;
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    protected _clearHighlight(): void;
    /**
     * Update the ids for any ADD or REMOVE operation and highlight the features.
     *
     * @param oids the ids to add or remove
     * @param mode ADD or REMOVE this will control if the ids are added or removed
     * @param operationStack the undo or redo stack to push the operation to
     * @param operationMode ADD or REMOVE the mode of the individual refine operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _updateIds(ids: number[], mode: ESelectionMode, operationStack: IRefineOperation[], layerView: __esri.FeatureLayerView): Promise<void>;
}
