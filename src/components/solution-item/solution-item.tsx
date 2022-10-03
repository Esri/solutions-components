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

import { Component, Element, h, Host, Prop, State, VNode } from '@stencil/core';
import { ICurrentEditItem } from '../../utils/interfaces';
import '@esri/calcite-components';
import { UserSession } from '@esri/solution-common';
import state from '../../utils/editStore';
import SolutionItem_T9n from '../../assets/t9n/solution-item/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-item',
  styleUrl: 'solution-item.scss',
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
   * Credentials for requests
   */
  @Prop({ mutable: true }) authentication: UserSession;

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: ICurrentEditItem = {
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

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="configuration-container">
          <div class="configuration">
            {/* Using this rather than ternary operator as I was getting a tabIndex error
                when switching between item and group type tab.
                It was also not a smooth transition when the 3rd tab of an item was selected and you would switch to a group.
             */}
            {this._showGroupTabs(this.value.type === "Group")}
            {this._showItemTabs(this.value.type !== "Group")}
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionItem_T9n;

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
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Render tabs based on group item types
   *
   * @param visible Should the current tab be visible
   */
  _showGroupTabs(
    visible: boolean
  ): VNode {
    return <calcite-tabs class="config-tabs" style={{ display: visible ? "inherit" : "none" }}>
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title>{this._translations.groupDetailsTab}</calcite-tab-title>
        <calcite-tab-title>{this._translations.sharingTab}</calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab active class="config-tab" id="group-tab">
        <solution-item-details
          type={this.value.type}
          value={this.value.itemDetails}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="share-tab">
        <solution-item-sharing
          groupId={this.value.itemId}
          value={this.value.groupDetails}
        />
      </calcite-tab>
    </calcite-tabs>
  }

  /**
   * Render tabs based for an items details, data, and props section from a template
   *
   * @param visible Should the current tab be visible
   */
  _showItemTabs(
    visible: boolean
  ): VNode {
    return <calcite-tabs class="config-tabs" style={{ display: visible ? "inherit" : "none" }}>
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title>{this._translations.itemDetailsTab}</calcite-tab-title>
        <calcite-tab-title>{this._translations.dataTab}</calcite-tab-title>
        <calcite-tab-title>{this._translations.propertiesTab}</calcite-tab-title>
        <calcite-tab-title>{this._translations.resourcesTab}</calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab active class="config-tab">
        <solution-item-details
          type={this.value.type}
          value={this.value.itemDetails}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="data-tab">
        <solution-template-data
          authentication={this.authentication}
          instanceid="data"
          itemid={this.value.itemId}
          organizationVariables={this.organizationVariables}
          solutionVariables={this.solutionVariables}
          value={{ value: this.value.data }}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="props-tab">
        <solution-template-data
          authentication={this.authentication}
          instanceid="props"
          itemid={this.value.itemId}
          organizationVariables={this.organizationVariables}
          solutionVariables={this.solutionVariables}
          value={{ value: this.value.properties }}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="resources-tab">
        <solution-resource-item
          authentication={this.authentication}
          class="solutions-resource-container"
          itemid={this.value.itemId}
          resourceFilePaths={
            Object.keys(state.models).indexOf(this.value.itemId) > -1 ?
              state.models[this.value.itemId].resourceFilePaths : []
          }
        />
      </calcite-tab>
    </calcite-tabs>
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionItem_T9n;
  }
}
