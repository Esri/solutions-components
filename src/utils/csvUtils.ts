// May change this but doing this for now so the download button will do something

// https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2

import { queryFeatures } from "./queryUtils";

/**
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param layerView layer view to query
 * @param ids number array of ids to export to csv
 *
 * @returns Promise when the function has completed
 */
export async function exportCSV(
  layerView: __esri.FeatureLayerView,
  ids: number[]
): Promise<void> {
  const featureSet = await queryFeatures(ids, layerView.layer);
  const attributes = featureSet.features.map(f => f.attributes);
  const fieldNames = {};
  const entry = attributes[0];
  Object.keys(entry).forEach(k => {
    if (entry.hasOwnProperty(k)) {
      fieldNames[k] = k;
    }
  });
  _downloadCSVFile(fieldNames, attributes, `notify-${Date.now().toString()}`);
}

/**
 * Download the CSV file
 *
 * @param fieldNames the names for each of the features fields
 * @param attributes the features attributes
 *
 * @returns void
 */
function _downloadCSVFile(
  fieldNames: {[key: string]: string},
  attributes: {[key: string]: string}[],
  fileTitle: string
): void {
  if (fieldNames) {
    attributes.unshift(fieldNames);
  }
  // format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  const csv = attributes.reduce((prev, cur) => {
    return prev + Object.values(cur).map(v => `"${v}"`).join(",") + "\r\n";
  }, "");
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
