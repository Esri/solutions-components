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

import { Component, Element, h, Host, Listen, Prop, State, VNode } from '@stencil/core';
import '@esri/calcite-components';
import state from '../../utils/editStore';
import { getProp } from '@esri/solution-common';
import { IItemDetails } from '../../utils/interfaces';
import SolutionItemDetails_T9n from '../../assets/t9n/solution-item-details/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

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
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: IItemDetails = {
    title: "",
    snippet: "",
    description: "",
    tags: [],
    accessInformation: "",
    licenseInfo: "",
    itemId: ""
  };

  /**
   * Contains the public type for this component.
   */
  @Prop({ mutable: true, reflect: true }) type = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidLoad() {
    this._getTranslations();
  }

  componentDidRender() {
    if (this.loadThumb) {
      this.loadThumb = false;
      this._loadThumb(this.value.itemId)
    }
  }

  render(): VNode {
    this._validateValue();
    return (
      <Host>
        <div class="parent-container">
          <div class="inputBottomSeparation">
            <calcite-input id="item-title" value={this.value.title} />
          </div>

          <div class="inputBottomSeparation">

            <input accept=".jpg,.gif,.png,image/jpg,image/gif,image/png" class="display-none" onChange={(event) => (this._updateThumbnail(event, true))} ref={(el) => (this.browseForThumbnail = el)} type="file" />

            <button class="font-size--3 btn-link inline-block trailer-quarter" onClick={() => this._getThumbnail()}>
              <svg class="icon-inline icon-inline--on-left" height="16" viewBox="0 0 16 16" width="16">
                <path d="M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" />
              </svg>{this.translations.editThumbnail}
            </button>

            <div class="flex">
              <div class="img-container">
                <img class="scale-down" height="133" ref={(el) => (this.thumbnail = el)} width="200" />
              </div>
              <div class="snippet-count-container">
                <calcite-input id="item-snippet" maxlength={250} type="textarea" value={this.value.snippet} />
                <label class="font-size--3" id="item-snippet-count" ref={(el) => (this.itemSnippetCount = el)} />
              </div>
            </div>
          </div>

          <calcite-label>{this.translations.description}
            <label id="item-description-label">
              <calcite-input id="item-description" type="textarea" value={this.value.description} />
            </label>
          </calcite-label>

          <calcite-label>{this.translations.tags}
            <label id="item-tags-label">
              <calcite-input id="item-tags" value={(this.value.tags && Array.isArray(this.value.tags) ? this.value.tags : [this.value.tags]).join(",")} />
            </label>
          </calcite-label>

          {this.type !== "Group" ? <calcite-label>{this.translations.credits}
            <label id="item-credits-label">
              <calcite-input id="item-credits" value={this.value.accessInformation} />
            </label>
          </calcite-label> : null}

          {this.type !== "Group" ? <calcite-label>
            <label id="item-terms-label">{this.translations.termsOfUse}
              <calcite-input id="item-terms" type="textarea" value={this.value.licenseInfo} />
            </label>
          </calcite-label> : null}

        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() translations: typeof SolutionItemDetails_T9n;

  /**
   * Handle to the element for browsing for a file.
   */
  private browseForThumbnail: HTMLInputElement;

  /**
   * Handle to the snippet character-count feedback.
   */
  private itemSnippetCount: HTMLLabelElement;

  /**
   * Handle to the thumbnail image display.
   */
  private thumbnail: HTMLImageElement;

  private loadThumb = false;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionItemSelected", { target: 'window' })
  _solutionItemSelected(event: CustomEvent): void {
    this.value = event.detail.itemDetails;
    this._loadThumb(event?.detail?.itemId);
  }

  /**
   * Updates the component's value with changes to the input fields.
   */
  @Listen("calciteInputInput")
  inputReceivedHandler(event: any): void {
    switch (event.target.id) {
      case "item-title":
        this.value.title = event.target.value;
        this._updateStore("title", event.target.value);
        break;
      case "item-snippet":
        this.value.snippet = event.target.value;
        this._updateLengthLabel(this.value.snippet);
        this._updateStore("snippet", event.target.value);
        break;
      case "item-description":
        this.value.description = event.target.value;
        this._updateStore("description", event.target.value);
        break;
      case "item-tags":
        this.value.tags = event.target.value;
        this._updateStore("tags", event.target.value);
        break;
      case "item-credits":
        this.value.accessInformation = event.target.value;
        this._updateStore("accessInformation", event.target.value);
        break;
      case "item-terms":
        this.value.licenseInfo = event.target.value;
        this._updateStore("licenseInfo", event.target.value);
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
   * Load the templates thumbnail 
   * 
   * @param id the current template is
   *
   */
  private _loadThumb(id: string): void {
    if (id) {
      const thumbnailNew = getProp(state, `models.${id}.thumbnailNew`);
      const thumbnailOrigin = getProp(state, `models.${id}.thumbnailOrigin`);
      if (this.thumbnail) {
        this.thumbnail.src = (thumbnailNew || thumbnailOrigin) ?
          URL.createObjectURL(thumbnailNew || thumbnailOrigin) : "";
      } else {
        this.loadThumb = true;
      }
    }
  }

  /**
   * Opens image file browse dialog.
   *
   */
  private _getThumbnail(): void {
    this.browseForThumbnail.click();
  }

  /**
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported.
   *
   * @param phrase the current phrase from the control
   */
  private _updateLengthLabel(phrase: string): void {
    this.itemSnippetCount.innerText =
      this.translations.snippetCountPattern.replace("{{n}}", phrase.length.toString());
  }

  /**
   * Gets and displays image result from browse.
   * 
   * @param event The input controls event that contains the new file
   * @param updateStore boolean that controls if the new value is written to the store
   *  should be false on the initial load but true the rest of the time
   */
  private _updateThumbnail(
    event: any,
    updateStore: boolean
  ): void {
    const files = event.target.files;
    if (files && files[0]) {
      if (this.thumbnail) {
        this.thumbnail.src = URL.createObjectURL(files[0]);
      }
      if (updateStore) {
        this._updateStore("thumbnailNew", files[0]);
      }
    }
  }

  /**
   * Use the value from the store if it exists
   *
   */
  private _validateValue(): void {
    const m: any = getProp(state, `models.${this.value.itemId}`);
    if (m) {
      Object.keys(this.value).forEach(k => {
        if (m.updateItemValues.hasOwnProperty(k)) {
          this.value[k] = m.updateItemValues[k];
        } else if (m.originalItemValues.hasOwnProperty(k)) {
          this.value[k] = m.originalItemValues[k];
        }
      });
    }
  }

  /**
   * Add or remove the value from the store
   *
   * @param prop The model prop to update with new values
   * @param v The new value to store
   */
  private _updateStore(
    prop: string,
    v: string
  ): void {
    const model: any = getProp(state, `models.${this.value.itemId}`);
    if (prop === "thumbnailNew") {
      model[prop] = v;
    } else if (model.itemOriginValue) {
      const item = JSON.parse(model.itemOriginValue);
      if (item.hasOwnProperty(prop)) {
        // store when it matches
        if (item[prop] !== v) {
          if (!model.originalItemValues.hasOwnProperty(prop)) {
            model.originalItemValues[prop] = item[prop];
          }
          model.updateItemValues[prop] = v;
        } else {
          // remove when it doesn't
          delete (model.updateItemValues[prop]);
        }
      }
    }
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof SolutionItemDetails_T9n;
  }
}
