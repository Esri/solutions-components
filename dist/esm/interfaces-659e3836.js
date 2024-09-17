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
var EImageDisplayType;
(function (EImageDisplayType) {
    EImageDisplayType["GRID"] = "GRID";
    EImageDisplayType["GALLERY"] = "GALLERY";
})(EImageDisplayType || (EImageDisplayType = {}));
var ELayoutMode;
(function (ELayoutMode) {
    ELayoutMode["GRID"] = "GRID";
    ELayoutMode["HORIZONTAL"] = "HORIZONTAL";
    ELayoutMode["VERTICAL"] = "VERTICAL";
})(ELayoutMode || (ELayoutMode = {}));
/**
 * Resource update types
 */
var EUpdateType;
(function (EUpdateType) {
    EUpdateType[EUpdateType["Add"] = 0] = "Add";
    EUpdateType[EUpdateType["Update"] = 1] = "Update";
    EUpdateType[EUpdateType["Remove"] = 2] = "Remove";
    EUpdateType[EUpdateType["None"] = 3] = "None";
    EUpdateType[EUpdateType["Obsolete"] = 4] = "Obsolete";
})(EUpdateType || (EUpdateType = {}));
var EPageType;
(function (EPageType) {
    EPageType[EPageType["LIST"] = 0] = "LIST";
    EPageType[EPageType["SELECT"] = 1] = "SELECT";
    EPageType[EPageType["EXPORT"] = 2] = "EXPORT";
    EPageType[EPageType["REFINE"] = 3] = "REFINE";
})(EPageType || (EPageType = {}));
var ESelectionMode;
(function (ESelectionMode) {
    ESelectionMode["ADD"] = "ADD";
    ESelectionMode["REMOVE"] = "REMOVE";
})(ESelectionMode || (ESelectionMode = {}));
var ESelectionType;
(function (ESelectionType) {
    ESelectionType["POINT"] = "POINT";
    ESelectionType["LINE"] = "LINE";
    ESelectionType["POLY"] = "POLY";
    ESelectionType["RECT"] = "RECT";
})(ESelectionType || (ESelectionType = {}));
var EWorkflowType;
(function (EWorkflowType) {
    EWorkflowType["SEARCH"] = "SEARCH";
    EWorkflowType["SELECT"] = "SELECT";
    EWorkflowType["SKETCH"] = "SKETCH";
    EWorkflowType["REFINE"] = "REFINE";
})(EWorkflowType || (EWorkflowType = {}));
var EExportType;
(function (EExportType) {
    EExportType["CSV"] = "CSV";
    EExportType["PDF"] = "PDF";
})(EExportType || (EExportType = {}));
var EDrawMode;
(function (EDrawMode) {
    EDrawMode["SKETCH"] = "SKETCH";
    EDrawMode["REFINE"] = "REFINE";
})(EDrawMode || (EDrawMode = {}));
const CSpatialRefCustomizingPrefix = "{{params.wkid||";
const CSpatialRefCustomizingSuffix = "}}";

export { CSpatialRefCustomizingPrefix as C, ELayoutMode as E, EWorkflowType as a, EExportType as b, EPageType as c, EUpdateType as d, ESelectionMode as e, EDrawMode as f, CSpatialRefCustomizingSuffix as g };
