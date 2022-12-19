# refine-selection



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute | Description                                                                                                                               | Type               | Default     |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `addresseeLayer` | --        | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView` | `undefined` |
| `mapView`        | --        | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                    | `MapView`          | `undefined` |
| `selectionSets`  | --        | utils/interfaces/ISelectionSet: An array of user defined selection sets                                                                   | `ISelectionSet[]`  | `[]`        |


## Events

| Event                  | Description                                   | Type                           |
| ---------------------- | --------------------------------------------- | ------------------------------ |
| `selectionSetsChanged` | Emitted on demand when selection sets change. | `CustomEvent<ISelectionSet[]>` |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-radio-group
- calcite-radio-group-item
- [refine-selection-tools](../refine-selection-tools)
- calcite-list
- calcite-list-item

### Graph
```mermaid
graph TD;
  refine-selection --> calcite-radio-group
  refine-selection --> calcite-radio-group-item
  refine-selection --> refine-selection-tools
  refine-selection --> calcite-list
  refine-selection --> calcite-list-item
  calcite-radio-group-item --> calcite-icon
  refine-selection-tools --> calcite-label
  refine-selection-tools --> map-layer-picker
  refine-selection-tools --> calcite-action
  map-layer-picker --> calcite-select
  map-layer-picker --> calcite-combobox
  map-layer-picker --> calcite-combobox-item
  map-layer-picker --> calcite-option
  calcite-select --> calcite-icon
  calcite-combobox --> calcite-chip
  calcite-combobox --> calcite-icon
  calcite-chip --> calcite-icon
  calcite-combobox-item --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  public-notification --> refine-selection
  style refine-selection fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
