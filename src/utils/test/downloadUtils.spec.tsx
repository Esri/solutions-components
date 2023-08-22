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

import * as downloadUtils from "../downloadUtils";

describe("downloadUtils", () => {

  describe("_convertPopupFieldsToLabelSpec", () => {

    it("handles fieldname visibility", () => {
      const fieldInfos: __esri.FieldInfo[] = [
        { fieldName: "A", visible: true },
        { fieldName: "B", visible: true },
        { fieldName: "C", visible: false },
        { fieldName: "D", visible: true }
      ] as any[];
      const bypassFieldVisiblity = false;
      const expectedLabelSpec = "{A}|{B}|{D}";

      const labelSpec = downloadUtils._convertPopupFieldsToLabelSpec(fieldInfos, bypassFieldVisiblity);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

    it("handles fieldname ignoring visibility", () => {
      const fieldInfos: __esri.FieldInfo[] = [
        { fieldName: "A", visible: true },
        { fieldName: "B", visible: true },
        { fieldName: "C", visible: false },
        { fieldName: "D", visible: true }
      ] as any[];
      const bypassFieldVisiblity = true;
      const expectedLabelSpec = "{A}|{B}|{C}|{D}";

      const labelSpec = downloadUtils._convertPopupFieldsToLabelSpec(fieldInfos, bypassFieldVisiblity);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

  });

  describe("_convertPopupTextToLabelSpec", () => {

    it("handles <br> variants", () => {
      const popupInfo = "<div style='text-align: left;'>{NAME}<br />{STREET}<br/>{CITY}, {STATE} {ZIP} <br></div>";
      const expectedLabelSpec = "{NAME}|{STREET}|{CITY}, {STATE} {ZIP}";

      const labelSpec = downloadUtils._convertPopupTextToLabelSpec(popupInfo);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

    it("handles <p>", () => {
      const popupInfo = "<p>{NAME}</p><p>{STREET}</p><p>{CITY}, {STATE} {ZIP}</p>";
      const expectedLabelSpec = "{NAME}|{STREET}|{CITY}, {STATE} {ZIP}";

      const labelSpec = downloadUtils._convertPopupTextToLabelSpec(popupInfo);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

    it("handles popup's use of \xA0", () => {
      const popupInfo = "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY},\xA0{STATE}\xA0{ZIP}\xA0<br /></div>";
      const expectedLabelSpec = "{NAME}|{STREET}|{CITY}, {STATE} {ZIP}";

      const labelSpec = downloadUtils._convertPopupTextToLabelSpec(popupInfo);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

    it("removes newlines and blank lines, and trims each line", () => {
      const popupInfo = "  \n\n   {NAME}   \n  \n\n   {STREET}\n{CITY}, {STATE} {ZIP}\n\n  \n ";
      const expectedLabelSpec = "{NAME}|{STREET}|{CITY}, {STATE} {ZIP}";

      const labelSpec = downloadUtils._convertPopupTextToLabelSpec(popupInfo);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

    it("removes extra HTML", () => {
      const popupInfo = "\n<div style='text-align: left;'><span style='font-weight:bold'>{NAME}</span><br />{STREET}<br />{CITY},\xA0{STATE}\xA0{ZIP}\xA0<br /></div>\n";
      const expectedLabelSpec = "{NAME}|{STREET}|{CITY}, {STATE} {ZIP}";

      const labelSpec = downloadUtils._convertPopupTextToLabelSpec(popupInfo);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

    it("handles some special characters", () => {
      const popupInfo = "<div style='text-align: left;'>&lt;{NAME}&gt;<br />{STREET}<br/>{CITY},&nbsp;{STATE}&nbsp;{ZIP}<br></div>";
      const expectedLabelSpec = "<{NAME}>|{STREET}|{CITY}, {STATE} {ZIP}";

      const labelSpec = downloadUtils._convertPopupTextToLabelSpec(popupInfo);
      expect(labelSpec).toEqual(expectedLabelSpec);
    });

  });

  describe("_createFilename", () => {

    it("handles no selection set names", () => {
      const selectionSetNames: string[] = [];
      const expectedTitle = "download";

      const title = downloadUtils._createFilename(selectionSetNames);
      expect(title).toEqual(expectedTitle);
    });

    it("handles one selection set name", () => {
      const selectionSetNames: string[] = ["fred"];
      const expectedTitle = "fred";

      const title = downloadUtils._createFilename(selectionSetNames);
      expect(title).toEqual(expectedTitle);
    });

    it("handles two selection set names", () => {
      const selectionSetNames: string[] = ["fred", "ginger"];
      const expectedTitle = "fred, ginger";

      const title = downloadUtils._createFilename(selectionSetNames);
      expect(title).toEqual(expectedTitle);
    });

  });

  describe("_getExpressionsFromLabel", () => {
    it("handles a label with ASCII expression names", () => {
      const labelSpec = "{expression/expr0}\n{OWNERNM1}\n{PSTLADDRESS}\n{PSTLCITY}, {PSTLSTATE} {PSTLZIP5}";
      const expectedExpressions = ["{expression/expr0}"];
      const expressions = downloadUtils._getExpressionsFromLabel(labelSpec);
      expect(expressions).toEqual(expectedExpressions);
    });
  });

  describe("_getFieldExpressionsFromLabel", () => {
    it("handles a label with ASCII field names", () => {
      const labelSpec = "{expression/expr0}\n{OWNERNM1}\n{PSTLADDRESS}\n{PSTLCITY}, {PSTLSTATE} {PSTLZIP5}";
      const expectedFields = ["{OWNERNM1}", "{PSTLADDRESS}", "{PSTLCITY}", "{PSTLSTATE}", "{PSTLZIP5}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Arabic (ar) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{بحث}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{بحث}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Bosnian (bs) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{računa}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{računa}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Bulgarian (bg) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Търсене}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Търсене}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Catalan (ca) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Descripció}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Descripció}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Simplified Chinese (zh-cn) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{帐户个人资料}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{帐户个人资料}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Traditional Chinese (Hong Kong) (zh-hk) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{帳號設定檔}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{帳號設定檔}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Traditional Chinese (Taiwan) (zh-tw) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{搜尋}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{搜尋}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Croatian (hr) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Pretraživanje}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Pretraživanje}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Czech (cs) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Přihlásit}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Přihlásit}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Danish (da) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Vælg}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Vælg}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Dutch (nl) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{geïmplementeerd}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{geïmplementeerd}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Estonian (et) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Valdkonnapõhised}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Valdkonnapõhised}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Finnish (fi) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Näytä}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Näytä}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with French (fr) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{accès}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{accès}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with German (de) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Öffentliche}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Öffentliche}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Greek (el) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Αναζήτηση}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Αναζήτηση}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Hebrew (he) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{עוֹמֶק}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{עוֹמֶק}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Hungarian (hu) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Nyelvváltás}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Nyelvváltás}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Indonesian (id) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Bahasa}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Bahasa}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Italian (it) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Elettricità}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Elettricità}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Japanese (ja) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{深さ}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{深さ}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Korean (ko) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{계정 프로필}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{계정 프로필}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Latvian (lv) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Meklēt}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Meklēt}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Lithuanian (lt) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{sričių}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{sričių}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Norwegian (nb) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{språk}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{språk}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Polish (pl) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Przełącz}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Przełącz}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Portuguese (Brazil) (pt-br) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Configurações}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Configurações}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Portuguese (Portugal) (pt-pt) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{sessão}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{sessão}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Romanian (ro) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Copiați}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Copiați}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Russian (ru) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Вход}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Вход}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Serbian (sr) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{pregledač}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{pregledač}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Slovak (sk) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Prihlásiť}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Prihlásiť}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Slovenian (sl) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{računa}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{računa}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Spanish (es) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{través}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{través}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Swedish (sv) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{språk}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{språk}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Thai (th) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{โปรไฟล์บัญ}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{โปรไฟล์บัญ}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Turkish (tr) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Değiştir}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Değiştir}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Ukrainian (uk) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Пошук}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Пошук}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });

    it("handles a label with Vietnamese (vi) field name", () => {
      const labelSpec = "{latitude}|{expression/expr0}\n{longitude}|{Chuyển}|{time}";
      const expectedFields = ["{latitude}", "{longitude}", "{Chuyển}", "{time}"];
      const fields = downloadUtils._getFieldExpressionsFromLabel(labelSpec);
      expect(fields).toEqual(expectedFields);
    });
  });

  describe('_getFieldNamesFromFieldExpressions', () => {
    it("extracts field names from field name expressions", () => {
      const expressions = ["{NAME}", "{STREET}", "{CITY}", "{STATE}", "{ZIP}"];
      const names = ["NAME", "STREET", "CITY", "STATE", "ZIP"];
      expect(downloadUtils._getFieldNamesFromFieldExpressions(expressions)).toEqual(names);
    });
  });

  describe('_prepareAttributeValue', () => {
    it('should format date attributes using the specified date format', () => {
      const attributeValue = new Date('2022-01-01T00:00:00.000Z');
      const attributeType = 'date';
      const attributeDomain = null;
      const attributeFormat = {
        dateFormat: 'short-date'
      };
      const intl = {
        formatDate: jest.fn().mockReturnValue('01/01/2022'),
        convertDateFormatToIntlOptions: jest.fn().mockReturnValue({})
      };
      const result = downloadUtils._prepareAttributeValue(attributeValue, attributeType, attributeDomain, attributeFormat as any, intl);
      expect(result).toEqual('01/01/2022');
      expect(intl.formatDate).toHaveBeenCalledWith(attributeValue, {});
      expect(intl.convertDateFormatToIntlOptions).toHaveBeenCalledWith('short-date');
    });

    it('should format number attributes using the specified number format', () => {
      const attributeValue = 1234.5678;
      const attributeType = 'double';
      const attributeDomain = null;
      const attributeFormat = {
        places: 2,
        digitSeparator: true
      };
      const intl = {
        formatNumber: jest.fn().mockReturnValue('1,234.57'),
        convertNumberFormatToIntlOptions: jest.fn().mockReturnValue({})
      };
      const result = downloadUtils._prepareAttributeValue(attributeValue, attributeType, attributeDomain, attributeFormat as any, intl);
      expect(result).toEqual('1,234.57');
      expect(intl.formatNumber).toHaveBeenCalledWith(attributeValue, {});
      expect(intl.convertNumberFormatToIntlOptions).toHaveBeenCalledWith(attributeFormat);
    });

    it('should return the attribute value if no format is specified', () => {
      const attributeValue = 'Value';
      const attributeType = 'string';
      const attributeDomain = null;
      const attributeFormat = null;
      const intl = {};
      const result = downloadUtils._prepareAttributeValue(attributeValue, attributeType, attributeDomain, attributeFormat, intl);
      expect(result).toEqual('Value');
    });

    it('should return the domain name for coded-value domain fields', () => {
      const attributeValue = '1';
      const attributeType = 'string';
      const attributeDomain = {
        type: 'coded-value',
        name: 'Domain',
        codedValues: [
          {
            name: 'Value 1',
            code: '1'
          },
          {
            name: 'Value 2',
            code: '2'
          }
        ],
        getName: function (code: string) {
          return this.codedValues.find((codedValue: any) => codedValue.code === code)?.name;
        }
      } as __esri.CodedValueDomain;
      const attributeFormat = null;
      const intl = {};
      const result = downloadUtils._prepareAttributeValue(attributeValue, attributeType, attributeDomain as any, attributeFormat, intl);
      expect(result).toEqual('Value 1');
    });
  });

  describe('removeDuplicateLabels', () => {
    it('should remove duplicate labels', () => {
      const labels = [
        ['Label 1', 'Value 1'],
        ['Label 2', 'Value 2'],
        ['Label 1', 'Value 1']
      ];
      const result = downloadUtils.removeDuplicateLabels(labels);
      expect(result).toEqual([
        ['Label 1', 'Value 1'],
        ['Label 2', 'Value 2']
      ]);
    });
  });

  describe('_getSelectionSetNames', () => {
    it('should return selection set names for matching IDs', () => {
      const exportInfos = {
        'layer1': {
          selectionSetNames: ['Selection Set 1', 'Selection Set 2']
        },
        'layer2': {
          selectionSetNames: ['Selection Set 3']
        }
      };
      const result = downloadUtils._getSelectionSetNames(exportInfos as any, /^layer/);
      expect(result).toEqual(['Selection Set 1', 'Selection Set 2', 'Selection Set 3']);
    });

    it('should return an empty array if no matching IDs are found', () => {
      const exportInfos = {
        'layer1': {
          selectionSetNames: ['Selection Set 1', 'Selection Set 2']
        },
        'layer2': {
          selectionSetNames: ['Selection Set 3']
        }
      };
      const result = downloadUtils._getSelectionSetNames(exportInfos as any, /^foo/);
      expect(result).toEqual([]);
    });
  });

});
