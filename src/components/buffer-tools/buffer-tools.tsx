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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";
import BufferTools_T9n from '../../assets/t9n/buffer-tools/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'buffer-tools',
  styleUrl: 'buffer-tools.css',
  shadow: true,
})
export class BufferTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLBufferToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  @Prop() geometries: __esri.Geometry[];

  /**
   * boolean: option to control if buffer results should be unioned
   */
  @Prop() unionResults = true;

  /**
   * LinearUnits: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#LinearUnits
   */
  @Prop() unit: __esri.LinearUnits = "meters";

  /**
   * number: The distance used for buffer
   */
  @Prop() distance = 0;

  /**
   * string: The appearance of display. Can be a "slider" or "text" inputs for distance/value
   */
  @Prop() appearance: "slider" | "text" = "text";

  /**
   * number: The component's maximum selectable value.
   */
  @Prop() sliderMax = 100;

  /**
   * number: The component's minimum selectable value.
   */
  @Prop() sliderMin = 0;

  /**
   * number: Displays tick marks on the number line at a specified interval.
   */
  @Prop() sliderTicks = 10;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
   */
  protected _geometryEngine:  __esri.geometryEngine;

  /**
   * HTMLCalciteSelectElement: The html element for selecting buffer unit
   */
  protected _unitElement: HTMLCalciteSelectElement;

  /**
   * Timeout: https://nodejs.org/en/docs/guides/timers-in-node/
   */
  protected _bufferTimeout: NodeJS.Timeout;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof BufferTools_T9n;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the geometries prop is changed.
   * Buffer each of the geometries.
   *
   */
  @Watch('geometries')
  geometriesWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._buffer();
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
   * Emitted on demand when a buffer is generated.
   * 
   */
  @Event() bufferComplete: EventEmitter<__esri.Polygon | __esri.Polygon[]>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   * 
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        {this.appearance === "text" ? this._getTextBoxDisplay() : this._getSliderDisplay()}
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
   * Gets the nodes for each of the possible distance units
   *
   * @returns An array of option nodes
   *
   * @protected
   */
  protected _getUnits(): VNode[] {
    const units = {
      'feet': this._translations.feet || 'Feet',
      'meters': this._translations.meters || 'Meters',
      'miles': this._translations.miles || 'Miles',
      'kilometers': this._translations.kilometers || 'Kilometers'
    };
    return Object.keys(units).map(u => {
      let selected = true;
      if (!this.unit) {
        this.unit = u as __esri.LinearUnits;
      } else if (this.unit !== u) {
        selected = false;
      }
      return (<calcite-option label={units[u]} selected={selected} value={u} />);
    });
  }

  /**
   * Store the user defined distance value and create a buffer
   *
   * @param event the event from the calcite input control
   *
   * @protected
   */
  protected _setDistance(
    event: CustomEvent
  ): void {
    this.distance = event.detail.value;
    if (this.distance > 0) {
      this._buffer();
    } else {
      this.bufferComplete.emit(undefined);
    }
  }

  /**
   * Store the user defined unit value and create a buffer
   *
   * @protected
   */
  protected _setUnit(): void {
    this.unit = this._unitElement.value as __esri.LinearUnits;
    this._buffer();
  }

  /**
   * Create buffer geometry based on the user defined unit and distance
   *
   * @protected
   */
  protected _buffer(): void {
    if (this._bufferTimeout) {
      clearTimeout(this._bufferTimeout);
    }

    this._bufferTimeout = setTimeout(() => {
      // needs to be wgs 84 or Web Mercator
      if (this.geometries?.length > 0 && this.unit && this.distance > 0) {
        const buffer = this._geometryEngine.geodesicBuffer(
          this.geometries,
          this.distance,
          this.unit,
          this.unionResults
        );
        this.bufferComplete.emit(buffer);
      }
    }, 400);
  }

  /**
   * Render distance and unit as calcite input and select controls
   * This option will be used when the "appearance" prop is set to "text"
   *
   * @returns a node with the supporting controls
   *
   * @protected
   */
  protected _getTextBoxDisplay(): VNode {
    return (
      <div class="c-container">
        <calcite-input
          class="padding-end-1"
          number-button-type="vertical"
          onCalciteInputInput={(evt) => this._setDistance(evt)}
          placeholder="0"
          type="number"
          value={this.distance ? this.distance.toString() : undefined}
        />
        <calcite-select
          class="flex-1"
          label='label'
          onCalciteSelectChange={() => this._setUnit()}
          ref={(el) => { this._unitElement = el }}
        >
          {this._getUnits()}
        </calcite-select>
      </div>
    );
  }

  /**
   * Render distance control as a slider
   * This option will be used when the "appearance" prop is set to "slider"
   *
   * @returns a node with the supporting control
   *
   * @protected
   */
  protected _getSliderDisplay(): VNode {
    return (
      <div>
        <calcite-slider
          labelHandles={true}
          max={this.sliderMax}
          min={this.sliderMin}
          ticks={this.sliderTicks}
        />
      </div>
    );
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof BufferTools_T9n;
  }

}
