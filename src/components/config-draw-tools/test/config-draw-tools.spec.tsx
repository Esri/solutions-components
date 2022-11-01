import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { ConfigDrawTools } from '../config-draw-tools';
import * as locale from "../../../utils/locale";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

beforeEach(() => {
  jest.spyOn(locale, "getLocaleComponentStrings").mockImplementation(() => [{
    "drawTools": "Drawing tools",
    "types": {
      "point": "Point",
      "line": "Line",
      "polygon": "Polygon",
      "rectangle": "Rectangle",
      "freehandPolygon": "Freehand Polygon"
    }
  }] as any);

  jest.useFakeTimers();
});

describe('config-draw-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      autoApplyChanges: true,
      components: [ConfigDrawTools],
      template: () => (<config-draw-tools></config-draw-tools>),
    });
    // TODO understand why we don't see the checkboxes within the check list
    expect(page.root).toEqualHtml(`
      <config-draw-tools default-checked="">
        <mock:shadow-root>
          <div>
            <div class="padding-block-end-1">
              <calcite-label class="label-spacing">
                Drawing tools
              </calcite-label>
            </div>
            <div class="padding-inline-start-1">
              <check-list defaultchecked=""></check-list>
            </div>
          </div>
        </mock:shadow-root>
      </config-draw-tools>
    `);

    // TODO understand why this doesn't work
    // const expected = {
    //   "point": true,
    //   "line": true,
    //   "polygon": true,
    //   "rectangle": true,
    //   "freehandPolygon": true
    // };
    // const actual = await page.root.getConfigInfo();
    // expect(actual).toEqual(expected);
  });
});
