import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MapDrawTools } from '../map-draw-tools';
import * as locale from "../../../utils/locale";
import * as loadModules from "../../../utils/loadModules";
import * as translations from "../../../assets/t9n/map-draw-tools/resources.json";
import { GraphicsLayer, Sketch } from "../../../utils/test/mocks/jsApi";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

let mapView;

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);

  jest.spyOn(loadModules, "loadModules").mockImplementation(async () => {
    return [GraphicsLayer, Sketch]
  });

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

describe('map-draw-tools', () => {
  it('renders without border', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapDrawTools],
      template: () => (<map-draw-tools mapView={mapView}></map-draw-tools>),
      supportsShadowDom: false
    });
    expect(page.root).toEqualHtml(`
      <map-draw-tools>
        <div>
          <div></div>
        </div>
      </map-draw-tools>
    `);
  });

  it('renders with border', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapDrawTools],
      template: () => (<map-draw-tools border={true} mapView={mapView}></map-draw-tools>),
      supportsShadowDom: false
    });
    expect(page.root).toEqualHtml(`
      <map-draw-tools>
        <div class="border">
          <div></div>
        </div>
      </map-draw-tools>
    `);
  });

  it('watch and clear graphics', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapDrawTools],
      template: () => (<map-draw-tools graphics={["B" as unknown as any]} mapView={mapView}></map-draw-tools>),
      supportsShadowDom: false
    });

    expect(page.root.graphics.length).toEqual(1);
    page.root.graphics = ["A" as unknown as any]
    expect(page.root.graphics.length).toEqual(1);

    await page.root.clear();
    expect(page.root.graphics.length).toEqual(0);
  });

  it('watch mapView', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [MapDrawTools],
      template: () => (<map-draw-tools mapView={mapView}></map-draw-tools>),
      supportsShadowDom: false
    });

    mapView.map.layers.findIndex = () => { return 1 };
    mapView.map.layers.getItemAt = () => { return new GraphicsLayer({title: "A"}); };

    page.root.mapView = {...mapView};

    expect(page.root).toBeDefined()
  });
});
