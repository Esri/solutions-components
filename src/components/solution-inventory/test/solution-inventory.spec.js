import { newSpecPage } from '@stencil/core/testing';
import { SolutionInventory } from '../solution-inventory';
describe('solution-inventory', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [SolutionInventory],
            html: `<solution-inventory></solution-inventory>`,
        });
        expect(page.root).toEqualHtml(`
      <solution-inventory>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-inventory>
    `);
    });
});
