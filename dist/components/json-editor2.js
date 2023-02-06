/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './button.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './loader.js';

const jsonEditorCss = ":host{display:block;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}:host-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}:host-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}:host-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}:host-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}:host-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}:host-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}:host-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}:host-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>:host{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>:host{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>:host{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>:host{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>:host{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>:host{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>:host{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>:host{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:normal}.code-face :host b,.code-face :host strong{font-weight:400}.code-italic :host{letter-spacing:0em;font-family:\"Consolas\", \"Andale Mono\", \"Lucida Console\", \"Monaco\", monospace;font-weight:400;font-style:italic}.code-italic :host b,.code-italic :host strong{font-weight:400}.editor-container{position:relative;height:100%}.editor-controls{height:2.75rem;padding-right:0.5rem;background-color:#F4F4F4}.editor-buttons{float:right}html[dir=rtl] .editor-buttons{float:left}.edit-error-flag{padding-top:0.5rem;color:red;visibility:hidden}.edit-button{-webkit-padding-start:0.5rem;padding-inline-start:0.5rem}.editor-text{width:100%;overflow-y:auto;background-color:#FFFFFF}.edit-width{width:100%}.edit-parent{box-sizing:border-box;width:100%;height:calc(100% - 46px)}.json-edit-container{height:100%;width:100%;border:1px #808080 solid}.padding-right{-webkit-padding-end:0.125rem;padding-inline-end:0.125rem}.btn{margin-bottom:1rem;display:flex;align-content:center;height:25px;width:120px}.select-ctrl{margin-bottom:1rem}.all-edits{margin-top:4rem}.floating-title{font-size:2rem;z-index:100;position:absolute;left:0.5rem;pointer-events:none}.floating-title-button{pointer-events:auto}.json-editor-position1{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:100%;padding:0px;overflow:hidden;max-height:100% !important}.json-editor-position2a{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:50%;padding:0px;overflow:hidden;max-height:100% !important}.json-editor-position2b{position:absolute;right:0px;top:0px;margin:0px;height:100%;width:50%;padding:0px;overflow:hidden;max-height:100% !important}";

const JsonEditor = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  static get assetsDirs() { return ["assets"]; }
  get el() { return this; }
  static get style() { return jsonEditorCss; }
}, [0, "json-editor", {
    "hasChanges": [1540, "has-changes"],
    "hasErrors": [1540, "has-errors"],
    "instanceid": [1544],
    "value": [1544],
    "getEditorContents": [64],
    "prepareForDeletion": [64],
    "replaceCurrentSelection": [64],
    "reset": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["json-editor", "calcite-button", "calcite-icon", "calcite-loader"];
  components.forEach(tagName => { switch (tagName) {
    case "json-editor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, JsonEditor);
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { JsonEditor as J, defineCustomElement as d };
