# solution-item-sharing



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                                                                        | Type           | Default     |
| --------- | ---------- | ---------------------------------------------------------------------------------- | -------------- | ----------- |
| `groupId` | `group-id` | Contains the public id for the group these items will be shared or un-shared with. | `string`       | `undefined` |
| `value`   | --         | Contains the public value for this component.                                      | `IItemShare[]` | `[]`        |


## Methods

### `getShareInfo() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Used by

 - [solution-item](../solution-item)

### Depends on

- calcite-label
- calcite-switch
- [solution-item-icon](../solution-item-icon)

### Graph
```mermaid
graph TD;
  solution-item-sharing --> calcite-label
  solution-item-sharing --> calcite-switch
  solution-item-sharing --> solution-item-icon
  solution-item --> solution-item-sharing
  style solution-item-sharing fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
