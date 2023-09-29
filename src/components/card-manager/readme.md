# card-manager



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                     | Description                                                                                                                 | Type           | Default     |
| ------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------- |
| `layer`                   | --                            | esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html | `FeatureLayer` | `undefined` |
| `mapView`                 | --                            | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                   | `MapView`      | `undefined` |
| `zoomAndScrollToSelected` | `zoom-and-scroll-to-selected` | boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table          | `boolean`      | `undefined` |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-shell
- [info-card](../info-card)
- calcite-notice

### Graph
```mermaid
graph TD;
  card-manager --> calcite-shell
  card-manager --> info-card
  card-manager --> calcite-notice
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> calcite-tooltip
  info-card --> edit-card
  info-card --> calcite-alert
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  edit-card --> calcite-notice
  edit-card --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
  crowdsource-manager --> card-manager
  style card-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
