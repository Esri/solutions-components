// May change this but doing this for now so the download button will do something 

// https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2

import { queryFeatures } from "./queryUtils";

function _exportCSVFile(headers, items, fileTitle: string) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  const jsonObject = JSON.stringify(items);

  const csv = _convertToCSV(jsonObject);

  const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement("a");
  if (link.download !== undefined) { // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilenmae);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function _convertToCSV(objArray) {
  const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const index in array[i]) {
      if (line != '') {line += ','}

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

export async function exportCSV(
  layerView: __esri.FeatureLayerView,
  ids: number[]
): Promise<void> {
  const featureSet = await queryFeatures(ids, layerView.layer);
  const attrs = featureSet.features.map(f => f.attributes);
  const headers = {};
  const entry = attrs[0];
  Object.keys(entry).forEach(k => {
    if (entry.hasOwnProperty(k)) {
      headers[k] = k;
    } 
  });
  _exportCSVFile(headers, attrs, `notify-${Date.now().toString()}`);
  return Promise.resolve();
}
