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
import { createStore } from "@stencil/store";
import { EUpdateType } from './interfaces';
import { EFileType, SolutionTemplateFormatVersion, copyFilesToStorageItem, generateStorageFilePaths, getItemDataAsJson, getProp, getThumbnailFromStorageItem, isSupportedFileType, removeItemResourceFile, setCreateProp, updateItem, updateItemResourceFile } from '@esri/solution-common';
const EmptySolutionStore = {
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
};
class SolutionStore {
  /**
   * Creates singleton instance when accessed; default export from module.
   *
   * @returns Static instance of the class
   */
  static get Store() {
    return this._instance || (this._instance = new this());
  }
  /**
   * Creates an empty store.
   *
   * @protected
   */
  constructor() {
    this._hasChanges = false;
    this._store = createStore(Object.assign({}, EmptySolutionStore));
  }
  /**
   * Returns the stored information of an item.
   *
   * @param itemId Id of item to fetch
   *
   * @returns Item information or `undefined` if not found
   */
  getItemInfo(itemId) {
    const templates = this._store.get("solutionData").templates;
    let template;
    templates.some((t) => {
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
  getStoreInfo(propName) {
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
  async loadSolution(solutionItemId, authentication) {
    this._authentication = authentication;
    const solutionData = await getItemDataAsJson(solutionItemId, authentication);
    if (solutionData) {
      const defaultWkid = getProp(solutionData, "params.wkid.default");
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
  replaceItemThumbnail(itemEdit) {
    // Flag the current thumbnail and any replacements for removal
    itemEdit.resourceFilePaths.forEach((path) => {
      if (path.type === EFileType.Thumbnail) {
        if (path.updateType === EUpdateType.None) {
          // Existing thumbnail not yet flagged for removal
          path.updateType = EUpdateType.Remove;
        }
        else if (path.updateType === EUpdateType.Add || path.updateType === EUpdateType.Update) {
          // An earlier replacement
          path.updateType = EUpdateType.Obsolete;
        }
      }
    });
    // Remove any replacements already queued
    itemEdit.resourceFilePaths =
      itemEdit.resourceFilePaths.filter((path) => path.updateType != EUpdateType.Obsolete);
    // Add the new thumbnail to the store item
    itemEdit.resourceFilePaths.push({
      blob: itemEdit.thumbnail,
      filename: itemEdit.thumbnail.name,
      type: EFileType.Thumbnail,
      updateType: EUpdateType.Add
    });
    // Update the store
    this.setItemInfo(itemEdit);
  }
  /**
   * Writes a Solution into AGO from the store. Must use `loadSolution` to continue with solution.
   *
   * @returns Promise that resolves when task is done
   */
  async saveSolution() {
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
    }
    else {
      setCreateProp(solutionData, "params.wkid", {});
    }
    const itemInfo = {
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
  setItemInfo(itemEdit) {
    const solutionData = this._store.get("solutionData");
    const templates = solutionData.templates;
    templates.some((t) => {
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
  setStoreInfo(propName, value) {
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
  _testAccess(methodName, arg1, arg2, arg3) {
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
  _emptyTheStore() {
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
  _flagStoreHasChanges(flagHasChanges) {
    // Event for notifying if the store has changes or not
    if (this._hasChanges !== flagHasChanges) {
      window.dispatchEvent(new CustomEvent("solutionStoreHasChanges", {
        detail: flagHasChanges,
        bubbles: true,
        cancelable: false,
        composed: true
      }));
    }
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
  _getCustomizableFeatureServices(templates) {
    return templates.reduce((prev, cur) => {
      if (cur.type === "Feature Service" && cur.item.typeKeywords.indexOf("View Service") < 0) {
        prev.push(cur);
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
  _getFeatureServices(templates) {
    const customizeableFeatureServices = this._getCustomizableFeatureServices(templates);
    return customizeableFeatureServices.map((fs) => {
      const name = fs.item.title || fs.item.name;
      const wkid = getProp(fs, "properties.service.spatialReference.wkid");
      return { name, enabled: wkid.toString().startsWith("{{params.wkid||") };
    });
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
  _getItemsSharedWithThisGroup(template, templates) {
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
  _getResourceFilePaths(solutionId, template, portal) {
    const resourceFilePaths = generateStorageFilePaths(portal, solutionId, template.resources, SolutionTemplateFormatVersion);
    return resourceFilePaths.map((fp) => {
      fp.updateType = EUpdateType.None;
      return fp;
    });
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
  _getResourceStorageName(templateItemId, resourcePath) {
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
  _getSpatialReferenceInfo(services, defaultWkid) {
    const defaultServices = {};
    services.forEach(service => {
      defaultServices[service.name] = service.enabled;
    });
    return {
      enabled: defaultWkid !== undefined,
      services: defaultServices,
      spatialReference: defaultWkid ? defaultWkid : undefined
    };
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
  async _prepareSolutionItemsForEditing(solutionItemId, templates, authentication) {
    const thumbnailPromises = [];
    // Augment the template with paths to resources and group information, if relevant
    templates.forEach((t) => {
      t.resourceFilePaths = this._getResourceFilePaths(solutionItemId, t, authentication.portal);
      thumbnailPromises.push(t.resourceFilePaths.length > 0 ?
        getThumbnailFromStorageItem(authentication, t.resourceFilePaths) :
        Promise.resolve());
      t.groupDetails = t.type === "Group" ? this._getItemsSharedWithThisGroup(t, templates) : [];
    });
    // Augment the template with its thumbnail file
    const thumbnails = await Promise.all(thumbnailPromises);
    templates.forEach((t, i) => {
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
  async _prepareSolutionItemsForStorage(solutionItemId, templates, authentication) {
    const resourceAdds = [];
    // Update the resources and remove the augmentation from a template
    const pendingTasks = [];
    templates.forEach((t) => {
      // Run through the resourceFilePaths for the item seeking modifications to be made to the solution item's
      // collection of resources; queue them for batching
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      t.resourceFilePaths.forEach(async (path) => {
        const storageName = this._getResourceStorageName(t.itemId, path);
        switch (path.updateType) {
          case EUpdateType.Add:
            const { prefix, suffix } = this._splitFilename(storageName);
            t.resources.push(storageName);
            resourceAdds.push({
              itemId: t.itemId,
              file: path.blob,
              folder: prefix,
              filename: suffix
            });
            break;
          case EUpdateType.Update:
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            pendingTasks.push(new Promise(async (resolve) => {
              try {
                await updateItemResourceFile(solutionItemId, storageName, path.blob, authentication);
              }
              catch (err) {
                console.log("Unable to update " + storageName + " for item " + t.itemId + ": " + JSON.stringify(err));
              }
              resolve();
            }));
            break;
          case EUpdateType.Remove:
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            pendingTasks.push(new Promise(async (resolve) => {
              try {
                await removeItemResourceFile(solutionItemId, storageName, authentication);
                t.resources = t.resources.filter((path) => path !== storageName);
              }
              catch (err) {
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
  _setSpatialReferenceInfo(spatialReferenceInfo, templates) {
    const customizingPrefix = "{{params.wkid||";
    const customizeableFeatureServices = this._getCustomizableFeatureServices(templates);
    if (spatialReferenceInfo.enabled) {
      // Enable or disable this feature in each service
      customizeableFeatureServices.forEach((fs) => {
        const name = fs.item.title || fs.item.name;
        let wkid;
        if (spatialReferenceInfo.services[name]) { // enabled
          wkid = `{{params.wkid||${spatialReferenceInfo.spatialReference}}}`;
          setCreateProp(fs, "properties.service.spatialReference.wkid", wkid);
        }
        else { // disabled
          wkid = getProp(fs, "properties.service.spatialReference.wkid");
          // Remove customizing prefix if present
          if (wkid.toString().startsWith(customizingPrefix)) {
            wkid = wkid.toString().substring(customizingPrefix.length, wkid.length - 2);
            setCreateProp(fs, "properties.service.spatialReference.wkid", wkid);
          }
        }
      });
      return spatialReferenceInfo.spatialReference;
    }
    else {
      // Disable this feature in each service
      customizeableFeatureServices.forEach((fs) => {
        const wkid = getProp(fs, "properties.service.spatialReference.wkid");
        // Remove customizing prefix if present
        if (wkid.toString().startsWith(customizingPrefix)) {
          setCreateProp(fs, "properties.service.spatialReference.wkid", wkid.toString().substring(customizingPrefix.length, wkid.length - 2));
        }
      });
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
  _splitFilename(filename) {
    const filenameParts = filename.split("/");
    return {
      prefix: filenameParts.length > 1 ? filenameParts.slice(0, filenameParts.length - 1).join("/") : undefined,
      suffix: filenameParts[filenameParts.length - 1]
    };
  }
}
export default SolutionStore.Store;
//# sourceMappingURL=solution-store.js.map
