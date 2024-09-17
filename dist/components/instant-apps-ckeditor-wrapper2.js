/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

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
const InstantAppsCkeditorWrapper = /*@__PURE__*/ proxyCustomElement(class InstantAppsCkeditorWrapper extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.isFocused = createEvent(this, "isFocused", 7);
        this.dataChanged = createEvent(this, "dataChanged", 7);
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
        return (h(Host, { key: '4a000cee4310d40e940c97d16f24c78415083f1b' }, h("div", { key: '55b2e7ddd6b259b58e19f8946d2198df1fd7b579' })));
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
    get el() { return this; }
    static get watchers() { return {
        "value": ["updateValue"]
    }; }
    static get style() { return InstantAppsCkeditorWrapperStyle0; }
}, [0, "instant-apps-ckeditor-wrapper", {
        "value": [1025],
        "editorInstance": [1032, "editor-instance"],
        "config": [16]
    }, undefined, {
        "value": ["updateValue"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-ckeditor-wrapper"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-ckeditor-wrapper":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsCkeditorWrapper);
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsCkeditorWrapper as I, defineCustomElement as d };
