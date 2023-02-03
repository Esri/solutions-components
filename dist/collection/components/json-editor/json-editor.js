/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { Host, h } from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
export class JsonEditor {
  constructor() {
    this._loaded = false;
    this._useDiffEditor = false;
    this.hasChanges = false;
    this.hasErrors = false;
    this.instanceid = "";
    this.value = "";
  }
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
      this._editor = monaco.editor.create(editorContainer, {
        value: this.value,
        language: "json",
        theme: "vs",
        minimap: {
          enabled: false
        },
        automaticLayout: true,
        scrollBeyondLastLine: false
      });
      this._currentModel = this._editor.getModel();
      this._contentChanged = this._currentModel.onDidChangeContent(this._onEditorChange.bind(this));
      // Intercept the monaco function call that shows error markers to see if our content has errors
      const setModelMarkers = monaco.editor.setModelMarkers;
      const self = this;
      monaco.editor.setModelMarkers = function (model, owner, markers) {
        var _a, _b;
        // If this call was for our model, it acts like an onEditorChange event
        // but gives us access to the error state as well
        if (model.id === self._currentModel.id) {
          // Set the error state & dispatch event if state has changed
          self._flagEditorHasErrors(markers.length > 0);
          // Set the changed state & dispatch event if state has changed, but only if there are no errors
          if (!self.hasErrors) {
            self._flagEditorHasChanges((_a = self._currentModel) === null || _a === void 0 ? void 0 : _a.canUndo());
            if ((_b = self._currentModel) === null || _b === void 0 ? void 0 : _b.canUndo()) {
              self._flagEditorContentChanged();
            }
          }
          // Show the error flag if there are errors
          const errorFlag = document.getElementById(`${self.instanceid}-errorFlag`);
          errorFlag.style.visibility = self.hasErrors ? "visible" : "hidden";
        }
        // Pass on the call to the next editor in a chain of intercepts or, finally, to monaco
        setModelMarkers.call(monaco.editor, model, owner, markers);
      };
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
  async componentWillLoad() {
    this._initValueObserver();
    await this._getTranslations();
    return;
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { id: `${this.instanceid}-editor-container`, class: "editor-container padding-right" }, h("div", { class: "editor-controls" }, h("div", { class: "editor-buttons" }, h("calcite-icon", { id: `${this.instanceid}-errorFlag`, icon: "exclamation-mark-triangle", title: this._translations.errorFlag, scale: "s", class: "edit-error-flag" }), h("calcite-button", { id: `${this.instanceid}-undo`, color: "blue", appearance: "solid", title: this._translations.undo, onClick: () => this._undo(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "undo", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-redo`, color: "blue", appearance: "solid", title: this._translations.redo, onClick: () => this._redo(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "redo", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-diff`, color: "blue", appearance: "solid", title: this._translations.diff, onClick: () => this._toggleEditor(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "compare", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-search`, appearance: "outline", color: "blue", title: this._translations.search, onClick: () => this._search(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "search", scale: "s" })), h("calcite-button", { id: `${this.instanceid}-reset`, color: "blue", appearance: "solid", disabled: true, title: this._translations.cancelEdits, onClick: () => this._reset(), scale: "s", class: "edit-button" }, h("calcite-icon", { icon: "reset", scale: "s" })))), h("div", { class: "edit-parent" }, h("div", { id: `${this.instanceid}-container`, class: "json-edit-container" }), h("div", { id: `${this.instanceid}-diff-container`, class: "json-edit-container display-none" })))));
  }
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
  async getEditorContents() {
    return new Promise((resolve, reject) => {
      try {
        const currentValue = this._currentModel.getValue();
        resolve(currentValue);
      }
      catch (e) {
        reject(e);
      }
    });
  }
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
  async prepareForDeletion() {
    var _a, _b, _c, _d, _e;
    (_a = this._searchBtnHandler) === null || _a === void 0 ? void 0 : _a.removeEventListener("click", this._search);
    (_b = this._cancelEditsBtnHandler) === null || _b === void 0 ? void 0 : _b.removeEventListener("click", this._reset);
    (_c = this._valueObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
    (_d = this._contentChanged) === null || _d === void 0 ? void 0 : _d.dispose();
    (_e = this._editor) === null || _e === void 0 ? void 0 : _e.dispose();
  }
  /**
   * Replaces the current selection with the supplied text, inserting if nothing is selected.
   *
   * @param replacement Text to use for replacement or insertion
   * @returns Promise resolving when function is done
   */
  async replaceCurrentSelection(replacement) {
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
  async reset() {
    return new Promise((resolve, reject) => {
      try {
        this._reset();
        resolve({ success: true });
      }
      catch (e) {
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
   * Disables a button.
   *
   * @param buttonId Id of button to disable
   *
    * @protected
   */
  _disableButton(buttonId) {
    var _a;
    (_a = document.getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "");
  }
  /**
   * Enables a button.
   *
   * @param buttonId Id of button to enable
   *
   * @protected
   */
  _enableButton(buttonId) {
    var _a;
    (_a = document.getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
  }
  /**
   * Dispatches an event that the editor's content has changed.
   *
   * @protected
   */
  _flagEditorContentChanged() {
    // Event for notifying that the editor contents have changed
    window.dispatchEvent(new CustomEvent("solutionEditorContentChanged", {
      detail: {
        id: this.instanceid,
        contents: this._currentModel.getValue()
      },
      bubbles: true,
      cancelable: false,
      composed: true
    }));
  }
  /**
   * Sets the editor's flag indicating if it has changes and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasChanges Current state of change in the editor; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  _flagEditorHasChanges(flagHasChanges) {
    // Event for notifying if the editor has updated the value of its hasChanges property
    if (this.hasChanges !== flagHasChanges) {
      window.dispatchEvent(new CustomEvent("solutionEditorHasChanges", {
        detail: flagHasChanges,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
      this.hasChanges = flagHasChanges;
    }
  }
  /**
   * Sets the editor's flag indicating if it has errors and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasErrors Current state of errors in the editor; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  _flagEditorHasErrors(flagHasErrors) {
    // Event for notifying if the editor has updated the value of its hasErrors property
    if (this.hasErrors !== flagHasErrors) {
      window.dispatchEvent(new CustomEvent("solutionEditorHasErrors", {
        detail: flagHasErrors,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
      this.hasErrors = flagHasErrors;
    }
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  /**
   * Initializes the observer that will monitor and respond to changes of the value.
   *
   * @protected
   */
  _initValueObserver() {
    this._valueObserver = new MutationObserver(ml => {
      ml.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === "value") {
          const newValue = mutation.target[mutation.attributeName];
          if ((newValue !== mutation.oldValue && this._loaded)) {
            this._currentModel.setValue(this.value);
          }
        }
      });
    });
    this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }
  /**
   * Handles activites appropriate to changes in the editor.
   *
   * @protected
   */
  _onEditorChange() {
    // Note: we're not flagging that the editor has changes here because this event
    // arrives before the model markers event, which indicates errors. We don't want
    // to notify about changes if there are errors.
    this._toggleUndoRedo();
  }
  /**
   * Redoes the previous edit operation.
   *
   * @protected
   */
  _redo() {
    var _a;
    if ((_a = this._currentModel) === null || _a === void 0 ? void 0 : _a.canRedo()) {
      this._currentModel.redo();
      this._toggleUndoRedo();
    }
  }
  /**
   * Resets the stored model to the original value.
   *
   * @protected
   */
  _reset() {
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
  _search() {
    this._editor.trigger('toggleFind', 'actions.find');
  }
  /**
   * Sets the models for the diff editor.
   *
   * @protected
   */
  _setDiffModel() {
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
  _toggleEditor() {
    this._useDiffEditor = !this._useDiffEditor;
    let diffContainer = document.getElementById(`${this.instanceid}-diff-container`);
    let container = document.getElementById(`${this.instanceid}-container`);
    if (this._useDiffEditor) {
      this._setDiffModel();
      diffContainer.classList.remove("display-none");
      container.classList.add("display-none");
    }
    else {
      diffContainer.classList.add("display-none");
      container.classList.remove("display-none");
    }
  }
  /**
   * Toggles the undo and redo buttons.
   *
   * @protected
   */
  _toggleUndoRedo() {
    var _a, _b, _c, _d;
    if ((_a = this._currentModel) === null || _a === void 0 ? void 0 : _a.canUndo()) {
      this._enableButton(`${this.instanceid}-undo`);
    }
    else {
      this._disableButton(`${this.instanceid}-undo`);
    }
    if ((_b = this._currentModel) === null || _b === void 0 ? void 0 : _b.canRedo()) {
      this._enableButton(`${this.instanceid}-redo`);
    }
    else {
      this._disableButton(`${this.instanceid}-redo`);
    }
    if (((_c = this._currentModel) === null || _c === void 0 ? void 0 : _c.canUndo()) || ((_d = this._currentModel) === null || _d === void 0 ? void 0 : _d.canRedo())) {
      this._enableButton(`${this.instanceid}-reset`);
    }
    else {
      this._disableButton(`${this.instanceid}-reset`);
    }
  }
  /**
   * Undoes the current edit operation.
   *
   * @protected
   */
  _undo() {
    var _a;
    if ((_a = this._currentModel) === null || _a === void 0 ? void 0 : _a.canUndo()) {
      this._currentModel.undo();
      this._toggleUndoRedo();
    }
  }
  static get is() { return "json-editor"; }
  static get originalStyleUrls() {
    return {
      "$": ["json-editor.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["json-editor.css"]
    };
  }
  static get assetsDirs() { return ["assets"]; }
  static get properties() {
    return {
      "hasChanges": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains a public value to indicate if the model has any changes."
        },
        "attribute": "has-changes",
        "reflect": true,
        "defaultValue": "false"
      },
      "hasErrors": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains a public value to indicate if the model has any errors\r\nthat would prevent saving it."
        },
        "attribute": "has-errors",
        "reflect": true,
        "defaultValue": "false"
      },
      "instanceid": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains a unique identifier for when we have multiple instances of the editor.\r\nFor example when we want to show an item's data as well as an item's properties."
        },
        "attribute": "instanceid",
        "reflect": true,
        "defaultValue": "\"\""
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the public value for this component; it is not changed by the editor.\r\nWhen changed, the change overwrites the contents of the editor."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "\"\""
      }
    };
  }
  static get methods() {
    return {
      "getEditorContents": {
        "complexType": {
          "signature": "() => Promise<any>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "Gets the contents of the editor.",
          "tags": [{
              "name": "returns",
              "text": "Promise resolving with the current contents of the editor"
            }]
        }
      },
      "prepareForDeletion": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Frees the editor events and memory; to be called when the web component is no longer needed.\r\n\r\nBecause the component lifecycle doesn't include an \"onDestroy\" event\r\n(@see https://stenciljs.com/docs/component-lifecycle#disconnectedcallback)\r\nand TypeScript/JavaScript does automatic garbage collection without a callback\r\nhook until ES2021\r\n(@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry),\r\nthis cleanup call needs to be called manually.",
          "tags": []
        }
      },
      "replaceCurrentSelection": {
        "complexType": {
          "signature": "(replacement: string) => Promise<any>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "replacement Text to use for replacement or insertion"
                }],
              "text": "Text to use for replacement or insertion"
            }],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "Replaces the current selection with the supplied text, inserting if nothing is selected.",
          "tags": [{
              "name": "param",
              "text": "replacement Text to use for replacement or insertion"
            }, {
              "name": "returns",
              "text": "Promise resolving when function is done"
            }]
        }
      },
      "reset": {
        "complexType": {
          "signature": "() => Promise<any>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "Resets the contents of the editor with the current `value`.",
          "tags": [{
              "name": "returns",
              "text": "Promise resolving when function is done"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
