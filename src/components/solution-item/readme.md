# solution-item



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute      | Description                                   | Type            | Default                                                                                                                                         |
| ----------------------- | -------------- | --------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `organizationVariables` | --             | Contains the organization based variables     | `any[]`         | `[]`                                                                                                                                            |
| `solutionVariables`     | --             | Contains the solution based variables         | `any[]`         | `[]`                                                                                                                                            |
| `translations`          | `translations` | Contains the translations for this component. | `any`           | `{}`                                                                                                                                            |
| `value`                 | --             | Contains the public value for this component. | `ISolutionItem` | `{     itemId: "",     itemDetails: {},     isResource: false,     data: {},     properties: {},     type: "",     groupDetails: undefined   }` |


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
  solution-resource-item --> calcite-label
  solution-resource-item --> calcite-button
  solution-configuration --> solution-item
  style solution-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
