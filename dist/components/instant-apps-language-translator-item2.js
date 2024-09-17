/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment, Host } from '@stencil/core/internal/client';
import { d as ESettingType, i as isCalciteModeDark, e as ECalciteMode, s as store, f as EInputType, E as EIcons, l as languageTranslatorState, h as getT9nData, c as getUIDataKeys } from './utils4.js';
import { d as defineCustomElement$7 } from './action.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './input.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './popover.js';
import { d as defineCustomElement$2 } from './progress.js';
import { d as defineCustomElement$1 } from './instant-apps-ckeditor-wrapper2.js';

const instantAppsLanguageTranslatorItemCss = ".sc-instant-apps-language-translator-item-h{display:block}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item.sc-instant-apps-language-translator-item{display:flex}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item{padding:10px;border-bottom:1px solid var(--calcite-color-border-1);background-color:var(--calcite-color-foreground-2);width:49%}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item .instant-apps-language-translator-item__top-row.sc-instant-apps-language-translator-item{display:flex;align-items:center;justify-content:space-between}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item .instant-apps-language-translator-item__label-container.sc-instant-apps-language-translator-item{display:flex;align-items:center}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item .instant-apps-language-translator-item__label.sc-instant-apps-language-translator-item{display:inline-block;margin-left:10px;font-size:14px;font-weight:var(--calcite-font-weight-medium)}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item calcite-input.sc-instant-apps-language-translator-item{margin-top:10px;margin-left:55px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--last-item.sc-instant-apps-language-translator-item{border-bottom:none}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item{background-color:#f1faff}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item:first-child{margin-right:1%}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__ui-location-popover-content.sc-instant-apps-language-translator-item{display:inline-block;padding:10px;max-width:400px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__ui-location-items.sc-instant-apps-language-translator-item{display:flex}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__ui-location-item.sc-instant-apps-language-translator-item{display:flex;align-items:center;font-weight:var(--calcite-font-weight-medium);font-size:14px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__tip.sc-instant-apps-language-translator-item{display:inline-block;font-size:14px;line-height:22px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__info-icon.sc-instant-apps-language-translator-item{color:var(--calcite-color-brand)}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__info-button.sc-instant-apps-language-translator-item{border:0;background-color:transparent;cursor:pointer}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__nested-input.sc-instant-apps-language-translator-item{margin-left:60px;margin-top:8px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__nested-input.sc-instant-apps-language-translator-item calcite-input.sc-instant-apps-language-translator-item{margin-left:30px}.calcite-mode-dark.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item{background-color:#f1faff;background-color:var(--calcite-color-brand);color:var(--calcite-color-text-inverse)}.calcite-mode-dark.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item calcite-action.sc-instant-apps-language-translator-item{--calcite-ui-icon-color:var(--calcite-color-text-inverse)}.calcite-mode-dark.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item calcite-icon.sc-instant-apps-language-translator-item{color:var(--calcite-color-text-inverse)}.instant-apps-language-translator--last-item.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item{border-bottom:none}";
const InstantAppsLanguageTranslatorItemStyle0 = instantAppsLanguageTranslatorItemCss;

