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

import { Component, Element, Host, h, Method, Prop, State, VNode } from '@stencil/core';
import * as pdfUtils from '../../assets/data/labelFormats.json';
import '@esri/calcite-components';
import PdfDownload_T9n from '../../assets/t9n/pdf-download/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';
import { exportCSV } from '../../utils/csvUtils';

@Component({
  tag: 'pdf-download',
  styleUrl: 'pdf-download.css',
  shadow: true,
})
export class PdfDownload {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLPdfDownloadElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerView: __esri.FeatureLayerView;

  /**
   * boolean: Controls the enabled/disabled state of download
   */
  @Prop() disabled: boolean;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected _labelInfoControl: HTMLCalciteSelectElement;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof PdfDownload_T9n;

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
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  @Method()
  async downloadPDF(
    ids: number[],
    removeDuplicates: boolean
  ) {
    return this._downloadPDF(ids, removeDuplicates);
  }

  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  @Method()
  async downloadCSV(
    ids: number[],
    removeDuplicates: boolean
  ) {
    return this._downloadCSV(ids, removeDuplicates);
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
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <calcite-select
          disabled={this.disabled}
          label=""
          ref={(el) => { this._labelInfoControl = el }}
        >
          {this._renderItems()}
        </calcite-select>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Renders the pdf export size options
   *
   * @returns Node array of size options
   *
   * @protected
   */
  protected _renderItems(): VNode[] {
    const s: any = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0
    });
    return sortedPdfIndo.map((l) => {
      return (<calcite-option value={l}>{this._getLabelSizeText(l)}</calcite-option>)
    });
  }

  /**
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async _downloadPDF(
    ids: number[],
    removeDuplicates: boolean
  ): Promise<void> {
    const l = this._labelInfoControl.selectedOption.value;
    alert(`PDF download: (${this._getLabelSizeText(l)}) (remove dups: ${removeDuplicates}) ${ids.join(", ")}`);
  }

  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   *
   * @returns Promise that will resolve when the download is complete
   * @protected
   */
  protected async _downloadCSV(
    ids: number[],
    removeDuplicates: boolean
  ): Promise<void> {
    // TODO this will be leveraged when we do the real implementation of this
    console.log(removeDuplicates)
    await exportCSV(this.layerView, ids);
  }

  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  protected _getLabelSizeText(
    labelInfo: any
  ): string {
    const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
    const lSize = `${labelInfo.descriptionPDF.labelWidthDisplay} x ${labelInfo.descriptionPDF.labelHeightDisplay}`;
    return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof PdfDownload_T9n;
  }

}
