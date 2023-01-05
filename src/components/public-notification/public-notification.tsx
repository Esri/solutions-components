/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Element, Host, h, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { EExportType, EPageType, ESketchType, EWorkflowType, ISelectionSet } from "../../utils/interfaces";
import { goToSelection, getMapLayerView, highlightFeatures } from "../../utils/mapViewUtils";
import { getSelectionSetQuery } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import NewPublicNotification_T9n from "../../assets/t9n/public-notification/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import * as utils from "../../utils/publicNotificationUtils";

@Component({
  tag: "public-notification",
  styleUrl: "public-notification.css",
  shadow: false,
})
export class PublicNotification {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLPublicNotificationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() addresseeLayer: __esri.FeatureLayerView;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true the refine selection workflow will be included in the UI
   */
  @Prop() showRefineSelection = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: Enabled when we have 1 or more selection sets that is enabled in the download pages.
   * By default all selection sets are enabled for download when they are first created.
   */
  @State() _downloadActive = true;

  /**
   * number: The number of selected features
   */
  @State() _numSelected = 0;

  /**
   * utils/interfaces/EPageType: LIST | SELECT | REFINE | PDF | CSV
   */
  @State() _pageType: EPageType = EPageType.LIST;

  /**
   * boolean: Save is enabled when we have 1 or more selected features
   */
  @State() _saveEnabled = false;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @State() _selectionSets: ISelectionSet[] = [];

  /**
   * ESketchType: The current type of sketch
   * used to control information messages.
   */
  @State() _sketchType: ESketchType = ESketchType.INTERACTIVE;

  /**
   * utils/interfaces/EWorkflowType: SEARCH | SELECT | SKETCH
   */
  @State() _selectionWorkflowType = EWorkflowType.SEARCH;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof NewPublicNotification_T9n;

  /**
   * ISelectionSet: The current active selection set
   */
  protected _activeSelection: ISelectionSet;

  /**
   * HTMLPdfDownloadElement: The pdf tools element
   */
  protected _downloadTools: HTMLPdfDownloadElement;

  /**
   * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
   */
  protected _geometryEngine: __esri.geometryEngine;

  /**
   * HTMLCalciteCheckboxElement: The remove duplicates checkbox element
   */
  protected _removeDuplicates: HTMLCalciteCheckboxElement;

  /**
   * HTMLMapSelectToolsElement: The select tools element
   */
  protected _selectTools: HTMLMapSelectToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the selectionSets prop is changed.
   */
  @Watch("_selectionSets")
  async selectionSetsWatchHandler(
    v: ISelectionSet[],
    oldV: ISelectionSet[]
  ): Promise<void> {
    if (v && v !== oldV && v.length > 0) {
      const nonRefineSets = v.filter(ss => ss.workflowType !== EWorkflowType.REFINE)
      if (nonRefineSets.length === 0) {
        this._selectionSets = [];
      }
    }
  }

