# buffer-tools



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                              | Type                                                                                     | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ----------- |
| `distance`     | `distance`      | number: The distance used for buffer                                                                                     | `number`                                                                                 | `0`         |
| `geometries`   | --              | esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html        | `Geometry[]`                                                                             | `undefined` |
| `unionResults` | `union-results` | boolean: option to control if buffer results should be unioned                                                           | `boolean`                                                                                | `true`      |
| `unit`         | `unit`          | LinearUnits: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#LinearUnits | `"feet" \| "kilometers" \| "meters" \| "miles" \| "nautical-miles" \| "yards" \| number` | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `bufferComplete` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [map-select-tools](../map-select-tools)
 - [new-public-notification](../new-public-notification)

### Depends on

- calcite-input
- calcite-select
- calcite-option

### Graph
```mermaid
graph TD;
  buffer-tools --> calcite-input
  buffer-tools --> calcite-select
  buffer-tools --> calcite-option
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-select --> calcite-icon
  map-select-tools --> buffer-tools
  new-public-notification --> buffer-tools
  style buffer-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
