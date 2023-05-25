# pci-calculator



<!-- Auto Generated Below -->


## Events

| Event                 | Description                                                          | Type                  |
| --------------------- | -------------------------------------------------------------------- | --------------------- |
| `deductValueComplete` | Emitted on demand when the user clicks to calculate the deduct value | `CustomEvent<string>` |


## Dependencies

### Used by

 - [pci-calculator](../pci-calculator)

### Depends on

- calcite-label
- calcite-input
- calcite-select
- calcite-option
- calcite-button

### Graph
```mermaid
graph TD;
  deduct-calculator --> calcite-label
  deduct-calculator --> calcite-input
  deduct-calculator --> calcite-select
  deduct-calculator --> calcite-option
  deduct-calculator --> calcite-button
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  calcite-select --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  pci-calculator --> deduct-calculator
  style deduct-calculator fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
