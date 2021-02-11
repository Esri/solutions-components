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
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-configuration>
    `);
  });
});
