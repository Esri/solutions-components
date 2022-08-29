/** @license
 * Copyright 2021 Esri
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

  @Prop() layerView: __esri.FeatureLayerView;

  @Prop({ mutable: true }) filterDuplicates: boolean = false;

  @Prop() removeDuplicateEnabled: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State()
  translations: typeof PdfDownload_T9n;

  protected _duplicateSelect: HTMLCalciteSelectElement;

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

  componentDidLoad() {
    this._getTranslations();
  }

  render() {
    return (
      <Host>
        <div class="background-w padding-1-2 list-border">
          <calcite-select label="">
            {this._renderItems()}
          </calcite-select>
        </div>
        {this._renderRemoveDuplicate()}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  _renderRemoveDuplicate(): VNode {
    return this.removeDuplicateEnabled ? (
      <div class="background-w padding-1-2 list-border margin-top-1">
        <calcite-label layout="inline">
          <calcite-switch
            onCalciteSwitchChange={(evt) => this._removeDuplicatesChanged(evt)}
            scale="m"
          />
          <span class="icon-text" title={"Remove duplicates by value"}>{"Remove duplicates by value"}</span>
        </calcite-label>

        <calcite-label>
          <calcite-select
            label=""
            disabled={!this.filterDuplicates}
            onCalciteSelectChange={(evt) => this._duplicateFieldChanged(evt)}
            ref={(el) => { this._duplicateSelect = el }}
          >
            {this._getFieldNames()}
          </calcite-select>
        </calcite-label>
      </div>
    ): (<div/>);
  }

  _renderItems(): VNode[] {
    const s: any = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0
    });
    return sortedPdfIndo.map((l) => {
      console.log(l)
      const textLabel = this.translations?.pdfLabel.replace("{{n}}", l.descriptionPDF.labelsPerPageDisplay);
      console.log(textLabel);
      return (<calcite-option value={l}>{textLabel}</calcite-option>)
    });
  }

  _itemClicked(v: any): void {
    console.log(v)
  }

  _download(): void {
    alert("Download the stuff");
  }

  _removeDuplicatesChanged(
    evt: CustomEvent
  ) {
    this.filterDuplicates = evt.detail.switched;
  }

  _getFieldNames(): VNode[] {
    return this.layerView.layer.fields.map(f => {
      return (<calcite-option>{f.alias}</calcite-option>)
    });
  }

  _duplicateFieldChanged(
    evt: CustomEvent
  ) {
    console.log(evt);
    console.log(this._duplicateSelect.value)
    console.log(this._duplicateSelect.selectedOption)
    console.log(this._duplicateSelect.selectedOption.value)
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof PdfDownload_T9n;
  }

}
