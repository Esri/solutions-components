# info-card



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                               | Type      | Default     |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `graphic`   | --           | esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html             | `Graphic` | `undefined` |
| `isLoading` | `is-loading` | boolean: when true a loading indicator will be shown                                                      | `boolean` | `false`     |
| `mapView`   | --           | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |


## Dependencies

### Used by

 - [card-manager](../card-manager)

### Depends on

- calcite-shell
- calcite-loader
- calcite-button
- [edit-record-modal](../edit-record-modal)

### Graph
```mermaid
graph TD;
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> edit-record-modal
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  edit-record-modal --> calcite-modal
  edit-record-modal --> calcite-label
  edit-record-modal --> calcite-button
  edit-record-modal --> calcite-input
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  card-manager --> info-card
  style info-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