  /**
   * Called each time the pageType prop is changed.
   */
  @Watch("_pageType")
  async pageTypeWatchHandler(
    pageType: EPageType,
    oldPageType: EPageType
  ): Promise<void> {
    this._clearHighlight();

    if (oldPageType === EPageType.SELECT || oldPageType === EPageType.REFINE) {
      // clear any draw shapes or buffers
      await this._clearSelection()
    }

    if (pageType !== EPageType.SELECT) {
      return this._highlightFeatures();
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

  /**
   * Handle changes to the selection sets
   */
  @Listen("selectionSetsChanged", { target: "window" })
  selectionSetsChanged(event: CustomEvent): void {
    this._selectionSets = [...event.detail];
  }

  /**
   * Handle changes to the selection sets
   */
  @Listen("sketchTypeChange", { target: "window" })
  sketchTypeChange(event: CustomEvent): void {
    this._sketchType = event.detail;
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
  }

  /**
   * Renders the component.
   */
  render(): void {
    const hasSelections = this._selectionSets.length > 0;
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout="horizontal" slot="header">
            {this._getActionGroup("list-check", false, EPageType.LIST, this._translations.myLists)}
            {this.showRefineSelection ? this._getActionGroup("test-data", !hasSelections, EPageType.REFINE, this._translations.refineSelection) : undefined}
            {this._getActionGroup("file-pdf", !hasSelections, EPageType.PDF, this._translations.downloadPDF)}
            {this._getActionGroup("file-csv", !hasSelections, EPageType.CSV, this._translations.downloadCSV)}
          </calcite-action-bar>
          {this._getPage(this._pageType)}
        </calcite-shell>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
    const [geometryEngine]: [
      __esri.geometryEngine
    ] = await loadModules([
      "esri/geometry/geometryEngine"
    ]);
    this._geometryEngine = geometryEngine;
  }

  /**
   * Get a calcite action group for the current action
   *
   * @param icon the icon to display for the current action
   * @param disabled should the action be disabled
   * @param pageType what page type will the action navigate to
   * @param tip information tip to display helpful details to end user
   *
   * @protected
   */
  protected _getActionGroup(
    icon: string,
    disabled: boolean,
    pageType: EPageType,
    tip: string
  ): VNode {
    const groupClass = this.showRefineSelection ? "action-center w-1-4" : "action-center w-1-3";
    return (
      <calcite-action-group class={groupClass} layout="horizontal">
        <calcite-action
          active={this._pageType === pageType}
          alignment="center"
          class="width-full height-full"
          compact={false}
          disabled={disabled}
          icon={icon}
          id={icon}
          onClick={() => { this._setPageType(pageType) }}
          text=""
        />
        <calcite-tooltip label="" placement="bottom" reference-element={icon}>
          <span>{tip}</span>
        </calcite-tooltip>
      </calcite-action-group>
    );
  }

  /**
   * Navigate to the defined page type
   *
   * @param pageType what page type will the action navigate to
   *
   * @protected
   */
  protected _setPageType(
    pageType: EPageType
  ): void {
    this._pageType = pageType;
  }

  /**
   * Navigate to the defined page type
   *
   * @param pageType what page type will the action navigate to
   *
   * @returns the page node
   * @protected
   */
  _getPage(
    pageType: EPageType
  ): VNode {
    let page: VNode;
    switch (pageType) {
      case EPageType.LIST:
        page = this._getListPage();
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

  /**
   * Create the List page that shows as the initial home screen
   * This page is also used to show and selection sets that have been created
   *
   * @returns the page node
   * @protected
   */
  protected _getListPage(): VNode {
    const hasSets = this._selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE).length > 0;
    const total = utils.getTotal(this._selectionSets);
    return hasSets ? (
      <calcite-panel>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">{this._translations.myLists}</calcite-label>
        </div>
        {this._getNotice(this._translations.listHasSetsTip, "padding-sides-1 padding-bottom-1")}
        <div class="display-flex padding-sides-1">
          <calcite-label class="font-bold width-full">{this._translations.addresseeLayer}
            <map-layer-picker
              mapView={this.mapView}
              onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
              selectedLayers={this.addresseeLayer ? [this.addresseeLayer?.layer.title] : []}
              selectionMode={"single"}
            />
          </calcite-label>
        </div>
        <div class="padding-sides-1 height-1-1-2">
          <div class="position-left">
            <calcite-label alignment="start" class="font-bold">{this._translations.notifications}</calcite-label>
          </div>
          <div class="position-right">
            <calcite-input-message class="info-blue margin-top-0" scale="m">{this._translations.uniqueCout.replace("{{n}}", total.toString())}</calcite-input-message>
          </div>
        </div>
        {
          hasSets ? this._getSelectionSetList() : (
            <div class="info-message">
              <calcite-input-message class="info-blue" scale="m">{this._translations.noNotifications}</calcite-input-message>
            </div>
          )
        }
        <div class="display-flex padding-1">
          <calcite-button onClick={() => { this._setPageType(EPageType.SELECT) }} width="full">{this._translations.add}</calcite-button>
        </div>
      </calcite-panel>
    ) : (
      <calcite-panel>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">{this._translations.myLists}</calcite-label>
        </div>
        <div class="padding-sides-1">
          <calcite-label>{this._translations.notifications}</calcite-label>
        </div>
        <div class="info-message padding-bottom-1">
          <calcite-input-message class="info-blue" scale="m">{this._translations.noNotifications}</calcite-input-message>
        </div>
        {this._getNotice(this._translations.selectLayerAndAdd, "padding-sides-1 padding-bottom-1")}
        <div class="display-flex padding-sides-1">
          <calcite-label class="font-bold width-full">{this._translations.addresseeLayer}
            <map-layer-picker
              mapView={this.mapView}
              onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
              selectedLayers={this.addresseeLayer ? [this.addresseeLayer?.layer.title] : []}
              selectionMode={"single"}
            />
          </calcite-label>
        </div>
        <div class="display-flex padding-1">
          <calcite-button onClick={() => { this._setPageType(EPageType.SELECT) }} width="full">{this._translations.add}</calcite-button>
        </div>
      </calcite-panel>
    );
  }

  /**
   * Create the selection sets list node for the List page
   *
   * @returns selection sets list node
   * @protected
   */
  protected _getSelectionSetList(): VNode {
    return (
      <calcite-list class="list-border margin-sides-1">
        {
          // REFINE is handled seperately from the core selection sets
          // You can only access after clicking the refine action
          this._selectionSets.reduce((prev, cur, i) => {
            if (cur.workflowType !== EWorkflowType.REFINE) {
              prev.push((
                <calcite-list-item
                  description={this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString())}
                  label={cur.label}
                  onClick={void (async (): Promise<void> => goToSelection(cur.selectedIds, cur.layerView, this.mapView))}
                >
                  {this._getAction(true, "pencil", "", (evt): void => this._openSelection(cur, evt), false, "actions-end")}
                  {this._getAction(true, "x", "", (evt): Promise<void> => this._deleteSelection(i, evt), false, "actions-end")}
                </calcite-list-item>
              ));
            }
            return prev;
          }, [])
        }
      </calcite-list>
    );
  }

  /**
   * Create the Select page that shows the selection workflows
   *
   * @returns the page node
   * @protected
   */
  protected _getSelectPage(): VNode {
    // const searchTip = `${this._translations.selectSearchTip} ${this._translations.optionalSearchDistance}`;
    const searchTip = this._translations.selectSearchTip;
    // const selectTip = `${this._translations.selectLayerTip} ${this._translations.optionalSearchDistance}`;
    const selectTip = this._translations.selectLayerTip;
    // const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
    //   `${this._translations.selectSketchTip} ${this._translations.optionalSearchDistance}` :
    //   `${this._translations.selectLayerTip} ${this._translations.optionalSearchDistance}`;
    const sketchTip = this._sketchType === ESketchType.INTERACTIVE ?
      this._translations.selectSketchTip :
      this._translations.selectLayerTip;

    const noticeText = this._selectionWorkflowType === EWorkflowType.SELECT ? selectTip :
      this._selectionWorkflowType === EWorkflowType.SKETCH ? sketchTip : searchTip;

    return (
      <calcite-panel>
        {this._getLabel(this._translations.stepTwoFull.replace("{{layer}}", this.addresseeLayer?.layer.title))}
        {this._getNotice(noticeText)}
        <div class={"padding-1"}>
          <map-select-tools
            class="font-bold"
            isUpdate={!!this._activeSelection}
            mapView={this.mapView}
            onSelectionSetChange={(evt) => this._updateForSelection(evt)}
            onWorkflowTypeChange={(evt) => this._updateForWorkflowType(evt)}
            ref={(el) => { this._selectTools = el }}
            selectLayerView={this.addresseeLayer}
            selectionSet={this._activeSelection}
          />
        </div>
        <div class="padding-sides-1 padding-bottom-1" style={{ "align-items": "end", "display": "flex" }}>
          <calcite-icon class="info-blue padding-end-1-2" icon="feature-layer" scale="s" />
          <calcite-input-message class="info-blue" scale="m">
            {this._translations.selectedAddresses.replace("{{n}}", this._numSelected.toString()).replace("{{layer}}", this.addresseeLayer?.layer.title || "")}
          </calcite-input-message>
        </div>
        {
          this._getPageNavButtons(
            this._translations.done,
            this._numSelected === 0,
            (): void => { void this._saveSelection() },
            this._translations.cancel,
            false,
            (): void => { void this._home() }
          )
        }
      </calcite-panel>
    );
  }

  /**
   * Create the Refine page that users can interactively add/remove features from existing selection sets
   *
   * @returns the page node
   * @protected
   */
  protected _getRefinePage(): VNode {
    return (
      <calcite-panel>
        {this._getLabel(this._translations.refineSelection)}
        {this._getNotice(this._translations.refineTip, "padding-sides-1")}
        <refine-selection
          addresseeLayer={this.addresseeLayer}
          mapView={this.mapView}
          selectionSets={this._selectionSets}
        />
      </calcite-panel>
    );
  }

  /**
   * Create the PDF download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  protected _getPDFPage(): VNode {
    return this._getDownloadPage(EExportType.PDF);
  }

  /**
   * Create the CSV download page that shows the download options
   *
   * @returns the page node
   * @protected
   */
  protected _getCSVPage(): VNode {
    return this._getDownloadPage(EExportType.CSV);
  }

  /**
   * Create the main download page that has the shared aspects of both PDF and CSV
   * But only show the current PDF or CSV page content
   *
   * @param type EExportType of the current type expected
   *
   * @returns the page node
   * @protected
   */
  protected _getDownloadPage(
    type: EExportType
  ): VNode {
    const isPdf = type === EExportType.PDF;
    return (
      <calcite-panel>
        <div>
          <div class="padding-top-sides-1">
            <calcite-label class="font-bold">
              {isPdf ? this._translations.pdfDownloads : this._translations.csvDownloads}
            </calcite-label>
            <calcite-label>{this._translations.notifications}</calcite-label>
          </div>
          {this._getSelectionLists()}
          <div class="margin-side-1 padding-top-1 border-bottom" />
          <div class="padding-top-sides-1">
            <calcite-label layout="inline">
              <calcite-checkbox disabled={!this._downloadActive} ref={(el) => { this._removeDuplicates = el }} />
              {this._translations.removeDuplicate}
            </calcite-label>
          </div>
          <div class={isPdf ? "" : "display-none"}>
            {this._getLabel(this._translations.selectPDFLabelOption, false)}
            <div class={"padding-sides-1"}>
              <pdf-download
                disabled={!this._downloadActive}
                layerView={this.addresseeLayer}
                ref={(el) => { this._downloadTools = el }}
              />
            </div>
          </div>
          <div class="padding-1 display-flex">
            <calcite-button
              disabled={!this._downloadActive}
              onClick={isPdf
                ? void (async (): Promise<void> => this._downloadPDF())
                : void (async (): Promise<void> => this._downloadCSV())
              }
              width="full"
            >
              {isPdf ? this._translations.downloadPDF : this._translations.downloadCSV}
            </calcite-button>
          </div>
        </div>
      </calcite-panel>
    );
  }

  /**
   * Create the stacked navigation buttons for a page
   *
   * @param topLabel the label to use for the button on top
   * @param topDisabled should the button be disabled
   * @param topFunc the fucntion to execute when the button is clicked
   * @param bottomLabel the label to use for the button on bottom
   * @param bottomDisabled should the button be disabled
   * @param bottomFunc the fucntion to execute when the button is clicked
   *
   * @returns the page node
   * @protected
   */
  protected _getPageNavButtons(
    topLabel: string,
    topDisabled: boolean,
    topFunc: () => void,
    bottomLabel: string,
    bottomDisabled: boolean,
    bottomFunc: () => void
  ): VNode {
    return (
      <div>
        <div class="display-flex padding-top-sides-1">
          <calcite-button
            disabled={topDisabled}
            onClick={topFunc}
            width="full"
          >
            {topLabel}
          </calcite-button>
        </div>
        <div class="display-flex padding-top-1-2 padding-sides-1">
          <calcite-button
            appearance="outline"
            disabled={bottomDisabled}
            onClick={bottomFunc}
            width="full"
          >
            {bottomLabel}
          </calcite-button>
        </div>
      </div>
    )
  }

  /**
   * Create an informational notice
   *
   * @param message the message to display in the notice
   * @param noticeClass any custom css for the notice (default is "padding-1")
   *
   * @returns the notice node
   * @protected
   */
  protected _getNotice(
    message: string,
    noticeClass = "padding-1"
  ): VNode {
    return (
      <calcite-notice class={noticeClass} color="green" icon="lightbulb" open={true}>
        <div slot="message">{message}</div>
      </calcite-notice>
    );
  }

  /**
   * Create a calcite label
   *
   * @param label value to display in the label
   * @param disableSpacing should extra calcite defined spacing be applied
   *
   * @returns the label node
   * @protected
   */
  protected _getLabel(
    label: string,
    disableSpacing = false
  ): VNode {
    return (
      <div class="padding-top-sides-1">
        <calcite-label
          class="font-bold"
          disable-spacing={disableSpacing}
        >
          {label}
        </calcite-label>
      </div>
    );
  }

  /**
   * Get selection set list node with checkbox for Download pages
   *
   * @returns the list node
   * @protected
   */
  protected _getSelectionLists(): VNode {
    return this._selectionSets.reduce((prev, cur) => {
      if (cur.workflowType !== EWorkflowType.REFINE) {
        if (!this._downloadActive && cur.download) {
          this._downloadActive = true;
        }
        prev.push((
          <div class="display-flex padding-sides-1 padding-bottom-1">
            <calcite-checkbox checked={cur.download} onClick={() => { void this._toggleDownload(cur.id) }} />
            <calcite-list class="list-border margin-start-1-2 w-100" id="download-list">
              <calcite-list-item
                description={this._translations.selectedFeatures.replace("{{n}}", cur.selectedIds.length.toString())}
                disabled={!cur.download}
                label={cur.label}
                onClick={() => { void this._toggleDownload(cur.id) }}
              />
            </calcite-list>
          </div>
        ));
      }
      return prev;
    }, []) || (<div />);
  }

  /**
   * Toggle the disabled state for the download options based on user selection
   *
   * @param id the selection set id to toggle
   *
   * @protected
   */
  protected async _toggleDownload(
    id: number
  ): Promise<void> {
    let isActive = false;
    this._selectionSets = this._selectionSets.map(ss => {
      ss.download = ss.id === id ? !ss.download : ss.download;
      isActive = ss.download ? true : isActive;
      return ss;
    });
    this._downloadActive = isActive;
    await this._highlightFeatures();
  }

  /**
   * Download all selection sets as PDF
   *
   * @protected
   */
  protected _downloadPDF(): Promise<void> {
    const ids = utils.getSelectionIds(this._getDownloadSelectionSets());
    return this._downloadTools.downloadPDF(ids, this._removeDuplicates.checked);
  }

  /**
   * Download all selection sets as CSV
   *
   * @protected
   */
  protected _downloadCSV(): Promise<void> {
    const ids = utils.getSelectionIds(this._getDownloadSelectionSets());
    return this._downloadTools.downloadCSV(ids, this._removeDuplicates.checked);
  }

  /**
   * Get all enabled selection sets
   *
   * @returns the selection sets
   * @protected
   */
  protected _getDownloadSelectionSets(): ISelectionSet[] {
    return this._selectionSets.filter(ss => {
      return ss.download || ss.workflowType === EWorkflowType.REFINE;
    });
  }

  /**
   * Store the current workflow type
   *
   * @protected
   */
  protected _updateForWorkflowType(
    evt: CustomEvent
  ): void {
    this._selectionWorkflowType = evt.detail;
  }

  /**
   * Create a calcite action
   *
   * @param enabled controls the enabled state of the control
   * @param icon the image to display in the action
   * @param text and supporting text for the action
   * @param onClick the fucntion the actio will execute
   * @param indicator boolean to control if an indicator should be shown (default is false)
   * @param slot the supporting slot to use
   *
   * @returns the calcite action node
   * @protected
   */
  protected _getAction(
    enabled: boolean,
    icon: string,
    text: string,
    onClick: any,
    indicator = false,
    slot = ""
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

  /**
   * Store the number of selected features and if it's more than one enable save
   *
   * @returns the page node
   * @protected
   */
  protected _updateForSelection(evt: CustomEvent): void {
    this._numSelected = evt.detail;
    this._saveEnabled = this._numSelected > 0;
  }

  /**
   * Clear the selection and navigate to the home page
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _home(): Promise<void> {
    await this._clearSelection();
    this._setPageType(EPageType.LIST);
  }

  /**
   * Fetch the layer defined in the selection change event
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    const title: string = evt?.detail?.length > 0 ? evt.detail[0] : "";
    if (title !== this.addresseeLayer?.layer.title) {
      this.addresseeLayer = await getMapLayerView(this.mapView, title);
      await this._updateSelectionSets(this.addresseeLayer);
    }
  }

  /**
   * Update selection sets when the addressee layer changes.
   * Will remove any "refine" selection set.
   * Will use stored search, select, and sketch geometries and any buffers to select from the new addressee layer.
   *
   * @param layerView The new addressee layer view to select from
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _updateSelectionSets(
    layerView: __esri.FeatureLayerView
  ): Promise<void> {
    const _selectionSets = this._selectionSets.filter(
      selectionSet => selectionSet.workflowType !== EWorkflowType.REFINE
    );
    const oidDefs = [];
    _selectionSets.forEach(selectionSet => {
      selectionSet.layerView = layerView;
      selectionSet.selectedIds = [];
      oidDefs.push(getSelectionSetQuery(selectionSet, this._geometryEngine));
    });

    return Promise.all(oidDefs).then(async (results): Promise<void> => {
      results.forEach((result, i) => {
        _selectionSets[i].selectedIds = result;
      });
      await this._highlightFeatures();
      this._selectionSets = [
        ..._selectionSets
      ];
    });
  }

  /**
   * Update the selection sets with any new selections from the select tools
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _saveSelection(): Promise<void> {
    const results = await this._selectTools?.getSelection();
    const isUpdate = this._selectTools?.isUpdate;

    this._selectionSets = isUpdate ? this._selectionSets.map(ss => {
      return ss.id === results.id ? results : ss;
    }) : [
      ...this._selectionSets,
      results
    ];
    return this._home();
  }

  /**
   * Clear any selections
   *
   * @returns Promise when the function has completed
   * @protected
   */
  protected async _clearSelection(): Promise<void> {
    await this._selectTools?.clearSelection();
    this._numSelected = 0;
    this._activeSelection = undefined;
  }

  /**
   * Delete the selection at the defined index
   *
   * @param index number that defines what selection set to delete
   *
   * @protected
   */
  protected _deleteSelection(
    index: number,
    evt: CustomEvent
  ): Promise<void> {
    evt.stopPropagation();
    this._selectionSets = this._selectionSets.filter((ss, i) => {
      if (i !== index) {
        return ss;
      }
    });
    return this._highlightFeatures();
  }

  /**
   * Open the selection set for further adjustment
   *
   * @protected
   */
  protected _openSelection(
    selectionSet: ISelectionSet,
    evt: CustomEvent
  ): void {
    evt.stopPropagation();
    this._activeSelection = selectionSet;
    this._pageType = EPageType.SELECT;
  }

  /**
   * Highlight any selected features in the map
   *
   * @protected
   */
  protected async _highlightFeatures(): Promise<void> {
    this._clearHighlight();
    const ids = utils.getSelectionIds(this._selectionSets);
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(
        ids,
        this.addresseeLayer,
        this.mapView
      );
    }
  }

  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  protected _clearHighlight(): void {
    if (state && state.highlightHandle) {
      state.highlightHandle?.remove();
    }
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof NewPublicNotification_T9n;
  }
}
