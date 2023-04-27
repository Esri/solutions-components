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
export var ELayoutMode;
(function (ELayoutMode) {
    ELayoutMode["GRID"] = "GRID";
    ELayoutMode["HORIZONTAL"] = "HORIZONTAL";
    ELayoutMode["VERTICAL"] = "VERTICAL";
})(ELayoutMode || (ELayoutMode = {}));
/**
 * Resource update types
 */
export var EUpdateType;
(function (EUpdateType) {
    EUpdateType[EUpdateType["Add"] = 0] = "Add";
    EUpdateType[EUpdateType["Update"] = 1] = "Update";
    EUpdateType[EUpdateType["Remove"] = 2] = "Remove";
    EUpdateType[EUpdateType["None"] = 3] = "None";
    EUpdateType[EUpdateType["Obsolete"] = 4] = "Obsolete";
})(EUpdateType || (EUpdateType = {}));
export var EPageType;
(function (EPageType) {
    EPageType[EPageType["LIST"] = 0] = "LIST";
    EPageType[EPageType["SELECT"] = 1] = "SELECT";
    EPageType[EPageType["EXPORT"] = 2] = "EXPORT";
})(EPageType || (EPageType = {}));
export var ESelectionType;
(function (ESelectionType) {
    ESelectionType["POINT"] = "POINT";
    ESelectionType["LINE"] = "LINE";
    ESelectionType["POLY"] = "POLY";
    ESelectionType["RECT"] = "RECT";
})(ESelectionType || (ESelectionType = {}));
export var EExpandType;
(function (EExpandType) {
    EExpandType["EXPAND"] = "EXPAND";
    EExpandType["COLLAPSE"] = "COLLAPSE";
})(EExpandType || (EExpandType = {}));
export var EWorkflowType;
(function (EWorkflowType) {
    EWorkflowType["SEARCH"] = "SEARCH";
    EWorkflowType["SELECT"] = "SELECT";
    EWorkflowType["SKETCH"] = "SKETCH";
})(EWorkflowType || (EWorkflowType = {}));
