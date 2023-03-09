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
var EExportType;
(function (EExportType) {
  EExportType[EExportType["PDF"] = 0] = "PDF";
  EExportType[EExportType["CSV"] = 1] = "CSV";
})(EExportType || (EExportType = {}));
var EPageType;
(function (EPageType) {
  EPageType[EPageType["LIST"] = 0] = "LIST";
  EPageType[EPageType["SELECT"] = 1] = "SELECT";
  EPageType[EPageType["REFINE"] = 2] = "REFINE";
  EPageType[EPageType["PDF"] = 3] = "PDF";
  EPageType[EPageType["CSV"] = 4] = "CSV";
})(EPageType || (EPageType = {}));
var ERefineMode;
(function (ERefineMode) {
  ERefineMode["ALL"] = "ALL";
  ERefineMode["SUBSET"] = "SUBSET"; // Used as a part interactive selection "Use layer features"
})(ERefineMode || (ERefineMode = {}));
var ESelectionMode;
(function (ESelectionMode) {
  ESelectionMode["ADD"] = "ADD";
  ESelectionMode["REMOVE"] = "REMOVE";
})(ESelectionMode || (ESelectionMode = {}));
var EWorkflowType;
(function (EWorkflowType) {
  EWorkflowType["SEARCH"] = "SEARCH";
  EWorkflowType["SELECT"] = "SELECT";
  EWorkflowType["SKETCH"] = "SKETCH";
  EWorkflowType["REFINE"] = "REFINE";
})(EWorkflowType || (EWorkflowType = {}));
var ESelectionType;
(function (ESelectionType) {
  ESelectionType["POINT"] = "POINT";
  ESelectionType["LINE"] = "LINE";
  ESelectionType["POLY"] = "POLY";
  ESelectionType["RECT"] = "RECT";
})(ESelectionType || (ESelectionType = {}));
var ESketchType;
(function (ESketchType) {
  ESketchType["LAYER"] = "LAYER";
  ESketchType["INTERACTIVE"] = "INTERACTIVE";
})(ESketchType || (ESketchType = {}));
var EExpandType;
(function (EExpandType) {
  EExpandType["EXPAND"] = "EXPAND";
  EExpandType["COLLAPSE"] = "COLLAPSE";
})(EExpandType || (EExpandType = {}));

export { EWorkflowType as E, EExpandType as a, EPageType as b, ESketchType as c, EExportType as d, EUpdateType as e, ESelectionMode as f, ERefineMode as g, ESelectionType as h };
