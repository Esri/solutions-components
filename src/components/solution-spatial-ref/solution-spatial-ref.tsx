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

/**
* The wkid that will be used as the default when enableDefault is true.
*/
const cDefaultWkid = "3857";

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
  * Indicates if the control has been enabled.
  * The first time Spatial Reference has been enabled it should enable all feature services.
  */
  //???@Prop({ mutable: true, reflect: true }) loaded = false;

  /**
  * When true, all but the main switch are disabled to prevent interaction.
  */
  @Prop({ mutable: true, reflect: true }) enabled = false;

  @Watch("enabled")
  enabledChanged(): void {
    this._handleSpatialRefParamChange();
  }

  /**
  * When true, a default value is used for feature services.
  */
  @Prop({ mutable: true, reflect: true }) enableDefault = false;

  @Watch("enableDefault")
  enableDefaultChanged(): void {
    this._handleDefaultSpatialRefParamChange();
  }

  /**
  * List of services the spatial reference should apply to
  */
  @Prop({ mutable: true, reflect: true }) featureServices: IFeatureServiceEnabledStatus[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void> {
    this._updateUIFromStore();
    return this._getTranslations();
  }

  render(): VNode {
    this._updateUIFromStore();
    return (
      <Host>
        <label class="switch-label">
          <calcite-switch
            checked={this.enabled}
            class="spatial-ref-switch"
            onCalciteSwitchChange={ (event) => this.enabled = event.target.checked }
            scale="m"
           />
          {this._translations.enableSpatialReference}
        </label>
        <br />
        <div class="spatial-ref-component" id="spatialRefDefn">
          {this._renderFeatureServicesList(this.featureServices)}
        </div>
        <label class="switch-label spatial-ref-component">
          <calcite-switch
            checked={this.enableDefault}
            class="spatial-ref-switch"
            disabled={!this.enabled}
            onCalciteSwitchChange={ (event) => this.enableDefault = event.target.checked }
            scale="m"
           />
          {this._translations.enableDefaultSpatialReference}
        </label>
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

  @Event() enableDefaultSpatialReferenceChange: EventEmitter<{ defaultWkid: string }>;

  @Event() enabledSpatialReferenceChange: EventEmitter<{ enabled: boolean }>;

  @Listen("solutionStoreHasChanges", { target: "window" })
  solutionStoreHasChanges(): void {
    this.featureServices = state.getStoreInfo("featureServices");
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  /** Provides access to protected methods for unit testing.
   *
   *  @param methodName Name of protected method to run
   *  @param _arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
   *  @param _arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
   *  @param _arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
   *
   *  @returns
   */
  @Method()
  async _testAccess(
    methodName: string,
    _arg1?: any,
    _arg2?: any,
    _arg3?: any
  ): Promise<any> {
    switch (methodName) {
      case "_parameterizeWkid":
        return Promise.resolve(this._parameterizeWkid(_arg1));
      case "_unparameterizeWkid":
        return Promise.resolve(this._unparameterizeWkid(_arg1));
    }
    return Promise.resolve(null);
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Disable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  private _clearFeatureServiceDefaults(
    featureServices: IFeatureServiceEnabledStatus[]
  ): void {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node: any) => node.checked = false);
    featureServices.forEach(service => this._updateEnabledServices({detail: { switched: false }}, service));
  }

  /**
   * Toggles the enablement of the default spatial reference.
   */
  private _handleDefaultSpatialRefParamChange(): void {
    this._updateStore();

    this.enableDefaultSpatialReferenceChange.emit({
      defaultWkid: this.enableDefault ? cDefaultWkid : ""
    });
  };

  /**
   * Toggles the enablement of the spatial reference parameter.
   */
  private _handleSpatialRefParamChange(): void {
    // Update featureServices

    /*
    if (this.enabled) {
      if (!this.loaded) {
        // when this is switched on when loading we have reloaded a solution that
        // has a custom wkid param and we should honor the settings they already have in the templates
        // By default enable all Feature Services on enablement
        this.loaded = true;
        this._setFeatureServiceDefaults(this.featureServices);
      }

    } else {
    */  //???

    if (!this.enabled) {  //???
      // Disable the default spatial reference button
      this.enableDefault = false;

      // Disable all services when the spatial reference parameter is disabled
      this._clearFeatureServiceDefaults(this.featureServices);
    }

    this._updateStore();

    this.enabledSpatialReferenceChange.emit({
      enabled: this.enabled
    });
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
   * Create a switch control for each of the services
   *
   * @param services List of feature services
   * @returns a node to control each feature service
   */
  private _renderFeatureServicesList(featureServices: IFeatureServiceEnabledStatus[]): VNode {
    // verify they are in state
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    const configurableServices = featureServices.filter(service => {
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
   * Enable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  /*
  private _setFeatureServiceDefaults(
    featureServices: IFeatureServiceEnabledStatus[]
  ): void {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node: any) => node.checked = true);
    featureServices.forEach(service => this._updateEnabledServices({detail: { switched: true }}, service));
  }
  */  //???

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
    this._updateStore();

    // Report the change
    this.featureServiceSpatialReferenceChange.emit(service);
  }

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
    this.featureServices.forEach(service => {
      service.enabled = spatialReferenceInfo.services[service.id];

      // Update the feature service wkid
      service.wkid = service.enabled
        ? this._parameterizeWkid(service.wkid)
        : this._unparameterizeWkid(service.wkid);
    });

    state.setStoreInfo("featureServices", this.featureServices);
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
      spatialReferenceInfo.default = cDefaultWkid;
    } else if (spatialReferenceInfo.hasOwnProperty("default")) {
      delete spatialReferenceInfo.default;
    }
    state.setStoreInfo("spatialReferenceInfo", spatialReferenceInfo);

    // Update featureServices
    this._updateFeatureServices(spatialReferenceInfo);
  }

  private _updateUIFromStore(
  ): void {
    const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
    this.enabled = spatialReferenceInfo.enabled;
    this.enableDefault = !!spatialReferenceInfo.default;

    this.featureServices = state.getStoreInfo("featureServices");

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
