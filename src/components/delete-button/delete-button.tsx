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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import DeleteButton_T9n from "../../assets/t9n/delete-button/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ButtonType, EditType } from "../../utils/interfaces";

@Component({
  tag: 'delete-button',
  styleUrl: 'delete-button.css',
  shadow: true,
})
export class DeleteButton {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLBufferToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * ButtonType (button | action): Support usage as action or button
   */
  @Prop() buttonType: ButtonType = "button";

  /**
   * boolean: This overrides internal enable/disable logic that is based on checks if the layer supports delete
   */
  @Prop() disabled = false;

  /**
   * string: The icon to display in the component
   */
  @Prop() icon: string;

  /**
   * number[]: The ids that would be deleted
   */
  @Prop() ids = [];

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @Prop() layer: __esri.FeatureLayer;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true the user will be asked to confirm the delete operation
   */
  @State() _confirmDelete = false;

  /**
   * boolean: When true the user can delete the current features
   */
  @State() _deleteEndabled = false;

  /**
   * boolean: When true a loading indicator will be shown in the delete button
   */
  @State() _isDeleting = false;

  /**
   * boolean: When true the layer supports delete and a button will be returned
   */
  @State() _supportsDelete: boolean;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof DeleteButton_T9n;

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
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("ids")
  async idsWatchHandler(): Promise<void> {
    this._setDeleteEnabled();
  }

  /**
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("layer")
  async layerWatchHandler(): Promise<void> {
    this._setDeleteEnabled();
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

  /**
   * Emitted on demand when features have been deleted
   */
  @Event() editsComplete: EventEmitter<EditType>;

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
        {this.buttonType === "button" ? (
          <calcite-button
            appearance="outline"
            disabled={!this._deleteEndabled}
            id="solutions-delete"
            kind="danger"
            onClick={() => this._delete()}
            width="full"
          >
            {this._translations.deleteCount.replace("{{n}}", this.ids.length.toString())}
          </calcite-button>
        ) : (
          <calcite-action
            appearance="solid"
            compact={true}
            disabled={!this._deleteEndabled}
            id={this.icon}
            onClick={() => this._delete()}
            scale="s"
            text={this._translations.delete}
          >
            <calcite-button
              appearance="transparent"
              iconStart={this.icon}
              kind="danger"
            >
              {this._translations.delete}
            </calcite-button>
          </calcite-action>
        )}
        {this._deleteMessage()}
      </Host>
    );
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad(): Promise<void> {
    this._setDeleteEnabled();
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Verify if the layer supports delete and that we have 1 or more ids
   */
  protected _setDeleteEnabled(): void {
    this._supportsDelete = this.layer?.editingEnabled && this.layer?.capabilities?.operations?.supportsDelete;
    this._deleteEndabled = !this.disabled || this._supportsDelete && this.ids.length > 0;
  }

  /**
   * Delete all selected records or shows an alert if the layer does not have editing enabled
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _delete(): void {
    this._confirmDelete = true;
  }

  /**
   * Show delete confirmation message
   *
   * @returns node to confirm or deny the delete operation
   */
  protected _deleteMessage(): VNode {
    const confirmMessage = this.ids.length === 1 ? this._translations.confirmSingle :
      this._translations.confirmMultiple;
    return (
      <calcite-modal
        aria-labelledby="modal-title"
        class="delete-modal"
        kind="danger"
        onCalciteModalClose={() => this._deleteClosed()}
        open={this._confirmDelete}
      >
        <div
          class="display-flex align-center"
          id="modal-title"
          slot="header"
        >
          {this._translations.deleteFeature}
        </div>
        <div slot="content">
          {confirmMessage}
        </div>
        <calcite-button
          appearance="outline"
          kind="danger"
          onClick={() => this._deleteClosed()}
          slot="secondary"
          width="full"
        >
          {this._translations.cancel}
        </calcite-button>
        <calcite-button
          kind="danger"
          loading={this._isDeleting}
          onClick={() => void this._deleteFeatures()}
          slot="primary" width="full">
          {this._translations.delete}
        </calcite-button>
      </calcite-modal>
    );
  }

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
    this._deleteClosed();
    this.editsComplete.emit("delete")
  }

  /**
   * Set the alertOpen member to false when the alert is closed
   */
  protected _deleteClosed(): void {
    this._confirmDelete = false;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof DeleteButton_T9n;
  }
}
