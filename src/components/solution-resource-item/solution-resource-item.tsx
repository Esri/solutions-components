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

import { Component, Element, Host, h, Prop, State, Watch } from '@stencil/core';

export interface IResourceItem {
  name: string,
  url: string
}

@Component({
  tag: 'solution-resource-item',
  styleUrl: 'solution-resource-item.css',
  shadow: true
})
export class SolutionResourceItem {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionResourceItemElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: IResourceItem = {
    name: "",
    url: ""
  };

  @State() fileName: string;

  @Watch('value')
  valueWatchHandler(v: IResourceItem, oldV: IResourceItem): void {
    this.fileName = v.name !== oldV.name ? v.name : this.fileName;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.fileName = this.value.name;
  }

  render() {
    return (
      <Host>
        <div class="resource-item">

          <input
            accept=".zip"
            class="display-none"
            onChange={(event) => (this._updateFile(event))}
            ref={(el) => (this.browseForFile = el)}
            type="file"
          />

          <a class="display-none" download href={this.value.url} ref={(el) => (this.downloadFile = el)} />

          <calcite-label>
            {this.fileName}
          </calcite-label>

          {/* <calcite-progress
            class="display-none resource-progress"
            ref={(el) => (this.uploadProgress = el)}
            type="indeterminate"
          ></calcite-progress> */}

          <calcite-button
            appearance="solid"
            class="resource-button"
            color="blue"
            icon-start="download"
            onClick={() => this._downloadItem()}
            scale="m"
          >
            {this.translations.download}
          </calcite-button>

          <calcite-button
            appearance="solid"
            class="resource-button"
            color="blue"
            icon-start="upload"
            onClick={() => this._updateItem()}
            scale="m"
          >
            {this.translations.update}
          </calcite-button>

        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Handle to the element for browsing for a file.
   */
  private browseForFile: HTMLInputElement;

  /**
   * Handle to the element for downloading a file.
   */
  private downloadFile: HTMLAnchorElement;

  /**
   * Handle to the progress element to show during upload/download
   */
  //private uploadProgress: HTMLCalciteProgressElement;

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

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Download file from url.
   *
   */
  _downloadItem(): void {
    this.downloadFile.click();
  }

  /**
   * Opens file browse dialog.
   *
   */
  _updateItem(): void {
    this.browseForFile.click();
  }

  /**
   * Gets and displays image result from browse.
   *
   */
  private _updateFile(
    event: any
  ): void {
    // progress goes so fast this may not be necessary
    //this.uploadProgress.classList.remove('display-none');
    const files = event.currentTarget.files;
    if (files && files[0]) {
      const name: string = files[0].name;
      const reader = new FileReader();
      reader.onloadend = (r) => {
        this.value = {
          name,
          url: typeof(r.target.result) === "string" ? r.target.result : ""
        };
        //this.uploadProgress.classList.add('display-none');
      }
      reader.readAsDataURL(files[0]);
    } else {
      //this.uploadProgress.classList.add('display-none');
    }
  }
}
