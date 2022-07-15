# buffer-tools



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                                     | Default     |
| -------------- | --------------- | ----------- | ---------------------------------------------------------------------------------------- | ----------- |
| `distance`     | `distance`      |             | `number`                                                                                 | `0`         |
| `geometries`   | --              |             | `Geometry[]`                                                                             | `undefined` |
| `translations` | `translations`  |             | `any`                                                                                    | `{}`        |
| `unionResults` | `union-results` |             | `boolean`                                                                                | `true`      |
| `unit`         | `unit`          |             | `"feet" \| "kilometers" \| "meters" \| "miles" \| "nautical-miles" \| "yards" \| number` | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `bufferComplete` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [map-select-tools](../map-select-tools)

### Depends on

- calcite-label
- calcite-input
- calcite-select
- calcite-option

### Graph
```mermaid
graph TD;
  buffer-tools --> calcite-label
  buffer-tools --> calcite-input
  buffer-tools --> calcite-select
  buffer-tools --> calcite-option
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-select --> calcite-icon
  map-select-tools --> buffer-tools
  style buffer-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
