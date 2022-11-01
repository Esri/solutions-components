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

  jest.useFakeTimers();
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

  it('geometries watch', async () => {
    const timeout = jest.spyOn(global, 'setTimeout');
    const cleartimeout = jest.spyOn(global, 'clearTimeout');
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

    page.root.geometries = [{}];
    page.root.geometries = [];

    expect(timeout).toBeCalledTimes(3);
    expect(cleartimeout).toBeCalledTimes(2);
  });

  it('have expected defaults', () => {
    const bufferTools = new BufferTools();
    expect(bufferTools.appearance).toEqual('text');
    expect(bufferTools.distance).toEqual(0);
    expect(bufferTools.geometries).toEqual([]);
    expect(bufferTools.sliderMax).toEqual(100);
    expect(bufferTools.sliderMin).toEqual(0);
    expect(bufferTools.sliderTicks).toEqual(10);
    expect(bufferTools.unionResults).toEqual(true);
    expect(bufferTools.unit).toEqual('meters');
  });
});
