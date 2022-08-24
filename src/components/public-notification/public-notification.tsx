import { Component, Element, Host, h, Listen, Prop, VNode } from '@stencil/core';
import { ISelectionSet, EPageType, ESelectionMode, EWorkflowType } from '../../utils/interfaces';
import { getMapLayerView } from '../../utils/mapViewUtils';

@Component({
  tag: 'public-notification',
  styleUrl: 'public-notification.css',
  shadow: false,
})

export class PublicNotificationTwo {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLMapDrawToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * esri/layers/Layer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html
   */
  @Prop() selectionLayers: __esri.Layer[];

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() addresseeLayer: __esri.FeatureLayerView;

  /**
   * boolean: Save is enabled when we have 1 or more selected features
   */
  @Prop() saveEnabled = false;

  /**
   * utils/interfaces/EPageType: LIST, SELECT, REFINE, PDF, CSV
   */
  @Prop({ mutable: true }) pageType: EPageType = EPageType.LIST;

  /**
   * string: Default message to show when we have no selection sets
   */
  @Prop({ mutable: true }) message = "";

  /**
   * utils/interfaces/ISelectionSet[]: An array of user defined selection sets
   */
  @Prop({ mutable: true }) selectionSets: ISelectionSet[] = [];

  /**
   * number: The number of selected features
   */
  @Prop() numSelected = 0;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @Prop() translations: any = {};

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  protected _selectTools: HTMLMapSelectToolsElement;

  protected activeSelection: ISelectionSet;

  protected _refineTools: HTMLRefineSelectionToolsElement;

