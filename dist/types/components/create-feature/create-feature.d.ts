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
import CreateFeature_T9n from "../../assets/t9n/create-feature/resources.json";
import { ISearchConfiguration } from "../../utils/interfaces";
type ICurrentPage = "templatePicker" | "drawing" | "featureForm";
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
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * boolean: When true the application will be in mobile mode, controls the mobile or desktop view
     */
    isMobile: boolean;
    /**
     * string: selected floor level
     */
    floorLevel: string;
    /**
     * string: selected floor level
     */
    formElements: any;
    /**
     * boolean: When true the Search box will be displayed
     */
    enableSearch?: boolean;
    /**
     * boolean: When true the notice message with the current state should be shown
     */
    showGuidingMsg?: boolean;
    /**
     * boolean: When false the notice message at drawing page will be hidden
     */
    showGuidingMsgWhileDrawing?: boolean;
    /**
     * boolean: When true a loading indicator will be shown while the editor loads
     */
    _editorLoading: boolean;
    /**
     * ICurrentPage: specifies the current page
     */
    _currentPage: ICurrentPage;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof CreateFeature_T9n;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor constructor
     */
    protected Editor: typeof import("esri/widgets/Editor");
    /**
     * esri/form/ExpressionInfo: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-ExpressionInfo.html
     * The ExpressionInfo constructor
     */
    protected ExpressionInfo: typeof import("esri/form/ExpressionInfo");
    /**
     * esri/form/elements/FieldElement: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-elements-FieldElement.html
     * The FieldElement constructor
     */
    protected FieldElement: typeof import("esri/form/elements/FieldElement");
    /**
     * esri/form/FormTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-FormTemplate.html
     */
    protected FormTemplate: typeof import("esri/form/FormTemplate");
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor instance
     */
    protected _editor: __esri.Editor;
    /**
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     * The Feature layer instance
     */
    protected FeatureLayer: typeof import("esri/layers/FeatureLayer");
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     * The MapView instance
     */
    protected MapView: typeof import("esri/views/MapView");
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     * Updated map view instance
     */
    protected _updatedMapView: __esri.MapView;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     * The Search instance
     */
    protected Search: typeof import("esri/widgets/Search");
    /**
     * "esri/widgets/Search": https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     * The Search instance
     */
    protected _search: __esri.widgetsSearch;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * boolean: Flag to maintain the add attachment
     */
    protected _addingAttachment: boolean;
    /**
     * HTMLDivElement: The node the editor will be added to
     */
    protected _container: HTMLDivElement;
    /**
     * HTMLDivElement: The node for the map view
     */
    protected _mapViewContainer: HTMLDivElement;
    /**
     * boolean: Flag to maintain form submission using submit button
     */
    protected _isSubmitBtnClicked: boolean;
    /**
     * __esri.FeatureLayer: selected feature layer;
     */
    protected _selectedLayer: __esri.FeatureLayer;
    /**
     * HTMLDivElement: refrence for search div element
     */
    protected _searchDiv: HTMLDivElement;
    /**
     * HTMLCalciteNoticeElement: calcite notice refrence element
     */
    protected _calciteNotice: HTMLCalciteNoticeElement;
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * Called each time when isMobile prop is changed.
     */
    isMobileHandler(): Promise<void>;
    /**
     * When _editorLoading is true the container node will be hidden while starting the create workflow
     */
    _editorLoadingWatchHandler(v: boolean): Promise<void>;
    /**
     * Submit the created feature
     * @returns Promise that resolves when the operation is complete
     */
    submit(): Promise<void>;
    /**
     * refresh the feature form
     * @returns Promise that resolves when the operation is complete
     */
    refresh(floorLevel: string): Promise<void>;
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
     * Emitted on demand when editor panel changes
     */
    progressStatus: EventEmitter<number>;
    /**
     * Emitted on switched form mobile to desktop or vice versa
     */
    modeChanged: EventEmitter<void>;
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
     * Called after each render
     * Used to adjust the map top in case of mobile
     */
    componentDidRender(): void;
    /**
     * StencilJS: Called every time the component is disconnected from the DOM,
     */
    disconnectedCallback(): void;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Init Editor widget and Search widget
     */
    protected init(): Promise<void>;
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    protected initModules(): Promise<void>;
    /**
     * updates the map view (in case of mobile)
     * @protected
     */
    protected createMobileMapView(): Promise<void>;
    /**
     * Loads the Editor and Search widgets
     * @protected
     */
    protected _loadWidgets(): Promise<void>;
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
     * Display search widget to search location
     * @protected
     */
    protected createSearchWidget(): Promise<void>;
    /**
     * Initialize the search widget based on user defined configuration
     *
     * @param searchConfiguration search configuration defined by the user
     * @param view the current map view
     *
     * @protected
     */
    protected _getSearchConfig(searchConfiguration: ISearchConfiguration, view: __esri.MapView): ISearchConfiguration;
    /**
     * Add the floor level value to form
     * @param level selected floor level
     *
     * @protected
     */
    protected _setFloorLevel(level: string): Promise<void>;
    /**
     * Hides the elements of editor widget
     * @protected
     */
    protected hideEditorsElements(): Promise<void>;
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
export {};
