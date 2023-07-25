# card-manager



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute | Description                                                                                                                               | Type                 | Default     |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----------- |
| `layerView`       | --        | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView`   | `undefined` |
| `mapView`         | --        | esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                 | `MapView`            | `undefined` |
| `mediaCardValues` | --        | IMediaCardValues[]: Array of objects that contain the name, description, and image to display                                             | `IMediaCardValues[]` | `[]`        |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-shell
- calcite-segmented-control
- calcite-segmented-control-item
- calcite-tooltip
- [info-card](../info-card)
- [media-card](../media-card)
- [comment-card](../comment-card)
- calcite-notice
- [add-record-modal](../add-record-modal)

### Graph
```mermaid
graph TD;
  card-manager --> calcite-shell
  card-manager --> calcite-segmented-control
  card-manager --> calcite-segmented-control-item
  card-manager --> calcite-tooltip
  card-manager --> info-card
  card-manager --> media-card
  card-manager --> comment-card
  card-manager --> calcite-notice
  card-manager --> add-record-modal
  calcite-segmented-control-item --> calcite-icon
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> calcite-tooltip
  info-card --> edit-record-modal
  info-card --> calcite-alert
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  edit-record-modal --> calcite-modal
  edit-record-modal --> calcite-notice
  edit-record-modal --> calcite-label
  edit-record-modal --> calcite-input-text
  edit-record-modal --> calcite-input-number
  edit-record-modal --> calcite-input-date-picker
  edit-record-modal --> calcite-combobox
  edit-record-modal --> calcite-combobox-item
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-input-text --> calcite-progress
  calcite-input-text --> calcite-icon
  calcite-input-number --> calcite-progress
  calcite-input-number --> calcite-icon
  calcite-input-date-picker --> calcite-input
  calcite-input-date-picker --> calcite-date-picker
  calcite-input-date-picker --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-date-picker --> calcite-date-picker-month-header
  calcite-date-picker --> calcite-date-picker-month
  calcite-date-picker-month-header --> calcite-icon
  calcite-date-picker-month --> calcite-date-picker-day
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  media-card --> calcite-loader
  media-card --> calcite-button
  media-card --> calcite-shell
  media-card --> calcite-label
  media-card --> calcite-tooltip
  comment-card --> calcite-loader
  comment-card --> calcite-shell
  comment-card --> calcite-button
  comment-card --> calcite-tooltip
  add-record-modal --> calcite-modal
  add-record-modal --> calcite-label
  add-record-modal --> calcite-input
  add-record-modal --> calcite-button
  crowdsource-manager --> card-manager
  style card-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
