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

import { Component, Element, h, Host, Prop, VNode } from '@stencil/core';
import { ITemplateData } from '../solution-template-data/solution-template-data';
import '@esri/calcite-components';
import { IItemShare } from '../solution-item-sharing/solution-item-sharing';

export interface ISolutionItem {
  itemId: string,
  itemDetails: any, //use the interface
  isResource: boolean, // this should be removed and determined from the data
  data: ITemplateData,
  properties: ITemplateData,
  type: string,
  groupDetails?: IItemShare[]
}

@Component({
  tag: 'solution-item',
  styleUrl: 'solution-item.css',
  shadow: false
})
export class SolutionItem {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLSolutionItemElement;

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
   */
  @Prop({ mutable: true, reflect: true }) value: ISolutionItem = {
    itemId: "",
    itemDetails: {},
    isResource: false,
    data: {},
    properties: {},
    type: "",
    groupDetails: undefined
  };

  /**
 * Contains the solution based variables
 */
  @Prop({ mutable: true, reflect: true }) solutionVariables: any[] = [];

  /**
   * Contains the organization based variables
   */
  @Prop({ mutable: true, reflect: true }) organizationVariables: any[] = [];

  /**
   * Contains the public type value for this component.
   * 
   */
   //@Prop({ mutable: true, reflect: true }) type: string = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <div class="configuration-container">
          <div class="configuration">
            {this.value.type === "Group" ? this._showGroupTabs() : this._showItemTabs()}
          </div>
        </div>
      </Host>
    );
  }

  _showGroupTabs(): VNode {
    return <calcite-tabs class="config-tabs">
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title>{this.translations.groupDetailsTab}</calcite-tab-title>
        <calcite-tab-title>{this.translations.sharingTab}</calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab active class="config-tab">
        <solution-item-details 
          translations={this.translations}
          type={this.value.type}
          value={this.value.itemDetails}
         />
      </calcite-tab>
      <calcite-tab class="config-tab">
        <solution-item-sharing
          groupId={this.value.itemId}
          translations={this.translations}
          value={this.value.groupDetails}
         />
      </calcite-tab>
    </calcite-tabs>
  }

  _showItemTabs(): VNode {
    return <calcite-tabs class="config-tabs">
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title>{this.translations.itemDetailsTab}</calcite-tab-title>
        <calcite-tab-title>{this.translations.dataTab}</calcite-tab-title>
        <calcite-tab-title>{this.translations.propertiesTab}</calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab active class="config-tab">
        <solution-item-details
          translations={this.translations}
          type={this.value.type}
          value={this.value.itemDetails}
         />
      </calcite-tab>
      <calcite-tab class="config-tab" id="data-tab">
        <solution-template-data
          instanceid="data"
          isResource={this.value.isResource}
          itemid={this.value.itemId}
          organizationVariables={this.organizationVariables}
          solutionVariables={this.solutionVariables}
          translations={this.translations}
          value={{value: this.value.data}}
         />
      </calcite-tab>
      <calcite-tab class="config-tab" id="props-tab">
        <solution-template-data
          instanceid="props"
          itemid={this.value.itemId}
          organizationVariables={this.organizationVariables}
          solutionVariables={this.solutionVariables}
          translations={this.translations} 
          value={{value: this.value.properties}}
         />
      </calcite-tab>
    </calcite-tabs>
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

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

}