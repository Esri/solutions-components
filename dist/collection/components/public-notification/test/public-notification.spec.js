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
import { PublicNotification } from '../public-notification';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/map-draw-tools/resources.json";
import { LayerView } from "../../../utils/test/mocks/jsApi";
import * as queryUtils from "../../../utils/queryUtils";
import { EWorkflowType } from "../../../utils/interfaces";
jest.setTimeout(30000);
afterEach(() => {
    jest.restoreAllMocks();
});
let mapView;
beforeEach(() => {
    jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
        translations
    ]);
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    mapView = {
        map: {
            layers: {
                add: () => { },
                getItemAt: () => { return -1; },
                findIndex: () => { return -1; }
            }
        }
    };
});
xdescribe('public-notification', () => {
    it('renders', async () => {
        const getSelectionSetQueryMock = jest.fn();
        jest.spyOn(queryUtils, "getSelectionSetQuery").mockImplementation(getSelectionSetQueryMock);
        const page = await newSpecPage({
            autoApplyChanges: true,
            components: [PublicNotification],
            template: () => (h("public-notification", { "show-refine-selection": "true" })),
        });
        //page.rootInstance.showRefineSelection = true;
        expect(page.root).toEqualHtml(`
      <public-notification show-refine-selection="true">
        <calcite-shell>
          <calcite-action-bar class="action-bar-size border-bottom-1" expand-disabled="" layout="horizontal" slot="header">
            <calcite-action-group class="action-center w-1-4" layout="horizontal">
              <calcite-action active="" alignment="center" class="height-full width-full" icon="list-check" id="list-check" text=""></calcite-action>
              <calcite-tooltip label="" placement="bottom" reference-element="list-check">
                <span></span>
              </calcite-tooltip>
            </calcite-action-group>
            <calcite-action-group class="action-center w-1-4" layout="horizontal">
              <calcite-action alignment="center" class="height-full width-full" disabled="" icon="test-data" id="test-data" text=""></calcite-action>
              <calcite-tooltip label="" placement="bottom" reference-element="test-data">
                <span></span>
              </calcite-tooltip>
            </calcite-action-group>
            <calcite-action-group class="action-center w-1-4" layout="horizontal">
              <calcite-action alignment="center" class="height-full width-full" disabled="" icon="file-pdf" id="file-pdf" text=""></calcite-action>
              <calcite-tooltip label="" placement="bottom" reference-element="file-pdf">
                <span></span>
              </calcite-tooltip>
            </calcite-action-group>
            <calcite-action-group class="action-center w-1-4" layout="horizontal">
              <calcite-action alignment="center" class="height-full width-full" disabled="" icon="file-csv" id="file-csv" text=""></calcite-action>
              <calcite-tooltip label="" placement="bottom" reference-element="file-csv">
                <span></span>
              </calcite-tooltip>
            </calcite-action-group>
          </calcite-action-bar>
          <calcite-panel>
            <div class="padding-top-sides-1">
              <calcite-label class="font-bold"></calcite-label>
            </div>
            <div class="padding-sides-1">
              <calcite-label></calcite-label>
            </div>
            <div class="info-message padding-bottom-1">
              <calcite-input-message active="" class="info-blue" scale="m"></calcite-input-message>
            </div>
            <calcite-notice active="" class="padding-bottom-1 padding-sides-1" color="green" icon="lightbulb">
              <div slot="message"></div>
            </calcite-notice>
            <div class="display-flex padding-sides-1">
              <calcite-label class="font-bold width-full">
                <map-layer-picker selectionmode="single"></map-layer-picker>
              </calcite-label>
            </div>
            <div class="display-flex padding-1">
              <calcite-button width="full"></calcite-button>
            </div>
          </calcite-panel>
        </calcite-shell>
      </public-notification>
    `);
    });
    it('handles selectionSetsWatchHandler', async () => {
        const getSelectionSetQueryMock = jest.fn();
        jest.spyOn(queryUtils, "getSelectionSetQuery").mockImplementation(getSelectionSetQueryMock);
        const page = await newSpecPage({
            autoApplyChanges: true,
            components: [PublicNotification],
            template: () => (h("public-notification", { addresseeLayer: new LayerView(), mapView: mapView })),
        });
        page.win.dispatchEvent(new CustomEvent("selectionSetsChanged", { detail: [] }));
        page.win.dispatchEvent(new CustomEvent("selectionSetsChanged", { detail: [{
                    id: 123456789,
                    workflowType: EWorkflowType.SKETCH,
                    searchResult: undefined,
                    buffer: {},
                    distance: 100,
                    download: true,
                    unit: "meters",
                    label: "Sketch 100",
                    selectedIds: [],
                    layerView: new LayerView(),
                    geometries: [],
                    refineSelectLayers: [],
                    refineIds: undefined
                }] }));
        page.win.dispatchEvent(new CustomEvent("selectionSetsChanged", { detail: [{
                    id: 123456789,
                    workflowType: EWorkflowType.REFINE,
                    searchResult: undefined,
                    buffer: {},
                    distance: 100,
                    download: true,
                    unit: "meters",
                    label: "Sketch 100",
                    selectedIds: [],
                    layerView: new LayerView(),
                    geometries: [],
                    refineSelectLayers: [],
                    refineIds: undefined
                }] }));
    });
});