const BASE = 'instant-apps-language-translator-item';
const CSS = {
    section: `${BASE}__section`,
    selected: `${BASE}__section--selected`,
    collapsed: `${BASE}__section--collapsed`,
    topRow: `${BASE}__top-row`,
    labelContainer: `${BASE}__label-container`,
    label: `${BASE}__label`,
    uiLocationPopoverContent: `${BASE}__ui-location-popover-content`,
    uiLocationItems: `${BASE}__ui-location-items`,
    uiLocationItem: `${BASE}__ui-location-item`,
    infoIcon: `${BASE}__info-icon`,
    infoButton: `${BASE}__info-button`,
    tip: `${BASE}__tip`,
    nestedInput: `${BASE}__nested-input`,
};
const InstantAppsLanguageTranslatorItem = /*@__PURE__*/ proxyCustomElement(class InstantAppsLanguageTranslatorItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.translatorItemDataUpdated = createEvent(this, "translatorItemDataUpdated", 7);
        this.userInputs = {};
        this.translatedInputs = {};
        this.fieldName = undefined;
        this.translatedLanguageLabels = undefined;
        this.setting = undefined;
        this.userLocaleInputOnChangeCallback = undefined;
        this.translatedLocaleInputOnChangeCallback = undefined;
    }
    get isTextEditor() {
        return this.setting.type === ESettingType.TextEditor;
    }
    get calciteMode() {
        return isCalciteModeDark() ? ECalciteMode.Dark : ECalciteMode.Light;
    }
    get hasNestedContent() {
        var _a;
        return !!((_a = this.setting) === null || _a === void 0 ? void 0 : _a.content);
    }
    get tipID() {
        return `${this.fieldName}goTo`;
    }
    componentDidLoad() {
        if (this.isTextEditor) {
            store.onChange('uiData', () => this.handleEditorCollapse());
        }
    }
    render() {
        var _a;
        if ('content' in this.setting && ((_a = this.setting.content) === null || _a === void 0 ? void 0 : _a.every(contentItem => { var _a; return ((_a = contentItem === null || contentItem === void 0 ? void 0 : contentItem.content) === null || _a === void 0 ? void 0 : _a.length) === 0; }))) {
            return h(Fragment, null);
        }
        else {
            return (h(Host, { class: this.calciteMode }, this.renderBase(), this.renderPopover()));
        }
    }
    renderBase() {
        return (h("div", { class: BASE }, this.renderUserLocaleSection(), this.renderTranslatedLanguageSection()));
    }
    renderPopover() {
        const tip = this.getTip();
        return (h("calcite-popover", { referenceElement: this.tipID, label: "", "auto-close": "true", placement: "trailing", closable: true }, h("span", { class: CSS.uiLocationPopoverContent }, h("span", { class: CSS.uiLocationItems }, this.getUILocation()), tip ? h("span", { class: CSS.tip }, tip) : null)));
    }
    renderUserLocaleSection() {
        const uiDataItem = this.getUIDataItem();
        const userLocaleData = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.userLocaleData;
        const isSelected = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.selected;
        const selected = isSelected ? ` ${CSS.selected}` : '';
        const label = userLocaleData === null || userLocaleData === void 0 ? void 0 : userLocaleData.label;
        const value = userLocaleData === null || userLocaleData === void 0 ? void 0 : userLocaleData.value;
        const uid = this.setting.id;
        return (h("div", { class: `${CSS.section}${selected}` }, this.renderItemHeader(EInputType.User, label, uid), this.handleInputRender(EInputType.User, value, uid)));
    }
    renderTranslatedLanguageSection() {
        var _a, _b;
        const uiDataItem = this.getUIDataItem();
        const uid = this.setting.id;
        const locale = store.get('currentLanguage');
        const data = store.get('portalItemResourceT9n');
        const label = (_a = this.translatedLanguageLabels) === null || _a === void 0 ? void 0 : _a[this.fieldName];
        const value = (_b = data === null || data === void 0 ? void 0 : data[locale]) === null || _b === void 0 ? void 0 : _b[uid];
        const selected = (uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.selected) ? ` ${CSS.selected}` : '';
        return (h("div", { class: `${CSS.section}${selected}` }, this.renderItemHeader(EInputType.Translation, label, uid), this.handleInputRender(EInputType.Translation, value, uid)));
    }
    handleInputRender(type, value, uid) {
        const uiDataItem = this.getUIDataItem();
        const isExpanded = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.expanded;
        return isExpanded ? (this.hasNestedContent ? this.renderNestedInputs(type) : this.renderInput(type, value, uid)) : null;
    }
    renderNestedInputs(inputType, contentItem) {
        const settingToRender = contentItem !== null && contentItem !== void 0 ? contentItem : this.setting;
        const { content } = settingToRender;
        return content === null || content === void 0 ? void 0 : content.map(contentItem => (contentItem.hasOwnProperty('content') ? this.renderNestedInputs(inputType, contentItem) : this.renderNestedInput(inputType, contentItem)));
    }
    renderNestedInput(inputType, contentItem) {
        var _a;
        const locale = store.get('currentLanguage');
        const data = store.get('portalItemResourceT9n');
        const uid = contentItem === null || contentItem === void 0 ? void 0 : contentItem.id;
        const localeData = data === null || data === void 0 ? void 0 : data[locale];
        const translatedValue = localeData === null || localeData === void 0 ? void 0 : localeData[uid];
        const { label, value, id } = contentItem;
        const inputLabel = inputType === EInputType.Translation ? (_a = this.translatedLanguageLabels) === null || _a === void 0 ? void 0 : _a[id] : label;
        const isUser = inputType === EInputType.User;
        const inputValue = isUser ? value : translatedValue;
        return (h("div", { class: CSS.nestedInput }, this.renderItemHeader(inputType, inputLabel, uid, contentItem), this.renderInput(inputType, inputValue, uid, contentItem)));
    }
    renderItemHeader(type, label, uid, contentItem) {
        const doesNotHaveNestedContent = !this.hasNestedContent;
        const isNestedItem = !!contentItem;
        const showCopyButton = doesNotHaveNestedContent || isNestedItem;
        return (h("div", { class: CSS.topRow }, this.renderItemHeaderLabel(type, label, contentItem), showCopyButton ? this.renderCopyButton(type, uid) : null));
    }
    renderItemHeaderLabel(type, label, contentItem) {
        const isUserSectionWithNoNestedContent = type === EInputType.User && !contentItem;
        return (h("div", { class: CSS.labelContainer }, !contentItem ? this.renderExpandCollapseButton() : null, h("calcite-icon", { icon: this.getIcon(contentItem), scale: "s" }), h("span", { class: CSS.label }, label), isUserSectionWithNoNestedContent ? this.renderInfoButton() : null));
    }
    renderExpandCollapseButton() {
        const uiDataItem = this.getUIDataItem();
        const isExpanded = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.expanded;
        const icon = isExpanded ? EIcons.Expanded : EIcons.Collapsed;
        return h("calcite-action", { onClick: this.handleExpand.bind(this, uiDataItem), icon: icon, scale: "s", appearance: "transparent", text: "" });
    }
    renderInfoButton() {
        return (h("button", { id: this.tipID, class: CSS.infoButton }, h("calcite-icon", { class: CSS.infoIcon, icon: EIcons.Popover, scale: "s" })));
    }
    renderCopyButton(type, uid) {
        return h("calcite-action", { class: this.calciteMode, onClick: this.copySelection.bind(this, type, uid), slot: "action", icon: EIcons.Copy, appearance: "transparent", text: "" });
    }
    renderInput(type, value, uid, contentItem) {
        const setting = contentItem !== null && contentItem !== void 0 ? contentItem : this.setting;
        const isNotRichText = setting.type === 'string' || setting.type === 'textarea';
        return isNotRichText
            ? type === EInputType.User
                ? this.renderUserLocaleInput(value, uid)
                : this.renderTranslatedLanguageInput(value, uid)
            : this.renderTextEditor(value, type, uid);
    }
    renderUserLocaleInput(value, uid) {
        return (h("calcite-input", { ref: (node) => (this.userInputs[uid] = node), key: uid, id: uid, class: ECalciteMode.Light, "data-field-name": this.fieldName, value: value, onFocus: this.handleSelection, onCalciteInputChange: this.handleUserInputChange.bind(this) }));
    }
    renderTranslatedLanguageInput(value, uid) {
        return (h("calcite-input", { ref: (node) => (this.translatedInputs[uid] = node), key: uid, id: uid, class: ECalciteMode.Light, "data-field-name": this.fieldName, value: value, onFocus: this.handleSelection, onCalciteInputChange: this.handleTranslatedInputChange.bind(this) }));
    }
    renderTextEditor(value, type, uid) {
        const config = { toolbar: [] };
        return (h("instant-apps-ckeditor-wrapper", { id: uid, ref: this.setEditor.bind(this, type), onDataChanged: this.handleTextEditorDataChange.bind(this, type), onIsFocused: this.handleSelection, value: value !== null && value !== void 0 ? value : '', "data-field-name": this.fieldName, config: config }));
    }
    getUIDataItem() {
        if (!languageTranslatorState.uiData)
            return;
        return languageTranslatorState.uiData.get(this.fieldName);
    }
    updateT9nStore(fieldName, value) {
        const currentLanguage = store.get('currentLanguage');
        const dataToWrite = { [fieldName]: value };
        const updatedData = getT9nData(currentLanguage, dataToWrite);
        store.set('portalItemResourceT9n', updatedData);
    }
    handleExpand() {
        const uiDataItem = this.getUIDataItem();
        uiDataItem.expanded = !uiDataItem.expanded;
        const uiData = new Map(languageTranslatorState.uiData);
        uiData.set(this.fieldName, uiDataItem);
        store.set('uiData', uiData);
    }
    handleEditorCollapse() {
        var _a, _b;
        const uiData = store.get('uiData');
        const localeSettingItem = uiData === null || uiData === void 0 ? void 0 : uiData.get(this.fieldName);
        const isExpanded = localeSettingItem === null || localeSettingItem === void 0 ? void 0 : localeSettingItem.expanded;
        if (!isExpanded && ((_a = this.userEditorWrapper) === null || _a === void 0 ? void 0 : _a.editorInstance) && ((_b = this.translatedEditorWrapper) === null || _b === void 0 ? void 0 : _b.editorInstance)) {
            const { userEditorWrapper, translatedEditorWrapper } = this;
            const userEditorData = userEditorWrapper.editorInstance.getData();
            userEditorWrapper.value = userEditorData;
            const translatedEditorData = translatedEditorWrapper.editorInstance.getData();
            translatedEditorWrapper.value = translatedEditorData;
            userEditorWrapper.editorInstance.destroy();
            translatedEditorWrapper.editorInstance.destroy();
        }
    }
    handleSelection(event) {
        const uiData = new Map(languageTranslatorState.uiData);
        const uiDataKeys = getUIDataKeys();
        uiDataKeys.forEach(key => {
            const setting = uiData === null || uiData === void 0 ? void 0 : uiData.get(key);
            setting.selected = false;
        });
        uiDataKeys.forEach(key => {
            const node = event === null || event === void 0 ? void 0 : event.target;
            const fieldName = node === null || node === void 0 ? void 0 : node.getAttribute('data-field-name');
            if (key === fieldName) {
                const setting = uiData === null || uiData === void 0 ? void 0 : uiData.get(key);
                setting.selected = true;
            }
        });
        store.set('uiData', uiData);
    }
    getUILocation() {
        const uiDataItem = this.getUIDataItem();
        const { uiLocation, userLocaleData } = uiDataItem;
        const { section, subsection } = uiLocation;
        const breadCrumbLabels = [section.label, subsection.label, userLocaleData.label].filter(uiLocationStr => !!uiLocationStr);
        return breadCrumbLabels.map((breadCrumbLabel, breadCrumbLabelIndex) => (h("span", { class: CSS.uiLocationItem }, h("span", null, breadCrumbLabel), breadCrumbLabelIndex !== breadCrumbLabels.length - 1 ? h("calcite-icon", { icon: "chevron-right", scale: "s" }) : null)));
    }
    getTip() {
        const uiDataItem = this.getUIDataItem();
        const { tip } = uiDataItem;
        return tip;
    }
    copySelection(type, uid) {
        if (this.setting.type === ESettingType.TextEditor) {
            this.copyTextEditorContent(type);
        }
        else {
            this.copyCalciteInputContent(uid, type);
        }
    }
    copyTextEditorContent(type) {
        var _a, _b;
        const editor = type === EInputType.User ? (_a = this.userEditorWrapper) === null || _a === void 0 ? void 0 : _a.editorInstance : (_b = this.translatedEditorWrapper) === null || _b === void 0 ? void 0 : _b.editorInstance;
        const duration = 50;
        setTimeout(() => {
            this.selectContent(editor);
            setTimeout(() => this.selectContent(editor), duration);
        }, duration);
        this.copyContent(editor);
    }
    selectContent(editor) {
        editor.editing.view.focus();
        const { model } = editor;
        const doc = model.document;
        const range = model.createRangeIn(doc.getRoot());
        model.change(writer => writer.setSelection(range));
    }
    copyContent(editor) {
        const data = editor.getData();
        const tempElement = document.createElement('div');
        tempElement.contentEditable = 'true';
        tempElement.innerHTML = data;
        document.body.appendChild(tempElement);
        const tempRange = document.createRange();
        tempRange.selectNodeContents(tempElement);
        const selection = window.getSelection();
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(tempRange);
        document.execCommand('copy');
        document.body.removeChild(tempElement);
    }
    copyCalciteInputContent(uid, inputType) {
        const input = inputType === EInputType.User ? this.userInputs[uid] : this.translatedInputs[uid];
        if (input) {
            input.selectText();
            const value = input.value;
            navigator.clipboard.writeText(value);
        }
    }
    setEditor(type, node) {
        if (type === EInputType.User) {
            this.userEditorWrapper = node;
        }
        else {
            this.translatedEditorWrapper = node;
        }
    }
    // INPUT DATA HANDLING
    // User locale input data handling
    async handleUserInputChange(e) {
        store.set('saving', true);
        try {
            const node = e.target;
            const uid = node.id;
            const value = node.value;
            const uiDataItem = this.getUIDataItem();
            uiDataItem.userLocaleData.value = value;
            await this.userLocaleInputOnChangeCallback(uid, value);
            store.set('saving', false);
        }
        catch (_a) {
            store.set('saving', false);
        }
    }
    async handleUserTextEditorChange(e) {
        store.set('saving', true);
        try {
            const value = e.detail;
            const uiDataItem = this.getUIDataItem();
            uiDataItem.userLocaleData.value = value;
            await this.userLocaleInputOnChangeCallback(this.fieldName, value);
            store.set('saving', false);
        }
        catch (_a) {
            store.set('saving', false);
        }
    }
    // Translated locale input data handling
    async handleTranslatedInputChange(e) {
        store.set('saving', true);
        try {
            const composedPath = e.composedPath();
            const node = composedPath[0];
            const uid = node.id;
            this.updateT9nStore(uid, node.value);
            const { locale, resource } = this.getTranslatedLocaleCallbackData();
            const value = e.target.value;
            await this.translatedLocaleInputOnChangeCallback(uid, value, locale, resource);
            setTimeout(() => store.set('saving', false), 1500);
            this.translatorItemDataUpdated.emit();
        }
        catch (err) {
            console.error('Error writing to portal item resource: ', err);
            store.set('saving', false);
        }
    }
    async handleTranslatedTextEditorChange(e) {
        store.set('saving', true);
        try {
            const node = e.target;
            const uid = node.id;
            this.updateT9nStore(uid, e.detail);
            const { locale, resource } = this.getTranslatedLocaleCallbackData();
            const value = e.detail;
            await this.translatedLocaleInputOnChangeCallback(uid, value, locale, resource);
            setTimeout(() => store.set('saving', false), 1500);
            this.translatorItemDataUpdated.emit();
        }
        catch (err) {
            console.error('Error writing to portal item resource: ', err);
            store.set('saving', false);
        }
    }
    handleTextEditorDataChange(type, e) {
        if (type === EInputType.User) {
            this.handleUserTextEditorChange(e);
        }
        else {
            this.handleTranslatedTextEditorChange(e);
        }
    }
    getTranslatedLocaleCallbackData() {
        const locale = store.get('currentLanguage');
        const resource = store.get('portalItemResource');
        return { locale, resource };
    }
    getIcon(setting) {
        const settingToUse = setting !== null && setting !== void 0 ? setting : this.setting;
        switch (settingToUse.stringType) {
            case 'title':
                return EIcons.Title;
            case 'subtitle':
                return EIcons.Subtitle;
            case 'text':
                return EIcons.Text;
            case 'button':
                return EIcons.Button;
            case 'string':
                return EIcons.String;
            default:
                return EIcons.SettingIndicator;
        }
    }
    static get style() { return InstantAppsLanguageTranslatorItemStyle0; }
}, [2, "instant-apps-language-translator-item", {
        "fieldName": [1, "field-name"],
        "translatedLanguageLabels": [16],
        "setting": [16],
        "userLocaleInputOnChangeCallback": [16],
        "translatedLocaleInputOnChangeCallback": [16]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-language-translator-item", "calcite-action", "calcite-icon", "calcite-input", "calcite-loader", "calcite-popover", "calcite-progress", "instant-apps-ckeditor-wrapper"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-language-translator-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsLanguageTranslatorItem);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "instant-apps-ckeditor-wrapper":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsLanguageTranslatorItem as I, defineCustomElement as d };
