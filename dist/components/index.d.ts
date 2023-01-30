/* SolutionsComponents custom elements */
export { AddRecordModal as AddRecordModal } from '../types/components/add-record-modal/add-record-modal';
export { BufferTools as BufferTools } from '../types/components/buffer-tools/buffer-tools';
export { CardManager as CardManager } from '../types/components/card-manager/card-manager';
export { CheckList as CheckList } from '../types/components/check-list/check-list';
export { CommentCard as CommentCard } from '../types/components/comment-card/comment-card';
export { ConfigBufferTools as ConfigBufferTools } from '../types/components/config-buffer-tools/config-buffer-tools';
export { ConfigDrawTools as ConfigDrawTools } from '../types/components/config-draw-tools/config-draw-tools';
export { ConfigLayerPicker as ConfigLayerPicker } from '../types/components/config-layer-picker/config-layer-picker';
export { ConfigPdfDownload as ConfigPdfDownload } from '../types/components/config-pdf-download/config-pdf-download';
export { CrowdsourceManager as CrowdsourceManager } from '../types/components/crowdsource-manager/crowdsource-manager';
export { CrowdsourceReporter as CrowdsourceReporter } from '../types/components/crowdsource-reporter/crowdsource-reporter';
export { DeductCalculator as DeductCalculator } from '../types/components/deduct-calculator/deduct-calculator';
export { EditRecordModal as EditRecordModal } from '../types/components/edit-record-modal/edit-record-modal';
export { InfoCard as InfoCard } from '../types/components/info-card/info-card';
export { JsonEditor as JsonEditor } from '../types/components/json-editor/json-editor';
export { LayerTable as LayerTable } from '../types/components/layer-table/layer-table';
export { ListItem as ListItem } from '../types/components/list-item/list-item';
export { MapCard as MapCard } from '../types/components/map-card/map-card';
export { MapDrawTools as MapDrawTools } from '../types/components/map-draw-tools/map-draw-tools';
export { MapLayerPicker as MapLayerPicker } from '../types/components/map-layer-picker/map-layer-picker';
export { MapSearch as MapSearch } from '../types/components/map-search/map-search';
export { MapSelectTools as MapSelectTools } from '../types/components/map-select-tools/map-select-tools';
export { MediaCard as MediaCard } from '../types/components/media-card/media-card';
export { PciCalculator as PciCalculator } from '../types/components/pci-calculator/pci-calculator';
export { PdfDownload as PdfDownload } from '../types/components/pdf-download/pdf-download';
export { PublicNotification as PublicNotification } from '../types/components/public-notification/public-notification';
export { RefineSelection as RefineSelection } from '../types/components/refine-selection/refine-selection';
export { RefineSelectionTools as RefineSelectionTools } from '../types/components/refine-selection-tools/refine-selection-tools';
export { SolutionConfiguration as SolutionConfiguration } from '../types/components/solution-configuration/solution-configuration';
export { SolutionContents as SolutionContents } from '../types/components/solution-contents/solution-contents';
export { SolutionItem as SolutionItem } from '../types/components/solution-item/solution-item';
export { SolutionItemDetails as SolutionItemDetails } from '../types/components/solution-item-details/solution-item-details';
export { SolutionItemIcon as SolutionItemIcon } from '../types/components/solution-item-icon/solution-item-icon';
export { SolutionItemSharing as SolutionItemSharing } from '../types/components/solution-item-sharing/solution-item-sharing';
export { SolutionOrganizationVariables as SolutionOrganizationVariables } from '../types/components/solution-organization-variables/solution-organization-variables';
export { SolutionResourceItem as SolutionResourceItem } from '../types/components/solution-resource-item/solution-resource-item';
export { SolutionSpatialRef as SolutionSpatialRef } from '../types/components/solution-spatial-ref/solution-spatial-ref';
export { SolutionTemplateData as SolutionTemplateData } from '../types/components/solution-template-data/solution-template-data';
export { SolutionVariables as SolutionVariables } from '../types/components/solution-variables/solution-variables';
export { StoreManager as StoreManager } from '../types/components/store-manager/store-manager';

/**
 * Used to manually set the base path where assets can be found.
 * If the script is used as "module", it's recommended to use "import.meta.url",
 * such as "setAssetPath(import.meta.url)". Other options include
 * "setAssetPath(document.currentScript.src)", or using a bundler's replace plugin to
 * dynamically set the path at build time, such as "setAssetPath(process.env.ASSET_PATH)".
 * But do note that this configuration depends on how your script is bundled, or lack of
 * bundling, and where your assets can be loaded from. Additionally custom bundling
 * will have to ensure the static assets are copied to its build directory.
 */
export declare const setAssetPath: (path: string) => void;

/**
 * Used to specify a nonce value that corresponds with an application's CSP.
 * When set, the nonce will be added to all dynamically created script and style tags at runtime.
 * Alternatively, the nonce value can be set on a meta tag in the DOM head
 * (<meta name="csp-nonce" content="{ nonce value here }" />) which
 * will result in the same behavior.
 */
export declare const setNonce: (nonce: string) => void

export interface SetPlatformOptions {
  raf?: (c: FrameRequestCallback) => number;
  ael?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
  rel?: (el: EventTarget, eventName: string, listener: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions) => void;
}
export declare const setPlatformOptions: (opts: SetPlatformOptions) => void;
export * from '../types';
