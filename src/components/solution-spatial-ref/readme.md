# solution-spatial-ref



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type  | Default                                                                                                                                                           |
| -------------- | -------------- | ----------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translations` | `translations` |             | `any` | `{     "specifyParam": "Spatial Reference Parameter",     "defaultSpatialRef": "Default Spatial Reference",     "featureServicesHeading": "Feature Services"   }` |
| `value`        | `value`        |             | `any` | `null`                                                                                                                                                            |


## Dependencies

### Used by

 - [solution-configuration](../solution-configuration)

### Depends on

- calcite-switch
- calcite-label
- calcite-input

### Graph
```mermaid
graph TD;
  solution-spatial-ref --> calcite-switch
  solution-spatial-ref --> calcite-label
  solution-spatial-ref --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  solution-configuration --> solution-spatial-ref
  style solution-spatial-ref fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
