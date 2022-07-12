# map-select-tools



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                 | Type                                                                   | Default                |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| `mapView`      | --              | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html      | `MapView`                                                              | `undefined`            |
| `searchLayers` | --              |                                                                                                             | `Layer[]`                                                              | `undefined`            |
| `searchWidget` | --              | esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html | `widgetsSearch`                                                        | `undefined`            |
| `selectLayer`  | --              |                                                                                                             | `FeatureLayer`                                                         | `undefined`            |
| `translations` | `translations`  |                                                                                                             | `any`                                                                  | `{}`                   |
| `workflowType` | `workflow-type` |                                                                                                             | `EWorkflowType.SEARCH \| EWorkflowType.SELECT \| EWorkflowType.SKETCH` | `EWorkflowType.SEARCH` |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `searchDistanceChange` |             | `CustomEvent<any>` |
| `searchGraphicsChange` |             | `CustomEvent<any>` |
| `selectionSetChange`   |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [public-notification](../public-notification)
 - [public-notification-two](../public-notification-two)

### Depends on

- calcite-radio-group
- calcite-radio-group-item
- [map-draw-tools](../map-draw-tools)
- [map-layer-picker](../map-layer-picker)
- [refine-selection-tools](../refine-selection-tools)
- calcite-label
- calcite-input
- calcite-select
- calcite-option

### Graph
```mermaid
graph TD;
  map-select-tools --> calcite-radio-group
  map-select-tools --> calcite-radio-group-item
  map-select-tools --> map-draw-tools
  map-select-tools --> map-layer-picker
  map-select-tools --> refine-selection-tools
  map-select-tools --> calcite-label
  map-select-tools --> calcite-input
  map-select-tools --> calcite-select
  map-select-tools --> calcite-option
  calcite-radio-group-item --> calcite-icon
  map-layer-picker --> calcite-label
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  refine-selection-tools --> calcite-action
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  public-notification --> map-select-tools
  public-notification-two --> map-select-tools
  style map-select-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
