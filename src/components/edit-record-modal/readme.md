# edit-record-modal



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                               | Type      | Default     |
| --------- | --------- | --------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `graphic` | --        | esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html             | `Graphic` | `undefined` |
| `mapView` | --        | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |
| `open`    | `open`    | When true the component is displayed                                                                      | `boolean` | `false`     |


## Events

| Event         | Description                                   | Type                |
| ------------- | --------------------------------------------- | ------------------- |
| `modalClosed` | Emitted on demand when a buffer is generated. | `CustomEvent<void>` |
| `modalOpened` | Emitted on demand when a buffer is generated. | `CustomEvent<void>` |


## Dependencies

### Used by

 - [info-card](../info-card)
 - [layer-table](../layer-table)

### Depends on

- calcite-modal
- calcite-button
- calcite-label
- calcite-input

### Graph
```mermaid
graph TD;
  edit-record-modal --> calcite-modal
  edit-record-modal --> calcite-button
  edit-record-modal --> calcite-label
  edit-record-modal --> calcite-input
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  info-card --> edit-record-modal
  layer-table --> edit-record-modal
  style edit-record-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
