import { newSpecPage } from '@stencil/core/testing';
import { FeatureDetails } from '../feature-details';

xdescribe('feature-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FeatureDetails],
      html: `<feature-details></feature-details>`,
    });
    expect(page.root).toEqualHtml(`
      <feature-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </feature-details>
    `);
  });
});
