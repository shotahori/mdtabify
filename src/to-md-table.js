const MIN_COLUMN_WIDTH = 3;

const parseRows = (text, delimiter) => {
  if (text.trim() === "") return [];

  const outerBlankLines = /^(?:[ \t]*\r?\n)+|(?:\r?\n[ \t]*)+$/g;
  const trimmed = text.replace(outerBlankLines, "");

  return trimmed.split(/\r?\n/).map((line) => line.split(delimiter));
};

const normalizeRows = (rows, columnCount) =>
  rows.map((row) =>
    Array.from({ length: columnCount }, (_, i) => row[i] ?? ""),
  );

const toMdLine = (row) => `| ${row.join(" | ")} |`;

const toMdSeparatorLine = (columnCount) =>
  `|${Array.from({ length: columnCount }, () => "-".repeat(MIN_COLUMN_WIDTH)).join("|")}|`;

export const toMdTable = (text, delimiter) => {
  const rows = parseRows(text, delimiter);

  if (rows.length === 0) return "";

  const columnCount = Math.max(...rows.map((row) => row.length));

  const [headerRow, ...bodyRows] = normalizeRows(rows, columnCount);

  return [
    toMdLine(headerRow),
    toMdSeparatorLine(columnCount),
    ...bodyRows.map((row) => toMdLine(row)),
  ].join("\n");
};
