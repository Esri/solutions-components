import { newSpecPage } from '@stencil/core/testing';
import { SolutionInventory } from '../solution-inventory';

describe('solution-inventory', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SolutionInventory],
      html: `<solution-inventory></solution-inventory>`,
    });
    expect(page.root).toEqualHtml(`
      <solution-inventory>
        <calcite-tree>

          <calcite-tree-item><a>Dashboard 1</a>
            <calcite-tree slot="children">
              <calcite-tree-item><a><i>dependencies</i></a></calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item><a>Dashboard 2</a>
            <calcite-tree slot="children">
              <calcite-tree-item><a>Map 1</a>
                <calcite-tree slot="children">
                  <calcite-tree-item><a>View 1</a>
                    <calcite-tree slot="children">
                      <calcite-tree-item><a>Feature Service 1</a></calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item><a>Application 1</a>
            <calcite-tree slot="children">
              <calcite-tree-item><a>Group 1</a>
                <calcite-tree slot="children">
                  <calcite-tree-item><a>Map 2</a>
                    <calcite-tree slot="children">
                      <calcite-tree-item><a>Feature Service 2</a></calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item><a>Notebook 1</a>
            <calcite-tree slot="children">
              <calcite-tree-item><a><i>dependencies</i></a></calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

          <calcite-tree-item><a>Survey 1</a>
            <calcite-tree slot="children">
              <calcite-tree-item><a><i>dependencies</i></a></calcite-tree-item>
            </calcite-tree>
          </calcite-tree-item>

        </calcite-tree>
      </solution-inventory>
    `);
  });
});
