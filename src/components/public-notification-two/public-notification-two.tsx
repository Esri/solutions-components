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
          <calcite-shell style={{"display": "table"}}>
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
    // }, {
    //   selectedFeatures: [{}, {},{}, {}, {}, {}, {}, {}],
    //   label: "Counties | No Buffer"
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
            {/* {this._getAction(this.downloadEnabled, "reset", "Reset", (): void => this._reset())} */}
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
      case EPageType.PDF:
        actions = (
          <calcite-action-group>
            <calcite-action icon="chevron-left" onClick={() => {this._setPageType(EPageType.LIST)}} text="Back"/>
            <calcite-action icon="download-to" onClick={() => {this._setPageType(EPageType.LIST)}} text="Back"/>
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
        page = (
          <div>
            <calcite-input-message active class="start-message list-border background-w">
              <div style={{ "width": "100%" }}>
                <map-layer-picker
                  label='Addressee Layer'
                  mapView={this.mapView}
                  onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
                  selectionMode={"single"}
                />
              </div>
            </calcite-input-message>
            <br />
            {
              this._selectionLists.length > 0 ? (
                <calcite-list class="list-border">
                  {
                    this._selectionLists.map(ss => {
                      return (
                        <calcite-list-item 
                          description={`${ss.selectedFeatures.length} selected features`} 
                          label={ss.label}
                        >
                          <calcite-action icon="pencil" slot="actions-end" text='' />
                          <calcite-action icon="x" slot="actions-end" text='' />
                        </calcite-list-item>
                      )
                    })
                  }
                </calcite-list>
              ) : (
                <calcite-input-message active class="start-message list-border background-w">
                  {this.message}
                </calcite-input-message>
              )
            }
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
          <div class="background-w padding-1-2 list-border">
            <calcite-radio-group>
              <calcite-radio-group-item
                checked={true}
                style={{ "width": "50%" }}
                value="Add">Add</calcite-radio-group-item>
              <calcite-radio-group-item
                checked={false}
                style={{ "width": "50%" }}
                value="Remove">
                Remove
              </calcite-radio-group-item>
            </calcite-radio-group>
            <div class={"esri-sketch esri-widget"}>
              <div class={"esri-sketch__panel"}>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action icon="select" scale="s" text="Select" />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action icon="line" scale="s" text="Select by line" />
                  <calcite-action icon="polygon" scale="s" text="Select by polygon" />
                  <calcite-action icon="rectangle" scale="s" text="Select by rectangle" />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action icon="undo" scale="s" text="Undo" />
                  <calcite-action icon="redo" scale="s" text="Redo" />
                </div>
              </div>
            </div>
          </div>
        )
        break;
      case EPageType.PDF:
        page = (
          <div class="background-w padding-1-2 list-border">
          <calcite-select label="">
            <calcite-option>PDF label 30 per page</calcite-option>
            <calcite-option>Rivers</calcite-option>
            <calcite-option>Lakes</calcite-option>
          </calcite-select>
          </div>
        )
        break;
    }
    return page;
  }

  _layerSelectionChange(evt: CustomEvent): void {
    // Needs to come from NLS
    this.message = `Use the '+' button to create a ${evt?.detail?.length > 0 ? evt.detail[0] : ""} notification list.`
  }

  _setPageType(pageType: EPageType): void {
    this.pageType = pageType;
  }

  _downloadCSV(): void {
    alert("Download CSV");
  }

  _downloadPDF(): void {
    this._setPageType(EPageType.PDF);
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
