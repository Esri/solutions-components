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

import { Component, Element, Host, h, Prop, State } from '@stencil/core';
import AddRecordModal_T9n from "../../assets/t9n/add-record-modal/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: 'add-record-modal',
  styleUrl: 'add-record-modal.css',
  shadow: true,
})
export class AddRecordModal {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLAddRecordModalElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * When true the component is displayed
   */
  @Prop({mutable: true}) open = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Handle to the element for browsing for a file.
   */
  protected _browseForAttachment: HTMLInputElement;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof AddRecordModal_T9n;

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
            <div class="font-500" slot="header">{this._translations.addRecord}</div>
            <div slot="content">
              <div>
                <div class="padding-bottom-1">
                  <calcite-label class="font-bold">
                    {this._translations.source}
                    <calcite-input placeholder={this._translations.textField} type='textarea'/>
                  </calcite-label>
                </div>
                <div class="padding-bottom-1">
                  <calcite-label class="font-bold">
                    {this._translations.publicView}
                    <calcite-input placeholder={this._translations.textField} type='textarea'/>
                  </calcite-label>
                </div>
                <div class="padding-bottom-1">
                  <calcite-label class="font-bold">
                    {this._translations.attachments}
                    {/* TODO the design has this smaller with rounded border.
                    Can't quite get that with calcite from what I see...look more or go custom */}
                    <div>
                      <input
                        class="display-none"
                        onChange={(event) => (this._updateAttachment(event))}
                        ref={(el) => (this._browseForAttachment = el)}
                        type="file"
                      />
                      <calcite-button
                        appearance="solid"
                        color="neutral"
                        onClick={() => this._browse()}
                        width='auto'>
                        {this._translations.browse}
                      </calcite-button>
                    </div>
                  </calcite-label>
                </div>
              </div>
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

  /**
   * Opens the browse dialog
   *
   * @param event The input controls event that contains the new file
   */
  protected _browse(): void {
    this._browseForAttachment.click();
  }

  protected _cancel(): void {
    this.open = false;
  }

  protected _save(): void {
    this.open = false;
  }

  /**
   * Gets the result file from browse
   *
   * @param event The input controls event that contains the new file
   */
  protected _updateAttachment(
    event: any
  ): void {
    const files = event.target.files;
    if (files && files[0]) {
      console.log(files[0]);
    }
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
   protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof AddRecordModal_T9n;
  }

}
