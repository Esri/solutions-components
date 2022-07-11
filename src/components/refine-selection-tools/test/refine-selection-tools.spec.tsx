import { newSpecPage } from '@stencil/core/testing';
import { RefineSelectionTools } from '../refine-selection-tools';

describe('refine-selection-tools', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RefineSelectionTools],
      html: `<refine-selection-tools></refine-selection-tools>`,
    });
    expect(page.root).toEqualHtml(`
      <refine-selection-tools>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </refine-selection-tools>
    `);
  });
});
