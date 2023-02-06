# refine-selection-tools



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute          | Description                                                                                                                               | Type                                          | Default     |
| -------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `active`             | `active`           | boolean: sketch is used by multiple components...need a way to know who should respond...                                                 | `boolean`                                     | `false`     |
| `border`             | `border`           | boolean: Optionally draw a border around the draw tools                                                                                   | `boolean`                                     | `false`     |
| `enabledLayerIds`    | --                 | string[]: Optional list of enabled layer ids  If empty all layers will be available                                                       | `string[]`                                    | `[]`        |
| `graphics`           | --                 | esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html                                             | `Graphic[]`                                   | `undefined` |
| `ids`                | --                 | number: The oids of the selected features                                                                                                 | `number[]`                                    | `[]`        |
| `layerView`          | --                 | esri/views/layers/LayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html               | `FeatureLayerView`                            | `undefined` |
| `layerViews`         | --                 | esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html | `FeatureLayerView[]`                          | `[]`        |
| `mapView`            | --                 | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html                                    | `MapView`                                     | `undefined` |
| `mode`               | `mode`             | utils/interfaces/ESelectionMode: ADD, REMOVE                                                                                              | `ESelectionMode.ADD \| ESelectionMode.REMOVE` | `undefined` |
| `refineMode`         | `refine-mode`      | utils/interfaces/ERefineMode: ALL, SUBSET                                                                                                 | `ERefineMode.ALL \| ERefineMode.SUBSET`       | `undefined` |
| `refineSelectionSet` | --                 | utils/interfaces/ISelectionSet: Refine selection set                                                                                      | `ISelectionSet`                               | `undefined` |
| `useLayerPicker`     | `use-layer-picker` | boolean: Used to control the visibility of the layer picker                                                                               | `boolean`                                     | `true`      |


## Events

| Event                           | Description                                       | Type                                                |
| ------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| `refineSelectionGraphicsChange` | Emitted on demand when selection graphics change. | `CustomEvent<any[]>`                                |
| `refineSelectionIdsChange`      | Emitted on demand when selection ids change       | `CustomEvent<{ addIds: any[]; removeIds: any[]; }>` |


## Methods

### `clearHighlight() => Promise<void>`

Clear current highlight handle

#### Returns

Type: `Promise<void>`

Promise when complete

### `reset() => Promise<void>`

Reset the ids collection

#### Returns

Type: `Promise<void>`

Promise when complete


## Dependencies

### Used by

 - [map-select-tools](../map-select-tools)
 - [refine-selection](../refine-selection)

### Depends on

- [map-layer-picker](../map-layer-picker)
- calcite-action

### Graph
```mermaid
graph TD;
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
  map-select-tools --> refine-selection-tools
  refine-selection --> refine-selection-tools
  style refine-selection-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
