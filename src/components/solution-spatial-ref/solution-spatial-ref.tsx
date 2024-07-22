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

import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch, VNode } from '@stencil/core';
import '@esri/calcite-components';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from '../../utils/locale';
import { nodeListToArray } from '../../utils/common';
import {
  CSpatialRefCustomizingPrefix,
  CSpatialRefCustomizingSuffix,
  IFeatureServiceEnabledStatus,
} from '../../utils/interfaces';

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
  @Prop({ mutable: true, reflect: true }) enabled = false;

  @Watch("enabled")
  enabledChanged(newEnabled: boolean): void {
    this.enabledSpatialReferenceChange.emit({
      enabled: newEnabled
    });
  }

  /**
  * When true, all but the main switch are disabled to prevent interaction.
  */
  @Prop({ mutable: true, reflect: true }) enableDefault = false;

  @Watch("enableDefault")
  enableDefaultChanged(newEnableDefault: boolean): void {
    this.enableDefaultSpatialReferenceChange.emit({
      enableDefault: newEnableDefault
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
    this._updateStore();
    return this._getTranslations();
  }

  render(): VNode {
    return (
      <Host>
        <label class="switch-label">
          <calcite-switch
            checked={this.enabled}
            class="spatial-ref-switch"
            onCalciteSwitchChange={(event) => this._enableSpatialRefParam(event)}
            scale="m"
           />
          {this._translations.enableSpatialReference}
        </label>
        <br /><br />
        <label class="switch-label spatial-ref-component">
          <calcite-switch
            checked={this.enableDefault}
            class="spatial-ref-switch"
            disabled={!this.enabled}
            onCalciteSwitchChange={(event) => this._enableDefaultSpatialRefParam(event)}
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

  @Event() featureServiceSpatialReferenceChange: EventEmitter<IFeatureServiceEnabledStatus>;

  @Event() enableDefaultSpatialReferenceChange: EventEmitter<{ enableDefault: boolean }>;

  @Event() enabledSpatialReferenceChange: EventEmitter<{ enabled: boolean }>;

  @Listen("solutionStoreHasChanges", { target: "window" })
  solutionStoreHasChanges(): void {
    this.services = state.getStoreInfo("featureServices");
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  /** Provides access to protected methods for unit testing.
   *
   *  @param methodName Name of protected method to run
   *  @param arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
   *  @param arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
   *  @param arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
   *
   *  @returns
   */
  @Method()
  async _testAccess(
    methodName: string,
    arg1?: any,
    arg2?: any,
    arg3?: any
  ): Promise<any> {
    switch (methodName) {
      case "_parameterizeWkid":
        return Promise.resolve(this._parameterizeWkid(arg1));
      case "_unparameterizeWkid":
        return Promise.resolve(this._unparameterizeWkid(arg1));
    }
    return Promise.resolve(null);
  }

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
                  disabled={!this.enabled}
                  onCalciteSwitchChange={(event) => this._updateEnabledServices(event, configurableService)}
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
   * Disable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  private _clearFeatureServiceDefaults(
    services: IFeatureServiceEnabledStatus[]
  ): void {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node: any) => node.checked = false);
    services.forEach(service => this._updateEnabledServices({detail: { switched: false }}, service));
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
    services.forEach(service => this._updateEnabledServices({detail: { switched: true }}, service));
  }

  /**
   * Updates the enabled/disabled state of the service in spatialReferenceInfo.
   *
   * @param event The event that triggered the change
   * @param service The service to update
   */
  private _updateEnabledServices(
    event,
    service: IFeatureServiceEnabledStatus
  ): void {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    const enabled = event.detail?.switched !== undefined // internal event
      ? event.detail.switched
      : event.target?.checked !== undefined // calcite event
        ? event.target.checked
        : true;
    spatialReferenceInfo.services[service.id] = enabled;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);

    // Update featureServices
    this._updateFeatureServices(spatialReferenceInfo);

    // Report the change
    this.featureServiceSpatialReferenceChange.emit(service);
  }

  /**
   * Updates the enabled/disabled state of the services in the featureServices part of the store.
   *
   * @param spatialReferenceInfo The spatial reference information
   */
  private _updateFeatureServices(
    spatialReferenceInfo: any
  ): void {
    // If the spatial reference parameter is disabled, disable all services
    if (!spatialReferenceInfo.enabled) {
      Object.keys(spatialReferenceInfo.services).forEach(serviceId => {
        spatialReferenceInfo.services[serviceId] = false;
      });
    }

    // Copy the enabled state to the feature services
    const featureServices: IFeatureServiceEnabledStatus[] = state.getStoreInfo("featureServices");
    featureServices.forEach(service => {
      service.enabled = spatialReferenceInfo.services[service.id];

      // Update the feature service wkids
      if (spatialReferenceInfo.enabled) {
        service.wkid = service.enabled
          ? this._parameterizeWkid(service.wkid)
          : this._unparameterizeWkid(service.wkid);
      } else {
        service.wkid = this._unparameterizeWkid(service.wkid);
      }
    });

    state.setStoreInfo("featureServices", featureServices);
  }

  /**
   * Toggles the enablement of the default spatial reference.
   */
  private _enableDefaultSpatialRefParam(event): void {
    this.enableDefault = event.target.checked;
    this._updateStore();
  };

  /**
   * Toggles the enablement of the spatial reference parameter.
   */
  private _enableSpatialRefParam(event): void {
    this.enabled = event.target.checked;

    // Update spatialReferenceInfo
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.enabled = this.enabled;
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);

    // Update featureServices
    if (this.enabled) {
      if (!this.loaded) {
        // when this is switched on when loading we have reloaded a solution that
        // has a custom wkid param and we should honor the settings they already have in the templates
        // By default enable all Feature Services on enablement
        this.loaded = true;
        this._setFeatureServiceDefaults(this.services);
      }

   } else {
      // Disable the default spatial reference button
      this.enableDefault = false;

      // Disable all services when the spatial reference parameter is disabled
      this._clearFeatureServiceDefaults(this.services);
    }

    this._updateStore();
  };

  /**
   * Converts a wkid into a parameterized form for storage in the solution item data.
   *
   * @param wkid Wkid to parameterize; unchanged if already parameterized
   * @returns Parameterized wkid
   */
  private _parameterizeWkid(
    wkid: string
  ): string {
    return wkid
      ? wkid.toString().startsWith(CSpatialRefCustomizingPrefix)
        ? wkid
        : `${CSpatialRefCustomizingPrefix}${wkid}${CSpatialRefCustomizingSuffix}`
      : wkid;
  };

  /**
   * Converts a parameterized wkid into a standard form for use in the solution item data.
   *
   * @param wkid Wkid to unparameterize; unchanged if not parameterized
   * @returns Unparameterized wkid
   */
  private _unparameterizeWkid(
    wkid: string
  ): string {
    return wkid && wkid.toString().startsWith(CSpatialRefCustomizingPrefix)
      ? wkid.substring(CSpatialRefCustomizingPrefix.length, wkid.length - CSpatialRefCustomizingSuffix.length)
      : wkid

  }

  /**
   * Updates the enabled and spatialReference prop in spatialReferenceInfo.
   */
  private _updateStore(
  ): void {
    // Update spatialReferenceInfo
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    spatialReferenceInfo.enabled = this.enabled;
    if (this.enabled && this.enableDefault) {
      spatialReferenceInfo.default = this.defaultWkid;
    } else if (spatialReferenceInfo.hasOwnProperty("default")) {
      delete spatialReferenceInfo.default;
    }
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);

    // Update featureServices
    this._updateFeatureServices(spatialReferenceInfo);
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
