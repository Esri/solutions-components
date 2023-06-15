# map-card



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                                                                                            | Type         | Default     |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------ | ------------ | ----------- |
| `mapInfos` | --        | IMapInfo[]: array of map infos (name and id)                                                           | `IMapInfo[]` | `[]`        |
| `mapView`  | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`    | `undefined` |


## Events

| Event        | Description                               | Type                                                      |
| ------------ | ----------------------------------------- | --------------------------------------------------------- |
| `expandMap`  | Emitted when the expand button is clicked | `CustomEvent<EExpandType.COLLAPSE \| EExpandType.EXPAND>` |
| `mapChanged` | Emitted when a new map is loaded          | `CustomEvent<MapView>`                                    |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-icon
- calcite-tooltip
- calcite-block
- calcite-list
- calcite-list-item

### Graph
```mermaid
graph TD;
  map-card --> calcite-action-bar
  map-card --> calcite-action-group
  map-card --> calcite-action
  map-card --> calcite-icon
  map-card --> calcite-tooltip
  map-card --> calcite-block
  map-card --> calcite-list
  map-card --> calcite-list-item
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
  calcite-list --> calcite-scrim
  calcite-list --> calcite-filter
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-list-item --> calcite-icon
  calcite-list-item --> calcite-action
  crowdsource-manager --> map-card
  style map-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
