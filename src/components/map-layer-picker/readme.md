# map-layer-picker



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                                                                           | Type                  | Default     |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `label`          | `label`          | string: The label to render above the combobox.                                                                       | `string`              | `""`        |
| `layerNames`     | --               | string[]: list of layer names from the map                                                                            | `string[]`            | `[]`        |
| `mapView`        | --               | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                | `MapView`             | `undefined` |
| `selectedLayers` | --               | string[]: list of layers that have been selected by the end user                                                      | `string[]`            | `[]`        |
| `selectionMode`  | `selection-mode` | SelectionMode: "single" \| "multi"  Should the component support selection against a single layer or multiple layers. | `"multi" \| "single"` | `"single"`  |
| `translations`   | `translations`   | Contains the translations for this component. All UI strings should be defined here.                                  | `any`                 | `{}`        |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `layerSelectionChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [public-notification](../public-notification)
 - [refine-selection-tools](../refine-selection-tools)

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
  public-notification --> map-layer-picker
  refine-selection-tools --> map-layer-picker
  style map-layer-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
