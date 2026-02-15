import { guessDelimiter } from "./guess-delimiter.js";
import { toMdTable } from "./to-md-table.js";

export const mdtabify = (text) => {
  const guess = guessDelimiter(text);

  switch (guess.kind) {
    case "none":
      return { kind: "none" };
    case "ambiguous":
      return { kind: "ambiguous", delimiters: guess.delimiters };
    case "unique":
      return {
        kind: "unique",
        delimiter: guess.delimiter,
        table: toMdTable(text, guess.delimiter),
      };
  }
};
