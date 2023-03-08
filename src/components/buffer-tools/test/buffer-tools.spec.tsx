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
import { BufferTools } from '../buffer-tools';
import * as locale from "../../../utils/locale";
import * as translations from "../../../assets/t9n/buffer-tools/resources.json";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [
    translations
  ] as any);

  jest.useFakeTimers();

});

xdescribe('buffer-tools', () => {
  it('renders as text', async () => {
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

  it('_setDistance', async () => {
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

    let matcher = undefined;

    page.root.geometries = [{}];
    jest.runAllTimers();

    page.doc.addEventListener("bufferComplete", (evt: CustomEvent) => {
      expect(evt.detail).toEqual(matcher);
    });

    page.rootInstance._testAccess("_setDistance", {detail: {value: 0}});
    jest.runAllTimers();

    page.rootInstance._testAccess("_setDistance", {detail: {value: 1}});
    jest.runAllTimers();

    expect(timeout).toBeCalledTimes(3);
    expect(cleartimeout).toBeCalledTimes(2);

    timeout.mockReset();
    timeout.mockRestore();

    cleartimeout.mockReset();
    cleartimeout.mockRestore();
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

    timeout.mockReset();
    timeout.mockRestore();

    cleartimeout.mockReset();
    cleartimeout.mockRestore();
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

  it('have expected defaults', () => {
    const bufferTools = new BufferTools();
    bufferTools._testAccess("_setUnit", "meters");
  });
});
