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

import * as common from "@esri/solution-common";
import * as testUtils from "./testUtils";
import solution_734164 from "./solution_734164.json";
import solution_ca924c from "./solution_ca924c.json";
import state from "../solution-store";
import {
  EUpdateType,
  IFeatureServiceEnabledStatus,
  IItemShare,
  IItemTemplateEdit,
  IResourcePath,
  ISolutionTemplateEdits,
  ISolutionSpatialReferenceInfo
} from '../interfaces';

let MOCK_USER_SESSION: common.UserSession;
jest.setTimeout(30000);

beforeEach(() => {
  MOCK_USER_SESSION = testUtils.createRuntimeMockUserSession();
  state._testAccess("_emptyTheStore");
});

afterEach(() => {
  jest.restoreAllMocks();
});

let itemEdit: IItemTemplateEdit;

describe("solution-store", () => {

  it("creates store", () => {
    expect(state.getStoreInfo("solutionItemId")).toEqual("");
  });

  it("loads a solution", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");
  });

  it("loads a solution, and then another one", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");

    // Replace the solution with a different one
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_734164 as any);
    await state.loadSolution("7341644e455e4a068eba58f1939caac4", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("7341644e455e4a068eba58f1939caac4");
    expect(state.getStoreInfo("solutionData").templates.length).toEqual(12);
  });

  describe("replaceItemThumbnail", () => {

    beforeEach(() => {
      itemEdit = testUtils.getSampleItemEdit();
    });

    it("queues a thumbnail for replacement", () => {
      // Set a new thumbnail
      itemEdit.thumbnail = testUtils.getSampleImageAsFile("thumb1");

      // Register it in the store
      state.replaceItemThumbnail(itemEdit);

      // Check that the previous thumbnail is marked for removal and the new one is queued for adding
      expect(itemEdit.resourceFilePaths.length).toEqual(3);
      expect(itemEdit.resourceFilePaths[0].filename).toEqual("qc.project.json");
      expect(itemEdit.resourceFilePaths[0].updateType).toEqual(3);
      expect(itemEdit.resourceFilePaths[1].filename).toEqual("esri_133.png");
      expect(itemEdit.resourceFilePaths[1].updateType).toEqual(2);
      expect(itemEdit.resourceFilePaths[2].filename).toEqual("thumb1");
      expect(itemEdit.resourceFilePaths[2].updateType).toEqual(0);
    });

    it("twice queues thumbnails for replacement", () => {
      // Set a new thumbnail
      itemEdit.thumbnail = testUtils.getSampleImageAsFile("thumb1");

      // Register it in the store
      state.replaceItemThumbnail(itemEdit);

      // Set a new thumbnail
      itemEdit.thumbnail = testUtils.getSampleImageAsFile("thumb2");

      // Register it in the store
      state.replaceItemThumbnail(itemEdit);

      // Check that the previous thumbnail is marked for removal and the new one is queued for adding
      expect(itemEdit.resourceFilePaths.length).toEqual(3);
      expect(itemEdit.resourceFilePaths[0].filename).toEqual("qc.project.json");
      expect(itemEdit.resourceFilePaths[0].updateType).toEqual(3);
      expect(itemEdit.resourceFilePaths[1].filename).toEqual("esri_133.png");
      expect(itemEdit.resourceFilePaths[1].updateType).toEqual(2);
      expect(itemEdit.resourceFilePaths[2].filename).toEqual("thumb2");
      expect(itemEdit.resourceFilePaths[2].updateType).toEqual(0);
    });

    it("thrice queues thumbnails for replacement", () => {
      // Set a new thumbnail
      itemEdit.thumbnail = testUtils.getSampleImageAsFile("thumb1");

      // Register it in the store
      state.replaceItemThumbnail(itemEdit);

      // Set a new thumbnail
      itemEdit.thumbnail = testUtils.getSampleImageAsFile("thumb2");

      // Register it in the store
      state.replaceItemThumbnail(itemEdit);

      // Set a new thumbnail
      itemEdit.thumbnail = testUtils.getSampleImageAsFile("thumb3");

      // Register it in the store
      state.replaceItemThumbnail(itemEdit);

      // Check that the previous thumbnail is marked for removal and the new one is queued for adding
      expect(itemEdit.resourceFilePaths.length).toEqual(3);
      expect(itemEdit.resourceFilePaths[0].filename).toEqual("qc.project.json");
      expect(itemEdit.resourceFilePaths[0].updateType).toEqual(3);
      expect(itemEdit.resourceFilePaths[1].filename).toEqual("esri_133.png");
      expect(itemEdit.resourceFilePaths[1].updateType).toEqual(2);
      expect(itemEdit.resourceFilePaths[2].filename).toEqual("thumb3");
      expect(itemEdit.resourceFilePaths[2].updateType).toEqual(0);
    });
  });

  it("fails to find an item when fetching its value", async () => {
    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    expect(item).toBeUndefined();
  });

  it("changes an item's value", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionData").templates.length).toEqual(25);

    const item = state.getItemInfo("9c1311d827f44fdc9680651420a63484");
    expect(item.item.description).toEqual("An ArcGIS Survey123 form used by operations managers and yard supervisors to report materials used by each vehicle during winter weather operations.");

    // Change the item's description
    item.item.description = "Nullam ac urna mattis, maximus urna sit amet.";
    state.setItemInfo(item);

    const updatedItem = state.getItemInfo("9c1311d827f44fdc9680651420a63484");
    expect(updatedItem.item.description).toEqual("Nullam ac urna mattis, maximus urna sit amet.");
  });

  it("changes a store value", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const origDefaultWkid = state.getStoreInfo("defaultWkid");
    expect(origDefaultWkid).toBeUndefined();

    state.setStoreInfo("defaultWkid", "2865");
    const modifiedDefaultWkid = state.getStoreInfo("defaultWkid");
    expect(modifiedDefaultWkid).toEqual("2865");
  });

  describe("saveSolution", () => {
    it("saves a solution with a custom spatial reference", async () => {
      jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => {
        return {
          ...JSON.parse(JSON.stringify(solution_ca924c)),
          "params": {
            "wkid": {
              "label": "Spatial Reference",
              "default": 102100,
              "valueType": "spatialReference",
              "attributes": {
                  "required": "true"
              }
            }
          }
        }
      });
      const updateSpy = jest.spyOn(common, "updateItem").mockImplementation(
        (itemInfo: common.IItemUpdate, _authentication: common.UserSession, _folderId?: string): Promise<common.IUpdateItemResponse> => {
          expect(itemInfo.id).toEqual("ca924c6db7d247b9a31fa30532fb5913");
          return Promise.resolve(null);
        }
      );
      await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

      await state.saveSolution();

      expect(updateSpy).toHaveBeenCalled();
    });

    it("saves a solution without a custom spatial reference", async () => {
      jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
      const updateSpy = jest.spyOn(common, "updateItem").mockImplementation(
        (itemInfo: common.IItemUpdate, _authentication: common.UserSession, _folderId?: string): Promise<common.IUpdateItemResponse> => {
          expect(itemInfo.id).toEqual("ca924c6db7d247b9a31fa30532fb5913");
          return Promise.resolve(null);
        }
      );
      await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

      await state.saveSolution();

      expect(updateSpy).toHaveBeenCalled();
    });
  });

  it("directly empties the store", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");

    state._testAccess("_emptyTheStore");
    expect(state.getStoreInfo("solutionItemId")).toEqual("");
  });

  it("gets feature services", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = state._testAccess("_getFeatureServices", state.getStoreInfo("solutionData").templates) as IFeatureServiceEnabledStatus[];
    expect(result.length).toEqual(5);
    expect(result[0].name).toEqual("Driver_Activity");  // name fetched from `name` prop because `title` empty
    expect(result[0].enabled).toBeFalsy();
    expect(result[1].name).toEqual("OperationsManagement");  // name fetched from higher-priority `title` prop
  });

  it("gets items shared with a group", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = state._testAccess("_getItemsSharedWithThisGroup", state.getStoreInfo("solutionData").templates[0], state.getStoreInfo("solutionData").templates) as IItemShare[];
    expect(result.length).toEqual(23);
    expect(result[0]).toEqual({
      "id": "9c1311d827f44fdc9680651420a63484",
      "title": "Material_Use_Reporting.zip",
      "isShared": false,
      "shareItem": false,
      "type": "Form",
      "typeKeywords": [
        "Form",
        "Survey123",
        "Survey123 Connect",
        "xForm"
      ]
    });
  });

  it("gets resource file paths", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = state._testAccess("_getResourceFilePaths", "ca924c6db7d247b9a31fa30532fb5913", state.getStoreInfo("solutionData").templates[0], MOCK_USER_SESSION.portal) as IResourcePath[];
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual({
      "url": "https://myorg.maps.arcgis.com/sharing/rest/content/items/ca924c6db7d247b9a31fa30532fb5913/resources/79036430a6274e17ae915d0278b8569c_info_metadata/metadata.xml",
      "type": 2,
      "folder": "",
      "filename": "metadata.xml",
      "updateType": 3
    });
  });

  it("gets resource storage name", async () => {
    const resourcePaths: IResourcePath[] = [
      { type: common.EFileType.Data, filename: "def.txt" },  // file extension supported by AGO
      { type: common.EFileType.Data, filename: "def.doc" },  // file extension not supported by AGO
      { type: common.EFileType.Info, filename: "def" },
      { type: common.EFileType.Metadata, filename: "def" },
      { type: common.EFileType.Resource, filename: "def" },
      { type: common.EFileType.Thumbnail, filename: "def" }
    ] as any;

    const storageNames: string[] = resourcePaths.map(
      (path: IResourcePath) => state._testAccess("_getResourceStorageName", "abc", path)
    );

    expect(storageNames).toEqual([
      "abc_info_data/def.txt",
      "abc_info_dataz/def.doc.zip",
      "abc_info/def",
      "abc_info_metadata/def",
      "abc/def",
      "abc_info_thumbnail/def"
    ]);
  });

  describe("_getSpatialReferenceInfo", () => {
    it("gets spatial reference info using a string wkid", async () => {
      jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
      await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

      const featureServices = state._testAccess("_getFeatureServices", state.getStoreInfo("solutionData").templates) as IFeatureServiceEnabledStatus[];
      const result = await state._testAccess("_getSpatialReferenceInfo", featureServices, "2865") as ISolutionSpatialReferenceInfo;
      expect(result).toEqual({
        "enabled": true,
        "services": {
          "Driver_Activity": false,
          "OperationsManagement": false,
          "SnowRoutes": false,
          "ServiceAreas": true,
          "Requests": true
        },
        "spatialReference": "2865"
      });
    });

    it("gets spatial reference info using a numeric wkid", async () => {
      jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
      await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

      const featureServices = state._testAccess("_getFeatureServices", state.getStoreInfo("solutionData").templates) as IFeatureServiceEnabledStatus[];
      const result = await state._testAccess("_getSpatialReferenceInfo", featureServices, 2865) as ISolutionSpatialReferenceInfo;
      expect(result).toEqual({
        "enabled": true,
        "services": {
          "Driver_Activity": false,
          "OperationsManagement": false,
          "SnowRoutes": false,
          "ServiceAreas": true,
          "Requests": true
        },
        "spatialReference": 2865
      });
    });

    it("gets spatial reference info using no wkid", async () => {
      jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => JSON.parse(JSON.stringify(solution_ca924c)));
      await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

      const featureServices = state._testAccess("_getFeatureServices", state.getStoreInfo("solutionData").templates) as IFeatureServiceEnabledStatus[];
      const result = await state._testAccess("_getSpatialReferenceInfo", featureServices) as ISolutionSpatialReferenceInfo;
      expect(result).toEqual({
        "enabled": false,
        "services": {
          "Driver_Activity": false,
          "OperationsManagement": false,
          "SnowRoutes": false,
          "ServiceAreas": true,
          "Requests": true
        },
        "spatialReference": undefined
      });
    });
  });

  it("prepares a solution for editing", async () => {
    // Get the templates; parse+stringify seems only working way to avoid modifying data file
    const solutionData = JSON.parse(JSON.stringify(solution_ca924c));

    // Provide thumbnail images for the templates
    const sampleImageFile = testUtils.getSampleImageAsFile();
    jest.spyOn(common, "getThumbnailFromStorageItem").mockResolvedValue(sampleImageFile);

    await state._testAccess("_prepareSolutionItemsForEditing", "ca924c6db7d247b9a31fa30532fb5913", solutionData.templates, MOCK_USER_SESSION) as ISolutionTemplateEdits;

    // Check that the augmentation has been added to each template
    expect(solutionData.templates.filter(t => t.hasOwnProperty("resourceFilePaths")).length).toEqual(solutionData.templates.length);
    expect(solutionData.templates.filter(t => t.hasOwnProperty("thumbnail")).length).toEqual(solutionData.templates.length);
    expect(solutionData.templates.filter(t => t.hasOwnProperty("groupDetails")).length).toEqual(solutionData.templates.length);
  });

  describe("_prepareSolutionItemsForStorage", () => {
    const originalConsoleLog = console.log

    beforeEach(() => {
      console.log = jest.fn();
    })
    ;
    afterEach(() => {
      console.log = originalConsoleLog;
    });

    it("prepares a solution for storage", async () => {
      // Get the templates; parse+stringify seems only working way to avoid modifying data file
      const solutionData = JSON.parse(JSON.stringify(solution_ca924c));

      // Provide thumbnail images for the templates and prepare the templates for editing
      const sampleImageFile = testUtils.getSampleImageAsFile();
      jest.spyOn(common, "getThumbnailFromStorageItem").mockResolvedValue(sampleImageFile);
      await state._testAccess("_prepareSolutionItemsForEditing", "ca924c6db7d247b9a31fa30532fb5913", solutionData.templates, MOCK_USER_SESSION) as ISolutionTemplateEdits;

      // Provide some resource mods
      const template = solutionData.templates[0];

      template.resourceFilePaths.push({  // add a resource
        blob: sampleImageFile,
        filename: sampleImageFile.name,
        type: common.EFileType.Resource,
        updateType: EUpdateType.Add
      } as IResourcePath);

      template.resourceFilePaths.push({  // update the thumbnail file
        blob: sampleImageFile,
        filename: template.resourceFilePaths[1].filename,
        type: common.EFileType.Thumbnail,
        updateType: EUpdateType.Update
      } as IResourcePath);

      template.resourceFilePaths.push({  // remove the metadata.xml file
        filename: template.resourceFilePaths[0].filename,
        type: common.EFileType.Metadata,
        updateType: EUpdateType.Remove
      } as IResourcePath);

      // Run the prep
      jest.spyOn(common, "copyFilesToStorageItem").mockResolvedValue([ template.itemId + "_info_dataz/" + sampleImageFile.name ]);
      jest.spyOn(common, "removeItemResourceFile").mockResolvedValue({ success: true });
      jest.spyOn(common, "updateItemResourceFile").mockResolvedValue({ success: true, itemId: "abc", owner: "def", folder: "ghi"});

      expect(template.resourceFilePaths.length).toEqual(5);
      await state._testAccess("_prepareSolutionItemsForStorage", "ca924c6db7d247b9a31fa30532fb5913", solutionData.templates, MOCK_USER_SESSION) as ISolutionTemplateEdits;
      expect(template.resources).toEqual([
        "79036430a6274e17ae915d0278b8569c_info_thumbnail/thumbnail.JPEG",
        "79036430a6274e17ae915d0278b8569c/" + sampleImageFile.name
      ]);

      // Check that the augmentation has been removed from each template
      expect(solutionData.templates.some(t => t.hasOwnProperty("resourceFilePaths"))).toBeFalsy();
      expect(solutionData.templates.some(t => t.hasOwnProperty("thumbnail"))).toBeFalsy();
      expect(solutionData.templates.some(t => t.hasOwnProperty("groupDetails"))).toBeFalsy();
    });

    it("catches errors updating or removing resources while preparing a solution for storage", async () => {
      jest.spyOn(console, "log").mockImplementation(() => {});

      // Get the templates; parse+stringify seems only working way to avoid modifying data file
      const solutionData = JSON.parse(JSON.stringify(solution_ca924c));

      // Provide thumbnail images for the templates and prepare the templates for editing
      const sampleImageFile = testUtils.getSampleImageAsFile();
      jest.spyOn(common, "getThumbnailFromStorageItem").mockResolvedValue(sampleImageFile);
      await state._testAccess("_prepareSolutionItemsForEditing", "ca924c6db7d247b9a31fa30532fb5913", solutionData.templates, MOCK_USER_SESSION) as ISolutionTemplateEdits;

      // Provide some resource mods
      const template = solutionData.templates[0];

      template.resourceFilePaths.push({  // update the thumbnail file
        blob: sampleImageFile,
        filename: template.resourceFilePaths[1].filename,
        type: common.EFileType.Thumbnail,
        updateType: EUpdateType.Update
      } as IResourcePath);

      template.resourceFilePaths.push({  // remove the metadata.xml file
        filename: template.resourceFilePaths[0].filename,
        type: common.EFileType.Metadata,
        updateType: EUpdateType.Remove
      } as IResourcePath);

      // Run the prep
      jest.spyOn(console, "log").mockImplementation(() => {});  // hide error messages from _prepareSolutionItemsForStorage
      jest.spyOn(common, "removeItemResourceFile").mockImplementation(() => { throw new Error("Item does not exist or is inaccessible.") });
      jest.spyOn(common, "updateItemResourceFile").mockImplementation(() => { throw new Error("Item does not exist or is inaccessible.") });

      expect(template.resourceFilePaths.length).toEqual(4);
      await state._testAccess("_prepareSolutionItemsForStorage", "ca924c6db7d247b9a31fa30532fb5913", solutionData.templates, MOCK_USER_SESSION) as ISolutionTemplateEdits;
      expect(template.resources).toEqual([
        "79036430a6274e17ae915d0278b8569c_info_metadata/metadata.xml",
        "79036430a6274e17ae915d0278b8569c_info_thumbnail/thumbnail.JPEG"
      ]);

      // Check that the augmentation has been removed from each template
      expect(solutionData.templates.some(t => t.hasOwnProperty("resourceFilePaths"))).toBeFalsy();
      expect(solutionData.templates.some(t => t.hasOwnProperty("thumbnail"))).toBeFalsy();
      expect(solutionData.templates.some(t => t.hasOwnProperty("groupDetails"))).toBeFalsy();
    });

  });

  describe("_setSpatialReferenceInfo", () => {
    it("handles an enabled custom spatial reference", () => {
      jest.spyOn(common, "setCreateProp").mockImplementation(() => {});
      const spatialReferenceInfo: ISolutionSpatialReferenceInfo = {
        enabled: true,
        enableDefault: true,
        services: {
          "Driver_Activity": false,      // has "wkid": 102100
          "OperationsManagement": true,  // has "wkid": 102100
          "Requests": false,             // has "wkid": "{{params.wkid||102100}}"
          "ServiceAreas": true,          // has "wkid": "{{params.wkid||102100}}"
          "SnowRoutes": false            // has "wkid": 4326
        },
        spatialReference: 2865
      };
      const solutionTemplates = JSON.parse(JSON.stringify(solution_ca924c)).templates;

      const updatedWkid = state._testAccess("_setSpatialReferenceInfo", spatialReferenceInfo, solutionTemplates);
      expect(updatedWkid).toEqual(2865);
    });

    it("handles a disabled custom spatial reference", () => {
      jest.spyOn(common, "setCreateProp").mockImplementation(() => {});
      const spatialReferenceInfo: ISolutionSpatialReferenceInfo = {
        enabled: false,
        enableDefault: true,
        services: {
          "Driver_Activity": false,      // has "wkid": 102100
          "OperationsManagement": true,  // has "wkid": 102100
          "Requests": false,             // has "wkid": "{{params.wkid||102100}}"
          "ServiceAreas": true,          // has "wkid": "{{params.wkid||102100}}"
          "SnowRoutes": false            // has "wkid": 4326
        },
        spatialReference: 2865
      };
      const solutionTemplates = JSON.parse(JSON.stringify(solution_ca924c)).templates;

      const updatedWkid = state._testAccess("_setSpatialReferenceInfo", spatialReferenceInfo, solutionTemplates);
      expect(updatedWkid).toBeUndefined();
    });
  });

  describe("_splitFilename", () => {

    it("handles filename without prefix", () => {
      const { prefix, suffix } = state._testAccess("_splitFilename", "sample.txt");
      expect(prefix).toBeUndefined();
      expect(suffix).toEqual("sample.txt");
    });

    it("handles filename with single prefix", () => {
      const { prefix, suffix } = state._testAccess("_splitFilename", "folder/sample.txt");
      expect(prefix).toEqual("folder");
      expect(suffix).toEqual("sample.txt");
    });

    it("handles filename with multiple prefixes", () => {
      const { prefix, suffix } = state._testAccess("_splitFilename", "folder/subfolder/sample.txt");
      expect(prefix).toEqual("folder/subfolder");
      expect(suffix).toEqual("sample.txt");
    });

  });
});
