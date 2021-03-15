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

import { Component, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';

export interface IOrganizationVariableItem {
  id: string;
  title: string;
  value: string;
}

@Component({
  tag: 'solution-organization-variables',
  styleUrl: 'solution-organization-variables.css',
  shadow: true,
})

export class SolutionOrganizationVariables {


  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: IOrganizationVariableItem[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div>
          <h4 class="org-var-header">{this.translations.variables.orgVariables}</h4>
        </div>
        <div class="container-border">
          <calcite-label id="variable-label">
            {this.renderHierarchy(this.value)}
          </calcite-label>
        </div>
      </Host>
    );
  }

  renderHierarchy(
    objs: IOrganizationVariableItem[]
  ): VNode[] {
    const hierarchy = objs.map(obj => {
      return (
        <calcite-tree-item onClick={() => this._treeItemSelected(obj.id, obj.value)}>
          {obj.title}
        </calcite-tree-item>
      );
    });
    return hierarchy;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

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

  @Event() organizationVariableSelected: EventEmitter;

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
   * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param itemId Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  private _treeItemSelected(
    itemId: string,
    value: string
  ): void {
    this.organizationVariableSelected.emit({
      itemId,
      value
    });
  }

}
