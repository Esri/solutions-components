import { newSpecPage } from '@stencil/core/testing';
import { SolutionVariables } from '../solution-variables';

describe('solution-variables', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionVariables],
      html: `<solution-variables></solution-variables>`,
    });
    expect(page.root).toEqualHtml(`
    <solution-variables>
      <mock:shadow-root>
        <div>
          <h4 class="org-var-header">
            Solution Varibles
          </h4>
        </div>
        <div class="container-border">
          <calcite-label id="variable-label"></calcite-label>
        </div>
      </mock:shadow-root>
    </solution-variables>
    `);
  });
});
