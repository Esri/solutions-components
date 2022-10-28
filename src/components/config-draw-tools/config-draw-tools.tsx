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

import { Component, Element, Host, h, Method, Prop, State } from '@stencil/core';
import ConfigDrawTools_T9n from "../../assets/t9n/config-draw-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: 'config-draw-tools',
  styleUrl: 'config-draw-tools.css',
  shadow: true,
})
export class ConfigDrawTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLConfigDrawToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: All checkboxes checked state will be set with this value on first render.
   * Default is true
   */
  @Prop({reflect: true}) defaultChecked = true;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof ConfigDrawTools_T9n;

  /**
   * HTMLCheckListElement: The check list element
   */
  protected _checkList: HTMLCheckListElement;

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

  /**
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  @Method()
  async getConfigInfo(): Promise<{ [key: string]: boolean }> {
    return this._checkList.getConfigInfo();
  }

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
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
    const nlsTypes = this._translations?.types || {};
    const types = Object.keys(nlsTypes).map(k => nlsTypes[k]);
    return (
      <Host>
        <div>
          <div class="padding-block-end-1">
            <calcite-label class="label-spacing">
              {this._translations?.drawTools}
            </calcite-label>
          </div>
          <div class="padding-inline-start-1">
            <check-list
              defaultChecked={this.defaultChecked}
              ref={(el) => { this._checkList = el; }}
              values={types}
            />
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
    this._translations = messages[0] as typeof ConfigDrawTools_T9n;
  }
}
