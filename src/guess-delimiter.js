const collectCandidates = (text) => {
  const candidates = [];

  for (const candidate of text) {
    if (/\r|\n/.test(candidate)) continue;

    if (!candidates.includes(candidate)) {
      candidates.push(candidate);
    }
  }

  return candidates;
};

const scoreDelimiter = (char, lines) => {
  const freq = {};
  let effectiveLineCount = 0;

  for (const line of lines) {
    if (line.trim() === "") continue;

    const count = line.split(char).length;
    freq[count] = (freq[count] || 0) + 1;
    effectiveLineCount++;
  }

  if (effectiveLineCount === 0) return 0;

  const maxFreq = Math.max(...Object.values(freq));

  const maxColumns = [];
  for (const k in freq) {
    if (freq[k] === maxFreq) {
      maxColumns.push(Number(k));
    }
  }

  if (maxColumns.length === 1 && maxColumns[0] === 1) return 0;
  return maxFreq / effectiveLineCount;
};

export const guessDelimiter = (text) => {
  const candidates = collectCandidates(text);

  const lines = text.split(/\r?\n/);

  let delimiter = null;
  let bestScore = 0;

  for (const char of candidates) {
    const score = scoreDelimiter(char, lines);

    if (score > bestScore) {
      bestScore = score;
      delimiter = char;
    }
  }

  return delimiter;
};
