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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import { EWorkflowType } from '../../utils/interfaces';

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

  /**
   * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
   */
  @Prop() searchWidget: __esri.widgetsSearch;

  @Prop() searchLayers: __esri.Layer[];

  @Prop({ mutable: true }) workflowType: EWorkflowType = EWorkflowType.SEARCH;

  @Prop({ mutable: true }) translations: any = {};

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
    this.selectionSetChange.emit(this._selectionSet);
  }

  protected _selectionSet: any[] = [];

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected Graphic: typeof __esri.Graphic;

  protected Search: typeof __esri.widgetsSearch;

  protected _selectionLayerNames: string[] = []

  async componentWillLoad() {
    await this._initModules();
  }

  componentDidLoad() {
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
            onCalciteRadioGroupChange={(evt) => this._workflowChange(evt)}
            style={{ "width": "100%" }}
          >
            <calcite-radio-group-item
              checked={searchEnabled}
              style={{ "width": "50%" }}
              value={EWorkflowType.SEARCH}>
                Search
              </calcite-radio-group-item>
            <calcite-radio-group-item
              checked={selectEnabled}
              style={{ "width": "50%" }}
              value={EWorkflowType.SELECT}>
                Select
              </calcite-radio-group-item>
            <calcite-radio-group-item
              checked={drawEnabled}
              style={{ "width": "50%" }}
              value={EWorkflowType.SKETCH}>
                Sketch
              </calcite-radio-group-item>
          </calcite-radio-group>
        </div>
        <div class={showSearchClass}>
          <div class="search-widget" ref={(el) => { this._searchDiv = el }} />
        </div>
        <map-draw-tools class={showDrawToolsClass} mapView={this.mapView} />
        <div class={showSelectToolsClass}>
          <map-layer-picker label="Select Layer(s)" mapView={this.mapView} selectionMode={"multi"}/>

          <div class={"esri-sketch esri-widget"}>
            <div class={"esri-sketch__panel"}>
              <div class={"esri-sketch__tool-section esri-sketch__section"}>
                <calcite-action disabled={this._selectionLayerNames.length > 0} icon="select" scale="s" text="Select" />
              </div>
              <div class={"esri-sketch__tool-section esri-sketch__section"}>
                <calcite-action disabled={this._selectionLayerNames.length > 0} icon="line" scale="s" text="Select by line" />
                <calcite-action disabled={this._selectionLayerNames.length > 0} icon="polygon" scale="s" text="Select by polygon" />
                <calcite-action disabled={this._selectionLayerNames.length > 0} icon="rectangle" scale="s" text="Select by rectangle" />
              </div>
              <div class={"esri-sketch__tool-section esri-sketch__section"}>
                <calcite-action disabled={this._selectionLayerNames.length > 0} icon="undo" scale="s" text="Undo" />
                <calcite-action disabled={this._selectionLayerNames.length > 0} icon="redo" scale="s" text="Redo" />
              </div>
            </div>
          </div>
        </div>
        <calcite-label style={{ "display": "flex", "padding-top": "1rem" }}>Search Distance
          <div class="control-container">
            <calcite-input
              class="padding-end-1"
              number-button-type="vertical"
              onCalciteInputInput={(evt) => this._setDistance(evt)}
              placeholder="0"
              type="number" />
            <calcite-combobox
              label='label?'
              placeholder="unit"
              selection-mode="single"
              style={{"flex": "1"}}>
              {this._addUnits()}
            </calcite-combobox>
          </div>
        </calcite-label>
        <slot />
      </Host>
    );
  }

  private _searchDiv: HTMLElement;

  private _searchGeom: any;

  private _unit = "";

  private _distance = 0;

  private _bufferGraphicsLayer: __esri.GraphicsLayer;

  async _initModules(): Promise<void> {
    const [GraphicsLayer, Graphic, Search]: [
      __esri.GraphicsLayerConstructor,
      __esri.GraphicConstructor,
      __esri.widgetsSearchConstructor
    ] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
  }

  _init(): void {
    this._initSearchWidget();
    this._initGraphicsLayer();
  }

  _initSearchWidget(): void {
    if (this.mapView && this._searchDiv) {
      const searchOptions: __esri.widgetsSearchProperties = {
        view: this.mapView,
        container: this._searchDiv
      };

      this.searchWidget = new this.Search(searchOptions);

      this.searchWidget.on('search-clear', () => {
        this._searchGeom = undefined;
        this._bufferGraphicsLayer.removeAll();
      });

      this.searchWidget.on('select-result', (searchResults) => {
        if (searchResults.result) {
          this._searchGeom = searchResults.result.feature.geometry;
          this._buffer();
        }
      });
    }
  }

  _initGraphicsLayer(): void {
    this._bufferGraphicsLayer = new this.GraphicsLayer({
      title: "Buffer Layer"
    });
    this.mapView.map.layers.add(this._bufferGraphicsLayer);
  }

  _addUnits(): any {
    const UNITS: string[] = ["Feet", "Meters", "Miles", "Kilometers"];
    return UNITS.map(u => {
      if (this._unit === "") {
        this._unit = u;
      }
      // gotta be a better way to just add selected without needing to duplicate all that
      return this._unit === u ? (<calcite-combobox-item
        onCalciteComboboxItemChange={(evt) => this._setUnit(evt)}
        selected
        textLabel={u}
        value={u} />
      ) : (<calcite-combobox-item
        onCalciteComboboxItemChange={(evt) => this._setUnit(evt)}
        textLabel={u}
        value={u.toLowerCase()} />
      );
    });
  }

  _setDistance(
    event: CustomEvent
  ): void {
    this._distance = event.detail.value;
    this._buffer();
  }

  _setUnit(
    event: CustomEvent
  ): void {
    this._unit = event.detail.value;
    this._buffer();
  }

  _buffer(): void {
    if (this._searchGeom && this._unit !== "" && this._distance > 0) {
      try {
        console.log(__esri.LinearUnit['feet'])
      } catch (error) {

      }
      try {
        console.log(__esri.LinearUnit[0])
      } catch (error) {

      }
      try {
        const lCu = this._unit.toLowerCase();
        const bufferResults4 = geometryEngine.geodesicBuffer(
          this._searchGeom,
          this._distance,
          lCu === 'feet' ? 'feet' : lCu === 'kilometers' ? 'kilometers' : lCu === 'meters' ? 'meters' : lCu === 'miles' ? 'miles' : 'feet'
        );

        // Create a symbol for rendering the graphic
        const fillSymbol = {
          type: "simple-fill",
          color: [227, 139, 79, 0.8],
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        };

        // Add the geometry and symbol to a new graphic
        const polygonGraphic = new this.Graphic({
          geometry: Array.isArray(bufferResults4) ? bufferResults4[0] : bufferResults4,
          symbol: fillSymbol
        });

        this._bufferGraphicsLayer.removeAll();
        this._bufferGraphicsLayer.add(polygonGraphic);
        void this.mapView.goTo(polygonGraphic.geometry.extent);

      } catch (err) {
        console.log(err)
      }
    }
  }

  _workflowChange(evt: CustomEvent): void {
    this.workflowType = evt.detail;
  }
}