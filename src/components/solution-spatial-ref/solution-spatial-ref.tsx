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

import { Component, Element, h, Host, Method, Prop, State, Watch, VNode } from '@stencil/core';
import "@esri/calcite-components";
import { IWkidDescription, wkids } from "./spatialreferences";

export interface ISpatialRefRepresentation {
  display: string;
  usingWkid: boolean;
  wkid: number;
  wkt: string;
}

@Component({
  tag: 'solution-spatial-ref',
  styleUrl: 'solution-spatial-ref.css',
  shadow: false
})
export class SolutionSpatialRef {

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
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {
    "specifyParam": "Spatial Reference Parameter",
    "defaultSpatialRef": "Default Spatial Reference",
    "featureServicesHeading": "Feature Services"
  };

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: string = null;
  @Watch("value") valueChanged(newValue: string): void {
    this.spatialRef = this._createSpatialRefDisplay(newValue);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    this.spatialRef = this._createSpatialRefDisplay(this.value);

    // TODO
    //this.locked = this.value === null;
    this.locked = false; // can't start with `true` because of https://github.com/Esri/calcite-components/issues/1575
  }

  render(): VNode {
    return (
      <Host>
        <label class="switch-label"><calcite-switch switched={!this.locked} scale="s" class="spatial-ref-switch" onCalciteSwitchChange={(event) => this._updateLocked(event)}></calcite-switch>{this.translations.specifyParam}</label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>{this.translations.defaultSpatialRef}<label class="spatial-ref-default"><calcite-input disabled={this.locked} ref={(el) => { this.spatialRefInput = el}} onCalciteInputBlur={() => this._updateSpatialRef()}></calcite-input></label></calcite-label>
          <label class="spatial-ref-current">{this.spatialRef.display}</label>
          <label class="spatial-ref-item-title">{this.translations.featureServicesHeading}</label>
          <label class="switch-label"><calcite-switch disabled={this.locked} scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 1</label>
          <label class="switch-label"><calcite-switch disabled={this.locked} scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 2</label>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  /**
   * When true, all but the main switch are disabled to prevent interaction.
   */
  @State() private locked: boolean;

  /**
   * Internal representation of component's value for display purposes.
   */
  @State() private spatialRef: ISpatialRefRepresentation;

  /**
   * Handle to the spatial reference input box.
   */
  private spatialRefInput: HTMLCalciteInputElement;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  /**
   * Returns the spatial reference description of the supplied value.
   * (Exposes private method `_createSpatialRefDisplay` for testing.)
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  @Method()
  createSpatialRefDisplay(value: string): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this._createSpatialRefDisplay(value));
  }

  /**
   * Returns the current spatial reference description.
   * (Exposes private variable `spatialRef` for testing.)
   */
  @Method()
  getSpatialRef(): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this.spatialRef);
  }

  /**
   * Converts a WKID into a spatial reference description.
   * (Exposes private method `_wkidToDisplay` for testing.)
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  @Method()
  wkidToDisplay(wkid: number): Promise<string> {
    return Promise.resolve(this._wkidToDisplay(wkid));
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Returns the spatial reference description of the supplied value.
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  _createSpatialRefDisplay(value: string): ISpatialRefRepresentation {
    let spatialRef: ISpatialRefRepresentation;

    if (!value) {
      spatialRef = {
        display: this._wkidToDisplay(102100),
        usingWkid: true,
        wkid: 102100,
        wkt: ""
      }
    } else {
      const wkid = Number.parseInt(value);
      if (isNaN(wkid)) {
        spatialRef = {
          display: value,
          usingWkid: false,
          wkid: 0,
          wkt: value
        }
      } else {
        spatialRef = {
          display: this._wkidToDisplay(wkid),
          usingWkid: true,
          wkid: wkid,
          wkt: ""
        }
      }
    }

    return spatialRef;
  }

  /**
   * Toggles the ability to set the default spatial reference.
   */
  _updateLocked(event): void {
    this.locked = !event.detail.switched;
  };

  /**
   * Updates the spatial reference value and display using the current value of the spatial reference input field.
   */
  _updateSpatialRef(): void {
    this.value = this.spatialRefInput.value.toString();
    this.spatialRef = this._createSpatialRefDisplay(this.spatialRefInput.value);
  }

  /**
   * Converts a WKID into a spatial reference description.
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  _wkidToDisplay(wkid: number): string {
    const description: IWkidDescription = wkids[wkid];
    if (description) {
      return description.label + " (" + wkid.toString() + ")";
    } else {
      return "WKID " + wkid.toString();
    }
  }

}