// May change this but doing this for now so the download button will do something 

// https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2

function _exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = _convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  var link = document.createElement("a");
  if (link.download !== undefined) { // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilenmae);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function _convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
}

export async function exportCSV(
  layerView: __esri.FeatureLayerView,
  ids: number[]
) {
  const q = layerView.layer.createQuery();
  q.outFields = ["*"];
  q.objectIds = ids;
  const featureSet = await layerView.layer?.queryFeatures(q);

  const attrs = featureSet.features.map(f => f.attributes);
  const headers = {};
  const entry = attrs[0];
  Object.keys(entry).forEach(k => {
    if (entry.hasOwnProperty(k)) {
      headers[k] = k;
    } 
  });
  _exportCSVFile(headers, attrs, `notify-${Date.now().toString()}`);
}
