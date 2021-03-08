import { newSpecPage } from '@stencil/core/testing';
import { SolutionOrganizationVariables } from '../solution-organization-variables';

describe('solution-organization-variables', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionOrganizationVariables],
      html: `<solution-organization-variables></solution-organization-variables>`,
    });
    expect(page.root).toEqualHtml(`
    <solution-organization-variables>
      <mock:shadow-root>
        <div>
          <h4 class="org-var-header">
            Organization Varibles
          </h4>
        </div>
        <div class="container-border">
          <calcite-label id="variable-label"></calcite-label>
        </div>
      </mock:shadow-root>
    </solution-organization-variables>
    `);
  });
});
