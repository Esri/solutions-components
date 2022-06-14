# config-public-notification



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                   | Type      | Default |
| -------------- | -------------- | --------------------------------------------- | --------- | ------- |
| `isOpen`       | `is-open`      |                                               | `boolean` | `false` |
| `translations` | `translations` | Contains the translations for this component. | `any`     | `{}`    |


## Dependencies

### Used by

 - [public-notification](../public-notification)

### Depends on

- calcite-modal
- calcite-button

### Graph
```mermaid
graph TD;
  config-public-notification --> calcite-modal
  config-public-notification --> calcite-button
  calcite-modal --> calcite-scrim
  calcite-modal --> calcite-icon
  calcite-scrim --> calcite-loader
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  public-notification --> config-public-notification
  style config-public-notification fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
