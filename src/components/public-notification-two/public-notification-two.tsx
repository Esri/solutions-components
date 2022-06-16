import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'public-notification-two',
  styleUrl: 'public-notification-two.css',
  shadow: false,
})
export class PublicNotificationTwo {

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  @Prop() selectionLayers: __esri.Layer[];

  render() {
    return (
      <Host>
        {/* <div style="height:40em"> */}
        <div class="main-container">
          <calcite-shell>
            <calcite-shell-panel detached position="start" slot="primary-panel">
              <calcite-action-bar slot="action-bar">
                <calcite-action-group>
                  <calcite-action icon="plus" text="Add"/>
                  {/* <calcite-action icon="chevron-left" text="Back"/> */}
                  {/* <calcite-action disabled icon="download-to" text="Download"/> */}
                  <calcite-action disabled icon="file-pdf" text="Download PDF"/>
                  <calcite-action disabled icon="file-csv" text="Download CSV"/>
                  {/* <calcite-action disabled icon="save" text="Save"/> */}
                </calcite-action-group>
              </calcite-action-bar>

              {/* <map-search mapView={this.mapView} searchLayers={this.selectionLayers}/>
              <map-layer-picker 
                mapView={this.mapView}
              /> */}

              {/* <pdf-download /> */}

              <calcite-list>
                <calcite-list-item description="0 selected features" label="Parcels">
                  <calcite-action icon="pencil" slot="actions-end" text='' />
                  <calcite-action icon="x" slot="actions-end" text='' />
                </calcite-list-item>
                {/* <calcite-list-item description="8 selected features" label="Schools">
                  <calcite-action icon="pencil" slot="actions-end" text='' />
                  <calcite-action icon="x" slot="actions-end" text='' />
                </calcite-list-item>
                <calcite-list-item description="10 selected features" label="Districts">
                  <calcite-action icon="pencil" slot="actions-end" text='' />
                  <calcite-action icon="x" slot="actions-end" text='' />
                </calcite-list-item> */}
              </calcite-list>

            </calcite-shell-panel>
          </calcite-shell>
        </div>
      </Host>
    );
  }

}
