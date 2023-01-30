/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { Host, h } from '@stencil/core';
import { getLocaleComponentStrings } from "../../utils/locale";
// TODO maybe just move to the manager component directly
export class CardManager {
  constructor() {
    this._translations = undefined;
  }
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
  async componentWillLoad() {
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
    return (h(Host, null, h("div", { class: "display-inline-table" }, h("div", { class: "w-100 display-flex padding-bottom-1" }, h("calcite-button", { appearance: 'outline', class: "w-1-2" }, this._translations.information), h("calcite-button", { class: "w-1-2" }, this._translations.media)), h("div", null, h("media-card", { class: "", values: this._fakeValues }), h("info-card", { class: "display-none", values: this._fakeInfos })))));
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
  async _getTranslations() {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  static get is() { return "card-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["card-manager.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["card-manager.css"]
    };
  }
  static get states() {
    return {
      "_translations": {}
    };
  }
  static get elementRef() { return "el"; }
}
