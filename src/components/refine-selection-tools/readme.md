# refine-selection-tools



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type                                    | Default     |
| -------------- | -------------- | ----------- | --------------------------------------- | ----------- |
| `mapView`      | --             |             | `MapView`                               | `undefined` |
| `mode`         | `mode`         |             | `ERefineMode.ADD \| ERefineMode.REMOVE` | `undefined` |
| `searchLayers` | --             |             | `Layer[]`                               | `undefined` |
| `translations` | `translations` |             | `any`                                   | `{}`        |


## Dependencies

### Used by

 - [map-select-tools](../map-select-tools)
 - [public-notification-two](../public-notification-two)

### Depends on

- calcite-action

### Graph
```mermaid
graph TD;
  refine-selection-tools --> calcite-action
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  map-select-tools --> refine-selection-tools
  public-notification-two --> refine-selection-tools
  style refine-selection-tools fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
