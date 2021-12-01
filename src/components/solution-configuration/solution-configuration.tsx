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
import { IOrganizationVariableItem, IResponse, ISolutionConfiguration, ISolutionItem, IVariableItem } from '../../utils/interfaces';
import * as utils from '../../utils/templates';
import state from '../../utils/editStore';
import { getItemData, save } from '../../utils/common';
import { generateSourceThumbnailUrl, UserSession, cloneObject } from '@esri/solution-common';
import '@esri/calcite-components';

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
   * Credentials for requests
   */
   @Prop({ mutable: true }) authentication: UserSession;

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
  @Prop({mutable: true, reflect: true}) templates: any[];

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
  @Prop({ mutable: true, reflect: true }) itemid: string = "";

  /**
   * Used to show/hide the content tree
   */
  @Prop({ mutable: true }) treeOpen: boolean = true;

  /**
  * Contains the current solution item id
  */
  @Prop({ mutable: true }) sourceItemData: any = {};

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this._initObserver();
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
                  <div class={this.treeOpen ? "config-inventory" : "config-inventory-hide"}>
                    <solution-contents
                      id="configInventory"
                      translations={this.translations}
                      value={this.value.contents}
                      key={`${this.itemid}-contents`}
                    ></solution-contents>
                  </div>
                  <calcite-button
                    id="collapse-vars"
                    class="collapse-btn"
                    icon-start={this.treeOpen ? "chevrons-left" : "chevrons-right"}
                    appearance="transparent"
                    title={this.translations.cancelEdits}
                    onClick={() => this._toggleTree()}
                    scale="s"
                  ></calcite-button>
                  <div class="config-item">
                    <solution-item
                      translations={this.translations}
                      value={this.item}
                      solutionVariables={this._solutionVariables}
                      organizationVariables={this._organizationVariables}
                      key={`${this.itemid}-item`}
                    ></solution-item>
                  </div>
                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">
                  <solution-spatial-ref
                    id="configure-solution-spatial-ref"
                    translations={this.translations} 
                    services={state.featureServices}
                    key={`${this.itemid}-spatial-ref`}
                  ></solution-spatial-ref>
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

  @Method()
  async getSourceTemplates() {
    return this.templates;
  }

  @Method()
  async getUpdatedTemplates() {
    return this._getUpdates();
  }

  @Method()
  async save() {
    return this._save();
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Observe changes to the props
   */
  private _initObserver() {
    this._templatesObserver = new MutationObserver(ml => {
      ml.some(mutation => {
        const v = mutation.target[mutation.attributeName];
        if (mutation.type === 'attributes' && mutation.attributeName === "itemid" && v && v !== mutation.oldValue) {
          getItemData(v, this.authentication).then(data => {
            this.sourceItemData = data;
            this.templates = data.templates;

            this._initProps(this.templates);
            this._initState(this.templates);
          });
          return true;
        }
      });
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
   * Get updates from the store
   */
  private _getUpdates(): any[] {
    return [];
  }

  /**
   * Get item updates from the store
   */
  private async _getTemplateItemUpdates() {
    const templateItemUpdates = {};
    const models = await this.getEditModels();
    Object.keys(models).forEach(k => {
      const m = models[k];
      if (m.updateItemValues && Object.keys(m.updateItemValues).length > 0) {
        templateItemUpdates[m.itemId] = m.updateItemValues;
      }
    });
    return templateItemUpdates;
  }

  /**
   * Get templates that have updates from the store
   */
  private async _getUpdatedTemplates(
    templateItemUpdates: any
  ) {
    let templates;
    let thumbnailurl;
    const updateKeys = Object.keys(templateItemUpdates);
    if (updateKeys.length > 0) {
      templates = cloneObject(this.templates);

      Object.keys(templateItemUpdates).forEach(k => {
        templates.some(t => {
          if (t.itemId === k) {
            Object.keys(templateItemUpdates[k]).forEach(p => {
              const update = templateItemUpdates[k][p];
              if (p !== "thumbnail") {
                t.item[p] = update;
              } else {
                // need to understand the difference in how these are stored for items within templates...
                // still trying to figure this one out
                thumbnailurl = generateSourceThumbnailUrl(
                  this.authentication.portal,
                  t.itemId,
                  update,
                  t.item.type === "Group"
                );
              }
            });
            return true;
          } else {
            return false;
          }
        });
      });
    }

    return {
      templates,
      thumbnailurl
    };
  }

  /**
   * Toggle treeOpen prop to show/hide content tree
   */
  private _toggleTree(): void {
    this.treeOpen = !this.treeOpen;
  }

  /**
   * Save all edits from the current configuration
   */
  private async _save() {
    const templateItemUpdates = await this._getTemplateItemUpdates();
    const templates = await this._getUpdatedTemplates(templateItemUpdates);

    if (templates) {
      return save(
        templates.templates,
        templates.thumbnailurl,
        this.itemid,
        this.sourceItemData,
        this.authentication,
        this.translations
      );
    } else {
      // TODO remove this once we have an event that will enable/disable edit button
      return {
        success: true,
        message: "No edits to save."
      } as IResponse;
    }
  }
}
