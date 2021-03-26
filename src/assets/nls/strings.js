/*
 | Copyright 2021 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */

/*
 | Note: this file uses two types of symbols to mark where values are inserted by the program:
 |   * under the "typescript" section:  ${insert_here}
 |   * under the "elm" section:  {{insert_here}}
*/

define({
  root: ({
    // Pop-up for configuring a solution
    "configuration_modal": {
      "title": "Configure: {{solutionName}}", // modal title
      "cancel": "Cancel", // reject changes
      "save": "Save", // save changes

      "configuration": {
        "definitionTab": "Definition", // for tab to edit definition of an item or group
        "spatialReferenceTab": "Spatial Reference", // for tab to edit the spatial reference of an item

        "itemDetailsTab": "Item Details",
        "dataTab": "Data",
        "propertiesTab": "Properties",
        "groupDetailsTab": "Group Details",
        "sharingTab": "Sharing",

        // Item details
        "itemDetails": {
          "editThumbnail": "Edit Thumbnail",
          "description": "Description",
          "tags": "Tags",
          "credits": "Credits",
          "termsOfUse": "Terms of Use",
          "snippetCountPattern": "{{n}} of 250"
        },

        "jsonEditor": {
          "startEditing": "Start Editing",
          "search": "Search",
          "cancelEdits": "Cancel Edits",
          "saveEdits": "Save Edits"
        },

        "resourceItem": {
          "update": "Update",
          "download": "Download"
        },

        "spatialRef": {
          "specifyParam": "Spatial Reference Parameter",
          "defaultSpatialRef": "Default Spatial Reference",
          "featureServicesHeading": "Feature Services"
        },

        "variables": {
          "orgVariables": "Organization Variables",
          "solVariables": "Solution Variables"
        }
      }
    }
  }),
  "fr": 1
});
