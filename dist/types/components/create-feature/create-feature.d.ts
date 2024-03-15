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
/// <reference types="arcgis-js-api" />
import { EventEmitter } from "../../stencil-public-runtime";
export declare class CreateFeature {
    el: HTMLCreateFeatureElement;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * string: Layer id of the feature layer in which the new feature is to be created
     */
    selectedLayerId: string;
    /**
     * boolean: Set this to true when have a custom submit button in the app.
     * This will hide the header and footer elements of the editor and user needs to execute the submit method manually.
     */
    customizeSubmit?: boolean;
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
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * boolean: Flag to maintain the add attachment
     */
    protected _addingAttachment: boolean;
    /**
    * Called each time the mapView prop is changed.
    */
    mapViewWatchHandler(): Promise<void>;
    /**
     * Destroy the Editor widget instance
     * @returns Promise that resolves when the operation is complete
     */
    close(): Promise<void>;
    /**
     * Submit the created feature
     * @returns Promise that resolves when the operation is complete
     */
    submit(): Promise<void>;
    /**
     * Emitted on demand when the feature is created successfully
     */
    success: EventEmitter<void>;
    /**
     * Emitted on demand when the feature creation is failed
     */
    fail: EventEmitter<Error>;
    /**
     * Emitted on demand when drawing is completed
     */
    drawComplete: EventEmitter<void>;
    /**
    * Emitted on demand when editing attachments
    */
    editingAttachment: EventEmitter<boolean>;
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
     * Init Editor widget and starts the create workflow
     */
    protected init(): Promise<void>;
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    protected initModules(): Promise<void>;
    /**
     * Display editor widget to create the new feature
     * @protected
     */
    protected createEditorWidget(): Promise<void>;
    /**
     * Start creating the feature
     * @protected
     */
    protected startCreate(): Promise<void>;
    /**
     * Hides the elements of editor widget
     * @protected
     */
    protected hideEditorsElements(): void;
    /**
     * On creation of feature emit the event that the feature is created
     * @param evt feature submit event
     * @protected
     */
    protected submitted(evt: any): Promise<void>;
}
