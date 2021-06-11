# solution-template-data



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute      | Description                                                                                                                                                                                     | Type                          | Default |
| ----------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------- |
| `instanceid`            | `instanceid`   | This needs to be unique for props vs data of an item                                                                                                                                            | `string`                      | `""`    |
| `isResource`            | `is-resource`  | Should be set to true for items that store their data as a resource Will allow for upload and download of the resource                                                                          | `boolean`                     | `false` |
| `itemid`                | `itemid`       | A templates itemId. This is used to get the correct model from a store in the json-editor                                                                                                       | `string`                      | `""`    |
| `organizationVariables` | --             | Contains the organization based variables                                                                                                                                                       | `IOrganizationVariableItem[]` | `[]`    |
| `solutionVariables`     | --             | Contains the solution based variables                                                                                                                                                           | `IVariableItem[]`             | `[]`    |
| `translations`          | `translations` | Contains the translations for this component.                                                                                                                                                   | `any`                         | `{}`    |
| `value`                 | --             | Contains the public value for this component.  When working with a resource item this should contain an IResourceItem  When working with a json type item this should contain the data and vars | `ITemplateData`               | `{}`    |


## Dependencies

### Used by

 - [solution-item](../solution-item)

### Depends on

- calcite-shell
- calcite-panel
- [json-editor](../json-editor)
- calcite-shell-panel
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
  solution-template-data --> solution-organization-variables
  solution-template-data --> solution-variables
  solution-template-data --> solution-resource-item
  calcite-panel --> calcite-action
  calcite-panel --> calcite-popover
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
  json-editor --> calcite-button
  json-editor --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  solution-organization-variables --> calcite-label
  solution-organization-variables --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  solution-variables --> calcite-label
  solution-variables --> calcite-tree-item
  solution-variables --> calcite-tree
  solution-resource-item --> calcite-label
  solution-resource-item --> calcite-button
  solution-item --> solution-template-data
  style solution-template-data fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
