# public-notification



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute | Description                                                                                                                               | Type               | Default     |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `addresseeLayer`  | --        | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView` | `undefined` |
| `mapView`         | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                    | `MapView`          | `undefined` |
| `message`         | `message` | string: Default message to show when we have no selection sets                                                                            | `string`           | `""`        |
| `selectionLayers` | --        | esri/layers/Layer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html                                   | `Layer[]`          | `undefined` |


## Dependencies

### Depends on

- calcite-shell
- calcite-shell-panel
- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-input-message
- calcite-label
- [map-layer-picker](../map-layer-picker)
- calcite-list
- calcite-list-item
- [map-select-tools](../map-select-tools)
- calcite-radio-group
- calcite-radio-group-item
- [refine-selection-tools](../refine-selection-tools)
- [pdf-download](../pdf-download)

### Graph
```mermaid
graph TD;
  public-notification --> calcite-shell
  public-notification --> calcite-shell-panel
  public-notification --> calcite-action-bar
  public-notification --> calcite-action-group
  public-notification --> calcite-action
  public-notification --> calcite-input-message
  public-notification --> calcite-label
  public-notification --> map-layer-picker
  public-notification --> calcite-list
  public-notification --> calcite-list-item
  public-notification --> map-select-tools
  public-notification --> calcite-radio-group
  public-notification --> calcite-radio-group-item
  public-notification --> refine-selection-tools
  public-notification --> pdf-download
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-input-message --> calcite-icon
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  map-select-tools --> calcite-radio-group
  map-select-tools --> calcite-radio-group-item
  map-select-tools --> map-draw-tools
  map-select-tools --> refine-selection-tools
  map-select-tools --> calcite-label
  map-select-tools --> buffer-tools
  calcite-radio-group-item --> calcite-icon
  refine-selection-tools --> calcite-label
  refine-selection-tools --> map-layer-picker
  refine-selection-tools --> calcite-action
  buffer-tools --> calcite-input
  buffer-tools --> calcite-select
  buffer-tools --> calcite-option
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  pdf-download --> calcite-select
  pdf-download --> calcite-option
  style public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