  protected addEnabled = true;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Listen("refineSelectionIdsChange", { target: 'window' })
  refineSelectionIdsChange(event: CustomEvent): void {
    const idUpdates = event.detail;
    const addIds = idUpdates?.addIds || [];
    const removeIds = idUpdates?.removeIds || [];

    this._updateSelectionSetsForRemoveIds(removeIds);
  
    this._updateRefineSelectionSet(addIds, removeIds);
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  _getActions(): VNode {
    let actions: VNode;
    const hasSelections = this.selectionSets.length > 0;
    const trans = this.translations;
    const hasRefine = this.selectionSets.some(selectionSet => {
      return selectionSet.workflowType === EWorkflowType.REFINE;
    });
    switch (this.pageType) {
      case EPageType.LIST:
        actions = (
          <calcite-action-group>
            {this._getAction(true, "plus", trans?.add, (): void => this._setPageType(EPageType.SELECT))}
            {this._getAction(hasSelections, "test-data", trans?.refineSelection, (): void => this._setPageType(EPageType.REFINE), hasRefine)}
            {this._getAction(hasSelections, "file-pdf", trans?.downloadPDF, (): void => this._downloadPDF())}
            {this._getAction(hasSelections, "file-csv", trans?.downloadCSV, (): void => this._downloadCSV())}
          </calcite-action-group>
        )
        break;
      case EPageType.SELECT:
        actions = (
          <calcite-action-group>
            {this._getAction(true, "chevron-left", trans?.back, (): void => this._home())}
            {this._getAction(this.saveEnabled, "save", trans?.save, (): Promise<void> => this._saveSelection())}
          </calcite-action-group>
        );
        break;
      case EPageType.REFINE:
        actions = (
          <calcite-action-group>
            {this._getAction(true, "chevron-left", trans?.back, (): void => this._home())}
          </calcite-action-group>
        );
        break;
      case EPageType.PDF:
        actions = (
          <calcite-action-group>
            {this._getAction(true, "chevron-left", trans?.back, (): void => this._setPageType(EPageType.LIST))}
            {this._getAction(true, "download-to", trans?.download, (): void => this._setPageType(EPageType.LIST))}
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
    indicator: boolean = false,
    slot: string = ""
  ): VNode {
    return (
      <calcite-action
        disabled={!enabled}
        icon={icon}
        indicator={indicator}
        onClick={onClick}
        slot={slot}
        text={text} />
    );
  }

  _getPage(): VNode {
    let page: VNode;
    const layerTitle = this.addresseeLayer?.layer?.title;
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
                  selectedLayers={layerTitle ? [layerTitle] : []}
                />
              </div>
            </calcite-input-message>
            <br />
            {
              this.selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE).length > 0 ? (
                <calcite-list class="list-border">
                  {
                    // REFINE is handled seperately from the core selection sets
                    // You can only access after clicking the refine action
                    this.selectionSets.reduce((prev, cur, i) => {
                      if (cur.workflowType !== EWorkflowType.REFINE) {
                        prev.push((
                          <calcite-list-item
                            description={this.translations?.selectedFeatures.replace('{{n}}', cur.selectedIds.length)}
                            label={cur.label}
                            onClick={() => this._flashSelection(cur)}
                          >
                            {this._getAction(true, "pencil", "", (): void => this._openSelection(cur), false, "actions-end")}
                            {this._getAction(true, "x", "", (): void => this._deleteSelection(i), false, "actions-end")}
                          </calcite-list-item>
                        ));
                      }
                      return prev;
                    }, [])
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
                selectLayerView={this.addresseeLayer}
                translations={this.translations}
                selectionSet={this.activeSelection}
                isUpdate={this.activeSelection ? true : false}
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
          <div>
          <div class="background-w padding-1-2 list-border">
            <calcite-radio-group 
              class="w-100"
              onCalciteRadioGroupChange={(evt) => this._modeChanged(evt)}
            >
              <calcite-radio-group-item
                checked={this.addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.ADD)}
                value={ESelectionMode.ADD}
              >
                {this.translations?.add}
              </calcite-radio-group-item>
              <calcite-radio-group-item
                checked={!this.addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.REMOVE)}
                value={ESelectionMode.REMOVE}
              >
                {this.translations?.remove}
              </calcite-radio-group-item>
            </calcite-radio-group>
            <refine-selection-tools
              ids={[...this._getSelectionIds(this.selectionSets)]}
              layerViews={[this.addresseeLayer]}
              mapView={this.mapView}
              mode={this.addEnabled ? ESelectionMode.ADD : ESelectionMode.REMOVE}
              ref={(el) => { this._refineTools = el }}
              translations={this.translations}
              useLayerPicker={false}
            />
          </div>
          <br />
            {
              (
                <calcite-list class="list-border">
                  {this._getRefineSelectionSetList()}
                </calcite-list>
              )
            }
          </div>
        )
        break;
      case EPageType.PDF:
        page = (
          <pdf-download
            layerView={this.addresseeLayer}
            removeDuplicateEnabled={false}
            translations={this.translations}
          />
        )
        break;
    }
    return page;
  }

  _updateSelectionSetsForRemoveIds(
    removeIds: number[]
  ) {
    if (removeIds.length > 0) {
      // update the selection sets selectedIds and remove any selection sets that have no selected features
      this.selectionSets = this.selectionSets.reduce((prev, cur) => {
        cur.selectedIds = cur.selectedIds.filter(id => removeIds.indexOf(id) < 0);
        if (cur.selectedIds.length > 0) {
          prev.push(cur);
        }
        return prev;
      }, []);
    }
  }

  _getRefineSelectionSet() {
    let refineSelectionSet: ISelectionSet;
    this.selectionSets.some(ss => {
      if (ss.workflowType === EWorkflowType.REFINE) {
        refineSelectionSet = ss;
        return true;
      }
    });
    return refineSelectionSet;
  }

  _updateRefineSelectionSet(
    addIds: number[],
    removeIds: number[]
  ) {
    const selectionSet = this._getRefineSelectionSet()
    if (selectionSet) {
      const _addIds = [...new Set(selectionSet.refineIds.addIds.concat(addIds))];
      const _removeIds = [...new Set(selectionSet.refineIds.removeIds.concat(removeIds))];
      selectionSet.refineIds = {
        addIds: _addIds.filter(id => _removeIds.indexOf(id) < 0),
        removeIds: _removeIds.filter(id => _addIds.indexOf(id) < 0)
      }
      selectionSet.selectedIds = selectionSet.refineIds.addIds.length > 0 ?
        [...new Set(selectionSet.selectedIds.concat(selectionSet.refineIds.addIds))] :
        selectionSet.selectedIds.filter(id => selectionSet.refineIds.removeIds.indexOf(id) < 0);

      this.selectionSets = this.selectionSets.map(ss => {
        if (ss.workflowType === EWorkflowType.REFINE) {
          return selectionSet;
        } else {
          return ss;
        }
      })
    } else {
      this.selectionSets = [
        ...this.selectionSets,
        ({
          buffer: undefined,
          distance: 0,
          geometries: [],
          id: Date.now(),
          label: "Refine",
          layerView: this.addresseeLayer,
          refineSelectLayers: [],
          searchResult: undefined,
          selectedIds: addIds,
          unit: "feet",
          workflowType: EWorkflowType.REFINE,
          refineIds: {
            addIds: addIds,
            removeIds: removeIds
          }
        })
      ];
    }
  }

  _getRefineSelectionSetList() {
    const refineSets = this.selectionSets.filter(ss => ss.workflowType === EWorkflowType.REFINE);
    
    const hasRefineSet = refineSets.length > 0;
    const refineSet = hasRefineSet ? refineSets[0] : undefined;
    
    const total = this.selectionSets.reduce((prev, cur) => {
      return prev += cur.selectedIds.length
    }, 0);

    const numAdded = hasRefineSet ? refineSet.refineIds.addIds.length : 0;
    const numRemoved = hasRefineSet ? refineSet.refineIds.removeIds.length : 0;

    return [(
      <calcite-list-item
        label={this.translations?.featuresAdded?.replace('{{n}}', numAdded)}
        // onClick={() => this._flashSelection(refineSet)}
      >
        {this._getAction(numAdded > 0, "reset", "", (): void => this._revertSelection(refineSet, true), false, "actions-end")}
      </calcite-list-item>
    ),(
      <calcite-list-item
        label={this.translations?.featuresRemoved?.replace('{{n}}', numRemoved)}
        // onClick={() => this._flashSelection(refineSet)}
      >
        {this._getAction(numRemoved > 0, "reset", "", (): void => this._revertSelection(refineSet, false), false, "actions-end")}
      </calcite-list-item>
    ), (
      <calcite-list-item
        label={this.translations?.totalSelected?.replace('{{n}}', total)}
        // onClick={() => this._flashSelection(refineSet)}
      />
    )];
  }

  _revertSelection(
    refineSet: ISelectionSet,
    isAdd: boolean
  ) {
    if (isAdd) {
      refineSet.selectedIds = refineSet.selectedIds.filter(id => refineSet.refineIds.addIds.indexOf(id) < 0)
      refineSet.refineIds.addIds = [];
    } else {
      refineSet.refineIds.addIds = refineSet.refineIds.removeIds;
      refineSet.selectedIds = [...new Set([
        ...refineSet.selectedIds,
        ...refineSet.refineIds.addIds
      ])]
      refineSet.refineIds.removeIds = [];
    }
    this._refineTools.reset().then(() => {
      this.selectionSets = this.selectionSets.map(ss => {
        if (ss.workflowType === EWorkflowType.REFINE) {
          ss = refineSet;
        }
        return ss;
      });
    });
  }

  _setSelectionMode(
    mode: ESelectionMode
  ): void {
    this._refineTools.mode = mode;
  }

  _getSelectionIds(
    selectionSets: ISelectionSet[]
  ): number[] {
    return Object.keys(selectionSets).reduce((prev, cur) => {
      return [
        ...prev,
        ...selectionSets[cur].selectedIds
      ]
    }, []);
  }

  _modeChanged(evt: CustomEvent): void {
    this.addEnabled = evt.detail === ESelectionMode.ADD;
  }

  async _layerSelectionChange(evt: CustomEvent): Promise<void> {
    const title: string = evt?.detail?.length > 0 ? evt.detail[0] : "";
    this.addresseeLayer = await getMapLayerView(this.mapView, title);
    this.message = this.translations?.startMessage.replace("{{n}}", evt?.detail?.length > 0 ? evt.detail[0] : "");
  }

  _updateForSelection(evt: CustomEvent) {
    this.numSelected = evt.detail;
    this.saveEnabled = this.numSelected > 0;
  }

  _home(): void {
    this._clearSelection();
    this._setPageType(EPageType.LIST);
  }

  _setPageType(pageType: EPageType): void {
    this.pageType = pageType;
    if (pageType === EPageType.LIST) {
      this.numSelected = 0;
    }
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
    const results = await this._selectTools.getSelection();
    const isUpdate = this._selectTools.isUpdate;

    if (isUpdate) {
      this.selectionSets = this.selectionSets.map(ss => {
        return ss.id === results.id ? results : ss;
      });
    } else {
      this.selectionSets = [
        ...this.selectionSets,
        results
      ]
    }
    this._home();
  }

  _clearSelection () {
    this._selectTools?.clearSelection();
    this.numSelected = 0;
    this.activeSelection = undefined;
  }

  _deleteSelection(index: number) {
    this.selectionSets = this.selectionSets.filter((ss, i) => {
      if (i !== index) {
        return ss;
      }
    });
  }

  _openSelection(selectionSet: ISelectionSet) {
    this.activeSelection = selectionSet;
    this.pageType = EPageType.SELECT;
  }

  _flashSelection(
    selectionSet: ISelectionSet
  ) {
    const objectIds = selectionSet.selectedIds;
    const featureFilter = {
      objectIds
    } as __esri.FeatureFilter;
    selectionSet.layerView.featureEffect = {
      filter: featureFilter,
      includedEffect: "bloom(1.3, 0.1px, 5%)",
      excludedEffect: "blur(5px) grayscale(90%) opacity(40%)"
    } as __esri.FeatureEffect;

    setTimeout(() => {
      selectionSet.layerView.featureEffect = undefined;
    }, 1300);
  }

  _zoomToExtent(): void {
    alert("Zoom To Extent");
  }
}
