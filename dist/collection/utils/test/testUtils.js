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
import * as common from "@esri/solution-common";
//--------------------------------------------------------------------------------------------------------------------//
export const PORTAL_URL = "https://myorg.maps.arcgis.com";
/**
 * Creates a mock UserSession.
 *
 * @param now Time for token; defaults to Date.now
 * @param portalUrl Portal for token; defaults to "https://myorg.maps.arcgis.com"
 *
 * @returns Mock UserSession
 */
export function createRuntimeMockUserSession(now, portalUrl) {
  if (now === undefined) {
    now = Date.now();
  }
  const tomorrow = new Date(now + 86400000);
  return new common.UserSession({
    clientId: "clientId",
    redirectUri: "https://example-app.com/redirect-uri",
    token: "fake-token",
    tokenExpires: tomorrow,
    refreshToken: "refreshToken",
    refreshTokenExpires: tomorrow,
    refreshTokenTTL: 1440,
    username: "casey",
    password: "123456",
    portal: (portalUrl || PORTAL_URL) + "/sharing/rest"
  });
}
/**
 * Creates a mock image file.
 *
 * @param filename Name to give file; defaults to "sampleImage"
 *
 * @returns Buffer usable as a File
 */
export function getSampleImageAsFile(filename = "sampleImage.png") {
  const pseudoFile = Buffer.from(_imageAsDataUri(), 'base64');
  pseudoFile.name = filename;
  return pseudoFile;
}
export function getSampleItemEdit(itemId = "bd4a2dafd7584253a1bc772f2dd510c4") {
  let itemEdit = {
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
      "extent": [],
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
      }, {
        "url": "https://www.arcgis.com/sharing/rest/content/items/ca924c6db7d247b9a31fa30532fb5913/resources/bd4a2dafd7584253a1bc772f2dd510c4_info_thumbnail/esri_133.png",
        "type": 4,
        "folder": "",
        "filename": "esri_133.png",
        "updateType": 3
      }],
    "thumbnail": null
  };
  if (itemId !== "bd4a2dafd7584253a1bc772f2dd510c4") {
    itemEdit = JSON.parse(JSON.stringify(itemEdit).replace(/bd4a2dafd7584253a1bc772f2dd510c4/g, itemId));
  }
  return itemEdit;
}
//--------------------------------------------------------------------------------------------------------------------//
function _imageAsDataUri() {
  return "\
iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAADKklEQVQ4T6XUf1DMeRzH8edu\
53ZVZ6vLxmo2Q0Y7rtJZJT8abQmdysjETVEWMxgGOzF2/IhkCqNT8qPyo8PE6fzIj/y4qYlU\
E6MfIottFcLmRyIq1Ne4neGa+ufG57/354/H+/3H6/0WCYIg8J1P1BNSkJ/PpXO5tLa187q5\
mTFqL6ZFzMRxgEuP7boh00JCcbB3IGZfFuM8f8PbfSD1IyIR3byI8uFVJoxRk5C4uQvWBfHx\
VHO44jKqcC0/BKgQ7tbzIS0LhvhDX3d400DkSAUFZ3MwPXyAVCr9F/uKhAaHkpqbQkhGEAa9\
EZeRcmpVOlCFQVwMbvqpLPA/QoruHnYSV+4V1tHS/vYbcqv6Fv4af6zVtsismnB0FmM9qQZB\
ZsuNljdMtttN+fIEtMcm0NgqJmtZGevnJmGqqCNxc6JlktjYWNKT9zIxU463jxKjIYmm65ex\
cfWi7Nga+nSWUV4k4DxchlQuobbCzJYjyRxYkEVVTZUFCZsShlTexnXvEXgN30RHzjZyk1cQ\
vjIV57FP6a/4B5NBoOxsI+rFbhhN7yjfaGC0Us3pvDMWJDI8gvczPTgVfwOeVhC8NJ7G0nME\
xf1JbWsREg5gZ99E9qxiNJl+PGn7xP3974myH8WGTXEWZFKAhqZ+7lzLTsX6xB1G/dSbj49f\
U5O9lbeD1Xy4dAGxqB7pCwMSNwc6nKywFfkSoXDmj107LUjE1BCkwToO7dEzPuoFbn5OFCWZ\
uX28FqavA1UgWDkhM6+gQ2agRTkam5SXaAa1czrvogUpLb5Kys59/BXox4+rtIhteuM51xUH\
p07Op6nhdz20ixHJVyMUXIEwHZq8Z8wJ+oWoGO23nPj+6kGgLo0E7Xysx5pxiffl1RMfzGsr\
Yag7PKgGaQnUP2f8koU4ltSRcz6va9i+VErHPizKNaDfmApt2yFwPuwogcZyWFsFvQpZKDFy\
91Qlh/4+ikKh6I58+fH2GIZXgIbS6mKq8+8jOfiIwXWFPDu5C130DNYtm8ejhoavQJfY/3ej\
blZWkpGegclk5FPzc2ztfqa1o5OoWdFEzo7utsk9noL/e14+AxP0YqryqgPxAAAAAElFTkSu\
QmCC";
}
