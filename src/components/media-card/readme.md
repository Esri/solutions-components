# media-card



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                   | Type                 | Default |
| ----------- | ------------ | --------------------------------------------------------------------------------------------- | -------------------- | ------- |
| `isLoading` | `is-loading` | boolean: when true a loading indicator will be shown                                          | `boolean`            | `false` |
| `values`    | --           | IMediaCardValues[]: Array of objects that contain the name, description, and image to display | `IMediaCardValues[]` | `[]`    |


## Dependencies

### Used by

 - [card-manager](../card-manager)

### Depends on

- calcite-loader
- calcite-button
- calcite-shell
- calcite-label
- calcite-tooltip

### Graph
```mermaid
graph TD;
  media-card --> calcite-loader
  media-card --> calcite-button
  media-card --> calcite-shell
  media-card --> calcite-label
  media-card --> calcite-tooltip
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  card-manager --> media-card
  style media-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
