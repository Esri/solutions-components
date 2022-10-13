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

import { createStore } from "@stencil/store";
import {
  EUpdateType,
  IFeatureServiceEnabledStatus,
  IItemShare,
  IResourcePath,
  ISolutionTemplateEditItem,
  ISolutionTemplateEdits,
  ISolutionSpatialReferenceInfo
} from './interfaces';
import {
  generateStorageFilePaths,
  getItemDataAsJson,
  getProp,
  getThumbnailFromStorageItem,
  IDeployFileCopyPath,
  IItemTemplate,
  UserSession
} from '@esri/solution-common';

//--------------------------------------------------------------------------------------------------------------------//
//
// Loads a solution's definition and shares it as state across the solution configuration package components.
//
// Store contents:
//   * solutionItemId: [string] id of the current solution
//   * defaultWkid: [any] value of the solution's `params.wkid.default` data property, which may be undefined
//   * templates: [array] the `templates` property of the solution's data
//   * templateEdits: [object] original & current edited values of each template organized by the template's itemId
//       Each entry is of the form
//          interface ISolutionTemplateEdit {
//            itemId: string;
//            type: string;
//            current: ISolutionTemplateEditItem;  // the value being edited
//            original: ISolutionTemplateEditItem; // the snapshotted value
//          }
//       The current and original values have the form
//          interface ISolutionTemplateEditItem {
//            details: string;     // JSON.stringified item details
//            data: string;        // JSON.stringified item data
//            properties: string;  // JSON.stringified item properties
//            thumbnail: any;
//            resourceFilePaths: IResourcePath[];
//            groupDetails?: IItemShare[];
//          }
//   * featureServices: [array] a list of Feature service enablement status for SR configuration
//   * spatialReferenceInfo: [object] the current spatial reference (if enabled) and the services that use it
//       * enabled: [boolean] use the spatial reference
//       * services: [object] services using this spatial reference organized by the service name
//       * spatialReference: [object] the spatial reference
//
// Store singleton method:
//   * Store: Creates singleton instance when accessed; default export from module.
//     @example
//       import state from "../solution-store";
//       await state.loadSolution(...);
//
// Store instance methods:
//   * getItemInfo: Returns the stored information of an item.
//   * getStoreInfo: Returns a top-level store property: solutionItemId, defaultWkid, etc.
//   * keepItemChanges: Makes changes permanent in store by overwriting original values with the change values.
//   * loadSolution: Makes changes permanent in store by overwriting original values with the change values.
//   * setItemInfo: Stores information for item.
//   * setStoreInfo: Sets a top-level store property: solutionItemId, defaultWkid, etc.
//   * undoItemChanges: Undoes changes in store by overwriting change values with the original values.
//
// Store events:
//   * templatesChanged: Event for notifying about any change to the store.
//
//--------------------------------------------------------------------------------------------------------------------//

interface SolutionStoreData {
  solutionItemId: string,
  defaultWkid: string,
  templates: any[],
  templateEdits: ISolutionTemplateEdits,
  featureServices: IFeatureServiceEnabledStatus[],
  spatialReferenceInfo: ISolutionSpatialReferenceInfo
}

const EmptySolutionStore: SolutionStoreData = {
  solutionItemId: "",
  defaultWkid: undefined,
  templates: [],
  templateEdits: {},
  featureServices: [],
  spatialReferenceInfo: {
    enabled: false,
    services: {},
    spatialReference: undefined
  }
}

/**
 * Event for notifying about any change to the store.
 */
const templatesChangedEvent = new CustomEvent("templatesChanged", {
  bubbles: true,
  cancelable: false,
  composed: true
});

class SolutionStore
{
  protected static _instance: SolutionStore;

  protected _store: any;

  /**
   * Creates singleton instance when accessed; default export from module.
   *
   * @returns Static instance of the class
   */
  public static get Store(): SolutionStore {
    return this._instance || (this._instance = new this());
  }

  /**
   * Creates an empty store.
   *
   * @protected
   */
  protected constructor() {
    this._store = createStore({
      ...EmptySolutionStore
    });

    this._store.onChange("templateEdits", () => {
      //console.log("templatesChangedEvent");
      dispatchEvent(templatesChangedEvent);
    });
  }

  /**
   * Returns the stored information of an item.
   *
   * @param itemId Id of item to fetch
   *
   * @returns Item information or `undefined` if not found
   */
  public getItemInfo(
    itemId: string
  ): ISolutionTemplateEditItem {
    return this._store.get("templateEdits")[itemId]?.current;
  }

  /**
   * Returns a top-level store property: solutionItemId, defaultWkid, etc.
   *
   * @param propName Name of property
   *
   * @returns Value of property
   */
  public getStoreInfo(
    propName: string
  ): any {
    return this._store.get(propName);
  }

  /**
   * Makes changes permanent in store by overwriting original values with the change values.
   *
   * @returns Promise that resolves when task is done
   */
  public async keepItemChanges(
  ): Promise<void> {
    Object.keys(this._store.state.templateEdits).forEach(
      k => {
        this._store.state.templateEdits[k].original = {...this._store.state.templateEdits[k].current};
      }
    );
  }

