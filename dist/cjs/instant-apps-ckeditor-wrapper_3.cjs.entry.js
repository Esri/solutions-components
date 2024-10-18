/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const utils = require('./utils-fa7ad44b.js');
require('./locale-4a18a858.js');
require('./loadModules-8567855e.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./languageUtil-a3e1eafd.js');
require('./index-2b13a4d5.js');

const styles = `
  .ck.ck-reset.ck-editor.ck-rounded-corners {
    margin-top: 10px !important;
    margin-left: 55px !important;
  }
  .ck-editor__editable {
    height: 70px !important;
    font-size: 0.875rem !important;
    line-height: 	1.375 !important;
    color: var(--calcite-color-text-1) !important;
  }

  .ck.ck-editor__editable_inline>:first-child,
  .ck.ck-editor__editable_inline>:last-child {
    --ck-spacing-large: 0.5rem !important;
  }

  .ck.ck-balloon-panel.ck-powered-by-balloon {
    --ck-z-modal: 700;
    z-index: 700;
  }

  .calcite-mode-dark .ck-editor__editable {
    color: var(--calcite-color-text-inverse) !important;
  }
`;

const instantAppsCkeditorWrapperCss = ":host{display:block}";
const InstantAppsCkeditorWrapperStyle0 = instantAppsCkeditorWrapperCss;

const CKEDITOR_STYLES_ID = 'instant-apps-components__ckeditor-wrapper';
const InstantAppsCkeditorWrapper = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.isFocused = index.createEvent(this, "isFocused", 7);
        this.dataChanged = index.createEvent(this, "dataChanged", 7);
        this.value = undefined;
        this.editorInstance = undefined;
        this.config = undefined;
    }
    updateValue() {
        if (this.value)
            this.editorInstance.setData(this.value);
    }
    async componentDidLoad() {
        this.init();
    }
    componentDidUpdate() {
        this.editorInstance.setData(this.value);
    }
    render() {
        return (index.h(index.Host, { key: '26f62d5413e21916b77253476cf48f69682861d5' }, index.h("div", { key: '45a9d7b859a21e49c81afdaa3bdd5074f1428cd5' })));
    }
    init() {
        this.applyStyles();
        this.initEditor();
    }
    applyStyles() {
        const exists = !!document.getElementById(CKEDITOR_STYLES_ID);
        if (exists)
            return;
        const style = document.createElement('style');
        style.id = CKEDITOR_STYLES_ID;
        style.innerHTML = styles;
        document.head.prepend(style);
    }
    async initEditor() {
        const editor = await this.createEditor();
        if (editor) {
            this.editorInstance = editor;
            if (this.value || this.value === '') {
                editor.setData(this.value);
            }
            editor.editing.view.document.on('change:isFocused', this.getEditorFocusedCallback(editor));
        }
    }
    async createEditor() {
        try {
            let editor;
            if (this.config) {
                editor = await ClassicEditor.create(this.el, this.config);
            }
            else {
                editor = await ClassicEditor.create(this.el);
            }
            this.editorInstance = editor;
            return Promise.resolve(editor);
        }
        catch (err) {
            console.error(err);
            return Promise.reject(null);
        }
    }
    getEditorFocusedCallback(editor) {
        return (_event, _name, _isFocused) => {
            if (!_isFocused) {
                const editorData = editor.getData();
                if (this.value !== editorData) {
                    this.value = editorData;
                    this.dataChanged.emit(editorData);
                }
            }
            else {
                this.isFocused.emit();
            }
        };
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["updateValue"]
    }; }
};
InstantAppsCkeditorWrapper.style = InstantAppsCkeditorWrapperStyle0;

