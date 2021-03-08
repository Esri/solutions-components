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
      <div class="solution-data-container">
        <calcite-shell dir="ltr" theme="light">
          <calcite-shell-center-row class="json-editor" height-scale="l" position="start" slot="center-row" width-scale="l">
            <div class="solution-data-child-container">
              <span id="json-editor-span">
                JSON Editor goes
              </span>
            </div>
          </calcite-shell-center-row>
          <calcite-shell-panel height-scale="l" position="start" slot="contextual-panel" width-scale="m">
            <div class="solution-data-child-container">
              <solution-organization-variables></solution-organization-variables>
              <solution-variables></solution-variables>
            </div>
          </calcite-shell-panel>
        </calcite-shell>
      </div>
    </solution-template-data>
    `);
  });
});
