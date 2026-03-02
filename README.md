# mdtabify

A simple CLI tool that converts delimiter-separated text (CSV-like tables) into Markdown tables.

- Reads text from standard input (`stdin`) and outputs a Markdown table to standard output (`stdout`)
- Automatically detects the delimiter
- Supports aligned output with `--align` for better readability

## Installation

```bash
npm install -g mdtabify
```

## Usage

### Show help

```bash
$ mdtabify --help
Usage: mdtabify [--align] [--help]

Convert delimiter-separated text from stdin into a Markdown table.

Options:
  --align   Align columns for readable output
  --help    Show this help message
```

### Default output

```bash
$ echo -e "a,b,c\nd,e,f\ng,h,i" | mdtabify
| a | b | c |
|---|---|---|
| d | e | f |
| g | h | i |
```

### Aligned output (`--align`)

```bash
$ echo -e "a,bb,ccc\nd,eeee,f\ngg,h,i" | mdtabify --align
| a  | bb   | ccc |
|----|------|-----|
| d  | eeee | f   |
| gg | h    | i   |
```

## Delimiter detection (how it works)

`mdtabify` treats **newline (`\n` / `\r\n`) as the row separator**.
The delimiter is guessed by choosing a character that makes the **number of columns consistent across rows**
(i.e. the most frequent column count across non-empty lines).

Notes:

- Provide **multiple lines**. With only one line, many characters look “consistent” and the result may be ambiguous.
- If the most frequent column count is `1`, it is treated as **no delimiter**.
- Values are split by a single-character delimiter (simple split-based parsing), so multi-character delimiters like `", "` or `"||"` are not supported.
- No CSV-style quoting/escaping is supported.

## Error behavior

### 1) When the delimiter cannot be determined (effectively only one column)

```text
abc
def
ghi
```

- Outputs an error message to standard error (`stderr`)
- Exit code: `1`
- Message: `Could not determine a delimiter: only one column detected.`

### 2) When multiple delimiter candidates are found and the result is ambiguous

```text
a,b;c
d,e;f
g,h;i
```

- Outputs candidate delimiters to standard error (`stderr`)
- Exit code: `1`
- Message: `Ambiguous delimiter: candidates are , ;`

## Future work

- Improve delimiter detection accuracy: avoid character-specific heuristics (e.g., preferring `,` over `;`), and extend the current column-count consistency approach with additional structure-first signals.
- Add CSV-style quoting/escaping support.
