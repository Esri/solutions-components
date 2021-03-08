import { newSpecPage } from '@stencil/core/testing';
import { SolutionItemSharing } from '../solution-item-sharing';

describe('solution-item-sharing', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItemSharing],
      html: `<solution-item-sharing></solution-item-sharing>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-item-sharing>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-item-sharing>
    `);
  });
});
