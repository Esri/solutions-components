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
          <slot></slot>
        </mock:shadow-root>
      </solution-variables>
    `);
  });
});
