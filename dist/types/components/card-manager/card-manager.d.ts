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
import CardManager_T9n from "../../assets/t9n/card-manager/resources.json";
export declare class CardManager {
  el: HTMLCardManagerElement;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof CardManager_T9n;
  protected _showInfoCard: any;
  protected _showMediaCard: any;
  protected _showCommentsCard: any;
  protected _fakeValues: any;
  protected _fakeInfos: any;
  componentWillLoad(): Promise<void>;
  render(): any;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
