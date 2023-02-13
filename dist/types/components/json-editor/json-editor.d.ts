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
 * Encapsulates the Monaco Editor (https://microsoft.github.io/monaco-editor/) into a
 * web component for JSON content. Note that the app's HTML must include the editor because
 * it lives in the global space.
 *
 * Attributes:
 * `hasErrors`: Flag indicating if the JSON currently contained in the editor has errors
 * `instanceid`: id of component (required if there are multiple instances of the component)
 * `value`: Initial content of editor
 *
 * Methods:
 * `getEditorContents`: Gets the contents of the editor.
 * `replaceCurrentSelection`: Replaces the current selection with the supplied text, inserting if nothing is selected.
 * `reset`: Resets the contents of the editor with the current `value`.
 *
 * @example
 *   <script src="./libs/require.js"></script>
 *   <script src="./monacoConfig.js"></script>
 *   <script>
 *     require.config({
 *       "paths": {
 *         "vs": "./libs/monaco-editor"
 *       }
 *     });
 *     require(["vs/editor/editor.main"], function () {
 *     });
 *   </script>
 *
 * @example
 *   <json-editor
 *     instanceid="a1f271c0de554604beed2adc1f244be1"
 *     value="{\"id\": \"12345\"}"
 *   ></json-editor>
*/
import { VNode } from '../../stencil-public-runtime';
import JsonEditor_T9n from '../../assets/t9n/json-editor/resources.json';
export declare class JsonEditor {
  el: HTMLJsonEditorElement;
  /**
   * Contains a public value to indicate if the model has any changes.
   */
  hasChanges: boolean;
  /**
   * Contains a public value to indicate if the model has any errors
   * that would prevent saving it.
   */
  hasErrors: boolean;
  /**
   * Contains a unique identifier for when we have multiple instances of the editor.
   * For example when we want to show an item's data as well as an item's properties.
   */
  instanceid: any;
  /**
   * Contains the public value for this component; it is not changed by the editor.
   * When changed, the change overwrites the contents of the editor.
   */
  value: any;
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): void;
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  componentWillLoad(): Promise<void>;
  /**
   * Renders the component.
   */
  render(): VNode;
  protected _cancelEditsBtnHandler: any;
  protected _contentChanged: any;
  protected _currentModel: any;
  protected _diffEditor: any;
  protected _editor: any;
  protected _loaded: boolean;
  protected _searchBtnHandler: any;
  protected _translations: typeof JsonEditor_T9n;
  protected _useDiffEditor: boolean;
  protected _valueObserver: MutationObserver;
  /**
   * Gets the contents of the editor.
   *
   * @returns Promise resolving with the current contents of the editor
   */
  getEditorContents(): Promise<any>;
  /**
   * Frees the editor events and memory; to be called when the web component is no longer needed.
   *
   * Because the component lifecycle doesn't include an "onDestroy" event
   * (@see https://stenciljs.com/docs/component-lifecycle#disconnectedcallback)
   * and TypeScript/JavaScript does automatic garbage collection without a callback
   * hook until ES2021
   * (@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry),
   * this cleanup call needs to be called manually.
   */
  prepareForDeletion(): Promise<void>;
  /**
   * Replaces the current selection with the supplied text, inserting if nothing is selected.
   *
   * @param replacement Text to use for replacement or insertion
   * @returns Promise resolving when function is done
   */
  replaceCurrentSelection(replacement: string): Promise<any>;
  /**
   * Resets the contents of the editor with the current `value`.
   *
   * @returns Promise resolving when function is done
   */
  reset(): Promise<any>;
  /**
   * Disables a button.
   *
   * @param buttonId Id of button to disable
   *
    * @protected
   */
  protected _disableButton(buttonId: string): void;
  /**
   * Enables a button.
   *
   * @param buttonId Id of button to enable
   *
   * @protected
   */
  protected _enableButton(buttonId: string): void;
  /**
   * Dispatches an event that the editor's content has changed.
   *
   * @protected
   */
  protected _flagEditorContentChanged(): void;
  /**
   * Sets the editor's flag indicating if it has changes and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasChanges Current state of change in the editor; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  protected _flagEditorHasChanges(flagHasChanges: boolean): void;
  /**
   * Sets the editor's flag indicating if it has errors and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasErrors Current state of errors in the editor; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  protected _flagEditorHasErrors(flagHasErrors: boolean): void;
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected _getTranslations(): Promise<void>;
  /**
   * Initializes the observer that will monitor and respond to changes of the value.
   *
   * @protected
   */
  protected _initValueObserver(): void;
  /**
   * Handles activites appropriate to changes in the editor.
   *
   * @protected
   */
  protected _onEditorChange(): void;
  /**
   * Redoes the previous edit operation.
   *
   * @protected
   */
  protected _redo(): void;
  /**
   * Resets the stored model to the original value.
   *
   * @protected
   */
  protected _reset(): void;
  /**
   * Handles click on "Search" button.
   *
   * @protected
   */
  protected _search(): void;
  /**
   * Sets the models for the diff editor.
   *
   * @protected
   */
  protected _setDiffModel(): void;
  /**
   * Shows/Hides the appropriate editor: regular or diff.
   *
   * @protected
   */
  protected _toggleEditor(): void;
  /**
   * Toggles the undo and redo buttons.
   *
   * @protected
   */
  protected _toggleUndoRedo(): void;
  /**
   * Undoes the current edit operation.
   *
   * @protected
   */
  protected _undo(): void;
}
