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
import { IFeatureServiceEnabledStatus, IItemShare, IItemTemplateEdit, IResourcePath, ISolutionSpatialReferenceInfo } from './interfaces';
import { IItemTemplate, UserSession } from '@esri/solution-common';
declare class SolutionStore {
  protected static _instance: SolutionStore;
  protected _store: any;
  protected _hasChanges: boolean;
  protected _authentication: UserSession;
  /**
   * Creates singleton instance when accessed; default export from module.
   *
   * @returns Static instance of the class
   */
  static get Store(): SolutionStore;
  /**
   * Creates an empty store.
   *
   * @protected
   */
  protected constructor();
  /**
   * Returns the stored information of an item.
   *
   * @param itemId Id of item to fetch
   *
   * @returns Item information or `undefined` if not found
   */
  getItemInfo(itemId: string): IItemTemplateEdit;
  /**
   * Returns a top-level store property: solutionItemId, defaultWkid, etc.
   *
   * @param propName Name of property
   *
   * @returns Value of property
   */
  getStoreInfo(propName: string): any;
  /**
   * Loads a Solution into the store from AGO.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns Promise that resolves when task is done
   */
  loadSolution(solutionItemId: string, authentication: UserSession): Promise<void>;
  /**
   * Queues the replacement of the thumbnail associated with a template item in the store.
   *
   * @param itemEdit Details of the template to modify, containing the new thumbnail in the `thumbnail`
   * property
   */
  replaceItemThumbnail(itemEdit: IItemTemplateEdit): void;
  /**
   * Writes a Solution into AGO from the store. Must use `loadSolution` to continue with solution.
   *
   * @returns Promise that resolves when task is done
   */
  saveSolution(): Promise<void>;
  /**
   * Stores information for item.
   *
   * @param itemEdit Item information
   */
  setItemInfo(itemEdit: IItemTemplateEdit): void;
  /**
   * Sets a top-level store property: solutionItemId, defaultWkid, etc.
   *
   * @param propName Name of property
   * @param value Value of property
   */
  setStoreInfo(propName: string, value: any): void;
  /** Provides access to protected methods for unit testing.
   *
   *  @param methodName Name of protected method to run
   *  @param arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
   *  @param arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
   *  @param arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
   *
   *  @returns
   */
  _testAccess(methodName: string, arg1?: any, arg2?: any, arg3?: any): any;
  /**
   * Returns the store to the empty state.
   *
   * @protected
   */
  protected _emptyTheStore(): void;
  /**
   * Sets the store's flag indicating if it has changes and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasChanges Current state of change in the store; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  protected _flagStoreHasChanges(flagHasChanges: boolean): void;
  /**
   * Gets a list of Feature Services that are not views.
   *
   * @param templates A list of item templates from the solution
   *
   * @returns a list of feature services
   *
   * @protected
   */
  protected _getCustomizableFeatureServices(templates: IItemTemplate[]): IItemTemplate[];
  /**
   * Gets a list of Feature Services that are not views along with an enabled property that indicates
   * if the service currently uses a spatial reference variable.
   *
   * @param templates A list of item templates from the solution
   *
   * @returns a list of feature service names and an enabled property to indicate
   * if they currently use a spatial reference variable.
   *
   * @protected
   */
  protected _getFeatureServices(templates: IItemTemplate[]): IFeatureServiceEnabledStatus[];
  /**
   * Capture the key item details for a given group template
   *
   * @param template one of the templates from the current solution
   * @param templates full list of templates
   *
   * @returns a list of IItemShare objects
   *
   * @protected
   */
  protected _getItemsSharedWithThisGroup(template: IItemTemplate, templates: IItemTemplate[]): IItemShare[];
  /**
   * Generate storage file paths from the solution template
   *
   * @param solutionId the id of the current solution
   * @param template the current template from the solution
   * @param portal Portal where file is to be found
   *
   * @returns a list of resource file infos
   *
   * @protected
   */
  protected _getResourceFilePaths(solutionId: string, template: any, portal: string): IResourcePath[];
  /**
   * Generates a resource name from a storage file path.
   *
   * @param templateItemId The id of the template item whose resource this is; used as a prefix in the resource name
   * @param resourcePath Resource file infos
   *
   * @returns The resource name to use when attaching a resource to the item.
   *
   * @protected
   */
  protected _getResourceStorageName(templateItemId: string, resourcePath: IResourcePath): string;
  /**
   * Extracts basic spatial reference information that is used to determine if a custom spatial reference parameter will
   * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
   *
   * @param services a list of objects with service name and enabled property (indicates if they currently use a spatial reference var)
   * @param data the data object of a solution item
   *
   * @returns an object that stores if a custom spatial reference parameter is enabled/disabled,
   * a list of services and if they are enabled/disabled, and the default wkid
   *
   * @protected
   */
  protected _getSpatialReferenceInfo(services: any[], defaultWkid: string | number): ISolutionSpatialReferenceInfo;
  /**
   * Create and store template items for the editor.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param templates A list of item templates from the solution
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns a promise that resolves when the templates are ready
   *
   * @protected
   */
  protected _prepareSolutionItemsForEditing(solutionItemId: string, templates: IItemTemplate[], authentication: UserSession): Promise<void>;
  /**
   * Prepares template items for sending to AGO by updating the resources held by the solution item.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param templates A list of item templates from the solution
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns a promise that resolves when the templates are ready
   *
   * @protected
   */
  protected _prepareSolutionItemsForStorage(solutionItemId: string, templates: IItemTemplateEdit[], authentication: UserSession): Promise<void>;
  /**
   * Stores basic spatial reference information that is used to determine if a custom spatial reference parameter will
   * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
   *
   * @param spatialReferenceInfo The configuration settings for a custom spatial reference
   * @param templates The templates in the current solution, which will be updated in place if
   * `spatialReferenceInfo.enabled` is true
   *
   * @returns The new default wkid
   *
   * @protected
   */
  protected _setSpatialReferenceInfo(spatialReferenceInfo: ISolutionSpatialReferenceInfo, templates: IItemTemplateEdit[]): string | number;
  /**
   * Splits a pathed filename into a last term and a prefix; e.g., "a/b/c" returns "c" with a prefix of "a/b".
   *
   * @param filename Filename with optional path
   *
   * @returns An object consisting of a `prefix` (undefined if `filename` does not contain a path) and a `suffix`--the
   * filename at the end of a path
   *
   * @protected
   */
  protected _splitFilename(filename: string): {
    prefix: string;
    suffix: string;
  };
}
declare const _default: SolutionStore;
export default _default;
