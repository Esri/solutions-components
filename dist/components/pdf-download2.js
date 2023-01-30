/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { p as pdfUtils } from './labelFormats.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { e as exportCSV } from './csvUtils.js';
import { q as queryFeaturesByID } from './queryUtils.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './option.js';
import { d as defineCustomElement$1 } from './select.js';

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
/**
 * Exports a PDF of labels.
 *
 * @param labels Labels to write
 * @param labelFormat Field format per label
 * @param labelPageDescription Page format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 */
function exportPDF(labels, labelFormat, labelPageDescription, removeDuplicates = true) {
  const outputLabels = _prepareOutput(labels, labelFormat, removeDuplicates);
  _downloadPDFFile(outputLabels, labelPageDescription, `notify-${Date.now().toString()}`);
}
/**
 * Downloads the PDF file.
 *
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 */
function _downloadPDFFile(labels, labelPageDescription, fileTitle) {
  console.log("_downloadPDFFile", labels, labelPageDescription, fileTitle); //???
}
/**
 * Prepares labels for export.
 *
 * @param labels Array of labels to prepare
 * @param labelFormat Field format per label
 * @param removeDuplicates Remove duplicate lines
 *
 * @returns De-duped array of labels if removeDuplicates is true
 */
function _prepareOutput(labels, labelFormat, removeDuplicates = true) {
  // Format the input into labels
  console.log(labelFormat);
  // Remove duplicates if desired
  if (removeDuplicates) {
    const uniques = new Set();
    labels.forEach(labelLines => uniques.add(labelLines.join("|")));
    labels = Array.from(uniques).map(label => label.split("|"));
  }
  return labels;
}

const pdfDownloadCss = ":host{display:block}";

const PdfDownload = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.disabled = false;
    this.layerView = undefined;
    this._translations = undefined;
  }
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
  async downloadPDF(ids, removeDuplicates) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const attributes = featureSet.features.map(f => f.attributes);
    // Convert array of objects into an array of string arrays
    const contents = attributes.map(attr => Object.values(attr));
    const labelFormat = this._convertPopupToLabelSpec(this.layerView.layer.popupTemplate.content[0].text);
    const labelPageDescription = this._labelInfoElement.selectedOption.value;
    return exportPDF(contents, labelFormat, labelPageDescription, removeDuplicates);
  }
  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  async downloadCSV(ids, removeDuplicates) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const attributes = featureSet.features.map(f => f.attributes);
    // Get the column headings from the first record
    const columnNames = {};
    const entry = attributes[0];
    Object.keys(entry).forEach(k => {
      if (entry.hasOwnProperty(k)) {
        columnNames[k] = k;
      }
    });
    console.log(typeof attributes, typeof columnNames); //???
    const labelFormat = this._convertPopupToLabelSpec(this.layerView.layer.popupTemplate.content[0].text);
    exportCSV(attributes, columnNames, labelFormat, removeDuplicates);
    return Promise.resolve();
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
    return (h(Host, null, h("calcite-select", { disabled: this.disabled, label: "", ref: (el) => { this._labelInfoElement = el; } }, this._renderItems())));
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
  _convertPopupToLabelSpec(popupInfo) {
    // Replace <br>, <br/> with |
    popupInfo = popupInfo.replace(/<br\s*\/?>/gi, "|");
    // Remove remaining HTML tags
    let labelSpec = popupInfo.replace(/<[\s.]*[^<>]*\/?>/gi, "").split("|");
    // Trim lines and remove empties
    labelSpec = labelSpec.map(line => line.trim()).filter(line => line.length > 0);
    return labelSpec;
  }
  ;
  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  _getLabelSizeText(labelInfo) {
    const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
    const lSize = `${labelInfo.descriptionPDF.labelWidthDisplay} x ${labelInfo.descriptionPDF.labelHeightDisplay}`;
    return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  /**
   * Renders the pdf export size options
   *
   * @returns Node array of size options
   *
   * @protected
   */
  _renderItems() {
    const s = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0;
    });
    return sortedPdfIndo.map((l) => {
      return (h("calcite-option", { value: l }, this._getLabelSizeText(l)));
    });
  }
  get el() { return this; }
  static get style() { return pdfDownloadCss; }
}, [1, "pdf-download", {
    "disabled": [4],
    "layerView": [16],
    "_translations": [32],
    "downloadPDF": [64],
    "downloadCSV": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["pdf-download", "calcite-icon", "calcite-option", "calcite-select"];
  components.forEach(tagName => { switch (tagName) {
    case "pdf-download":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PdfDownload);
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { PdfDownload as P, defineCustomElement as d };
