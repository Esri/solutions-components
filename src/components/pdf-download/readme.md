# pdf-download



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type               | Default     |
| ------------------------ | -------------------------- | ----------- | ------------------ | ----------- |
| `filterDuplicates`       | `filter-duplicates`        |             | `boolean`          | `false`     |
| `layerView`              | --                         |             | `FeatureLayerView` | `undefined` |
| `removeDuplicateEnabled` | `remove-duplicate-enabled` |             | `boolean`          | `false`     |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-select
- calcite-label
- calcite-switch
- calcite-option

### Graph
```mermaid
graph TD;
  pdf-download --> calcite-select
  pdf-download --> calcite-label
  pdf-download --> calcite-switch
  pdf-download --> calcite-option
  calcite-select --> calcite-icon
  public-notification --> pdf-download
  style pdf-download fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
