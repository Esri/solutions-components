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

import "@esri/calcite-components";
import * as intl from "@arcgis/core/intl";
import * as pdfUtils from "../../assets/data/labelFormats.json";
import PdfDownload_T9n from "../../assets/t9n/pdf-download/resources.json";
import { Component, Element, Host, h, Method, Prop, State, VNode } from "@stencil/core";
import { exportCSV } from "../../utils/csvUtils";
import { exportPDF } from "../../utils/pdfUtils";
import { getLocaleComponentStrings } from "../../utils/locale";
import { queryFeaturesByID } from "../../utils/queryUtils";

@Component({
  tag: "pdf-download",
  styleUrl: "pdf-download.css",
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
   * boolean: Controls the enabled/disabled state of download
   */
  @Prop() disabled = false;

  /**
   * string[]: Optional list of enabled size values for PDF export
   *  If empty all sizes will be enabled
   */
  @Prop() enabledSizeValues: number[] = [];

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerView: __esri.FeatureLayerView;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof PdfDownload_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLCalciteSelectElement: The html element for selecting buffer unit
   */
  protected _labelInfoElement: HTMLCalciteSelectElement;

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
  ): Promise<void> {
    const includeHeaderNames = true;  //???

    const labels = await this._prepareLabels(ids, removeDuplicates, includeHeaderNames);

    return exportCSV(labels);
  }

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
  ): Promise<void> {
    const includeHeaderNames = false;  //???

    const labels = await this._prepareLabels(ids, removeDuplicates, includeHeaderNames);

    const labelPageDescription = this._labelInfoElement.selectedOption.value;

    return exportPDF(labels, labelPageDescription);
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
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <calcite-select
          disabled={this.disabled}
          label=""
          ref={(el) => { this._labelInfoElement = el }}
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
   * Converts the text of a custom popup into a multiline label specification; conversion splits text into
   * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
   *
   * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
   * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
   * @return Label spec
   */
  public _convertPopupToLabelSpec(
    popupInfo: string
  ): string[] {
    // Replace <br>, <br/> with |
    popupInfo = popupInfo.replace(/<br\s*\/?>/gi, "|");

    // Remove remaining HTML tags and replace 0xA0 that popup uses for spaces
    let labelSpec = popupInfo.replace(/<[\s.]*[^<>]*\/?>/gi, "").replace(/\xA0/gi, " ").split("|");

    // Trim lines and remove empties
    labelSpec = labelSpec.map(line => line.trim()).filter(line => line.length > 0);

    return labelSpec;
  };

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
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof PdfDownload_T9n;
  }

  /**
   * Creates labels from items.
  *
  * @param ids List of ids to download
  * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
  * @param includeHeaderNames Add the label format at the front of the list of generated labels
  * @returns Promise resolving when function is done
   */
  protected async _prepareLabels(
    ids: number[],
    removeDuplicates: boolean,
    includeHeaderNames: boolean
  ): Promise<string[][]> {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const featuresAttrs = featureSet.features.map(f => f.attributes);

    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    const labelFormat = this._convertPopupToLabelSpec(this.layerView.layer.popupTemplate.content[0].text);

    // Convert attributes into an array of labels
    let labels: string[][] = featuresAttrs.map(
      featureAttributes => {
        const label: string[] = [];
        labelFormat.forEach(
          labelLineTemplate => {
            const labelLine = intl.substitute(labelLineTemplate, featureAttributes).trim();
            if (labelLine.length > 0) {
              label.push(labelLine);
            }
          }
        )
        return label;
      }
    )
    // Remove empty labels
    .filter(label => label.length > 0);

    // Remove duplicates
    if (removeDuplicates) {
      const labelsAsStrings: string[] = labels.map(label => JSON.stringify(label));
      const uniqueLabels = new Set(labelsAsStrings);
      labels = Array.from(uniqueLabels,
        labelString => JSON.parse(labelString)
      );
    }

    // Add header names
    if (includeHeaderNames) {
      const headerNames = labelFormat.map(labelFormatLine => labelFormatLine.replace(/\{/g, "").replace(/\}/g, ""));
      labels.unshift(headerNames);
    }

    return Promise.resolve(labels);
  }

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

}
