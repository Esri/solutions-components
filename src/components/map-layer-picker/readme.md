# map-layer-picker



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                                                            | Type                  | Default     |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `label`          | `label`          |                                                                                                        | `string`              | `""`        |
| `layerNames`     | --               |                                                                                                        | `string[]`            | `[]`        |
| `mapView`        | --               | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView`             | `undefined` |
| `selectedLayers` | --               |                                                                                                        | `string[]`            | `[]`        |
| `selectionMode`  | `selection-mode` |                                                                                                        | `"multi" \| "single"` | `"single"`  |
| `translations`   | `translations`   | Contains the translations for this component.                                                          | `any`                 | `{}`        |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `layerSelectionChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [map-select-tools](../map-select-tools)
 - [public-notification](../public-notification)
 - [public-notification-two](../public-notification-two)

### Depends on

- calcite-label
- calcite-select
- calcite-combobox
- calcite-combobox-item
- calcite-option

### Graph
```mermaid
graph TD;
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
  map-select-tools --> map-layer-picker
  public-notification --> map-layer-picker
  public-notification-two --> map-layer-picker
  style map-layer-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
