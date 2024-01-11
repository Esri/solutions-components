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

import '@esri/calcite-components';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
import state from "../../utils/solution-store";
import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, VNode, Watch } from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
import { nodeListToArray } from '../../utils/common';

@Component({
  tag: 'solution-spatial-ref',
  styleUrl: 'solution-spatial-ref.scss',
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

  /**
  * The wkid that will be used as the default when no user selection has been made.
  */
  @Prop({ mutable: true, reflect: true }) defaultWkid = 102100;

  /**
  * Indicates if the control has been enabled.
  * The first time Spatial Reference has been enabled it should enable all feature services.
  */
  @State() loaded = false;

  /**
  * When true, all but the main switch are disabled to prevent interaction.
  */
  @Prop({ mutable: true, reflect: true }) locked = true;

  @Watch("locked")
  lockedChanged(newLocked: boolean): void {
    if (!newLocked) {
      // By default enable all Feature Services on first load
      this._setFeatureServiceDefaults(this.services);
    }

    this.lockedSpatialReferenceChange.emit({
      locked: newLocked
    });
  }

  /**
  * List of service names the spatial reference should apply to
  */
  @Prop({ mutable: true, reflect: true }) services: string[] = [];

  /**
   * Contains the public value for this component, which is a wkid or a wkt.
   */
  @Prop({ mutable: true, reflect: true }) value: string = this.defaultWkid.toString();

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="spatial-ref">
          <div class="spatial-ref-desc">
            <calcite-label>{this._translations.paramDescription}</calcite-label>
          </div>
          <label class="switch-label">
            <calcite-switch
              checked={!this.locked}
              class="spatial-ref-switch"
              onCalciteSwitchChange={(event) => this._updateLocked(event)}
              scale="m"
            />
            {this._translations.specifyParam}
          </label>
          <div class="spatial-ref-component" id="spatialRefDefn">
            <calcite-label>
              {this._translations.spatialReferenceInfo}
              <label class="spatial-ref-default">
                <spatial-ref defaultWkid={this.defaultWkid} disabled={this.locked} value={this.value}/>
              </label>
            </calcite-label>
            {this._getFeatureServices(this.services)}
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Current text that is being used to filter the list of spatial references.
   */
  @State() protected _srSearchText: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionSpatialRef_T9n;

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

  @Event() featureServiceSpatialReferenceChange: EventEmitter<{ name: string, enabled: boolean }>;

  @Event() lockedSpatialReferenceChange: EventEmitter<{ locked: boolean }>;

  /**
   * Saves changes to the embedded spatial reference value
   */
  @Listen("spatialReferenceChange", { target: "window" })
  spatialReferenceChange(event: CustomEvent): void {
    this.value = event.detail.newValue;
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Toggles the ability to set the default spatial reference.
   */
  protected _updateLocked(event: any): void {
    this.locked = !event.target.checked;
    this._updateStore();
    if (!this.loaded) {
      // when this is switched on when loading we have reloaded a solution that
      // has a custom wkid param and we should honor the settings they already have in the templates
      if (event.target.checked) {
        // By default enable all Feature Services on first load
        this._setFeatureServiceDefaults(this.services);
      }
      this.loaded = true;
    }
  };

  /**
   * Enable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  protected _setFeatureServiceDefaults(
    services: string[]
  ): void {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node: any) => node.checked = true);
    services.forEach(name => this._updateEnabledServices({ detail: { switched: true } }, name));
  }

  /**
   * Create a switch control for each of the services
   *
   * @param services List of feature services
   * @returns a node to control each feature service
   */
  protected _getFeatureServices(services: string[]): VNode {
    // verify they are in state
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    const _services = services.filter(s => {
      return Object.keys(spatialReferenceInfo.services).some(stateService => stateService === s)
    });
    return _services && _services.length > 0 ? (
      <div>
        <label class="spatial-ref-item-title">{this._translations.featureServicesHeading}</label>
        {_services.map(name => (
          <label class="switch-label">
            <calcite-switch
              checked={spatialReferenceInfo.services[name]}
              class="spatial-ref-item-switch"
              disabled={this.locked}
              onCalciteSwitchChange={(event) => this._updateEnabledServices(event, name)}
              scale="m"
            />{name}
          </label>
        ))}
      </div>
    ) : (null);
  }

  /**
   * Updates the enabled and spatialReference prop in spatialReferenceInfo.
   */
  protected _updateStore(): void {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.enabled = !this.locked;
    spatialReferenceInfo.spatialReference = this.value;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
  }

  /**
   * Updates the enabled/disabled state of the service in spatialReferenceInfo.
   */
  protected _updateEnabledServices(event: any, name: string): void {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.services[name] = event.target.checked;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);

    this.featureServiceSpatialReferenceChange.emit({
      name,
      enabled: event.target.checked
    });
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionSpatialRef_T9n;
  }
}
