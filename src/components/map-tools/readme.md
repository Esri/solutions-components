# map-tools



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description                                                                                            | Type                         | Default      |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------ | ---------------------------- | ------------ |
| `layout`              | `layout`  | "horizontal" \| "vertical": used to control the orientation of the tools                               | `"horizontal" \| "vertical"` | `"vertical"` |
| `mapView`             | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`                    | `undefined`  |
| `searchConfiguration` | --        | ISearchConfiguration: Configuration details for the Search widget                                      | `ISearchConfiguration`       | `undefined`  |


## Dependencies

### Used by

 - [map-card](../map-card)

### Depends on

- [basemap-gallery](../basemap-gallery)
- [map-search](../map-search)
- [map-legend](../map-legend)
- [map-fullscreen](../map-fullscreen)
- calcite-action
- calcite-icon
- calcite-tooltip

### Graph
```mermaid
graph TD;
  map-tools --> basemap-gallery
  map-tools --> map-search
  map-tools --> map-legend
  map-tools --> map-fullscreen
  map-tools --> calcite-action
  map-tools --> calcite-icon
  map-tools --> calcite-tooltip
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  map-card --> map-tools
  style map-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
