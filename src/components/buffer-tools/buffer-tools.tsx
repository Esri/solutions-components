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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import BufferTools_T9n from "../../assets/t9n/buffer-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { DistanceUnit, IValueChange } from "../../utils/interfaces";

@Component({
  tag: "buffer-tools",
  styleUrl: "buffer-tools.css",
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
   * string: The appearance of display. Can be a "slider" or "text" inputs for distance/value
   */
  @Prop({ mutable: true }) appearance: "slider" | "text" = "text";

  /**
   * number: The distance used for buffer
   */
  @Prop({ mutable: true }) distance = 0;

  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  @Prop({ mutable: true }) geometries: __esri.Geometry[] = [];

  /**
   * number: The component's maximum selectable value.
   */
  @Prop({ mutable: true }) max: number;

  /**
   * number: The component's minimum selectable value.
   */
  @Prop({ mutable: true }) min = 0;

  /**
   * number: Displays tick marks on the number line at a specified interval.
   */
  @Prop({ mutable: true }) sliderTicks = 10;

  /**
   * boolean: option to control if buffer results should be unioned
   */
  @Prop({ mutable: true }) unionResults = true;

  /**
   * DistanceUnit: "feet"|"meters"|"miles"|"kilometers"
   */
  @Prop({ mutable: true }) unit: DistanceUnit = "meters";

  @Prop() disabled = false;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof BufferTools_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
   */
  protected _geometryEngine: __esri.geometryEngine;

  /**
   * Timeout: https://nodejs.org/en/docs/guides/timers-in-node/
   */
  protected _bufferTimeout: NodeJS.Timeout;

  /**
   * HTMLCalciteSelectElement: The html element for selecting buffer unit
   */
  protected _unitElement: HTMLCalciteSelectElement;

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
  @Watch("geometries")
  geometriesWatchHandler(): void {
    this._buffer();
  }

  @Watch("disabled")
  disabledWatchHandler(): void {
    this._buffer();
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
   */
  @Event() bufferComplete: EventEmitter<__esri.Polygon | __esri.Polygon[]>;

  /**
   * Emitted on demand when the distance value changes
   */
  @Event() distanceChanged: EventEmitter<IValueChange>;

  /**
   * Emitted on demand when the unit changes
   */
  @Event() unitChanged: EventEmitter<IValueChange>;

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
      "feet": this._translations.feet,
      "meters": this._translations.meters,
      "miles": this._translations.miles,
      "kilometers": this._translations.kilometers
    };
    return Object.keys(units).map(u => {
      return (<calcite-option label={units[u]} selected={this.unit === u} value={u} />);
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
    const v = parseInt((event.target as HTMLCalciteInputElement).value, 10);
    if (this.distance !== v && v >= this.min) {
      this.distanceChanged.emit({
        oldValue: this.distance,
        newValue: v
      });
      this.distance = v;
      if (this.distance > 0) {
        this._buffer();
      } else {
        this.bufferComplete.emit(undefined);
      }
    }
  }

  /**
   * Store the user defined unit value and create a buffer
   *
   * @protected
   */
  protected _setUnit(
    unit: DistanceUnit
  ): void {
    this.unitChanged.emit({
      oldValue: this.unit,
      newValue: unit
    });
    this.unit = unit;
    this._buffer();
  }

  /**
   * Create buffer geometry based on the user defined unit and distance
   *
   * @protected
   */
  protected _buffer(): void {
    if (!this.disabled) {
      if (this._bufferTimeout) {
        clearTimeout(this._bufferTimeout);
      }

      this._bufferTimeout = setTimeout(() => {
        if (this.geometries?.length > 0 && this.unit && this.distance > 0) {
          const geom = this.geometries[0];
          const sr = geom.spatialReference;
          const buffer = (sr.isWGS84 || sr.isWebMercator) ?
            this._geometryEngine.geodesicBuffer(
              this.geometries,
              this.distance,
              this.unit,
              this.unionResults
            ) : this._geometryEngine.buffer(
              this.geometries,
              this.distance,
              this.unit,
              this.unionResults
            );
          this.bufferComplete.emit(buffer);
        }
      }, 400);
    } else {
      this.bufferComplete.emit(undefined);
    }
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
          class="padding-end-1 w-50"
          max={this.max && this.max > 0 ? this.max : undefined}
          min={this.min}
          number-button-type="vertical"
          onCalciteInputInput={(evt) => this._setDistance(evt)}
          placeholder="0"
          type="number"
          value={this.distance ? this.distance.toString() : undefined}
        />
        <calcite-select
          class="flex-1 w-50"
          label="label"
          onCalciteSelectChange={() => this._setUnit(this._unitElement.value as DistanceUnit)}
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
          max={this.max && this.max > 0 ? this.max : undefined}
          min={this.min}
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

  /** Provides access to protected methods for unit testing.
  *
  *  @param methodName Name of protected method to run
  *  @param arg1 First argument to forward to method, e.g., for "_setDistance", `CustomEvent`
  *  @returns
  */
  public _testAccess(
    methodName: string,
    arg1?: any
  ): any {
    switch (methodName) {
      case "_setUnit":
        return this._setUnit(arg1);
      case "_setDistance":
        return this._setDistance(arg1);
    }
    return null;
  }
}
