# public-notification



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute      | Description                                                                                            | Type      | Default     |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `mapView`         | --             | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |
| `selectionLayers` | --             |                                                                                                        | `Layer[]` | `undefined` |
| `translations`    | `translations` | Contains the translations for this component.                                                          | `any`     | `{}`        |


## Dependencies

### Depends on

- [map-search](../map-search)
- [map-layer-picker](../map-layer-picker)
- [pdf-download](../pdf-download)
- [config-public-notification](../config-public-notification)

### Graph
```mermaid
graph TD;
  public-notification --> map-search
  public-notification --> map-layer-picker
  public-notification --> pdf-download
  public-notification --> config-public-notification
  map-search --> calcite-radio-group
  map-search --> calcite-radio-group-item
  map-search --> map-draw-tools
  map-search --> calcite-label
  map-search --> calcite-input
  map-search --> calcite-combobox
  map-search --> calcite-combobox-item
  calcite-radio-group-item --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  map-layer-picker --> calcite-label
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  pdf-download --> calcite-label
  pdf-download --> calcite-combobox
  pdf-download --> calcite-button
  pdf-download --> calcite-combobox-item
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  config-public-notification --> calcite-modal
  config-public-notification --> config-map-search
  config-public-notification --> calcite-button
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  config-map-search --> calcite-input-message
  config-map-search --> calcite-tabs
  config-map-search --> calcite-tab-nav
  config-map-search --> calcite-tab-title
  config-map-search --> calcite-tab
  config-map-search --> calcite-radio-button-group
  config-map-search --> calcite-label
  config-map-search --> calcite-radio-button
  config-map-search --> calcite-input
  config-map-search --> calcite-pick-list
  config-map-search --> calcite-pick-list-item
  calcite-input-message --> calcite-icon
  calcite-tab-title --> calcite-icon
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  style public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
