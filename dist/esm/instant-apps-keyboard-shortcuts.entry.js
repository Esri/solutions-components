/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-164d485a.js';
import { g as getMessages } from './locale-bd9034e1.js';
import './loadModules-877bbb89.js';
import './esri-loader-1b324844.js';
import './_commonjsHelpers-0f74c230.js';
import './languageUtil-dc3111c1.js';

const instantAppsKeyboardShortcutsCss = ":host .instant-apps-keyboard-shortcuts__content{display:flex;flex-direction:column;font-family:var(--calcite-sans-family);font-size:0.875rem;background-color:var(--calcite-color-background);color:var(--calcite-color-text-1);width:auto;padding:0.5em;margin-bottom:0;overflow:auto}:host .instant-apps-keyboard-shortcuts__content table{border:none;border-collapse:collapse;width:100%;margin-bottom:1em}:host .instant-apps-keyboard-shortcuts__content table td,:host .instant-apps-keyboard-shortcuts__content table th{border:solid 1px var(--calcite-color-border-1);padding:0.5rem 0.75rem 0.5rem 0.75rem;white-space:normal}:host .instant-apps-keyboard-shortcuts__content table td:lang(ja),:host .instant-apps-keyboard-shortcuts__content table td:lang(ja-JP),:host .instant-apps-keyboard-shortcuts__content table th:lang(ja-JP),:host .instant-apps-keyboard-shortcuts__content table th:lang(ja){white-space:nowrap}:host .instant-apps-keyboard-shortcuts__content tr:nth-child(even){background-color:var(--calcite-color-foreground-2)}:host .instant-apps-keyboard-shortcuts__content tr th{padding:0.5em 0.7em;font-weight:400}";

const CSS = {
    content: 'instant-apps-keyboard-shortcuts__content',
};
const InstantAppsKeyboardShortcuts = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.messages = undefined;
        this.view = undefined;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const commands = ((_a = this === null || this === void 0 ? void 0 : this.view) === null || _a === void 0 ? void 0 : _a.type) === '2d' || !(this === null || this === void 0 ? void 0 : this.view) ? this._getMapViewCommands() : this._getSceneViewCommands();
        const modifierKey = this._isMacLike() ? 'Option' : 'Alt';
        return (h(Host, null, h("calcite-block", { open: true, class: `${CSS.content}`, heading: (_c = (_b = this === null || this === void 0 ? void 0 : this.messages) === null || _b === void 0 ? void 0 : _b.generalShortcuts) === null || _c === void 0 ? void 0 : _c.label }, h("table", null, this.renderTableHeader(), h("tr", null, h("td", null, `${modifierKey} + M`), h("td", null, (_e = (_d = this === null || this === void 0 ? void 0 : this.messages) === null || _d === void 0 ? void 0 : _d.generalShortcuts) === null || _e === void 0 ? void 0 : _e.title))), h("calcite-label", null, (_g = (_f = this === null || this === void 0 ? void 0 : this.messages) === null || _f === void 0 ? void 0 : _f.generalShortcuts) === null || _g === void 0 ? void 0 : _g.title), h("table", null, this.renderTableHeader(), commands.map(command => {
            return (h("tr", null, h("td", null, command.alias), h("td", null, command.title)));
        })))));
    }
    componentDidLoad() {
        getMessages(this);
    }
    renderTableHeader() {
        var _a, _b;
        return (this === null || this === void 0 ? void 0 : this.messages) ? (h("tr", null, h("th", null, (_a = this === null || this === void 0 ? void 0 : this.messages) === null || _a === void 0 ? void 0 : _a.generalShortcuts.shortcut), h("th", null, (_b = this === null || this === void 0 ? void 0 : this.messages) === null || _b === void 0 ? void 0 : _b.generalShortcuts.action))) : null;
    }
    _getMapViewCommands() {
        return (this === null || this === void 0 ? void 0 : this.messages)
            ? [
                {
                    alias: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.arrowKeys,
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.nudge,
                },
                {
                    alias: 'N',
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.N,
                },
                {
                    alias: 'A',
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.A,
                },
                {
                    alias: 'D',
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.D,
                },
                {
                    alias: '+',
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.plus,
                },
                {
                    alias: '-',
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.minus,
                },
            ]
            : [];
    }
    _getSceneViewCommands() {
        var _a;
        /* Arrow Keys(nudge), U and J are only
         supported in global scenes*/
        const isGlobal = ((_a = this === null || this === void 0 ? void 0 : this.view) === null || _a === void 0 ? void 0 : _a.viewingMode) === 'global' ? true : false;
        const allMessages = (this === null || this === void 0 ? void 0 : this.messages)
            ? [
                {
                    alias: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.arrowKeys,
                    title: this === null || this === void 0 ? void 0 : this.messages.mapShortcuts.nudge,
                    show: isGlobal ? true : false,
                },
                {
                    alias: 'P',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.P,
                    show: true,
                },
                {
                    alias: 'N',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.N,
                    show: true,
                },
                {
                    alias: 'W',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.W,
                    show: true,
                },
                {
                    alias: 'A',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.A,
                    show: true,
                },
                {
                    alias: 'D',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.D,
                    show: true,
                },
                {
                    alias: 'S',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.S,
                    show: true,
                },
                {
                    alias: 'J',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.globalCommands.J,
                    show: isGlobal ? true : false,
                },
                {
                    alias: 'U',
                    title: this === null || this === void 0 ? void 0 : this.messages.sceneShortcuts.globalCommands.U,
                    show: isGlobal ? true : false,
                },
            ]
            : [];
        return (this === null || this === void 0 ? void 0 : this.messages)
            ? allMessages === null || allMessages === void 0 ? void 0 : allMessages.filter(m => {
                return m.show;
            })
            : [];
    }
    /* _parseMessageValues(data) {
      return Object.keys(data).map(key => ({ alias: key, title: data[key] }));
    }*/
    _isMacLike() {
        return /(Mac)/i.test(navigator.platform);
    }
    get el() { return getElement(this); }
};
InstantAppsKeyboardShortcuts.style = instantAppsKeyboardShortcutsCss;

export { InstantAppsKeyboardShortcuts as instant_apps_keyboard_shortcuts };
