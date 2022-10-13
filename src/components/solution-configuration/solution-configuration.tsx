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

import { Component, Element, h, Host, Listen, Method, Prop, State, VNode, Watch, EventEmitter, Event } from '@stencil/core';
import { IOrganizationVariableItem, IResponse, ISolutionConfiguration, ICurrentEditItem, ISolutionSpatialReferenceInfo, IUpdateTemplateResponse, IVariableItem } from '../../utils/interfaces';
import * as utils from '../../utils/templates';
import state from '../../utils/editStore';
import { save } from '../../utils/common';
import { cloneObject, getItemDataAsJson, getProp, setProp, setCreateProp, UserSession } from '@esri/solution-common';
import '@esri/calcite-components';
import SolutionConfiguration_T9n from '../../assets/t9n/solution-configuration/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-configuration',
  styleUrl: 'solution-configuration.scss',
  shadow: false
})
export class SolutionConfiguration {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLSolutionConfigurationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  @State() modelsSet = false;

  /**
   * Credentials for requests
   */
  @Prop({ mutable: true }) authentication: UserSession;

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: ISolutionConfiguration = {
    contents: []
  };

  /**
   * Contains the raw templates from the solution item
   */
  @Prop({ mutable: true, reflect: true }) templates: any[];

  /**
   * Contains the current solution item we are working with
   */
  @Prop({ mutable: true }) item: ICurrentEditItem = {
    itemId: "",
    itemDetails: {},
    isResource: false,
    data: {},
    properties: {},
    type: "",
    groupDetails: undefined
  };

  /**
   * Contains the current solution item id
   */
  @Prop({ mutable: true, reflect: true }) itemid = "";

  /**
   * Used to show/hide the content tree
   */
  @Prop({ mutable: true }) treeOpen = true;

  /**
  * Contains the current solution item data
  */
  @Prop({ mutable: true }) sourceItemData: any = {};

  /**
  * Used to show/hide loading indicator
  */
  @Prop({ mutable: true }) showLoading = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  @Event() solutionLoaded: EventEmitter<void>;

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  componentWillRender(): Promise<any> {
    return new Promise((resolve) => {
      if (this.itemid && (this._fetchData || !this.modelsSet)) {
        this._fetchData = false;
        this._isLoading = true;
        this._getItemData(this.itemid).then(() => {
          resolve(undefined);
        }, () => resolve(undefined));
      } else {
        resolve(undefined);
      }
    });
  }

  componentDidRender(): void {
    if (this._isLoading) {
      this._isLoading = false;
      this.solutionLoaded.emit();
    }
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const wkid = getProp(state.spatialReferenceInfo, "spatialReference.wkid");
    const hasServices: boolean = state.featureServices.length > 0;
    return this.showLoading ? (
      <Host>
        <calcite-loader active label='' />
      </Host>
    ) : (
      <Host>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>{this._translations.definitionTab}</calcite-tab-title>
                {hasServices ?
                  <calcite-tab-title>{this._translations.spatialReferenceTab}</calcite-tab-title> :
                  null
                }
              </calcite-tab-nav>
              <calcite-tab active class="config-tab">
                <div class="config-solution">
                  <div class={this.treeOpen ? "config-inventory" : "config-inventory-hide"}>
                    <solution-contents
                      id="configInventory"
                      key={`${this.itemid}-contents`}
                      value={this.value.contents}
                    />
                  </div>
                  <calcite-button
                    appearance="transparent"
                    class="collapse-btn"
                    icon-start={this.treeOpen ? "chevrons-left" : "chevrons-right"}
                    id="collapse-vars"
                    onClick={() => this._toggleTree()}
                    scale="s"
                    title={this._translations.cancelEdits}
                  />
                  <div class="config-item">
                    <solution-item
                      authentication={this.authentication}
                      key={`${this.itemid}-item`}
                      organizationVariables={this._organizationVariables}
                      solutionVariables={this._solutionVariables}
                      value={this.item}
                    />
                  </div>
                </div>
              </calcite-tab>
              {
                hasServices ?
                  <calcite-tab class="config-tab">
                    <div class="config-solution">
                      <solution-spatial-ref
                        defaultWkid={wkid}
                        id="configure-solution-spatial-ref"
                        key={`${this.itemid}-spatial-ref`}
                        locked={!wkid}
                        services={state.featureServices.map(fs => fs.name)}
                      />
                    </div>
                  </calcite-tab>
                  : null
              }
            </calcite-tabs>
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
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionConfiguration_T9n;

  protected _solutionVariables: IVariableItem[];

  protected _organizationVariables: IOrganizationVariableItem[];

  protected _fetchData = false;

  protected _isLoading = false;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionItemSelected", { target: 'window' })
  _solutionItemSelected(event: CustomEvent): void {
    this.item = event.detail;
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
  async getEditModels(): Promise<any> {
    return state.models;
  }

  @Method()
  async getSpatialReferenceInfo(): Promise<ISolutionSpatialReferenceInfo> {
    return state.spatialReferenceInfo;
  }

  @Method()
  async getSourceTemplates(): Promise<any> {
    return this.templates;
  }

  @Method()
  async save(): Promise<any> {
    return this._save();
  }

  @Watch('itemid')
  valueWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._fetchData = true;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Get the solution items data
   *
   * @param id the solution items id
   * @param isReset (defaults to false) indicates if we are resetting the controls after save
   */
  protected _getItemData(
    id: string,
    isReset = false
  ): Promise<any> {
    return getItemDataAsJson(id, this.authentication).then(data => {
      this.sourceItemData = data;
      this.templates = data.templates;

      this._initProps(this.templates);
      return this._initState(this.templates, isReset);
    });
  }

  /**
   * Update the store with the initial values
   *
   * @param templates the solution items templates
   * @param isReset (defaults to false) indicates if we are resetting the controls after save
   */
  protected _initState(
    templates: any[],
    isReset = false
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isReset) {
        // clear models and state so we can refresh after save
        this.modelsSet = false;
        state.reset();
      }
      utils.getModels(templates, this.authentication, this.itemid).then(models => {
        state.models = models;

        state.featureServices = utils.getFeatureServices(templates);
        state.spatialReferenceInfo = utils.getSpatialReferenceInfo(state.featureServices, this.sourceItemData);

        if (isReset) {
          // reset for undo/redo stack and diff editor tracking
          const jsonEditors = Array.from(this.el.getElementsByTagName("json-editor"));
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          jsonEditors.forEach(e => void e.reset());
        }

        this.modelsSet = true;
        resolve(true);
      }, () => reject);
    });
  }

