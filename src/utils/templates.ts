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

/*
 | Helper functions to get required values from solutions templates
*/
import {
  //EUpdateType,
  IInventoryItem,
  IItemDetails,
  IItemShare,
  IOrganizationVariableItem,
  //IResourcePath,
  //SolutionModels,
  //ISolutionSpatialReferenceInfo,
  IVariableItem
} from '../utils/interfaces';
import {
  IItemTemplate
} from '@esri/solution-common';

//--------------------------------------------------------------------------
//
//  Public Functions
//
//--------------------------------------------------------------------------

/**
 * Sort the solution items
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a sorted list of solution items
 */
export function getInventoryItems(
  templates: IItemTemplate[]
): IInventoryItem[] {
  const hierarchy = getItemHierarchy(templates);
  const ids = hierarchy.reduce((prev, cur) => {
    prev.push(cur.id);
    return prev;
  }, []);
  return templates.reduce((prev, cur) => {
    if (ids.indexOf(cur.itemId) > -1) {
      const hierarchyItems = hierarchy.filter(hi => hi.id === cur.itemId);
      prev.push(_getItemFromTemplate(cur, templates, hierarchyItems[0].dependencies));
    }
    return prev;
  }, []);
}

/**
 * Create item hierarchy that will avoid issues from cylical dependencies
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a hierarchy for item and item dependency display
 */
export function getItemHierarchy(
  templates: IItemTemplate[]
): any[] {
  const hierarchy = [];

  // Get the template specified by id out of a list of templates
  function getTemplateInSolution(templates, id): any {
    const iTemplate = templates.findIndex((template) => id === template.itemId);
    return iTemplate >= 0 ? templates[iTemplate] : null;
  }

  // Hierarchically list the dependencies of specified node
  function traceItemId(id, accumulatedHierarchy, alreadyVisitedIds = []): void {
    // Get the dependencies of the node
    const template = getTemplateInSolution(templates, id);
    /* istanbul ignore else */
    if (template) {
      const templateEntry = {
        id,
        dependencies: []
      };

      // Visit each dependency, but only if this template is not in the alreadyVisitedIds list to avoid infinite loops
      /* istanbul ignore else */
      if (alreadyVisitedIds.indexOf(id) < 0) {
        // Add dependency to alreadyVisitedIds list
        alreadyVisitedIds.push(id);

        template.dependencies.forEach((dependencyId) => {
          // Remove dependency from list of templates to visit in the top-level loop
          const iDependencyTemplate = templateItemIds.indexOf(dependencyId);
          /* istanbul ignore else */
          if (iDependencyTemplate >= 0) {
            templateItemIds.splice(iDependencyTemplate, 1);
          }

          traceItemId(dependencyId, templateEntry.dependencies, alreadyVisitedIds);
        });
      }
      accumulatedHierarchy.push(templateEntry);
    }
  }

  // Start with top-level nodes and add in the rest of the nodes to catch cycles without top-level nodes
  let templateItemIds: string[] = _getTopLevelItemIds(templates);

  const otherItems = templates
    .filter((template) => templateItemIds.indexOf(template.itemId) < 0) // only keep non-top-level nodes
    .sort((a, b) => b.dependencies.length - a.dependencies.length); // sort so that nodes with more dependencies come first--reduces stubs

  templateItemIds = templateItemIds.concat(otherItems.map((template) => template.itemId));

  // Step through the list of nodes; we'll also remove nodes as we visit them
  let itemId = templateItemIds.shift();
  while (typeof itemId !== "undefined") {
    traceItemId(itemId, hierarchy);
    itemId = templateItemIds.shift();
  }

  return hierarchy;
}

/**
 * Explore the solution item templates for variables we will allow users to insert at runtime
 *
 * @param templates a list of item templates from the solution
 * @param translations nls translation object
 *
 * @returns a list of variables from the solution item templates
 */
export function getSolutionVariables(
  templates: any[],
  translations: any
): IVariableItem[] {
  const vars: IVariableItem[] = [];
  templates.forEach(t => {
    const item = {
      id: t.itemId,
      title: t.item.title || t.item.name,
      type: t.type,
      value: undefined,
      dependencies: [{
        id: t.itemId,
        title: translations.itemId,
        value: `{{${t.itemId}.itemId}}`,
      }]
    };
    if (t.item.url) {
      item.dependencies.push({
        id: t.itemId,
        title: translations.url,
        value: `{{${t.itemId}.url}}`,
      });
    }
    if (t.type === "Feature Service") {
      // TODO need to set source service name var...
      // TODO need to set soure service shape field name "{{d05b3cf1ffcb4a4fa677627dfb18609e.name}}.Shape"
      item.dependencies.push({
        id: t.itemId,
        title: translations.solutionExtent,
        value: `{{${t.itemId}.solutionExtent}}`,
      })
      _addLayersOrTables(t.properties.layers || [], item, t, translations);
      _addLayersOrTables(t.properties.tables || [], item, t, translations);
    }
    vars.push(item);
  })

  return vars;
}

/**
 * Set key organization variables we will allow users to insert at runtime
 *
 * @param translations nls translation object
 *
 * @returns a list of variables for the organization
 */
export function getOrganizationVariables(
  translations: any
): IOrganizationVariableItem[] {
  const orgVars: IOrganizationVariableItem[] = [{
    id: "",
    title: translations.geocodeUrl,
    value: "{{organization.helperServices.geocode:getDefaultLocatorURL}}"
  }, {
    id: "",
    title: translations.geometryUrl,
    value: "{{organization.helperServices.geometry.url}}"
  }, {
    id: "",
    title: translations.portalBaseUrl,
    value: "{{portalBaseUrl}}"
  }, {
    id: "",
    title: translations.routeUrl,
    value: "{{organization.helperServices.route.url}}"
  }, {
    id: "",
    title: translations.solutionItemExtent,
    value: "{{solutionItemExtent}}"
  }];
  return orgVars;
}

