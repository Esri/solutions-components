# layer-table



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                            | Type      | Default     |
| --------- | --------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `mapView` | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |


## Events

| Event                    | Description                                | Type                    |
| ------------------------ | ------------------------------------------ | ----------------------- |
| `featureSelectionChange` | Emitted on demand when a layer is selected | `CustomEvent<number[]>` |


## Methods

### `getSelectedGraphics() => Promise<__esri.Graphic[]>`

Get the selected graphics

#### Returns

Type: `Promise<Graphic[]>`

Promise that resolves when the operation is complete


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-shell
- calcite-panel
- calcite-loader
- calcite-alert
- calcite-link
- calcite-action-bar
- [map-layer-picker](../map-layer-picker)
- calcite-action
- calcite-tooltip
- calcite-button
- calcite-dropdown
- calcite-dropdown-group
- calcite-dropdown-item

### Graph
```mermaid
graph TD;
  layer-table --> calcite-shell
  layer-table --> calcite-panel
  layer-table --> calcite-loader
  layer-table --> calcite-alert
  layer-table --> calcite-link
  layer-table --> calcite-action-bar
  layer-table --> map-layer-picker
  layer-table --> calcite-action
  layer-table --> calcite-tooltip
  layer-table --> calcite-button
  layer-table --> calcite-dropdown
  layer-table --> calcite-dropdown-group
  layer-table --> calcite-dropdown-item
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
  calcite-alert --> calcite-icon
  calcite-alert --> calcite-chip
  calcite-chip --> calcite-icon
  calcite-link --> calcite-icon
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
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
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-dropdown-item --> calcite-icon
  crowdsource-manager --> layer-table
  style layer-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
