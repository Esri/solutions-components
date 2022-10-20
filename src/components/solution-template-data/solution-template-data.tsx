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

import { Component, Element, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import state from "../../utils/solution-store";
import SolutionTemplateData_T9n from '../../assets/t9n/solution-template-data/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.scss',
  shadow: false
})

export class SolutionTemplateData {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionTemplateDataElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the public value for this component.
   *
   * When working with a resource item this should contain an IResourceItem
   *
   * When working with a json type item this should contain the data and vars
   */
  //@Prop({ mutable: true, reflect: true }) value: ITemplateData = {};

  /**
   * This needs to be unique for props vs data of an item
   */
  @Prop({ mutable: true, reflect: true }) instanceid = "";

  /**
   * A template's itemId.
   * This is used to get the correct model from a store in the json-editor
   */
  @Prop({ mutable: true, reflect: true }) itemId = "";

  @Watch("itemId") itemIdWatchHandler(): void {
    this.value = JSON.stringify(
      this.instanceid === "data"
      ? state.getItemInfo(this.itemId).data
      : state.getItemInfo(this.itemId).properties
      , null, 2);
  }

  /**
   * Contains the organization based variables
   */
  @Prop({ mutable: true, reflect: true }) organizationVariables = "";

  /**
   * Contains the solution based variables
   */
  @Prop({ mutable: true, reflect: true }) solutionVariables = "";

  /**
   * Used to show/hide the variable containers
   */
  @Prop({ mutable: true, reflect: true }) varsOpen = true;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    window.addEventListener("solutionEditorContentChanged",
      (evt) => {
        const editorInstanceId = (evt as any).detail;
        if (editorInstanceId === this.instanceid) {
          console.log("snapshot "  + editorInstanceId); //???
          const itemEdit = state.getItemInfo(this.itemId);
          (this._editor as any).getEditorContents().then(
            (data: string) => {
              if (data) {
                itemEdit.data = JSON.parse(data);
                state.setItemInfo(itemEdit);
              }
            }
          );
        }
      }
    );
  }

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="solution-data-container">
          <calcite-shell class="light var-container" dir="ltr">
            <calcite-panel class="json-editor">
              <div class="solution-data-child-container calcite-match-height">
                  <json-editor
                    class="solution-data-editor-container"
                    instanceid={this.instanceid}
                    value={this.value}
                    ref={(el) => (this._editor = el)}
                  />
              </div>
            </calcite-panel>

            <calcite-shell-panel height-scale="l" position="end" slot="contextual-panel" width-scale="xs">
              <div class={this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed"}>
                <calcite-button
                  appearance="transparent"
                  class="collapse-btn"
                  icon-start={this.varsOpen ? "chevrons-right" : "chevrons-left"}
                  id="collapse-vars"
                  onClick={() => this._toggleVars()}
                  scale="s"
                  title={this.varsOpen ? this._translations.collapse : this._translations.expand}
                />
                <div class={this.varsOpen ? "org-vars" : "org-vars display-none"} id="orgVars">
                  <solution-organization-variables
                    value={this.organizationVariables}
                  />
                </div>
                <div class={this.varsOpen ? "sol-vars" : "sol-vars display-none"} id="solVars">
                  <solution-variables
                    value={this.solutionVariables}
                  />
                </div>
              </div>
            </calcite-shell-panel>
          </calcite-shell>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected _editor: HTMLElement;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionTemplateData_T9n;

  @State() protected value = "";

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

  /**
   * Toggle varsOpen prop to show/hide variable containers
   */
  _toggleVars(): void {
    this.varsOpen = !this.varsOpen;
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionTemplateData_T9n;
  }
}
