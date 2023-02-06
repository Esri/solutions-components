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
import "@esri/calcite-components";
import PdfDownload_T9n from "../../assets/t9n/pdf-download/resources.json";
import { VNode } from "../../stencil-public-runtime";
export declare class PdfDownload {
  el: HTMLPdfDownloadElement;
  /**
   * boolean: Controls the enabled/disabled state of download
   */
  disabled: boolean;
  /**
   * string[]: Optional list of enabled size values for PDF export
   *  If empty all sizes will be enabled
   */
  enabledSizeValues: number[];
  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  layerView: __esri.FeatureLayerView;
  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  protected _translations: typeof PdfDownload_T9n;
  /**
   * HTMLCalciteSelectElement: The html element for selecting buffer unit
   */
  protected _labelInfoElement: HTMLCalciteSelectElement;
  protected _intl: any;
  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @param addColumnTitle Indicates if column headings should be included in output
   * @returns Promise resolving when function is done
   */
  downloadCSV(ids: number[], removeDuplicates: boolean, addColumnTitle?: boolean): Promise<void>;
  /**
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  downloadPDF(ids: number[], removeDuplicates: boolean): Promise<void>;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _initModules(): Promise<void>;
  /**
   * Converts the text of a custom popup into a multiline label specification; conversion splits text into
   * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
   *
   * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
   * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
   * @return Label spec
   */
  _convertPopupToLabelSpec(popupInfo: string): string[];
  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  protected _getLabelSizeText(labelInfo: any): string;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
  /**
   * Creates labels from items.
  *
  * @param ids List of ids to download
  * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
  * @param includeHeaderNames Add the label format at the front of the list of generated labels
  * @returns Promise resolving when function is done
   */
  protected _prepareLabels(ids: number[], removeDuplicates: boolean, includeHeaderNames?: boolean): Promise<string[][]>;
  /**
   * Renders the pdf export size options
   *
   * @returns Node array of size options
   *
   * @protected
   */
  protected _renderItems(): VNode[];
}
