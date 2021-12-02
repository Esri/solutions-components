# solution-variables



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                   | Type              | Default |
| -------------- | -------------- | --------------------------------------------- | ----------------- | ------- |
| `translations` | `translations` | Contains the translations for this component. | `any`             | `{}`    |
| `value`        | --             | Contains the public value for this component. | `IVariableItem[]` | `[]`    |


## Events

| Event                      | Description | Type               |
| -------------------------- | ----------- | ------------------ |
| `solutionVariableSelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [solution-template-data](../solution-template-data)

### Depends on

- calcite-label
- calcite-tree-item
- [solution-item-icon](../solution-item-icon)
- calcite-tree

### Graph
```mermaid
graph TD;
  solution-variables --> calcite-label
  solution-variables --> calcite-tree-item
  solution-variables --> solution-item-icon
  solution-variables --> calcite-tree
  calcite-tree-item --> calcite-icon
  calcite-tree-item --> calcite-checkbox
  solution-template-data --> solution-variables
  style solution-variables fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
