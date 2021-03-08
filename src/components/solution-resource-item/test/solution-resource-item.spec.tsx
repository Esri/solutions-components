import { newSpecPage } from '@stencil/core/testing';
import { SolutionResourceItem } from '../solution-resource-item';

describe('solution-resource-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionResourceItem],
      html: `<solution-resource-item></solution-resource-item>`,
    });
    expect(page.root).toEqualHtml(`
    <solution-resource-item>
      <mock:shadow-root>
        <div class="resource-item">
          <input accept=".zip" class="display-none" type="file">
          <a class="display-none" download="" href=""></a>
          <calcite-label>
            Survey.zip
          </calcite-label>
          <calcite-button appearance="solid" class="resource-button" color="blue" icon-start="download" scale="m">
            Download
          </calcite-button>
          <calcite-button appearance="solid" class="resource-button" color="blue" icon-start="upload" scale="m">
            Update
          </calcite-button>
        </div>
      </mock:shadow-root>
    </solution-resource-item>
    `);
  });
});
