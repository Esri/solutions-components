/** @license
 * Copyright 2024 Esri
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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State } from '@stencil/core';
import DeleteDialog_T9n from "../../assets/t9n/delete-button/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { EditType } from "../../utils/interfaces";

@Component({
  tag: 'delete-dialog',
  styleUrl: 'delete-dialog.css',
  shadow: true,
})

export class DeleteDialog {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLDeleteDialogElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * number[]: The ids that would be deleted
   */
  @Prop() ids = [];

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @Prop() layer: __esri.FeatureLayer;

  /**
   * boolean: When true the delete dialog will be displayed
   */
  @Prop() open = false;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true a loading indicator will be shown in the delete button
   */
  @State() _isDeleting = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof DeleteDialog_T9n;

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

  /**
   * Emitted on demand when features have been deleted
   */
  @Event() editsComplete: EventEmitter<EditType>;

  /**
   * Emitted on demand when features have been deleted
   */
  @Event() deleteDialogClose: EventEmitter<void>;

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
    const confirmMessage = this.ids.length === 1 ? this._translations?.confirmSingle :
      this._translations?.confirmMultiple;

    return (
      <Host>
        <calcite-modal
          aria-labelledby="modal-title"
          class="delete-modal"
          kind="danger"
          onCalciteModalClose={() => this._close()}
          open={this.open}
          widthScale="s"
        >
          <div
            class="display-flex align-center"
            id="modal-title"
            slot="header"
          >
            {this._translations?.deleteFeature}
          </div>
          <div slot="content">
            {confirmMessage}
          </div>
          <calcite-button
            appearance="outline"
            kind="danger"
            onClick={() => this._close()}
            slot="secondary"
            width="full"
          >
            {this._translations?.cancel}
          </calcite-button>
          <calcite-button
            kind="danger"
            loading={this._isDeleting}
            onClick={() => void this._deleteFeatures()}
            slot="primary" width="full">
            {this._translations?.delete}
          </calcite-button>
        </calcite-modal>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Delete the currently selected features
   */
  protected async _deleteFeatures(): Promise<void> {
    this._isDeleting = true;
    const deleteFeatures = this.ids.map((objectId) => {
      return { objectId };
    });
    await this.layer.applyEdits({
      deleteFeatures
    });
    this._isDeleting = false;
    this._close();
    this.editsComplete.emit("delete")
  }

  /**
   * Set the alertOpen member to false when the alert is closed
   */
  protected _close(): void {
    this.open = false;
    this.deleteDialogClose.emit();
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof DeleteDialog_T9n;
  }
}
