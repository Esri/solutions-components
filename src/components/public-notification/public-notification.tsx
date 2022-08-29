import { Component, Element, Host, h, Listen, Prop, State, VNode, Watch } from '@stencil/core';
import { ISelectionSet, EPageType, ESelectionMode, EWorkflowType } from '../../utils/interfaces';
import { flashSelection, getMapLayerView, highlightFeatures } from '../../utils/mapViewUtils';
import state from "../../utils/publicNotificationStore";
import PublicNotification_T9n from '../../assets/t9n/public-notification/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

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
   * string: Default message to show when we have no selection sets
   */
  @Prop({ mutable: true }) message = "";

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State()
  translations: typeof PublicNotification_T9n;

  /**
   * boolean: Save is enabled when we have 1 or more selected features
   */
  @State() saveEnabled = false;

  /**
   * utils/interfaces/EPageType: LIST, SELECT, REFINE, PDF, CSV
   */
  @State() pageType: EPageType = EPageType.LIST;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @State() selectionSets: ISelectionSet[] = [];

  /**
   * number: The number of selected features
   */
  @State() numSelected = 0;

  protected _selectTools: HTMLMapSelectToolsElement;

  protected activeSelection: ISelectionSet;

  protected _refineTools: HTMLRefineSelectionToolsElement;

  protected addEnabled = true;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch('selectionSets')
  async selectionSetsWatchHandler(
    v: ISelectionSet[],
    oldV: ISelectionSet[]
  ) {
    if (v && v !== oldV && v.length > 0) {
      const nonRefineSets = v.filter(ss => ss.workflowType !== EWorkflowType.REFINE)
      if (nonRefineSets.length === 0) {
        this.selectionSets = []
      }
    }
  }

  @Watch('pageType')
  async pageTypeWatchHandler(
    v: EPageType
  ) {
    await this._clearHighlight();
    if (v === EPageType.LIST) {
      this._highlightFeatures();
    }
  }

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

  componentDidLoad() {
    this._getTranslations();
  }

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
    const hasSelections = this.selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE).length > 0;
    const trans = this.translations;
    const hasRefine = this._hasRefine();
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
            {this._getAction(true, "chevron-left", trans?.back, (): Promise<void> => this._home())}
            {this._getAction(this.saveEnabled, "save", trans?.save, (): Promise<void> => this._saveSelection())}
          </calcite-action-group>
        );
        break;
      case EPageType.REFINE:
        actions = (
          <calcite-action-group>
            {this._getAction(true, "chevron-left", trans?.back, (): Promise<void> => this._home())}
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
    const total = this._getTotal();
    const totalSelected = this.translations?.totalSelected.replace("{{n}}", total.toString())
    const layerPickerLabel = total > 0 ? `${totalSelected}` : '';
    switch (this.pageType) {
      case EPageType.LIST:
        page = (
          <div>
            <calcite-input-message active class="layer-picker-container list-border background-w">
              <div class="w-100">
                <map-layer-picker
                  label={this.translations?.addresseeLayer}
                  mapView={this.mapView}
                  onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
                  selectionMode={"single"}
                  selectedLayers={layerTitle ? [layerTitle] : []}
                />
                <calcite-label scale='s'>{layerPickerLabel}</calcite-label>
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
                            description={this.translations?.selectedFeatures.replace('{{n}}', cur.selectedIds.length.toString())}
                            label={cur.label}
                            onClick={() => flashSelection(cur)}
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
                selectionSet={this.activeSelection}
                isUpdate={this.activeSelection ? true : false}
              />
            </div>
            {
              this.numSelected > 0 ? (
                <div>
                  <br />
                  <calcite-input-message active class="start-message list-border background-w">
                    {this.translations.selectedFeatures.replace("{{n}}", this.numSelected.toString())}
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
              ids={this._getSelectionIds(this.selectionSets)}
              layerViews={[this.addresseeLayer]}
              mapView={this.mapView}
              mode={this.addEnabled ? ESelectionMode.ADD : ESelectionMode.REMOVE}
              ref={(el) => { this._refineTools = el }}
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
          />
        )
        break;
    }
    return page;
  }

  _hasRefine(): boolean {
    return this.selectionSets.some(selectionSet => {
      return selectionSet.workflowType === EWorkflowType.REFINE &&
        (selectionSet.refineIds.addIds.length > 0 || selectionSet.refineIds.removeIds.length > 0);
    });
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
        label={this.translations?.featuresAdded?.replace('{{n}}', numAdded.toString())}
      >
        {this._getAction(numAdded > 0, "reset", "", (): void => this._revertSelection(refineSet, true), false, "actions-end")}
      </calcite-list-item>
    ),(
      <calcite-list-item
        label={this.translations?.featuresRemoved?.replace('{{n}}', numRemoved.toString())}
      >
        {this._getAction(numRemoved > 0, "reset", "", (): void => this._revertSelection(refineSet, false), false, "actions-end")}
      </calcite-list-item>
    ), (
      <calcite-list-item
        label={this.translations?.totalSelected?.replace('{{n}}', total.toString())}
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

  _getTotal(): Number {
    return [...new Set(this._getSelectionIds(this.selectionSets))].length;
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

  async _home() {
    await this._clearSelection();
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

  async _clearSelection () {
    await this._selectTools?.clearSelection();
    this.numSelected = 0;
    this.activeSelection = undefined;
  }

  _deleteSelection(index: number) {
    this.selectionSets = this.selectionSets.filter((ss, i) => {
      if (i !== index) {
        return ss;
      }
    });
    this._highlightFeatures();
  }

  _openSelection(selectionSet: ISelectionSet) {
    this.activeSelection = selectionSet;
    this.pageType = EPageType.SELECT;
  }

  async _highlightFeatures() {
    await this._clearHighlight();
    state.highlightHandle = await highlightFeatures(
      this.mapView,
      this.addresseeLayer,
      this._getSelectionIds(this.selectionSets)
    );
  }

  async _clearHighlight() {
    if (state.highlightHandle) {
      state.highlightHandle.remove();
    }
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof PublicNotification_T9n;
  }
}
