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
import * as PDFLabels from "../assets/arcgis-pdf-creator/PDFLabels";
export { ILabel } from "../assets/arcgis-pdf-creator/PDFLabels";
/**
 * Exports a PDF of labels.
 *
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 */
export declare function exportPDF(labels: string[][], labelPageDescription: PDFLabels.ILabel): void;