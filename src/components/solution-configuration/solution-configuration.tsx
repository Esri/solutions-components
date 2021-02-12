import { Component, Element, h, Host, Prop, VNode } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";

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
    },

    "spatialRef": {
      "specifyParam": "Spatial Reference Parameter",
      "defaultSpatialRef": "Default Spatial Reference",
      "featureServicesHeading": "Feature Services"
    }
  };

  @Prop({ mutable: true }) value: any = {};

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
                    <solution-inventory id="configInventory"></solution-inventory>
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

  item: HTMLSolutionItemElement;
  spatialRef: HTMLSolutionSpatialRefElement;

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