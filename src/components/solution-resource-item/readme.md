# solution-resource-item



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute | Description                                                                                | Type          | Default     |
| ---------------- | --------- | ------------------------------------------------------------------------------------------ | ------------- | ----------- |
| `authentication` | --        | Credentials for requests                                                                   | `UserSession` | `undefined` |
| `itemId`         | `item-id` | A template's itemId. This is used to get the correct model from a store in the json-editor | `string`      | `""`        |


## Dependencies

### Used by

 - [solution-item](../solution-item)

### Depends on

- calcite-button
- calcite-value-list
- calcite-value-list-item
- calcite-action-group
- calcite-action

### Graph
```mermaid
graph TD;
  solution-resource-item --> calcite-button
  solution-resource-item --> calcite-value-list
  solution-resource-item --> calcite-value-list-item
  solution-resource-item --> calcite-action-group
  solution-resource-item --> calcite-action
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-value-list-item --> calcite-icon
  calcite-value-list-item --> calcite-pick-list-item
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  solution-item --> solution-resource-item
  style solution-resource-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
