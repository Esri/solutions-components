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

import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'map-layer-picker',
  styleUrl: 'map-layer-picker.css',
  shadow: true,
})
export class MapLayerPicker {

  render() {
    return (
      <Host>
        <calcite-combobox label="Addresses Layer">
          <calcite-combobox-item textLabel="Layer 1" value="Layer 1"/>
          <calcite-combobox-item textLabel="Layer 2" value="Layer 2"/>
          <calcite-combobox-item textLabel="Layer 3" value="Layer 3"/>
          <calcite-combobox-item textLabel="Layer 4" value="Layer 4"/>
        </calcite-combobox>
      </Host>
    );
  }

}
