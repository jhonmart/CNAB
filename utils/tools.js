import { colorHelper } from "./constants.js";

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function resetNewProp({ row_draft }) {
  row_draft.name = "";
  row_draft.start = undefined;
  row_draft.end = undefined;
}

export function getNewColor(index) {
  return colorHelper[index % colorHelper.length];
}
