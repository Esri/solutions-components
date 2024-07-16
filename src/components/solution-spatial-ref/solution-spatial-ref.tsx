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

import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch, VNode } from '@stencil/core';
import '@esri/calcite-components';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from '../../utils/locale';
import { nodeListToArray } from '../../utils/common';

/**
 * Feature service name and whether the service is enabled for SR configuration
 */
interface IFeatureServiceEnabledStatus {
  id: string;
  name: string;
  enabled: boolean;
}

interface IFeatureServiceSpatialReferenceChange {
  id: string;
  name: string;
  enabled: boolean;
}

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
  @Prop({ mutable: true, reflect: true }) defaultWkid = 3857;

  /**
  * Indicates if the control has been enabled.
  * The first time Spatial Reference has been enabled it should enable all feature services.
  */
   @Prop({ mutable: true, reflect: true }) loaded = false;

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
  * List of services the spatial reference should apply to
  */
  @Prop({ mutable: true, reflect: true }) services: IFeatureServiceEnabledStatus[] = [];

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

  render(): VNode {
    return (
      <Host>
        <label class="switch-label">
          <calcite-switch
            checked={!this.locked}
            class="spatial-ref-switch"
            onCalciteSwitchChange={(event) => this._updateLocked(event)}
            scale="m"
           />
          {this._translations.enableDefaultSpatialReference}
        </label>
        <div class="spatial-ref-component" id="spatialRefDefn">
          {this._renderFeatureServicesList(this.services)}
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

  @Event() featureServiceSpatialReferenceChange: EventEmitter<IFeatureServiceSpatialReferenceChange>;

  @Event() lockedSpatialReferenceChange: EventEmitter<{ locked: boolean }>;

  @Listen("solutionStoreHasChanges", { target: "window" })
  solutionStoreHasChanges(): void {
    this.services = state.getStoreInfo("featureServices");
  }

  /**
   * Saves changes to the embedded spatial reference value
   */
  @Listen("spatialReferenceChange", { target: "window" })
  spatialReferenceChange(event: CustomEvent): void {
    this.value = event.detail.newValue;
    state.setStoreInfo("defaultWkid", event.detail.newValue);

    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.spatialReference = event.detail.newValue;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
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
   * Create a switch control for each of the services
   *
   * @param services List of feature services
   * @returns a node to control each feature service
   */
  private _renderFeatureServicesList(services: IFeatureServiceEnabledStatus[]): VNode {
    // verify they are in state
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    const configurableServices = services.filter(service => {
      return Object.keys(spatialReferenceInfo.services).some(srefServiceId => srefServiceId === service.id)
    });
    return configurableServices.length > 0 ? (
      <div>
        <label class="spatial-ref-item-title">{this._translations.featureServicesHeading}</label>
        <ul class="spatial-ref-services-list">
          {configurableServices.map(configurableService => (
            <li class="spatial-ref-services-list-item">
              <label class="switch-label">
                <calcite-switch
                  checked={spatialReferenceInfo.services[configurableService.id]}
                  class="spatial-ref-item-switch"
                  disabled={this.locked}
                  onCalciteSwitchChange={(event) => this._updateEnabledServices(event, configurableService.id, configurableService.name)}
                  scale="m"
                />{configurableService.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    ) : (null);
  }

  /**
   * Enable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  private _setFeatureServiceDefaults(
    services: IFeatureServiceEnabledStatus[]
  ): void {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node: any) => node.checked = true);
    services.forEach(service => this._updateEnabledServices({detail: { switched: true }}, service.id, service.name));
  }

  /**
   * Updates the enabled/disabled state of the service in spatialReferenceInfo.
   */
  private _updateEnabledServices(event, id, name): void {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    const enabled = event.detail?.switched !== undefined // internal event
      ? event.detail.switched
      : event.target?.checked !== undefined // calcite event
        ? event.target.checked
        : true;
    spatialReferenceInfo.services[id] = enabled;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);

    this.featureServiceSpatialReferenceChange.emit({
      id,
      name,
      enabled
    });
  }

  /**
   * Toggles the ability to set the default spatial reference.
   */
  private _updateLocked(event): void {
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
   * Updates the enabled and spatialReference prop in spatialReferenceInfo.
   */
  private _updateStore(): void {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.enabled = !this.locked;
    spatialReferenceInfo.spatialReference = this.value;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);
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
