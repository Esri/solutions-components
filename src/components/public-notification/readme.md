# public-notification



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                               | Type      | Default     |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `mapView`      | --             | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html    | `MapView` | `undefined` |
| `portal`       | --             | esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html | `Portal`  | `undefined` |
| `translations` | `translations` | Contains the translations for this component.                                                             | `any`     | `{}`        |


## Dependencies

### Depends on

- [map-search](../map-search)
- [map-draw-tools](../map-draw-tools)
- [map-layer-picker](../map-layer-picker)
- [pdf-download](../pdf-download)

### Graph
```mermaid
graph TD;
  public-notification --> map-search
  public-notification --> map-draw-tools
  public-notification --> map-layer-picker
  public-notification --> pdf-download
  pdf-download --> calcite-combobox
  pdf-download --> calcite-button
  pdf-download --> calcite-combobox-item
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-combobox-item --> calcite-icon
  style public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
