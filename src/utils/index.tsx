interface IFormatNumberToSI {
  value?: number;
  precision?: number;
}

export function formatNumberToSI({ value, precision = 2 }: IFormatNumberToSI) {
  if (value === undefined) {
    return;
  }

  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(value) >= x.threshold);
  if (found) {
    const formatted =
      (value / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  if (value >= 1e-2) {
    return value.toPrecision(precision);
  }

  return value.toExponential(precision);
}
