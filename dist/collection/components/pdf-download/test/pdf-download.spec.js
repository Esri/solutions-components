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
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import * as PdfDownload from '../pdf-download';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/pdf-download/resources.json";
import * as csvUtils from "../../../utils/csvUtils";
import { LayerView } from "../../../utils/test/mocks/jsApi";
jest.setTimeout(30000);
afterEach(() => {
    jest.restoreAllMocks();
});
beforeEach(() => {
    jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
        translations
    ]);
});
describe('pdf-download', () => {
    xit('renders', async () => {
        const page = await newSpecPage({
            components: [PdfDownload],
            template: () => (h("pdf-download", null)),
        });
        expect(page.root).toEqualHtml(`
      <pdf-download>
        <mock:shadow-root>
          <calcite-select disabled="" label="">
            <calcite-option>
              6 per page | 4 x 3-1/3
            </calcite-option>
            <calcite-option>
              10 per page | 4 x 2
            </calcite-option>
            <calcite-option>
              14 per page | 4 x 1-1/3
            </calcite-option>
            <calcite-option>
              20 per page | 4 x 1
            </calcite-option>
            <calcite-option>
              30 per page | 2-5/8 x 1
            </calcite-option>
            <calcite-option>
              60 per page | 1-3/4 x 2/3
            </calcite-option>
            <calcite-option>
              80 per page | 1-3/4 x 1/2
            </calcite-option>
          </calcite-select>
        </mock:shadow-root>
      </pdf-download>
    `);
    });
    xit('downloads csv', async () => {
        const exportCSVMock = jest.fn();
        jest.spyOn(csvUtils, "exportCSV").mockImplementation(exportCSVMock);
        const consoleLogMock = jest.fn();
        jest.spyOn(console, "log").mockImplementation(consoleLogMock);
        const layerView = new LayerView();
        const page = await newSpecPage({
            components: [PdfDownload],
            template: () => (h("pdf-download", { layerView: layerView })),
        });
        await page.root.downloadCSV([], true);
        expect(exportCSVMock).toBeCalledTimes(1);
        expect(consoleLogMock).toBeCalledTimes(1);
        expect(consoleLogMock).toBeCalledWith(true);
        await page.root.downloadCSV([], false);
        expect(exportCSVMock).toBeCalledTimes(2);
        expect(consoleLogMock).toBeCalledTimes(2);
        expect(consoleLogMock).toBeCalledWith(false);
    });
    // it('downloads pdf', async () => {
    //   const layerView = new LayerView() as unknown as any;
    //   const page = await newSpecPage({
    //     components: [PdfDownload],
    //     template: () => (<pdf-download layerView={layerView}></pdf-download>),
    //     supportsShadowDom: true,
    //     autoApplyChanges: true,
    //   });
    //   const sel = page.root.shadowRoot.querySelector("calcite-option");
    //   //.getElementsByTagName("calcite-option");
    //   sel[0].selected = true;
    //   //expect(sel.length).toEqual(0);
    //   const tempAlertMock = jest.fn();
    //   jest.spyOn(page.win, "alert").mockImplementation(tempAlertMock);
    //   await page.root.downloadPDF([], true);
    //   expect(tempAlertMock).toBeCalledTimes(1);
    // });
});
