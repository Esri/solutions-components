# pdf-download



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute  | Description | Type               | Default     |
| ----------- | ---------- | ----------- | ------------------ | ----------- |
| `disabled`  | `disabled` |             | `boolean`          | `undefined` |
| `layerView` | --         |             | `FeatureLayerView` | `undefined` |


## Dependencies

### Used by

 - [new-public-notification](../new-public-notification)
 - [public-notification](../public-notification)

### Depends on

- calcite-select
- calcite-option

### Graph
```mermaid
graph TD;
  pdf-download --> calcite-select
  pdf-download --> calcite-option
  calcite-select --> calcite-icon
  new-public-notification --> pdf-download
  public-notification --> pdf-download
  style pdf-download fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
