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
/// <reference types="node" />
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import BufferTools_T9n from "../../assets/t9n/buffer-tools/resources.json";
import { DistanceUnit, IValueChange } from "../../utils/interfaces";
export declare class BufferTools {
  el: HTMLBufferToolsElement;
  /**
   * string: The appearance of display. Can be a "slider" or "text" inputs for distance/value
   */
  appearance: "slider" | "text";
  /**
   * number: The distance used for buffer
   */
  distance: number;
  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  geometries: __esri.Geometry[];
  /**
   * number: The component's maximum selectable value.
   */
  sliderMax: number;
  /**
   * number: The component's minimum selectable value.
   */
  sliderMin: number;
  /**
   * number: Displays tick marks on the number line at a specified interval.
   */
  sliderTicks: number;
  /**
   * boolean: option to control if buffer results should be unioned
   */
  unionResults: boolean;
  /**
   * DistanceUnit: "feet"|"meters"|"miles"|"kilometers"
   */
  unit: DistanceUnit;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof BufferTools_T9n;
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
  /**
   * Called each time the geometries prop is changed.
   * Buffer each of the geometries.
   *
   */
  geometriesWatchHandler(v: any, oldV: any): void;
  /**
   * Emitted on demand when a buffer is generated.
   */
  bufferComplete: EventEmitter<__esri.Polygon | __esri.Polygon[]>;
  /**
   * Emitted on demand when the distance value changes
   */
  distanceChanged: EventEmitter<IValueChange>;
  /**
   * Emitted on demand when the unit changes
   */
  unitChanged: EventEmitter<IValueChange>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
  /**
   * Gets the nodes for each of the possible distance units
   *
   * @returns An array of option nodes
   *
   * @protected
   */
  protected _getUnits(): VNode[];
  /**
   * Store the user defined distance value and create a buffer
   *
   * @param event the event from the calcite input control
   *
   * @protected
   */
  protected _setDistance(event: CustomEvent): void;
  /**
   * Store the user defined unit value and create a buffer
   *
   * @protected
   */
  protected _setUnit(unit: DistanceUnit): void;
  /**
   * Create buffer geometry based on the user defined unit and distance
   *
   * @protected
   */
  protected _buffer(): void;
  /**
   * Render distance and unit as calcite input and select controls
   * This option will be used when the "appearance" prop is set to "text"
   *
   * @returns a node with the supporting controls
   *
   * @protected
   */
  protected _getTextBoxDisplay(): VNode;
  /**
   * Render distance control as a slider
   * This option will be used when the "appearance" prop is set to "slider"
   *
   * @returns a node with the supporting control
   *
   * @protected
   */
  protected _getSliderDisplay(): VNode;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
  /** Provides access to protected methods for unit testing.
  *
  *  @param methodName Name of protected method to run
  *  @param arg1 First argument to forward to method, e.g., for "_setDistance", `CustomEvent`
  *  @returns
  */
  _testAccess(methodName: string, arg1?: any): any;
}
