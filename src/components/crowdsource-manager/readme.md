# crowdsource-manager



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                                  | Type         | Default |
| ---------- | --------- | -------------------------------------------- | ------------ | ------- |
| `mapInfos` | --        | IMapInfo[]: array of map infos (name and id) | `IMapInfo[]` | `[]`    |


## Dependencies

### Depends on

- calcite-panel
- calcite-action
- calcite-tooltip
- calcite-shell
- [map-card](../map-card)
- [layer-table](../layer-table)

### Graph
```mermaid
graph TD;
  crowdsource-manager --> calcite-panel
  crowdsource-manager --> calcite-action
  crowdsource-manager --> calcite-tooltip
  crowdsource-manager --> calcite-shell
  crowdsource-manager --> map-card
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
  map-card --> calcite-action-bar
  map-card --> calcite-action-group
  map-card --> calcite-action
  map-card --> calcite-icon
  map-card --> calcite-tooltip
  map-card --> calcite-block
  map-card --> calcite-pick-list
  map-card --> calcite-pick-list-item
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-block --> calcite-scrim
  calcite-block --> calcite-icon
  calcite-block --> calcite-handle
  calcite-block --> calcite-loader
  calcite-block --> calcite-action-menu
  calcite-handle --> calcite-icon
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  layer-table --> calcite-panel
  layer-table --> edit-record-modal
  layer-table --> map-layer-picker
  layer-table --> calcite-button
  layer-table --> calcite-split-button
  layer-table --> calcite-dropdown-group
  layer-table --> calcite-dropdown-item
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
  style crowdsource-manager fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
