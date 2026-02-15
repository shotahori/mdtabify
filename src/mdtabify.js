import { guessDelimiter } from "./guess-delimiter.js";
import { toMdTable } from "./to-md-table.js";

export const mdtabify = (text) => {
  const guess = guessDelimiter(text);

  return {
    kind: "unique",
    delimiter: guess.delimiter,
    table: toMdTable(text, guess.delimiter),
  };
};