//--------------------------------------------------------------------------
//
//  Private Functions
//
//--------------------------------------------------------------------------

/**
 * Explore a solution item template for variables we will allow users to insert at runtime.
 * This function will update the item argument that is passed in with the var details.
 *
 * @param children a list of layers or tables from a template
 * @param item an object that store key details for a given variable
 * @param template one of the templates from the current solution
 * @param translations nls translations object
 *
 */
function _addLayersOrTables(
  children: any[],
  item: any,
  template: any,
  translations: any
): void {
  children.forEach(l => {
    const name = l.name && l.name.indexOf("||") > -1 ? l.name.split("||")[1].replace("}}", "").trim() : l.name;

    item.dependencies.push({
      id: template.itemId,
      title: `${name} (${translations.id})`,
      value: `{{${template.itemId}.layer${l.id}.id}}`,
    });
    item.dependencies.push({
      id: template.itemId,
      title: `${name} (${translations.name})`,
      value: `{{${template.itemId}.layer${l.id}.name||${name}}}`,
    });
  });
}

/**
 * Capture key details from the solution item template
 *
 * @param template one of the templates from the current solution
 * @param templates full list of templates
 * @param dependencies list of hierarchical dependencies
 *
 * @returns an IInventoryItem that is used by other components to work with this template
 */
function _getItemFromTemplate(
  template: any,
  templates: any[],
  dependencies: any[]
): IInventoryItem {
  return {
    id: template.itemId || "",
    title: template.item.title || "",
    dependencies: _getDependencies(dependencies, templates),
    type: template.item.type || "",
    typeKeywords: template.item.typeKeywords || [],
    solutionItem: {
      itemId: template.itemId,
      itemDetails: _getItemDetails(template.item, template.type === "Group"),
      isResource: _getIsResource(template),
      data: template.data,
      properties: template.properties,
      type: template.type,
      groupDetails: _getGroupDetails(template, templates)
    }
  };
}

/**
 * Capture key details from the solution item template
 *
 * @param dependencies list of dependencies from a template
 * @param templates full list of templates
 *
 * @returns a list of IInventoryItem that are used by other components to work with the templates
 */
function _getDependencies(
  dependencies: any[],
  templates: any[]
): IInventoryItem[] {
  const dependencyItems = [];
  const depIds = dependencies.reduce((prev, cur) => {
    prev.push(cur.id)
    dependencyItems.push(cur)
    return prev;
  }, []);
  return templates.reduce((prev, curr) => {
    const i = depIds.indexOf(curr.itemId);
    if (i > -1) {
      prev.push(_getItemFromTemplate(curr, templates, dependencyItems[i].dependencies));
    }
    return prev;
  }, []);
}

/**
 * Capture the key item details for a given template
 *
 * @param item the templates item
 * @param isGroup boolean to indicate if the item is a group
 * @param itemId the item id of the template
 *
 * @returns a IItemDetails object for the current item
 */
function _getItemDetails(
  item: any,
  isGroup: boolean
): IItemDetails {
  return {
    title: item.title || "",
    snippet: item.snippet || "",
    description: item.description || "",
    tags: item.tags || [],
    accessInformation: !isGroup ? item.accessInformation || "" : "",
    licenseInfo: !isGroup ? item.licenseInfo || "" : ""
  };
}

/**
 * Capture the key item details for a given group template
 *
 * @param template one of the templates from the current solution
 * @param templates full list of templates
 *
 * @returns a list of IItemShare objects
 */
function _getGroupDetails(
  template: any,
  templates: any[]
): IItemShare[] {
  return template.type === "Group" ? templates.reduce((prev, cur) => {
    if (cur.itemId !== template.itemId && cur.type !== "Group") {
      prev.push({
        id: cur.itemId,
        title: cur.item.name || cur.item.title,
        isShared: (cur.groups || []).indexOf(template.itemId) > -1,
        shareItem: (cur.groups || []).indexOf(template.itemId) > -1,
        type: cur.type,
        typeKeywords: cur.item.typeKeywords
      });
    }
    return prev;
  }, []) : [];
}

/**
 * Used to understand if we are dealing with a binary object that will support upload/download
 *
 * @param template one of the templates from the current solution
 *
 * @returns true if this item supports upload/download
 */
function _getIsResource(
  template: any
): boolean {
  return template.type !== "Group" && template.resources.some(r => r.indexOf("_info_thumbnail") < 0) &&
    (template.data === null || JSON.stringify(template.data) === "{}");
}

/**
 * Sort the template ids based on their dependencies
 *
 * @param templates full list of templates
 *
 * @returns a list of Itop level item ids
 */
function _getTopLevelItemIds(templates: IItemTemplate[]): string[] {
  // Find the top-level nodes. Start with all nodes, then remove those that other nodes depend on
  const topLevelItemCandidateIds = templates.map((template) => template.itemId);
  templates.forEach((template) => {
    (template.dependencies || []).forEach((dependencyId) => {
      const iNode = topLevelItemCandidateIds.indexOf(dependencyId);
      if (iNode >= 0) {
        // Node is somebody's dependency, so remove the node from the list of top-level nodes
        // If iNode == -1, then it's a shared dependency and it has already been removed
        topLevelItemCandidateIds.splice(iNode, 1);
      }
    });
  });
  return topLevelItemCandidateIds;
}
