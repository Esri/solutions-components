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
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import '@esri/calcite-components';
import { ISpatialRefRepresentation } from '../../utils/interfaces';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
export declare class SolutionSpatialRef {
  el: HTMLSolutionSpatialRefElement;
  /**
  * The wkid that will be used as the default when no user selection has been made.
  */
  defaultWkid: number;
  /**
  * When true, all but the main switch are disabled to prevent interaction.
  */
  locked: boolean;
  /**
   * Contains the public value for this component, which is a wkid or a wkt.
   */
  value: string;
  valueChanged(newValue: string): void;
  /**
  * List of service names the spatial reference should apply to
  */
  services: string[];
  /**
  * Indicates if the control has been enabled.
  * The first time Spatial Reference has been enabled it should enable all feature services.
  */
  loaded: boolean;
  constructor();
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Internal representation of component's value for display purposes.
   */
  protected spatialRef: ISpatialRefRepresentation;
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
  /**
   * Returns the spatial reference description of the supplied value.
   * (Exposes protected method `_createSpatialRefDisplay` for testing.)
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  createSpatialRefDisplay(value: string): Promise<ISpatialRefRepresentation>;
  /**
   * Returns the current spatial reference description.
   * (Exposes protected variable `spatialRef` for testing.)
   */
  getSpatialRef(): Promise<ISpatialRefRepresentation>;
  /**
   * Converts a WKID into a spatial reference description.
   * (Exposes protected method `_wkidToDisplay` for testing.)
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  wkidToDisplay(wkid: number): Promise<string>;
  /**
   * Returns the spatial reference description of the supplied value.
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  protected _createSpatialRefDisplay(value: string): ISpatialRefRepresentation;
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
   * Stores the wkid as the components value.
   */
  protected _setSpatialRef(wkid: string): void;
  /**
   * Converts a WKID into a spatial reference description.
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  protected _wkidToDisplay(wkid: number): string;
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
   * Select the first child on Enter key click
   * OR
   * Clear any selection while user is entering values and use the default wkid
   *
   * @param event The keyboard event
   */
  protected _inputKeyDown(event: KeyboardEvent): void;
  /**
   * Clear any selected items in the elements tree.
   *
   */
  protected _clearSelection(): void;
  /**
   * Select the first child from the tree.
   *
   * @param autoFocus Boolean to indicate if focus should also be shifted to the first child.
   *
   */
  protected _selectFirstChild(autoFocus: boolean): void;
  /**
   * Set the search text State and cause render.
   *
   * @param event the event to get the value from
   *
   */
  protected _searchSpatialReferences(event: CustomEvent): void;
  /**
   * Get the tree items for the current spatial reference search
   *
   */
  protected _getTreeContent(): VNode;
  /**
   * Get the individual spatial reference tree item
   *
   * @param wkid The wkid for the spatial reference that will be displayed.
   * @param selected Should the item be selected by default.
   *
   */
  protected _getTreeItem(wkid: string, selected: boolean): VNode;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
