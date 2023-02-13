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
import { RefineSelection } from '../refine-selection';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/refine-selection/resources.json";
import { EWorkflowType, ESelectionMode } from '../../../utils/interfaces';
import { LayerView } from "../../../utils/test/mocks/jsApi";
jest.setTimeout(30000);
afterEach(() => {
    jest.restoreAllMocks();
});
let mapView;
let refineSelectionSet;
beforeEach(() => {
    jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(async () => [
        translations
    ]);
    //jest.spyOn(console, 'warn').mockImplementation(() => {});
    refineSelectionSet = {
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
        refineIds: {
            addIds: [],
            removeIds: []
        }
    };
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
describe('refine-selection', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [RefineSelection],
            template: () => (h("refine-selection", null)),
        });
        page.waitForChanges();
        expect(page.root).toEqualHtml(`
      <refine-selection>
       <div class="padding-1">
         <div>
           <calcite-radio-group class="w-100">
             <calcite-radio-group-item checked="" class="w-50" value="ADD">
              Add
             </calcite-radio-group-item>
             <calcite-radio-group-item class="w-50" value="REMOVE">
              Remove
             </calcite-radio-group-item>
           </calcite-radio-group>
           <refine-selection-tools border="" mode="ADD"></refine-selection-tools>
         </div>
         <br>
         <calcite-list class="list-border">
           <calcite-list-item label="Features Added: 0"></calcite-list-item>
           <calcite-list-item label="Features Removed: 0"></calcite-list-item>
           <calcite-list-item label="Total Selected: 0"></calcite-list-item>
         </calcite-list>
       </div>
      </refine-selection>
    `);
        page.rootInstance._testAccess("_modeChanged", { detail: ESelectionMode.REMOVE });
        page.rootInstance.selectionSets = [{
                id: 123456789,
                workflowType: EWorkflowType.SELECT,
                searchResult: undefined,
                buffer: {},
                distance: 100,
                download: true,
                unit: "meters",
                label: "Sketch 100",
                selectedIds: [2, 3],
                layerView: new LayerView(),
                geometries: [],
                refineSelectLayers: [],
                refineIds: {
                    addIds: [],
                    removeIds: []
                }
            }];
        await page.waitForChanges();
        expect(page.root).toEqualHtml(`
      <refine-selection>
        <div class="padding-1">
          <div>
            <calcite-radio-group class="w-100">
              <calcite-radio-group-item class="w-50" value="ADD">
                Add
              </calcite-radio-group-item>
              <calcite-radio-group-item checked="" class="w-50" value="REMOVE">
                Remove
              </calcite-radio-group-item>
            </calcite-radio-group>
            <refine-selection-tools border="" mode="REMOVE"></refine-selection-tools>
          </div>
          <br>
          <calcite-list class="list-border">
            <calcite-list-item label="Features Added: 0"></calcite-list-item>
            <calcite-list-item label="Features Removed: 0"></calcite-list-item>
            <calcite-list-item label="Total Selected: 2"></calcite-list-item>
          </calcite-list>
        </div>
      </refine-selection>
    `);
        page.rootInstance._testAccess("_setSelectionMode", ESelectionMode.REMOVE);
        await page.waitForChanges();
    });
    it('selectionSetsChanged NO ids', async () => {
        const page = await newSpecPage({
            components: [RefineSelection],
            template: () => (h("refine-selection", { selectionSets: [refineSelectionSet] })),
        });
        page.doc.addEventListener("selectionSetsChanged", (evt) => {
            expect(evt.detail[0].refineIds.addIds.length).toEqual(0);
            expect(evt.detail[0].refineIds.removeIds.length).toEqual(0);
        });
        page.win.dispatchEvent(new CustomEvent("refineSelectionIdsChange", {
            detail: {}
        }));
        page.win.dispatchEvent(new CustomEvent("refineSelectionIdsChange", {
            detail: {
                addIds: [],
                removeIds: []
            }
        }));
    });
    it('selectionSetsChanged WITH ids', async () => {
        refineSelectionSet.refineIds.addIds = [4];
        refineSelectionSet.refineIds.removeIds = [5];
        refineSelectionSet.selectedIds = [4];
        const otherSelectionSetToRemoveFrom = {
            id: 123456789,
            workflowType: EWorkflowType.SELECT,
            searchResult: undefined,
            buffer: {},
            distance: 100,
            download: true,
            unit: "meters",
            label: "Sketch 100",
            selectedIds: [2, 3],
            layerView: new LayerView(),
            geometries: [],
            refineSelectLayers: [],
            refineIds: {
                addIds: [],
                removeIds: []
            }
        };
        const page = await newSpecPage({
            components: [RefineSelection],
            template: () => (h("refine-selection", { selectionSets: [refineSelectionSet, otherSelectionSetToRemoveFrom] })),
        });
        expect(refineSelectionSet.selectedIds.length).toEqual(1);
        expect(refineSelectionSet.refineIds.addIds.length).toEqual(1);
        expect(refineSelectionSet.refineIds.removeIds.length).toEqual(1);
        expect(otherSelectionSetToRemoveFrom.selectedIds.length).toEqual(2);
        expect(otherSelectionSetToRemoveFrom.selectedIds).toContain(2);
        page.doc.addEventListener("selectionSetsChanged", async (evt) => {
            await page.waitForChanges();
            expect(evt.detail[0].workflowType).toEqual(EWorkflowType.REFINE);
            expect(evt.detail[0].selectedIds.length).toEqual(3);
            expect(evt.detail[0].refineIds.addIds.length).toEqual(3);
            expect(evt.detail[0].refineIds.removeIds.length).toEqual(2);
            expect(evt.detail[1].workflowType).toEqual(EWorkflowType.SELECT);
            expect(evt.detail[1].selectedIds.length).toEqual(1);
            expect(evt.detail[1].selectedIds).not.toContain(2);
        });
        page.win.dispatchEvent(new CustomEvent("refineSelectionIdsChange", {
            detail: {
                addIds: [0, 1],
                removeIds: [2]
            }
        }));
    });
    it('will add REFINE set', async () => {
        const otherSelectionSetToRemoveFrom = {
            id: 123456789,
            workflowType: EWorkflowType.SELECT,
            searchResult: undefined,
            buffer: {},
            distance: 100,
            download: true,
            unit: "meters",
            label: "Sketch 100",
            selectedIds: [2, 3],
            layerView: new LayerView(),
            geometries: [],
            refineSelectLayers: [],
            refineIds: {
                addIds: [],
                removeIds: []
            }
        };
        const page = await newSpecPage({
            components: [RefineSelection],
            template: () => (h("refine-selection", { selectionSets: [otherSelectionSetToRemoveFrom] })),
        });
        expect(otherSelectionSetToRemoveFrom.selectedIds.length).toEqual(2);
        expect(otherSelectionSetToRemoveFrom.selectedIds).toContain(2);
        let x = 0;
        page.doc.addEventListener("selectionSetsChanged", async (evt) => {
            await page.waitForChanges();
            if (x === 0) {
                expect(evt.detail.length).toEqual(1);
                expect(otherSelectionSetToRemoveFrom.selectedIds.length).toEqual(1);
                expect(otherSelectionSetToRemoveFrom.selectedIds).not.toContain(2);
                x += 1;
            }
            else {
                expect(evt.detail.length).toEqual(2);
                expect(evt.detail[0].workflowType).toEqual(EWorkflowType.SELECT);
                expect(evt.detail[0].selectedIds.length).toEqual(1);
                expect(evt.detail[0].selectedIds).not.toContain(2);
                expect(evt.detail[1].workflowType).toEqual(EWorkflowType.REFINE);
                expect(evt.detail[1].selectedIds.length).toEqual(2);
                expect(evt.detail[1].refineIds.addIds.length).toEqual(2);
                expect(evt.detail[1].refineIds.removeIds.length).toEqual(1);
            }
        });
        page.win.dispatchEvent(new CustomEvent("refineSelectionIdsChange", {
            detail: {
                addIds: [0, 1],
                removeIds: [2]
            }
        }));
    });
    it('selectionSetsChanged WITH ids', async () => {
        refineSelectionSet.refineIds.addIds = [];
        refineSelectionSet.refineIds.removeIds = [5];
        refineSelectionSet.selectedIds = [1, 4];
        const otherSelectionSetToRemoveFrom = {
            id: 123456789,
            workflowType: EWorkflowType.SELECT,
            searchResult: undefined,
            buffer: {},
            distance: 100,
            download: true,
            unit: "meters",
            label: "Sketch 100",
            selectedIds: [2, 3],
            layerView: new LayerView(),
            geometries: [],
            refineSelectLayers: [],
            refineIds: {
                addIds: [],
                removeIds: [4]
            }
        };
        const page = await newSpecPage({
            components: [RefineSelection],
            template: () => (h("refine-selection", { selectionSets: [refineSelectionSet, otherSelectionSetToRemoveFrom] })),
        });
        expect(refineSelectionSet.selectedIds.length).toEqual(2);
        expect(refineSelectionSet.refineIds.addIds.length).toEqual(0);
        expect(refineSelectionSet.refineIds.removeIds.length).toEqual(1);
        expect(otherSelectionSetToRemoveFrom.selectedIds.length).toEqual(2);
        expect(otherSelectionSetToRemoveFrom.selectedIds).toContain(2);
        page.doc.addEventListener("selectionSetsChanged", async (evt) => {
            await page.waitForChanges();
            expect(evt.detail[0].workflowType).toEqual(EWorkflowType.REFINE);
            expect(evt.detail[0].selectedIds.length).toEqual(1);
            expect(evt.detail[0].refineIds.addIds.length).toEqual(0);
            expect(evt.detail[0].refineIds.removeIds.length).toEqual(3);
            expect(evt.detail[1].workflowType).toEqual(EWorkflowType.SELECT);
            expect(evt.detail[1].selectedIds.length).toEqual(1);
            expect(evt.detail[1].selectedIds).not.toContain(2);
        });
        page.win.dispatchEvent(new CustomEvent("refineSelectionIdsChange", {
            detail: {
                addIds: [],
                removeIds: [2, 4]
            }
        }));
    });
});
