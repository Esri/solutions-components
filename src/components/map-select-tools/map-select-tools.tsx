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
import { EWorkflowType, ERefineMode, ISelectionSet } from '../../utils/interfaces';
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
  @Element() el: HTMLElement;

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

  @Prop() searchTerm: string;

  @Prop({reflect: false}) selectionSet: ISelectionSet;

  @Prop() isUpdate = false;

  @Event() selectionSetChange: EventEmitter;

  @Listen("sketchGraphicsChange", { target: 'window' })
  sketchGraphicsChange(event: CustomEvent): void {
    this._selectionLabel = this.translations?.sketch;
    this._selectType = EWorkflowType.SKETCH;
    this.geometries = Array.isArray(event.detail) ? event.detail.map(g => g.geometry) : this.geometries;
  }

  @Listen("refineSelectionChange", { target: 'window' })
  refineSelectionChange(event: CustomEvent): void {
    this._selectionLabel = this.translations?.select;
    this._selectType = EWorkflowType.SELECT;
    // This doesn't seem to work well with points..but fine once a buffer is in the mix
    this.geometries = Array.isArray(event.detail) ? event.detail.map(g => g.geometry) : this.geometries;
    // Using OIDs to avoid issue with points
    const oids = Array.isArray(event.detail) ? event.detail.map(g => g.attributes[g?.layer?.objectIdField]) : [];
    this._highlightFeatures(oids);
  }

  // _updateSelection(
  //   type
  // ) {

  // }
  
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

  protected _bufferTools: HTMLBufferToolsElement;

  protected _layerView: __esri.FeatureLayerView;

  protected _highlightHandle: __esri.Handle;

  protected selectTimeout: NodeJS.Timeout;

  protected _searchResult: any;

  protected _drawTools: HTMLMapDrawToolsElement;

  protected _refineTools: HTMLRefineSelectionToolsElement;

  protected _refineSelectLayers: __esri.Layer[];

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

  @Method()
  async getSelection(): Promise<ISelectionSet> {
    return {
      id: this.isUpdate ? this.selectionSet.id : Date.now(),
      workflowType: this._selectType,
      selectLayers: [{
        layer: {},
        oids: []
      }],
      searchResult: this._searchResult,
      graphics: this._bufferGraphicsLayer.graphics || [], // seems like I need this or just the buffer geom...not both
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      unit: this._bufferTools.unit,
      numSelected: this._selectedFeatures.length,
      label: this._selectType === EWorkflowType.SEARCH ?
        this._selectionLabel : `${this._selectionLabel} ${this._bufferTools.distance} ${this._bufferTools.unit}`,
      selectedFeatures: this._selectedFeatures,
      layerView: this._layerView,
      geometries: this.geometries,
      polylineSymbol: this._drawTools.polylineSymbol,
      pointSymbol: this._drawTools.pointSymbol,
      polygonSymbol: this._drawTools.polygonSymbol,
      refineSelectLayers: this._refineTools.layers
    } as ISelectionSet;
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
        <map-draw-tools 
          class={showDrawToolsClass}
          mapView={this.mapView} 
          translations={this.translations}
          ref={(el) => { this._drawTools = el}}
        />
        <refine-selection-tools
          active={selectEnabled}
          class={showSelectToolsClass}
          layers={this._refineSelectLayers}
          mapView={this.mapView}
          mode={ERefineMode.ADD}
          ref={(el) => { this._refineTools = el }}
          searchLayers={this.searchLayers}
          translations={this.translations}
        />
        <buffer-tools
          translations={this.translations}
          geometries={this.geometries}
          onBufferComplete={(evt) => this._bufferComplete(evt)}
          ref={(el) => this._bufferTools = el}
          unit={this.selectionSet?.unit}
          distance={this.selectionSet?.distance}
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
    this._initGraphicsLayer();
    this._initSelectionSet();
    this._initSearchWidget();
    this._layerView = await this.mapView.whenLayerView(this.selectLayer);
  }

  _initSelectionSet() {
    if (this.selectionSet) {
      this.searchTerm = this.selectionSet?.searchResult?.name;
      this._selectionLabel = this.selectionSet?.label;
      this.workflowType = this.selectionSet?.workflowType;
      this._selectType = this.selectionSet?.workflowType;
      this._searchResult = this.selectionSet?.searchResult;
      this._refineSelectLayers = this.selectionSet?.refineSelectLayers;
      this.geometries = [
        ...this.selectionSet?.geometries
      ];
      this._drawTools.graphics = this.geometries.map(sg => {
        let props = {
          'geometry': sg,
          'symbol': sg.type === 'point' ? 
            this.selectionSet?.pointSymbol : sg.type === 'polyline' ? 
            this.selectionSet?.polylineSymbol : sg.type === 'polygon' ? 
            this.selectionSet?.polygonSymbol : undefined
        };
        return new this.Graphic(props)
      });
    }
  }

  _initSearchWidget(): void {
    if (this.mapView && this._searchDiv) {
      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchDiv,
        searchTerm: this.searchTerm
      };

      this._searchWidget = new this.Search(searchOptions);

      this._searchWidget.on('search-clear', () => {
        this._clearResults(false);
      });

      this._searchWidget.on('select-result', (searchResults) => {
        this._clearResults(false);
        this._selectionLabel = searchResults?.result?.name || "Search Result NOT named";
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          this.geometries = [searchResults.result.feature.geometry];
          this._selectType = this.workflowType;
        }
      });
    }
  }

  _initGraphicsLayer(): void {
    const title = this.translations?.bufferLayer;

    const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (bufferIndex > -1) {
      this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex) as __esri.GraphicsLayer;
    } else {
      this._bufferGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === this.translations?.sketchLayer);
      if (sketchIndex > -1) {
        this.mapView.map.layers.add(this._bufferGraphicsLayer, sketchIndex);
      } else {
        this.mapView.map.layers.add(this._bufferGraphicsLayer);
      }
    }
  }

  _workflowChange(evt: CustomEvent): void {
    this.workflowType = evt.detail;
  }

  _highlightFeatures(
    target: number | number[] | __esri.Graphic | __esri.Graphic[]
  ) {
    if (this._highlightHandle) {
      this._highlightHandle.remove();
    }
    this._highlightHandle = this._layerView.highlight(target);
    this.selectionSetChange.emit((Array.isArray(target) ? target : [target]).length);
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
      this._highlightFeatures(this._selectedFeatures)
    }, 100);
  }

  async _queryPage(
    page: number
  ) {
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
    this._bufferGeometry = Array.isArray(evt.detail) ?
      evt.detail[0] : evt.detail;

    if (this._bufferGeometry) {
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
    } else {
      this._clearResults(false, false);
    }
  }

  _clearResults(
    clearSearchWidget: boolean = true,
    clearLabel: boolean = true
  ) {
    this._selectedFeatures = [];

    if (clearLabel) {
      this._selectionLabel = "";
    }
    this._bufferGraphicsLayer.removeAll();

    if (clearSearchWidget) {
      this._searchWidget.clear();
    }

    if (this._highlightHandle) {
      this._highlightHandle.remove();
    }

    // for sketch
    this._drawTools.clear();

    this.selectionSetChange.emit(this._selectedFeatures.length);
  }
}
