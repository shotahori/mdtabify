import { toMdTable } from "./to-md-table.js";

export const mdtabify = (text) => {
  return toMdTable(text, ",");
};
