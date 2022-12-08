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

import { Component, Element, Host, h, Method, Prop, State, VNode } from '@stencil/core';
import ConfigBufferTools_T9n from "../../assets/t9n/config-buffer-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: 'config-buffer-tools',
  styleUrl: 'config-buffer-tools.css',
  shadow: true,
})
export class ConfigBufferTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLConfigBufferToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * number: Default distance value.
   */
  @Prop({mutable: true, reflect: true}) distance = 100;

  /**
   * string: Default unit value.
   * Should be a unit listed in assets/t9n/config-buffer-tools/resources
   */
  @Prop({mutable: true, reflect: true}) unit = "Meters";

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * When checked the buffer tools will be avalible at runtime.
   */
  protected _showBufferElement: HTMLCalciteCheckboxElement;

  /**
   * When checked the buffer tools will be show in the config
   */
  @State() _showBufferChecked = true;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof ConfigBufferTools_T9n;

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
  async getConfigInfo(): Promise<{ [key: string]: number | string }> {
    return {
      "distance": this.distance,
      "unit": this.unit
    };
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
    return (
      <Host>
        <div>
          <calcite-label layout="inline">
            <calcite-checkbox
              checked={this._showBufferChecked}
              onCalciteCheckboxChange={() => this._setShowBufferChecked()}
              ref={(el) => { this._showBufferElement = el }}
            />
            {this._translations.showSearchDistance}
          </calcite-label>
        </div>
        <div class="padding-inline-start-1">
          <div class="padding-block-end-1 width-full">
            <calcite-label class="label-spacing">
              {this._translations.defaultBufferDistance}
              <calcite-input
                disabled={!this._showBufferChecked}
                min={0}
                number-button-type="vertical"
                onCalciteInputInput={(evt) => { this._distanceChanged(evt); }}
                type="number"
                value={this.distance.toString()}
              />
            </calcite-label>
          </div>
          <div class="width-full">
            <calcite-label class="label-spacing">
              {this._translations.defaultUnit}
              <calcite-select
                disabled={!this._showBufferChecked}
                label={this._translations.defaultUnit}
                onCalciteSelectChange={(evt) => { this._unitSelectionChange(evt); }}
              >
                {this._renderUnitOptions()}
              </calcite-select>
            </calcite-label>
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
   * Store the user defined distance
   *
   * @protected
   */
  protected _distanceChanged(
    evt: CustomEvent
  ): void {
    this.distance = evt.detail.value;
  }

  /**
   * Store the user defined unit
   *
   * @protected
   */
  protected _unitSelectionChange(
    evt: CustomEvent
  ): void {
    this.unit = (evt.target as HTMLCalciteSelectElement).value;
  }

  /**
   * Render the various unit options
   *
   * @returns Promise when complete
   * @protected
   */
  protected _renderUnitOptions(): VNode[] {
    const nlsUnits = this._translations.units || {};
    const units: string[] = Object.keys(nlsUnits).map(k => nlsUnits[k]);
    return units.map(unit => {
      return (<calcite-option label={unit} selected={unit === this.unit} value={unit}/>);
    });
  }

  /**
   * When not checked the buffer options will be disabled in the config and not visible in the UI at runtime
   *
   * @protected
   */
  protected _setShowBufferChecked(): void {
    this._showBufferChecked = this._showBufferElement.checked;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof ConfigBufferTools_T9n;
  }
}
