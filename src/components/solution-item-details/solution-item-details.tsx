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

import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";

@Component({
  tag: 'solution-item-details',
  styleUrl: 'solution-item-details.css',
  shadow: false,
})
export class SolutionItemDetails {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  @Prop({ mutable: true }) translations: any = {
    "editThumbnail": "Edit Thumbnail",
    "description": "Description",
    "tags": "Tags",
    "credits": "Credits",
    "termsOfUse": "Terms of Use",
    "snippetCountPattern": "{{n}} of 250"
  };

  @Prop({ mutable: true }) value: any = {};

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="parent-container">
          <div class="inputBottomSeparation">
            <calcite-input id="item-name"></calcite-input>
          </div>

          <div class="inputBottomSeparation">

            <input id="browse-for-thumbnail" class="display-none" type="file" accept=".jpg,.gif,.png,image/jpg,image/gif,image/png" />

            <button id="item-thumbnail-label" data-action="thumbnail" data-edit-id="thumbnail" class="font-size--3 btn-link inline-block">
              <svg viewBox="0 0 16 16" width="16" height="16" class="icon-inline icon-inline--on-left">
                <path d="M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z"></path>
              </svg> {this.translations.editThumbnail}
            </button>

            <div class="flex">
              <div class="img-container">
                <img id="item-image" class="scale-down" width="200" height="133" />
              </div>
              <div class="summary-count-container">
                <calcite-input id="item-summary" ref={(el) => {this.itemSummary = el; el.maxlength = 250;}} type="textarea"></calcite-input>
                <label id="item-summary-count" ref={(el) => (this.itemSummaryCount = el)} class="font-size--3"></label>
              </div>
            </div>
          </div>

          <calcite-label>{this.translations.description}
            <label id="item-description-label">
              <calcite-input id="item-description" type="textarea"></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>{this.translations.tags}
            <label id="item-tags-label">
              <calcite-input id="item-tags"></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>{this.translations.credits}
            <label id="item-credits-label">
              <calcite-input id="item-credits"></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>
            <label id="item-terms-label">{this.translations.termsOfUse}
              <calcite-input id="item-terms" type="textarea"></calcite-input>
            </label>
          </calcite-label>
        </div>
      </Host>
    );
  }

  componentDidLoad(): void {
    /*
    this.itemSummaryLengthHandler = this.itemSummaryLengthHandler || this._getNode('#item-summary')
      .addEventListener('calciteInputInput', () => this._updateLengthLabel());

    this.itemThumbnailClickHandler = this._getNode('#item-thumbnail-label')
      .addEventListener('click', () => this._getThumbnail());

    this.thumbnailUploadHandler = this._getNode('#browse-for-thumbnail')
      .addEventListener('change', () => this._updateThumbnail());
    */
  }

  /**
   * Removes event handlers when the component is removed
   *
   */
  disconnectedCallback(): void {
    /*
    this._getNode('#item-summary').removeEventListener(
      'calciteInputInput', this.itemSummaryLengthHandler);

    this._getNode('#item-thumbnail-label').removeEventListener(
      'click', this.itemThumbnailClickHandler);

    this._getNode('#browse-for-thumbnail').removeEventListener(
      'change', this.thumbnailUploadHandler);
    */
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  itemJson: any;
  itemSummary: HTMLCalciteInputElement;
  itemSummaryCount: HTMLLabelElement;
  /*itemSummaryLengthHandler: any;
  itemThumbnailClickHandler: any;
  thumbnailUploadHandler: any;*/

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("calciteInputInput")
  itemSummaryLengthHandler(event: any): void {
    console.log("calciteInputInput event", event);//???
    this._updateLengthLabel();
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
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported
   *
   */
  _updateLengthLabel(): void {
    console.log("_updateLengthLabel");//???
    //const summaryText = this._getNode("#item-summary");
    //const summaryTextCount = this._getNode("#item-summary-count");
    this.itemSummaryCount.innerText =
      this.translations.snippetCountPattern.replace("{{n}}", this.itemSummary.value.length.toString());
  }

  /**
   * Open image file browse dialog
   *
   */
  _getThumbnail(): void {
    console.log("_updateLengthLabel");
    /*
    this._getNode('#browse-for-thumbnail').click();
    */
  }

  /**
   * Get and display image result from browse
   *
   */
  _updateThumbnail(
    //evt: any
  ): void {
    console.log("_updateLengthLabel");
    /*
    const files = evt.currentTarget.files;
    const img = this._getNode('#item-image');
    if (files && files[0] && img) {
      var reader = new FileReader();
      reader.onloadend = () => {
        img.src = reader.result;
      }
      reader.readAsDataURL(files[0]);
    }
    */
  }

  /**
   * Get an element based on id
   *
   */
  _getNode(
    id: string
  ): any {
    return document.getElementById(id);
  }

}
