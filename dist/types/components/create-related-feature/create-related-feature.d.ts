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
import CreateRelatedFeature_T9n from "../../assets/t9n/create-related-feature/resources.json";
export declare class CreateRelatedFeature {
    el: HTMLCreateRelatedFeatureElement;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
   *  __esri.FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
    table: __esri.FeatureLayer;
    /**
   *  __esri.Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
    selectedFeature: __esri.Graphic;
    /**
     * boolean: Set this to true when have a custom submit button in the app.
     * This will hide the header and footer elements of the editor and user needs to execute the submit method manually.
     */
    customizeSubmit?: boolean;
    /**
     * boolean: When true the notice message should be shown
     */
    showGuidingMsg?: boolean;
    /**
     * boolean: When true a loading indicator will be shown while the editor loads
     */
    _editorLoading: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof CreateRelatedFeature_T9n;
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
     * HTMLDivElement: The node the editor will be added to
     */
    protected _container: HTMLDivElement;
    /**
     * boolean: Flag to maintain the add attachment
     */
    protected _addingAttachment: boolean;
    /**
     * boolean: Flag to maintain form submission using submit button
     */
    protected _isSubmitBtnClicked: boolean;
    /**
    * Called each time the mapView prop is changed.
    */
    mapViewWatchHandler(): Promise<void>;
    /**
     * When _editorLoading is true the container node will be hidden while starting the create workflow
     */
    _editorLoadingWatchHandler(v: boolean): Promise<void>;
    /**
     * Submit the comment
     */
    submit(): Promise<void>;
    /**
     * Emitted on demand when the comment is submitted successfully
     */
    success: EventEmitter<void>;
    /**
     * Emitted on demand when the comment submission is failed
     */
    fail: EventEmitter<Error>;
    /**
     * Emitted on demand when any action is pending or completed
     */
    isActionPending: EventEmitter<boolean>;
    /**
     * Emitted on demand when form is ready
     */
    formReady: EventEmitter<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
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
    render(): any;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad(): Promise<void>;
    /**
     * StencilJS: Called every time the component is disconnected from the DOM,
     */
    disconnectedCallback(): void;
    /**
     * Display editor widget to create the new feature
     * @protected
     */
    protected createEditorWidget(): Promise<void>;
    /**
     * Start creating the feature feature form
     * @protected
     */
    protected startCreate(): Promise<void>;
    /**
     * Hides the elements of editor widget
     * @protected
     */
    protected hideEditorsElements(): Promise<void>;
    /**
     * Makes attributes for related feature
     * @param parentFeature Parent feature
     * @param parentRelationship Parent relationship
     * @param childRelationship Child relationship
     * @returns Attributes for related feature
     * @protected
     */
    protected makeAttributesForRelatedFeature(parentFeature: __esri.Graphic, parentRelationship: __esri.Relationship, childRelationship: __esri.Relationship): object;
    /**
     * On creation of feature emit the event that the feature is created
     * @param evt feature submit event
     * @protected
     */
    protected submitted(evt: any): Promise<void>;
    /**
     * call setTimeout in Promise wrapper
     * @param delay The time, in milliseconds that the timer should wait before the promise is resolved
     * @protected
     */
    protected timeout(delay: number): Promise<void>;
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
