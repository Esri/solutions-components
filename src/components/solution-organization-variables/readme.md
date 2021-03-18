# solution-organization-variables



<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute      | Description                                   | Type                          | Default     |
| --------------------------- | -------------- | --------------------------------------------- | ----------------------------- | ----------- |
| `translations` _(required)_ | `translations` | Contains the translations for this component. | `any`                         | `undefined` |
| `value`                     | --             | Contains the public value for this component. | `IOrganizationVariableItem[]` | `[]`        |


## Events

| Event                          | Description | Type               |
| ------------------------------ | ----------- | ------------------ |
| `organizationVariableSelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [solution-template-data](../solution-template-data)

### Depends on

- calcite-label
- calcite-tree-item

### Graph
```mermaid
graph TD;
  solution-organization-variables --> calcite-label
  solution-organization-variables --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  solution-template-data --> solution-organization-variables
  style solution-organization-variables fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
