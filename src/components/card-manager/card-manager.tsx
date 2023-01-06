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

import { Component, Element, Host, h, State } from '@stencil/core';
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

// TODO maybe just move to the manager component directly

@Component({
  tag: 'card-manager',
  styleUrl: 'card-manager.css',
  shadow: true,
})
export class CardManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCardManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof CardManager_T9n;

  protected _showInfoCard;

  protected _showMediaCard;

  protected _showCommentsCard;

  protected _fakeValues;

  protected _fakeInfos;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    await this._getTranslations();

    const href = window.location.href;
    const url = href.substring(0, href.lastIndexOf('/'));
    const img = `${url}/data/generic.png`;
    this._fakeValues = [{
      name: "Filename.png",
      description: "This is an example of what a media description looks like.",
      url: img
    }, {
      name: "Filename2.png",
      description: "Another example of what a media description looks like.",
      url: img
    }, {
      name: "Filename3.png",
      description: "And another example of a media description.",
      url: img
    }];
    this._fakeInfos = {
      "Details": "Details info goes here",
      "Name": "Name here",
      "Phone": "(000) 000-0000",
      "Email": "example@gmail.com",
      "Date": "May 11, 2022"
    };
  }

  render() {
    // const mediaCardClass =;
    // const infoCardClass = "";
    return (
      <Host>
        <div class="display-inline-table">
          <div class="w-100 display-flex padding-bottom-1">
            <calcite-button appearance='outline' class="w-1-2">{this._translations.information}</calcite-button>
            <calcite-button class="w-1-2">{this._translations.media}</calcite-button>
            {/* <calcite-button>{this._translations.comments}</calcite-button> */}
          </div>
          <div>
            <media-card class="" values={this._fakeValues} />
            <info-card class="display-none" values={this._fakeInfos} />
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof CardManager_T9n;
  }

}
