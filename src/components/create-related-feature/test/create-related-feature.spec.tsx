import { newSpecPage } from '@stencil/core/testing';
import { CreateRelatedFeature } from '../create-related-feature';

xdescribe('create-related-feature', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CreateRelatedFeature],
      html: `<create-related-feature></create-related-feature>`,
    });
    expect(page.root).toEqualHtml(`
      <create-related-feature>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </create-related-feature>
    `);
  });
});
