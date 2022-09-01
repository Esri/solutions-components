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
 * web component for JSON content.
 *
 * Attributes:
 * `instanceid`: id of component (required, because it's used to distinguish between multiple instances of component)
 * `value`: Initial content of editor
 *
 * @example
 *   <json-editor
 *     instanceid="a1f271c0de554604beed2adc1f244be1"
 *     value="{\"id\": \"12345\"}"
 *   ></json-editor>
 *
 * `instanceid` attribute and `value` are required
 *
 *
*/

import { Component, Element, Host, h, Listen, Method, Prop, State } from '@stencil/core';
import state from '../../utils/editStore';
import { getProp } from '@esri/solution-common';
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
   * Contains the original source item json as it was when the component was created.
   *
   */
  @Prop({ mutable: true }) original: any = "";

  /**
   * Contains the public value for this component.
   * This should be an item Id for one of the models in the store.
   */
  @Prop({ mutable: true, reflect: true }) value: any = undefined;

  /**
   * Contains the public model for this component.
   */
  @Prop({ mutable: true, reflect: true }) model: any; //monaco.editor.ITextModel;

  /**
   * Contains a unique identifier for when we have multiple instances of the editor.
   * For example when we want to show an items data as well as an items properties.
   *
   * Need to rethink this..would like it to be more generic.
   * We are currently tied to either data or props as this helps us know how to get the correct model from the store.
   */
  @Prop({ mutable: true, reflect: true }) instanceid: any = "";

  /**
   * Contains a public value to indicate if the model has any errors
   * that would prevent saving it.
   */
  @Prop({ mutable: true, reflect: true }) hasErrors: boolean = false;

  /**
 * Contains the translations for this component.
 * All UI strings should be defined here.
 */
  @State()
  translations: typeof JsonEditor_T9n;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

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
      /*this._decorationsChanged = this._editor.onDidChangeModelDecorations(this._onDecorationsChange.bind(this));

      this._diffEditor = monaco.editor.createDiffEditor(document.getElementById(`${this.instanceid}-diff-container`), {
        automaticLayout: true
      });
      this._setDiffModel();

      this._loaded = true; */
    }
  }

  render() {
    return (
      <Host class="json-editor-position">
        <div id={`${this.instanceid}-editor-container`} class="editor-container padding-right">
          <div class="editor-controls">
            <div class="editor-buttons">
              {/* undo */}
              <calcite-button
                id={`${this.instanceid}-undo`}
                color="blue"
                appearance="solid"
                title={this.translations.undo}
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
                title={this.translations.redo}
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
                title={this.translations.diff}
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
                title={this.translations.search}
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
                title={this.translations.cancelEdits}
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

  async componentWillLoad(): Promise<void> {
    this._initValueObserver();
    await this._getTranslations();
    return;
  }

  disconnectedCallback(): void {
    // The doc makes me question what all we should do here
    // StencilJS doc: Called every time the component is disconnected from the DOM, ie, it can
    // be dispatched more than once, DO not confuse with a "onDestroy" kind of event.
    this._destroyEditor();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  private _editor: any;
  private _diffEditor: any;
  private _useDiffEditor: boolean = false;
  private _currentModel: any;
  private _searchBtnHandler: any;
  private _cancelEditsBtnHandler: any;
  private _loaded: boolean = false;
  private _valueObserver: MutationObserver;
  private _contentChanged: any;
  private _decorationsChanged: any;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("organizationVariableSelected", { target: 'window' })
  organizationVariableSelected(event: CustomEvent): void {
    if (this._isTabActive()) {
      this._insertValue(event.detail.value);
    }
  }

  @Listen("solutionVariableSelected", { target: 'window' })
  solutionVariableSelected(event: CustomEvent): void {
    if (this._isTabActive()) {
      this._insertValue(event.detail.value);
    }
  }

  @Listen("modelsChanged", { target: 'window' })
  _modelsChanged(): void {
    if (!this._loaded && this.value) {
      if (state && state.models && Object.keys(state.models).indexOf(this.value) > -1) {
        //get the model and state from the store
        this._setEditModel(this.value);
      }
    }
  }

  @Listen("solutionItemSelected", { target: 'window' })
  _solutionItemSelected(event: CustomEvent): void {
    if (this.value && event.detail.itemId !== this.value) {
      this._saveCurrentModel(this.value)
    }
  }

  @Listen("featureServiceSpatialReferenceChange", { target: 'window' })
  featureServiceSpatialReferenceChange(event: CustomEvent): void {
    if (this.instanceid === "props" && state.models[this.value].title === event.detail.name) {
      this._setFeatureServiceWkid(event.detail.enabled);
    }
  }

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

  @Method()
  async reset(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this._setEditModel(this.value);
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
   * Initializes the editor when the web component is connected.
   *
   * @protected
   */
  _initEditor(): void {
    // Set up embedded editor
    if (monaco && monaco.editor) {
      this._editor = monaco.editor.create(document.getElementById(`${this.instanceid}-container`), {
        model: this.model,
        language: 'json',
        readOnly: false,
        theme: "vs",
        minimap: {
          enabled: false
        },
        automaticLayout: true,
        scrollBeyondLastLine: false
      });
      this._currentModel = this._editor.getModel();

      this._contentChanged = this._currentModel.onDidChangeContent(this._onEditorChange.bind(this));
      this._decorationsChanged = this._editor.onDidChangeModelDecorations(this._onDecorationsChange.bind(this));

      this._diffEditor = monaco.editor.createDiffEditor(document.getElementById(`${this.instanceid}-diff-container`), {
        automaticLayout: true
      });
      this._setDiffModel();

      this._loaded = true;
    }
  }

  /**
   * Initializes the observer that will monitor and respond to changes of the value
   *
   * @protected
   */
  private _initValueObserver() {
    this._valueObserver = new MutationObserver(ml => {
      ml.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === "value") {
          if (state && state.models && Object.keys(state.models).indexOf(this.value) > -1) {
            const newValue: string = mutation.target[mutation.attributeName];
            if ((newValue !== mutation.oldValue && this._loaded)) {
              // store the current state
              this._saveCurrentModel(mutation.oldValue);

              // get the model and state from the store
              this._setEditModel(newValue);
            } else if (!this._loaded) {
              this._setEditModel(this.value);
            }
          }
        }
      });
    });
    this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }

  /**
   * Update the undo redo buttons as necessary
   *
   * @protected
   */
  _onEditorChange(): void {
    this._toggleUndoRedo();
  }

  /**
   * Decorations are added when errors are found in the editor content
   *
   * @protected
   */
  _onDecorationsChange(): void {
    const model = this._editor.getModel();
    if (model === null) {
      return;
    }

    const owner = model.getModeId();
    const markers = monaco.editor.getModelMarkers({ owner });

    this.hasErrors = markers.length > 0;
  }

  /**
   * Undo the current edit operation
   *
   * @protected
   */
  _undo(): void {
    if (this._currentModel?.canUndo()) {
      this._currentModel.undo();
      this._toggleUndoRedo();
    }
  }

  /**
   * Redo the previous edit operation
   *
   * @protected
   */
  _redo(): void {
    if (this._currentModel?.canRedo()) {
      this._currentModel.redo();
      this._toggleUndoRedo();
    }
  }

  /**
   * Show/Hide the appropriate editor
   *
   * @protected
   */
  _toggleEditor(): void {
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
   * Toggle the undo and redo buttons
   *
   * @protected
   */
  _toggleUndoRedo(): void {
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
   * Overrides the editors selection with the value passed in
   *
   * @protected
   */
  _insertValue(v: string): void {
    const editor: any = this._getEditor();
    const range = editor.getSelection();
    // use pushEditOperations so it will push to the undo stack
    this._currentModel.pushEditOperations([], [{
      forceMoveMarkers: true,
      text: v,
      range
    }]);
    editor.revealRange(range);
  }

  /**
   * Gets the current active editor for diff editor
   *
   * @protected
   */
  _getEditor(): any {
    return this._useDiffEditor ? this._diffEditor : this._editor;
  }

  /**
   * Frees the editor events and memory when the web component is disconnected.
   *
   * @protected
   */
  _destroyEditor(): void {
    this._searchBtnHandler?.removeEventListener("click", this._search);
    this._cancelEditsBtnHandler?.removeEventListener("click", this._reset);

    this._valueObserver?.disconnect();

    this._contentChanged?.dispose();
    this._decorationsChanged?.dispose();

    this._editor?.dispose();

    this.original = "";
  }

  /**
   * Resets the stored model to the original value.
   *
   * @protected
   */
  _reset(): void {
    // update the model
    const org = this._getOriginalValue();
    this.model = monaco.editor.createModel(JSON.stringify(JSON.parse(org), null, '\t'), "json");

    // update the editor
    this._editor.setModel(this.model);
    this._setCurrentModel();
    this._setDiffModel();
    this._saveCurrentModel(this.value);
    this._setEditorFocus();

    // update the ui
    this._toggleUndoRedo();
  }

  /**
   * Disables a button.
   *
   * @param buttonId Id of button to disable
   *
    * @protected
   */
  _disableButton(buttonId: string): void {
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
   * Handles click on "Search" button.
   *
   * @protected
   */
  _search(): void {
    const editor: any = this._getEditor();
    // force focus should likely just be a workaround
    //https://github.com/microsoft/monaco-editor/issues/2355
    editor.focus();
    editor.trigger('toggleFind', 'actions.find');
  }

  /**
   * Save the current model state to the store
   *
   * @protected
   */
  _saveCurrentModel(id: string): void {
    if (this._editor && id && Object.keys(state.models).indexOf(id) > -1) {
      state.models[id][this._isData() ? "dataModel" : "propsModel"] = this.model;
      state.models[id].state = this._editor.saveViewState();
    }
  }

  /**
   * Change the editors model
   *
   * @protected
   */
  _setEditModel(id): void {
    const data = state.models[id];

    this.model = this._isData() ? data.dataModel : data.propsModel;
    this.original = this._isData() ? data.dataOriginValue : data.propsOriginValue;

    if (this._editor) {
      this._editor.setModel(this.model);
      if (data.state) {
        this._editor.restoreViewState(data.state);
      }
      this._setDiffModel();
      this._setEditorFocus();
    } else {
      this._initEditor();
    }

    this._setCurrentModel();

    this._toggleUndoRedo();
  }

  /**
   * Set the current model and event handler
   *
   * @protected
   */
  _setCurrentModel(): void {
    this._currentModel = this._editor.getModel();
    if (this._contentChanged) {
      this._contentChanged.dispose();
    }
    this._contentChanged = this._currentModel.onDidChangeContent(this._onEditorChange.bind(this));
  }

  /**
   * Set the models for the diff editor
   *
   * @protected
   */
  _setDiffModel(): void {
    if (this._diffEditor) {
      this._diffEditor.setModel({
        original: monaco.editor.createModel(JSON.stringify(JSON.parse(this.original), null, '\t'), "json"),
        modified: this._editor.getModel()
      });
    }
  }

  /**
   * Set the models for the diff editor
   *
   * @protected
   */
  _setEditorFocus(): void {
    if (this._useDiffEditor) {
      this._diffEditor.focus();
    } else {
      this._editor.focus();
    }
  }

  /**
   * When the json-editor is embedded within a solition-item component we will have two tabs
   * with the json editor. This provides a way for us to check if that parent tab is active
   * while inserting variables.
   *
   * @protected
   */
  _isTabActive(): boolean {
    const tab = document.getElementById(`${this.instanceid}-tab`) as HTMLCalciteTabElement;
    return tab ? tab.active : true;
  }

  /**
   * When the json-editor is embedded within a solition-item component we will have two tabs
   * with the json editor. One for the data section of the item and one for the props section.
   * This provides a way to check what one we are working with.
   *
   * @protected
   */
  _isData(): boolean {
    return this.instanceid === "data"
  }

  /**
   * When the json-editor is embedded within a solition-item component it needs to be aware
   * if the spatial reference control has modified the data.
   * Edits from the spatial reference control do not add to the undo/redo stack and are not removed on reset as
   * they are only controlled via the spatial reference control.
   * This allows us to use the true original value or the one that has been modified by the spatial ref control
   * when using the diff editor or resetting.
   *
   * @protected
   */
  _getOriginalValue(): string {
    const m: any = state.models[this.value];
    const serviceActive = getProp(state, `spatialReferenceInfo.services.${m?.name}`);
    const srEnabled = getProp(state, 'spatialReferenceInfo.enabled');
    return (serviceActive && srEnabled && !this._isData()) ? m.propsDiffOriginValue : this.original;
  }

  /**
   * Update the current feature service models wkid
   *
   * This functions responds to events fired from the spatial reference control.
   *
   * @param enabled does the given service support the wkid variable (true) or the current wkid (false)
   *
   * @protected
   */
  _setFeatureServiceWkid(
    enabled: boolean
  ): void {
    const editor = this._getEditor();
    const m = editor.getModel();
    const model = this._useDiffEditor ? m.modified : m;
    const matches = model.findMatches(/["]wkid["].*[,]/, false, true, true, null, true);
    if (matches.length > 0) {
      const range = matches[0].range;
      const currentText = model.getValueInRange(range);
      const endsWith = currentText.indexOf(",") > -1 ? "," : "";
      const wkid = /[0-9]+/.exec(currentText);
      const wkidVar = enabled ? `"{{params.wkid||${wkid}}}"` : wkid;
      const text = `"wkid": ${wkidVar}${endsWith}`;
      model.pushEditOperations([], [{
        forceMoveMarkers: true,
        text,
        range
      }]);
    }
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof JsonEditor_T9n;
  }
}
