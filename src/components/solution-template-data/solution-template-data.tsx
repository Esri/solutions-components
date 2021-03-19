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
import { Component, Host, h, Prop } from '@stencil/core';
import { IOrganizationVariableItem } from '../solution-organization-variables/solution-organization-variables';
import { IVariableItem } from '../solution-variables/solution-variables';
import { IResourceItem } from '../solution-resource-item/solution-resource-item';

export interface ITemplateData {
  value?: any,
  orgVariables?: IOrganizationVariableItem[],
  solVariables?: IVariableItem[],
  resourceItem?: IResourceItem
}

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.css',
  shadow: false
})

export class SolutionTemplateData {
  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations!: any;

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
    return this.isResource ? this._resourceData(data) : this._jsonData(data);
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

  _jsonData(templateData: ITemplateData): any {
    return <calcite-shell dir="ltr" theme="light">
      <calcite-shell-center-row slot="center-row" position="start" height-scale="l" width-scale="l" class="json-editor">
        <div class="solution-data-child-container">
          <json-editor instanceId="this-will-be-the-solution-id" translations={this.translations} value={templateData.value}></json-editor>
        </div>
      </calcite-shell-center-row>
      <calcite-shell-panel slot="contextual-panel" position="start" height-scale="l" width-scale="m">
        <div class="solution-data-child-container">
          <solution-organization-variables value={templateData.orgVariables} translations={this.translations}></solution-organization-variables>
          <solution-variables value={templateData.solVariables} translations={this.translations}></solution-variables>
        </div>
      </calcite-shell-panel>
    </calcite-shell>;
  }

  _resourceData(templateData: ITemplateData): any {
    return <solution-resource-item value={templateData.resourceItem} translations={this.translations}></solution-resource-item>;
  }
}
