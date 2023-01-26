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
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param contentArray Array of labels; each label is an array of label line strings
 * @param labelDescription Format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 *
 * @returns Promise when the function has completed
 */
async function exportPDF(contents, labelDescription, removeDuplicates = true) {
  console.log("exportPDF", JSON.stringify(contents), JSON.stringify(labelDescription, null, 2), removeDuplicates); //???
  /*
  const fieldNames = {};
  const entry = attributes[0];
  Object.keys(entry).forEach(k => {
    if (entry.hasOwnProperty(k)) {
      fieldNames[k] = k;
    }
  });

  _downloadCSVFile(fieldNames, attributes, `notify-${Date.now().toString()}`);
  */
}
/**
 * Download the CSV file
 *
 * @param fieldNames the names for each of the features fields
 * @param attributes the features attributes
 *
 * Based on:
 * https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
 *
 * @returns void
 */
/*
function _downloadCSVFile(
  fieldNames: {[key: string]: string},
  attributes: {[key: string]: string}[],
  fileTitle: string
): void {
  if (fieldNames) {
    attributes.unshift(fieldNames);
  }
  // format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  const csv = attributes.reduce((prev, cur) => {
    return prev + Object.values(cur).map(v => `"${v}"`).join(",") + "\r\n";
  }, "");
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
*/

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
    const labelDescription = this._labelInfoElement.selectedOption.value;
    return exportPDF(contents, labelDescription, removeDuplicates);
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
    const columnNames = new Set();
    const entry = attributes[0];
    Object.keys(entry).forEach(k => {
      if (entry.hasOwnProperty(k)) {
        columnNames[k] = k;
      }
    });
    return exportCSV(columnNames, attributes, removeDuplicates);
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
