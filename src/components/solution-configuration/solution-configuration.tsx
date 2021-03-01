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

import { Component, Element, h, Host, Listen, Prop, VNode } from '@stencil/core';
import "@esri/calcite-components";

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
    "definitionTab": "Definition", // for tab to edit definition of an item or group
    "spatialReferenceTab": "Spatial Reference", // for tab to edit the spatial reference of an item

    // Information about an item
    "item": {
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
    },

    "spatialRef": {
      "specifyParam": "Spatial Reference Parameter",
      "defaultSpatialRef": "Default Spatial Reference",
      "featureServicesHeading": "Feature Services"
    }
  };

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: any = {};

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
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>{this.translations.definitionTab}</calcite-tab-title>
                <calcite-tab-title>{this.translations.spatialReferenceTab}</calcite-tab-title>
              </calcite-tab-nav>

              <calcite-tab class="config-tab" active>
                <div class="config-solution">

                  <div class="config-inventory">
                    <solution-contents id="configInventory"></solution-contents>
                  </div>

                  <div class="config-item">
                    <solution-item ref={(el) => (this.item = el)}></solution-item>
                  </div>

                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">

                  <solution-spatial-ref ref={(el) => (this.spatialRef = el)}></solution-spatial-ref>

                </div>
              </calcite-tab>
            </calcite-tabs>
          </div>
        </div>
      </Host>
    );
  }

  componentDidRender(): void {
    // Forward the translations to children
    this.item.translations = this.translations.item;
    this.spatialRef.translations = this.translations.spatialRef;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Handle to the item component.
   */
  private item: HTMLSolutionItemElement;

  /**
   * Handle to the spatial reference component.
   */
  private spatialRef: HTMLSolutionSpatialRefElement;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionItemSelected")
  solutionItemSelected(event: CustomEvent): void {
    console.log('Received the custom solutionItemSelected event: ', event.detail.itemId);
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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

}