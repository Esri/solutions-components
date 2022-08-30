# solution-item-details



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                   | Type           | Default                                                                                                                                   |
| -------- | --------- | --------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `type`   | `type`    | Contains the public type for this component.  | `string`       | `""`                                                                                                                                      |
| `value`  | --        | Contains the public value for this component. | `IItemDetails` | `{     title: "",     snippet: "",     description: "",     tags: [],     accessInformation: "",     licenseInfo: "",     itemId: ""   }` |


## Dependencies

### Used by

 - [solution-item](../solution-item)

### Depends on

- calcite-input
- calcite-label

### Graph
```mermaid
graph TD;
  solution-item-details --> calcite-input
  solution-item-details --> calcite-label
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  solution-item --> solution-item-details
  style solution-item-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
