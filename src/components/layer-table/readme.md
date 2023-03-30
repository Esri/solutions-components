# layer-table



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                            | Type      | Default     |
| --------- | --------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `mapView` | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |


## Dependencies

### Used by

 - [crowdsource-manager](../crowdsource-manager)

### Depends on

- calcite-panel
- [edit-record-modal](../edit-record-modal)
- [map-layer-picker](../map-layer-picker)
- calcite-button
- calcite-split-button
- calcite-dropdown-group
- calcite-dropdown-item

### Graph
```mermaid
graph TD;
  layer-table --> calcite-panel
  layer-table --> edit-record-modal
  layer-table --> map-layer-picker
  layer-table --> calcite-button
  layer-table --> calcite-split-button
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
  edit-record-modal --> calcite-label
  edit-record-modal --> calcite-button
  edit-record-modal --> calcite-input
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-split-button --> calcite-button
  calcite-split-button --> calcite-dropdown
  calcite-dropdown-item --> calcite-icon
  crowdsource-manager --> layer-table
  style layer-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
