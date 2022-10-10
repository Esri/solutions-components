# solution-item



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                | Description                               | Type          | Default     |
| ----------------------- | ------------------------ | ----------------------------------------- | ------------- | ----------- |
| `authentication`        | --                       | Credentials for requests                  | `UserSession` | `undefined` |
| `itemId`                | `item-id`                | A template's itemId.                      | `string`      | `""`        |
| `organizationVariables` | `organization-variables` | Contains the organization based variables | `string`      | `""`        |
| `solutionVariables`     | `solution-variables`     | Contains the solution based variables     | `string`      | `""`        |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-tabs
- calcite-tab-nav
- calcite-tab-title
- calcite-tab
- [solution-item-details](../solution-item-details)
- [solution-item-sharing](../solution-item-sharing)
- [solution-template-data](../solution-template-data)
- [solution-resource-item](../solution-resource-item)

### Graph
```mermaid
graph TD;
  solution-item --> calcite-tabs
  solution-item --> calcite-tab-nav
  solution-item --> calcite-tab-title
  solution-item --> calcite-tab
  solution-item --> solution-item-details
  solution-item --> solution-item-sharing
  solution-item --> solution-template-data
  solution-item --> solution-resource-item
  calcite-tab-title --> calcite-icon
  solution-item-details --> calcite-input
  solution-item-details --> calcite-label
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  solution-item-sharing --> calcite-label
  solution-item-sharing --> calcite-switch
  solution-item-sharing --> solution-item-icon
  solution-template-data --> calcite-shell
  solution-template-data --> calcite-panel
  solution-template-data --> json-editor
  solution-template-data --> calcite-shell-panel
  solution-template-data --> calcite-button
  solution-template-data --> solution-organization-variables
  solution-template-data --> solution-variables
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
  json-editor --> calcite-icon
  json-editor --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  solution-organization-variables --> calcite-tree
  solution-organization-variables --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  calcite-tree-item --> calcite-checkbox
  solution-variables --> calcite-tree
  solution-variables --> calcite-tree-item
  solution-variables --> solution-item-icon
  solution-resource-item --> calcite-button
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
  solution-configuration --> solution-item
  style solution-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
