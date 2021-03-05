import { newSpecPage } from '@stencil/core/testing';
import { SolutionTemplateData } from '../solution-template-data';

describe('solution-template-data', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionTemplateData],
      html: `<solution-template-data></solution-template-data>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-template-data>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-template-data>
    `);
  });
});
