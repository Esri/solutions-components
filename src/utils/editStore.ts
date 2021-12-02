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

import { createStore } from "@stencil/store";

// eslint-disable-next-line @typescript-eslint/unbound-method
const { state, onChange, dispose } = createStore({
  models: {},
  featureServices: [],
  spatialReferenceInfo: {},
  dispose: () => dispose()
});

const modelsChangedEvent = new CustomEvent("modelsChanged", {
  bubbles: true,
  cancelable: false,
  composed: true
});

onChange('models', () => {
  dispatchEvent(modelsChangedEvent);
});

export default state;
