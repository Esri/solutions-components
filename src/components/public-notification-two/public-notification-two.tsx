import { Component, Host, h, Prop, VNode } from '@stencil/core';
import { EExportType, ISelectionSet, EPageType } from '../../utils/interfaces';

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

  @Prop({mutable: true}) selectionActive = false;

  @Prop({mutable: true}) downloadEnabled = false;

  @Prop({mutable: true}) hasSelectedFeatures = false;

  render() {
    return (
      <Host>
        <div class="main-container">
          <calcite-shell>
            <calcite-shell-panel detached position="start" slot="primary-panel">
              <calcite-action-bar position={'start'} slot="action-bar">
                {this._getActions()}
              </calcite-action-bar>
              {this._getPage(this._pageType)}
          </calcite-shell-panel>
          </calcite-shell>
        </div>
      </Host>
    );
  }

  // TODO still thinking through this
  protected _selectionLists: ISelectionSet[];

  protected _pageType: EPageType = EPageType.LIST;

  _getActions(): VNode {
    return this.selectionActive ? (
      <calcite-action-group>
        <calcite-action icon="chevron-left" onClick={() => {this._showSelectionPage(false)}} text="Back"/>
        {this._getSaveAction(false)}
      </calcite-action-group>
    ) : (
      <calcite-action-group>
        <calcite-action icon="plus" label='Add' onClick={() => {this._showSelectionPage(true)}} text="Add"/>
        {/* <calcite-action disabled icon="file-magnifying-glass" label='Refine Selection' onClick={() => {this._showSelectionPage(true)}} text="Refine Selection"/> */}
        <calcite-action disabled icon="test-data" label='Refine Selection' onClick={() => {this._showSelectionPage(true)}} text="Refine Selection"/>
        {/* <calcite-action disabled icon="view-visible" label='Refine Selection' onClick={() => {this._showSelectionPage(true)}} text="Refine Selection"/> */}
        {this._getDownloadAction(EExportType.PDF)}
        {this._getDownloadAction(EExportType.CSV)}
      </calcite-action-group>
    );
  }

  _getDownloadAction(type: EExportType): VNode {
    let action: VNode;
    switch (type) {
      case EExportType.PDF:
        action = this.downloadEnabled ? 
          (<calcite-action icon="file-pdf" text="Download PDF"/>) :
          (<calcite-action disabled icon="file-pdf" text="Download PDF"/>)
        break;
    
      case EExportType.CSV:
        action = this.downloadEnabled ? 
          (<calcite-action icon="file-csv" text="Download CSV"/>) :
          (<calcite-action disabled icon="file-csv" text="Download CSV"/>)
        break;
    }
    return action;
  }

  _getSaveAction(saveEnabled: boolean): VNode {
    return saveEnabled ? 
      (<calcite-action icon="save" text="Save"/>) :
      (<calcite-action disabled icon="save" text="Save"/>);
  }

  _showSelectionPage(show: boolean): void {
    this._pageType = show ? EPageType.SELECT : EPageType.LIST;
    this.selectionActive = show;
  }

  // TODO may just do this as a seperate component..may get a little messy over here..still exploring
  _getPage(pageType: EPageType): VNode {
    let page: VNode;
    switch (pageType) {
      case EPageType.LIST:
        page = this.hasSelectedFeatures ?
          (
            <calcite-list>
              {this._selectionLists.map(ss => {
                (
                  <calcite-list-item description={`${ss.selectedFeatures.length} selected features`} label={ss.label}>
                    <calcite-action icon="pencil" slot="actions-end" text='' />
                    <calcite-action icon="x" slot="actions-end" text='' />
                  </calcite-list-item>
                )
              })} 
            </calcite-list>
          ) :
          (
            <calcite-input-message active style={{"padding": "1rem"}} >
              Use the Add button to create a notification list.
            </calcite-input-message>
          )
        break;
      case EPageType.SELECT:
        page = (
          <div class="background-w padding-top-1-2">
            <map-layer-picker mapView={this.mapView} />
            <map-search
              mapView={this.mapView}
              searchLayers={this.selectionLayers}
            />
          </div>
        );
        break;
    }
    return page;
  }
}
