import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { BufferTools } from '../buffer-tools';
import * as locale from "../../../utils/locale";
import * as loadModules from "../../../utils/loadModules";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [{
    feet: "Feet",
    meters: "Meters",
    miles: "Miles",
    kilometers: "Kilometers"
  }] as any);

  jest.spyOn(loadModules, "loadModules").mockImplementation(async () => {
    return [{ geodesicBuffer: () => {}}]
  });
});

describe('buffer-tools', () => {
  it('renders at text', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [BufferTools],
      template: () => (<buffer-tools></buffer-tools>),
    });
    expect(page.root).toEqualHtml(`
      <buffer-tools>
        <mock:shadow-root>
          <div class="c-container">
            <calcite-input class="padding-end-1" number-button-type="vertical" placeholder="0" type="number"></calcite-input>
            <calcite-select class="flex-1" label="label">
              <calcite-option label="Feet" value="feet"></calcite-option>
              <calcite-option label="Meters" selected="" value="meters"></calcite-option>
              <calcite-option label="Miles" value="miles"></calcite-option>
              <calcite-option label="Kilometers" value="kilometers"></calcite-option>
            </calcite-select>
          </div>
        </mock:shadow-root>
      </buffer-tools>
    `);
  });

  it('renders as slider', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [BufferTools],
      template: () => (<buffer-tools appearance='slider'></buffer-tools>),
    });
    expect(page.root).toEqualHtml(`
      <buffer-tools>
        <mock:shadow-root>
          <div>
            <calcite-slider labelhandles="" max="100" min="0" ticks="10"></calcite-slider>
          </div>
        </mock:shadow-root>
      </buffer-tools>
    `);
  });

  it('have expected defaults', () => {
    const toggle = new BufferTools();
    expect(toggle.appearance).toEqual('text');
    expect(toggle.distance).toEqual(0);
    expect(toggle.geometries).toEqual([]);
    expect(toggle.sliderMax).toEqual(100);
    expect(toggle.sliderMin).toEqual(0);
    expect(toggle.sliderTicks).toEqual(10);
    expect(toggle.unionResults).toEqual(true);
    expect(toggle.unit).toEqual('meters');
  });
});
