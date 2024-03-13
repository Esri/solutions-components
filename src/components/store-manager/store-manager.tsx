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

/**
 * The json-editor component leverages a stencil/store to manage data.
 * If a component uses the json-editor but does not have logic to hydrate the store this component can be used.
 * It will create and hydrate the store based on the value provided.
 *
 * The value must be a string so it can be observed by the MutationObserver implemented below.
 * The observer does not notify when passing complex attributes as you can with stencil.
 *
 *
*/

import { Component, Element, Event, EventEmitter, Prop, VNode } from '@stencil/core';
import state from "../../utils/solution-store";
import { getFeatureServices, /*getModels,*/ getSpatialReferenceInfo } from '../../utils/templates';
import { ISolutionItemData, UserSession } from '@esri/solution-common';

@Component({
  tag: 'store-manager',
  shadow: false
})
export class StoreManager {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLStoreManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains source json as a string
   *
   */
  @Prop({ mutable: true, reflect: true }) value = "";

  /**
   * Templates for the current solution
   */
  @Prop({ mutable: true, reflect: true }) templates: any[] = [];

  /**
   * Credentials for requests
   */
  @Prop({ mutable: true }) authentication: UserSession;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this._initValueObserver();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (null);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() stateLoaded: EventEmitter<any>;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  protected _valueObserver;

  /**
   * Initialize the observer that will monitor and respond to changes in the value.
   * When we get a new value we are dealing with a new solution and need to fetch the item's data and load the state.
   */
  protected _initValueObserver(): void {
    const self = this;
    this._valueObserver = new MutationObserver(ml => {
      ml.some(mutation => {
        const newValue = mutation.target[mutation.attributeName];
        if (mutation.type === 'attributes' && mutation.attributeName === "value" &&
          newValue !== mutation.oldValue && newValue !== "") {
          const solutionData = JSON.parse(newValue) as ISolutionItemData;
          state.setStoreInfo("solutionData", solutionData);

          const services = getFeatureServices(solutionData.templates);
          state.setStoreInfo("featureServices", services);
          state.setStoreInfo("spatialReferenceInfo", getSpatialReferenceInfo(services, solutionData));

          //self.templates = solutionData;
          self.stateLoaded.emit(state);
          return true;
        }
      })
    });
    this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }
}
