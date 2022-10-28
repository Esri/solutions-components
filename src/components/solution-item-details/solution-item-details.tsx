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

import { Component, Element, h, Host, Listen, Prop, State, VNode, Watch } from '@stencil/core';
import '@esri/calcite-components';
import state from "../../utils/solution-store";
import SolutionItemDetails_T9n from '../../assets/t9n/solution-item-details/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';
import { IItemGeneralized } from '@esri/solution-common';
import { IItemTemplateEdit } from '../../utils/interfaces';

@Component({
  tag: 'solution-item-details',
  styleUrl: 'solution-item-details.scss',
  shadow: false,
})
export class SolutionItemDetails {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionItemDetailsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * A template's itemId.
   */
  @Prop({ mutable: true, reflect: true }) itemId = "";

  @Watch("itemId") itemIdWatchHandler(): void {
    this.itemEdit = state.getItemInfo(this.itemId);
    this.itemDetails = this.itemEdit.item;
    this.itemType = this.itemDetails.type;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  componentDidRender(): void {
    this._loadThumb()
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="parent-container">
          <div class="inputBottomSeparation">
            <calcite-input id="item-title" value={this.itemDetails.title} />
          </div>

          <div class="inputBottomSeparation">

            <input accept=".jpg,.gif,.png,image/jpg,image/gif,image/png" class="display-none" onChange={(event) => (this._updateThumbnail(event))} ref={(el) => (this.browseForThumbnail = el)} type="file" />

            <button class="font-size--3 btn-link inline-block trailer-quarter" onClick={() => this._getThumbnail()}>
              <svg class="icon-inline icon-inline--on-left" height="16" viewBox="0 0 16 16" width="16">
                <path d="M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" />
              </svg>{this._translations.editThumbnail}
            </button>

            <div class="flex">
              <div class="img-container" ref={(el) => (this.thumbnailContainer = el)}>
                <img class="scale-down" height="133" id="item-thumbnail" ref={(el) => (this.thumbnail = el)} width="200" />
              </div>
              <div class="snippet-count-container">
                <calcite-input id="item-snippet" maxlength={250} type="textarea" value={this.itemDetails.snippet} />
                <label class="font-size--3" id="item-snippet-count" ref={(el) => (this.itemSnippetCount = el)} />
              </div>
            </div>
          </div>

          <calcite-label>{this._translations.description}
            <label id="item-description-label">
              <calcite-input id="item-description" type="textarea" value={this.itemDetails.description} />
            </label>
          </calcite-label>

          <calcite-label>{this._translations.tags}
            <label id="item-tags-label">
              <calcite-input id="item-tags" value={(this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",")} />
            </label>
          </calcite-label>

          {this.itemType !== "Group" ? <calcite-label>{this._translations.credits}
            <label id="item-credits-label">
              <calcite-input id="item-credits" value={this.itemDetails.accessInformation} />
            </label>
          </calcite-label> : null}

          {this.itemType !== "Group" ? <calcite-label>
            <label id="item-terms-label">{this._translations.termsOfUse}
              <calcite-input id="item-terms" type="textarea" value={this.itemDetails.licenseInfo} />
            </label>
          </calcite-label> : null}

        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Handle to the element for browsing for a file.
   */
  protected browseForThumbnail: HTMLInputElement;

  @State() itemDetails: IItemGeneralized = {
    accessInformation: "",
    description: "",
    licenseInfo: "",
    snippet: "",
    tags: [],
    title: ""
  } as any;

  @State() protected itemEdit: IItemTemplateEdit;

  protected itemType: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof SolutionItemDetails_T9n;

  /**
   * Handle to the snippet character-count feedback.
   */
  protected itemSnippetCount: HTMLLabelElement;

  /**
   * Handle to the thumbnail image display.
   */
  @State() protected thumbnail: HTMLImageElement;

  /**
   * Handle to the thumbnail image container.
   */
  @State() protected thumbnailContainer: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  /**
   * Updates the component's value with changes to the input fields.
   */
  @Listen("calciteInputInput")
  inputReceivedHandler(event: any): void {
    switch (event.target.id) {
      case "item-title":
        this.itemDetails.title = event.target.value;
        this._updateStore();
        break;
      case "item-snippet":
        if (event.target.value.length > 250) {
          event.target.value = event.target.value.substring(0, 250);
        }
        this.itemDetails.snippet = event.target.value;
        this._updateLengthLabel(this.itemDetails.snippet);
        this._updateStore();
        break;
      case "item-description":
        this.itemDetails.description = event.target.value;
        this._updateStore();
        break;
      case "item-tags":
        this.itemDetails.tags = event.target.value;
        this._updateStore();
        break;
      case "item-credits":
        this.itemDetails.accessInformation = event.target.value;
        this._updateStore();
        break;
      case "item-terms":
        this.itemDetails.licenseInfo = event.target.value;
        this._updateStore();
        break;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Opens image file browse dialog.
   *
   */
  protected _getThumbnail(): void {
    this.browseForThumbnail.click();
  }

  /**
   * Load the templates thumbnail
   *
   */
  protected _loadThumb(): void {
    if (this.thumbnail && this.itemEdit?.thumbnail) {
      // Show the thumbnail
      this.thumbnail.src = URL.createObjectURL(this.itemEdit.thumbnail);
      this.thumbnailContainer.classList.remove("empty-box");
      this.thumbnail.classList.remove("display-none");
    } else {
      // Replace the thumbnail with an empty box
      this.thumbnailContainer.classList.add("empty-box");
      this.thumbnail.classList.add("display-none");
    }
  }

  /**
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported.
   *
   * @param phrase the current phrase from the control
   */
  protected _updateLengthLabel(phrase: string): void {
    this.itemSnippetCount.innerText =
      this._translations.snippetCountPattern.replace("{{n}}", phrase.length.toString());
  }

  /**
   * Add or remove the value from the store
   */
  protected _updateStore(
  ): void {
    this.itemEdit = state.getItemInfo(this.itemId);
    this.itemEdit.item = this.itemDetails;
    state.setItemInfo(this.itemEdit);
  }

  /**
   * Gets and displays image result from browse and updates the item in the store.
   *
   * @param event The input controls event that contains the new file
   * @param updateStore boolean that controls if the new value is written to the store
   *  should be false on the initial load but true the rest of the time
   */
  protected _updateThumbnail(
    event: any
  ): void {
    const files = event.target.files;
    if (files && files[0]) {
      if (this.thumbnail) {
        // Update UI
        this.thumbnail.src = URL.createObjectURL(files[0]);

        // Update info in store
        this.itemEdit = state.getItemInfo(this.itemId);
        this.itemEdit.thumbnail = files[0];
        state.replaceItemThumbnail(this.itemEdit);
      }
    }
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionItemDetails_T9n;
  }
}
