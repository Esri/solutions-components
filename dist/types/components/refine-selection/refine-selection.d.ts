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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import { ESelectionMode, ISelectionSet } from "../../utils/interfaces";
import RefineSelection_T9n from "../../assets/t9n/refine-selection/resources.json";
export declare class RefineSelection {
  el: HTMLRefineSelectionToolsElement;
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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  mapView: __esri.MapView;
  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  selectionSets: ISelectionSet[];
  GraphicsLayer: any;
  SketchViewModel: any;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof RefineSelection_T9n;
  /**
   * boolean: Indicates if any new graphics should be added or removed
   */
  protected _addEnabled: boolean;
  /**
   * HTMLRefineSelectionToolsElement: The html element for the refine selection tools
   */
  protected _refineTools: HTMLRefineSelectionToolsElement;
  /**
   * Called each time the addresseeLayer is changed.
   * Add a new clean refine set for the new addressee layer.
   */
  addresseeLayerWatchHandler(): void;
  /**
   * Emitted on demand when selection sets change.
   *
   */
  selectionSetsChanged: EventEmitter<ISelectionSet[]>;
  /**
   * Handles changes to refine selection ids.
   *
   */
  refineSelectionIdsChange(event: CustomEvent): void;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Store the Add/Remove mode
   *
   * @protected
   */
  protected _modeChanged(evt: CustomEvent): void;
  /**
   * Set the refine tools selection mode
   *
   * @protected
   */
  protected _setSelectionMode(mode: ESelectionMode): void;
  /**
   * Create a list to show the number added/removed/total unique selected
   *
   * @returns the list node
   * @protected
   */
  protected _getRefineSelectionSetList(): VNode[];
  /**
   * Fetch the refine selection set
   *
   * @returns the refine selection set
   * @protected
   */
  protected _getRefineSelectionSet(selectionSets: ISelectionSet[]): ISelectionSet;
  /**
   * Remove ids from existing selection sets.
   * Remove any selection sets than have no selected ids
   * This can update any selection set not just the refine set.
   * We do not do something similar for adds as we will only ever add from refine tools to the single REFINE selection set.
   *
   * @param removeIds the ids to remove
   *
   * @protected
   */
  protected _updateSelectionSets(removeIds: number[]): void;
  /**
   * Update the refine selection set with any adds or removes
   *
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected _updateRefineSelectionSet(addIds: number[], removeIds: number[]): void;
  /**
   * Update the ids stored for the refine selection set
   *
   * @param selectionSet the refine selection set
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns updated selection sets
   * @protected
   */
  protected _updateRefineIds(selectionSet: ISelectionSet, addIds: number[], removeIds: number[]): ISelectionSet[];
  /**
   * Add a new refine selection set
   *
   * @returns updated selection sets
   * @protected
   */
  protected _initRefineSelectionSet(selectionSets: ISelectionSet[]): ISelectionSet[];
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
  /** Provides access to protected methods for unit testing.
 *
 *  @param methodName Name of protected method to run
 *  @param arg1 First argument to forward to method, e.g., for "_modeChanged", `ESelectionMode`
 *  @returns
 */
  _testAccess(methodName: string, arg1?: any): any;
}
