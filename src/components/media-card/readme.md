# media-card



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                   | Type                 | Default |
| -------- | --------- | --------------------------------------------------------------------------------------------- | -------------------- | ------- |
| `values` | --        | IMediaCardValues[]: Array of objects that contain the name, description, and image to display | `IMediaCardValues[]` | `[]`    |


## Dependencies

### Depends on

- calcite-label
- calcite-button

### Graph
```mermaid
graph TD;
  media-card --> calcite-label
  media-card --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style media-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
