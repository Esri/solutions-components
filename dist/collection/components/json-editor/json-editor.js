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
import { Host, h } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
export class JsonEditor {
    constructor() {
        this.hasChanges = false;
        this.hasErrors = false;
        this.instanceid = "";
        this.value = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
                // If this call was for our model, it acts like an onEditorChange event
                // but gives us access to the error state as well
                if (model.id === self._currentModel.id) {
                    // Set the error state & dispatch event if state has changed
                    self._flagEditorHasErrors(markers.length > 0);
                    // Set the changed state & dispatch event if state has changed, but only if there are no errors
                    if (!self.hasErrors) {
                        self._flagEditorHasChanges(self._currentModel?.canUndo());
                        if (self._currentModel?.canUndo()) {
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
        return (h(Host, { key: '01ac5edcc26e82397316e8a01229a3d27d6902af' }, h("div", { key: '87e015e58f6a1822ba202f660655078b7f7c1a8c', id: `${this.instanceid}-editor-container`, class: "editor-container padding-right" }, h("div", { key: '90d98682605a514797da3dc11a9f68dad336759b', class: "editor-controls" }, h("div", { key: 'c5eca5a9750d8f010ce9d749cfe7529a0b5c95c6', class: "editor-buttons" }, h("calcite-icon", { key: '5cdea0dc714261c6fa454d43c5fd3ba3902d9eac', id: `${this.instanceid}-errorFlag`, icon: "exclamation-mark-triangle", title: this._translations.errorFlag, scale: "s", class: "edit-error-flag" }), h("calcite-button", { key: 'e7f8e33c62c98a887b06bf20d5a718849f1455c6', id: `${this.instanceid}-undo`, color: "blue", appearance: "solid", title: this._translations.undo, onClick: () => this._undo(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: 'fb3e4ea4d2120bd2fce4541c6c90b1d16fe7da2f', icon: "undo", scale: "s" })), h("calcite-button", { key: 'ba214ef0fa2d27d4334dd4b10d7bf15c35b49407', id: `${this.instanceid}-redo`, color: "blue", appearance: "solid", title: this._translations.redo, onClick: () => this._redo(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: 'da359a0692ff1dd777588ab657f2520ca62eeb93', icon: "redo", scale: "s" })), h("calcite-button", { key: '569955fc77faf069f66b3c7376973822cc17f038', id: `${this.instanceid}-diff`, color: "blue", appearance: "solid", title: this._translations.diff, onClick: () => this._toggleEditor(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: 'e477c4ae6d3b2cda3bdcc56660739ffab9b271c1', icon: "compare", scale: "s" })), h("calcite-button", { key: 'a691eb75c7487c6b401f4d35a4e7e8ac84e0d8f9', id: `${this.instanceid}-search`, appearance: "outline", color: "blue", title: this._translations.search, onClick: () => this._search(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '7a0cc6c45b49fb6db3963e7325291dd36dbc95ac', icon: "search", scale: "s" })), h("calcite-button", { key: '1ac31fcbb93e38aff565559174b45a5ef286dc01', id: `${this.instanceid}-reset`, color: "blue", appearance: "solid", disabled: true, title: this._translations.cancelEdits, onClick: () => this._reset(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: 'abcc13ccb46312d8169196af5336bf8d25882ac8', icon: "reset", scale: "s" })))), h("div", { key: 'd70a08eec3c817a38dafb6ed15085efbc3aed090', class: "edit-parent" }, h("div", { key: '6cdec935e00ba08af533c7b2ca565f9a6fefc268', id: `${this.instanceid}-container`, class: "json-edit-container" }), h("div", { key: '1611a95a808ba19133d4c3d5bec6def362771746', id: `${this.instanceid}-diff-container`, class: "json-edit-container display-none" })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    _cancelEditsBtnHandler;
    _contentChanged;
    _currentModel;
    _diffEditor;
    _editor;
    _loaded = false;
    _searchBtnHandler;
    _translations;
    _useDiffEditor = false;
    _valueObserver;
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
        this._searchBtnHandler?.removeEventListener("click", this._search);
        this._cancelEditsBtnHandler?.removeEventListener("click", this._reset);
        this._valueObserver?.disconnect();
        this._contentChanged?.dispose();
        this._editor?.dispose();
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
        document.getElementById(buttonId)?.setAttribute("disabled", "");
    }
    /**
     * Enables a button.
     *
     * @param buttonId Id of button to enable
     *
     * @protected
     */
    _enableButton(buttonId) {
        document.getElementById(buttonId)?.removeAttribute("disabled");
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
        if (this._currentModel?.canUndo()) {
            this._enableButton(`${this.instanceid}-undo`);
        }
        else {
            this._disableButton(`${this.instanceid}-undo`);
        }
        if (this._currentModel?.canRedo()) {
            this._enableButton(`${this.instanceid}-redo`);
        }
        else {
            this._disableButton(`${this.instanceid}-redo`);
        }
        if (this._currentModel?.canUndo() || this._currentModel?.canRedo()) {
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
        if (this._currentModel?.canUndo()) {
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
                            "location": "global",
                            "id": "global::Promise"
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
                            "location": "global",
                            "id": "global::Promise"
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
                            "name": "replacement",
                            "type": "string",
                            "docs": "Text to use for replacement or insertion"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
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
                            "location": "global",
                            "id": "global::Promise"
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
