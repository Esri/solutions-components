/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { f as forceUpdate, h } from './p-4e6eb06e.js';
import { g as getElementDir } from './p-621ad249.js';
import { S as SLOTS$1 } from './p-54e5a55d.js';
import { S as SLOTS } from './p-3cfc1e2e.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const groupBufferPx = 2;
const getAverage = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
const geActionDimensions = (actions) => {
    const actionsNotSlotted = actions.filter((action) => action.slot !== SLOTS$1.menuActions);
    const actionLen = actionsNotSlotted?.length;
    return {
        actionWidth: actionLen ? getAverage(actionsNotSlotted.map((action) => action.clientWidth || 0)) : 0,
        actionHeight: actionLen ? getAverage(actionsNotSlotted.map((action) => action.clientHeight || 0)) : 0,
    };
};
const getMaxActionCount = ({ width, actionWidth, layout, height, actionHeight, groupCount, }) => {
    const maxContainerPx = layout === "horizontal" ? width : height;
    const avgItemPx = layout === "horizontal" ? actionWidth : actionHeight;
    return Math.floor((maxContainerPx - groupCount * groupBufferPx) / avgItemPx);
};
const getOverflowCount = ({ layout, actionCount, actionWidth, width, actionHeight, height, groupCount, }) => {
    return Math.max(actionCount - getMaxActionCount({ width, actionWidth, layout, height, actionHeight, groupCount }), 0);
};
const queryActions = (el) => {
    return Array.from(el.querySelectorAll("calcite-action")).filter((action) => action.closest("calcite-action-menu") ? action.slot === SLOTS.trigger : true);
};
const overflowActions = ({ actionGroups, expanded, overflowCount, }) => {
    let needToSlotCount = overflowCount;
    actionGroups.reverse().forEach((group) => {
        let slottedWithinGroupCount = 0;
        const groupActions = queryActions(group).reverse();
        groupActions.forEach((groupAction) => {
            if (groupAction.slot === SLOTS$1.menuActions) {
                groupAction.removeAttribute("slot");
                groupAction.textEnabled = expanded;
            }
        });
        if (needToSlotCount > 0) {
            groupActions.some((groupAction) => {
                const unslottedActions = groupActions.filter((action) => !action.slot);
                if (unslottedActions.length > 1 && groupActions.length > 2 && !groupAction.closest("calcite-action-menu")) {
                    groupAction.textEnabled = true;
                    groupAction.setAttribute("slot", SLOTS$1.menuActions);
                    slottedWithinGroupCount++;
                    if (slottedWithinGroupCount > 1) {
                        needToSlotCount--;
                    }
                }
                return needToSlotCount < 1;
            });
        }
        forceUpdate(group);
    });
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const ICONS = {
    chevronsLeft: "chevrons-left",
    chevronsRight: "chevrons-right",
};
function getCalcitePosition(position, el) {
    return position || el.closest("calcite-shell-panel")?.position || "start";
}
function toggleChildActionText({ el, expanded, }) {
    queryActions(el)
        .filter((el) => el.slot !== SLOTS$1.menuActions)
        .forEach((action) => (action.textEnabled = expanded));
    el.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((el) => (el.expanded = expanded));
}
const setTooltipReference = ({ tooltip, referenceElement, expanded, ref, }) => {
    if (tooltip) {
        tooltip.referenceElement = !expanded && referenceElement ? referenceElement : null;
    }
    if (ref) {
        ref(referenceElement);
    }
    return referenceElement;
};
const ExpandToggle = ({ expanded, expandText, collapseText, expandLabel, collapseLabel, toggle, el, position, tooltip, ref, scale, }) => {
    const rtl = getElementDir(el) === "rtl";
    const text = expanded ? collapseText : expandText;
    const label = expanded ? collapseLabel : expandLabel;
    const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
    if (rtl) {
        icons.reverse();
    }
    const end = getCalcitePosition(position, el) === "end";
    const expandIcon = end ? icons[1] : icons[0];
    const collapseIcon = end ? icons[0] : icons[1];
    const actionNode = (h("calcite-action", { icon: expanded ? expandIcon : collapseIcon, id: "expand-toggle", label: label, onClick: toggle, ref: (referenceElement) => setTooltipReference({ tooltip, referenceElement, expanded, ref }), scale: scale, text: text, textEnabled: expanded, title: !expanded && !tooltip ? text : null }));
    return actionNode;
};

export { ExpandToggle as E, getOverflowCount as a, geActionDimensions as g, overflowActions as o, queryActions as q, toggleChildActionText as t };
