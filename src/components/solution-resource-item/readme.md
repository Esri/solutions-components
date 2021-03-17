# solution-resource-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                   | Type            | Default                                                |
| -------------- | -------------- | --------------------------------------------- | --------------- | ------------------------------------------------------ |
| `translations` | `translations` | Contains the translations for this component. | `any`           | `{     update: "Update",     download: "Download"   }` |
| `value`        | --             | Contains the public value for this component. | `IResourceItem` | `{     name: "",     url: ""   }`                      |


## Dependencies

### Used by

 - [solution-template-data](../solution-template-data)

### Depends on

- calcite-label
- calcite-button

### Graph
```mermaid
graph TD;
  solution-resource-item --> calcite-label
  solution-resource-item --> calcite-button
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  solution-template-data --> solution-resource-item
  style solution-resource-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
