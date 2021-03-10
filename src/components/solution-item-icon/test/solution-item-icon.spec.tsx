import { newSpecPage } from '@stencil/core/testing';
import { SolutionItemIcon } from '../solution-item-icon';

describe('solution-item-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionItemIcon],
      html: `<solution-item-icon></solution-item-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-item-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-item-icon>
    `);
  });
});
