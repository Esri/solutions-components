# store-manager



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute | Description                        | Type          | Default     |
| ---------------- | --------- | ---------------------------------- | ------------- | ----------- |
| `authentication` | --        | Credentials for requests           | `UserSession` | `undefined` |
| `templates`      | --        | Templates for the current solution | `any[]`       | `[]`        |
| `value`          | `value`   | Contains source json as a string   | `string`      | `""`        |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `stateLoaded` |             | `CustomEvent<any>` |


## Methods

### `getStoreInfo(propName: string) => Promise<any>`

Returns the store info for the supplied property name.

#### Parameters

| Name       | Type     | Description                    |
| ---------- | -------- | ------------------------------ |
| `propName` | `string` | Name of the property to return |

#### Returns

Type: `Promise<any>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
