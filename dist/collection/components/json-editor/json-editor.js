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
        return (h(Host, { key: '0c7531c8c816eb9be80d357b19b568ccdb22c407' }, h("div", { key: '866f82b68c2a750edfc80d801e4ea95a3f655100', id: `${this.instanceid}-editor-container`, class: "editor-container padding-right" }, h("div", { key: '5b9f15641f6a26daeb3847d8ef75c76b8be44fc5', class: "editor-controls" }, h("div", { key: 'd1e91eaa242ccd23d5dc1386b6a58d2fafeb4083', class: "editor-buttons" }, h("calcite-icon", { key: 'd9364f7dfdbc22a414b4711c8a22e145b533998e', id: `${this.instanceid}-errorFlag`, icon: "exclamation-mark-triangle", title: this._translations.errorFlag, scale: "s", class: "edit-error-flag" }), h("calcite-button", { key: '29750fc7cedf1f9caf556df3ff84dc45d6b922b9', id: `${this.instanceid}-undo`, color: "blue", appearance: "solid", title: this._translations.undo, onClick: () => this._undo(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: 'c95008b3fccb8bc33f01eb1bd204c84141850981', icon: "undo", scale: "s" })), h("calcite-button", { key: '49ac9ee70c58954f6dee34524f4c7ab6fa0d7a49', id: `${this.instanceid}-redo`, color: "blue", appearance: "solid", title: this._translations.redo, onClick: () => this._redo(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '2170c36d0fd236c989222991353324d50afa8ac0', icon: "redo", scale: "s" })), h("calcite-button", { key: 'c6e1a0f84fac6fb02d2590cc7b32aefffbc06d25', id: `${this.instanceid}-diff`, color: "blue", appearance: "solid", title: this._translations.diff, onClick: () => this._toggleEditor(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '88443cfd2a8888447acc75588ecff7938ade5273', icon: "compare", scale: "s" })), h("calcite-button", { key: '42dcd8f63600d4ddb77eaedd529321999cf537b3', id: `${this.instanceid}-search`, appearance: "outline", color: "blue", title: this._translations.search, onClick: () => this._search(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '31e8ced3f14f1475c62133fbd7730e34b2bc4028', icon: "search", scale: "s" })), h("calcite-button", { key: '769b268d7476f3fe1a8623e9432cfae56602db0c', id: `${this.instanceid}-reset`, color: "blue", appearance: "solid", disabled: true, title: this._translations.cancelEdits, onClick: () => this._reset(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '4a8ead1dbf8fefe8b4106a0f6f9c42fb5b875cd2', icon: "reset", scale: "s" })))), h("div", { key: '98f29030a0fa0ecbce0d165840a30edd655ba249', class: "edit-parent" }, h("div", { key: '1441e32a184bc24f2a0a25fcb855c41b40bd0cec', id: `${this.instanceid}-container`, class: "json-edit-container" }), h("div", { key: 'f0cf0a3bd11d3f8102c4cc8695ac1743bac36bbb', id: `${this.instanceid}-diff-container`, class: "json-edit-container display-none" })))));
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
