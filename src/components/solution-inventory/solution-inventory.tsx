/** @license
 * Copyright 2021 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Host, h, VNode } from '@stencil/core';
import "@esri/calcite-components";

@Component({
  tag: 'solution-inventory',
  styleUrl: 'solution-inventory.css',
  shadow: false
})
export class SolutionInventory {

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
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
