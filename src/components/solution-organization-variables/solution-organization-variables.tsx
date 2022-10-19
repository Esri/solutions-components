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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import { IOrganizationVariableItem } from '../../utils/interfaces';
import SolutionOrganizationVariables_T9n from '../../assets/t9n/solution-organization-variables/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-organization-variables',
  styleUrl: 'solution-organization-variables.scss',
  shadow: true,
})

export class SolutionOrganizationVariables {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionOrganizationVariablesElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value = "";

  @Watch("value") valueWatchHandler(): void {
    this._organizationVariables = JSON.parse(this.value);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div>
          <h4 class="org-var-header">{this._translations.orgVariables}</h4>
        </div>
        <div class="container-border">
          <calcite-tree id="variable-label">
            {this._renderHierarchy(this._organizationVariables)}
          </calcite-tree>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  @State() protected _organizationVariables: IOrganizationVariableItem[] = [];

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionOrganizationVariables_T9n;

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

  @Event() organizationVariableSelected: EventEmitter<{ itemId: string, value: string }>;

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
   * Renders the organization based variable items the user can insert at runtime
   *
   * @param objs a list of organization variables to render
   */
  _renderHierarchy(
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

  /**
   * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param itemId Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  protected _treeItemSelected(
    itemId: string,
    value: string
  ): void {
    this.organizationVariableSelected.emit({
      itemId,
      value
    });
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionOrganizationVariables_T9n;
  }
}
