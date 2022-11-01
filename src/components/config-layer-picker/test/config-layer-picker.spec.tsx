import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { ConfigLayerPicker } from '../config-layer-picker';
import * as locale from "../../../utils/locale";
import * as mapViewUtils from "../../../utils/mapViewUtils";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [{
    "addresseeLayers": "Choose the potential addressee layers"
  }] as any);
});

describe('config-layer-picker', () => {
  it('renders', async () => {
    const getLayersSpy = jest.spyOn(mapViewUtils, "getMapLayerNames").mockImplementation(() => [
      "A",
      "B"
    ] as any);
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [ConfigLayerPicker],
      template: () => (<config-layer-picker></config-layer-picker>),
    });
    expect(page.root).toEqualHtml(`
      <config-layer-picker default-checked="">
        <mock:shadow-root>
          <div>
            <div class="padding-block-end-1">
              <calcite-label class="label-spacing">
                Choose the potential addressee layers
              </calcite-label>
            </div>
            <div class="padding-inline-start-1">
              <check-list defaultchecked=""></check-list>
            </div>
          </div>
        </mock:shadow-root>
      </config-layer-picker>
    `);

    // set fake mapView
    page.root.mapView = {};
    expect(getLayersSpy).toHaveBeenCalledTimes(1);
  });
});
