# refine-selection-tools



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description | Type                                                                                        | Default     |
| ---------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------- | ----------- |
| `active`         | `active`           |             | `boolean`                                                                                   | `false`     |
| `graphics`       | --                 |             | `Graphic[]`                                                                                 | `undefined` |
| `ids`            | --                 |             | `number[]`                                                                                  | `[]`        |
| `layerView`      | --                 |             | `FeatureLayerView`                                                                          | `undefined` |
| `layerViews`     | --                 |             | `FeatureLayerView[]`                                                                        | `[]`        |
| `mapView`        | --                 |             | `MapView`                                                                                   | `undefined` |
| `mode`           | `mode`             |             | `ERefineMode.ADD \| ERefineMode.REMOVE`                                                     | `undefined` |
| `selectEnbaled`  | `select-enbaled`   |             | `boolean`                                                                                   | `false`     |
| `selectionMode`  | `selection-mode`   |             | `ESelectionMode.LINE \| ESelectionMode.POINT \| ESelectionMode.POLY \| ESelectionMode.RECT` | `undefined` |
| `translations`   | `translations`     |             | `any`                                                                                       | `{}`        |
| `useLayerPicker` | `use-layer-picker` |             | `boolean`                                                                                   | `true`      |


## Events

| Event                   | Description | Type               |
| ----------------------- | ----------- | ------------------ |
| `refineSelectionChange` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [map-select-tools](../map-select-tools)
 - [public-notification-two](../public-notification-two)

### Depends on

- [map-layer-picker](../map-layer-picker)
- calcite-action

### Graph
```mermaid
graph TD;
  refine-selection-tools --> map-layer-picker
  refine-selection-tools --> calcite-action
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
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  map-select-tools --> refine-selection-tools
  public-notification-two --> refine-selection-tools
  style refine-selection-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
