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

 import { Component, Element, Host, h, Listen, Prop, State, VNode, Watch } from '@stencil/core';
 import { EExportType, EPageType, EWorkflowType, ISelectionSet } from '../../utils/interfaces';
 import { getMapLayerView, highlightFeatures } from '../../utils/mapViewUtils';
 import state from "../../utils/publicNotificationStore";
 import NewPublicNotification_T9n from '../../assets/t9n/public-notification/resources.json';
 import { getLocaleComponentStrings } from '../../utils/locale';
 import * as utils from "../../utils/publicNotificationUtils";
 
 @Component({
   tag: 'public-notification',
   styleUrl: 'public-notification.css',
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
    * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
    */
   @Prop() mapView: __esri.MapView;
 
   /**
    * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
    */
   @Prop() addresseeLayer: __esri.FeatureLayerView;
 
   //--------------------------------------------------------------------------
   //
   //  Properties (private)
   //
   //--------------------------------------------------------------------------
 
   /**
    * boolean: Enabled when we have 1 or more selection sets that is enabled in the download pages.
    * By default all selection sets are enabled for download when they are first created.
    */
   @State() downloadActive: boolean;
 
   /**
    * utils/interfaces/EWorkflowType: SEARCH | SELECT | SKETCH
    */
   @State() selectionWorkflowType = EWorkflowType.SEARCH;
 
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
    * utils/interfaces/EPageType: LIST | SELECT | REFINE | PDF | CSV
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

   protected _downloadTools: HTMLPdfDownloadElement;

   protected _removeDuplicates: HTMLCalciteCheckboxElement;
 
   protected _activeSelection: ISelectionSet;
 
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
         this.selectionSets = [];
       }
     }
   }
 
   @Watch('pageType')
   async pageTypeWatchHandler(
     v: EPageType
   ) {
     this._clearHighlight();
     if (v === EPageType.LIST || v === EPageType.REFINE || v === EPageType.PDF || v === EPageType.CSV) {
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
 
   @Listen("selectionSetsChanged", { target: 'window' })
   selectionSetsChanged(event: CustomEvent): void {
     this.selectionSets = [...event.detail];
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
     const hasSelections = this.selectionSets.length > 0;
     return (
       <Host>
         <calcite-shell>
           <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout='horizontal' slot="header">
             {this._getActionGroup("list-check", false, EPageType.LIST, this.translations?.myLists)}
             {this._getActionGroup("test-data", !hasSelections, EPageType.REFINE, this.translations?.refineSelection)}
             {this._getActionGroup("file-pdf", !hasSelections, EPageType.PDF, this.translations?.downloadPDF)}
             {this._getActionGroup("file-csv", !hasSelections, EPageType.CSV, this.translations?.downloadCSV)}
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
 
   _getActionGroup(
     icon: string,
     disabled: boolean,
     pageType: EPageType,
     tip: string
   ): VNode {
     return (
       <calcite-action-group class={"action-center w-1-4"} layout='horizontal'>
         <calcite-action
           alignment='center'
           active={this.pageType === pageType}
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
     const hasSets = this.selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE).length > 0;
     const total = utils.getTotal(this.selectionSets);
     return hasSets ? (
       <calcite-panel>
         <div class="padding-top-sides-1">
           <calcite-label class="font-bold">{this.translations?.myLists}</calcite-label>
         </div>
         {this._getNotice(this.translations?.listHasSetsTip, "padding-sides-1 padding-bottom-1")}
         <div class="display-flex padding-sides-1">
           <calcite-label class="font-bold width-full">{this.translations?.addresseeLayer}
             <map-layer-picker
               mapView={this.mapView}
               onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
               selectionMode={"single"}
             />
           </calcite-label>
         </div>
         <div class="padding-sides-1 height-1-1-2">
           <div class="position-left">
             <calcite-label alignment='start' class="font-bold">{this.translations?.notifications}</calcite-label>
           </div>
           <div class="position-right">
             <calcite-input-message active class="info-blue margin-top-0" scale="m">{this.translations?.uniqueCout.replace("{{n}}", total.toString())}</calcite-input-message>
           </div>
         </div>
         {
           hasSets ? this._getSelectionSetList() : (
             <div class="info-message">
               <calcite-input-message active class="info-blue" scale='m'>{this.translations?.noNotifications}</calcite-input-message>
             </div>
           )
         }
         <div class="display-flex padding-1">
           <calcite-button width="full" onClick={() => { this._setPageType(EPageType.SELECT) }}>{this.translations?.add}</calcite-button>
         </div>
       </calcite-panel>
     ) : (
       <calcite-panel>
         <div class="padding-top-sides-1">
           <calcite-label class="font-bold">{this.translations?.myLists}</calcite-label>
         </div>
         <div class="padding-sides-1">
           <calcite-label>{this.translations?.notifications}</calcite-label>
         </div>
         <div class="info-message padding-bottom-1">
           <calcite-input-message active class="info-blue" scale='m'>{this.translations?.noNotifications}</calcite-input-message>
         </div>
         {this._getNotice(this.translations?.selectLayerAndAdd, "padding-sides-1 padding-bottom-1")}
         <div class="display-flex padding-sides-1">
           <calcite-label class="font-bold width-full">{this.translations?.addresseeLayer}
             <map-layer-picker
               mapView={this.mapView}
               onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
               selectionMode={"single"}
             />
           </calcite-label>
         </div>
         <div class="display-flex padding-1">
           <calcite-button width="full" onClick={() => { this._setPageType(EPageType.SELECT) }}>{this.translations?.add}</calcite-button>
         </div>
       </calcite-panel>
     );
   }
 
   _getSelectionSetList(): VNode {
     return (
       <calcite-list class="list-border margin-sides-1">
         {
           // REFINE is handled seperately from the core selection sets
           // You can only access after clicking the refine action
           this.selectionSets.reduce((prev, cur, i) => {
             if (cur.workflowType !== EWorkflowType.REFINE) {
               prev.push((
                 <calcite-list-item
                   description={this.translations.selectedFeatures.replace('{{n}}', cur.selectedIds.length.toString())}
                   label={cur.label}
                 //onClick={() => flashSelection(cur)}
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
     );
   }
 
   _getSelectPage(): VNode {
     const searchTip = `${this.translations?.selectSearchTip} ${this.translations?.optionalSearchDistance}`;
     const selectTip = `${this.translations?.selectLayerTip} ${this.translations?.optionalSearchDistance}`;
     const sketchTip = `${this.translations?.selectSketchTip} ${this.translations?.optionalSearchDistance}`;
     
     const noticeText = this.selectionWorkflowType === EWorkflowType.SELECT ? selectTip :
       this.selectionWorkflowType === EWorkflowType.SKETCH ? sketchTip : searchTip;
     
     return (
       <calcite-panel>
         {this._getLabel(this.translations?.stepTwoFull, true)}
         {this._getNotice(noticeText)}
         <div class={"padding-1"}>
           <map-select-tools
             class="font-bold"
             mapView={this.mapView}
             onSelectionSetChange={(evt) => this._updateForSelection(evt)}
             onWorkflowTypeChange={(evt) => this._updateForWorkflowType(evt)}
             ref={(el) => { this._selectTools = el }}
             selectLayerView={this.addresseeLayer}
             selectionSet={this._activeSelection}
             isUpdate={this._activeSelection ? true : false}
           />
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
             () => { this._home() }
           )
         }
       </calcite-panel>
     );
   }
 
   _getRefinePage(): VNode {
     return (
       <calcite-panel>
         {this._getLabel(this.translations?.refineSelection)}
         {this._getNotice(this.translations?.refineTip, "padding-sides-1")}
         <refine-selection
           addresseeLayer={this.addresseeLayer}
           mapView={this.mapView}
           selectionSets={this.selectionSets}
         />
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
       <calcite-panel>
         <div>
           <div class="padding-top-sides-1">
             <calcite-label class="font-bold">
               {isPdf ? this.translations?.pdfDownloads : this.translations?.csvDownloads}
             </calcite-label>
             <calcite-label>{this.translations?.notifications}</calcite-label>
           </div>
           {this._getSelectionLists()}
           <div class="margin-side-1 padding-top-1 border-bottom"></div>
           <div class="padding-top-sides-1">
             <calcite-label layout='inline' disabled={!this.downloadActive}>
               <calcite-checkbox disabled={!this.downloadActive} ref={(el) => { this._removeDuplicates = el }}/>
               {this.translations?.removeDuplicate}
             </calcite-label>
           </div>
           <div class={isPdf ? "" : "display-none"}>
             {this._getLabel(this.translations?.selectPDFLabelOption, false, !this.downloadActive)}
             <div class={"padding-sides-1"}>
               <pdf-download
                 disabled={!this.downloadActive}
                 layerView={this.addresseeLayer}
                 ref={(el) => { this._downloadTools = el }}
                />
             </div>
           </div>
           <div class="padding-1 display-flex">
             <calcite-button
               disabled={!this.downloadActive}
               width="full"
               onClick={isPdf ? () => this._downloadPDF() : () => this._downloadCSV()}
             >
               {isPdf ? this.translations?.downloadPDF : this.translations?.downloadCSV}
             </calcite-button>
           </div>
         </div>
       </calcite-panel>
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
             disabled={nextControlDisabled}
             width="full"
             onClick={nextFunc}
           >
             {nextLabel}
           </calcite-button>
         </div>
         <div class="display-flex padding-top-1-2 padding-sides-1">
           <calcite-button
             appearance='outline'
             disabled={cancelControlDisabled}
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
     backFunc: () => void
   ): VNode {
     return (
       <div class="padding-top-sides-1 display-flex">
         <calcite-label
           alignment="start"
           class="back-label"
           disable-spacing={true}
           layout="inline-space-between"
           onClick={backFunc}
         >
           <calcite-icon icon="chevron-left" scale="s" />
           {this.translations?.back}
         </calcite-label>
       </div>
     );
   }
 
   _getNotice(
     message: string,
     noticeClass: string = "padding-1"
   ): VNode {
     return (
       <calcite-notice active class={noticeClass} color="green" icon="lightbulb">
         <div slot="message">{message}</div>
       </calcite-notice>
     );
   }
 
   _getLabel(
     label: string,
     disableSpacing: boolean = false,
     disabled: boolean = false
   ): VNode {
     return (
       <div class="padding-top-sides-1">
         <calcite-label
           class="font-bold"
           disabled={disabled}
           disable-spacing={disableSpacing}
         >
           {label}
         </calcite-label>
       </div>
     );
   }
 
   _getSelectionLists(): VNode {
     return this.selectionSets.reduce((prev, cur) => {
       if (cur.workflowType !== EWorkflowType.REFINE) {
         if (!this.downloadActive && cur.download) {
           this.downloadActive = true;
         } 
         prev.push((
           <div class="display-flex padding-sides-1 padding-bottom-1">
             <calcite-checkbox checked={cur.download} onClick={() => {this._toggleDownload(cur.id)}}/>
             <calcite-list id="download-list" class="list-border margin-start-1-2 w-100">
               <calcite-list-item
                 description={this.translations.selectedFeatures.replace('{{n}}', cur.selectedIds.length.toString())}
                 disabled={!cur.download}
                 label={cur.label}
                 onClick={() => {this._toggleDownload(cur.id)}}
               >
               </calcite-list-item>
             </calcite-list>
           </div>
         ));
       }
       return prev;
     }, []) || (<div />);
   }
 
   _toggleDownload(
     id: number
   ) {
     let isActive = false;
     this.selectionSets = this.selectionSets.map(ss => {
       ss.download = ss.id === id ? !ss.download : ss.download;
       isActive = ss.download ? true : isActive;
       return ss;
     });
     this.downloadActive = isActive;
   }
 
   _downloadPDF() {
     const ids = utils.getSelectionIds(this.selectionSets);
     this._downloadTools.downloadPDF(ids, this._removeDuplicates.checked);
   }

   _downloadCSV() {
     const ids = utils.getSelectionIds(this.selectionSets);
     this._downloadTools.downloadCSV(ids, this._removeDuplicates.checked);
   }
 
   _updateForWorkflowType(
     evt: CustomEvent
   ) {
     this.selectionWorkflowType = evt.detail;
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
     this._activeSelection = undefined;
   }
 
   _deleteSelection(index: number) {
     this.selectionSets = this.selectionSets.filter((ss, i) => {
       if (i !== index) {
         return ss;
       }
     });
     this._highlightFeatures();
   }
 
   _openSelection(
     selectionSet: ISelectionSet
   ) {
     this._activeSelection = selectionSet;
     this.pageType = EPageType.SELECT;
   }
 
   async _highlightFeatures() {
     this._clearHighlight();
     var ids = utils.getSelectionIds(this.selectionSets);
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
 