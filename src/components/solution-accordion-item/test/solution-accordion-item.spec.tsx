import { newSpecPage } from '@stencil/core/testing';
import { SolutionAccordionItem } from '../solution-accordion-item';

describe('solution-accordion-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionAccordionItem],
      html: `<solution-accordion-item></solution-accordion-item>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-accordion-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-accordion-item>
    `);
  });
});
