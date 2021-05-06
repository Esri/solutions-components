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

import { Component, Element, h, Host, Listen, Method, Prop, State, VNode } from '@stencil/core';
import { IInventoryItem } from '../solution-contents/solution-contents';
import { ISolutionItem } from '../solution-item/solution-item';
import { IOrganizationVariableItem } from '../solution-organization-variables/solution-organization-variables';
import { IVariableItem } from '../solution-variables/solution-variables';
import { getInventoryItems, getModels } from '../../utils/templates';
import state from '../../utils/editStore';

import '@esri/calcite-components';

export interface ISolutionConfiguration {
  contents: IInventoryItem[]
}

@Component({
  tag: 'solution-configuration',
  styleUrl: 'solution-configuration.css',
  shadow: false
})
export class SolutionConfiguration {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLSolutionConfigurationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  @State() modelsSet: boolean = false;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: ISolutionConfiguration = {
    contents: []
  };

  /**
   * Contains the raw templates from the solution item
   */
  @Prop({mutable: true, reflect: true}) templates: string;

  /**
   * Contains the solution based variables
   */
  @Prop({mutable: true, reflect: true}) solutionVariables: IVariableItem[] = [];

  /**
   * Contains the organization based variables
   */
  @Prop({mutable: true, reflect: true}) organizationVariables: IOrganizationVariableItem[] = [];

  /**
   * Contains the current solution item we are working with
   */
  @Prop({ mutable: true }) item: ISolutionItem = {
    itemId: "",
    itemDetails: {},
    isResource: false,
    data: {},
    properties: {},
    type: ""
  };

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this._initTemplatesObserver();
  }

  render(): VNode {
    return (
      <Host>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>{this.translations.definitionTab}</calcite-tab-title>
                <calcite-tab-title>{this.translations.spatialReferenceTab}</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab class="config-tab" active>
                <div class="config-solution">
                  <div class="config-inventory">
                    <solution-contents
                      id="configInventory"
                      translations={this.translations}
                      value={this.value.contents}
                    ></solution-contents>
                  </div>
                  <div class="config-item">
                    <solution-item
                      translations={this.translations}
                      value={this.item}
                      solutionVariables={this.solutionVariables}
                      organizationVariables={this.organizationVariables}
                    ></solution-item>
                  </div>
                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">
                  <solution-spatial-ref translations={this.translations}></solution-spatial-ref>
                </div>
              </calcite-tab>
            </calcite-tabs>
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  private _templatesObserver: MutationObserver;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionItemSelected", { target: 'window' })
  _solutionItemSelected(event: CustomEvent): void {
    this.item = event.detail;
  }

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

  @Method()
  async getEditModels() {
    return state.models;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Observe changes to the templates prop
   */
  private _initTemplatesObserver() {
    this._templatesObserver = new MutationObserver(ml => {
      ml.some(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === "templates" &&
          mutation.target[mutation.attributeName] !== mutation.oldValue) {
          const v = JSON.parse(mutation.target[mutation.attributeName]);
          this.value.contents = [...getInventoryItems(v)];
          state.models = getModels(v);
          this.modelsSet = true;
          return true;
        }
      })
    });
    this._templatesObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }
}
