import { newSpecPage } from '@stencil/core/testing';
import { SolutionResourceItem } from '../solution-resource-item';

describe('solution-resource-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionResourceItem],
      html: `<solution-resource-item></solution-resource-item>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-resource-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-resource-item>
    `);
  });
});
