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

import { VNode } from '@esri/calcite-components/dist/types/stencil-public-runtime';
import { Component, Element, Host, h, Prop } from '@stencil/core';
import { IOrganizationVariableItem, ITemplateData, IVariableItem } from '../../utils/interfaces';

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.css',
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
   * Should be set to true for items that store their data as a resource
   * Will allow for upload and download of the resource
   */
  @Prop({ mutable: true }) isResource: boolean = false;

  /**
   * This needs to be unique for props vs data of an item
   */
   @Prop({ mutable: true, reflect: true }) instanceid: string = "";

  /**
   * A templates itemId.
   * This is used to get the correct model from a store in the json-editor
   */
   @Prop({ mutable: true, reflect: true }) itemid: string = "";

  /**
   * Contains the solution based variables
   */
  @Prop({mutable: true, reflect: true}) solutionVariables: IVariableItem[] = [];

  /**
   * Contains the organization based variables
   */
  @Prop({mutable: true, reflect: true}) organizationVariables: IOrganizationVariableItem[] = [];

  /**
   * Used to show/hide the variable containers
   */
  @Prop({mutable: true, reflect: true}) varsOpen: boolean = true;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="solution-data-container">
          {this.renderTemplateData(this.value)}
        </div>
      </Host>
    );
  }

  renderTemplateData(data: ITemplateData): VNode {
    return this.isResource ? this._resourceData(data) : this._jsonData();
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

  _jsonData(): any {
    return <calcite-shell dir="ltr" class="light var-container">
      <calcite-panel class="json-editor">
        <div class="solution-data-child-container calcite-match-height">
          <json-editor
            instanceid={this.instanceid}
            value={this.itemid}
            translations={this.translations}
          ></json-editor>
        </div>
      </calcite-panel>

      <calcite-shell-panel slot="contextual-panel" position="end" height-scale="l" width-scale="xs">
        <div class={this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed"}>
          <calcite-button
            id="collapse-vars"
            class="collapse-btn"
            icon-start={this.varsOpen ? "chevrons-right" : "chevrons-left"}
            appearance="transparent"
            title={this.translations.cancelEdits}
            onClick={() => this._toggleVars()}
            scale="s"
          ></calcite-button>
          <div id="orgVars" class={this.varsOpen ? "org-vars" : "org-vars hide"}>
            <solution-organization-variables
              value={this.organizationVariables}
              translations={this.translations}
            ></solution-organization-variables>
          </div>
          <div id="solVars" class={this.varsOpen ? "sol-vars" : "sol-vars hide"}>
            <solution-variables
              value={this.solutionVariables}
              translations={this.translations}
            ></solution-variables>
          </div>
        </div>
      </calcite-shell-panel>
    </calcite-shell>;
  }

  _resourceData(templateData: ITemplateData): any {
    return <solution-resource-item value={templateData.resourceItem} translations={this.translations}></solution-resource-item>;
  }

  /**
   * Toggle varsOpen prop to show/hide variable containers
   */
  _toggleVars(): void {
    this.varsOpen = !this.varsOpen;
  }
}
