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

import { Component, Element, Host, h, Method, Prop, VNode } from '@stencil/core';

@Component({
  tag: 'check-list',
  styleUrl: 'check-list.css',
  shadow: true,
})
export class CheckList {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCheckListElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: All checkboxes checked state will be set with this value on first render.
   * Default is true
   */
  @Prop({ reflect: true }) defaultChecked = true;

  /**
   * string []: The values to render beside the checkboxes
   */
  @Prop() values: string[];

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

  /**
   * A list of all checkbox elements for this component
   *
   * @protected
   */
  protected _elements: HTMLCalciteCheckboxElement[] = [];

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

  /**
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  @Method()
  async getConfigInfo(): Promise<{ [key: string]: boolean }> {
    return this._elements.reduce((prev, cur) => {
      prev[cur.value] = cur.checked;
      return prev;
    }, {});
  }

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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad(): Promise<void> {
    if (this.defaultChecked) {
      this._elements.forEach(el => {
        el.checked = true;
      });
    }
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div>
          {this._renderCheckboxes(this.values)}
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
   * Render a checkbox with a label for each of the types listed in the NLS
   *
   * @returns Array of label/checkbox input nodes
   * @protected
   */
  protected _renderCheckboxes(
    values: string[]
  ): VNode[] {
    return values.map(v => {
      return (
        <calcite-label layout="inline">
          <calcite-checkbox ref={(el) => this._elements.push(el)} value={v} />
          {v}
        </calcite-label>
      );
    })
  }
}
