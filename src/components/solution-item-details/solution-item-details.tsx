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

import { Component, Element, h, Host, Listen, Prop, VNode } from '@stencil/core';
import "@esri/calcite-components";

export interface IItemDetails {
  thumbnail: string;
  title: string;
  snippet: string;
  description: string;
  tags: string[];
  credits?: string;
  termsOfUse?: string;
}

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

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: IItemDetails = {
    thumbnail: null,
    title: "",
    snippet: "",
    description: "",
    tags: [],
    credits: "",
    termsOfUse: ""
  };

  @Prop({ mutable: true, reflect: true }) type: string = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <div class="parent-container">
          <div class="inputBottomSeparation">
            <calcite-input id="item-title" value={this.value.title}></calcite-input>
          </div>

          <div class="inputBottomSeparation">

            <input ref={(el) => (this.browseForThumbnail = el)} onChange={(event) => (this._updateThumbnail(event))} class="display-none" type="file" accept=".jpg,.gif,.png,image/jpg,image/gif,image/png" />

            <button onClick={() => this._getThumbnail()} class="font-size--3 btn-link inline-block">
              <svg viewBox="0 0 16 16" width="16" height="16" class="icon-inline icon-inline--on-left">
                <path d="M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z"></path>
              </svg> {this.translations.editThumbnail}
            </button>

            <div class="flex">
              <div class="img-container">
                <img ref={(el) => (this.thumbnail = el)} class="scale-down" width="200" height="133" />
              </div>
              <div class="snippet-count-container">
                <calcite-input id="item-snippet" maxlength={250} type="textarea" value={this.value.snippet}></calcite-input>
                <label id="item-snippet-count" ref={(el) => (this.itemSnippetCount = el)} class="font-size--3"></label>
              </div>
            </div>
          </div>

          <calcite-label>{this.translations.description}
            <label id="item-description-label">
              <calcite-input id="item-description" type="textarea" value={this.value.description}></calcite-input>
            </label>
          </calcite-label>

          <calcite-label>{this.translations.tags}
            <label id="item-tags-label">
              <calcite-input id="item-tags" value={(this.value.tags || []).join(",")}></calcite-input>
            </label>
          </calcite-label>

          {this.type !== "Group" ? <calcite-label>{this.translations.credits}
            <label id="item-credits-label">
              <calcite-input id="item-credits" value={this.value.credits}></calcite-input>
            </label>
          </calcite-label> : null}

          {this.type !== "Group" ? <calcite-label>
            <label id="item-terms-label">{this.translations.termsOfUse}
              <calcite-input id="item-terms" type="textarea" value={this.value.termsOfUse}></calcite-input>
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
    switch(event.target.id) {
    case "item-title":
      this.value.title = event.target.value;
      break;
    case "item-snippet":
      this.value.snippet = event.target.value;
      this._updateLengthLabel(this.value.snippet);
      break;
    case "item-description":
      this.value.description = event.target.value;
      break;
    case "item-tags":
      this.value.tags = event.target.value;
      break;
    case "item-credits":
      this.value.credits = event.target.value;
      break;
    case "item-terms":
      this.value.termsOfUse = event.target.value;
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
  private _getThumbnail(): void {
    console.log("_getThumbnail");
    this.browseForThumbnail.click();
  }

  /**
   * Updates the length label to reflect the current number of characters
   * relative to the max number of characters supported.
   *
   */
  private _updateLengthLabel(phrase: string): void {
    this.itemSnippetCount.innerText =
      this.translations.snippetCountPattern.replace("{{n}}", phrase.length.toString());
  }

  /**
   * Gets and displays image result from browse.
   *
   */
  private _updateThumbnail(
    event: any
  ): void {
    console.log("_updateThumbnail");
    const files = event.currentTarget.files;
    if (files && files[0]) {
      var reader = new FileReader();
      reader.onloadend = () => {
        this.thumbnail.src = reader.result as string;
      }
      reader.readAsDataURL(files[0]);
    }
  }

}