# card-manager



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                                                               | Type                 | Default     |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `commentsCardValues` | `comments-card-values` | any: Still need to understand what this one will look like                                                                                | `any`                | `undefined` |
| `layerView`          | --                     | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView`   | `undefined` |
| `mapView`            | --                     | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                 | `MapView`            | `undefined` |
| `mediaCardValues`    | --                     | IMediaCardValues[]: Array of objects that contain the name, description, and image to display                                             | `IMediaCardValues[]` | `[]`        |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-shell
- calcite-segmented-control
- calcite-segmented-control-item
- [info-card](../info-card)
- [media-card](../media-card)
- [comment-card](../comment-card)
- [add-record-modal](../add-record-modal)

### Graph
```mermaid
graph TD;
  card-manager --> calcite-shell
  card-manager --> calcite-segmented-control
  card-manager --> calcite-segmented-control-item
  card-manager --> info-card
  card-manager --> media-card
  card-manager --> comment-card
  card-manager --> add-record-modal
  calcite-segmented-control-item --> calcite-icon
  info-card --> calcite-shell
  info-card --> calcite-loader
  media-card --> calcite-loader
  media-card --> calcite-button
  media-card --> calcite-shell
  media-card --> calcite-label
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  comment-card --> calcite-loader
  comment-card --> calcite-shell
  comment-card --> calcite-button
  add-record-modal --> calcite-modal
  add-record-modal --> calcite-label
  add-record-modal --> calcite-input
  add-record-modal --> calcite-button
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  crowdsource-manager --> card-manager
  style card-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
