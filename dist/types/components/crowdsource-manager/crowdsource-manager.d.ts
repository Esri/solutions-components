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
/// <reference types="arcgis-js-api" />
import { VNode } from '../../stencil-public-runtime';
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { ELayoutMode, IMapInfo } from '../../utils/interfaces';
export declare class CrowdsourceManager {
  el: HTMLCrowdsourceManagerElement;
  /**
   * IMapInfo[]: array of map infos (name and id)
   */
  mapInfos: IMapInfo[];
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  _translations: typeof CrowdsourceManager_T9n;
  /**
   * Controls the layout of the application
   */
  _layoutMode: ELayoutMode;
  /**
   * Stores the current map view
   */
  _mapView: __esri.MapView;
  /**
   * Controls the layout of the application
   */
  _panelOpen: boolean;
  /**
   * Handle changes to the buffer distance value
   */
  mapChanged(event: CustomEvent): void;
  componentWillLoad(): Promise<void>;
  render(): any;
  protected _getAction(imgClass: string, layoutMode: ELayoutMode, tip: string): VNode;
  protected _getDividerIcon(layoutMode: ELayoutMode, panelOpen: boolean): string;
  protected _getMapSizeClass(layoutMode: ELayoutMode, panelOpen: boolean): string;
  protected _getTableSizeClass(layoutMode: ELayoutMode, panelOpen: boolean): string;
  protected _getBody(layoutMode: ELayoutMode, panelOpen: boolean): VNode;
  protected _getMap(layoutMode: ELayoutMode, panelOpen: boolean): VNode;
  protected _getTable(layoutMode: ELayoutMode, panelOpen: boolean): VNode;
  protected _setLayoutMode(layoutMode: ELayoutMode): void;
  protected _toggleLayout(): void;
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected _getTranslations(): Promise<void>;
}