  /**
   * Makes changes permanent in store by overwriting original values with the change values.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns Promise that resolves when task is done
   */
  public async loadSolution(
    solutionItemId: string,
    authentication: UserSession
  ): Promise<void> {
    const solutionData = await getItemDataAsJson(solutionItemId, authentication);
    if (solutionData) {
      const defaultWkid = getProp(solutionData, "params.wkid.default");
      const templateEdits = await this._prepareSolutionItems(solutionItemId, solutionData.templates, authentication);
      const featureServices = this._getFeatureServices(solutionData.templates);
      const spatialReferenceInfo = this._getSpatialReferenceInfo(featureServices, defaultWkid);

      this._store.set("solutionItemId", solutionItemId);
      this._store.set("defaultWkid", defaultWkid);
      this._store.set("templates", solutionData.templates);

      this._store.set("templateEdits", templateEdits);
      this._store.set("featureServices", featureServices);
      this._store.set("spatialReferenceInfo", spatialReferenceInfo);
    } else {
      this._emptyTheStore();
    }
  }

  /**
   * Stores information for item.
   *
   * @param itemId Id of item to fetch
   * @param itemEdit Item information; a `ReferenceError` exception is thrown if the item is not in the store
   */
  public setItemInfo(
    itemId: string,
    itemEdit: ISolutionTemplateEditItem
  ): void {
    const item = this._store.get("templateEdits")[itemId];
    if (!item) {
      throw new ReferenceError(itemId);
    }

    item.current = {...itemEdit};
  }

  /**
   * Sets a top-level store property: solutionItemId, defaultWkid, etc.
   *
   * @param propName Name of property
   * @param value Value of property
   */
  public setStoreInfo(
    propName: string,
    value: any
  ): void {
    this._store.set(propName, value);
  }

  /**
   * Undoes changes in store by overwriting change values with the original values.
   *
   * @returns Promise that resolves when task is done
   */
  public async undoItemChanges(
  ): Promise<void> {
    Object.keys(this._store.state.templateEdits).forEach(
      k => {
        this._store.state.templateEdits[k].current = {...this._store.state.templateEdits[k].original};
      }
    );
  }

  //------------------------------------------------------------------------------------------------------------------//

  /** Provides access to protected methods for unit testing.
   *
   *  @param methodName Name of protected method to run
   *  @param arg1 First argument to forward to method, e.g., for "_prepareSolutionItems", `solutionItemId`
   *  @param arg2 Second argument to forward to method, e.g., for "_prepareSolutionItems", `templates`
   *  @param arg3 Third argument to forward to method, e.g., for "_prepareSolutionItems", `authentication`
   *
   *  @returns
   */
  public _testAccess(
    methodName: string,
    arg1?: any,
    arg2?: any,
    arg3?: any
  ): any {
    switch (methodName) {
      case "_emptyTheStore":
        this._emptyTheStore();
        break;
      case "_getFeatureServices":
        return this._getFeatureServices(arg1);
      case "_getItemsSharedWithThisGroup":
        return this._getItemsSharedWithThisGroup(arg1, arg2);
      case "_getResourceFilePaths":
        return this._getResourceFilePaths(arg1, arg2, arg3);
      case "_getSpatialReferenceInfo":
        return this._getSpatialReferenceInfo(arg1, arg2);
      case "_getThumbnails":
        return this._getThumbnails(arg1, arg2);
      case "_prepareSolutionItems":
        return this._prepareSolutionItems(arg1, arg2, arg3);
    }
    return null;
  }

  /**
   * Returns the store to the empty state.
   *
   * @protected
   */
  protected _emptyTheStore(): void {
    this._store.set("solutionItemId", EmptySolutionStore.solutionItemId);
    this._store.set("defaultWkid", EmptySolutionStore.defaultWkid);
    this._store.set("templates", EmptySolutionStore.templates);
    this._store.set("templateEdits", EmptySolutionStore.templateEdits);
    this._store.set("featureServices", EmptySolutionStore.featureServices);
    this._store.set("spatialReferenceInfo", EmptySolutionStore.spatialReferenceInfo);
  }

  /**
   * Gets a list of Feature Services that are not views along with an enabled property that indicates
   * if the service currently uses a spatial reference variable.
   *
   * @param templates A list of item templates from the solution
   *
   * @returns a list of feature service names and an enabled property to indicate
   * if they currently use a spatial reference variable.
   *
   * @protected
   */
  protected _getFeatureServices(
    templates: any[]
  ): IFeatureServiceEnabledStatus[] {
    return templates.reduce((prev, cur) => {
      const name: string = cur.item.title || cur.item.name;
      if (cur.type === "Feature Service" &&
        cur.item.typeKeywords.indexOf("View Service") < 0 &&
        prev.indexOf(name) < 0
      ) {
        const wkid = getProp(cur, "properties.service.spatialReference.wkid");
        prev.push({ name, enabled: wkid.toString().startsWith("{{params.wkid||") });
      }
      return prev;
    }, []);
  }

