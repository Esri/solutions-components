# map-tools



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                            | Type                         | Default      |
| --------- | --------- | ------------------------------------------------------------------------------------------------------ | ---------------------------- | ------------ |
| `layout`  | `layout`  |                                                                                                        | `"horizontal" \| "vertical"` | `"vertical"` |
| `mapView` | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`                    | `undefined`  |


## Events

| Event       | Description                               | Type                                                      |
| ----------- | ----------------------------------------- | --------------------------------------------------------- |
| `expandMap` | Emitted when the expand button is clicked | `CustomEvent<EExpandType.COLLAPSE \| EExpandType.EXPAND>` |


## Dependencies

### Used by

 - [map-card](../map-card)

### Depends on

- calcite-action
- calcite-action-bar
- calcite-action-group
- calcite-icon
- calcite-tooltip

### Graph
```mermaid
graph TD;
  map-tools --> calcite-action
  map-tools --> calcite-action-bar
  map-tools --> calcite-action-group
  map-tools --> calcite-icon
  map-tools --> calcite-tooltip
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  map-card --> map-tools
  style map-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
