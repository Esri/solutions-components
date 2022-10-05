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

import { Component, Element, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import { EUpdateType, IResourcePath } from '../../utils/interfaces';
import { EFileType, UserSession } from '@esri/solution-common';
import state from "../../utils/solution-store";
import SolutionResourceItem_T9n from '../../assets/t9n/solution-resource-item/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-resource-item',
  styleUrl: 'solution-resource-item.scss',
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
   * The templates itemId.
   * This is used to get the correct model from a store in the json-editor
   */
  @Prop({ mutable: true, reflect: true }) itemId = "";

  @Watch("itemId") valueWatchHandler(): void {
    this.resourceFilePaths = state.getItemInfo(this.itemId).resourceFilePaths;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const hasValidResources = this._hasValidResources();
    return (
      <Host>
        <div class="resource-item">
          <div class="margin-bottom-1">
            <calcite-button
              appearance="solid"
              class="resource-button"
              color="blue"
              onClick={() => this._addNewResource()}
            >{this._translations.addResource}
            </calcite-button>
            <calcite-button
              appearance="solid"
              color="blue"
              disabled={!hasValidResources}
              onClick={() => this._downloadAll()}
            >{this._translations.downloadAll}
            </calcite-button>
          </div>
          <div class="resources-container" style={{ display: hasValidResources ? "inherit" : "none" }}>
            {this._renderResourceList()}
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * The templates resourceFilePaths.
   */
  @State() resourceFilePaths: IResourcePath[] = [];

  /**
   * The templates resources.
   */
  @State() resources = {};

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionResourceItem_T9n;

  protected _removedResources: any = {};

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
   * Render resources while avoiding thumbnail resoures that are managed by solution-item
   *
   */
  _renderResourceList(): HTMLCalciteValueListElement {
    return (
      <calcite-value-list multiple>
        {
          this.resourceFilePaths.reduce((prev, cur) => {
            if (cur.url.indexOf("_info_thumbnail") < 0) {
              prev.push(this._renderResource(cur));
            }
            return prev;
          }, [])
        }
      </calcite-value-list>
    )
  }

  /**
   * Render the resource and supporting actions for download/update/delete/(reset..if deleted)
   *
   * @param resource the filename and url used to interact with the resource
   */
  _renderResource(
    resource: IResourcePath
  ): HTMLCalciteValueListItemElement {
    const disabled = resource.updateType === EUpdateType.Remove;
    return (
      <calcite-value-list-item
        class={disabled ? "disabled" : ""}
        label={resource.filename}
        nonInteractive={true}
        value={resource.url}
        >
        <calcite-action-group expand-disabled="true" layout="horizontal" slot="actions-end">
          <calcite-action
            disabled={disabled}
            icon="download"
            label={this._translations.download}
            onClick={() => this._download(resource.url, resource.filename)}
            scale="m"
            text={this._translations.download}
            title={this._translations.download}
          />
          <calcite-action
            disabled={disabled}
            icon="upload-to"
            label={this._translations.update}
            onClick={() => this._upload(resource.url)}
            scale="m"
            text={this._translations.update}
            title={this._translations.update}
          />
          <calcite-action
            disabled={disabled}
            icon="trash"
            label={this._translations.delete}
            onClick={() => this._delete(resource.filename)}
            scale="m"
            text={this._translations.delete}
            title={this._translations.delete}
          />
          {disabled ? <calcite-action
            icon="reset"
            label={this._translations.reset}
            onClick={() => this._reset(resource.filename)}
            scale="m"
            text={this._translations.reset}
          /> : <div class="display-none"/>}
        </calcite-action-group>
      </calcite-value-list-item>
    );
  }

  /**
   * Adds the name to the deleted array so it will be skipped while rendering
   *  but still exist if the user chooses to reset
   *
   * @param name the name to be added to the deleted array
   */
  _delete(name: string): void {
    this.resourceFilePaths = this.resourceFilePaths.map(p => {
      if (p.filename === name) {
        p.updateType = EUpdateType.Remove;
      }
      return p;
    })
  }

  /**
   * Remove the name from the deleted array so it will again be rendered
   *
   * @param _name the name to be added to the deleted array
   */
  _reset(
    _name: string
  ): void {
    /*
    // need to make sure I know if this reset is from the source or a new one
    const m: ISolutionModel = state.models[this.itemId];
    this.resourceFilePaths = m.sourceResourceFilePaths.some(fp => fp.filename === name) ?
      this.resourceFilePaths = this.resourceFilePaths.map(p => {
        if (p.filename === name) {
          p.updateType = EUpdateType.None;
        }
        return p;
      }) :
      this.resourceFilePaths = this.resourceFilePaths.map(p => {
        if (p.filename === name) {
          p.updateType = EUpdateType.Add;
        }
        return p;
      });
    */
  }

  /**
   * Download all of the templates resources
   *
   */
  _downloadAll(): void {
    this.resourceFilePaths.forEach((resource: IResourcePath) => {
      this._download(resource.url, resource.filename);
    });
  }

  /**
   * Download the current resource
   *
   * @param url the resource url
   * @param name the resource name
   */
  _download(
    url: string,
    name: string
  ): void {
    // files that have been added manually do not need to be requested from the item
    if (url.startsWith("blob")) {
      this.downloadFile(url, name);
    } else {
      const fileExtensions: string[] = ['jpg', 'jpeg', 'gif', 'png', 'json'];
      const _url = `${url}?token=${this.authentication.token}`;
      if (fileExtensions.some(ext => url.endsWith(ext))) {
        void this.fetchAndDownload(_url, name);
      } else {
        this.downloadFile(_url, name);
      }
    }
  }

  /**
   * Dynamically creates an anchor and downloads the file
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  downloadFile(
    url: string,
    name: string
  ): void {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  }

  /**
   * Check if the template resources have any non-thumbnail resources
   *
   * @returns true if we have data resources and false if only thumbnail
   */
  _hasValidResources() : boolean {
    return this.resourceFilePaths.some(r => r.url.indexOf("_info_thumbnail") < 0);
  }

  /**
   * Fetches and downloads the resource from the solution
   *
   * @param url the url of the resource
   * @param name the name of the resource
   */
  async fetchAndDownload(url: string, name: string): Promise<void> {
    const image = await fetch(url);
    const b = await image.blob();
    const bURL = URL.createObjectURL(b);
    this.downloadFile(bURL, name);
  }

  /**
   * Create an input element to support the uploading of the resource and upload the resource
   *
   * @param url the url of the resource
   */
  _upload(url: string): void {
    const _input = document.createElement("input");
    _input.classList.add("display-none");
    _input.onchange = this._updateResource.bind(this, url);
    _input.type = "file";
    _input.click();
  }

  /**
   * Create an input element to support the uploading of a resource and add the new resource
   *
   */
  _addNewResource(): void {
    const _input = document.createElement("input");
    _input.classList.add("display-none");
    _input.onchange = this._add.bind(this);
    _input.type = "file";
    _input.click();
  }

  /**
   * Replace the resource file path when update action is used
   *
   * @param currentUrl the url for the item to replace
   * @param event the input event that contains the file
   */
  _updateResource(
    currentUrl: string,
    event: any
  ): void {
    const files = event.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const filename = files[0].name;

      let currentIndex = -1;
      let sourceFileName;
      this.resourceFilePaths.some((r, i) => {
        if (r.url === currentUrl) {
          currentIndex = i;
          sourceFileName = r.sourceFileName || r.filename;
          return true;
        } else {
          return false;
        }
      });

      if (currentIndex > -1) {
        this._removedResources[filename] = this.resourceFilePaths[currentIndex];

        this.resourceFilePaths[currentIndex] = {
          url,
          type: EFileType.Data,
          folder: undefined,
          filename,
          blob: files[0],
          sourceFileName,
          updateType: EUpdateType.Update
        }

        this.resourceFilePaths = [
          ...this.resourceFilePaths
        ];
      }
    }
  }

  /**
   * Add the new resource to the resource file paths
   *
   * @param event the inputs event that contains the new file
   */
  _add(event: any): void {
    const files = event.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      const filename = files[0].name;
      if (!this.resourceFilePaths.some(r => r.filename === filename && r.url === url)) {
        this.resourceFilePaths = [
          ...this.resourceFilePaths,
          {
            url,
            type: EFileType.Data,
            folder: undefined,
            filename,
            blob: files[0],
            updateType: EUpdateType.Add
          }
        ]
      }
    }
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionResourceItem_T9n;
  }
}
