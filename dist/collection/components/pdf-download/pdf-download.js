/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import * as pdfUtils from "../../assets/data/labelFormats.json";
import { loadModules } from "../../utils/loadModules";
import { Host, h } from "@stencil/core";
import { exportCSV } from "../../utils/csvUtils";
import { exportPDF } from "../../utils/pdfUtils";
import { getLocaleComponentStrings } from "../../utils/locale";
import { queryFeaturesByID } from "../../utils/queryUtils";
export class PdfDownload {
  constructor() {
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
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @param addColumnTitle Indicates if column headings should be included in output
   * @returns Promise resolving when function is done
   */
  async downloadCSV(ids, removeDuplicates, addColumnTitle = true) {
    const labels = await this._prepareLabels(ids, removeDuplicates, addColumnTitle);
    return exportCSV(labels);
  }
  /**
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  async downloadPDF(ids, removeDuplicates) {
    const labels = await this._prepareLabels(ids, removeDuplicates);
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
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
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
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [intl] = await loadModules([
      "esri/intl"
    ]);
    this._intl = intl;
  }
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
    // Remove remaining HTML tags, replace 0xA0 that popup uses for spaces, replace some char representations,
    // and split the label back into individual lines
    let labelSpec = popupInfo
      .replace(/<[\s.]*[^<>]*\/?>/gi, "")
      .replace(/\xA0/gi, " ")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&nbsp;/gi, " ")
      .split("|");
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
   * Creates labels from items.
  *
  * @param ids List of ids to download
  * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
  * @param includeHeaderNames Add the label format at the front of the list of generated labels
  * @returns Promise resolving when function is done
   */
  async _prepareLabels(ids, removeDuplicates, includeHeaderNames = false) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const featuresAttrs = featureSet.features.map(f => f.attributes);
    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    const labelFormat = this._convertPopupToLabelSpec(this.layerView.layer.popupTemplate.content[0].text);
    // Convert attributes into an array of labels
    let labels = featuresAttrs.map(featureAttributes => {
      const label = [];
      labelFormat.forEach(labelLineTemplate => {
        const labelLine = this._intl.substitute(labelLineTemplate, featureAttributes).trim();
        if (labelLine.length > 0) {
          label.push(labelLine);
        }
      });
      return label;
    })
      // Remove empty labels
      .filter(label => label.length > 0);
    // Remove duplicates
    if (removeDuplicates) {
      const labelsAsStrings = labels.map(label => JSON.stringify(label));
      const uniqueLabels = new Set(labelsAsStrings);
      labels = Array.from(uniqueLabels, labelString => JSON.parse(labelString));
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
  static get is() { return "pdf-download"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["pdf-download.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["pdf-download.css"]
    };
  }
  static get properties() {
    return {
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "boolean: Controls the enabled/disabled state of download"
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "layerView": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.FeatureLayerView",
          "resolved": "FeatureLayerView",
          "references": {
            "___esri": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html"
        }
      }
    };
  }
  static get states() {
    return {
      "_translations": {}
    };
  }
  static get methods() {
    return {
      "downloadCSV": {
        "complexType": {
          "signature": "(ids: number[], removeDuplicates: boolean, addColumnTitle?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "ids List of ids to download"
                }],
              "text": "List of ids to download"
            }, {
              "tags": [{
                  "name": "param",
                  "text": "removeDuplicates When true a single label is generated when multiple featues have a shared address value"
                }],
              "text": "When true a single label is generated when multiple featues have a shared address value"
            }, {
              "tags": [{
                  "name": "param",
                  "text": "addColumnTitle Indicates if column headings should be included in output"
                }],
              "text": "Indicates if column headings should be included in output"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Downloads csv of mailing labels for the provided list of ids",
          "tags": [{
              "name": "param",
              "text": "ids List of ids to download"
            }, {
              "name": "param",
              "text": "removeDuplicates When true a single label is generated when multiple featues have a shared address value"
            }, {
              "name": "param",
              "text": "addColumnTitle Indicates if column headings should be included in output"
            }, {
              "name": "returns",
              "text": "Promise resolving when function is done"
            }]
        }
      },
      "downloadPDF": {
        "complexType": {
          "signature": "(ids: number[], removeDuplicates: boolean) => Promise<void>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "ids List of ids to download"
                }],
              "text": "List of ids to download"
            }, {
              "tags": [{
                  "name": "param",
                  "text": "removeDuplicates When true a single label is generated when multiple featues have a shared address value"
                }],
              "text": "When true a single label is generated when multiple featues have a shared address value"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Downloads pdf of mailing labels for the provided list of ids",
          "tags": [{
              "name": "param",
              "text": "ids List of ids to download"
            }, {
              "name": "param",
              "text": "removeDuplicates When true a single label is generated when multiple featues have a shared address value"
            }, {
              "name": "returns",
              "text": "Promise resolving when function is done"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=pdf-download.js.map
