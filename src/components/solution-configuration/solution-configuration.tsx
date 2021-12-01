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
import * as utils from '../../utils/templates';
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

  @State() modelsSet = false;

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

  /**
   * Contains the current solution item id
   */
  @Prop({ mutable: true }) solutionItemId: string;

  /**
   * Used to show/hide the content tree
   */
  @Prop({ mutable: true }) treeOpen = true;

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
              <calcite-tab active class="config-tab">
                <div class="config-solution">
                  <div class={this.treeOpen ? "config-inventory" : "config-inventory-hide"}>
                    <solution-contents
                      id="configInventory"
                      key={`${this.solutionItemId }-contents`}
                      translations={this.translations}
                      value={this.value.contents}
                     />
                  </div>
                  <calcite-button
                    appearance="transparent"
                    class="collapse-btn"
                    icon-start={this.treeOpen ? "chevrons-left" : "chevrons-right"}
                    id="collapse-vars"
                    onClick={() => this._toggleTree()}
                    scale="s"
                    title={this.translations.cancelEdits}
                   />
                  <div class="config-item">
                    <solution-item
                      key={`${this.solutionItemId}-item`}
                      organizationVariables={this._organizationVariables}
                      solutionVariables={this._solutionVariables}
                      translations={this.translations}
                      value={this.item}
                     />
                  </div>
                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">
                  <solution-spatial-ref
                    id="configure-solution-spatial-ref"
                    key={`${this.solutionItemId}-spatial-ref`} 
                    services={state.featureServices}
                    translations={this.translations}
                   />
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

  private _solutionVariables: IVariableItem[];

  private _organizationVariables: IOrganizationVariableItem[];

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

  @Method()
  async getSpatialReferenceInfo() {
    return state.spatialReferenceInfo;
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
          this._initProps(v);
          this._initState(v);
          return true;
        }
      })
    });
    this._templatesObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }

  /**
   * Update the store with the initial value
   */
  private _initState(v: any): void {
    state.models = utils.getModels(v);
    state.featureServices = utils.getFeatureServices(v);
    state.spatialReferenceInfo = utils.getSpatialReferenceInfo(state.featureServices);
    this.modelsSet = true;
  }

  /**
   * Update the Props with the initial values
   */
  private _initProps(v: any): void {
    this.value.contents = [...utils.getInventoryItems(v)];
    this._solutionVariables = utils.getSolutionVariables(v, this.translations);
    this._organizationVariables = utils.getOrganizationVariables(this.translations);
    this.item = {
      itemId: "",
      itemDetails: {},
      isResource: false,
      data: {},
      properties: {},
      type: ""
    };
  }

  /**
   * Toggle treeOpen prop to show/hide content tree
   */
  private _toggleTree(): void {
    this.treeOpen = !this.treeOpen;
  }
}
