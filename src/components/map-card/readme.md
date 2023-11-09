# map-card



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                            | Type                | Default     |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ | ------------------- | ----------- |
| `basemapConfig`     | --                    | IBasemapConfig: List of any basemaps to filter out from the basemap widget                             | `IBasemapConfig`    | `undefined` |
| `enableBasemap`     | `enable-basemap`      | boolean: when true the basemap widget will be available                                                | `boolean`           | `undefined` |
| `enableFloorFilter` | `enable-floor-filter` | boolean: when true the floor filter widget will be available                                           | `boolean`           | `undefined` |
| `enableFullscreen`  | `enable-fullscreen`   | boolean: when true the fullscreen widget will be available                                             | `boolean`           | `undefined` |
| `enableHome`        | `enable-home`         | boolean: when true the home widget will be available                                                   | `boolean`           | `undefined` |
| `enableLegend`      | `enable-legend`       | boolean: when true the legend widget will be available                                                 | `boolean`           | `undefined` |
| `enableSearch`      | `enable-search`       | boolean: when true the search widget will be available                                                 | `boolean`           | `undefined` |
| `hidden`            | `hidden`              | boolean: When true the map display will be hidden                                                      | `boolean`           | `undefined` |
| `mapInfos`          | --                    | IMapInfo[]: array of map infos (name and id)                                                           | `IMapInfo[]`        | `[]`        |
| `mapView`           | --                    | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`           | `undefined` |
| `theme`             | `theme`               | theme: "light" \| "dark" theme to be used                                                              | `"dark" \| "light"` | `undefined` |


## Events

| Event              | Description                        | Type                      |
| ------------------ | ---------------------------------- | ------------------------- |
| `beforeMapChanged` | Emitted before a new map is loaded | `CustomEvent<void>`       |
| `mapChanged`       | Emitted when a new map is loaded   | `CustomEvent<IMapChange>` |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- [map-picker](../map-picker)
- [map-tools](../map-tools)

### Graph
```mermaid
graph TD;
  map-card --> map-picker
  map-card --> map-tools
  map-picker --> calcite-button
  map-picker --> calcite-tooltip
  map-picker --> calcite-action-bar
  map-picker --> calcite-list
  map-picker --> calcite-list-item
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-list --> calcite-scrim
  calcite-list --> calcite-stack
  calcite-list --> calcite-filter
  calcite-scrim --> calcite-loader
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-list-item --> calcite-icon
  calcite-list-item --> calcite-handle
  calcite-list-item --> calcite-action
  calcite-handle --> calcite-icon
  map-tools --> basemap-gallery
  map-tools --> map-search
  map-tools --> map-legend
  map-tools --> map-fullscreen
  map-tools --> floor-filter
  map-tools --> calcite-action
  map-tools --> calcite-icon
  map-tools --> calcite-tooltip
  crowdsource-manager --> map-card
  style map-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
