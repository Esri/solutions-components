# config-layer-picker



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                            | Type      | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `defaultChecked` | `default-checked` | boolean: All checkboxes checked state will be set with this value on first render. Default is true     | `boolean` | `true`      |
| `instruction`    | `instruction`     | string: Value to be shown above the check list Allows this to support multiple sets of layers.         | `string`  | `""`        |
| `mapView`        | --                | esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html | `MapView` | `undefined` |


## Methods

### `getConfigInfo() => Promise<{ [key: string]: boolean; }>`

Returns a key/value pair that represents the checkbox value and checked state

#### Returns

Type: `Promise<{ [key: string]: boolean; }>`

Promise with the state of the checkboxes


## Dependencies

### Depends on

- calcite-label
- [check-list](../check-list)

### Graph
```mermaid
graph TD;
  config-layer-picker --> calcite-label
  config-layer-picker --> check-list
  check-list --> calcite-label
  check-list --> calcite-checkbox
  style config-layer-picker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
