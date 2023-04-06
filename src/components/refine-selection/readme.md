# refine-selection



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                                               | Type               | Default     |
| ----------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `GraphicsLayer`   | `graphics-layer`    |                                                                                                                                           | `any`              | `undefined` |
| `SketchViewModel` | `sketch-view-model` |                                                                                                                                           | `any`              | `undefined` |
| `addresseeLayer`  | --                  | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView` | `undefined` |
| `enabledLayerIds` | --                  | string[]: Optional list of enabled layer ids  If empty all layers will be available                                                       | `string[]`         | `[]`        |
| `mapView`         | --                  | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                    | `MapView`          | `undefined` |
| `selectionSets`   | --                  | utils/interfaces/ISelectionSet: An array of user defined selection sets                                                                   | `ISelectionSet[]`  | `[]`        |


## Events

| Event                  | Description                                   | Type                           |
| ---------------------- | --------------------------------------------- | ------------------------------ |
| `selectionSetsChanged` | Emitted on demand when selection sets change. | `CustomEvent<ISelectionSet[]>` |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- [refine-selection-tools](../refine-selection-tools)
- calcite-list
- calcite-list-item

### Graph
```mermaid
graph TD;
  refine-selection --> refine-selection-tools
  refine-selection --> calcite-list
  refine-selection --> calcite-list-item
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
  calcite-list --> calcite-scrim
  calcite-list --> calcite-filter
  calcite-scrim --> calcite-loader
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-list-item --> calcite-icon
  public-notification --> refine-selection
  style refine-selection fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
