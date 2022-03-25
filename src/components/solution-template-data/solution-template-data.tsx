/** @license
 * Copyright 2021 Esri
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

import { Component, Element, Host, h, Prop } from '@stencil/core';
import { IOrganizationVariableItem, ITemplateData, IVariableItem } from '../../utils/interfaces';
import { UserSession } from '@esri/solution-common';

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
   * Credentials for requests
   */
  @Prop({ mutable: true }) authentication: UserSession;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   * 
   * When working with a resource item this should contain an IResourceItem
   * 
   * When working with a json type item this should contain the data and vars
   */
  @Prop({ mutable: true, reflect: true }) value: ITemplateData = {};

  /**
   * This needs to be unique for props vs data of an item
   */
  @Prop({ mutable: true, reflect: true }) instanceid = "";

  /**
   * A templates itemId.
   * This is used to get the correct model from a store in the json-editor
   */
  @Prop({ mutable: true, reflect: true }) itemid = "";

  /**
   * Contains the solution based variables
   */
  @Prop({ mutable: true, reflect: true }) solutionVariables: IVariableItem[] = [];

  /**
   * Contains the organization based variables
   */
  @Prop({ mutable: true, reflect: true }) organizationVariables: IOrganizationVariableItem[] = [];

  /**
   * Used to show/hide the variable containers
   */
  @Prop({ mutable: true, reflect: true }) varsOpen = true;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="solution-data-container">
          <calcite-shell class="light var-container" dir="ltr">
            <calcite-panel class="json-editor">
              <div class="solution-data-child-container calcite-match-height">
                <json-editor
                  instanceid={this.instanceid}
                  translations={this.translations}
                  value={this.itemid}
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
                  title={this.translations.cancelEdits}
                />
                <div class={this.varsOpen ? "org-vars" : "org-vars display-none"} id="orgVars">
                  <solution-organization-variables
                    translations={this.translations}
                    value={this.organizationVariables}
                  />
                </div>
                <div class={this.varsOpen ? "sol-vars" : "sol-vars display-none"} id="solVars">
                  <solution-variables
                    translations={this.translations}
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
}
