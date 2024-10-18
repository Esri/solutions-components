/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { y as nodeListToArray } from './dom-75c641a7.js';
import { i as isBrowser } from './browser-b67d8df6.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const ComboboxItem = "CALCITE-COMBOBOX-ITEM";
const ComboboxItemGroup = "CALCITE-COMBOBOX-ITEM-GROUP";
const ComboboxChildSelector = `${ComboboxItem}, ${ComboboxItemGroup}`;
const CSS = {
    input: "input",
    chipInvisible: "chip--invisible",
    selectionDisplayFit: "selection-display-fit",
    selectionDisplaySingle: "selection-display-single",
    listContainer: "list-container",
    icon: "icon",
    placeholderIcon: "placeholder-icon",
    selectedIcon: "selected-icon",
};
const IDS = {
    validationMessage: "comboboxValidationMessage",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
function getAncestors(element) {
    const parent = element.parentElement?.closest(ComboboxChildSelector);
    const grandparent = parent?.parentElement?.closest(ComboboxChildSelector);
    return [parent, grandparent].filter((el) => el);
}
function getItemAncestors(item) {
    return (item.ancestors?.filter((el) => el.nodeName === "CALCITE-COMBOBOX-ITEM") || []);
}
function getItemChildren(item) {
    return nodeListToArray(item.querySelectorAll("calcite-combobox-item"));
}
function hasActiveChildren(node) {
    const items = nodeListToArray(node.querySelectorAll("calcite-combobox-item"));
    return items.filter((item) => item.selected).length > 0;
}
function getDepth(element) {
    if (!isBrowser()) {
        return 0;
    }
    const result = document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group", element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return result.snapshotLength;
}
function isSingleLike(selectionMode) {
    return selectionMode.includes("single");
}
function getLabel(item) {
    return item.shortHeading || item.textLabel;
}

export { CSS as C, IDS as I, getDepth as a, ComboboxChildSelector as b, getLabel as c, getItemAncestors as d, getItemChildren as e, ComboboxItem as f, getAncestors as g, hasActiveChildren as h, isSingleLike as i, ComboboxItemGroup as j };
