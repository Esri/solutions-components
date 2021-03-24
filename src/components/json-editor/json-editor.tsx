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

/**
 * Encapsulates the Ace (Ajax.org Cloud9 Editor; https://github.com/ajaxorg/ace) editor into a
 * web component for JSON content.
 *
 * Attributes:
 * `instanceId`: id of component (required, because it's used to distinguish between multiple instances of component)
 * `value`: Initial content of editor
 *
 * @example
 *   <json-editor
 *     instanceId="a1f271c0de554604beed2adc1f244be1"
 *     value="{\"id\": \"12345\"}"
 *   ></json-editor>
 *
 * `instanceId` attribute and `value` are required
 *
 * Component doesn't use the shadow root because of the way that Ace is loaded.
 *
 * N.B.: The search box on/off uses undocumented paths into the Ace library. Use care when upgrading Ace!
*/

import { Component, Event, EventEmitter, Host, h, Listen, Prop, State } from '@stencil/core';
import { Ace } from "../../../lib/ace/ace";
const gAce = (window as any).ace;

@Component({
  tag: 'json-editor',
  styleUrl: 'json-editor.css',
  shadow: false
})
export class JsonEditor {
  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the original source item json as it was when the component was created.
   * 
   */
  @State() original: any = "";

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations!: any;
  
  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value!: string;

  /**
   * Contains the public id for this component.
   */
  @Prop({ mutable: true, reflect: true }) instanceId!: string;

