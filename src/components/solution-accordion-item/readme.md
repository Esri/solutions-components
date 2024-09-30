# solution-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                                                                                  | Type          | Default     |
| ------------- | --------------- | -------------------------------------------------------------------------------------------- | ------------- | ----------- |
| `description` | `description`   | Specifies a description for the component.                                                   | `string`      | `undefined` |
| `expanded`    | `expanded`      | When `true`, the component is expanded.                                                      | `boolean`     | `false`     |
| `heading`     | `heading`       | Specifies heading text for the component.                                                    | `string`      | `undefined` |
| `iconEnd`     | `icon-end`      | Specifies an icon to display at the end of the component.                                    | `string`      | `undefined` |
| `iconFlipRtl` | `icon-flip-rtl` | When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). | `FlipContext` | `undefined` |
| `iconStart`   | `icon-start`    | Specifies an icon to display at the start of the component.                                  | `string`      | `undefined` |


## Slots

| Slot | Description                                                                   |
| ---- | ----------------------------------------------------------------------------- |
|      | A slot for adding custom content, including nested `calcite-accordion-item`s. |


## Dependencies

### Depends on

- calcite-icon

### Graph
```mermaid
graph TD;
  solution-accordion-item --> calcite-icon
  style solution-accordion-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