  /**
   * Set Props with the initial values
   *
   * @param templates the solution items templates
   */
  protected _initProps(templates: any[]): void {
    this.value.contents = [...utils.getInventoryItems(templates)];
    this._solutionVariables = utils.getSolutionVariables(templates, this._translations);
    this._organizationVariables = utils.getOrganizationVariables(this._translations);
    this.item = {
      itemId: "",
      itemDetails: {},
      isResource: false,
      data: {},
      properties: {},
      type: ""
    };
  }

  /**
   * Toggle treeOpen prop to show/hide content tree
   */
  protected _toggleTree(): void {
    this.treeOpen = !this.treeOpen;
  }

  /**
   * Save all edits from the current configuration
   *
   * @returns a response that will indicate success or failure and any associated messages
   */
  protected async _save(): Promise<IResponse> {
    const templateUpdates = await this._updateTemplates();
    const data = this._setSrInfo(templateUpdates.templates);
    return templateUpdates.errors.length === 0 ? save(
      this.itemid,
      data,
      state.models,
      this.authentication,
      this._translations
    ).then(saveResult => {
      // need to trigger re-render...and re-fetch
      this._fetchData = true;
      this.modelsSet = false;
      return Promise.resolve(saveResult)
    }).catch(e => Promise.reject(e)) : Promise.reject({
      success: false,
      message: `The following templates have errors: ${templateUpdates.errors.join(", ")}`
    } as IResponse);
  }

  /**
   * Update the solutions templates based on the stored changes
   *
   * @returns an object that contains the updated templates as well as any errors that were found
   */
  protected async _updateTemplates(): Promise<IUpdateTemplateResponse> {
    const errors = [];
    const models = await this.getEditModels();
    let templates = this._updateGroupDependencies(models, this.templates);
    Object.keys(models).forEach(k => {
      const m = models[k];
      templates = templates.map(t => {
        if (t.itemId === m.itemId) {
          this._setItem(t, m);
          const hasDataError = this._setData(t, m);
          const hasPropError = this._setProps(t, m);
          if (hasDataError || hasPropError) {
            errors.push(m.itemId);
          }
        }
        return t;
      });
    });
    errors.concat(window.monaco.editor.getModelMarkers({}));
    return Promise.resolve({
      templates,
      errors
    });
  }

  /**
   * Review all models and store itemIds that should be added or removed from group dependencies
   *
   * @param models the corresponding models for the current templates
   *
   * @returns group info (an object with keys of groupIds and
   * arrays of itemIds that should be added or removed from group dependencies)
   */
  protected _getGroupInfo(
    models: any
  ): any {
    const groupInfo = {}
    Object.keys(models).forEach(k => {
      const m = models[k];
      if (m.shareInfo) {
        const groupId = m.shareInfo.groupId;
        const type = m.shareInfo.shared ? "share" : "unshare";
        if (groupInfo[groupId]) {
          groupInfo[groupId][type].push(m.itemId);
        } else {
          groupInfo[groupId] = {};
          groupInfo[groupId][type] = [m.itemId];
          if (m.shareInfo.shared) {
            groupInfo[groupId]["unshare"] = [];
          } else {
            groupInfo[groupId]["share"] = [];
          }
        }
      }
    });
    return groupInfo;
  }

