# public-notification-two



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                            | Type                                                     | Default          |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | ---------------- |
| `downloadEnabled` | `download-enabled` |                                                                                                        | `boolean`                                                | `false`          |
| `mapView`         | --                 | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`                                                | `undefined`      |
| `message`         | `message`          |                                                                                                        | `string`                                                 | `""`             |
| `pageType`        | `page-type`        |                                                                                                        | `EPageType.LIST \| EPageType.REFINE \| EPageType.SELECT` | `EPageType.LIST` |
| `selectionLayers` | --                 |                                                                                                        | `Layer[]`                                                | `undefined`      |


## Dependencies

### Depends on

- calcite-shell
- calcite-shell-panel
- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-input-message
- [map-layer-picker](../map-layer-picker)
- calcite-list
- calcite-list-item
- [map-search](../map-search)

### Graph
```mermaid
graph TD;
  public-notification-two --> calcite-shell
  public-notification-two --> calcite-shell-panel
  public-notification-two --> calcite-action-bar
  public-notification-two --> calcite-action-group
  public-notification-two --> calcite-action
  public-notification-two --> calcite-input-message
  public-notification-two --> map-layer-picker
  public-notification-two --> calcite-list
  public-notification-two --> calcite-list-item
  public-notification-two --> map-search
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
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
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
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  style public-notification-two fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
