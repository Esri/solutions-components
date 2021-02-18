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

import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";
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

  @Prop({ mutable: true }) translations: any = {
    "specifyParam": "Spatial Reference Parameter",
    "defaultSpatialRef": "Default Spatial Reference",
    "featureServicesHeading": "Feature Services"
  };

  @Prop({ mutable: true }) value: string = null;
  @Watch("value") valueHandler(a): void {
    console.log("valuehandler a", a);
    console.log("value", this.value);
    this.spatialRef = this._createSpatialRefDisplay(this.value);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    this.spatialRef = this._createSpatialRefDisplay(this.value);
  }

  render() {
    return (
      <Host>
        <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-switch"></calcite-switch>{this.translations.specifyParam}</label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>{this.translations.defaultSpatialRef}<label id="item-description-label" class="spatial-ref-default"><calcite-input id="item-description"></calcite-input></label></calcite-label>
          <label class="spatial-ref-current">{this.spatialRef.display}</label>
          <label class="spatial-ref-item-title">{this.translations.featureServicesHeading}</label>
          <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 1</label>
          <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 2</label>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  @State() private spatialRef: ISpatialRefRepresentation;

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
   * Exposes private method `_createSpatialRefDisplay` for testing.
   */
  @Method()
  createSpatialRefDisplay(value: string): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this._createSpatialRefDisplay(value));
  }

  /**
   * Exposes private variable `spatialRef` for testing.
   */
  @Method()
  getSpatialRef(): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this.spatialRef);
  }

  /**
   * Exposes private method `_wkidToDisplay` for testing.
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
   *  Returns the spatial reference description of the supplied value.
   *
   * @param value WKID or WKT or null for default
   * @return If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
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
   * Converts a WKID into a spatial reference description.
   *
   * @param wkid WKID to look up
   * @return Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
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