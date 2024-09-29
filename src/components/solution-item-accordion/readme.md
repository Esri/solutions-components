# solution-item-accordion



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                  | Type     | Default     |
| ------------ | ------------- | -------------------------------------------- | -------- | ----------- |
| `solitionId` | `solition-id` | string: The id for the current solution item | `string` | `undefined` |


## Dependencies

### Depends on

- calcite-accordion
- calcite-accordion-item
- calcite-notice
- [solution-item-icon](../solution-item-icon)
- calcite-list

### Graph
```mermaid
graph TD;
  solution-item-accordion --> calcite-accordion
  solution-item-accordion --> calcite-accordion-item
  solution-item-accordion --> calcite-notice
  solution-item-accordion --> solution-item-icon
  solution-item-accordion --> calcite-list
  calcite-accordion-item --> calcite-icon
  calcite-notice --> calcite-icon
  calcite-list --> calcite-scrim
  calcite-list --> calcite-stack
  calcite-list --> calcite-filter
  calcite-scrim --> calcite-loader
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  style solution-item-accordion fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
