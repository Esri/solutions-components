/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { h, Host } from "@stencil/core";
import * as utils from "../../utils/templates";
import state from "../../utils/solution-store";
import { UserSession } from "@esri/solution-common";
import "@esri/calcite-components";
import { getLocaleComponentStrings } from "../../utils/locale";
export class SolutionConfiguration {
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    async serializedAuthenticationWatchHandler() {
        this.authentication = this.serializedAuthentication ? UserSession.deserialize(this.serializedAuthentication) : new UserSession({});
    }
    async valueWatchHandler() {
        await this._loadSolution(this.solutionItemId);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    constructor() {
        this.authentication = new UserSession({});
        this.serializedAuthentication = "";
        this.solutionItemId = "";
        this.showLoading = false;
        this._currentEditItemId = "";
        this._organizationVariables = "";
        this._solutionContentsComponent = undefined;
        this._solutionIsLoaded = false;
        this._solutionVariables = "";
        this._templateHierarchy = [];
        this._translations = undefined;
        this._treeOpen = true;
        if (this.serializedAuthentication) {
            this.authentication = UserSession.deserialize(this.serializedAuthentication);
        }
        void this._loadSolution(this.solutionItemId);
        window.addEventListener("solutionStoreHasChanges", (evt) => {
            this._updateSaveability(this._solutionStoreHasChanges = evt.detail, this._solutionEditorHasChanges, this._solutionEditorHasErrors);
        });
        window.addEventListener("solutionEditorHasChanges", (evt) => {
            this._updateSaveability(this._solutionStoreHasChanges, this._solutionEditorHasChanges = evt.detail, this._solutionEditorHasErrors);
        });
        window.addEventListener("solutionEditorHasErrors", (evt) => {
            this._updateSaveability(this._solutionStoreHasChanges, this._solutionEditorHasChanges, this._solutionEditorHasErrors = evt.detail);
        });
    }
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        const spatialReferenceInfo = state.getStoreInfo("spatialReferenceInfo");
        const hasServices = state.getStoreInfo("featureServices").length > 0;
        const solutionData = state.getStoreInfo("solutionData");
        this._solutionVariables = JSON.stringify(utils.getSolutionVariables(solutionData.templates, this._translations));
        this._organizationVariables = JSON.stringify(utils.getOrganizationVariables(this._translations));
        return (h(Host, { key: '8e1367e1eece3e041227d7ce27d9d2b239f37d9f' }, !this._solutionIsLoaded
            ? h("calcite-loader", { label: '' })
            : null, h("div", { key: 'fe29e56a188dfd92d8e2c78af7acaac028aedff7', class: "configuration-container" }, h("div", { key: '595e3465a33d1bd43e2b193f83b3684e7cd7f545', class: "configuration" }, h("calcite-tabs", { key: 'e3d4fa1daead62e3778f93461e801a8fe1fb6ce3', class: "config-tabs" }, h("calcite-tab-nav", { key: 'f69a08f3e13d96e2a72a4acc3140e9fecaf771fb', slot: "tab-nav" }, h("calcite-tab-title", { key: '617c4645ed329aeaec323c8fd71dd4f613bd1bb5' }, this._translations.definitionTab), hasServices ?
            h("calcite-tab-title", null, this._translations.spatialReferenceTab) :
            null), h("calcite-tab", { key: 'aea33a732954616500acd5121a61e9dcc3c0a45a', class: "config-tab", selected: true }, h("div", { key: '25b4054f837b0574ba6534e413e6efa176629320', class: "config-solution" }, h("div", { key: '575b193c54fd45559f5ab30710b88848650b8c38', class: this._treeOpen ? "config-inventory" : "config-inventory-hide" }, h("solution-contents", { id: "configInventory", key: `${this.solutionItemId}-contents`, ref: (el) => (this._solutionContentsComponent = el) })), h("calcite-button", { key: 'f7460ad785026cc2071df44a650858502a3ddca4', appearance: "transparent", class: "collapse-btn", "icon-start": this._treeOpen ? "chevrons-left" : "chevrons-right", id: "collapse-vars", onClick: () => this._toggleTree(), scale: "s", title: this._treeOpen ? this._translations.collapse : this._translations.expand }), h("div", { key: '8bdb812041f5d928dfd84b4fcbce6c0b952cf7c5', class: "config-item" }, h("solution-item", { authentication: this.authentication, "item-id": this._currentEditItemId, key: `${this.solutionItemId}-item`, "organization-variables": this._organizationVariables, "solution-item-id": this.solutionItemId, "solution-variables": this._solutionVariables })))), hasServices
            ? h("calcite-tab", { class: "config-tab" }, h("div", { class: "config-solution" }, h("solution-spatial-ref", { enableDefault: !!spatialReferenceInfo.default, enabled: spatialReferenceInfo?.enabled, featureServices: state.getStoreInfo("featureServices").map(fs => fs.name), id: "configure-solution-spatial-ref", key: `${this.solutionItemId}-spatial-ref` })))
            : null)))));
    }
    _solutionStoreHasChanges = false;
    _solutionEditorHasChanges = false;
    _solutionEditorHasErrors = false;
    _canSave = false;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    _solutionItemSelected(event) {
        this._currentEditItemId = event.detail;
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
    /*
    @Method()
    async getEditModels(): Promise<ISolutionItems> {
      return Promise.resolve(state.items);
    }
    */
    async getSpatialReferenceInfo() {
        return Promise.resolve(state.getStoreInfo("spatialReferenceInfo"));
    }
    /*
    @Method()
    async getSourceTemplates(): Promise<any> {
      return Promise.resolve(this._templates);
    }
    */
    async saveSolution() {
        this._solutionIsLoaded = false;
        await state.saveSolution();
        this._solutionIsLoaded = true;
        this.solutionItemId = null;
    }
    async unloadSolution() {
        this.solutionItemId = null;
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Update the store with the initial values
     *
     * @param templates the solution items templates
     * @param isReset (defaults to false) indicates if we are resetting the controls after save
     */
    /*
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
        getModels(templates, this.authentication, this.solutionItemId).then(models => {
          state.models = models;
  
          state.featureServices = getFeatureServices(templates);
          state.getStoreInfo("spatialReferenceInfo") = getSpatialReferenceInfo(state.featureServices, this._sourceItemData);
  
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
    */
    /**
     * Set Props with the initial values
     *
     * @protected
     */
    _initProps() {
        const solutionData = state.getStoreInfo("solutionData");
        this._templateHierarchy = [...utils.getInventoryItems(solutionData.templates)];
        if (this._solutionContentsComponent) {
            this._solutionContentsComponent.templateHierarchy = this._templateHierarchy;
        }
        let firstItem;
        if (this._templateHierarchy.length > 0) {
            // Start with the first item in the contents
            firstItem = state.getItemInfo(this._templateHierarchy[0].id);
        }
        this._currentEditItemId = firstItem ? firstItem.itemId : "";
    }
    /**
     * Loads a solution.
     *
     * @param solutionItemId AGO id of solution to load
     *
     * @returns Resolved promise when task is done
     *
     * @protected
     */
    async _loadSolution(solutionItemId) {
        if (solutionItemId) {
            this._solutionIsLoaded = false;
            await state.loadSolution(solutionItemId, this.authentication);
            this._initProps();
            this._solutionIsLoaded = true;
        }
        else {
            this._reset();
        }
        return Promise.resolve();
    }
    /**
     * Resets internal variables.
     *
     * @protected
     */
    _reset() {
        this._currentEditItemId = "";
        this._organizationVariables = "";
        this._solutionVariables = "";
        this._templateHierarchy = [];
    }
    /**
     * Toggle _treeOpen prop to show/hide content tree.
     *
     * @protected
     */
    _toggleTree() {
        this._treeOpen = !this._treeOpen;
    }
    /**
     * Dispatches an event indicating if the configuration is saveable or not. It's not saveable if there are no
     * changes or if there's an error in the JSON editor.
     *
     * @param solutionStoreHasChanges Are there changes in the configuration editor's internal store?
     * @param solutionEditorHasChanges Are there changes in the configuration editor's JSON editor?
     * @param solutionEditorHasErrors Are there errors in the configuration editor's JSON editor?
     *
     * @protected
     */
    _updateSaveability(solutionStoreHasChanges, solutionEditorHasChanges, solutionEditorHasErrors) {
        const updateSaveability = (solutionStoreHasChanges || solutionEditorHasChanges) && !solutionEditorHasErrors;
        if (this._canSave !== updateSaveability) {
            window.dispatchEvent(new CustomEvent("solutionCanSave", {
                detail: updateSaveability,
                bubbles: true,
                cancelable: false,
                composed: true
            }));
        }
        this._canSave = updateSaveability;
    }
    /**
     * Save all edits from the current configuration
     *
     * @returns a response that will indicate success or failure and any associated messages
     */
    /*
    protected async _save() {
      const templateUpdates = await this._updateTemplates();
      const data = this._setSrInfo(templateUpdates.templates);
      return templateUpdates.errors.length === 0 ? save(
        this.solutionItemId,
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
    */
    /**
     * Update the solutions templates based on the stored changes
     *
     * @returns an object that contains the updated templates as well as any errors that were found
     */
    /*
    protected async _updateTemplates(): Promise<IUpdateTemplateResponse> {
      const errors = [];
      const models = await this.getEditModels();
      let templates = this._updateGroupDependencies(models, this._templates);
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
    */
    /**
     * Review all models and store itemIds that should be added or removed from group dependencies
     *
     * @param models the corresponding models for the current templates
     *
     * @returns group info (an object with keys of groupIds and
     * arrays of itemIds that should be added or removed from group dependencies)
     */
    /*
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
    */
    /**
     * Updates group dependency arrays by adding or removing itemIds
     *
     * @param templates the current templates to update
     * @param models the corresponding models for the current templates
     *
     * @returns updated templates array
     */
    /*
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
    */
    /**
     * Add group IDs to items that should be shared
     * This function will update the provided template when shareInfo is available
     *
     * @param template the current template to update
     * @param shareInfo the corresponding shareInfo from the model for the current template
     *
     */
    /*
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
    */
    /**
     * Set a templates data property with changes from the models
     *
     * @param template the current template to update
     * @param model the corresponding model for the current template (stores any user changes)
     *
     * @returns a boolean that indicates if any errors were detected
     */
    /*
    protected _setData(
      template: any,
      model: any
    ): boolean {
      return this._setTemplateProp(
        template,
        model.dataOriginalValue,
        model.dataCurrentValue,
        "data"
      );
    }
    */
    /**
     * Set a templates properties property with changes from the models
     *
     * @param template the current template to update
     * @param model the corresponding model for the current template (stores any user changes)
     *
     * @returns a boolean that indicates if any errors were detected
     */
    /*
    protected _setProps(
      template: any,
      model: any
    ): boolean {
      return this._setTemplateProp(
        template,
        model.propsOriginalValue,
        model.propsCurrentValue,
        "properties"
      );
    }
    */
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
    /*
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
    */
    /**
     * Set a templates item property with changes from the models
     *
     * @param template the current template to update
     * @param model the corresponding model for the current template (stores any user changes)
     *
     * This function will update the template argument when edits are found
     */
    /*
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
    */
    /**
     * Set spatial reference info in the solutions data
     *
     * @param templates a list of item templates from the solution
     *
     * @returns a cloned copy of the solutions data that has been updated with spatial reference info
     *
     */
    /*
    protected _setSrInfo(
      templates: any[]
    ): any {
      const srInfo: any = state.getStoreInfo("spatialReferenceInfo");
  
      const serviceEnabled = typeof srInfo?.services === "undefined" ?
        false : Object.keys(srInfo.services).some(k => srInfo.services[k]);
  
      const data = cloneObject(this._sourceItemData);
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
    */
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get is() { return "solution-configuration"; }
    static get originalStyleUrls() {
        return {
            "$": ["solution-configuration.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["solution-configuration.css"]
        };
    }
    static get properties() {
        return {
            "authentication": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "UserSession",
                    "resolved": "UserSession",
                    "references": {
                        "UserSession": {
                            "location": "import",
                            "path": "@esri/solution-common",
                            "id": "node_modules::UserSession"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Credentials for requests, which can be a serialized UserSession"
                },
                "defaultValue": "new UserSession({})"
            },
            "serializedAuthentication": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "serialized-authentication",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "solutionItemId": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Contains the current solution item id"
                },
                "attribute": "solution-item-id",
                "reflect": true,
                "defaultValue": "\"\""
            },
            "showLoading": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Used to show/hide loading indicator"
                },
                "attribute": "show-loading",
                "reflect": true,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_currentEditItemId": {},
            "_organizationVariables": {},
            "_solutionContentsComponent": {},
            "_solutionIsLoaded": {},
            "_solutionVariables": {},
            "_templateHierarchy": {},
            "_translations": {},
            "_treeOpen": {}
        };
    }
    static get methods() {
        return {
            "getSpatialReferenceInfo": {
                "complexType": {
                    "signature": "() => Promise<ISolutionSpatialReferenceInfo>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "ISolutionSpatialReferenceInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISolutionSpatialReferenceInfo"
                        }
                    },
                    "return": "Promise<ISolutionSpatialReferenceInfo>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "saveSolution": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "unloadSolution": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "serializedAuthentication",
                "methodName": "serializedAuthenticationWatchHandler"
            }, {
                "propName": "solutionItemId",
                "methodName": "valueWatchHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "solutionItemSelected",
                "method": "_solutionItemSelected",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
