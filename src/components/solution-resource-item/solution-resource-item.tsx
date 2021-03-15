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

  @Element() el: HTMLElement;

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
  valueWatchHandler(v: IResourceItem, oldV: IResourceItem) {
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
            ref={(el) => (this.browseForFile = el)}
            onChange={(event) => (this._updateFile(event))}
            class="display-none"
            type="file"
            accept=".zip"
          />

          <a ref={(el) => (this.downloadFile = el)} href={this.value.url} download class="display-none"></a>

          <calcite-label>
            {this.fileName}
          </calcite-label>

          {/* <calcite-progress
            class="display-none resource-progress"
            ref={(el) => (this.uploadProgress = el)}
            type="indeterminate"
          ></calcite-progress> */}

          <calcite-button
            class="resource-button"
            appearance="solid"
            color="blue"
            scale="m"
            icon-start="download"
            onClick={() => this._downloadItem()}
          >
            {this.translations.resourceItem.download}
          </calcite-button>

          <calcite-button
            class="resource-button"
            appearance="solid"
            color="blue"
            scale="m"
            icon-start="upload"
            onClick={() => this._updateItem()}
          >
            {this.translations.resourceItem.update}
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
  _downloadItem() {
    this.downloadFile.click();
  }

  /**
   * Opens file browse dialog.
   *
   */
  _updateItem() {
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
      var reader = new FileReader();
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
