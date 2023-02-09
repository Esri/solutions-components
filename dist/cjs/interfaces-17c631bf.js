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
exports.EExportType = void 0;
(function (EExportType) {
  EExportType[EExportType["PDF"] = 0] = "PDF";
  EExportType[EExportType["CSV"] = 1] = "CSV";
})(exports.EExportType || (exports.EExportType = {}));
exports.EPageType = void 0;
(function (EPageType) {
  EPageType[EPageType["LIST"] = 0] = "LIST";
  EPageType[EPageType["SELECT"] = 1] = "SELECT";
  EPageType[EPageType["REFINE"] = 2] = "REFINE";
  EPageType[EPageType["PDF"] = 3] = "PDF";
  EPageType[EPageType["CSV"] = 4] = "CSV";
})(exports.EPageType || (exports.EPageType = {}));
exports.ERefineMode = void 0;
(function (ERefineMode) {
  ERefineMode["ALL"] = "ALL";
  ERefineMode["SUBSET"] = "SUBSET"; // Used as a part interactive selection "Use layer features"
})(exports.ERefineMode || (exports.ERefineMode = {}));
exports.ESelectionMode = void 0;
(function (ESelectionMode) {
  ESelectionMode["ADD"] = "ADD";
  ESelectionMode["REMOVE"] = "REMOVE";
})(exports.ESelectionMode || (exports.ESelectionMode = {}));
exports.EWorkflowType = void 0;
(function (EWorkflowType) {
  EWorkflowType["SEARCH"] = "SEARCH";
  EWorkflowType["SELECT"] = "SELECT";
  EWorkflowType["SKETCH"] = "SKETCH";
  EWorkflowType["REFINE"] = "REFINE";
})(exports.EWorkflowType || (exports.EWorkflowType = {}));
exports.ESelectionType = void 0;
(function (ESelectionType) {
  ESelectionType["POINT"] = "POINT";
  ESelectionType["LINE"] = "LINE";
  ESelectionType["POLY"] = "POLY";
  ESelectionType["RECT"] = "RECT";
})(exports.ESelectionType || (exports.ESelectionType = {}));
exports.ESketchType = void 0;
(function (ESketchType) {
  ESketchType["LAYER"] = "LAYER";
  ESketchType["INTERACTIVE"] = "INTERACTIVE";
})(exports.ESketchType || (exports.ESketchType = {}));
exports.EExpandType = void 0;
(function (EExpandType) {
  EExpandType["EXPAND"] = "EXPAND";
  EExpandType["COLLAPSE"] = "COLLAPSE";
})(exports.EExpandType || (exports.EExpandType = {}));
