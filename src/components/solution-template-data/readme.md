# solution-template-data



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute      | Description                                                                                                                                                                                     | Type                          | Default     |
| ----------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------- |
| `authentication`        | --             | Credentials for requests                                                                                                                                                                        | `UserSession`                 | `undefined` |
| `instanceid`            | `instanceid`   | This needs to be unique for props vs data of an item                                                                                                                                            | `string`                      | `""`        |
| `isResource`            | `is-resource`  | Should be set to true for items that store their data as a resource Will allow for upload and download of the resource                                                                          | `boolean`                     | `false`     |
| `itemid`                | `itemid`       | A templates itemId. This is used to get the correct model from a store in the json-editor                                                                                                       | `string`                      | `""`        |
| `organizationVariables` | --             | Contains the organization based variables                                                                                                                                                       | `IOrganizationVariableItem[]` | `[]`        |
| `solutionVariables`     | --             | Contains the solution based variables                                                                                                                                                           | `IVariableItem[]`             | `[]`        |
| `translations`          | `translations` | Contains the translations for this component.                                                                                                                                                   | `any`                         | `{}`        |
| `value`                 | --             | Contains the public value for this component.  When working with a resource item this should contain an IResourceItem  When working with a json type item this should contain the data and vars | `ITemplateData`               | `{}`        |
| `varsOpen`              | `vars-open`    | Used to show/hide the variable containers                                                                                                                                                       | `boolean`                     | `true`      |


## Dependencies

### Used by

 - [solution-item](../solution-item)

### Depends on

- calcite-shell
- calcite-panel
- [json-editor](../json-editor)
- calcite-shell-panel
- calcite-button
- [solution-organization-variables](../solution-organization-variables)
- [solution-variables](../solution-variables)
- [solution-resource-item](../solution-resource-item)

### Graph
```mermaid
graph TD;
  solution-template-data --> calcite-shell
  solution-template-data --> calcite-panel
  solution-template-data --> json-editor
  solution-template-data --> calcite-shell-panel
  solution-template-data --> calcite-button
  solution-template-data --> solution-organization-variables
  solution-template-data --> solution-variables
  solution-template-data --> solution-resource-item
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-tooltip-manager
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
  json-editor --> calcite-button
  json-editor --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  solution-organization-variables --> calcite-label
  solution-organization-variables --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  calcite-tree-item --> calcite-checkbox
  solution-variables --> calcite-label
  solution-variables --> calcite-tree-item
  solution-variables --> solution-item-icon
  solution-variables --> calcite-tree
  solution-resource-item --> calcite-value-list
  solution-resource-item --> calcite-value-list-item
  solution-resource-item --> calcite-action-group
  solution-resource-item --> calcite-action
  calcite-value-list-item --> calcite-icon
  calcite-value-list-item --> calcite-pick-list-item
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  solution-item --> solution-template-data
  style solution-template-data fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
