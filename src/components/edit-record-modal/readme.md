# edit-record-modal



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                               | Type        | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------- | ----------- | ----------- |
| `graphicIndex` | `graphic-index` | The index of the current graphic                                                                          | `number`    | `0`         |
| `graphics`     | --              | esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html           | `Graphic[]` | `undefined` |
| `mapView`      | --              | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`   | `undefined` |
| `open`         | `open`          | When true the component is displayed                                                                      | `boolean`   | `false`     |


## Events

| Event         | Description                                | Type                |
| ------------- | ------------------------------------------ | ------------------- |
| `modalClosed` | Emitted on demand when the modal is closed | `CustomEvent<void>` |
| `modalOpened` | Emitted on demand when the modal is opened | `CustomEvent<void>` |


## Dependencies

### Used by

 - [info-card](../info-card)

### Depends on

- calcite-modal
- calcite-notice

### Graph
```mermaid
graph TD;
  edit-record-modal --> calcite-modal
  edit-record-modal --> calcite-notice
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-notice --> calcite-icon
  info-card --> edit-record-modal
  style edit-record-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
