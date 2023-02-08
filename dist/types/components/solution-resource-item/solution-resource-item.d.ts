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
import { VNode } from '../../stencil-public-runtime';
import { IResourcePath } from '../../utils/interfaces';
import { UserSession } from '@esri/solution-common';
import SolutionResourceItem_T9n from '../../assets/t9n/solution-resource-item/resources.json';
export declare class SolutionResourceItem {
  el: HTMLSolutionResourceItemElement;
  /**
   * Credentials for requests
   */
  authentication: UserSession;
  /**
   * A template's itemId.
   * This is used to get the correct model from a store in the json-editor
   */
  itemId: string;
  itemIdWatchHandler(): void;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * The templates resourceFilePaths.
   */
  resourceFilePaths: IResourcePath[];
  /**
   * The templates resources.
   */
  resources: string[];
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof SolutionResourceItem_T9n;
  protected _removedResources: any;
  /**
   * Render resources while avoiding thumbnail resoures that are managed by solution-item
   *
   */
  _renderResourceList(): HTMLCalciteValueListElement;
  /**
   * Render the resource and supporting actions for download/update/delete/(reset..if deleted)
   *
   * @param resource the filename and url used to interact with the resource
   */
  _renderResource(resource: IResourcePath): HTMLCalciteValueListItemElement;
  /**
   * Adds the name to the deleted array so it will be skipped while rendering
   *  but still exist if the user chooses to reset
   *
   * @param resource the resource to be updated
   */
  _delete(resource: IResourcePath): void;
  /**
   * Remove the name from the deleted array so it will again be rendered
   *
   * @param name the name to be added to the deleted array
   */
  _reset(name: string): void;
  /**
   * Download all of the templates resources
   *
   */
  _downloadAll(): void;
  /**
   * Download the current resource
   *
   * @param url the resource url
   * @param name the resource name
   */
  _download(url: string, name: string): void;
  /**
   * Dynamically creates an anchor and downloads the file
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  downloadFile(url: string, name: string): void;
  /**
   * Check if the template resources have any non-thumbnail resources
   *
   * @returns true if we have data resources and false if only thumbnail
   */
  _hasValidResources(): boolean;
  /**
   * Fetches and downloads the resource from the solution
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  fetchAndDownload(url: string, name: string): Promise<void>;
  /**
   * Create an input element to support the uploading of the resource and upload the resource
   *
   * @param resource the resource to be updated
   */
  _upload(resource: IResourcePath): void;
  /**
   * Create an input element to support the uploading of a resource and add the new resource
   *
   */
  _addNewResource(): void;
  /**
   * Replace the resource file path when update action is used
   *
   * @param resourcePath the resource to be updated
   * @param event the input event that contains the file
   */
  _updateResource(resourcePath: IResourcePath, event: any): void;
  /**
   * Add the new resource to the resource file paths
   *
   * @param event the inputs event that contains the new file
   */
  _add(event: any): void;
  /**
   * Add or remove the value from the store
   */
  protected _updateStore(): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
