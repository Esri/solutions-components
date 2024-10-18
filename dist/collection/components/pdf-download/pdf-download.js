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
import * as pdfLabelFormats from "../../assets/data/labelFormats.json";
import * as downloadUtils from "../../utils/downloadUtils";
import { loadModules } from "../../utils/loadModules";
import { Host, h } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
export class PdfDownload {
    constructor() {
        this.defaultNumLabelsPerPage = undefined;
        this.disabled = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCalciteSelectElement: The html element for selecting buffer unit
     */
    _labelInfoElement;
    /**
     * intl: https://developers.arcgis.com/javascript/latest/api-reference/esri-intl.html
     */
    _intl;
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
     * @param webmap Webmap containing layer
     * @param exportInfos Information about items to be exported
     * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
     * @param addColumnTitle Indicates if column headings should be included in output
     * @returns Promise resolving when function is done
     */
    async downloadCSV(webmap, exportInfos, removeDuplicates, addColumnTitle = true) {
        return downloadUtils.downloadCSV(webmap, exportInfos, true, // formatUsingLayerPopup
        removeDuplicates, addColumnTitle);
    }
    /**
     * Downloads pdf of mailing labels for the provided list of ids
     *
     * @param webmap Webmap containing layer
     * @param exportInfos Information about items to be exported
     * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
     * @param title Title for each page
     * @param initialImageDataUrl Data URL of image for first page
     * @returns Promise resolving when function is done
     */
    async downloadPDF(webmap, exportInfos, removeDuplicates = false, title = "", initialImageDataUrl = "") {
        return downloadUtils.downloadPDF(webmap, exportInfos, this._labelInfoElement.selectedOption?.value, removeDuplicates, title, initialImageDataUrl);
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
        return (h(Host, { key: '3d3fa11ecc4cf7a49c4b3831a6c4c19abd6c9ed9' }, h("calcite-select", { key: '74e76d8854fd582d2ed214c1b8f52c5744be8167', disabled: this.disabled, label: "", ref: (el) => { this._labelInfoElement = el; } })));
    }
    componentDidLoad() {
        // Render the options outside of Stencil's rendering so that it doesn't mangle RTL text with embedded LTR
        this._renderOptions();
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
     * Gets the formatted pdf export size text
     *
     * @param labelInfo current user selected label info
     *
     * @returns the pdf label as a string
     * @protected
     */
    _getLabelSizeText(labelInfo) {
        const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
        const lSize = "&lrm;" + labelInfo.descriptionPDF.labelWidthDisplay + " x " +
            labelInfo.descriptionPDF.labelHeightDisplay + "&rlm;";
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
     * Renders the pdf export size options and adds them to the `select` component
     *
     * @protected
     */
    _renderOptions() {
        const s = pdfLabelFormats;
        const sortedPdfIndo = (s.default || s).sort((a, b) => {
            const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
            const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
            return _a < _b ? -1 : _a > _b ? 1 : 0;
        });
        sortedPdfIndo.forEach((l, i) => {
            const option = document.createElement("calcite-option");
            option.value = l;
            option.innerHTML = this._getLabelSizeText(l);
            this._labelInfoElement.appendChild(option);
            if (this.defaultNumLabelsPerPage ? parseInt(l.descriptionPDF.labelsPerPageDisplay, 10) === this.defaultNumLabelsPerPage : i === 0) {
                // Setting selected wasn't enough to trigger it being the 'selectedOption'
                option.selected = true;
                this._labelInfoElement.selectedOption = option;
            }
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
            "defaultNumLabelsPerPage": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: The default number of labels per page to export"
                },
                "attribute": "default-num-labels-per-page",
                "reflect": false
            },
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
                    "signature": "(webmap: __esri.Map, exportInfos: IExportInfos, removeDuplicates: boolean, addColumnTitle?: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "webmap",
                            "type": "Map",
                            "docs": "Webmap containing layer"
                        }, {
                            "name": "exportInfos",
                            "type": "IExportInfos",
                            "docs": "Information about items to be exported"
                        }, {
                            "name": "removeDuplicates",
                            "type": "boolean",
                            "docs": "When true a single label is generated when multiple featues have a shared address value"
                        }, {
                            "name": "addColumnTitle",
                            "type": "boolean",
                            "docs": "Indicates if column headings should be included in output"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        },
                        "IExportInfos": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IExportInfos"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Downloads csv of mailing labels for the provided list of ids",
                    "tags": [{
                            "name": "param",
                            "text": "webmap Webmap containing layer"
                        }, {
                            "name": "param",
                            "text": "exportInfos Information about items to be exported"
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
                    "signature": "(webmap: __esri.Map, exportInfos: IExportInfos, removeDuplicates?: boolean, title?: string, initialImageDataUrl?: string) => Promise<void>",
                    "parameters": [{
                            "name": "webmap",
                            "type": "Map",
                            "docs": "Webmap containing layer"
                        }, {
                            "name": "exportInfos",
                            "type": "IExportInfos",
                            "docs": "Information about items to be exported"
                        }, {
                            "name": "removeDuplicates",
                            "type": "boolean",
                            "docs": "When true a single label is generated when multiple featues have a shared address value"
                        }, {
                            "name": "title",
                            "type": "string",
                            "docs": "Title for each page"
                        }, {
                            "name": "initialImageDataUrl",
                            "type": "string",
                            "docs": "Data URL of image for first page"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        },
                        "IExportInfos": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IExportInfos"
                        },
                        "downloadUtils": {
                            "location": "global",
                            "id": "global::downloadUtils"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Downloads pdf of mailing labels for the provided list of ids",
                    "tags": [{
                            "name": "param",
                            "text": "webmap Webmap containing layer"
                        }, {
                            "name": "param",
                            "text": "exportInfos Information about items to be exported"
                        }, {
                            "name": "param",
                            "text": "removeDuplicates When true a single label is generated when multiple featues have a shared address value"
                        }, {
                            "name": "param",
                            "text": "title Title for each page"
                        }, {
                            "name": "param",
                            "text": "initialImageDataUrl Data URL of image for first page"
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
