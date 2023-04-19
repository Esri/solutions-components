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

import { Component, Element, Event, EventEmitter, Host, h, Method, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { highlightFeatures, getMapLayerView, goToSelection } from "../../utils/mapViewUtils";
import { getQueryGeoms, queryFeaturesByGeometry, queryObjectIds } from "../../utils/queryUtils";
import { DistanceUnit, ILayerSourceConfigItem, ILocatorSourceConfigItem, ISearchConfiguration, ISelectionSet } from "../../utils/interfaces";
import state from "../../utils/publicNotificationStore";
import MapSelectTools_T9n from "../../assets/t9n/map-select-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: "map-select-tools",
  styleUrl: "map-select-tools.css",
  shadow: false,
})
export class MapSelectTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLMapSelectToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string | number[] |  object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
   */
  @Prop() bufferColor: any = [227, 139, 79, 0.8];

  /**
   * string | number[] | object with r, g, b, a: https://developers.arcgis.com/javascript/latest/api-reference/esri-Color.html
   */
  @Prop() bufferOutlineColor: any = [255, 255, 255];

  /**
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  @Prop() enabledLayerIds: string[] = [];

  /**
   * number: The default value to show for the buffer distance
   */
  @Prop() defaultBufferDistance: number;

  /**
   * number: The default value to show for the buffer unit
   */
  @Prop() defaultBufferUnit: DistanceUnit;

  /**
   * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
   */
  @Prop() geometries: __esri.Geometry[] = [];

  /**
   * boolean: When true a new label is not generated for the stored selection set
   */
  @Prop() isUpdate = false;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * ISearchConfiguration: Configuration details for the Search widget
   */
  @Prop({mutable: true}) searchConfiguration: ISearchConfiguration;

  /**
   * utils/interfaces/ISelectionSet: Used to store key details about any selections that have been made.
   */
  @Prop({ reflect: false }) selectionSet: ISelectionSet;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() selectLayerView: __esri.FeatureLayerView;

  /**
   * esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
   *
   */
  @Prop() sketchLineSymbol: __esri.SimpleLineSymbol;

  /**
   * esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
   *
   */
  @Prop() sketchPointSymbol: __esri.SimpleMarkerSymbol;

  /**
   * esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
   *
   */
  @Prop() sketchPolygonSymbol: __esri.SimpleFillSymbol;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: when true buffer tools controls are enabled
   */
  @State() _searchDistanceEnabled = false;

  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  @State() _searchTerm: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof MapSelectTools_T9n;

  /**
   * boolean: when true drawn graphics will be used to select features
   */
  @State() _useLayerFeaturesEnabled = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  protected FeatureLayer: typeof import("esri/layers/FeatureLayer");

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  protected Graphic: typeof import("esri/Graphic");

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   */
  protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  protected Search: typeof import("esri/widgets/Search");

  /**
   * esri/geometry/geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
   */
  protected _geometryEngine: __esri.geometryEngine;

  /**
   * esri/geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry.html
   */
  protected _bufferGeometry: __esri.Geometry;

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   */
  protected _bufferGraphicsLayer: __esri.GraphicsLayer;

  /**
   * HTMLBufferToolsElement: The container div for the buffer tools
   */
  protected _bufferTools: HTMLBufferToolsElement;

  /**
   * HTMLMapDrawToolsElement: The container div for the sketch widget
   */
  protected _drawTools: HTMLMapDrawToolsElement;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  protected _selectLayers: __esri.FeatureLayerView[];

  /**
   * HTMLElement: The container div for the search widget
   */
  protected _searchElement: HTMLElement;

  /**
   * An array of objects representing the results of search
   */
  protected _searchResult: any;

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  protected _searchWidget: __esri.widgetsSearch;

  /**
   * number[]: the oids of the selected features
   */
  protected _selectedIds: number[] = [];

  /**
   * string: A label to help uniquely identify the selection set
   */
  protected _selectionLabel = "";

  /**
   * number[]: When empty or undefined the geometries will be used for selection
   *          When it has values they will be used directly when no buffer is provided
   *          see https://github.com/Esri/solutions-components/issues/148
   */
  protected _skipGeomOIDs: number[];

  /**
   * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  protected _graphics: __esri.Graphic[] = [];

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the geometries prop is changed.
   *
   * @returns Promise when complete
   */
  @Watch("geometries")
  async watchGeometriesHandler(
    newValue: __esri.Geometry[],
    oldValue: __esri.Geometry[]
  ): Promise<void> {
    if (newValue !== oldValue) {
      const isEmpty = newValue.length === 0;
      await this._clearResults(isEmpty, isEmpty);
      if (newValue.length > 0) {
        return this._highlightWithOIDsOrGeoms();
      }
    }
  }

  /**
   * Called each time the searchConfiguration prop is changed.
   *
   * @returns Promise when complete
   */
  @Watch("searchConfiguration")
  async watchSearchConfigurationHandler(
    newValue: ISearchConfiguration,
    oldValue: ISearchConfiguration
  ): Promise<void> {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this._initSearchWidget();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Clear any selection results
   *
   * @returns Promise when the results have been cleared
   */
  @Method()
  async clearSelection(): Promise<void> {
    return this._clearResults(true, true);
  }

  /**
   * Get the new selection set
   *
   * @returns Promise with the new selection set
   */
  @Method()
  async getSelection(): Promise<ISelectionSet> {
    // Allow any non whitespace
    if (!/\S+/gm.test(this._selectionLabel)) {
      this._selectionLabel = this._getSelectionBaseLabel();
    }
    const isBaseLabel = this._selectionLabel === this._getSelectionBaseLabel();
    return {
      id: this.isUpdate ? this.selectionSet.id : Date.now(),
      searchResult: this._searchResult,
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      download: true,
      unit: this._bufferTools.unit,
      label: (this._selectionLabel && !isBaseLabel) ?
        this._selectionLabel : `${this._selectionLabel} ${this._bufferTools.distance} ${this._bufferTools.unit}`,
      selectedIds: this._selectedIds,
      layerView: this.selectLayerView,
      geometries: this.geometries,
      graphics: this._graphics,
      selectLayers: this.layerViews,
      skipGeomOIDs: this._skipGeomOIDs,
      searchDistanceEnabled: this._searchDistanceEnabled,
      useLayerFeaturesEnabled: this._useLayerFeaturesEnabled
    } as ISelectionSet;
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when selection starts or ends.
   */
  @Event() selectionLoadingChange: EventEmitter<boolean>;

  /**
   * Emitted on demand when the selection set changes.
   */
  @Event() selectionSetChange: EventEmitter<number>;

  /**
   * Handle changes to the selection sets
   */
  @Listen("labelChange", { target: "window" })
  labelChange(event: CustomEvent): void {
    this._selectionLabel = event.detail;
  }

  /**
   * Handle changes to the search configuration
   */
  @Listen("searchConfigurationChange", { target: "window" })
  searchConfigurationChangeChanged(event: CustomEvent): void {
    this.searchConfiguration = event.detail;
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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad(): Promise<void> {
    return this._init();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="search-widget" ref={(el) => { this._searchElement = el }} />

        <div class="padding-top-1">
          <map-draw-tools
            active={true}
            graphics={this._graphics}
            mapView={this.mapView}
            onSketchGraphicsChange={(evt) => this._sketchGraphicsChanged(evt)}
            pointSymbol={this.sketchPointSymbol}
            polygonSymbol={this.sketchPolygonSymbol}
            polylineSymbol={this.sketchLineSymbol}
            ref={(el) => { this._drawTools = el }}
          />
        </div>

        {this._getBufferOptions()}

        {this._getUseLayerFeaturesOptions()}
      </Host>
    );
  }

  protected _getBufferOptions(): VNode {
    const showBufferToolsClass = this._searchDistanceEnabled ? "search-distance" : "div-not-visible";
    const bufferDistance = typeof this.selectionSet?.distance === "number" ? this.selectionSet.distance : this.defaultBufferDistance;
    return (
      <div>
        <div class="padding-top-1 display-flex">
          <calcite-label
            class="label-margin-0 "
          >
            {this._translations.searchDistance}
          </calcite-label>
          <calcite-switch
            checked={this._searchDistanceEnabled}
            class="position-right"
            onCalciteSwitchChange={() => this._toggleSearchDistanceEnabled()}
          />
        </div>

        <div class={showBufferToolsClass}>
          <buffer-tools
            disabled={!this._searchDistanceEnabled}
            distance={bufferDistance}
            geometries={this.geometries}
            onBufferComplete={(evt) => this._bufferComplete(evt)}
            ref={(el) => this._bufferTools = el}
            unit={this.selectionSet?.unit || this.defaultBufferUnit}
          />
        </div>
      </div>
    );
  }

  protected _toggleSearchDistanceEnabled(): void {
    this._searchDistanceEnabled = !this._searchDistanceEnabled
  }

  protected _getUseLayerFeaturesOptions(): VNode {
    const useLayerFeaturesClass = this._useLayerFeaturesEnabled ? "div-visible" : "div-not-visible";
    return (
      <div>
        <div class="padding-top-1 badding-bottom-1 display-flex">
          <calcite-label
            class="label-margin-0 "
          >
            {this._translations.useLayerFeatures}
          </calcite-label>
          <calcite-switch
            checked={this._useLayerFeaturesEnabled}
            class="position-right"
            onCalciteSwitchChange={() => this._useLayerFeaturesEnabled = !this._useLayerFeaturesEnabled}
          />
        </div>

        <div class={useLayerFeaturesClass + " padding-top-1"}>
          {this._getLayerPicker()}
        </div>
      </div>
    );
  }

  /**
   * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
   */
  protected _featuresCollection: { [key: string]: __esri.Graphic[] } = {};

  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  protected _sketchGeometry: __esri.Geometry;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerViews: __esri.FeatureLayerView[] = [];

  /**
   * Create a map layer picker that will be used during SELECT draw mode operations
   *
   * @returns a map layer picker node
   *
   * @protected
   */
  protected _getLayerPicker(): VNode {
    return (
      <map-layer-picker
        enabledLayerIds={this.enabledLayerIds}
        mapView={this.mapView}
        onLayerSelectionChange={(evt) => { void this._layerSelectionChange(evt) }}
        selectedLayerIds={this.layerViews.map(l => l.layer.id)}
        selectionMode={"single"}
      />
    );
  }

  /**
 * Gets the layer views from the map when the layer selection changes
 *
 * @returns Promise resolving when function is done
 *
 * @protected
 */
  protected async _layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      //this._selectEnabled = true;
      const layerPromises = evt.detail.map(id => {
        return getMapLayerView(this.mapView, id)
      });

      return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    }
    // else {
    //   this._selectEnabled = false;
    // }
  }

  /**
   * Select features based on the input geometry
   *
   * @param geom the geometry used for selection
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _selectLayerFeatures(
    geom: __esri.Geometry
  ): Promise<void> {
    this.selectionLoadingChange.emit(true);
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.id] = [];
      return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection)
    });

    return Promise.all(queryFeaturePromises).then(async response => {
      this.selectionLoadingChange.emit(false);
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        })
      });

      let hasOID = false;

      graphics.forEach((g: __esri.Graphic) => {
        const geom = g.geometry;
        g.symbol = geom.type === "point" ?
          this.sketchPointSymbol : geom.type === "polyline" ?
            this.sketchLineSymbol : geom.type === "polygon" ?
              this.sketchPolygonSymbol : undefined;
        hasOID = g?.layer?.hasOwnProperty("objectIdField") || g.hasOwnProperty("getObjectId");
      });
      //this.graphics = graphics;

      // OIDs are used when the addressee layer and the current "use layer features" layer are the same
      const useOIDs = (this.layerViews[0].layer.title === this.selectLayerView.layer.title) && hasOID;

      await this._sketchGraphicsChanged({
        detail: {
          graphics,
          useOIDs
        }
      } as CustomEvent, true);
    });
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
    const [GraphicsLayer, Graphic, Search, geometryEngine, FeatureLayer] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/geometry/geometryEngine",
      "esri/layers/FeatureLayer"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
    this._geometryEngine = geometryEngine;
    this.FeatureLayer = FeatureLayer;
  }

  /**
   * Initialize the graphics layer, selection set, and search widget
   *
   * @returns Promise when the operation has completed
   */
  protected async _init(): Promise<void> {
    this._initGraphicsLayer();
    await this._initSelectionSet();
    this._initSearchWidget();
  }

  /**
   * Initialize the state of the component with any stored values in a selection set
   *
   * @protected
   */
  protected async _initSelectionSet(): Promise<void> {
    if (this.selectionSet) {
      this._searchTerm = this.selectionSet.searchResult?.name;
      this._searchResult = this.selectionSet.searchResult;
      this._selectLayers = this.selectionSet.selectLayers;
      this._selectedIds = this.selectionSet.selectedIds;
      this._skipGeomOIDs =  this.selectionSet.skipGeomOIDs;
      this._searchDistanceEnabled = this.selectionSet.searchDistanceEnabled;
      this._useLayerFeaturesEnabled = this.selectionSet.useLayerFeaturesEnabled;

      this.geometries = [
        ...this.selectionSet?.geometries || []
      ];

      this._graphics = [
        ...this.selectionSet?.graphics || []
      ];
      // reset selection label base
      this._selectionLabel = this.selectionSet?.label || this._getSelectionBaseLabel();

      await goToSelection(this.selectionSet.selectedIds, this.selectionSet.layerView, this.mapView, false);
    } else {
      this.mapView.popup.autoOpenEnabled = false;
    }
  }

  /**
   * Get the default label base when the user has not provided a value
   *
   * @protected
   */
  protected _getSelectionBaseLabel(): string {
    return this.selectionSet?.label || "need to think through this";
  }

  /**
   * Initialize the search widget
   *
   * @protected
   */
  protected _initSearchWidget(): void {
    if (this.mapView && this._searchElement) {
      const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);

      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchElement,
        searchTerm: this._searchTerm,
        ...searchConfiguration
      };

      this._searchWidget = new this.Search(searchOptions);
      this._searchWidget.popupEnabled = false;

      this._searchWidget.on("search-clear", () => {
        void this._clearResults(false);
      });

      this._searchWidget.on("select-result", (searchResults) => {
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          const useOIDs = searchResults.source?.layer?.id && searchResults.source.layer.id === this.selectLayerView.layer.id;
          const oids = useOIDs ? [searchResults.result.feature.getObjectId()] : undefined;
          this._updateSelection(
            [searchResults.result.feature],
            searchResults?.result?.name,
            useOIDs,
            oids
          );
        } else {
          void this._clearResults(false);
        }
      });
    }
  }

  /**
   * Initialize the search widget based on user defined configuration
   *
   * @param searchConfiguration search configuration defined by the user
   * @param view the current map view
   *
   * @protected
   */
  protected _getSearchConfig(
    searchConfiguration: ISearchConfiguration,
    view: __esri.MapView
  ): ISearchConfiguration {
    const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
    const sources = searchConfiguration?.sources;

    if (sources?.length > 0) {
      searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;

      sources.forEach((source) => {
        const isLayerSource = source.hasOwnProperty("layer");
        if (isLayerSource) {
          const layerSource = source as ILayerSourceConfigItem;
          const layerId = layerSource.layer?.id;
          const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
          const layerUrl = layerSource?.layer?.url;
          if (layerFromMap) {
            layerSource.layer = layerFromMap as __esri.FeatureLayer;
          } else if (layerUrl) {
            layerSource.layer = new this.FeatureLayer(layerUrl as any);
          }
        }
      });

      sources?.forEach((source) => {
        const isLocatorSource = source.hasOwnProperty("locator");
        if (isLocatorSource) {
          const locatorSource = (source as ILocatorSourceConfigItem);
          if (locatorSource?.name === "ArcGIS World Geocoding Service") {
            const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
            locatorSource.outFields = outFields;
            locatorSource.singleLineFieldName = "SingleLine";
          }

          locatorSource.url = locatorSource.url;
          delete locatorSource.url;
        }
      });
    } else {
      searchConfiguration = {
        ...searchConfiguration,
        includeDefaultSources: true
      }
    }
    return searchConfiguration;
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
      this._bufferGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
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
   * Handle changes in the sketch graphics
   *
   */
  protected async _sketchGraphicsChanged(event: CustomEvent, forceUpdate = false): Promise<void> {

    // TODO need to check if "Use layer features" is enabled to know if we should select or select with selection
    const graphics = event.detail.graphics;
    const label = this._selectionLabel || this._translations.select;

    if (this._useLayerFeaturesEnabled && !forceUpdate) {
      // Will only ever be a single graphic
      const geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
      await this._selectLayerFeatures(geometries[0]);
    } else {
      const oids = graphics.reduce((prev, cur) => {
        if (cur?.layer?.objectIdField) {
          prev.push(cur.attributes[cur.layer.objectIdField]);
        } else if (cur.getObjectId) {
          prev.push(cur.getObjectId());
        }
        return prev;
      }, []);

      const useOIDs = event.detail.useOIDs && oids.length > 0;
      this._updateSelection(graphics, label, useOIDs, oids);

      if (useOIDs) {
        await this._highlightFeatures(oids);
      }
    }
  }

  /**
   * Highlight the features in the map based on OIDs when skipOIDs have been defined
   *
   * @protected
   */
  protected async _highlightWithOIDsOrGeoms(): Promise<void> {
    if (this._skipGeomOIDs?.length > 0) {
      this._selectedIds = this._skipGeomOIDs;
      return this._highlightFeatures(this._selectedIds);
    } else {
      return this._geomQuery(this.geometries);
    }
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
        ids,
        this.selectLayerView,
        this.mapView
      );
    }
    this.selectionSetChange.emit(ids.length);
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
    this.selectionLoadingChange.emit(true);
    this._selectedIds = await queryObjectIds(
      geometries,
      this.selectLayerView.layer
    );
    this.selectionLoadingChange.emit(false);

    // stored as graphics now in addition to the geoms
    this._drawTools.graphics = this._graphics;

    await this._highlightFeatures(this._selectedIds);
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
        color: this.bufferColor,
        outline: {
          color: this.bufferOutlineColor,
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
      await this._selectFeatures([this._bufferGeometry]);
      await this.mapView.goTo(polygonGraphic.geometry.extent);
    } else {
      if (this._bufferGraphicsLayer) {
        this._bufferGraphicsLayer.removeAll();
      }
      return this._highlightWithOIDsOrGeoms();
    }
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
    const queryGeoms = getQueryGeoms(geometries, this._geometryEngine);
    return this._selectFeatures(queryGeoms);
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

    // checking for clear as it would throw off tests
    if (this._drawTools?.clear) {
      this._graphics = [];
      await this._drawTools.clear();
    }
    this.selectionSetChange.emit(this._selectedIds.length);
  }

  /**
   * Fetch a single geometry for the current geometry type
   *
   * @param type worflow type
   * @param graphics graphics to be used for selection
   * @param label selection label
   * @param useOIDs indicates if the OIDs should override the geometry for selection
   * @param oids list of IDs to select when useOIDs is true
   *
   * @protected
   */
  protected _updateSelection(
    graphics: __esri.Graphic[],
    label: string,
    useOIDs: boolean,
    oids?: number[]
  ): void {
    this._selectedIds = useOIDs && oids ? oids : this._selectedIds;
    // see https://github.com/Esri/solutions-components/issues/148
    this._skipGeomOIDs = useOIDs ? oids : undefined;
    this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
    this._graphics = graphics;
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
  }
}
