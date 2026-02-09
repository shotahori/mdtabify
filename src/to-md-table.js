const MIN_COLUMN_WIDTH = 3;

const parseRows = (text, delimiter) => {
  const outerBlankLines = /^(?:[ \t]*\r?\n)+|(?:\r?\n[ \t]*)+$/g;
  const trimmed = text.replace(outerBlankLines, "");

  return trimmed.split(/\r?\n/).map((line) => line.split(delimiter));
};

const toMdLine = (row) => `| ${row.join(" | ")} |`;

const toMdSeparatorLine = (maxColumnCount) =>
  `|${Array.from({ length: maxColumnCount }, () => "-".repeat(MIN_COLUMN_WIDTH)).join("|")}|`;

export const toMdTable = (text, delimiter) => {
  const rows = parseRows(text, delimiter);

  if (rows.length === 0) return "";

  const maxColumnCount = Math.max(...rows.map((row) => row.length));

  const [headerRow, ...bodyRows] = rows;

  return [
    toMdLine(headerRow),
    toMdSeparatorLine(maxColumnCount),
    ...bodyRows.map((row) => toMdLine(row)),
  ].join("\n");
};
