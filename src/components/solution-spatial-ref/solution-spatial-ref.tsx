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

import { Component, Element, h, Host, Listen, Method, Prop, State, Watch, VNode } from '@stencil/core';
import '@esri/calcite-components';
import { IWkidDescription, wkids } from './spatialreferences';
import state from '../../utils/editStore';

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

  @Element() el: HTMLSolutionSpatialRefElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  // /**
  //  * When true, all but the main switch are disabled to prevent interaction.
  //  */
  @Prop({ mutable: true, reflect: true }) locked: boolean = true;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: string = null;
  @Watch("value") valueChanged(newValue: string): void {
    this.spatialRef = this._createSpatialRefDisplay(newValue);
  }

  /**
  * List of service names the spatial reference should apply to
  */
  @Prop({ mutable: true, reflect: true }) services: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    this.spatialRef = this._createSpatialRefDisplay(this.value);
    this.locked = true;
  }

  componentWillRender(): void {
    if (this.serviceDisplay === undefined && state.spatialReferenceInfo["services"]) {
      this.serviceDisplay = state.spatialReferenceInfo["services"];
    }
  }

  render(): VNode {
    return (
      <Host>
        <label class="switch-label">
          <calcite-switch 
            switched={!this.locked} 
            scale="m" 
            class="spatial-ref-switch" 
            onCalciteSwitchChange={(event) => this._updateLocked(event)}
          ></calcite-switch>
          {this.translations.specifyParam}
        </label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>
            {this.translations.defaultSpatialRef}
            <label class="spatial-ref-default">
              <calcite-input 
                disabled={this.locked}
                ref={(el) => { this.spatialRefInput = el}} 
                onCalciteInputBlur={() => this._updateSpatialRef()}
              ></calcite-input>
            </label>
          </calcite-label>
          <label class="spatial-ref-current">{this.spatialRef.display}</label>
          {this._getFeatureServices()}
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
   * Internal representation of component's value for display purposes.
   */
  @State() private spatialRef: ISpatialRefRepresentation;

  @State() private serviceDisplay: any = undefined;

  /**
   * Handle to the spatial reference input box.
   */
  private spatialRefInput: HTMLCalciteInputElement;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("spatialReferenceChanged", { target: 'window' })
  _spatialReferenceChanged(): void {
    this._updateEditModels();
  }

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
  private _createSpatialRefDisplay(value: string): ISpatialRefRepresentation {
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
  private _updateLocked(event): void {
    this.locked = !event.detail.switched;
    this._updateStore();
  };

  /**
   * Updates the spatial reference value and display using the current value of the spatial reference input field.
   */
  private _updateSpatialRef(): void {
    this.value = this.spatialRefInput.value.toString();
    this.spatialRef = this._createSpatialRefDisplay(this.spatialRefInput.value);
  }

  /**
   * Converts a WKID into a spatial reference description.
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  private _wkidToDisplay(wkid: number): string {
    const description: IWkidDescription = wkids[wkid];
    if (description) {
      return description.label + " (" + wkid.toString() + ")";
    } else {
      return "WKID " + wkid.toString();
    }
  }

  private _getFeatureServices(): VNode {
    return this.services && this.services.length > 0 ? (
      <div>
        <label class="spatial-ref-item-title">{this.translations.featureServicesHeading}</label>
        {this.services.map(name => (
          <label class="switch-label">
            <calcite-switch
              disabled={this.locked}
              scale="m" 
              switched={this.serviceDisplay[name]}
              class="spatial-ref-item-switch"
              onCalciteSwitchChange={(event) => this._updateEnabledServices(event, name)}
            ></calcite-switch>{name}
          </label>
        ))}
      </div>
    ) : (null);
  }

  private _updateStore(): void {
    state.spatialReferenceInfo["enabled"] = !this.locked;
    state.spatialReferenceInfo["spatialReference"] = this.spatialRef;
    this._updateEditModels();
  }

  private _updateEnabledServices(event, name): void {
    state.spatialReferenceInfo["services"][name] = event.detail.switched;
    this._updateEditModels();
  }

  private _updateEditModels(): void {
    if (state.models) {
      Object.keys(state.models).forEach(k => {
        const updateModel = state.models[k].propsModel.getValue();
        // need to update the propsModel
        if (updateModel) {
          const data = this._updateData(updateModel, k);
          state.models[k].propsModel.setValue(JSON.stringify(data, null, '\t'));

          const data2 = this._updateData(state.models[k].propsDiffOriginValue, k);
          state.models[k].propsDiffOriginValue = JSON.stringify(data2);
        }
      });
    }
  }

  private _updateData(updateModel, k): any {
    const srInfo: any = state.spatialReferenceInfo;
    const mName: string = state.models[k].name;
    const data = typeof (updateModel) === "string" ? JSON.parse(updateModel) : updateModel;

    if (Object.keys(srInfo.services).indexOf(mName) > -1 && srInfo.enabled && srInfo.services[mName]) {
      const wkid = state.models[k].spatialReference.wkid;
      if (wkid) {
        data.service.spatialReference.wkid = `{{params.wkid||${wkid}}}`;
        if (data.service.spatialReference.latestWkid) {
          delete (data.service.spatialReference.latestWkid);
        }
      }
    } else if (data.service?.spatialReference) {
      // This needs to have a better check...
      data.service.spatialReference = state.models[k].spatialReference;
    }
    
    return data;
  }
}
