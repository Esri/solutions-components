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
          <slot></slot>
        </mock:shadow-root>
      </solution-organization-variables>
    `);
  });
});
