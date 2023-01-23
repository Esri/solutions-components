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
import '@esri/calcite-components';
import SolutionItemDetails_T9n from '../../assets/t9n/solution-item-details/resources.json';
import { IItemGeneralized } from '@esri/solution-common';
import { IItemTemplateEdit } from '../../utils/interfaces';
export declare class SolutionItemDetails {
  el: HTMLSolutionItemDetailsElement;
  /**
   * A template's itemId.
   */
  itemId: string;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  componentWillRender(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  componentDidRender(): void;
  /**
   * Handle to the element for browsing for a file.
   */
  protected browseForThumbnail: HTMLInputElement;
  itemDetails: IItemGeneralized;
  protected itemEdit: IItemTemplateEdit;
  protected itemType: string;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof SolutionItemDetails_T9n;
  /**
   * Handle to the snippet character-count feedback.
   */
  protected itemSnippetCount: HTMLLabelElement;
  /**
   * Handle to the thumbnail image display.
   */
  protected thumbnail: HTMLImageElement;
  /**
   * Handle to the thumbnail image container.
   */
  protected thumbnailContainer: HTMLElement;
  /**
   * Updates the component's value with changes to the input fields.
   */
  inputReceivedHandler(event: any): void;
  /**
   * Opens image file browse dialog.
   *
   */
  protected _getThumbnail(): void;
  /**
   * Load the templates thumbnail
   *
   */
  protected _loadThumb(): void;
  /**
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported.
   *
   * @param phrase the current phrase from the control
   */
  protected _updateLengthLabel(phrase: string): void;
  /**
   * Add or remove the value from the store
   */
  protected _updateStore(): void;
  /**
   * Gets and displays image result from browse and updates the item in the store.
   *
   * @param event The input controls event that contains the new file
   * @param updateStore boolean that controls if the new value is written to the store
   *  should be false on the initial load but true the rest of the time
   */
  protected _updateThumbnail(event: any): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
