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
  "header": {
    "menus": [
      [
        {
          "label": "Accueil"
        },
        {
          "label": "Mes solutions"
        }
      ],
      [
        {
          "label": "Ressources"
        }
      ]
    ],
    "account": {
      "label": "Profil du compte",
      "controls": {
        "signin": "Se connecter",
        "signout": "Se déconnecter",
        "switch": "Changer de compte"
      },
      "menus": [
        {
          "label": "Profil et paramètres"
        },
        {
          "label": "My Esri"
        },
        {
          "label": "Entraînement"
        },
        {
          "label": "Communauté et forums"
        }
      ]
    }
  },
  "typescript": {
    "alerts": {
      "failedToCreate": "N'a pas réussi à créer ${solutionTitle}",
      "successfullyCreated": "${solutionTitle} créé avec succès"
    },
    "buttons": {
      "retry": "Réessayer"
    }
  },
  "elm": {
    "browser": {
      "notSupported": "Vous utilisez un navigateur qui n’est pas pris en charge par les solutions ArcGIS.",
      "browserSuggestion": "Utilisez la dernière version de Google Chrome, Mozilla Firefox, Apple Safari ou Microsoft Edge."
    },
    "user": {
      "blockedAccess": "L’accès à cette application a été bloqué.",
      "blockedSuggestion": "Contactez votre administrateur pour plus d’informations."
    },
    "cards": {
      "configure": "Configurer",
      "back": "Précédent",
      "close": "Fermer",
      "cancel": "Annuler",
      "deploy": "Déployer",
      "deployed": "Déployée",
      "getNow": "Obtenir maintenant",
      "missingPrivilegesPopup": {
        "missingPrivilegesListHeading": "Vous ne disposez pas des privilèges suivants, requis pour déployer cette solution :",
        "requiredPrivilegesList": {
          "createGroup": "Créer, mettre à jour et supprimer des groupes",
          "createItem": "Créer, mettre à jour et supprimer des éléments",
          "publishFeatures": "Publier des couches d’entités hébergées",
          "shareToGroup": "Partager des éléments avec des groupes"
        },
        "suggestedProblemRemedyMessage": "Contactez votre administrateur pour obtenir de l’aide."
      },
      "next": "Suivant",
      "open": "Ouvrir",
      "viewDetails": "Afficher les détails"
    },
    "configure": {
      "validate": "Valider",
      "invalidID": "L'ID est invalide ou inaccessible.",
      "spatialReferencePlaceholder": "Rechercher une référence spatiale à l’aide du nom ou du WKID",
      "spatialReferenceLabel": "Référence spatiale",
      "spatialReferenceInfo": "Sélectionnez la référence spatiale des couches d’entités déployées avec la solution.",
      "spatialReferenceLearn": "En savoir plus"
    },
    "filters": {
      "numberOfSolutionsFound": "Solutions :",
      "numberOfGroupsFound": "Groupes:",
      "clearFilters": "Effacer les filtres",
      "clearSingleFilter": "Effacer le filtre {{filterName}}",
      "domainFilterType": "Domaine",
      "domainsValues": {
        "agriculture": "Agriculture",
        "assessmentAndTaxation": "Évaluation et taxation",
        "elections": "Élections",
        "electric": "Électricité",
        "emergencyManagement": "Gestion des urgences",
        "environmentAndNaturalResources": "Environnement et ressources naturelles",
        "fireService": "Sapeurs-pompiers",
        "fishAndWildlife": "Pêche et gestion de la faune",
        "gas": "Gaz",
        "healthAndHumanServices": "Santé et services à la personne",
        "lawEnforcement": "Maintien de l’ordre",
        "naturalResources": "Ressources naturelles",
        "planningAndDevelopment": "Planification et développement",
        "protectedAreas": "Gestion des zones protégées",
        "publicWorks": "Travaux publics",
        "sewer": "Égouts",
        "stormwater": "Eaux pluviales",
        "telecommunications": "Télécommunications",
        "transportation": "Transports",
        "water": "Distribution d’eau"
      },
      "filterButton": "Filtrer",
      "filtersHeading": "Filtres",
      "industriesHeading": "Secteurs d’activité",
      "industriesValues": {
        "business": "Commerce",
        "conservation": "Protection de l’environnement",
        "defense": "Défense",
        "publicSafety": "Sécurité publique",
        "stateAndLocalGovernment": "État et collectivités locales",
        "utilities": "Exploitation de réseaux"
      },
      "industryFilterType": "Secteur d’activité",
      "initiativeFilterType": "Initiative",
      "initiativesHeading": "Initiatives",
      "initiativeValues": {
        "coronavirus": "Coronavirus (COVID-19)",
        "racialEquity": "Égalité raciale"
      },
      "newVersionFilterType": "Type",
      "newVersionFilterValue": "Nouveau",
      "newVersionToggle": "Nouvelle version disponible"
    },
    "search": {
      "nothingFound": "Aucune solution ne correspond à vos critères. Modifiez votre terme de recherche ou effacez certains filtres pour afficher plus de solutions.",
      "searching": "Recherche de \"{{searchTerm}}\"",
      "noSolutionsYet": "Aucune solution pour le moment.",
      "deployFirstSolution": "Accédez à la page d’accueil pour déployer votre première solution.",
      "searchArcGISSolutions": "Parcourir les solutions",
      "searchMyArcGISSolutions": "Parcourir mes solutions",
      "clearSearch": "Effacer la recherche"
    },
    "cardDisplayOrder": {
      "sortingByDateModified": "tri par date de modification",
      "sortingByRelevance": "tri par pertinence",
      "sortingByTitle": "tri par titre",
      "sortBy": "Trier par",
      "sortByDateModified": "Date de modification",
      "sortByRelevance": "Pertinence",
      "sortByTitle": "Titre",
      "sortDirection": "Sens de tri",
      "sortDirectionAlphabetical": "Alphabétique",
      "sortDirectionLeastRecent": "Le moins récent",
      "sortDirectionMostRecent": "Le plus récent",
      "sortDirectionReverseAlphabetical": "Alphabétique inverse"
    },
    "modal": {
      "close": "Fermer",
      "create": "Créer"
    },
    "welcome_modal": {
      "firstParagraph": "ArcGIS Solutions constitue un ensemble de cartes et d’applications spécialisées destinées à vous aider à relever les défis auxquels votre organisation est confrontée. Partie intégrante d’Esri Geospatial Cloud, ArcGIS Solutions utilise vos données de référence et vous aide à optimiser les opérations, à obtenir de nouvelles informations et à améliorer les services.",
      "secondParagraph": "L’application ArcGIS Solutions permet de rechercher une solution et de la déployer rapidement dans votre organisation ArcGIS. Au terme du déploiement, vous pouvez ouvrir la solution dans votre organisation et la configurer selon vos besoins.",
      "thirdParagraph": "Si vous ne trouvez pas la solution qui vous intéresse, cliquez sur Ressources pour consulter le site Web ArcGIS Solutions et explorer l’ensemble des solutions.",
      "title": "Bienvenue dans la nouvelle application ArcGIS Solutions !"
    },
    "configuration_modal": {
      "title": "Configurer: {{solutionName}}",
      "cancel": "Annuler",
      "save": "Enregistrer",

      "configuration": {
        "definitionTab": "Définition",
        "spatialReferenceTab": "Référence spatiale",

        "itemDetailsTab": "Détails de l'élément",
        "dataTab": "Données",
        "propertiesTab": "Propriétés",
        "groupDetailsTab": "Détails du groupe",
        "sharingTab": "Partage",

        "itemDetails": {
          "editThumbnail": "Mettre à jour la miniature",
          "description": "Description",
          "tags": "Balises",
          "credits": "Crédits (Attribution)",
          "termsOfUse": "Conditions d’utilisation",
          "snippetCountPattern": "{{n}} sur 250"
        },

        "jsonEditor": {
          "startEditing": "Commencer l'édition",
          "search": "Chercher",
          "cancelEdits": "fr-Cancel Edits",
          "saveEdits": "fr-Save Edits"
        },

        "resourceItem": {
          "update": "fr-Update",
          "download": "fr-Download"
        },

        "spatialRef": {
          "specifyParam": "Paramètre de référence spatiale",
          "defaultSpatialRef": "Référence spatiale par défaut",
          "featureServicesHeading": "Services de fonctionnalités"
        },

        "variables": {
          "orgVariables": "fr-Organization Variables",
          "solVariables": "fr-Solution Variables"
        }
      }
    }
  }
});
