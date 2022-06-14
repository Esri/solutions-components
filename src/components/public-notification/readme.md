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

### Graph
```mermaid
graph TD;
  public-notification --> map-search
  public-notification --> map-layer-picker
  public-notification --> pdf-download
  map-search --> map-draw-tools
  map-search --> calcite-label
  map-search --> calcite-input
  map-search --> calcite-combobox
  map-search --> calcite-combobox-item
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  map-layer-picker --> calcite-label
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  pdf-download --> calcite-label
  pdf-download --> calcite-combobox
  pdf-download --> calcite-button
  pdf-download --> calcite-combobox-item
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  style public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
