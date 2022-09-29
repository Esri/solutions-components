import { newSpecPage } from '@stencil/core/testing';
import { RefineSelection } from '../refine-selection';

describe('refine-selection', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RefineSelection],
      html: `<refine-selection></refine-selection>`,
    });
    expect(page.root).toEqualHtml(`
      <refine-selection>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </refine-selection>
    `);
  });
});
