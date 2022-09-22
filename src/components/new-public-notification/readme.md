# new-public-notification



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute | Description                                                                                                                               | Type               | Default     |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `addresseeLayer`  | --        | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView` | `undefined` |
| `mapView`         | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                    | `MapView`          | `undefined` |
| `selectionLayers` | --        | esri/layers/Layer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html                                   | `Layer[]`          | `undefined` |


## Dependencies

### Depends on

- calcite-shell
- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-tooltip
- calcite-panel
- calcite-label
- calcite-input-message
- calcite-notice
- calcite-button
- [map-layer-picker](../map-layer-picker)
- calcite-input

### Graph
```mermaid
graph TD;
  new-public-notification --> calcite-shell
  new-public-notification --> calcite-action-bar
  new-public-notification --> calcite-action-group
  new-public-notification --> calcite-action
  new-public-notification --> calcite-tooltip
  new-public-notification --> calcite-panel
  new-public-notification --> calcite-label
  new-public-notification --> calcite-input-message
  new-public-notification --> calcite-notice
  new-public-notification --> calcite-button
  new-public-notification --> map-layer-picker
  new-public-notification --> calcite-input
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-scrim --> calcite-loader
  calcite-input-message --> calcite-icon
  calcite-notice --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  map-layer-picker --> calcite-label
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  style new-public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
