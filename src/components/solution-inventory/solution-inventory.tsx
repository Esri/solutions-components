import { Component, Host, h, VNode } from '@stencil/core';
import "@esri/calcite-components";

@Component({
  tag: 'solution-inventory',
  styleUrl: 'solution-inventory.css',
  shadow: false,
})
export class SolutionInventory {

  render(): VNode {
    return (
      <Host>
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
      </Host>
    );
  }

}
