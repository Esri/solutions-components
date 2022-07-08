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

  @Prop({ mutable: true }) downloadEnabled = false;

  @Prop({ mutable: true }) pageType: EPageType = EPageType.LIST;

  @Prop({ mutable: true }) message = "";

  @Prop({ mutable: true }) selectionSet = [];

  @Prop() translations: any = {};

  render() {
    return (
      <Host>
        <div class="main-container page-container">
          <calcite-shell style={{ "display": "table" }}>
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
            {this._getAction(true, "plus", this.translations?.add, (): void => this._setPageType(EPageType.SELECT))}
            {this._getAction(this.downloadEnabled, "test-data", this.translations?.refineSelection, (): void => this._setPageType(EPageType.REFINE))}
            {this._getAction(this.downloadEnabled, "file-pdf", this.translations?.downloadPDF, (): void => this._downloadPDF())}
            {this._getAction(this.downloadEnabled, "file-csv", this.translations?.downloadCSV, (): void => this._downloadCSV())}
          </calcite-action-group>
        )
        break;
      case EPageType.SELECT:
        actions = (
          <calcite-action-group>
            <calcite-action icon="chevron-left" onClick={() => { this._setPageType(EPageType.LIST) }} text={this.translations?.back} />
            {this._getAction(false, "save", this.translations?.save, (): void => this._saveSelection())}
          </calcite-action-group>
        );
        break;
      case EPageType.REFINE:
        actions = (
          <calcite-action-group>
            <calcite-action icon="chevron-left" onClick={() => { this._setPageType(EPageType.LIST) }} text={this.translations?.back} />
          </calcite-action-group>
        );
        break;
      case EPageType.PDF:
        actions = (
          <calcite-action-group>
            <calcite-action icon="chevron-left" onClick={() => { this._setPageType(EPageType.LIST) }} text={this.translations?.back} />
            <calcite-action icon="download-to" onClick={() => { this._setPageType(EPageType.LIST) }} text={this.translations?.download} />
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
          text={text} />
      ) : (
        <calcite-action
          disabled
          icon={icon}
          onClick={onClick}
          text={text} />
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
                  label={this.translations?.addresseeLayer}
                  mapView={this.mapView}
                  onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
                  selectionMode={"single"}
                  translations={this.translations}
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
                          description={this.translations?.selectedFeatures.replace('{{n}}', ss.selectedFeatures.length)}
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
          <div>
            <div class="background-w padding-1-2 list-border">
              <map-select-tools
                mapView={this.mapView}
                searchLayers={this.selectionLayers}
                translations={this.translations}
              />
            </div>
            {/* TODO add this later */}
            {/* <br />
            <calcite-input-message active class="start-message list-border background-w">
              20 selected features
            </calcite-input-message> */}
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
                value="Add"
              >
                {this.translations?.add}
              </calcite-radio-group-item>
              <calcite-radio-group-item
                checked={false}
                style={{ "width": "50%" }}
                value="Remove"
              >
                {this.translations?.remove}
              </calcite-radio-group-item>
            </calcite-radio-group>
            {
              // Create seperate component for these
            }
            <div class={"esri-sketch esri-widget"}>
              <div class={"esri-sketch__panel"}>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action icon="select" scale="s" text={this.translations?.select} />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action icon="line" scale="s" text={this.translations?.selectLine} />
                  <calcite-action icon="polygon" scale="s" text={this.translations?.selectPolygon} />
                  <calcite-action icon="rectangle" scale="s" text={this.translations?.selectRectangle} />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action icon="undo" scale="s" text={this.translations?.undo} />
                  <calcite-action icon="redo" scale="s" text={this.translations?.redo} />
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
    this.message = this.translations?.startMessage.replace("{{n}}", evt?.detail?.length > 0 ? evt.detail[0] : "");
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
