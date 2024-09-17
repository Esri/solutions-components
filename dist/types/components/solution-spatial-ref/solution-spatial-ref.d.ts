/** @license
 * Copyright 2021 Esri
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
import '@esri/calcite-components';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
import { IFeatureServiceEnabledStatus } from '../../utils/interfaces';
export declare class SolutionSpatialRef {
    el: HTMLSolutionSpatialRefElement;
    /**
    * When true, all but the main switch are disabled to prevent interaction.
    */
    enabled: boolean;
    enabledChanged(): void;
    /**
    * When true, a default value is used for feature services.
    */
    enableDefault: boolean;
    enableDefaultChanged(): void;
    /**
    * List of services the spatial reference should apply to
    */
    featureServices: IFeatureServiceEnabledStatus[];
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    render(): VNode;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof SolutionSpatialRef_T9n;
    featureServiceSpatialReferenceChange: EventEmitter<IFeatureServiceEnabledStatus>;
    enableDefaultSpatialReferenceChange: EventEmitter<{
        defaultWkid: string;
    }>;
    enabledSpatialReferenceChange: EventEmitter<{
        enabled: boolean;
    }>;
    solutionStoreHasChanges(): void;
    /** Provides access to protected methods for unit testing.
     *
     *  @param methodName Name of protected method to run
     *  @param _arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
     *  @param _arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
     *  @param _arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
     *
     *  @returns
     */
    _testAccess(methodName: string, _arg1?: any, _arg2?: any, _arg3?: any): Promise<any>;
    /**
     * Disable spatial reference variable for all feature services.
     *
     * @param services list of service names
     */
    private _clearFeatureServiceDefaults;
    /**
     * Toggles the enablement of the default spatial reference.
     */
    private _handleDefaultSpatialRefParamChange;
    /**
     * Toggles the enablement of the spatial reference parameter.
     */
    private _handleSpatialRefParamChange;
    /**
     * Converts a wkid into a parameterized form for storage in the solution item data.
     *
     * @param wkid Wkid to parameterize; unchanged if already parameterized
     * @returns Parameterized wkid
     */
    private _parameterizeWkid;
    /**
     * Create a switch control for each of the services
     *
     * @param services List of feature services
     * @returns a node to control each feature service
     */
    private _renderFeatureServicesList;
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     *
     * @param event The event that triggered the change
     * @param service The service to update
     */
    private _updateEnabledServices;
    /**
     * Converts a parameterized wkid into a standard form for use in the solution item data.
     *
     * @param wkid Wkid to unparameterize; unchanged if not parameterized
     * @returns Unparameterized wkid
     */
    private _unparameterizeWkid;
    /**
     * Updates the enabled/disabled state of the services in the featureServices part of the store.
     *
     * @param spatialReferenceInfo The spatial reference information
     */
    private _updateFeatureServices;
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    private _updateStore;
    private _updateUIFromStore;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
