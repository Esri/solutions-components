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

import { Component, Element, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "crowdsource-reporter",
  styleUrl: "crowdsource-reporter.css",
  shadow: true,
})
export class CrowdsourceReporter {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCrowdsourceReporterElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: The text that will display under the title on the landing page
   */
  @Prop() description: string;

  /**
   * string: The text that will display at the top of the landing page
   */
  @Prop() title: string;

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * string: landing page image
   */
  @Prop() image: string;

  /**
   * string[]: list of layer ids
   */
  @Prop() layers: string[];

  // TODO think about how we will handle related table comment field

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

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
  // async componentWillLoad(): Promise<void> {
  //   await this._getTranslations();
  //   await this._initModules();
  // }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <slot>
          {this.title + this.description}
        </slot>
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
  // protected async _initModules(): Promise<void> {
  //   const [geometryEngine, jsonUtils]: [
  //     __esri.geometryEngine,
  //     __esri.symbolsSupportJsonUtils
  //   ] = await loadModules([
  //     "esri/geometry/geometryEngine",
  //     "esri/symbols/support/jsonUtils"
  //   ]);
  //   this._geometryEngine = geometryEngine;
  //   this._jsonUtils = jsonUtils;
  // }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    // const messages = await getLocaleComponentStrings(this.el);
    // this._translations = messages[0] as typeof BufferTools_T9n;
  }

}
