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

import { Component, Element, Host, h, Method, Prop } from '@stencil/core';
import JsonEditor_T9n from '../../assets/t9n/json-editor/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'json-editor',
  styleUrl: 'json-editor.scss',
  shadow: false,
  assetsDirs: ['assets']
})
export class JsonEditor {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLJsonEditorElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains a public value to indicate if the model has any errors
   * that would prevent saving it.
   */
  @Prop({ mutable: true, reflect: true }) hasErrors: boolean = false;

  /**
   * Contains a unique identifier for when we have multiple instances of the editor.
   * For example when we want to show an item's data as well as an item's properties.
   */
  @Prop({ mutable: true, reflect: true }) instanceid: any = "";

  /**
   * Contains the public value for this component; it is not changed by the editor.
   * When changed, the change overwrites the contents of the editor.
   */
  @Prop({ mutable: true, reflect: true }) value: any = "";

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad() {
    const editorContainer = document.getElementById(`${this.instanceid}-container`);
    if (editorContainer) {
      this._editor = monaco.editor.create(
        editorContainer,
        {
          value: this.value,
          language: "json",
          theme: "vs",
          minimap: {
            enabled: false
          },
          automaticLayout: true,
          scrollBeyondLastLine: false
        }
      );

      this._currentModel = this._editor.getModel();

      this._contentChanged = this._currentModel.onDidChangeContent(this._onEditorChange.bind(this));

      // Intercept the monaco function call that shows error markers to see if our content has errors
      const setModelMarkers = monaco.editor.setModelMarkers;
      const self = this;
      monaco.editor.setModelMarkers = function(model, owner, markers) {
        // Update the error flag if this call was for our model
        if (model.id === self._currentModel.id) {
          self.hasErrors = markers.length > 0;
          const errorFlag = document.getElementById(`${self.instanceid}-errorFlag`);

          // Show the error flag if there are errors
          errorFlag.style.visibility = self.hasErrors ? "visible" : "hidden";
        }

        // Pass on the call to the next editor in a chain of intercepts or, finally, to monaco
        setModelMarkers.call(monaco.editor, model, owner, markers);
      }

      this._diffEditor = monaco.editor.createDiffEditor(document.getElementById(`${this.instanceid}-diff-container`), {
        automaticLayout: true
      });
      this._setDiffModel();

      this._loaded = true;

      this._toggleUndoRedo();
    }
  }

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    this._initValueObserver();
    await this._getTranslations();
    return;
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        <div id={`${this.instanceid}-editor-container`} class="editor-container padding-right">
          <div class="editor-controls">
            <div class="editor-buttons">
              {/* errors flag */}
              <calcite-icon
                id={`${this.instanceid}-errorFlag`}
                icon="exclamation-mark-triangle"
                title={this._translations.errorFlag}
                scale="s"
                class="edit-error-flag"
              ></calcite-icon>
              {/* undo */}
              <calcite-button
                id={`${this.instanceid}-undo`}
                color="blue"
                appearance="solid"
                title={this._translations.undo}
                onClick={() => this._undo()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="undo" scale="s"></calcite-icon>
              </calcite-button>
              {/* redo */}
              <calcite-button
                id={`${this.instanceid}-redo`}
                color="blue"
                appearance="solid"
                title={this._translations.redo}
                onClick={() => this._redo()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="redo" scale="s"></calcite-icon>
              </calcite-button>
              {/* diff */}
              <calcite-button
                id={`${this.instanceid}-diff`}
                color="blue"
                appearance="solid"
                title={this._translations.diff}
                onClick={() => this._toggleEditor()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="compare" scale="s"></calcite-icon>
              </calcite-button>
              {/* search */}
              <calcite-button
                id={`${this.instanceid}-search`}
                appearance="outline"
                color="blue"
                title={this._translations.search}
                onClick={() => this._search()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="search" scale="s"></calcite-icon>
              </calcite-button>
              {/* cancel */}
              <calcite-button
                id={`${this.instanceid}-reset`}
                color="blue"
                appearance="solid"
                disabled
                title={this._translations.cancelEdits}
                onClick={() => this._reset()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="reset" scale="s"></calcite-icon>
              </calcite-button>
            </div>
          </div>
          <div class="edit-parent">
            <div id={`${this.instanceid}-container`} class="json-edit-container"></div>
            <div id={`${this.instanceid}-diff-container`} class="json-edit-container display-none"></div>
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  private _cancelEditsBtnHandler: any;
  private _contentChanged: any;
  private _currentModel: any;
  private _diffEditor: any;
  private _editor: any;
  private _loaded: boolean = false;
  private _searchBtnHandler: any;
  private _translations: typeof JsonEditor_T9n;
  private _useDiffEditor: boolean = false;
  private _valueObserver: MutationObserver;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  /**
   * Gets the contents of the editor.
   *
   * @returns Promise resolving with the current contents of the editor
   */
  @Method()
  async getEditorContents(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        const currentValue = this._currentModel.getValue();
        resolve(currentValue);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Replaces the current selection with the supplied text, inserting if nothing is selected.
   *
   * @param replacement Text to use for replacement or insertion
   * @returns Promise resolving when function is done
   */
  @Method()
  async replaceCurrentSelection(
    replacement: string
  ): Promise<any> {
    const currentSelection = this._editor.getSelection();
    this._editor.executeEdits("", [
     { range: currentSelection, text: replacement }
    ]);
  }

  /**
   * Resets the contents of the editor with the current `value`.
   *
   * @returns Promise resolving when function is done
   */
  @Method()
  async reset(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this._reset();
        resolve({ success: true });
      } catch (e) {
        reject(e);
      }
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Frees the editor events and memory when the web component is disconnected.
   *
   * @protected
   */
   protected _destroyEditor(): void {
    this._searchBtnHandler?.removeEventListener("click", this._search);
    this._cancelEditsBtnHandler?.removeEventListener("click", this._reset);

    this._valueObserver?.disconnect();

    this._contentChanged?.dispose();

    this._editor?.dispose();
  }

  /**
   * Disables a button.
   *
   * @param buttonId Id of button to disable
   *
    * @protected
   */
   protected _disableButton(buttonId: string): void {
    document.getElementById(buttonId)?.setAttribute("disabled", "");
  }

  /**
   * Enables a button.
   *
   * @param buttonId Id of button to enable
   *
   * @protected
   */
  _enableButton(buttonId: string): void {
    document.getElementById(buttonId)?.removeAttribute("disabled");
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof JsonEditor_T9n;
  }

  /**
   * Initializes the observer that will monitor and respond to changes of the value.
   *
   * @protected
   */
   protected _initValueObserver() {
    this._valueObserver = new MutationObserver(ml => {
      ml.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === "value") {
          const newValue: string = mutation.target[mutation.attributeName];
          if ((newValue !== mutation.oldValue && this._loaded)) {
            this._currentModel.setValue(this.value);
          }
        }
      });
    });
    this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }

  /**
   * Updates the undo redo buttons as necessary.
   *
   * @protected
   */
   protected _onEditorChange(): void {
    this._toggleUndoRedo();
  }

  /**
   * Redoes the previous edit operation.
   *
   * @protected
   */
   protected _redo(): void {
    if (this._currentModel?.canRedo()) {
      this._currentModel.redo();
      this._toggleUndoRedo();
    }
  }

  /**
   * Resets the stored model to the original value.
   *
   * @protected
   */
   protected _reset(): void {
    // Restore the original value
    this._currentModel.setValue(this.value);

    // update the ui
    this._toggleUndoRedo();
  }

  /**
   * Handles click on "Search" button.
   *
   * @protected
   */
   protected _search(): void {
    this._editor.trigger('toggleFind', 'actions.find');
  }

  /**
   * Sets the models for the diff editor.
   *
   * @protected
   */
   protected _setDiffModel(): void {
    if (this._diffEditor) {
      this._diffEditor.setModel({
        original: monaco.editor.createModel(this.value, "json"),
        modified: this._editor.getModel()
      });
    }
  }

  /**
   * Shows/Hides the appropriate editor: regular or diff.
   *
   * @protected
   */
   protected _toggleEditor(): void {
    this._useDiffEditor = !this._useDiffEditor;
    let diffContainer = document.getElementById(`${this.instanceid}-diff-container`);
    let container = document.getElementById(`${this.instanceid}-container`);
    if (this._useDiffEditor) {
      this._setDiffModel();
      diffContainer.classList.remove("display-none");
      container.classList.add("display-none");
    } else {
      diffContainer.classList.add("display-none");
      container.classList.remove("display-none");
    }
  }

  /**
   * Toggles the undo and redo buttons.
   *
   * @protected
   */
   protected _toggleUndoRedo(): void {
    if (this._currentModel?.canUndo()) {
      this._enableButton(`${this.instanceid}-undo`);
    } else {
      this._disableButton(`${this.instanceid}-undo`);
    }

    if (this._currentModel?.canRedo()) {
      this._enableButton(`${this.instanceid}-redo`);
    } else {
      this._disableButton(`${this.instanceid}-redo`);
    }

    if (this._currentModel?.canUndo() || this._currentModel?.canRedo()) {
      this._enableButton(`${this.instanceid}-reset`);
    } else {
      this._disableButton(`${this.instanceid}-reset`);
    }
  }

  /**
   * Undoes the current edit operation.
   *
   * @protected
   */
   protected _undo(): void {
    if (this._currentModel?.canUndo()) {
      this._currentModel.undo();
      this._toggleUndoRedo();
    }
  }

}
