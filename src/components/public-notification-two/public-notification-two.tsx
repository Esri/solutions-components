import { Component, Host, h, Prop, VNode } from '@stencil/core';
import { ISelectionSet, EPageType } from '../../utils/interfaces';

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

  @Prop({mutable: true}) downloadEnabled = false;

  @Prop({mutable: true}) pageType: EPageType = EPageType.LIST;

  @Prop({mutable: true}) message = "";

  @Prop({mutable: true}) selectionSet = [];

  render() {
    return (
      <Host>
        <div class="main-container page-container">
          <calcite-shell>
            <calcite-shell-panel collapsed={true} position="start" slot='primary-panel'>
              <calcite-action-bar position="start" slot="action-bar">
                {this._getActions()}
              </calcite-action-bar>
            </calcite-shell-panel>
            <div class="page-container" slot="center-row">
              {this._getPage()}
            </div>
          </calcite-shell>
        </div>
      </Host>
    );
  }

  // TODO still thinking through this
  protected _selectionLists: ISelectionSet[] = [
    // {
    //   selectedFeatures: [{}, {}, {}, {}, {}, {}],
    //   label: "Allen School District | No Buffer"
    // }, {
    //   selectedFeatures: [{}, {}],
    //   label: "Sketch 500 ft"
    // }
  ];

  _getActions(): VNode {
    let actions: VNode;
    switch (this.pageType) {
      case EPageType.LIST:
        actions = (
          <calcite-action-group>
            {this._getAction(true, "plus", "Add", (): void => this._setPageType(EPageType.SELECT))}
            {this._getAction(this.downloadEnabled, "test-data", "Refine Selection", (): void => this._setPageType(EPageType.REFINE))}
            {this._getAction(this.downloadEnabled, "file-pdf", "Download PDF", (): void => this._downloadPDF())}
            {this._getAction(this.downloadEnabled, "file-csv", "Download CSV", (): void => this._downloadCSV())}
            {this._getAction(this.downloadEnabled, "reset", "Reset", (): void => this._reset())}
          </calcite-action-group>
        )
        break;
      case EPageType.SELECT:
        actions = (
          <calcite-action-group>
            <calcite-action icon="chevron-left" onClick={() => {this._setPageType(EPageType.LIST)}} text="Back"/>
            {this._getAction(false, "save", "Save", (): void => this._saveSelection())}
          </calcite-action-group>
        );
        break;
      case EPageType.REFINE:
        actions = (
          <calcite-action-group>
            <calcite-action icon="chevron-left" onClick={() => {this._setPageType(EPageType.LIST)}} text="Back"/>
          </calcite-action-group>
        );
        break;
    }
    return actions;
  }

  _getAction(
    enabled: boolean,
    icon: string,
    text: string,
    onClick: any,
    active?: boolean
  ): VNode {
    // wish I knew a better way to do this
    // would do these inline I think if I could use ternary to handle disabled
    return enabled ? 
      (
        <calcite-action
          active={active || false}
          icon={icon}
          onClick={onClick}
          text={text}/>
      ) : (
        <calcite-action
          disabled
          icon={icon}
          onClick={onClick} 
          text={text}/>
        );
  }

  // TODO may just do this as a seperate component..may get a little messy over here..still exploring
  _getPage(): VNode {
    let page: VNode;
    switch (this.pageType) {
      case EPageType.LIST:
        page = this._selectionLists.length > 0 ?
          (
            <div>
              <calcite-input-message active class="start-message list-border background-w">
                <div style={{ "width": "100%" }}>
                  <map-layer-picker mapView={this.mapView} />
                </div>
              </calcite-input-message>
              <br />
              <calcite-list class="list-border">
                {this._selectionLists.map(ss => {
                  return (
                    <calcite-list-item description={`${ss.selectedFeatures.length}
                    selected features`} label={ss.label}>
                      <calcite-action icon="pencil" slot="actions-end" text='' />
                      <calcite-action icon="x" slot="actions-end" text='' />
                    </calcite-list-item>
                  )
                })}
              </calcite-list>
            </div>
          ) :
          (
            <div>
              <calcite-input-message active class="start-message list-border background-w">
                <div style={{ "width": "100%" }}>
                  <map-layer-picker
                    mapView={this.mapView}
                    onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
                  />
                </div>
              </calcite-input-message>
              <br/>
              <calcite-input-message active class="start-message list-border background-w">
                {this.message}
              </calcite-input-message>
            </div>
          )
        break;
      case EPageType.SELECT:
        page = (
          <div class="background-w padding-1-2 list-border">
            <map-select-tools
              mapView={this.mapView}
              searchLayers={this.selectionLayers}
            />
          </div>
        );
        break;
      case EPageType.REFINE:
        page = (
          <div>Allow you to interactively Add/Remove and preview without user created selection graphics and buffers.</div>
        )
        break;
    }
    return page;
  }

  _layerSelectionChange(evt: CustomEvent): void {
    // Needs to come from NLS
    this.message = `Use the '+' button to create a ${evt.detail} notification list.`
  }

  _setPageType(pageType: EPageType): void {
    this.pageType = pageType;
  }

  _downloadCSV(): void {
    alert("Download CSV");
  }

  _downloadPDF(): void {
    alert("Download PDF");
  }

  _reset(): void {
    alert("Reset");
  }

  _saveSelection(): void {
    alert("Save Selection");
  }

  _zoomToExtent(): void {
    alert("Zoom To Extent");
  }
}
