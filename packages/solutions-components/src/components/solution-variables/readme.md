# solution-variables



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                   | Type     | Default |
| -------- | --------- | --------------------------------------------- | -------- | ------- |
| `value`  | `value`   | Contains the public value for this component. | `string` | `""`    |


## Events

| Event                      | Description | Type                                              |
| -------------------------- | ----------- | ------------------------------------------------- |
| `solutionVariableSelected` |             | `CustomEvent<{ itemId: string; value: string; }>` |


## Dependencies

### Used by

 - [solution-template-data](../solution-template-data)

### Depends on

- calcite-tree
- calcite-tree-item
- [solution-item-icon](../solution-item-icon)

### Graph
```mermaid
graph TD;
  solution-variables --> calcite-tree
  solution-variables --> calcite-tree-item
  solution-variables --> solution-item-icon
  calcite-tree-item --> calcite-icon
  calcite-tree-item --> calcite-checkbox
  solution-template-data --> solution-variables
  style solution-variables fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
