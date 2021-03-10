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
import "@esri/calcite-components";

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
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {
    "itemDetailsTab": "Item Details",
    "dataTab": "Data",
    "propertiesTab": "Properties",
    "groupDetailsTab": "Group Details",
    "sharingTab": "Sharing",

    // Item details
    "itemDetails": {
      "editThumbnail": "Edit Thumbnail",
      "description": "Description",
      "tags": "Tags",
      "credits": "Credits",
      "termsOfUse": "Terms of Use",
      "snippetCountPattern": "{{n}} of 250"
    },

    "jsonEditing": {
      "startEditing": "Start editing", // start modifying JSON in its editor
      "search": "Search" // search within JSON editor
    }
  };

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: any = {};

  /**
   * Contains the public type value for this component.
   * 
   */
   @Prop({ mutable: true, reflect: true }) type: string = "";

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
            {this.type === "Group" ? this._showGroupTabs() : this._showItemTabs()}
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender(): void {
    // Forward the translations to children
    this.itemDetails.translations = this.translations.itemDetails;
  }

  _showGroupTabs(): VNode {
    return <calcite-tabs class="config-tabs">
      <calcite-tab-nav slot="tab-nav">
        <calcite-tab-title>{this.translations.groupDetailsTab}</calcite-tab-title>
        <calcite-tab-title>{this.translations.sharingTab}</calcite-tab-title>
      </calcite-tab-nav>

      <calcite-tab class="config-tab" active>
        <solution-item-details ref={(el) => (this.itemDetails = el)} type={this.type}></solution-item-details>
      </calcite-tab>
      <calcite-tab class="config-tab">
        <solution-item-sharing></solution-item-sharing>
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

      <calcite-tab class="config-tab" active>
        <solution-item-details ref={(el) => (this.itemDetails = el)} type={this.type}></solution-item-details>
      </calcite-tab>
      <calcite-tab class="config-tab">
        <solution-template-data isResource={true}></solution-template-data>
      </calcite-tab>
      <calcite-tab class="config-tab">
        <solution-template-data></solution-template-data>
      </calcite-tab>
    </calcite-tabs>
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  private itemDetails: HTMLSolutionItemDetailsElement;

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