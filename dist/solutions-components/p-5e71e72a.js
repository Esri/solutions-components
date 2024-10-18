/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import './p-d0d020a5.js';
import './p-7530a02f.js';
import './p-80cb7c73.js';

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
/**
 * Get an array from a list of nodes
 *
 * @param nodeList list of nodes
 *
 * @returns array of nodes
 */
function nodeListToArray(nodeList) {
    return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
}

export { nodeListToArray as n };
