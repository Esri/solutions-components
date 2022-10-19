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
    expect(Object.keys(state.getStoreInfo("templateEdits")).length).toEqual(25);

    // Replace the solution with a different one
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_734164 as any);
    await state.loadSolution("7341644e455e4a068eba58f1939caac4", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("7341644e455e4a068eba58f1939caac4");
    expect(Object.keys(state.getStoreInfo("templateEdits")).length).toEqual(12);
  });

  describe("replaceItemThumbnail", () => {
    let itemEdit: IItemTemplateEdit;

    beforeEach(() => {
      itemEdit = {
        "itemId": "bd4a2dafd7584253a1bc772f2dd510c4",
        "type": "QuickCapture Project",
        "key": "i7t8659n",
        "resources": [
          "bd4a2dafd7584253a1bc772f2dd510c4/qc.project.json",
          "bd4a2dafd7584253a1bc772f2dd510c4_info_thumbnail/esri_133.png"
          ],
        "dependencies": ["79036430a6274e17ae915d0278b8569c"],
        "groups": ["90766e8ee450438fb507d7d2cd03df20"],
        "estimatedDeploymentCostFactor": 2,
        "relatedItems": [],
        "data": {},
        "item": {
          "id": "{{bd4a2dafd7584253a1bc772f2dd510c4.itemId}}",
          "type": "QuickCapture Project",
          "accessInformation": "Esri",
          "categories": [],
          "culture": "en-us",
          "description": "An ArcGIS QuickCapture project description",
          "extent": [ ],
          "licenseInfo": "Copyright 2022 Esri",
          "name": null,
          "properties": null,
          "snippet": "An ArcGIS QuickCapture project snippet",
          "tags": [],
          "thumbnail": null,
          "title": "Status Reporter",
          "typeKeywords": [
            "QuickCapture",
            "QuickCapture Project"
          ],
          "url": null,
          "created": 1645216385000,
          "modified": 1645219985000
        },
        "properties": {},
        "resourceFilePaths": [{
          "url": "https://www.arcgis.com/sharing/rest/content/items/ca924c6db7d247b9a31fa30532fb5913/resources/bd4a2dafd7584253a1bc772f2dd510c4/qc.project.json",
          "type": 3,
          "folder": "",
          "filename": "qc.project.json",
          "updateType": 3
        },{
          "url": "https://www.arcgis.com/sharing/rest/content/items/ca924c6db7d247b9a31fa30532fb5913/resources/bd4a2dafd7584253a1bc772f2dd510c4_info_thumbnail/esri_133.png",
          "type": 4,
          "folder": "",
          "filename": "esri_133.png",
          "updateType": 3
        }],
        "thumbnail": null
      };
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
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(Object.keys(state.getStoreInfo("templateEdits")).length).toEqual(25);

    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    expect(item.details.description).toEqual("A feature layer storing reported service status and material use information.");

    // Change the item's description
    item.details.description = "Nullam ac urna mattis, maximus urna sit amet.";
    state.setItemInfo(item);

    const updatedItem = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    expect(updatedItem.details.description).toEqual("Nullam ac urna mattis, maximus urna sit amet.");
  });

  it("changes a store value", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const origDefaultWkid = state.getStoreInfo("defaultWkid");
    expect(origDefaultWkid).toBeUndefined();

    state.setStoreInfo("defaultWkid", "2865");
    const modifiedDefaultWkid = state.getStoreInfo("defaultWkid");
    expect(modifiedDefaultWkid).toEqual("2865");
  });

  it("saves a solution", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
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

  it("directly empties the store", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");

    state._testAccess("_emptyTheStore");
    expect(state.getStoreInfo("solutionItemId")).toEqual("");
  });

  it("gets feature services", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = state._testAccess("_getFeatureServices", state.getStoreInfo("solutionData").templates) as IFeatureServiceEnabledStatus[];
    expect(result.length).toEqual(5);
    expect(result[0].name).toEqual("Driver_Activity");  // name fetched from `name` prop because `title` empty
    expect(result[0].enabled).toBeFalsy();
    expect(result[1].name).toEqual("OperationsManagement");  // name fetched from higher-priority `title` prop
  });

  it("gets items shared with a group", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
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
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
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

  it("gets spatial reference info", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const featureServices = state._testAccess("_getFeatureServices", state.getStoreInfo("solutionData").templates) as IFeatureServiceEnabledStatus[];
    const result = await state._testAccess("_getSpatialReferenceInfo", featureServices, "2865") as ISolutionSpatialReferenceInfo;
    expect(result).toEqual({
      "enabled": true,
      "services": {
        "Driver_Activity": false,
        "OperationsManagement": false,
        "SnowRoutes": false,
        "ServiceAreas": false,
        "Requests": false
      },
      "spatialReference": {
        "defaultWkid": "2865"
      }
    });
  });

  it("gets thumbnails", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    jest.spyOn(common, "getThumbnailFromStorageItem").mockImplementation(() => Promise.resolve(testUtils.getSampleImageAsFile()));
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = await state._testAccess("_getThumbnails", state.getStoreInfo("templateEdits"), MOCK_USER_SESSION) as ISolutionTemplateEdits;
    expect(Object.keys(result).length).toEqual(25);
  });

  it("prepares a solution for the store", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    await state._testAccess("_prepareSolutionItems", "ca924c6db7d247b9a31fa30532fb5913", state.getStoreInfo("solutionData").templates, MOCK_USER_SESSION) as ISolutionTemplateEdits;
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");
  });
});
