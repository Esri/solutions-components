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
        <img class="item-type-icon item-type-icon-margin" height="16" src="/item-icons/maps16.png" width="16">
      </solution-item-icon>
    `);
  });
});
