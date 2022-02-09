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
import { IResourceItem } from '../../utils/interfaces';
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
   * A templates itemId.
   * This is used to get the correct model from a store in the json-editor
   */
   @Prop({ mutable: true, reflect: true }) itemid = "";

   @Prop({ mutable: true, reflect: true }) resources = [];

   @Prop({ mutable: true, reflect: true }) resourceFilePaths = [];

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

  /**
 * Credentials for requests
 */
  @Prop({ mutable: true }) authentication: UserSession;

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
            // TODO clarify how to distinguish if this is the templates thumbnail vs some other image..
            //if (cur.type < 4) {
              prev.push(this._renderResource(cur))
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

  _download(url: string, name: string): void {
    const imageExtensions: string[] = ['jpg', 'jpeg', 'gif', 'png'];
    const _url: string = `${url}?token=${this.authentication.token}`;
    if (imageExtensions.some(ext => url.endsWith(ext))) {
      this.downloadImage(_url, name);
    } else {
      this.downloadFile(_url, name);
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
}
