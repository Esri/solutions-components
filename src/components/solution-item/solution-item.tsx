import { Component, Element, h, Host, Prop } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";

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

  @Prop({ mutable: true }) translations: any = {
    "itemDetailsTab": "Item Details",
    "dataTab": "Data",
    "propertiesTab": "Properties",
    "groupDetailsTab": "Group Details",
    "sharingTab": "Sharing",

    // Item details
    "item_details": {
      "editThumbnail": "Edit Thumbnail",
      "description": "Description",
      "tags": "Tags",
      "credits": "Credits",
      "termsOfUse": "Terms of Use",
      "snippetCountPattern": "{{n}} of 250"
    },

    "json_editing": {
      "startEditing": "Start editing", // start modifying JSON in its editor
      "search": "Search" // search within JSON editor
    }
  };

  @Prop({ mutable: true }) value: any = {};

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>{this.translations.itemDetailsTab}</calcite-tab-title>
                <calcite-tab-title>{this.translations.dataTab}</calcite-tab-title>
                <calcite-tab-title>{this.translations.propertiesTab}</calcite-tab-title>
              </calcite-tab-nav>

              <calcite-tab class="config-tab" active>
                solution-item-details/solution-item-details
              </calcite-tab>
              <calcite-tab class="config-tab">
                solution-item-json/solution-item-json
              </calcite-tab>
              <calcite-tab class="config-tab">
                solution-item-json/solution-item-json
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
