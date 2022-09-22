import { Component, Element, Host, h, Prop, State, VNode } from '@stencil/core';
import { EPageType } from '../../utils/interfaces';
//import { flashSelection, getMapLayerView, highlightFeatures } from '../../utils/mapViewUtils';
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
   * utils/interfaces/EPageType: LIST, SELECT, REFINE, PDF, CSV
   */
   @State() pageType: EPageType = EPageType.LIST;

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

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad() {
    await this._getTranslations();
  }

  render() {
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout='horizontal' slot="header">
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} icon="list-check" id="pn-lists" onClick={() => { this._setPageType(EPageType.LIST) }} text="" />
              <calcite-tooltip label="" placement="bottom" reference-element="pn-lists">
                <span>{this.translations?.myLists}</span>
              </calcite-tooltip>
            </calcite-action-group>
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} id="pn-pdf" onClick={() => { this._setPageType(EPageType.PDF) }} text="" icon="file-pdf" />
              <calcite-tooltip label="" placement="bottom" reference-element="pn-pdf">
                <span>{this.translations?.downloadPDF}</span>
              </calcite-tooltip>
            </calcite-action-group>
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} id="pn-csv" onClick={() => { this._setPageType(EPageType.CSV) }} text="" icon="file-csv" />
              <calcite-tooltip label="" placement="bottom" reference-element="pn-csv">
                <span>{this.translations?.downloadCSV}</span>
              </calcite-tooltip>
            </calcite-action-group>
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
        <div class="add-container padding-1">
          <calcite-button width="full" onClick={() => { this._setPageType(EPageType.LAYER) }}>{this.translations?.add}</calcite-button>
        </div>
      </calcite-panel>
    );
  }

  _getLayerPage(): VNode {
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.LIST)}
        {this._getStepLabel(this.translations?.stepOne)}
        {this._getNotice(this.translations?.stepOneTip)}
        <div class="add-container padding-top-sides-1">
          <map-layer-picker
            label={this.translations?.addresseeLayer}
            mapView={this.mapView}
            // onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
            selectionMode={"single"}
          //selectedLayers={layerTitle ? [layerTitle] : []}
          //trailingLabel={total > 0 ? `${totalSelected}` : ''}
          />
        </div>
        <div class="padding-top-sides-1">
          <calcite-label class="font-bold">{this.translations?.nameLabel}
            <calcite-input placeholder={this.translations?.nameLabelPlaceholder}></calcite-input>
          </calcite-label>
        </div>
        {this._getPageNextCancel(EPageType.SEARCH, EPageType.LIST)}
      </calcite-panel>
    );
  }

  _getSearchPage(): VNode {
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.LAYER)}
        {this._getStepLabel(this.translations?.stepTwo)}
        <div class="padding-sides-1 padding-top-1-2">
          <calcite-label class="font-bold" layout='inline'>
            {this.translations?.search}
            <calcite-icon class="info-blue" icon="information" scale="s"/>
          </calcite-label>
        </div>
        <div class="padding-sides-1">Search Component here</div>
        {this._getNotice(this.translations?.stepTwoTip)}
        {this._getPageNextCancel(EPageType.SELECT, EPageType.LIST)}
      </calcite-panel>
    );
  }

  _getSelectPage(): VNode {
    return (
      <calcite-panel>
        {this._getPageBack(EPageType.SEARCH)}
        {this._getStepLabel(this.translations?.stepOne)}
        {this._getNotice(this.translations?.stepOneTip)}
        <div class="add-container padding-sides-1">
          <map-layer-picker
            label={this.translations?.addresseeLayer}
            mapView={this.mapView}
            //onLayerSelectionChange={(evt) => this._layerSelectionChange(evt)}
            selectionMode={"single"}
            //selectedLayers={layerTitle ? [layerTitle] : []}
            //trailingLabel={total > 0 ? `${totalSelected}` : ''}
          />
        </div>
        <div class="padding-1">
          <calcite-label class="font-bold">{this.translations?.nameLabel}
            <calcite-input placeholder={this.translations?.nameLabelPlaceholder}></calcite-input>
          </calcite-label>
        </div>
        {this._getPageNextCancel(EPageType.SELECT, EPageType.LIST)}
      </calcite-panel>
    );
  }

  _getRefinePage(): VNode {
    return (<div>refine</div>);
  }

  _getPDFPage(): VNode {
    return (<div>pdf</div>);
  }

  _getCSVPage(): VNode {
    return (<div>csv</div>);
  }

  _getPageNextCancel(
    nextPage: EPageType,
    cancelPage: EPageType
  ): VNode {
    return (
      <div>
        <div class="add-container padding-top-sides-1">
          <calcite-button
            width="full"
            onClick={() => { this._setPageType(nextPage) }}
          >
            {this.translations?.next}
          </calcite-button>
        </div>
        <div class="add-container padding-top-1-2 padding-sides-1">
          <calcite-button
            appearance='outline'
            width="full"
            onClick={() => { this._setPageType(cancelPage) }}
          >
            {this.translations?.cancel}
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
        <calcite-button
          appearance='transparent'
          iconStart='chevron-left'
          onClick={() => {this._setPageType(backPage)}}
        >
          {this.translations?.back}
        </calcite-button>
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

  _getStepLabel(
    label: string
  ): VNode {
    return (
      <div class="padding-top-sides-1">
        <calcite-label class="font-bold">{label}</calcite-label>
      </div>
    );
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof NewPublicNotification_T9n;
  }
}
