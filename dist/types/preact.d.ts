
import { JSXInternal } from "preact/src/jsx";
import { JSX } from "./components";

declare module "preact/src/jsx" {
  namespace JSXInternal {
    interface IntrinsicElements {
      
      "arcgis-login": JSX.SolutionsArcgisLogin & JSXInternal.HTMLAttributes<HTMLSolutionsArcgisLoginElement>

      "basemap-gallery": JSX.SolutionsBasemapGallery & JSXInternal.HTMLAttributes<HTMLSolutionsBasemapGalleryElement>

      "buffer-tools": Omit<JSX.SolutionsBufferTools, "onBufferComplete" | "onDistanceChanged" | "onUnitChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsBufferToolsElement> & {
        "onbufferComplete"?: (event: CustomEvent<any>) => void;
        "ondistanceChanged"?: (event: CustomEvent<any>) => void;
        "onunitChanged"?: (event: CustomEvent<any>) => void;
      }

      "calcite-accordion": Omit<JSX.SolutionsAccordion, "onCalciteInternalAccordionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsAccordionElement> & {
        "oncalciteInternalAccordionChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-accordion-item": Omit<JSX.SolutionsAccordionItem, "onCalciteInternalAccordionItemSelect" | "onCalciteInternalAccordionItemClose"> & JSXInternal.HTMLAttributes<HTMLSolutionsAccordionItemElement> & {
        "oncalciteInternalAccordionItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAccordionItemClose"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action": JSX.SolutionsAction & JSXInternal.HTMLAttributes<HTMLSolutionsActionElement>

      "calcite-action-bar": Omit<JSX.SolutionsActionBar, "onCalciteActionBarToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionBarElement> & {
        "oncalciteActionBarToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action-group": JSX.SolutionsActionGroup & JSXInternal.HTMLAttributes<HTMLSolutionsActionGroupElement>

      "calcite-action-menu": Omit<JSX.SolutionsActionMenu, "onCalciteActionMenuOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionMenuElement> & {
        "oncalciteActionMenuOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action-pad": Omit<JSX.SolutionsActionPad, "onCalciteActionPadToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionPadElement> & {
        "oncalciteActionPadToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-alert": Omit<JSX.SolutionsAlert, "onCalciteAlertBeforeClose" | "onCalciteAlertClose" | "onCalciteAlertBeforeOpen" | "onCalciteAlertOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsAlertElement> & {
        "oncalciteAlertBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertClose"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-avatar": JSX.SolutionsAvatar & JSXInternal.HTMLAttributes<HTMLSolutionsAvatarElement>

      "calcite-block": Omit<JSX.SolutionsBlock, "onCalciteBlockBeforeClose" | "onCalciteBlockBeforeOpen" | "onCalciteBlockClose" | "onCalciteBlockOpen" | "onCalciteBlockToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsBlockElement> & {
        "oncalciteBlockBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteBlockBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteBlockClose"?: (event: CustomEvent<any>) => void;
        "oncalciteBlockOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteBlockToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-block-section": Omit<JSX.SolutionsBlockSection, "onCalciteBlockSectionToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsBlockSectionElement> & {
        "oncalciteBlockSectionToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-button": JSX.SolutionsButton & JSXInternal.HTMLAttributes<HTMLSolutionsButtonElement>

      "calcite-card": Omit<JSX.SolutionsCard, "onCalciteCardSelect" | "onCalciteInternalCardKeyEvent"> & JSXInternal.HTMLAttributes<HTMLSolutionsCardElement> & {
        "oncalciteCardSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalCardKeyEvent"?: (event: CustomEvent<any>) => void;
      }

      "calcite-card-group": Omit<JSX.SolutionsCardGroup, "onCalciteCardGroupSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsCardGroupElement> & {
        "oncalciteCardGroupSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-carousel": Omit<JSX.SolutionsCarousel, "onCalciteCarouselChange" | "onCalciteCarouselPlay" | "onCalciteCarouselStop" | "onCalciteCarouselPause" | "onCalciteCarouselResume"> & JSXInternal.HTMLAttributes<HTMLSolutionsCarouselElement> & {
        "oncalciteCarouselChange"?: (event: CustomEvent<any>) => void;
        "oncalciteCarouselPlay"?: (event: CustomEvent<any>) => void;
        "oncalciteCarouselStop"?: (event: CustomEvent<any>) => void;
        "oncalciteCarouselPause"?: (event: CustomEvent<any>) => void;
        "oncalciteCarouselResume"?: (event: CustomEvent<any>) => void;
      }

      "calcite-carousel-item": JSX.SolutionsCarouselItem & JSXInternal.HTMLAttributes<HTMLSolutionsCarouselItemElement>

      "calcite-checkbox": Omit<JSX.SolutionsCheckbox, "onCalciteInternalCheckboxBlur" | "onCalciteCheckboxChange" | "onCalciteInternalCheckboxFocus"> & JSXInternal.HTMLAttributes<HTMLSolutionsCheckboxElement> & {
        "oncalciteInternalCheckboxBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteCheckboxChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalCheckboxFocus"?: (event: CustomEvent<any>) => void;
      }

      "calcite-chip": Omit<JSX.SolutionsChip, "onCalciteChipClose" | "onCalciteChipSelect" | "onCalciteInternalChipKeyEvent" | "onCalciteInternalChipSelect" | "onCalciteInternalSyncSelectedChips"> & JSXInternal.HTMLAttributes<HTMLSolutionsChipElement> & {
        "oncalciteChipClose"?: (event: CustomEvent<any>) => void;
        "oncalciteChipSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalChipKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalChipSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalSyncSelectedChips"?: (event: CustomEvent<any>) => void;
      }

      "calcite-chip-group": Omit<JSX.SolutionsChipGroup, "onCalciteChipGroupSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsChipGroupElement> & {
        "oncalciteChipGroupSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-color-picker": Omit<JSX.SolutionsColorPicker, "onCalciteColorPickerChange" | "onCalciteColorPickerInput"> & JSXInternal.HTMLAttributes<HTMLSolutionsColorPickerElement> & {
        "oncalciteColorPickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteColorPickerInput"?: (event: CustomEvent<any>) => void;
      }

      "calcite-color-picker-hex-input": Omit<JSX.SolutionsColorPickerHexInput, "onCalciteColorPickerHexInputChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsColorPickerHexInputElement> & {
        "oncalciteColorPickerHexInputChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-color-picker-swatch": JSX.SolutionsColorPickerSwatch & JSXInternal.HTMLAttributes<HTMLSolutionsColorPickerSwatchElement>

      "calcite-combobox": Omit<JSX.SolutionsCombobox, "onCalciteComboboxChange" | "onCalciteComboboxFilterChange" | "onCalciteComboboxChipClose" | "onCalciteComboboxBeforeClose" | "onCalciteComboboxClose" | "onCalciteComboboxBeforeOpen" | "onCalciteComboboxOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsComboboxElement> & {
        "oncalciteComboboxChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxFilterChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxChipClose"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxClose"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-combobox-item": Omit<JSX.SolutionsComboboxItem, "onCalciteComboboxItemChange" | "onCalciteInternalComboboxItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsComboboxItemElement> & {
        "oncalciteComboboxItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalComboboxItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-combobox-item-group": JSX.SolutionsComboboxItemGroup & JSXInternal.HTMLAttributes<HTMLSolutionsComboboxItemGroupElement>

      "calcite-date-picker": Omit<JSX.SolutionsDatePicker, "onCalciteDatePickerChange" | "onCalciteDatePickerRangeChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsDatePickerElement> & {
        "oncalciteDatePickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteDatePickerRangeChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-picker-day": Omit<JSX.SolutionsDatePickerDay, "onCalciteDaySelect" | "onCalciteInternalDayHover"> & JSXInternal.HTMLAttributes<HTMLSolutionsDatePickerDayElement> & {
        "oncalciteDaySelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDayHover"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-picker-month": Omit<JSX.SolutionsDatePickerMonth, "onCalciteInternalDatePickerSelect" | "onCalciteInternalDatePickerHover" | "onCalciteInternalDatePickerActiveDateChange" | "onCalciteInternalDatePickerMouseOut"> & JSXInternal.HTMLAttributes<HTMLSolutionsDatePickerMonthElement> & {
        "oncalciteInternalDatePickerSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDatePickerHover"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDatePickerActiveDateChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDatePickerMouseOut"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-picker-month-header": Omit<JSX.SolutionsDatePickerMonthHeader, "onCalciteInternalDatePickerSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsDatePickerMonthHeaderElement> & {
        "oncalciteInternalDatePickerSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dialog": Omit<JSX.SolutionsDialog, "onCalciteDialogBeforeClose" | "onCalciteDialogClose" | "onCalciteDialogBeforeOpen" | "onCalciteDialogOpen" | "onCalciteDialogScroll"> & JSXInternal.HTMLAttributes<HTMLSolutionsDialogElement> & {
        "oncalciteDialogBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteDialogClose"?: (event: CustomEvent<any>) => void;
        "oncalciteDialogBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteDialogOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteDialogScroll"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dropdown": Omit<JSX.SolutionsDropdown, "onCalciteDropdownSelect" | "onCalciteDropdownBeforeClose" | "onCalciteDropdownClose" | "onCalciteDropdownBeforeOpen" | "onCalciteDropdownOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsDropdownElement> & {
        "oncalciteDropdownSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownClose"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteDropdownOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dropdown-group": Omit<JSX.SolutionsDropdownGroup, "onCalciteInternalDropdownItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsDropdownGroupElement> & {
        "oncalciteInternalDropdownItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-dropdown-item": Omit<JSX.SolutionsDropdownItem, "onCalciteDropdownItemSelect" | "onCalciteInternalDropdownItemSelect" | "onCalciteInternalDropdownItemKeyEvent" | "onCalciteInternalDropdownCloseRequest"> & JSXInternal.HTMLAttributes<HTMLSolutionsDropdownItemElement> & {
        "oncalciteDropdownItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDropdownItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDropdownItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDropdownCloseRequest"?: (event: CustomEvent<any>) => void;
      }

      "calcite-fab": JSX.SolutionsFab & JSXInternal.HTMLAttributes<HTMLSolutionsFabElement>

      "calcite-filter": Omit<JSX.SolutionsFilter, "onCalciteFilterChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsFilterElement> & {
        "oncalciteFilterChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-flow": JSX.SolutionsFlow & JSXInternal.HTMLAttributes<HTMLSolutionsFlowElement>

      "calcite-flow-item": Omit<JSX.SolutionsFlowItem, "onCalciteFlowItemBack" | "onCalciteFlowItemScroll" | "onCalciteFlowItemClose" | "onCalciteFlowItemToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsFlowItemElement> & {
        "oncalciteFlowItemBack"?: (event: CustomEvent<any>) => void;
        "oncalciteFlowItemScroll"?: (event: CustomEvent<any>) => void;
        "oncalciteFlowItemClose"?: (event: CustomEvent<any>) => void;
        "oncalciteFlowItemToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-graph": JSX.SolutionsGraph & JSXInternal.HTMLAttributes<HTMLSolutionsGraphElement>

      "calcite-handle": Omit<JSX.SolutionsHandle, "onCalciteHandleChange" | "onCalciteHandleNudge" | "onCalciteInternalAssistiveTextChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsHandleElement> & {
        "oncalciteHandleChange"?: (event: CustomEvent<any>) => void;
        "oncalciteHandleNudge"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAssistiveTextChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-icon": JSX.SolutionsIcon & JSXInternal.HTMLAttributes<HTMLSolutionsIconElement>

      "calcite-inline-editable": Omit<JSX.SolutionsInlineEditable, "onCalciteInlineEditableEditCancel" | "onCalciteInlineEditableEditConfirm" | "onCalciteInternalInlineEditableEnableEditingChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsInlineEditableElement> & {
        "oncalciteInlineEditableEditCancel"?: (event: CustomEvent<any>) => void;
        "oncalciteInlineEditableEditConfirm"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalInlineEditableEnableEditingChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input": Omit<JSX.SolutionsInput, "onCalciteInternalInputFocus" | "onCalciteInternalInputBlur" | "onCalciteInputInput" | "onCalciteInputChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputElement> & {
        "oncalciteInternalInputFocus"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalInputBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteInputInput"?: (event: CustomEvent<any>) => void;
        "oncalciteInputChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input-date-picker": Omit<JSX.SolutionsInputDatePicker, "onCalciteInputDatePickerChange" | "onCalciteInputDatePickerBeforeClose" | "onCalciteInputDatePickerClose" | "onCalciteInputDatePickerBeforeOpen" | "onCalciteInputDatePickerOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputDatePickerElement> & {
        "oncalciteInputDatePickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInputDatePickerBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInputDatePickerClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInputDatePickerBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteInputDatePickerOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input-message": JSX.SolutionsInputMessage & JSXInternal.HTMLAttributes<HTMLSolutionsInputMessageElement>

      "calcite-input-number": Omit<JSX.SolutionsInputNumber, "onCalciteInternalInputNumberFocus" | "onCalciteInternalInputNumberBlur" | "onCalciteInputNumberInput" | "onCalciteInputNumberChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputNumberElement> & {
        "oncalciteInternalInputNumberFocus"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalInputNumberBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteInputNumberInput"?: (event: CustomEvent<any>) => void;
        "oncalciteInputNumberChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input-text": Omit<JSX.SolutionsInputText, "onCalciteInternalInputTextFocus" | "onCalciteInternalInputTextBlur" | "onCalciteInputTextInput" | "onCalciteInputTextChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputTextElement> & {
        "oncalciteInternalInputTextFocus"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalInputTextBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTextInput"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTextChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input-time-picker": Omit<JSX.SolutionsInputTimePicker, "onCalciteInputTimePickerBeforeClose" | "onCalciteInputTimePickerBeforeOpen" | "onCalciteInputTimePickerChange" | "onCalciteInputTimePickerClose" | "onCalciteInputTimePickerOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputTimePickerElement> & {
        "oncalciteInputTimePickerBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimePickerBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimePickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimePickerClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimePickerOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-input-time-zone": Omit<JSX.SolutionsInputTimeZone, "onCalciteInputTimeZoneBeforeClose" | "onCalciteInputTimeZoneBeforeOpen" | "onCalciteInputTimeZoneChange" | "onCalciteInputTimeZoneClose" | "onCalciteInputTimeZoneOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputTimeZoneElement> & {
        "oncalciteInputTimeZoneBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimeZoneBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimeZoneChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimeZoneClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInputTimeZoneOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-label": Omit<JSX.SolutionsLabel, "onCalciteInternalLabelClick"> & JSXInternal.HTMLAttributes<HTMLSolutionsLabelElement> & {
        "oncalciteInternalLabelClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-link": JSX.SolutionsLink & JSXInternal.HTMLAttributes<HTMLSolutionsLinkElement>

      "calcite-list": Omit<JSX.SolutionsList, "onCalciteListChange" | "onCalciteListDragEnd" | "onCalciteListDragStart" | "onCalciteListFilter" | "onCalciteListOrderChange" | "onCalciteInternalListDefaultSlotChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsListElement> & {
        "oncalciteListChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListDragEnd"?: (event: CustomEvent<any>) => void;
        "oncalciteListDragStart"?: (event: CustomEvent<any>) => void;
        "oncalciteListFilter"?: (event: CustomEvent<any>) => void;
        "oncalciteListOrderChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListDefaultSlotChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-list-item": Omit<JSX.SolutionsListItem, "onCalciteListItemSelect" | "onCalciteListItemClose" | "onCalciteListItemDragHandleChange" | "onCalciteListItemToggle" | "onCalciteInternalListItemSelect" | "onCalciteInternalListItemSelectMultiple" | "onCalciteInternalListItemActive" | "onCalciteInternalFocusPreviousItem" | "onCalciteInternalListItemChange" | "onCalciteInternalListItemToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsListItemElement> & {
        "oncalciteListItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteListItemClose"?: (event: CustomEvent<any>) => void;
        "oncalciteListItemDragHandleChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListItemToggle"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemSelectMultiple"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemActive"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalFocusPreviousItem"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-list-item-group": Omit<JSX.SolutionsListItemGroup, "onCalciteInternalListItemGroupDefaultSlotChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsListItemGroupElement> & {
        "oncalciteInternalListItemGroupDefaultSlotChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-loader": JSX.SolutionsLoader & JSXInternal.HTMLAttributes<HTMLSolutionsLoaderElement>

      "calcite-menu": JSX.SolutionsCalciteMenu & JSXInternal.HTMLAttributes<HTMLSolutionsCalciteMenuElement>

      "calcite-menu-item": Omit<JSX.SolutionsCalciteMenuItem, "onCalciteInternalMenuItemKeyEvent" | "onCalciteMenuItemSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsCalciteMenuItemElement> & {
        "oncalciteInternalMenuItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteMenuItemSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-meter": JSX.SolutionsMeter & JSXInternal.HTMLAttributes<HTMLSolutionsMeterElement>

      "calcite-modal": Omit<JSX.SolutionsModal, "onCalciteModalBeforeClose" | "onCalciteModalClose" | "onCalciteModalBeforeOpen" | "onCalciteModalOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsModalElement> & {
        "oncalciteModalBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteModalClose"?: (event: CustomEvent<any>) => void;
        "oncalciteModalBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteModalOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-navigation": Omit<JSX.SolutionsCalciteNavigation, "onCalciteNavigationActionSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsCalciteNavigationElement> & {
        "oncalciteNavigationActionSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-navigation-logo": JSX.SolutionsCalciteNavigationLogo & JSXInternal.HTMLAttributes<HTMLSolutionsCalciteNavigationLogoElement>

      "calcite-navigation-user": JSX.SolutionsCalciteNavigationUser & JSXInternal.HTMLAttributes<HTMLSolutionsCalciteNavigationUserElement>

      "calcite-notice": Omit<JSX.SolutionsNotice, "onCalciteNoticeBeforeClose" | "onCalciteNoticeBeforeOpen" | "onCalciteNoticeClose" | "onCalciteNoticeOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsNoticeElement> & {
        "oncalciteNoticeBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteNoticeBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteNoticeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteNoticeOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-option": Omit<JSX.SolutionsOption, "onCalciteInternalOptionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsOptionElement> & {
        "oncalciteInternalOptionChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-option-group": Omit<JSX.SolutionsOptionGroup, "onCalciteInternalOptionGroupChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsOptionGroupElement> & {
        "oncalciteInternalOptionGroupChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-pagination": Omit<JSX.SolutionsPagination, "onCalcitePaginationChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsPaginationElement> & {
        "oncalcitePaginationChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-panel": Omit<JSX.SolutionsPanel, "onCalcitePanelClose" | "onCalcitePanelToggle" | "onCalcitePanelScroll"> & JSXInternal.HTMLAttributes<HTMLSolutionsPanelElement> & {
        "oncalcitePanelClose"?: (event: CustomEvent<any>) => void;
        "oncalcitePanelToggle"?: (event: CustomEvent<any>) => void;
        "oncalcitePanelScroll"?: (event: CustomEvent<any>) => void;
      }

      "calcite-pick-list": Omit<JSX.SolutionsPickList, "onCalciteListChange" | "onCalciteListFilter"> & JSXInternal.HTMLAttributes<HTMLSolutionsPickListElement> & {
        "oncalciteListChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListFilter"?: (event: CustomEvent<any>) => void;
      }

      "calcite-pick-list-group": JSX.SolutionsPickListGroup & JSXInternal.HTMLAttributes<HTMLSolutionsPickListGroupElement>

      "calcite-pick-list-item": Omit<JSX.SolutionsPickListItem, "onCalciteListItemChange" | "onCalciteListItemRemove" | "onCalciteInternalListItemPropsChange" | "onCalciteInternalListItemValueChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsPickListItemElement> & {
        "oncalciteListItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListItemRemove"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemPropsChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalListItemValueChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-popover": Omit<JSX.SolutionsPopover, "onCalcitePopoverBeforeClose" | "onCalcitePopoverClose" | "onCalcitePopoverBeforeOpen" | "onCalcitePopoverOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsPopoverElement> & {
        "oncalcitePopoverBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalcitePopoverClose"?: (event: CustomEvent<any>) => void;
        "oncalcitePopoverBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalcitePopoverOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-progress": JSX.SolutionsProgress & JSXInternal.HTMLAttributes<HTMLSolutionsProgressElement>

      "calcite-radio-button": Omit<JSX.SolutionsRadioButton, "onCalciteInternalRadioButtonBlur" | "onCalciteRadioButtonChange" | "onCalciteInternalRadioButtonCheckedChange" | "onCalciteInternalRadioButtonFocus"> & JSXInternal.HTMLAttributes<HTMLSolutionsRadioButtonElement> & {
        "oncalciteInternalRadioButtonBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteRadioButtonChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalRadioButtonCheckedChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalRadioButtonFocus"?: (event: CustomEvent<any>) => void;
      }

      "calcite-radio-button-group": Omit<JSX.SolutionsRadioButtonGroup, "onCalciteRadioButtonGroupChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsRadioButtonGroupElement> & {
        "oncalciteRadioButtonGroupChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-rating": Omit<JSX.SolutionsRating, "onCalciteRatingChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsRatingElement> & {
        "oncalciteRatingChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-scrim": JSX.SolutionsScrim & JSXInternal.HTMLAttributes<HTMLSolutionsScrimElement>

      "calcite-segmented-control": Omit<JSX.SolutionsSegmentedControl, "onCalciteSegmentedControlChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSegmentedControlElement> & {
        "oncalciteSegmentedControlChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-segmented-control-item": Omit<JSX.SolutionsSegmentedControlItem, "onCalciteInternalSegmentedControlItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSegmentedControlItemElement> & {
        "oncalciteInternalSegmentedControlItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-select": Omit<JSX.SolutionsSelect, "onCalciteSelectChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSelectElement> & {
        "oncalciteSelectChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-sheet": Omit<JSX.SolutionsSheet, "onCalciteSheetBeforeClose" | "onCalciteSheetClose" | "onCalciteSheetBeforeOpen" | "onCalciteSheetOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsSheetElement> & {
        "oncalciteSheetBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteSheetClose"?: (event: CustomEvent<any>) => void;
        "oncalciteSheetBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteSheetOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-shell": JSX.SolutionsShell & JSXInternal.HTMLAttributes<HTMLSolutionsShellElement>

      "calcite-shell-center-row": JSX.SolutionsShellCenterRow & JSXInternal.HTMLAttributes<HTMLSolutionsShellCenterRowElement>

      "calcite-shell-panel": Omit<JSX.SolutionsShellPanel, "onCalciteInternalShellPanelResizeStart" | "onCalciteInternalShellPanelResizeEnd"> & JSXInternal.HTMLAttributes<HTMLSolutionsShellPanelElement> & {
        "oncalciteInternalShellPanelResizeStart"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalShellPanelResizeEnd"?: (event: CustomEvent<any>) => void;
      }

      "calcite-slider": Omit<JSX.SolutionsSlider, "onCalciteSliderInput" | "onCalciteSliderChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSliderElement> & {
        "oncalciteSliderInput"?: (event: CustomEvent<any>) => void;
        "oncalciteSliderChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-sortable-list": Omit<JSX.SolutionsSortableList, "onCalciteListOrderChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSortableListElement> & {
        "oncalciteListOrderChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-split-button": Omit<JSX.SolutionsSplitButton, "onCalciteSplitButtonPrimaryClick" | "onCalciteSplitButtonSecondaryClick"> & JSXInternal.HTMLAttributes<HTMLSolutionsSplitButtonElement> & {
        "oncalciteSplitButtonPrimaryClick"?: (event: CustomEvent<any>) => void;
        "oncalciteSplitButtonSecondaryClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-stack": JSX.SolutionsStack & JSXInternal.HTMLAttributes<HTMLSolutionsStackElement>

      "calcite-stepper": Omit<JSX.SolutionsStepper, "onCalciteStepperChange" | "onCalciteStepperItemChange" | "onCalciteInternalStepperItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsStepperElement> & {
        "oncalciteStepperChange"?: (event: CustomEvent<any>) => void;
        "oncalciteStepperItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalStepperItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-stepper-item": Omit<JSX.SolutionsStepperItem, "onCalciteInternalStepperItemKeyEvent" | "onCalciteInternalStepperItemSelect" | "onCalciteInternalStepperItemRegister" | "onCalciteStepperItemSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsStepperItemElement> & {
        "oncalciteInternalStepperItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalStepperItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalStepperItemRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteStepperItemSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-switch": Omit<JSX.SolutionsSwitch, "onCalciteSwitchChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSwitchElement> & {
        "oncalciteSwitchChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab": JSX.SolutionsTab & JSXInternal.HTMLAttributes<HTMLSolutionsTabElement>

      "calcite-tab-nav": Omit<JSX.SolutionsTabNav, "onCalciteTabChange" | "onCalciteInternalTabNavSlotChange" | "onCalciteInternalTabChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsTabNavElement> & {
        "oncalciteTabChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabNavSlotChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab-title": Omit<JSX.SolutionsTabTitle, "onCalciteTabsActivate" | "onCalciteInternalTabsActivate" | "onCalciteTabsClose" | "onCalciteInternalTabsClose" | "onCalciteInternalTabsFocusNext" | "onCalciteInternalTabsFocusPrevious" | "onCalciteInternalTabsFocusFirst" | "onCalciteInternalTabsFocusLast" | "onCalciteInternalTabTitleRegister" | "onCalciteInternalTabIconChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsTabTitleElement> & {
        "oncalciteTabsActivate"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsActivate"?: (event: CustomEvent<any>) => void;
        "oncalciteTabsClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsFocusNext"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsFocusPrevious"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsFocusFirst"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsFocusLast"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabTitleRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabIconChanged"?: (event: CustomEvent<any>) => void;
      }

      "calcite-table": Omit<JSX.SolutionsTable, "onCalciteTableSelect" | "onCalciteTablePageChange" | "onCalciteInternalTableRowFocusChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsTableElement> & {
        "oncalciteTableSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteTablePageChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTableRowFocusChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-table-cell": JSX.SolutionsTableCell & JSXInternal.HTMLAttributes<HTMLSolutionsTableCellElement>

      "calcite-table-header": JSX.SolutionsTableHeader & JSXInternal.HTMLAttributes<HTMLSolutionsTableHeaderElement>

      "calcite-table-row": Omit<JSX.SolutionsTableRow, "onCalciteTableRowSelect" | "onCalciteInternalTableRowFocusRequest"> & JSXInternal.HTMLAttributes<HTMLSolutionsTableRowElement> & {
        "oncalciteTableRowSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTableRowFocusRequest"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tabs": JSX.SolutionsTabs & JSXInternal.HTMLAttributes<HTMLSolutionsTabsElement>

      "calcite-text-area": Omit<JSX.SolutionsTextArea, "onCalciteTextAreaInput" | "onCalciteTextAreaChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsTextAreaElement> & {
        "oncalciteTextAreaInput"?: (event: CustomEvent<any>) => void;
        "oncalciteTextAreaChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tile": Omit<JSX.SolutionsTile, "onCalciteInternalTileKeyEvent" | "onCalciteTileSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsTileElement> & {
        "oncalciteInternalTileKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteTileSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tile-group": Omit<JSX.SolutionsTileGroup, "onCalciteTileGroupSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsTileGroupElement> & {
        "oncalciteTileGroupSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tile-select": Omit<JSX.SolutionsTileSelect, "onCalciteTileSelectChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsTileSelectElement> & {
        "oncalciteTileSelectChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tile-select-group": JSX.SolutionsTileSelectGroup & JSXInternal.HTMLAttributes<HTMLSolutionsTileSelectGroupElement>

      "calcite-time-picker": Omit<JSX.SolutionsTimePicker, "onCalciteInternalTimePickerBlur" | "onCalciteInternalTimePickerChange" | "onCalciteInternalTimePickerFocus"> & JSXInternal.HTMLAttributes<HTMLSolutionsTimePickerElement> & {
        "oncalciteInternalTimePickerBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTimePickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTimePickerFocus"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tip": Omit<JSX.SolutionsTip, "onCalciteTipDismiss"> & JSXInternal.HTMLAttributes<HTMLSolutionsTipElement> & {
        "oncalciteTipDismiss"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tip-group": JSX.SolutionsTipGroup & JSXInternal.HTMLAttributes<HTMLSolutionsTipGroupElement>

      "calcite-tip-manager": Omit<JSX.SolutionsTipManager, "onCalciteTipManagerClose"> & JSXInternal.HTMLAttributes<HTMLSolutionsTipManagerElement> & {
        "oncalciteTipManagerClose"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tooltip": Omit<JSX.SolutionsTooltip, "onCalciteTooltipBeforeClose" | "onCalciteTooltipClose" | "onCalciteTooltipBeforeOpen" | "onCalciteTooltipOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsTooltipElement> & {
        "oncalciteTooltipBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteTooltipClose"?: (event: CustomEvent<any>) => void;
        "oncalciteTooltipBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteTooltipOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tree": Omit<JSX.SolutionsTree, "onCalciteTreeSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsTreeElement> & {
        "oncalciteTreeSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tree-item": Omit<JSX.SolutionsTreeItem, "onCalciteInternalTreeItemSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsTreeItemElement> & {
        "oncalciteInternalTreeItemSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-value-list": Omit<JSX.SolutionsValueList, "onCalciteListChange" | "onCalciteListOrderChange" | "onCalciteListFilter"> & JSXInternal.HTMLAttributes<HTMLSolutionsValueListElement> & {
        "oncalciteListChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListOrderChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListFilter"?: (event: CustomEvent<any>) => void;
      }

      "calcite-value-list-item": Omit<JSX.SolutionsValueListItem, "onCalciteListItemChange" | "onCalciteListItemRemove" | "onCalciteValueListItemDragHandleBlur"> & JSXInternal.HTMLAttributes<HTMLSolutionsValueListItemElement> & {
        "oncalciteListItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListItemRemove"?: (event: CustomEvent<any>) => void;
        "oncalciteValueListItemDragHandleBlur"?: (event: CustomEvent<any>) => void;
      }

      "card-manager": JSX.SolutionsCardManager & JSXInternal.HTMLAttributes<HTMLSolutionsCardManagerElement>

      "consent-manager": Omit<JSX.SolutionsConsentManager, "onConsentGranted"> & JSXInternal.HTMLAttributes<HTMLSolutionsConsentManagerElement> & {
        "onconsentGranted"?: (event: CustomEvent<any>) => void;
      }

      "create-feature": JSX.SolutionsCreateFeature & JSXInternal.HTMLAttributes<HTMLSolutionsCreateFeatureElement>

      "create-related-feature": Omit<JSX.SolutionsCreateRelatedFeature, "onSuccess" | "onFail" | "onIsActionPending" | "onFormReady"> & JSXInternal.HTMLAttributes<HTMLSolutionsCreateRelatedFeatureElement> & {
        "onsuccess"?: (event: CustomEvent<any>) => void;
        "onfail"?: (event: CustomEvent<any>) => void;
        "onisActionPending"?: (event: CustomEvent<any>) => void;
        "onformReady"?: (event: CustomEvent<any>) => void;
      }

      "crowdsource-manager": Omit<JSX.SolutionsCrowdsourceManager, "onShowIntroductionWindow" | "onShowCoverPage"> & JSXInternal.HTMLAttributes<HTMLSolutionsCrowdsourceManagerElement> & {
        "onshowIntroductionWindow"?: (event: CustomEvent<any>) => void;
        "onshowCoverPage"?: (event: CustomEvent<any>) => void;
      }

      "crowdsource-reporter": Omit<JSX.SolutionsCrowdsourceReporter, "onTogglePanel"> & JSXInternal.HTMLAttributes<HTMLSolutionsCrowdsourceReporterElement> & {
        "ontogglePanel"?: (event: CustomEvent<any>) => void;
      }

      "deduct-calculator": Omit<JSX.SolutionsDeductCalculator, "onDeductValueComplete"> & JSXInternal.HTMLAttributes<HTMLSolutionsDeductCalculatorElement> & {
        "ondeductValueComplete"?: (event: CustomEvent<any>) => void;
      }

      "delete-button": Omit<JSX.SolutionsDeleteButton, "onEditsComplete"> & JSXInternal.HTMLAttributes<HTMLSolutionsDeleteButtonElement> & {
        "oneditsComplete"?: (event: CustomEvent<any>) => void;
      }

      "edit-card": Omit<JSX.SolutionsEditCard, "onCloseEdit" | "onEditsComplete" | "onRefreshGraphics"> & JSXInternal.HTMLAttributes<HTMLSolutionsEditCardElement> & {
        "oncloseEdit"?: (event: CustomEvent<any>) => void;
        "oneditsComplete"?: (event: CustomEvent<any>) => void;
        "onrefreshGraphics"?: (event: CustomEvent<any>) => void;
      }

      "feature-comments": JSX.SolutionsFeatureComments & JSXInternal.HTMLAttributes<HTMLSolutionsFeatureCommentsElement>

      "feature-details": Omit<JSX.SolutionsFeatureDetails, "onLoadingStatus" | "onCommentSelect" | "onFeatureSelectionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsFeatureDetailsElement> & {
        "onloadingStatus"?: (event: CustomEvent<any>) => void;
        "oncommentSelect"?: (event: CustomEvent<any>) => void;
        "onfeatureSelectionChange"?: (event: CustomEvent<any>) => void;
      }

      "feature-form-flow-item": JSX.SolutionsFeatureFormFlowItem & JSXInternal.HTMLAttributes<HTMLSolutionsFeatureFormFlowItemElement>

      "feature-list": Omit<JSX.SolutionsFeatureList, "onFeatureSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsFeatureListElement> & {
        "onfeatureSelect"?: (event: CustomEvent<any>) => void;
      }

      "features-flow-item": JSX.SolutionsFeaturesFlowItem & JSXInternal.HTMLAttributes<HTMLSolutionsFeaturesFlowItemElement>

      "floor-filter": Omit<JSX.SolutionsFloorFilter, "onFacilityChanged" | "onLevelChanged" | "onSiteChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsFloorFilterElement> & {
        "onfacilityChanged"?: (event: CustomEvent<any>) => void;
        "onlevelChanged"?: (event: CustomEvent<any>) => void;
        "onsiteChanged"?: (event: CustomEvent<any>) => void;
      }

      "info-card": Omit<JSX.SolutionsInfoCard, "onPopupClosed" | "onSelectionChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsInfoCardElement> & {
        "onpopupClosed"?: (event: CustomEvent<any>) => void;
        "onselectionChanged"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-ckeditor-wrapper": Omit<JSX.SolutionsInstantAppsCkeditorWrapper, "onIsFocused" | "onDataChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsCkeditorWrapperElement> & {
        "onisFocused"?: (event: CustomEvent<any>) => void;
        "ondataChanged"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-control-panel": JSX.SolutionsInstantAppsControlPanel & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsControlPanelElement>

      "instant-apps-create": JSX.SolutionsInstantAppsCreate & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsCreateElement>

      "instant-apps-export": Omit<JSX.SolutionsInstantAppsExport, "onExportOutputUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsExportElement> & {
        "onexportOutputUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-export-views": Omit<JSX.SolutionsInstantAppsExportViews, "onExportOutputUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsExportViewsElement> & {
        "onexportOutputUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-filter-list": Omit<JSX.SolutionsInstantAppsFilterList, "onFilterListReset" | "onFilterUpdate"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsFilterListElement> & {
        "onfilterListReset"?: (event: CustomEvent<any>) => void;
        "onfilterUpdate"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-header": Omit<JSX.SolutionsInstantAppsHeader, "onInfoIsOpenChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsHeaderElement> & {
        "oninfoIsOpenChanged"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-interactive-legend": JSX.SolutionsInstantAppsInteractiveLegend & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendElement>

      "instant-apps-interactive-legend-classic": JSX.SolutionsInstantAppsInteractiveLegendClassic & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendClassicElement>

      "instant-apps-interactive-legend-count": JSX.SolutionsInstantAppsInteractiveLegendCount & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendCountElement>

      "instant-apps-interactive-legend-group-legend-element": JSX.SolutionsInstantAppsInteractiveLegendGroupLegendElement & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendGroupLegendElementElement>

      "instant-apps-interactive-legend-group-legend-element-caption": Omit<JSX.SolutionsInstantAppsInteractiveLegendGroupLegendElementCaption, "onGroupLayerCaptionElementExpandUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendGroupLegendElementCaptionElement> & {
        "ongroupLayerCaptionElementExpandUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-interactive-legend-layer-element": JSX.SolutionsInstantAppsInteractiveLegendLayerElement & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendLayerElementElement>

      "instant-apps-interactive-legend-layer-element-caption": Omit<JSX.SolutionsInstantAppsInteractiveLegendLayerElementCaption, "onLayerCaptionElementExpandUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendLayerElementCaptionElement> & {
        "onlayerCaptionElementExpandUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-interactive-legend-legend-element": JSX.SolutionsInstantAppsInteractiveLegendLegendElement & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendLegendElementElement>

      "instant-apps-interactive-legend-legend-element-caption": Omit<JSX.SolutionsInstantAppsInteractiveLegendLegendElementCaption, "onShowAllSelected" | "onLegendLayerExpandUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendLegendElementCaptionElement> & {
        "onshowAllSelected"?: (event: CustomEvent<any>) => void;
        "onlegendLayerExpandUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-interactive-legend-relationship": JSX.SolutionsInstantAppsInteractiveLegendRelationship & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsInteractiveLegendRelationshipElement>

      "instant-apps-keyboard-shortcuts": JSX.SolutionsInstantAppsKeyboardShortcuts & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsKeyboardShortcutsElement>

      "instant-apps-landing-page": Omit<JSX.SolutionsInstantAppsLandingPage, "onLandingPageOpen" | "onLandingPageClose"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsLandingPageElement> & {
        "onlandingPageOpen"?: (event: CustomEvent<any>) => void;
        "onlandingPageClose"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-language-switcher": Omit<JSX.SolutionsInstantAppsLanguageSwitcher, "onSelectedLanguageUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsLanguageSwitcherElement> & {
        "onselectedLanguageUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-language-translator": Omit<JSX.SolutionsInstantAppsLanguageTranslator, "onTranslatorDataUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsLanguageTranslatorElement> & {
        "ontranslatorDataUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-language-translator-item": Omit<JSX.SolutionsInstantAppsLanguageTranslatorItem, "onTranslatorItemDataUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsLanguageTranslatorItemElement> & {
        "ontranslatorItemDataUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-language-translator-search": Omit<JSX.SolutionsInstantAppsLanguageTranslatorSearch, "onSuggestionSelected"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsLanguageTranslatorSearchElement> & {
        "onsuggestionSelected"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-measurement": Omit<JSX.SolutionsInstantAppsMeasurement, "onMeasureActive"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsMeasurementElement> & {
        "onmeasureActive"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-measurement-tool": JSX.SolutionsInstantAppsMeasurementTool & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsMeasurementToolElement>

      "instant-apps-popover": JSX.SolutionsInstantAppsPopover & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsPopoverElement>

      "instant-apps-popovers": JSX.SolutionsInstantAppsPopovers & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsPopoversElement>

      "instant-apps-scoreboard": Omit<JSX.SolutionsInstantAppsScoreboard, "onScoreboardItemsUpdated"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsScoreboardElement> & {
        "onscoreboardItemsUpdated"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-sign-in": JSX.SolutionsInstantAppsSignIn & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsSignInElement>

      "instant-apps-social-share": JSX.SolutionsInstantAppsSocialShare & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsSocialShareElement>

      "instant-apps-splash": Omit<JSX.SolutionsInstantAppsSplash, "onSplashClose"> & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsSplashElement> & {
        "onsplashClose"?: (event: CustomEvent<any>) => void;
      }

      "instant-apps-time-filter": JSX.SolutionsInstantAppsTimeFilter & JSXInternal.HTMLAttributes<HTMLSolutionsInstantAppsTimeFilterElement>

      "json-editor": JSX.SolutionsJsonEditor & JSXInternal.HTMLAttributes<HTMLSolutionsJsonEditorElement>

      "layer-list": Omit<JSX.SolutionsLayerList, "onLayerSelect" | "onLayersListLoaded"> & JSXInternal.HTMLAttributes<HTMLSolutionsLayerListElement> & {
        "onlayerSelect"?: (event: CustomEvent<any>) => void;
        "onlayersListLoaded"?: (event: CustomEvent<any>) => void;
      }

      "layer-table": Omit<JSX.SolutionsLayerTable, "onFeatureSelectionChange" | "onToggleFilter"> & JSXInternal.HTMLAttributes<HTMLSolutionsLayerTableElement> & {
        "onfeatureSelectionChange"?: (event: CustomEvent<any>) => void;
        "ontoggleFilter"?: (event: CustomEvent<any>) => void;
      }

      "layout-manager": Omit<JSX.SolutionsLayoutManager, "onLayoutChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsLayoutManagerElement> & {
        "onlayoutChanged"?: (event: CustomEvent<any>) => void;
      }

      "list-flow-item": JSX.SolutionsListFlowItem & JSXInternal.HTMLAttributes<HTMLSolutionsListFlowItemElement>

      "location-flow-item": JSX.SolutionsLocationFlowItem & JSXInternal.HTMLAttributes<HTMLSolutionsLocationFlowItemElement>

      "map-card": Omit<JSX.SolutionsMapCard, "onMapChanged" | "onBeforeMapChanged" | "onToggleFilter"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapCardElement> & {
        "onmapChanged"?: (event: CustomEvent<any>) => void;
        "onbeforeMapChanged"?: (event: CustomEvent<any>) => void;
        "ontoggleFilter"?: (event: CustomEvent<any>) => void;
      }

      "map-draw-tools": Omit<JSX.SolutionsMapDrawTools, "onSelectionLoadingChange" | "onSketchGraphicsChange" | "onDrawUndo" | "onDrawRedo"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapDrawToolsElement> & {
        "onselectionLoadingChange"?: (event: CustomEvent<any>) => void;
        "onsketchGraphicsChange"?: (event: CustomEvent<any>) => void;
        "ondrawUndo"?: (event: CustomEvent<any>) => void;
        "ondrawRedo"?: (event: CustomEvent<any>) => void;
      }

      "map-fullscreen": Omit<JSX.SolutionsMapFullscreen, "onFullscreenStateChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapFullscreenElement> & {
        "onfullscreenStateChange"?: (event: CustomEvent<any>) => void;
      }

      "map-layer-picker": Omit<JSX.SolutionsMapLayerPicker, "onIdsFound" | "onNoLayersFound" | "onLayerSelectionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapLayerPickerElement> & {
        "onidsFound"?: (event: CustomEvent<any>) => void;
        "onnoLayersFound"?: (event: CustomEvent<any>) => void;
        "onlayerSelectionChange"?: (event: CustomEvent<any>) => void;
      }

      "map-legend": JSX.SolutionsMapLegend & JSXInternal.HTMLAttributes<HTMLSolutionsMapLegendElement>

      "map-picker": Omit<JSX.SolutionsMapPicker, "onMapInfoChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapPickerElement> & {
        "onmapInfoChange"?: (event: CustomEvent<any>) => void;
      }

      "map-search": JSX.SolutionsMapSearch & JSXInternal.HTMLAttributes<HTMLSolutionsMapSearchElement>

      "map-select-tools": Omit<JSX.SolutionsMapSelectTools, "onSelectionSetChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapSelectToolsElement> & {
        "onselectionSetChange"?: (event: CustomEvent<any>) => void;
      }

      "map-tools": JSX.SolutionsMapTools & JSXInternal.HTMLAttributes<HTMLSolutionsMapToolsElement>

      "pci-calculator": JSX.SolutionsPciCalculator & JSXInternal.HTMLAttributes<HTMLSolutionsPciCalculatorElement>

      "pdf-download": JSX.SolutionsPdfDownload & JSXInternal.HTMLAttributes<HTMLSolutionsPdfDownloadElement>

      "public-notification": Omit<JSX.SolutionsPublicNotification, "onSearchConfigurationChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsPublicNotificationElement> & {
        "onsearchConfigurationChange"?: (event: CustomEvent<any>) => void;
      }

      "refine-results-flow-item": JSX.SolutionsRefineResultsFlowItem & JSXInternal.HTMLAttributes<HTMLSolutionsRefineResultsFlowItemElement>

      "refine-selection": Omit<JSX.SolutionsRefineSelection, "onSelectionLoadingChange" | "onSelectionSetsChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsRefineSelectionElement> & {
        "onselectionLoadingChange"?: (event: CustomEvent<any>) => void;
        "onselectionSetsChanged"?: (event: CustomEvent<any>) => void;
      }

      "share-item": JSX.SolutionsShareItem & JSXInternal.HTMLAttributes<HTMLSolutionsShareItemElement>

      "solution-configuration": JSX.SolutionsSolutionConfiguration & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionConfigurationElement>

      "solution-contents": Omit<JSX.SolutionsSolutionContents, "onSolutionItemSelected"> & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionContentsElement> & {
        "onsolutionItemSelected"?: (event: CustomEvent<any>) => void;
      }

      "solution-item": JSX.SolutionsSolutionItem & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionItemElement>

      "solution-item-details": JSX.SolutionsSolutionItemDetails & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionItemDetailsElement>

      "solution-item-icon": JSX.SolutionsSolutionItemIcon & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionItemIconElement>

      "solution-item-sharing": JSX.SolutionsSolutionItemSharing & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionItemSharingElement>

      "solution-organization-variables": Omit<JSX.SolutionsSolutionOrganizationVariables, "onOrganizationVariableSelected"> & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionOrganizationVariablesElement> & {
        "onorganizationVariableSelected"?: (event: CustomEvent<any>) => void;
      }

      "solution-resource-item": JSX.SolutionsSolutionResourceItem & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionResourceItemElement>

      "solution-spatial-ref": Omit<JSX.SolutionsSolutionSpatialRef, "onFeatureServiceSpatialReferenceChange" | "onEnableDefaultSpatialReferenceChange" | "onEnabledSpatialReferenceChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionSpatialRefElement> & {
        "onfeatureServiceSpatialReferenceChange"?: (event: CustomEvent<any>) => void;
        "onenableDefaultSpatialReferenceChange"?: (event: CustomEvent<any>) => void;
        "onenabledSpatialReferenceChange"?: (event: CustomEvent<any>) => void;
      }

      "solution-template-data": JSX.SolutionsSolutionTemplateData & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionTemplateDataElement>

      "solution-variables": Omit<JSX.SolutionsSolutionVariables, "onSolutionVariableSelected"> & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionVariablesElement> & {
        "onsolutionVariableSelected"?: (event: CustomEvent<any>) => void;
      }

      "spatial-ref": Omit<JSX.SolutionsSpatialRef, "onSpatialReferenceChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSpatialRefElement> & {
        "onspatialReferenceChange"?: (event: CustomEvent<any>) => void;
      }

      "store-manager": Omit<JSX.SolutionsStoreManager, "onStateLoaded"> & JSXInternal.HTMLAttributes<HTMLSolutionsStoreManagerElement> & {
        "onstateLoaded"?: (event: CustomEvent<any>) => void;
      };
    }
  }
}
  