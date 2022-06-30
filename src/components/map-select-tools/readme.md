# map-select-tools



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                 | Type                                                                 | Default     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------- |
| `mapView`      | --              | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html      | `MapView`                                                            | `undefined` |
| `searchLayers` | --              |                                                                                                             | `Layer[]`                                                            | `undefined` |
| `searchWidget` | --              | esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html | `widgetsSearch`                                                      | `undefined` |
| `translations` | `translations`  | Contains the translations for this component.                                                               | `any`                                                                | `{}`        |
| `workflowType` | `workflow-type` |                                                                                                             | `EWorkflowType.DRAW \| EWorkflowType.SEARCH \| EWorkflowType.SELECT` | `undefined` |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `searchDistanceChange` |             | `CustomEvent<any>` |
| `searchGraphicsChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [public-notification](../public-notification)
 - [public-notification-two](../public-notification-two)

### Depends on

- calcite-radio-group
- calcite-radio-group-item
- [map-draw-tools](../map-draw-tools)
- calcite-label
- calcite-input
- calcite-combobox
- calcite-combobox-item

### Graph
```mermaid
graph TD;
  map-select-tools --> calcite-radio-group
  map-select-tools --> calcite-radio-group-item
  map-select-tools --> map-draw-tools
  map-select-tools --> calcite-label
  map-select-tools --> calcite-input
  map-select-tools --> calcite-combobox
  map-select-tools --> calcite-combobox-item
  calcite-radio-group-item --> calcite-icon
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  public-notification --> map-select-tools
  public-notification-two --> map-select-tools
  style map-select-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
