# solution-spatial-ref



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                         | Type                             | Default                       |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------- |
| `defaultWkid`   | `default-wkid`   | The wkid that will be used as the default when no user selection has been made.                                                     | `number`                         | `3857`                        |
| `enableDefault` | `enable-default` | When true, all but the main switch are disabled to prevent interaction.                                                             | `boolean`                        | `false`                       |
| `enabled`       | `enabled`        | When true, all but the main switch are disabled to prevent interaction.                                                             | `boolean`                        | `false`                       |
| `loaded`        | `loaded`         | Indicates if the control has been enabled. The first time Spatial Reference has been enabled it should enable all feature services. | `boolean`                        | `false`                       |
| `services`      | --               | List of services the spatial reference should apply to                                                                              | `IFeatureServiceEnabledStatus[]` | `[]`                          |
| `value`         | `value`          | Contains the public value for this component, which is a wkid or a wkt.                                                             | `string`                         | `this.defaultWkid.toString()` |


## Events

| Event                                  | Description | Type                                        |
| -------------------------------------- | ----------- | ------------------------------------------- |
| `enableDefaultSpatialReferenceChange`  |             | `CustomEvent<{ enableDefault: boolean; }>`  |
| `enabledSpatialReferenceChange`        |             | `CustomEvent<{ enabled: boolean; }>`        |
| `featureServiceSpatialReferenceChange` |             | `CustomEvent<IFeatureServiceEnabledStatus>` |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-switch

### Graph
```mermaid
graph TD;
  solution-spatial-ref --> calcite-switch
  solution-configuration --> solution-spatial-ref
  style solution-spatial-ref fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
