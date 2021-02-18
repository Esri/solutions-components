# solution-item-details



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type  | Default                                                                                                                                                                                                    |
| -------------- | -------------- | ----------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translations` | `translations` |             | `any` | `{     "editThumbnail": "Edit Thumbnail",     "description": "Description",     "tags": "Tags",     "credits": "Credits",     "termsOfUse": "Terms of Use",     "snippetCountPattern": "{{n}} of 250"   }` |
| `value`        | `value`        |             | `any` | `{}`                                                                                                                                                                                                       |


## Dependencies

### Used by

 - [solution-item](../solution-item)

### Depends on

- calcite-input
- calcite-label

### Graph
```mermaid
graph TD;
  solution-item-details --> calcite-input
  solution-item-details --> calcite-label
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  solution-item --> solution-item-details
  style solution-item-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
