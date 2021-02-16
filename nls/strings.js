/*
 | Copyright 2020 Esri
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

    // ==================== Esri Global Navigation heading ====================
    "header": {
      "menus": [[{
        "label": "Create" // button to show main page of app, which displays available Solutions Groups as cards
      }, {
        "label": "My Templates" // button to show page which displays Solutions created by user as cards
      }], [{
        "label": "Resources" // link to information site https://solutions.arcgis.com/
      }]],
      // ArcGIS Online account information for signed-in user
      "account": {
        "label": "Account Profile",
        "controls": {
          "signin": "Sign In",
          "signout": "Sign Out",
          "switch": "Switch Account"
        },
        "menus": [{
          "label": "Profile & Settings"
        }, {
          "label": "My Esri"
        }, {
          "label": "Training"
        }, {
          "label": "Community & Forums"
        }]
      }
    },


    // ==================== Text specific to app ====================
    // Used to provide a link for the user to provide feedback
    "feedback": {
      "message": "Provide your feedback through <a href='https://community.esri.com/community/gis/solutions'>GeoNet, the Esri Community.</a>"
    },
    "typescript": {
      "alerts": {
        "failedToCreate": "${solutionTitle} failed to create", // appears in a pop-up box after an attempt to create a Solution
        "successfullyCreated": "${solutionTitle} was successfully created" // appears in a pop-up box after an attempt to create a Solution
      },
      "buttons": {
        "retry": "Retry" // appears in a pop-up box with the "failedToCreate" alert; used to trigger a retry with the failed Solution
      }
    },
    "elm": {
      // ---------- copy all of the "elm" properties to the file Elm_strings.json, removing comments
      "browser": {
        "notSupported": "You are using a browser that is not supported by ArcGIS Solutions.",
        "browserSuggestion": "Please use the latest version of Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge."
      },
      "user":{
        "blockedAccess": "Access to this application has been blocked.",
        "blockedSuggestion": "Please contact your administrator for more information."
      },
      // Used in the display of Solution cards and their details pop-up
      "cards": {
        "configure": "Configure", // in "My Templates" card details to modify a Solution template
        "back": "Back", // return to the card details pop-up
        "close": "Close", // in a card details or missing-privileges pop-up to close it
        "cancel": "Cancel", // cancel current user config option
        "deploy": "Deploy", // in modal title when configuring user options
        "deployed": "Deployed", // tooltip on Solution card when that Solution has already been deployed
        "getNow": "Get Now", // in the card details pop-up to get (start deploying) a Solution
         // if one clicks "Get Now" in card details pop-up but doesn't have privileges to publish, a missing-privileges pop-up appears
        "missingPrivilegesPopup": {
          "missingPrivilegesListHeading": "You are missing the following privileges to deploy this solution:",
          "requiredPrivilegesList": {
            "createGroup": "Create, update, and delete groups",
            "createItem": "Create, update, and delete items",
            "publishFeatures": "Publish hosted feature layers",
            "shareToGroup": "Share items with groups"
          },
          "suggestedProblemRemedyMessage": "Please contact your administrator for assistance."
        },
        "next": "Next", // go to next page of user options
        "open": "Open", // cursor hover display on Solution card for a created Solution to show that one can click on card to go to Solution in ArcGIS Online
        "viewDetails": "View Details" // cursor hover display on Solution card to show that one can click on card to open card details pop-up
      },
      "configure": {
        "validate": "Validate",
        "invalidID": "The ID is invalid or inaccessible.",
        "spatialReferencePlaceholder": "Search for spatial reference using name or WKID",
        "spatialReferenceLabel": "Spatial Reference",
        "spatialReferenceInfo": "Select the spatial reference of the feature layers deployed with the solution.",
        "learnMore": "Learn more"
      },
      // Used to adjust which Solution cards are displayed
      "filters": {
        "numberOfSolutionsFound": "Solutions:", // displays count of Solutions on page
        "numberOfGroupsFound": "Groups:", //displays count of Solution Groups on page
        "clearFilters": "Clear filters",
        "clearSingleFilter": "Clear {{filterName}} filter",
        "domainFilterType": "Domain",
        "domainsValues": {
          "agriculture": "Agriculture",
          "assessmentAndTaxation": "Assessment and Taxation",
          "elections": "Elections",
          "electric": "Electric",
          "emergencyManagement": "Emergency Management",
          "environmentAndNaturalResources": "Environment and Natural Resources",
          "fireService": "Fire Service",
          "fishAndWildlife": "Fish and Wildlife",
          "gas": "Gas",
          "healthAndHumanServices": "Health and Human Services",
          "lawEnforcement": "Law Enforcement",
          "naturalResources": "Natural Resources",
          "planningAndDevelopment": "Planning and Development",
          "protectedAreas": "Protected Areas",
          "publicWorks": "Public Works",
          "sewer": "Sewer",
          "stormwater": "Stormwater",
          "telecommunications": "Telecommunications",
          "transportation": "Transportation",
          "water": "Water Distribution"
        },
        "filterButton": "Filter", // button to show/hide Filters sidebar
        "filtersHeading": "Filters", // heading for Filters sidebar
        "industriesHeading": "Industries",
        "industriesValues": {
          "business": "Business",
          "conservation": "Conservation",
          "defense": "Defense",
          "publicSafety": "Public Safety",
          "stateAndLocalGovernment": "State and Local Government",
          "utilities": "Utilities"
        },
        "industryFilterType": "Industry",
        "initiativeFilterType": "Initiative",
        "initiativesHeading": "Initiatives",
        "initiativeValues": {
          "coronavirus": "Coronavirus (COVID-19)",
          "racialEquity": "Racial Equity"
        },
        "newVersionFilterType": "Type",
        "newVersionFilterValue": "New",
        "newVersionToggle": "New Version Available" // toggle switch indicating if only Solutions with new versions available are to be displayed
      },
      // Used to find Solutions
      "search": {
        "nothingFound": "No solutions found that meet your criteria. Try changing your search term or clearing some filters to show more solutions.",
        "searching": "Searching for \"{{searchTerm}}\"", // message that appears while app is searching for a Solution
        "noSolutionsYet": "No solutions yet.", // title of message that appears if there are no created Solutions to search
        "createFirstSolution": "Go to the Home page to create your first solution.", // explanation line following the noSolutionsYet title
        "searchMyArcGISSolutionsTemplates": "Search My Templates", // placeholder for searching for Solutions on My Templates (already created) page
        "searchArcGISSolutionsGroups": "Search Groups", // placeholder for searching for Solution Groups on Create (available Solutions) page
        "clearSearch": "Clear search" // ARIA text for button to erase current search text
      },
      // Used to adjust the order in which Solution cards are displayed
      "cardDisplayOrder": {
        "sortingByDateModified": "sorting by date modified", // description of sorting menu button for screen reader
        "sortingByRelevance": "sorting by relevance", // description of sorting menu button for screen reader
        "sortingByTitle": "sorting by title", // description of sorting menu button for screen reader
        "sortBy": "Sort by", // title for type of sort: date modified, relevance, or title
        "sortByDateModified": "Date Modified", // sort option
        "sortByRelevance": "Relevance", // sort option
        "sortByTitle": "Title", // sort option
        "sortDirection": "Sort direction", // title for direction of sort for sorting by date modified or by title
        "sortDirectionAlphabetical": "Alphabetical", // direction for sorting by title
        "sortDirectionLeastRecent": "Least recent", // direction for sorting by date modified
        "sortDirectionMostRecent": "Most recent", // direction for sorting by date modified
        "sortDirectionReverseAlphabetical": "Reverse-Alphabetical" // direction for sorting by title
      },
      // Shared by popups
      "modal": {
        "close": "Close", // in a card details or missing-privileges pop-up to close it
        "create": "Create" // in a card details pop-up to Create solution
      },
      // Pop-up for first-time users to introduce the app
      "welcome_modal": {
        "firstParagraph": "ArcGIS Solutions are a collection of focused maps and apps that help address challenges in your organization. Part of the Esri Geospatial Cloud, ArcGIS Solutions leverage your authoritative data and are designed to help you improve operations, gain new insight, and enhance services.",
        "secondParagraph": "The ArcGIS Solutions app can be used to search for a solution and quickly deploy to your ArcGIS organization. Once complete you can open the solution in your organization and configure it to meet your needs.",
        "thirdParagraph": "If you don't see the solution you are interested in, click Resources to visit the ArcGIS Solutions website and explore the complete collection of solutions.",
        "title" : "Welcome to the new ArcGIS Solutions app!"
      },
      // Pop-up for configuring a solution
      "configuration_modal": {
        "title": "Configure: {{solutionName}}", // modal title
        "cancel": "Cancel" // reject changes
        "save": "Save", // save changes

        "configuration": {
          "definitionTab": "Definition", // for tab to edit definition of an item or group
          "spatialReferenceTab": "Spatial Reference", // for tab to edit the spatial reference of an item

          // Information about an item
          "item": {
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

            "jsonEditing": {
              "startEditing": "Start editing", // start modifying JSON in its editor
              "search": "Search" // search within JSON editor
            }
          },

          "spatialRef": {
            "specifyParam": "Spatial Reference Parameter",
            "defaultSpatialRef": "Default Spatial Reference",
            "featureServicesHeading": "Feature Services"
          }
        }
      }
      // ---------- end of copy
    }
  }),
  "fr": 1
});
