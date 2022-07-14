import { Component, Host, h, Prop, VNode } from '@stencil/core';
import { ISelectionSet, EPageType, ERefineMode } from '../../utils/interfaces';
import { getMapLayer } from '../../utils/mapViewUtils';

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

  @Prop() addresseeLayer: __esri.FeatureLayer;

  @Prop({ mutable: true }) downloadEnabled = false;

  @Prop() saveEnabled = false;

  @Prop({ mutable: true }) pageType: EPageType = EPageType.LIST;

  @Prop({ mutable: true }) message = "";

  @Prop({ mutable: true }) selectionSet = [];

  @Prop() numSelected = 0;

  @Prop() translations: any = {};

  render() {
    return (
      <Host>
        <div class="main-container page-container">
          <calcite-shell class="main-shell">
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

  protected _selectTools: HTMLMapSelectToolsElement;

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
            <calcite-action icon="chevron-left" onClick={() => { this._clearSelection() }} text={this.translations?.back} />
            {this._getAction(this.saveEnabled, "save", this.translations?.save, (): Promise<void> => this._saveSelection())}
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
              <div class="w-100">
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
                          <calcite-action icon="pencil" slot="actions-end" text='' onClick={() => this._openSelection(ss)} />
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
                onSelectionSetChange={(evt) => this._updateForSelection(evt)}
                ref={(el) => { this._selectTools = el }}
                searchLayers={this.selectionLayers}
                selectLayer={this.addresseeLayer}
                translations={this.translations}
              />
            </div>
            {
              this.numSelected > 0 ? (
                <div>
                  <br />
                  <calcite-input-message active class="start-message list-border background-w">
                    {this.translations.selectedFeatures.replace("{{n}}", this.numSelected)}
                  </calcite-input-message>
                </div>
              ) : (<div />)
            }
          </div>
        );
        break;
      case EPageType.REFINE:
        page = (
          <div class="background-w padding-1-2 list-border">
            <calcite-radio-group 
              class="w-100"
              onCalciteRadioGroupChange={(evt) => this._modeChanged(evt)}
            >
              <calcite-radio-group-item
                checked={this.addEnabled}
                class="w-50"
                value={ERefineMode.ADD}
              >
                {this.translations?.add}
              </calcite-radio-group-item>
              <calcite-radio-group-item
                checked={!this.addEnabled}
                class="w-50"
                value={ERefineMode.REMOVE}
              >
                {this.translations?.remove}
              </calcite-radio-group-item>
            </calcite-radio-group>
            <refine-selection-tools
              mapView={this.mapView}
              mode={this.addEnabled ? ERefineMode.ADD : ERefineMode.REMOVE}
              searchLayers={this.selectionLayers}
              translations={this.translations}
            />
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

  protected addEnabled = true;

  _modeChanged(evt: CustomEvent): void {
    this.addEnabled = evt.detail === ERefineMode.ADD;
  }

  async _layerSelectionChange(evt: CustomEvent): Promise<void> {
    const title: string = evt?.detail?.length > 0 ? evt.detail[0] : "";
    this.addresseeLayer = await getMapLayer(this.mapView, title);
    // Needs to come from NLS
    this.message = this.translations?.startMessage.replace("{{n}}", evt?.detail?.length > 0 ? evt.detail[0] : "");
  }

  _updateForSelection(evt: CustomEvent) {
    this.numSelected = evt.detail;
    this.saveEnabled = this.numSelected > 0;
  }

  _setPageType(pageType: EPageType): void {
    // TODO may handle this elsewhere
    if (pageType === EPageType.LIST) {
      this.numSelected = 0;
    }
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

  async _saveSelection(): Promise<void> {
    const selectedFeatures = await this._selectTools.getSelectedFeatures();
    const label = await this._selectTools.getSelectionLabel();
    // TODO...need to work through what happens when you have a selection and
    // switch workflow type
    const workflowType = this._selectTools.workflowType;

    this._selectionLists.push({
      label,
      selectedFeatures,
      workflowType,
      
    });

    this.pageType = EPageType.LIST;

    this._selectTools.clearSelection();
  }

  _clearSelection () {
    this._selectTools.clearSelection();
    this._setPageType(EPageType.LIST)
  }

  _openSelection(selectionSet: ISelectionSet) {
    // need to be able to pass this back
    // may need to keep track of other state things like type so we can repopulate appropriately
    console.log(selectionSet)
  }

  _zoomToExtent(): void {
    alert("Zoom To Extent");
  }
}
