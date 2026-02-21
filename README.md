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