  /**
   * Capture the key item details for a given group template
   *
   * @param template one of the templates from the current solution
   * @param templates full list of templates
   *
   * @returns a list of IItemShare objects
   *
   * @protected
   */
  protected _getItemsSharedWithThisGroup(
    template: IItemTemplate,
    templates: IItemTemplate[]
  ): IItemShare[] {
    return templates.reduce((prev, cur) => {
      if (cur.itemId !== template.itemId && cur.type !== "Group") {
        prev.push({
          id: cur.itemId,
          title: cur.item.name || cur.item.title,
          isShared: (cur.groups || []).indexOf(template.itemId) > -1,
          shareItem: (cur.groups || []).indexOf(template.itemId) > -1,
          type: cur.type,
          typeKeywords: cur.item.typeKeywords
        });
      }
      return prev;
    }, []);
  }

  /**
   * Generate storage file paths from the solution template
   *
   * @param solutionId the id of the current solution
   * @param template the current template from the solution
   * @param portal Portal where file is to be found
   *
   * @returns a list of resource file infos
   *
   * @protected
   */
  protected _getResourceFilePaths(
    solutionId: string,
    template: any,
    portal: string
  ): IResourcePath[] {
    const resourceFilePaths: IDeployFileCopyPath[] = generateStorageFilePaths(
      portal,
      solutionId,
      template.resources,
      1
    );
    return resourceFilePaths.map((fp: any) => {
      fp.updateType = EUpdateType.None;
      return fp;
    }) as IResourcePath[];
  }

  /**
   * Stores basic spatial reference information that is used to determine if a custom spatial reference parameter will
   * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
   *
   * @param services a list of objects with service name and enabled property (indicates if they currently use a spatial reference var)
   * @param data the data object of a solution item
   *
   * @returns an object that stores if a custom spatial reference parameter is enabled/disabled,
   * a list of services and if they are enabled/disabled, and the default wkid
   *
   * @protected
   */
  protected _getSpatialReferenceInfo(
    services: any[],
    defaultWkid: any
  ): ISolutionSpatialReferenceInfo {
    const defaultServices: any = {};
    services.forEach(service => {
      defaultServices[service.name] = service.enabled;
    });
    return {
      enabled: defaultWkid !== undefined && defaultWkid !== "",
      services: defaultServices,
      spatialReference: defaultWkid ? { defaultWkid } : undefined
    }
  }

  /**
   * Fetch thumbnails from the item resources
   *
   * @param templateEdits the set of items for the current solution item
   * @param authentication credentials for any requests
   *
   * @returns A promise which resolves to ISolutionTemplateEdits with hydrated thumbnails
   *
   * @protected
   */
  protected _getThumbnails(
    templateEdits: ISolutionTemplateEdits,
    authentication: UserSession
  ): Promise<ISolutionTemplateEdits> {
    return new Promise<any>((resolve, reject) => {
      const thumbnailPromises = [];
      const _ids = [];
      Object.keys(templateEdits).forEach(k => {
        thumbnailPromises.push(
          templateEdits[k].current.resourceFilePaths.length > 0 ?
            getThumbnailFromStorageItem(authentication, templateEdits[k].current.resourceFilePaths) :
            Promise.resolve()
        );
        _ids.push(k);
      });
      Promise.all(thumbnailPromises).then(
        r => {
          r.forEach((thumbnail, i) => {
            if (thumbnail) {
              const templateEdit = templateEdits[_ids[i]];
              templateEdit.current.thumbnail = templateEdit.original.thumbnail = thumbnail;
            }
          });
          resolve(templateEdits);
        },
        reject
      );
    });
  }

  /**
   * Create and store text items for the editor as well as other key values such as the original values
   * that can be used to clear any temp edits.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param templates A list of item templates from the solution
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns a promise that resolves a list of items and key values
   *
   * @protected
   */
  protected _prepareSolutionItems(
    solutionItemId: string,
    templates: IItemTemplate[],
    authentication: UserSession
  ): Promise<ISolutionTemplateEdits> {
    const ids: string[] = [];
    const templateEdits: ISolutionTemplateEdits = {};
    templates.forEach(t => {
      ids.push(t.itemId);
      const resourceFilePaths: IResourcePath[] = this._getResourceFilePaths(
        solutionItemId,
        t,
        authentication.portal
      );

      const editItem: ISolutionTemplateEditItem = {
        details: JSON.stringify(t.item),
        data: JSON.stringify(t.data, null, 2),
        properties: JSON.stringify(t.properties, null, 2),
        thumbnail: undefined,  // retain thumbnails in store as they get messed up if you emit them in events
        resourceFilePaths
      };

      editItem.groupDetails = t.type === "Group" ? this._getItemsSharedWithThisGroup(t, templates) : [];

      templateEdits[t.itemId] = {
        itemId: t.itemId,
        type: t.type,
        current: editItem,
        original: {...editItem}  // make sure that the object is different than the one assigned to the `current` property
      };
    });
    return this._getThumbnails(templateEdits, authentication);
  }
}

export default SolutionStore.Store;
