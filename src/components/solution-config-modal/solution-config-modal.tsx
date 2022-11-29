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

import { Component, Element, Event, EventEmitter, h, Host, Prop, State, VNode, Watch } from "@stencil/core";
import "@esri/calcite-components";
import SolutionConfigModal_T9n from "../../assets/t9n/solution-config-modal/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: "solution-config-modal",
  styleUrl: "solution-config-modal.scss",
  shadow: false
})
export class SolutionConfigModal {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionConfigModalElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  @Prop({ mutable: true }) cacheBreaker: string;

  /**
   * Credentials for requests in a serialized form
   */
  @Prop({ mutable: true }) serializedAuthentication = "";

  @Prop({ mutable: true }) solutionTitle = "";

  /**
   * Contains the current solution item id
   */
  @Prop({ mutable: true }) solutionItemId: string;

  @Watch("solutionItemId") async valueWatchHandler(): Promise<void> {
    console.log("MODAL watch " + this.solutionItemId);//???
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    //console.log("MODAL constructor " + this.solutionItemId);//??? + " open:" + this._modalIsOpen);//???

    window.addEventListener("solutionCanSave",
      (evt) => {
        this._canSave = (evt as any).detail as boolean;
      }
    );
  }

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  componentWillRender(): void {
    console.log("MODAL will render " + this.solutionTitle + " (" + this.solutionItemId + ", " + this.cacheBreaker + ")");//???
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const cacheBreakerParts = this.cacheBreaker.split("_");
    if (!this.solutionItemId && cacheBreakerParts.length === 2) {
      this.solutionItemId = cacheBreakerParts[0];
    }

    const modalIsOpen = !!this.solutionItemId;
    console.log("MODAL render " + this.solutionTitle + " (" + this.solutionItemId + ", " + this.cacheBreaker + ")" + " open:" + modalIsOpen);//???
    return (
      <Host>
        <calcite-modal
          aria-labelledby="solutions-modal-title"
          fullscreen=""
          intl-close={this._translations.cancel}
          onCalciteModalClose={() => this._cancel()}
          open={modalIsOpen}
          ref={(el) => this._modal = el}
        >
          <h3
            id="solutions-modal-title"
            slot="header"
          >
            {this._translations.title.replace("{{solutionName}}", this.solutionTitle)}
          </h3>
          <div
            class="solutions-modal-content"
            id="solutions-modal-content"
            slot="content"
          >
            <solution-configuration
              ref ={(el) => (this._configuration = el)}
              serialized-authentication={this.serializedAuthentication}
              solution-item-id={this.solutionItemId}
            />
          </div>
          <calcite-button
            appearance="outline"
            disabled={!this._canSave}
            onClick={() => this._cancel()}
            ref={(el) => (this._cancelBtn = el)}
            slot="secondary"
            width="full"
          >
            {this._translations.cancel}
          </calcite-button>
          <calcite-button
            appearance="solid"
            disabled={!this._canSave}
            onClick={() => this._save()}
            ref={(el) => (this._saveBtn = el)}
            slot="primary"
            width="full"
          >
            {this._translations.save}
          </calcite-button>
        </calcite-modal>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected _cancelBtn: HTMLCalciteButtonElement;

  /**
   * Controls enablement of Cancel and Save modal buttons
   */
  @State() protected _canSave = false;

  protected _configuration: HTMLSolutionConfigurationElement;

  protected _modal: HTMLCalciteModalElement;

  /**
   * Flag to coordinate closing via modal X and modal Cancel.
   */
  protected _modalIsClosing = false;

  //@State() protected _modalIsOpen = false;

  protected _saveBtn: HTMLCalciteButtonElement;

  /**
   * Contains the _translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionConfigModal_T9n;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() solutionConfigModalClosed: EventEmitter<void>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  protected async _cancel(): Promise<void> {
    console.log("MODAL cancel " + this.solutionItemId);//???
    // Start closing process if not already in progress via save
    if (!this._modalIsClosing) {
      this._cancelBtn.disabled = this._saveBtn.disabled = true;
      this._canSave
        ? confirm("Save changes?")
          ? await this._saveChanges()
          : await this._cancelChanges()
        : await this._cancelChanges();
    }
    this._closeModal();
  }

  protected async _cancelChanges(): Promise<void> {
    console.log("MODAL cancelChanges");//???
    this._canSave = false;
    await this._configuration.unloadSolution();
  }

  protected _closeModal(): void {
    console.log("MODAL close");//???
    this.solutionItemId = "";
    //this.solutionTitle = "";
    this.cacheBreaker = "";
    this._modalIsClosing = false;
    this.solutionConfigModalClosed.emit();
  }

  // Save changes and close the modal
  protected async _save(): Promise<void> {
    console.log("MODAL save " + this.solutionItemId);//???
    this._modalIsClosing = true;
    this._cancelBtn.disabled = this._saveBtn.disabled = true;
    if (this._canSave) {
      await this._saveChanges();
    }
    this._closeModal();
  }

  protected async _saveChanges(): Promise<void> {
    console.log("MODAL saveChanges");//???
    try {
      this._canSave = false;
      await this._configuration.saveSolution();
    } catch (error) {
      //reportError("Unable to save", error.originalMessage);
      console.log("Unable to save", error.originalMessage);
    }
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionConfigModal_T9n;
  }
}
