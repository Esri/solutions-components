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
  state._testAccess("_emptyTheStore");
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

  it("fails to find an item when fetching its value", async () => {
    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    expect(item).toBeUndefined();
  });

  it("changes an item's value", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(Object.keys(state.getStoreInfo("templateEdits")).length).toEqual(25);

    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const itemDetails = JSON.parse(item.details);
    expect(itemDetails.description).toEqual("A feature layer storing reported service status and material use information.");

    // Change the item's description
    itemDetails.description = "Nullam ac urna mattis, maximus urna sit amet.";
    item.details = JSON.stringify(itemDetails, null, 2);
    state.setItemInfo("79036430a6274e17ae915d0278b8569c", item);

    const updatedItem = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const updatedItemDetails = JSON.parse(updatedItem.details);
    expect(updatedItemDetails.description).toEqual("Nullam ac urna mattis, maximus urna sit amet.");
  });

  it("undoes item changes", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const itemDetails = JSON.parse(item.details);
    expect(itemDetails.description).toEqual("A feature layer storing reported service status and material use information.");

    // Change the item's description
    itemDetails.description = "Nullam ac urna mattis, maximus urna sit amet.";
    item.details = JSON.stringify(itemDetails, null, 2);
    state.setItemInfo("79036430a6274e17ae915d0278b8569c", item);

    const updatedItem = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const updatedItemDetails = JSON.parse(updatedItem.details);
    expect(updatedItemDetails.description).toEqual("Nullam ac urna mattis, maximus urna sit amet.");

    // Undo the change
    await state.undoItemChanges();
    const resetItem = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const resetItemDetails = JSON.parse(resetItem.details);
    expect(resetItemDetails.description).toEqual("A feature layer storing reported service status and material use information.");
  });

  it("keeps item changes", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const itemDetails = JSON.parse(item.details);
    expect(itemDetails.description).toEqual("A feature layer storing reported service status and material use information.");

    // Change the item's description
    itemDetails.description = "Nullam ac urna mattis, maximus urna sit amet.";
    item.details = JSON.stringify(itemDetails, null, 2);
    state.setItemInfo("79036430a6274e17ae915d0278b8569c", item);

    const updatedItem = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const updatedItemDetails = JSON.parse(updatedItem.details);
    expect(updatedItemDetails.description).toEqual("Nullam ac urna mattis, maximus urna sit amet.");

    // Keep the change, and then verify that undoing has no effect
    await state.keepItemChanges();
    await state.undoItemChanges();
    const editedItem = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    const editedItemDetails = JSON.parse(editedItem.details);
    expect(editedItemDetails.description).toEqual("Nullam ac urna mattis, maximus urna sit amet.");
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

  it("directly empties the store", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");

    state._testAccess("_emptyTheStore");
    expect(state.getStoreInfo("solutionItemId")).toEqual("");
  });

  it("indirectly empties the store", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");

    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => null);
    await state.loadSolution("", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("");
  });

  it("tries to set the value of an item that's not in the store", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");

    const item = state.getItemInfo("79036430a6274e17ae915d0278b8569c");
    expect(() => {
      state.setItemInfo("xyz", item);
    }).toThrow();
  });

  it("gets feature services", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = state._testAccess("_getFeatureServices", state.getStoreInfo("templates")) as IFeatureServiceEnabledStatus[];
    expect(result.length).toEqual(5);
    expect(result[0].name).toEqual("Driver_Activity");  // name fetched from `name` prop because `title` empty
    expect(result[0].enabled).toBeFalsy();
    expect(result[1].name).toEqual("OperationsManagement");  // name fetched from higher-priority `title` prop
  });

  it("gets items shared with a group", async () => {
    jest.spyOn(common, "getItemDataAsJson").mockImplementation(() => solution_ca924c as any);
    await state.loadSolution("ca924c6db7d247b9a31fa30532fb5913", MOCK_USER_SESSION);

    const result = state._testAccess("_getItemsSharedWithThisGroup", state.getStoreInfo("templates")[0], state.getStoreInfo("templates")) as IItemShare[];
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

    const result = state._testAccess("_getResourceFilePaths", "ca924c6db7d247b9a31fa30532fb5913", state.getStoreInfo("templates")[0], MOCK_USER_SESSION.portal) as IResourcePath[];
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

    const featureServices = state._testAccess("_getFeatureServices", state.getStoreInfo("templates")) as IFeatureServiceEnabledStatus[];
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

    await state._testAccess("_prepareSolutionItems", "ca924c6db7d247b9a31fa30532fb5913", state.getStoreInfo("templates"), MOCK_USER_SESSION) as ISolutionTemplateEdits;
    expect(state.getStoreInfo("solutionItemId")).toEqual("ca924c6db7d247b9a31fa30532fb5913");
  });
});
