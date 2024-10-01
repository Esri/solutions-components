# solution-item-accordion



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description                                   | Type              | Default |
| --------------- | --------- | --------------------------------------------- | ----------------- | ------- |
| `templateInfos` | --        | ITemplateInfo[]: Collection of template infos | `ITemplateInfo[]` | `[]`    |


## Dependencies

### Depends on

- calcite-accordion
- calcite-accordion-item
- calcite-list
- calcite-list-item
- [solution-item-icon](../solution-item-icon)

### Graph
```mermaid
graph TD;
  solution-item-accordion --> calcite-accordion
  solution-item-accordion --> calcite-accordion-item
  solution-item-accordion --> calcite-list
  solution-item-accordion --> calcite-list-item
  solution-item-accordion --> solution-item-icon
  calcite-accordion-item --> calcite-icon
  calcite-list --> calcite-scrim
  calcite-list --> calcite-stack
  calcite-list --> calcite-filter
  calcite-scrim --> calcite-loader
  calcite-filter --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-list-item --> calcite-icon
  calcite-list-item --> calcite-handle
  calcite-list-item --> calcite-action
  calcite-handle --> calcite-icon
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
  style solution-item-accordion fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
