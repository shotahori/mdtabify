const MIN_COLUMN_WIDTH = 3;

const parseRows = (text, delimiter) => {
  if (text.trim() === "") return [];

  const outerBlankLines = /^(?:[ \t]*\r?\n)+|(?:\r?\n[ \t]*)+$/g;
  const trimmed = text.replace(outerBlankLines, "");

  return trimmed.split(/\r?\n/).map((line) => line.split(delimiter));
};

const formatCell = (cell) => (cell ?? "").replace(/\|/g, "\\|");

const normalizeRows = (rows, columnCount) =>
  rows.map((row) =>
    Array.from({ length: columnCount }, (_, i) => formatCell(row[i])),
  );

const computeColumnWidths = (rows) => {
  const widths = Array.from({ length: rows[0].length }, () => 0);

  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      widths[i] = Math.max(widths[i], row[i].length);
    }
  }

  return widths;
};

const toMdLine = (row, widths) =>
  widths
    ? `| ${row.map((cell, i) => cell.padEnd(widths[i])).join(" | ")} |`
    : `| ${row.join(" | ")} |`;

const toMdSeparatorLine = (columnCount, widths) =>
  widths
    ? `|${widths.map((w) => "-".repeat(w + 2)).join("|")}|`
    : `|${Array.from({ length: columnCount }, () => "-".repeat(MIN_COLUMN_WIDTH)).join("|")}|`;

export const toMdTable = (text, delimiter, { align = false } = {}) => {
  let rows = parseRows(text, delimiter);

  if (rows.length === 0) return "";

  const columnCount = Math.max(...rows.map((row) => row.length));

  rows = normalizeRows(rows, columnCount);

  const widths = align ? computeColumnWidths(rows) : null;

  const [headerRow, ...bodyRows] = rows;

  return [
    toMdLine(headerRow, widths),
    toMdSeparatorLine(columnCount, widths),
    ...bodyRows.map((row) => toMdLine(row, widths)),
  ].join("\n");
};
