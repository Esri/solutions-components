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
  IItemTemplateEdit,
  IResourcePath,
  ISolutionTemplateEdits,
  ISolutionSpatialReferenceInfo
} from './interfaces';
import {
  EFileType,
  SolutionTemplateFormatVersion,
  copyFilesToStorageItem,
  generateStorageFilePaths,
  getItemDataAsJson,
  getProp,
  getThumbnailFromStorageItem,
  IDeployFileCopyPath,
  IItemTemplate,
  IItemUpdate,
  ISolutionItemData,
  ISourceFile,
  isSupportedFileType,
  removeItemResourceFile,
  setCreateProp,
  updateItem,
  updateItemResourceFile,
  UserSession
} from '@esri/solution-common';

//--------------------------------------------------------------------------------------------------------------------//
//
// Loads a solution's definition and shares it as state across the solution configuration package components.
//
// Store contents:
//   * solutionItemId: [string] id of the current solution
//   * defaultWkid: [any] value of the solution's `params.wkid.default` data property, which may be undefined
//   * solutionData: [ISolutionItemData] the solution's data, which is modified in-place
//   * featureServices: [array] a list of Feature services that use a spatial reference var
//   * spatialReferenceInfo: [object] the current spatial reference (if enabled) and the services that use it
//       * enabled: [boolean] use the spatial reference
//       * services: [object] for each service in featureServices by service name, a switch indicating if the
//           custom spatial reference parameter is enabled/disabled
//       * spatialReference: [object] the custom spatial reference wkid
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
//   * loadSolution: Loads a Solution into the store from AGO.
//   * replaceItemThumbnail: Replaces the thumbnail associated with a template item in the store.
//   * saveSolution: Writes a Solution into AGO from the store.
//   * setItemInfo: Stores information for item.
//   * setStoreInfo: Sets a top-level store property: solutionItemId, defaultWkid, etc.
//
// Store events:
//   * solutionStoreHasChanges: Event for notifying if the store has changes or not.
//
//--------------------------------------------------------------------------------------------------------------------//

interface ISolutionStoreData {
  solutionItemId: string,
  defaultWkid: string,
  solutionData: ISolutionItemData,
  templateEdits: ISolutionTemplateEdits,
  featureServices: IFeatureServiceEnabledStatus[],
  spatialReferenceInfo: ISolutionSpatialReferenceInfo
}

const EmptySolutionStore: ISolutionStoreData = {
  solutionItemId: "",
  defaultWkid: undefined,
  solutionData: { metadata: {}, templates: [] },
  templateEdits: {},
  featureServices: [],
  spatialReferenceInfo: {
    enabled: false,
    services: {},
    spatialReference: undefined
  }
}

class SolutionStore
{
  protected static _instance: SolutionStore;

  protected _store: any;

  protected _hasChanges = false;

