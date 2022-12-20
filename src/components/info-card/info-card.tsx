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

import { Component, Element, Host, h, Prop, VNode } from '@stencil/core';
import { IInfoCardValues } from '../../utils/interfaces';

@Component({
  tag: 'info-card',
  styleUrl: 'info-card.css',
  shadow: true,
})
export class InfoCard {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLInfoCardElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: the components title
   */
  @Prop() cardTitle = "";

  /**
   * IInfoCardValues: key value pairs to show in the components table
   */
  @Prop() values: IInfoCardValues = {};

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
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div>
          <div class="bottom-border">
            <calcite-label >{this.cardTitle}</calcite-label>
          </div>
          <div class="padding-top-1-2">
            <table>
              <tbody>
                {this._getRows()}
              </tbody>
            </table>
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Render the user defined values as table rows
   *
   * @returns array of row nodes
   * @protected
   */
  protected _getRows(): VNode[] {
    return Object.keys(this.values).map(k => {
      return (
        <tr>
          <td>
            <calcite-label>
              <span class="font-color-3">{k}</span>
            </calcite-label>
          </td>
          <td>
            <calcite-label>
              <span>{this.values[k]}</span>
            </calcite-label>
          </td>
        </tr>
      );
    })
  }
}
