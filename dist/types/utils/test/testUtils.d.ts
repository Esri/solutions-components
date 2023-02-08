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
import { IItemTemplateEdit } from "../interfaces";
export declare const PORTAL_URL = "https://myorg.maps.arcgis.com";
/**
 * Creates a mock UserSession.
 *
 * @param now Time for token; defaults to Date.now
 * @param portalUrl Portal for token; defaults to "https://myorg.maps.arcgis.com"
 *
 * @returns Mock UserSession
 */
export declare function createRuntimeMockUserSession(now?: number, portalUrl?: string): common.UserSession;
/**
 * Creates a mock image file.
 *
 * @param filename Name to give file; defaults to "sampleImage"
 *
 * @returns Buffer usable as a File
 */
export declare function getSampleImageAsFile(filename?: string): File;
export declare function getSampleItemEdit(itemId?: string): IItemTemplateEdit;
