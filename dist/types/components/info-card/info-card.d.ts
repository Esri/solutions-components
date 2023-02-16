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
import { IInfoCardValues } from '../../utils/interfaces';
export declare class InfoCard {
  el: HTMLInfoCardElement;
  /**
   * string: the components title
   */
  cardTitle: string;
  /**
   * IInfoCardValues: key value pairs to show in the components table
   */
  values: IInfoCardValues;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Render the user defined values as table rows
   *
   * @returns array of row nodes
   * @protected
   */
  protected _getRows(): VNode[];
}
