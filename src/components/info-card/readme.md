# info-card



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                      | Type              | Default |
| ----------- | ------------ | ---------------------------------------------------------------- | ----------------- | ------- |
| `cardTitle` | `card-title` | string: the components title                                     | `string`          | `""`    |
| `values`    | --           | IInfoCardValues: key value pairs to show in the components table | `IInfoCardValues` | `{}`    |


## Dependencies

### Used by

 - [card-manager](../card-manager)

### Depends on

- calcite-shell
- calcite-label

### Graph
```mermaid
graph TD;
  info-card --> calcite-shell
  info-card --> calcite-label
  card-manager --> info-card
  style info-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