  /**
   * Updates group dependency arrays by adding or removing itemIds
   *
   * @param templates the current templates to update
   * @param models the corresponding models for the current templates
   *
   * @returns updated templates array
   */
  protected _updateGroupDependencies(
    models: any,
    templates: any[]
  ): any[] {
    const groupInfo = this._getGroupInfo(models);
    Object.keys(groupInfo).forEach(k => {
      templates.some(t => {
        if (t.itemId === k) {
          // add share items as deps
          groupInfo[k].share.forEach(s => {
            if (t.dependencies.indexOf(s) < 0) {
              t.dependencies.push(s);
            }
          });

          // remove unshare items from deps
          groupInfo[k].unshare.forEach(s => {
            const index = t.dependencies.indexOf(s);
            if (index > -1) {
              t.dependencies.splice(index, 1);
            }
          });
          return true;
        } else {
          return false;
        }
      })
    })
    return templates;
  }

  /**
   * Add group IDs to items that should be shared
   * This function will update the provided template when shareInfo is available
   *
   * @param template the current template to update
   * @param shareInfo the corresponding shareInfo from the model for the current template
   *
   */
  protected _updateItemGroups(
    template: any,
    shareInfo: any
  ): void {
    if (shareInfo) {
      const groupIndex = template.groups.indexOf(shareInfo.groupId);
      if (groupIndex < 0 && shareInfo.shared) {
        template.groups.push(shareInfo.groupId);
      }
      if (groupIndex > -1 && !shareInfo.shared) {
        template.groups.splice(groupIndex, 1);
      }
    }
  }

  /**
   * Set a templates data property with changes from the models
   *
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   *
   * @returns a boolean that indicates if any errors were detected
   */
  protected _setData(
    template: any,
    model: any
  ): boolean {
    return this._setTemplateProp(
      template,
      model.dataOriginValue,
      model.dataModel.getValue(),
      "data"
    );
  }

  /**
   * Set a templates properties property with changes from the models
   *
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   *
   * @returns a boolean that indicates if any errors were detected
   */
  protected _setProps(
    template: any,
    model: any
  ): boolean {
    return this._setTemplateProp(
      template,
      model.propsOriginValue,
      model.propsModel.getValue(),
      "properties"
    );
  }

  /**
   * Generic function used to set properties or data property on a given template
   *
   * @param template the current template to update
   * @param originValue the original value from the solution template
   * @param modelValue the current value from the model (will contain any edits that have been made)
   * @param path the path to the property we should update if any changes are found
   *
   * @returns a boolean that indicates if any errors were detected
   */
  protected _setTemplateProp(
    template: any,
    originValue: any,
    modelValue: any,
    path: string
  ): boolean {
    let hasError = false;
    try {
      const _originValue = JSON.parse(originValue);
      const _modelValue = JSON.parse(modelValue);

      if (_originValue && _modelValue && (JSON.stringify(_originValue) !== JSON.stringify(_modelValue))) {
        setProp(template, path, _modelValue);
      }
    } catch (e) {
      console.error(e);
      hasError = true;
    }
    return hasError;
  }

  /**
   * Set a templates item property with changes from the models
   *
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   *
   * This function will update the template argument when edits are found
   */
  protected _setItem(
    template: any,
    model: any
  ): void {
    this._updateItemGroups(template, model.shareInfo);
    if (model.updateItemValues && Object.keys(model.updateItemValues).length > 0) {
      Object.keys(model.updateItemValues).forEach(k => {
        template.item[k] = model.updateItemValues[k];
      });
    }
  }

  /**
   * Set spatial reference info in the solutions data
   *
   * @param templates a list of item templates from the solution
   *
   * @returns a cloned copy of the solutions data that has been updated with spatial reference info
   *
   */
  protected _setSrInfo(
    templates: any[]
  ): any {
    const srInfo: any = state.spatialReferenceInfo;

    const serviceEnabled = typeof srInfo?.services === 'undefined' ?
      false : Object.keys(srInfo.services).some(k => srInfo.services[k]);

    const data = cloneObject(this.sourceItemData);
    data.templates = templates;
    if (srInfo && srInfo.enabled && serviceEnabled) {
      const wkid = srInfo.spatialReference.wkid.toString();

      const wkidParam = {
        "label": "Spatial Reference",
        "default": wkid,
        "valueType": "spatialReference",
        "attributes": {
          "required": "true"
        }
      };

      const params = getProp(data, "params");
      const hasWkid = params && params.wkid;
      setCreateProp(
        data,
        hasWkid ? "params.wkid.default" : "params.wkid",
        hasWkid ? wkid : params ? wkidParam : wkid
      );
    } else if (!srInfo.enabled) {
      if (getProp(data, "params.wkid")) {
        delete (data.params.wkid);
      }
    }
    return data;
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionConfiguration_T9n;
  }
}
