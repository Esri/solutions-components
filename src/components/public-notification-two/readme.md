# public-notification-two



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                            | Type      | Default     |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `downloadEnabled`     | `download-enabled`      |                                                                                                        | `boolean` | `false`     |
| `hasSelectedFeatures` | `has-selected-features` |                                                                                                        | `boolean` | `false`     |
| `mapView`             | --                      | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |
| `renderPage`          | `render-page`           |                                                                                                        | `boolean` | `false`     |
| `selectionActive`     | `selection-active`      |                                                                                                        | `boolean` | `false`     |
| `selectionLayers`     | --                      |                                                                                                        | `Layer[]` | `undefined` |


## Dependencies

### Depends on

- calcite-shell
- calcite-shell-panel
- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-list
- calcite-list-item
- calcite-input-message
- [map-layer-picker](../map-layer-picker)
- [map-search](../map-search)
- calcite-accordion
- calcite-accordion-item
- calcite-value-list
- calcite-value-list-item

### Graph
```mermaid
graph TD;
  public-notification-two --> calcite-shell
  public-notification-two --> calcite-shell-panel
  public-notification-two --> calcite-action-bar
  public-notification-two --> calcite-action-group
  public-notification-two --> calcite-action
  public-notification-two --> calcite-list
  public-notification-two --> calcite-list-item
  public-notification-two --> calcite-input-message
  public-notification-two --> map-layer-picker
  public-notification-two --> map-search
  public-notification-two --> calcite-accordion
  public-notification-two --> calcite-accordion-item
  public-notification-two --> calcite-value-list
  public-notification-two --> calcite-value-list-item
  calcite-action-bar --> calcite-action-group
  calcite-action-group --> calcite-action-menu
  calcite-action-group --> calcite-action
  calcite-action-menu --> calcite-action
  calcite-action-menu --> calcite-tooltip-manager
  calcite-action-menu --> calcite-popover
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-popover --> calcite-action
  calcite-popover --> calcite-icon
  calcite-input-message --> calcite-icon
  map-layer-picker --> calcite-label
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  map-search --> calcite-radio-group
  map-search --> calcite-radio-group-item
  map-search --> map-draw-tools
  map-search --> calcite-label
  map-search --> calcite-input
  map-search --> calcite-combobox
  map-search --> calcite-combobox-item
  calcite-radio-group-item --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-accordion-item --> calcite-icon
  calcite-value-list-item --> calcite-icon
  calcite-value-list-item --> calcite-pick-list-item
  calcite-pick-list-item --> calcite-icon
  calcite-pick-list-item --> calcite-action
  style public-notification-two fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
