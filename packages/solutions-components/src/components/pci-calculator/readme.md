# pci-calculator



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- calcite-label
- calcite-action
- [deduct-calculator](../deduct-calculator)
- calcite-input
- calcite-button

### Graph
```mermaid
graph TD;
  pci-calculator --> calcite-label
  pci-calculator --> calcite-action
  pci-calculator --> deduct-calculator
  pci-calculator --> calcite-input
  pci-calculator --> calcite-button
  calcite-action --> calcite-loader
  calcite-action --> calcite-icon
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
  style pci-calculator fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
