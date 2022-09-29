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

import { Component, Element, Host, h, Prop, State, VNode } from '@stencil/core';
import * as pdfUtils from '../../../arcgis-pdf-creator/data/labelFormats.json';
import '@esri/calcite-components';
import PdfDownload_T9n from '../../assets/t9n/pdf-download/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

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
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() translations: typeof PdfDownload_T9n;

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

  async componentWillLoad() {
    await this._getTranslations();
  }

  render() {
    return (
      <Host>
        <calcite-select disabled={this.disabled} label="">
          {this._renderItems()}
        </calcite-select>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  _renderItems(): VNode[] {
    const s: any = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0
    });
    return sortedPdfIndo.map((l) => {
      const lNum = l.descriptionPDF.labelsPerPageDisplay;
      const lSize = `${l.descriptionPDF.labelWidthDisplay} x ${l.descriptionPDF.labelHeightDisplay}`;
      const textLabel = this.translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
      return (<calcite-option value={l}>{textLabel}</calcite-option>)
    });
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof PdfDownload_T9n;
  }

}
