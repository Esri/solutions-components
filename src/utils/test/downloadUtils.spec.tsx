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

});
