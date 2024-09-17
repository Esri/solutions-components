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
import PdfDownload_T9n from "../../assets/t9n/pdf-download/resources.json";
import { VNode } from "../../stencil-public-runtime";
import { IExportInfos } from "../../utils/interfaces";
export declare class PdfDownload {
    el: HTMLPdfDownloadElement;
    /**
     * number: The default number of labels per page to export
     */
    defaultNumLabelsPerPage: number;
    /**
     * boolean: Controls the enabled/disabled state of download
     */
    disabled: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof PdfDownload_T9n;
    /**
     * HTMLCalciteSelectElement: The html element for selecting buffer unit
     */
    protected _labelInfoElement: HTMLCalciteSelectElement;
    /**
     * intl: https://developers.arcgis.com/javascript/latest/api-reference/esri-intl.html
     */
    protected _intl: __esri.intl;
    /**
     * Downloads csv of mailing labels for the provided list of ids
     *
     * @param webmap Webmap containing layer
     * @param exportInfos Information about items to be exported
     * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
     * @param addColumnTitle Indicates if column headings should be included in output
     * @returns Promise resolving when function is done
     */
    downloadCSV(webmap: __esri.Map, exportInfos: IExportInfos, removeDuplicates: boolean, addColumnTitle?: boolean): Promise<void>;
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
    downloadPDF(webmap: __esri.Map, exportInfos: IExportInfos, removeDuplicates?: boolean, title?: string, initialImageDataUrl?: string): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    componentDidLoad(): void;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
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
     * Renders the pdf export size options and adds them to the `select` component
     *
     * @protected
     */
    protected _renderOptions(): void;
}
