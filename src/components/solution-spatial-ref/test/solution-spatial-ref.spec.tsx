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
        <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-switch"></calcite-switch>Spatial Reference Parameter</label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>Default Spatial Reference<label id="item-description-label" class="spatial-ref-default"><calcite-input id="item-description"></calcite-input></label></calcite-label>
          <label class="spatial-ref-current">WGS 1984 Web Mercator Auxiliary Sphere (102100)</label>
          <label class="spatial-ref-item-title">Feature Services</label>
          <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 1</label>
          <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 2</label>
        </div>
      </solution-spatial-ref>
    `);
  });
});
