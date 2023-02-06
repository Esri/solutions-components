
import { JSXInternal } from "preact/src/jsx";
import { JSX } from "./components";

declare module "preact/src/jsx" {
  namespace JSXInternal {
    interface IntrinsicElements {
      
      "add-record-modal": JSX.SolutionsAddRecordModal & JSXInternal.HTMLAttributes<HTMLSolutionsAddRecordModalElement>

      "buffer-tools": Omit<JSX.SolutionsBufferTools, "onBufferComplete" | "onDistanceChanged" | "onUnitChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsBufferToolsElement> & {
        "onbufferComplete"?: (event: CustomEvent<any>) => void;
        "ondistanceChanged"?: (event: CustomEvent<any>) => void;
        "onunitChanged"?: (event: CustomEvent<any>) => void;
      }

      "calcite-accordion": Omit<JSX.SolutionsAccordion, "onCalciteInternalAccordionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsAccordionElement> & {
        "oncalciteInternalAccordionChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-accordion-item": Omit<JSX.SolutionsAccordionItem, "onCalciteInternalAccordionItemKeyEvent" | "onCalciteInternalAccordionItemSelect" | "onCalciteInternalAccordionItemClose" | "onCalciteInternalAccordionItemRegister"> & JSXInternal.HTMLAttributes<HTMLSolutionsAccordionItemElement> & {
        "oncalciteInternalAccordionItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAccordionItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAccordionItemClose"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAccordionItemRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action": Omit<JSX.SolutionsAction, "onCalciteActionClick"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionElement> & {
        "oncalciteActionClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action-bar": Omit<JSX.SolutionsActionBar, "onCalciteActionBarToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionBarElement> & {
        "oncalciteActionBarToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action-group": JSX.SolutionsActionGroup & JSXInternal.HTMLAttributes<HTMLSolutionsActionGroupElement>

      "calcite-action-menu": Omit<JSX.SolutionsActionMenu, "onCalciteActionMenuOpenChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionMenuElement> & {
        "oncalciteActionMenuOpenChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-action-pad": Omit<JSX.SolutionsActionPad, "onCalciteActionPadToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsActionPadElement> & {
        "oncalciteActionPadToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-alert": Omit<JSX.SolutionsAlert, "onCalciteAlertBeforeClose" | "onCalciteAlertClose" | "onCalciteAlertBeforeOpen" | "onCalciteAlertOpen" | "onCalciteInternalAlertSync" | "onCalciteInternalAlertRegister"> & JSXInternal.HTMLAttributes<HTMLSolutionsAlertElement> & {
        "oncalciteAlertBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertClose"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteAlertOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAlertSync"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalAlertRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-avatar": JSX.SolutionsAvatar & JSXInternal.HTMLAttributes<HTMLSolutionsAvatarElement>

      "calcite-block": Omit<JSX.SolutionsBlock, "onCalciteBlockToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsBlockElement> & {
        "oncalciteBlockToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-block-section": Omit<JSX.SolutionsBlockSection, "onCalciteBlockSectionToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsBlockSectionElement> & {
        "oncalciteBlockSectionToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-button": JSX.SolutionsButton & JSXInternal.HTMLAttributes<HTMLSolutionsButtonElement>

      "calcite-card": Omit<JSX.SolutionsCard, "onCalciteCardSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsCardElement> & {
        "oncalciteCardSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-checkbox": Omit<JSX.SolutionsCheckbox, "onCalciteInternalCheckboxBlur" | "onCalciteCheckboxChange" | "onCalciteInternalCheckboxFocus"> & JSXInternal.HTMLAttributes<HTMLSolutionsCheckboxElement> & {
        "oncalciteInternalCheckboxBlur"?: (event: CustomEvent<any>) => void;
        "oncalciteCheckboxChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalCheckboxFocus"?: (event: CustomEvent<any>) => void;
      }

      "calcite-chip": Omit<JSX.SolutionsChip, "onCalciteChipDismiss"> & JSXInternal.HTMLAttributes<HTMLSolutionsChipElement> & {
        "oncalciteChipDismiss"?: (event: CustomEvent<any>) => void;
      }

      "calcite-color-picker": Omit<JSX.SolutionsColorPicker, "onCalciteColorPickerChange" | "onCalciteColorPickerInput"> & JSXInternal.HTMLAttributes<HTMLSolutionsColorPickerElement> & {
        "oncalciteColorPickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteColorPickerInput"?: (event: CustomEvent<any>) => void;
      }

      "calcite-color-picker-hex-input": Omit<JSX.SolutionsColorPickerHexInput, "onCalciteColorPickerHexInputChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsColorPickerHexInputElement> & {
        "oncalciteColorPickerHexInputChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-color-picker-swatch": JSX.SolutionsColorPickerSwatch & JSXInternal.HTMLAttributes<HTMLSolutionsColorPickerSwatchElement>

      "calcite-combobox": Omit<JSX.SolutionsCombobox, "onCalciteLookupChange" | "onCalciteComboboxChange" | "onCalciteComboboxFilterChange" | "onCalciteComboboxChipDismiss" | "onCalciteComboboxBeforeClose" | "onCalciteComboboxClose" | "onCalciteComboboxBeforeOpen" | "onCalciteComboboxOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsComboboxElement> & {
        "oncalciteLookupChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxFilterChange"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxChipDismiss"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxClose"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteComboboxOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-combobox-item": Omit<JSX.SolutionsComboboxItem, "onCalciteComboboxItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsComboboxItemElement> & {
        "oncalciteComboboxItemChange"?: (event: CustomEvent<any>) => void;
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

      "calcite-date-picker-month": Omit<JSX.SolutionsDatePickerMonth, "onCalciteDatePickerSelect" | "onCalciteInternalDatePickerHover" | "onCalciteDatePickerActiveDateChange" | "onCalciteInternalDatePickerMouseOut"> & JSXInternal.HTMLAttributes<HTMLSolutionsDatePickerMonthElement> & {
        "oncalciteDatePickerSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDatePickerHover"?: (event: CustomEvent<any>) => void;
        "oncalciteDatePickerActiveDateChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDatePickerMouseOut"?: (event: CustomEvent<any>) => void;
      }

      "calcite-date-picker-month-header": Omit<JSX.SolutionsDatePickerMonthHeader, "onCalciteDatePickerSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsDatePickerMonthHeaderElement> & {
        "oncalciteDatePickerSelect"?: (event: CustomEvent<any>) => void;
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

      "calcite-dropdown-item": Omit<JSX.SolutionsDropdownItem, "onCalciteInternalDropdownItemSelect" | "onCalciteInternalDropdownItemKeyEvent" | "onCalciteInternalDropdownCloseRequest"> & JSXInternal.HTMLAttributes<HTMLSolutionsDropdownItemElement> & {
        "oncalciteInternalDropdownItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDropdownItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalDropdownCloseRequest"?: (event: CustomEvent<any>) => void;
      }

      "calcite-fab": JSX.SolutionsFab & JSXInternal.HTMLAttributes<HTMLSolutionsFabElement>

      "calcite-filter": Omit<JSX.SolutionsFilter, "onCalciteFilterChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsFilterElement> & {
        "oncalciteFilterChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-flow": JSX.SolutionsFlow & JSXInternal.HTMLAttributes<HTMLSolutionsFlowElement>

      "calcite-flow-item": Omit<JSX.SolutionsFlowItem, "onCalciteFlowItemBack" | "onCalciteFlowItemBackClick" | "onCalciteFlowItemScroll" | "onCalciteFlowItemClose"> & JSXInternal.HTMLAttributes<HTMLSolutionsFlowItemElement> & {
        "oncalciteFlowItemBack"?: (event: CustomEvent<any>) => void;
        "oncalciteFlowItemBackClick"?: (event: CustomEvent<any>) => void;
        "oncalciteFlowItemScroll"?: (event: CustomEvent<any>) => void;
        "oncalciteFlowItemClose"?: (event: CustomEvent<any>) => void;
      }

      "calcite-graph": JSX.SolutionsGraph & JSXInternal.HTMLAttributes<HTMLSolutionsGraphElement>

      "calcite-handle": Omit<JSX.SolutionsHandle, "onCalciteHandleNudge"> & JSXInternal.HTMLAttributes<HTMLSolutionsHandleElement> & {
        "oncalciteHandleNudge"?: (event: CustomEvent<any>) => void;
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

      "calcite-input-date-picker": Omit<JSX.SolutionsInputDatePicker, "onCalciteDatePickerChange" | "onCalciteDatePickerRangeChange" | "onCalciteInputDatePickerChange" | "onCalciteInputDatePickerBeforeClose" | "onCalciteInputDatePickerClose" | "onCalciteInputDatePickerBeforeOpen" | "onCalciteInputDatePickerOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputDatePickerElement> & {
        "oncalciteDatePickerChange"?: (event: CustomEvent<any>) => void;
        "oncalciteDatePickerRangeChange"?: (event: CustomEvent<any>) => void;
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

      "calcite-input-time-picker": Omit<JSX.SolutionsInputTimePicker, "onCalciteInputTimePickerChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsInputTimePickerElement> & {
        "oncalciteInputTimePickerChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-label": Omit<JSX.SolutionsLabel, "onCalciteInternalLabelClick"> & JSXInternal.HTMLAttributes<HTMLSolutionsLabelElement> & {
        "oncalciteInternalLabelClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-link": JSX.SolutionsLink & JSXInternal.HTMLAttributes<HTMLSolutionsLinkElement>

      "calcite-list": JSX.SolutionsList & JSXInternal.HTMLAttributes<HTMLSolutionsListElement>

      "calcite-list-item": JSX.SolutionsListItem & JSXInternal.HTMLAttributes<HTMLSolutionsListItemElement>

      "calcite-list-item-group": JSX.SolutionsListItemGroup & JSXInternal.HTMLAttributes<HTMLSolutionsListItemGroupElement>

      "calcite-loader": JSX.SolutionsLoader & JSXInternal.HTMLAttributes<HTMLSolutionsLoaderElement>

      "calcite-modal": Omit<JSX.SolutionsModal, "onCalciteModalBeforeClose" | "onCalciteModalClose" | "onCalciteModalBeforeOpen" | "onCalciteModalOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsModalElement> & {
        "oncalciteModalBeforeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteModalClose"?: (event: CustomEvent<any>) => void;
        "oncalciteModalBeforeOpen"?: (event: CustomEvent<any>) => void;
        "oncalciteModalOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-notice": Omit<JSX.SolutionsNotice, "onCalciteNoticeClose" | "onCalciteNoticeOpen"> & JSXInternal.HTMLAttributes<HTMLSolutionsNoticeElement> & {
        "oncalciteNoticeClose"?: (event: CustomEvent<any>) => void;
        "oncalciteNoticeOpen"?: (event: CustomEvent<any>) => void;
      }

      "calcite-option": Omit<JSX.SolutionsOption, "onCalciteInternalOptionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsOptionElement> & {
        "oncalciteInternalOptionChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-option-group": Omit<JSX.SolutionsOptionGroup, "onCalciteInternalOptionGroupChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsOptionGroupElement> & {
        "oncalciteInternalOptionGroupChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-pagination": Omit<JSX.SolutionsPagination, "onCalcitePaginationUpdate" | "onCalcitePaginationChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsPaginationElement> & {
        "oncalcitePaginationUpdate"?: (event: CustomEvent<any>) => void;
        "oncalcitePaginationChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-panel": Omit<JSX.SolutionsPanel, "onCalcitePanelClose" | "onCalcitePanelDismiss" | "onCalcitePanelDismissedChange" | "onCalcitePanelScroll" | "onCalcitePanelBackClick"> & JSXInternal.HTMLAttributes<HTMLSolutionsPanelElement> & {
        "oncalcitePanelClose"?: (event: CustomEvent<any>) => void;
        "oncalcitePanelDismiss"?: (event: CustomEvent<any>) => void;
        "oncalcitePanelDismissedChange"?: (event: CustomEvent<any>) => void;
        "oncalcitePanelScroll"?: (event: CustomEvent<any>) => void;
        "oncalcitePanelBackClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-pick-list": Omit<JSX.SolutionsPickList, "onCalciteListChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsPickListElement> & {
        "oncalciteListChange"?: (event: CustomEvent<any>) => void;
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

      "calcite-popover-manager": JSX.SolutionsPopoverManager & JSXInternal.HTMLAttributes<HTMLSolutionsPopoverManagerElement>

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

      "calcite-radio-group": Omit<JSX.SolutionsRadioGroup, "onCalciteRadioGroupChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsRadioGroupElement> & {
        "oncalciteRadioGroupChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-radio-group-item": Omit<JSX.SolutionsRadioGroupItem, "onCalciteInternalRadioGroupItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsRadioGroupItemElement> & {
        "oncalciteInternalRadioGroupItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-rating": Omit<JSX.SolutionsRating, "onCalciteRatingChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsRatingElement> & {
        "oncalciteRatingChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-scrim": JSX.SolutionsScrim & JSXInternal.HTMLAttributes<HTMLSolutionsScrimElement>

      "calcite-select": Omit<JSX.SolutionsSelect, "onCalciteSelectChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSelectElement> & {
        "oncalciteSelectChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-shell": JSX.SolutionsShell & JSXInternal.HTMLAttributes<HTMLSolutionsShellElement>

      "calcite-shell-center-row": JSX.SolutionsShellCenterRow & JSXInternal.HTMLAttributes<HTMLSolutionsShellCenterRowElement>

      "calcite-shell-panel": Omit<JSX.SolutionsShellPanel, "onCalciteShellPanelToggle"> & JSXInternal.HTMLAttributes<HTMLSolutionsShellPanelElement> & {
        "oncalciteShellPanelToggle"?: (event: CustomEvent<any>) => void;
      }

      "calcite-slider": Omit<JSX.SolutionsSlider, "onCalciteSliderInput" | "onCalciteSliderChange" | "onCalciteSliderUpdate"> & JSXInternal.HTMLAttributes<HTMLSolutionsSliderElement> & {
        "oncalciteSliderInput"?: (event: CustomEvent<any>) => void;
        "oncalciteSliderChange"?: (event: CustomEvent<any>) => void;
        "oncalciteSliderUpdate"?: (event: CustomEvent<any>) => void;
      }

      "calcite-sortable-list": Omit<JSX.SolutionsSortableList, "onCalciteListOrderChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSortableListElement> & {
        "oncalciteListOrderChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-split-button": Omit<JSX.SolutionsSplitButton, "onCalciteSplitButtonPrimaryClick" | "onCalciteSplitButtonSecondaryClick"> & JSXInternal.HTMLAttributes<HTMLSolutionsSplitButtonElement> & {
        "oncalciteSplitButtonPrimaryClick"?: (event: CustomEvent<any>) => void;
        "oncalciteSplitButtonSecondaryClick"?: (event: CustomEvent<any>) => void;
      }

      "calcite-stepper": Omit<JSX.SolutionsStepper, "onCalciteStepperItemChange" | "onCalciteInternalStepperItemChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsStepperElement> & {
        "oncalciteStepperItemChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalStepperItemChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-stepper-item": Omit<JSX.SolutionsStepperItem, "onCalciteInternalStepperItemKeyEvent" | "onCalciteInternalStepperItemSelect" | "onCalciteInternalUserRequestedStepperItemSelect" | "onCalciteInternalStepperItemRegister"> & JSXInternal.HTMLAttributes<HTMLSolutionsStepperItemElement> & {
        "oncalciteInternalStepperItemKeyEvent"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalStepperItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalUserRequestedStepperItemSelect"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalStepperItemRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-switch": Omit<JSX.SolutionsSwitch, "onCalciteSwitchChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSwitchElement> & {
        "oncalciteSwitchChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab": Omit<JSX.SolutionsTab, "onCalciteInternalTabRegister"> & JSXInternal.HTMLAttributes<HTMLSolutionsTabElement> & {
        "oncalciteInternalTabRegister"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab-nav": Omit<JSX.SolutionsTabNav, "onCalciteTabChange" | "onCalciteInternalTabChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsTabNavElement> & {
        "oncalciteTabChange"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tab-title": Omit<JSX.SolutionsTabTitle, "onCalciteTabsActivate" | "onCalciteInternalTabsActivate" | "onCalciteInternalTabsFocusNext" | "onCalciteInternalTabsFocusPrevious" | "onCalciteInternalTabTitleRegister" | "onCalciteInternalTabIconChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsTabTitleElement> & {
        "oncalciteTabsActivate"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsActivate"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsFocusNext"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabsFocusPrevious"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabTitleRegister"?: (event: CustomEvent<any>) => void;
        "oncalciteInternalTabIconChanged"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tabs": JSX.SolutionsTabs & JSXInternal.HTMLAttributes<HTMLSolutionsTabsElement>

      "calcite-tile": JSX.SolutionsTile & JSXInternal.HTMLAttributes<HTMLSolutionsTileElement>

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

      "calcite-tip-manager": Omit<JSX.SolutionsTipManager, "onCalciteTipManagerToggle" | "onCalciteTipManagerClose"> & JSXInternal.HTMLAttributes<HTMLSolutionsTipManagerElement> & {
        "oncalciteTipManagerToggle"?: (event: CustomEvent<any>) => void;
        "oncalciteTipManagerClose"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tooltip": JSX.SolutionsTooltip & JSXInternal.HTMLAttributes<HTMLSolutionsTooltipElement>

      "calcite-tooltip-manager": JSX.SolutionsTooltipManager & JSXInternal.HTMLAttributes<HTMLSolutionsTooltipManagerElement>

      "calcite-tree": Omit<JSX.SolutionsTree, "onCalciteTreeSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsTreeElement> & {
        "oncalciteTreeSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-tree-item": Omit<JSX.SolutionsTreeItem, "onCalciteInternalTreeItemSelect"> & JSXInternal.HTMLAttributes<HTMLSolutionsTreeItemElement> & {
        "oncalciteInternalTreeItemSelect"?: (event: CustomEvent<any>) => void;
      }

      "calcite-value-list": Omit<JSX.SolutionsValueList, "onCalciteListChange" | "onCalciteListOrderChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsValueListElement> & {
        "oncalciteListChange"?: (event: CustomEvent<any>) => void;
        "oncalciteListOrderChange"?: (event: CustomEvent<any>) => void;
      }

      "calcite-value-list-item": Omit<JSX.SolutionsValueListItem, "onCalciteListItemRemove"> & JSXInternal.HTMLAttributes<HTMLSolutionsValueListItemElement> & {
        "oncalciteListItemRemove"?: (event: CustomEvent<any>) => void;
      }

      "card-manager": JSX.SolutionsCardManager & JSXInternal.HTMLAttributes<HTMLSolutionsCardManagerElement>

      "comment-card": JSX.SolutionsCommentCard & JSXInternal.HTMLAttributes<HTMLSolutionsCommentCardElement>

      "crowdsource-manager": JSX.SolutionsCrowdsourceManager & JSXInternal.HTMLAttributes<HTMLSolutionsCrowdsourceManagerElement>

      "crowdsource-reporter": JSX.SolutionsCrowdsourceReporter & JSXInternal.HTMLAttributes<HTMLSolutionsCrowdsourceReporterElement>

      "deduct-calculator": Omit<JSX.SolutionsDeductCalculator, "onDeductValueComplete"> & JSXInternal.HTMLAttributes<HTMLSolutionsDeductCalculatorElement> & {
        "ondeductValueComplete"?: (event: CustomEvent<any>) => void;
      }

      "edit-record-modal": JSX.SolutionsEditRecordModal & JSXInternal.HTMLAttributes<HTMLSolutionsEditRecordModalElement>

      "info-card": JSX.SolutionsInfoCard & JSXInternal.HTMLAttributes<HTMLSolutionsInfoCardElement>

      "json-editor": JSX.SolutionsJsonEditor & JSXInternal.HTMLAttributes<HTMLSolutionsJsonEditorElement>

      "layer-table": JSX.SolutionsLayerTable & JSXInternal.HTMLAttributes<HTMLSolutionsLayerTableElement>

      "list-item": JSX.SolutionsListItem & JSXInternal.HTMLAttributes<HTMLSolutionsListItemElement>

      "map-card": Omit<JSX.SolutionsMapCard, "onExpandMap"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapCardElement> & {
        "onexpandMap"?: (event: CustomEvent<any>) => void;
      }

      "map-draw-tools": Omit<JSX.SolutionsMapDrawTools, "onSketchGraphicsChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapDrawToolsElement> & {
        "onsketchGraphicsChange"?: (event: CustomEvent<any>) => void;
      }

      "map-layer-picker": Omit<JSX.SolutionsMapLayerPicker, "onLayerSelectionChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapLayerPickerElement> & {
        "onlayerSelectionChange"?: (event: CustomEvent<any>) => void;
      }

      "map-search": Omit<JSX.SolutionsMapSearch, "onSearchChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapSearchElement> & {
        "onsearchChange"?: (event: CustomEvent<any>) => void;
      }

      "map-select-tools": Omit<JSX.SolutionsMapSelectTools, "onSelectionSetChange" | "onSketchTypeChange" | "onWorkflowTypeChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsMapSelectToolsElement> & {
        "onselectionSetChange"?: (event: CustomEvent<any>) => void;
        "onsketchTypeChange"?: (event: CustomEvent<any>) => void;
        "onworkflowTypeChange"?: (event: CustomEvent<any>) => void;
      }

      "media-card": JSX.SolutionsMediaCard & JSXInternal.HTMLAttributes<HTMLSolutionsMediaCardElement>

      "pci-calculator": JSX.SolutionsPciCalculator & JSXInternal.HTMLAttributes<HTMLSolutionsPciCalculatorElement>

      "pdf-download": JSX.SolutionsPdfDownload & JSXInternal.HTMLAttributes<HTMLSolutionsPdfDownloadElement>

      "public-notification": Omit<JSX.SolutionsPublicNotification, "onLabelChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsPublicNotificationElement> & {
        "onlabelChange"?: (event: CustomEvent<any>) => void;
      }

      "refine-selection": Omit<JSX.SolutionsRefineSelection, "onSelectionSetsChanged"> & JSXInternal.HTMLAttributes<HTMLSolutionsRefineSelectionElement> & {
        "onselectionSetsChanged"?: (event: CustomEvent<any>) => void;
      }

      "refine-selection-tools": Omit<JSX.SolutionsRefineSelectionTools, "onRefineSelectionGraphicsChange" | "onRefineSelectionIdsChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsRefineSelectionToolsElement> & {
        "onrefineSelectionGraphicsChange"?: (event: CustomEvent<any>) => void;
        "onrefineSelectionIdsChange"?: (event: CustomEvent<any>) => void;
      }

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

      "solution-spatial-ref": Omit<JSX.SolutionsSolutionSpatialRef, "onFeatureServiceSpatialReferenceChange"> & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionSpatialRefElement> & {
        "onfeatureServiceSpatialReferenceChange"?: (event: CustomEvent<any>) => void;
      }

      "solution-template-data": JSX.SolutionsSolutionTemplateData & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionTemplateDataElement>

      "solution-variables": Omit<JSX.SolutionsSolutionVariables, "onSolutionVariableSelected"> & JSXInternal.HTMLAttributes<HTMLSolutionsSolutionVariablesElement> & {
        "onsolutionVariableSelected"?: (event: CustomEvent<any>) => void;
      }

      "store-manager": Omit<JSX.SolutionsStoreManager, "onStateLoaded"> & JSXInternal.HTMLAttributes<HTMLSolutionsStoreManagerElement> & {
        "onstateLoaded"?: (event: CustomEvent<any>) => void;
      };
    }
  }
}
  