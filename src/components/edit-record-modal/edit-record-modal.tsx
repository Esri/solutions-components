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

import { Component, Element, Host, h, Prop, State, VNode } from '@stencil/core';
import EditRecordModal_T9n from "../../assets/t9n/edit-record-modal/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: 'edit-record-modal',
  styleUrl: 'edit-record-modal.css',
  shadow: true,
})
export class EditRecordModal {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLEditRecordModalElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the component is displayed
   */
  @Prop({ mutable: true }) open = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof EditRecordModal_T9n;

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
          <calcite-modal open={this.open} width="s">
            <div class="font-500" slot="header">{this._translations.editMultiple}</div>
            <div slot="content">
              <calcite-label class="font-italic">
                {this._translations.infoMessage}
              </calcite-label>
              {this._getFieldInputs()}
            </div>
            <calcite-button
              appearance="outline"
              onClick={() => this._cancel()}
              slot="secondary"
              width="full"
            >
              {this._translations.cancel}
            </calcite-button>
            <calcite-button
              appearance="solid"
              onClick={() => this._save()}
              slot="primary"
              width="full"
            >
              {this._translations.save}
            </calcite-button>
          </calcite-modal>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  protected _getFieldInputs(): VNode[] {
    // TODO don't follow what these are so just hard-coding for now
    const labels = [
      this._translations.label,
      this._translations.label,
      this._translations.label,
      this._translations.label,
      this._translations.label
    ];

    return labels.map(label => {
      return (
        <div class="padding-bottom-1">
          <calcite-label class="font-bold">
            {label}
            <calcite-input placeholder={this._translations.textField} type="text" />
          </calcite-label>
        </div>
      );
    });
  }

  protected _cancel(): void {
    this.open = false;
  }

  protected _save(): void {
    this.open = false;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof EditRecordModal_T9n;
  }

}
