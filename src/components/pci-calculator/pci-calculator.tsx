/** @license
 * Copyright 2022 Esri
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

// This is a demo component for internal use only.
// It may eventually live somewhere else and doesn't really need to be a component.
// The main code will be whats in the supporting util file...it will be used by a survey123 form.
// It has been requested that we have a simple way to demo and test the functionality.
// I am putting here now just to keep together with other current work.

import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'pci-calculator',
  styleUrl: 'pci-calculator.css',
  shadow: true,
})
export class PciCalculator {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
