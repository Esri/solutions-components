import { Component, Element, Host, h, Prop, Listen, State, VNode, Watch } from '@stencil/core';
import { EExportType, EPageType, ESelectionMode, EWorkflowType, ISelectionSet } from '../../utils/interfaces';
import { getMapLayerView, highlightFeatures } from '../../utils/mapViewUtils';
import state from "../../utils/publicNotificationStore";
import NewPublicNotification_T9n from '../../assets/t9n/new-public-notification/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'new-public-notification',
  styleUrl: 'new-public-notification.css',
  shadow: false,
})
export class NewPublicNotification {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLNewPublicNotificationElement;

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

  @Prop() mode: "full" | "express" = "express";

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() translations: typeof NewPublicNotification_T9n;

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
    this._clearHighlight();
    if (v === EPageType.LIST) {
      await this._highlightFeatures();
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

  async componentWillLoad() {
    await this._getTranslations();
  }

  render() {
    const refineClass = this.mode === "express" ? " display-none" : "";
    const hasSelections = this.selectionSets.length > 0;
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout='horizontal' slot="header">
            {this._getAction("list-check", false, EPageType.LIST, this.translations?.myLists)}
            {this._getAction("test-data", !hasSelections, EPageType.REFINE, this.translations?.refineSelection, refineClass)}
            {this._getAction("file-pdf", !hasSelections, EPageType.PDF, this.translations?.downloadPDF)}
            {this._getAction("file-csv", !hasSelections, EPageType.CSV, this.translations?.downloadCSV)}
          </calcite-action-bar>
          {this._getPage(this.pageType)}
        </calcite-shell>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  _getAction(
    icon: string,
    disabled: boolean,
    pageType: EPageType,
    tip: string,
    showClass: string = ""
  ): VNode {
    const w = this.mode === "express" ? "w-1-3" : "w-1-4";
    return (
      <calcite-action-group class={"action-center " + w + showClass} layout='horizontal'>
        <calcite-action
          alignment='center'
          class="width-full height-full"
          compact={false}
          disabled={disabled}
          id={icon}
          onClick={() => { this._setPageType(pageType) }}
          text=""
          icon={icon}
        />
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  _setPageType(
    pageType: EPageType
  ) {
    this.pageType = pageType;
  }

  _getPage(
    pageType: EPageType
  ): VNode {
    let page: VNode;
    switch (pageType) {
      case EPageType.LIST:
        page = this._getListPage();
        break;

      case EPageType.LAYER:
        page = this._getLayerPage();
        break;

      case EPageType.SEARCH:
        page = this._getSearchPage();
        break;

      case EPageType.SELECT:
        page = this._getSelectPage();
        break;

      case EPageType.REFINE:
        page = this._getRefinePage();
        break;

      case EPageType.PDF:
        page = this._getPDFPage();
        break;

      case EPageType.CSV:
        page = this._getCSVPage();
        break;

    }
    return page;
  }

  _getListPage(): VNode {
    return (
      <calcite-panel>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">{this.translations?.myLists}</calcite-label>
          <calcite-label>{this.translations?.notifications}</calcite-label>
        </div>
        <div class="info-message">
          <calcite-input-message active class="info-blue" scale='m'>{this.translations?.noNotifications}</calcite-input-message>
        </div>
        {this._getNotice(this.translations?.notice)}
        <div class="display-flex padding-1">
          <calcite-button width="full" onClick={() => { this._setPageType(EPageType.LAYER) }}>{this.translations?.add}</calcite-button>
        </div>
      </calcite-panel>
    );
  }

  _getLayerPage(): VNode {
    const labelClass = this.mode === "full" ? " display-none" : "";
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.LIST)}
        {this._getLabel(this.translations?.stepOne)}
        {this._getNotice(this.translations?.stepOneTip)}
        <div class="display-flex padding-top-sides-1">
          <calcite-label class="font-bold width-full">{this.translations?.addresseeLayer}
            <map-layer-picker
              mapView={this.mapView}
              onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
              selectionMode={"single"}
            //selectedLayers={layerTitle ? [layerTitle] : []}
            />
          </calcite-label>
        </div>
        <div class={"padding-top-sides-1" + labelClass}>
          {this._getNameLabel()}
        </div>
        {
          this._getPageNavButtons(
            this.translations?.next,
            false,
            () => { this._setPageType(EPageType.SEARCH) },
            this.translations?.cancel,
            false,
            () => { this._setPageType(EPageType.LIST) }
          )
        }
      </calcite-panel>
    );
  }

  _getSearchPage(): VNode {
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.LAYER)}
        {this._getLabel(this.translations?.stepTwo)}
        {this._getIconLabel(this.translations?.search)}
        {this._getMapSearch()}
        {this._getNotice(this.translations?.stepTwoTip)}
        {
          this._getPageNavButtons(
            this.translations?.next,
            false,
            () => { this._setPageType(EPageType.SELECT) },
            this.translations?.cancel,
            false,
            () => { this._setPageType(EPageType.LIST) }
          )
        }
      </calcite-panel>
    );
  }

  _getSelectPage(): VNode {
    const isExpress = this.mode === "express";
    // TODO the replace value and searchTip will need to change depending upon the selection mode
    const stepLabel = isExpress ? this.translations?.stepThree : this.translations?.stepTwoFull.replace("{{n}}", this.translations?.stepTwoFullSearch);
    const noticeText = isExpress ? this.translations?.stepThreeTip : `${this.translations?.stepTwoFullSearchTip} ${this.translations?.stepOptional}`;
    const hideClass = isExpress ? "" : " display-none";
    const showClass = isExpress ? " display-none" : "";
    
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.LAYER)}
        {this._getLabel(stepLabel)}
        <div class={hideClass}>
          {this._getIconLabel(this.translations?.search)}
          {this._getMapSearch()}
        </div>
        {this._getNotice(noticeText)}
        <div class={hideClass}>
          {this._getIconLabel(this.translations?.select)}
          <div class="padding-sides-1 padding-bottom-1">
            <map-draw-tools mapView={this.mapView}></map-draw-tools>
          </div>
          <div class="margin-side-1 padding-top-1-2 border-top"></div>
          {this._getIconLabel(this.translations?.searchDistance)}
          <div class="padding-sides-1 padding-bottom-1">
            <buffer-tools appearance='slider' />
          </div>
        </div>
        <div class={"padding-1" + showClass}>
          <map-select-tools
            class="font-bold"
            mapView={this.mapView}
            onSelectionSetChange={(evt) => this._updateForSelection(evt)}
            ref={(el) => { this._selectTools = el }}
            searchLayers={this.selectionLayers}
            selectLayerView={this.addresseeLayer}
            selectionSet={this.activeSelection}
            isUpdate={this.activeSelection ? true : false}
          />
          <div class="display-block padding-top-1">
            {this._getNameLabel()}
          </div>
        </div>
        <div class="padding-sides-1 padding-bottom-1" style={{ "align-items": "end", "display": "flex" }}>
          <calcite-icon class="info-blue padding-end-1-2" icon="feature-layer" scale="s" />
          <calcite-input-message active class="info-blue" scale='m'>
            {this.translations?.selectedAddresses.replace('{{n}}', this.numSelected.toString())}
          </calcite-input-message>
        </div>
        {
          this._getPageNavButtons(
            this.translations?.done,
            this.numSelected === 0,
            (): Promise<void> => this._saveSelection(),
            this.translations?.cancel,
            false,
            () => { this._setPageType(EPageType.LIST) }
          )
        }
      </calcite-panel>
    );
  }

  _getRefinePage(): VNode {
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.LAYER)}
        {this._getLabel(this.translations?.refineSelection)}
        {this._getNotice(this.translations?.refineTip)}
        <div class="padding-1">
          <div>
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
                {this.translations.add}
              </calcite-radio-group-item>
              <calcite-radio-group-item
                checked={!this.addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.REMOVE)}
                value={ESelectionMode.REMOVE}
              >
                {this.translations.remove}
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
        {
          this._getPageNavButtons(
            this.translations?.done,
            false,
            () => { this._setPageType(EPageType.LIST) },
            this.translations?.cancel,
            false,
            () => { this._setPageType(EPageType.LIST) }
          )
        }
      </calcite-panel>
    );
  }

  _getPDFPage(): VNode {
    return this._getDownloadPage(EExportType.PDF);
  }

  _getCSVPage(): VNode {
    return this._getDownloadPage(EExportType.CSV);
  }

  _getDownloadPage(
    type: EExportType
  ): VNode {
    const isPdf = type === EExportType.PDF;
    return (
      <div>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">
            {isPdf ? this.translations?.pdfDownloads : this.translations?.csvDownloads}
          </calcite-label>
          <calcite-label>
            {this.translations?.notifications}
          </calcite-label>
        </div>
        {this._getSelectionLists()}
        <div class={isPdf ? "" : "display-none"}>
          <div class="margin-side-1 padding-top-1 border-bottom"></div>
          {this._getLabel(this.translations?.selectPDFLabelOption)}
          <div class="padding-sides-1">
            <pdf-download />
          </div>
        </div>
        <div class="padding-1 display-flex">
          <calcite-button
            width="full"
            onClick={isPdf ? this._downloadPDF : this._downloadCSV}
          >
            {isPdf ? this.translations?.downloadPDF : this.translations?.downloadCSV}
          </calcite-button>
        </div>
      </div>
    );
  }

  _getPageNavButtons(
    nextLabel: string,
    nextControlDisabled: boolean,
    nextFunc: () => void,
    cancelLabel: string,
    cancelControlDisabled: boolean,
    cancelFunc: () => void
  ): VNode {
    return (
      <div>
        <div class="display-flex padding-top-sides-1">
          <calcite-button
            disabled={cancelControlDisabled}
            width="full"
            onClick={nextFunc}
          >
            {nextLabel}
          </calcite-button>
        </div>
        <div class="display-flex padding-top-1-2 padding-sides-1">
          <calcite-button
            appearance='outline'
            disabled={nextControlDisabled}
            width="full"
            onClick={cancelFunc}
          >
            {cancelLabel}
          </calcite-button>
        </div>
      </div>
    )
  }

  _getPageBack(
    backPage: EPageType
  ): VNode {
    return (
      <div class="padding-top-sides-1 display-flex">
        <calcite-label
          alignment="start"
          class="back-label"
          disable-spacing={true}
          layout="inline-space-between"
          onClick={() => { this._setPageType(backPage) }}
        >
          <calcite-icon icon="chevron-left" scale="s" />
          {this.translations?.back}
        </calcite-label>
      </div>
    );
  }

  _getNotice(
    message: string
  ): VNode {
    return (
      <calcite-notice active class="padding-1" color="green" icon="lightbulb">
        <div slot="message">{message}</div>
      </calcite-notice>
    );
  }

  _getLabel(
    label: string,
    disableSpacing: boolean = false
  ): VNode {
    return (
      <div class="padding-top-sides-1">
        <calcite-label class="font-bold" disable-spacing={disableSpacing}>{label}</calcite-label>
      </div>
    );
  }

  _getIconLabel(
    label: string,
    disableSpacing: boolean = false
  ): VNode {
    // force small space between label and icon when general label space is disabled
    const forceSpace = disableSpacing ? " padding-end-1-2" : "";
    return (
      <div class="padding-sides-1 padding-top-1-2">
        <calcite-label class={"font-bold" + forceSpace} disable-spacing={disableSpacing} layout='inline'>
          {label}
          <calcite-icon class="info-blue" icon="information" scale="s" />
        </calcite-label>
      </div>
    );
  }

  _getSelectionLists(): VNode {
    return (<div class="padding-sides-1">Selection lists go here</div>);
  }

  _getMapSearch(): VNode {
    return (
      <div class="padding-sides-1 padding-bottom-1 border-bottom">
        <map-search mapView={this.mapView}></map-search>
      </div>
    );
  }

  _getNameLabel(): VNode {
    return (
      <calcite-label class="font-bold width-full">{this.translations?.nameLabel}
        <calcite-input placeholder={this.translations?.nameLabelPlaceholder}></calcite-input>
      </calcite-label>
    );
  }

  _downloadPDF() {
    alert("download PDF")
  }

  _downloadCSV() {
    alert("download CSV")
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
        label={this.translations.featuresAdded?.replace('{{n}}', numAdded.toString())}
      >
        {this._getAction2(numAdded > 0, "reset", "", (): void => this._revertSelection(refineSet, true), false, "actions-end")}
      </calcite-list-item>
    ),(
      <calcite-list-item
        label={this.translations.featuresRemoved?.replace('{{n}}', numRemoved.toString())}
      >
        {this._getAction2(numRemoved > 0, "reset", "", (): void => this._revertSelection(refineSet, false), false, "actions-end")}
      </calcite-list-item>
    ), (
      <calcite-list-item
        label={this.translations.totalSelected?.replace('{{n}}', total.toString())}
      />
    )];
  }

  _getAction2(
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

  _revertSelection(
    refineSet: ISelectionSet,
    isAdd: boolean
  ) {
    if (isAdd) {
      refineSet.refineIds.removeIds = refineSet.refineIds.addIds;
      refineSet.selectedIds = refineSet.selectedIds.filter(id => {
        return refineSet.refineIds.addIds.indexOf(id) < 0;
      });
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

  _setSelectionMode(
    mode: ESelectionMode
  ): void {
    this._refineTools.mode = mode;
  }

  _getTotal(): Number {
    return [...new Set(this._getSelectionIds(this.selectionSets))].length;
  }

  _updateForSelection(evt: CustomEvent) {
    this.numSelected = evt.detail;
    this.saveEnabled = this.numSelected > 0;
  }

  async _home() {
    await this._clearSelection();
    this._setPageType(EPageType.LIST);
  }

  async _layerSelectionChange(evt: CustomEvent): Promise<void> {
    const title: string = evt?.detail?.length > 0 ? evt.detail[0] : "";
    this.addresseeLayer = await getMapLayerView(this.mapView, title);
    //this.message = this.translations.startMessage.replace("{{n}}", evt?.detail?.length > 0 ? evt.detail[0] : "");
  }

  async _saveSelection(): Promise<void> {
    const results = await this._selectTools?.getSelection();
    const isUpdate = this._selectTools?.isUpdate;

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
    this._clearHighlight();
    var ids = this._getSelectionIds(this.selectionSets);
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(
        this.mapView,
        this.addresseeLayer,
        ids
      );
    }
  }

  _clearHighlight() {
    state.highlightHandle?.remove();
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof NewPublicNotification_T9n;
  }
}
