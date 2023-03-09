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
export class CrowdsourceManager {
  constructor() {
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
  }
  render() {
    return (h(Host, null, h("div", null, h("calcite-shell", null, h("div", { class: "header", slot: 'header' }, h("calcite-label", { class: "header-title" }, this._translations.header), h("calcite-label", { class: "header-controls-label", layout: "inline" }, this._translations.layout, h("calcite-action-bar", { class: "header-controls", "expand-disabled": true, layout: "horizontal" }, this._getActionGroup("grid-background"), this._getActionGroup("horizontal-background"), this._getActionGroup("vertical-background"))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getActionGroup(imgClass) {
    return (h("div", { class: "action-center background-transparent" }, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, onClick: () => { this._updateLayout(); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom" }, h("span", null, "tip"))));
  }
  _updateLayout() {
    console.log("A");
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
  static get is() { return "crowdsource-manager"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["crowdsource-manager.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["crowdsource-manager.css"]
    };
  }
  static get states() {
    return {
      "_translations": {}
    };
  }
  static get elementRef() { return "el"; }
}
