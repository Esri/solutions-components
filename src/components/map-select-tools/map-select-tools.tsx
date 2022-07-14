/** @license
 * Copyright 2021 Esri
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

import { Component, Element, Event, EventEmitter, Host, h, Method, Listen, Prop } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { EWorkflowType, ERefineMode } from '../../utils/interfaces';
import state from "../../utils/publicNotificationStore";

@Component({
  tag: 'map-select-tools',
  styleUrl: 'map-select-tools.css',
  shadow: false,
})
export class MapSelectTools {
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

  @Prop() searchLayers: __esri.Layer[];

  @Prop() selectLayer: __esri.FeatureLayer;

  @Prop({ mutable: true }) workflowType: EWorkflowType = EWorkflowType.SEARCH;

  @Prop({ mutable: true }) translations: any = {};

  @Prop() geometries: __esri.Geometry[];

  // think this should not be necessary
  @Event() searchGraphicsChange: EventEmitter;

  // think this should not be necessary
  @Event() searchDistanceChange: EventEmitter;

  @Event() selectionSetChange: EventEmitter;

  @Listen("sketchGraphicsChange", { target: 'window' })
  sketchGraphicsChange(event: CustomEvent): void {
    // I think I will need to listen to this but I think I only need to emit if it would 
    // chnage the underlying selection set
    this.searchGraphicsChange.emit(event.detail);
    //this.selectionSetChange.emit(this._selectedFeatures);
  }

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected Graphic: typeof __esri.Graphic;

  protected Search: typeof __esri.widgetsSearch;

  protected Geometry: typeof __esri.Geometry;

  protected _searchDiv: HTMLElement;

  protected _searchWidget: __esri.widgetsSearch;

  protected _selectionLabel = "";

  protected _selectType: EWorkflowType;

  protected _selectedFeatures: __esri.Graphic[] = [];

  protected _bufferGraphicsLayer: __esri.GraphicsLayer;

  protected _bufferGeometry: __esri.Geometry;

  protected _layerView: __esri.FeatureLayerView;

  protected _highlightHandle: __esri.Handle;

  protected selectTimeout: NodeJS.Timeout;

  @Method()
  async getSelectedFeatures() {
    return this._selectedFeatures;
  }

  @Method()
  async getSelectionLabel() {
    return this._selectionLabel;
  }

  @Method()
  async getSelectType() {
    return this._selectType;
  }

  @Method()
  async clearSelection() {
    return this._clearResults();
  }

  async componentWillLoad() {
    await this._initModules();
  }

  async componentDidLoad() {
    this._init()
  }

  render() {
    const searchEnabled = this.workflowType === EWorkflowType.SEARCH;
    const showSearchClass = searchEnabled ? " div-visible-search" : " div-not-visible";

    const drawEnabled = this.workflowType === EWorkflowType.SKETCH;
    const showDrawToolsClass = drawEnabled ? " div-visible" : " div-not-visible";

    const selectEnabled = this.workflowType === EWorkflowType.SELECT;
    const showSelectToolsClass = selectEnabled ? " div-visible" : " div-not-visible";

    return (
      <Host>
        <div class="padding-bottom-1">
          <calcite-radio-group
            class="w-100"
            onCalciteRadioGroupChange={(evt) => this._workflowChange(evt)}
          >
            <calcite-radio-group-item
              checked={searchEnabled}
              class="w-50"
              value={EWorkflowType.SEARCH}
            >
              {this.translations?.search}
            </calcite-radio-group-item>
            <calcite-radio-group-item
              checked={selectEnabled}
              class="w-50"
              value={EWorkflowType.SELECT}
            >
              {this.translations?.select}
            </calcite-radio-group-item>
            <calcite-radio-group-item
              checked={drawEnabled}
              class="w-50"
              value={EWorkflowType.SKETCH}
            >
              {this.translations?.sketch}
            </calcite-radio-group-item>
          </calcite-radio-group>
        </div>
        <div class={showSearchClass}>
          <div class="search-widget" ref={(el) => { this._searchDiv = el }} />
        </div>
        <map-draw-tools class={showDrawToolsClass} mapView={this.mapView} translations={this.translations} />
        <div class={showSelectToolsClass}>
          <map-layer-picker label={this.translations?.selectLayers} mapView={this.mapView} selectionMode={"multi"} translations={this.translations} />
          <refine-selection-tools
              mapView={this.mapView}
              mode={ERefineMode.ADD}
              searchLayers={this.searchLayers}
              translations={this.translations}
            />
        </div>
        <buffer-tools
          translations={this.translations}
          geometries={this.geometries}
          onBufferComplete={(evt) => this._bufferComplete(evt)}
        ></buffer-tools>
        <slot />
      </Host>
    );
  }

  async _initModules(): Promise<void> {
    const [GraphicsLayer, Graphic, Search, Geometry]: [
      __esri.GraphicsLayerConstructor,
      __esri.GraphicConstructor,
      __esri.widgetsSearchConstructor,
      __esri.GeometryConstructor
    ] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/geometry/Geometry"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
    this.Geometry = Geometry;
  }

  async _init() {
    this._initSearchWidget();
    this._initGraphicsLayer();
    this._layerView = await this.mapView.whenLayerView(this.selectLayer);
  }

  _initSearchWidget(): void {
    if (this.mapView && this._searchDiv) {
      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchDiv
      };

      this._searchWidget = new this.Search(searchOptions);

      this._searchWidget.on('search-clear', () => {
        this._clearResults(false);
      });

      this._searchWidget.on('select-result', (searchResults) => {
        this._clearResults(false);
        this._selectionLabel = searchResults?.result?.name || "Search Result NOT named";
        if (searchResults.result) {
          this.geometries = [searchResults.result.feature.geometry];
          this._selectType = this.workflowType;
        }
      });
    }
  }

  _initGraphicsLayer(): void {
    const title = "Buffer Layer";
    this._bufferGraphicsLayer = new this.GraphicsLayer({ title });
    state.managedLayers.push(title);
    this.mapView.map.layers.add(this._bufferGraphicsLayer);
  }

  _workflowChange(evt: CustomEvent): void {
    this.workflowType = evt.detail;
  }

  async _selectFeatures(): Promise<void> {
    if (this.selectTimeout) {
      clearTimeout(this.selectTimeout);
    }

    this.selectTimeout = setTimeout(async () => {
      this._selectedFeatures = [];
      if (this._highlightHandle) {
        this._highlightHandle.remove();
      }
      await this._queryPage(0);
      this._highlightHandle = this._layerView.highlight(this._selectedFeatures);
      this.selectionSetChange.emit(this._selectedFeatures.length);
    }, 100);
  }

  async _queryPage(page: number) {
    const num = this.selectLayer.capabilities.query.maxRecordCount;
    const query = {
      start: page,
      num,
      outFields: ["*"],
      returnGeometry: true,
      geometry: this._bufferGeometry
    };
    const r = await this.selectLayer.queryFeatures(query);
    this._selectedFeatures = this._selectedFeatures.concat(r.features);

    if (r.exceededTransferLimit) {
      return this._queryPage(page += num)
    }
  }

  _bufferComplete(evt: CustomEvent) {
    this._bufferGeometry = evt.detail[0];

    // Create a symbol for rendering the graphic
    const symbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.8],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };

    // Add the geometry and symbol to a new graphic
    const polygonGraphic = new this.Graphic({
      geometry: this._bufferGeometry,
      symbol
    });

    this._bufferGraphicsLayer.removeAll();
    this._bufferGraphicsLayer.add(polygonGraphic);
    void this._selectFeatures();
    void this.mapView.goTo(polygonGraphic.geometry.extent);
  }

  _clearResults(
    clearSearchWidget: boolean = true
  ) {
    this._selectedFeatures = [];
    //this._searchGeom = undefined;
    this._selectionLabel = "";
    this._bufferGraphicsLayer.removeAll();
    //this.bufferGeometry = undefined;

    if (clearSearchWidget) {
      this._searchWidget.clear();
    }

    if (this._highlightHandle) {
      this._highlightHandle.remove();
    }

    this.selectionSetChange.emit(this._selectedFeatures.length);
  }
}