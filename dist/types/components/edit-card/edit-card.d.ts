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
import EditCard_T9n from "../../assets/t9n/edit-card/resources.json";
export declare class EditCard {
    el: HTMLEditCardElement;
    /**
     * When true the geometry of the current feature will be editable
     */
    enableEditGeometry: boolean;
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    graphics: __esri.Graphic[];
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * When true the component is displayed
     */
    open: boolean;
    /**
     * The index of the current graphic
     */
    graphicIndex: number;
    /**
     * boolean: When true a loading indicator will be shown while the editor loads
     */
    _editorLoading: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof EditCard_T9n;
    /**
      * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
      */
    protected _activeWorkflowHandle: __esri.WatchHandle;
    /**
      * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
      */
    protected _addRelatedRecordHandle: __esri.WatchHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _attachmentHandle: __esri.WatchHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _editHandle: __esri.WatchHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    protected _layerEditHandle: __esri.WatchHandle;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor constructor
     */
    protected Editor: typeof import("esri/widgets/Editor");
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor instance
     */
    protected _editor: __esri.Editor;
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     * OR
     * esri/layers/support/SubtypeSublayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-SubtypeSublayer.html
     */
    protected _layer: __esri.FeatureLayer | __esri.SubtypeSublayer;
    /**
     * HTMLDivElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement
     */
    protected _editContainer: HTMLDivElement;
    /**
     * any[]: Collection of edit controls created in "MULTI" edit mode
     * These can be calcite-input-text, calcite-input-number, calcite-input-date-picker, calcite-input-time-picker, or calcite-combobox
     */
    protected _editControlElements: any[];
    /**
     * boolean: When true edit controls will be disabled
     */
    protected _editingDisabled: boolean;
    /**
     * boolean: When true the Editor widget should be closed
     * Without this logic we are taken to the Editors "Select" workflow step
     */
    protected _shouldClose: boolean;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * Watch for changes to the graphics and update the feature widget
     */
    graphicsWatchHandler(): Promise<void>;
    openWatchHandler(v: boolean): Promise<void>;
    /**
     * Emitted on demand when the Editor widget should be closed
     */
    closeEdit: EventEmitter<void>;
    /**
     * Emitted on demand when edits are completed on current edit layer
     */
    editsComplete: EventEmitter<void>;
    /**
     * Emitted on demand when the editor is closed to handle
     * things like attachment updates that don't fire the standard edit update event when complete
     */
    refreshGraphics: EventEmitter<__esri.Graphic[]>;
    featureSelectionChange(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Special handeling when used with layer-table.
     * This allows us to only fetch graphics when the modal is opened rather than with every render of the layer-table.
     *
     * @returns Promise when complete
     */
    componentWillRender(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     */
    protected _initModules(): Promise<void>;
    /**
     * Init the Editor widget so we can display the popup content
     */
    protected _initEditorWidget(): Promise<void>;
    /**
     * Close the edit widget
     */
    protected _closeEdit(destroyOnClose: boolean): Promise<void>;
    /**
     * Start the update workflow for the editor widget
     */
    protected _startUpdate(): Promise<void>;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     */
    protected _getTranslations(): Promise<void>;
}
