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
export class MediaCard {
  constructor() {
    this.values = [];
    this._index = -1;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the values prop is changed.
   * Reset the _index value accordingly.
   */
  geometriesWatchHandler(values, oldValues) {
    if (values && JSON.stringify(values) !== JSON.stringify(oldValues || [])) {
      if ((values === null || values === void 0 ? void 0 : values.length) > 0) {
        this._initIndex();
      }
      else {
        this._index = -1;
      }
    }
  }
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
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad() {
    await this._getTranslations();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   * Using this as the Watch on values does not fire on initial load.
   *
   * @returns Promise when complete
   */
  async componentDidLoad() {
    var _a;
    if (this._index === -1 && ((_a = this.values) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      this._initIndex();
    }
  }
  /**
   * Renders the component.
   */
  render() {
    var _a;
    const v = ((_a = this.values) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.values[this._index] : undefined;
    const total = (this.values || []).length;
    const imgNum = this._index + 1;
    return (h(Host, null, h("div", null, h("div", { class: "display-flex" }, h("img", { class: "img-container", src: v === null || v === void 0 ? void 0 : v.url })), h("calcite-label", { scale: 's' }, h("span", { class: "font-italic padding-bottom-1" }, v === null || v === void 0 ? void 0 : v.name)), h("calcite-label", null, h("span", { class: "padding-bottom-1" }, v === null || v === void 0 ? void 0 : v.description))), h("div", { class: "button-container" }, h("div", { class: "count-container" }, h("calcite-label", null, h("span", null, `${imgNum} of ${total}`))), h("div", { class: "display-flex" }, h("calcite-button", { appearance: "outline", class: "padding-start-1 button-width", color: "neutral", disabled: imgNum === 1 || (this.values || []).length === 0, onClick: () => this._decrementIndex() }, this._translations.previous), h("calcite-button", { class: "padding-start-1 button-width", disabled: (this.values || []).length === imgNum, onClick: () => this._incrementIndex() }, this._translations.next)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Resets the index to 0
   *
   * @protected
   */
  _initIndex() {
    this._index = 0;
  }
  /**
   * Adds 1 to the current index
   *
   * @protected
   */
  _incrementIndex() {
    this._index += 1;
  }
  /**
   * Subtracts 1 from the current index
   *
   * @protected
   */
  _decrementIndex() {
    this._index -= 1;
  }
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
  static get is() { return "media-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["media-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["media-card.css"]
    };
  }
  static get properties() {
    return {
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IMediaCardValues[]",
          "resolved": "IMediaCardValues[]",
          "references": {
            "IMediaCardValues": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "IMediaCardValues[]: Array of objects that contain the name, description, and image to display"
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "_index": {},
      "_translations": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "values",
        "methodName": "geometriesWatchHandler"
      }];
  }
}
//# sourceMappingURL=media-card.js.map
