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
import InfoCard_T9n from "../../assets/t9n/info-card/resources.json";
import { IPopupUtils } from "../../utils/interfaces";
export declare class InfoCard {
    el: HTMLInfoCardElement;
    /**
     * When true the geometry of the current feature will be editable
     */
    enableEditGeometry: boolean;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    graphics: __esri.Graphic[];
    /**
     * boolean: when true a loading indicator will be shown
     */
    isLoading: boolean;
    /**
     * When true the component will render an optimized view for mobile devices
     */
    isMobile: boolean;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * boolean: If true will show edit button
     */
    allowEditing?: boolean;
    /**
     * boolean: If true will highlights the features on map using Features Widget
     */
    highlightEnabled?: boolean;
    /**
     * boolean: If true will show the pagination for multiple features
     */
    paginationEnabled?: boolean;
    /**
     * string: Set the position of the feature info
     */
    position?: string;
    /**
     * boolean: When true a alert will be shown to indicate a problem or confirm the current action
     */
    _alertOpen: boolean;
    /**
     * string: Current index of total string
     * This value is not displayed but will force a render if it changes
     */
    _count: string;
    /**
     * When true the add record modal will be displayed
     */
    _editRecordOpen: boolean;
    /**
     * When isMobile is true we will handle the display of the title so
     * we can display beside a custom back button
     */
    _mobileTitle: string;
    /**
     * When true the features list view will be displayed
     */
    _showListView: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof InfoCard_T9n;
    /**
     * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
     * used for module import
     */
    protected Features: typeof import("esri/widgets/Features");
    /**
     * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    protected _editEnabled: boolean;
    /**
     * esri/widgets/Feature: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Feature.html
     * used for widget instance
     */
    protected _features: __esri.Features;
    /**
     * esri/widgets/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    protected _layer: __esri.FeatureLayer;
    /**
     * IPopupUtils: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
     */
    protected _popupUtils: IPopupUtils;
    /**
     * string: unique id for the features node
     */
    protected _featuresNodeId: string;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    protected reactiveUtils: typeof import("esri/core/reactiveUtils");
    /**
     * Watch for changes to the graphic and update the feature widget
     */
    graphicsWatchHandler(): Promise<void>;
    /**
     * Watch for changes to the isMobile prop then init the Features widget
     * We need to know if the title should be displayed by the widget (non mobile)
     * or by us (mobile)
     */
    isMobileWatchHandler(): Promise<void>;
    /**
     * Watch for changes to the mapView and re-init the Feature widget
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * Get the current selected feature from the Features widget
     *
     * @returns Promise resolving with the current feature
     */
    getSelectedFeature(): Promise<any>;
    /**
     * Refresh the feature info
     * @returns Promise when complete
     */
    refresh(): Promise<any>;
    /**
     * Go to the previous feature in the features widget
     */
    back(): Promise<void>;
    /**
     * Go to the next feature in the features widget
     */
    next(): Promise<void>;
    /**
     * Toggle the visibility of the features list view
     */
    toggleListView(): Promise<void>;
    /**
     * update the current graphics to the features widget
     */
    updateCurrentGraphic(selectedGraphic: __esri.Graphic): Promise<void>;
    /**
     * Emitted on demand when the popup is closed
     */
    popupClosed: EventEmitter<void>;
    /**
     * Emitted on demand when the selected index changes
     */
    selectionChanged: EventEmitter<{
        selectedFeature: __esri.Graphic[];
        selectedFeatureIndex: number;
    }>;
    /**
     * Respond to and close the edit record display
     *
     * @returns a promise when the operation has completed
     */
    closeEdit(): Promise<void>;
    /**
     * Reset key properties when the layer selection changes
     */
    layerSelectionChange(): Promise<void>;
    /**
     * Refresh the info-card graphics
     */
    refreshGraphics(evt: CustomEvent): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     * @returns Promise when complete
     */
    componentDidLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Initializes the features widget if not created and updates the feature widget and other required states
     *
     * @protected
     */
    protected setGraphics(): Promise<void>;
    /**
     * Init the Feature widget so we can display the popup content
     *
     * @returns a promise when the operation has completed
     *
     * @protected
     */
    protected _initFeaturesWidget(): Promise<void>;
    /**
     * Get the mobile header
     *
     * @returns the header node to display when in mobile mode
     *
     * @protected
     */
    protected _getHeader(): VNode;
    /**
     * Close the popup and emit the selected features
     */
    protected _closePopup(): void;
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    protected _alertClosed(): void;
    /**
     * Open the edit record
     */
    protected _openEditRecord(): void;
    /**
     * Go to the previous feature in the features widget
     */
    protected _back(): void;
    /**
     * Go to the next feature in the features widget
     */
    protected _next(): void;
    /**
     * Get the current index of total string
     *
     * @returns the index of total string
     */
    protected _getCount(): string;
    /**
     * Toggle the visibility of the features list view
     */
    protected _toggleListView(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
