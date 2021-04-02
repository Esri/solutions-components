# json-editor



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute      | Description                                   | Type     | Default     |
| ------------------------- | -------------- | --------------------------------------------- | -------- | ----------- |
| `instanceId` _(required)_ | `instance-id`  | Contains the public id for this component.    | `string` | `undefined` |
| `translations`            | `translations` | Contains the translations for this component. | `any`    | `{}`        |
| `value`                   | `value`        | Contains the public value for this component. | `any`    | `undefined` |


## Events

| Event             | Description | Type               |
| ----------------- | ----------- | ------------------ |
| `jsonEditorSaved` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [solution-template-data](../solution-template-data)

### Depends on

- calcite-button
- calcite-icon

### Graph
```mermaid
graph TD;
  json-editor --> calcite-button
  json-editor --> calcite-icon
  calcite-button --> calcite-loader
  calcite-button --> calcite-icon
  solution-template-data --> json-editor
  style json-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
