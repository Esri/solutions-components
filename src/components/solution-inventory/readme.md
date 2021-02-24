# solution-inventory



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                   | Type               | Default |
| -------------- | -------------- | --------------------------------------------- | ------------------ | ------- |
| `translations` | `translations` | Contains the translations for this component. | `any`              | `{   }` |
| `value`        | --             | Contains the public value for this component. | `IInventoryItem[]` | `[]`    |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `solutionItemSelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-tree
- calcite-tree-item

### Graph
```mermaid
graph TD;
  solution-inventory --> calcite-tree
  solution-inventory --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  solution-configuration --> solution-inventory
  style solution-inventory fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
