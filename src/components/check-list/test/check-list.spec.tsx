import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { CheckList } from '../check-list';

describe('check-list', () => {
  it('renders values', async () => {
    const values = ["A", "B", "C"];
    const page = await newSpecPage({
      components: [CheckList],
      template: () => (<check-list values={values}></check-list>),
    });
    // TODO understand why the checkboxes don't show the checked prop??
    expect(page.root).toEqualHtml(`
      <check-list default-checked="">
        <mock:shadow-root>
          <div>
            <calcite-label layout="inline">
              <calcite-checkbox value="A"></calcite-checkbox>
              A
            </calcite-label>
            <calcite-label layout="inline">
              <calcite-checkbox value="B"></calcite-checkbox>
              B
            </calcite-label>
            <calcite-label layout="inline">
              <calcite-checkbox value="C"></calcite-checkbox>
              C
            </calcite-label>
          </div>
        </mock:shadow-root>
      </check-list>
    `);
    expect(page.root.defaultChecked).toEqual(true);
  });
});
