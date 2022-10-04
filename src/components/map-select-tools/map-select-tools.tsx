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

import { Component, Element, Event, EventEmitter, Host, h, Method, Listen, Prop, State, VNode, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import { highlightFeatures } from '../../utils/mapViewUtils';
import { EWorkflowType, ESelectionMode, ISelectionSet, ERefineMode } from '../../utils/interfaces';
import state from "../../utils/publicNotificationStore";
import MapSelectTools_T9n from '../../assets/t9n/map-select-tools/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

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
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() selectLayerView: __esri.FeatureLayerView;

  /**
   * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
   */
  @Prop() geometries: __esri.Geometry[];

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
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  @State() searchTerm: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof MapSelectTools_T9n;

  /**
   * EWorkflowType: "SEARCH", "SELECT", "SKETCH", "REFINE"
   */
  @State() workflowType: EWorkflowType = EWorkflowType.SEARCH;

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
  protected geometryEngine:  __esri.geometryEngine;

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
  ): Promise<void> {
    if (newValue !== oldValue) {
      if (newValue.length > 0) {
        return this._geomQuery(this.geometries);
      } else if (newValue.length === 0) {
        return this._clearResults(true, true);
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Fetch the currently selected ids
   *
   * @returns Promise with an array of the selected ids
   */
  @Method()
  async getSelectedIds(): Promise<number[]> {
    return Promise.resolve(this._selectedIds);
  }

  /**
   * Fetch the selection label
   *
   * @returns Promise with the selection label
   */
  @Method()
  async getSelectionLabel(): Promise<string> {
    return Promise.resolve(this._selectionLabel);
  }

  /**
   * Fetch the selection type
   *
   * @returns Promise with the selection type
   */
  @Method()
  async getSelectType(): Promise<EWorkflowType> {
    return Promise.resolve(this._selectType);
  }

  /**
   * Clear any selection results
   *
   * @returns Promise when the results have been cleared
   */
  @Method()
  clearSelection(): Promise<void> {
    return this._clearResults();
  }

  /**
   * Get the new selection set
   *
   * @returns Promise with the new selection set
   */
  @Method()
  getSelection(): Promise<ISelectionSet> {
    return Promise.resolve({
      id: this.isUpdate ? this.selectionSet.id : Date.now(),
      workflowType: this._selectType,
      searchResult: this._searchResult,
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      download: true,
      unit: this._bufferTools.unit,
      label: this._selectType === EWorkflowType.SEARCH ?
        this._selectionLabel : `${this._selectionLabel} ${this._bufferTools.distance} ${this._bufferTools.unit}`,
      selectedIds: this._selectedIds,
      layerView: this.selectLayerView,
      geometries: this.geometries,
      refineSelectLayers: this._refineTools.layerViews
    } as ISelectionSet);
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() selectionSetChange: EventEmitter<number>;

  @Event() workflowTypeChange: EventEmitter<EWorkflowType>;

  @Listen("sketchGraphicsChange", { target: 'window' })
  sketchGraphicsChange(event: CustomEvent): void {
    this._updateSelection(EWorkflowType.SKETCH, event.detail, this._translations.sketch);
  }

  @Listen("refineSelectionGraphicsChange", { target: 'window' })
  refineSelectionGraphicsChange(event: CustomEvent): Promise<void> {
    const graphics = event.detail;

    this._updateSelection(EWorkflowType.SELECT, graphics, this._translations.select);
    // Using OIDs to avoid issue with points
    const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
    return this._highlightFeatures(oids);
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
    return Promise.resolve();
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad(): Promise<void> {
    return this._init();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
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
              class="w-50 end-border"
              value={EWorkflowType.SEARCH}
            >
              {this._translations.search}
            </calcite-radio-group-item>
            <calcite-radio-group-item
              checked={selectEnabled}
              class="w-50 end-border"
              value={EWorkflowType.SELECT}
            >
              {this._translations.select}
            </calcite-radio-group-item>
            <calcite-radio-group-item
              checked={drawEnabled}
              class="w-50"
              value={EWorkflowType.SKETCH}
            >
              {this._translations.sketch}
            </calcite-radio-group-item>
          </calcite-radio-group>
        </div>
        <div class={showSearchClass}>
          <div class="search-widget" ref={(el) => { this._searchDiv = el }} />
        </div>
        <map-draw-tools
          active={drawEnabled}
          border={true}
          class={showDrawToolsClass}
          mapView={this.mapView}
          ref={(el) => { this._drawTools = el}}
        />
        <refine-selection-tools
          active={selectEnabled}
          border={true}
          class={showSelectToolsClass}
          layerViews={this._refineSelectLayers}
          mapView={this.mapView}
          mode={ESelectionMode.ADD}
          ref={(el) => { this._refineTools = el }}
          refineMode={ERefineMode.SUBSET}
        />
        <calcite-label style={{ "display": "flex", "padding-top": "1rem" }}>
          {this._translations?.searchDistance}
          <buffer-tools
            distance={this.selectionSet?.distance}
            geometries={this.geometries}
            onBufferComplete={(evt) => this._bufferComplete(evt)}
            ref={(el) => this._bufferTools = el}
            unit={this.selectionSet?.unit}
           />
        </calcite-label>
        <slot />
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

  /**
   * Initialize the graphics layer, selection set, and search widget
   *
   * @returns Promise when the operation has completed
   */
  protected async _init(): Promise<void> {
    this._initGraphicsLayer();
    this._initSelectionSet();
    this._initSearchWidget();
    return Promise.resolve();
  }

  /**
   * Initialize the state of the component with any stored values in a selection set
   *
   * @protected
   */
  protected _initSelectionSet(): void {
    if (this.selectionSet) {
      this.searchTerm = this.selectionSet?.searchResult?.name;
      this.workflowType = this.selectionSet?.workflowType;
      this._selectType = this.selectionSet?.workflowType;
      this._searchResult = this.selectionSet?.searchResult;
      this._refineSelectLayers = this.selectionSet?.refineSelectLayers;
      this.geometries = [
        ...this.selectionSet?.geometries
      ];
      this._drawTools.graphics = this.geometries.map(sg => {
        const props = {
          'geometry': sg,
          'symbol': sg.type === 'point' ?
            this._drawTools?.pointSymbol : sg.type === 'polyline' ?
            this._drawTools?.polylineSymbol : sg.type === 'polygon' ?
            this._drawTools?.polygonSymbol : undefined
        };
        return new this.Graphic(props)
      });
      // reset selection label base
      this._selectionLabel = this.workflowType === EWorkflowType.SKETCH ?
        this._translations.sketch : this.workflowType === EWorkflowType.SELECT ?
        this._translations.select : this.selectionSet?.label;
    }
  }

  /**
   * Initialize the search widget
   *
   * @protected
   */
  protected _initSearchWidget(): void {
    if (this.mapView && this._searchDiv) {
      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchDiv,
        searchTerm: this.searchTerm
      };

      this._searchWidget = new this.Search(searchOptions);

      this._searchWidget.on('search-clear', () => {
        void this._clearResults(false);
      });

      this._searchWidget.on('select-result', (searchResults) => {
        void this._clearResults(false);
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

  /**
   * Initialize the graphics layer used to store any buffer grapghics
   *
   * @protected
   */
  protected _initGraphicsLayer(): void {
    const title = this._translations.bufferLayer;

    const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (bufferIndex > -1) {
      this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex) as __esri.GraphicsLayer;
    } else {
      this._bufferGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === this._translations.sketchLayer);
      if (sketchIndex > -1) {
        this.mapView.map.layers.add(this._bufferGraphicsLayer, sketchIndex);
      } else {
        this.mapView.map.layers.add(this._bufferGraphicsLayer);
      }
    }
  }

  /**
   * Store workflow change and emit workflow change event
   *
   * @protected
   */
  protected _workflowChange(evt: CustomEvent): void {
    this.workflowType = evt.detail;
    this.workflowTypeChange.emit(this.workflowType)
  }

  /**
   * Highlight the features in the map
   *
   * @protected
   */
  protected async _highlightFeatures(
    ids: number[]
  ): Promise<void> {
    state.highlightHandle?.remove();
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(
        this.mapView,
        this.selectLayerView,
        ids
      );
    }
    this.selectionSetChange.emit(ids.length);
    return Promise.resolve();
  }

  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param geometries Array of geometries used for the selection of ids from the select layer view
   *
   * @returns Promise when the selection is complete and the graphics have been highlighted
   */
  protected async _selectFeatures(
    geometries: __esri.Geometry[]
  ): Promise<void> {
    if (this.selectTimeout) {
      clearTimeout(this.selectTimeout);
    }
    //this.selectTimeout = setTimeout(() => {
      this._selectedIds = [];
      const queryDefs = geometries.map(g => this._query(g))
      const results = await Promise.all(queryDefs);
      results.forEach(r => {
        this._selectedIds = [
          ...this._selectedIds,
          ...r
        ]
      });
      void this._highlightFeatures(this._selectedIds);
    //}, 100);
    return Promise.resolve();
  }

  /**
   * Query the selectLayerView
   *
   * @param geometry Geometry used for the selection of ids from the select layer view
   *
   * @returns Promise that will contain the selected ids
   */
  protected async _query(
    geometry: __esri.Geometry
  ): Promise<number[]> {
    const q = this.selectLayerView.layer.createQuery();
    q.spatialRelationship = "intersects";
    q.geometry = geometry;
    return this.selectLayerView?.layer?.queryObjectIds(q);
  }

  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param evt CustomEvent that contains the result of the buffer
   *
   * @protected
   */
  protected async _bufferComplete(
    evt: CustomEvent
  ): Promise<void> {
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
      void this._selectFeatures([this._bufferGeometry]);
      void this.mapView.goTo(polygonGraphic.geometry.extent);
    } else {
      if (this._bufferGraphicsLayer) {
        this._bufferGraphicsLayer.removeAll();
      }
      void this._geomQuery(this.geometries);
    }
    return Promise.resolve();
  }

  /**
   * Fetch a single geometry for each potential geometry type
   *
   * @param geometries All current selection geometries
   *
   * @protected
   */
  protected _geomQuery(
    geometries: __esri.Geometry[]
  ): Promise<void> {
    // sort by geom type so we have a single geom for each type to query with
    const queryGeoms = [
      ...this._getQueryGeoms(geometries, "polygon"),
      ...this._getQueryGeoms(geometries, "polyline"),
      ...this._getQueryGeoms(geometries, "point")
    ];

    return this._selectFeatures(queryGeoms);
  }

  /**
   * Fetch a single geometry for the current geometry type
   *
   * @param geometries All current selection geometries
   * @param type The geometry type to union
   *
   * @returns Array with a single unioned geometry for the current geometry type
   * @protected
   */
  protected _getQueryGeoms(
    geometries: __esri.Geometry[],
    type: string
  ): __esri.Geometry[] {
    const geoms = geometries.filter(g => g.type === type);
    return geoms.length <= 1 ? geoms : [this.geometryEngine.union(geoms)];
  }

  /**
   * Clear all stored values and general state for the component
   *
   * @param clearSearchWidget Optional boolean for clearing the search widget (default is true)
   * @param clearLabel Optional boolean for clearing the search label (default is true)
   *
   * @protected
   */
  protected async _clearResults(
    clearSearchWidget = true,
    clearLabel = true
  ): Promise<void> {
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

    state.highlightHandle?.remove();

    // for sketch
    if (this._drawTools) {
      void this._drawTools.clear();
    }
    this.selectionSetChange.emit(this._selectedIds.length);
    return Promise.resolve();
  }

  /**
   * Fetch a single geometry for the current geometry type
   *
   * @param type worflow type
   * @param graphics graphics to be used for selection
   * @param label selection label
   *
   * @protected
   */
  protected _updateSelection(
    type: EWorkflowType,
    graphics: __esri.Graphic[],
    label: string
  ): void {
    // This doesn't seem to work well with points for Select..but fine once a buffer is in the mix
    this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
    this._selectType = type;
    this._selectionLabel = label;
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof MapSelectTools_T9n;
    return Promise.resolve();
  }
}
