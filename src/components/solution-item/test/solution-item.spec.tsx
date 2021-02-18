import { newSpecPage } from '@stencil/core/testing';
import { SolutionItem } from '../solution-item';

describe('solution-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItem],
      html: `<solution-item></solution-item>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-item>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>Item Details</calcite-tab-title>
                <calcite-tab-title>Data</calcite-tab-title>
                <calcite-tab-title>Properties</calcite-tab-title>
              </calcite-tab-nav>

              <calcite-tab class="config-tab" active>
                <solution-item-details></solution-item-details>
              </calcite-tab>
              <calcite-tab class="config-tab">
                solution-item-json/solution-item-json
              </calcite-tab>
              <calcite-tab class="config-tab">
                solution-item-json/solution-item-json
              </calcite-tab>
            </calcite-tabs>
          </div>
        </div>
      </solution-item>
    `);
  });
});
