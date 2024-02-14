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
import '@esri/calcite-components';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
import { EventEmitter, VNode } from '../../stencil-public-runtime';
export declare class SolutionSpatialRef {
    el: HTMLSolutionSpatialRefElement;
    /**
    * The wkid that will be used as the default when no user selection has been made.
    */
    defaultWkid: number;
    /**
    * Indicates if the control has been enabled.
    * The first time Spatial Reference has been enabled it should enable all feature services.
    */
    loaded: boolean;
    /**
    * When true, all but the main switch are disabled to prevent interaction.
    */
    locked: boolean;
    lockedChanged(newLocked: boolean): void;
    /**
    * List of service names the spatial reference should apply to
    */
    services: string[];
    /**
     * Contains the public value for this component, which is a wkid or a wkt.
     */
    value: string;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * Current text that is being used to filter the list of spatial references.
     */
    protected _srSearchText: string;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof SolutionSpatialRef_T9n;
    featureServiceSpatialReferenceChange: EventEmitter<{
        name: string;
        enabled: boolean;
    }>;
    lockedSpatialReferenceChange: EventEmitter<{
        locked: boolean;
    }>;
    /**
     * Saves changes to the embedded spatial reference value
     */
    spatialReferenceChange(event: CustomEvent): void;
    /**
     * Toggles the ability to set the default spatial reference.
     */
    protected _updateLocked(event: any): void;
    /**
     * Enable spatial reference variable for all feature services.
     *
     * @param services list of service names
     */
    protected _setFeatureServiceDefaults(services: string[]): void;
    /**
     * Create a switch control for each of the services
     *
     * @param services List of feature services
     * @returns a node to control each feature service
     */
    protected _getFeatureServices(services: string[]): VNode;
    /**
     * Updates the enabled and spatialReference prop in spatialReferenceInfo.
     */
    protected _updateStore(): void;
    /**
     * Updates the enabled/disabled state of the service in spatialReferenceInfo.
     */
    protected _updateEnabledServices(event: any, name: string): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
