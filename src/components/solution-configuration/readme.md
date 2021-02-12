# solution-configuration



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description | Type  | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------- | -------------- | ----------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `translations` | `translations` |             | `any` | `{     "definitionTab": "Definition", // for tab to edit definition of an item or group     "spatialReferenceTab": "Spatial Reference", // for tab to edit the spatial reference of an item      // Information about an item     "item": {       "itemDetailsTab": "Item Details",       "dataTab": "Data",       "propertiesTab": "Properties",       "groupDetailsTab": "Group Details",       "sharingTab": "Sharing",        // Item details       "item_details": {         "editThumbnail": "Edit Thumbnail",         "description": "Description",         "tags": "Tags",         "credits": "Credits",         "termsOfUse": "Terms of Use",         "snippetCountPattern": "{{n}} of 250"       },        "json_editing": {         "startEditing": "Start editing", // start modifying JSON in its editor         "search": "Search" // search within JSON editor       }     },      "spatialRef": {       "specifyParam": "Spatial Reference Parameter",       "defaultSpatialRef": "Default Spatial Reference",       "featureServicesHeading": "Feature Services"     }   }` |
| `value`        | `value`        |             | `any` | `{}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |


## Dependencies

### Depends on

- calcite-tabs
- calcite-tab-nav
- calcite-tab-title
- calcite-tab
- [solution-inventory](../solution-inventory)
- [solution-item](../solution-item)
- [solution-spatial-ref](../solution-spatial-ref)

### Graph
```mermaid
graph TD;
  solution-configuration --> calcite-tabs
  solution-configuration --> calcite-tab-nav
  solution-configuration --> calcite-tab-title
  solution-configuration --> calcite-tab
  solution-configuration --> solution-inventory
  solution-configuration --> solution-item
  solution-configuration --> solution-spatial-ref
  calcite-tab-title --> calcite-icon
  solution-inventory --> calcite-tree
  solution-inventory --> calcite-tree-item
  calcite-tree-item --> calcite-icon
  solution-item --> calcite-tabs
  solution-item --> calcite-tab-nav
  solution-item --> calcite-tab-title
  solution-item --> calcite-tab
  solution-spatial-ref --> calcite-switch
  solution-spatial-ref --> calcite-label
  solution-spatial-ref --> calcite-input
  calcite-input --> calcite-progress
  calcite-input --> calcite-icon
  style solution-configuration fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