const instantAppsLanguageTranslatorItemCss = ".sc-instant-apps-language-translator-item-h{display:block}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item.sc-instant-apps-language-translator-item{display:flex}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item{padding:10px;border-bottom:1px solid var(--calcite-color-border-1);background-color:var(--calcite-color-foreground-2);width:49%}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item .instant-apps-language-translator-item__top-row.sc-instant-apps-language-translator-item{display:flex;align-items:center;justify-content:space-between}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item .instant-apps-language-translator-item__label-container.sc-instant-apps-language-translator-item{display:flex;align-items:center}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item .instant-apps-language-translator-item__label.sc-instant-apps-language-translator-item{display:inline-block;margin-left:10px;font-size:14px;font-weight:var(--calcite-font-weight-medium)}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item calcite-input.sc-instant-apps-language-translator-item{margin-top:10px;margin-left:55px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--last-item.sc-instant-apps-language-translator-item{border-bottom:none}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item{background-color:#f1faff}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item:first-child{margin-right:1%}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__ui-location-popover-content.sc-instant-apps-language-translator-item{display:inline-block;padding:10px;max-width:400px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__ui-location-items.sc-instant-apps-language-translator-item{display:flex}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__ui-location-item.sc-instant-apps-language-translator-item{display:flex;align-items:center;font-weight:var(--calcite-font-weight-medium);font-size:14px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__tip.sc-instant-apps-language-translator-item{display:inline-block;font-size:14px;line-height:22px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__info-icon.sc-instant-apps-language-translator-item{color:var(--calcite-color-brand)}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__info-button.sc-instant-apps-language-translator-item{border:0;background-color:transparent;cursor:pointer}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__nested-input.sc-instant-apps-language-translator-item{margin-left:60px;margin-top:8px}.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__nested-input.sc-instant-apps-language-translator-item calcite-input.sc-instant-apps-language-translator-item{margin-left:30px}.calcite-mode-dark.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item{background-color:#f1faff;background-color:var(--calcite-color-brand);color:var(--calcite-color-text-inverse)}.calcite-mode-dark.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item calcite-action.sc-instant-apps-language-translator-item{--calcite-ui-icon-color:var(--calcite-color-text-inverse)}.calcite-mode-dark.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section--selected.sc-instant-apps-language-translator-item calcite-icon.sc-instant-apps-language-translator-item{color:var(--calcite-color-text-inverse)}.instant-apps-language-translator--last-item.sc-instant-apps-language-translator-item-h .instant-apps-language-translator-item__section.sc-instant-apps-language-translator-item{border-bottom:none}";
const InstantAppsLanguageTranslatorItemStyle0 = instantAppsLanguageTranslatorItemCss;

