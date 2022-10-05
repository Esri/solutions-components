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

import { Component, Element, h, Host, Prop, State, VNode, Watch } from '@stencil/core';
import '@esri/calcite-components';
import state from "../../utils/solution-store";
import { UserSession } from '@esri/solution-common';
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
  @Prop({ mutable: true, reflect: true }) itemId = "";

  @Watch("itemId") valueWatchHandler(): void {
    const itemEdit = state.getItemInfo(this.itemId);
    this.itemType = itemEdit.type;
  }

  /**
   * Contains the solution based variables
   */
  @Prop({ mutable: true, reflect: true }) solutionVariables = "";

  /**
   * Contains the organization based variables
   */
  @Prop({ mutable: true, reflect: true }) organizationVariables = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    return this._getTranslations();
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
            {this._showGroupTabs(this.itemType === "Group")}
            {this._showItemTabs(this.itemType !== "Group")}
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

  @State() itemType: string;

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
          item-id={this.itemId}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="share-tab">
        <solution-item-sharing
          group-id={this.itemId}
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
          item-id={this.itemId}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="data-tab">
        <solution-template-data
          instanceid="data"
          item-id={this.itemId}
          organization-variables={this.organizationVariables}
          solution-variables={this.solutionVariables}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="props-tab">
        <solution-template-data
          instanceid="properties"
          item-id={this.itemId}
          organization-variables={this.organizationVariables}
          solution-variables={this.solutionVariables}
        />
      </calcite-tab>
      <calcite-tab class="config-tab" id="resources-tab">
        <solution-resource-item
          authentication={this.authentication}
          class="solutions-resource-container"
          item-id={this.itemId}
        />
      </calcite-tab>
    </calcite-tabs>
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionItem_T9n;
  }
}
