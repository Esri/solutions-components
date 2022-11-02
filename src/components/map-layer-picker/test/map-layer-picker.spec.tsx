import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MapLayerPicker } from '../map-layer-picker';
import * as mapViewUtils from "../../../utils/mapViewUtils";

let mapView;

beforeEach(() => {
  jest.spyOn(mapViewUtils, "getMapLayerNames").mockImplementation(() => [
    "A", "B"
  ] as any);

  mapView = {
    map: {
      layers: {
        add: () => {},
        getItemAt: () => { return -1 },
        findIndex: () => { return -1 }
      }
    }
  } as unknown as any;
});

describe('map-layer-picker', () => {
  it('renders single selection mode', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapLayerPicker],
      template: () => (<map-layer-picker mapView={mapView}></map-layer-picker>),
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker selection-mode="single">
       <div class="background-w map-layer-picker-container">
         <div class="map-layer-picker">
           <calcite-select label="">
             <calcite-option label="A" value="A"></calcite-option>
             <calcite-option label="B" value="B"></calcite-option>
           </calcite-select>
         </div>
       </div>
      </map-layer-picker>
    `);

    jest.spyOn(mapViewUtils, "getMapLayerNames").mockImplementation(() => [
      "A", "B", "C"
    ] as any);

    page.root.mapView = {...mapView};

    expect(page.root).toEqualHtml(`
    <map-layer-picker selection-mode="single">
     <div class="background-w map-layer-picker-container">
       <div class="map-layer-picker">
         <calcite-select label="">
           <calcite-option label="A" value="A"></calcite-option>
           <calcite-option label="B" value="B"></calcite-option>
         </calcite-select>
       </div>
     </div>
    </map-layer-picker>
  `);
  });

  it('renders single selection mode with selectedLayers', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapLayerPicker],
      template: () => (
        <map-layer-picker
          mapView={mapView}
          selectedLayers={["B"]}
        ></map-layer-picker>
      ),
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker selection-mode="single">
       <div class="background-w map-layer-picker-container">
         <div class="map-layer-picker">
           <calcite-select label="">
             <calcite-option label="A" value="A"></calcite-option>
             <calcite-option label="B" selected="" value="B"></calcite-option>
           </calcite-select>
         </div>
       </div>
      </map-layer-picker>
    `);
  });

  it('renders multi selection mode', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapLayerPicker],
      template: () => (
        <map-layer-picker
          mapView={mapView}
          selectedLayers={["A"]}
          selectionMode="multi"
        ></map-layer-picker>
      ),
    });
    expect(page.root).toEqualHtml(`
      <map-layer-picker selection-mode="multi">
       <div class="background-w map-layer-picker-container">
         <div class="map-layer-picker">
          <calcite-combobox label="" selection-mode="multi">
            <calcite-combobox-item selected="" textlabel="A" value="A"></calcite-combobox-item>
            <calcite-combobox-item textlabel="B" value="B"></calcite-combobox-item>
          </calcite-combobox>
         </div>
       </div>
      </map-layer-picker>
    `);
  });
});
