# crowdsource-manager



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                     | Description                                                                                                        | Type                   | Default     |
| ------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------- |
| `basemapConfig`           | --                            | IBasemapConfig: List of any basemaps to filter out from the basemap widget                                         | `IBasemapConfig`       | `undefined` |
| `classicGrid`             | `classic-grid`                | boolean: when true the grid will display like the previous manager app with the table across the top               | `boolean`              | `false`     |
| `defaultCenter`           | `default-center`              | string: default center point values for the map ; delimited x;y pair                                               | `string`               | `""`        |
| `defaultGlobalId`         | `default-global-id`           | string: Global ID of the feature to select                                                                         | `string`               | `""`        |
| `defaultLayer`            | `default-layer`               | string: when provided this layer ID will be used when the app loads                                                | `string`               | `""`        |
| `defaultLevel`            | `default-level`               | string: default zoom level                                                                                         | `string`               | `""`        |
| `defaultOid`              | `default-oid`                 | string: Object ID of feature to select                                                                             | `string`               | `""`        |
| `defaultWebmap`           | `default-webmap`              | string: Item ID of the web map that should be selected by default                                                  | `string`               | `""`        |
| `enableAutoRefresh`       | `enable-auto-refresh`         | boolean: when true the layer table will auto refresh the data                                                      | `boolean`              | `false`     |
| `enableBasemap`           | `enable-basemap`              | boolean: when true the basemap widget will be available                                                            | `boolean`              | `true`      |
| `enableCSV`               | `enable-c-s-v`                | boolean: when true the export to csv button will be available                                                      | `boolean`              | `true`      |
| `enableColumnReorder`     | `enable-column-reorder`       | boolean: when true the layer table will support drag/drop of columns to adjust order                               | `boolean`              | `true`      |
| `enableFloorFilter`       | `enable-floor-filter`         | boolean: when true the fullscreen widget will be available                                                         | `boolean`              | `true`      |
| `enableFullscreen`        | `enable-fullscreen`           | boolean: when true the fullscreen widget will be available                                                         | `boolean`              | `true`      |
| `enableHome`              | `enable-home`                 | boolean: when true the home widget will be available                                                               | `boolean`              | `true`      |
| `enableInlineEdit`        | `enable-inline-edit`          | boolean: when true edits can be applied directly within the table                                                  | `boolean`              | `false`     |
| `enableLegend`            | `enable-legend`               | boolean: when true the legend widget will be available                                                             | `boolean`              | `true`      |
| `enableSearch`            | `enable-search`               | boolean: when true the search widget will be available                                                             | `boolean`              | `true`      |
| `enableShare`             | `enable-share`                | boolean: when true the share widget will be available                                                              | `boolean`              | `false`     |
| `enableZoom`              | `enable-zoom`                 | boolean: when true the zoom widget will be available                                                               | `boolean`              | `true`      |
| `hideMap`                 | `hide-map`                    | boolean: when true no map is displayed for the app                                                                 | `boolean`              | `false`     |
| `mapInfos`                | --                            | IMapInfo[]: array of map infos (name and id)                                                                       | `IMapInfo[]`           | `[]`        |
| `onlyShowUpdatableLayers` | `only-show-updatable-layers`  | boolean: When true only editable layers that support the update capability will be available                       | `boolean`              | `true`      |
| `searchConfiguration`     | --                            | ISearchConfiguration: Configuration details for the Search widget                                                  | `ISearchConfiguration` | `undefined` |
| `showNewestFirst`         | `show-newest-first`           | boolean: when true the table will be sorted by objectid in descending order by default                             | `boolean`              | `true`      |
| `theme`                   | `theme`                       | theme: "light" \| "dark" theme to be used                                                                          | `"dark" \| "light"`    | `"light"`   |
| `zoomAndScrollToSelected` | `zoom-and-scroll-to-selected` | boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table | `boolean`              | `false`     |


## Dependencies

### Depends on

- calcite-shell
- calcite-panel
- [map-card](../map-card)
- calcite-icon
- calcite-action
- calcite-tooltip
- [card-manager](../card-manager)
- calcite-action-bar
- [layer-table](../layer-table)

### Graph
```mermaid
graph TD;
  crowdsource-manager --> calcite-shell
  crowdsource-manager --> calcite-panel
  crowdsource-manager --> map-card
  crowdsource-manager --> calcite-icon
  crowdsource-manager --> calcite-action
  crowdsource-manager --> calcite-tooltip
  crowdsource-manager --> card-manager
  crowdsource-manager --> calcite-action-bar
  crowdsource-manager --> layer-table
  calcite-panel --> calcite-action
  calcite-panel --> calcite-action-menu
  calcite-panel --> calcite-scrim
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-popover
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-scrim --> calcite-loader
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
  calcite-list --> calcite-scrim
  calcite-list --> calcite-stack
  calcite-list --> calcite-filter
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
  card-manager --> calcite-shell
  card-manager --> info-card
  card-manager --> calcite-notice
  info-card --> calcite-shell
  info-card --> calcite-loader
  info-card --> calcite-button
  info-card --> calcite-tooltip
  info-card --> calcite-action
  info-card --> edit-card
  info-card --> calcite-alert
  edit-card --> calcite-notice
  edit-card --> calcite-loader
  calcite-notice --> calcite-icon
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
  layer-table --> calcite-shell
  layer-table --> calcite-panel
  layer-table --> calcite-loader
  layer-table --> calcite-action-bar
  layer-table --> map-layer-picker
  layer-table --> calcite-dropdown
  layer-table --> calcite-dropdown-group
  layer-table --> calcite-dropdown-item
  layer-table --> calcite-action
  layer-table --> calcite-button
  layer-table --> instant-apps-social-share
  layer-table --> calcite-tooltip
  layer-table --> calcite-modal
  map-layer-picker --> calcite-tooltip
  map-layer-picker --> calcite-notice
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-dropdown
  map-layer-picker --> calcite-action
  map-layer-picker --> calcite-button
  map-layer-picker --> calcite-dropdown-group
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  map-layer-picker --> calcite-dropdown-item
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-dropdown-item --> calcite-icon
  instant-apps-social-share --> calcite-popover
  instant-apps-social-share --> calcite-button
  instant-apps-social-share --> calcite-icon
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  style crowdsource-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
