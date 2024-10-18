/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

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
exports.ELayoutMode = void 0;
(function (ELayoutMode) {
    ELayoutMode["GRID"] = "GRID";
    ELayoutMode["HORIZONTAL"] = "HORIZONTAL";
    ELayoutMode["VERTICAL"] = "VERTICAL";
})(exports.ELayoutMode || (exports.ELayoutMode = {}));
/**
 * Resource update types
 */
exports.EUpdateType = void 0;
(function (EUpdateType) {
    EUpdateType[EUpdateType["Add"] = 0] = "Add";
    EUpdateType[EUpdateType["Update"] = 1] = "Update";
    EUpdateType[EUpdateType["Remove"] = 2] = "Remove";
    EUpdateType[EUpdateType["None"] = 3] = "None";
    EUpdateType[EUpdateType["Obsolete"] = 4] = "Obsolete";
})(exports.EUpdateType || (exports.EUpdateType = {}));
exports.EPageType = void 0;
(function (EPageType) {
    EPageType[EPageType["LIST"] = 0] = "LIST";
    EPageType[EPageType["SELECT"] = 1] = "SELECT";
    EPageType[EPageType["EXPORT"] = 2] = "EXPORT";
    EPageType[EPageType["REFINE"] = 3] = "REFINE";
})(exports.EPageType || (exports.EPageType = {}));
exports.ESelectionMode = void 0;
(function (ESelectionMode) {
    ESelectionMode["ADD"] = "ADD";
    ESelectionMode["REMOVE"] = "REMOVE";
})(exports.ESelectionMode || (exports.ESelectionMode = {}));
var ESelectionType;
(function (ESelectionType) {
    ESelectionType["POINT"] = "POINT";
    ESelectionType["LINE"] = "LINE";
    ESelectionType["POLY"] = "POLY";
    ESelectionType["RECT"] = "RECT";
})(ESelectionType || (ESelectionType = {}));
exports.EWorkflowType = void 0;
(function (EWorkflowType) {
    EWorkflowType["SEARCH"] = "SEARCH";
    EWorkflowType["SELECT"] = "SELECT";
    EWorkflowType["SKETCH"] = "SKETCH";
    EWorkflowType["REFINE"] = "REFINE";
})(exports.EWorkflowType || (exports.EWorkflowType = {}));
exports.EExportType = void 0;
(function (EExportType) {
    EExportType["CSV"] = "CSV";
    EExportType["PDF"] = "PDF";
})(exports.EExportType || (exports.EExportType = {}));
exports.EDrawMode = void 0;
(function (EDrawMode) {
    EDrawMode["SKETCH"] = "SKETCH";
    EDrawMode["REFINE"] = "REFINE";
})(exports.EDrawMode || (exports.EDrawMode = {}));
const CSpatialRefCustomizingPrefix = "{{params.wkid||";
const CSpatialRefCustomizingSuffix = "}}";

exports.CSpatialRefCustomizingPrefix = CSpatialRefCustomizingPrefix;
exports.CSpatialRefCustomizingSuffix = CSpatialRefCustomizingSuffix;
