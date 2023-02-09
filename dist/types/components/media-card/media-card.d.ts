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
import MediaCard_T9n from "../../assets/t9n/media-card/resources.json";
import { IMediaCardValues } from '../../utils/interfaces';
export declare class MediaCard {
  el: HTMLMediaCardElement;
  /**
   * IMediaCardValues[]: Array of objects that contain the name, description, and image to display
   */
  values: IMediaCardValues[];
  /**
   * The index controls what image from values to display
   */
  _index: number;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof MediaCard_T9n;
  /**
   * Called each time the values prop is changed.
   * Reset the _index value accordingly.
   */
  geometriesWatchHandler(values: any, oldValues: any): void;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   * Using this as the Watch on values does not fire on initial load.
   *
   * @returns Promise when complete
   */
  componentDidLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): any;
  /**
   * Resets the index to 0
   *
   * @protected
   */
  protected _initIndex(): void;
  /**
   * Adds 1 to the current index
   *
   * @protected
   */
  protected _incrementIndex(): void;
  /**
   * Subtracts 1 from the current index
   *
   * @protected
   */
  protected _decrementIndex(): void;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
