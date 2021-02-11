import { newSpecPage } from '@stencil/core/testing';
import { SolutionSpatialRef } from '../solution-spatial-ref';

describe('solution-spatial-ref', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionSpatialRef],
      html: `<solution-spatial-ref></solution-spatial-ref>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-spatial-ref>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </solution-spatial-ref>
    `);
  });
});
