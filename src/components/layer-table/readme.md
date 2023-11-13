# layer-table



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                     | Description                                                                                                        | Type       | Default     |
| ------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ----------- |
| `defaultGlobalId`         | --                            | string: Global ID of the feature to select                                                                         | `string[]` | `undefined` |
| `defaultLayerId`          | `default-layer-id`            | string: when provided this layer ID will be used when the app loads                                                | `string`   | `undefined` |
| `defaultOid`              | --                            | number: when provided this will be used to select a feature in the table by default                                | `number[]` | `undefined` |
| `enableAutoRefresh`       | `enable-auto-refresh`         | boolean: when true the layer table will auto refresh the data                                                      | `boolean`  | `undefined` |
| `enableCSV`               | `enable-c-s-v`                | boolean: when true the export to csv button will be available                                                      | `boolean`  | `undefined` |
| `enableInlineEdit`        | `enable-inline-edit`          | boolean: when true edits can be applied directly within the table                                                  | `boolean`  | `undefined` |
| `enableZoom`              | `enable-zoom`                 | boolean: when true the zoom button will be enabled                                                                 | `boolean`  | `undefined` |
| `mapInfo`                 | --                            | IMapInfo: key configuration details about the current map                                                          | `IMapInfo` | `undefined` |
| `mapView`                 | --                            | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html             | `MapView`  | `undefined` |
| `onlyShowUpdatableLayers` | `only-show-updatable-layers`  | boolean: When true only editable layers that support the update capability will be available                       | `boolean`  | `undefined` |
| `showNewestFirst`         | `show-newest-first`           | boolean: when true the table will be sorted by objectid in descending order by default                             | `boolean`  | `undefined` |
| `zoomAndScrollToSelected` | `zoom-and-scroll-to-selected` | boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table | `boolean`  | `undefined` |


## Events

| Event                    | Description                                          | Type                    |
| ------------------------ | ---------------------------------------------------- | ----------------------- |
| `featureSelectionChange` | Emitted on demand when a layer is selected           | `CustomEvent<number[]>` |
| `openFilterOptions`      | Emitted on demand when the filters button is clicked | `CustomEvent<void>`     |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-shell
- calcite-panel
- calcite-loader
- calcite-action-bar
- [map-layer-picker](../map-layer-picker)
- calcite-dropdown
- calcite-dropdown-group
- calcite-dropdown-item
- calcite-action
- calcite-button
- calcite-tooltip
- calcite-modal

### Graph
```mermaid
graph TD;
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
  layer-table --> calcite-tooltip
  layer-table --> calcite-modal
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
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
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
  calcite-notice --> calcite-icon
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-dropdown-item --> calcite-icon
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  crowdsource-manager --> layer-table
  style layer-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
