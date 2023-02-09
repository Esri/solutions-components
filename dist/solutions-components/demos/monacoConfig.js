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
    
// Set config for loading the Monaco editor
const requireConfig = { paths: { vs: '../assets/monaco-editor/min/vs' } };
const availableEditorLangs = "de|es|fr|it|ja|js|ko|ru|zh-cn|zh-tw";
if (availableEditorLangs.indexOf(locale) >= 0) {
  requireConfig['vs/nls'] = { availableLanguages: { '*': locale } };
} else if (availableEditorLangs.indexOf(lang) >= 0) {
  requireConfig['vs/nls'] = { availableLanguages: { '*': lang } };
}
require.config(requireConfig);
