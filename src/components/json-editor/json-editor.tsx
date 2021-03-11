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
 * `id`: Id of component (required, because it's used to distinguish between multiple instances of component)
 * `content`: Initial content of editor
 * `start-editing`: Hover & a11y text for the start-editing button; default is "Start editing"
 * `search`: Hover & a11y text for the search button; default is "Search"
 * `cancel-edits`: Hover & a11y text for the cancel-edits button; default is "Cancel edits"
 * `save-edits`: Hover & a11y text for the save-edits button; default is "Save edits"
 *
 * @example
 *   <json-editor
 *     id="myEditor"
 *     content="{\"id\": \"12345\"}"
 *     start-editing="Commencer l'édition"
 *     search="Chercher"
 *     cancel-edits="Annuler les modifications"
 *     save-edits="Enregistrer les modifications"
 *   ></json-editor>
 *
 * Only the `id` attribute is required
 *
 * Component doesn't use the shadow root because of the way that Ace is loaded.
 *
 * N.B.: The search box on/off uses undocumented paths into the Ace library. Use care when upgrading Ace!
*/

import { Component, Event, EventEmitter, Host, h, Prop, State } from '@stencil/core';
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
   * Contains the public type value for this component.
   * 
   */
  @State() original: any = "";

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};
  
  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value!: string;

  /**
   * Contains the public id for this component.
   */
  @Prop({ mutable: true, reflect: true }) instanceId!: string;
  
  /**
   * Sets the contents of the editor.
   *
   */
  // @Watch('value')
  // valueWatchHandler(v: any, oldV: any) {
  //   if (v === oldV) {
  //     return;
  //   }
  //   this.original = this.original !== v ? v : this.original;
  // }
  //   //this.hasChanged = false;
  //   //this.editor?.setValue(JSON.stringify(v));

  //   // Clear display changes caused by setting the value
  //   const saveEditsBtn = document.getElementById(this.instanceId + "-saveEdits");
  //   if (saveEditsBtn) {
  //     saveEditsBtn.setAttribute("disabled", "");
  //   }
  //   this.editor?.clearSelection();
  // }

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
                color="light"
                title={"Start editing"}
                onClick={() => this._startEditing()}
              >
                <calcite-icon icon="pencil" scale="m"></calcite-icon>
              </calcite-button>
              <calcite-button 
                id={`${this.instanceId}-search`}
                color="light"
                title={"Search"}
                onClick={() => this._search()}
              >
                <calcite-icon icon="search" scale="m"></calcite-icon>
              </calcite-button>
              <calcite-button
                id={`${this.instanceId}-cancelEdits`}
                color="light"
                disabled
                title={"Cancel edits"}
                onClick={() => this._cancelEdits()}
              >
                <calcite-icon icon="reset" scale="m"></calcite-icon>
              </calcite-button>
              <calcite-button 
                id={`${this.instanceId}-saveEdits`}
                color="light"
                disabled
                title={"Save edits"} 
                onClick={() => this._saveEdits()}
              >
                <calcite-icon icon="save" scale="m"></calcite-icon>
              </calcite-button>
            </div>
          </div>
          <div class="editor-text">
            <div id={`${this.instanceId}-editor`} class="edit-width edit-height"></div>
          </div>
        </div>
      </Host>
    );
  }

  componentDidLoad(): void {
    // Set up embedded editor
    this.editor = gAce.edit(this.instanceId + "-editor");
    this.editor?.setOptions({
      maxLines: Infinity,
      mode: "ace/mode/json",
      theme: "ace/theme/tomorrow",
      readOnly: true
    });
    this.editor?.getSession().setUseWrapMode(true);

    // Initialize the content
    if (this.value) {
      this.editor?.setValue(JSON.stringify(this.value));
    }

    this.editor?.on("change", () => {
      this._enableButton(this.instanceId + "-saveEdits");
      //this.hasChanged = true;
    }).bind(this);

    // Provide an a11y way to get out of the edit window
    this.editor?.commands.addCommand({
      name: 'escape',
      bindKey: { win: 'esc', mac: 'esc' },
      exec: function (editor: any) {
        editor.blur();
      },
      readOnly: false
    });
  }
  
    /**
     * Frees the editor events and memory when the web component is disconnected.
     *
     */
    disconnectedCallback(): void {
      this.startEditingBtnHandler.removeEventListener("click", this._startEditing);
      this.searchBtnHandler.removeEventListener("click", this._search);
      this.cancelEditsBtnHandler.removeEventListener("click", this._cancelEdits);
      this.saveEditsBtnHandler.removeEventListener("click", this._saveEdits);
  
      this.editor?.container.remove();
  
      this.original = "";
    }
  
  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  //private hasChanged: boolean = false;
  private editor: Ace.Editor | undefined; // have to use `undefined` because we're not setting editor in constructor
  private startEditingBtnHandler: any;
  private searchBtnHandler: any;
  private cancelEditsBtnHandler: any;
  private saveEditsBtnHandler: any;
  
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

  @Event() jsonEditorSaved: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Handles click on "Cancel edits" button.
   *
   * @protected
   */
   _cancelEdits(): void {
    this.value = this.original;
    this._doneEditing();
  }

  /**
   * Disables a button.
   *
   * @param buttonId Id of button to disable
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
    //this.hasChanged = false;

    if ((this.editor as any).searchBox) { // searchBox is created when search type-in box is opened
      (this.editor as any).searchBox.hide();
    }
    this.editor?.setTheme("ace/theme/tomorrow");
    this.editor?.setReadOnly(true);
    this.editor?.clearSelection();
  }

  /**
   * Enables a button.
   *
   * @param buttonId Id of button to enable
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
    this.value = this.editor?.getValue();
    this.original = this.value;
    this._doneEditing();

    // not sure we need to do this since values will be grabbed elsewhere
    this.jsonEditorSaved.emit({
      detail: this.value
    });
  }

  /**
   * Handles click on "Search" button.
   */
  _search(): void {
    this.editor?.commands.byName.find.exec(this.editor);
  }

  /**
   * Handles click on "Start editing" button.
   *
   * @protected
   */
  _startEditing(): void {
    this._disableButton(`${this.instanceId}-startEditing`);
    this._enableButton(`${this.instanceId}-cancelEdits`);

    this.editor?.setTheme("ace/theme/tomorrow_night");
    this.editor?.setReadOnly(false);
    this.editor?.focus();
    this.editor?.clearSelection();
    this.editor?.gotoLine(0, 0, false);
  }
}
