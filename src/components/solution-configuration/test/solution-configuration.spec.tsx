import { newSpecPage } from '@stencil/core/testing';
import { SolutionConfiguration } from '../solution-configuration';

describe('solution-configuration', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionConfiguration],
      html: `<solution-configuration></solution-configuration>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-configuration>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>Definition</calcite-tab-title>
                <calcite-tab-title>Spatial Reference</calcite-tab-title>
              </calcite-tab-nav>

              <calcite-tab class="config-tab" active>
                <div class="config-solution">

                  <div class="config-inventory">
                    <solution-inventory id="configInventory"></solution-inventory>
                  </div>

                  <div class="config-item">
                    <solution-item></solution-item>
                  </div>

                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">

                  <solution-spatial-ref></solution-spatial-ref>

                </div>
              </calcite-tab>
            </calcite-tabs>
          </div>
        </div>
      </solution-configuration>
    `);
  });
});