const BASE$1 = 'instant-apps-language-translator-item';
const CSS$1 = {
    section: `${BASE$1}__section`,
    selected: `${BASE$1}__section--selected`,
    collapsed: `${BASE$1}__section--collapsed`,
    topRow: `${BASE$1}__top-row`,
    labelContainer: `${BASE$1}__label-container`,
    label: `${BASE$1}__label`,
    uiLocationPopoverContent: `${BASE$1}__ui-location-popover-content`,
    uiLocationItems: `${BASE$1}__ui-location-items`,
    uiLocationItem: `${BASE$1}__ui-location-item`,
    infoIcon: `${BASE$1}__info-icon`,
    infoButton: `${BASE$1}__info-button`,
    tip: `${BASE$1}__tip`,
    nestedInput: `${BASE$1}__nested-input`,
};
const InstantAppsLanguageTranslatorItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.translatorItemDataUpdated = index.createEvent(this, "translatorItemDataUpdated", 7);
        this.userInputs = {};
        this.translatedInputs = {};
        this.fieldName = undefined;
        this.translatedLanguageLabels = undefined;
        this.setting = undefined;
        this.userLocaleInputOnChangeCallback = undefined;
        this.translatedLocaleInputOnChangeCallback = undefined;
    }
    get isTextEditor() {
        return this.setting.type === utils.ESettingType.TextEditor;
    }
    get calciteMode() {
        return utils.isCalciteModeDark() ? utils.ECalciteMode.Dark : utils.ECalciteMode.Light;
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
            utils.store.onChange('uiData', () => this.handleEditorCollapse());
        }
    }
    render() {
        var _a;
        if ('content' in this.setting && ((_a = this.setting.content) === null || _a === void 0 ? void 0 : _a.every(contentItem => { var _a; return ((_a = contentItem === null || contentItem === void 0 ? void 0 : contentItem.content) === null || _a === void 0 ? void 0 : _a.length) === 0; }))) {
            return index.h(index.Fragment, null);
        }
        else {
            return (index.h(index.Host, { class: this.calciteMode }, this.renderBase(), this.renderPopover()));
        }
    }
    renderBase() {
        return (index.h("div", { class: BASE$1 }, this.renderUserLocaleSection(), this.renderTranslatedLanguageSection()));
    }
    renderPopover() {
        const tip = this.getTip();
        return (index.h("calcite-popover", { referenceElement: this.tipID, label: "", "auto-close": "true", placement: "trailing", closable: true }, index.h("span", { class: CSS$1.uiLocationPopoverContent }, index.h("span", { class: CSS$1.uiLocationItems }, this.getUILocation()), tip ? index.h("span", { class: CSS$1.tip }, tip) : null)));
    }
    renderUserLocaleSection() {
        const uiDataItem = this.getUIDataItem();
        const userLocaleData = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.userLocaleData;
        const isSelected = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.selected;
        const selected = isSelected ? ` ${CSS$1.selected}` : '';
        const label = userLocaleData === null || userLocaleData === void 0 ? void 0 : userLocaleData.label;
        const value = userLocaleData === null || userLocaleData === void 0 ? void 0 : userLocaleData.value;
        const uid = this.setting.id;
        return (index.h("div", { class: `${CSS$1.section}${selected}` }, this.renderItemHeader(utils.EInputType.User, label, uid), this.handleInputRender(utils.EInputType.User, value, uid)));
    }
    renderTranslatedLanguageSection() {
        var _a, _b;
        const uiDataItem = this.getUIDataItem();
        const uid = this.setting.id;
        const locale = utils.store.get('currentLanguage');
        const data = utils.store.get('portalItemResourceT9n');
        const label = (_a = this.translatedLanguageLabels) === null || _a === void 0 ? void 0 : _a[this.fieldName];
        const value = (_b = data === null || data === void 0 ? void 0 : data[locale]) === null || _b === void 0 ? void 0 : _b[uid];
        const selected = (uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.selected) ? ` ${CSS$1.selected}` : '';
        return (index.h("div", { class: `${CSS$1.section}${selected}` }, this.renderItemHeader(utils.EInputType.Translation, label, uid), this.handleInputRender(utils.EInputType.Translation, value, uid)));
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
        const locale = utils.store.get('currentLanguage');
        const data = utils.store.get('portalItemResourceT9n');
        const uid = contentItem === null || contentItem === void 0 ? void 0 : contentItem.id;
        const localeData = data === null || data === void 0 ? void 0 : data[locale];
        const translatedValue = localeData === null || localeData === void 0 ? void 0 : localeData[uid];
        const { label, value, id } = contentItem;
        const inputLabel = inputType === utils.EInputType.Translation ? (_a = this.translatedLanguageLabels) === null || _a === void 0 ? void 0 : _a[id] : label;
        const isUser = inputType === utils.EInputType.User;
        const inputValue = isUser ? value : translatedValue;
        return (index.h("div", { class: CSS$1.nestedInput }, this.renderItemHeader(inputType, inputLabel, uid, contentItem), this.renderInput(inputType, inputValue, uid, contentItem)));
    }
    renderItemHeader(type, label, uid, contentItem) {
        const doesNotHaveNestedContent = !this.hasNestedContent;
        const isNestedItem = !!contentItem;
        const showCopyButton = doesNotHaveNestedContent || isNestedItem;
        return (index.h("div", { class: CSS$1.topRow }, this.renderItemHeaderLabel(type, label, contentItem), showCopyButton ? this.renderCopyButton(type, uid) : null));
    }
    renderItemHeaderLabel(type, label, contentItem) {
        const isUserSectionWithNoNestedContent = type === utils.EInputType.User && !contentItem;
        return (index.h("div", { class: CSS$1.labelContainer }, !contentItem ? this.renderExpandCollapseButton() : null, index.h("calcite-icon", { icon: this.getIcon(contentItem), scale: "s" }), index.h("span", { class: CSS$1.label }, label), isUserSectionWithNoNestedContent ? this.renderInfoButton() : null));
    }
    renderExpandCollapseButton() {
        const uiDataItem = this.getUIDataItem();
        const isExpanded = uiDataItem === null || uiDataItem === void 0 ? void 0 : uiDataItem.expanded;
        const icon = isExpanded ? utils.EIcons.Expanded : utils.EIcons.Collapsed;
        return index.h("calcite-action", { onClick: this.handleExpand.bind(this, uiDataItem), icon: icon, scale: "s", appearance: "transparent", text: "" });
    }
    renderInfoButton() {
        return (index.h("button", { id: this.tipID, class: CSS$1.infoButton }, index.h("calcite-icon", { class: CSS$1.infoIcon, icon: utils.EIcons.Popover, scale: "s" })));
    }
    renderCopyButton(type, uid) {
        return index.h("calcite-action", { class: this.calciteMode, onClick: this.copySelection.bind(this, type, uid), slot: "action", icon: utils.EIcons.Copy, appearance: "transparent", text: "" });
    }
    renderInput(type, value, uid, contentItem) {
        const setting = contentItem !== null && contentItem !== void 0 ? contentItem : this.setting;
        const isNotRichText = setting.type === 'string' || setting.type === 'textarea';
        return isNotRichText
            ? type === utils.EInputType.User
                ? this.renderUserLocaleInput(value, uid)
                : this.renderTranslatedLanguageInput(value, uid)
            : this.renderTextEditor(value, type, uid);
    }
    renderUserLocaleInput(value, uid) {
        return (index.h("calcite-input", { ref: (node) => (this.userInputs[uid] = node), key: uid, id: uid, class: utils.ECalciteMode.Light, "data-field-name": this.fieldName, value: value, onFocus: this.handleSelection, onCalciteInputChange: this.handleUserInputChange.bind(this) }));
    }
    renderTranslatedLanguageInput(value, uid) {
        return (index.h("calcite-input", { ref: (node) => (this.translatedInputs[uid] = node), key: uid, id: uid, class: utils.ECalciteMode.Light, "data-field-name": this.fieldName, value: value, onFocus: this.handleSelection, onCalciteInputChange: this.handleTranslatedInputChange.bind(this) }));
    }
    renderTextEditor(value, type, uid) {
        const config = { toolbar: [] };
        return (index.h("instant-apps-ckeditor-wrapper", { id: uid, ref: this.setEditor.bind(this, type), onDataChanged: this.handleTextEditorDataChange.bind(this, type), onIsFocused: this.handleSelection, value: value !== null && value !== void 0 ? value : '', "data-field-name": this.fieldName, config: config }));
    }
    getUIDataItem() {
        if (!utils.languageTranslatorState.uiData)
            return;
        return utils.languageTranslatorState.uiData.get(this.fieldName);
    }
    updateT9nStore(fieldName, value) {
        const currentLanguage = utils.store.get('currentLanguage');
        const dataToWrite = { [fieldName]: value };
        const updatedData = utils.getT9nData(currentLanguage, dataToWrite);
        utils.store.set('portalItemResourceT9n', updatedData);
    }
    handleExpand() {
        const uiDataItem = this.getUIDataItem();
        uiDataItem.expanded = !uiDataItem.expanded;
        const uiData = new Map(utils.languageTranslatorState.uiData);
        uiData.set(this.fieldName, uiDataItem);
        utils.store.set('uiData', uiData);
    }
    handleEditorCollapse() {
        var _a, _b;
        const uiData = utils.store.get('uiData');
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
        const uiData = new Map(utils.languageTranslatorState.uiData);
        const uiDataKeys = utils.getUIDataKeys();
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
        utils.store.set('uiData', uiData);
    }
    getUILocation() {
        const uiDataItem = this.getUIDataItem();
        const { uiLocation, userLocaleData } = uiDataItem;
        const { section, subsection } = uiLocation;
        const breadCrumbLabels = [section.label, subsection.label, userLocaleData.label].filter(uiLocationStr => !!uiLocationStr);
        return breadCrumbLabels.map((breadCrumbLabel, breadCrumbLabelIndex) => (index.h("span", { class: CSS$1.uiLocationItem }, index.h("span", null, breadCrumbLabel), breadCrumbLabelIndex !== breadCrumbLabels.length - 1 ? index.h("calcite-icon", { icon: "chevron-right", scale: "s" }) : null)));
    }
    getTip() {
        const uiDataItem = this.getUIDataItem();
        const { tip } = uiDataItem;
        return tip;
    }
    copySelection(type, uid) {
        if (this.setting.type === utils.ESettingType.TextEditor) {
            this.copyTextEditorContent(type);
        }
        else {
            this.copyCalciteInputContent(uid, type);
        }
    }
    copyTextEditorContent(type) {
        var _a, _b;
        const editor = type === utils.EInputType.User ? (_a = this.userEditorWrapper) === null || _a === void 0 ? void 0 : _a.editorInstance : (_b = this.translatedEditorWrapper) === null || _b === void 0 ? void 0 : _b.editorInstance;
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
        const input = inputType === utils.EInputType.User ? this.userInputs[uid] : this.translatedInputs[uid];
        if (input) {
            input.selectText();
            const value = input.value;
            navigator.clipboard.writeText(value);
        }
    }
    setEditor(type, node) {
        if (type === utils.EInputType.User) {
            this.userEditorWrapper = node;
        }
        else {
            this.translatedEditorWrapper = node;
        }
    }
    // INPUT DATA HANDLING
    // User locale input data handling
    async handleUserInputChange(e) {
        utils.store.set('saving', true);
        try {
            const node = e.target;
            const uid = node.id;
            const value = node.value;
            const uiDataItem = this.getUIDataItem();
            uiDataItem.userLocaleData.value = value;
            await this.userLocaleInputOnChangeCallback(uid, value);
            utils.store.set('saving', false);
        }
        catch (_a) {
            utils.store.set('saving', false);
        }
    }
    async handleUserTextEditorChange(e) {
        utils.store.set('saving', true);
        try {
            const value = e.detail;
            const node = e.target;
            const uid = node.id;
            const uiDataItem = this.getUIDataItem();
            uiDataItem.userLocaleData.value = value;
            await this.userLocaleInputOnChangeCallback(uid, value);
            utils.store.set('saving', false);
        }
        catch (_a) {
            utils.store.set('saving', false);
        }
    }
    // Translated locale input data handling
    async handleTranslatedInputChange(e) {
        utils.store.set('saving', true);
        try {
            const composedPath = e.composedPath();
            const node = composedPath[0];
            const uid = node.id;
            this.updateT9nStore(uid, node.value);
            const { locale, resource } = this.getTranslatedLocaleCallbackData();
            const value = e.target.value;
            await this.translatedLocaleInputOnChangeCallback(uid, value, locale, resource);
            setTimeout(() => utils.store.set('saving', false), 1500);
            this.translatorItemDataUpdated.emit();
        }
        catch (err) {
            console.error('Error writing to portal item resource: ', err);
            utils.store.set('saving', false);
        }
    }
    async handleTranslatedTextEditorChange(e) {
        utils.store.set('saving', true);
        try {
            const node = e.target;
            const uid = node.id;
            this.updateT9nStore(uid, e.detail);
            const { locale, resource } = this.getTranslatedLocaleCallbackData();
            const value = e.detail;
            await this.translatedLocaleInputOnChangeCallback(uid, value, locale, resource);
            setTimeout(() => utils.store.set('saving', false), 1500);
            this.translatorItemDataUpdated.emit();
        }
        catch (err) {
            console.error('Error writing to portal item resource: ', err);
            utils.store.set('saving', false);
        }
    }
    handleTextEditorDataChange(type, e) {
        if (type === utils.EInputType.User) {
            this.handleUserTextEditorChange(e);
        }
        else {
            this.handleTranslatedTextEditorChange(e);
        }
    }
    getTranslatedLocaleCallbackData() {
        const locale = utils.store.get('currentLanguage');
        const resource = utils.store.get('portalItemResource');
        return { locale, resource };
    }
    getIcon(setting) {
        const settingToUse = setting !== null && setting !== void 0 ? setting : this.setting;
        switch (settingToUse.stringType) {
            case 'title':
                return utils.EIcons.Title;
            case 'subtitle':
                return utils.EIcons.Subtitle;
            case 'text':
                return utils.EIcons.Text;
            case 'button':
                return utils.EIcons.Button;
            case 'string':
                return utils.EIcons.String;
            default:
                return utils.EIcons.SettingIndicator;
        }
    }
};
InstantAppsLanguageTranslatorItem.style = InstantAppsLanguageTranslatorItemStyle0;

