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

import { Component, Element, Host, h, Prop } from '@stencil/core';
import { IResourcePath } from '../../utils/interfaces';
import { getItemResources } from '@esri/arcgis-rest-portal';
import { UserSession } from '@esri/solution-common';

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
   * Credentials for requests
   */
   @Prop({ mutable: true }) authentication: UserSession;

  /**
   * A templates itemId.
   * This is used to get the correct model from a store in the json-editor
   */
   @Prop({ mutable: true, reflect: true }) itemid = "";

  // todo...may be able to consolidate resources and resourceFilePaths and store extra prop for current, new, deleted type thing

  // active resources...includes new...does not include deleted
   @Prop({ mutable: true, reflect: true }) resources = {};

   // includes only the source paths..can be used to reconstruct any that have been temp deleted
   @Prop({ mutable: true, reflect: true }) resourceFilePaths: IResourcePath[] = [];

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};


  // should these be here or in the state.model
  @Prop({ mutable: true, reflect: true }) deleted: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillRender() {
    await this._getResources(this.itemid, this.authentication)
  }

  private async _getResources(
    id: string,
    authentication: UserSession
  ) {
    try {
      // this would need to make sure it doesn't add duplicates and can handle new and deleted 
      await getItemResources(id, { authentication });
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Host>
        <div class="resource-item">
        <div class="margin-bottom-1">
            <calcite-button
              color="blue"
              appearance="solid"
              onClick={() => this._addNewResource()}
              class="resource-button"
              >{this.translations.addResource}
            </calcite-button>
            <calcite-button
              color="blue"
              appearance="solid"
              onClick={() => this._downloadAll()}
              >{this.translations.downloadAll}
            </calcite-button>
          </div>
          <div class="resources-container">
            {this._renderResourceList()}
          </div>
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

  _renderResourceList(): HTMLCalciteValueListElement {
    return (
      <calcite-value-list multiple>
        {
          this.resourceFilePaths.reduce((prev, cur) => {
            if (Object.keys(this.resources).indexOf(cur.url) < 0) {
              this.resources[cur.url] = cur;
            }
            // Ask Mike what would be best to understand this
            // right now just show them all so we can have multiple in the list
            //if (cur.url.indexOf("_info_thumbnail") > -1) {
            //if (cur.type < 4) {
              prev.push(this._renderResource(cur))
            //}
            //}
            return prev;
          }, [])
        }
      </calcite-value-list>
    )
  }

  _renderResource(
    resource: any
  ): HTMLCalciteValueListItemElement {
    const disabled = this.deleted.indexOf(resource.filename) > -1;  
    return (
      <calcite-value-list-item 
        label={resource.filename}
        value={resource.url}
        metadata={resource.url}
        class={disabled ? "disabled" : ""}>
        <calcite-action-group slot="actions-end" layout="horizontal" expand-disabled="true">
          <calcite-action 
            disabled={disabled}
            scale="m"
            text="Download"
            label="Download"
            icon="download"
            onClick={() => this._download(resource.url, resource.filename)}>
          </calcite-action>
          <calcite-action 
            disabled={disabled}
            scale="m"
            text="Upload"
            label="Upload"
            icon="upload-to"
            onClick={() => this._upload()}>
              {/* set the accept based on the curent type I suppose */}
            <input
              accept=".zip"
              class="display-none"
              onChange={(event) => (this._updateResource(event))}
              ref={(el) => (this.browseForFile = el)}
              type="file"
            />
          </calcite-action>
          <calcite-action 
            disabled={disabled}
            scale="m"
            text="Delete"
            label="Delete"
            icon="trash"
            onClick={()=> this._delete(resource.filename)}>
          </calcite-action>
          {disabled ? <calcite-action 
            scale="m"
            text="Delete"
            label="Reset"
            icon="reset"
            onClick={()=> this._reset(resource.filename)}>
          </calcite-action> : <div class="display-none"></div>}
        </calcite-action-group>
      </calcite-value-list-item>
    );
  }

  _delete(name: string): void {
    if (this.deleted.indexOf(name) < 0) {
      this.deleted = [
        ...this.deleted,
        name
      ]
    }
  }

  _reset(name: string): void {
    // reset icon...
    const idx = this.deleted.indexOf(name);
    if (idx > -1) {
      this.deleted = this.deleted.filter(n => n !== name)
    }
  }

  _downloadAll(): void {
    Object.keys(this.resources).forEach(r => {
      const resource: IResourcePath = this.resources[r];
      this._download(resource.url, resource.filename);
    });
  }

  _download(url: string, name: string): void {
    // images that have been added manually do not need to be requested from the item
    if (url.startsWith("blob")) {
      this.downloadFile(url, name);
    } else {
      const imageExtensions: string[] = ['jpg', 'jpeg', 'gif', 'png'];
      const _url: string = `${url}?token=${this.authentication.token}`;
      if (imageExtensions.some(ext => url.endsWith(ext))) {
        this.downloadImage(_url, name);
      } else {
        this.downloadFile(_url, name);
      }
    }
  }

  downloadFile(url: string, name: string): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  }

  async downloadImage(url: string, name: string): Promise<void> {
    const image = await fetch(url);
    const b = await image.blob();
    const bURL = URL.createObjectURL(b);
    this.downloadFile(bURL, name);
  }
  
  /**
   * Opens file browse dialog.
   *
   */
  _upload(): void {
    this.browseForFile.click();
  }

  _updateResource(event: any): void {
    const files = event.target.files;
    if (files && files[0]) {
      alert(files[0])
    }
  }

  _addNewResource(): void {
    const _input = document.createElement("input");
    _input.accept = ".jpg,.gif,.png,image/jpg,image/gif,image/png";
    _input.classList.add("display-none");
    _input.onchange = this._add.bind(this);
    _input.type = "file";
    _input.click();
  }

  _add(event: any) {
    const files = event.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const filename = files[0].name;
      // TODO need to know how to actually set this
      const type = 4;
      if (!this.resourceFilePaths.some(r => r.filename === filename && r.url === url)) {
        this.resourceFilePaths = [
          ...this.resourceFilePaths,
          {
            url,
            type,
            filename,
            blob: files[0]
          }
        ]
      }
    }
  }
}
