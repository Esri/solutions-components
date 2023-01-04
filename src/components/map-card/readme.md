# map-card



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute    | Description                                                                                            | Type      | Default     |
| ---------- | ------------ | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `mapView`  | --           | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |
| `webMapId` | `web-map-id` | string:                                                                                                | `string`  | `""`        |


## Dependencies

### Depends on

- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-icon
- calcite-tooltip
- calcite-block

### Graph
```mermaid
graph TD;
  map-card --> calcite-action-bar
  map-card --> calcite-action-group
  map-card --> calcite-action
  map-card --> calcite-icon
  map-card --> calcite-tooltip
  map-card --> calcite-block
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-block --> calcite-scrim
  calcite-block --> calcite-icon
  calcite-block --> calcite-handle
  calcite-block --> calcite-loader
  calcite-block --> calcite-action-menu
  calcite-scrim --> calcite-loader
  calcite-handle --> calcite-icon
  style map-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