  /**
   * Verify if any of the values for the Item have changed
   *
   */
  // TODO does this need to me a @Method?
  //@Method()
   hasChanges(): boolean {
    return this.original !== this.value;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="editor-container">
          <div class="editor-controls">
            <div class="editor-buttons">
              <calcite-button 
                id={`${this.instanceId}-startEditing`}
                color="blue"
                appearance="solid"
                title={this.translations.jsonEditor.startEditing}
                onClick={() => this._startEditing()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="pencil" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button 
                id={`${this.instanceId}-search`}
                appearance="outline"
                color="blue"
                title={this.translations.jsonEditor.search}
                onClick={() => this._search()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="search" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button
                id={`${this.instanceId}-cancelEdits`}
                color="blue"
                appearance="solid"
                disabled
                title={this.translations.jsonEditor.cancelEdits}
                onClick={() => this._cancelEdits()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="reset" scale="s"></calcite-icon>
              </calcite-button>
              <calcite-button 
                id={`${this.instanceId}-saveEdits`}
                color="blue"
                appearance="solid"
                disabled
                title={this.translations.jsonEditor.saveEdits} 
                onClick={() => this._saveEdits()}
                scale="s"
                class="edit-button"
              >
                <calcite-icon icon="save" scale="s"></calcite-icon>
              </calcite-button>
            </div>
          </div>
          <div class="editor-text">
            <div id={`${this.instanceId}-editor`} class="edit-width"></div>
          </div>
        </div>
      </Host>
    );
  }

  componentDidLoad(): void {
    this._initEditor();
  }
  
  disconnectedCallback(): void {
    this._destroyEditor();
  }
  
  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  private _editor: Ace.Editor | undefined; // have to use `undefined` because we're not setting editor in constructor
  private _startEditingBtnHandler: any;
  private _searchBtnHandler: any;
  private _cancelEditsBtnHandler: any;
  private _saveEditsBtnHandler: any;
  private _isEditing: boolean = false;
  private _current: any; // Contains the source item json with any saved edits.
  
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("organizationVariableSelected", { target: 'window' })
  organizationVariableSelected(event: CustomEvent): void {
    if (this._isEditing) {
      this._editor.session.replace(this._editor.selection.getRange(), event.detail.value);
    }
  }

  @Listen("solutionVariableSelected", { target: 'window' })
  solutionVariableSelected(event: CustomEvent): void {
    if (this._isEditing) {
      this._editor.session.replace(this._editor.selection.getRange(), event.detail.value);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() jsonEditorSaved: EventEmitter;

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
    if (gAce) {
      this._editor = gAce.edit(this.instanceId + "-editor");
      this._editor?.setOptions({
        maxLines: Infinity,
        mode: "ace/mode/json",
        theme: "ace/theme/tomorrow",
        readOnly: true
      });
      this._editor?.getSession().setUseWrapMode(true);

      // Initialize the content
      if (this.value) {
        this._editor?.setValue(this.value);
        this._current = this.value;
        this.original = this.value;
      }

      // listen for changes in editor
      this._editor?.on("change", this._validateSave.bind(this));

      // errors are stored as annotations
      // this will allow us to only enable save when no errors are present
      // unsure why I couldn't use the on pattern
      this._editor?.session.addEventListener("changeAnnotation", this._validateSave.bind(this));

      // Provide an a11y way to get out of the edit window
      this._editor?.commands.addCommand({
        name: 'escape',
        bindKey: { win: 'esc', mac: 'esc' },
        exec: function (editor: any) {
          editor.blur();
        },
        readOnly: false
      });
    }
  }

  /**
   * Only enable save when we are editing and json is valid
   *
   * @protected
   */
  _validateSave(): void {
    if (this._isEditing) {
      const annotations: Ace.Annotation[] = this._editor.session.getAnnotations();
      if (annotations.some(e => e.type === "error")) {
        this._disableButton(`${this.instanceId}-saveEdits`);
      } else {
        this._enableButton(`${this.instanceId}-saveEdits`);
      }
    }
  }

  /**
   * Frees the editor events and memory when the web component is disconnected.
   *
   * @protected
   */
  _destroyEditor(): void {
    this._startEditingBtnHandler.removeEventListener("click", this._startEditing);
    this._searchBtnHandler.removeEventListener("click", this._search);
    this._cancelEditsBtnHandler.removeEventListener("click", this._cancelEdits);
    this._saveEditsBtnHandler.removeEventListener("click", this._saveEdits);

    this._editor?.container.remove();

    this._current = "";
    this.original = "";
  }

  /**
   * Handles click on "Cancel edits" button.
   *
   * @protected
   */
   _cancelEdits(): void {
    this.value = this._current;
    this._editor?.setValue(this._current);
    this._doneEditing();
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
   * Terminates editing.
   *
   * @protected
   */
  _doneEditing(): void {
    this._enableButton(`${this.instanceId}-startEditing`);
    this._disableButton(`${this.instanceId}-cancelEdits`);
    this._disableButton(`${this.instanceId}-saveEdits`);

    if ((this._editor as any).searchBox) { // searchBox is created when search type-in box is opened
      (this._editor as any).searchBox.hide();
    }
    this._editor?.setTheme("ace/theme/tomorrow");
    this._editor?.setReadOnly(true);
    this._editor?.clearSelection();

    this._isEditing = false;
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
   * Handles click on "Save edits" button.
   *
   * @protected
   */
  _saveEdits(): void {
    this.value = this._editor?.getValue();
    this._current = this.value;
    this._doneEditing();

    // not sure we need to do this since values will be grabbed elsewhere
    this.jsonEditorSaved.emit({
      detail: this.value
    });
  }

  /**
   * Handles click on "Search" button.
   * 
   * @protected
   */
  _search(): void {
    this._editor?.commands.byName.find.exec(this._editor);
  }

  /**
   * Handles click on "Start editing" button.
   *
   * @protected
   */
  _startEditing(): void {
    this._disableButton(`${this.instanceId}-startEditing`);
    this._enableButton(`${this.instanceId}-cancelEdits`);

    this._editor?.setTheme("ace/theme/tomorrow_night");
    this._editor?.setReadOnly(false);
    this._editor?.focus();
    this._editor?.clearSelection();
    this._editor?.gotoLine(0, 0, false);

    this._isEditing = true;
  }
}
