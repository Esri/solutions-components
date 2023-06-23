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
- [edit-record-modal](../edit-record-modal)
- [map-layer-picker](../map-layer-picker)
- calcite-action-bar
- calcite-action
- calcite-dropdown
- calcite-button
- calcite-dropdown-group
- calcite-dropdown-item

### Graph
```mermaid
graph TD;
  layer-table --> calcite-shell
  layer-table --> calcite-panel
  layer-table --> calcite-loader
  layer-table --> edit-record-modal
  layer-table --> map-layer-picker
  layer-table --> calcite-action-bar
  layer-table --> calcite-action
  layer-table --> calcite-dropdown
  layer-table --> calcite-button
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
  edit-record-modal --> calcite-modal
  edit-record-modal --> calcite-button
  edit-record-modal --> calcite-label
  edit-record-modal --> calcite-input-text
  edit-record-modal --> calcite-input-number
  edit-record-modal --> calcite-input-date-picker
  edit-record-modal --> calcite-combobox
  edit-record-modal --> calcite-combobox-item
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-input-text --> calcite-progress
  calcite-input-text --> calcite-icon
  calcite-input-number --> calcite-progress
  calcite-input-number --> calcite-icon
  calcite-input-date-picker --> calcite-input
  calcite-input-date-picker --> calcite-date-picker
  calcite-input-date-picker --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-date-picker --> calcite-date-picker-month-header
  calcite-date-picker --> calcite-date-picker-month
  calcite-date-picker-month-header --> calcite-icon
  calcite-date-picker-month --> calcite-date-picker-day
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-dropdown
  map-layer-picker --> calcite-button
  map-layer-picker --> calcite-dropdown-group
  map-layer-picker --> calcite-dropdown-item
  map-layer-picker --> calcite-option
  map-layer-picker --> calcite-combobox-item
  calcite-select --> calcite-icon
  calcite-dropdown-item --> calcite-icon
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  crowdsource-manager --> layer-table
  style layer-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
