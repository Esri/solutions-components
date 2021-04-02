import {
  getInventoryItems
} from "./templates";
import * as electionOutreach from '../demos/data/election-outreach.json';

describe("getInventoryItems", () => {
  it("can get inventory items", () => {
    const templates = electionOutreach.templates;
    expect(templates.length).toEqual(11)
    const actual = getInventoryItems(templates);
    expect(actual.length).toEqual(5);
  });
});