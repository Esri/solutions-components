/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2023 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Host, h } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
import { ELayoutMode } from "../../utils/interfaces";
export class LayoutManager {
    constructor() {
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Controls the layout of the application
     */
    _layoutMode = ELayoutMode.GRID;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted when the layout should change
     */
    layoutChanged;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: 'b21325b44c55b4169b7c14ee8a72d4fb329049c0' }, h("div", { key: '9aa53161553d8daecde88138017758885747d357', class: "display-flex" }, h("div", { key: '4efeebd0ee5b9d288ae37a2f3697049eb71c5d4c', class: "display-flex action-center" }, h("calcite-icon", { key: 'aa2a89bc8b1974c56997478c7a1c4080e2f0e5e1', class: "icon icon-color", icon: "information", id: "app-information-icon", scale: "s" }), h("calcite-popover", { key: '920120df5f5036770308422dafe6c76201af303b', closable: true, label: "", referenceElement: "app-information-icon" }, h("span", { key: 'ed38dc29dd382563b9c38fd171f7380965b88fef', class: "tooltip-message" }, this._translations.appInfo))), h("div", { key: '5d09996c91decfea662e159625ab4c8dd06154ba', class: "header-text" }, this._translations.layout), this._getAction("grid-background", ELayoutMode.GRID, this._translations.grid), this._getAction("vertical-background", ELayoutMode.VERTICAL, this._translations.vertical), this._getAction("horizontal-background", ELayoutMode.HORIZONTAL, this._translations.horizontal))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Store and emit the current layout mode
     *
     * @param imgClass string the css class to use
     * @param layoutMode ELayoutMode the associated layout mode for the current action
     * @param tip string the value to display as the tooltip for the action
     *
     * @protected
     */
    _getAction(imgClass, layoutMode, tip) {
        return (h("div", null, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, id: imgClass, indicator: layoutMode === this._layoutMode, onClick: () => { this._setLayoutMode(layoutMode); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": imgClass }, h("span", null, tip))));
    }
    /**
     * Store and emit the current layout mode
     *
     * @param layoutMode ELayoutMode the current layout mode
     *
     * @protected
     */
    _setLayoutMode(layoutMode) {
        this._layoutMode = layoutMode;
        this.layoutChanged.emit(this._layoutMode);
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "layout-manager"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["layout-manager.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["layout-manager.css"]
        };
    }
    static get states() {
        return {
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "layoutChanged",
                "name": "layoutChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the layout should change"
                },
                "complexType": {
                    "original": "ELayoutMode",
                    "resolved": "ELayoutMode.GRID | ELayoutMode.HORIZONTAL | ELayoutMode.VERTICAL",
                    "references": {
                        "ELayoutMode": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ELayoutMode"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
}
