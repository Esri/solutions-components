# public-notification-two



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute | Description                                                                                            | Type      | Default     |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `mapView`         | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |
| `selectionLayers` | --        |                                                                                                        | `Layer[]` | `undefined` |


## Dependencies

### Depends on

- calcite-shell
- calcite-shell-panel
- calcite-action-bar
- calcite-action-group
- calcite-action
- calcite-list
- calcite-list-item

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
  style public-notification-two fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
