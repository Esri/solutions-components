# delete-dialog



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                 | Type           | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------- |
| `ids`    | --        | number[]: The ids that would be deleted                                                                                     | `any[]`        | `[]`        |
| `layer`  | --        | esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html | `FeatureLayer` | `undefined` |
| `open`   | `open`    |                                                                                                                             | `boolean`      | `false`     |


## Events

| Event           | Description                                       | Type                                         |
| --------------- | ------------------------------------------------- | -------------------------------------------- |
| `editsComplete` | Emitted on demand when features have been deleted | `CustomEvent<"add" \| "delete" \| "update">` |


## Dependencies

### Depends on

- calcite-modal
- calcite-button

### Graph
```mermaid
graph TD;
  delete-dialog --> calcite-modal
  delete-dialog --> calcite-button
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style delete-dialog fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
