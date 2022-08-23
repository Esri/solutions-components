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

import { Component, Element, Event, EventEmitter, Host, h, Method, Listen, Prop, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { EWorkflowType, ESelectionMode, ISelectionSet } from '../../utils/interfaces';
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

  /**
   * esri/layers/Layer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html
   */
  @Prop() searchLayers: __esri.Layer[];

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() selectLayerView: __esri.FeatureLayerView;

  /**
   * EWorkflowType: "SEARCH", "SELECT", "SKETCH", "REFINE"
   */
  @Prop({ mutable: true }) workflowType: EWorkflowType = EWorkflowType.SEARCH;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
   */
  @Prop() geometries: __esri.Geometry[];

  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  @Prop() searchTerm: string;

  /**
   * utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made.
   */
  @Prop({reflect: false}) selectionSet: ISelectionSet;

  /**
   * boolean: When true a new label is not generated for the stored selection set
   */
  @Prop() isUpdate = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   */
  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  protected Graphic: typeof __esri.Graphic;

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  protected Search: typeof __esri.widgetsSearch;

  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  protected Geometry: typeof __esri.Geometry;

  /**
   * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
   */
  private geometryEngine:  __esri.geometryEngine;

  /**
   * HTMLElement: The container div for the search widget
   */
  protected _searchDiv: HTMLElement;

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  protected _searchWidget: __esri.widgetsSearch;

  /**
   * string: A label to help uniquely identify the selection set
   */
  protected _selectionLabel = "";

  /**
   * utils/interfaces/EWorkflowType: "SEARCH", "SELECT", "SKETCH", "REFINE"
   */
  protected _selectType: EWorkflowType;

  /**
   * number[]: the oids of the selected features
   */
  protected _selectedIds: number[] = [];

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   */
  protected _bufferGraphicsLayer: __esri.GraphicsLayer;

  /**
   * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
   */
  protected _bufferGeometry: __esri.Geometry;

  /**
   * HTMLBufferToolsElement: The container div for the buffer tools
   */
  protected _bufferTools: HTMLBufferToolsElement;

  /**
   * Handle: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Handles.html#Handle
   */
  protected _highlightHandle: __esri.Handle;

  /**
   * Timeout: Used to add a slight delay when selecting features.
   */
  protected selectTimeout: NodeJS.Timeout;

  /**
   * An array of objects representing the results of search
   */
  protected _searchResult: any;

  /**
   * HTMLMapDrawToolsElement: The container div for the sketch widget
   */
  protected _drawTools: HTMLMapDrawToolsElement;

  /**
   * HTMLRefineSelectionToolsElement: The container div for the sketch widget
   */
  protected _refineTools: HTMLRefineSelectionToolsElement;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  protected _refineSelectLayers: __esri.FeatureLayerView[];

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch('geometries')
  async watchGeometriesHandler(
    newValue: __esri.Geometry[],
    oldValue: __esri.Geometry[]
  ) {
    if (newValue !== oldValue) {
      if (this._bufferTools?.distance <= 0 && newValue.length > 0) {
        this._geomQuery(this.geometries);
      } else if (newValue.length === 0) {
        this._clearResults(true, true);
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  @Method()
  async getSelectedIds() {
    return this._selectedIds;
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
      searchResult: this._searchResult,
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      unit: this._bufferTools.unit,
      label: this._selectType === EWorkflowType.SEARCH ?
        this._selectionLabel : `${this._selectionLabel} ${this._bufferTools.distance} ${this._bufferTools.unit}`,
      selectedIds: this._selectedIds,
      layerView: this.selectLayerView,
      geometries: this.geometries,
      refineSelectLayers: this._refineTools.layerViews
    } as ISelectionSet;
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() selectionSetChange: EventEmitter;

  @Listen("sketchGraphicsChange", { target: 'window' })
  sketchGraphicsChange(event: CustomEvent): void {
    this._updateSelection(EWorkflowType.SKETCH, event.detail, this.translations?.sketch);
  }

  @Listen("refineSelectionGraphicsChange", { target: 'window' })
  refineSelectionGraphicsChange(event: CustomEvent): void {
    const graphics = event.detail;

    this._updateSelection(EWorkflowType.SELECT, graphics, this.translations?.select);
    // Using OIDs to avoid issue with points
    const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
    this._highlightFeatures(oids);
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad() {
    await this._initModules();
  }

  async componentDidLoad() {
    this._init();
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
          active={drawEnabled}
          class={showDrawToolsClass}
          mapView={this.mapView} 
          translations={this.translations}
          ref={(el) => { this._drawTools = el}}
        />
        <refine-selection-tools
          active={selectEnabled}
          class={showSelectToolsClass}
          layerViews={this._refineSelectLayers}
          mapView={this.mapView}
          mode={ESelectionMode.ADD}
          ref={(el) => { this._refineTools = el }}
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

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  async _initModules(): Promise<void> {
    const [GraphicsLayer, Graphic, Search, Geometry, geometryEngine]: [
      __esri.GraphicsLayerConstructor,
      __esri.GraphicConstructor,
      __esri.widgetsSearchConstructor,
      __esri.GeometryConstructor,
      __esri.geometryEngine
    ] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/geometry/Geometry",
      "esri/geometry/geometryEngine"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
    this.Geometry = Geometry;
    this.geometryEngine = geometryEngine;
  }

  async _init() {
    this._initGraphicsLayer();
    this._initSelectionSet();
    this._initSearchWidget();
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
            this._drawTools?.pointSymbol : sg.type === 'polyline' ? 
            this._drawTools?.polylineSymbol : sg.type === 'polygon' ? 
            this._drawTools?.polygonSymbol : undefined
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
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          this._updateSelection(
            EWorkflowType.SEARCH,
            [searchResults.result.feature],
            searchResults?.result?.name
          );
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
    this._highlightHandle = this.selectLayerView.highlight(target);
    this.selectionSetChange.emit((Array.isArray(target) ? target : [target]).length);
  }

  async _selectFeatures(
    geometry: __esri.Geometry
  ): Promise<void> {
    if (this.selectTimeout) {
      clearTimeout(this.selectTimeout);
    }
    this.selectTimeout = setTimeout(async () => {
      this._selectedIds = [];
      if (this._highlightHandle) {
        this._highlightHandle.remove();
      }
      await this._query(geometry);
      this._highlightFeatures(this._selectedIds);
    }, 100);
  }

  async _query(
    geometry: __esri.Geometry
  ) {
    const query = {
      geometry
    };
    this._selectedIds = this._selectedIds.concat(
      await this.selectLayerView?.queryObjectIds(query)
    );
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
      void this._selectFeatures(this._bufferGeometry);
      void this.mapView.goTo(polygonGraphic.geometry.extent);
    } else {
      if (this._bufferGraphicsLayer) {
        this._bufferGraphicsLayer.removeAll();
      }
      this._geomQuery(this.geometries);
    }
  }

  _geomQuery(
    geometries: __esri.Geometry[]
  ) {
    const queryGeom = geometries.length > 1 ?
      this.geometryEngine.union(geometries) : geometries[0];
    this._selectFeatures(queryGeom);
  }

  _clearResults(
    clearSearchWidget: boolean = true,
    clearLabel: boolean = true
  ) {
    this._selectedIds = [];

    if (clearLabel) {
      this._selectionLabel = "";
    }

    if (this._bufferGraphicsLayer) {
      this._bufferGraphicsLayer.removeAll();
    }

    if (clearSearchWidget && this._searchWidget) {
      this._searchWidget.clear();
    }

    if (this._highlightHandle) {
      this._highlightHandle.remove();
    }

    // for sketch
    if (this._drawTools) {
      this._drawTools.clear();
    }
    this.selectionSetChange.emit(this._selectedIds.length);
  }

  _updateSelection(
    type: EWorkflowType,
    graphics: __esri.Graphic[],
    label: string
  ) {
    // This doesn't seem to work well with points for Select..but fine once a buffer is in the mix
    this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
    this._selectType = type;
    this._selectionLabel = label;
  }
}
