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
import { VNode } from '../../stencil-public-runtime';
import '@esri/calcite-components';
import { UserSession } from '@esri/solution-common';
import SolutionItem_T9n from '../../assets/t9n/solution-item/resources.json';
export declare class SolutionItem {
  el: HTMLSolutionItemElement;
  /**
   * Credentials for requests
   */
  authentication: UserSession;
  /**
   * A template's itemId.
   */
  itemId: string;
  itemIdWatchHandler(): void;
  /**
   * Contains the solution based variables
   */
  solutionVariables: string;
  /**
   * Contains the organization based variables
   */
  organizationVariables: string;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  itemType: string;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof SolutionItem_T9n;
  /**
   * Render tabs based on group item types
   *
   * @param visible Should the current tab be visible
   */
  _showGroupTabs(visible: boolean): VNode;
  /**
   * Render tabs based for an items details, data, and props section from a template
   *
   * @param visible Should the current tab be visible
   */
  _showItemTabs(visible: boolean): VNode;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
