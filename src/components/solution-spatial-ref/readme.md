# solution-spatial-ref



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                     | Type       | Default                       |
| ------------- | -------------- | ------------------------------------------------------------------------------- | ---------- | ----------------------------- |
| `defaultWkid` | `default-wkid` | The wkid that will be used as the default when no user selection has been made. | `number`   | `102100`                      |
| `locked`      | `locked`       | When true, all but the main switch are disabled to prevent interaction.         | `boolean`  | `true`                        |
| `services`    | --             | List of service names the spatial reference should apply to                     | `string[]` | `[]`                          |
| `value`       | `value`        | Contains the public value for this component, which is a wkid or a wkt.         | `string`   | `this.defaultWkid.toString()` |


## Events

| Event                                  | Description | Type                                               |
| -------------------------------------- | ----------- | -------------------------------------------------- |
| `featureServiceSpatialReferenceChange` |             | `CustomEvent<{ name: string; enabled: boolean; }>` |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-label
- calcite-switch
- [spatial-ref](../spatial-ref)

### Graph
```mermaid
graph TD;
  solution-spatial-ref --> calcite-label
  solution-spatial-ref --> calcite-switch
  solution-spatial-ref --> spatial-ref
  spatial-ref --> calcite-input
  spatial-ref --> calcite-tree
  spatial-ref --> calcite-tree-item
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-tree-item --> calcite-icon
  calcite-tree-item --> calcite-checkbox
  solution-configuration --> solution-spatial-ref
  style solution-spatial-ref fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