const instantAppsLanguageTranslatorSearchCss = ".sc-instant-apps-language-translator-search-h{display:block;position:relative}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__input.sc-instant-apps-language-translator-search{width:235.5px}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list.sc-instant-apps-language-translator-search{position:absolute;margin:0;padding:0;width:100%;max-height:30vh;overflow:auto;border-left:none;background-color:var(--calcite-color-foreground-1);border:1px solid #c0c0c0;z-index:702}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list-item.sc-instant-apps-language-translator-search:first-child{border:none}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list-item.sc-instant-apps-language-translator-search{margin-top:0;padding:0.8em 1em;border-top:solid 1px rgba(110, 110, 110, 0.3);display:flex;flex-direction:column;cursor:pointer;word-break:break-word}.sc-instant-apps-language-translator-search-h .instant-apps-language-translator-search__suggestion-list-item.sc-instant-apps-language-translator-search:hover{background-color:var(--calcite-color-foreground-2)}";
const InstantAppsLanguageTranslatorSearchStyle0 = instantAppsLanguageTranslatorSearchCss;

const BASE = 'instant-apps-language-translator-search';
const CSS = {
    base: BASE,
    input: `${BASE}__input`,
    suggestionList: `${BASE}__suggestion-list`,
    suggestionListItem: `${BASE}__suggestion-list-item`,
};
const InstantAppsLanguageTranslatorSearch = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.suggestionSelected = index.createEvent(this, "suggestionSelected", 7);
        this.t9nPlaceholder = undefined;
        this.results = [];
    }
    render() {
        return (index.h(index.Host, { key: '80febf289e2bbfcf09636c84b5a5a83e80f377c0' }, this.renderSearchInput(), this.renderSuggestions()));
    }
    renderSearchInput() {
        return (index.h("calcite-input", { ref: (node) => (this.searchInput = node), class: CSS.input, onCalciteInputInput: this.handleSearch.bind(this), type: "search", placeholder: this.t9nPlaceholder, icon: "search" }));
    }
    renderSuggestions() {
        return this.results.length > 0 ? this.renderSuggestionList() : null;
    }
    renderSuggestionList() {
        return index.h("ul", { class: CSS.suggestionList }, this.results.map(result => this.renderSuggestionListItem(result)));
    }
    renderSuggestionListItem(result) {
        return (index.h("li", { onClick: this.selectSuggestion.bind(this), class: CSS.suggestionListItem, "data-field-name": result.fieldName }, result.userLocaleData.label));
    }
    handleSearch(e) {
        var _a, _b;
        const node = e.target;
        const userInput = (_b = (_a = node.value) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.trim();
        const uiData = utils.store.get('uiData');
        const settingKeys = utils.getUIDataKeys();
        const portalItemResrouceT9n = utils.store.get('portalItemResourceT9n');
        const currentLanguage = utils.store.get('currentLanguage');
        const translatedData = portalItemResrouceT9n[currentLanguage];
        const possibleResultKeys = this.getSettingDataItems(settingKeys);
        const matchedResults = possibleResultKeys.filter(this.matchedResultsCallback(uiData, translatedData, userInput, currentLanguage));
        this.results = [
            ...matchedResults.map(matchedKey => {
                const result = Object.assign({ fieldName: matchedKey }, uiData.get(matchedKey));
                return result;
            }),
        ];
    }
    matchedResultsCallback(uiData, translatedData, userInput, currentLanguage) {
        return (key) => {
            var _a;
            const setting = uiData.get(key);
            const { label } = setting.userLocaleData;
            const { value } = setting.userLocaleData;
            const translatedLanguageLabels = uiData.get('translatedLanguageLabels');
            const translatedLanguageLabel = (_a = translatedLanguageLabels === null || translatedLanguageLabels === void 0 ? void 0 : translatedLanguageLabels[currentLanguage]) === null || _a === void 0 ? void 0 : _a[key];
            const translatedLanguageValue = translatedData === null || translatedData === void 0 ? void 0 : translatedData[key];
            const labelMatch = this.testUserInput(label, userInput);
            const valueMatch = this.testUserInput(value, userInput);
            const translatedLanguageLabelMatch = this.testUserInput(translatedLanguageLabel, userInput);
            const translatedLanguageValueMatch = this.testUserInput(translatedLanguageValue, userInput);
            const isMatch = labelMatch || valueMatch || translatedLanguageLabelMatch || translatedLanguageValueMatch;
            return isMatch;
        };
    }
    getSettingDataItems(settingKeys) {
        return settingKeys.filter(key => key !== 'locales' && key !== 'translatedLanguageLabels');
    }
    testUserInput(testValue, userInput) {
        var _a;
        return !!(testValue === null || testValue === void 0 ? void 0 : testValue.trim()) && !!(userInput === null || userInput === void 0 ? void 0 : userInput.trim()) && ((_a = testValue === null || testValue === void 0 ? void 0 : testValue.toLowerCase()) === null || _a === void 0 ? void 0 : _a.search(userInput)) !== -1;
    }
    selectSuggestion(e) {
        const node = e.target;
        const fieldName = node.getAttribute('data-field-name');
        this.suggestionSelected.emit(fieldName);
        this.resetSearchInput();
    }
    resetSearchInput() {
        this.searchInput.value = '';
        this.results = [];
    }
};
InstantAppsLanguageTranslatorSearch.style = InstantAppsLanguageTranslatorSearchStyle0;

exports.instant_apps_ckeditor_wrapper = InstantAppsCkeditorWrapper;
exports.instant_apps_language_translator_item = InstantAppsLanguageTranslatorItem;
exports.instant_apps_language_translator_search = InstantAppsLanguageTranslatorSearch;