  protected _authentication: UserSession;

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
  ): IItemTemplateEdit {
    const templates = this._store.get("solutionData").templates as IItemTemplateEdit[];

    let template: IItemTemplateEdit;
    templates.some((t: IItemTemplateEdit) => {
      if (itemId == t.itemId) {
        template = t;
        return true;
      }
      return false;
    });

    return template;
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
    const value = this._store.get(propName);//???).substring(0, Math.min(50, JSON.stringify(this._store.get(propName)).length);//???
    if (propName === "spatialReferenceInfo" || propName === "featureServices") { console.log("GET StoreInfo " + propName + ": " + JSON.stringify(value, null, 2)) } //???
    else if (propName === "defaultWkid") { console.log("SET StoreInfo " + propName + ": ", value) } //???
    else { console.log("GET StoreInfo " + propName + ": " + JSON.stringify(value.templates.map(template => { return {  //???
      name: template.item.name, title: template.item.title, type: template.item.type }; } ), null, 2 ) ); } //???
    return this._store.get(propName);
  }

  /**
   * Loads a Solution into the store from AGO.
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
    this._authentication = authentication;

    const solutionData = await getItemDataAsJson(solutionItemId, authentication);
    if (solutionData) {
      const defaultWkid: string | number = getProp(solutionData, "params.wkid.default");
      await this._prepareSolutionItemsForEditing(solutionItemId, solutionData.templates, authentication);
      const featureServices = this._getFeatureServices(solutionData.templates);
      const spatialReferenceInfo = this._getSpatialReferenceInfo(featureServices, defaultWkid);

      this._store.set("solutionItemId", solutionItemId);
      this._store.set("defaultWkid", defaultWkid);
      this._store.set("solutionData", solutionData);
      this._store.set("featureServices", featureServices);
      this._store.set("spatialReferenceInfo", spatialReferenceInfo);
    }
    this._flagStoreHasChanges(false);
  }

  /**
   * Queues the replacement of the thumbnail associated with a template item in the store.
   *
   * @param itemEdit Details of the template to modify, containing the new thumbnail in the `thumbnail`
   * property
   */
  public replaceItemThumbnail(
    itemEdit: IItemTemplateEdit
  ): void {
    // Flag the current thumbnail and any replacements for removal
    itemEdit.resourceFilePaths.forEach((path: IResourcePath) => {
      if (path.type === EFileType.Thumbnail) {
        if (path.updateType === EUpdateType.None) {
          // Existing thumbnail not yet flagged for removal
          path.updateType = EUpdateType.Remove;
        } else if (path.updateType === EUpdateType.Add || path.updateType === EUpdateType.Update) {
          // An earlier replacement
          path.updateType = EUpdateType.Obsolete;
        }
      }
    });

    // Remove any replacements already queued
    itemEdit.resourceFilePaths =
      itemEdit.resourceFilePaths.filter((path: IResourcePath) => path.updateType != EUpdateType.Obsolete)

    // Add the new thumbnail to the store item
    itemEdit.resourceFilePaths.push({
      blob: itemEdit.thumbnail,
      filename: itemEdit.thumbnail.name,
      type: EFileType.Thumbnail,
      updateType: EUpdateType.Add
    } as IResourcePath);

    // Update the store
    this.setItemInfo(itemEdit);
  }

  /**
   * Writes a Solution into AGO from the store. Must use `loadSolution` to continue with solution.
   *
   * @returns Promise that resolves when task is done
   */
  public async saveSolution(
  ): Promise<void> {
    // Update the templates in the original solution item data
    const solutionItemId = this._store.get("solutionItemId");
    const solutionData = this._store.get("solutionData");
    const spatialReferenceInfo = this._store.get("spatialReferenceInfo");

    await this._prepareSolutionItemsForStorage(solutionItemId, solutionData.templates, this._authentication);
    const updatedDefaultWkid = this._setSpatialReferenceInfo(spatialReferenceInfo, solutionData.templates);
    if (updatedDefaultWkid) {
      setCreateProp(solutionData, "params.wkid", {
        "label": "Spatial Reference",
        "default": updatedDefaultWkid,
        "valueType": "spatialReference",
        "attributes": {
          "required": "true"
        }
      });
    } else {
      setCreateProp(solutionData, "params.wkid", {});
    }

    const itemInfo: IItemUpdate = {
      id: solutionItemId,
      text: solutionData
    };
    await updateItem(itemInfo, this._authentication);
  }

  /**
   * Stores information for item.
   *
   * @param itemEdit Item information
   */
  public setItemInfo(
    itemEdit: IItemTemplateEdit
  ): void {
    const solutionData = this._store.get("solutionData");
    const templates = solutionData.templates as IItemTemplateEdit[];

    templates.some((t: IItemTemplateEdit) => {
      if (itemEdit.itemId == t.itemId) {
        t = itemEdit;
        this._store.set("solutionData", solutionData);
        this._flagStoreHasChanges(true);
        return true;
      }
      return false;
    });
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
    if (propName === "spatialReferenceInfo" || propName === "featureServices") { console.log("SET StoreInfo " + propName + ": " + JSON.stringify(value, null, 2)) } //???
    else if (propName === "defaultWkid") { console.log("SET StoreInfo " + propName + ": ", value) } //???
    else { console.log("GET StoreInfo " + propName + ": " + JSON.stringify(value.templates.map(template => { return {  //???
      name: template.item.name, title: template.item.title, type: template.item.type }; } ), null, 2 ) ); } //???
    this._store.set(propName, value);
    this._flagStoreHasChanges(true);
}

  //------------------------------------------------------------------------------------------------------------------//

  /** Provides access to protected methods for unit testing.
   *
   *  @param methodName Name of protected method to run
   *  @param arg1 First argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `solutionItemId`
   *  @param arg2 Second argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `templates`
   *  @param arg3 Third argument to forward to method, e.g., for "_prepareSolutionItemsForEditing", `authentication`
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
      case "_getResourceStorageName":
        return this._getResourceStorageName(arg1, arg2);
      case "_getSpatialReferenceInfo":
        return this._getSpatialReferenceInfo(arg1, arg2);
      case "_prepareSolutionItemsForEditing":
        return this._prepareSolutionItemsForEditing(arg1, arg2, arg3);
      case "_prepareSolutionItemsForStorage":
        return this._prepareSolutionItemsForStorage(arg1, arg2, arg3);
      case "_setSpatialReferenceInfo":
        return this._setSpatialReferenceInfo(arg1, arg2);
      case "_splitFilename":
        return this._splitFilename(arg1);
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
    this._store.set("solutionData", EmptySolutionStore.solutionData);
    this._store.set("templateEdits", EmptySolutionStore.templateEdits);
    this._store.set("featureServices", EmptySolutionStore.featureServices);
    this._store.set("spatialReferenceInfo", EmptySolutionStore.spatialReferenceInfo);
  }

  /**
   * Sets the store's flag indicating if it has changes and dispatches an event when
   * the flag value changes.
   *
   * @param flagHasChanges Current state of change in the store; if it doesn't match the value saved in this
   * object, an event is dispatched with the new value and the saved value is updated
   *
   * @protected
   */
  protected _flagStoreHasChanges(flagHasChanges: boolean): void {
    // Event for notifying if the store has changes or not
    //???if (this._hasChanges !== flagHasChanges) {
      window.dispatchEvent(new CustomEvent("solutionStoreHasChanges", {
        detail: flagHasChanges,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
    //???}

    this._hasChanges = flagHasChanges;
  }

  /**
   * Gets a list of Feature Services that are not views.
   *
   * @param templates A list of item templates from the solution
   *
   * @returns a list of feature services
   *
   * @protected
   */
  protected _getCustomizableFeatureServices(
    templates: IItemTemplate[]
  ): IItemTemplate[] {
    return templates.reduce((prev, cur) => {
      if (cur.type === "Feature Service" && cur.item.typeKeywords.indexOf("View Service") < 0) {
        console.log("customizable fs:", cur.title);//???
        prev.push(cur);
      } else { console.log("non-customizable fs:", cur.title, cur.type, cur.item.typeKeywords);//???
      }
      return prev;
    }, []);
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
    templates: IItemTemplate[]
  ): IFeatureServiceEnabledStatus[] {
    const customizeableFeatureServices = this._getCustomizableFeatureServices(templates);
    return customizeableFeatureServices.map(
      (fs) => {
        const name: string = fs.item.title || fs.item.name;
        const wkid = getProp(fs, "properties.service.spatialReference.wkid");
        return { name, enabled: wkid.toString().startsWith("{{params.wkid||") } as IFeatureServiceEnabledStatus;
      }
    );
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
      SolutionTemplateFormatVersion
    );
    return resourceFilePaths.map((fp: any) => {
      fp.updateType = EUpdateType.None;
      return fp;
    }) as IResourcePath[];
  }

  /**
   * Generates a resource name from a storage file path.
   *
   * @param templateItemId The id of the template item whose resource this is; used as a prefix in the resource name
   * @param resourcePath Resource file infos
   *
   * @returns The resource name to use when attaching a resource to the item.
   *
   * @protected
   */
  protected _getResourceStorageName(
    templateItemId: string,
    resourcePath: IResourcePath
  ): string {
    /* Converts
      {
        "url": "https://myorg.maps.arcgis.com/sharing/rest/content/items/ca924c6db7d247b9a31fa30532fb5913/resources/79036430a6274e17ae915d0278b8569c_info_metadata/metadata.xml",
        "type": 2,
        "folder": "",
        "filename": "metadata.xml",
        "updateType": 3
      }
      to
      ca924c6db7d247b9a31fa30532fb5913_info_metadata/metadata.xml
    */
    let prefix = templateItemId;
    switch (resourcePath.type) {
      case EFileType.Data:
        prefix = `${prefix}_info_data`;
        break;
      case EFileType.Info:
        prefix = `${prefix}_info`;
        break;
      case EFileType.Metadata:
        prefix = `${prefix}_info_metadata`;
        break;
      case EFileType.Resource:
        break;
      case EFileType.Thumbnail:
        prefix = `${prefix}_info_thumbnail`;
        break;
    }

    let filenameToUse = resourcePath.filename;
    if (resourcePath.type == EFileType.Data && filenameToUse && !isSupportedFileType(filenameToUse)) {
      filenameToUse = filenameToUse + ".zip";
      prefix += "z";
    }

    const filename = resourcePath.folder ? resourcePath.folder + "/" + filenameToUse : filenameToUse;

    return prefix + "/" + filename;
  }

  /**
   * Extracts basic spatial reference information that is used to determine if a custom spatial reference parameter will
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
    defaultWkid: string | number
  ): ISolutionSpatialReferenceInfo {
    const defaultServices: any = {};
    services.forEach(service => {
      defaultServices[service.name] = service.enabled;
    });

    return {
      enabled: defaultWkid !== undefined,
      services: defaultServices,
      spatialReference: defaultWkid ? defaultWkid : undefined
    }
  }

  /**
   * Create and store template items for the editor.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param templates A list of item templates from the solution
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns a promise that resolves when the templates are ready
   *
   * @protected
   */
  protected async _prepareSolutionItemsForEditing(
    solutionItemId: string,
    templates: IItemTemplate[],
    authentication: UserSession
  ): Promise<void> {
    const thumbnailPromises = [];

    // Augment the template with paths to resources and group information, if relevant
    templates.forEach((t: IItemTemplateEdit) => {
      t.resourceFilePaths = this._getResourceFilePaths(
        solutionItemId,
        t,
        authentication.portal
      );
      thumbnailPromises.push(
        t.resourceFilePaths.length > 0 ?
          getThumbnailFromStorageItem(authentication, t.resourceFilePaths) :
          Promise.resolve()
      );

      t.groupDetails = t.type === "Group" ? this._getItemsSharedWithThisGroup(t, templates) : [];
    });

    // Augment the template with its thumbnail file
    const thumbnails = await Promise.all(thumbnailPromises);
    templates.forEach((t: IItemTemplateEdit, i: number) => {
      t.thumbnail = thumbnails[i] ? thumbnails[i] : undefined;
    });

    return Promise.resolve();
  }

  /**
   * Prepares template items for sending to AGO by updating the resources held by the solution item.
   *
   * @param solutionItemId Id of the solution represented in the store
   * @param templates A list of item templates from the solution
   * @param authentication Credentials for fetching information to be loaded into the store
   *
   * @returns a promise that resolves when the templates are ready
   *
   * @protected
   */
  protected async _prepareSolutionItemsForStorage(
    solutionItemId: string,
    templates: IItemTemplateEdit[],
    authentication: UserSession
  ): Promise<void> {
    const resourceAdds: ISourceFile[] = [];

    // Update the resources and remove the augmentation from a template
    const pendingTasks: Promise<void>[] = [];
    templates.forEach((t) => {

      // Run through the resourceFilePaths for the item seeking modifications to be made to the solution item's
      // collection of resources; queue them for batching
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      t.resourceFilePaths.forEach(async (path: IResourcePath): Promise<void> => {
        const storageName = this._getResourceStorageName(t.itemId, path);

        switch (path.updateType) {

          case EUpdateType.Add:
            const {prefix, suffix } = this._splitFilename(storageName);
            t.resources.push(storageName);
            resourceAdds.push({
              itemId: t.itemId,
              file: path.blob,
              folder: prefix,
              filename: suffix
            } as ISourceFile);
            break;

          case EUpdateType.Update:
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            pendingTasks.push(new Promise<void>(async (resolve): Promise<void> => {
              try {
                await updateItemResourceFile(solutionItemId, storageName, path.blob, authentication);
              } catch (err) {
                console.log("Unable to update " + storageName + " for item " + t.itemId + ": " + JSON.stringify(err));
              }
              resolve();
            }));
            break;

          case EUpdateType.Remove:
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            pendingTasks.push(new Promise<void>(async (resolve): Promise<void> => {
              try {
                await removeItemResourceFile(solutionItemId, storageName, authentication);
                t.resources = t.resources.filter((path: string) => path !== storageName);
              } catch (err) {
                console.log("Unable to remove " + storageName + " for item " + t.itemId + ": " + JSON.stringify(err));
              }
              resolve();
            }));
            break;

        }
        return Promise.resolve();
      });

      delete t.resourceFilePaths;
      delete t.thumbnail;
      delete t.groupDetails;
    });

    // Update the resources
    return Promise.all(pendingTasks)
    .then(async () => {
      if (resourceAdds.length > 0) {
        await copyFilesToStorageItem(resourceAdds, solutionItemId, authentication);
      }
      return Promise.resolve();
    });
  }

  /**
   * Stores basic spatial reference information that is used to determine if a custom spatial reference parameter will
   * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
   *
   * @param spatialReferenceInfo The configuration settings for a custom spatial reference
   * @param templates The templates in the current solution, which will be updated in place if
   * `spatialReferenceInfo.enabled` is true
   *
   * @returns The new default wkid
   *
   * @protected
   */
  protected _setSpatialReferenceInfo(
    spatialReferenceInfo: ISolutionSpatialReferenceInfo,
    templates: IItemTemplateEdit[]
  ): string | number {
    const customizingPrefix = "{{params.wkid||";
    const customizeableFeatureServices = this._getCustomizableFeatureServices(templates);

    if (spatialReferenceInfo.enabled) {
      // Enable or disable this feature in each service
      customizeableFeatureServices.forEach(
        (fs) => {
          const name: string = fs.item.title || fs.item.name;
          let wkid: any;
          if (spatialReferenceInfo.services[name] ) {  // enabled
            wkid = `{{params.wkid||${spatialReferenceInfo.spatialReference}}}`;
            setCreateProp(fs, "properties.service.spatialReference.wkid", wkid);

          } else {                                     // disabled
            wkid = getProp(fs, "properties.service.spatialReference.wkid");
            // Remove customizing prefix if present
            if (wkid.toString().startsWith(customizingPrefix)) {
              wkid = wkid.toString().substring(customizingPrefix.length, wkid.length - 2);
              setCreateProp(fs, "properties.service.spatialReference.wkid", wkid);
            }
          }
        }
      );
      return spatialReferenceInfo.spatialReference;

    } else {
      // Disable this feature in each service
      customizeableFeatureServices.forEach(
        (fs) => {
          const wkid = getProp(fs, "properties.service.spatialReference.wkid");
          // Remove customizing prefix if present
          if (wkid.toString().startsWith(customizingPrefix)) {
            setCreateProp(fs, "properties.service.spatialReference.wkid",
              wkid.toString().substring(customizingPrefix.length, wkid.length - 2));
          }
        }
      );
      return undefined;
    }
  }

  /**
   * Splits a pathed filename into a last term and a prefix; e.g., "a/b/c" returns "c" with a prefix of "a/b".
   *
   * @param filename Filename with optional path
   *
   * @returns An object consisting of a `prefix` (undefined if `filename` does not contain a path) and a `suffix`--the
   * filename at the end of a path
   *
   * @protected
   */
  protected _splitFilename(
    filename: string
  ): { prefix: string, suffix: string } {
    const filenameParts = filename.split("/");
    return {
      prefix: filenameParts.length > 1 ? filenameParts.slice(0, filenameParts.length - 1).join("/") : undefined,
      suffix: filenameParts[filenameParts.length - 1]
    };
  }
}

export default SolutionStore.Store;
