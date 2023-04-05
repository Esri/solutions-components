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
import { MapSelectTools } from '../map-select-tools';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/map-select-tools/resources.json";
import { LayerView } from "../../../utils/test/mocks/jsApi";
import * as mapViewUtils from "../../../utils/mapViewUtils";
import * as queryUtils from "../../../utils/queryUtils";
import { ISelectionSet, EWorkflowType } from '../../../utils/interfaces';

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

let mapView;

let _unknown;

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);

  jest.spyOn(mapViewUtils, "highlightFeatures").mockImplementation(async () => {
    return { remove: () => {} } as unknown as any;
  });

  jest.spyOn(mapViewUtils, "goToSelection").mockImplementation(async () => {});

  jest.spyOn(queryUtils, "getQueryGeoms").mockImplementation((geoms) => {
    return geoms;
  });

  jest.spyOn(queryUtils, "queryObjectIds").mockImplementation(async (oids) => {
    return oids.map((oid, i) => i);
  });

  jest.spyOn(console, 'warn').mockImplementation(() => {});

  mapView = {
    map: {
      layers: {
        add: () => {},
        getItemAt: () => { return -1 },
        findIndex: () => { return -1 }
      }
    }
  } as unknown as any;

  _unknown = {} as unknown as any;
});

xdescribe('map-select-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (<map-select-tools mapView={mapView}></map-select-tools>),
    });
    expect(page.root).toEqualHtml(`
      <map-select-tools>
       <div class="padding-bottom-1">
         <calcite-radio-group class="w-100">
           <calcite-radio-group-item checked="" class="end-border w-50" value="SEARCH">
             Search
           </calcite-radio-group-item>
           <calcite-radio-group-item class="w-50" value="SKETCH">
             Sketch
           </calcite-radio-group-item>
         </calcite-radio-group>
       </div>
       <div class="div-visible-search">
         <div class="search-widget"></div>
       </div>
       <div class="div-not-visible">
         <calcite-label layout="inline">
           <calcite-checkbox></calcite-checkbox>
           Use layer features
         </calcite-label>
       </div>
       <div class="div-not-visible">
         <map-draw-tools active="" border=""></map-draw-tools>
       </div>
       <div class="div-not-visible">
         <refine-selection-tools active="" border="" mode="ADD" refinemode="SUBSET"></refine-selection-tools>
       </div>
       <calcite-label class="search-distance">
         Search Distance
         <buffer-tools></buffer-tools>
       </calcite-label>
     </map-select-tools>
    `);

    const actual = await page.root.getSelection();
    expect(actual.workflowType).toEqual(EWorkflowType.SEARCH);
    expect(actual.selectedIds.length).toEqual(0);
  });

  it('fires selectionSetChange event when geometries are cleared', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          geometries={[_unknown]}
          mapView={mapView}
        ></map-select-tools>
      ),
    });

    expect(page.root.geometries.length).toEqual(1);

    page.doc.addEventListener("selectionSetChange", (evt: CustomEvent) => {
      expect(evt.detail).toEqual(0);
    });

    page.root.geometries = [];
  });

  it('fires selectionSetChange event when geometries are changed', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          geometries={[_unknown]}
          mapView={mapView}
          selectLayerView={new LayerView() as unknown as any}
        ></map-select-tools>
      ),
    });

    expect(page.root.geometries.length).toEqual(1);

    let selectionSetChange = (evt: CustomEvent) => {
      expect(evt.detail).toEqual(2);
    };

    page.doc.addEventListener("selectionSetChange", selectionSetChange);

    page.root.geometries = [...page.root.geometries, _unknown];
  });

  it('clears geometries on clearSelection', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          geometries={[_unknown]}
          mapView={mapView}
          selectLayerView={new LayerView() as unknown as any}
        ></map-select-tools>
      ),
    });

    expect(page.root.geometries.length).toEqual(1);

    let selectionSetChange = (evt: CustomEvent) => {
      expect(evt.detail).toEqual(0);
    };

    page.doc.addEventListener("selectionSetChange", selectionSetChange);

    page.root.clearSelection();
  });

  it('can reload existing SELECT selectionSet', async () => {
    const layerView = new LayerView() as unknown as any;

    const selectionSet: ISelectionSet = {
      id: 12345,
      workflowType: EWorkflowType.SELECT,
      searchResult: undefined,
      buffer: _unknown,
      distance: 100,
      download: true,
      unit: "feet",
      label: "selection-label",
      selectedIds: [0],
      layerView,
      geometries: [_unknown],
      refineSelectLayers: [],
      refineIds: undefined
    };

    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          selectLayerView={layerView}
          selectionSet={selectionSet}
          mapView={mapView}
        ></map-select-tools>
      ),
    });
    page.doc.addEventListener("workflowTypeChange", (evt: CustomEvent) => {
      expect(evt.detail).toEqual(EWorkflowType.SELECT);
    })
    expect(page.root).toEqualHtml(`
      <map-select-tools>
       <div class="padding-bottom-1">
         <calcite-radio-group class="w-100">
           <calcite-radio-group-item class="end-border w-50" value="SEARCH">
             Search
           </calcite-radio-group-item>
           <calcite-radio-group-item checked="" class="w-50" value="SKETCH">
             Sketch
           </calcite-radio-group-item>
         </calcite-radio-group>
       </div>
       <div class="div-not-visible">
         <div class="search-widget"></div>
       </div>
       <div class="div-visible">
         <calcite-label layout="inline">
           <calcite-checkbox></calcite-checkbox>
           Use layer features
         </calcite-label>
       </div>
       <div class="div-visible">
         <map-draw-tools active="" border=""></map-draw-tools>
       </div>
       <div class="div-not-visible">
         <refine-selection-tools active="" border="" mode="ADD" refinemode="SUBSET"></refine-selection-tools>
       </div>
       <calcite-label class="search-distance">
         Search Distance
         <buffer-tools distance="100" unit="feet"></buffer-tools>
       </calcite-label>
     </map-select-tools>
    `);

    const actual = await page.root.getSelection();
    expect(actual.label.startsWith("Layer")).toEqual(true);
  });

  it('can reload existing SKETCH selectionSet', async () => {
    const layerView = new LayerView() as unknown as any;

    const selectionSet: ISelectionSet = {
      id: 12345,
      workflowType: EWorkflowType.SKETCH,
      searchResult: undefined,
      buffer: _unknown,
      distance: 100,
      download: true,
      unit: "feet",
      label: "selection-label",
      selectedIds: [0],
      layerView,
      geometries: [_unknown],
      refineSelectLayers: [],
      refineIds: undefined
    };

    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          selectLayerView={layerView}
          selectionSet={selectionSet}
          mapView={mapView}
        ></map-select-tools>
      ),
    });
    page.doc.addEventListener("workflowTypeChange", (evt: CustomEvent) => {
      expect(evt.detail).toEqual(EWorkflowType.SKETCH);
    })
    expect(page.root).toEqualHtml(`
     <map-select-tools>
       <div class="padding-bottom-1">
         <calcite-radio-group class="w-100">
           <calcite-radio-group-item class="end-border w-50" value="SEARCH">
             Search
           </calcite-radio-group-item>
           <calcite-radio-group-item checked="" class="w-50" value="SKETCH">
             Sketch
           </calcite-radio-group-item>
         </calcite-radio-group>
       </div>
       <div class="div-not-visible">
         <div class="search-widget"></div>
       </div>
       <div class="div-visible">
         <calcite-label layout="inline">
           <calcite-checkbox></calcite-checkbox>
           Use layer features
         </calcite-label>
       </div>
       <div class="div-visible">
         <map-draw-tools active="" border=""></map-draw-tools>
       </div>
       <div class="div-not-visible">
         <refine-selection-tools active="" border="" mode="ADD" refinemode="SUBSET"></refine-selection-tools>
       </div>
       <calcite-label class="search-distance">
         Search Distance
         <buffer-tools distance="100" unit="feet"></buffer-tools>
       </calcite-label>
     </map-select-tools>
    `);

    const actual = await page.root.getSelection();
    expect(actual.label.startsWith("Sketch")).toEqual(true);
  });

  it('can reload existing SEARCH selectionSet', async () => {
    const layerView = new LayerView() as unknown as any;

    const selectionSet: ISelectionSet = {
      id: 12345,
      workflowType: EWorkflowType.SEARCH,
      searchResult: undefined,
      buffer: _unknown,
      distance: 100,
      download: true,
      unit: "feet",
      label: "selection-label",
      selectedIds: [0,1],
      layerView,
      geometries: [_unknown, _unknown],
      refineSelectLayers: [],
      refineIds: undefined
    };

    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          isUpdate={true}
          selectLayerView={layerView}
          selectionSet={selectionSet}
          mapView={mapView}
        ></map-select-tools>
      ),
    });
    page.doc.addEventListener("workflowTypeChange", (evt: CustomEvent) => {
      expect(evt.detail).toEqual(EWorkflowType.SEARCH);
    })
    expect(page.root).toEqualHtml(`
     <map-select-tools>
       <div class="padding-bottom-1">
         <calcite-radio-group class="w-100">
           <calcite-radio-group-item checked="" class="end-border w-50" value="SEARCH">
             Search
           </calcite-radio-group-item>
           <calcite-radio-group-item class="w-50" value="SKETCH">
             Sketch
           </calcite-radio-group-item>
         </calcite-radio-group>
       </div>
       <div class="div-visible-search">
         <div class="search-widget"></div>
       </div>
       <div class="div-not-visible">
         <calcite-label layout="inline">
           <calcite-checkbox></calcite-checkbox>
           Use layer features
         </calcite-label>
       </div>
       <div class="div-not-visible">
         <map-draw-tools active="" border=""></map-draw-tools>
       </div>
       <div class="div-not-visible">
         <refine-selection-tools active="" border="" mode="ADD" refinemode="SUBSET"></refine-selection-tools>
       </div>
       <calcite-label class="search-distance">
         Search Distance
         <buffer-tools distance="100" unit="feet"></buffer-tools>
       </calcite-label>
     </map-select-tools>
    `);

    const actual = await page.root.getSelection();
    expect(actual.id).toEqual(selectionSet.id);
  });

  it('handles sketchGraphicsChange', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          geometries={[_unknown]}
          mapView={mapView}
          selectLayerView={new LayerView() as unknown as any}
        ></map-select-tools>
      ),
    });
    expect(page.root.geometries.length).toEqual(1);
    page.win.dispatchEvent(new CustomEvent("sketchGraphicsChange", {detail: []}));
    expect(page.root.geometries.length).toEqual(0);

    _unknown = { geometry: {}};
    page.win.dispatchEvent(new CustomEvent("sketchGraphicsChange", {detail: [_unknown, _unknown]}));
    expect(page.root.geometries.length).toEqual(2);

    page.win.dispatchEvent(new CustomEvent("sketchGraphicsChange", {detail: undefined}));
    expect(page.root.geometries.length).toEqual(2);
  });

  it('handles sketchGraphicsChange', async () => {
    const page = await newSpecPage({
      components: [MapSelectTools],
      template: () => (
        <map-select-tools
          geometries={[]}
          mapView={mapView}
          selectLayerView={new LayerView() as unknown as any}
        ></map-select-tools>
      ),
    });

    page.win.dispatchEvent(new CustomEvent("layerSelectionGraphicsChange", {detail: undefined}));
    expect(page.root.geometries.length).toEqual(0);

    page.doc.addEventListener("selectionSetChange", (evt: CustomEvent) => {
      expect(evt.detail).toEqual(1);
    });

    _unknown = {
      attributes: { "OID": 1 },
      layer: {
        objectIdField: "OID"
      },
      geometry: {}
    };
    page.win.dispatchEvent(new CustomEvent("layerSelectionGraphicsChange", {detail: [_unknown]}));
    expect(page.root.geometries.length).toEqual(1);
  });
});
