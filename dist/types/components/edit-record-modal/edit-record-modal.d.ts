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
import EditRecordModal_T9n from "../../assets/t9n/edit-record-modal/resources.json";
export declare class EditRecordModal {
  el: HTMLEditRecordModalElement;
  /**
   * When true the component is displayed
   */
  open: boolean;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof EditRecordModal_T9n;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): any;
  protected _getFieldInputs(): VNode[];
  protected _cancel(): void;
  protected _save(): void;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
