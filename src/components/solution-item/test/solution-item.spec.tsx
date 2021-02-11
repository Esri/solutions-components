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
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-item>
    `);
  });
});
