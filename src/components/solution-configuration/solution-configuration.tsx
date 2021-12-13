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

import { Component, Element, h, Host, Listen, Method, Prop, State, VNode } from '@stencil/core';
import { IOrganizationVariableItem, IResponse, ISolutionConfiguration, ISolutionItem, IUpdateTemplateResponse, IVariableItem } from '../../utils/interfaces';
import * as utils from '../../utils/templates';
import state from '../../utils/editStore';
import { save } from '../../utils/common';
import { cloneObject, getItemDataAsJson, getProp, setProp, setCreateProp, UserSession } from '@esri/solution-common';
import '@esri/calcite-components';

@Component({
  tag: 'solution-configuration',
  styleUrl: 'solution-configuration.css',
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
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: ISolutionConfiguration = {
    contents: []
  };

  /**
   * Contains the raw templates from the solution item
   */
  @Prop({mutable: true, reflect: true}) templates: any[];

  /**
   * Contains the current solution item we are working with
   */
  @Prop({ mutable: true }) item: ISolutionItem = {
    itemId: "",
    itemDetails: {},
    isResource: false,
    data: {},
    properties: {},
    type: ""
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
  * Contains the current solution item id
  */
  @Prop({ mutable: true }) sourceItemData: any = {};

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    this._initObserver();
  }

  render(): VNode {
    const wkid = getProp(state.spatialReferenceInfo, "spatialReference.wkid");
    return (
      <Host>
        <div class="configuration-container">
          <div class="configuration">
            <calcite-tabs class="config-tabs">
              <calcite-tab-nav slot="tab-nav">
                <calcite-tab-title>{this.translations.definitionTab}</calcite-tab-title>
                <calcite-tab-title>{this.translations.spatialReferenceTab}</calcite-tab-title>
              </calcite-tab-nav>
              <calcite-tab active class="config-tab">
                <div class="config-solution">
                  <div class={this.treeOpen ? "config-inventory" : "config-inventory-hide"}>
                    <solution-contents
                      id="configInventory"
                      key={`${this.itemid }-contents`}
                      translations={this.translations}
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
                    title={this.translations.cancelEdits}
                   />
                  <div class="config-item">
                    <solution-item
                      key={`${this.itemid}-item`}
                      organizationVariables={this._organizationVariables}
                      solutionVariables={this._solutionVariables}
                      translations={this.translations}
                      value={this.item}
                    />
                  </div>
                </div>
              </calcite-tab>
              <calcite-tab class="config-tab">
                <div class="config-solution">
                  <solution-spatial-ref
                    defaultWkid={wkid}
                    id="configure-solution-spatial-ref"
                    key={`${this.itemid}-spatial-ref`}
                    locked={!wkid}
                    services={state.featureServices.map(fs => fs.name)}
                    translations={this.translations}
                  />
                </div>
              </calcite-tab>
            </calcite-tabs>
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

  private _templatesObserver: MutationObserver;

  private _solutionVariables: IVariableItem[];

  private _organizationVariables: IOrganizationVariableItem[];

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
    return Promise.resolve(state.models);
  }

  @Method()
  async getSpatialReferenceInfo(): Promise<any> {
    return Promise.resolve(state.spatialReferenceInfo);
  }

  @Method()
  async getSourceTemplates(): Promise<any> {
    return Promise.resolve(this.templates);
  }

  @Method()
  async save(): Promise<any> {
    return Promise.resolve(this._save());
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Observe changes to the props
   */
  private _initObserver() {
    this._templatesObserver = new MutationObserver(ml => {
      ml.some(mutation => {
        const v = mutation.target[mutation.attributeName];
        if (mutation.type === 'attributes' && mutation.attributeName === "itemid" && v && v !== mutation.oldValue) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getItemDataAsJson(v, this.authentication).then(data => {
            this.sourceItemData = data;
            this.templates = data.templates;

            this._initProps(this.templates);
            this._initState(this.templates);
          });
          return true;
        }
      });
    });
    this._templatesObserver.observe(this.el, { attributes: true, attributeOldValue: true });
  }

  /**
   * Update the store with the initial value
   */
  private _initState(v: any): void {
    state.models = utils.getModels(v);
    state.featureServices = utils.getFeatureServices(v);
    state.spatialReferenceInfo = utils.getSpatialReferenceInfo(state.featureServices, this.sourceItemData);
    this.modelsSet = true;
  }

  /**
   * Update the Props with the initial values
   */
  private _initProps(v: any): void {
    this.value.contents = [...utils.getInventoryItems(v)];
    this._solutionVariables = utils.getSolutionVariables(v, this.translations);
    this._organizationVariables = utils.getOrganizationVariables(this.translations);
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
  private _toggleTree(): void {
    this.treeOpen = !this.treeOpen;
  }

  /**
   * Save all edits from the current configuration
   * 
   * @returns a response that will indicate success or failure and any associated messages
   */
  private async _save() {
    const templateUpdates = await this._updateTemplates();
    const data = this._setSrInfo(templateUpdates.templates);
    return templateUpdates.errors.length === 0 ? save(
      this.itemid,
      data,
      this.authentication,
      this.translations,
      ""
    ) : {
      success: false,
      message: `The following templates have errors: ${templateUpdates.errors.join(", ")}`
    } as IResponse;
  }

  /**
   * Update the solutions templates based on the stored changes
   * 
   * @returns an object that contains the updated templates as well as any errors that were found
   */
  private async _updateTemplates(): Promise<IUpdateTemplateResponse> {
    const errors = [];
    const models = await this.getEditModels();
    let templates = cloneObject(this.templates);
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
   * Set a templates data property with changes from the models
   * 
   * @param template the current template to update
   * @param model the corresponding model for the current template (stores any user changes)
   * 
   * @returns a boolean that indicates if any errors were detected
   */
  private _setData(
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
  private _setProps(
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
  private _setTemplateProp(
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
  private _setItem(
    template: any,
    model: any
  ): void {
    if (model.updateItemValues && Object.keys(model.updateItemValues).length > 0) {
      Object.keys(model.updateItemValues).forEach(k => {
        template.item[k] = model.updateItemValues[k];
      });
    }
  }

  /**
   * Set spatial reference info in the solutions data
   * 
   * @returns a cloned copy of the solutions data that has been updated with spatial reference info
   * 
   */
  private _setSrInfo(
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
        delete(data.params.wkid);
      }
    }
    return data;
  }
}
